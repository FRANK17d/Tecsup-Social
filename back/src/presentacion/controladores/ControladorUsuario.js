/**
 * Controlador Usuario - Capa de Presentación
 * 
 * Maneja las peticiones HTTP relacionadas con usuarios.
 */

import RegistrarUsuario from '../../aplicacion/casos-uso/usuario/RegistrarUsuario.js';
import IniciarSesion from '../../aplicacion/casos-uso/usuario/IniciarSesion.js';
import ObtenerPerfil from '../../aplicacion/casos-uso/usuario/ObtenerPerfil.js';
import SolicitarRecuperacion from '../../aplicacion/casos-uso/usuario/SolicitarRecuperacion.js';
import RestablecerContrasena from '../../aplicacion/casos-uso/usuario/RestablecerContrasena.js';
import AutenticarConGoogle from '../../aplicacion/casos-uso/usuario/AutenticarConGoogle.js';
import UsuarioRepositorioMongo from '../../infraestructura/repositorios/UsuarioRepositorioMongo.js';
import servicioHash from '../../infraestructura/servicios/ServicioHash.js';
import servicioJWT from '../../infraestructura/servicios/ServicioJWT.js';
import servicioEmail from '../../infraestructura/servicios/ServicioEmail.js';
import servicioGoogle from '../../infraestructura/servicios/ServicioGoogle.js';

// Instanciar dependencias
const usuarioRepositorio = new UsuarioRepositorioMongo();

export const controladorUsuario = {
    /**
     * POST /api/usuarios/registro
     */
    async registrar(req, res, next) {
        try {
            const casoUso = new RegistrarUsuario({
                usuarioRepositorio,
                servicioHash,
            });

            const usuario = await casoUso.ejecutar(req.body);

            res.status(201).json({
                exito: true,
                mensaje: 'Usuario registrado exitosamente',
                datos: usuario.aObjetoPublico(),
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * POST /api/usuarios/login
     */
    async iniciarSesion(req, res, next) {
        try {
            const casoUso = new IniciarSesion({
                usuarioRepositorio,
                servicioHash,
                servicioJWT,
            });

            const { usuario, token } = await casoUso.ejecutar(req.body);

            res.json({
                exito: true,
                mensaje: 'Inicio de sesión exitoso',
                datos: { usuario, token },
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/usuarios/perfil
     */
    async obtenerPerfilActual(req, res, next) {
        try {
            const casoUso = new ObtenerPerfil({ usuarioRepositorio });
            const perfil = await casoUso.ejecutar(req.usuario.id);

            res.json({
                exito: true,
                datos: perfil,
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/usuarios/:id
     */
    async obtenerPerfil(req, res, next) {
        try {
            const casoUso = new ObtenerPerfil({ usuarioRepositorio });
            const perfil = await casoUso.ejecutar(req.params.id);

            res.json({
                exito: true,
                datos: perfil,
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/usuarios
     */
    async listar(req, res, next) {
        try {
            const usuarios = await usuarioRepositorio.listarTodos();

            res.json({
                exito: true,
                datos: usuarios.map((u) => u.aObjetoPublico()),
            });
        } catch (error) {
            next(error);
        }
    },

    // ==========================================
    // RECUPERACIÓN DE CONTRASEÑA
    // ==========================================

    /**
     * POST /api/usuarios/recuperar-contrasena
     */
    async solicitarRecuperacion(req, res, next) {
        try {
            const casoUso = new SolicitarRecuperacion({
                usuarioRepositorio,
                servicioEmail,
            });

            const resultado = await casoUso.ejecutar(req.body);

            res.json({
                exito: true,
                mensaje: resultado.mensaje,
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * POST /api/usuarios/restablecer-contrasena
     */
    async restablecerContrasena(req, res, next) {
        try {
            const casoUso = new RestablecerContrasena({
                usuarioRepositorio,
                servicioHash,
            });

            const resultado = await casoUso.ejecutar(req.body);

            res.json({
                exito: true,
                mensaje: resultado.mensaje,
            });
        } catch (error) {
            next(error);
        }
    },

    // ==========================================
    // GOOGLE OAUTH
    // ==========================================

    /**
     * POST /api/usuarios/google
     */
    async autenticarConGoogle(req, res, next) {
        try {
            const casoUso = new AutenticarConGoogle({
                usuarioRepositorio,
                servicioGoogle,
                servicioJWT,
            });

            const { usuario, token } = await casoUso.ejecutar(req.body);

            res.json({
                exito: true,
                mensaje: 'Autenticación con Google exitosa',
                datos: { usuario, token },
            });
        } catch (error) {
            next(error);
        }
    },
};

export default controladorUsuario;
