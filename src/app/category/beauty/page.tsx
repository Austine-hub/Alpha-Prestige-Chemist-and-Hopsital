// src/app/category/beauty/page.tsx
"use client";

import { useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Heart, ArrowRight, Star } from "lucide-react";
import toast from "react-hot-toast";
import s from "./Beauty.module.css";

// MODEL LAYER IMPORTS (DRY Principle)
import {
  getProductURL,
  getAllProducts,
  formatPrice,
  type Product,
} from "@/data/beautyData";

// Context (assumed to exist)
// import { useCart } from "@/context/CartContext";

// --- Mock Cart Context for compilation/demo ---
const useCart = () => ({
    addToCart: (item: { id: string, name: string, price: number, image: any, quantity: number }) => { /* mock */ }
});

// === Card Component (Pure View) ===
const ProductCard = ({
  product,
  onAdd,
  onNavigate
}: {
  product: Product;
  onAdd: (p: Product) => void;
  onNavigate: (slug: string) => void;
}) => {
  const { id, slug, name, brand, image, price, oldPrice, discount, rating } = product;
  const productSlug = slug || id;

  // Navigate on card click (exclude button clicks)
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      // Use e.currentTarget to safely ensure the card element is clicked
      if (!(e.target as HTMLElement).closest("button, a")) onNavigate(productSlug);
    },
    [onNavigate, productSlug]
  );

  return (
    <article
      className={s.card}
      onClick={handleClick}
      role="link"
      tabIndex={0}
      aria-label={`View ${name}`}
    >
      {/* Image & Badges */}
      <div className={s.img}>
        <Image src={image} alt={name || "Product"} width={320} height={320} />
        {discount && discount > 0 && <span className={s.badge}>-{discount}%</span>}
      </div>

      <div className={s.body}>
        <h3 className={s.title}>{name}</h3>
        <p className={s.brand}>{brand}</p>
        
        {/* Rating */}
        {rating && (
            <div className={s.rating}>
                <Star size={14} fill="#ffc700" color="#ffc700" />
                <span>{rating.toFixed(1)}</span>
            </div>
        )}

        <div className={s.footer}>
          <div className={s.prices}>
            <span className={s.price}>{formatPrice(price, product.currency)}</span>
            {oldPrice && oldPrice > price && <span className={s.old}>{formatPrice(oldPrice, product.currency)}</span>}
          </div>

          <div className={s.btns}>
            <button
              className={s.cart}
              onClick={(e) => { e.stopPropagation(); onAdd(product); }}
              aria-label={`Add ${name} to cart`}
            >
              <ShoppingCart size={18} />
            </button>

            <button
              className={s.wish}
              onClick={(e) => { e.stopPropagation(); toast.success(`${name} added to wishlist`); }}
              aria-label={`Add ${name} to wishlist`}
            >
              <Heart size={18} />
            </button>
            
             {/* Direct View Button */}
            <Link 
                href={getProductURL(productSlug)}
                className={s.view}
                aria-label={`View details for ${name}`}
                onClick={(e) => e.stopPropagation()}
            >
                View <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

// === Main Page Component (Controller/View) ===
const BeautyPage = () => {
  const router = useRouter();
  const { addToCart } = useCart(); // Assuming useCart exists

  // Controller Logic: Fetch data from the Model Layer
  const products = useMemo(() =>
    getAllProducts().slice(0, 12), // Display the first 12 products
    []
  );

  // Controller Logic: Actions
  const handleAddToCart = useCallback((product: Product) => {
    try {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
      toast.success(`${product.name} added to cart`, { duration: 1800 });
    } catch {
      toast.error("Could not add to cart");
    }
  }, [addToCart]);

  const handleNavigate = useCallback((slug: string) => {
    router.push(getProductURL(slug)); // Use centralized URL builder
  }, [router]);

  if (!products.length) {
    return (
      <main className={s.page}>
        <div className={s.empty}>No products available</div>
      </main>
    );
  }

  // View Render
  return (
    <main className={s.page}>
      <header className={s.header}>
        <h1>Beauty & Makeup Essentials</h1>
        <p>Featuring top-rated products from our collection — tap any product for details</p>
      </header>

      <div className={s.grid}>
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={handleAddToCart}
            onNavigate={handleNavigate}
          />
        ))}
      </div>

      <Link href="/beauty/all" className={s.all}>
        View all products <ArrowRight size={16} />
      </Link>
    </main>
  );
};

export default BeautyPage;