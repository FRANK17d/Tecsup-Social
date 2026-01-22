import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import { IoAlertCircle } from 'react-icons/io5';
import Input from '../componentes/ui/Input.jsx';
import Boton from '../componentes/ui/Boton.jsx';
import CarruselAutenticacion from '../componentes/compartidos/CarruselAutenticacion.jsx';
import { useAutenticacion } from '../contextos/ContextoAutenticacion.jsx';
import useGoogleAuth from '../hooks/useGoogleAuth.js';
import PantallaCarga from '../componentes/ui/PantallaCarga.jsx';

export function InicioSesion() {
    const navigate = useNavigate();
    const { iniciarSesion } = useAutenticacion();
    const { iniciarGoogleSignIn } = useGoogleAuth();

    const [formulario, setFormulario] = useState({
        email: '',
        contrasena: '',
    });
    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(false);
    const [redirigiendo, setRedirigiendo] = useState(false);

    useEffect(() => {
        document.title = 'Inicio Sesión | Tecsup Social';
    }, []);

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setFormulario(prev => ({ ...prev, [name]: value }));
        setErrores(prev => ({ ...prev, [name]: '' }));
    };

    const validar = () => {
        const nuevosErrores = {};
        if (!formulario.email) nuevosErrores.email = 'El email es requerido';
        if (!formulario.contrasena) nuevosErrores.contrasena = 'La contraseña es requerida';
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        if (!validar()) return;

        setCargando(true);
        const resultado = await iniciarSesion(formulario.email, formulario.contrasena);

        if (resultado.exito) {
            setRedirigiendo(true);
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } else {
            setErrores({ general: resultado.error || 'Credenciales incorrectas' });
            setCargando(false);
        }
    };

    return (
        <>
            {redirigiendo && <PantallaCarga />}
            <div className="min-h-screen bg-[#000000] flex items-center justify-center font-sans text-white p-4">
                <div className="flex w-full max-w-[1000px] items-center justify-center gap-10">
                    {/* Componente Carrusel (Lado Izquierdo - Visual) */}
                    <CarruselAutenticacion />

                    {/* Columna Derecha - Formulario */}
                    <div className="flex flex-col items-center justify-center w-full max-w-[350px] space-y-3">
                        {/* Caja Principal - Login */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="w-full rounded-[3px] p-8 mb-3"
                        >
                            <div className="text-center mb-10">
                                {/* Logo corregido: w-auto para respetar proporciones */}
                                <img
                                    src="/logo-tecsup.png"
                                    alt="Logo Tecsup"
                                    className="h-16 w-auto mx-auto mb-6 object-contain"
                                />
                            </div>

                            {errores.general && (
                                <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-600 text-sm rounded-r flex items-center gap-2">
                                    <IoAlertCircle className="w-5 h-5 flex-shrink-0" />
                                    {errores.general}
                                </div>
                            )}

                            <form onSubmit={manejarEnvio} className="space-y-3">
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

                                <Boton
                                    tipo="submit"
                                    variante="primario"
                                    cargando={cargando}
                                    className="w-full py-1.5 text-sm font-semibold rounded-[8px] bg-[#0095f6] hover:bg-[#1877f2]"
                                >
                                    Iniciar sesión
                                </Boton>

                                <div className="flex items-center my-4">
                                    <div className="flex-1 h-px bg-gray-800"></div>
                                    <span className="px-4 text-xs font-semibold text-white uppercase">O</span>
                                    <div className="flex-1 h-px bg-gray-800"></div>
                                </div>

                                <button
                                    type="button"
                                    onClick={iniciarGoogleSignIn}
                                    className="w-full flex items-center justify-center gap-2 mb-4 text-sm font-semibold text-white hover:text-gray-200 cursor-pointer"
                                >
                                    <FcGoogle className="text-xl" />
                                    <span>Iniciar sesión con Google</span>
                                </button>

                                <div className="text-center">
                                    <Link to="/recuperar-contrasena" className="text-xs text-[#00376b] hover:text-[#0095f6] font-medium cursor-pointer">
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </div>
                            </form>
                        </motion.div>

                        {/* Caja Secundaria - Registro */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            className="w-full rounded-[3px] p-6 text-center"
                        >
                            <p className="text-sm text-white">
                                ¿No tienes una cuenta?{' '}
                                <Link to="/registro" className="text-[#0095f6] font-semibold cursor-pointer">
                                    Regístrate
                                </Link>
                            </p>
                        </motion.div>

                        {/* Sección de descarga eliminada por solicitud del usuario */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default InicioSesion;
