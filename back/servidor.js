/**
 * Servidor Principal - Red Social de Aula
 * 
 * Punto de entrada de la aplicación Express.
 * Configura middlewares, rutas y conecta a MongoDB.
 */

import express from 'express';
import cors from 'cors';
import configuracion from './configuracion/variables.js';
import conexionMongoDB from './src/infraestructura/basedatos/conexion.js';
import rutas from './src/presentacion/rutas/indice.js';
import { manejadorErrores, rutaNoEncontrada } from './src/presentacion/middlewares/manejadorErrores.js';

// Crear aplicación Express
const app = express();

// ==========================================
// MIDDLEWARES
// ==========================================

// CORS - Permitir peticiones del frontend
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        process.env.FRONTEND_URL 
    ].filter(Boolean),
    credentials: true,
}));

// Parsear JSON
app.use(express.json({ limit: '10mb' }));

// Parsear URL encoded
app.use(express.urlencoded({ extended: true }));

// Logger simple para desarrollo
if (configuracion.servidor.entorno === 'development') {
    app.use((req, res, next) => {
        console.log(`📨 ${req.method} ${req.path}`);
        next();
    });
}

// ==========================================
// RUTAS
// ==========================================

// Ruta raíz
app.get('/', (req, res) => {
    res.json({
        nombre: 'Red Social de Aula - API',
        version: '1.0.0',
        documentacion: '/api/salud',
    });
});

// Rutas de la API
app.use('/api', rutas);

// ==========================================
// MANEJO DE ERRORES
// ==========================================

// Ruta no encontrada (404)
app.use(rutaNoEncontrada);

// Manejador de errores global
app.use(manejadorErrores);

// ==========================================
// INICIAR SERVIDOR
// ==========================================

const iniciar = async () => {
    try {
        // Conectar a MongoDB
        await conexionMongoDB.conectar();

        // Iniciar servidor HTTP
        const puerto = configuracion.servidor.puerto;
        app.listen(puerto, () => {
            console.log('🚀 Servidor iniciado:');
            console.log(`   → Local: http://localhost:${puerto}`);
            console.log(`   → API:   http://localhost:${puerto}/api`);
            console.log(`   → Salud: http://localhost:${puerto}/api/salud`);
        });
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

// Manejar cierre graceful
process.on('SIGINT', async () => {
    console.log('\n🛑 Cerrando servidor...');
    await conexionMongoDB.cerrar();
    process.exit(0);
});

// Iniciar aplicación
iniciar();
