//src/app/shop/shopDetails/[slug]/page.tsx

"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useState, useMemo, useEffect } from "react";
import {
  ShoppingCart,
  Heart,
  Star,
  Check,
  Truck,
  Shield,
  ArrowLeft,
  Package,
  Minus,
  Plus,
} from "lucide-react";
import toast from "react-hot-toast";

import styles from "./shopDetails.module.css";
import {
  getProductBySlug,
  getSimilarProducts,
  formatPrice,
  calculateSavings,
  type Product,
} from "@/data/details/shop";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

/* =============================================================================
   🎯 Types & Constants
============================================================================= */

type TabKey = "description" | "specs" | "usage";

const TABS: ReadonlyArray<{ key: TabKey; label: string }> = [
  { key: "description", label: "Description" },
  { key: "specs", label: "Specifications" },
  { key: "usage", label: "Usage & Ingredients" },
] as const;

const QUANTITY_LIMITS = {
  MIN: 1,
  MAX: 999,
} as const;

/* =============================================================================
   🧩 View Model Hook - Business Logic Layer
============================================================================= */

interface UseProductDetailsViewModel {
  product: Product | null;
  relatedProducts: Product[];
  activeTab: TabKey;
  quantity: number;
  isWishlisted: boolean;
  hasDiscount: boolean;
  savings: number;
  
  handlers: {
    setActiveTab: (tab: TabKey) => void;
    incrementQuantity: () => void;
    decrementQuantity: () => void;
    setQuantity: (value: number) => void;
    addToCart: () => void;
    toggleWishlist: () => void;
    navigateBack: () => void;
  };
}

