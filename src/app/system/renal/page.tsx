//src /app/system/renal/page.tsx

"use client";

import React, { memo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import { useCart } from "@/context/CartContext";
import renalData from "@/data/RenalData";
import type { renalProduct } from "@/data/RenalData";

import styles from "../Shop.module.css";

// ---------------------------------------------------------------------------
// Controller bindings (SSOT — view consumes helpers only)
// ---------------------------------------------------------------------------
const { PRODUCTS, formatPrice, getStockStatus } = renalData;

// ---------------------------------------------------------------------------
// View Component
// ---------------------------------------------------------------------------
const RenalSystemPage: React.FC = memo(() => {
  const { addToCart } = useCart();

  // -------------------------------------------------------------------------
  // Add to cart (integration boundary only)
  // -------------------------------------------------------------------------
  const handleAddToCart = useCallback(
    (product: renalProduct) => {
      addToCart({
        id: String(product.id),
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        inStock: product.stock === "In Stock",
      });

      toast.success(`${product.name} added to cart`);
    },
    [addToCart]
  );

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  return (
    <section className={styles.shopSection}>
      {/* Header */}
      <header className={styles.header}>
        <h2>Shop</h2>
        <div className={styles.subCategory}>
          <label>System:</label>
          <span>Renal / Urinary</span>
        </div>
      </header>

      {/* Product Grid */}
      <div className={styles.grid}>
        {PRODUCTS.map((product) => {
          const inStock = product.stock === "In Stock";

          return (
            <article key={product.slug} className={styles.card}>
              {/* Image */}
              <div className={styles.imageWrapper}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={240}
                  height={160}
                  loading="lazy"
                  className={styles.image}
                />

                <span
                  className={`${styles.stockBadge} ${
                    inStock ? styles.inStock : styles.outStock
                  }`}
                >
                  {getStockStatus(product)}
                </span>
              </div>

              {/* Details */}
              <div className={styles.details}>
                <p className={styles.category}>{product.category}</p>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.price}>{formatPrice(product.price)}</p>

                {/* Clinical Tags (View-safe, non-polluting) */}
                <div className={styles.tags}>
                  <span className={styles.tag}>KDIGO</span>
                  <span className={styles.tag}>NICE</span>
                  <span className={styles.tag}>BNF</span>
                </div>
              </div>

              {/* Actions */}
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.addToCart}
                  disabled={!inStock}
                  onClick={() => handleAddToCart(product)}
                >
                  🛒 Add to Cart
                </button>

                <Link
                  href={`/dropups/renal/${product.slug}`}
                  className={styles.moreInfo}
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
});

RenalSystemPage.displayName = "RenalSystemPage";

export default RenalSystemPage;
