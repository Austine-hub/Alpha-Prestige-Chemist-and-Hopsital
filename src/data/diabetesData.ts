// data/diabetesData.ts
import type { StaticImageData } from "next/image";

// === Diabetes Drug Images ===
import pic1 from "../assets/diabetes/1.jpg";
import pic2 from "../assets/diabetes/2.jpg";
import pic3 from "../assets/diabetes/3.jpg";
import pic4 from "../assets/diabetes/4.jpg";
import pic5 from "../assets/diabetes/5.jpg";
import pic6 from "../assets/diabetes/6.jpg";
import pic7 from "../assets/diabetes/7.jpg";
import pic8 from "../assets/diabetes/8.jpg";
import pic9 from "../assets/diabetes/9.jpg";
import pic10 from "../assets/diabetes/10.jpg";
import pic11 from "../assets/diabetes/11.jpg";
import pic12 from "../assets/diabetes/12.jpg";
import pic13 from "../assets/diabetes/13.jpg";
import pic14 from "../assets/diabetes/14.jpg";
import pic15 from "../assets/diabetes/15.jpg";
// === Additional Diabetes Drug Images ===
import pic16 from "../assets/diabetes/Canagliflozin.png";
import pic17 from "../assets/diabetes/saxagliptin.png";
import pic18 from "../assets/diabetes/Liraglutide.png";
import pic19 from "../assets/diabetes/Exenatide.png";
import pic20 from "../assets/diabetes/Teneligliptin.png";

/**
 * Single source of truth for Diabetes product offers.
 * - Maintains typed data (model)
 * - Provides pure helper functions (controller)
 * - Keeps view code (tsx) focused on presentation
 */

/* ===========================
   Types
   =========================== */

export interface Offer {
  id: string;
  name: string;
  image: string | StaticImageData;
  description: string;
  discount: number; // integer percent 0..100
  price: number; // current price (KES)
  oldPrice: number; // original list price (KES)
}

/* ===========================
   Constants & Small Utilities
   =========================== */

const CURRENCY = "KES";
const DEFAULT_NOT_FOUND = "/not-found";

/** clamp discount to a safe integer range */
const sanitizeDiscount = (d: number) =>
  Number.isFinite(d) ? Math.max(0, Math.min(100, Math.round(d))) : 0;

/** round prices to whole numbers (KES typical) */
const roundPrice = (p: number) => Math.round(Number(p) || 0);

/** Build SEO-friendly slug from a product name */
const buildSlug = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Format price for display (keeps view code simple) */
export const formatPrice = (price: number, currency = CURRENCY): string =>
  `${currency} ${roundPrice(price).toLocaleString()}`;

/* ===========================
   Raw Data (Model)
   =========================== */

export const offersData: Offer[] = [
  {
    id: "1",
    name: "Metformin 500mg (Glucophage)",
    image: pic1,
    description:
      "First-line oral biguanide for type 2 diabetes. Improves insulin sensitivity and lowers hepatic glucose output.",
    discount: 10,
    price: 450,
    oldPrice: 500,
  },
  {
    id: "2",
    name: "Glimepiride 2mg",
    image: pic2,
    description:
      "Sulfonylurea that stimulates pancreatic beta cells to release insulin. Often used with metformin.",
    discount: 12,
    price: 620,
    oldPrice: 700,
  },
  {
    id: "3",
    name: "Glipizide 5mg",
    image: pic3,
    description:
      "Oral sulfonylurea enhancing insulin secretion. Useful for moderate type 2 diabetes.",
    discount: 10,
    price: 580,
    oldPrice: 650,
  },
  {
    id: "4",
    name: "Gliclazide MR 60mg",
    image: pic4,
    description:
      "Modified-release sulfonylurea for steady glucose control and lower hypoglycemia risk.",
    discount: 8,
    price: 750,
    oldPrice: 820,
  },
  {
    id: "5",
    name: "Sitagliptin 100mg (Januvia)",
    image: pic5,
    description:
      "DPP-4 inhibitor that enhances incretin hormones, improving insulin release and glucose regulation.",
    discount: 10,
    price: 2900,
    oldPrice: 3200,
  },
  {
    id: "6",
    name: "Vildagliptin 50mg",
    image: pic6,
    description:
      "DPP-4 inhibitor for glycemic control, especially in patients intolerant to metformin.",
    discount: 10,
    price: 1850,
    oldPrice: 2050,
  },
  {
    id: "7",
    name: "Empagliflozin 10mg (Jardiance)",
    image: pic7,
    description:
      "SGLT2 inhibitor that promotes urinary glucose excretion and supports heart protection.",
    discount: 15,
    price: 3300,
    oldPrice: 3800,
  },
  {
    id: "8",
    name: "Dapagliflozin 10mg (Forxiga)",
    image: pic8,
    description:
      "SGLT2 inhibitor used to improve glycemic control and reduce cardiovascular risk in T2DM.",
    discount: 10,
    price: 3100,
    oldPrice: 3450,
  },
  {
    id: "9",
    name: "Insulin Glargine (Lantus)",
    image: pic9,
    description:
      "Long-acting basal insulin maintaining steady glucose levels for 24 hours.",
    discount: 8,
    price: 2500,
    oldPrice: 2700,
  },
  {
    id: "10",
    name: "Insulin Aspart (NovoRapid)",
    image: pic10,
    description:
      "Fast-acting insulin for post-meal glucose spikes. Used with long-acting basal insulin.",
    discount: 10,
    price: 2400,
    oldPrice: 2650,
  },
  {
    id: "11",
    name: "Insulin Detemir (Levemir)",
    image: pic11,
    description:
      "Basal insulin analog providing smooth glucose control with low hypoglycemia risk.",
    discount: 10,
    price: 2600,
    oldPrice: 2850,
  },
  {
    id: "12",
    name: "Pioglitazone 30mg",
    image: pic12,
    description:
      "Thiazolidinedione improving insulin sensitivity. Often combined with metformin.",
    discount: 10,
    price: 850,
    oldPrice: 950,
  },
  {
    id: "13",
    name: "Acarbose 50mg",
    image: pic13,
    description:
      "Alpha-glucosidase inhibitor delaying carbohydrate absorption to reduce postprandial spikes.",
    discount: 10,
    price: 700,
    oldPrice: 780,
  },
  {
    id: "14",
    name: "Linagliptin 5mg (Tradjenta)",
    image: pic14,
    description:
      "Once-daily DPP-4 inhibitor safe for renal impairment and effective in glycemic control.",
    discount: 12,
    price: 2650,
    oldPrice: 3000,
  },
  {
    id: "15",
    name: "Repaglinide 2mg",
    image: pic15,
    description:
      "Meglitinide class drug stimulating insulin release during meals; flexible dosing option.",
    discount: 10,
    price: 950,
    oldPrice: 1050,
  },
  {
    id: "16",
    name: "Canagliflozin 100mg (Invokana)",
    image: pic16,
    description:
      "SGLT2 inhibitor for type 2 diabetes, offering glucose lowering and renal protection benefits.",
    discount: 10,
    price: 3200,
    oldPrice: 3550,
  },
  {
    id: "17",
    name: "Saxagliptin 5mg (Onglyza)",
    image: pic17,
    description:
      "DPP-4 inhibitor improving glycemic control without weight gain; well-tolerated option.",
    discount: 10,
    price: 2700,
    oldPrice: 3000,
  },
  {
    id: "18",
    name: "Liraglutide (Victoza)",
    image: pic18,
    description:
      "GLP-1 receptor agonist promoting weight loss and cardiovascular benefit in type 2 diabetes.",
    discount: 15,
    price: 7200,
    oldPrice: 7800,
  },
  {
    id: "19",
    name: "Exenatide (Byetta)",
    image: pic19,
    description:
      "GLP-1 receptor agonist improving postprandial control and supporting weight reduction.",
    discount: 12,
    price: 6800,
    oldPrice: 7400,
  },
  {
    id: "20",
    name: "Teneligliptin 20mg",
    image: pic20,
    description:
      "DPP-4 inhibitor with long half-life; improves fasting and post-meal glucose levels.",
    discount: 10,
    price: 1800,
    oldPrice: 2000,
  },
];

