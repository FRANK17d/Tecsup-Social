/**
 * Caso de Uso: Restablecer Contraseña
 * 
 * Valida token y actualiza la contraseña del usuario.
 */

export default class RestablecerContrasena {
    constructor({ usuarioRepositorio, servicioHash }) {
        this.usuarioRepositorio = usuarioRepositorio;
        this.servicioHash = servicioHash;
    }

    async ejecutar({ token, nuevaContrasena }) {
        // Validar datos
        if (!token) {
            throw { status: 400, mensaje: 'El token de recuperación es requerido' };
        }

        if (!nuevaContrasena || nuevaContrasena.length < 6) {
            throw { status: 400, mensaje: 'La contraseña debe tener al menos 6 caracteres' };
        }

        // Buscar usuario por token
        const usuario = await this.usuarioRepositorio.buscarPorTokenRecuperacion(token);

        if (!usuario) {
            throw { status: 400, mensaje: 'El enlace de recuperación es inválido o ha expirado' };
        }

        // Verificar que el token no haya expirado
        if (new Date() > new Date(usuario.tokenRecuperacionExpira)) {
            throw { status: 400, mensaje: 'El enlace de recuperación ha expirado' };
        }

        // Hashear nueva contraseña
        const contrasenaHasheada = await this.servicioHash.hashear(nuevaContrasena);

        // Actualizar contraseña y limpiar token
        await this.usuarioRepositorio.actualizarContrasena(usuario.id, contrasenaHasheada);
        await this.usuarioRepositorio.limpiarTokenRecuperacion(usuario.id);

        return {
            mensaje: 'Tu contraseña ha sido actualizada exitosamente',
        };
    }
}
