/**
 * Página de Perfil
 */

import { useEffect } from 'react';
import BarraNavegacion from '../componentes/compartidos/BarraNavegacion.jsx';
import {
    IoCamera,
    IoAdd,
    IoPencil,
    IoLocationSharp,
    IoHome,
    IoTime,
    IoHeart,
    IoImages,
    IoEllipsisHorizontal,
    IoSearch,
    IoChevronDown
} from 'react-icons/io5';
import { MdVerified } from "react-icons/md";
import Avatar from '../componentes/ui/Avatar.jsx';
import { useAutenticacion } from '../contextos/ContextoAutenticacion.jsx';

export function Perfil() {
    const { usuario } = useAutenticacion();

    useEffect(() => {
        document.title = `${usuario?.nombre || 'Perfil'} | Tecsup Social`;
    }, [usuario]);

    return (
        <div className="min-h-screen bg-[#0c1014] text-[#e4e6eb]">
            <BarraNavegacion />

            <div className="max-w-[1095px] mx-auto w-full">
                {/* Header Section */}
                <header className="bg-[#121212] lg:bg-transparent rounded-b-xl shadow-sm pb-4">
                    {/* Cover Photo */}
                    <div className="relative w-full h-[200px] md:h-[350px] lg:h-[400px] bg-gradient-to-b from-gray-800 to-[#18191a] lg:rounded-b-xl overflow-hidden group">
                        <img
                            src="https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=2940&auto=format&fit=crop"
                            alt="Portada"
                            className="w-full h-full object-cover opacity-80"
                        />

                        <button className="absolute bottom-4 right-4 bg-white text-black px-3 py-1.5 rounded-md font-semibold text-sm flex items-center gap-2 hover:bg-gray-200 transition-colors cursor-pointer hidden md:flex">
                            <IoCamera className="text-xl" />
                            Añadir foto de portada
                        </button>
                    </div>

                    {/* Profile Info Wrapper */}
                    <div className="px-4 md:px-8 pb-4">
                        <div className="flex flex-col md:flex-row items-center md:items-end -mt-[84px] md:-mt-[30px] relative z-10 gap-4 md:gap-6">

                            {/* Avatar Container */}
                            <div className="relative p-1 bg-[#0c1014] rounded-full">
                                <Avatar
                                    src={usuario?.avatar}
                                    nombre={usuario?.nombre || ''}
                                    className="w-[168px] h-[168px] border-[4px] border-[#0c1014] text-4xl"
                                />
                                <div className="absolute bottom-2 right-2 bg-[#2d2f30] p-2 rounded-full cursor-pointer hover:bg-[#3e4042] transition-colors border-2 border-[#0c1014]">
                                    <IoCamera className="text-xl text-white" />
                                </div>
                            </div>

                            {/* Name & Stats */}
                            <div className="flex-1 flex flex-col items-center md:items-start mb-2 md:mb-4">
                                <h1 className="text-[32px] font-bold text-white flex items-center gap-2 leading-tight">
                                    {usuario?.nombre}
                                    {usuario?.rol !== 'estudiante' && (
                                        <MdVerified className="text-blue-500 text-2xl" />
                                    )}
                                </h1>
                                <span className="text-[#b0b3b8] font-semibold text-sm md:text-base mt-1">
                                    {Math.floor(Math.random() * 500) + 10} amigos
                                </span>
                                {/* Avatares de amigos (visual decorativo) */}
                                <div className="flex -space-x-2 mt-3 overflow-hidden">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-[#121212] bg-[#242526]" />
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0 mb-4 md:self-end">
                                <button className="bg-[#2374e1] hover:bg-[#1a65c9] text-white px-4 py-2 rounded-md font-semibold flex items-center justify-center gap-2 transition-colors">
                                    <IoAdd className="text-xl" />
                                    Añadir a historia
                                </button>
                                <button className="bg-[#3a3b3c] hover:bg-[#4e4f50] text-[#e4e6eb] px-4 py-2 rounded-md font-semibold flex items-center justify-center gap-2 transition-colors">
                                    <IoPencil className="text-lg" />
                                    Editar perfil
                                </button>
                                <button className="bg-[#3a3b3c] hover:bg-[#4e4f50] text-[#e4e6eb] px-3 py-2 rounded-md font-semibold transition-colors">
                                    <IoChevronDown />
                                </button>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-[#3e4042] mt-6 mb-1 mx-0 md:mx-0" />

                        {/* Navigation Tabs */}
                        <div className="flex items-center justify-between">
                            <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
                                {['Publicaciones', 'Información', 'Amigos', 'Fotos', 'Reels'].map((tab, idx) => (
                                    <button
                                        key={tab}
                                        className={`px-4 py-4 font-semibold text-[15px] whitespace-nowrap rounded-lg hover:bg-[#3a3b3c] transition-colors relative
                                            ${idx === 0 ? 'text-[#2374e1]' : 'text-[#b0b3b8]'}`}
                                    >
                                        {tab}
                                        {idx === 0 && (
                                            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#2374e1] rounded-t-sm" />
                                        )}
                                    </button>
                                ))}
                                <button className="px-4 py-4 font-semibold text-[#b0b3b8] text-[15px] hover:bg-[#3a3b3c] rounded-lg flex items-center gap-1">
                                    Ver más <IoChevronDown />
                                </button>
                            </nav>

                            <button className="bg-[#3a3b3c] hover:bg-[#4e4f50] p-2 rounded-md hidden md:block">
                                <IoEllipsisHorizontal className="text-[#e4e6eb]" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Grid Content */}
                <div className="px-0 md:px-0 py-4 grid grid-cols-1 md:grid-cols-[40%_60%] lg:grid-cols-[360px_1fr] gap-4">

                    {/* Left Column */}
                    <div className="space-y-4 px-4 md:px-0">
                        {/* Intro Card */}
                        <div className="bg-[#121212] p-4 rounded-xl border border-[#262626] shadow-sm">
                            <h2 className="text-xl font-bold text-[#e4e6eb] mb-4">Detalles</h2>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-[#b0b3b8]">
                                    <IoHome className="text-xl" />
                                    <span>Vive en <strong className="text-[#e4e6eb]">Trujillo</strong></span>
                                </div>
                                <div className="flex items-center gap-3 text-[#b0b3b8]">
                                    <IoLocationSharp className="text-xl" />
                                    <span>De <strong className="text-[#e4e6eb]">Trujillo</strong></span>
                                </div>
                                <div className="flex items-center gap-3 text-[#b0b3b8]">
                                    <IoTime className="text-xl" />
                                    <span>Se unió en {usuario?.fechaCreacion ?
                                        new Date(usuario.fechaCreacion).toLocaleDateString('es-PE', { month: 'long', year: 'numeric' }) :
                                        'agosto de 2023'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-[#b0b3b8]">
                                    <IoEllipsisHorizontal className="text-xl" />
                                    <span className="capitalize">{usuario?.rol || 'Estudiante'}</span>
                                </div>
                            </div>

                            <button className="w-full mt-4 bg-[#2f3031] hover:bg-[#4e4f50] text-[#e4e6eb] py-1.5 rounded-md font-semibold transition-colors text-sm">
                                Editar detalles
                            </button>

                            <div className="mt-4 flex flex-wrap gap-2">
                                <div className="w-full flex justify-between items-center mb-1">
                                    <h3 className="font-semibold text-[#e4e6eb]">Aficiones</h3>
                                    <span className="text-[#2374e1] text-sm cursor-pointer hover:underline">Editar</span>
                                </div>
                                {['Programación', 'Diseño', 'Música', 'Gaming'].map(hobby => (
                                    <span key={hobby} className="px-3 py-1 bg-[#18191a] border border-[#3e4042] rounded-full text-sm text-[#e4e6eb]">
                                        {hobby}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Photos Preview Card (Static Mockup) */}
                        <div className="bg-[#121212] p-4 rounded-xl border border-[#262626] shadow-sm">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-xl font-bold text-[#e4e6eb]">Fotos</h2>
                                <span className="text-[#2374e1] cursor-pointer hover:underline">Ver todas</span>
                            </div>
                            <div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                                    <div key={i} className="aspect-square bg-[#242526] hover:opacity-90 cursor-pointer" />
                                ))}
                            </div>
                        </div>

                        {/* Friends Preview Card (Static Mockup) */}
                        <div className="bg-[#121212] p-4 rounded-xl border border-[#262626] shadow-sm">
                            <div className="flex justify-between items-center mb-1">
                                <h2 className="text-xl font-bold text-[#e4e6eb]">Amigos</h2>
                                <span className="text-[#2374e1] cursor-pointer hover:underline">Ver todos</span>
                            </div>
                            <span className="text-[#b0b3b8] text-sm mb-3 block">1,234 amigos</span>
                            <div className="grid grid-cols-3 gap-x-2 gap-y-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                                    <div key={i} className="cursor-pointer">
                                        <div className="aspect-square bg-[#242526] rounded-lg mb-1" />
                                        <p className="text-[12px] font-semibold text-[#e4e6eb] leading-tight">Amigo {i}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column (Feed) */}
                    <div className="space-y-4 px-4 md:px-0">
                        {/* Create Post Widget */}
                        <div className="bg-[#121212] p-3 rounded-xl border border-[#262626]">
                            <div className="flex gap-2 items-center mb-3 border-b border-[#3e4042] pb-3">
                                <Avatar src={usuario?.avatar} nombre={usuario?.nombre} tamano="sm" />
                                <div className="flex-1 bg-[#3a3b3c] hover:bg-[#4e4f50] transition-colors rounded-full px-4 py-2 cursor-pointer">
                                    <span className="text-[#b0b3b8] text-sm">¿Qué estás pensando?</span>
                                </div>
                            </div>
                            <div className="flex justify-between px-2">
                                <button className="flex items-center gap-2 text-[#b0b3b8] hover:bg-[#3a3b3c] px-4 py-2 rounded-lg transition-colors flex-1 justify-center">
                                    <IoCamera className="text-[#f3425f] text-xl" />
                                    <span className="text-sm font-semibold">Video en directo</span>
                                </button>
                                <button className="flex items-center gap-2 text-[#b0b3b8] hover:bg-[#3a3b3c] px-4 py-2 rounded-lg transition-colors flex-1 justify-center">
                                    <IoImages className="text-[#45bd62] text-xl" />
                                    <span className="text-sm font-semibold">Foto/video</span>
                                </button>
                            </div>
                        </div>

                        {/* Filter Widget */}
                        <div className="bg-[#121212] p-3 rounded-xl border border-[#262626] flex justify-between items-center">
                            <h3 className="font-bold text-[#e4e6eb] px-2">Publicaciones</h3>
                            <div className="flex gap-2">
                                <button className="bg-[#3a3b3c] hover:bg-[#4e4f50] text-[#e4e6eb] px-3 py-1.5 rounded-md font-semibold text-sm flex items-center gap-1 transition-colors">
                                    <IoSearch className="text-lg" />
                                    Filtros
                                </button>
                                <button className="bg-[#3a3b3c] hover:bg-[#4e4f50] text-[#e4e6eb] px-3 py-1.5 rounded-md font-semibold text-sm flex items-center gap-1 transition-colors">
                                    <IoEllipsisHorizontal className="text-lg" />
                                    Administrar publicaciones
                                </button>
                            </div>
                        </div>

                        {/* View Switcher View */}
                        <div className="flex gap-4 border-b border-[#3e4042] mx-2">
                            <button className="flex-1 py-3 text-center text-[#2374e1] border-b-2 border-[#2374e1] font-semibold">
                                Vista de lista
                            </button>
                            <button className="flex-1 py-3 text-center text-[#b0b3b8] hover:bg-[#3a3b3c] rounded-t-lg font-semibold transition-colors">
                                Vista de cuadrícula
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Perfil;
