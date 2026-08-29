import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, Facebook, Sparkles } from 'lucide-react';
import { MenuItem, CategoryId, CartItem } from './types';
import { MENU_ITEMS, RESTAURANT_INFO } from './data/menuData';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryNav } from './components/CategoryNav';
import { MenuItemCard } from './components/MenuItemCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { AderezosShowcase } from './components/AderezosShowcase';
import { LocationSection } from './components/LocationSection';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import logoImg from './assets/images/logo_los_profes_original.jpeg';

export default function App() {
  // Cart state with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('los_profes_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [orderSuccessDetails, setOrderSuccessDetails] = useState<{
    message: string;
    customerName: string;
    total: number;
  } | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('los_profes_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  // Cart totals
  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const totalCartPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  }, [cartItems]);

  // Cart operations
  const handleAddToCart = (newItem: CartItem) => {
    setCartItems((prev) => {
      // Check if exact same config already exists
      const existingIndex = prev.findIndex(
        (i) =>
          i.item.id === newItem.item.id &&
          i.selectedVariant?.id === newItem.selectedVariant?.id &&
          JSON.stringify(i.selectedAderezos.sort()) === JSON.stringify(newItem.selectedAderezos.sort()) &&
          JSON.stringify(i.excludedIngredients.sort()) === JSON.stringify(newItem.excludedIngredients.sort()) &&
          i.specialInstructions === newItem.specialInstructions
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Filter menu items by active category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return MENU_ITEMS;
    return MENU_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  // Scroll helpers
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-500 selection:text-black">
      {/* Top App Header */}
      <Header
        cartCount={totalCartCount}
        cartTotal={totalCartPrice}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToLocation={() => scrollToSection('location-section')}
        onScrollToAderezos={() => scrollToSection('aderezos-section')}
      />

      {/* Main Hero Banner */}
      <HeroBanner
        onScrollToMenu={() => scrollToSection('menu-section')}
        onScrollToLocation={() => scrollToSection('location-section')}
      />

      {/* Main Interactive Menu Section */}
      <main id="menu-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-800/80 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Menú Digital Los Profes
            </div>
            <h2 className="font-bebas text-4xl sm:text-5xl text-white tracking-wide leading-none">
              NUESTRO MENÚ COMPLETO
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
            Selecciona tu producto para personalizar tu combinación (Original o Con Papas, salsa en boneless o quitar ingredientes) y armar tu orden.
          </p>
        </div>

        {/* Category Navigation */}
        <CategoryNav
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
        />

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onSelectItem={(selected) => setSelectedItemForModal(selected)}
            />
          ))}
        </div>
      </main>

      {/* Aderezos Showcase Section */}
      <AderezosShowcase />

      {/* Restaurant Location & Contact Information */}
      <LocationSection />

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-8 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <img
              src={logoImg}
              alt="Los Profes Logo"
              className="w-12 h-12 object-contain rounded-xl bg-zinc-900 p-0.5 border border-zinc-800"
              referrerPolicy="no-referrer"
            />
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="font-bebas text-lg text-zinc-300">LOS PROFES</span>
              <span>•</span>
              <span>Hamburguesas y Papas en Cono</span>
              <span>•</span>
              <span className="text-amber-400 font-semibold">Santander Jiménez, Tamaulipas</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 text-zinc-400">
            <a
              href={RESTAURANT_INFO.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 flex items-center gap-1 transition-colors"
            >
              <Facebook className="w-3.5 h-3.5" />
              <span>Facebook Oficial</span>
            </a>
            <span>•</span>
            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="hover:text-amber-400 flex items-center gap-1 transition-colors"
            >
              <span>Tel: {RESTAURANT_INFO.phone}</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Bottom Bar for Mobile / Quick Cart Access */}
      {totalCartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-4 left-4 right-4 z-40 sm:hidden animate-in slide-in-from-bottom-5 duration-200">
          <button
            onClick={() => setIsCartOpen(true)}
            id="mobile-floating-cart-btn"
            className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-zinc-950 font-black p-3.5 rounded-2xl shadow-2xl shadow-amber-500/40 flex items-center justify-between border border-amber-400/50 active:scale-[0.98] transition-all"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-zinc-950 text-amber-400 flex items-center justify-center font-bold text-xs">
                {totalCartCount}
              </div>
              <div className="text-left leading-tight">
                <span className="text-[11px] uppercase tracking-wider block font-bold text-zinc-900/80">Ver Carrito</span>
                <span className="font-bebas text-xl text-zinc-950">${totalCartPrice.toFixed(2)} MXN</span>
              </div>
            </div>

            <div className="flex items-center gap-1 bg-zinc-950 text-amber-400 px-3.5 py-1.5 rounded-xl text-xs font-bold">
              <span>Continuar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      )}

      {/* Product Customizer Modal */}
      <ProductModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer & WhatsApp Checkout */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderSuccess={(details) => {
          setIsCartOpen(false);
          setOrderSuccessDetails(details);
          handleClearCart();
        }}
      />

      {/* Order Success & WhatsApp Fallback Modal */}
      <OrderSuccessModal
        isOpen={!!orderSuccessDetails}
        onClose={() => setOrderSuccessDetails(null)}
        orderDetails={orderSuccessDetails}
      />
    </div>
  );
}
