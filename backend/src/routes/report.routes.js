import { Router } from 'express';
import { 
  createReport, 
  getMyReports, 
  getAllReports, 
  updateReport, 
  getReportById 
} from '../controllers/report.controller.js';
import { authenticateToken, requireAdmin } from '../middlewares/auth.middleware.js';
import { uploadMiddleware } from '../services/storage.service.js';

const router = Router();

// Citizen Routes
router.post('/', authenticateToken, uploadMiddleware.single('image'), createReport);
router.get('/my-reports', authenticateToken, getMyReports);

// Admin Routes
router.get('/', authenticateToken, requireAdmin, getAllReports);
router.put('/:id', authenticateToken, requireAdmin, updateReport);

// Common Routes
router.get('/:id', authenticateToken, getReportById);

export default router;
