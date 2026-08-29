import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Flame, Sparkles } from 'lucide-react';
import { MenuItem, VariantOption, CartItem } from '../types';
import { AVAILABLE_ADEREZOS } from '../data/menuData';

interface ProductModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ item, onClose, onAddToCart }) => {
  if (!item) return null;

  const [selectedVariant, setSelectedVariant] = useState<VariantOption | undefined>(() => {
    if (item.variants && item.variants.length > 0) {
      const def = item.variants.find((v) => v.id === item.defaultVariant);
      return def || item.variants[0];
    }
    return undefined;
  });

  const [selectedAderezos, setSelectedAderezos] = useState<string[]>([]);
  const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Reset state when item changes
  useEffect(() => {
    if (item.variants && item.variants.length > 0) {
      const def = item.variants.find((v) => v.id === item.defaultVariant);
      setSelectedVariant(def || item.variants[0]);
    } else {
      setSelectedVariant(undefined);
    }
    setSelectedAderezos([]);
    setExcludedIngredients([]);
    setSpecialInstructions('');
    setQuantity(1);
  }, [item]);

  // Calculate unit price
  const basePrice = selectedVariant ? selectedVariant.price : item.basePrice;
  const unitPrice = basePrice;
  const totalPrice = unitPrice * quantity;

  const toggleAderezo = (name: string) => {
    if (selectedAderezos.includes(name)) {
      setSelectedAderezos(selectedAderezos.filter((a) => a !== name));
    } else {
      setSelectedAderezos([...selectedAderezos, name]);
    }
  };

  const toggleExcludedIngredient = (ing: string) => {
    if (excludedIngredients.includes(ing)) {
      setExcludedIngredients(excludedIngredients.filter((i) => i !== ing));
    } else {
      setExcludedIngredients([...excludedIngredients, ing]);
    }
  };

  const handleAdd = () => {
    const cartItemId = `${item.id}-${selectedVariant?.id || 'base'}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newCartItem: CartItem = {
      cartItemId,
      item,
      selectedVariant,
      selectedAderezos,
      excludedIngredients,
      specialInstructions: specialInstructions.trim(),
      unitPrice,
      quantity,
    };
    onAddToCart(newCartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="relative bg-zinc-950 border border-zinc-800 w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] sm:max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        <div className="relative h-44 sm:h-52 w-full bg-zinc-900 shrink-0">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-700">
              <Flame className="w-16 h-16" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            id="close-product-modal-btn"
            className="absolute top-4 right-4 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white p-2 rounded-full backdrop-blur-md border border-zinc-700 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            {item.badge && (
              <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-amber-500 text-zinc-950 mb-1.5 shadow">
                <Sparkles className="w-3 h-3" />
                {item.badge}
              </span>
            )}
            <h2 className="font-bebas text-3xl sm:text-4xl text-white leading-none tracking-wide">
              {item.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Configuration Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-sm text-zinc-200">
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            {item.description}
          </p>

          {/* Step 1: Presentation / Variant (e.g. Original vs Con Papas) */}
          {item.variants && item.variants.length > 1 && (
            <div className="space-y-3">
              <h4 className="font-bebas text-lg text-amber-400 tracking-wider flex items-center gap-1.5">
                <span>1. Elige tu Opción</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {item.variants.map((v) => {
                  const isSelected = selectedVariant?.id === v.id;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariant(v)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500 text-amber-400 ring-1 ring-amber-500/30'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-amber-500 bg-amber-500' : 'border-zinc-600'
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-zinc-950" />}
                        </div>
                        <span className="font-bold text-xs sm:text-sm">{v.name}</span>
                      </div>
                      <span className="font-bebas text-lg text-white">${v.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2 (Only for Boneless): Choose Salsa / Aderezo */}
          {item.allowAderezos && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bebas text-lg text-amber-400 tracking-wider flex items-center gap-1.5">
                  <span>Elige tu Salsa o Aderezo</span>
                  <span className="text-zinc-400 text-xs font-sans">(¡Pruébalas todas!)</span>
                </h4>
                {selectedAderezos.length > 0 && (
                  <span className="text-xs text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-md">
                    {selectedAderezos.length} seleccionada(s)
                  </span>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {AVAILABLE_ADEREZOS.map((aderezo) => {
                  const isSelected = selectedAderezos.includes(aderezo.name);
                  return (
                    <button
                      key={aderezo.id}
                      type="button"
                      onClick={() => toggleAderezo(aderezo.name)}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all text-xs ${
                        isSelected
                          ? 'bg-orange-500/15 border-orange-500 text-orange-300'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-zinc-200">{aderezo.name}</span>
                        <span className="text-[10px] text-zinc-400">{aderezo.desc}</span>
                      </div>
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ml-2 ${
                          isSelected ? 'bg-orange-500 border-orange-500 text-zinc-950' : 'border-zinc-700'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step: Personalizar ingredientes (solo para hamburguesas) */}
          {item.category === 'hamburguesas' && item.ingredients && item.ingredients.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bebas text-lg text-amber-400 tracking-wider">
                  Ingredientes de esta Hamburguesa
                </h4>
                <span className="text-xs text-zinc-400">Toca para quitar o dejar</span>
              </div>
              <p className="text-xs text-zinc-400">
                Puedes quitar cualquiera de los ingredientes que contiene:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.ingredients.map((ing, idx) => {
                  const isExcluded = excludedIngredients.includes(ing);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleExcludedIngredient(ing)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all ${
                        isExcluded
                          ? 'bg-red-950/40 border-red-800/80 text-red-300 line-through'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-200 hover:border-zinc-700'
                      }`}
                    >
                      <span>{ing}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          isExcluded ? 'bg-red-900/60 text-red-200' : 'bg-emerald-950/60 text-emerald-400'
                        }`}
                      >
                        {isExcluded ? 'SIN ESTE' : 'CON ESTE'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special instructions */}
          <div className="space-y-2">
            <h4 className="font-bebas text-lg text-amber-400 tracking-wider">
              Indicaciones Especiales (Opcional)
            </h4>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Ej. Bien cocida, cebolla doradita aparte..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Footer with Quantity & Total CTA */}
        <div className="p-4 sm:p-5 bg-zinc-900/90 border-t border-zinc-800 flex items-center justify-between gap-3">
          {/* Quantity Controls */}
          <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl p-1 shrink-0">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 flex items-center justify-center transition-colors"
              aria-label="Disminuir cantidad"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-extrabold text-base px-3 text-zinc-100 min-w-[2rem] text-center">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 flex items-center justify-center transition-colors"
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Submit Button or Sold out notice */}
          {item.isSoldOut ? (
            <div className="flex-1 bg-red-950/70 border border-red-800/80 text-red-200 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2">
              <span className="font-bebas text-lg tracking-wider">Producto Agotado por el Momento</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAdd}
              id="modal-add-to-cart-btn"
              className="flex-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-zinc-950 font-black py-3 px-4 rounded-xl flex items-center justify-between shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all"
            >
              <span className="font-bebas text-lg tracking-wider">Agregar al Pedido</span>
              <span className="font-extrabold text-base bg-zinc-950/20 px-2.5 py-0.5 rounded-lg">
                ${totalPrice.toFixed(2)}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
