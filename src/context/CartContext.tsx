// src/context/CartContext.tsx
"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { StaticImageData } from "next/image";

/* =============================================================================
   🧾 Types
============================================================================= */

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string | StaticImageData;

  originalPrice?: number;
  stock?: number;
  inStock?: boolean;

  seller?: string;
  badge?: string;
  category?: string;
  description?: string;
  variation?: string;
  discount?: number;
}

interface CartState {
  items: CartItem[];
  initialized: boolean;
}

/* =============================================================================
   🧠 Context Contract
============================================================================= */

export interface CartContextValue {
  readonly items: CartItem[];
  readonly availableItems: CartItem[];
  readonly unavailableItems: CartItem[];

  readonly subtotal: number;
  readonly totalItems: number;
  readonly isInitialized: boolean;
  readonly isCartOpen: boolean;

  addItem: (item: CartItem) => void;
  addToCart: (item: CartItem) => void;
  removeItem: (id: CartItem["id"]) => void;
  updateQuantity: (id: CartItem["id"], quantity: number) => void;
  clearCart: () => void;
  
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

/* =============================================================================
   🎯 Context
============================================================================= */

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "obat:cart:v3";

/* =============================================================================
   🔐 Utilities
============================================================================= */

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const sanitizeItem = (raw: CartItem): CartItem => {
  const safeStock =
    typeof raw.stock === "number" && raw.stock > 0 ? raw.stock : 999;

  return {
    ...raw,
    price: Number.isFinite(raw.price) ? Math.max(0, raw.price) : 0,
    quantity: clamp(Math.floor(raw.quantity || 1), 1, safeStock),
    stock: safeStock,
    inStock: raw.inStock ?? true,
  };
};

const validateStoredCart = (data: unknown): CartItem[] => {
  if (!Array.isArray(data)) return [];

  return data
    .filter(
      (i): i is CartItem =>
        typeof i === "object" &&
        i !== null &&
        typeof i.id === "string" &&
        typeof i.name === "string" &&
        typeof i.price === "number"
    )
    .map(sanitizeItem);
};

/* =============================================================================
   🔄 Reducer
============================================================================= */

type CartAction =
  | { type: "INIT"; payload: CartItem[] }
  | { type: "ADD"; payload: CartItem }
  | { type: "REMOVE"; payload: string }
  | { type: "UPDATE_QTY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR" };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "INIT":
      return { items: action.payload, initialized: true };

    case "ADD": {
      const item = sanitizeItem(action.payload);
      const index = state.items.findIndex((i) => i.id === item.id);

      if (index >= 0) {
        const updated = [...state.items];
        const existing = updated[index];

        updated[index] = {
          ...existing,
          quantity: clamp(
            existing.quantity + item.quantity,
            1,
            existing.stock ?? 999
          ),
        };

        return { ...state, items: updated };
      }

      return { ...state, items: [...state.items, item] };
    }

    case "REMOVE":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };

    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id
            ? {
                ...i,
                quantity: clamp(
                  action.payload.quantity,
                  1,
                  i.stock ?? 999
                ),
              }
            : i
        ),
      };

    case "CLEAR":
      return { ...state, items: [] };

    default:
      return state;
  }
};

/* =============================================================================
   🏪 Provider
============================================================================= */

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    initialized: false,
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---------------- Hydration-safe load ---------------- */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? validateStoredCart(JSON.parse(raw)) : [];
      dispatch({ type: "INIT", payload: parsed });
    } catch {
      dispatch({ type: "INIT", payload: [] });
    }
  }, []);

  /* ---------------- Debounced persistence ---------------- */
  useEffect(() => {
    if (!state.initialized) return;

    if (saveTimer.current) clearTimeout(saveTimer.current);

    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
      } catch {
        // Silently fail if localStorage is unavailable
      }
    }, 200);

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [state.items, state.initialized]);

  /* ---------------- Cross-tab sync ---------------- */
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      try {
        const parsed = e.newValue
          ? validateStoredCart(JSON.parse(e.newValue))
          : [];
        dispatch({ type: "INIT", payload: parsed });
      } catch {
        // Silently fail on parse errors
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  /* ---------------- Actions ---------------- */
  const addToCart = useCallback(
    (item: CartItem) => dispatch({ type: "ADD", payload: item }),
    []
  );

  const addItem = useCallback(
    (item: CartItem) => addToCart(item),
    [addToCart]
  );

  const removeItem = useCallback(
    (id: string) => dispatch({ type: "REMOVE", payload: id }),
    []
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number) =>
      dispatch({ type: "UPDATE_QTY", payload: { id, quantity } }),
    []
  );

  const clearCart = useCallback(() => dispatch({ type: "CLEAR" }), []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  /* ---------------- Derived values ---------------- */
  const availableItems = useMemo(
    () => state.items.filter((i) => i.inStock !== false),
    [state.items]
  );

  const unavailableItems = useMemo(
    () => state.items.filter((i) => i.inStock === false),
    [state.items]
  );

  const subtotal = useMemo(
    () =>
      availableItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    [availableItems]
  );

  const totalItems = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      availableItems,
      unavailableItems,
      subtotal,
      totalItems,
      isInitialized: state.initialized,
      isCartOpen,

      addItem,
      addToCart,
      removeItem,
      updateQuantity,
      clearCart,
      
      openCart,
      closeCart,
      toggleCart,
    }),
    [
      state.items,
      availableItems,
      unavailableItems,
      subtotal,
      totalItems,
      state.initialized,
      isCartOpen,
      addItem,
      addToCart,
      removeItem,
      updateQuantity,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/* =============================================================================
   🪝 Hooks
============================================================================= */

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within <CartProvider>");
  }
  return ctx;
}

export const useCartCount = () => useCart().totalItems;
export const useCartSubtotal = () => useCart().subtotal;