/* ===========================
   In-memory helpers / cache (controller utilities)
   =========================== */

/**
 * Lightweight lookup cache to speed repeated id lookups in runtime.
 * Not required, but keeps repeated calculations out of view logic.
 */
const idCache = new Map<string, Offer | undefined>();

/* ===========================
   Public API (pure functions)
   =========================== */

/**
 * Get a single offer by id.
 * Returns undefined when not found.
 */
export const getOfferById = (id: string): Offer | undefined => {
  if (!id) return undefined;
  if (idCache.has(id)) return idCache.get(id);
  const found = offersData.find((o) => o.id === id);
  idCache.set(id, found);
  return found;
};

/**
 * Build a product URL for routing (SEO-friendly).
 * Example: `/diabetes/metformin-500mg-glucophage-1`
 */
export const getProductURL = (id: string): string => {
  const offer = getOfferById(id);
  if (!offer) return DEFAULT_NOT_FOUND;
  const slug = buildSlug(offer.name);
  return `/diabetes/${slug}-${offer.id}`;
};

/**
 * Return a shallow copy of all offers (prevents accidental mutation).
 */
export const getAllOffers = (): Offer[] => offersData.map((o) => ({ ...o }));

/**
 * Return offers sorted by discount (descending) — useful for "popular" or "deals" sections.
 */
export const getPopularOffers = (): Offer[] =>
  [...offersData].sort((a, b) => sanitizeDiscount(b.discount) - sanitizeDiscount(a.discount));

/**
 * Basic search (name + description) -> case-insensitive
 */
export const searchOffers = (query: string): Offer[] => {
  const q = (query || "").trim().toLowerCase();
  if (!q) return getAllOffers();
  return offersData.filter(
    (o) => o.name.toLowerCase().includes(q) || o.description.toLowerCase().includes(q)
  );
};

/**
 * Pagination helper for lists (keeps controller/view small).
 * page: 1-indexed
 */
export const paginateOffers = (page = 1, perPage = 8) => {
  const p = Math.max(1, Math.trunc(page));
  const size = Math.max(1, Math.trunc(perPage));
  const start = (p - 1) * size;
  const items = offersData.slice(start, start + size).map((o) => ({ ...o }));
  const total = offersData.length;
  const totalPages = Math.ceil(total / size);
  return { items, page: p, perPage: size, total, totalPages };
};

/**
 * Calculate effective price after discount (rounded).
 * Pure and deterministic.
 */
export const calculateDiscountPrice = (price: number, discount: number): number => {
  const sanitizedDiscount = sanitizeDiscount(discount);
  const base = roundPrice(price);
  const discounted = Math.round(base - (base * sanitizedDiscount) / 100);
  return Math.max(0, discounted);
};

/* ===========================
   Optional exports (convenience)
   =========================== */

export const getOfferPriceDisplay = (offer: Offer) =>
  `${formatPrice(calculateDiscountPrice(offer.price, offer.discount))}`;

export default {
  offersData,
  getOfferById,
  getAllOffers,
  getPopularOffers,
  getProductURL,
  searchOffers,
  paginateOffers,
  calculateDiscountPrice,
  formatPrice,
  getOfferPriceDisplay,
};
