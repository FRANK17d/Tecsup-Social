/**
 * Almacenamiento Local - Capa de Infraestructura (Frontend)
 * 
 * Abstracción para LocalStorage.
 */

export const almacenamientoLocal = {
    guardar(clave, valor) {
        try {
            localStorage.setItem(clave, JSON.stringify(valor));
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }
    },

    obtener(clave) {
        try {
            const item = localStorage.getItem(clave);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error al leer de localStorage:', error);
            return null;
        }
    },

    eliminar(clave) {
        try {
            localStorage.removeItem(clave);
        } catch (error) {
            console.error('Error al eliminar de localStorage:', error);
        }
    },

    limpiar() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error al limpiar localStorage:', error);
        }
    },
};

export default almacenamientoLocal;
