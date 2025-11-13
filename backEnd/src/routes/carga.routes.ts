import { Router } from 'express';
import { createCarga, getAllCargas, getCargaById, updateCarga, deleteCarga } from '../controllers/carga.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.post('/carga', createCarga);
router.get('/carga', getAllCargas);
router.get('/carga/:id', getCargaById);
router.put('/carga/:id', updateCarga);
router.delete('/carga/:id', deleteCarga);

export default router;