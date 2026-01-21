/**
 * Caso de Uso: Autenticar con Google
 * 
 * Verifica token de Google, crea usuario si no existe, y retorna JWT.
 */

import Usuario from '../../../dominio/entidades/Usuario.js';

export default class AutenticarConGoogle {
    constructor({ usuarioRepositorio, servicioGoogle, servicioJWT }) {
        this.usuarioRepositorio = usuarioRepositorio;
        this.servicioGoogle = servicioGoogle;
        this.servicioJWT = servicioJWT;
    }

    async ejecutar({ tokenGoogle }) {
        // Validar token
        if (!tokenGoogle) {
            throw { status: 400, mensaje: 'El token de Google es requerido' };
        }

        // Verificar token con Google
        const datosGoogle = await this.servicioGoogle.verificarToken(tokenGoogle);

        // Opcional: Validar dominio institucional
        // if (!this.servicioGoogle.validarDominioInstitucional(datosGoogle.email)) {
        //     throw { status: 403, mensaje: 'Solo se permiten correos institucionales de Tecsup' };
        // }

        // Buscar si el usuario ya existe
        let usuario = await this.usuarioRepositorio.buscarPorEmail(datosGoogle.email);

        if (!usuario) {
            // Crear nuevo usuario automáticamente
            const nuevoUsuario = new Usuario({
                nombre: datosGoogle.nombre,
                email: datosGoogle.email,
                contrasena: null, // Los usuarios de Google no tienen contraseña local
                foto: datosGoogle.foto,
                googleId: datosGoogle.googleId,
                emailVerificado: datosGoogle.emailVerificado,
            });

            usuario = await this.usuarioRepositorio.crear(nuevoUsuario);
        } else {
            // Actualizar googleId si no lo tiene
            if (!usuario.googleId) {
                await this.usuarioRepositorio.actualizarGoogleId(usuario.id, datosGoogle.googleId);
            }
        }

        // Generar JWT del sistema
        const token = this.servicioJWT.generar({
            id: usuario.id,
            email: usuario.email,
        });

        return {
            usuario: usuario.aObjetoPublico ? usuario.aObjetoPublico() : usuario,
            token,
        };
    }
}
