/**
 * Componente Tarjeta - UI Base Refinado
 */

export function Tarjeta({ children, className = '', onClick }) {
    return (
        <div
            className={`bg-[#0f141a] rounded-xl shadow-md overflow-hidden transition-all duration-300 ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

export function TarjetaCabecera({ children, className = '' }) {
    return (
        <div className={`px-6 py-4 border-b border-[#262626] ${className}`}>
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
        <div className={`px-6 py-4 bg-[#121212]/50 border-t border-[#262626] ${className}`}>
            {children}
        </div>
    );
}

export default Tarjeta;
