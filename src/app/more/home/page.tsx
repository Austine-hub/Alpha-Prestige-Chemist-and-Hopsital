//src/app/more/home/page.tsx

"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import styles from "./HomeCarousel.module.css";
import { useCart } from "@/context/CartContext";
import { getAllDealsInKSH, type DealViewModel } from "@/data/more/HomeData";

// ===============================================
// 🎯 MAIN COMPONENT
// ===============================================

export default function HomeCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const router = useRouter();
  const { addToCart, openCart } = useCart();

  const deals = getAllDealsInKSH();

  // ===============================================
  // 🎮 HANDLERS
  // ===============================================

  const handleAddToCart = useCallback(
    (deal: DealViewModel, e: React.MouseEvent) => {
      e.stopPropagation();

      addToCart({
        id: deal.id,
        name: deal.name,
        price: deal.priceKSH,
        image: deal.img,
        quantity: 1,
        category: deal.category,
        description: deal.description,
        originalPrice: deal.mrpKSH,
        discount: deal.discount,
      });

      toast.success(`${deal.name} added to cart!`, {
        duration: 2000,
        icon: "🛒",
      });
      openCart();
    },
    [addToCart, openCart]
  );

  const handleViewDetails = useCallback(
    (slug: string) => {
      router.push(`/more/home/details/${slug}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [router]
  );

  const handleCardClick = useCallback(
    (slug: string) => {
      handleViewDetails(slug);
    },
    [handleViewDetails]
  );

  const scroll = useCallback((direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = 320;
    const newScrollLeft =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
  }, []);

  const checkScrollPosition = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  // ===============================================
  // 🔄 EFFECTS
  // ===============================================

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    checkScrollPosition();
    container.addEventListener("scroll", checkScrollPosition);
    window.addEventListener("resize", checkScrollPosition);

    return () => {
      container.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [checkScrollPosition]);

  // ===============================================
  // 🎨 RENDER
  // ===============================================

  return (
    <section className={styles.carouselSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Deals of the Day</h2>
          <div className={styles.navigation}>
            <button
              className={`${styles.navButton} ${!canScrollLeft ? styles.disabled : ""}`}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              ‹
            </button>
            <button
              className={`${styles.navButton} ${!canScrollRight ? styles.disabled : ""}`}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              ›
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className={styles.carouselWrapper}>
          <div className={styles.carousel} ref={scrollRef}>
            {deals.map((deal) => (
              <motion.article
                key={deal.id}
                className={styles.productCard}
                onClick={() => handleCardClick(deal.slug)}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleCardClick(deal.slug);
                }}
              >
                {/* Badge */}
                <div className={styles.cardHeader}>
                  {deal.discount > 0 && (
                    <span className={styles.trendingBadge}>
                      🔥 {deal.discount}% OFF
                    </span>
                  )}
                </div>

                {/* Image */}
                <div className={styles.imageWrapper}>
                  <img
                    src={deal.img}
                    alt={deal.name}
                    loading="lazy"
                    className={styles.productImage}
                  />
                </div>

                {/* Info */}
                <div className={styles.cardBody}>
                  <span className={styles.productCategory}>{deal.category}</span>
                  <h3 className={styles.productName}>{deal.name}</h3>
                  <p className={styles.productDescription}>
                    {deal.description}
                  </p>
                  <div className={styles.priceWrapper}>
                    <p className={styles.productPrice}>{deal.priceFormattedKSH}</p>
                    {deal.mrpKSH > deal.priceKSH && (
                      <p className={styles.originalPrice}>
                        {deal.mrpFormattedKSH}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className={styles.cardFooter}>
                  <button
                    className={styles.addButton}
                    onClick={(e) => handleAddToCart(deal, e)}
                    aria-label={`Add ${deal.name} to cart`}
                  >
                    🛒 Add to Cart
                  </button>
                  <button
                    className={styles.detailsButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDetails(deal.slug);
                    }}
                  >
                    View Details →
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* View All */}
        <div className={styles.viewAll}>
          <a
            href="#"
            className={styles.viewAllLink}
            onClick={(e) => {
              e.preventDefault();
              toast("Full catalog coming soon!", { icon: "📦" });
            }}
          >
            View All Deals →
          </a>
        </div>
      </div>
    </section>
  );
}