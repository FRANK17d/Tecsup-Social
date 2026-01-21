/**
 * Entidad Usuario - Capa de Dominio (Frontend)
 * 
 * Representa un usuario en el cliente.
 */

export class Usuario {
    constructor({
        id,
        nombre,
        email,
        rol,
        avatar,
        fechaCreacion,
        activo,
    }) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.rol = rol;
        this.avatar = avatar;
        this.fechaCreacion = fechaCreacion ? new Date(fechaCreacion) : null;
        this.activo = activo;
    }

    /**
     * Obtiene las iniciales del nombre
     */
    obtenerIniciales() {
        return this.nombre
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }

    /**
     * Verifica si es profesor
     */
    esProfesor() {
        return this.rol === 'profesor';
    }

    /**
     * Verifica si es administrador
     */
    esAdmin() {
        return this.rol === 'administrador';
    }
}

export default Usuario;
