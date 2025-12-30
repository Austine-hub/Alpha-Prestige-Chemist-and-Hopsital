//src/viewmodels/msk/useMskProducts.ts


"use client";

import { useCallback, useMemo } from "react";
import { mskProducts } from "@/data/mskData";


export function useMskProducts() {
  const products = useMemo(() => mskProducts, []);

  const formatPrice = useCallback(
    (price: number) => `KES ${price.toLocaleString("en-KE")}`,
    []
  );

  const normalizeSlug = useCallback(
    (slug: string) => slug.toLowerCase().replace(/\s+/g, "-"),
    []
  );

  return {
    products,
    formatPrice,
    normalizeSlug,
  };
}
