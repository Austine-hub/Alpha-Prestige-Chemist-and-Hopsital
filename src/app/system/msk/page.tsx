//src/app/system/msk/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import { useMskProducts } from "@/viewmodels/msk/useMskProducts";
import styles from "./MSK.module.css";

const MSKPage = memo(function MSKPage() {
  const { products, formatPrice, normalizeSlug } = useMskProducts();

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h1>Joint Supplements</h1>
        <p className={styles.sub}>
          Support mobility, flexibility, and joint health
        </p>
      </header>

      <div className={styles.grid}>
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/dropups/msk/${normalizeSlug(p.slug)}`}
            className={styles.card}
            aria-label={`View details for ${p.name}`}
          >
            <div className={styles.imageWrap}>
              <Image
                src={p.image}
                alt={p.name}
                width={220}
                height={220}
                loading="lazy"
              />

              {!p.inStock && (
                <span className={styles.outBadge}>Out of Stock</span>
              )}
            </div>

            <div className={styles.info}>
              <p className={styles.name}>{p.name}</p>
              <p className={styles.price}>{formatPrice(p.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
});

export default MSKPage;
