import React from 'react';
import { CheckCircle2, MessageCircle, ExternalLink, Copy, Check } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: {
    message: string;
    customerName: string;
    total: number;
  } | null;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isOpen,
  onClose,
  orderDetails,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !orderDetails) return null;

  const encodedMessage = encodeURIComponent(orderDetails.message);
  const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodedMessage}`;

  const handleCopySummary = () => {
    navigator.clipboard.writeText(orderDetails.message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div
        className="relative bg-zinc-950 border border-zinc-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 text-center space-y-6 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 mx-auto flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>

        {/* Text */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            ¡Pedido Enviado a WhatsApp!
          </span>
          <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
            ¡GRACIAS POR TU PREFERENCIA!
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Hola <span className="text-zinc-200 font-bold">{orderDetails.customerName}</span>, tu pedido con total de{' '}
            <span className="text-amber-400 font-bold">${orderDetails.total.toFixed(2)} MXN</span> ha sido generado con éxito.
          </p>
        </div>

        {/* WhatsApp Link Box */}
        <div className="p-4 bg-zinc-900/90 border border-zinc-800 rounded-2xl space-y-3">
          <p className="text-xs text-zinc-400">
            Si la aplicación de WhatsApp no se abrió en tu dispositivo, presiona el botón abajo:
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="reopen-whatsapp-btn"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 text-sm transition-all"
          >
            <MessageCircle className="w-5 h-5 fill-white/20" />
            <span>Abrir WhatsApp ({RESTAURANT_INFO.phone})</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Formatted Order Details Box */}
        <div className="p-4 bg-zinc-900/90 border border-zinc-800 rounded-2xl text-left space-y-3 font-mono text-xs text-zinc-300 whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed">
          {orderDetails.message}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={handleCopySummary}
            className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold py-3 px-4 rounded-xl border border-zinc-700 text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">¡Texto Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Mensaje</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black py-3 px-4 rounded-xl text-xs sm:text-sm transition-colors"
          >
            Aceptar y Volver
          </button>
        </div>
      </div>
    </div>
  );
};
