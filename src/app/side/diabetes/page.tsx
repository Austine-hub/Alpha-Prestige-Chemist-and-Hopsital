"use client";

import React, { memo, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import styles from "./Diabetes.module.css";

// === Central Data Utilities (MVC: Model + Controller API) ===
import type { Offer } from "@/data/diabetesData";
import {
  getAllOffers,
  calculateDiscountPrice,
  formatPrice,
} from "@/data/diabetesData";

/**
 * Updated getProductURL() to match your real folder:
 * /src/app/dropdowns/diabetes/[id]/page.tsx
 */
const getProductURL = (id: string | number): string =>
  `/dropdowns/diabetes/${id}`;

/**
 * Diabetes Product Listing Page (View Layer)
 * ----------------------------------------------------------
 * - Fetches and displays all diabetes-related products
 * - Fully DRY, accessible, optimized, modernized
 * - Routes correctly to /dropdowns/diabetes/[id]
 */
const Diabetes: React.FC = () => {
  // Memoize offers for performance (runs once because the data is static)
  const offers: Offer[] = useMemo(() => getAllOffers(), []);

  // Early-safe rendering for missing data
  if (!offers || offers.length === 0) {
    return (
      <section className={styles.shopSection}>
        <p className={styles.notFound}>No diabetes care products available.</p>
      </section>
    );
  }

  return (
    <section className={styles.shopSection} aria-labelledby="diabetes-heading">
      {/* --- HEADER --- */}
      <header className={styles.header}>
        <h2 id="diabetes-heading" className={styles.title}>
          Diabetes Care Essentials
        </h2>
        <p className={styles.subtitle}>
          Explore doctor-recommended medications and diabetes management essentials.
        </p>
      </header>

      {/* --- PRODUCT GRID --- */}
      <div className={styles.grid} role="list">
        {offers.map((offer) => {
          const href = getProductURL(offer.id);
          const effectivePrice = calculateDiscountPrice(offer.price, offer.discount);

          return (
            <article key={offer.id} className={styles.card} role="listitem">
              {/* --- CLICKABLE PRODUCT CARD LINK --- */}
              <Link
                href={href}
                className={styles.cardLink}
                aria-label={`View details for ${offer.name}`}
              >
                {/* --- PRODUCT IMAGE --- */}
                <div className={styles.imageWrapper} aria-hidden>
                  <Image
                    src={offer.image}
                    alt={offer.name}
                    width={500}
                    height={500}
                    className={styles.image}
                    loading="lazy"
                  />

                  {/* Badges */}
                  <div className={styles.badgeRow}>
                    <span className={styles.stockBadge}>In Stock</span>

                    {offer.discount > 0 && (
                      <span className={styles.discountBadge}>
                        {offer.discount}% OFF
                      </span>
                    )}
                  </div>
                </div>

                {/* --- PRODUCT TEXT DETAILS --- */}
                <div className={styles.details}>
                  <p className={styles.category}>
                    {offer.description.split(".")[0]}.
                  </p>

                  <h3 className={styles.name}>{offer.name}</h3>

                  <div className={styles.priceRow}>
                    <p className={styles.price}>{formatPrice(effectivePrice)}</p>

                    {offer.oldPrice > effectivePrice && (
                      <p className={styles.oldPrice}>
                        {formatPrice(offer.oldPrice)}
                      </p>
                    )}
                  </div>
                </div>
              </Link>

              {/* --- ACTION BUTTONS --- */}
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.addToCart}
                  aria-label={`Add ${offer.name} to cart`}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("ADD TO CART:", {
                      id: offer.id,
                      name: offer.name,
                      price: effectivePrice,
                      qty: 1,
                    });
                  }}
                >
                  <ShoppingCart size={16} /> Add to Cart
                </button>

                <Link
                  href={href}
                  className={styles.moreInfo}
                  aria-label={`More info about ${offer.name}`}
                >
                  More Info
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default memo(Diabetes);

