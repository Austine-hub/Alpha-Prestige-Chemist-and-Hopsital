
'use client'

import React, { useState, useMemo } from "react";
import styles from "./Women.module.css";

// ===============================
// ✅ Modernized Type Definition
// ===============================
interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  stock: 'In Stock' | 'Out of Stock';
  subCategory: string;
}

// ===============================
// ✅ Clean Product Data 
// Images served from: /public/WomenHealth/
// ===============================
const PRODUCTS: Product[] = [
  { id: 1, name: "Ethinylestradiol + Levonorgestrel", image: "/WomenHealth/Contraceptive.png", price: 850, category: "Women's Health", subCategory: "Contraception", stock: "In Stock" },
  { id: 2, name: "Levonorgestrel (Plan B)", image: "/WomenHealth/EmergencyPill.png", price: 620, category: "Women's Health", subCategory: "Emergency Contraception", stock: "In Stock" },
  { id: 3, name: "Estradiol", image: "/WomenHealth/Estradiol.png", price: 1100, category: "Women's Health", subCategory: "Menopause Management", stock: "In Stock" },
  { id: 4, name: "Clomiphene Citrate", image: "/WomenHealth/Clomiphene.png", price: 970, category: "Women's Health", subCategory: "Fertility", stock: "In Stock" },
  { id: 5, name: "Letrozole", image: "/WomenHealth/Letrozole.png", price: 1250, category: "Women's Health", subCategory: "Fertility", stock: "In Stock" },
  { id: 6, name: "Metformin", image: "/WomenHealth/Metformin.png", price: 430, category: "Women's Health", subCategory: "PCOS Management", stock: "In Stock" },
  { id: 7, name: "Nitrofurantoin", image: "/WomenHealth/Nitrofurantoin.png", price: 680, category: "Women's Health", subCategory: "Urinary Tract Infection", stock: "In Stock" },
  { id: 8, name: "Fluconazole", image: "/WomenHealth/Fluconazole.png", price: 550, category: "Women's Health", subCategory: "Vaginal Candidiasis", stock: "In Stock" },
  { id: 9, name: "Ferrous Sulfate", image: "/WomenHealth/FerrousSulfate.png", price: 400, category: "Women's Health", subCategory: "Iron-Deficiency Anemia", stock: "In Stock" },
  { id: 10, name: "Folic Acid", image: "/WomenHealth/FolicAcid.png", price: 350, category: "Women's Health", subCategory: "Pregnancy Support", stock: "In Stock" },
];

const WomenHealthShop: React.FC = () => {
  // Use the first category as default or "All"
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("Contraception");

  // Memoize subcategories so they don't recalculate unless PRODUCTS change
  const subCategories = useMemo(() => 
    Array.from(new Set(PRODUCTS.map((p) => p.subCategory))), 
  []);

  // Memoize filtered list for performance
  const filteredProducts = useMemo(() => 
    PRODUCTS.filter((p) => p.subCategory === selectedSubCategory),
    [selectedSubCategory]
  );

  return (
    <section className={styles.shopSection}>
      <header className={styles.header}>
        <h2 className={styles.title}>Women’s Health & Wellness</h2>
        
        <div className={styles.filterContainer}>
          <label htmlFor="subcategory" className={styles.label}>Filter by Category:</label>
          <select
            id="subcategory"
            className={styles.dropdown}
            value={selectedSubCategory}
            onChange={(e) => setSelectedSubCategory(e.target.value)}
          >
            {subCategories.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>
      </header>

      <div className={styles.grid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className={styles.emptyState}>No products found in this category.</p>
        )}
      </div>
    </section>
  );
};

// ===============================
// ✅ Extracted Sub-Component for Clarity
// ===============================
const ProductCard = ({ product }: { product: Product }) => (
  <article className={styles.card}>
    <div className={styles.imageWrapper}>
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className={styles.image}
      />
      <span className={`${styles.stockBadge} ${product.stock !== 'In Stock' ? styles.outOfStock : ''}`}>
        {product.stock}
      </span>
    </div>

    <div className={styles.details}>
      <span className={styles.categoryTag}>{product.subCategory}</span>
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.price}>
        <span className={styles.currency}>KES</span> {product.price.toLocaleString()}
      </p>
    </div>

    <div className={styles.actions}>
      <button className={styles.addToCart}>Add to Cart</button>
      <button className={styles.moreInfo}>Details</button>
    </div>
  </article>
);

export default WomenHealthShop;