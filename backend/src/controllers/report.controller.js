import { PrismaClient } from '@prisma/client';
import { handleFileUpload } from '../services/storage.service.js';

const prisma = new PrismaClient();

// CITIZEN: Create Report
export const createReport = async (req, res) => {
  try {
    const { title, description, category, incidentDate, location, contactDetails } = req.body;
    const userId = req.user.userId;

    if (!title || !description || !category || !incidentDate || !location || !contactDetails) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let imageUrl = null;
    if (req.file) {
      imageUrl = await handleFileUpload(req.file);
    }

    const report = await prisma.report.create({
      data: {
        title,
        description,
        category,
        incidentDate: new Date(incidentDate),
        location,
        contactDetails,
        imageUrl,
        userId,
      },
    });

    res.status(201).json({ message: 'Report created successfully', report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// CITIZEN: Get My Reports (with Pagination)
export const getMyReports = async (req, res) => {
  try {
    const userId = req.user.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.report.count({ where: { userId } }),
    ]);

    res.json({
      data: reports,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ADMIN: Get All Reports (with Filtering and Pagination)
export const getAllReports = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const { status, category } = req.query;

    const whereClause = {};
    if (status) whereClause.status = status;
    if (category) whereClause.category = category;

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { username: true } },
        },
      }),
      prisma.report.count({ where: whereClause }),
    ]);

    res.json({
      data: reports,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ADMIN: Update Report (Status and Admin Reply)
export const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminReply } = req.body;

    const updateData = {};
    if (status) updateData.status = status;
    if (adminReply !== undefined) updateData.adminReply = adminReply;

    const report = await prisma.report.update({
      where: { id },
      data: updateData,
    });

    res.json({ message: 'Report updated successfully', report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get Single Report Detail (Citizen/Admin)
export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        user: { select: { username: true } },
      },
    });

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    // Citizens can only view their own reports
    if (req.user.role !== 'admin' && report.userId !== req.user.userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
