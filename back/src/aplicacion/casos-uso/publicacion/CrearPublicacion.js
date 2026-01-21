/**
 * Caso de Uso: Crear Publicación - Capa de Aplicación
 */

import Publicacion from '../../../dominio/entidades/Publicacion.js';
import { ErrorValidacion } from '../../../dominio/excepciones/ExcepcionDominio.js';

export class CrearPublicacion {
    constructor({ publicacionRepositorio }) {
        this.publicacionRepositorio = publicacionRepositorio;
    }

    /**
     * Ejecuta el caso de uso
     * @param {Object} datos
     * @returns {Promise<Publicacion>}
     */
    async ejecutar({ autorId, contenido, imagenes = [] }) {
        const publicacion = new Publicacion({
            autorId,
            contenido,
            imagenes,
        });

        const validacion = publicacion.validar();
        if (!validacion.esValido) {
            throw new ErrorValidacion(validacion.errores);
        }

        const publicacionCreada = await this.publicacionRepositorio.crear(publicacion);
        return publicacionCreada;
    }
}

export default CrearPublicacion;
