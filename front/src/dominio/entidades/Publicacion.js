/**
 * Entidad Publicacion - Capa de Dominio (Frontend)
 */

export class Publicacion {
    constructor({
        id,
        autorId,
        contenido,
        imagenes = [],
        reacciones = [],
        totalReacciones = {},
        comentarios = [],
        fechaCreacion,
        autor,
    }) {
        this.id = id;
        this.autorId = autorId;
        this.contenido = contenido;
        this.imagenes = imagenes;
        this.reacciones = reacciones;
        this.totalReacciones = totalReacciones;
        this.comentarios = comentarios;
        this.fechaCreacion = fechaCreacion ? new Date(fechaCreacion) : null;
        this.autor = autor;
    }

    /**
     * Obtiene el total de me gusta
     */
    obtenerTotalMeGusta() {
        return this.totalReacciones.me_gusta || 0;
    }

    /**
     * Verifica si un usuario reaccionó
     */
    usuarioReacciono(usuarioId) {
        return this.reacciones.some(r => r.usuarioId === usuarioId);
    }

    /**
     * Formatea la fecha de creación
     */
    obtenerFechaFormateada() {
        if (!this.fechaCreacion) return '';

        const ahora = new Date();
        const diff = ahora - this.fechaCreacion;
        const minutos = Math.floor(diff / 60000);
        const horas = Math.floor(diff / 3600000);
        const dias = Math.floor(diff / 86400000);

        if (minutos < 1) return 'Ahora mismo';
        if (minutos < 60) return `Hace ${minutos} min`;
        if (horas < 24) return `Hace ${horas}h`;
        if (dias < 7) return `Hace ${dias} días`;

        return this.fechaCreacion.toLocaleDateString('es-PE');
    }
}

export default Publicacion;
