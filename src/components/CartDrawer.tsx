import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Store,
  MessageCircle,
  ArrowRight,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, CustomerOrderInfo } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onOrderSuccess: (details: { message: string; customerName: string; total: number }) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess,
}) => {
  const [customerInfo, setCustomerInfo] = useState<CustomerOrderInfo>({
    customerName: '',
    customerPhone: '',
    orderType: 'pickup',
    orderNotes: '',
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const total = subtotal;

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!customerInfo.customerName.trim()) {
      errors.customerName = 'Por favor escribe tu nombre.';
    }
    if (!customerInfo.customerPhone.trim()) {
      errors.customerPhone = 'Por favor escribe tu número de teléfono / WhatsApp.';
    } else if (customerInfo.customerPhone.trim().length < 8) {
      errors.customerPhone = 'Escribe un número de teléfono válido (mínimo 8 dígitos).';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generateWhatsAppMessage = () => {
    let msg = `NOMBRE: ${customerInfo.customerName.trim()}\n`;
    msg += `TELÉFONO: ${customerInfo.customerPhone.trim()}\n\n`;

    msg += `PEDIDO:\n`;
    cartItems.forEach((item, index) => {
      msg += `${item.quantity} × ${item.item.name}\n`;
      const variantName = item.selectedVariant ? item.selectedVariant.name : 'Original';
      msg += `${variantName} — $${(item.unitPrice * item.quantity).toFixed(2)}\n`;

      if (item.selectedAderezos.length > 0) {
        msg += `Salsas: ${item.selectedAderezos.join(', ')}\n`;
      }
      if (item.excludedIngredients.length > 0) {
        msg += `Sin: ${item.excludedIngredients.join(', ')}\n`;
      }
      if (item.specialInstructions) {
        msg += `Nota: ${item.specialInstructions}\n`;
      }
      if (index < cartItems.length - 1) {
        msg += `\n`;
      }
    });

    if (customerInfo.orderNotes.trim()) {
      msg += `\nNotas adicionales: ${customerInfo.orderNotes.trim()}\n`;
    }

    msg += `\nTOTAL A PAGAR: $${total.toFixed(2)} MXN`;
    return msg;
  };

  const handleSendOrder = () => {
    if (cartItems.length === 0) return;
    if (!validateForm()) return;

    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodedMessage}`;

    // Confetti effect
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#ea580c', '#10b981'],
      });
    } catch {
      // ignore
    }

    // Open WhatsApp directly
    window.open(whatsappUrl, '_blank');

    onOrderSuccess({
      message,
      customerName: customerInfo.customerName,
      total,
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-zinc-950 border-l border-zinc-800 h-full flex flex-col shadow-2xl text-zinc-100 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bebas text-2xl leading-none text-zinc-100 tracking-wide">
                Tu Carrito de Pedido
              </h2>
              <p className="text-xs text-zinc-400">
                {cartItems.length === 0
                  ? 'El carrito está vacío'
                  : `${cartItems.reduce((sum, i) => sum + i.quantity, 0)} producto(s)`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            id="close-cart-btn"
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bebas text-2xl text-zinc-300">¡Tu carrito está vacío!</h3>
              <p className="text-xs text-zinc-500 max-w-xs">
                Selecciona alguna de nuestras hamburguesas caseras o conos de papas para armar tu orden.
              </p>
            </div>
            <button
              onClick={onClose}
              className="mt-4 px-5 py-2.5 rounded-xl bg-amber-500 text-zinc-950 font-bold text-sm hover:bg-amber-400 transition-colors"
            >
              Ver Menú
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
            {/* Cart Items List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Resumen de Productos
                </span>
                <button
                  onClick={onClearCart}
                  className="text-xs text-red-400 hover:text-red-300 font-medium transition-colors"
                >
                  Vaciar carrito
                </button>
              </div>

              {cartItems.map((cartItem) => (
                <div
                  key={cartItem.cartItemId}
                  className="p-3.5 bg-zinc-900/90 border border-zinc-800 rounded-2xl space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-zinc-100 leading-tight">
                        {cartItem.item.name}
                      </h4>
                      {cartItem.selectedVariant && (
                        <span className="text-xs font-semibold text-amber-400">
                          {cartItem.selectedVariant.name}
                        </span>
                      )}
                    </div>
                    <span className="font-bebas text-lg text-amber-400 leading-none shrink-0">
                      ${(cartItem.unitPrice * cartItem.quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Badges of customization */}
                  <div className="text-xs space-y-1 text-zinc-400">
                    {cartItem.selectedAderezos.length > 0 && (
                      <p className="flex items-start gap-1">
                        <span className="text-orange-400 font-semibold shrink-0">🥫 Salsas:</span>
                        <span>{cartItem.selectedAderezos.join(', ')}</span>
                      </p>
                    )}
                    {cartItem.excludedIngredients.length > 0 && (
                      <p className="flex items-start gap-1">
                        <span className="text-red-400 font-semibold shrink-0">🚫 Sin:</span>
                        <span className="line-through">{cartItem.excludedIngredients.join(', ')}</span>
                      </p>
                    )}
                    {cartItem.specialInstructions && (
                      <p className="flex items-start gap-1 italic text-zinc-500">
                        <span>📝 "{cartItem.specialInstructions}"</span>
                      </p>
                    )}
                  </div>

                  {/* Quantity & Delete Bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
                    <button
                      onClick={() => onRemoveItem(cartItem.cartItemId)}
                      className="text-zinc-500 hover:text-red-400 p-1 transition-colors flex items-center gap-1 text-xs"
                      title="Eliminar producto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Eliminar</span>
                    </button>

                    <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1)}
                        className="w-6 h-6 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 flex items-center justify-center"
                        aria-label="Disminuir"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-xs px-2.5 text-zinc-100 min-w-[1.5rem] text-center">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1)}
                        className="w-6 h-6 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 flex items-center justify-center"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Step: Customer Info */}
            <div className="space-y-3 p-4 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                Datos para tu Pedido
              </label>

              <div>
                <label className="text-xs text-zinc-300 font-medium mb-1 block">
                  Tu Nombre *
                </label>
                <input
                  type="text"
                  id="customer-name-input"
                  value={customerInfo.customerName}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, customerName: e.target.value })}
                  placeholder="Ej. Juan Pérez"
                  className={`w-full bg-zinc-950 border ${
                    formErrors.customerName ? 'border-red-500' : 'border-zinc-800'
                  } rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-amber-500`}
                />
                {formErrors.customerName && (
                  <p className="text-[11px] text-red-400 mt-1">{formErrors.customerName}</p>
                )}
              </div>

              <div>
                <label className="text-xs text-zinc-300 font-medium mb-1 block">
                  Tu Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  id="customer-phone-input"
                  value={customerInfo.customerPhone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, customerPhone: e.target.value })}
                  placeholder="Ej. 834 123 4567"
                  className={`w-full bg-zinc-950 border ${
                    formErrors.customerPhone ? 'border-red-500' : 'border-zinc-800'
                  } rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-amber-500`}
                />
                {formErrors.customerPhone && (
                  <p className="text-[11px] text-red-400 mt-1">{formErrors.customerPhone}</p>
                )}
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-medium mb-1 block">
                  Notas o especificaciones extras (opcional)
                </label>
                <textarea
                  rows={2}
                  value={customerInfo.orderNotes}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, orderNotes: e.target.value })}
                  placeholder="Ej. Sin verdura, salsa aparte..."
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-zinc-100 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Footer with Total and WhatsApp Action */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 bg-zinc-900 border-t border-zinc-800 space-y-3 shrink-0">
            <div className="space-y-1 text-xs text-zinc-400">
              <div className="flex justify-between items-center text-zinc-100">
                <span className="font-bebas text-xl tracking-wider">TOTAL A PAGAR:</span>
                <span className="font-bebas text-3xl text-amber-400 leading-none">
                  ${total.toFixed(2)} MXN
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Order CTA Button */}
            <button
              type="button"
              onClick={handleSendOrder}
              id="send-whatsapp-order-btn"
              className="w-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/50 hover:shadow-emerald-600/25 transition-all text-sm sm:text-base group"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>Enviar Pedido a WhatsApp (${total.toFixed(2)})</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-[11px] text-zinc-500 text-center flex items-center justify-center gap-1">
              <Info className="w-3 h-3 text-emerald-500" />
              Se abrirá WhatsApp directamente con tu orden para recoger en sucursal
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
