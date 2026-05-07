import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { BlobServiceClient } from '@azure/storage-blob';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Always save locally first using multer disk storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

export const uploadMiddleware = multer({ storage });

export const handleFileUpload = async (file) => {
  const azureConnectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME || 'reports';
  const cdnUrl = process.env.CDN_URL;

  if (azureConnectionString) {
    try {
      const blobServiceClient = BlobServiceClient.fromConnectionString(azureConnectionString);
      const containerClient = blobServiceClient.getContainerClient(containerName);
      
      // Create container if it doesn't exist
      await containerClient.createIfNotExists({ access: 'blob' });

      const blobName = uuidv4() + path.extname(file.originalname);
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      const fileStream = fs.createReadStream(file.path);
      await blockBlobClient.uploadStream(fileStream, undefined, undefined, {
        blobHTTPHeaders: { blobContentType: file.mimetype }
      });

      // Delete local file after upload
      fs.unlinkSync(file.path);

      // Return CDN URL if configured, otherwise return the raw blob URL
      if (cdnUrl) {
        return `${cdnUrl}/${containerName}/${blobName}`;
      }
      return blockBlobClient.url;
    } catch (error) {
      console.error('Error uploading to Azure:', error);
      throw new Error('Failed to upload image to Azure Storage');
    }
  } else {
    // Local storage: return the relative path
    return `/uploads/${file.filename}`;
  }
};
