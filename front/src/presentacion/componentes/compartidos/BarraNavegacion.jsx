/**
 * Componente BarraNavegacion - Branding Actualizado
 */

import { Link, useNavigate } from 'react-router-dom';
import { IoHome, IoPeople, IoVideocam, IoGrid, IoSearch, IoChatbubbleEllipses, IoNotifications, IoChevronDown } from 'react-icons/io5';
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
        <nav className="bg-[#0c1014] border-b border-[#262626] sticky top-0 z-50">
            <div className="w-full px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo y Buscador */}
                    <div className="flex items-center gap-2">
                        <Link to="/" className="flex-shrink-0">
                            {/* Icono circular tipo Facebook */}
                            <img
                                src="/logo-tecsup-icono.png"
                                alt="Tecsup"
                                className="w-10 h-10 object-contain"
                            />
                        </Link>

                        <div className="relative hidden lg:block">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <IoSearch className="text-[#B0B3B8] text-lg" />
                            </div>
                            <input
                                type="text"
                                placeholder="Buscar en Tecsup Social"
                                className="bg-[#3A3B3C] border-none text-white text-[15px] rounded-full block w-[240px] pl-10 p-2.5 placeholder-[#B0B3B8] focus:ring-0 transition-all hover:bg-[#4E4F50]"
                            />
                        </div>
                    </div>

                    {/* Navegación central con estilo pill */}
                    <div className="hidden md:flex items-center bg-[#121212] p-1.5 rounded-full border border-[#262626]">
                        <Link
                            to="/"
                            className="flex items-center gap-2 px-5 py-2 rounded-full text-white hover:text-white hover:bg-[#262626] transition-all text-sm font-medium"
                        >
                            <IoHome className="w-5 h-5" />
                            Inicio
                        </Link>
                        <Link
                            to="/companeros"
                            className="flex items-center gap-2 px-5 py-2 rounded-full text-white hover:text-white hover:bg-[#262626] transition-all text-sm font-medium"
                        >
                            <IoPeople className="w-5 h-5" />
                            Compañeros
                        </Link>
                        <Link
                            to="/reels"
                            className="flex items-center gap-2 px-5 py-2 rounded-full text-white hover:text-white hover:bg-[#262626] transition-all text-sm font-medium"
                        >
                            <IoVideocam className="w-5 h-5" />
                            Reels
                        </Link>
                        <Link
                            to="/grupos"
                            className="flex items-center gap-2 px-5 py-2 rounded-full text-white hover:text-white hover:bg-[#262626] transition-all text-sm font-medium"
                        >
                            <IoGrid className="w-5 h-5" />
                            Grupos
                        </Link>
                    </div>

                    {/* Perfil y acciones */}
                    <div className="flex items-center gap-2">
                        {/* Mensajes */}
                        <button className="w-10 h-10 rounded-full bg-[#3A3B3C] flex items-center justify-center text-white hover:bg-[#4E4F50] transition-colors">
                            <IoChatbubbleEllipses className="w-5 h-5" />
                        </button>

                        {/* Notificaciones */}
                        <button className="w-10 h-10 rounded-full bg-[#3A3B3C] flex items-center justify-center text-white hover:bg-[#4E4F50] transition-colors">
                            <IoNotifications className="w-5 h-5" />
                        </button>

                        {/* Perfil Dropdown */}
                        <div className="relative group ml-1">
                            <button className="relative block outline-none">
                                <Avatar
                                    src={usuario?.avatar}
                                    nombre={usuario?.nombre || ''}
                                    tamano="md"
                                    className="cursor-pointer transition-opacity hover:opacity-90"
                                />
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#3A3B3C] rounded-full flex items-center justify-center border-2 border-[#18191A] text-white">
                                    <IoChevronDown className="w-3 h-3" />
                                </div>
                            </button>

                            {/* Dropdown flotante */}
                            <div className="absolute right-0 top-full mt-2 w-56 bg-[#242526] rounded-lg shadow-xl border border-[#3E4042] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right z-50 overflow-hidden">
                                <div className="p-2">
                                    <Link
                                        to="/perfil"
                                        className="flex items-center gap-3 px-3 py-2 text-white hover:bg-[#3A3B3C] rounded-md transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-[#3A3B3C] flex items-center justify-center text-white">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <span className="block font-medium text-[15px]">{usuario?.nombre}</span>
                                            <span className="block text-xs text-[#B0B3B8]">Ver tu perfil</span>
                                        </div>
                                    </Link>
                                    <div className="h-px bg-[#3E4042] my-1 mx-2"></div>
                                    <button
                                        onClick={manejarCerrarSesion}
                                        className="flex items-center gap-3 w-full px-3 py-2 text-white hover:bg-[#3A3B3C] rounded-md transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-[#3A3B3C] flex items-center justify-center text-white">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-[15px]">Cerrar Sesión</span>
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
