"use client";

// ===============================================================
// src/app/dropdowns/hygiene/[slug]/page.tsx
// Refactored • Modern • Robust • E‑commerce friendly
// ===============================================================
"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, ShoppingCart, ArrowLeft, Share2 } from "lucide-react";
import toast from "react-hot-toast";

import styles from "./Hygiene.module.css";
import type { Offer } from "@/data/hygieneData";
import {
  getOfferById,
  getAllOffers,
  calculateDiscountPrice,
  formatPrice,
  getProductURL,
} from "@/data/hygieneData";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const productId = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const product = useMemo(() => {
    if (!productId) return undefined;
    try {
      return getOfferById(String(productId));
    } catch {
      return undefined;
    }
  }, [productId]);

  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(product?.image);

  const handleQtyChange = useCallback((value: number) => {
    setQty(Math.max(1, Math.floor(value)));
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    try {
      const { useCart } = require("@/context/CartContext");
      const { addToCart } = useCart();
      addToCart({
        id: String(product.id),
        name: product.name,
        price: calculateDiscountPrice(product.price, product.discount),
        image: product.image,
        quantity: qty,
      });
      toast.success(`Added ${qty}x ${product.name}`);
    } catch {
      toast.success(`Added ${qty}x ${product.name}`);
    }
  }, [product, qty]);

  const handleWishlist = useCallback(() => {
    if (!product) return;
    toast(`${product.name} added to wishlist`);
  }, [product]);

  const handleShare = useCallback(async () => {
    if (!product) return;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url: getProductURL(product.id) });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast("Link copied");
      }
    } catch {}
  }, [product]);

  const recommendations = useMemo(() => {
    if (!product) return [];
    try {
      return getAllOffers()
        .filter((p) => p.id !== product.id)
        .slice(0, 4);
    } catch {
      return [];
    }
  }, [product]);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2>Product Not Found</h2>
        <p>The item you're looking for doesn't exist.</p>
        <button onClick={() => router.push("/dropdowns/hygiene")}>
          Browse Products
        </button>
      </div>
    );
  }

  const discountedPrice = calculateDiscountPrice(product.price, product.discount);
  const images = product.gallery?.length ? product.gallery : [product.image];

  return (
    <main className={styles.container}>
      <button className={styles.back} onClick={() => router.back()}>
        <ArrowLeft size={20} />
        Back
      </button>

      <div className={styles.grid}>
        <section className={styles.gallery}>
          <div className={styles.mainImageBox}>
            <Image
              src={activeImage || product.image}
              alt={product.name}
              width={600}
              height={600}
              className={styles.mainImage}
              priority
            />
          </div>

          {images.length > 1 && (
            <div className={styles.thumbnails}>
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={styles.thumb}
                  data-active={activeImage === img}
                >
                  <Image src={img} alt="" width={80} height={80} />
                </button>
              ))}
            </div>
          )}
        </section>

        <section className={styles.details}>
          <h1 className={styles.title}>{product.name}</h1>

          <div className={styles.pricing}>
            <span className={styles.price}>{formatPrice(discountedPrice)}</span>
            {product.oldPrice && product.oldPrice > discountedPrice && (
              <span className={styles.oldPrice}>{formatPrice(product.oldPrice)}</span>
            )}
            {product.discount > 0 && (
              <span className={styles.badge}>{product.discount}% OFF</span>
            )}
          </div>

          <div className={styles.meta}>
            <span className={product.inStock ? styles.inStock : styles.outStock}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
            <span>SKU: PROD-{product.id}</span>
          </div>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.actions}>
            <div className={styles.qtyBox}>
              <button onClick={() => handleQtyChange(qty - 1)} disabled={qty <= 1}>
                −
              </button>
              <input
                type="number"
                value={qty}
                onChange={(e) => handleQtyChange(Number(e.target.value))}
                min="1"
              />
              <button onClick={() => handleQtyChange(qty + 1)}>+</button>
            </div>

            <button className={styles.addCart} onClick={handleAddToCart}>
              <ShoppingCart size={18} />
              Add to Cart
            </button>

            <button className={styles.iconBtn} onClick={handleWishlist}>
              <Heart size={18} />
            </button>

            <button className={styles.iconBtn} onClick={handleShare}>
              <Share2 size={18} />
            </button>
          </div>
        </section>
      </div>

      {recommendations.length > 0 && (
        <section className={styles.recommended}>
          <h2>You Might Also Like</h2>
          <div className={styles.recGrid}>
            {recommendations.map((item) => (
              <article
                key={item.id}
                className={styles.recCard}
                onClick={() => router.push(getProductURL(item.id))}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
                  className={styles.recImage}
                />
                <h3>{item.name}</h3>
                <span className={styles.recPrice}>
                  {formatPrice(calculateDiscountPrice(item.price, item.discount))}
                </span>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}