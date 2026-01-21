/**
 * Índice de Rutas - Capa de Presentación
 * 
 * Centraliza todas las rutas de la API.
 */

import { Router } from 'express';
import rutasUsuario from './rutasUsuario.js';
import rutasPublicacion from './rutasPublicacion.js';

const router = Router();

// Registrar rutas
router.use('/usuarios', rutasUsuario);
router.use('/publicaciones', rutasPublicacion);

// Ruta de salud
router.get('/salud', (req, res) => {
    res.json({
        exito: true,
        mensaje: 'API funcionando correctamente',
        timestamp: new Date().toISOString(),
    });
});

export default router;
