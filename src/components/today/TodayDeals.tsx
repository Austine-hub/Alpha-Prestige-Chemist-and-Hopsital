//src/components/today/TodayDeals

"use client";

import React, { useMemo, useCallback } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getAllDealsInKSH } from "@/data/details/today";
import styles from "./TodayDeals.module.css";
import toast from "react-hot-toast";

const renderStars = (rating = 4) => {
  const filled = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  const empty = 5 - Math.ceil(rating);

  return (
    <>
      {Array.from({ length: filled }, (_, i) => (
        <span key={`f${i}`} className={styles.starFilled}>★</span>
      ))}
      {hasHalf && <span className={styles.starHalf}>★</span>}
      {Array.from({ length: empty }, (_, i) => (
        <span key={`e${i}`} className={styles.starEmpty}>★</span>
      ))}
    </>
  );
};

const TodayDeals: React.FC = () => {
  const { addItem } = useCart();
  const deals = useMemo(() => getAllDealsInKSH(), []);

  const handleAddToCart = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, deal: any) => {
      e.preventDefault();
      e.stopPropagation();

      addItem({
        id: deal.id,
        name: deal.name,
        price: deal.price,
        quantity: 1,
        image: deal.img,
        stock: 999,
        inStock: true,
      });

      toast.success(`${deal.name} added to cart`, {
        duration: 2500,
        position: "top-center",
      });
    },
    [addItem]
  );

  if (!deals.length) return null;

  return (
    <section className={styles.dealsSection}>
      <div className={styles.sectionHeader}>
        <h1 className={styles.mainTitle}>Today's Featured Offers</h1>
        <p className={styles.mainSubtitle}>
          Premium medical and wellness products at exceptional prices
        </p>
      </div>

      <div className={styles.cardsContainer}>
        {deals.map((deal) => (
          <article key={deal.id} className={styles.card}>
            <div className={styles.badge}>Limited Time</div>

            <div className={styles.imageWrapper}>
              <img
                src={deal.img}
                alt={deal.name}
                className={styles.productImage}
                loading="lazy"
              />
            </div>

            <div className={styles.productContent}>
              <div className={styles.ratingContainer}>
                <div className={styles.stars}>{renderStars(4)}</div>
                <span className={styles.reviewCount}>(4.0)</span>
              </div>

              <h3 className={styles.productName}>{deal.name}</h3>

              <div className={styles.priceContainer}>
                <span className={styles.price}>{deal.priceFormattedKSH}</span>
                <span className={styles.priceLabel}>Special Price</span>
              </div>

              <div className={styles.buttonGroup}>
                <Link
                  href={`/today/${deal.slug}`}
                  className={styles.viewButton}
                  aria-label={`View details for ${deal.name}`}
                >
                  View Details
                </Link>

                <button
                  type="button"
                  className={styles.addToCartButton}
                  onClick={(e) => handleAddToCart(e, deal)}
                  aria-label={`Add ${deal.name} to cart`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <aside className={styles.cashbackBanner}>
        <div className={styles.cashbackIcon}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
          </svg>
        </div>
        <div className={styles.cashbackContent}>
          <h4 className={styles.cashbackTitle}>Earn 5% Cashback</h4>
          <p className={styles.cashbackDescription}>
            Get instant cashback on all purchases at <strong>Bumedi.com</strong>. No credit check required.
          </p>
        </div>
        <button className={styles.discoverButton} type="button">
          Learn More
        </button>
      </aside>
    </section>
  );
};

export default TodayDeals;