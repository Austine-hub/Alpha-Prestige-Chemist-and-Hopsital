//src/app/products2/[id]/page.tsx

// src/app/products2/[id]/page.tsx
"use client";

import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  Share2,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  getProductById,
  getRelatedProducts,
  formatPrice,
  parseId,
  type Product,
} from "@/data/details/products";

import styles from "./DetailsPage.module.css";

/* -------------------------------------------------------------------------- */
/* Star Rating Component                                                       */
/* -------------------------------------------------------------------------- */

type StarRatingProps = {
  rating?: number;
  count?: number;
};

const StarRating = ({ rating = 4.8, count = 128 }: StarRatingProps) => {
  const filledStars = Math.round(rating);

  return (
    <div
      className={styles.ratingRow}
      aria-label={`Rating: ${rating} out of 5 stars`}
    >
      <div className={styles.stars}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={styles.star}
            fill={i < filledStars ? "var(--accent-gold)" : "none"}
            aria-hidden
          />
        ))}
      </div>
      <span className={styles.reviewCount}>
        {rating} ({count} reviews)
      </span>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* Main Page                                                                   */
/* -------------------------------------------------------------------------- */

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams<{ id?: string }>();

  const productId = useMemo(
    () => parseId(params?.id ?? null),
    [params?.id]
  );

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState<number>(1);

  /* ---------------------------------------------------------------------- */
  /* Load Product                                                           */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    if (productId === null) return;

    const found = getProductById(productId);
    if (found) {
      setProduct(found);
    }
  }, [productId]);

  /* ---------------------------------------------------------------------- */
  /* Derived Values                                                         */
  /* ---------------------------------------------------------------------- */

  const productIdStr = useMemo(
    () => (product ? String(product.id) : null),
    [product]
  );

  const relatedProducts = useMemo(
    () => (product ? getRelatedProducts(product) : []),
    [product]
  );

  const inWishlist = useMemo(
    () => (productIdStr ? isInWishlist(productIdStr) : false),
    [productIdStr, isInWishlist]
  );

  const isOutOfStock = product?.inStock === false;

  /* ---------------------------------------------------------------------- */
  /* Handlers                                                               */
  /* ---------------------------------------------------------------------- */

  const handleQtyChange = useCallback((value: number) => {
    setQty(Math.max(1, value));
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!product || isOutOfStock) return;

    addToCart({
      ...product,
      id: String(product.id),
      quantity: qty,
    });

    toast.success(`Added ${qty} × ${product.name} to cart`, {
      icon: "🛍️",
    });
  }, [product, qty, isOutOfStock, addToCart]);

  const toggleWishlist = useCallback(() => {
    if (!product || !productIdStr) return;

    if (inWishlist) {
      removeFromWishlist(productIdStr);
      toast("Removed from wishlist");
    } else {
      addToWishlist({
        id: productIdStr,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
      toast.success("Saved to wishlist ❤️");
    }
  }, [
    product,
    productIdStr,
    inWishlist,
    addToWishlist,
    removeFromWishlist,
  ]);

  /* ---------------------------------------------------------------------- */
  /* Loading State                                                          */
  /* ---------------------------------------------------------------------- */

  if (!product) {
    return (
      <div className={styles.loaderContainer} role="status" aria-live="polite">
        <motion.div
          className={styles.spinner}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
      </div>
    );
  }

  /* ---------------------------------------------------------------------- */
  /* Render                                                                 */
  /* ---------------------------------------------------------------------- */

  return (
    <main className={styles.container}>
      {/* Navigation */}
      <nav className={styles.navBar} aria-label="Product navigation">
        <button
          type="button"
          onClick={() => router.back()}
          className={styles.backBtn}
        >
          <ArrowLeft size={20} aria-hidden />
          <span>Back</span>
        </button>

        <button
          type="button"
          className={styles.shareBtn}
          onClick={() => toast.success("Link copied!")}
          aria-label="Share product"
        >
          <Share2 size={18} aria-hidden />
        </button>
      </nav>

      {/* Main Grid */}
      <section className={styles.mainGrid}>
        {/* Image */}
        <motion.div
          className={styles.visualCol}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={styles.mainImage}
            />
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          className={styles.infoCol}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <header className={styles.infoHead}>
            <span className={styles.categoryBadge}>
              {product.category}
            </span>
            <h1 className={styles.productTitle}>{product.name}</h1>
            <StarRating
              rating={product.rating}
              count={product.reviewCount}
            />
          </header>

          <div className={styles.pricingBlock}>
            <span className={styles.mainPrice}>
              {formatPrice(product.price)}
            </span>
            {isOutOfStock && (
              <span className={styles.stockBadge}>Out of Stock</span>
            )}
          </div>

          <p className={styles.description}>{product.description}</p>

          {/* Quantity + Actions */}
          <div className={styles.selectionArea}>
            <div className={styles.qtyPicker}>
              <label htmlFor="quantity">Quantity</label>
              <div className={styles.stepper}>
                <button
                  type="button"
                  onClick={() => handleQtyChange(qty - 1)}
                  disabled={qty <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>

                <span id="quantity">{qty}</span>

                <button
                  type="button"
                  onClick={() => handleQtyChange(qty + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className={styles.ctaGroup}>
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={styles.addToCartBtn}
              >
                <ShoppingCart size={20} aria-hidden />
                <span>
                  {isOutOfStock ? "Sold Out" : "Add to Cart"}
                </span>
              </button>

              <button
                type="button"
                onClick={toggleWishlist}
                className={`${styles.wishlistBtn} ${
                  inWishlist ? styles.active : ""
                }`}
                aria-pressed={inWishlist}
                aria-label="Toggle wishlist"
              >
                <Heart
                  size={22}
                  fill={inWishlist ? "var(--accent-red)" : "none"}
                />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className={styles.specs}>
            <h3>Key Features</h3>
            <ul>
              {product.features?.length
                ? product.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))
                : (
                  <li>
                    Premium quality material and craftsmanship.
                  </li>
                )}
            </ul>
          </div>
        </motion.div>
      </section>

      {/* Related Products */}
      <section className={styles.relatedSection}>
        <div className={styles.sectionHeader}>
          <h2>Complete the Look</h2>
          <p>Pairs perfectly with your selection</p>
        </div>

        <div className={styles.relatedGrid}>
          <AnimatePresence>
            {relatedProducts.slice(0, 4).map((item) => (
              <motion.div
                key={String(item.id)}
                whileHover={{ y: -5 }}
                className={styles.miniCard}
                onClick={() =>
                  router.push(`/products2/${item.id}`)
                }
                role="button"
                tabIndex={0}
              >
                <div className={styles.miniMedia}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="150px"
                  />
                </div>
                <div className={styles.miniInfo}>
                  <h4>{item.name}</h4>
                  <span>{formatPrice(item.price)}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
