import { Router } from 'express';
import { createCarga, getAllCargas, getCargaById, updateCarga, deleteCarga } from '../controllers/carga.controller';
import { authMiddleware,requireAdmin } from '../middleware/authMiddleware';

const router = Router();
router.get('/carga', authMiddleware, getAllCargas);
router.get('/carga/:id', authMiddleware, getCargaById);
router.post('/carga', requireAdmin, createCarga);
router.put('/carga/:id', requireAdmin, updateCarga);
router.delete('/carga/:id', requireAdmin, deleteCarga);

export default router;