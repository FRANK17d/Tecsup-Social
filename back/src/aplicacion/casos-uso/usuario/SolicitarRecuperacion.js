/**
 * Caso de Uso: Solicitar Recuperación de Contraseña
 * 
 * Genera un token único y envía email de recuperación.
 */

import crypto from 'crypto';

export default class SolicitarRecuperacion {
    constructor({ usuarioRepositorio, servicioEmail }) {
        this.usuarioRepositorio = usuarioRepositorio;
        this.servicioEmail = servicioEmail;
    }

    async ejecutar({ email }) {
        // Validar email
        if (!email) {
            throw { status: 400, mensaje: 'El correo electrónico es requerido' };
        }

        // Buscar usuario por email
        const usuario = await this.usuarioRepositorio.buscarPorEmail(email);

        if (!usuario) {
            // Por seguridad, no revelamos si el email existe o no
            return {
                mensaje: 'Si el correo existe en nuestro sistema, recibirás un enlace de recuperación',
            };
        }

        // Generar token único
        const token = crypto.randomBytes(32).toString('hex');
        const expiracion = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

        // Guardar token en usuario
        await this.usuarioRepositorio.guardarTokenRecuperacion(usuario.id, token, expiracion);

        // Enviar email
        await this.servicioEmail.enviarRecuperacionContrasena(
            email,
            token,
            usuario.nombre
        );

        return {
            mensaje: 'Si el correo existe en nuestro sistema, recibirás un enlace de recuperación',
        };
    }
}
