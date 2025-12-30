// src/app/side/vitamins/vitaminsDetails/[slug]/page.tsx

"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useState, useMemo } from "react";
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Check, 
  Truck, 
  Shield, 
  ArrowLeft, 
  Package 
} from "lucide-react";
import toast from "react-hot-toast";

import styles from "./VitaminsDetails.module.css";
import { 
  getProductBySlug, 
  getSimilarProducts,
  type ProductViewModel 
} from "@/data/details/vitaminData";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

// ============================================================
// 🎯 ViewModel Hook - Encapsulates business logic
// ============================================================
const useProductDetailsViewModel = (slug: string) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");

  // Data fetching with validation
  const product = useMemo(() => getProductBySlug(slug), [slug]);
  const relatedProducts = useMemo(
    () => product ? getSimilarProducts(slug, 4) : [],
    [slug, product]
  );
  
  const isWishlisted = product ? isInWishlist(product.id) : false;

  // Actions
  const handleAddToCart = useCallback(() => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.priceKSH,
      quantity,
      image: product.image,
      originalPrice: product.mrpKSH,
      discount: product.discount,
      category: product.category,
    });

    toast.success(`${product.name} added to cart`, {
      duration: 3000,
      icon: <ShoppingCart size={20} />,
    });
  }, [addToCart, product, quantity]);

  const toggleWishlist = useCallback(() => {
    if (!product) return;

    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.priceKSH,
        image: product.image,
        category: product.category,
      });
      toast.success("Added to wishlist");
    }
  }, [product, isWishlisted, addToWishlist, removeFromWishlist]);

  const updateQuantity = useCallback((value: number) => {
    setQuantity(Math.max(1, value));
  }, []);

  return {
    product,
    relatedProducts,
    quantity,
    activeTab,
    isWishlisted,
    setActiveTab,
    updateQuantity,
    handleAddToCart,
    toggleWishlist,
  };
};

// ============================================================
// 🧩 Presentation Components
// ============================================================

const ProductImage = ({ product }: { product: ProductViewModel }) => (
  <div className={styles.imageSection}>
    {product.hasDiscount && (
      <div className={styles.imageBadge}>-{product.discount}%</div>
    )}
    <div className={styles.imageWrapper}>
      <Image
        src={product.image || "/placeholder.png"}
        alt={product.name}
        width={500}
        height={500}
        priority
        className={styles.productImage}
        onError={(e) => {
          e.currentTarget.src = "/placeholder.png";
        }}
      />
    </div>
  </div>
);

const ProductHeader = ({ 
  product, 
  isWishlisted, 
  onToggleWishlist 
}: { 
  product: ProductViewModel;
  isWishlisted: boolean;
  onToggleWishlist: () => void;
}) => (
  <div className={styles.header}>
    <h1 className={styles.title}>{product.name}</h1>
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onToggleWishlist}
      className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlisted : ""}`}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart size={22} fill={isWishlisted ? "currentColor" : "none"} />
    </motion.button>
  </div>
);

const ProductRating = () => (
  <div className={styles.rating}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={16} fill="#fbbf24" stroke="#fbbf24" />
    ))}
    <span className={styles.ratingText}>4.8 (127 reviews)</span>
  </div>
);

const PriceSection = ({ 
  product, 
  quantity 
}: { 
  product: ProductViewModel;
  quantity: number;
}) => (
  <div className={styles.priceSection}>
    <span className={styles.currentPrice}>{product.priceFormattedKSH}</span>
    {product.hasDiscount && (
      <>
        <span className={styles.originalPrice}>{product.mrpFormattedKSH}</span>
        <span className={styles.saveAmount}>
          Save KES {(product.savingsKSH * quantity).toLocaleString()}
        </span>
      </>
    )}
  </div>
);

const QuantitySelector = ({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (value: number) => void;
}) => (
  <div className={styles.quantitySection}>
    <label htmlFor="quantity" className={styles.quantityLabel}>
      Quantity:
    </label>
    <div className={styles.quantityControls}>
      <button
        onClick={() => onChange(quantity - 1)}
        className={styles.qtyBtn}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <input
        id="quantity"
        type="number"
        value={quantity}
        onChange={(e) => onChange(parseInt(e.target.value) || 1)}
        className={styles.qtyInput}
        min="1"
      />
      <button
        onClick={() => onChange(quantity + 1)}
        className={styles.qtyBtn}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  </div>
);

const Benefits = () => {
  const benefits = [
    { icon: Truck, text: "Free delivery over KES 2,000" },
    { icon: Shield, text: "Secure payment guarantee" },
    { icon: Check, text: "Easy 30-day returns" },
  ];

  return (
    <div className={styles.benefits}>
      {benefits.map(({ icon: Icon, text }) => (
        <div key={text} className={styles.benefit}>
          <Icon size={20} />
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
};

const TabNavigation = ({
  activeTab,
  onChange,
}: {
  activeTab: string;
  onChange: (tab: "description" | "specs" | "reviews") => void;
}) => {
  const tabs = [
    { id: "description", label: "Description" },
    { id: "specs", label: "Specifications" },
    { id: "reviews", label: "Reviews" },
  ] as const;

  return (
    <div className={styles.tabs}>
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`${styles.tab} ${activeTab === id ? styles.activeTab : ""}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

