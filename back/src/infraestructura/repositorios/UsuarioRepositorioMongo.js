/**
 * Repositorio Usuario MongoDB - Capa de Infraestructura
 * 
 * Implementación concreta del repositorio de usuarios para MongoDB.
 * Principio: Liskov Substitution - Puede sustituirse por otra implementación
 */

import { ObjectId } from 'mongodb';
import Usuario from '../../dominio/entidades/Usuario.js';
import IUsuarioRepositorio from '../../dominio/repositorios/IUsuarioRepositorio.js';
import conexionMongoDB from '../basedatos/conexion.js';

const COLECCION = 'usuarios';

export class UsuarioRepositorioMongo extends IUsuarioRepositorio {
    /**
     * Obtiene la colección de usuarios
     */
    _obtenerColeccion() {
        return conexionMongoDB.obtenerBD().collection(COLECCION);
    }

    /**
     * Convierte documento de MongoDB a entidad Usuario
     */
    _documentoAEntidad(doc) {
        if (!doc) return null;
        return new Usuario({
            id: doc._id.toString(),
            nombre: doc.nombre,
            email: doc.email,
            contrasena: doc.contrasena,
            rol: doc.rol,
            avatar: doc.avatar,
            fechaCreacion: doc.fechaCreacion,
            activo: doc.activo,
        });
    }

    async crear(usuario) {
        const coleccion = this._obtenerColeccion();

        const documento = {
            nombre: usuario.nombre,
            email: usuario.email,
            contrasena: usuario.contrasena,
            rol: usuario.rol,
            avatar: usuario.avatar,
            fechaCreacion: usuario.fechaCreacion,
            activo: usuario.activo,
        };

        const resultado = await coleccion.insertOne(documento);
        usuario.id = resultado.insertedId.toString();

        return usuario;
    }

    async buscarPorId(id) {
        try {
            const coleccion = this._obtenerColeccion();
            const documento = await coleccion.findOne({ _id: new ObjectId(id) });
            return this._documentoAEntidad(documento);
        } catch (error) {
            // ID inválido de MongoDB
            return null;
        }
    }

    async buscarPorEmail(email) {
        const coleccion = this._obtenerColeccion();
        const documento = await coleccion.findOne({ email: email.toLowerCase() });
        return this._documentoAEntidad(documento);
    }

    async listarTodos() {
        const coleccion = this._obtenerColeccion();
        const documentos = await coleccion.find({ activo: true }).toArray();
        return documentos.map((doc) => this._documentoAEntidad(doc));
    }

    async actualizar(id, datos) {
        try {
            const coleccion = this._obtenerColeccion();

            const resultado = await coleccion.findOneAndUpdate(
                { _id: new ObjectId(id) },
                { $set: datos },
                { returnDocument: 'after' }
            );

            return this._documentoAEntidad(resultado);
        } catch (error) {
            return null;
        }
    }

    async eliminar(id) {
        // Soft delete
        const resultado = await this.actualizar(id, { activo: false });
        return resultado !== null;
    }

    // ==========================================
    // MÉTODOS PARA RECUPERACIÓN DE CONTRASEÑA
    // ==========================================

    async guardarTokenRecuperacion(id, token, expiracion) {
        try {
            const coleccion = this._obtenerColeccion();
            await coleccion.updateOne(
                { _id: new ObjectId(id) },
                {
                    $set: {
                        tokenRecuperacion: token,
                        tokenRecuperacionExpira: expiracion,
                    },
                }
            );
            return true;
        } catch (error) {
            console.error('Error guardando token de recuperación:', error);
            return false;
        }
    }

    async buscarPorTokenRecuperacion(token) {
        const coleccion = this._obtenerColeccion();
        const documento = await coleccion.findOne({ tokenRecuperacion: token });
        return this._documentoAEntidad(documento);
    }

    async actualizarContrasena(id, nuevaContrasena) {
        return this.actualizar(id, { contrasena: nuevaContrasena });
    }

    async limpiarTokenRecuperacion(id) {
        try {
            const coleccion = this._obtenerColeccion();
            await coleccion.updateOne(
                { _id: new ObjectId(id) },
                {
                    $unset: {
                        tokenRecuperacion: '',
                        tokenRecuperacionExpira: '',
                    },
                }
            );
            return true;
        } catch (error) {
            return false;
        }
    }

    // ==========================================
    // MÉTODOS PARA GOOGLE OAUTH
    // ==========================================

    async actualizarGoogleId(id, googleId) {
        return this.actualizar(id, { googleId });
    }

    async buscarPorGoogleId(googleId) {
        const coleccion = this._obtenerColeccion();
        const documento = await coleccion.findOne({ googleId });
        return this._documentoAEntidad(documento);
    }
}

export default UsuarioRepositorioMongo;
