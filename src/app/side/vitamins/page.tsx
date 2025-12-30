// src/app/side/vitamins/page.tsx

"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { products, formatPrice, type Product } from "@/data/details/vitaminData";
import styles from "./Vitamins.module.css";

export default function VitaminsPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  
  const [addedId, setAddedId] = useState<string | null>(null);
  const [scrollState, setScrollState] = useState({ left: false, right: false });

  // Memoize product list
  const productList = useMemo<Product[]>(
    () => (Array.isArray(products) ? products : []),
    []
  );

  // Update scroll button states
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    setScrollState({
      left: el.scrollLeft > 0,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  // Scroll handler
  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const offset = Math.max(el.clientWidth * 0.7, 320);
    el.scrollBy({
      left: direction === "left" ? -offset : offset,
      behavior: "smooth",
    });
  }, []);

  // Add to cart handler
  const handleAddToCart = useCallback(
    (product: Product) => {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });

      setAddedId(product.id);
      setTimeout(() => setAddedId(null), 2000);
    },
    [addToCart]
  );

  if (productList.length === 0) {
    return (
      <section className={styles.empty}>
        <h1>No Products Available</h1>
        <p>Check back soon for new wellness products.</p>
      </section>
    );
  }

  return (
    <section className={styles.section} aria-labelledby="vitamins-heading">
      <header className={styles.header}>
        <div>
          <h1 id="vitamins-heading" className={styles.title}>
            Vitamins & Supplements
          </h1>
          <p className={styles.subtitle}>
            Premium wellness products for your health journey
          </p>
        </div>

        <nav className={styles.nav} aria-label="Product navigation">
          <button
            type="button"
            onClick={() => scroll("left")}
            disabled={!scrollState.left}
            className={styles.navBtn}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            disabled={!scrollState.right}
            className={styles.navBtn}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </nav>
      </header>

      <div ref={scrollRef} className={styles.grid} role="list">
        {productList.map((product) => (
          <article key={product.id} className={styles.card} role="listitem">
            {product.discount && (
              <span className={styles.badge}>{product.discount}</span>
            )}

            <Link
              href={`/side/vitamins/vitaminsDetails/${product.slug}`}
              className={styles.imageLink}
              aria-label={`View ${product.name} details`}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={280}
                height={280}
                className={styles.image}
                loading="lazy"
              />
            </Link>

            <div className={styles.content}>
              <Link
                href={`/side/vitamins/vitaminsDetails/${product.slug}`}
                className={styles.name}
              >
                {product.name}
              </Link>

              <div className={styles.meta}>
                <span className={styles.brand}>{product.brand}</span>
                <span className={styles.pack}>{product.packSize}</span>
              </div>

              <div className={styles.pricing}>
                <span className={styles.price}>{formatPrice(product.price)}</span>
                {product.originalPrice > product.price && (
                  <span className={styles.originalPrice}>
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleAddToCart(product)}
                className={`${styles.cartBtn} ${
                  addedId === product.id ? styles.added : ""
                }`}
                aria-label={`Add ${product.name} to cart`}
              >
                <ShoppingCart size={18} />
                <span>{addedId === product.id ? "Added!" : "Add to Cart"}</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}