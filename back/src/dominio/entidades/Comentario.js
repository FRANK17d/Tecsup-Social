/**
 * Entidad Comentario - Capa de Dominio
 * 
 * Representa un comentario en una publicación.
 */

export class Comentario {
    constructor({
        id = null,
        publicacionId,
        autorId,
        contenido,
        fechaCreacion = new Date(),
        activo = true,
    }) {
        this.id = id;
        this.publicacionId = publicacionId;
        this.autorId = autorId;
        this.contenido = contenido;
        this.fechaCreacion = fechaCreacion;
        this.activo = activo;
    }

    /**
     * Valida todos los campos requeridos
     */
    validar() {
        const errores = [];

        if (!this.publicacionId) {
            errores.push('La publicación es obligatoria');
        }

        if (!this.autorId) {
            errores.push('El autor es obligatorio');
        }

        if (!this.contenido || this.contenido.trim().length < 1) {
            errores.push('El contenido no puede estar vacío');
        }

        if (this.contenido && this.contenido.length > 1000) {
            errores.push('El comentario no puede exceder 1000 caracteres');
        }

        return {
            esValido: errores.length === 0,
            errores,
        };
    }

    /**
     * Convierte a objeto plano
     */
    aObjeto() {
        return {
            id: this.id,
            publicacionId: this.publicacionId,
            autorId: this.autorId,
            contenido: this.contenido,
            fechaCreacion: this.fechaCreacion,
            activo: this.activo,
        };
    }
}

export default Comentario;
