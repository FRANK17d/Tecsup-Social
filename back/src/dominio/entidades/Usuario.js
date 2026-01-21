/**
 * Entidad Usuario - Capa de Dominio
 * 
 * Representa un usuario del sistema con validaciones de negocio.
 * Principio: Single Responsibility - Solo representa y valida datos de usuario
 */

export class Usuario {
    constructor({
        id = null,
        nombre,
        email,
        contrasena,
        rol = 'estudiante', // 'estudiante', 'profesor', 'administrador'
        avatar = null,
        fechaCreacion = new Date(),
        activo = true,
    }) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.contrasena = contrasena;
        this.rol = rol;
        this.avatar = avatar;
        this.fechaCreacion = fechaCreacion;
        this.activo = activo;
    }

    /**
     * Valida que el email tenga formato correcto
     */
    static validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    /**
     * Valida que la contraseña cumpla requisitos mínimos
     */
    static validarContrasena(contrasena) {
        return contrasena && contrasena.length >= 6;
    }

    /**
     * Valida todos los campos requeridos
     */
    validar() {
        const errores = [];

        if (!this.nombre || this.nombre.trim().length < 2) {
            errores.push('El nombre debe tener al menos 2 caracteres');
        }

        if (!Usuario.validarEmail(this.email)) {
            errores.push('El email no tiene un formato válido');
        }

        if (!Usuario.validarContrasena(this.contrasena)) {
            errores.push('La contraseña debe tener al menos 6 caracteres');
        }

        const rolesValidos = ['estudiante', 'profesor', 'administrador'];
        if (!rolesValidos.includes(this.rol)) {
            errores.push('El rol no es válido');
        }

        return {
            esValido: errores.length === 0,
            errores,
        };
    }

    /**
     * Convierte a objeto plano (sin contraseña para respuestas)
     */
    aObjetoPublico() {
        return {
            id: this.id,
            nombre: this.nombre,
            email: this.email,
            rol: this.rol,
            avatar: this.avatar,
            fechaCreacion: this.fechaCreacion,
            activo: this.activo,
        };
    }
}

export default Usuario;
