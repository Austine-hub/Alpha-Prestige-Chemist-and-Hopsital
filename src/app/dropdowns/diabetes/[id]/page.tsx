"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";

import styles from "./Diabetes.module.css";

// === Central Data (Model + Controller API) ===
import type { Offer } from "@/data/diabetesData";
import {
  getOfferById,
  getAllOffers,
  calculateDiscountPrice,
  formatPrice,
  getProductURL,
} from "@/data/diabetesData";

/**
 * Product Details Page Component
 * Renders the individual item description, quantity selector, and related products.
 */
const Page: React.FC = () => {
  const params = useParams();
  const router = useRouter();

  // 1. Get the product ID from URL params. It is always a string or string array.
  // We prioritize robustness by checking the type and ensuring it's a string.
  const routeId = Array.isArray(params.id) ? params.id[0] : params.id;
  const productId = routeId ? String(routeId) : undefined;

  // 2. Fetch product data using the ID. UseMemo prevents unnecessary re-fetches.
  const product = useMemo(
    () => (productId ? getOfferById(productId) : undefined),
    [productId],
  );

  // State for quantity selection
  const [quantity, setQuantity] = useState<number>(1);

  const changeQuantity = (n: number) => {
    // Only allow finite numbers and ensure minimum quantity is 1
    if (!Number.isFinite(n)) return;
    setQuantity(Math.max(1, Math.trunc(n)));
  };

  // --- Early Exit for Not Found ---
  if (!product) {
    return (
      <div className={styles.notFound}>
        <h2 className={styles.title}>💊 Product Not Found</h2>
        <p>The product you are looking for does not exist or the URL is invalid.</p>
        <button onClick={() => router.back()} className={styles.backBtn}>
          Go Back
        </button>
      </div>
    );
  }

  // --- Recommended Items ---
  // A robust way to get related items (e.g., exclude the current item)
  const allOffers = getAllOffers();
  const recommended = allOffers
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  // Calculate prices for cleaner JSX
  const currentPrice = calculateDiscountPrice(product.price, product.discount);

  // --- Render Product Details ---
  return (
    <section className={styles.container}>
      {/* Back Navigation */}
      <button className={styles.backButton} onClick={() => router.back()}>
        <ArrowLeft size={20} /> Back
      </button>

      <div className={styles.wrapper}>
        {/* LEFT: IMAGE GALLERY */}
        <div className={styles.left}>
          <div className={styles.imageBox}>
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              className={styles.mainImage}
              priority
            />
          </div>

          {/* Thumbnail gallery (Showing main image multiple times as a placeholder) */}
          <div className={styles.thumbnailRow}>
            {/* Added a key prop for list stability */}
            {[product.image, product.image, product.image].map((img, index) => (
              <button key={index} className={styles.thumbnailItem}>
                <Image
                  src={img}
                  alt={`${product.name} Preview ${index + 1}`}
                  width={80}
                  height={80}
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: PRODUCT DETAILS */}
        <div className={styles.right}>
          <h1 className={styles.title}>{product.name}</h1>

          {/* Pricing */}
          <div className={styles.priceBlock}>
            <span className={styles.currentPrice}>
              {formatPrice(currentPrice)}
            </span>

            {product.oldPrice > currentPrice && (
              <span className={styles.oldPrice}>
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>

          {/* Meta */}
          <div className={styles.meta}>
            <p>
              <strong>Availability:</strong> In Stock
            </p>
            <p>
              <strong>SKU:</strong> PROD-{product.id}
            </p>
            <p>
              <strong>Category:</strong> Diabetes Products
            </p>
          </div>

          {/* Description */}
          <p className={styles.description}>{product.description}</p>

          {/* Quantity Selector */}
          <div className={styles.quantityRow}>
            <button
              aria-label="Decrease quantity"
              onClick={() => changeQuantity(quantity - 1)}
              className={styles.qtyBtn}
              disabled={quantity <= 1} // Disable button if quantity is 1
            >
              -
            </button>

            <input
              id="quantity"
              className={styles.qtyInput}
              inputMode="numeric"
              pattern="[0-9]*" // Suggests numeric input for mobile keyboards
              value={quantity}
              onChange={(e) => {
                const n = parseInt(e.target.value, 10);
                // Handle direct input change: use parsed number, or 1 if invalid/empty
                changeQuantity(Number.isFinite(n) && n > 0 ? n : 1);
              }}
            />

            <button
              aria-label="Increase quantity"
              onClick={() => changeQuantity(quantity + 1)}
              className={styles.qtyBtn}
            >
              +
            </button>
          </div>

          {/* Action Buttons */}
          <div className={styles.actionRow}>
            {/* A realistic implementation would use the quantity state */}
            <button className={styles.addToCart} onClick={() => console.log(`Added ${quantity} x ${product.name} to cart`)}>
              <ShoppingCart size={18} /> Add to Cart
            </button>

            <button className={styles.wishlistBtn} onClick={() => console.log(`Added ${product.name} to wishlist`)}>
              <Heart size={18} /> Wishlist
            </button>
          </div>
        </div>
      </div>
      
      {/* --- RECOMMENDED SECTION --- */}
      {recommended.length > 0 && (
        <section className={styles.recommended}>
          <h2>You May Also Like ✨</h2>

          <div className={styles.recommendGrid}>
            {recommended.map((item) => (
              <article
                key={item.id}
                className={styles.recommendCard}
                // Navigate to the new page using the correct, safe URL function
                onClick={() => router.push(getProductURL(item.id))}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={180}
                  height={180}
                  className={styles.recommendImage}
                />
                <p className={styles.recommendName}>{item.name}</p>
                <p className={styles.recommendPrice}>
                  {formatPrice(item.price)}
                </p>
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default Page;
