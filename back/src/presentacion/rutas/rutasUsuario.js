/**
 * Rutas de Usuario - Capa de Presentación
 */

import { Router } from 'express';
import controladorUsuario from '../controladores/ControladorUsuario.js';
import { requerirAutenticacion } from '../middlewares/autenticacion.js';

const router = Router();

// Rutas públicas
router.post('/registro', controladorUsuario.registrar);
router.post('/login', controladorUsuario.iniciarSesion);
router.post('/recuperar-contrasena', controladorUsuario.solicitarRecuperacion);
router.post('/restablecer-contrasena', controladorUsuario.restablecerContrasena);
router.post('/google', controladorUsuario.autenticarConGoogle);

// Rutas protegidas
router.get('/perfil', requerirAutenticacion, controladorUsuario.obtenerPerfilActual);
router.get('/:id', requerirAutenticacion, controladorUsuario.obtenerPerfil);
router.get('/', requerirAutenticacion, controladorUsuario.listar);

export default router;
