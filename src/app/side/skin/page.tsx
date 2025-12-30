// src/app/category/skincare/page.tsx

"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

import styles from "./Skincare.module.css";

// =====================
// CENTRAL DATA (MODEL)
// =====================
import type { SkinProduct } from "@/data/SkinData";
import {
  getAllProducts,
  calculateDiscountedPrice,
  formatPrice,
  getProductURL,
} from "@/data/SkinData";

/**
 * ============================================================
 * Skincare Listing Page — VIEW LAYER
 * ------------------------------------------------------------
 * ✔ Uses SkinData.ts as Single Source of Truth
 * ✔ Zero duplicated business logic
 * ✔ Type-safe, memoized, future-proof
 * ✔ App Router + Turbopack compliant
 * ============================================================
 */
const SkincarePage = () => {
  /**
   * ----------------------------------------------------------
   * Data retrieval (immutable → cloned for safety)
   * ----------------------------------------------------------
   */
  const products = useMemo<SkinProduct[]>(
    () => [...getAllProducts()],
    []
  );

  /**
   * ----------------------------------------------------------
   * Hard fallback — NEVER crash the UI
   * ----------------------------------------------------------
   */
  if (!products.length) {
    return (
      <section className={styles.shopSection}>
        <p className={styles.notFound}>
          No skincare products available at the moment.
        </p>
      </section>
    );
  }

  return (
    <section
      className={styles.shopSection}
      aria-labelledby="skincare-heading"
    >
      {/* ================= HEADER ================= */}
      <header className={styles.header}>
        <h1 id="skincare-heading" className={styles.title}>
          Skincare Essentials
        </h1>
        <p className={styles.subtitle}>
          Dermatologist-recommended skincare products for healthy skin.
        </p>
      </header>

      {/* ================= PRODUCT GRID ================= */}
      <div className={styles.grid} role="list">
        {products.map((product) => {
          const href = getProductURL(product.slug);
          const finalPrice = calculateDiscountedPrice(
            product.price,
            product.discount
          );

          return (
            <article
              key={product.id}
              className={styles.card}
              role="listitem"
            >
              {/* ---------- CARD LINK ---------- */}
              <Link
                href={href}
                className={styles.cardLink}
                aria-label={`View details for ${product.name}`}
              >
                {/* IMAGE */}
                <div className={styles.imageWrapper}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={500}
                    height={500}
                    className={styles.image}
                    loading="lazy"
                  />

                  {/* BADGES */}
                  <div className={styles.badgeRow}>
                    <span
                      className={
                        product.inStock
                          ? styles.inStock
                          : styles.outOfStock
                      }
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>

                    {product.discount > 0 && (
                      <span className={styles.discountBadge}>
                        {product.discount}% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* DETAILS */}
                <div className={styles.details}>
                  <p className={styles.category}>
                    {product.category.replace("-", " ")}
                  </p>

                  <h3 className={styles.name}>{product.name}</h3>

                  <div className={styles.priceRow}>
                    <span className={styles.price}>
                      {formatPrice(finalPrice)}
                    </span>

                    {product.oldPrice > finalPrice && (
                      <span className={styles.oldPrice}>
                        {formatPrice(product.oldPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>

              {/* ---------- ACTIONS ---------- */}
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.addToCart}
                  aria-label={`Add ${product.name} to cart`}
                  disabled={!product.inStock}
                  onClick={() => {
                    toast.success(`${product.name} added to cart`);
                  }}
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>

                <Link
                  href={href}
                  className={styles.moreInfo}
                  aria-label={`More info about ${product.name}`}
                >
                  More Info
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default memo(SkincarePage);
