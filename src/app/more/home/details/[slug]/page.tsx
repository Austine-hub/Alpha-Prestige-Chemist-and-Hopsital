//src/app/more/home/details/[slug]/page.tsx
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
  Package,
} from "lucide-react";
import toast from "react-hot-toast";

import styles from "./HomeDetails.module.css";
import {
  getDealInKSH,
  getAllDealsInKSH,
  type DealViewModel,
} from "@/data/more/HomeData";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

/* =============================================================================
   🎯 Types
============================================================================= */

type TabType = "description" | "specs" | "reviews";

/* =============================================================================
   📦 Main Component
============================================================================= */

export default function DealDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const { addToCart, openCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [activeTab, setActiveTab] = useState<TabType>("description");
  const [quantity, setQuantity] = useState(1);

  /* ---------------- Data Layer ---------------- */
  const deal = useMemo(() => getDealInKSH(slug), [slug]);
  const isWishlisted = useMemo(
    () => (deal ? isInWishlist(deal.id) : false),
    [deal, isInWishlist]
  );

  const relatedDeals = useMemo(() => {
    if (!deal) return [];
    return getAllDealsInKSH()
      .filter((d) => d.id !== deal.id)
      .slice(0, 4);
  }, [deal]);

  /* ---------------- Handlers ---------------- */
  const handleAddToCart = useCallback(() => {
    if (!deal) return;

    addToCart({
      id: deal.id,
      name: deal.name,
      price: deal.priceKSH,
      quantity,
      image: deal.img,
      originalPrice: deal.mrpKSH,
      discount: deal.discount,
      category: deal.category,
      description: deal.description,
    });

    toast.success(`${deal.name} added to cart`, {
      duration: 2000,
      icon: <ShoppingCart size={20} />,
    });

    openCart();
  }, [addToCart, deal, quantity, openCart]);

  const handleWishlist = useCallback(() => {
    if (!deal) return;

    if (isWishlisted) {
      removeFromWishlist(deal.id);
      toast.success("Removed from wishlist", { duration: 2000 });
    } else {
      addToWishlist({
        id: deal.id,
        name: deal.name,
        price: deal.priceKSH,
        image: deal.img,
        category: deal.category,
      });
      toast.success("Added to wishlist", { duration: 2000 });
    }
  }, [deal, isWishlisted, addToWishlist, removeFromWishlist]);

  const handleQuantityChange = useCallback((newQuantity: number) => {
    setQuantity(Math.max(1, Math.min(999, newQuantity)));
  }, []);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  /* ---------------- Not Found State ---------------- */
  if (!deal) {
    return (
      <div className={styles.notFound}>
        <Package size={64} />
        <h2>Product Not Found</h2>
        <p>The deal you're looking for doesn't exist or has expired.</p>
        <Link href="/#deals" className={styles.backLink}>
          Browse All Deals
        </Link>
      </div>
    );
  }

  /* ---------------- Main Render ---------------- */
  const totalSavings = deal.savingsKSH * quantity;

  return (
    <div className={styles.wrapper}>
      {/* Back Button */}
      <button
        onClick={handleBack}
        className={styles.backBtn}
        aria-label="Go back"
      >
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      {/* Product Overview */}
      <div className={styles.container}>
        {/* Image Section */}
        <div className={styles.imageSection}>
          <div className={styles.imageBadge}>-{deal.discount}%</div>
          <div className={styles.imageWrapper}>
            <Image
              src={deal.img}
              alt={deal.name}
              width={500}
              height={500}
              priority
              className={styles.productImage}
            />
          </div>
        </div>

        {/* Details Section */}
        <div className={styles.detailsSection}>
          {/* Header with Wishlist */}
          <div className={styles.header}>
            <h1 className={styles.title}>{deal.name}</h1>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlist}
              className={`${styles.wishlistBtn} ${
                isWishlisted ? styles.wishlisted : ""
              }`}
              aria-label={
                isWishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
            >
              <Heart size={22} fill={isWishlisted ? "currentColor" : "none"} />
            </motion.button>
          </div>

          {/* Rating */}
          <div className={styles.rating}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="#fbbf24" stroke="#fbbf24" />
            ))}
            <span className={styles.ratingText}>4.8 (127 reviews)</span>
          </div>

          {/* Pricing */}
          <div className={styles.priceSection}>
            <span className={styles.currentPrice}>
              {deal.priceFormattedKSH}
            </span>
            {deal.mrpKSH > deal.priceKSH && (
              <>
                <span className={styles.originalPrice}>
                  {deal.mrpFormattedKSH}
                </span>
                <span className={styles.saveAmount}>
                  Save{" "}
                  {totalSavings.toLocaleString("en-KE", {
                    style: "currency",
                    currency: "KES",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className={styles.description}>{deal.description}</p>

          {/* Quantity Controls */}
          <div className={styles.quantitySection}>
            <label htmlFor="quantity" className={styles.quantityLabel}>
              Quantity:
            </label>
            <div className={styles.quantityControls}>
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className={styles.qtyBtn}
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) =>
                  handleQuantityChange(parseInt(e.target.value) || 1)
                }
                className={styles.qtyInput}
                min="1"
                max="999"
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className={styles.qtyBtn}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className={styles.actions}>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className={styles.addToCartBtn}
            >
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </motion.button>
          </div>

          {/* Benefits */}
          <div className={styles.benefits}>
            <div className={styles.benefit}>
              <Truck size={20} />
              <span>Free delivery over KES 2,000</span>
            </div>
            <div className={styles.benefit}>
              <Shield size={20} />
              <span>Secure payment guarantee</span>
            </div>
            <div className={styles.benefit}>
              <Check size={20} />
              <span>Easy 30-day returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          {(["description", "specs", "reviews"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${styles.tab} ${
                activeTab === tab ? styles.activeTab : ""
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>
          {activeTab === "description" && <DescriptionTab deal={deal} />}
          {activeTab === "specs" && <SpecsTab deal={deal} />}
          {activeTab === "reviews" && <ReviewsTab />}
        </div>
      </div>

      {/* Related Products */}
      {relatedDeals.length > 0 && <RelatedDeals deals={relatedDeals} />}
    </div>
  );
}

/* =============================================================================
   🧩 Sub-Components
============================================================================= */

function DescriptionTab({ deal }: { deal: DealViewModel }) {
  return (
    <div className={styles.contentPanel}>
      <h3>Product Description</h3>
      <p>
        Experience superior quality with {deal.name}. This product combines
        exceptional value with outstanding performance, making it perfect for
        everyday use.
      </p>
      <h4>Key Features</h4>
      <ul>
        <li>Premium quality materials and construction</li>
        <li>Exceptional durability and longevity</li>
        <li>Optimized for maximum performance</li>
        <li>Backed by manufacturer warranty</li>
      </ul>
    </div>
  );
}

function SpecsTab({ deal }: { deal: DealViewModel }) {
  const specEntries = Object.entries(deal.specs);
  
  const additionalSpecs = [
    { key: "Category", value: deal.category },
    { key: "Discount", value: `${deal.discount}% Off` },
    { key: "Original Price", value: deal.mrpFormattedKSH },
    { key: "Current Price", value: deal.priceFormattedKSH },
  ];

  return (
    <div className={styles.contentPanel}>
      <h3>Technical Specifications</h3>
      <table className={styles.specsTable}>
        <tbody>
          {specEntries.map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
          {additionalSpecs.map(({ key, value }) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ReviewsTab() {
  const reviews = useMemo(
    () => [
      {
        id: 1,
        author: "Sarah M.",
        rating: 5,
        text: "Excellent quality and fast delivery. Highly recommend!",
      },
      {
        id: 2,
        author: "John D.",
        rating: 5,
        text: "Great value for money. Very satisfied with this purchase.",
      },
    ],
    []
  );

  return (
    <div className={styles.contentPanel}>
      <h3>Customer Reviews</h3>
      <div className={styles.reviewSummary}>
        <div className={styles.reviewScore}>
          <span className={styles.scoreNumber}>4.8</span>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="#fbbf24" stroke="#fbbf24" />
            ))}
          </div>
          <span className={styles.reviewCount}>Based on 127 reviews</span>
        </div>
      </div>
      <div className={styles.reviewsList}>
        {reviews.map((review) => (
          <div key={review.id} className={styles.review}>
            <div className={styles.reviewHeader}>
              <span className={styles.reviewAuthor}>{review.author}</span>
              <div className={styles.reviewStars}>
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} fill="#fbbf24" stroke="#fbbf24" />
                ))}
              </div>
            </div>
            <p className={styles.reviewText}>{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RelatedDeals({ deals }: { deals: readonly DealViewModel[] }) {
  return (
    <div className={styles.relatedSection}>
      <h2 className={styles.relatedTitle}>You May Also Like</h2>
      <div className={styles.relatedGrid}>
        {deals.map((item) => (
          <Link
            key={item.id}
            href={`/deals/${item.slug}`}
            className={styles.relatedCard}
          >
            <div className={styles.relatedImage}>
              <Image src={item.img} alt={item.name} width={200} height={200} />
              {item.discount > 0 && (
                <span className={styles.relatedBadge}>-{item.discount}%</span>
              )}
            </div>
            <div className={styles.relatedInfo}>
              <h3>{item.name}</h3>
              <div className={styles.relatedPrice}>
                <span className={styles.relatedCurrentPrice}>
                  {item.priceFormattedKSH}
                </span>
                {item.mrpKSH > item.priceKSH && (
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
}