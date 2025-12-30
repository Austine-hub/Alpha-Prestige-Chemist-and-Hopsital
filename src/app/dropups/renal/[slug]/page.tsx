// src/app/dropups/renal/[slug]/page.tsx
"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import type { ReactNode } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import renalData from "@/data/RenalData";
import type { renalProduct } from "@/data/RenalData";
import styles from "./renalDetails.module.css";

// ---------------------------------------------------------------------------
// Controller bindings (SSOT — no business logic here)
// ---------------------------------------------------------------------------
const {
  getProductBySlug,
  getSimilarProducts,
  formatPrice,
  getStockStatus,
} = renalData;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type TabKey = "features" | "description" | "usage";

// ---------------------------------------------------------------------------
// View Component
// ---------------------------------------------------------------------------
export default function RenalDetailsPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const slug = params.slug;

  // -------------------------------------------------------------------------
  // MODEL selection (read-only)
  // -------------------------------------------------------------------------
  const product: renalProduct | undefined = useMemo(() => {
    return slug ? getProductBySlug(slug) : undefined;
  }, [slug]);

  // -------------------------------------------------------------------------
  // Local UI state (View-only concerns)
  // -------------------------------------------------------------------------
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<TabKey>("features");
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const inStock = product?.stock === "In Stock";

  // -------------------------------------------------------------------------
  // Guard: invalid slug → 404
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (slug && !product) {
      router.replace("/404");
    }
  }, [slug, product, router]);

  // -------------------------------------------------------------------------
  // Reset UI on slug change
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.scrollTo({ top: 0, behavior: "smooth" });
    setQuantity(1);
    setActiveTab("features");
    setImageLoaded(false);
  }, [slug]);

  // -------------------------------------------------------------------------
  // Similar products (derived via Controller)
  // -------------------------------------------------------------------------
  const similarProducts = useMemo(() => {
    if (!product) return [];
    return getSimilarProducts(product.id, 4);
  }, [product]);

  // -------------------------------------------------------------------------
  // Quantity handling (UI safety only)
  // -------------------------------------------------------------------------
  const updateQuantity = useCallback((value: number) => {
    setQuantity(Math.max(1, Math.min(99, value)));
  }, []);

  // -------------------------------------------------------------------------
  // Add to cart (integration placeholder)
  // -------------------------------------------------------------------------
  const handleAddToCart = useCallback(() => {
    if (!product || !inStock || isAdding) return;

    setIsAdding(true);

    setTimeout(() => {
      console.log(`Added ${quantity}× ${product.name} to cart`);
      setIsAdding(false);
    }, 600);
  }, [product, quantity, inStock, isAdding]);

  // -------------------------------------------------------------------------
  // Loading / skeleton state
  // -------------------------------------------------------------------------
  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.skeleton}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonText} />
            <div className={styles.skeletonButton} />
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Tab panels (pure view mapping — FUTURE SAFE)
  // -------------------------------------------------------------------------
  const tabContent: Record<TabKey, ReactNode> = {
    features: (
      <ul className={styles.featuresList}>
        {(product.features ?? [
          "Clinically effective for renal conditions",
          "Manufactured under strict pharmaceutical standards",
          "Reliable therapeutic outcomes",
        ]).map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    ),

    description: (
      <div className={styles.description}>
        <p>{product.fullDescription ?? product.description}</p>
      </div>
    ),

    usage: (
      <div className={styles.usage}>
        <p>
          <strong>How to use:</strong>{" "}
          {product.howToUse ??
            "Use exactly as prescribed by a qualified healthcare professional."}
        </p>
        <p>
          <strong>Storage:</strong> Store in a cool, dry place away from sunlight.
        </p>
        <p className={styles.warning}>
          ⚠️ Always follow professional medical advice before use.
        </p>
      </div>
    ),
  };

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  return (
    <section className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <Link href="/system/renal" className={styles.breadcrumbLink}>Renal System</Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </nav>

      {/* Details */}
      <article className={styles.detailsSection}>
        {/* Image */}
        <div className={styles.imageWrapper}>
          <div className={styles.imageContainer}>
            {!imageLoaded && <div className={styles.imagePlaceholder} />}
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              priority
              onLoad={() => setImageLoaded(true)}
              className={`${styles.productImage} ${imageLoaded ? styles.imageLoaded : ""}`}
            />
          </div>

          {!inStock && (
            <div className={styles.outOfStockBadge}>Out of Stock</div>
          )}
        </div>

        {/* Info */}
        <div className={styles.infoWrapper}>
          <header className={styles.header}>
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.title}>{product.name}</h1>
          </header>

          <div className={styles.priceSection}>
            <span className={styles.price}>{formatPrice(product.price)}</span>
            <span
              className={`${styles.stockBadge} ${
                inStock ? styles.inStock : styles.outStock
              }`}
            >
              {getStockStatus(product)}
            </span>
          </div>

          {/* Tabs */}
          <div className={styles.tabsContainer}>
            <div className={styles.tabButtons} role="tablist">
              {(Object.keys(tabContent) as TabKey[]).map((key) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={activeTab === key}
                  className={`${styles.tabButton} ${
                    activeTab === key ? styles.activeTab : ""
                  }`}
                  onClick={() => setActiveTab(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>

            <div className={styles.tabContent} role="tabpanel">
              {tabContent[activeTab]}
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actionsSection}>
            <div className={styles.quantityControl}>
              <label className={styles.quantityLabel}>Quantity</label>
              <div className={styles.quantityButtons}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => updateQuantity(quantity - 1)}
                  disabled={!inStock || quantity <= 1}
                >
                  −
                </button>

                <input
                  type="number"
                  className={styles.quantityInput}
                  value={quantity}
                  min={1}
                  max={99}
                  disabled={!inStock}
                  onChange={(e) => updateQuantity(Number(e.target.value))}
                />

                <button
                  className={styles.qtyBtn}
                  onClick={() => updateQuantity(quantity + 1)}
                  disabled={!inStock || quantity >= 99}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className={`${styles.addToCartBtn} ${
                !inStock || isAdding ? styles.disabled : ""
              }`}
              onClick={handleAddToCart}
              disabled={!inStock || isAdding}
            >
              {isAdding ? "Adding…" : inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </article>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className={styles.similarSection}>
          <h2 className={styles.similarTitle}>You May Also Like</h2>

          <div className={styles.similarGrid}>
            {similarProducts.map((item) => (
              <Link
                key={item.slug}
                href={`/dropups/renal/${item.slug}`}
                className={styles.similarCard}
              >
                <div className={styles.similarImageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={240}
                    height={240}
                    className={styles.similarImage}
                  />
                </div>

                <div className={styles.similarInfo}>
                  <h3 className={styles.similarName}>{item.name}</h3>
                  <p className={styles.similarPrice}>
                    {formatPrice(item.price)}
                  </p>
                  <span className={styles.viewDetails}>
                    View Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
