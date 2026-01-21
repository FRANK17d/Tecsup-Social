/**
 * Página Restablecer Contraseña
 * 
 * Formulario para crear nueva contraseña usando token de recuperación.
 */

import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoLockClosed, IoCheckmarkCircle, IoAlertCircle } from 'react-icons/io5';
import Input from '../componentes/ui/Input.jsx';
import Boton from '../componentes/ui/Boton.jsx';
import clienteApi from '../../infraestructura/api/clienteApi.js';

export function RestablecerContrasena() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const [formulario, setFormulario] = useState({
        nuevaContrasena: '',
        confirmarContrasena: '',
    });
    const [cargando, setCargando] = useState(false);
    const [exito, setExito] = useState(false);
    const [error, setError] = useState('');

    const manejarCambio = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value,
        });
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setError('');

        if (formulario.nuevaContrasena !== formulario.confirmarContrasena) {
            setError('Las contraseñas no coinciden');
            return;
        }

        if (formulario.nuevaContrasena.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setCargando(true);

        try {
            await clienteApi.restablecerContrasena(token, formulario.nuevaContrasena);
            setExito(true);
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setError(err.mensaje || 'Error al restablecer la contraseña');
        } finally {
            setCargando(false);
        }
    };

    // Token no válido
    if (!token) {
        return (
            <div className="min-h-screen bg-[#0c1014] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-[400px] text-center"
                >
                    <IoAlertCircle className="text-6xl text-red-500 mx-auto mb-4" />
                    <h1 className="text-xl font-semibold text-white mb-2">
                        Enlace inválido
                    </h1>
                    <p className="text-sm text-gray-400 mb-6">
                        El enlace de recuperación no es válido o ha expirado.
                    </p>
                    <Link
                        to="/recuperar-contrasena"
                        className="text-[#0095f6] text-sm font-semibold hover:underline cursor-pointer"
                    >
                        Solicitar nuevo enlace
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0c1014] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[400px]"
            >
                <div className="rounded-[3px] p-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <img
                            src="/logo-tecsup.png"
                            alt="Tecsup"
                            className="h-12 mx-auto mb-4"
                        />
                        <h1 className="text-xl font-semibold text-white">
                            Crear nueva contraseña
                        </h1>
                    </div>

                    {!exito ? (
                        <>
                            <p className="text-sm text-gray-400 text-center mb-6">
                                Tu nueva contraseña debe ser diferente a la anterior.
                            </p>

                            <form onSubmit={manejarEnvio} className="space-y-4">
                                <Input
                                    tipo="password"
                                    nombre="nuevaContrasena"
                                    valor={formulario.nuevaContrasena}
                                    placeholder="Nueva contraseña"
                                    onChange={manejarCambio}
                                    className="bg-[#25292e] border-gray-800 text-sm text-white rounded-[3px] focus:ring-0 focus:border-gray-800"
                                    requerido
                                />

                                <Input
                                    tipo="password"
                                    nombre="confirmarContrasena"
                                    valor={formulario.confirmarContrasena}
                                    placeholder="Confirmar contraseña"
                                    onChange={manejarCambio}
                                    className="bg-[#25292e] border-gray-800 text-sm text-white rounded-[3px] focus:ring-0 focus:border-gray-800"
                                    requerido
                                />

                                {error && (
                                    <p className="text-sm text-red-500 text-center">{error}</p>
                                )}

                                <Boton
                                    tipo="submit"
                                    variante="primario"
                                    cargando={cargando}
                                    className="w-full py-2 text-sm font-semibold rounded-[8px] bg-[#0095f6] hover:bg-[#1877f2]"
                                >
                                    <IoLockClosed className="mr-2" />
                                    Restablecer contraseña
                                </Boton>
                            </form>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-8"
                        >
                            <IoCheckmarkCircle className="text-6xl text-green-500 mx-auto mb-4" />
                            <h2 className="text-lg font-semibold text-white mb-2">
                                ¡Contraseña actualizada!
                            </h2>
                            <p className="text-sm text-gray-400 mb-4">
                                Serás redirigido al inicio de sesión...
                            </p>
                            <div className="animate-spin w-6 h-6 border-2 border-[#0095f6] border-t-transparent rounded-full mx-auto" />
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}

export default RestablecerContrasena;
