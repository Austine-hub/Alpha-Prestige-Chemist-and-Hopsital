// src/app/wishlist/page.tsx

'use client';

import { useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import styles from './wishlist.module.css';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, items: cartItems } = useCart();

  const handleAddToCart = useCallback(
    (item: typeof wishlist[0]) => {
      addToCart({ ...item, quantity: 1, inStock: true, stock: 999 });
      removeFromWishlist(item.id);
    },
    [addToCart, removeFromWishlist]
  );

  const handleAddAllToCart = useCallback(() => {
    wishlist.forEach((item) => {
      addToCart({ ...item, quantity: 1, inStock: true, stock: 999 });
    });
    clearWishlist();
  }, [wishlist, addToCart, clearWishlist]);

  const isInCart = useCallback(
    (id: string) => cartItems.some((item) => item.id === id),
    [cartItems]
  );

  const totalValue = useMemo(
    () => wishlist.reduce((sum, item) => sum + item.price, 0),
    [wishlist]
  );

  if (wishlist.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h1>Your Wishlist is Empty</h1>
          <p>Save items for future reference. Your wishlist is private and secure.</p>
          <Link href="/" className={styles.browseBtn}>Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <h1>My Wishlist</h1>
            <span className={styles.itemCount}>
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          <div className={styles.headerActions}>
            <button onClick={handleAddAllToCart} className={styles.addAllBtn}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add All to Cart
            </button>
            <button onClick={clearWishlist} className={styles.clearBtn}>Clear Wishlist</button>
          </div>
        </header>

        <div className={styles.summary}>
          <span className={styles.summaryLabel}>Total Value</span>
          <span className={styles.summaryValue}>KSh {totalValue.toLocaleString()}</span>
        </div>

        <div className={styles.grid}>
          {wishlist.map((item) => {
            const inCart = isInCart(item.id);
            return (
              <article key={item.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image src={item.image} alt={item.name} width={280} height={280} className={styles.image} />
                  <button onClick={() => removeFromWishlist(item.id)} className={styles.removeBtn} aria-label="Remove from wishlist">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <h2 className={styles.itemName}>{item.name}</h2>
                    {item.brand && <span className={styles.brand}>{item.brand}</span>}
                    {item.category && <span className={styles.category}>{item.category}</span>}
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.price}>KSh {item.price.toLocaleString()}</span>
                    {inCart ? (
                      <Link href="/cart" className={styles.inCartBtn}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        In Cart
                      </Link>
                    ) : (
                      <button onClick={() => handleAddToCart(item)} className={styles.addBtn}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className={styles.actions}>
          <Link href="/" className={styles.continueBtn}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}