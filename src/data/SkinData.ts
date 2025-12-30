// src/data/SkinData.ts

import type { StaticImageData } from "next/image";

// ============================================================================
// ASSET IMPORTS
// ============================================================================

import pic1 from "../assets/products/benzoyl-peroxide-gel.png";
import pic2 from "../assets/products/clindamycin-gel.png";
import pic3 from "../assets/products/adapalene-gel.png";
import pic4 from "../assets/products/hydrocortisone-cream.png";
import pic5 from "../assets/products/mupirocin-ointment.png";
import pic6 from "../assets/products/ketoconazole-cream.png";
import pic7 from "../assets/products/clotrimazole-cream.png";
import pic8 from "../assets/products/terbinafine-cream.png";
import pic9 from "../assets/products/metronidazole-gel.png";
import pic10 from "../assets/products/azelaic-acid-gel.png";
import pic11 from "../assets/products/tretinoin-cream.png";
import pic12 from "../assets/products/calamine-lotion.png";
import pic13 from "../assets/products/fusidic-acid-cream.png";
import pic14 from "../assets/products/neosporin-ointment.png";
import pic15 from "../assets/products/fusibact-ointment.png";
import pic16 from "../assets/products/erythromycin-gel.png";
import pic17 from "../assets/products/cerave-moisturizing-cream.png";
import pic18 from "../assets/products/effaclar-duo.png";
import pic19 from "../assets/products/eucerin-repair-cream.png";
import pic20 from "../assets/products/olay-retinol-night-cream.png";
import pic21 from "../assets/products/aveeno-moisturizing-lotion.png";
import pic22 from "../assets/products/aquaphor-healing-ointment.png";
import pic23 from "../assets/products/niacinamide-zinc-serum.png";
import pic24 from "../assets/products/salicylic-acid-toner.png";
import pic25 from "../assets/products/panoxyl-foaming-wash.png";

// Gallery
import pic11Side from "../assets/products/Tretinoin 0.05% Cream (Retin-A).jpg";
import pic11Texture from "../assets/products/tretinoin-cream.png";
import pic17Back from "../assets/products/CeraVe-Hydrating-Cleanser-236ml.png";

// ============================================================================
// IMAGE REGISTRY — TYPED & IMMUTABLE
// ============================================================================

export const imageAssets = {
  pic1, pic2, pic3, pic4, pic5,
  pic6, pic7, pic8, pic9, pic10,
  pic11, pic12, pic13, pic14, pic15,
  pic16, pic17, pic18, pic19, pic20,
  pic21, pic22, pic23, pic24, pic25,
  pic11Side, pic11Texture, pic17Back,
} as const;

export type ImageKey = keyof typeof imageAssets;

// ============================================================================
// SORT OPTIONS
// ============================================================================

export type SortOption =
  | "price-asc"
  | "price-desc"
  | "name"
  | "rating"
  | "discount";

// ============================================================================
// PRODUCT CATEGORIES — SINGLE SOURCE OF TRUTH ✅
// ============================================================================

export const PRODUCT_CATEGORIES = {
  ACNE_TREATMENT: "acne-treatment",
  TOPICAL_ANTIBIOTICS: "topical-antibiotics",
  ANTI_INFLAMMATORY: "anti-inflammatory",
  ANTIFUNGAL: "antifungal",
  SKIN_SOOTHING: "skin-soothing",
  MOISTURIZERS: "moisturizers",
  RETINOIDS: "retinoids",
  SPECIALTY_TREATMENTS: "specialty-treatments", // ✅ FIX ADDED
} as const;

export type ProductCategory =
  (typeof PRODUCT_CATEGORIES)[keyof typeof PRODUCT_CATEGORIES];

// ============================================================================
// PRODUCT MODEL — STRICT & FUTURE-SAFE
// ============================================================================

export interface SkinProduct {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly image: StaticImageData | string;
  readonly gallery?: readonly (StaticImageData | string)[];

  readonly price: number;
  readonly oldPrice: number;
  readonly discount: number;

  readonly category: ProductCategory;

  readonly description: string;
  readonly ingredients?: readonly string[];
  readonly usage?: string;
  readonly warnings?: readonly string[];

  readonly inStock: boolean;
  readonly rating?: number;
  readonly reviewCount?: number;
}

// ============================================================================
// DATABASE — IMMUTABLE & TYPE-CHECKED
// ============================================================================

