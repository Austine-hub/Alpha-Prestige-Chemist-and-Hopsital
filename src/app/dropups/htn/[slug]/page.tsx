// ============================================================================
// /dropups/htn/[slug]/page.tsx — Hypertension Product Details
// Modern • Optimized • Type-Safe • Next.js 16
// ============================================================================

"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { htnProducts, type Product, formatPrice } from "@/data/HTNData";
import styles from "./HTNDetails.module.css";

type Tab = "features" | "description" | "usage";

export default function HTNDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const product = useMemo(
    () => htnProducts.find((p) => p.slug === slug),
    [slug]
  );

  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<Tab>("features");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const inStock = product?.stock === "In Stock";

  useEffect(() => {
    if (!product) router.push("/404");
  }, [product, router]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setImageLoaded(false);
    setQuantity(1);
    setTab("features");
  }, [slug]);

  const similar = useMemo(
    () =>
      product
        ? htnProducts
            .filter((p) => p.category === product.category && p.slug !== slug)
            .slice(0, 4)
        : [],
    [product, slug]
  );

  const updateQuantity = useCallback((value: number) => {
    setQuantity(Math.max(1, Math.min(99, value)));
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!inStock || isAdding) return;
    
    setIsAdding(true);
    // Simulate cart addition
    setTimeout(() => {
      console.log(`Added ${quantity}x ${product?.name} to cart`);
      setIsAdding(false);
    }, 800);
  }, [inStock, isAdding, quantity, product]);

  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.skeleton}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonText} />
            <div className={styles.skeletonText} />
            <div className={styles.skeletonButton} />
          </div>
        </div>
      </div>
    );
  }

  const tabContent = {
    features: (
      <ul className={styles.featuresList}>
        <li>Clinically proven for hypertension management</li>
        <li>Trusted global pharmaceutical brands</li>
        <li>Recommended by cardiologists worldwide</li>
        <li>Ensures optimal blood pressure control</li>
      </ul>
    ),
    description: (
      <div className={styles.description}>
        <p>
          This antihypertensive medication helps maintain safe blood pressure
          levels, reducing cardiovascular risks such as stroke and heart failure.
          Manufactured under strict GMP standards for quality assurance.
        </p>
      </div>
    ),
    usage: (
      <div className={styles.usage}>
        <p>
          <strong>Dosage:</strong> As directed by your healthcare provider.
        </p>
        <p>
          <strong>Administration:</strong> Take daily, with or without food.
        </p>
        <p>
          <strong>Storage:</strong> Keep in a cool, dry place away from direct sunlight.
        </p>
        <p className={styles.warning}>
          ⚠️ Do NOT discontinue without consulting your doctor.
        </p>
      </div>
    ),
  };

  return (
    <section className={styles.container}>
      {/* Breadcrumb Navigation */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/" className={styles.breadcrumbLink}>
          Home
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <Link href="/conditions/htn" className={styles.breadcrumbLink}>
          Hypertension
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </nav>

      {/* Product Details */}
      <article className={styles.detailsSection}>
        {/* Image Section */}
        <div className={styles.imageWrapper}>
          <div className={styles.imageContainer}>
            {!imageLoaded && <div className={styles.imagePlaceholder} />}
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              className={`${styles.productImage} ${imageLoaded ? styles.imageLoaded : ""}`}
              onLoad={() => setImageLoaded(true)}
              priority
            />
          </div>
          {!inStock && (
            <div className={styles.outOfStockBadge}>Out of Stock</div>
          )}
        </div>

        {/* Product Info */}
        <div className={styles.infoWrapper}>
          <div className={styles.header}>
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.title}>{product.name}</h1>
          </div>

          <div className={styles.priceSection}>
            <span className={styles.price}>{formatPrice(product.price)}</span>
            <span
              className={`${styles.stockBadge} ${
                inStock ? styles.inStock : styles.outStock
              }`}
            >
              {inStock ? "✓ In Stock" : "✕ Out of Stock"}
            </span>
          </div>

          {/* Tabs */}
          <div className={styles.tabsContainer}>
            <div className={styles.tabButtons} role="tablist">
              {(["features", "description", "usage"] as const).map((key) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={tab === key}
                  className={`${styles.tabButton} ${
                    tab === key ? styles.activeTab : ""
                  }`}
                  onClick={() => setTab(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
            <div className={styles.tabContent} role="tabpanel">
              {tabContent[tab]}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className={styles.actionsSection}>
            <div className={styles.quantityControl}>
              <label htmlFor="quantity" className={styles.quantityLabel}>
                Quantity
              </label>
              <div className={styles.quantityButtons}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => updateQuantity(quantity - 1)}
                  disabled={!inStock || quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input
                  id="quantity"
                  type="number"
                  className={styles.quantityInput}
                  value={quantity}
                  min={1}
                  max={99}
                  onChange={(e) => updateQuantity(Number(e.target.value))}
                  disabled={!inStock}
                  aria-label="Quantity"
                />
                <button
                  className={styles.qtyBtn}
                  onClick={() => updateQuantity(quantity + 1)}
                  disabled={!inStock || quantity >= 99}
                  aria-label="Increase quantity"
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
              <svg className={styles.cartIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {isAdding ? "Adding..." : inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </article>

      {/* Similar Products */}
      {similar.length > 0 && (
        <section className={styles.similarSection}>
          <h2 className={styles.similarTitle}>You May Also Like</h2>
          <div className={styles.similarGrid}>
            {similar.map((item) => (
              <Link
                key={item.slug}
                href={`/dropups/htn/${item.slug}`}
                className={styles.similarCard}
              >
                <div className={styles.similarImageWrapper}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={250}
                    height={250}
                    className={styles.similarImage}
                  />
                </div>
                <div className={styles.similarInfo}>
                  <h3 className={styles.similarName}>{item.name}</h3>
                  <p className={styles.similarPrice}>{formatPrice(item.price)}</p>
                  <span className={styles.viewDetails}>
                    View Details <span aria-hidden="true">→</span>
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