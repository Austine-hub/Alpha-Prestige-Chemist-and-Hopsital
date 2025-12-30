//src/app/compare/page.tsx

'use client';

import { useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import styles from './Compare.module.css';

export default function ComparePage() {
  const { items, removeItem, clearCompare, isInitialized } = useCompare();
  const { addItem: addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = useCallback(
    (item: typeof items[0]) => {
      addToCart({
        ...item,
        quantity: 1,
        inStock: item.inStock ?? true,
        stock: item.stock ?? 999,
      });
    },
    [addToCart]
  );


  const handleAddToWishlist = useCallback(
  (item: typeof items[0]) => {
    if (!isInWishlist(item.id)) {
      addToWishlist({
        ...item,
        image: typeof item.image === "string" ? item.image : item.image.src,
      });
    }
  },
  [addToWishlist, isInWishlist]
);


  const comparisonData = useMemo(() => {
    if (items.length === 0) return null;

    const attributes = [
      { key: 'price', label: 'Price', format: (val: number) => `KSh ${val.toLocaleString()}` },
      { key: 'category', label: 'Category', format: (val: string) => val || 'N/A' },
      { key: 'stock', label: 'Stock', format: (val: number) => val > 10 ? 'In Stock' : `Only ${val} left` },
      { key: 'badge', label: 'Badge', format: (val: string) => val || '—' },
      { key: 'description', label: 'Description', format: (val: string) => val || 'No description available' },
    ];

    return attributes;
  }, [items]);

  if (!isInitialized) {
    return (
      <div className={styles.container}>
        <div className={styles.loader}>
          <div className={styles.spinner} />
          <p>Loading comparison...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h2>No products to compare</h2>
          <p>Add products to your comparison list to see them side-by-side</p>
          <Link href="/" className={styles.shopBtn}>Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Product Comparison</h1>
          <p>Compare {items.length} {items.length === 1 ? 'product' : 'products'} side-by-side</p>
        </div>
        {items.length > 0 && (
          <button onClick={clearCompare} className={styles.clearBtn}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear All
          </button>
        )}
      </header>

      <div className={styles.compareWrapper}>
        <div className={styles.compareTable}>
          {/* Product Cards Row */}
          <div className={styles.productsRow}>
            <div className={styles.labelCell}>
              <span className={styles.rowLabel}>Products</span>
            </div>
            {items.map((item) => (
              <div key={item.id} className={styles.productCard}>
                <button 
                  onClick={() => removeItem(item.id)} 
                  className={styles.removeBtn}
                  aria-label="Remove from comparison"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <div className={styles.productImage}>
                  <Image src={item.image} alt={item.name} width={150} height={150} />
                  {item.badge && <span className={styles.productBadge}>{item.badge}</span>}
                </div>
                
                <h3 className={styles.productName}>{item.name}</h3>
                
                <div className={styles.productActions}>
                  <button 
                    onClick={() => handleAddToCart(item)} 
                    className={styles.addToCartBtn}
                    disabled={!item.inStock}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  <button 
                    onClick={() => handleAddToWishlist(item)} 
                    className={styles.wishlistBtn}
                    disabled={isInWishlist(item.id)}
                  >
                    <svg viewBox="0 0 24 24" fill={isInWishlist(item.id) ? 'currentColor' : 'none'} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
            {/* Empty slots for better layout */}
            {items.length < 4 && Array.from({ length: 4 - items.length }).map((_, idx) => (
              <div key={`empty-${idx}`} className={styles.emptySlot}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add Product</span>
              </div>
            ))}
          </div>

          {/* Comparison Rows */}
          {comparisonData?.map((attr) => (
            <div key={attr.key} className={styles.compareRow}>
              <div className={styles.labelCell}>
                <span className={styles.rowLabel}>{attr.label}</span>
              </div>
              {items.map((item) => {
                const value = item[attr.key as keyof typeof item];
                const displayValue = value !== undefined && value !== null 
                  ? attr.format(value as never) 
                  : '—';
                
                const isLowest = attr.key === 'price' && 
                  typeof value === 'number' && 
                  value === Math.min(...items.map(i => i.price));

                return (
                  <div 
                    key={item.id} 
                    className={`${styles.valueCell} ${isLowest ? styles.bestValue : ''}`}
                  >
                    {isLowest && attr.key === 'price' && (
                      <span className={styles.bestBadge}>Best Price</span>
                    )}
                    <span className={styles.value}>{displayValue}</span>
                  </div>
                );
              })}
              {items.length < 4 && Array.from({ length: 4 - items.length }).map((_, idx) => (
                <div key={`empty-${idx}`} className={styles.valueCell}>
                  <span className={styles.value}>—</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <Link href="/" className={styles.continueBtn}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}