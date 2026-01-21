/**
 * Servicio JWT - Capa de Infraestructura
 * 
 * Maneja la generación y verificación de tokens JWT.
 */

import jwt from 'jsonwebtoken';
import configuracion from '../../../configuracion/variables.js';

export const servicioJWT = {
    /**
     * Genera un token JWT
     * @param {Object} payload - Datos a incluir en el token
     * @returns {string} Token JWT
     */
    generar(payload) {
        return jwt.sign(payload, configuracion.jwt.secreto, {
            expiresIn: configuracion.jwt.expiracion,
        });
    },

    /**
     * Verifica y decodifica un token JWT
     * @param {string} token - Token a verificar
     * @returns {Object} Payload decodificado
     * @throws {Error} Si el token es inválido
     */
    verificar(token) {
        try {
            return jwt.verify(token, configuracion.jwt.secreto);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new Error('El token ha expirado');
            }
            throw new Error('Token inválido');
        }
    },

    /**
     * Decodifica un token sin verificar (útil para debug)
     * @param {string} token
     * @returns {Object|null}
     */
    decodificar(token) {
        return jwt.decode(token);
    },
};

export default servicioJWT;
