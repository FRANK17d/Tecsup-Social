/**
 * Página Feed - Página principal
 */

import { useEffect } from 'react';
import BarraNavegacion from '../componentes/compartidos/BarraNavegacion.jsx';
import BarraLateral from '../componentes/compartidos/BarraLateral.jsx';
import FormularioPublicacion from '../componentes/publicacion/FormularioPublicacion.jsx';
import TarjetaPublicacion from '../componentes/publicacion/TarjetaPublicacion.jsx';
import { usePublicaciones } from '../hooks/usePublicaciones.js';

export function Feed() {
    const {
        publicaciones,
        cargando,
        error,
        cargarPublicaciones,
        crearPublicacion,
        eliminarPublicacion,
        reaccionar,
        comentar,
    } = usePublicaciones();

    useEffect(() => {
        document.title = 'Inicio | Tecsup Social';
        cargarPublicaciones();
    }, [cargarPublicaciones]);

    return (
        <div className="min-h-screen bg-gray-50">
            <BarraNavegacion />

            <main className="max-w-5xl mx-auto px-4 py-6">
                <div className="flex gap-6">
                    {/* Barra lateral */}
                    <BarraLateral />

                    {/* Contenido principal */}
                    <div className="flex-1">
                        {/* Formulario para nueva publicación */}
                        <FormularioPublicacion onPublicar={crearPublicacion} />

                        {/* Estado de carga */}
                        {cargando && (
                            <div className="text-center py-8">
                                <div className="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                                <p className="mt-2 text-gray-500">Cargando publicaciones...</p>
                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-4">
                                {error}
                            </div>
                        )}

                        {/* Lista de publicaciones */}
                        {!cargando && publicaciones.length === 0 ? (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">
                                    No hay publicaciones aún
                                </h3>
                                <p className="mt-2 text-gray-500">
                                    ¡Sé el primero en compartir algo con tu aula!
                                </p>
                            </div>
                        ) : (
                            publicaciones.map((publicacion) => (
                                <TarjetaPublicacion
                                    key={publicacion.id}
                                    publicacion={publicacion}
                                    onReaccionar={reaccionar}
                                    onComentar={comentar}
                                    onEliminar={eliminarPublicacion}
                                />
                            ))
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Feed;
