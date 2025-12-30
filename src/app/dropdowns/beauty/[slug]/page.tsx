// src/app/dropdowns/beauty/[slug]/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { useParams, useRouter } from "next/navigation";

import {
  getProductBySlug,
  getAllProducts,
  calculateDiscountPrice,
  formatPrice,
  getProductURL,
} from "@/data/beautyData";

import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react";
import styles from "./Beauty.module.css";

/* ============================================================================
   SAFE HELPERS (Strict + Bulletproof)
============================================================================= */

/** Normalize slug input from params */
function resolveSlug(params: Record<string, any> | undefined): string {
  if (!params || !params.slug) return "";
  return Array.isArray(params.slug)
    ? String(params.slug[0] ?? "").trim()
    : String(params.slug).trim();
}

/** Ensures quantity stays >= 1 and is always a number */
function clampQuantity(val: number | string): number {
  const num = typeof val === "string" ? Number.parseInt(val, 10) : Number(val);
  return Number.isFinite(num) && num > 0 ? Math.floor(num) : 1;
}

/* ============================================================================
   PAGE COMPONENT (VIEW)
============================================================================= */

export default function BeautyPage() {
  const router = useRouter();
  const params = useParams();

  /* --------------------------
     Slug (Memoized & Clean)
  --------------------------- */
  const slug = useMemo(() => resolveSlug(params), [params]);

  /* --------------------------
     Product from SSOT (MODEL)
  --------------------------- */
  const product = useMemo(() => {
    if (!slug) return undefined;

    try {
      return getProductBySlug(slug);
    } catch (e) {
      console.error("Failed fetching product:", e);
      return undefined;
    }
  }, [slug]);

  /* --------------------------
     Local State
  --------------------------- */
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState<
    string | StaticImageData | undefined
  >(product?.image);

  /* Update image & reset qty when product changes */
  useEffect(() => {
    setQuantity(1);
    setMainImage(product?.image);
  }, [product?.id]);

  /* --------------------------
     Not Found Safe Page
  --------------------------- */
  if (!product) {
    return (
      <div className={styles.notFound} role="alert">
        <h2>Product not found</h2>
        <p>This item may not exist or the link is incorrect.</p>

        <button
          type="button"
          className={styles.btn}
          onClick={() => router.back()}
        >
          <ArrowLeft size={16} /> Back
        </button>
      </div>
    );
  }

  /* --------------------------
     Derived Computations
  --------------------------- */
  const finalPrice = calculateDiscountPrice(product.price, product.discount);

  const gallery = useMemo(() => {
    return Array.isArray(product.gallery) && product.gallery.length > 0
      ? [product.image, ...product.gallery]
      : [product.image];
  }, [product]);

  /* --------------------------
     Recommended Products
  --------------------------- */
  const recommended = useMemo(() => {
    try {
      return getAllProducts()
        .filter(
          (p) => p.id !== product.id && p.category === product.category
        )
        .slice(0, 4);
    } catch (e) {
      console.error("Recommended fetch error:", e);
      return [];
    }
  }, [product.id, product.category]);

  /* ============================================================================
     EVENT HANDLERS
  ============================================================================= */

  const handleQuantityChange = (value: string | number) =>
    setQuantity(clampQuantity(value));

  const handleAddToCart = () => {
    console.log(
      `Added to cart: ${quantity} × ${product.name} (id: ${product.id})`
    );
  };

  const handleWishlist = () => {
    console.log(`Wishlist added: ${product.id}`);
  };

  const navigateToProduct = (slug: string) => {
    router.push(getProductURL(slug));
  };

  /* ============================================================================
     RENDER
  ============================================================================= */

  return (
    <section className={styles.container}>
      {/* Back Button */}
      <button
        type="button"
        className={styles.back}
        onClick={() => router.back()}
      >
        <ArrowLeft size={18} />
        <span className={styles.backText}>Back</span>
      </button>

      <div className={styles.grid}>
        {/* =======================
            IMAGE GALLERY
        ======================== */}
        <div className={styles.gallery}>
          <div className={styles.mainImg}>
            {mainImage ? (
              <Image
                src={mainImage}
                alt={product.name}
                width={600}
                height={600}
                className={styles.image}
                priority
              />
            ) : (
              <div className={styles.imagePlaceholder}>No Image</div>
            )}
          </div>

          <div className={styles.thumbs} role="list">
            {gallery.map((img, i) => {
              const active = img === mainImage;
              return (
                <button
                  key={i}
                  type="button"
                  className={`${styles.thumb} ${
                    active ? styles.active : ""
                  }`}
                  aria-pressed={active}
                  onClick={() => setMainImage(img)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    width={80}
                    height={80}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* =======================
            DETAILS PANEL
        ======================== */}
        <div className={styles.details}>
          <h1 className={styles.title}>{product.name}</h1>

          {product.rating && (
            <div className={styles.rating}>
              <Star size={16} />
              <span>{product.rating}</span>
              <span className={styles.reviews}>({product.reviewCount})</span>
            </div>
          )}

          {/* Price */}
          <div className={styles.priceRow}>
            <div>
              <span className={styles.currentPrice}>
                {formatPrice(finalPrice)}
              </span>

              {product.oldPrice > finalPrice && (
                <span className={styles.oldPrice}>
                  {formatPrice(product.oldPrice)}
                </span>
              )}

              {product.discount > 0 && (
                <span className={styles.badge}>-{product.discount}%</span>
              )}
            </div>

            <div className={styles.meta}>
              <span>Category: {product.category}</span>
              <span
                className={
                  product.inStock ? styles.inStock : styles.outOfStock
                }
              >
                {product.inStock ? "In stock" : "Out of stock"}
              </span>
              <span>SKU: {product.id}</span>
            </div>
          </div>

          <p className={styles.description}>{product.description}</p>

          {/* How to use */}
          {product.howToUse?.length > 0 && (
            <div className={styles.box}>
              <h3 className={styles.boxTitle}>How to use</h3>
              <p className={styles.boxText}>{product.howToUse.join(" • ")}</p>
            </div>
          )}

          {/* Warnings */}
          {product.warnings && product.warnings.length > 0 && (
            <div className={styles.box}>
              <h3 className={styles.boxTitle}>Warnings</h3>
              <ul className={styles.warningList}>
                {product.warnings.map((w, idx) => (
                  <li key={idx}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Purchase + Quantity */}
          <div className={styles.purchaseRow}>
            <div className={styles.qty}>
              <label htmlFor="qty">Qty</label>
              <div className={styles.qtyControls}>
                <button
                  type="button"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  -
                </button>

                <input
                  id="qty"
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={styles.cartBtn}
              >
                <ShoppingCart size={18} /> Add to cart
              </button>

              <button
                type="button"
                onClick={handleWishlist}
                className={styles.wishBtn}
              >
                <Heart size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =======================
          RECOMMENDED PRODUCTS
      ======================== */}
      {recommended.length > 0 && (
        <section className={styles.recommended}>
          <h2 className={styles.sectionTitle}>You may also like</h2>

          <div className={styles.recGrid}>
            {recommended.map((item) => (
              <article
                key={item.id}
                className={styles.card}
                role="button"
                tabIndex={0}
                onClick={() => navigateToProduct(item.slug)}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") &&
                  navigateToProduct(item.slug)
                }
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                  className={styles.cardImage}
                />

                <div className={styles.cardBody}>
                  <p className={styles.cardName}>{item.name}</p>
                  <p className={styles.cardPrice}>
                    {formatPrice(item.price)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
