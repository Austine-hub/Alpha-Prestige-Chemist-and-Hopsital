//src/app/popular/[slug]/page.tsx

"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCallback, useState, useMemo } from "react";
import { ShoppingCart, Heart, Star, Check, Truck, Shield, ArrowLeft, Package } from "lucide-react";
import toast from "react-hot-toast";

import styles from "./PopularDetails.module.css";
import { getDealInKSH, getAllDealsInKSH } from "@/data/details/popular";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function DealDetailsPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const deal = getDealInKSH(slug);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");
  const [quantity, setQuantity] = useState(1);

  const isWishlisted = deal ? isInWishlist(deal.id) : false;

  // Fixed: Use slug for related popular links
  const relatedDeals = useMemo(() => {
    if (!deal) return [];
    return getAllDealsInKSH()
      .filter((d) => d.id !== deal.id)
      .slice(0, 4);
  }, [deal]);

  const handleAddToCart = useCallback(() => {
    if (!deal) return;

    addToCart({
      id: deal.id,
      name: deal.name,
      price: deal.priceKSH, // Fixed: Use priceKSH
      quantity,
      image: deal.img,
      originalPrice: deal.mrpKSH, // Fixed: Use mrpKSH
      discount: deal.discount,
      category: "Deals",
    });

    toast.success(`${deal.name} added to cart`, {
      duration: 3000,
      icon: <ShoppingCart size={20} />,
    });
  }, [addToCart, deal, quantity]);

  const handleWishlist = useCallback(() => {
    if (!deal) return;

    if (isWishlisted) {
      removeFromWishlist(deal.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist({
        id: deal.id,
        name: deal.name,
        price: deal.priceKSH, // Fixed: Use priceKSH
        image: deal.img,
        category: "Deals",
      });
      toast.success("Added to wishlist");
    }
  }, [deal, isWishlisted, addToWishlist, removeFromWishlist]);

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

  return (
    <div className={styles.wrapper}>
      <button onClick={() => router.back()} className={styles.backBtn} aria-label="Go back">
        <ArrowLeft size={20} />
        <span>Back</span>
      </button>

      <div className={styles.container}>
        <div className={styles.imageSection}>
          <div className={styles.imageBadge}>-{deal.discount}%</div>
          <div className={styles.imageWrapper}>
            <Image src={deal.img} alt={deal.name} width={500} height={500} priority className={styles.productImage} />
          </div>
        </div>

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

          <div className={styles.rating}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="#fbbf24" stroke="#fbbf24" />
            ))}
            <span className={styles.ratingText}>4.8 (127 reviews)</span>
          </div>

          <div className={styles.priceSection}>
            <span className={styles.currentPrice}>{deal.priceFormattedKSH}</span>
            {deal.mrpKSH > deal.priceKSH && (
              <>
                <span className={styles.originalPrice}>{deal.mrpFormattedKSH}</span>
                {/* Fixed: Use savingsKSH from ViewModel */}
                <span className={styles.saveAmount}>
                  Save {(deal.savingsKSH * quantity).toLocaleString("en-KE", { style: "currency", currency: "KES" })}
                </span>
              </>
            )}
          </div>

          <p className={styles.description}>Premium quality product at an unbeatable price. Limited time offer - grab this deal before it expires!</p>

          <div className={styles.quantitySection}>
            <label htmlFor="quantity" className={styles.quantityLabel}>Quantity:</label>
            <div className={styles.quantityControls}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className={styles.qtyBtn} aria-label="Decrease quantity">-</button>
              <input id="quantity" type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className={styles.qtyInput} min="1" />
              <button onClick={() => setQuantity(quantity + 1)} className={styles.qtyBtn} aria-label="Increase quantity">+</button>
            </div>
          </div>

          <div className={styles.actions}>
            <motion.button whileTap={{ scale: 0.97 }} onClick={handleAddToCart} className={styles.addToCartBtn}>
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </motion.button>
          </div>

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

      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          <button onClick={() => setActiveTab("description")} className={`${styles.tab} ${activeTab === "description" ? styles.activeTab : ""}`}>
            Description
          </button>
          <button onClick={() => setActiveTab("specs")} className={`${styles.tab} ${activeTab === "specs" ? styles.activeTab : ""}`}>
            Specifications
          </button>
          <button onClick={() => setActiveTab("reviews")} className={`${styles.tab} ${activeTab === "reviews" ? styles.activeTab : ""}`}>
            Reviews
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "description" && (
            <div className={styles.contentPanel}>
              <h3>Product Description</h3>
              <p>Experience superior quality with {deal.name}. This product combines exceptional value with outstanding performance, making it perfect for everyday use.</p>
              <h4>Key Features</h4>
              <ul>
                <li>Premium quality materials and construction</li>
                <li>Exceptional durability and longevity</li>
                <li>Optimized for maximum performance</li>
                <li>Backed by manufacturer warranty</li>
              </ul>
            </div>
          )}

          {activeTab === "specs" && (
            <div className={styles.contentPanel}>
              <h3>Technical Specifications</h3>
              <table className={styles.specsTable}>
                <tbody>
                  <tr><td>Category</td><td>Deals of the Day</td></tr>
                  <tr><td>Availability</td><td>In Stock</td></tr>
                  <tr><td>Discount</td><td>{deal.discount}% Off</td></tr>
                  <tr><td>Original Price</td><td>{deal.mrpFormattedKSH}</td></tr>
                  <tr><td>Current Price</td><td>{deal.priceFormattedKSH}</td></tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "reviews" && (
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
                <div className={styles.review}>
                  <div className={styles.reviewHeader}>
                    <span className={styles.reviewAuthor}>Sarah M.</span>
                    <div className={styles.reviewStars}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="#fbbf24" stroke="#fbbf24" />
                      ))}
                    </div>
                  </div>
                  <p className={styles.reviewText}>Excellent quality and fast delivery. Highly recommend!</p>
                </div>
                <div className={styles.review}>
                  <div className={styles.reviewHeader}>
                    <span className={styles.reviewAuthor}>John D.</span>
                    <div className={styles.reviewStars}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="#fbbf24" stroke="#fbbf24" />
                      ))}
                    </div>
                  </div>
                  <p className={styles.reviewText}>Great value for money. Very satisfied with this purchase.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {relatedDeals.length > 0 && (
        <div className={styles.relatedSection}>
          <h2 className={styles.relatedTitle}>You May Also Like</h2>
          <div className={styles.relatedGrid}>
            {relatedDeals.map((item) => (
              // Fixed: Use slug instead of id for routing
              <Link key={item.id} href={`/deals/${item.slug}`} className={styles.relatedCard}>
                <div className={styles.relatedImage}>
                  <Image src={item.img} alt={item.name} width={200} height={200} />
                  {item.discount > 0 && <span className={styles.relatedBadge}>-{item.discount}%</span>}
                </div>
                <div className={styles.relatedInfo}>
                  <h3>{item.name}</h3>
                  <div className={styles.relatedPrice}>
                    <span className={styles.relatedCurrentPrice}>{item.priceFormattedKSH}</span>
                    {item.mrpKSH > item.priceKSH && <span className={styles.relatedOriginalPrice}>{item.mrpFormattedKSH}</span>}
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