function useProductDetailsViewModel(slug: string): UseProductDetailsViewModel {
  const router = useRouter();
  const { addToCart: addToCartContext } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // State
  const [activeTab, setActiveTab] = useState<TabKey>("description");
  const [quantity, setQuantityState] = useState<number>(QUANTITY_LIMITS.MIN);

  // Derived data
  const product = useMemo(() => getProductBySlug(slug) ?? null, [slug]);
  
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return getSimilarProducts(product.id, 4);
  }, [product]);

  const isWishlisted = product ? isInWishlist(product.id) : false;
  
  const savings = useMemo(() => {
    if (!product) return 0;
    return calculateSavings(product.originalPrice, product.discountedPrice);
  }, [product]);

  const hasDiscount = useMemo(() => {
    if (!product) return false;
    return product.discount > 0 && savings > 0;
  }, [product, savings]);

  // Reset quantity when product changes
  useEffect(() => {
    setQuantityState(QUANTITY_LIMITS.MIN);
  }, [slug]);

  // Handlers
  const clampQuantity = useCallback((value: number): number => {
    if (!product) return QUANTITY_LIMITS.MIN;
    const max = Math.min(product.stock, QUANTITY_LIMITS.MAX);
    return Math.max(QUANTITY_LIMITS.MIN, Math.min(max, Math.floor(value)));
  }, [product]);

  const setQuantity = useCallback((value: number) => {
    const clamped = clampQuantity(value);
    setQuantityState(clamped);
  }, [clampQuantity]);

  const incrementQuantity = useCallback(() => {
    if (!product) return;
    setQuantityState(prev => clampQuantity(prev + 1));
  }, [product, clampQuantity]);

  const decrementQuantity = useCallback(() => {
    setQuantityState(prev => clampQuantity(prev - 1));
  }, [clampQuantity]);

  const addToCart = useCallback(() => {
    if (!product) return;

    if (product.stock <= 0) {
      toast.error(`${product.title} is out of stock`);
      return;
    }

    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} units available`);
      return;
    }

    addToCartContext({
      id: product.id,
      name: product.title,
      price: product.discountedPrice,
      quantity,
      image: product.image,
      originalPrice: product.originalPrice,
      discount: product.discount,
      category: product.category,
      stock: product.stock,
    });

    toast.success(`${quantity}x ${product.title} added to cart`, {
      duration: 3000,
      icon: <ShoppingCart size={20} />,
    });
  }, [addToCartContext, product, quantity]);

  const toggleWishlist = useCallback(() => {
    if (!product) return;

    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist({
        id: product.id,
        name: product.title,
        price: product.discountedPrice,
        image: product.image,
        category: product.category,
      });
      toast.success("Added to wishlist", {
        icon: <Heart size={18} fill="currentColor" />,
      });
    }
  }, [product, isWishlisted, addToWishlist, removeFromWishlist]);

  const navigateBack = useCallback(() => {
    router.back();
  }, [router]);

  return {
    product,
    relatedProducts,
    activeTab,
    quantity,
    isWishlisted,
    hasDiscount,
    savings,
    handlers: {
      setActiveTab,
      incrementQuantity,
      decrementQuantity,
      setQuantity,
      addToCart,
      toggleWishlist,
      navigateBack,
    },
  };
}

/* =============================================================================
   🎨 View Components - Presentation Layer
============================================================================= */

interface ProductNotFoundProps {
  onBack?: () => void;
}

function ProductNotFound({ onBack }: ProductNotFoundProps) {
  return (
    <motion.div
      className={styles.notFound}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Package size={64} strokeWidth={1.5} />
      <h2>Product Not Found</h2>
      <p>The product you're looking for doesn't exist or is no longer available.</p>
      <Link href="/shop" className={styles.backLink}>
        Browse All Products
      </Link>
    </motion.div>
  );
}

interface BackButtonProps {
  onClick: () => void;
}

function BackButton({ onClick }: BackButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={styles.backBtn}
      aria-label="Go back"
      whileHover={{ x: -4 }}
      whileTap={{ scale: 0.95 }}
    >
      <ArrowLeft size={20} />
      <span>Back</span>
    </motion.button>
  );
}

interface ProductImageSectionProps {
  product: Product;
  hasDiscount: boolean;
}

function ProductImageSection({ product, hasDiscount }: ProductImageSectionProps) {
  return (
    <div className={styles.imageSection}>
      <AnimatePresence>
        {hasDiscount && (
          <motion.div
            className={styles.imageBadge}
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            -{product.discount}%
          </motion.div>
        )}
      </AnimatePresence>
      <div className={styles.imageWrapper}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          className={styles.productImage}
        />
      </div>
    </div>
  );
}

interface ProductHeaderProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}

function ProductHeader({ product, isWishlisted, onToggleWishlist }: ProductHeaderProps) {
  return (
    <div className={styles.header}>
      <div>
        <p className={styles.categoryTag}>{product.category}</p>
        <h1 className={styles.title}>{product.title}</h1>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleWishlist}
        className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlisted : ""}`}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart size={22} fill={isWishlisted ? "currentColor" : "none"} />
      </motion.button>
    </div>
  );
}

function ProductRating() {
  return (
    <div className={styles.rating}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={16} fill="#fbbf24" stroke="#fbbf24" />
      ))}
      <span className={styles.ratingText}>4.8 (127 reviews)</span>
    </div>
  );
}

interface PriceSectionProps {
  product: Product;
  hasDiscount: boolean;
  savings: number;
  quantity: number;
}

function PriceSection({ product, hasDiscount, savings, quantity }: PriceSectionProps) {
  return (
    <div className={styles.priceSection}>
      <span className={styles.currentPrice}>
        {formatPrice(product.discountedPrice)}
      </span>
      {hasDiscount && (
        <>
          <span className={styles.originalPrice}>
            {formatPrice(product.originalPrice)}
          </span>
          <span className={styles.saveAmount}>
            Save {formatPrice(savings * quantity)}
          </span>
        </>
      )}
    </div>
  );
}

interface StockInfoProps {
  product: Product;
}

function StockInfo({ product }: StockInfoProps) {
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 10;

  return (
    <div className={styles.stockInfo}>
      <span
        className={`${styles.stockBadge} ${isOutOfStock ? styles.outOfStock : ""}`}
      >
        {product.availability}
      </span>
      {isLowStock && (
        <span className={styles.lowStock}>
          Only {product.stock} left in stock
        </span>
      )}
    </div>
  );
}

