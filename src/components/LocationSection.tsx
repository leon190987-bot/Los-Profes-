import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Facebook,
  MessageCircle,
  Copy,
  Check,
  ExternalLink,
  Award,
  Navigation,
  Store,
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(RESTAURANT_INFO.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="location-section" className="py-16 bg-zinc-950 relative border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Store className="w-3.5 h-3.5" />
            Visítanos en Nuestro Local
          </span>
          <h2 className="font-bebas text-3xl sm:text-4xl lg:text-5xl text-white tracking-wide">
            UBICACIÓN
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Estamos ubicados en la Zona Centro de Santander Jiménez, Tamaulipas.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card 1: Address & Fast Actions (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bebas text-2xl text-zinc-100">DIRECCIÓN DEL LOCAL</h3>
                    <p className="text-xs text-amber-400 font-semibold">Santander Jiménez, Tamaulipas</p>
                  </div>
                </div>

                <button
                  onClick={handleCopyAddress}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold border border-zinc-700 transition-colors shrink-0"
                  title="Copiar dirección al portapapeles"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">¡Copiada!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              {/* Formatted Address Box */}
              <div className="p-4 bg-zinc-950/70 border border-zinc-800 rounded-2xl space-y-1">
                <p className="text-base font-bold text-zinc-100">{RESTAURANT_INFO.address}</p>
                <p className="text-sm text-zinc-400">Zona Centro • C.P. {RESTAURANT_INFO.postalCode}</p>
                <p className="text-xs text-zinc-500 font-medium">Santander Jiménez, Tamps., México</p>
              </div>

              {/* Highlight */}
              <div className="p-3.5 rounded-2xl bg-zinc-950/40 border border-zinc-800/80 flex items-start gap-3">
                <Award className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-zinc-300 block">Carne 100% Casera</span>
                  <span className="text-xs text-zinc-400">Preparadas con carne de res molida y sazonada en casa</span>
                </div>
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-zinc-800">
              <a
                href={RESTAURANT_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-xs sm:text-sm border border-zinc-700 transition-all hover:scale-[1.01]"
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>Abrir en Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-xs sm:text-sm border border-zinc-700 transition-all hover:scale-[1.01]"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Llamar: {RESTAURANT_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Card 2: Social Media & Information (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                  <Facebook className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bebas text-2xl text-zinc-100">REDES Y CONTACTO</h3>
                  <p className="text-xs text-blue-400 font-semibold">Página Oficial</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Síguenos en nuestra página oficial de Facebook para ver fotos, novedades y opiniones de nuestros clientes.
              </p>

              {/* Direct WhatsApp Link Box */}
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-whatsapp-card-btn"
                className="group p-4 bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-800/40 hover:border-emerald-500/60 rounded-2xl flex items-center justify-between transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow group-hover:scale-105 transition-transform">
                    <MessageCircle className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-zinc-100 group-hover:text-emerald-300 transition-colors block">
                      WhatsApp Los Profes
                    </span>
                    <span className="text-xs text-zinc-400">Mensajes directos: {RESTAURANT_INFO.phone}</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Direct Facebook Link Box */}
              <a
                href={RESTAURANT_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-facebook-card-btn"
                className="group p-4 bg-blue-950/20 hover:bg-blue-950/40 border border-blue-800/40 hover:border-blue-500/60 rounded-2xl flex items-center justify-between transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow group-hover:scale-105 transition-transform">
                    <Facebook className="w-5 h-5 fill-white" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-zinc-100 group-hover:text-blue-300 transition-colors block">
                      Facebook Los Profes
                    </span>
                    <span className="text-xs text-zinc-400">Ver publicaciones y opiniones</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Direct Telephone Link Box */}
              <a
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                className="group p-4 bg-zinc-950/80 hover:bg-zinc-800/60 border border-zinc-800 hover:border-amber-500/40 rounded-2xl flex items-center justify-between transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-zinc-100 group-hover:text-amber-300 transition-colors block">
                      Llamada Telefónica
                    </span>
                    <span className="text-xs text-zinc-400">{RESTAURANT_INFO.phone}</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Bottom mini disclaimer */}
            <div className="pt-4 border-t border-zinc-800/80 text-[11px] text-zinc-500 text-center">
              Hamburguesas y Papas en Cono Los Profes • Santander Jiménez, Tamaulipas.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
