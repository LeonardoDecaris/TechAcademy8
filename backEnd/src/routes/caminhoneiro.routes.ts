import { Router } from 'express';
import { createCaminhoneiro, getAllCaminhoneiros, getCaminhoneiroById, updateCaminhoneiro, deleteCaminhoneiro } from '../controllers/caminhoneiro.controller';
import { requireAdmin } from '../middleware/authMiddleware';

const router = Router();
router.post('/caminhoneiro', requireAdmin, createCaminhoneiro);
router.get('/caminhoneiro', requireAdmin, getAllCaminhoneiros);
router.get('/caminhoneiro/:id', requireAdmin, getCaminhoneiroById);
router.put('/caminhoneiro/:id', requireAdmin, updateCaminhoneiro);
router.delete('/caminhoneiro/:id', requireAdmin, deleteCaminhoneiro);

export default router;