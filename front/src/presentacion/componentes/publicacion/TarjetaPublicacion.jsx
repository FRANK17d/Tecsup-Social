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
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [mostrarReacciones, setMostrarReacciones] = useState(false);
    const [timerReacciones, setTimerReacciones] = useState(null);

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
                        <h4 className="font-semibold text-white">
                            {publicacion.autor?.nombre || 'Usuario'}
                        </h4>
                        <p className="text-sm text-white">
                            {publicacion.obtenerFechaFormateada()}
                        </p>
                    </div>
                </div>

                {esMiPublicacion && onEliminar && (
                    <div className="relative">
                        <button
                            onClick={() => setMenuAbierto(!menuAbierto)}
                            className="text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-[#262626]"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                            </svg>
                        </button>

                        {menuAbierto && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setMenuAbierto(false)}
                                ></div>
                                <div className="absolute right-0 mt-2 w-48 bg-[#1e1e1e] rounded-xl shadow-lg py-1 ring-1 ring-white ring-opacity-10 z-20 border border-[#262626]">
                                    <button
                                        onClick={() => {
                                            onEliminar(publicacion.id);
                                            setMenuAbierto(false);
                                        }}
                                        className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-[#2c2c2c] flex items-center gap-2 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Eliminar publicación
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Contenido */}
            <TarjetaCuerpo className="py-0">
                <p className="text-white whitespace-pre-wrap">
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
            <div className="px-5 py-3 flex items-center justify-between text-[#B0B3B8] text-sm">
                <div className="flex items-center gap-1.5 cursor-pointer hover:underline">
                    {/* Icono de reacción apilada (Me gusta - Azul) */}
                    <div className="bg-linear-to-br from-[#1877F2] to-[#1866D2] p-1 rounded-full text-white w-5 h-5 flex items-center justify-center z-10 border-2 border-[#1e1e1e]">
                        <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                        </svg>
                    </div>
                    {/* Icono de reacción apilada (Corazón - Rojo) - Opcional, solo si hay más reacciones */}
                    {publicacion.obtenerTotalMeGusta() > 0 && (
                        <div className="bg-linear-to-br from-[#FB5D78] to-[#F13359] p-1 rounded-full text-white w-5 h-5 flex items-center justify-center -ml-2 border-2 border-[#1e1e1e]">
                            <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </div>
                    )}
                    <span className="ml-1">{publicacion.obtenerTotalMeGusta() || '0'}</span>
                </div>

                <div className="flex gap-4">
                    <span className="cursor-pointer hover:underline">
                        {publicacion.comentarios?.length || 0} comentarios
                    </span>
                    <span className="cursor-pointer hover:underline">
                        0 compartidos
                    </span>
                </div>
            </div>

            {/* Acciones */}
            <div className="px-4 py-1 flex gap-1">
                <div
                    className="flex-1 relative"
                    onMouseEnter={() => {
                        if (timerReacciones) clearTimeout(timerReacciones);
                        setTimerReacciones(setTimeout(() => setMostrarReacciones(true), 500));
                    }}
                    onMouseLeave={() => {
                        if (timerReacciones) clearTimeout(timerReacciones);
                        setTimerReacciones(setTimeout(() => setMostrarReacciones(false), 300));
                    }}
                >
                    {/* Pop-up de Reacciones - Estilo Facebook */}
                    {mostrarReacciones && (
                        <div className="absolute bottom-full left-0 mb-2 bg-[#1e1e1e] rounded-full shadow-xl border border-[#262626] p-1 flex gap-1 z-50 animate-in fade-in zoom-in duration-200">
                            {[
                                { label: 'Me gusta', icon: '👍', color: 'bg-blue-500' },
                                { label: 'Me encanta', icon: '❤️', color: 'bg-red-500' },
                                { label: 'Me importa', icon: '🥰', color: 'bg-yellow-500' },
                                { label: 'Me divierte', icon: '😆', color: 'bg-yellow-400' },
                                { label: 'Me asombra', icon: '😮', color: 'bg-yellow-400' },
                                { label: 'Me entristece', icon: '😢', color: 'bg-yellow-400' },
                                { label: 'Me enoja', icon: '😡', color: 'bg-orange-500' }
                            ].map((reaccion) => (
                                <button
                                    key={reaccion.label}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        manejarReaccion(); // Por ahora todas las reacciones hacen lo mismo (toggle like)
                                        setMostrarReacciones(false);
                                    }}
                                    className="p-2 hover:scale-125 transition-transform duration-200 rounded-full hover:bg-[#2c2c2c] relative group"
                                    title={reaccion.label}
                                >
                                    <span className="text-2xl leading-none filter drop-shadow-md">{reaccion.icon}</span>
                                    {/* Tooltip de texto que flota sobre el emoji */}
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        {reaccion.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={manejarReaccion}
                        className={`
                            w-full flex items-center justify-center gap-2 py-2 rounded-lg 
                            transition-colors
                            ${usuarioReacciono
                                ? 'text-indigo-500'
                                : 'text-white hover:bg-[#121212]'
                            }
                        `}
                    >
                        <svg className="w-5 h-5" fill={usuarioReacciono ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>Me gusta</span>
                    </button>
                </div>

                <button
                    onClick={() => setMostrarComentarios(!mostrarComentarios)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-white hover:bg-[#121212] transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Comentar
                </button>

                <button
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-white hover:bg-[#121212] transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Compartir
                </button>
            </div>

            {/* Sección de comentarios */}
            {mostrarComentarios && (
                <TarjetaPie className="space-y-3">
                    {/* Lista de comentarios */}
                    {publicacion.comentarios?.map((comentario) => (
                        <div key={comentario.id} className="flex gap-3">
                            <Avatar nombre={comentario.autorId} tamano="sm" />
                            <div className="bg-[#121212] rounded-lg px-3 py-2 flex-1">
                                <p className="text-sm font-medium text-white">Usuario</p>
                                <p className="text-sm text-white">{comentario.contenido}</p>
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
                            className="flex-1 px-4 py-2 bg-[#121212] rounded-full text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-[#262626]"
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
