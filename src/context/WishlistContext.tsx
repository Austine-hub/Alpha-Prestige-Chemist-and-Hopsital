// src/context/WishlistContext.tsx

"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/* ================================================================
   🧾 Wishlist Item (pure data — no cart responsibility)
================================================================ */

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  brand?: string;
  category?: string;
}

/* ================================================================
   🧠 Context Contract (INTENTIONALLY NO addToCart)
================================================================ */

export interface WishlistContextType {
  readonly wishlist: WishlistItem[];

  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: WishlistItem["id"]) => void;

  isInWishlist: (id: WishlistItem["id"]) => boolean;
  clearWishlist: () => void;

  readonly wishlistCount: number;
}

/* ================================================================
   🎯 Context
================================================================ */

const WishlistContext = createContext<WishlistContextType | null>(null);

/* ================================================================
   🏪 Provider
================================================================ */

interface WishlistProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = "obat:wishlist";

export const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  /* ------------------------------------------------------------
     💾 Hydrate once (client only)
  ------------------------------------------------------------ */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: WishlistItem[] = JSON.parse(raw);
        if (Array.isArray(parsed)) setWishlist(parsed);
      }
    } catch {
      // fail silently (corrupt storage should not crash app)
    } finally {
      setHydrated(true);
    }
  }, []);

  /* ------------------------------------------------------------
     💾 Persist (after hydration only)
  ------------------------------------------------------------ */
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore quota / private mode errors
    }
  }, [wishlist, hydrated]);

  /* ------------------------------------------------------------
     ➕ Add
  ------------------------------------------------------------ */
  const addToWishlist = useCallback((item: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  }, []);

  /* ------------------------------------------------------------
     ➖ Remove
  ------------------------------------------------------------ */
  const removeFromWishlist = useCallback((id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  }, []);

  /* ------------------------------------------------------------
     🔍 Exists
  ------------------------------------------------------------ */
  const isInWishlist = useCallback(
    (id: string) => wishlist.some((item) => item.id === id),
    [wishlist]
  );

  /* ------------------------------------------------------------
     🧹 Clear
  ------------------------------------------------------------ */
  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, []);

  /* ------------------------------------------------------------
     📦 Memoized Value (stable identity)
  ------------------------------------------------------------ */
  const value = useMemo<WishlistContextType>(
    () => ({
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      wishlistCount: wishlist.length,
    }),
    [
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
    ]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};

/* ================================================================
   🪝 Hook (hard-fail if misused)
================================================================ */

export const useWishlist = (): WishlistContextType => {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within <WishlistProvider>");
  }
  return ctx;
};

export default WishlistContext;
