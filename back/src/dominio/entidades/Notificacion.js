/**
 * Entidad Notificacion - Capa de Dominio
 * 
 * Representa una notificación del sistema.
 */

export class Notificacion {
    constructor({
        id = null,
        usuarioId,
        tipo, // 'nueva_publicacion', 'nuevo_comentario', 'nueva_reaccion', 'anuncio'
        mensaje,
        referenciaId = null, // ID de la publicación o comentario relacionado
        leida = false,
        fechaCreacion = new Date(),
    }) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.tipo = tipo;
        this.mensaje = mensaje;
        this.referenciaId = referenciaId;
        this.leida = leida;
        this.fechaCreacion = fechaCreacion;
    }

    /**
     * Marca la notificación como leída
     */
    marcarComoLeida() {
        this.leida = true;
    }

    /**
     * Convierte a objeto plano
     */
    aObjeto() {
        return {
            id: this.id,
            usuarioId: this.usuarioId,
            tipo: this.tipo,
            mensaje: this.mensaje,
            referenciaId: this.referenciaId,
            leida: this.leida,
            fechaCreacion: this.fechaCreacion,
        };
    }
}

export default Notificacion;
