// ===============================================================
// 💊 /conditions/diabetes/page.tsx — Diabetes Drug Offers
// Next.js 16 / Modernized & Optimized
// ===============================================================

"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import styles from "../Offers.module.css";
import { getAllOffers, type Offer } from "@/data/diabetesData";
import { useCart } from "@/context/CartContext";

// ===============================================================
// 🧩 Diabetes Component
// ===============================================================
const Diabetes: React.FC = memo(() => {
  const { addToCart } = useCart();
  const offers = getAllOffers(); // dynamic fetch

  const handleAddToCart = (offer: Offer) => {
    addToCart({
      id: offer.id,
      name: offer.name,
      price: offer.price,
      image: offer.image,
      quantity: 1,
    });
    toast.success(`${offer.name} added to cart 🛒`, { duration: 2000 });
  };

  return (
    <section className={styles.offersSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>Top Diabetes Drug Offers</h2>
        <Link href="/diabetes-products" className={styles.viewAll}>
          View all offers →
        </Link>
      </div>

      <div className={styles.offersGrid}>
        {offers.map((offer) => (
          <div key={offer.id} className={styles.card} style={{ cursor: "pointer" }}>
            {/* Discount Badge */}
            <div className={styles.discountTag}>-{offer.discount}%</div>

            {/* Product Image */}
            <div className={styles.imageWrapper}>
              <Image
                src={offer.image}
                alt={offer.name}
                width={200}
                height={200}
                className={styles.productImage}
                loading="lazy"
              />
            </div>

            {/* Product Info */}
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
                onClick={(e) => {
                  e.stopPropagation(); // prevent card click
                  handleAddToCart(offer);
                }}
              >
                <ShoppingCart size={18} strokeWidth={1.8} />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

// ===============================================================
// ✅ Page Export
// ===============================================================
export default function Page() {
  return <Diabetes />;
}
