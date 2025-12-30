// src/app/dropdowns/skincare/[slug]/page.tsx

"use client";

import { useMemo, useState, memo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react";

import s from "./Skincare.module.css";

// =====================
// CENTRAL MODEL / CONTROLLER
// =====================
import type { SkinProduct } from "@/data/SkinData";
import {
  getProductBySlug,
  getAllProducts,
  calculateDiscountedPrice,
  formatPrice,
  getProductURL,
} from "@/data/SkinData";

/* ============================================================================
 * PAGE COMPONENT
 * ========================================================================== */
const SkincareDetailsPage = () => {
  const router = useRouter();
  const params = useParams();

  // --------------------------------------------------------------------------
  // Slug normalization (router-safe)
  // --------------------------------------------------------------------------
  const slug = String(
    Array.isArray(params?.slug)
      ? params.slug[0]
      : params?.slug ?? ""
  );

  // --------------------------------------------------------------------------
  // Data fetch (MODEL)
  // --------------------------------------------------------------------------
  const product = useMemo<SkinProduct | undefined>(
    () => getProductBySlug(slug),
    [slug]
  );

  // --------------------------------------------------------------------------
  // UI state
  // --------------------------------------------------------------------------
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<
    SkinProduct["image"] | ""
  >(product?.image ?? "");

  // --------------------------------------------------------------------------
  // Hard fallback — NEVER CRASH
  // --------------------------------------------------------------------------
  if (!product) {
    return (
      <section className={s.notFound}>
        <h2>Product Not Found</h2>
        <p>This product does not exist or the link is invalid.</p>
        <button className={s.btn} onClick={() => router.back()}>
          <ArrowLeft size={18} /> Go Back
        </button>
      </section>
    );
  }

  // --------------------------------------------------------------------------
  // Derived data (CONTROLLER logic from model helpers)
  // --------------------------------------------------------------------------
  const finalPrice = calculateDiscountedPrice(
    product.price,
    product.discount
  );

  const gallery: readonly (SkinProduct["image"])[] =
    product.gallery?.length
      ? [product.image, ...product.gallery]
      : [product.image];

  const recommended = useMemo(
    () =>
      getAllProducts()
        .filter(
          (p) =>
            p.id !== product.id &&
            p.category === product.category
        )
        .slice(0, 4),
    [product]
  );

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------
  return (
    <section className={s.container}>
      {/* ================= BACK ================= */}
      <button className={s.back} onClick={() => router.back()}>
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      {/* ================= MAIN GRID ================= */}
      <div className={s.grid}>
        {/* ---------- GALLERY ---------- */}
        <div className={s.gallery}>
          <div className={s.mainImg}>
            <Image
              src={activeImage}
              alt={product.name}
              width={600}
              height={600}
              priority
            />
          </div>

          <div className={s.thumbs}>
            {gallery.map((img, i) => (
              <button
                key={i}
                className={`${s.thumb} ${
                  img === activeImage ? s.active : ""
                }`}
                onClick={() => setActiveImage(img)}
                aria-label={`View image ${i + 1}`}
              >
                <Image src={img} alt="" width={80} height={80} />
              </button>
            ))}
          </div>
        </div>

        {/* ---------- DETAILS ---------- */}
        <div className={s.details}>
          <h1 className={s.title}>{product.name}</h1>

          {/* Rating */}
          {product.rating && (
            <div className={s.rating}>
              <Star size={16} fill="currentColor" />
              <span>{product.rating}</span>
              <span className={s.reviews}>
                ({product.reviewCount ?? 0})
              </span>
            </div>
          )}

          {/* Price */}
          <div className={s.price}>
            <span className={s.current}>
              {formatPrice(finalPrice)}
            </span>

            {product.oldPrice > finalPrice && (
              <span className={s.old}>
                {formatPrice(product.oldPrice)}
              </span>
            )}

            {product.discount > 0 && (
              <span className={s.badge}>
                -{product.discount}%
              </span>
            )}
          </div>

          {/* Meta */}
          <div className={s.meta}>
            <span>
              Category: {product.category.replace("-", " ")}
            </span>
            <span
              className={product.inStock ? s.stock : s.out}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
            <span>SKU: SKN-{product.id}</span>
          </div>

          {/* Description */}
          <p className={s.desc}>{product.description}</p>

          {/* Usage */}
          {product.usage && (
            <div className={s.box}>
              <h3>How to Use</h3>
              <p>{product.usage}</p>
            </div>
          )}

          {/* Warnings */}
          {product.warnings?.length && (
            <div className={s.box}>
              <h3>Warnings</h3>
              <ul>
                {product.warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity */}
          <div className={s.qty}>
            <button
              disabled={quantity <= 1}
              onClick={() =>
                setQuantity((q) => Math.max(1, q - 1))
              }
            >
              –
            </button>

            <input
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Math.max(1, Number(e.target.value) || 1)
                )
              }
            />

            <button
              onClick={() =>
                setQuantity((q) => q + 1)
              }
            >
              +
            </button>
          </div>

          {/* Actions */}
          <div className={s.actions}>
            <button
              className={s.cart}
              disabled={!product.inStock}
              onClick={() =>
                console.log(
                  `Add ${quantity} × ${product.name}`
                )
              }
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>

            <button
              className={s.wish}
              onClick={() =>
                console.log(`Wishlisted ${product.name}`)
              }
            >
              <Heart size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* ================= RECOMMENDED ================= */}
      {recommended.length > 0 && (
        <section className={s.recommended}>
          <h2>You May Also Like</h2>

          <div className={s.recGrid}>
            {recommended.map((item) => (
              <Link
                key={item.id}
                href={getProductURL(item.slug)}
                className={s.card}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                />
                <p className={s.name}>{item.name}</p>
                <p className={s.recPrice}>
                  {formatPrice(
                    calculateDiscountedPrice(
                      item.price,
                      item.discount
                    )
                  )}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default memo(SkincareDetailsPage);
