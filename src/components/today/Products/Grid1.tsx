//src/components/today/Products/Grid.tsx

'use client';

import React, { memo, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import styles from './Grid.module.css';
import {
  getAllDealsInKSH,
  type DealViewModel,
} from '@/data/details/todayProducts';
import { useCart } from '@/context/CartContext';

// ============================================================================
// CONTROLLER
// ============================================================================

const ProductGrid: React.FC = () => {
  const router = useRouter();
  const { addItem } = useCart();

  // MODEL → VIEW
  const products = getAllDealsInKSH();

  const handleViewProduct = useCallback(
    (slug: string) => {
      router.push(`/today/products/${slug}`);
    },
    [router]
  );

  const handleAddToCart = useCallback(
    (product: DealViewModel) => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.priceKSH,
        quantity: 1,
        image: product.img,
        originalPrice: product.mrpKSH,
        discount: product.discount,
        inStock: true,
      });

      toast.success(`${product.name} added to cart`);
    },
    [addItem]
  );

  // ========================================================================
  // VIEW
  // ========================================================================

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.mainTitle}>Health & Wellness Essentials</h1>
        <p className={styles.subtitle}>
          Discover premium supplements and care products for your well-being
        </p>
      </header>

      <div className={styles.grid}>
        {/* LEFT COLUMN */}
        <div className={styles.column}>
          {products.slice(0, 3).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onView={handleViewProduct}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {/* CENTER PROMOS */}
        <div className={styles.column}>
          <PromoCard
            title="Magical Moments Start Here"
            subtitle="Find Joy with Our Exciting Selection of Kids Toys and Clothing"
            image="/products/pic5.jpg"
          />
          <PromoCard
            title="Fun Finds for Every Growing Mind"
            subtitle="Your Go-To Destination for Toys and Apparel That Inspire"
            image="/products/pic6.jpg"
            variant="gray"
          />
        </div>

        {/* RIGHT COLUMN */}
        <div className={styles.column}>
          {products.slice(3, 6).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onView={handleViewProduct}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// PRODUCT CARD (VIEW)
// ============================================================================

interface ProductCardProps {
  readonly product: DealViewModel;
  readonly onView: (slug: string) => void;
  readonly onAddToCart: (product: DealViewModel) => void;
}

const ProductCard: React.FC<ProductCardProps> = memo(
  ({ product, onView, onAddToCart }) => {
    return (
      <article className={styles.productCard}>
        {product.discount > 0 && (
          <span className={styles.discountBadge}>
            -{product.discount}%
          </span>
        )}

        <div
          className={styles.imageWrapper}
          onClick={() => onView(product.slug)}
        >
          <Image
            src={product.img}
            alt={product.name}
            width={150}
            height={150}
            className={styles.productImage}
            priority={false}
          />
        </div>

        <h3
          className={styles.productName}
          onClick={() => onView(product.slug)}
        >
          {product.name}
        </h3>

        <div className={styles.priceWrapper}>
          <span className={styles.price}>
            {product.priceFormattedKSH}
          </span>
          {product.mrpKSH > product.priceKSH && (
            <span className={styles.originalPrice}>
              {product.mrpFormattedKSH}
            </span>
          )}
        </div>

        <div className={styles.buttonGroup}>
          <button
            className={styles.viewBtn}
            onClick={() => onView(product.slug)}
            aria-label="View product"
          >
            View
          </button>

          <button
            className={styles.addToCartBtn}
            onClick={() => onAddToCart(product)}
            aria-label="Add to cart"
          >
            Add to Cart
          </button>
        </div>
      </article>
    );
  }
);

ProductCard.displayName = 'ProductCard';

// ============================================================================
// PROMO CARD
// ============================================================================

interface PromoCardProps {
  readonly title: string;
  readonly subtitle: string;
  readonly image: string;
  readonly variant?: 'mint' | 'gray';
}

const PromoCard: React.FC<PromoCardProps> = ({
  title,
  subtitle,
  image,
  variant = 'mint',
}) => (
  <div className={`${styles.promoCard} ${styles[`promo${variant}`]}`}>
    <span className={styles.promoBadge}>Exclusive Discount</span>
    <h2 className={styles.promoTitle}>{title}</h2>
    <p className={styles.promoSubtitle}>{subtitle}</p>
    <div className={styles.promoImageWrapper}>
      <Image src={image} alt={title} width={200} height={240} />
    </div>
  </div>
);

export default ProductGrid;
