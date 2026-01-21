/**
 * Servicio Hash - Capa de Infraestructura
 * 
 * Maneja el hash y verificación de contraseñas.
 */

import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export const servicioHash = {
    /**
     * Hashea una contraseña
     * @param {string} contrasena - Contraseña en texto plano
     * @returns {Promise<string>} Contraseña hasheada
     */
    async hashear(contrasena) {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        return bcrypt.hash(contrasena, salt);
    },

    /**
     * Compara una contraseña con su hash
     * @param {string} contrasena - Contraseña en texto plano
     * @param {string} hash - Hash almacenado
     * @returns {Promise<boolean>} true si coinciden
     */
    async comparar(contrasena, hash) {
        return bcrypt.compare(contrasena, hash);
    },
};

export default servicioHash;
