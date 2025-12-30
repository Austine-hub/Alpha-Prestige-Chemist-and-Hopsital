// ============================================================================
// src/app/dropups/diabetes/[slug]/page.tsx — Diabetes Product Details
// Modern • Responsive • Slider • SEO • DRY • Next.js 16
// ============================================================================

"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import { getAllOffers, type Offer } from "@/data/diabetes1Data";
import styles from "./DiabetesDetails.module.css";
import { useCart } from "@/context/CartContext";

const formatPrice = (v: number) => `KSh ${v.toLocaleString()}`;

export default function DiabetesDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { addToCart } = useCart();

  const all = getAllOffers();
  const product = useMemo(() => all.find((p) => p.slug === slug), [slug, all]);

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!product) router.push("/404");
  }, [product, router]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setQuantity(1);
    setActiveImage(0);
    setImageLoaded(false);
  }, [slug]);

  const related = useMemo(() => {
    if (!product) return [];
    return all.filter((p) => p.slug !== product.slug).slice(0, 4);
  }, [product, all]);

  const handleAddToCart = () => {
    if (!product?.inStock) return;
    addToCart({ ...product, quantity });
    toast.success(`${product.name} added to cart 🛒`);
  };

  if (!product) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
      </div>
    );
  }

  const images = [product.image, ...(product.gallery ?? [])];
  const inStock = product.inStock ?? true;

  return (
    <div className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/conditions/diabetes">Diabetes</Link>
        <span>/</span>
        <span className={styles.active}>{product.name}</span>
      </nav>

      {/* Product Section */}
      <article className={styles.product}>
        {/* Gallery */}
        <div className={styles.gallery}>
          <div className={styles.mainImg}>
            {!imageLoaded && <div className={styles.imgPlaceholder} />}
            <Image
              src={images[activeImage]}
              alt={product.name}
              width={600}
              height={600}
              priority
              onLoad={() => setImageLoaded(true)}
              className={imageLoaded ? styles.loaded : ""}
            />
          </div>

          {images.length > 1 && (
            <div className={styles.thumbs}>
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveImage(i);
                    setImageLoaded(false);
                  }}
                  className={i === activeImage ? styles.thumbActive : ""}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={img} alt="" width={80} height={80} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className={styles.info}>
          <span className={styles.badge}>Diabetes Care</span>
          <h1>{product.name}</h1>

          <div className={styles.pricing}>
            <div className={styles.prices}>
              <span className={styles.newPrice}>{formatPrice(product.price)}</span>
              <span className={styles.oldPrice}>{formatPrice(product.oldPrice)}</span>
            </div>
            <span className={styles.discount}>-{product.discount}%</span>
          </div>

          <span className={`${styles.stock} ${inStock ? styles.stockIn : styles.stockOut}`}>
            {inStock ? "✓ In Stock" : "✕ Out of Stock"}
          </span>

          <p className={styles.desc}>
            {product.name} is a trusted diabetes-care medication formulated to help 
            stabilize blood glucose levels, reduce hyperglycemia risks, and support 
            long-term metabolic control. Manufactured under strict pharmaceutical 
            standards for Type 2 diabetes management.
          </p>

          {/* Quantity */}
          <div className={styles.qty}>
            <label>Quantity</label>
            <div className={styles.qtyBox}>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                min={1}
                max={99}
                onChange={(e) => setQuantity(Math.max(1, Math.min(99, +e.target.value || 1)))}
              />
              <button
                onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            className={styles.addBtn}
            onClick={handleAddToCart}
            disabled={!inStock}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M9 2L11 7H20L15 11L17 16L12 12L7 16L9 11L4 7H13L9 2Z" />
              <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </article>

      {/* Related Products */}
      {related.length > 0 && (
        <section className={styles.related}>
          <h2>You May Also Like</h2>
          <div className={styles.grid}>
            {related.map((item) => (
              <Link key={item.slug} href={`/dropups/diabetes/${item.slug}`}>
                <div className={styles.card}>
                  <Image src={item.image} alt={item.name} width={240} height={240} />
                  <h3>{item.name}</h3>
                  <p className={styles.cardPrice}>{formatPrice(item.price)}</p>
                  <span className={styles.arrow}>View Details →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}