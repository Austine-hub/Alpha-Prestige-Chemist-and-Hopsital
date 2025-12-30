// src/app/dropups/git/[slug]/page.tsx

"use client";

import { useState, useEffect, useMemo, useCallback, type ReactNode } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import gitData, { type GitProduct } from "@/data/gitData";
import s from "./GitDetails.module.css";

const { getProductBySlug, getSimilarProducts, formatPrice, getStockStatus } = gitData;

type Tab = "features" | "description" | "usage";

export default function GitDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const product = useMemo(() => slug ? getProductBySlug(slug) : undefined, [slug]);

  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<Tab>("features");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [adding, setAdding] = useState(false);

  const inStock = product?.stock === "In Stock";
  const similar = useMemo(() => product ? getSimilarProducts(product.id, 4) : [], [product]);

  useEffect(() => {
    if (slug && !product) router.replace("/404");
  }, [slug, product, router]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setQty(1);
    setTab("features");
    setImgLoaded(false);
  }, [slug]);

  const updateQty = useCallback((val: number) => setQty(Math.max(1, Math.min(99, val))), []);

  const addToCart = useCallback(() => {
    if (!product || !inStock || adding) return;
    setAdding(true);
    setTimeout(() => {
      console.log(`Added ${qty}x ${product.name}`);
      setAdding(false);
    }, 600);
  }, [product, qty, inStock, adding]);

  if (!product) {
    return (
      <div className={s.container}>
        <div className={s.skeleton}>
          <div className={s.skeletonImg} />
          <div className={s.skeletonContent}>
            <div className={s.skeletonTitle} />
            <div className={s.skeletonText} />
            <div className={s.skeletonBtn} />
          </div>
        </div>
      </div>
    );
  }

  const tabs: Record<Tab, ReactNode> = {
    features: (
      <ul className={s.features}>
        {(product.features ?? [
          "Clinically effective for GIT conditions",
          "Manufactured under strict pharmaceutical standards",
          "Reliable therapeutic outcomes",
          "Widely used in gastrointestinal treatment protocols",
        ]).map((f, i) => <li key={i}>{f}</li>)}
      </ul>
    ),
    description: <div className={s.desc}><p>{product.fullDescription ?? product.description}</p></div>,
    usage: (
      <div className={s.usage}>
        <p><strong>How to use:</strong> {product.howToUse ?? "Use exactly as prescribed by a qualified healthcare professional."}</p>
        <p><strong>Storage:</strong> Store in a cool, dry place away from sunlight.</p>
        <p className={s.warn}>⚠️ Always follow professional medical advice before use.</p>
      </div>
    ),
  };

  return (
    <section className={s.container}>
      <nav className={s.breadcrumb} aria-label="Breadcrumb">
        <Link href="/" className={s.bcLink}>Home</Link>
        <span className={s.bcSep}>/</span>
        <Link href="/system/git" className={s.bcLink}>GIT System</Link>
        <span className={s.bcSep}>/</span>
        <span className={s.bcCurrent}>{product.name}</span>
      </nav>

      <article className={s.details}>
        <div className={s.imgWrap}>
          <div className={s.imgContainer}>
            {!imgLoaded && <div className={s.imgPlaceholder} />}
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              priority
              onLoad={() => setImgLoaded(true)}
              className={`${s.img} ${imgLoaded ? s.imgLoaded : ""}`}
            />
          </div>
          {!inStock && <div className={s.outBadge}>Out of Stock</div>}
        </div>

        <div className={s.info}>
          <header className={s.header}>
            <span className={s.cat}>{product.category}</span>
            <h1 className={s.title}>{product.name}</h1>
          </header>

          <div className={s.priceSection}>
            <span className={s.price}>{formatPrice(product.price)}</span>
            <span className={`${s.stock} ${inStock ? s.stockIn : s.stockOut}`}>
              {getStockStatus(product)}
            </span>
          </div>

          <div className={s.tabs}>
            <div className={s.tabBtns} role="tablist">
              {(Object.keys(tabs) as Tab[]).map((k) => (
                <button
                  key={k}
                  role="tab"
                  aria-selected={tab === k}
                  className={`${s.tabBtn} ${tab === k ? s.tabActive : ""}`}
                  onClick={() => setTab(k)}
                >
                  {k.charAt(0).toUpperCase() + k.slice(1)}
                </button>
              ))}
            </div>
            <div className={s.tabContent} role="tabpanel">{tabs[tab]}</div>
          </div>

          <div className={s.actions}>
            <div className={s.qtyControl}>
              <label className={s.qtyLabel}>Quantity</label>
              <div className={s.qtyBtns}>
                <button className={s.qtyBtn} onClick={() => updateQty(qty - 1)} disabled={!inStock || qty <= 1}>−</button>
                <input type="number" className={s.qtyInput} value={qty} min={1} max={99} disabled={!inStock} onChange={(e) => updateQty(Number(e.target.value))} />
                <button className={s.qtyBtn} onClick={() => updateQty(qty + 1)} disabled={!inStock || qty >= 99}>+</button>
              </div>
            </div>
            <button className={`${s.addBtn} ${!inStock || adding ? s.disabled : ""}`} onClick={addToCart} disabled={!inStock || adding}>
              {adding ? "Adding…" : inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </article>

      {similar.length > 0 && (
        <section className={s.similar}>
          <h2 className={s.similarTitle}>You May Also Like</h2>
          <div className={s.similarGrid}>
            {similar.map((item) => (
              <Link key={item.slug} href={`/dropups/git/${item.slug}`} className={s.card}>
                <div className={s.cardImgWrap}>
                  <Image src={item.image} alt={item.name} width={240} height={240} className={s.cardImg} />
                </div>
                <div className={s.cardInfo}>
                  <h3 className={s.cardName}>{item.name}</h3>
                  <p className={s.cardPrice}>{formatPrice(item.price)}</p>
                  <span className={s.cardView}>View Details →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </section>
  );
}