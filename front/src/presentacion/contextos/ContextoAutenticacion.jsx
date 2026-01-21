/**
 * Contexto de Autenticación - Capa de Presentación
 * 
 * Maneja el estado global de autenticación.
 */

import { createContext, useContext, useState, useEffect } from 'react';
import clienteApi from '../../infraestructura/api/clienteApi.js';
import Usuario from '../../dominio/entidades/Usuario.js';

const ContextoAutenticacion = createContext(null);

export function ProveedorAutenticacion({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Verificar autenticación al cargar
    useEffect(() => {
        verificarAutenticacion();
    }, []);

    const verificarAutenticacion = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setCargando(false);
            return;
        }

        try {
            const respuesta = await clienteApi.obtenerPerfil();
            setUsuario(new Usuario(respuesta.datos));
        } catch (error) {
            // Token inválido o expirado
            localStorage.removeItem('token');
        } finally {
            setCargando(false);
        }
    };

    const iniciarSesion = async (email, contrasena) => {
        setError(null);
        try {
            const respuesta = await clienteApi.iniciarSesion({ email, contrasena });
            setUsuario(new Usuario(respuesta.datos.usuario));
            return { exito: true };
        } catch (error) {
            setError(error.mensaje || 'Error al iniciar sesión');
            return { exito: false, error: error.mensaje };
        }
    };

    const registrar = async (datos) => {
        setError(null);
        try {
            await clienteApi.registrar(datos);
            return { exito: true };
        } catch (error) {
            setError(error.mensaje || 'Error al registrar');
            return { exito: false, error: error.mensaje };
        }
    };

    const cerrarSesion = () => {
        clienteApi.cerrarSesion();
        setUsuario(null);
    };

    const valor = {
        usuario,
        cargando,
        error,
        estaAutenticado: !!usuario,
        iniciarSesion,
        registrar,
        cerrarSesion,
        verificarAutenticacion,
    };

    return (
        <ContextoAutenticacion.Provider value={valor}>
            {children}
        </ContextoAutenticacion.Provider>
    );
}

export function useAutenticacion() {
    const contexto = useContext(ContextoAutenticacion);
    if (!contexto) {
        throw new Error('useAutenticacion debe usarse dentro de ProveedorAutenticacion');
    }
    return contexto;
}

export default ContextoAutenticacion;
