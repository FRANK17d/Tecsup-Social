/**
 * Caso de Uso: Reaccionar a Publicación - Capa de Aplicación
 */

import { RecursoNoEncontrado } from '../../../dominio/excepciones/ExcepcionDominio.js';

export class ReaccionarPublicacion {
    constructor({ publicacionRepositorio }) {
        this.publicacionRepositorio = publicacionRepositorio;
    }

    /**
     * Agrega o actualiza una reacción
     */
    async ejecutar({ publicacionId, usuarioId, tipo = 'me_gusta' }) {
        const publicacion = await this.publicacionRepositorio.buscarPorId(publicacionId);
        if (!publicacion) {
            throw new RecursoNoEncontrado('Publicación', publicacionId);
        }

        await this.publicacionRepositorio.agregarReaccion(publicacionId, usuarioId, tipo);

        return { exito: true, tipo };
    }

    /**
     * Elimina una reacción
     */
    async quitar({ publicacionId, usuarioId }) {
        const publicacion = await this.publicacionRepositorio.buscarPorId(publicacionId);
        if (!publicacion) {
            throw new RecursoNoEncontrado('Publicación', publicacionId);
        }

        await this.publicacionRepositorio.quitarReaccion(publicacionId, usuarioId);

        return { exito: true };
    }
}

export default ReaccionarPublicacion;
