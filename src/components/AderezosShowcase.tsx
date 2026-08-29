import React from 'react';
import { Flame } from 'lucide-react';
import { AVAILABLE_ADEREZOS } from '../data/menuData';

export const AderezosShowcase: React.FC = () => {
  const sauceIcons: { [key: string]: string } = {
    'Salsa Búfalo': '🌶️',
    'Salsa Búfalo Ranch': '🥣',
    'Salsa Limón Pepper': '🍋',
    'Salsa BBQ': '🍖',
    'Salsa BBQ Picosita': '🔥',
    'Valentina': '🌶️',
    'Salsa Picosita': '🌶️',
    'Tocino Deshidratado': '🥓',
    'Salsa Cheddar': '🧀',
    'Salsa Mango Habanero': '🥭',
    'Aderezo de la Casa': '⭐',
  };

  return (
    <section id="aderezos-section" className="py-12 border-t border-b border-zinc-800/80 bg-zinc-900/40 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 fill-orange-400" />
            ¡Pruébalas Todas!
          </div>
          <h2 className="font-bebas text-3xl sm:text-4xl lg:text-5xl text-zinc-100 tracking-wide">
            NUESTRAS 11 SALSAS Y ADEREZOS
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Conoce cada una de nuestras opciones preparadas. En el local las pones tú mismo a tu gusto en persona para tus papas y hamburguesas.
          </p>
        </div>

        {/* Grid of Sauces without extra costs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {AVAILABLE_ADEREZOS.map((sauce) => {
            const icon = sauceIcons[sauce.name] || '🥫';

            return (
              <div
                key={sauce.id}
                className="bg-zinc-900/90 hover:bg-zinc-850 border border-zinc-800/90 hover:border-amber-500/40 rounded-2xl p-4 flex flex-col justify-start transition-all duration-200 group"
              >
                <div className="space-y-2.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/60 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                    <span>{icon}</span>
                  </div>

                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-zinc-100 group-hover:text-amber-400 transition-colors leading-tight">
                      {sauce.name}
                    </h3>
                    <p className="text-[11px] text-zinc-400 mt-1.5 leading-snug">
                      {sauce.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
