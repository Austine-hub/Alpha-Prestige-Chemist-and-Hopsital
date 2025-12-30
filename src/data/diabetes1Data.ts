// ============================================================================
// diabetes1Data.ts — SINGLE SOURCE OF TRUTH (Model + Controller Layer)
// Clean • DRY • Type-Safe • Slug-Stable • Next.js 16 Optimized
// ============================================================================

import type { StaticImageData } from "next/image";

// ===========================
// IMAGES
// ===========================
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

import pic16 from "../assets/diabetes/Canagliflozin.png";
import pic17 from "../assets/diabetes/saxagliptin.png";
import pic18 from "../assets/diabetes/Liraglutide.png";
import pic19 from "../assets/diabetes/Exenatide.png";
import pic20 from "../assets/diabetes/Teneligliptin.png";

// ============================================================================
// TYPES
// ============================================================================
export interface Offer {
  id: string;
  name: string;
  slug: string;
  image: StaticImageData | string;
  gallery?: (StaticImageData | string)[];
  description: string;
  category: "Diabetes";
  price: number;
  oldPrice: number;
  discount: number;
  inStock: boolean;
}

// ============================================================================
// HELPERS
// ============================================================================
const CURRENCY = "KSh";

const slugify = (str: string): string =>
  str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export const formatPrice = (n: number) =>
  `${CURRENCY} ${n.toLocaleString()}`;

export const calcDiscountPrice = (price: number, discount: number) =>
  Math.max(0, Math.round(price - price * (discount / 100)));

// ============================================================================
// RAW DATA (MODEL)
// ============================================================================
const raw: Omit<Offer, "slug" | "category" | "inStock">[] = [
  { id: "1", name: "Metformin 500mg (Glucophage)", image: pic1, price: 450, oldPrice: 500, discount: 10, description: "First-line biguanide improving insulin sensitivity." },
  { id: "2", name: "Glimepiride 2mg", image: pic2, price: 620, oldPrice: 700, discount: 12, description: "Sulfonylurea stimulating insulin release." },
  { id: "3", name: "Glipizide 5mg", image: pic3, price: 580, oldPrice: 650, discount: 10, description: "Enhances insulin secretion for moderate T2DM." },
  { id: "4", name: "Gliclazide MR 60mg", image: pic4, price: 750, oldPrice: 820, discount: 8, description: "Modified-release sulfonylurea with stable control." },
  { id: "5", name: "Sitagliptin (Januvia) 100mg", image: pic5, price: 2900, oldPrice: 3200, discount: 10, description: "DPP-4 inhibitor enhancing incretin hormones." },
  { id: "6", name: "Vildagliptin 50mg", image: pic6, price: 1850, oldPrice: 2050, discount: 10, description: "DPP-4 inhibitor alternative to metformin." },
  { id: "7", name: "Empagliflozin (Jardiance) 10mg", image: pic7, price: 3300, oldPrice: 3800, discount: 15, description: "SGLT2 inhibitor supporting heart protection." },
  { id: "8", name: "Dapagliflozin (Forxiga) 10mg", image: pic8, price: 3100, oldPrice: 3450, discount: 10, description: "SGLT2 inhibitor lowering glucose & CV risk." },
  { id: "9", name: "Insulin Glargine (Lantus)", image: pic9, price: 2500, oldPrice: 2700, discount: 8, description: "24-hour basal insulin for stable control." },
  { id: "10", name: "Insulin Aspart (NovoRapid)", image: pic10, price: 2400, oldPrice: 2650, discount: 10, description: "Fast-acting insulin for meals." },
  { id: "11", name: "Insulin Detemir (Levemir)", image: pic11, price: 2600, oldPrice: 2850, discount: 10, description: "Basal insulin with low hypoglycemia risk." },
  { id: "12", name: "Pioglitazone 30mg", image: pic12, price: 850, oldPrice: 950, discount: 10, description: "Improves insulin sensitivity." },
  { id: "13", name: "Acarbose 50mg", image: pic13, price: 700, oldPrice: 780, discount: 10, description: "Reduces post-meal glucose spikes." },
  { id: "14", name: "Linagliptin (Tradjenta) 5mg", image: pic14, price: 2650, oldPrice: 3000, discount: 12, description: "DPP-4 inhibitor safe in renal impairment." },
  { id: "15", name: "Repaglinide 2mg", image: pic15, price: 950, oldPrice: 1050, discount: 10, description: "Meal-time insulin secretagogue." },
  { id: "16", name: "Canagliflozin (Invokana) 100mg", image: pic16, price: 3200, oldPrice: 3550, discount: 10, description: "SGLT2 inhibitor with renal benefits." },
  { id: "17", name: "Saxagliptin (Onglyza) 5mg", image: pic17, price: 2700, oldPrice: 3000, discount: 10, description: "DPP-4 inhibitor improving glycemic control." },
  { id: "18", name: "Liraglutide (Victoza)", image: pic18, price: 7200, oldPrice: 7800, discount: 15, description: "GLP-1 agonist with weight loss benefit." },
  { id: "19", name: "Exenatide (Byetta)", image: pic19, price: 6800, oldPrice: 7400, discount: 12, description: "GLP-1 agonist improving post-meal control." },
  { id: "20", name: "Teneligliptin 20mg", image: pic20, price: 1800, oldPrice: 2000, discount: 10, description: "DPP-4 inhibitor with long half-life." }
];

// ============================================================================
// DERIVED MODEL (adds slug + defaults)
// ============================================================================
export const diabetesOffers: Offer[] = raw.map((p) => ({
  ...p,
  slug: slugify(p.name),
  category: "Diabetes",
  inStock: true
}));

// ============================================================================
// PUBLIC CONTROLLER API — (used by View Pages)
// ============================================================================
export const getAllOffers = (): Offer[] => [...diabetesOffers];

export const getOfferBySlug = (slug: string): Offer | undefined =>
  diabetesOffers.find((p) => p.slug === slug);

export const getOfferById = (id: string): Offer | undefined =>
  diabetesOffers.find((p) => p.id === id);

export const getRelatedOffers = (slug: string, limit = 4): Offer[] =>
  diabetesOffers.filter((p) => p.slug !== slug).slice(0, limit);

export const getOfferURL = (slug: string) =>
  `/dropups/diabetes/${slug}`;

// Default export (optional)
export default {
  diabetesOffers,
  getAllOffers,
  getOfferBySlug,
  getOfferById,
  getRelatedOffers,
  getOfferURL,
  formatPrice,
  calcDiscountPrice
};
