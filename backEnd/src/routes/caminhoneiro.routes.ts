import { Router } from 'express';
import { createCaminhoneiro, getAllCaminhoneiros, getCaminhoneiroById, updateCaminhoneiro, deleteCaminhoneiro } from '../controllers/caminhoneiro.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.post('/caminhoneiro', createCaminhoneiro);
router.get('/caminhoneiro', getAllCaminhoneiros);
router.get('/caminhoneiro/:id', getCaminhoneiroById);
router.put('/caminhoneiro/:id', updateCaminhoneiro);
router.delete('/caminhoneiro/:id', deleteCaminhoneiro);

export default router;