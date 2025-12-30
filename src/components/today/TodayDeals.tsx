"use client";

import React, { useMemo, useCallback } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { getAllDealsInKSH } from "@/data/details/today";
import styles from "./TodayDeals.module.css";
import toast from "react-hot-toast"; // ✅ toast added

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

      // ✅ Toast feedback (non-blocking UI)
      toast.success(`${deal.name} added to cart`, {
        duration: 2000,
        position: "top-center",
      });
    },
    [addItem]
  );

  if (!deals.length) return null;

  return (
    <section className={styles.dealsSection}>
      <div className={styles.cardsContainer}>
        {deals.map((deal) => (
          <article key={deal.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Today's Last Opportunity</h2>
              <p className={styles.cardSubtitle}>
                Limited-time medical and wellness deals curated just for you.
              </p>
            </div>

            <div className={styles.productInfo}>
              <div className={styles.imageWrapper}>
                <img
                  src={deal.img}
                  alt={deal.name}
                  className={styles.productImage}
                  loading="lazy"
                />
              </div>

              <div className={styles.productDetails}>
                <div className={styles.ratingContainer}>
                  <div className={styles.stars}>{renderStars(4)}</div>
                  <span className={styles.reviewCount}>Verified Reviews</span>
                </div>

                <h3 className={styles.productName}>{deal.name}</h3>
                <p className={styles.price}>{deal.priceFormattedKSH}</p>

                <div className={styles.buttonGroup}>
                  <Link
                    href={`/today/${deal.slug}`}
                    className={styles.viewButton}
                    aria-label={`View details for ${deal.name}`}
                  >
                    View
                  </Link>

                  <button
                    type="button"
                    className={styles.addToCartButton}
                    onClick={(e) => handleAddToCart(e, deal)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <aside className={styles.cashbackBanner}>
        <div className={styles.cashbackContent}>
          <p className={styles.cashbackText}>
            <span className={styles.cashbackLabel}>RETURN CASH BACK</span>
            <span className={styles.cashbackDescription}>
              Earn 5% cash back on <strong>Bumedi.com</strong>. No credit risk,
              instant eligibility.
            </span>
          </p>

          <button className={styles.discoverButton} type="button">
            Discover More
          </button>
        </div>
      </aside>
    </section>
  );
};

export default TodayDeals;
