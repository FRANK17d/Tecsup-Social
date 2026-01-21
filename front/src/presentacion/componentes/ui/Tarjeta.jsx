/**
 * Componente Tarjeta - UI Base Refinado
 */

export function Tarjeta({ children, className = '', onClick }) {
    return (
        <div
            className={`bg-white rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden transition-all duration-300 ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

export function TarjetaCabecera({ children, className = '' }) {
    return (
        <div className={`px-6 py-4 border-b border-gray-50 ${className}`}>
            {children}
        </div>
    );
}

export function TarjetaCuerpo({ children, className = '' }) {
    return (
        <div className={`px-6 py-5 ${className}`}>
            {children}
        </div>
    );
}

export function TarjetaPie({ children, className = '' }) {
    return (
        <div className={`px-6 py-4 bg-gray-50/50 border-t border-gray-50 ${className}`}>
            {children}
        </div>
    );
}

export default Tarjeta;
