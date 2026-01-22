import { useRef } from 'react';
import { IoAdd } from 'react-icons/io5';

export function CarruselHistorias() {
    const scrollRef = useRef(null);

    const historias = [
        { id: 'me', nombre: 'Tu historia', img: null, visto: false },
        { id: 1, nombre: 'itzzdi.co', img: 'https://i.pravatar.cc/150?u=1', visto: false },
        { id: 2, nombre: 'fedevigevani', img: 'https://i.pravatar.cc/150?u=2', visto: false },
        { id: 3, nombre: 'andrewgpon', img: 'https://i.pravatar.cc/150?u=3', visto: false },
        { id: 4, nombre: 'maisak', img: 'https://i.pravatar.cc/150?u=4', visto: false },
        { id: 5, nombre: 'ale_viral', img: 'https://i.pravatar.cc/150?u=5', visto: false },
        { id: 6, nombre: 'feid', img: 'https://i.pravatar.cc/150?u=6', visto: false },
        { id: 7, nombre: 'carlos_d', img: 'https://i.pravatar.cc/150?u=7', visto: true },
        { id: 8, nombre: 'maria_l', img: 'https://i.pravatar.cc/150?u=8', visto: true },
    ];

    return (
        <div className="mb-6 overflow-hidden">
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {/* User's own story add button */}
                <div className="flex flex-col items-center gap-1 min-w-[105px] cursor-pointer">
                    <div className="relative w-[100px] h-[100px]">
                        <div className="w-full h-full rounded-full p-[2px] bg-transparent">
                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#262626] bg-[#262626]">
                                <img
                                    src="https://i.pravatar.cc/150?u=0" // User avatar placeholder
                                    alt="Tu historia"
                                    className="w-full h-full object-cover opacity-75"
                                />
                            </div>
                        </div>
                        <div className="absolute bottom-0 right-0 bg-[#009EE3] text-white rounded-full p-0.5 border-2 border-[#11151a]">
                            <IoAdd size={16} />
                        </div>
                    </div>
                    <span className="text-xs text-white truncate w-full text-center">
                        Tu historia
                    </span>
                </div>

                {/* Other stories - Showing 5 others + 1 self = 6 total */}
                {historias.slice(1, 6).map((historia) => (
                    <div key={historia.id} className="flex flex-col items-center gap-1 min-w-[105px] cursor-pointer group">
                        <div className={`
                            w-[100px] h-[100px] rounded-full p-[2px] 
                            ${historia.visto
                                ? 'bg-[#3A3B3C]'
                                : 'bg-gradient-to-tr from-[#0055ff] via-[#aa00ff] to-[#ff0055]'} 
                            /* Gradient simulates "colors of the logo" if we interpret logo as generic vibrant or try to match Tecsup Blue/Red */
                            /* User said "colors of the logo" - Tecsup is Blue #009EE3 and Red */
                            /* Let's try to match Tecsup styles explicitly */
                        `}>
                            {/* Overriding the gradient above with inline style for precise Tecsup Logo Brand colors if needed, but Tailwind classes are cleaner. 
                                Let's use specific Tecsup-like colors for the gradient: Blue to Red
                             */}
                            <div className={`
                                w-full h-full rounded-full p-[2px] 
                                ${historia.visto ? 'bg-[#555]' : 'bg-gradient-to-tr from-[#009EE3] to-[#FF3D00]'}
                             `}>
                                <div className="w-full h-full rounded-full border-2 border-[#11151a] overflow-hidden bg-[#262626]">
                                    <img
                                        src={historia.img}
                                        alt={historia.nombre}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                        </div>
                        <span className="text-xs text-white truncate w-full text-center">
                            {historia.nombre}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CarruselHistorias;
