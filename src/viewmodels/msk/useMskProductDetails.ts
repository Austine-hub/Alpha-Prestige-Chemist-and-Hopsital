//src/viewmodels/msk/useMskProductDetails.ts

"use client";

import { useParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import { mskProducts } from "@/data/mskData";
import type { MskProduct } from "@/types/msk";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type TabKey = "features" | "description" | "usage";

/* -------------------------------------------------------------------------- */
/* Hook                                                                       */
/* -------------------------------------------------------------------------- */

export function useMskProductDetails() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  /* ------------------------------------------------------------------------ */
  /* Helpers                                                                  */
  /* ------------------------------------------------------------------------ */

  const normalizeSlug = useCallback(
    (value: string) => value.toLowerCase().trim(),
    []
  );

  /* ------------------------------------------------------------------------ */
  /* Product                                                                  */
  /* ------------------------------------------------------------------------ */

  const product: MskProduct | undefined = useMemo(() => {
    if (!slug) return undefined;

    const normalized = normalizeSlug(slug);

    return mskProducts.find(
      (p) => normalizeSlug(p.slug) === normalized
    );
  }, [slug, normalizeSlug]);

  /* ------------------------------------------------------------------------ */
  /* Similar products (FIXED)                                                  */
  /* ------------------------------------------------------------------------ */

  const similar: MskProduct[] = useMemo(() => {
    if (!product) return [];

    return mskProducts
      .filter(
        (p) =>
          p.id !== product.id &&                // ✅ NEVER compare slug
          p.category === product.category &&    // same category
          p.inStock                             // optional but realistic
      )
      .slice(0, 4); // ✅ UI-safe limit
  }, [product]);

  /* ------------------------------------------------------------------------ */
  /* UI State                                                                 */
  /* ------------------------------------------------------------------------ */

  const [qty, setQty] = useState<number>(1);
  const [tab, setTab] = useState<TabKey>("features");
  const [adding, setAdding] = useState<boolean>(false);

  /* ------------------------------------------------------------------------ */
  /* Actions                                                                  */
  /* ------------------------------------------------------------------------ */

  const updateQty = useCallback((value: number) => {
    setQty(Math.max(1, Math.min(99, value)));
  }, []);

  const handleAddToCart = useCallback(async () => {
    if (!product || !product.inStock) return;

    setAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setAdding(false);
  }, [product]);

  /* ------------------------------------------------------------------------ */
  /* Utilities                                                                */
  /* ------------------------------------------------------------------------ */

  const formatPrice = useCallback(
    (price: number) => `KES ${price.toLocaleString("en-KE")}`,
    []
  );

  /* ------------------------------------------------------------------------ */
  /* Return                                                                   */
  /* ------------------------------------------------------------------------ */

  return {
    product,
    similar,

    qty,
    tab,
    adding,
    inStock: product?.inStock ?? false,

    setTab,
    updateQty,
    handleAddToCart,

    formatPrice,
    normalizeSlug,
  };
}
