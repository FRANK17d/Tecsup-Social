/**
 * Caso de Uso: Obtener Publicaciones - Capa de Aplicación
 */

export class ObtenerPublicaciones {
    constructor({ publicacionRepositorio, usuarioRepositorio }) {
        this.publicacionRepositorio = publicacionRepositorio;
        this.usuarioRepositorio = usuarioRepositorio;
    }

    /**
     * Ejecuta el caso de uso
     * @param {Object} opciones - Opciones de filtrado y paginación
     * @returns {Promise<Array>}
     */
    async ejecutar({ pagina = 1, limite = 10, autorId = null } = {}) {
        let publicaciones;

        if (autorId) {
            publicaciones = await this.publicacionRepositorio.listarPorAutor(autorId);
        } else {
            publicaciones = await this.publicacionRepositorio.listarTodas({
                pagina,
                limite,
            });
        }

        // Enriquecer con datos del autor
        const publicacionesConAutor = await Promise.all(
            publicaciones.map(async (pub) => {
                const autor = await this.usuarioRepositorio.buscarPorId(pub.autorId);
                return {
                    ...pub.aObjeto(),
                    autor: autor ? autor.aObjetoPublico() : null,
                };
            })
        );

        return publicacionesConAutor;
    }
}

export default ObtenerPublicaciones;
