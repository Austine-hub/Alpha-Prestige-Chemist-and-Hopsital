// src/app/dropups/cns/[slug]/page.tsx

"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import cnsData, { type cnsProduct } from "@/data/nervousData";
import s from "./CnsDetails.module.css";

const { getProductBySlug, getSimilarProducts, formatPrice, getStockStatus } = cnsData;

type Tab = "features" | "description" | "usage";

export default function CnsDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const product = useMemo(() => getProductBySlug(slug), [slug]);

  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<Tab>("features");
  const [imgLoaded, setImgLoaded] = useState(false);
  const [adding, setAdding] = useState(false);

  const inStock = product?.stock === "In Stock";
  const similar = useMemo(() => product ? getSimilarProducts(product.id, 4) : [], [product]);

  useEffect(() => {
    if (!product) router.replace("/404");
  }, [product, router]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setQty(1);
    setTab("features");
    setImgLoaded(false);
  }, [slug]);

  const updateQty = useCallback((val: number) => setQty(Math.max(1, Math.min(99, val))), []);

  const handleAdd = useCallback(() => {
    if (!product || !inStock || adding) return;
    setAdding(true);
    setTimeout(() => {
      console.log(`Added ${qty} × ${product.name}`);
      setAdding(false);
    }, 600);
  }, [product, qty, inStock, adding]);

  if (!product) {
    return (
      <section className={s.container}>
        <div className={s.skeleton}>
          <div className={s.skeletonImg} />
          <div className={s.skeletonContent}>
            <div className={s.skeletonTitle} />
            <div className={s.skeletonText} />
            <div className={s.skeletonBtn} />
          </div>
        </div>
      </section>
    );
  }

   const tabs: Record<Tab, React.ReactNode> = {
    features: (
      <ul className={s.features}>
        {(product.features ?? ["Clinically validated use", "Guideline-aligned therapy", "Standard pharmaceutical manufacturing"]).map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    ),
    description: <div className={s.desc}><p>{product.fullDescription ?? product.description}</p></div>,
    usage: (
      <div className={s.usage}>
        <p><strong>Indications:</strong></p>
        <ul>{product.indications.map((ind, i) => <li key={i}>{ind}</li>)}</ul>
        <p className={s.warning}>⚠️ Use strictly as prescribed by a qualified healthcare professional.</p>
      </div>
    ),
  };

  return (
    <section className={s.container}>
      <nav className={s.breadcrumb}>
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/system/cns">CNS System</Link>
        <span>/</span>
        <span>{product.name}</span>
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
            onLoad={() => setImgLoaded(true)}
            className={`${s.img} ${imgLoaded ? s.imgLoaded : ""}`}
          />
          {!inStock && <div className={s.outBadge}>Out of Stock</div>}
        </div>

        <div className={s.info}>
          <span className={s.category}>{product.category}</span>
          <h1 className={s.title}>{product.name}</h1>

          <div className={s.priceRow}>
            <span className={s.price}>{formatPrice(product.price)}</span>
            <span className={`${s.stock} ${inStock ? s.stockIn : s.stockOut}`}>
              {getStockStatus(product)}
            </span>
          </div>

          <div className={s.tabs}>
            <div className={s.tabBtns}>
              {(Object.keys(tabs) as Tab[]).map(k => (
                <button key={k} className={tab === k ? s.tabActive : ""} onClick={() => setTab(k)}>
                  {k.toUpperCase()}
                </button>
              ))}
            </div>
            <div className={s.tabContent}>{tabs[tab]}</div>
          </div>

          <div className={s.actions}>
            <div className={s.qtyWrap}>
              <button onClick={() => updateQty(qty - 1)} disabled={!inStock}>−</button>
              <input value={qty} readOnly />
              <button onClick={() => updateQty(qty + 1)} disabled={!inStock}>+</button>
            </div>
            <button className={s.cartBtn} disabled={!inStock || adding} onClick={handleAdd}>
              {adding ? "Adding…" : inStock ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </article>

      {similar.length > 0 && (
        <section className={s.similar}>
          <h2>You May Also Like</h2>
          <div className={s.grid}>
            {similar.map(item => (
              <Link key={item.slug} href={`/dropups/cns/${item.slug}`} className={s.card}>
                <Image src={item.image} alt={item.name} width={220} height={220} />
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