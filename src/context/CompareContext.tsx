// src/context/CompareContext.tsx
"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import type { StaticImageData } from "next/image";

/* =============================================================================
   🧾 Types
============================================================================= */
export interface CompareItem {
  id: string;
  name: string;
  price: number;
  image: string | StaticImageData;
  category?: string;
  description?: string;
  badge?: string;
  stock?: number;
  inStock?: boolean;
}

interface CompareState {
  items: CompareItem[];
  initialized: boolean;
}

/* =============================================================================
   🧠 Context Contract
============================================================================= */
export interface CompareContextValue {
  readonly items: CompareItem[];
  readonly totalItems: number;
  readonly isInitialized: boolean;

  addItem: (item: CompareItem) => void;
  removeItem: (id: string) => void;
  clearCompare: () => void;
}

/* =============================================================================
   🎯 Context
============================================================================= */
const CompareContext = createContext<CompareContextValue | null>(null);
const STORAGE_KEY = "marplewood:compare:v1";

/* =============================================================================
   🔐 Utilities
============================================================================= */
const sanitizeItem = (raw: CompareItem): CompareItem => ({
  ...raw,
  price: Number.isFinite(raw.price) ? Math.max(0, raw.price) : 0,
  inStock: raw.inStock ?? true,
  stock: raw.stock ?? 999,
});

const validateStoredCompare = (data: unknown): CompareItem[] => {
  if (!Array.isArray(data)) return [];
  return data
    .filter(
      (i): i is CompareItem =>
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
type CompareAction =
  | { type: "INIT"; payload: CompareItem[] }
  | { type: "ADD"; payload: CompareItem }
  | { type: "REMOVE"; payload: string }
  | { type: "CLEAR" };

const compareReducer = (state: CompareState, action: CompareAction): CompareState => {
  switch (action.type) {
    case "INIT":
      return { items: action.payload, initialized: true };

    case "ADD": {
      const item = sanitizeItem(action.payload);
      const exists = state.items.find((i) => i.id === item.id);
      if (exists) return state; // prevent duplicates
      return { ...state, items: [...state.items, item] };
    }

    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) };

    case "CLEAR":
      return { ...state, items: [] };

    default:
      return state;
  }
};

/* =============================================================================
   🏪 Provider
============================================================================= */
export function CompareProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(compareReducer, { items: [], initialized: false });
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? validateStoredCompare(JSON.parse(raw)) : [];
      dispatch({ type: "INIT", payload: parsed });
    } catch {
      dispatch({ type: "INIT", payload: [] });
    }
  }, []);

  // Persist
  useEffect(() => {
    if (!state.initialized) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
      } catch {}
    }, 200);
  }, [state.items, state.initialized]);

  // Cross-tab sync
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      try {
        const parsed = e.newValue ? validateStoredCompare(JSON.parse(e.newValue)) : [];
        dispatch({ type: "INIT", payload: parsed });
      } catch {}
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  /* ---------------- Actions ---------------- */
  const addItem = useCallback((item: CompareItem) => dispatch({ type: "ADD", payload: item }), []);
  const removeItem = useCallback((id: string) => dispatch({ type: "REMOVE", payload: id }), []);
  const clearCompare = useCallback(() => dispatch({ type: "CLEAR" }), []);

  /* ---------------- Derived ---------------- */
  const totalItems = useMemo(() => state.items.length, [state.items]);

  const value = useMemo<CompareContextValue>(
    () => ({
      items: state.items,
      totalItems,
      isInitialized: state.initialized,
      addItem,
      removeItem,
      clearCompare,
    }),
    [state.items, totalItems, state.initialized, addItem, removeItem, clearCompare]
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

/* =============================================================================
   🪝 Hook
============================================================================= */
export function useCompare(): CompareContextValue {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within <CompareProvider>");
  return ctx;
}
