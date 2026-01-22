/**
 * Componente BarraLateral - Refinado
 */

import { Link } from 'react-router-dom';
import { Tarjeta, TarjetaCuerpo } from '../ui/Tarjeta.jsx';
import Avatar from '../ui/Avatar.jsx';
import { useAutenticacion } from '../../contextos/ContextoAutenticacion.jsx';

export function BarraLateral() {
    const { usuario } = useAutenticacion();
    return (
        <aside className="fixed left-0 top-22 z-40 w-80 h-[calc(100vh-5rem)] hidden lg:block overflow-y-auto scrollbar-hide p-2 bg-[#0c1014]">
            {/* Perfil Mini */}
            <div className="flex items-center justify-between mb-6 px-2">
                <Link to="/perfil" className="flex items-center gap-3 hover:bg-[#1e1e1e] p-2 -ml-2 rounded-lg transition-colors group w-full">
                    <Avatar
                        src={usuario?.avatar}
                        nombre={usuario?.nombre || 'Usuario'}
                        tamano="md"
                    />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate group-hover:text-gray-300 transition-colors">
                            {usuario?.nombre || 'Nombre Usuario'}
                        </p>
                        <p className="text-sm text-[#A8A8A8] truncate">
                            {usuario?.rol || 'Nombre Usuario'}
                        </p>
                    </div>
                    <span className="text-xs font-semibold text-[#009EE3] hover:text-white transition-colors cursor-pointer">
                        Ver Perfil
                    </span>
                </Link>
            </div>

            {/* Sugerencias Header */}
            <div className="flex items-center justify-between mb-4 px-2">
                <span className="text-sm font-semibold text-[#A8A8A8]">
                    Sugerencias para ti
                </span>
                <Link to="/compañeros" className="text-xs font-semibold text-white hover:text-gray-300 transition-colors">
                    Ver todo
                </Link>
            </div>

            {/* Lista de Sugerencias */}
            <div className="space-y-3">
                {[
                    { id: 1, user: 'santiagotorres8188', sub: 'Sugerencia para ti', avatar: null },
                    { id: 2, user: 'azucena.luque.982', sub: 'diegxx.wz sigue esta cuenta', avatar: null },
                    { id: 3, user: 'zuricreyna', sub: 'diegxx.wz sigue esta cuenta', avatar: null },
                    { id: 4, user: 'yadiaaroni', sub: 'nani_xzc y 2 más siguen esta...', avatar: null },
                    { id: 5, user: 'francismar_bandres', sub: 'Sugerencia para ti', avatar: null },
                    { id: 6, user: 'diegoaxelcastillo', sub: 'diegxx.wz sigue esta cuenta', avatar: null },
                    { id: 7, user: 'diegoaxelcastillo', sub: 'diegxx.wz sigue esta cuenta', avatar: null },
                    { id: 8, user: 'diegoaxelcastillo', sub: 'diegxx.wz sigue esta cuenta', avatar: null }
                ].map((sugerencia) => (
                    <div key={sugerencia.id} className="flex items-center justify-between px-2 py-1">
                        <div className="flex items-center gap-3">
                            <Avatar
                                nombre={sugerencia.user}
                                tamano="sm"
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white truncate hover:underline cursor-pointer">
                                    {sugerencia.user}
                                </p>
                                <p className="text-xs text-[#A8A8A8] truncate max-w-[140px]" title={sugerencia.sub}>
                                    {sugerencia.sub}
                                </p>
                            </div>
                        </div>
                        <button className="text-xs font-semibold text-[#009EE3] hover:text-white transition-colors">
                            Añadir
                        </button>
                    </div>
                ))}
            </div>

            {/* Footer Links */}
            <div className="mt-8 px-2 text-xs text-[#A8A8A8] space-y-2">
                <p className="mt-4 uppercase">
                    © {new Date().getFullYear()} TECSUP SOCIAL
                </p>
            </div>
        </aside>
    );
}

export default BarraLateral;
