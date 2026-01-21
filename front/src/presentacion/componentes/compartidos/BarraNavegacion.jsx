/**
 * Componente BarraNavegacion - Branding Actualizado
 */

import { Link, useNavigate } from 'react-router-dom';
import Avatar from '../ui/Avatar.jsx';
import { useAutenticacion } from '../../contextos/ContextoAutenticacion.jsx';

export function BarraNavegacion() {
    const { usuario, cerrarSesion } = useAutenticacion();
    const navigate = useNavigate();

    const manejarCerrarSesion = () => {
        cerrarSesion();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-lg shadow-gray-100/50 border-b border-gray-100 sticky top-0 z-50 backdrop-blur-lg bg-white/90">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-3 transition-opacity hover:opacity-80"
                    >
                        <img
                            src="/logo-tecsup.png"
                            alt="Tecsup"
                            className="h-10 object-contain"
                        />
                    </Link>

                    {/* Navegación central con estilo pill */}
                    <div className="hidden md:flex items-center bg-gray-100/50 p-1.5 rounded-full border border-gray-100">
                        <Link
                            to="/"
                            className="flex items-center gap-2 px-5 py-2 rounded-full text-gray-600 hover:text-[#009EE3] hover:bg-white hover:shadow-sm transition-all text-sm font-medium"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Inicio
                        </Link>
                        <Link
                            to="/compañeros"
                            className="flex items-center gap-2 px-5 py-2 rounded-full text-gray-600 hover:text-[#009EE3] hover:bg-white hover:shadow-sm transition-all text-sm font-medium"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Comunidad
                        </Link>
                    </div>

                    {/* Perfil y acciones */}
                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <button className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                <span className="hidden md:block text-sm font-medium text-gray-700 text-right leading-tight">
                                    <span className="block">{usuario?.nombre?.split(' ')[0]}</span>
                                    <span className="text-xs text-gray-400 font-normal">Estudiante</span>
                                </span>
                                <Avatar
                                    src={usuario?.avatar}
                                    nombre={usuario?.nombre || ''}
                                    tamano="md"
                                    className="ring-2 ring-white shadow-md mx-0"
                                />
                            </button>

                            {/* Dropdown flotante */}
                            <div className="absolute right-0 top-full mt-4 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                                <div className="p-2">
                                    <Link
                                        to="/perfil"
                                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#009EE3]">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <span className="block font-medium text-sm">Mi Perfil</span>
                                            <span className="block text-xs text-gray-400">Ver y editar</span>
                                        </div>
                                    </Link>
                                    <div className="h-px bg-gray-100 my-1"></div>
                                    <button
                                        onClick={manejarCerrarSesion}
                                        className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-sm">Cerrar Sesión</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default BarraNavegacion;
