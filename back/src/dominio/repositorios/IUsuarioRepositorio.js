/**
 * Interface IUsuarioRepositorio - Capa de Dominio
 * 
 * Define el contrato que deben implementar los repositorios de usuario.
 * Principio: Interface Segregation - Interfaces específicas por dominio
 * Principio: Dependency Inversion - Los casos de uso dependen de esta abstracción
 */

/**
 * @typedef {Object} IUsuarioRepositorio
 * @property {function(Usuario): Promise<Usuario>} crear - Crea un nuevo usuario
 * @property {function(string): Promise<Usuario|null>} buscarPorId - Busca usuario por ID
 * @property {function(string): Promise<Usuario|null>} buscarPorEmail - Busca usuario por email
 * @property {function(): Promise<Array<Usuario>>} listarTodos - Lista todos los usuarios
 * @property {function(string, Object): Promise<Usuario|null>} actualizar - Actualiza un usuario
 * @property {function(string): Promise<boolean>} eliminar - Elimina un usuario (soft delete)
 */

export class IUsuarioRepositorio {
    async crear(usuario) {
        throw new Error('Método crear() no implementado');
    }

    async buscarPorId(id) {
        throw new Error('Método buscarPorId() no implementado');
    }

    async buscarPorEmail(email) {
        throw new Error('Método buscarPorEmail() no implementado');
    }

    async listarTodos() {
        throw new Error('Método listarTodos() no implementado');
    }

    async actualizar(id, datos) {
        throw new Error('Método actualizar() no implementado');
    }

    async eliminar(id) {
        throw new Error('Método eliminar() no implementado');
    }
}

export default IUsuarioRepositorio;
