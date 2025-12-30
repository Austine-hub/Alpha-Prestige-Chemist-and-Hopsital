// src/app/dropdowns/vitamins/[slug]/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react";

import {
  getAllProducts,
  getProductBySlug,
  formatPrice,
  type Product,
} from "@/data/vitaminData";

import styles from "./Vitamins.module.css";

// ------------------------------
// Utils
// ------------------------------
const clampQty = (value: number | string): number => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
};

// ------------------------------
// Page
// ------------------------------
export default function VitaminsDetailsPage() {
  const router = useRouter();
  const params = useParams<{ slug?: string | string[] }>();

  // Normalize slug safely
  const productSlug = useMemo(() => {
    if (!params?.slug) return "";
    return Array.isArray(params.slug) ? params.slug[0] : params.slug;
  }, [params?.slug]);

  // Product
  const product: Product | undefined = useMemo(
    () => getProductBySlug(productSlug),
    [productSlug]
  );

  // State
  const [qty, setQty] = useState<number>(1);
  const [mainImg, setMainImg] = useState<StaticImageData | string | null>(null);

  // Reset on product change
  useEffect(() => {
    setQty(1);
    setMainImg(product?.image ?? null);
  }, [product?.id]);

  // Gallery
  const gallery = useMemo<(StaticImageData | string)[]>(() => {
    if (!product) return [];
    return product.images?.length ? product.images : [product.image];
  }, [product]);

  // Recommended
  const recommended = useMemo(
    () =>
      getAllProducts()
        .filter(
          (p) =>
            p.id !== product?.id &&
            p.category === product?.category
        )
        .slice(0, 4),
    [product]
  );

  // ------------------------------
  // Not found
  // ------------------------------
  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn’t exist.</p>
        <button className={styles.btn} onClick={() => router.back()}>
          <ArrowLeft size={16} /> Back
        </button>
      </div>
    );
  }

  // ------------------------------
  // Handlers
  // ------------------------------
  const handleAddToCart = () => {
    console.log(`Added ${qty} × ${product.name}`);
  };

  const goToProduct = (slug: string) => {
    router.push(`/dropdowns/vitamins/${slug}`);
  };

  // ------------------------------
  // Render
  // ------------------------------
  return (
    <section className={styles.container}>
      <button className={styles.back} onClick={() => router.back()}>
        <ArrowLeft size={18} /> Back
      </button>

      <div className={styles.grid}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImg}>
            {mainImg && (
              <Image
                src={mainImg}
                alt={product.name}
                width={600}
                height={600}
                priority
              />
            )}
          </div>

          <div className={styles.thumbs}>
            {gallery.map((img, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.thumb} ${
                  img === mainImg ? styles.active : ""
                }`}
                onClick={() => setMainImg(img)}
              >
                <Image src={img} alt={`View ${i + 1}`} width={80} height={80} />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className={styles.details}>
          <h1 className={styles.title}>{product.name}</h1>
          {product.brand && <p className={styles.brand}>{product.brand}</p>}

          {product.rating !== undefined && (
            <div className={styles.rating}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < product.rating ? "currentColor" : "none"}
                />
              ))}
              <span>{product.rating.toFixed(1)}</span>
              <span className={styles.reviews}>
                ({product.reviewCount.toLocaleString()})
              </span>
            </div>
          )}

          <div className={styles.price}>
            <span className={styles.current}>
              {formatPrice(product.price)}
            </span>
            {product.originalPrice &&
              product.originalPrice > product.price && (
                <span className={styles.old}>
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            {product.discount && (
              <span className={styles.badge}>{product.discount}</span>
            )}
          </div>

          <div className={styles.meta}>
            <span>
              <strong>Category:</strong> {product.category}
            </span>
            <span className={product.inStock ? styles.stock : styles.out}>
              {product.inStock ? "✓ In Stock" : "Out of Stock"}
            </span>
            {product.form && (
              <span>
                <strong>Form:</strong> {product.form}
              </span>
            )}
          </div>

          <p className={styles.desc}>{product.description}</p>
          {product.fullDescription && (
            <p className={styles.desc}>{product.fullDescription}</p>
          )}

          {product.keyIngredients?.length > 0 && (
            <div className={styles.box}>
              <h3>Key Ingredients</h3>
              <ul>
                {product.keyIngredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>
          )}

          {product.suggestedUse?.length > 0 && (
            <div className={styles.box}>
              <h3>Suggested Use</h3>
              <p>{product.suggestedUse.join(" • ")}</p>
            </div>
          )}

          <div className={styles.qty}>
            <button disabled={qty <= 1} onClick={() => setQty(q => q - 1)}>
              −
            </button>
            <input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(clampQty(e.target.value))}
            />
            <button onClick={() => setQty(q => q + 1)}>+</button>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.cart}
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <button className={styles.wish} aria-label="Add to wishlist">
              <Heart size={18} />
            </button>
          </div>
        </div>
      </div>

      {recommended.length > 0 && (
        <section className={styles.recommended}>
          <h2>More {product.category}</h2>
          <div className={styles.recGrid}>
            {recommended.map((item) => (
              <article
                key={item.id}
                className={styles.card}
                onClick={() => goToProduct(item.slug)}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                />
                <p className={styles.name}>{item.name}</p>
                <p className={styles.recPrice}>
                  {formatPrice(item.price)}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}
