/**
 * Interface IPublicacionRepositorio - Capa de Dominio
 * 
 * Define el contrato para repositorios de publicaciones.
 */

export class IPublicacionRepositorio {
    async crear(publicacion) {
        throw new Error('Método crear() no implementado');
    }

    async buscarPorId(id) {
        throw new Error('Método buscarPorId() no implementado');
    }

    async listarTodas(opciones = {}) {
        throw new Error('Método listarTodas() no implementado');
    }

    async listarPorAutor(autorId) {
        throw new Error('Método listarPorAutor() no implementado');
    }

    async actualizar(id, datos) {
        throw new Error('Método actualizar() no implementado');
    }

    async eliminar(id) {
        throw new Error('Método eliminar() no implementado');
    }

    async agregarComentario(publicacionId, comentario) {
        throw new Error('Método agregarComentario() no implementado');
    }

    async agregarReaccion(publicacionId, usuarioId, tipo) {
        throw new Error('Método agregarReaccion() no implementado');
    }

    async quitarReaccion(publicacionId, usuarioId) {
        throw new Error('Método quitarReaccion() no implementado');
    }
}

export default IPublicacionRepositorio;
