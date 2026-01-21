/**
 * Conexión a MongoDB - Capa de Infraestructura
 * 
 * Singleton para manejar la conexión a la base de datos.
 * Usa el driver nativo de MongoDB.
 */

import { MongoClient } from 'mongodb';
import configuracion from '../../../configuracion/variables.js';

class ConexionMongoDB {
    constructor() {
        this.cliente = null;
        this.baseDatos = null;
    }

    /**
     * Conecta a la base de datos
     * @returns {Promise<Db>} Instancia de la base de datos
     */
    async conectar() {
        if (this.baseDatos) {
            return this.baseDatos;
        }

        try {
            this.cliente = new MongoClient(configuracion.mongodb.uri);
            await this.cliente.connect();

            // Extraer nombre de la base de datos de la URI
            const nombreBD = configuracion.mongodb.uri.split('/').pop().split('?')[0] || 'red_social_aula';
            this.baseDatos = this.cliente.db(nombreBD);

            console.log('✅ Conectado a MongoDB:', nombreBD);
            return this.baseDatos;
        } catch (error) {
            console.error('❌ Error al conectar a MongoDB:', error.message);
            throw error;
        }
    }

    /**
     * Obtiene la instancia de la base de datos
     * @returns {Db}
     */
    obtenerBD() {
        if (!this.baseDatos) {
            throw new Error('Base de datos no conectada. Llama a conectar() primero.');
        }
        return this.baseDatos;
    }

    /**
     * Cierra la conexión
     */
    async cerrar() {
        if (this.cliente) {
            await this.cliente.close();
            this.cliente = null;
            this.baseDatos = null;
            console.log('🔌 Conexión a MongoDB cerrada');
        }
    }
}

// Exportar instancia singleton
export const conexionMongoDB = new ConexionMongoDB();
export default conexionMongoDB;
