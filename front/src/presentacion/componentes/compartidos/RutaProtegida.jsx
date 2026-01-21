/**
 * Componente RutaProtegida
 * 
 * Protege rutas que requieren autenticación.
 */

import { Navigate, useLocation } from 'react-router-dom';
import { useAutenticacion } from '../../contextos/ContextoAutenticacion.jsx';

export function RutaProtegida({ children }) {
    const { estaAutenticado, cargando } = useAutenticacion();
    const location = useLocation();

    // Mostrar spinner mientras carga
    if (cargando) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                    <p className="mt-4 text-gray-500">Cargando...</p>
                </div>
            </div>
        );
    }

    // Redirigir a login si no está autenticado
    if (!estaAutenticado) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default RutaProtegida;
