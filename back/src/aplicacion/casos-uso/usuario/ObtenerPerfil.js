/**
 * Caso de Uso: Obtener Perfil - Capa de Aplicación
 * 
 * Obtiene el perfil de un usuario por su ID.
 */

import { RecursoNoEncontrado } from '../../../dominio/excepciones/ExcepcionDominio.js';

export class ObtenerPerfil {
    constructor({ usuarioRepositorio }) {
        this.usuarioRepositorio = usuarioRepositorio;
    }

    /**
     * Ejecuta el caso de uso
     * @param {string} usuarioId - ID del usuario
     * @returns {Promise<Object>} Datos públicos del usuario
     */
    async ejecutar(usuarioId) {
        const usuario = await this.usuarioRepositorio.buscarPorId(usuarioId);

        if (!usuario) {
            throw new RecursoNoEncontrado('Usuario', usuarioId);
        }

        return usuario.aObjetoPublico();
    }
}

export default ObtenerPerfil;
