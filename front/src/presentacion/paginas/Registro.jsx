import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import Input from '../componentes/ui/Input.jsx';
import Boton from '../componentes/ui/Boton.jsx';
import CarruselAutenticacion from '../componentes/compartidos/CarruselAutenticacion.jsx';
import { useAutenticacion } from '../contextos/ContextoAutenticacion.jsx';
import useGoogleAuth from '../hooks/useGoogleAuth.js';

export function Registro() {
    const navigate = useNavigate();
    const { registrar } = useAutenticacion();
    const { iniciarGoogleSignIn } = useGoogleAuth();

    const [formulario, setFormulario] = useState({
        nombre: '',
        email: '',
        contrasena: '',
        confirmarContrasena: '',
    });
    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        document.title = 'Registro | Tecsup Social';
    }, []);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setFormulario(prev => ({ ...prev, [name]: value }));
        setErrores(prev => ({ ...prev, [name]: '' }));
    };

    const validar = () => {
        const nuevosErrores = {};
        if (!formulario.nombre || formulario.nombre.length < 2) {
            nuevosErrores.nombre = 'Ingresa tu nombre completo';
        }
        if (!formulario.email) {
            nuevosErrores.email = 'El email es requerido';
        } else if (!formulario.email.includes('@')) {
            nuevosErrores.email = 'Ingresa un email válido';
        }
        if (!formulario.contrasena || formulario.contrasena.length < 6) {
            nuevosErrores.contrasena = 'Mínimo 6 caracteres';
        }
        if (formulario.contrasena !== formulario.confirmarContrasena) {
            nuevosErrores.confirmarContrasena = 'Las contraseñas no coinciden';
        }
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        if (!validar()) return;

        setCargando(true);
        const resultado = await registrar({
            nombre: formulario.nombre,
            email: formulario.email,
            contrasena: formulario.contrasena,
            rol: 'estudiante',
        });

        if (resultado.exito) {
            setTimeout(() => {
                navigate('/login', {
                    state: { mensaje: '¡Cuenta creada con éxito!' }
                });
            }, 100);
        } else {
            setErrores({ general: resultado.error || 'Error al registrar usuario' });
        }
        setCargando(false);
    };

    return (
        <div className="h-screen bg-[#0c1014] flex items-center justify-center font-sans text-white p-4">
            <div className="flex w-full max-w-[1000px] items-center justify-center gap-10">
                {/* Componente Carrusel (Lado Izquierdo) */}
                <CarruselAutenticacion />

                {/* Columna Derecha - Formulario */}
                <div className="flex flex-col items-center justify-center w-full max-w-[400px]">
                    {/* Caja Principal - Registro */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full rounded-[3px] p-8 mb-3"
                    >
                        <div className="text-center mb-6">
                            <img
                                src="/logo-tecsup.png"
                                alt="Logo Tecsup"
                                className="h-16 w-auto mx-auto mb-4 object-contain"
                            />
                            <p className="text-white mt-2 text-sm font-medium text-center leading-5">
                                Regístrate para ver fotos y videos de tus amigos.
                            </p>
                        </div>

                        {errores.general && (
                            <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-600 text-sm rounded-r">
                                {errores.general}
                            </div>
                        )}

                        <form onSubmit={manejarEnvio} className="space-y-3">
                            <Input
                                etiqueta=""
                                tipo="text"
                                nombre="nombre"
                                valor={formulario.nombre}
                                placeholder="Nombre y Apellido"
                                error={errores.nombre}
                                onChange={manejarCambio}
                                className="bg-[#25292e] border-gray-800 text-sm text-white rounded-[3px] focus:ring-0 focus:border-gray-800 placeholder:text-white"
                                requerido
                            />

                            <Input
                                etiqueta=""
                                tipo="email"
                                nombre="email"
                                valor={formulario.email}
                                placeholder="Correo institucional"
                                error={errores.email}
                                onChange={manejarCambio}
                                className="bg-[#25292e] border-gray-800 text-sm text-white rounded-[3px] focus:ring-0 focus:border-gray-800 placeholder:text-white"
                                requerido
                            />

                            <Input
                                etiqueta=""
                                tipo="password"
                                nombre="contrasena"
                                valor={formulario.contrasena}
                                placeholder="Contraseña"
                                error={errores.contrasena}
                                onChange={manejarCambio}
                                className="bg-[#25292e] border-gray-800 text-sm text-white rounded-[3px] focus:ring-0 focus:border-gray-800 placeholder:text-white"
                                requerido
                            />

                            <Input
                                etiqueta=""
                                tipo="password"
                                nombre="confirmarContrasena"
                                valor={formulario.confirmarContrasena}
                                placeholder="Confirmar contraseña"
                                error={errores.confirmarContrasena}
                                onChange={manejarCambio}
                                className="bg-[#25292e] border-gray-800 text-sm text-white rounded-[3px] focus:ring-0 focus:border-gray-800 placeholder:text-white"
                                requerido
                            />

                            <p className="text-xs text-white text-center my-4">
                                Al registrarte, aceptas nuestras Condiciones, la Política de privacidad y la Política de cookies.
                            </p>

                            <Boton
                                tipo="submit"
                                variante="primario"
                                cargando={cargando}
                                className="w-full py-1.5 text-sm font-semibold rounded-[8px] bg-[#0095f6] hover:bg-[#1877f2]"
                            >
                                Registrarte
                            </Boton>

                            <div className="flex items-center my-4">
                                <div className="flex-1 h-px bg-gray-800"></div>
                                <span className="px-4 text-xs font-semibold text-white uppercase">O</span>
                                <div className="flex-1 h-px bg-gray-800"></div>
                            </div>

                            <button
                                type="button"
                                onClick={iniciarGoogleSignIn}
                                className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-white hover:text-gray-200 cursor-pointer"
                            >
                                <FcGoogle className="text-xl" />
                                <span>Iniciar sesión con Google</span>
                            </button>
                        </form>
                    </motion.div>

                    {/* Caja Secundaria - Login Link */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="w-full rounded-[3px] p-6 text-center"
                    >
                        <p className="text-sm text-white">
                            ¿Tienes una cuenta?{' '}
                            <Link to="/login" className="text-[#0095f6] font-semibold cursor-pointer">
                                Entrar
                            </Link>
                        </p>
                    </motion.div>

                    {/* Sección de descarga eliminada por solicitud del usuario */}
                </div>
            </div>
        </div>
    );
}

export default Registro;
