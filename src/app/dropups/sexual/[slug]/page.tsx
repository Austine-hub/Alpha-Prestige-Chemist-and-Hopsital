//src/app/dropups/sexual/[slug]/page.tsx
"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  type Product,
  getProductBySlug,
  getSimilarProducts,
  formatPrice,
  normalizeSlug,
} from "@/data/details/sexualData";
import s from "./SexualDetails.module.css";

type Tab = "features" | "description" | "usage";

export default function SexualDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const product = useMemo<Product | undefined>(() => getProductBySlug(slug), [slug]);
  const inStock = (product?.stock ?? 0) > 0;

  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<Tab>("features");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!product) router.replace("/404");
  }, [product, router]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setQty(1);
    setTab("features");
    setImgLoaded(false);
  }, [slug]);

  const similar = useMemo(() => (product ? getSimilarProducts(product.id, 4) : []), [product]);

  const updateQty = useCallback((v: number) => setQty(Math.max(1, Math.min(99, v))), []);

  const handleCart = useCallback(() => {
    if (!product || !inStock || adding) return;
    setAdding(true);
    setTimeout(() => {
      console.log(`Added ${qty} × ${product.name}`);
      setAdding(false);
    }, 800);
  }, [product, inStock, adding, qty]);

  if (!product) {
    return (
      <div className={s.container}>
        <div className={s.skeleton}>
          <div className={s.skelImg} />
          <div className={s.skelContent}>
            <div className={s.skelTitle} />
            <div className={s.skelText} />
            <div className={s.skelText} />
            <div className={s.skelBtn} />
          </div>
        </div>
      </div>
    );
  }

  const tabs = {
    features: (
      <ul className={s.features}>
        {(product.features ?? []).map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    ),
    description: (
      <div className={s.desc}>
        <p>{product.fullDescription ?? product.description}</p>
      </div>
    ),
    usage: (
      <div className={s.usage}>
        <p><strong>How to Use:</strong> {product.howToUse ?? "Use as directed by healthcare professional."}</p>
        <p className={s.warn}>⚠️ Always seek medical advice before use.</p>
      </div>
    ),
  };

  return (
    <section className={s.container}>
      <nav className={s.breadcrumb} aria-label="Breadcrumb">
        <Link href="/" className={s.bcLink}>Home</Link>
        <span className={s.bcSep}>/</span>
        <Link href="/system/reproductive" className={s.bcLink}>Reproductive System</Link>
        <span className={s.bcSep}>/</span>
        <span className={s.bcCur}>{product.name}</span>
      </nav>

      <article className={s.details}>
        <div className={s.imgWrap}>
          {!imgLoaded && <div className={s.imgPlaceholder} />}
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            priority
            className={`${s.img} ${imgLoaded ? s.imgLoaded : ""}`}
            onLoad={() => setImgLoaded(true)}
          />
          {!inStock && <span className={s.outBadge}>Out of Stock</span>}
        </div>

        <div className={s.info}>
          <span className={s.cat}>{product.category}</span>
          <h1 className={s.title}>{product.name}</h1>

          <div className={s.priceWrap}>
            <span className={s.price}>{formatPrice(product.price)}</span>
            {product.oldPrice && <span className={s.oldPrice}>{formatPrice(product.oldPrice)}</span>}
            <span className={`${s.badge} ${inStock ? s.inStock : s.outStock}`}>
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className={s.tabs}>
            <div className={s.tabBtns}>
              {(["features", "description", "usage"] as const).map((k) => (
                <button
                  key={k}
                  className={`${s.tabBtn} ${tab === k ? s.tabActive : ""}`}
                  onClick={() => setTab(k)}
                >
                  {k.charAt(0).toUpperCase() + k.slice(1)}
                </button>
              ))}
            </div>
            <div className={s.tabContent}>{tabs[tab]}</div>
          </div>

          <div className={s.actions}>
            <div className={s.qtyWrap}>
              <label className={s.qtyLabel}>Quantity</label>
              <div className={s.qtyBtns}>
                <button className={s.qtyBtn} onClick={() => updateQty(qty - 1)} disabled={qty <= 1}>−</button>
                <input
                  type="number"
                  className={s.qtyInput}
                  value={qty}
                  min={1}
                  max={99}
                  onChange={(e) => updateQty(Number(e.target.value))}
                  disabled={!inStock}
                />
                <button className={s.qtyBtn} onClick={() => updateQty(qty + 1)} disabled={qty >= 99}>+</button>
              </div>
            </div>

            <button className={`${s.cartBtn} ${!inStock || adding ? s.disabled : ""}`} onClick={handleCart} disabled={!inStock || adding}>
              <svg className={s.cartIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {adding ? "Adding..." : inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </article>

      {similar.length > 0 && (
        <section className={s.similar}>
          <h2 className={s.simTitle}>You May Also Like</h2>
          <div className={s.simGrid}>
            {similar.map((item) => (
              <Link key={item.slug} href={`/dropups/sexual/${normalizeSlug(item.slug)}`} className={s.simCard}>
                <div className={s.simImgWrap}>
                  <Image src={item.image} alt={item.name} width={200} height={200} className={s.simImg} />
                </div>
                <div className={s.simInfo}>
                  <h3 className={s.simName}>{item.name}</h3>
                  <p className={s.simPrice}>{formatPrice(item.price)}</p>
                  <span className={s.simView}>View Details →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}