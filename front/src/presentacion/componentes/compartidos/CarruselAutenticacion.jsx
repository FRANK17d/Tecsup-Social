import { motion } from 'framer-motion';

export function CarruselAutenticacion() {
    return (
        <div className="hidden lg:flex items-center justify-center relative bg-transparent pr-12">
            {/* Contenedor relativo que agrupa imagen y texto sobrepuesto */}
            <div className="relative w-[500px] h-[700px]">

                {/* 1. Capa Imagen Flotante */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0 bg-contain bg-center bg-no-repeat z-0"
                    style={{
                        backgroundImage: "url('/tecsup-social-floating.png')",
                    }}
                />

                {/* 2. Capa de Texto (Overlay) */}
                <div className="absolute inset-0 z-10 flex flex-col justify-end pb-12 px-2">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="space-y-2 text-center"
                    >
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default CarruselAutenticacion;
