//src/app/more/new/newDetails/[slug]/page.tsx

"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useMemo, useCallback } from "react";
import { ShoppingCart, Heart, Star, ArrowLeft, Package, Truck, Shield, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

import styles from "./PopularDetails.module.css";
import { 
  getDealInKSH, 
  getAllDealsInKSH, 
  toCartItem, 
  toWishlistItem, 
  calculateSavings,
  getProductBySlug 
} from "@/data/more/popularData";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

/* =============================================================================
 * Presentational Components
 * =========================================================================== */

const RatingDisplay = ({ rating = 4.8, count = 127 }: { rating?: number; count?: number }) => (
  <div className={styles.rating}>
    {[...Array(5)].map((_, i) => (
      <Star key={i} size={16} fill={i < Math.floor(rating) ? "#059669" : "none"} stroke="#059669" />
    ))}
    <span>{rating} ({count} reviews)</span>
  </div>
);

const BenefitsBar = () => {
  const benefits = [
    { icon: Truck, text: "Free delivery over KES 2,000" },
    { icon: Shield, text: "Secure payment & privacy" },
    { icon: RefreshCw, text: "Easy 30-day returns" }
  ];

  return (
    <div className={styles.benefits}>
      {benefits.map(({ icon: Icon, text }, i) => (
        <div key={i} className={styles.benefit}>
          <Icon size={18} />
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
};

const TabContent = ({ tab, deal }: { tab: string; deal: any }) => {
  const content = {
    description: (
      <>
        <h3>Product Information</h3>
        <p>{deal.name} is a high-quality pharmaceutical product designed for optimal efficacy and safety. Our products meet stringent quality standards.</p>
        <h4>Key Features</h4>
        <ul>
          <li>Clinically tested and approved</li>
          <li>Manufactured under GMP guidelines</li>
          <li>Authentic with batch tracking</li>
          <li>Comprehensive quality assurance</li>
        </ul>
      </>
    ),
    specs: (
      <>
        <h3>Product Specifications</h3>
        <table className={styles.specsTable}>
          <tbody>
            <tr><td>Availability</td><td>In Stock</td></tr>
            <tr><td>Discount</td><td>{deal.discount}% Off</td></tr>
            <tr><td>Regular Price</td><td>{deal.mrpFormattedKSH}</td></tr>
            <tr><td>Sale Price</td><td>{deal.priceFormattedKSH}</td></tr>
          </tbody>
        </table>
      </>
    ),
    reviews: (
      <>
        <h3>Customer Reviews</h3>
        <div className={styles.reviewSummary}>
          <div className={styles.reviewScore}>
            <span className={styles.scoreNum}>4.8</span>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#059669" stroke="#059669" />)}
            </div>
            <span>Based on 127 reviews</span>
          </div>
        </div>
        {[
          { author: "Dr. Sarah M.", text: "Excellent quality product. Fast delivery and well-packaged." },
          { author: "John K.", text: "Great value for money. Authentic product as described." }
        ].map((review, i) => (
          <div key={i} className={styles.review}>
            <div className={styles.reviewHeader}>
              <span>{review.author}</span>
              <div className={styles.reviewStars}>
                {[...Array(5)].map((_, j) => <Star key={j} size={14} fill="#059669" stroke="#059669" />)}
              </div>
            </div>
            <p>{review.text}</p>
          </div>
        ))}
      </>
    )
  };

  return <div className={styles.tabContent}>{content[tab as keyof typeof content]}</div>;
};

/* =============================================================================
 * Main Component
 * =========================================================================== */

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");
  const [quantity, setQuantity] = useState(1);

  // Fetch product data
  const deal = useMemo(() => getDealInKSH(slug), [slug]);
  const product = useMemo(() => getProductBySlug(slug), [slug]);
  const isWishlisted = deal ? isInWishlist(deal.id) : false;
  
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const allDeals = getAllDealsInKSH();
    return allDeals.filter(d => d.id !== deal?.id).slice(0, 4);
  }, [product, deal]);

  // Event handlers
  const handleAddToCart = useCallback(() => {
    if (!product || !deal) return;
    addToCart(toCartItem(product, quantity));
    toast.success(`${deal.name} added to cart`, { icon: <ShoppingCart size={18} /> });
  }, [product, deal, quantity, addToCart]);

  const handleWishlist = useCallback(() => {
    if (!product || !deal) return;
    if (isWishlisted) {
      removeFromWishlist(deal.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(toWishlistItem(product));
      toast.success("Added to wishlist");
    }
  }, [product, deal, isWishlisted, addToWishlist, removeFromWishlist]);

  const updateQuantity = (delta: number) => setQuantity(Math.max(1, quantity + delta));

  // 404 Error Handling
  if (!deal || !product) {
    return (
      <div className={styles.notFound}>
        <Package size={64} />
        <h2>Product Not Found</h2>
        <p>The requested product is unavailable or has been discontinued.</p>
        <Link href="/#deals" className={styles.backLink}>Browse Products</Link>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={() => router.back()} className={styles.backBtn} aria-label="Go back">
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      <div className={styles.container}>
        {/* Image Section */}
        <div className={styles.imageSection}>
          <div className={styles.badge}>-{deal.discount}%</div>
          <Image src={deal.img} alt={deal.name} width={500} height={500} priority className={styles.productImage} />
        </div>

        {/* Details Section */}
        <div className={styles.detailsSection}>
          <div className={styles.header}>
            <h1 className={styles.title}>{deal.name}</h1>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlist}
              className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlisted : ""}`}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={22} fill={isWishlisted ? "currentColor" : "none"} />
            </motion.button>
          </div>

          <RatingDisplay />

          <div className={styles.priceSection}>
            <span className={styles.currentPrice}>{deal.priceFormattedKSH}</span>
            {deal.mrpKSH > deal.priceKSH && (
              <>
                <span className={styles.originalPrice}>{deal.mrpFormattedKSH}</span>
                <span className={styles.saveAmount}>
                  Save {calculateSavings(deal.priceKSH, deal.mrpKSH, quantity)}
                </span>
              </>
            )}
          </div>

          <p className={styles.description}>
            Premium pharmaceutical product certified for quality and efficacy. Limited-time offer available.
          </p>

          <div className={styles.quantitySection}>
            <label htmlFor="quantity">Quantity:</label>
            <div className={styles.quantityControls}>
              <button onClick={() => updateQuantity(-1)} aria-label="Decrease">-</button>
              <input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
              <button onClick={() => updateQuantity(1)} aria-label="Increase">+</button>
            </div>
          </div>

          <motion.button whileTap={{ scale: 0.97 }} onClick={handleAddToCart} className={styles.addToCartBtn}>
            <ShoppingCart size={20} />
            <span>Add to Cart</span>
          </motion.button>

          <BenefitsBar />
        </div>
      </div>

      {/* Tabs Section */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          {(["description", "specs", "reviews"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ""}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <TabContent tab={activeTab} deal={deal} />
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className={styles.relatedSection}>
          <h2>Related Products</h2>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/deals/${item.slug}`} className={styles.relatedCard}>
                <div className={styles.relatedImage}>
                  <Image src={item.img} alt={item.name} width={200} height={200} />
                  {item.discount > 0 && <span className={styles.relatedBadge}>-{item.discount}%</span>}
                </div>
                <div className={styles.relatedInfo}>
                  <h3>{item.name}</h3>
                  <div className={styles.relatedPrice}>
                    <span className={styles.relatedCurrentPrice}>{item.priceFormattedKSH}</span>
                    {item.mrpKSH > item.priceKSH && (
                      <span className={styles.relatedOriginalPrice}>{item.mrpFormattedKSH}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}