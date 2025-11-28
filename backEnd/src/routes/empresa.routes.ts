import { Router } from 'express';
import { createEmpresa, getAllEmpresas, getEmpresaById, updateEmpresa, deleteEmpresa } from '../controllers/empresa.controller';
import { authMiddleware, requireAdmin} from '../middleware/authMiddleware';

const router = Router();
router.post('/empresa', requireAdmin, createEmpresa);
router.get('/empresa', authMiddleware, getAllEmpresas);
router.get('/empresa/:id', authMiddleware, getEmpresaById);
router.put('/empresa/:id', requireAdmin, updateEmpresa);
router.delete('/empresa/:id', requireAdmin, deleteEmpresa);

export default router;