interface QuantitySelectorProps {
  quantity: number;
  maxStock: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onChange: (value: number) => void;
}

function QuantitySelector({
  quantity,
  maxStock,
  onIncrement,
  onDecrement,
  onChange,
}: QuantitySelectorProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || QUANTITY_LIMITS.MIN;
    onChange(value);
  };

  return (
    <div className={styles.quantitySection}>
      <label htmlFor="quantity" className={styles.quantityLabel}>
        Quantity:
      </label>
      <div className={styles.quantityControls}>
        <motion.button
          onClick={onDecrement}
          className={styles.qtyBtn}
          aria-label="Decrease quantity"
          disabled={quantity <= QUANTITY_LIMITS.MIN}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Minus size={16} />
        </motion.button>
        <input
          id="quantity"
          type="number"
          value={quantity}
          onChange={handleInputChange}
          className={styles.qtyInput}
          min={QUANTITY_LIMITS.MIN}
          max={maxStock}
          aria-label="Product quantity"
        />
        <motion.button
          onClick={onIncrement}
          className={styles.qtyBtn}
          aria-label="Increase quantity"
          disabled={quantity >= maxStock}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus size={16} />
        </motion.button>
      </div>
    </div>
  );
}

interface AddToCartButtonProps {
  product: Product;
  onClick: () => void;
}

function AddToCartButton({ product, onClick }: AddToCartButtonProps) {
  const isOutOfStock = product.stock <= 0;

  return (
    <motion.button
      whileHover={isOutOfStock ? {} : { scale: 1.02 }}
      whileTap={isOutOfStock ? {} : { scale: 0.98 }}
      onClick={onClick}
      className={styles.addToCartBtn}
      disabled={isOutOfStock}
    >
      <ShoppingCart size={20} />
      <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
    </motion.button>
  );
}

interface ProductBenefitsProps {
  product: Product;
}

function ProductBenefits({ product }: ProductBenefitsProps) {
  return (
    <div className={styles.benefits}>
      <div className={styles.benefit}>
        <Truck size={20} />
        <span>{product.delivery}</span>
      </div>
      <div className={styles.benefit}>
        <Shield size={20} />
        <span>{product.pickup}</span>
      </div>
      <div className={styles.benefit}>
        <Check size={20} />
        <span>Payment: {product.paymentOptions.join(", ")}</span>
      </div>
    </div>
  );
}

interface ProductTabsProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  product: Product;
  hasDiscount: boolean;
}

