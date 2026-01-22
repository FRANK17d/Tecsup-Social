/**
 * Componente FormularioPublicacion
 * 
 * Formulario para crear nuevas publicaciones.
 */

import { useState } from 'react';
import { IoVideocam, IoImages, IoHappy } from 'react-icons/io5';
import Avatar from '../ui/Avatar.jsx';
import { useAutenticacion } from '../../contextos/ContextoAutenticacion.jsx';

export function FormularioPublicacion({ onPublicar }) {
    const { usuario } = useAutenticacion();
    const [contenido, setContenido] = useState('');

    const manejarKeyDown = async (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (contenido.trim() && onPublicar) {
                await onPublicar(contenido);
                setContenido('');
            }
        }
    };

    return (
        <div className="bg-[#11151a] rounded-lg p-3 mb-6 flex items-center gap-3 shadow-lg">
            <Avatar
                src={usuario?.avatar}
                nombre={usuario?.nombre || ''}
                tamano="md"
            />

            <div className="flex-1 bg-[#3A3B3C] rounded-full px-4 py-2 hover:bg-[#4E4F50] transition-colors">
                <input
                    type="text"
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                    onKeyDown={manejarKeyDown}
                    placeholder={`¿Qué estás pensando, ${usuario?.nombre?.split(' ')[0] || ''}?`}
                    className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-[#B0B3B8] text-base"
                />
            </div>

            <div className="flex items-center gap-4 px-2">
                <button className="text-red-500 hover:bg-[#3A3B3C] p-2 rounded-full transition-colors">
                    <IoVideocam className="text-2xl" />
                </button>
                <button className="text-green-500 hover:bg-[#3A3B3C] p-2 rounded-full transition-colors">
                    <IoImages className="text-2xl" />
                </button>
                <button className="text-yellow-500 hover:bg-[#3A3B3C] p-2 rounded-full transition-colors">
                    <IoHappy className="text-2xl" />
                </button>
            </div>
        </div>
    );
}

export default FormularioPublicacion;