const TabContent = ({ 
  activeTab, 
  product 
}: { 
  activeTab: string;
  product: ProductViewModel;
}) => {
  if (activeTab === "description") {
    return (
      <div className={styles.contentPanel}>
        <h3>Product Description</h3>
        <p>{product.fullDescription}</p>
        {product.features.length > 0 && (
          <>
            <h4>Key Features</h4>
            <ul>
              {product.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }

  if (activeTab === "specs") {
    return (
      <div className={styles.contentPanel}>
        <h3>Technical Specifications</h3>
        <table className={styles.specsTable}>
          <tbody>
            {Object.entries(product.specifications).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
            <tr>
              <td>Discount</td>
              <td>{product.discountLabel || "No discount"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className={styles.contentPanel}>
      <h3>Customer Reviews</h3>
      <div className={styles.reviewSummary}>
        <div className={styles.reviewScore}>
          <span className={styles.scoreNumber}>4.8</span>
          <div className={styles.stars}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={20} fill="#fbbf24" stroke="#fbbf24" />
            ))}
          </div>
          <span className={styles.reviewCount}>Based on 127 reviews</span>
        </div>
      </div>
      <div className={styles.reviewsList}>
        {[
          { author: "Sarah M.", text: "Excellent quality and fast delivery. Highly recommend!" },
          { author: "John D.", text: "Great value for money. Very satisfied with this purchase." },
        ].map((review, i) => (
          <div key={i} className={styles.review}>
            <div className={styles.reviewHeader}>
              <span className={styles.reviewAuthor}>{review.author}</span>
              <div className={styles.reviewStars}>
                {Array.from({ length: 5 }, (_, j) => (
                  <Star key={j} size={14} fill="#fbbf24" stroke="#fbbf24" />
                ))}
              </div>
            </div>
            <p className={styles.reviewText}>{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const RelatedProducts = ({ products }: { products: readonly ProductViewModel[] }) => {
  if (products.length === 0) return null;

  return (
    <div className={styles.relatedSection}>
      <h2 className={styles.relatedTitle}>You May Also Like</h2>
      <div className={styles.relatedGrid}>
        {products.map((item) => (
          <Link
            key={item.id}
            href={`/side/vitamins/vitaminsDetails/${item.slug}`}
            className={styles.relatedCard}
          >
            <div className={styles.relatedImage}>
              <Image
                src={item.image || "/placeholder.png"}
                alt={item.name}
                width={200}
                height={200}
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.png";
                }}
              />
              {item.hasDiscount && (
                <span className={styles.relatedBadge}>-{item.discount}%</span>
              )}
            </div>
            <div className={styles.relatedInfo}>
              <h3>{item.name}</h3>
              <div className={styles.relatedPrice}>
                <span className={styles.relatedCurrentPrice}>
                  {item.priceFormattedKSH}
                </span>
                {item.hasDiscount && (
                  <span className={styles.relatedOriginalPrice}>
                    {item.mrpFormattedKSH}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const NotFound = () => (
  <div className={styles.notFound}>
    <Package size={64} />
    <h2>Product Not Found</h2>
    <p>The product you're looking for doesn't exist.</p>
    <Link href="/side/vitamins" className={styles.backLink}>
      Browse All Products
    </Link>
  </div>
);

// ============================================================
// 📄 Main Page Component
// ============================================================
export default function VitaminsDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const viewModel = useProductDetailsViewModel(slug);

  if (!viewModel.product) {
    return <NotFound />;
  }

  const { product } = viewModel;

  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => router.back()}
        className={styles.backBtn}
        aria-label="Go back"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      <div className={styles.container}>
        <ProductImage product={product} />

        <div className={styles.detailsSection}>
          <ProductHeader
            product={product}
            isWishlisted={viewModel.isWishlisted}
            onToggleWishlist={viewModel.toggleWishlist}
          />
          <ProductRating />
          <PriceSection product={product} quantity={viewModel.quantity} />
          <p className={styles.description}>{product.description}</p>
          <QuantitySelector
            quantity={viewModel.quantity}
            onChange={viewModel.updateQuantity}
          />

          <div className={styles.actions}>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={viewModel.handleAddToCart}
              className={styles.addToCartBtn}
            >
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </motion.button>
          </div>

          <Benefits />
        </div>
      </div>

      <div className={styles.tabsContainer}>
        <TabNavigation
          activeTab={viewModel.activeTab}
          onChange={viewModel.setActiveTab}
        />
        <div className={styles.tabContent}>
          <TabContent activeTab={viewModel.activeTab} product={product} />
        </div>
      </div>

      <RelatedProducts products={viewModel.relatedProducts} />
    </div>
  );
}