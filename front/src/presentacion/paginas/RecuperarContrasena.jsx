/**
 * Página Recuperar Contraseña
 * 
 * Formulario para solicitar link de recuperación por email.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IoMailOutline, IoArrowBack, IoCheckmarkCircle } from 'react-icons/io5';
import Input from '../componentes/ui/Input.jsx';
import Boton from '../componentes/ui/Boton.jsx';
import clienteApi from '../../infraestructura/api/clienteApi.js';

export function RecuperarContrasena() {
    const [email, setEmail] = useState('');
    const [cargando, setCargando] = useState(false);
    const [enviado, setEnviado] = useState(false);
    const [error, setError] = useState('');

    const manejarEnvio = async (e) => {
        e.preventDefault();
        setError('');
        setCargando(true);

        try {
            await clienteApi.solicitarRecuperacion(email);
            setEnviado(true);
        } catch (err) {
            setError(err.mensaje || 'Error al enviar el correo');
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0c1014] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[400px]"
            >
                {/* Card Principal */}
                <div className="rounded-[3px] p-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <img
                            src="/logo-tecsup.png"
                            alt="Tecsup"
                            className="h-12 mx-auto mb-4"
                        />
                        <h1 className="text-xl font-semibold text-white">
                            ¿Problemas para iniciar sesión?
                        </h1>
                    </div>

                    {!enviado ? (
                        <>
                            <p className="text-sm text-white text-center mb-6">
                                Ingresa tu correo electrónico y te enviaremos un enlace para recuperar el acceso a tu cuenta.
                            </p>

                            <form onSubmit={manejarEnvio} className="space-y-4">
                                <Input
                                    tipo="email"
                                    nombre="email"
                                    valor={email}
                                    placeholder="Correo institucional"
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-[#25292e] border-gray-800 text-sm text-white rounded-[3px] focus:ring-0 focus:border-gray-800 placeholder:text-white"
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
                                    <IoMailOutline className="mr-2" />
                                    Enviar enlace de recuperación
                                </Boton>
                            </form>

                            <div className="flex items-center my-6">
                                <div className="flex-1 h-px bg-gray-800"></div>
                                <span className="px-4 text-xs font-semibold text-white uppercase">O</span>
                                <div className="flex-1 h-px bg-gray-800"></div>
                            </div>

                            <Link
                                to="/registro"
                                className="block text-center text-sm text-white font-semibold hover:text-white cursor-pointer"
                            >
                                Crear cuenta nueva
                            </Link>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-8"
                        >
                            <IoCheckmarkCircle className="text-6xl text-green-500 mx-auto mb-4" />
                            <h2 className="text-lg font-semibold text-white mb-2">
                                ¡Correo enviado!
                            </h2>
                            <p className="text-sm text-white mb-6">
                                Revisa tu bandeja de entrada (y spam) para encontrar el enlace de recuperación.
                            </p>
                            <Link
                                to="/login"
                                className="text-[#0095f6] text-sm font-semibold hover:underline cursor-pointer"
                            >
                                Volver al inicio de sesión
                            </Link>
                        </motion.div>
                    )}
                </div>

                {/* Link volver */}
                <div className="text-center mt-6">
                    <Link
                        to="/login"
                        className="inline-flex items-center text-sm text-white hover:text-white cursor-pointer"
                    >
                        <IoArrowBack className="mr-2" />
                        Volver al inicio de sesión
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}

export default RecuperarContrasena;
