export type CategoryId = 'all' | 'hamburguesas' | 'conos' | 'gajos' | 'aderezos';

export interface VariantOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  category: CategoryId;
  basePrice: number;
  imageUrl?: string;
  badge?: string;
  isSoldOut?: boolean;
  isPopular?: boolean;
  variants?: VariantOption[];
  defaultVariant?: string;
  allowAderezos?: boolean;
  ingredients?: string[];
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  selectedVariant?: VariantOption;
  selectedAderezos: string[];
  excludedIngredients: string[];
  specialInstructions: string;
  unitPrice: number;
  quantity: number;
}

export type OrderType = 'pickup';

export interface CustomerOrderInfo {
  customerName: string;
  customerPhone: string;
  orderType: OrderType;
  orderNotes: string;
}

export interface RestaurantInfo {
  name: string;
  subtitle: string;
  tagline: string;
  phone: string;
  phoneRaw: string;
  whatsappNumber: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  fullAddress: string;
  facebookUrl: string;
  mapsUrl: string;
}

