/**
 * Rutas de Publicación - Capa de Presentación
 */

import { Router } from 'express';
import controladorPublicacion from '../controladores/ControladorPublicacion.js';
import { requerirAutenticacion } from '../middlewares/autenticacion.js';

const router = Router();

// Todas las rutas requieren autenticación
router.use(requerirAutenticacion);

// CRUD de publicaciones
router.post('/', controladorPublicacion.crear);
router.get('/', controladorPublicacion.listar);
router.get('/:id', controladorPublicacion.obtener);
router.delete('/:id', controladorPublicacion.eliminar);

// Reacciones
router.post('/:id/reaccion', controladorPublicacion.reaccionar);
router.delete('/:id/reaccion', controladorPublicacion.quitarReaccion);

// Comentarios
router.post('/:id/comentarios', controladorPublicacion.agregarComentario);

export default router;
