"use client";

// ===============================================================
// 🧪 CVS Details Page — Next.js App Router (Client Component)
// Robust • Typed • DRY • Error-Proof
// ===============================================================

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { cvsProducts, type Product } from "@/data/cvsProducts";
import { useCart } from "@/context/CartContext";
import styles from "./CVS.module.css";

// -------------------------------------------------------------
// Types
// -------------------------------------------------------------
type TabKey = "features" | "description" | "usage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// -------------------------------------------------------------
// Component
// -------------------------------------------------------------
const CVSDetailsPage: React.FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const { addToCart } = useCart();

  // ✅ Correct Next.js dynamic param unwrap (future-safe)
  const { slug } = React.use(params);

  // -------------------------------------------------------------
  // State
  // -------------------------------------------------------------
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("features");

  // -------------------------------------------------------------
  // Fetch product (stable + cancellable)
  // -------------------------------------------------------------
  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const timer = setTimeout(() => {
      if (cancelled) return;

      const found = cvsProducts.find((p) => p.slug === slug);

      if (!found) {
        toast.error("Product not found");
        router.replace("/not-found");
        return;
      }

      setProduct(found);
      setLoading(false);
    }, 120);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [slug, router]);

  // -------------------------------------------------------------
  // Derived State
  // -------------------------------------------------------------
  const isInStock = product?.inStock ?? false;

  const similarProducts = useMemo(() => {
    if (!product) return [];
    return cvsProducts
      .filter(
        (p) =>
          p.subCategory === product.subCategory &&
          p.slug !== product.slug
      )
      .slice(0, 4);
  }, [product]);

  // -------------------------------------------------------------
  // Quantity Controls
  // -------------------------------------------------------------
  const incrementQty = useCallback(
    () => setQty((q) => Math.min(q + 1, 99)),
    []
  );

  const decrementQty = useCallback(
    () => setQty((q) => Math.max(q - 1, 1)),
    []
  );

  const onQtyChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      setQty(
        Number.isNaN(value) ? 1 : Math.max(1, Math.min(99, value))
      );
    },
    []
  );

  // -------------------------------------------------------------
  // Add to Cart (Type-Safe)
  // -------------------------------------------------------------
  const handleAddToCart = useCallback(() => {
    if (!product || !product.inStock) return;

    addToCart({
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: qty,
      inStock: true,
    });

    toast.success(
      <div className={styles.toastContent}>
        <strong>{product.name}</strong>
        <span>Added {qty} item(s) to cart</span>
      </div>,
      { duration: 2500 }
    );
  }, [addToCart, product, qty]);

  // -------------------------------------------------------------
  // Similar Product Navigation
  // -------------------------------------------------------------
  const openSimilar = useCallback(
    (nextSlug: string) => {
      setQty(1);
      setImageLoaded(false);
      setActiveTab("features");
      router.push(`/system/cvs/${nextSlug}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [router]
  );

  // -------------------------------------------------------------
  // Loading State
  // -------------------------------------------------------------
  if (loading) {
    return (
      <section className={styles.container}>
        <div className={styles.skeleton} />
      </section>
    );
  }

  if (!product) return null;

  // -------------------------------------------------------------
  // Render
  // -------------------------------------------------------------
  return (
    <section className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <button onClick={() => router.push("/")}>Home</button>
        <span>/</span>
        <button onClick={() => router.push("/system/cvs")}>
          {product.subCategory}
        </button>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      {/* Product */}
      <article className={styles.detailsSection}>
        <div className={styles.imageWrapper}>
          {!imageLoaded && <div className={styles.imagePlaceholder} />}
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            priority
            onLoadingComplete={() => setImageLoaded(true)}
            className={styles.productImage}
          />

          {!isInStock && (
            <span className={styles.outOfStockBadge}>
              Out of Stock
            </span>
          )}
        </div>

        <div className={styles.infoWrapper}>
          <h1>{product.name}</h1>

          <div className={styles.priceRow}>
            <span className={styles.price}>
              KES {product.price.toLocaleString()}
            </span>
            <span
              className={`${styles.stockBadge} ${
                isInStock ? styles.inStock : styles.outStock
              }`}
            >
              {isInStock ? "✓ In Stock" : "✕ Out of Stock"}
            </span>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            {(["features", "description", "usage"] as TabKey[]).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={
                    activeTab === tab ? styles.activeTab : ""
                  }
                >
                  {tab.toUpperCase()}
                </button>
              )
            )}
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <div className={styles.qtyControl}>
              <button onClick={decrementQty} disabled={!isInStock}>
                −
              </button>
              <input
                type="number"
                value={qty}
                onChange={onQtyChange}
                disabled={!isInStock}
              />
              <button onClick={incrementQty} disabled={!isInStock}>
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!isInStock}
              className={styles.addToCart}
            >
              {isInStock ? "Add to Cart" : "Unavailable"}
            </button>
          </div>
        </div>
      </article>

      {/* Similar */}
      {similarProducts.length > 0 && (
        <section className={styles.similarSection}>
          <h2>You May Also Like</h2>
          <div className={styles.similarGrid}>
            {similarProducts.map((item) => (
              <article
                key={item.id}
                onClick={() => openSimilar(item.slug)}
                className={styles.similarCard}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={140}
                  height={140}
                />
                <h3>{item.name}</h3>
                <p>KES {item.price.toLocaleString()}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default CVSDetailsPage;
