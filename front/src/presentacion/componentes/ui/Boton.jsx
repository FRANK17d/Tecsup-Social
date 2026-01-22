/**
 * Componente Boton - UI Base Refinado
 */

export function Boton({
    children,
    variante = 'primario',
    tamano = 'md',
    cargando = false,
    deshabilitado = false,
    tipo = 'button',
    className = '',
    onClick,
    ...props
}) {
    const estilosBase = 'cursor-pointer inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0';

    const variantes = {
        primario: 'bg-[#009EE3] text-white hover:bg-[#0082BC] shadow-lg shadow-[#009EE3]/30 hover:-translate-y-0.5 focus:ring-[#009EE3]',
        secundario: 'bg-[#121212] text-white border border-[#262626] hover:bg-[#262626] hover:border-[#363636] focus:ring-[#262626]',
        peligro: 'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/30 hover:-translate-y-0.5 focus:ring-red-500',
        fantasma: 'bg-transparent text-white hover:bg-[#121212] focus:ring-[#262626]',
    };

    const tamanos = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-base',
        lg: 'px-8 py-3.5 text-lg',
    };

    return (
        <button
            type={tipo}
            disabled={deshabilitado || cargando}
            onClick={onClick}
            className={`${estilosBase} ${variantes[variante]} ${tamanos[tamano]} ${className}`}
            {...props}
        >
            {cargando && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            )}
            <span>{children}</span>
        </button>
    );
}

export default Boton;
