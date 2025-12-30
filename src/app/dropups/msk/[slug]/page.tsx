//src/app/dropups/msk/%5Bslug%5D/page.tsx

"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";

import { useMskProductDetails } from "@/viewmodels/msk/useMskProductDetails";
import s from "./MSK.module.css";

/* -------------------------------------------------------------------------- */
/* Tabs                                                                        */
/* -------------------------------------------------------------------------- */

type TabKey = "features" | "description" | "usage";

/**
 * NOTE:
 * - React.ReactNode is used instead of JSX.Element
 * - Product type is inferred from the ViewModel (MVVM-safe)
 */
const TABS: Record<TabKey, (p: any) => React.ReactNode> = {
  features: (p) => (
    <ul className={s.list}>
      {p.features?.length ? (
        p.features.map((feature: string, i: number) => (
          <li key={`${p.id}-feature-${i}`}>{feature}</li>
        ))
      ) : (
        <li>No listed features</li>
      )}
    </ul>
  ),

  description: (p) => (
    <p>{p.fullDescription ?? p.description ?? "No description available."}</p>
  ),

  usage: (p) => (
    <>
      <p>
        <strong>How to Use:</strong>{" "}
        {p.howToUse ?? "Use as directed by a healthcare professional."}
      </p>
      <p className={s.warn}>⚠️ Always consult your doctor.</p>
    </>
  ),
};

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

function MskDetailsPage() {
  const {
    product,
    similar,
    qty,
    tab,
    inStock,
    adding,
    setTab,
    updateQty,
    handleAddToCart,
    formatPrice,
    normalizeSlug,
  } = useMskProductDetails();

  /* ------------------------------------------------------------------------ */
  /* Loading / Not found                                                      */
  /* ------------------------------------------------------------------------ */

  if (!product) {
    return (
      <section className={s.container}>
        <div className={s.skeleton} />
      </section>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Render                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <section className={s.container}>
      {/* Breadcrumb */}
      <nav className={s.bc}>
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/system/msk">Musculoskeletal</Link>
        <span>/</span>
        <span>{product.name}</span>
      </nav>

      {/* Product */}
      <article className={s.grid}>
        <div className={s.img}>
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            priority
          />
          {!inStock && <span className={s.badge}>Out of Stock</span>}
        </div>

        <div className={s.info}>
          <span className={s.cat}>{product.category}</span>
          <h1>{product.name}</h1>
          <div className={s.price}>{formatPrice(product.price)}</div>

          {/* Tabs */}
          <div className={s.tabs}>
            <div className={s.btns}>
              {(Object.keys(TABS) as TabKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={tab === key ? s.act : ""}
                  onClick={() => setTab(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>

            <div className={s.content}>{TABS[tab](product)}</div>
          </div>

          {/* Actions */}
          <div className={s.actions}>
            <div className={s.qty}>
              <button
                type="button"
                onClick={() => updateQty(qty - 1)}
                disabled={qty <= 1 || !inStock}
              >
                −
              </button>

              <input value={qty} readOnly />

              <button
                type="button"
                onClick={() => updateQty(qty + 1)}
                disabled={!inStock}
              >
                +
              </button>
            </div>

            <button
              type="button"
              className={s.cart}
              disabled={!inStock || adding}
              onClick={handleAddToCart}
            >
              {adding ? "Adding..." : inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </article>

      {/* -------------------------------------------------------------------- */}
      {/* You May Also Like                                                     */}
      {/* -------------------------------------------------------------------- */}

      {similar.length > 0 && (
        <section className={s.similar}>
          <h2>You May Also Like</h2>

          <div className={s.simGrid}>
            {similar.map((item: any) => (
              <Link
                key={item.id}
                href={`/dropups/msk/${normalizeSlug(item.slug)}`}
                className={s.simCard}
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={200}
                  height={200}
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
}

export default memo(MskDetailsPage);
