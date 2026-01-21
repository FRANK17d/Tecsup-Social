/**
 * Componente FormularioPublicacion
 * 
 * Formulario para crear nuevas publicaciones.
 */

import { useState } from 'react';
import { Tarjeta, TarjetaCuerpo } from '../ui/Tarjeta.jsx';
import Avatar from '../ui/Avatar.jsx';
import Boton from '../ui/Boton.jsx';
import { useAutenticacion } from '../../contextos/ContextoAutenticacion.jsx';

export function FormularioPublicacion({ onPublicar }) {
    const { usuario } = useAutenticacion();
    const [contenido, setContenido] = useState('');
    const [publicando, setPublicando] = useState(false);

    const manejarEnvio = async (e) => {
        e.preventDefault();
        if (!contenido.trim() || !onPublicar) return;

        setPublicando(true);
        const resultado = await onPublicar(contenido);
        if (resultado.exito) {
            setContenido('');
        }
        setPublicando(false);
    };

    return (
        <Tarjeta className="mb-6">
            <TarjetaCuerpo>
                <form onSubmit={manejarEnvio}>
                    <div className="flex gap-3">
                        <Avatar
                            src={usuario?.avatar}
                            nombre={usuario?.nombre || ''}
                            tamano="md"
                        />
                        <textarea
                            value={contenido}
                            onChange={(e) => setContenido(e.target.value)}
                            placeholder={`¿Qué tienes en mente, ${usuario?.nombre?.split(' ')[0] || ''}?`}
                            rows={3}
                            className="flex-1 resize-none border-0 focus:ring-0 text-gray-800 placeholder-gray-400 text-lg"
                        />
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div className="flex gap-2">
                            <button
                                type="button"
                                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-sm">Foto</span>
                            </button>
                        </div>

                        <Boton
                            tipo="submit"
                            variante="primario"
                            cargando={publicando}
                            deshabilitado={!contenido.trim()}
                        >
                            Publicar
                        </Boton>
                    </div>
                </form>
            </TarjetaCuerpo>
        </Tarjeta>
    );
}

export default FormularioPublicacion;
