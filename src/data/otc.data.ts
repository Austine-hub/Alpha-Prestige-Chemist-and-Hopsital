// src/data/otcdata.ts
import type { StaticImageData } from "next/image";

/* ============================================================================
   IMAGES (Clean, grouped)
============================================================================ */

import pic1 from "@/assets/products/OTC/Ibuprofen.png";
import pic2 from "@/assets/products/OTC/Acetaminophen.png";
import pic3 from "@/assets/products/OTC/Loratadine.png";
import pic4 from "@/assets/products/OTC/Diphenhydramine.png";
import pic5 from "@/assets/products/OTC/Famotidine.png";
import pic6 from "@/assets/products/OTC/Omeprazole.png";
import pic7 from "@/assets/products/OTC/Loperamide.png";
import pic8 from "@/assets/products/OTC/Psyllium.png";
import pic9 from "@/assets/products/OTC/Pepto.png";
import pic10 from "@/assets/products/OTC/Dextromethorphan.png";
import pic11 from "@/assets/products/OTC/Guaifenesin.png";
import pic12 from "@/assets/products/OTC/Acetylsalicylic.png";
import pic13 from "@/assets/products/OTC/Hydrocortisone.png";
import pic14 from "@/assets/products/OTC/Neosporin.png";
import pic15 from "@/assets/products/OTC/PlanB.png";
import pic16 from "@/assets/products/OTC/Nicotinepatch.png";
import pic17 from "@/assets/products/OTC/Melatonin.png";
import pic18 from "@/assets/products/OTC/VitaminC.png";
import pic19 from "@/assets/products/OTC/Salinespray.png";
import pic20 from "@/assets/products/OTC/Zinc.png";

/* ============================================================================
   TYPES — SINGLE SOURCE OF TRUTH (No optional arrays in views)
============================================================================ */

export type ImageSource = StaticImageData | string;

export interface OTCProduct {
  id: string;
  slug: string;
  name: string;
  category: string;

  /** Primary image (always exists) */
  image: ImageSource;

  /** Always an array (may be empty) */
  gallery: readonly ImageSource[];

  description: string;

  price: number;
  oldPrice: number;
  discount: number;

  inStock: boolean;

  rating?: number;
  reviewCount?: number;

  /** Always arrays → no TS checks needed in UI */
  howToUse: readonly string[];
  warnings: readonly string[];
}

/* ============================================================================
   HELPERS (Pure, exported, safe)
============================================================================ */

export const slugify = (s: string): string =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const getProductURL = (slug: string): string =>
  `/dropdowns/otc/${slug}`;

export const formatPrice = (num: number): string =>
  `KSh ${num.toLocaleString()}`;

export const calculateDiscountPrice = (
  price: number,
  discount: number
): number => Math.round(price - price * (discount / 100));

/* ============================================================================
   WHATSAPP CONSTANTS
============================================================================ */

export const WHATSAPP_NUMBER = "254796787207";

export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello, I’d like to order this product:"
);

/* ============================================================================
   RAW DATA (Human-friendly, optional fields allowed here)
============================================================================ */

type RawOTCProduct = Omit<
  OTCProduct,
  "slug" | "gallery" | "howToUse" | "warnings"
> & {
  gallery?: ImageSource[];
  howToUse?: string[];
  warnings?: string[];
};

const raw: RawOTCProduct[] = [
  {
    id: "1",
    name: "Ibuprofen (Advil®, Motrin®)",
    category: "Pain Relief",
    image: pic1,
    description: "Fast-acting NSAID for pain, fever, and inflammation.",
    price: 490,
    oldPrice: 560,
    discount: 15,
    inStock: true,
    rating: 4.7,
    reviewCount: 122,
    howToUse: ["Take after meals", "Do not exceed recommended dose"],
    warnings: ["Avoid in pregnancy", "Consult doctor if symptoms persist"],
  },
];

/* ============================================================================
   NORMALIZATION — THE KEY FIX (Bulletproof)
============================================================================ */

export const otcProducts: OTCProduct[] = raw.map((p) => ({
  ...p,
  slug: slugify(p.name),

  /** Normalized arrays — NEVER undefined */
  gallery: p.gallery ?? [],
  howToUse: p.howToUse ?? [],
  warnings: p.warnings ?? [],
}));

/* ============================================================================
   QUERIES (Used by views & details pages)
============================================================================ */

export const getAllProducts = (): OTCProduct[] => otcProducts;

export const getProductBySlug = (slug: string): OTCProduct => {
  const product = otcProducts.find((p) => p.slug === slug);
  if (!product) {
    throw new Error(`OTC product not found: ${slug}`);
  }
  return product;
};
