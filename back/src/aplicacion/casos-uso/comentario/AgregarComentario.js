/**
 * Caso de Uso: Agregar Comentario - Capa de Aplicación
 */

import Comentario from '../../../dominio/entidades/Comentario.js';
import { ErrorValidacion, RecursoNoEncontrado } from '../../../dominio/excepciones/ExcepcionDominio.js';

export class AgregarComentario {
    constructor({ publicacionRepositorio }) {
        this.publicacionRepositorio = publicacionRepositorio;
    }

    /**
     * Ejecuta el caso de uso
     */
    async ejecutar({ publicacionId, autorId, contenido }) {
        // Verificar que la publicación existe
        const publicacion = await this.publicacionRepositorio.buscarPorId(publicacionId);
        if (!publicacion) {
            throw new RecursoNoEncontrado('Publicación', publicacionId);
        }

        // Crear y validar comentario
        const comentario = new Comentario({
            publicacionId,
            autorId,
            contenido,
        });

        const validacion = comentario.validar();
        if (!validacion.esValido) {
            throw new ErrorValidacion(validacion.errores);
        }

        // Agregar comentario a la publicación
        const comentarioCreado = await this.publicacionRepositorio.agregarComentario(
            publicacionId,
            comentario
        );

        return comentarioCreado;
    }
}

export default AgregarComentario;
