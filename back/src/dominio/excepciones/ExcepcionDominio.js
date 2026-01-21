/**
 * Excepciones de Dominio - Capa de Dominio
 * 
 * Excepciones personalizadas para errores del negocio.
 * Principio: Single Responsibility - Cada excepción representa un tipo de error específico
 */

/**
 * Excepción base para errores de dominio
 */
export class ExcepcionDominio extends Error {
    constructor(mensaje, codigo = 'ERROR_DOMINIO') {
        super(mensaje);
        this.name = 'ExcepcionDominio';
        this.codigo = codigo;
    }
}

/**
 * Error cuando no se encuentra un recurso
 */
export class RecursoNoEncontrado extends ExcepcionDominio {
    constructor(recurso, id) {
        super(`${recurso} con id ${id} no encontrado`, 'RECURSO_NO_ENCONTRADO');
        this.name = 'RecursoNoEncontrado';
        this.recurso = recurso;
        this.idRecurso = id;
    }
}

/**
 * Error de validación de datos
 */
export class ErrorValidacion extends ExcepcionDominio {
    constructor(errores) {
        super('Error de validación', 'ERROR_VALIDACION');
        this.name = 'ErrorValidacion';
        this.errores = errores;
    }
}

/**
 * Error de autenticación
 */
export class ErrorAutenticacion extends ExcepcionDominio {
    constructor(mensaje = 'Credenciales inválidas') {
        super(mensaje, 'ERROR_AUTENTICACION');
        this.name = 'ErrorAutenticacion';
    }
}

/**
 * Error de autorización
 */
export class ErrorAutorizacion extends ExcepcionDominio {
    constructor(mensaje = 'No tienes permisos para realizar esta acción') {
        super(mensaje, 'ERROR_AUTORIZACION');
        this.name = 'ErrorAutorizacion';
    }
}

/**
 * Error cuando ya existe un recurso duplicado
 */
export class RecursoDuplicado extends ExcepcionDominio {
    constructor(recurso, campo) {
        super(`Ya existe un ${recurso} con ese ${campo}`, 'RECURSO_DUPLICADO');
        this.name = 'RecursoDuplicado';
        this.recurso = recurso;
        this.campo = campo;
    }
}

export default {
    ExcepcionDominio,
    RecursoNoEncontrado,
    ErrorValidacion,
    ErrorAutenticacion,
    ErrorAutorizacion,
    RecursoDuplicado,
};
