/**
 * Controlador Publicación - Capa de Presentación
 */

import CrearPublicacion from '../../aplicacion/casos-uso/publicacion/CrearPublicacion.js';
import ObtenerPublicaciones from '../../aplicacion/casos-uso/publicacion/ObtenerPublicaciones.js';
import ReaccionarPublicacion from '../../aplicacion/casos-uso/publicacion/ReaccionarPublicacion.js';
import AgregarComentario from '../../aplicacion/casos-uso/comentario/AgregarComentario.js';
import PublicacionRepositorioMongo from '../../infraestructura/repositorios/PublicacionRepositorioMongo.js';
import UsuarioRepositorioMongo from '../../infraestructura/repositorios/UsuarioRepositorioMongo.js';

const publicacionRepositorio = new PublicacionRepositorioMongo();
const usuarioRepositorio = new UsuarioRepositorioMongo();

export const controladorPublicacion = {
    /**
     * POST /api/publicaciones
     */
    async crear(req, res, next) {
        try {
            const casoUso = new CrearPublicacion({ publicacionRepositorio });

            const publicacion = await casoUso.ejecutar({
                autorId: req.usuario.id,
                contenido: req.body.contenido,
                imagenes: req.body.imagenes || [],
            });

            res.status(201).json({
                exito: true,
                mensaje: 'Publicación creada exitosamente',
                datos: publicacion.aObjeto(),
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/publicaciones
     */
    async listar(req, res, next) {
        try {
            const { pagina = 1, limite = 10, autor } = req.query;

            const casoUso = new ObtenerPublicaciones({
                publicacionRepositorio,
                usuarioRepositorio,
            });

            const publicaciones = await casoUso.ejecutar({
                pagina: parseInt(pagina, 10),
                limite: parseInt(limite, 10),
                autorId: autor || null,
            });

            res.json({
                exito: true,
                datos: publicaciones,
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * GET /api/publicaciones/:id
     */
    async obtener(req, res, next) {
        try {
            const publicacion = await publicacionRepositorio.buscarPorId(req.params.id);

            if (!publicacion) {
                return res.status(404).json({
                    exito: false,
                    mensaje: 'Publicación no encontrada',
                });
            }

            // Obtener datos del autor
            const autor = await usuarioRepositorio.buscarPorId(publicacion.autorId);

            res.json({
                exito: true,
                datos: {
                    ...publicacion.aObjeto(),
                    autor: autor ? autor.aObjetoPublico() : null,
                },
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * DELETE /api/publicaciones/:id
     */
    async eliminar(req, res, next) {
        try {
            const publicacion = await publicacionRepositorio.buscarPorId(req.params.id);

            if (!publicacion) {
                return res.status(404).json({
                    exito: false,
                    mensaje: 'Publicación no encontrada',
                });
            }

            // Verificar que el usuario sea el autor o admin
            if (publicacion.autorId !== req.usuario.id && req.usuario.rol !== 'administrador') {
                return res.status(403).json({
                    exito: false,
                    mensaje: 'No tienes permisos para eliminar esta publicación',
                });
            }

            await publicacionRepositorio.eliminar(req.params.id);

            res.json({
                exito: true,
                mensaje: 'Publicación eliminada',
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * POST /api/publicaciones/:id/reaccion
     */
    async reaccionar(req, res, next) {
        try {
            const casoUso = new ReaccionarPublicacion({ publicacionRepositorio });

            await casoUso.ejecutar({
                publicacionId: req.params.id,
                usuarioId: req.usuario.id,
                tipo: req.body.tipo || 'me_gusta',
            });

            res.json({
                exito: true,
                mensaje: 'Reacción agregada',
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * DELETE /api/publicaciones/:id/reaccion
     */
    async quitarReaccion(req, res, next) {
        try {
            const casoUso = new ReaccionarPublicacion({ publicacionRepositorio });

            await casoUso.quitar({
                publicacionId: req.params.id,
                usuarioId: req.usuario.id,
            });

            res.json({
                exito: true,
                mensaje: 'Reacción eliminada',
            });
        } catch (error) {
            next(error);
        }
    },

    /**
     * POST /api/publicaciones/:id/comentarios
     */
    async agregarComentario(req, res, next) {
        try {
            const casoUso = new AgregarComentario({ publicacionRepositorio });

            const comentario = await casoUso.ejecutar({
                publicacionId: req.params.id,
                autorId: req.usuario.id,
                contenido: req.body.contenido,
            });

            res.status(201).json({
                exito: true,
                mensaje: 'Comentario agregado',
                datos: comentario,
            });
        } catch (error) {
            next(error);
        }
    },
};

export default controladorPublicacion;
