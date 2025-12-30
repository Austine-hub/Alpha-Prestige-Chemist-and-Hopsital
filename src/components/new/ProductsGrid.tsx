// src/components/new/ProductsGrids.tsx

"use client";

import { memo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Eye, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import { useCart } from "@/context/CartContext";
import { getAllDealsInKSH, type DealViewModel } from "@/data/details/ProductGrid";
import styles from "./ProductGrid.module.css";

/* -------------------------------------------------------------------------- */
/* Deal Card Component                                                        */
/* -------------------------------------------------------------------------- */

interface DealCardProps {
  deal: DealViewModel;
  onAddToCart: (deal: DealViewModel) => void;
}

const DealCard = memo(function DealCard({ deal, onAddToCart }: DealCardProps) {
  if (!deal || typeof deal.priceKSH !== "number") return null;

  const { isActive: inStock, discount, slug, img, name, mrpFormattedKSH, priceFormattedKSH, savingsKSH } = deal;
  const hasDiscount = discount > 0;

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (!inStock) {
        toast.error("Item currently unavailable");
        return;
      }
      
      onAddToCart(deal);
    },
    [onAddToCart, deal, inStock]
  );

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <motion.article
      className={`${styles.card} ${!inStock ? styles.cardDisabled : ""}`}
      whileHover={inStock ? { y: -6 } : {}}
      transition={{ duration: 0.3, ease: "easeOut" }}
      aria-label={name}
    >
      {hasDiscount && (
        <div className={styles.badge}>
          <span className={styles.badgeText}>{discount}% OFF</span>
        </div>
      )}

      <div className={styles.actions}>
        <button
          className={styles.actionBtn}
          onClick={stopPropagation}
          aria-label="Add to wishlist"
          title="Add to wishlist"
        >
          <Heart size={18} strokeWidth={2} />
        </button>

        <Link
          href={`/products/${slug}`}
          className={styles.actionBtn}
          aria-label="View details"
          title="View details"
          onClick={stopPropagation}
        >
          <Eye size={18} strokeWidth={2} />
        </Link>
      </div>

      <Link href={`/products/${slug}`} className={styles.imageWrapper} onClick={stopPropagation}>
        <div className={styles.imageContainer}>
          <Image
            src={img}
            alt={name}
            fill
            className={styles.image}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={false}
          />
        </div>
      </Link>

      <div className={styles.content}>
        <Link href={`/products/${slug}`} className={styles.nameLink} onClick={stopPropagation}>
          <h3 className={styles.name}>{name}</h3>
        </Link>

        <div className={styles.pricing}>
          {hasDiscount && <span className={styles.mrp}>{mrpFormattedKSH}</span>}
          <span className={styles.price}>{priceFormattedKSH}</span>
        </div>

        {hasDiscount && (
          <div className={styles.savings}>
            Save {new Intl.NumberFormat("en-KE", {
              style: "currency",
              currency: "KES",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }).format(savingsKSH)}
          </div>
        )}

        <div className={styles.buttonGroup}>
          <Link href={`/products/${slug}`} className={styles.viewBtn} onClick={stopPropagation}>
            View Details
          </Link>

          <button
            className={styles.cartBtn}
            onClick={handleAddToCart}
            disabled={!inStock}
            aria-label={inStock ? "Add to cart" : "Out of stock"}
          >
            <ShoppingCart size={16} strokeWidth={2} />
            <span>{inStock ? "Add to Cart" : "Out of Stock"}</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
});

/* -------------------------------------------------------------------------- */
/* Main Grid Component                                                        */
/* -------------------------------------------------------------------------- */

export default function DealsGrid() {
  const { addToCart } = useCart();
  const deals = getAllDealsInKSH();

  const handleAddToCart = useCallback(
    (deal: DealViewModel) => {
      addToCart({
        id: deal.id,
        name: deal.name,
        price: deal.priceKSH,
        quantity: 1,
        image: deal.img,
        category: deal.category,
        stock: 10,
        inStock: deal.isActive,
      });

      toast.success(
        <div className={styles.toastContent}>
          <strong>{deal.name}</strong>
          <span>Added to cart successfully</span>
        </div>,
        {
          icon: "✓",
          duration: 3000,
          position: "top-right",
        }
      );
    },
    [addToCart]
  );

  if (!deals?.length) {
    return (
      <section className={styles.section}>
        <p className={styles.emptyState}>No deals available at the moment.</p>
      </section>
    );
  }

  return (
    <section className={styles.section} aria-labelledby="deals-heading">
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h2 id="deals-heading" className={styles.title}>
            Featured Healthcare Deals
          </h2>
          <p className={styles.subtitle}>Quality products at exceptional prices</p>
        </div>

        <Link href="/more/popular" className={styles.viewAll}>
          <span>View All Deals</span>
          <ArrowRight size={20} strokeWidth={2} />
        </Link>
      </header>

      <div className={styles.grid}>
        {deals.map((deal) => (
          <DealCard key={deal.id} deal={deal} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </section>
  );
}