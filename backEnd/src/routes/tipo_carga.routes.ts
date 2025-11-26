import { Router } from 'express';
import { requireAdmin } from '../middleware/authMiddleware';
import { createTipoCarga, deleteTipoCarga, getAllTipoCarga, getTipoCargaById, updateTipoCarga } from '../controllers/tipo_carga.controller';

const router = Router();
router.post('/tipo_carga', requireAdmin, createTipoCarga);
router.get('/tipo_carga', requireAdmin, getAllTipoCarga);
router.get('/tipo_carga/:id', requireAdmin, getTipoCargaById);
router.put('/tipo_carga/:id', requireAdmin, updateTipoCarga);
router.delete('/tipo_carga/:id', requireAdmin, deleteTipoCarga);

export default router;