import { Router } from 'express';
import { createVeiculo, getAllVeiculos, getVeiculoById, updateVeiculo, deleteVeiculo, getVeiculoByUsuarioId, createVeiculoByUsuarioId, updateVeiculoByUsuarioId, deleteVeiculoByUsuarioId, } from '../controllers/veiculo.controller';
import { requireAdmin, authMiddlewareVeiculoUserOrAdmin} from '../middleware/authMiddleware';

const router = Router();
router.post('/veiculo', requireAdmin, createVeiculo);
router.get('/veiculo', requireAdmin, getAllVeiculos);
router.get('/veiculo/:id', requireAdmin, getVeiculoById);
router.put('/veiculo/:id',  requireAdmin, updateVeiculo);
router.delete('/veiculo/:id', requireAdmin, deleteVeiculo);

router.get('/usuario/:usuarioId/veiculo', authMiddlewareVeiculoUserOrAdmin({usuarioId: 'usuarioId'}), getVeiculoByUsuarioId);
router.post('/usuario/:usuarioId/veiculo', authMiddlewareVeiculoUserOrAdmin({usuarioId: 'usuarioId'}), createVeiculoByUsuarioId);
router.put('/usuario/:usuarioId/veiculo/:id', authMiddlewareVeiculoUserOrAdmin({usuarioId: 'usuarioId'}), updateVeiculoByUsuarioId);
router.delete('/usuario/:usuarioId/veiculo', authMiddlewareVeiculoUserOrAdmin({usuarioId: 'usuarioId'}), deleteVeiculoByUsuarioId);

export default router;