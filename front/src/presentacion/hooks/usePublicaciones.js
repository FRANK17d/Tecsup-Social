/**
 * Hook usePublicaciones - Capa de Presentación
 * 
 * Maneja la lógica de publicaciones.
 */

import { useState, useCallback } from 'react';
import clienteApi from '../../infraestructura/api/clienteApi.js';
import Publicacion from '../../dominio/entidades/Publicacion.js';

export function usePublicaciones() {
    const [publicaciones, setPublicaciones] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const cargarPublicaciones = useCallback(async (pagina = 1) => {
        setCargando(true);
        setError(null);
        try {
            const respuesta = await clienteApi.listarPublicaciones(pagina);
            const pubs = respuesta.datos.map(p => new Publicacion(p));
            setPublicaciones(pubs);
        } catch (error) {
            setError(error.mensaje || 'Error al cargar publicaciones');
        } finally {
            setCargando(false);
        }
    }, []);

    const crearPublicacion = async (contenido, imagenes = []) => {
        try {
            const respuesta = await clienteApi.crearPublicacion({ contenido, imagenes });
            const nuevaPublicacion = new Publicacion(respuesta.datos);
            setPublicaciones(prev => [nuevaPublicacion, ...prev]);
            return { exito: true, publicacion: nuevaPublicacion };
        } catch (error) {
            return { exito: false, error: error.mensaje };
        }
    };

    const eliminarPublicacion = async (id) => {
        try {
            await clienteApi.eliminarPublicacion(id);
            setPublicaciones(prev => prev.filter(p => p.id !== id));
            return { exito: true };
        } catch (error) {
            return { exito: false, error: error.mensaje };
        }
    };

    const reaccionar = async (publicacionId) => {
        try {
            await clienteApi.reaccionar(publicacionId);
            // Recargar para obtener datos actualizados
            await cargarPublicaciones();
            return { exito: true };
        } catch (error) {
            return { exito: false, error: error.mensaje };
        }
    };

    const comentar = async (publicacionId, contenido) => {
        try {
            await clienteApi.agregarComentario(publicacionId, contenido);
            await cargarPublicaciones();
            return { exito: true };
        } catch (error) {
            return { exito: false, error: error.mensaje };
        }
    };

    return {
        publicaciones,
        cargando,
        error,
        cargarPublicaciones,
        crearPublicacion,
        eliminarPublicacion,
        reaccionar,
        comentar,
    };
}

export default usePublicaciones;
