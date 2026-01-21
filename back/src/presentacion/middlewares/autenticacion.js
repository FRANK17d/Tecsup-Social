/**
 * Middleware de Autenticación - Capa de Presentación
 * 
 * Verifica tokens JWT en las peticiones.
 */

import servicioJWT from '../../infraestructura/servicios/ServicioJWT.js';
import { ErrorAutenticacion } from '../../dominio/excepciones/ExcepcionDominio.js';

/**
 * Middleware que requiere autenticación
 */
export const requerirAutenticacion = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new ErrorAutenticacion('Token no proporcionado');
        }

        const token = authHeader.split(' ')[1];
        const payload = servicioJWT.verificar(token);

        // Agregar datos del usuario al request
        req.usuario = {
            id: payload.id,
            email: payload.email,
            rol: payload.rol,
        };

        next();
    } catch (error) {
        next(new ErrorAutenticacion(error.message || 'Token inválido'));
    }
};

/**
 * Middleware que verifica roles específicos
 */
export const requerirRol = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.usuario) {
            return next(new ErrorAutenticacion('Usuario no autenticado'));
        }

        if (!rolesPermitidos.includes(req.usuario.rol)) {
            return res.status(403).json({
                exito: false,
                mensaje: 'No tienes permisos para realizar esta acción',
            });
        }

        next();
    };
};

/**
 * Middleware opcional de autenticación (no falla si no hay token)
 */
export const autenticacionOpcional = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const payload = servicioJWT.verificar(token);
            req.usuario = {
                id: payload.id,
                email: payload.email,
                rol: payload.rol,
            };
        }

        next();
    } catch (error) {
        // Si hay error, simplemente continuamos sin usuario
        next();
    }
};

export default { requerirAutenticacion, requerirRol, autenticacionOpcional };
