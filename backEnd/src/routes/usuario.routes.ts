import { Router } from 'express';
import { createUsuario, getAllUsuarios, getUsuarioById, updateUsuario, deleteUsuario, requestPasswordReset, resetPassword } from '../controllers/usuario.controller';
import { requireAdmin, authMiddlewareUserOrAdmin } from '../middleware/authMiddleware';

const router = Router();
router.post('/usuario', createUsuario);
router.post('/reset-password', resetPassword);
router.post('/request-password-reset', requestPasswordReset);

router.get('/usuario', requireAdmin, getAllUsuarios);
router.get('/usuario/:id', authMiddlewareUserOrAdmin({id_usuario: 'id'}), getUsuarioById);
router.put('/usuario/:id', authMiddlewareUserOrAdmin({id_usuario: 'id'}), updateUsuario);
router.delete('/usuario/:id', authMiddlewareUserOrAdmin({id_usuario: 'id'}), deleteUsuario);


export default router;