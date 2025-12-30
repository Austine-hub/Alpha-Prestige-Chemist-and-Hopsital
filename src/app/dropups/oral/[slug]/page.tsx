// src/app/dropups/oral/[slug]/page.tsx

"use client";

import { memo, useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useCart } from "@/context/CartContext";
import {
  type OralProduct,
  getProductBySlug,
  getSimilarProducts,
  formatPrice,
  getStockStatus,
} from "@/data/OralData";

import styles from "./Oral.module.css";

/* -------------------------------------------------------------------------- */
/*                                   VIEW                                     */
/* -------------------------------------------------------------------------- */

const OralDetailsPage: React.FC = memo(() => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { addToCart } = useCart();

  /* ------------------------------------------------------------------------ */
  /*                          PRODUCT RESOLUTION                               */
  /* ------------------------------------------------------------------------ */

  const product: OralProduct | null = useMemo(() => {
    if (!slug || typeof slug !== "string") return null;
    return getProductBySlug(slug);
  }, [slug]);

  if (!product) {
    router.replace("/404");
    return null;
  }

  const { isInStock, label } = getStockStatus(product.stock);

  /* ------------------------------------------------------------------------ */
  /*                               UI STATE                                    */
  /* ------------------------------------------------------------------------ */

  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"features" | "description" | "usage">(
    "features"
  );

  /* ------------------------------------------------------------------------ */
  /*                              CONTROLLERS                                  */
  /* ------------------------------------------------------------------------ */

  const incrementQty = useCallback(() => {
    setQuantity((q) => Math.min(q + 1, 99));
  }, []);

  const decrementQty = useCallback(() => {
    setQuantity((q) => Math.max(q - 1, 1));
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!isInStock) {
      toast.error("Product is out of stock");
      return;
    }

    addToCart({
      id: product.slug, // slug-first identity
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      inStock: true,
    });

    toast.success(`${product.name} added to cart`);
  }, [addToCart, product, quantity, isInStock]);

  /* ------------------------------------------------------------------------ */
  /*                          DERIVED DATA (SSOT)                               */
  /* ------------------------------------------------------------------------ */

  const similarProducts = useMemo(
    () => getSimilarProducts(product),
    [product]
  );

  /* ------------------------------------------------------------------------ */
  /*                                   UI                                     */
  /* ------------------------------------------------------------------------ */

  return (
    <section className={styles.container}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/" className={styles.breadcrumbLink}>
          Home
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <Link href="/system/oral" className={styles.breadcrumbLink}>
          Oral Care
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{product.name}</span>
      </nav>

      {/* Product Details */}
      <article className={styles.detailsSection}>
        {/* Image */}
        <div className={styles.imageWrapper}>
          <Image
            src={product.image}
            alt={product.name}
            width={420}
            height={420}
            priority
            className={styles.productImage}
          />

          {!isInStock && (
            <span className={styles.outOfStockBadge}>Out of Stock</span>
          )}
        </div>

        {/* Info */}
        <div className={styles.infoWrapper}>
          <span className={styles.category}>{product.subCategory}</span>
          <h1 className={styles.title}>{product.name}</h1>

          <div className={styles.priceRow}>
            <span className={styles.price}>{formatPrice(product.price)}</span>
            <span
              className={`${styles.stockBadge} ${
                isInStock ? styles.inStock : styles.outStock
              }`}
            >
              {label}
            </span>
          </div>

          {/* Tabs */}
          <div className={styles.tabs}>
            {(["features", "description", "usage"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${styles.tabButton} ${
                  activeTab === tab ? styles.activeTab : ""
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className={styles.tabContent}>
            {activeTab === "features" && (
              <ul className={styles.list}>
                {product.features.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}

            {activeTab === "description" && (
              <div className={styles.textBlock}>
                {product.description.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            )}

            {activeTab === "usage" && (
              <div className={styles.textBlock}>
                {product.usage.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <div className={styles.quantityControl}>
              <button
                onClick={decrementQty}
                disabled={!isInStock}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                onClick={incrementQty}
                disabled={!isInStock}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!isInStock}
              className={styles.addToCart}
            >
              {isInStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </article>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className={styles.similarSection}>
          <h2>You may also like</h2>

          <div className={styles.similarGrid}>
            {similarProducts.map((item) => (
              <Link
                key={item.slug}
                href={`/dropups/oral/${item.slug}`}
                className={styles.similarCard}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={160}
                  height={160}
                  loading="lazy"
                />
                <h3>{item.name}</h3>
                <p>{formatPrice(item.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </section>
  );
});

OralDetailsPage.displayName = "OralDetailsPage";

export default OralDetailsPage;