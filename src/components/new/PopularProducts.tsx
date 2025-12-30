//src/components/products/PopularProducts.tsx

"use client";

import { memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

import styles from "./PopularProducts.module.css";
import { getAllDealsInKSH } from "@/data/details/popular";
import { useCart } from "@/context/CartContext";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface Deal {
  id: string;
  slug: string;
  name: string;
  priceKSH: number;
  mrpKSH: number;
  img: string;
  discount: number;
}

interface CardProps extends Deal {
  onView: (slug: string) => void;
  onAddToCart: (deal: Deal) => void;
}

/* -------------------------------------------------------------------------- */
/* Product Card                                                               */
/* -------------------------------------------------------------------------- */

const ProductCard = memo<CardProps>(
  ({ slug, name, priceKSH, mrpKSH, img, discount, onView, onAddToCart }) => {
    const stop = (e: React.MouseEvent) => e.stopPropagation();

    return (
      <article
        className={styles.card}
        role="button"
        tabIndex={0}
        onClick={() => onView(slug)}
        onKeyDown={(e) => e.key === "Enter" && onView(slug)}
      >
        {discount > 0 && (
          <span className={styles.badge}>{discount}% OFF</span>
        )}

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

        <div className={styles.imageWrapper}>
          <Image
            src={img}
            alt={name}
            width={240}
            height={240}
            loading="lazy"
            className={styles.image}
          />
        </div>

        <div className={styles.info}>
          <h3 className={styles.title}>{name}</h3>

          <div className={styles.priceRow}>
            <span className={styles.current}>KES {priceKSH}</span>
            {mrpKSH > priceKSH && (
              <span className={styles.old}>KES {mrpKSH}</span>
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
                onAddToCart({ slug, name, priceKSH, mrpKSH, img, discount } as Deal);
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
/* Popular Products Section                                                   */
/* -------------------------------------------------------------------------- */

const PopularProducts = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  const deals = getAllDealsInKSH();

  const handleView = useCallback(
    (slug: string) => router.push(`/popular/${slug}`),
    [router]
  );

  const handleAddToCart = useCallback(
    (deal: Deal) => {
      addToCart({
        id: deal.id,
        name: deal.name,
        price: deal.priceKSH,
        quantity: 1,
        image: deal.img,
        originalPrice: deal.mrpKSH > deal.priceKSH ? deal.mrpKSH : undefined,
        badge: deal.discount > 0 ? `${deal.discount}% OFF` : undefined,
      });

      toast.success(`${deal.name} added to cart`, {
        duration: 2500,
        icon: "🛒",
      });
    },
    [addToCart]
  );

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h2>New Arrivals at OBAT</h2>
        <button
          className={styles.viewAll}
          onClick={() => router.push("/more/new")}
        >
          View All
        </button>
      </header>

      <div className={styles.grid}>
        {deals.map((deal) => (
          <ProductCard
            key={deal.id}
            {...deal}
            onView={handleView}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default PopularProducts;