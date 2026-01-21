/**
 * Página de Perfil
 */

import { useEffect } from 'react';
import BarraNavegacion from '../componentes/compartidos/BarraNavegacion.jsx';
import { IoMail, IoCalendar } from 'react-icons/io5';
import { Tarjeta, TarjetaCuerpo } from '../componentes/ui/Tarjeta.jsx';
import Avatar from '../componentes/ui/Avatar.jsx';
import { useAutenticacion } from '../contextos/ContextoAutenticacion.jsx';

export function Perfil() {
    const { usuario } = useAutenticacion();

    useEffect(() => {
        document.title = 'Mi Perfil | Tecsup Social';
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <BarraNavegacion />

            <main className="max-w-4xl mx-auto px-4 py-6">
                <Tarjeta>
                    {/* Banner */}
                    <div className="h-48 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-xl" />

                    <TarjetaCuerpo className="-mt-16 pb-8">
                        {/* Avatar y nombre */}
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-4">
                            <Avatar
                                src={usuario?.avatar}
                                nombre={usuario?.nombre || ''}
                                tamano="xl"
                                className="border-4 border-white shadow-lg"
                            />
                            <div className="text-center md:text-left">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {usuario?.nombre}
                                </h1>
                                <p className="text-gray-500 capitalize">{usuario?.rol}</p>
                            </div>
                        </div>

                        {/* Información */}
                        <div className="mt-8 grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                                    Información
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <IoMail className="w-5 h-5 text-gray-400" />
                                        <span className="text-gray-700">{usuario?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <IoCalendar className="w-5 h-5 text-gray-400" />
                                        <span className="text-gray-700">
                                            Miembro desde {usuario?.fechaCreacion?.toLocaleDateString('es-PE', {
                                                year: 'numeric',
                                                month: 'long'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-6">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                                    Estadísticas
                                </h3>
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <p className="text-2xl font-bold text-indigo-600">0</p>
                                        <p className="text-sm text-gray-500">Publicaciones</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-green-600">0</p>
                                        <p className="text-sm text-gray-500">Comentarios</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-pink-600">0</p>
                                        <p className="text-sm text-gray-500">Me gusta</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TarjetaCuerpo>
                </Tarjeta>
            </main>
        </div>
    );
}

export default Perfil;
