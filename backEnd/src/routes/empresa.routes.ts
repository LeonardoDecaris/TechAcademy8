import { Router } from 'express';
import { createEmpresa, getAllEmpresas, getEmpresaById, updateEmpresa, deleteEmpresa } from '../controllers/empresa.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.post('/empresa', createEmpresa);
router.get('/empresa', getAllEmpresas);
router.get('/empresa/:id', getEmpresaById);
router.put('/empresa/:id', updateEmpresa);
router.delete('/empresa/:id', deleteEmpresa);

export default router;