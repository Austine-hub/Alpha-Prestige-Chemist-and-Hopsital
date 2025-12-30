// src/app/dropups/respiratory/[slug]/page.tsx

"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import RespiratoryData from "@/data/respiratoryData";
import styles from "./RespiratoryDetails.module.css";

// Extract model utilities
const {
  getProductBySlug,
  getSimilarProducts,
  formatPrice,
  getStockStatus,
} = RespiratoryData;

type Tab = "features" | "description" | "usage";

export default function RespiratoryDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  // -------------------------------------------
  // PRODUCT DATA (Model)
  // -------------------------------------------
  const product = useMemo(() => getProductBySlug(slug), [slug]);

  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState<Tab>("features");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const inStock = product ? (product.stock ?? 0) > 0 : false;
// src/app/dropups/respiratory/[slug]/page.tsx
  // -------------------------------------------
  // NAVIGATE AWAY IF PRODUCT NOT FOUND
  // -------------------------------------------
  useEffect(() => {
    if (!product) router.push("/404");
  }, [product, router]);

  // -------------------------------------------
  // RESET STATE ON SLUG CHANGE
  // -------------------------------------------
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setImageLoaded(false);
    setQuantity(1);
    setTab("features");
  }, [slug]);

  // -------------------------------------------
  // SIMILAR PRODUCTS
  // -------------------------------------------
  const similar = useMemo(() => {
    if (!product) return [];
    return getSimilarProducts(product.id, 4);
  }, [product]);

  // -------------------------------------------
  // Quantity
  // -------------------------------------------
  const updateQuantity = useCallback((value: number) => {
    setQuantity(Math.max(1, Math.min(99, value)));
  }, []);

  // -------------------------------------------
  // Add To Cart (Mock)
  // -------------------------------------------
  const handleAddToCart = useCallback(() => {
    if (!inStock || isAdding) return;

    setIsAdding(true);
    setTimeout(() => {
      console.log(`Added ${quantity}x ${product?.name} to cart`);
      setIsAdding(false);
    }, 700);
  }, [inStock, isAdding, quantity, product]);

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

  // -------------------------------------------
  // TAB CONTENT
  // -------------------------------------------
  const tabContent = {
    features: (
      <ul className={styles.featuresList}>
        {(product.features ?? [
          "Clinically effective for respiratory conditions",
          "High-quality pharmaceutical manufacturing",
          "Fast relief and reliable therapeutic action",
          "Recommended in respiratory care protocols",
        ]).map((f, i) => (
          <li key={i}>{f}</li>
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
          {product.howToUse ?? "Use exactly as prescribed by your healthcare provider."}
        </p>
        <p>
          <strong>Storage:</strong> Store in a cool, dry place away from sunlight.
        </p>
        <p className={styles.warning}>⚠️ Always follow medical advice before use.</p>
      </div>
    ),
  };

  return (
    <section className={styles.container}>
      {/* ---------------------------------------------------------------- */}
      {/* Breadcrumb Navigation */}
      {/* ---------------------------------------------------------------- */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSeparator}>/</span>

        <Link href="/system/respiratory" className={styles.breadcrumbLink}>
          Respiratory System
        </Link>

        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </nav>

      {/* ---------------------------------------------------------------- */}
      {/* PRODUCT DETAILS */}
      {/* ---------------------------------------------------------------- */}
      <article className={styles.detailsSection}>
        {/* IMAGE */}
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

          {(!inStock || product.stock === 0) && (
            <div className={styles.outOfStockBadge}>Out of Stock</div>
          )}
        </div>

        {/* INFORMATION */}
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
              {getStockStatus(product)}
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

          {/* Quantity + Cart */}
          <div className={styles.actionsSection}>
            {/* Quantity */}
            <div className={styles.quantityControl}>
              <label htmlFor="quantity" className={styles.quantityLabel}>
                Quantity
              </label>

              <div className={styles.quantityButtons}>
                <button
                  className={styles.qtyBtn}
                  onClick={() => updateQuantity(quantity - 1)}
                  disabled={!inStock || quantity <= 1}
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

            {/* Add To Cart */}
            <button
              className={`${styles.addToCartBtn} ${
                !inStock || isAdding ? styles.disabled : ""
              }`}
              onClick={handleAddToCart}
              disabled={!inStock || isAdding}
            >
              {isAdding ? "Adding..." : inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </article>

      {/* ---------------------------------------------------------------- */}
      {/* SIMILAR PRODUCTS */}
      {/* ---------------------------------------------------------------- */}
      {similar.length > 0 && (
        <section className={styles.similarSection}>
          <h2 className={styles.similarTitle}>You May Also Like</h2>

          <div className={styles.similarGrid}>
            {similar.map((item) => (
              <Link
                key={item.slug}
                href={`/dropups/respiratory/${item.slug}`}
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
                  <p className={styles.similarPrice}>{formatPrice(item.price)}</p>
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