function ProductTabs({ activeTab, onTabChange, product, hasDiscount }: ProductTabsProps) {
  return (
    <div className={styles.tabsContainer}>
      <div className={styles.tabs} role="tablist">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => onTabChange(key)}
            className={`${styles.tab} ${activeTab === key ? styles.activeTab : ""}`}
            role="tab"
            aria-selected={activeTab === key}
            aria-controls={`panel-${key}`}
          >
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className={styles.tabContent}
          role="tabpanel"
          id={`panel-${activeTab}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "description" && (
            <DescriptionPanel product={product} />
          )}
          {activeTab === "specs" && (
            <SpecificationsPanel product={product} hasDiscount={hasDiscount} />
          )}
          {activeTab === "usage" && (
            <UsagePanel product={product} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function DescriptionPanel({ product }: { product: Product }) {
  return (
    <div className={styles.contentPanel}>
      <h3>Product Description</h3>
      <p>{product.fullDescription || product.description}</p>
    </div>
  );
}

function SpecificationsPanel({
  product,
  hasDiscount,
}: {
  product: Product;
  hasDiscount: boolean;
}) {
  return (
    <div className={styles.contentPanel}>
      <h3>Product Specifications</h3>
      <table className={styles.specsTable}>
        <tbody>
          <tr>
            <td>Product ID</td>
            <td>{product.id}</td>
          </tr>
          <tr>
            <td>Category</td>
            <td>{product.category}</td>
          </tr>
          <tr>
            <td>Group</td>
            <td>{product.group}</td>
          </tr>
          <tr>
            <td>Availability</td>
            <td>{product.availability}</td>
          </tr>
          <tr>
            <td>Stock Level</td>
            <td>{product.stock} units</td>
          </tr>
          {hasDiscount && (
            <tr>
              <td>Discount</td>
              <td>{product.discount}% Off</td>
            </tr>
          )}
          <tr>
            <td>Original Price</td>
            <td>{formatPrice(product.originalPrice)}</td>
          </tr>
          <tr>
            <td>Current Price</td>
            <td>{formatPrice(product.discountedPrice)}</td>
          </tr>
          <tr>
            <td>Delivery</td>
            <td>{product.delivery}</td>
          </tr>
          <tr>
            <td>Pickup</td>
            <td>{product.pickup}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function UsagePanel({ product }: { product: Product }) {
  return (
    <div className={styles.contentPanel}>
      <h3>How to Use</h3>
      <p>
        {product.howToUse ||
          "Follow the instructions provided on the product packaging or consult your healthcare provider."}
      </p>

      {product.ingredients && product.ingredients.length > 0 && (
        <>
          <h4>Ingredients</h4>
          <ul>
            {product.ingredients.map((ingredient, idx) => (
              <li key={idx}>{ingredient}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

interface RelatedProductsProps {
  products: Product[];
}

function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className={styles.relatedSection}>
      <h2 className={styles.relatedTitle}>Similar Products</h2>
      <div className={styles.relatedGrid}>
        {products.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/shop/shopDetails/${item.slug}`} className={styles.relatedCard}>
              <div className={styles.relatedImage}>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {item.discount > 0 && (
                  <span className={styles.relatedBadge}>-{item.discount}%</span>
                )}
              </div>
              <div className={styles.relatedInfo}>
                <h3>{item.title}</h3>
                <div className={styles.relatedPrice}>
                  <span className={styles.relatedCurrentPrice}>
                    {formatPrice(item.discountedPrice)}
                  </span>
                  {item.discount > 0 && (
                    <span className={styles.relatedOriginalPrice}>
                      {formatPrice(item.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* =============================================================================
   📄 Main Page Component - Controller Layer
============================================================================= */

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const viewModel = useProductDetailsViewModel(slug);

  if (!viewModel.product) {
    return <ProductNotFound />;
  }

  const { product, handlers } = viewModel;

  return (
    <div className={styles.wrapper}>
      <BackButton onClick={handlers.navigateBack} />

      <div className={styles.container}>
        <ProductImageSection
          product={product}
          hasDiscount={viewModel.hasDiscount}
        />

        <div className={styles.detailsSection}>
          <ProductHeader
            product={product}
            isWishlisted={viewModel.isWishlisted}
            onToggleWishlist={handlers.toggleWishlist}
          />

          <ProductRating />

          <PriceSection
            product={product}
            hasDiscount={viewModel.hasDiscount}
            savings={viewModel.savings}
            quantity={viewModel.quantity}
          />

          <p className={styles.description}>{product.description}</p>

          <StockInfo product={product} />

          <QuantitySelector
            quantity={viewModel.quantity}
            maxStock={product.stock}
            onIncrement={handlers.incrementQuantity}
            onDecrement={handlers.decrementQuantity}
            onChange={handlers.setQuantity}
          />

          <div className={styles.actions}>
            <AddToCartButton product={product} onClick={handlers.addToCart} />
          </div>

          <ProductBenefits product={product} />
        </div>
      </div>

      <ProductTabs
        activeTab={viewModel.activeTab}
        onTabChange={handlers.setActiveTab}
        product={product}
        hasDiscount={viewModel.hasDiscount}
      />

      <RelatedProducts products={viewModel.relatedProducts} />
    </div>
  );
}