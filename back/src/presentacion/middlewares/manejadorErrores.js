/**
 * Middleware Manejador de Errores - Capa de Presentación
 * 
 * Centraliza el manejo de errores para respuestas consistentes.
 */

import {
    ExcepcionDominio,
    RecursoNoEncontrado,
    ErrorValidacion,
    ErrorAutenticacion,
    ErrorAutorizacion,
    RecursoDuplicado,
} from '../../dominio/excepciones/ExcepcionDominio.js';

/**
 * Mapea tipos de excepción a códigos HTTP
 */
const obtenerCodigoHTTP = (error) => {
    if (error instanceof RecursoNoEncontrado) return 404;
    if (error instanceof ErrorValidacion) return 400;
    if (error instanceof ErrorAutenticacion) return 401;
    if (error instanceof ErrorAutorizacion) return 403;
    if (error instanceof RecursoDuplicado) return 409;
    if (error instanceof ExcepcionDominio) return 400;
    return 500;
};

/**
 * Middleware de manejo de errores
 */
export const manejadorErrores = (error, req, res, next) => {
    console.error('❌ Error:', error.message);

    // Errores de dominio conocidos
    if (error instanceof ExcepcionDominio) {
        const codigoHTTP = obtenerCodigoHTTP(error);

        const respuesta = {
            exito: false,
            codigo: error.codigo,
            mensaje: error.message,
        };

        // Agregar errores de validación si existen
        if (error instanceof ErrorValidacion) {
            respuesta.errores = error.errores;
        }

        return res.status(codigoHTTP).json(respuesta);
    }

    // Errores de MongoDB (ObjectId inválido, etc.)
    if (error.name === 'BSONError' || error.name === 'BSONTypeError') {
        return res.status(400).json({
            exito: false,
            codigo: 'ID_INVALIDO',
            mensaje: 'El ID proporcionado no es válido',
        });
    }

    // Errores no manejados (500)
    const esProduccion = process.env.NODE_ENV === 'production';

    res.status(500).json({
        exito: false,
        codigo: 'ERROR_INTERNO',
        mensaje: esProduccion ? 'Error interno del servidor' : error.message,
        ...(esProduccion ? {} : { stack: error.stack }),
    });
};

/**
 * Middleware para rutas no encontradas
 */
export const rutaNoEncontrada = (req, res) => {
    res.status(404).json({
        exito: false,
        codigo: 'RUTA_NO_ENCONTRADA',
        mensaje: `La ruta ${req.method} ${req.originalUrl} no existe`,
    });
};

export default { manejadorErrores, rutaNoEncontrada };
