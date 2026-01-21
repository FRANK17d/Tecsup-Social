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
        <aside className="w-72 hidden lg:block sticky top-24 h-fit space-y-6">
            {/* Tarjeta de perfil */}
            <Tarjeta className="overflow-visible">
                <div className="h-24 bg-gradient-to-r from-[#009EE3] to-[#0082BC] rounded-t-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
                </div>
                <TarjetaCuerpo className="-mt-12 text-center relative z-10 pb-6">
                    <Avatar
                        src={usuario?.avatar}
                        nombre={usuario?.nombre || ''}
                        tamano="xl"
                        className="mx-auto border-4 border-white shadow-lg mx-auto"
                    />
                    <h3 className="mt-4 font-bold text-lg text-gray-900 line-clamp-1">
                        {usuario?.nombre}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 flex items-center justify-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Estudiante
                    </p>
                    <Link
                        to="/perfil"
                        className="block w-full py-2.5 text-center text-sm font-medium text-[#009EE3] bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                    >
                        Ver mi perfil
                    </Link>
                </TarjetaCuerpo>
            </Tarjeta>

            {/* Enlaces menu */}
            <Tarjeta>
                <TarjetaCuerpo className="p-2 space-y-1">
                    <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Menú Principal
                    </p>

                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#009EE3] rounded-xl transition-all group"
                    >
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-[#009EE3] group-hover:text-white transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                        </div>
                        <span className="font-medium">Publicaciones</span>
                    </Link>

                    <Link
                        to="/compañeros"
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-[#009EE3] rounded-xl transition-all group"
                    >
                        <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center group-hover:bg-[#009EE3] group-hover:text-white transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                        <span className="font-medium">Compañeros</span>
                    </Link>
                </TarjetaCuerpo>
            </Tarjeta>

            <div className="text-center">
                <p className="text-xs text-gray-400">
                    © {new Date().getFullYear()} Tecsup Social v1.0
                </p>
            </div>
        </aside>
    );
}

export default BarraLateral;
