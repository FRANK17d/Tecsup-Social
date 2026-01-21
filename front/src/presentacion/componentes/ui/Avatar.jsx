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

    const iniciales = nombre
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    // Generar color basado en el nombre
    const colores = [
        'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500',
        'bg-lime-500', 'bg-green-500', 'bg-emerald-500', 'bg-teal-500',
        'bg-cyan-500', 'bg-sky-500', 'bg-blue-500', 'bg-indigo-500',
        'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500', 'bg-pink-500',
    ];
    const colorIndex = nombre.length % colores.length;
    const colorFondo = colores[colorIndex];

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
        ${colorFondo} 
        rounded-full flex items-center justify-center 
        text-white font-semibold
        ${className}
      `}
        >
            {iniciales || '?'}
        </div>
    );
}

export default Avatar;
