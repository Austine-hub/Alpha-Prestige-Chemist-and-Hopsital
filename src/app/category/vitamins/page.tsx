"use client";

import React, { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useCart } from "@/context/CartContext";
import { Product, getAllProducts, formatPrice } from "@/data/vitaminData";
import styles from "./Vitamins.module.css";

const Vitamins: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { addToCart } = useCart();

  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const products = useMemo(() => {
    try {
      return getAllProducts();
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const timeout = setTimeout(() => setLoading(false), 250);
      return () => clearTimeout(timeout);
    } else {
      setLoading(false);
    }
  }, [products.length]);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < maxScroll - 5);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el?.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = Math.max(el.clientWidth * 0.7, 300);
    el.scrollTo({
      left: dir === "left" ? el.scrollLeft - amount : el.scrollLeft + amount,
      behavior: "smooth",
    });
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    setAddedProductId(String(product.id));
    toast.success(`${product.name} added to cart 🛒`, { duration: 1500 });
    setTimeout(() => setAddedProductId(null), 1500);
  };

  if (loading) {
    return (
      <section className={styles.loadingSection}>
        <div className={styles.loadingContent}>
          <div className={styles.spinner} />
          <h1 className={styles.loadingTitle}>Loading Vitamins...</h1>
          <p className={styles.loadingText}>Preparing your wellness essentials</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className={styles.emptySection}>
        <div className={styles.emptyContent}>
          <h1 className={styles.emptyTitle}>No Vitamins Available</h1>
          <p className={styles.emptyText}>Please check back later for premium supplements and wellness products.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.productsSection} aria-labelledby="vitamins-title">
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 id="vitamins-title" className={styles.title}>
            Vitamins & Supplements
          </h1>
          <p className={styles.subtitle}>
            Boost immunity, energy, and wellness with premium vitamins and supplements
          </p>
        </div>

        <nav className={styles.navigation} aria-label="Product carousel navigation">
          <button
            className={`${styles.navButton} ${!canScrollLeft ? styles.disabled : ""}`}
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            className={`${styles.navButton} ${!canScrollRight ? styles.disabled : ""}`}
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </nav>
      </header>

      <div className={styles.productsContainer} ref={scrollRef} role="list">
        {products.map((product) => (
          <article key={product.id} className={styles.productCard} role="listitem">
            <Link href={`/dropdowns/vitamins/${product.slug}`} className={styles.cardLink}>
              {product.discount && (
                <div className={styles.discountBadge}>{product.discount}</div>
              )}

              <div className={styles.imageContainer}>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={240}
                  height={240}
                  loading="lazy"
                  className={styles.productImage}
                />
              </div>

              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>

                <div className={styles.productMeta}>
                  <span className={styles.category}>{product.category}</span>
                  <span className={styles.packSize}>{product.packSize}</span>
                </div>

                <div className={styles.priceContainer}>
                  <span className={styles.currentPrice}>{formatPrice(product.price)}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className={styles.originalPrice}>
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </Link>

            <button
              className={`${styles.cartButton} ${addedProductId === String(product.id) ? styles.added : ""} ${!product.inStock ? styles.outOfStock : ""}`}
              onClick={() => handleAddToCart(product)}
              disabled={!product.inStock}
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart size={18} strokeWidth={2} />
              <span className={styles.cartText}>
                {addedProductId === String(product.id)
                  ? "Added!"
                  : product.inStock
                  ? "Add to Cart"
                  : "Out of Stock"}
              </span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Vitamins;