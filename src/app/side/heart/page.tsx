// src/app/side/cvs/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./cvs.module.css";

import {
  cvsProducts,
  getSubCategories,
  getProductsBySubCategory,
  CVSProduct,
} from "@/data/details/CVS";

export default function CVSPage() {
  const subCategories = getSubCategories();
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<CVSProduct["subCategory"]>(subCategories[0]);

  const products = getProductsBySubCategory(selectedSubCategory);

  return (
    <section className={styles.shopSection}>
      <header className={styles.header}>
        <h1 className={styles.title}>Cardiovascular & Heart Drugs</h1>

        <div className={styles.subCategorySelect}>
          <label htmlFor="subcategory">Select Subcategory</label>
          <select
            id="subcategory"
            className={styles.dropdown}
            value={selectedSubCategory}
            onChange={(e) =>
              setSelectedSubCategory(
                e.target.value as CVSProduct["subCategory"]
              )
            }
          >
            {subCategories.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      </header>

      <div className={styles.grid}>
        {products.map((product) => (
          <article key={product.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={product.image}
                alt={product.name}
                width={220}
                height={220}
                className={styles.image}
                priority={false}
              />
              <span className={styles.stockBadge}>{product.stock}</span>
            </div>

            <div className={styles.details}>
              <p className={styles.category}>{product.subCategory}</p>
              <h3 className={styles.name}>{product.name}</h3>
              <p className={styles.price}>
                KES {product.price.toLocaleString()}
              </p>
            </div>

            <div className={styles.actions}>
              <button className={styles.addToCart}>Add to Cart</button>
              <button className={styles.moreInfo}>More Info</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
