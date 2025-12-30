// src/app/system/oral/page.tsx

"use client";

import { memo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import {
  oralProducts,
  type OralProduct,
  formatPrice,
  getStockStatus,
} from "@/data/OralData";
import styles from "./Oral.module.css";

const OralSystemPage = memo(() => {
  const { addToCart } = useCart();

  const handleAddToCart = useCallback(
    (product: OralProduct) => {
      if (product.stock !== "In Stock") {
        toast.error("Product is out of stock");
        return;
      }

      addToCart({
        id: product.slug,
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

  return (
    <section className={styles.shopSection}>
      <header className={styles.header}>
        <h2>Oral Care Products</h2>
        <div className={styles.subCategory}>
          <label>System:</label>
          <span>Oral & Dental Care</span>
        </div>
      </header>

      <div className={styles.grid}>
        {oralProducts.map((product) => {
          const { isInStock, label } = getStockStatus(product.stock);

          return (
            <article key={product.slug} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className={styles.image}
                  priority={false}
                />
                <span className={`${styles.stockBadge} ${isInStock ? styles.inStock : styles.outStock}`}>
                  {label}
                </span>
              </div>

              <div className={styles.details}>
                <p className={styles.category}>{product.subCategory}</p>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.price}>{formatPrice(product.price)}</p>
              </div>

              <div className={styles.actions}>
                <button
                  className={styles.addToCart}
                  disabled={!isInStock}
                  onClick={() => handleAddToCart(product)}
                >
                  {isInStock ? "🛒 Add to Cart" : "Out of Stock"}
                </button>
                <Link href={`/dropups/oral/${product.slug}`} className={styles.moreInfo}>
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

OralSystemPage.displayName = "OralSystemPage";

export default OralSystemPage;