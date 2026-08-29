import React from 'react';
import { Flame, MapPin, ArrowDown } from 'lucide-react';
import logoImg from '../assets/images/logo_los_profes_original.jpeg';

interface HeroBannerProps {
  onScrollToMenu: () => void;
  onScrollToLocation: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onScrollToMenu,
  onScrollToLocation,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 border-b border-zinc-800/80">
      {/* Glow / lighting effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider shadow-sm">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
              <span>NUESTRA CARNE ES 100% CASERA</span>
            </div>

            {/* Main Display Headline */}
            <div className="space-y-1">
              <h1 className="font-bebas text-5xl sm:text-6xl lg:text-7xl text-white tracking-wider leading-[0.95]">
                HAMBURGUESAS Y PAPAS EN CONO
              </h1>
              <p className="font-bebas text-4xl sm:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-500 tracking-wide">
                LOS PROFES
              </p>
            </div>

            <p className="text-zinc-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Carne de res 100% casera de 120g, deliciosas opciones con papas a la francesa, conos de papas con boneless, pastor o fajita, y 11 salsas y aderezos para acompañar.
            </p>

            {/* Quick Badges Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-lg mx-auto lg:mx-0 pt-2">
              <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-center">
                <span className="font-bebas text-xl sm:text-2xl text-amber-400 block leading-none">120gr</span>
                <span className="text-[10px] sm:text-xs text-zinc-400 font-medium">Carne de Res</span>
              </div>
              <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-center">
                <span className="font-bebas text-xl sm:text-2xl text-orange-400 block leading-none">11 Salsas</span>
                <span className="text-[10px] sm:text-xs text-zinc-400 font-medium">Y Aderezos</span>
              </div>
              <div className="p-2.5 sm:p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-center">
                <span className="font-bebas text-xl sm:text-2xl text-red-400 block leading-none">100%</span>
                <span className="text-[10px] sm:text-xs text-zinc-400 font-medium">Sabor Casero</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-3">
              <button
                type="button"
                onClick={onScrollToMenu}
                id="hero-order-now-btn"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-amber-500/20 active:scale-95 transition-all"
              >
                <span>Ver Menú y Pedir</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onScrollToLocation}
                id="hero-location-btn"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-bold text-sm border border-zinc-800 transition-colors flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>Ubicación en Jiménez</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Showcase Frame with Clean Centered Logo */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              <div className="relative rounded-3xl overflow-hidden bg-zinc-950 border-2 border-amber-500/50 shadow-2xl shadow-orange-950/60 p-2 sm:p-3 ring-1 ring-amber-500/20">
                <div className="w-full flex items-center justify-center relative group overflow-hidden rounded-2xl bg-zinc-900/50">
                  <img
                    src={logoImg}
                    alt="Logo Oficial Los Profes - Hamburguesas y Papas en Cono"
                    className="w-full h-auto object-contain rounded-xl group-hover:scale-[1.03] transition-transform duration-300 shadow-md"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
