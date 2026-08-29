import React from 'react';
import { Plus, Flame, Sparkles, Ban } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onSelectItem: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onSelectItem }) => {
  const hasVariants = item.variants && item.variants.length > 1;
  const isSoldOut = !!item.isSoldOut;

  return (
    <div
      id={`menu-item-card-${item.id}`}
      onClick={() => {
        if (!isSoldOut) {
          onSelectItem(item);
        }
      }}
      className={`group relative bg-zinc-900/80 border rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 ${
        isSoldOut
          ? 'border-red-900/40 opacity-80 cursor-not-allowed bg-zinc-950/60'
          : 'hover:bg-zinc-900 border-zinc-800 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/5 cursor-pointer'
      }`}
    >
      {/* Top Image & Badges */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className={`w-full h-full object-cover transition-transform duration-300 ${
              isSoldOut
                ? 'grayscale contrast-75 brightness-75'
                : 'opacity-90 group-hover:opacity-100 group-hover:scale-105'
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-900 text-zinc-700">
            <Flame className="w-12 h-12" />
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {isSoldOut ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-red-600 text-white shadow-lg shadow-red-950 animate-pulse">
              <Ban className="w-3.5 h-3.5" />
              AGOTADO / SOLD OUT
            </span>
          ) : (
            <>
              {item.badge && (
                <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-amber-500 text-zinc-950 shadow-md">
                  <Sparkles className="w-3 h-3 fill-zinc-950" />
                  {item.badge}
                </span>
              )}
              {item.isPopular && !item.badge?.includes('Popular') && (
                <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg bg-orange-600 text-white shadow-md">
                  <Flame className="w-3 h-3 fill-white" />
                  Top Ventas
                </span>
              )}
            </>
          )}
        </div>

        {/* Quick Price Tag Overlay */}
        <div className="absolute bottom-2.5 right-3 z-10">
          <div className="bg-zinc-950/90 backdrop-blur-md border border-zinc-700/80 px-2.5 py-1 rounded-xl shadow-lg flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-zinc-400">Desde</span>
            <span className={`font-bebas text-xl leading-none ${isSoldOut ? 'text-zinc-400 line-through' : 'text-amber-400'}`}>
              ${item.basePrice}
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className={`font-bebas text-2xl sm:text-3xl tracking-wide leading-none transition-colors ${
              isSoldOut ? 'text-zinc-400' : 'text-zinc-100 group-hover:text-amber-400'
            }`}>
              {item.name}
            </h3>
          </div>

          {item.tagline && (
            <p className="text-xs font-semibold text-amber-500/90 mt-0.5">
              {item.tagline}
            </p>
          )}

          <p className="text-xs sm:text-sm text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
            {item.description}
          </p>

          {/* Ingredients pill preview */}
          {item.ingredients && item.ingredients.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {item.ingredients.slice(0, 4).map((ing, idx) => (
                <span
                  key={idx}
                  className="text-[11px] bg-zinc-800/80 text-zinc-300 px-2 py-0.5 rounded-md border border-zinc-700/40"
                >
                  {ing}
                </span>
              ))}
              {item.ingredients.length > 4 && (
                <span className="text-[11px] text-zinc-400 font-medium px-1 py-0.5">
                  +{item.ingredients.length - 4} más
                </span>
              )}
            </div>
          )}
        </div>

        {/* Pricing Options & CTA Button */}
        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
          {hasVariants && item.variants ? (
            <div className="flex items-center gap-2.5 text-xs flex-wrap">
              {item.variants.slice(0, 2).map((v, idx) => (
                <React.Fragment key={v.id}>
                  {idx > 0 && <div className="h-4 w-px bg-zinc-800" />}
                  <div>
                    <span className="text-[10px] text-zinc-400 block uppercase font-bold truncate max-w-[90px]">
                      {v.name.replace(' (Solo Cono)', '')}
                    </span>
                    <span className={`font-bold ${isSoldOut ? 'text-zinc-500 line-through' : 'text-amber-400'}`}>${v.price}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div>
              <span className="text-xs text-zinc-400 font-medium">Precio</span>
              <p className={`font-bebas text-2xl leading-none ${isSoldOut ? 'text-zinc-500 line-through' : 'text-amber-400'}`}>${item.basePrice}</p>
            </div>
          )}

          {isSoldOut ? (
            <div
              id={`add-btn-${item.id}`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/60 border border-red-800/50 text-red-300 font-bold text-xs shadow-sm"
            >
              <Ban className="w-3.5 h-3.5" />
              <span>Agotado</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectItem(item);
              }}
              id={`add-btn-${item.id}`}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-800 group-hover:bg-amber-500 text-zinc-200 group-hover:text-zinc-950 font-bold text-xs sm:text-sm transition-all duration-150 shadow-sm"
            >
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
              <span>Pedir</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
