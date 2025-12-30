// src/app/system/cns/page.tsx

"use client";

import { memo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import { useCart } from "@/context/CartContext";
import cnsData, { type cnsProduct } from "@/data/nervousData";

import styles from "../Shop.module.css";

/* -------------------------------------------------------------------------- */
/*                              CONTROLLER (SSOT)                             */
/* -------------------------------------------------------------------------- */

const { products, formatPrice, getStockStatus } = cnsData;

/* -------------------------------------------------------------------------- */
/*                                   VIEW                                     */
/* -------------------------------------------------------------------------- */

const CNSPage: React.FC = memo(() => {
  const { addToCart } = useCart();

  /* ------------------------------------------------------------------------ */
  /*                              CART HANDLER                                */
  /* ------------------------------------------------------------------------ */

  const handleAddToCart = useCallback(
    (product: cnsProduct) => {
      if (product.stock !== "In Stock") {
        toast.error("Product is out of stock");
        return;
      }

      addToCart({
        id: product.slug, // slug-first cart identity
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        inStock: true,
      });

      toast.success(`${product.name} added to cart`);
    },
    [addToCart]
  );

  /* ------------------------------------------------------------------------ */
  /*                                   UI                                     */
  /* ------------------------------------------------------------------------ */

  return (
    <section className={styles.shopSection}>
      {/* Header */}
      <header className={styles.header}>
        <h2>CNS & Nervous System Drugs</h2>

        <div className={styles.subCategory}>
          <label>System:</label>
          <span>Central Nervous System / Neurology</span>
        </div>
      </header>

      {/* Product Grid */}
      <div className={styles.grid}>
        {products.map((product) => {
          const inStock = product.stock === "In Stock";

          return (
            <article key={product.slug} className={styles.card}>
              {/* Image */}
              <div className={styles.imageWrapper}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className={styles.image}
                  priority={false}
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
                <p className={styles.price}>
                  {formatPrice(product.price)}
                </p>
              </div>

              {/* Actions */}
              <div className={styles.actions}>
                <button
                  className={styles.addToCart}
                  disabled={!inStock}
                  onClick={() => handleAddToCart(product)}
                >
                  {inStock ? "🛒 Add to Cart" : "Out of Stock"}
                </button>

                <Link
                  href={`/dropups/cns/${product.slug}`}
                  className={styles.moreInfo}
                >
                  View Details →
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
});

CNSPage.displayName = "CNSPage";

export default CNSPage;
