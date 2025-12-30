// ============================================================================
// /conditions/htn/page.tsx — Hypertension Product Grid (VIEW Layer)
// Clean • DRY • MVC • Minimal • Modern Next.js 16
// ============================================================================

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { htnProducts, type Product, formatPrice } from "@/data/HTNData";
import styles from "./PharmacyProducts.module.css";

const Stars = ({ rating }: { rating: number }) => (
  <div className={styles.rating} aria-label={`${rating} stars`}>
    {[...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? styles.filled : styles.empty}>★</span>
    ))}
  </div>
);

export default function Page() {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [cart, setCart] = useState<Set<number>>(new Set());

  const toggleFav = (id: number) => {
    const next = new Set(favorites);
    next.has(id) ? next.delete(id) : next.add(id);
    setFavorites(next);
  };

  const addCart = (id: number) => setCart(new Set(cart).add(id));

  return (
    <main className={styles.main}>
      <header className={styles.hero}>
        <h1>Hypertension Products</h1>
        <p>Premium medications, exceptional care</p>
      </header>

      <section className={styles.grid}>
        {htnProducts.map((p: Product) => {
          const isFav = favorites.has(p.id);
          const inCart = cart.has(p.id);

          return (
            <article key={p.id} className={styles.card}>
              <Link href={`/dropups/htn/${p.slug}`} className={styles.cardLink}>
                {p.badge && <span className={`${styles.badge} ${styles[p.badge.toLowerCase()]}`}>{p.badge}</span>}
                
                <button
                  className={`${styles.fav} ${isFav ? styles.active : ""}`}
                  onClick={(e) => { e.preventDefault(); toggleFav(p.id); }}
                  aria-label={isFav ? "Remove favorite" : "Add favorite"}
                >
                  <svg viewBox="0 0 24 24" fill={isFav ? "currentColor" : "none"} stroke="currentColor">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>

                <div className={styles.img}>
                  <Image src={p.image} alt={p.name} width={240} height={240} />
                </div>

                <div className={styles.info}>
                  <h2>{p.name}</h2>
                  <Stars rating={p.rating} />
                  
                  <div className={styles.price}>
                    <span className={styles.now}>{formatPrice(p.price)}</span>
                    {p.originalPrice && <span className={styles.was}>{formatPrice(p.originalPrice)}</span>}
                  </div>
                </div>
              </Link>

              <div className={styles.actions}>
                <button
                  className={styles.cartBtn}
                  onClick={() => addCart(p.id)}
                  disabled={inCart}
                >
                  {inCart ? (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Added
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}