//src/app/system/respiratory/page.tsx

"use client";

import React, { memo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useCart } from "@/context/CartContext";
import RespiratoryData from "@/data/respiratoryData";

import styles from "../Shop.module.css";

// Extract model + helpers
const { products, formatPrice, getStockStatus } = RespiratoryData;

// ===============================================================
// 🧩 Product Card (Memoized, DRY, View Component)
// ===============================================================

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  slug: string;
  category: string;
  stock?: number;
  onOpen: (slug: string) => void;
  onAddCart: () => void;
}

const ProductCard = memo(
  ({ name, price, oldPrice, image, slug, category, stock, onOpen, onAddCart }: ProductCardProps) => {
    return (
      <article
        className={styles.card}
        onClick={() => onOpen(slug)}
        role="button"
        tabIndex={0}
      >
        {/* Product Image */}
        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 250px"
            className={styles.image}
          />

          <span className={styles.stockBadge}>{getStockStatus({ stock })}</span>
        </div>

        {/* Details */}
        <div className={styles.details}>
          <p className={styles.category}>{category}</p>
          <h3 className={styles.name}>{name}</h3>

          <div className={styles.priceRow}>
            <span className={styles.current}>{formatPrice(price)}</span>
            {oldPrice && <span className={styles.old}>{formatPrice(oldPrice)}</span>}
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
          <button className={styles.addToCart} onClick={onAddCart}>
            🛒 Add to Cart
          </button>

          <Link
            href={`/dropups/respiratory/${slug}`}
            className={styles.moreInfo}
            onClick={(e) => e.stopPropagation()}
          >
            More Info
          </Link>
        </div>
      </article>
    );
  }
);

ProductCard.displayName = "ProductCard";

// ===============================================================
// 🎯 Controller + Page View Component
// ===============================================================

const Respiratory: React.FC = memo(() => {
  const { addToCart } = useCart();
  const router = useRouter();

  // Handle view → slug navigation
  const openProduct = useCallback(
    (slug: string) => {
      router.push(`/dropups/respiratory/${encodeURIComponent(slug)}`);
    },
    [router]
  );

  const handleAddToCart = useCallback(
    (product: any) => {
      addToCart({
        id: String(product.id),
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
    <section className={styles.respiratorySection}>
      {/* Header */}
      <header className={styles.header}>
        <h2>Respiratory Drugs</h2>

        <div className={styles.subCategory}>
          <label>Category:</label>
          <span>Respiratory</span>
        </div>
      </header>

      {/* Product Grid */}
      <div className={styles.grid}>
        {products.map((p) => (
          <ProductCard
            key={p.slug}
            id={p.id}
            name={p.name}
            price={p.price}
            oldPrice={p.oldPrice}
            image={p.image}
            slug={p.slug}
            category={p.category}
            stock={p.stock}
            onOpen={openProduct}
            onAddCart={() => handleAddToCart(p)}
          />
        ))}
      </div>
    </section>
  );
});

Respiratory.displayName = "Respiratory";

export default Respiratory;
