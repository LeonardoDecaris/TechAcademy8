import { Router } from 'express';
import { createStatus, getAllStatus, getStatusById, updateStatus, deleteStatus } from '../controllers/status.controller';
import { authMiddleware, requireAdmin } from '../middleware/authMiddleware';

const router = Router();
router.post('/status', authMiddleware, createStatus);
router.get('/status', authMiddleware, getAllStatus);
router.get('/status/:id', requireAdmin, getStatusById);
router.put('/status/:id', requireAdmin, updateStatus);
router.delete('/status/:id', requireAdmin, deleteStatus);

export default router;