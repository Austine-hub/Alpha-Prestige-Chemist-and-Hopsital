//src/components/products/Offers.tsx

"use client";

import React, { memo, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

import styles from "./Offers.module.css";
import { getAllDealsInKSH } from "@/data/details/popular";
import type { DealViewModel } from "@/data/details/popular";
import { useCart } from "@/context/CartContext";

/* -------------------------------------------------------------------------- */
/* UI-SAFE VIEW TYPES                                                          */
/* -------------------------------------------------------------------------- */

interface UIProduct {
  id: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  badge?: string;
}

/* -------------------------------------------------------------------------- */
/* PRODUCT CARD                                                                */
/* -------------------------------------------------------------------------- */

interface ProductCardProps extends UIProduct {
  onView: (slug: string) => void;
  onAddToCart: (product: UIProduct) => void;
}

const ProductCard: React.FC<ProductCardProps> = memo(
  ({ id, slug, name, price, oldPrice, image, badge, onView, onAddToCart }) => {
    const stop = (e: React.MouseEvent) => e.stopPropagation();

    return (
      <article
        className={styles.card}
        role="button"
        tabIndex={0}
        onClick={() => onView(slug)}
        onKeyDown={(e) => e.key === "Enter" && onView(slug)}
      >
        {badge && <span className={styles.badge}>{badge}</span>}

        {/* Floating actions */}
        <div className={styles.actions}>
          <button
            aria-label="Add to wishlist"
            className={styles.iconBtn}
            onClick={stop}
          >
            <Heart size={16} />
          </button>

          <button
            aria-label="View product details"
            className={styles.iconBtn}
            onClick={(e) => {
              stop(e);
              onView(slug);
            }}
          >
            <Eye size={16} />
          </button>
        </div>

        {/* Image */}
        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={name}
            width={240}
            height={240}
            loading="lazy"
            className={styles.image}
          />
        </div>

        {/* Info */}
        <div className={styles.info}>
          <h3 className={styles.title}>{name}</h3>

          <div className={styles.priceRow}>
            <span className={styles.current}>
              KES {price.toLocaleString()}
            </span>

            {typeof oldPrice === "number" && oldPrice > price && (
              <span className={styles.old}>
                KES {oldPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className={styles.ctaRow}>
            <button
              className={styles.viewBtn}
              onClick={(e) => {
                stop(e);
                onView(slug);
              }}
            >
              View
            </button>

            <button
              className={styles.addBtn}
              onClick={(e) => {
                stop(e);
                onAddToCart({ id, slug, name, price, oldPrice, image, badge });
              }}
            >
              <ShoppingCart size={16} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </article>
    );
  }
);

ProductCard.displayName = "ProductCard";

/* -------------------------------------------------------------------------- */
/* OFFERS SECTION                                                              */
/* -------------------------------------------------------------------------- */

const Offers: React.FC = () => {
  const router = useRouter();
  const { addToCart } = useCart();

  /* ------------------------------------------------------------------------ */
  /* DATA NORMALIZATION (ROBUST AGAINST FUTURE CHANGES)                        */
  /* ------------------------------------------------------------------------ */

  const products = useMemo<UIProduct[]>(() => {
    const deals = getAllDealsInKSH();

    return deals.map((deal: DealViewModel) => ({
      id: deal.id,
      slug: deal.slug,
      name: deal.name,
      image: deal.img,
      price: deal.priceKSH,
      oldPrice: deal.mrpKSH > deal.priceKSH ? deal.mrpKSH : undefined,
      badge: deal.discount > 0 ? `${deal.discount}% OFF` : undefined,
    }));
  }, []);

  /* ------------------------------------------------------------------------ */
  /* HANDLERS                                                                  */
  /* ------------------------------------------------------------------------ */

  const handleView = useCallback(
    (slug: string) => {
      if (!slug) return;
      router.push(`/popular-products/${slug}`);
    },
    [router]
  );

  const handleAddToCart = useCallback(
    (product: UIProduct) => {
      try {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
          originalPrice: product.oldPrice,
          badge: product.badge,
        });

        toast.success(`${product.name} added to cart`, {
          duration: 2500,
          icon: "🛒",
        });
      } catch {
        toast.error("Unable to add item to cart");
      }
    },
    [addToCart]
  );

  /* ------------------------------------------------------------------------ */
  /* RENDER                                                                   */
  /* ------------------------------------------------------------------------ */

  if (!products.length) {
    return null; // silent fail-safe (no layout break)
  }

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>ALL Offers at OBAT</h2>

        <button
          className={styles.viewAll}
          onClick={() => router.push("/more/new")}
        >
          View All
        </button>
      </header>

      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onView={handleView}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default Offers;
