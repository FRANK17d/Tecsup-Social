/**
 * Componente Input - UI Base Refinado
 */

export function Input({
    etiqueta,
    tipo = 'text',
    nombre,
    valor,
    placeholder,
    error,
    requerido = false,
    deshabilitado = false,
    className = '',
    onChange,
    ...props
}) {
    return (
        <div className="mb-4 relative">
            {/* Eliminamos label externo para usar el flotante interno */}
            <div className="relative">
                <input
                    type={tipo}
                    id={nombre}
                    name={nombre}
                    value={valor}
                    placeholder=" " // Espacio vacío necesario para que funcione peer-placeholder-shown
                    disabled={deshabilitado}
                    required={requerido}
                    onChange={onChange}
                    className={`
                        block w-full px-5 pt-6 pb-2 rounded-[3px] 
                        text-sm text-white bg-[#121212] 
                        border border-[#363636]
                        appearance-none focus:outline-none focus:ring-0 focus:border-[#737373] peer
                        disabled:bg-[#363636] disabled:cursor-not-allowed
                        ${error ? 'border-red-500' : ''}
                        ${className}
                    `}
                    {...props}
                />
                <label
                    htmlFor={nombre}
                    className={`
                        absolute text-xs text-white duration-300 transform 
                        -translate-y-3 scale-100 top-4 z-10 origin-left left-5
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm
                        peer-focus:scale-100 peer-focus:-translate-y-3 peer-focus:text-xs
                        peer-focus:text-white
                        pointer-events-none
                    `}
                >
                    {placeholder}
                </label>
            </div>
            {error && (
                <p className="mt-1 text-xs text-red-500 ml-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
}

export default Input;
