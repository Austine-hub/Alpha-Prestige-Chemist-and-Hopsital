//src/components/DealsOfTheDay/DealsOfTheDay.tsx

"use client";

import React, { useEffect, useState, memo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { ShoppingCart, Eye } from "lucide-react";

import styles from "./DealsOfTheDay.module.css";
import { deals, getAllDealsInKSH } from "@/data/details/deals";
import { useCart } from "@/context/CartContext";

const COUNTDOWN_SECONDS = 15 * 60;

const DealsOfTheDay = memo(function DealsOfTheDay() {
  const { addToCart } = useCart();
  const [timeLeft, setTimeLeft] = useState(COUNTDOWN_SECONDS);
  const [dealsInKSH] = useState(() => getAllDealsInKSH());

  /* Countdown Timer */
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((t) => Math.max(t - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");

  /* Add To Cart Handler */
  const handleAddToCart = useCallback(
    (deal: (typeof dealsInKSH)[number], e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      addToCart({
        id: deal.id,
        name: deal.name,
        price: deal.priceKSH, // Fixed: Use priceKSH instead of price
        quantity: 1,
        image: deal.img,
        originalPrice: deal.mrpKSH, // Fixed: Use mrpKSH
        discount: deal.discount,
        category: "Deals",
      });
      toast.success(`${deal.name} added to cart`, {
        duration: 3000,
        icon: <ShoppingCart size={34} />,
        style: {
          background: "#fff",
          color: "#08a329ff",
          fontWeight: "500",
        },
      });

    },
    [addToCart]
  );

  return (
    <section className={styles.deals} aria-labelledby="deals-heading">
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h2 id="deals-heading" className={styles.title}>
            Deals of the Day
          </h2>
          <p className={styles.subtitle}>Limited time offers - grab them fast!</p>
        </div>

        <div className={styles.timer} aria-live="polite" role="timer">
          <svg className={styles.timerIcon} viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className={styles.timerText}>
            <span className={styles.timerDigits}>{mins}:{secs}</span>
            <span className={styles.timerLabel}>Left</span>
          </span>
        </div>

        <Link href="/shop" className={styles.viewAll} aria-label="View all deals">
          View All Deals
          <svg className={styles.arrowIcon} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </Link>
      </header>

      {/* Deals Carousel */}
      <div className={styles.carousel}>
        <div className={styles.track}>
          {dealsInKSH.map((deal) => (
            <article key={deal.id} className={styles.card}>
              <motion.div
                className={styles.cardInner}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Discount Badge */}
                {deal.discount > 0 && (
                  <div className={styles.badge}>
                    <span>-{deal.discount}%</span>
                  </div>
                )}

                {/* Product Image - Fixed: Use slug for routing */}
                <Link
                  href={`/deals/${deal.slug}`}
                  className={styles.imageLink}
                  aria-label={`View ${deal.name} details`}
                >
                  <div className={styles.imageWrapper}>
                    <Image
                      src={deal.img}
                      alt={deal.name}
                      width={200}
                      height={200}
                      className={styles.image}
                      priority
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className={styles.content}>
                  <Link href={`/deals/${deal.slug}`} className={styles.nameLink}>
                    <h3 className={styles.name}>{deal.name}</h3>
                  </Link>

                  <div className={styles.pricing}>
                    <div className={styles.priceGroup}>
                      <span className={styles.price}>{deal.priceFormattedKSH}</span>
                      {deal.mrpKSH > deal.priceKSH && (
                        <span className={styles.originalPrice}>{deal.mrpFormattedKSH}</span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className={styles.actions}>
                    <motion.button
                      type="button"
                      className={styles.cartBtn}
                      onClick={(e) => handleAddToCart(deal, e)}
                      aria-label={`Add ${deal.name} to cart`}
                      whileTap={{ scale: 0.95 }}
                    >
                     <span>Add to</span>
                     <ShoppingCart className={styles.btnIcon} size={18} />
                      
                    </motion.button>

                    {/* Fixed: Use slug for routing */}
                    <Link
                      href={`/deals/${deal.slug}`}
                      className={styles.viewBtn}
                      aria-label={`View ${deal.name} details`}
                    >
                      <span>view</span> <br />
                      <Eye className={styles.btnIcon} size={20} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </article>
          ))}
        </div>

        {/* Scroll Indicators */}
        <div className={styles.scrollIndicator} aria-hidden="true">
          <span>Scroll for more →</span>
        </div>
      </div>
    </section>
  );
});

export default DealsOfTheDay;