export const skinProducts = [
  {
    id: "1",
    name: "Benzoyl Peroxide 5% Gel",
    slug: "benzoyl-peroxide-gel",
    image: imageAssets.pic1,
    price: 899,
    oldPrice: 1020,
    discount: 12,
    category: PRODUCT_CATEGORIES.ACNE_TREATMENT,
    description: "Powerful acne-fighting gel that eliminates acne-causing bacteria.",
    ingredients: ["Benzoyl Peroxide 5%"],
    usage: "Apply thin layer once daily.",
    warnings: ["May cause dryness", "Use sunscreen"],
    inStock: true,
    rating: 4.5,
    reviewCount: 234,
  },
  {
    id: "2",
    name: "Clindamycin 1% Gel",
    slug: "clindamycin-gel",
    image: imageAssets.pic2,
    price: 1199,
    oldPrice: 1349,
    discount: 10,
    category: PRODUCT_CATEGORIES.TOPICAL_ANTIBIOTICS,
    description: "Topical antibiotic effective against acne bacteria.",
    usage: "Apply twice daily.",
    warnings: ["Prescription required"],
    inStock: true,
    rating: 4.3,
    reviewCount: 187,
  },

{
  id: "3",
  name: "Adapalene 0.1% Gel (Differin)",
  slug: "adapalene-gel",
  image: imageAssets.pic3,
  price: 1499,
  oldPrice: 1699,
  discount: 12,
  category: PRODUCT_CATEGORIES.RETINOIDS, // ✅ retinoid, not generic acne
  description:
    "Retinoid gel that normalizes skin cell turnover, unclogs pores, and reduces inflammation.",
  ingredients: [
    "Adapalene 0.1%",
    "Carbomer 940",
    "Methylparaben",
    "Disodium EDTA",
  ],
  usage:
    "Apply once daily at bedtime to clean, dry skin. Allow to absorb before moisturizer.",
  warnings: [
    "Increase sun sensitivity",
    "May cause initial purging",
    "Avoid during pregnancy",
  ],
  inStock: true,
  rating: 4.7,
  reviewCount: 412,
},

{
  id: "4",
  name: "Hydrocortisone 1% Cream",
  slug: "hydrocortisone-cream",
  image: imageAssets.pic4,
  price: 499,
  oldPrice: 549,
  discount: 8,
  category: PRODUCT_CATEGORIES.ANTI_INFLAMMATORY,
  description:
    "Mild corticosteroid cream that relieves itching, redness, and swelling.",
  ingredients: [
    "Hydrocortisone 1%",
    "White Petrolatum",
    "Cetyl Alcohol",
    "Glycerin",
  ],
  usage:
    "Apply thin layer 2–4 times daily. Do not exceed 7 days unless directed.",
  warnings: [
    "Avoid prolonged use",
    "Not recommended for facial use",
    "Avoid broken skin",
  ],
  inStock: true,
  rating: 4.4,
  reviewCount: 156,
},

{
  id: "5",
  name: "Mupirocin 2% Ointment (Bactroban)",
  slug: "mupirocin-ointment",
  image: imageAssets.pic5,
  price: 1249,
  oldPrice: 1399,
  discount: 10,
  category: PRODUCT_CATEGORIES.TOPICAL_ANTIBIOTICS,
  description:
    "Topical antibiotic effective against bacterial skin infections.",
  ingredients: [
    "Mupirocin 2%",
    "Polyethylene Glycol 400",
    "Polyethylene Glycol 3350",
  ],
  usage:
    "Apply small amount to affected area three times daily for 3–5 days.",
  warnings: [
    "Prescription required",
    "Avoid eye contact",
    "Complete full course",
  ],
  inStock: true,
  rating: 4.6,
  reviewCount: 98,
},

{
  id: "6",
  name: "Ketoconazole 2% Cream (Nizoral)",
  slug: "ketoconazole-cream",
  image: imageAssets.pic6,
  price: 999,
  oldPrice: 1099,
  discount: 10,
  category: PRODUCT_CATEGORIES.ANTIFUNGAL,
  description:
    "Broad-spectrum antifungal cream for common fungal skin infections.",
  ingredients: [
    "Ketoconazole 2%",
    "Propylene Glycol",
    "Stearyl Alcohol",
    "Cetyl Alcohol",
  ],
  usage:
    "Apply once daily for 2–6 weeks depending on condition.",
  warnings: [
    "For external use only",
    "May cause mild irritation",
  ],
  inStock: true,
  rating: 4.5,
  reviewCount: 203,
},

{
  id: "9",
  name: "Metronidazole 0.75% Gel (Rosacea)",
  slug: "metronidazole-gel",
  image: imageAssets.pic9,
  price: 1199,
  oldPrice: 1349,
  discount: 12,
  category: PRODUCT_CATEGORIES.ANTI_INFLAMMATORY, // ✅ rosacea = inflammatory
  description:
    "Prescription gel for inflammatory rosacea symptoms.",
  ingredients: [
    "Metronidazole 0.75%",
    "Carbomer 940",
    "Methylparaben",
    "Propylene Glycol",
  ],
  usage:
    "Apply thin layer twice daily. Improvement in ~3 weeks.",
  warnings: [
    "Prescription required",
    "Avoid alcohol during use",
    "Protect from sunlight",
  ],
  inStock: true,
  rating: 4.4,
  reviewCount: 142,
},

{
  id: "11",
  name: "Tretinoin 0.05% Cream (Retin-A)",
  slug: "tretinoin-cream",
  image: imageAssets.pic11,
  gallery: [
    imageAssets.pic11,
    imageAssets.pic11Side,
    imageAssets.pic11Texture,
  ],
  price: 1599,
  oldPrice: 1799,
  discount: 10,
  category: PRODUCT_CATEGORIES.RETINOIDS, // ✅ fixed
  description:
    "Gold-standard retinoid for acne and photoaging.",
  ingredients: [
    "Tretinoin 0.05%",
    "Stearic Acid",
    "Isopropyl Myristate",
  ],
  usage:
    "Apply pea-sized amount at night. Start 2–3× weekly.",
  warnings: [
    "Prescription required",
    "Extreme sun sensitivity",
    "Avoid pregnancy",
  ],
  inStock: true,
  rating: 4.8,
  reviewCount: 523,
},

{
  id: "23",
  name: "Niacinamide 10% + Zinc 1% Serum",
  slug: "niacinamide-zinc-serum",
  image: imageAssets.pic23,
  price: 999,
  oldPrice: 1149,
  discount: 10,
  category: PRODUCT_CATEGORIES.SKIN_SOOTHING, // ✅ serum mapped safely
  description:
    "Oil-balancing serum that reduces blemishes and visible pores.",
  ingredients: [
    "Niacinamide 10%",
    "Zinc PCA 1%",
    "Tasmanian Pepperberry",
  ],
  usage:
    "Apply morning and evening before moisturizer.",
  warnings: [
    "Patch test recommended",
    "Avoid mixing with vitamin C",
  ],
  inStock: true,
  rating: 4.5,
  reviewCount: 1456,
},

{
  id: "24",
  name: "Salicylic Acid 2% Toner",
  slug: "salicylic-acid-toner",
  image: imageAssets.pic24,
  price: 1199,
  oldPrice: 1349,
  discount: 12,
  category: PRODUCT_CATEGORIES.ACNE_TREATMENT, // ✅ exfoliant = acne
  description:
    "BHA exfoliant that clears pores and refines skin texture.",
  ingredients: [
    "Salicylic Acid 2%",
    "Witch Hazel",
    "Niacinamide",
    "Allantoin",
  ],
  usage:
    "Apply once daily, increase gradually.",
  warnings: [
    "Increases sun sensitivity",
    "Avoid over-exfoliation",
  ],
  inStock: true,
  rating: 4.6,
  reviewCount: 834,
},

] as const satisfies readonly SkinProduct[];

// ============================================================================
// INTERNAL UTILITIES
// ============================================================================

const normalize = (value: string): string =>
  value.trim().toLowerCase();

// ============================================================================
// SAFE HELPERS
// ============================================================================

export const calculateDiscountedPrice = (
  price: number,
  discount: number
): number =>
  price > 0 && discount > 0
    ? Math.ceil(price - (price * discount) / 100)
    : price;

export const formatPrice = (value?: number): string =>
  typeof value === "number"
    ? `Ksh ${value.toLocaleString("en-KE")}`
    : "Ksh 0";

// ============================================================================
// DATA FETCHERS — NEVER CRASH
// ============================================================================

export const getAllProducts = (): readonly SkinProduct[] =>
  skinProducts;

export const getProductBySlug = (
  slug?: string
): SkinProduct | undefined =>
  slug
    ? skinProducts.find(p => normalize(p.slug) === normalize(slug))
    : undefined;

export const getProductsByCategory = (
  category: ProductCategory
): readonly SkinProduct[] =>
  skinProducts.filter(p => p.category === category);

// ============================================================================
// ROUTE BUILDER — ALWAYS SAFE
// ============================================================================

export const getProductURL = (slug: string): string =>
  `/dropdowns/skincare/${normalize(slug)}`;
