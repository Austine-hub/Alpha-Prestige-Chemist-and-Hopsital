// ===============================================================
// 💊 /conditions/diabetes/page.tsx — Diabetes Drug Offers
// Modern • Minimal • DRY • Error-Proof (Next.js 16 Ready)
// ===============================================================

"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

import styles from "../Offers.module.css";
import { getAllOffers, type Offer } from "@/data/diabetes1Data";
import { useCart } from "@/context/CartContext";

// ===============================================================
// 🔗 Utility — Generate details URL
// ===============================================================
const detailsURL = (slug: string) => `/dropups/diabetes/${slug}`;

// ===============================================================
// 🧩 Diabetes Component
// ===============================================================
const Diabetes: React.FC = memo(() => {
  const { addToCart } = useCart();

  // Defensive + memoized data
  const offers = useMemo<Offer[]>(() => {
    const data = getAllOffers();
    return Array.isArray(data) ? data : [];
  }, []);

  // Cart Handler
  const handleAddToCart = (offer: Offer, e: React.MouseEvent) => {
    e.stopPropagation(); // avoid parent onClick
    addToCart({ ...offer, quantity: 1 });
    toast.success(`${offer.name} added to cart 🛒`);
  };

  return (
    <section className={styles.offersSection}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Top Diabetes Drug Offers</h2>
        <Link href="/diabetes-products" className={styles.viewAll}>
          View all offers →
        </Link>
      </div>

      {/* Grid */}
      <div className={styles.offersGrid}>
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={styles.card}
            role="button"
            tabIndex={0}
            onClick={() => (window.location.href = detailsURL(offer.slug))}
            onKeyDown={(e) => e.key === "Enter" && (window.location.href = detailsURL(offer.slug))}
          >
            {/* Discount */}
            <div className={styles.discountTag}>-{offer.discount}%</div>

            {/* Image */}
            <div className={styles.imageWrapper}>
              <Image
                src={offer.image}
                alt={offer.name}
                width={200}
                height={200}
                loading="lazy"
                className={styles.productImage}
              />
            </div>

            {/* Info */}
            <div className={styles.info}>
              <p className={styles.name}>{offer.name}</p>

              <div className={styles.prices}>
                <span className={styles.newPrice}>
                  KSh {offer.price.toLocaleString()}
                </span>
                <span className={styles.oldPrice}>
                  KSh {offer.oldPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
              <button
                className={styles.addToCart}
                onClick={(e) => handleAddToCart(offer, e)}
                aria-label={`Add ${offer.name} to cart`}
              >
                <ShoppingCart size={18} strokeWidth={1.8} />
                <span>Add to Cart</span>
              </button>

              <Link
                href={detailsURL(offer.slug)}
                className={styles.detailsBtn}
                onClick={(e) => e.stopPropagation()}
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

// ===============================================================
// 🌟 Page Export
// ===============================================================
export default function Page() {
  return <Diabetes />;
}
