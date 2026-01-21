/**
 * Caso de Uso: Registrar Usuario - Capa de Aplicación
 * 
 * Maneja la lógica de registro de nuevos usuarios.
 * Principio: Single Responsibility - Solo maneja el registro
 * Principio: Dependency Inversion - Depende de abstracciones (repositorio)
 */

import Usuario from '../../../dominio/entidades/Usuario.js';
import { ErrorValidacion, RecursoDuplicado } from '../../../dominio/excepciones/ExcepcionDominio.js';

export class RegistrarUsuario {
    /**
     * @param {Object} dependencias
     * @param {IUsuarioRepositorio} dependencias.usuarioRepositorio
     * @param {Object} dependencias.servicioHash - Servicio para hashear contraseñas
     */
    constructor({ usuarioRepositorio, servicioHash }) {
        this.usuarioRepositorio = usuarioRepositorio;
        this.servicioHash = servicioHash;
    }

    /**
     * Ejecuta el caso de uso
     * @param {Object} datos - Datos del usuario a registrar
     * @returns {Promise<Usuario>} Usuario creado
     */
    async ejecutar({ nombre, email, contrasena, rol = 'estudiante' }) {
        // 1. Crear entidad y validar
        const usuario = new Usuario({
            nombre,
            email: email.toLowerCase().trim(),
            contrasena,
            rol,
        });

        const validacion = usuario.validar();
        if (!validacion.esValido) {
            throw new ErrorValidacion(validacion.errores);
        }

        // 2. Verificar si el email ya existe
        const usuarioExistente = await this.usuarioRepositorio.buscarPorEmail(usuario.email);
        if (usuarioExistente) {
            throw new RecursoDuplicado('usuario', 'email');
        }

        // 3. Hashear contraseña
        usuario.contrasena = await this.servicioHash.hashear(usuario.contrasena);

        // 4. Guardar en base de datos
        const usuarioCreado = await this.usuarioRepositorio.crear(usuario);

        return usuarioCreado;
    }
}

export default RegistrarUsuario;
