// src/app/system/git/page.tsx

"use client";

import { memo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import { useCart } from "@/context/CartContext";
import styles from "../Shop.module.css";

import { gitProducts } from "@/data/gitData";
import type { GitProduct } from "@/data/gitData";

const GIT: React.FC = memo(() => {
  const { addToCart } = useCart();

  // ------------------------------------------------------------------
  // Add to Cart Handler (memoized)
  // ------------------------------------------------------------------
  const handleAddToCart = useCallback(
    (product: GitProduct) => {
      addToCart({
        id: String(product.id),
        name: product.name,
        price: product.price,
        image: product.image.src,
        quantity: 1,
        inStock: product.stock === "In Stock",
      });

      toast.success(`${product.name} added to cart`);
    },
    [addToCart]
  );

  return (
    <section className={styles.shopSection}>
      {/* ------------------------------------------------------------ */}
      {/* Header */}
      {/* ------------------------------------------------------------ */}
      <div className={styles.header}>
        <h2>Shop</h2>
        <div className={styles.subCategory}>
          <label>Subcategory:</label>
          <span>GIT Drugs</span>
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Product Grid */}
      {/* ------------------------------------------------------------ */}
      <div className={styles.grid}>
        {gitProducts.map((product) => (
          <div key={product.id} className={styles.card}>
            {/* Image */}
            <div className={styles.imageWrapper}>
              <Image
                src={product.image}
                alt={product.name}
                className={styles.image}
                loading="lazy"
              />
              <span className={styles.stockBadge}>{product.stock}</span>
            </div>

            {/* Details */}
            <div className={styles.details}>
              <p className={styles.category}>{product.category}</p>
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.price}>KES {product.price.toLocaleString()}</p>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              <button
                className={styles.addToCart}
                onClick={() => handleAddToCart(product)}
              >
                🛒 Add to Cart
              </button>

              {/* ✅ Slug-based navigation (App Router compliant) */}
              <Link
                href={`/dropups/git/${product.slug}`}
                className={styles.moreInfo}
              >
                More Info
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

GIT.displayName = "GIT";

export default GIT;
