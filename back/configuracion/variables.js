/**
 * Configuración centralizada de variables de entorno
 * Principio: Single Responsibility - Solo maneja configuración
 */
import dotenv from 'dotenv';

dotenv.config();

export const configuracion = {
    // Base de datos
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/red_social_aula',
    },

    // Servidor
    servidor: {
        puerto: parseInt(process.env.PORT || process.env.PUERTO, 10) || 3001,
        entorno: process.env.NODE_ENV || 'development',
    },

    // JWT
    jwt: {
        secreto: process.env.JWT_SECRETO || 'secreto_por_defecto',
        expiracion: process.env.JWT_EXPIRACION || '7d',
    },
};

export default configuracion;
