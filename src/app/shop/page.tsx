// src/app/shop/page.tsx

"use client";

import React, { useCallback, memo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useCart } from "@/context/CartContext";
import {
  getAllProducts,
  formatPrice,
  type Product,
} from "@/data/details/shop";

import styles from "./Shop.module.css";

const ShopPage: React.FC = () => {
  const router = useRouter();
  const { addToCart } = useCart();

  const products = getAllProducts();

  // Add product to cart with stock check
  const handleAddToCart = useCallback(
    (product: Product) => {
      if (product.stock <= 0) {
        toast.error(`${product.title} is out of stock`);
        return;
      }

      addToCart({
        id: product.id,
        name: product.title,
        price: product.discountedPrice,
        image: product.image,
        quantity: 1,
      });

      toast.success(`${product.title} added to cart`);
    },
    [addToCart]
  );

  // Navigate to dynamic shop details page using slug
  const handleViewDetails = useCallback(
    (slug: string) => {
      if (!slug) {
        toast.error("Product details unavailable");
        return;
      }
      router.push(`/shop/shopDetails/${slug}`);
    },
    [router]
  );

  return (
    <section className={styles.shopSection} aria-label="Product catalog">
      <header className={styles.header}>
        <h2>Our Products</h2>
      </header>

      <div className={styles.grid}>
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product) => (
            <article key={product.id} className={styles.card}>
              {/* Product Image */}
              <button
                type="button"
                className={styles.imageWrapper}
                onClick={() => handleViewDetails(product.slug)}
                aria-label={`View details for ${product.title}`}
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className={styles.image}
                  priority={false}
                />
                <span className={styles.stockBadge}>
                  {product.availability}
                </span>
              </button>

              {/* Product Info */}
              <div className={styles.details}>
                <p className={styles.category}>{product.category}</p>
                <h3 className={styles.name}>{product.title}</h3>
                <p className={styles.price}>
                  {formatPrice(product.discountedPrice)}
                </p>
              </div>

              {/* Actions */}
              <div className={styles.actions}>
                <button
                  className={styles.addToCart}
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock <= 0}
                  aria-label={`Add ${product.title} to cart`}
                >
                  {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                </button>

                <button
                  className={styles.moreInfo}
                  onClick={() => handleViewDetails(product.slug)}
                  aria-label={`View details of ${product.title}`}
                >
                  View
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default memo(ShopPage);