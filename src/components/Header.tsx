import React from 'react';
import { Phone, MapPin, ShoppingBag, Flame, Facebook, MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import logoImg from '../assets/images/logo_los_profes_original.jpeg';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onScrollToLocation: () => void;
  onScrollToAderezos: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onScrollToLocation,
  onScrollToAderezos,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white text-xs font-bold py-1.5 px-4 text-center flex items-center justify-center gap-2 shadow-inner">
        <Flame className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-pulse" />
        <span>¡Nuestra carne es 100% Casera! • Santander Jiménez, Tamaulipas</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo & Brand */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 p-0.5 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <div className="w-full h-full rounded-[14px] bg-zinc-950 p-0.5 flex items-center justify-center overflow-hidden">
                <img
                  src={logoImg}
                  alt="Los Profes Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bebas text-2xl sm:text-3xl text-zinc-100 tracking-wide leading-none group-hover:text-amber-400 transition-colors">
                  LOS PROFES
                </h1>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase tracking-wider">
                  Jiménez, Tamps.
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 font-medium truncate">
                Hamburguesas y Papas en Cono
              </p>
            </div>
          </div>

          {/* Quick Action Navigation & Links */}
          <div className="hidden lg:flex items-center gap-4 text-sm">
            <button
              onClick={onScrollToAderezos}
              className="text-zinc-300 hover:text-amber-400 font-medium transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-zinc-900"
            >
              <span>🥫</span>
              <span>Salsas y Aderezos</span>
            </button>

            <button
              onClick={onScrollToLocation}
              className="text-zinc-300 hover:text-amber-400 font-medium transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-zinc-900"
            >
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>Ubicación</span>
            </button>

            <a
              href={RESTAURANT_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-300 hover:text-blue-400 font-medium transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-zinc-900 border border-zinc-800"
              title="Página de Facebook Los Profes"
            >
              <Facebook className="w-4 h-4 text-blue-500" />
              <span>Facebook</span>
            </a>

            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/60 hover:bg-emerald-900/40"
            >
              <MessageCircle className="w-4 h-4 fill-emerald-500/20 text-emerald-400" />
              <span>WhatsApp: {RESTAURANT_INFO.phone}</span>
            </a>
          </div>

          {/* Right Action: WhatsApp/Facebook Quick Button (mobile/tablet) + Cart Trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              id="header-whatsapp-btn"
              className="lg:hidden p-2.5 rounded-xl bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 hover:bg-emerald-900/50 transition-all flex items-center justify-center"
              aria-label="Abrir WhatsApp de Los Profes"
            >
              <MessageCircle className="w-5 h-5 fill-emerald-500/20" />
            </a>

            <a
              href={RESTAURANT_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="header-facebook-btn"
              className="hidden sm:flex lg:hidden p-2.5 rounded-xl bg-zinc-900 text-blue-400 border border-zinc-800 hover:bg-zinc-800 hover:border-blue-500/40 transition-all items-center justify-center"
              aria-label="Abrir Facebook de Los Profes"
            >
              <Facebook className="w-5 h-5" />
            </a>

            <button
              onClick={onOpenCart}
              id="header-cart-button"
              className="relative flex items-center gap-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-zinc-950 font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-amber-500/25 active:scale-95 transition-all duration-150"
              aria-label="Ver carrito de compras"
            >
              <ShoppingBag className="w-5 h-5 text-zinc-950" />
              <div className="flex flex-col text-left leading-none">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-900/80">Carrito</span>
                <span className="font-extrabold text-sm sm:text-base">${cartTotal.toFixed(2)}</span>
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-zinc-950 shadow-md animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
