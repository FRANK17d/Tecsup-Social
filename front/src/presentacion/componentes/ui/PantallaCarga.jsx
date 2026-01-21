import { motion } from 'framer-motion';

export default function PantallaCarga() {
    return (
        <div className="fixed inset-0 bg-[#0c1014] z-50 flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative"
            >
                {/* Logo Principal con efecto de resplandor */}
                <div className="relative z-10">
                    <img
                        src="/logo-tecsup-icono.png"
                        alt="Tecsup Logo"
                        className="w-24 h-24 object-contain"
                    />
                </div>

                {/* Círculos decorativos animados - Ajustados para modo oscuro */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-tecsup-primary/30 rounded-full blur-xl -z-10"
                />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-8 text-2xl font-bold font-sans tracking-wide text-white"
            >
                TECSUP <span className="text-tecsup-primary">SOCIAL</span>
            </motion.h1>

            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "120px" }}
                transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
                className="h-1 bg-gradient-to-r from-tecsup-primary to-blue-500 mt-4 rounded-full"
            />
        </div>
    );
}
