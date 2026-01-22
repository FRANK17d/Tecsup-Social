import { Link } from 'react-router-dom';
import Avatar from '../ui/Avatar.jsx';
import { IoSearch, IoEllipsisHorizontal } from 'react-icons/io5';

export function BarraDerecha() {
    const contactos = [
        { id: 2, nombre: 'Francismar Bandres', avatar: null, online: true },
        { id: 3, nombre: 'Carlos Castro', avatar: null, online: true },
        { id: 4, nombre: 'Alexandra Leiva', avatar: null, online: false },
        { id: 5, nombre: 'Frank Anthony Castro Gutierrez', avatar: null, online: true },
        { id: 6, nombre: 'Diana Yesenia Davila Aurora', avatar: null, online: false },
        { id: 7, nombre: 'Andrew G Partner', avatar: null, online: true },
        { id: 8, nombre: 'Alberto Torres Garay', avatar: null, online: false },
        { id: 9, nombre: 'Alejandro Valderrama', avatar: null, online: true },
        { id: 10, nombre: 'Diego Axel Castillo', avatar: null, online: false },
        { id: 11, nombre: 'Diego Pillco', avatar: null, online: true },
        { id: 12, nombre: 'Diego Pillco', avatar: null, online: true },
        { id: 13, nombre: 'Diego Pillco', avatar: null, online: true },
        { id: 14, nombre: 'Diego Pillco', avatar: null, online: true },
        { id: 15, nombre: 'Diego Pillco', avatar: null, online: true },
        { id: 16, nombre: 'Diego Pillco', avatar: null, online: true },
        { id: 17, nombre: 'Diego Pillco', avatar: null, online: true },
        { id: 18, nombre: 'Diego Pillco', avatar: null, online: true },
        { id: 19, nombre: 'Diego Pillco', avatar: null, online: true },
        { id: 20, nombre: 'Diego Pillco', avatar: null, online: true },
    ];


    return (
        <aside className="fixed right-0 top-20 z-40 w-80 h-[calc(100vh-5rem)] hidden xl:block overflow-y-auto scrollbar-tecsup p-2 bg-[#0c1014]">
            <div className="flex items-center justify-between mb-4 px-2 text-[#B0B3B8]">
                <h3 className="font-semibold text-lg hover:text-white cursor-pointer transition-colors">
                    Compañeros
                </h3>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-[#3A3B3C] rounded-full transition-colors text-lg">
                        <IoSearch />
                    </button>
                    <button className="p-2 hover:bg-[#3A3B3C] rounded-full transition-colors text-lg">
                        <IoEllipsisHorizontal />
                    </button>
                </div>
            </div>

            <div className="space-y-1">
                {contactos.map((contacto) => (
                    <div
                        key={contacto.id}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#1e1e1e] cursor-pointer transition-colors group"
                    >
                        <div className="relative">
                            {contacto.extra === 'meta-ai' ? (
                                <div className="w-9 h-9 rounded-full bg-linear-to-tr from-blue-500 to-purple-600 p-[2px]">
                                    <div className="w-full h-full rounded-full bg-[#1e1e1e] flex items-center justify-center">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-400"></div>
                                    </div>
                                </div>
                            ) : (
                                <Avatar
                                    nombre={contacto.nombre}
                                    tamano="md"
                                />
                            )}
                            {contacto.online && (
                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#18191a] rounded-full"></span>
                            )}
                        </div>
                        <span className="text-sm font-medium text-[#E4E6EB] group-hover:text-white truncate">
                            {contacto.nombre}
                        </span>
                        {contacto.verificado && (
                            <svg className="w-3 h-3 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        )}
                    </div>
                ))}
            </div>
        </aside>
    );
}

export default BarraDerecha;
