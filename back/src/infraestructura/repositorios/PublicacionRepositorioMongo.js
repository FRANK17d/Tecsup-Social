/**
 * Repositorio Publicación MongoDB - Capa de Infraestructura
 */

import { ObjectId } from 'mongodb';
import Publicacion from '../../dominio/entidades/Publicacion.js';
import IPublicacionRepositorio from '../../dominio/repositorios/IPublicacionRepositorio.js';
import conexionMongoDB from '../basedatos/conexion.js';

const COLECCION = 'publicaciones';

export class PublicacionRepositorioMongo extends IPublicacionRepositorio {
    _obtenerColeccion() {
        return conexionMongoDB.obtenerBD().collection(COLECCION);
    }

    _documentoAEntidad(doc) {
        if (!doc) return null;
        return new Publicacion({
            id: doc._id.toString(),
            autorId: doc.autorId,
            contenido: doc.contenido,
            imagenes: doc.imagenes || [],
            reacciones: doc.reacciones || [],
            comentarios: doc.comentarios || [],
            fechaCreacion: doc.fechaCreacion,
            fechaActualizacion: doc.fechaActualizacion,
            activo: doc.activo,
        });
    }

    async crear(publicacion) {
        const coleccion = this._obtenerColeccion();

        const documento = {
            autorId: publicacion.autorId,
            contenido: publicacion.contenido,
            imagenes: publicacion.imagenes,
            reacciones: [],
            comentarios: [],
            fechaCreacion: publicacion.fechaCreacion,
            fechaActualizacion: null,
            activo: true,
        };

        const resultado = await coleccion.insertOne(documento);
        publicacion.id = resultado.insertedId.toString();

        return publicacion;
    }

    async buscarPorId(id) {
        try {
            const coleccion = this._obtenerColeccion();
            const documento = await coleccion.findOne({ _id: new ObjectId(id), activo: true });
            return this._documentoAEntidad(documento);
        } catch (error) {
            return null;
        }
    }

    async listarTodas({ pagina = 1, limite = 10 } = {}) {
        const coleccion = this._obtenerColeccion();
        const saltar = (pagina - 1) * limite;

        const documentos = await coleccion
            .find({ activo: true })
            .sort({ fechaCreacion: -1 })
            .skip(saltar)
            .limit(limite)
            .toArray();

        return documentos.map((doc) => this._documentoAEntidad(doc));
    }

    async listarPorAutor(autorId) {
        const coleccion = this._obtenerColeccion();

        const documentos = await coleccion
            .find({ autorId, activo: true })
            .sort({ fechaCreacion: -1 })
            .toArray();

        return documentos.map((doc) => this._documentoAEntidad(doc));
    }

    async actualizar(id, datos) {
        try {
            const coleccion = this._obtenerColeccion();

            const resultado = await coleccion.findOneAndUpdate(
                { _id: new ObjectId(id) },
                {
                    $set: {
                        ...datos,
                        fechaActualizacion: new Date()
                    }
                },
                { returnDocument: 'after' }
            );

            return this._documentoAEntidad(resultado);
        } catch (error) {
            return null;
        }
    }

    async eliminar(id) {
        const resultado = await this.actualizar(id, { activo: false });
        return resultado !== null;
    }

    async agregarComentario(publicacionId, comentario) {
        const coleccion = this._obtenerColeccion();

        const comentarioDoc = {
            id: new ObjectId().toString(),
            autorId: comentario.autorId,
            contenido: comentario.contenido,
            fechaCreacion: comentario.fechaCreacion,
            activo: true,
        };

        await coleccion.updateOne(
            { _id: new ObjectId(publicacionId) },
            { $push: { comentarios: comentarioDoc } }
        );

        return comentarioDoc;
    }

    async agregarReaccion(publicacionId, usuarioId, tipo) {
        const coleccion = this._obtenerColeccion();

        // Primero intentamos quitar reacción existente
        await coleccion.updateOne(
            { _id: new ObjectId(publicacionId) },
            { $pull: { reacciones: { usuarioId } } }
        );

        // Luego agregamos la nueva reacción
        await coleccion.updateOne(
            { _id: new ObjectId(publicacionId) },
            {
                $push: {
                    reacciones: {
                        usuarioId,
                        tipo,
                        fecha: new Date()
                    }
                }
            }
        );
    }

    async quitarReaccion(publicacionId, usuarioId) {
        const coleccion = this._obtenerColeccion();

        await coleccion.updateOne(
            { _id: new ObjectId(publicacionId) },
            { $pull: { reacciones: { usuarioId } } }
        );
    }
}

export default PublicacionRepositorioMongo;
