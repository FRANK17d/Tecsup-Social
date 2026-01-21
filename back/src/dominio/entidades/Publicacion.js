/**
 * Entidad Publicacion - Capa de Dominio
 * 
 * Representa una publicación en la red social.
 * Principio: Single Responsibility - Solo representa y valida datos de publicación
 */

export class Publicacion {
    constructor({
        id = null,
        autorId,
        contenido,
        imagenes = [],
        reacciones = [],
        comentarios = [],
        fechaCreacion = new Date(),
        fechaActualizacion = null,
        activo = true,
    }) {
        this.id = id;
        this.autorId = autorId;
        this.contenido = contenido;
        this.imagenes = imagenes;
        this.reacciones = reacciones;
        this.comentarios = comentarios;
        this.fechaCreacion = fechaCreacion;
        this.fechaActualizacion = fechaActualizacion;
        this.activo = activo;
    }

    /**
     * Valida todos los campos requeridos
     */
    validar() {
        const errores = [];

        if (!this.autorId) {
            errores.push('El autor es obligatorio');
        }

        if (!this.contenido || this.contenido.trim().length < 1) {
            errores.push('El contenido no puede estar vacío');
        }

        if (this.contenido && this.contenido.length > 5000) {
            errores.push('El contenido no puede exceder 5000 caracteres');
        }

        return {
            esValido: errores.length === 0,
            errores,
        };
    }

    /**
     * Agrega una reacción a la publicación
     */
    agregarReaccion(usuarioId, tipo = 'me_gusta') {
        const reaccionExistente = this.reacciones.find(
            (r) => r.usuarioId === usuarioId
        );

        if (reaccionExistente) {
            // Si ya reaccionó, actualiza el tipo
            reaccionExistente.tipo = tipo;
        } else {
            this.reacciones.push({
                usuarioId,
                tipo,
                fecha: new Date(),
            });
        }
    }

    /**
     * Elimina la reacción de un usuario
     */
    quitarReaccion(usuarioId) {
        this.reacciones = this.reacciones.filter(
            (r) => r.usuarioId !== usuarioId
        );
    }

    /**
     * Cuenta las reacciones por tipo
     */
    contarReacciones() {
        return this.reacciones.reduce((acc, r) => {
            acc[r.tipo] = (acc[r.tipo] || 0) + 1;
            return acc;
        }, {});
    }

    /**
     * Convierte a objeto plano
     */
    aObjeto() {
        return {
            id: this.id,
            autorId: this.autorId,
            contenido: this.contenido,
            imagenes: this.imagenes,
            reacciones: this.reacciones,
            totalReacciones: this.contarReacciones(),
            comentarios: this.comentarios,
            fechaCreacion: this.fechaCreacion,
            fechaActualizacion: this.fechaActualizacion,
            activo: this.activo,
        };
    }
}

export default Publicacion;
