/**
 * Componente TarjetaPublicacion
 * 
 * Muestra una publicación con autor, contenido, reacciones y comentarios.
 */

import { useState } from 'react';
import { Tarjeta, TarjetaCuerpo, TarjetaPie } from '../ui/Tarjeta.jsx';
import Avatar from '../ui/Avatar.jsx';
import Boton from '../ui/Boton.jsx';
import { useAutenticacion } from '../../contextos/ContextoAutenticacion.jsx';

export function TarjetaPublicacion({
    publicacion,
    onReaccionar,
    onComentar,
    onEliminar,
}) {
    const { usuario } = useAutenticacion();
    const [mostrarComentarios, setMostrarComentarios] = useState(false);
    const [nuevoComentario, setNuevoComentario] = useState('');
    const [enviando, setEnviando] = useState(false);

    const usuarioReacciono = publicacion.reacciones?.some(
        r => r.usuarioId === usuario?.id
    );

    const manejarReaccion = async () => {
        if (onReaccionar) {
            await onReaccionar(publicacion.id);
        }
    };

    const manejarComentar = async (e) => {
        e.preventDefault();
        if (!nuevoComentario.trim() || !onComentar) return;

        setEnviando(true);
        await onComentar(publicacion.id, nuevoComentario);
        setNuevoComentario('');
        setEnviando(false);
    };

    const esMiPublicacion = usuario?.id === publicacion.autorId;

    return (
        <Tarjeta className="mb-4">
            {/* Cabecera con autor */}
            <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Avatar
                        src={publicacion.autor?.avatar}
                        nombre={publicacion.autor?.nombre || 'Usuario'}
                        tamano="md"
                    />
                    <div>
                        <h4 className="font-semibold text-gray-900">
                            {publicacion.autor?.nombre || 'Usuario'}
                        </h4>
                        <p className="text-sm text-gray-500">
                            {publicacion.obtenerFechaFormateada()}
                        </p>
                    </div>
                </div>

                {esMiPublicacion && onEliminar && (
                    <button
                        onClick={() => onEliminar(publicacion.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Eliminar publicación"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Contenido */}
            <TarjetaCuerpo className="py-0">
                <p className="text-gray-800 whitespace-pre-wrap">
                    {publicacion.contenido}
                </p>

                {/* Imágenes */}
                {publicacion.imagenes?.length > 0 && (
                    <div className="mt-3 grid gap-2">
                        {publicacion.imagenes.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt=""
                                className="rounded-lg max-h-96 object-cover w-full"
                            />
                        ))}
                    </div>
                )}
            </TarjetaCuerpo>

            {/* Estadísticas */}
            <div className="px-6 py-3 flex items-center gap-4 text-sm text-gray-500">
                <span>
                    {publicacion.obtenerTotalMeGusta()} me gusta
                </span>
                <span>
                    {publicacion.comentarios?.length || 0} comentarios
                </span>
            </div>

            {/* Acciones */}
            <div className="px-6 py-2 border-t border-gray-100 flex gap-2">
                <button
                    onClick={manejarReaccion}
                    className={`
            flex-1 flex items-center justify-center gap-2 py-2 rounded-lg 
            transition-colors
            ${usuarioReacciono
                            ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                            : 'text-gray-600 hover:bg-gray-100'
                        }
          `}
                >
                    <svg className="w-5 h-5" fill={usuarioReacciono ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Me gusta
                </button>

                <button
                    onClick={() => setMostrarComentarios(!mostrarComentarios)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Comentar
                </button>
            </div>

            {/* Sección de comentarios */}
            {mostrarComentarios && (
                <TarjetaPie className="space-y-3">
                    {/* Lista de comentarios */}
                    {publicacion.comentarios?.map((comentario) => (
                        <div key={comentario.id} className="flex gap-3">
                            <Avatar nombre={comentario.autorId} tamano="sm" />
                            <div className="bg-gray-100 rounded-lg px-3 py-2 flex-1">
                                <p className="text-sm font-medium text-gray-900">Usuario</p>
                                <p className="text-sm text-gray-700">{comentario.contenido}</p>
                            </div>
                        </div>
                    ))}

                    {/* Formulario de comentario */}
                    <form onSubmit={manejarComentar} className="flex gap-2">
                        <Avatar src={usuario?.avatar} nombre={usuario?.nombre} tamano="sm" />
                        <input
                            type="text"
                            value={nuevoComentario}
                            onChange={(e) => setNuevoComentario(e.target.value)}
                            placeholder="Escribe un comentario..."
                            className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <Boton
                            tipo="submit"
                            variante="primario"
                            tamano="sm"
                            cargando={enviando}
                            deshabilitado={!nuevoComentario.trim()}
                        >
                            Enviar
                        </Boton>
                    </form>
                </TarjetaPie>
            )}
        </Tarjeta>
    );
}

export default TarjetaPublicacion;
