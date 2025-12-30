// ============================================================================
// src/components/offers/Offers.tsx
// Clean • DRY • Optimized • No Pop-up Modal • Slug Navigation
// ============================================================================

"use client";

import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./Offers.module.css";
import {
  otcProducts,
  WHATSAPP_NUMBER,
  WHATSAPP_MESSAGE,
} from "@/data/otc.data";

const Offers: React.FC = memo(() => {
  const router = useRouter();

  // --------------------------------------------------------------------------
  // WhatsApp Order Handler
  // --------------------------------------------------------------------------
  const handleWhatsAppOrder = (productName: string) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}%20${encodeURIComponent(
      productName
    )}`;
    window.open(url, "_blank");
  };

  // --------------------------------------------------------------------------
  // Navigate to Product Details Page Using Slug
  // --------------------------------------------------------------------------
  const goToProductPage = (slug: string) => {
    router.push(`/dropdowns/otc/${slug}`);
  };

  return (
    <section className={styles.offersSection}>
      {/* ---------------------------------- HEADER ---------------------------------- */}
      <div className={styles.header}>
        <h2 className={styles.title}>Top OTC Pharmacy Offers</h2>

        <Link href="/buy-medicines" className={styles.viewAll}>
          View all offers →
        </Link>
      </div>

      {/* ----------------------------------- GRID ----------------------------------- */}
      <div className={styles.offersGrid}>
        {otcProducts.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.discountTag}>-{item.discount}%</div>

            {/* Navigate to product page on image click */}
            <div
              className={styles.imageWrapper}
              onClick={() => goToProductPage(item.slug)}
            >
              <Image
                src={item.image}
                alt={item.name}
                className={styles.productImage}
                loading="lazy"
              />
            </div>

            {/* Product Info */}
            <div className={styles.info}>
              <p className={styles.name}>{item.name}</p>

              <div className={styles.prices}>
                <span className={styles.newPrice}>
                  KSh {item.price.toLocaleString()}
                </span>
                <span className={styles.oldPrice}>
                  KSh {item.oldPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className={styles.actions}>
              <button
                className={styles.addToCart}
                onClick={() => handleWhatsAppOrder(item.name)}
              >
                Order via WhatsApp
              </button>

              <button
                className={styles.viewProduct}
                onClick={() => goToProductPage(item.slug)}
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default Offers;
