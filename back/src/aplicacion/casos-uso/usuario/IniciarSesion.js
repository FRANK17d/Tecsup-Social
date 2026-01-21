/**
 * Caso de Uso: Iniciar Sesión - Capa de Aplicación
 * 
 * Maneja la autenticación de usuarios.
 */

import { ErrorAutenticacion } from '../../../dominio/excepciones/ExcepcionDominio.js';

export class IniciarSesion {
    /**
     * @param {Object} dependencias
     * @param {IUsuarioRepositorio} dependencias.usuarioRepositorio
     * @param {Object} dependencias.servicioHash - Servicio para verificar contraseñas
     * @param {Object} dependencias.servicioJWT - Servicio para generar tokens
     */
    constructor({ usuarioRepositorio, servicioHash, servicioJWT }) {
        this.usuarioRepositorio = usuarioRepositorio;
        this.servicioHash = servicioHash;
        this.servicioJWT = servicioJWT;
    }

    /**
     * Ejecuta el caso de uso
     * @param {Object} credenciales
     * @param {string} credenciales.email
     * @param {string} credenciales.contrasena
     * @returns {Promise<{usuario: Object, token: string}>}
     */
    async ejecutar({ email, contrasena }) {
        // 1. Buscar usuario por email
        const usuario = await this.usuarioRepositorio.buscarPorEmail(
            email.toLowerCase().trim()
        );

        if (!usuario) {
            throw new ErrorAutenticacion('Email o contraseña incorrectos');
        }

        // 2. Verificar que el usuario esté activo
        if (!usuario.activo) {
            throw new ErrorAutenticacion('Esta cuenta ha sido desactivada');
        }

        // 3. Verificar contraseña
        const contrasenaValida = await this.servicioHash.comparar(
            contrasena,
            usuario.contrasena
        );

        if (!contrasenaValida) {
            throw new ErrorAutenticacion('Email o contraseña incorrectos');
        }

        // 4. Generar token JWT
        const token = this.servicioJWT.generar({
            id: usuario.id,
            email: usuario.email,
            rol: usuario.rol,
        });

        // 5. Retornar usuario (sin contraseña) y token
        return {
            usuario: usuario.aObjetoPublico(),
            token,
        };
    }
}

export default IniciarSesion;
