// src/app/system/reproductive/page.tsx
"use client";

import React, { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, Eye } from "lucide-react";
import { toast } from "sonner";

import styles from "./Reproductive.module.css";
import SexualData from "@/data/details/sexualData";

const { products, formatPrice } = SexualData;

// ===============================================================
// 🧩 Product Card — Memoized
// ===============================================================
interface ProductCardProps {
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  slug: string;
  badge?: string;
  onOpen: (slug: string) => void;
}

const ProductCard = memo(
  ({ name, price, oldPrice, image, slug, badge, onOpen }: ProductCardProps) => {
    const stop = (e: React.MouseEvent) => e.stopPropagation();

    const handleAddCart = useCallback(
      (e: React.MouseEvent) => {
        stop(e);
        toast.success(`${name} added to cart`);
      },
      [name]
    );

    const handleWishlist = useCallback(
      (e: React.MouseEvent) => {
        stop(e);
        toast.success(`${name} added to wishlist`);
      },
      [name]
    );

    return (
      <article
        className={styles.card}
        onClick={() => onOpen(slug)}
        role="button"
        tabIndex={0}
      >
        {badge && <span className={styles.badge}>{badge}</span>}

        <div className={styles.actions}>
          <button
            aria-label="Add to wishlist"
            className={styles.iconBtn}
            onClick={handleWishlist}
          >
            <Heart size={18} strokeWidth={2} />
          </button>

          <button aria-label="See details" className={styles.iconBtn} onClick={stop}>
            <Eye size={18} strokeWidth={2} />
          </button>
        </div>

        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className={styles.image}
          />
        </div>

        <div className={styles.info}>
          <h3>{name}</h3>
          <div className={styles.priceRow}>
            <span className={styles.current}>{formatPrice(price)}</span>
            {oldPrice && <span className={styles.old}>{formatPrice(oldPrice)}</span>}
          </div>

          <button className={styles.addBtn} onClick={handleAddCart}>
            + Add to Cart
          </button>
        </div>
      </article>
    );
  }
);

ProductCard.displayName = "ProductCard";

// ===============================================================
// 🎯 Popular Products Page — Controller + View
// ===============================================================
const PopularProducts: React.FC = () => {
  const router = useRouter();

  const openProduct = useCallback(
    (slug: string) => router.push(`/dropups/sexual/${encodeURIComponent(slug)}`),
    [router]
  );

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>Popular Products</h2>
        <a href="/view-all" className={styles.viewAll}>
          View All
        </a>
      </header>

      <div className={styles.grid}>
        {products.map((p) => (
          <ProductCard
            key={p.slug}
            name={p.name}
            price={p.price}
            oldPrice={p.oldPrice}
            image={p.image}
            slug={p.slug}
            badge={p.badge}
            onOpen={openProduct}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;
