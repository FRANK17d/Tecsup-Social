/**
 * Componente Avatar - UI Base
 * 
 * Muestra avatar de usuario o iniciales.
 */

export function Avatar({
    src,
    nombre = '',
    tamano = 'md',
    className = ''
}) {
    const tamanos = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-14 h-14 text-lg',
        xl: 'w-20 h-20 text-2xl',
    };


    if (src) {
        return (
            <img
                src={src}
                alt={nombre}
                className={`${tamanos[tamano]} rounded-full object-cover ${className}`}
            />
        );
    }

    return (
        <div
            className={`
        ${tamanos[tamano]} 
        bg-[#262626] 
        rounded-full flex items-center justify-center 
        overflow-hidden
        ${className}
      `}
        >
            <svg
                className="w-full h-full text-[#737373] transform translate-y-1"
                fill="currentColor"
                viewBox="0 0 24 24"
            >
                <path d="M24 22.525H0l1.241-2.12c1.93-3.298 5.483-5.32 9.288-5.32h2.942c3.806 0 7.359 2.022 9.288 5.32l1.241 2.12zM12 14.28c-3.411 0-6.176-2.766-6.176-6.177 0-3.41 2.765-6.176 6.176-6.176 3.41 0 6.176 2.766 6.176 6.176 0 3.411-2.766 6.177-6.176 6.177z" />
            </svg>
        </div>
    );
}

export default Avatar;
