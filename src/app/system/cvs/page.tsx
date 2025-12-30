//src/app/system/cvs/page.tsx

"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "../Shop.module.css";
import { cvsProducts } from "@/data/cvsProducts";
import type { Product } from "@/data/cvsProducts";

// ============================================================
// Component
// ============================================================

const CVS: React.FC = () => {
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<string>("Hypertension");

  // ------------------------------------------------------------
  // 1. Unique Subcategories (memoized & safe)
  // ------------------------------------------------------------
  const subCategories = useMemo<string[]>(() => {
    return Array.from(
      new Set(cvsProducts.map((product) => product.subCategory))
    );
  }, []);

  // ------------------------------------------------------------
  // 2. Filtered Products (memoized)
  // ------------------------------------------------------------
  const filteredProducts = useMemo<Product[]>(() => {
    return cvsProducts.filter(
      (product) => product.subCategory === selectedSubCategory
    );
  }, [selectedSubCategory]);

  // ------------------------------------------------------------
  // Render
  // ------------------------------------------------------------
  return (
    <section className={styles.shopSection}>
      {/* ======================================================
          Header
         ====================================================== */}
      <header className={styles.header}>
        <h2 className={styles.title}>Cardiovascular & Heart Drugs</h2>

        <div className={styles.subCategorySelect}>
          <label htmlFor="subcategory" className={styles.label}>
            Select Subcategory:
          </label>

          <select
            id="subcategory"
            className={styles.dropdown}
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
          >
            {subCategories.map((subCategory) => (
              <option key={subCategory} value={subCategory}>
                {subCategory}
              </option>
            ))}
          </select>
        </div>
      </header>

      {/* ======================================================
          Product Grid
         ====================================================== */}
      <div className={styles.grid}>
        {filteredProducts.length === 0 && (
          <p className={styles.emptyState}>
            No products found in this category.
          </p>
        )}

        {filteredProducts.map((product) => (
          <article
            key={`product-${product.id}-${product.slug}`}
            className={styles.card}
          >
            {/* ---------------- Product Image ---------------- */}
            <div className={styles.imageWrapper}>
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className={styles.image}
                loading="lazy"
              />

              {/* ✅ Corrected: inStock instead of stock */}
              {product.inStock && (
                <span className={styles.stockBadge}>In Stock</span>
              )}
            </div>

            {/* ---------------- Product Details ---------------- */}
            <div className={styles.details}>
              <p className={styles.category}>{product.subCategory}</p>
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.price}>
                KES {product.price.toLocaleString()}
              </p>
            </div>

            {/* ---------------- Actions ---------------- */}
            <div className={styles.actions}>
              <button
                className={styles.addToCart}
                disabled={!product.inStock}
                aria-disabled={!product.inStock}
              >
                Add to Cart
              </button>

              <Link
                href={`/dropups/cvs/${product.slug}`}
                className={styles.moreInfo}
              >
                View Details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default CVS;
