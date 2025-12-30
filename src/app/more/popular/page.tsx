//src/app/more/new/page.tsx

"use client";

import React, { memo, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Heart, Eye, ShoppingCart, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

import styles from "./Popular.module.css";
import { products } from "@/data/more/popularData";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

/* -------------------------------------------------------------------------- */
/* Types & Interfaces (Model)                                                */
/* -------------------------------------------------------------------------- */

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
  slug?: string;
}

interface ProductCardProps extends Product {
  onView: (slug: string) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

/* -------------------------------------------------------------------------- */
/* ViewModel Layer                                                            */
/* -------------------------------------------------------------------------- */

class ProductViewModel {
  static formatPrice(price: number): string {
    return `KES ${price.toLocaleString("en-KE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  static calculateDiscount(price: number, oldPrice?: number): number {
    if (!oldPrice || oldPrice <= price) return 0;
    return Math.round(((oldPrice - price) / oldPrice) * 100);
  }

  static generateSlug(product: Product): string {
    return (
      product.slug ||
      `${product.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")}-${product.id}`
    );
  }

  static transformToCartItem(product: Product, quantity: number = 1) {
    return {
      id: String(product.id),
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
      originalPrice: product.oldPrice,
      badge: product.badge,
      category: "New Arrivals",
    };
  }

  static transformToWishlistItem(product: Product) {
    return {
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      category: "New Arrivals",
    };
  }
}

/* -------------------------------------------------------------------------- */
/* Product Card Component (View)                                             */
/* -------------------------------------------------------------------------- */

const ProductCard: React.FC<ProductCardProps> = memo(
  ({
    id,
    name,
    price,
    oldPrice,
    image,
    badge,
    onView,
    onAddToCart,
    onToggleWishlist,
    isWishlisted,
  }) => {
    const product = { id, name, price, oldPrice, image, badge };
    const slug = ProductViewModel.generateSlug(product);
    const discount = ProductViewModel.calculateDiscount(price, oldPrice);

    const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

    const handleCardClick = () => onView(slug);

    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onView(slug);
      }
    };

    return (
      <article
        className={styles.card}
        role="button"
        tabIndex={0}
        onClick={handleCardClick}
        onKeyDown={handleKeyPress}
        aria-label={`View details for ${name}`}
      >
        {/* Badge or Discount */}
        {badge ? (
          <span className={styles.badge}>{badge}</span>
        ) : discount > 0 ? (
          <span className={styles.discountBadge}>-{discount}%</span>
        ) : null}

        {/* Floating Actions */}
        <div className={styles.actions}>
          <button
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            className={`${styles.iconBtn} ${
              isWishlisted ? styles.wishlisted : ""
            }`}
            onClick={(e) => {
              stopPropagation(e);
              onToggleWishlist(product);
            }}
          >
            <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
          </button>

          <button
            aria-label="Quick view"
            className={styles.iconBtn}
            onClick={(e) => {
              stopPropagation(e);
              onView(slug);
            }}
          >
            <Eye size={16} />
          </button>
        </div>

        {/* Product Image */}
        <div className={styles.imageWrapper}>
          <Image
            src={image}
            alt={name}
            width={280}
            height={280}
            loading="lazy"
            className={styles.image}
          />
        </div>

        {/* Product Information */}
        <div className={styles.info}>
          <h3 className={styles.title}>{name}</h3>

          <div className={styles.priceRow}>
            <span className={styles.current}>
              {ProductViewModel.formatPrice(price)}
            </span>
            {oldPrice && oldPrice > price && (
              <span className={styles.old}>
                {ProductViewModel.formatPrice(oldPrice)}
              </span>
            )}
          </div>

          {/* Call to Action Buttons */}
          <div className={styles.ctaRow}>
            <button
              className={styles.viewBtn}
              onClick={(e) => {
                stopPropagation(e);
                onView(slug);
              }}
              aria-label={`View ${name} details`}
            >
              View Details
            </button>

            <button
              className={styles.addBtn}
              onClick={(e) => {
                stopPropagation(e);
                onAddToCart(product);
              }}
              aria-label={`Add ${name} to cart`}
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
/* New Arrivals Page Component (Controller)                                  */
/* -------------------------------------------------------------------------- */

const NewArrivalsPage: React.FC = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Memoize transformed products data
  const productsData = useMemo(() => products, []);

  // Navigation Handler
  const handleViewProduct = useCallback(
    (slug: string) => {
      router.push(`/more/popular/popularDetails/${slug}`);
    },
    [router]
  );

  // Cart Handler
  const handleAddToCart = useCallback(
    (product: Product) => {
      const cartItem = ProductViewModel.transformToCartItem(product, 1);
      addToCart(cartItem);

      toast.success(`${product.name} added to cart`, {
        duration: 2500,
        icon: "🛒",
        position: "bottom-right",
        style: {
          background: "#0f766e",
          color: "#fff",
        },
      });
    },
    [addToCart]
  );

  // Wishlist Handler
  const handleToggleWishlist = useCallback(
    (product: Product) => {
      const productId = String(product.id);
      const isCurrentlyWishlisted = isInWishlist(productId);

      if (isCurrentlyWishlisted) {
        removeFromWishlist(productId);
        toast.success("Removed from wishlist", {
          duration: 2000,
          icon: "💔",
          position: "bottom-right",
        });
      } else {
        const wishlistItem = ProductViewModel.transformToWishlistItem(product);
        addToWishlist(wishlistItem);
        toast.success("Added to wishlist", {
          duration: 2000,
          icon: "❤️",
          position: "bottom-right",
        });
      }
    },
    [addToWishlist, removeFromWishlist, isInWishlist]
  );

  // Back Navigation
  const handleBackNavigation = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <main className={styles.container}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <button
            onClick={handleBackNavigation}
            className={styles.backBtn}
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          <div>
            <h1 className={styles.mainTitle}>New Arrivals</h1>
            <p className={styles.subtitle}>
              Discover our latest pharmaceutical and healthcare products
            </p>
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <section className={styles.gridSection}>
        {productsData.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No products available at the moment.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {productsData.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onView={handleViewProduct}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={isInWishlist(String(product.id))}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default NewArrivalsPage;