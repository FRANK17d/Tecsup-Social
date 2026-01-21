/**
 * Cliente API - Capa de Infraestructura (Frontend)
 * 
 * Maneja las peticiones HTTP al backend.
 */

const URL_BASE = import.meta.env.VITE_API_URL;

/**
 * Obtiene el token almacenado
 */
const obtenerToken = () => {
    return localStorage.getItem('token');
};

/**
 * Realiza una petición al API
 */
const peticion = async (endpoint, opciones = {}) => {
    const url = `${URL_BASE}${endpoint}`;
    const token = obtenerToken();

    const config = {
        ...opciones,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...opciones.headers,
        },
    };

    if (opciones.body && typeof opciones.body === 'object') {
        config.body = JSON.stringify(opciones.body);
    }

    try {
        const respuesta = await fetch(url, config);
        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw {
                status: respuesta.status,
                ...datos,
            };
        }

        return datos;
    } catch (error) {
        if (error.status) throw error;
        throw {
            status: 0,
            mensaje: 'Error de conexión con el servidor',
        };
    }
};

export const clienteApi = {
    // ==========================================
    // USUARIOS
    // ==========================================

    async registrar(datos) {
        return peticion('/usuarios/registro', {
            method: 'POST',
            body: datos,
        });
    },

    async iniciarSesion(datos) {
        const respuesta = await peticion('/usuarios/login', {
            method: 'POST',
            body: datos,
        });

        if (respuesta.datos?.token) {
            localStorage.setItem('token', respuesta.datos.token);
        }

        return respuesta;
    },

    async cerrarSesion() {
        localStorage.removeItem('token');
    },

    async obtenerPerfil() {
        return peticion('/usuarios/perfil');
    },

    async obtenerUsuario(id) {
        return peticion(`/usuarios/${id}`);
    },

    async listarUsuarios() {
        return peticion('/usuarios');
    },

    async solicitarRecuperacion(email) {
        return peticion('/usuarios/recuperar-contrasena', {
            method: 'POST',
            body: { email },
        });
    },

    async restablecerContrasena(token, nuevaContrasena) {
        return peticion('/usuarios/restablecer-contrasena', {
            method: 'POST',
            body: { token, nuevaContrasena },
        });
    },

    async loginConGoogle(tokenGoogle) {
        const respuesta = await peticion('/usuarios/google', {
            method: 'POST',
            body: { tokenGoogle },
        });

        if (respuesta.datos?.token) {
            localStorage.setItem('token', respuesta.datos.token);
        }

        return respuesta;
    },

    // ==========================================
    // PUBLICACIONES
    // ==========================================

    async crearPublicacion(datos) {
        return peticion('/publicaciones', {
            method: 'POST',
            body: datos,
        });
    },

    async listarPublicaciones(pagina = 1, limite = 10) {
        return peticion(`/publicaciones?pagina=${pagina}&limite=${limite}`);
    },

    async obtenerPublicacion(id) {
        return peticion(`/publicaciones/${id}`);
    },

    async eliminarPublicacion(id) {
        return peticion(`/publicaciones/${id}`, {
            method: 'DELETE',
        });
    },

    async reaccionar(publicacionId, tipo = 'me_gusta') {
        return peticion(`/publicaciones/${publicacionId}/reaccion`, {
            method: 'POST',
            body: { tipo },
        });
    },

    async quitarReaccion(publicacionId) {
        return peticion(`/publicaciones/${publicacionId}/reaccion`, {
            method: 'DELETE',
        });
    },

    async agregarComentario(publicacionId, contenido) {
        return peticion(`/publicaciones/${publicacionId}/comentarios`, {
            method: 'POST',
            body: { contenido },
        });
    },
};

export default clienteApi;
