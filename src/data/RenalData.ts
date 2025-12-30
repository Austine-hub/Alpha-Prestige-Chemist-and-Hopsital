// src/data/RenalData.ts

import type { StaticImageData } from "next/image";

import pic1 from "../assets/products/furosemide.png";
import pic2 from "../assets/products/spironolactone.png";
import pic3 from "../assets/products/tamsulosin.png";
import pic4 from "../assets/products/finasteride.png";
import pic5 from "../assets/products/nitrofurantoin.png";
import pic6 from "../assets/products/ciprofloxacin1.png";
import pic7 from "../assets/products/sodiumbicarbonate.png";
import pic8 from "../assets/products/kayexalate.png";
import pic9 from "../assets/products/potassiumcitrate.png";
import pic10 from "../assets/products/erythropoietin.png";
import pic11 from "../assets/products/allopurinol.png";
import pic12 from "../assets/products/hydrochlorothiazide.png";

// ---------------------------------------------------------------------------
// MODEL (Pure data shape — no logic)
// ---------------------------------------------------------------------------
export type StockStatus = "In Stock" | "Out of Stock" | "Low Stock";

export interface RenalProduct {
  id: number;
  name: string;
  slug: string; // first‑class navigation key
  image: string; // always string for <Image /> compatibility
  price: number; // raw numeric price (KES)
  category: string;
  stock: StockStatus;

  // Optional extended fields (already supported by Details page)
  description?: string;
  fullDescription?: string;
  features?: string[];
  howToUse?: string;
}

// ---------------------------------------------------------------------------
// Internal helpers (Controller‑private)
// ---------------------------------------------------------------------------
const slugify = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const safePrice = (value: number): number =>
  Number.isFinite(value) && value > 0 ? value : 0;

// ---------------------------------------------------------------------------
// RAW DATA (Authoritative content)
// Notes: Indications aligned with KDIGO / NICE / BNF general guidance
// ---------------------------------------------------------------------------
const RAW_PRODUCTS: Omit<RenalProduct, "slug">[] = [
  {
    id: 1,
    name: "Furosemide 40mg Tablets (Lasix)",
    image: pic1.src,
    price: 220,
    category: "Renal & Urinary Care",
    stock: "In Stock",
    description: "Loop diuretic for edema and hypertension associated with renal disease.",
    features: [
      "Potent loop diuretic",
      "Used in CKD‑related fluid overload",
      "Rapid onset of action",
    ],
    howToUse: "Take as prescribed; monitor electrolytes and renal function.",
  },
  {
    id: 2,
    name: "Spironolactone 25mg Tablets (Aldactone)",
    image: pic2.src,
    price: 480,
    category: "Renal & Urinary Care",
    stock: "In Stock",
    description: "Potassium‑sparing diuretic and aldosterone antagonist.",
    features: [
      "Reduces proteinuria in CKD",
      "Potassium‑sparing",
      "Used in resistant hypertension",
    ],
  },
  {
    id: 3,
    name: "Tamsulosin 0.4mg Capsules (Flomax)",
    image: pic3.src,
    price: 950,
    category: "Renal & Urinary Care",
    stock: "In Stock",
    description: "Alpha‑1 blocker for lower urinary tract symptoms due to BPH.",
  },
  {
    id: 4,
    name: "Finasteride 5mg Tablets (Proscar)",
    image: pic4.src,
    price: 890,
    category: "Renal & Urinary Care",
    stock: "In Stock",
    description: "5‑alpha reductase inhibitor for benign prostatic hyperplasia.",
  },
  {
    id: 5,
    name: "Nitrofurantoin 100mg Capsules (Macrobid)",
    image: pic5.src,
    price: 720,
    category: "Renal & Urinary Care",
    stock: "In Stock",
    description: "Antibiotic for uncomplicated lower urinary tract infections.",
  },
  {
    id: 6,
    name: "Ciprofloxacin 500mg Tablets",
    image: pic6.src,
    price: 670,
    category: "Renal & Urinary Care",
    stock: "In Stock",
    description: "Fluoroquinolone antibiotic for complicated UTIs.",
  },
  {
    id: 7,
    name: "Sodium Bicarbonate Tablets 500mg",
    image: pic7.src,
    price: 250,
    category: "Renal & Urinary Care",
    stock: "In Stock",
    description: "Used to correct metabolic acidosis in chronic kidney disease.",
  },
  {
    id: 8,
    name: "Calcium Polystyrene Sulfonate Powder (Kayexalate)",
    image: pic8.src,
    price: 1150,
    category: "Renal & Urinary Care",
    stock: "In Stock",
    description: "Potassium‑binding resin for hyperkalemia management.",
  },
  {
    id: 9,
    name: "Potassium Citrate Solution (Ural / Polycitra)",
    image: pic9.src,
    price: 780,
    category: "Renal & Urinary Care",
    stock: "In Stock",
    description: "Urinary alkalinizer for renal tubular acidosis and kidney stones.",
  },
  {
    id: 10,
    name: "Erythropoietin Injection (Eprex 4000 IU)",
    image: pic10.src,
    price: 2800,
    category: "Renal & Urinary Care",
    stock: "In Stock",
    description: "Treatment of anemia of chronic kidney disease.",
  },
  {
    id: 11,
    name: "Allopurinol 300mg Tablets",
    image: pic11.src,
    price: 640,
    category: "Renal & Urinary Care",
    stock: "In Stock",
    description: "Xanthine oxidase inhibitor for hyperuricemia and gout.",
  },
  {
    id: 12,
    name: "Hydrochlorothiazide 25mg Tablets",
    image: pic12.src,
    price: 300,
    category: "Renal & Urinary Care",
    stock: "In Stock",
    description: "Thiazide diuretic for hypertension and nephrolithiasis prevention.",
  },
];

// ---------------------------------------------------------------------------
// NORMALIZED MODEL (SSOT)
// ---------------------------------------------------------------------------
export const PRODUCTS: RenalProduct[] = RAW_PRODUCTS.map((p) => ({
  ...p,
  price: safePrice(p.price),
  slug: slugify(p.name),
}));

// ---------------------------------------------------------------------------
// CONTROLLER (Reusable selectors & helpers)
// ---------------------------------------------------------------------------
const getProductBySlug = (slug?: string): RenalProduct | undefined => {
  if (!slug) return undefined;
  return PRODUCTS.find((p) => p.slug === slug);
};

const getSimilarProducts = (
  currentId: number,
  limit = 4
): RenalProduct[] =>
  PRODUCTS.filter((p) => p.id !== currentId).slice(0, limit);

const formatPrice = (price: number): string =>
  `KES ${price.toLocaleString("en-KE")}`;

const getStockStatus = (product: RenalProduct): StockStatus => product.stock;

// ---------------------------------------------------------------------------
// PUBLIC API (View consumes ONLY this object)
// ---------------------------------------------------------------------------
const renalData = {
  PRODUCTS,
  getProductBySlug,
  getSimilarProducts,
  formatPrice,
  getStockStatus,
};

export type { RenalProduct as renalProduct };
export default renalData;
