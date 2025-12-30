// src/data/derma.ts

import type { StaticImageData } from "next/image";

export type ProductCategory =
  | "Cleanser"
  | "Moisturizer"
  | "Serum"
  | "Sunscreen"
  | "Treatment"
  | "Mask"
  | "Exfoliant"
  | "Toner"
  | "Eye Care"
  | "Lip Care";

export type SkinType =
  | "All"
  | "Oily"
  | "Dry"
  | "Combination"
  | "Sensitive"
  | "Normal"
  | "Mature"
  | "Acne-Prone";

export type SkinConcern =
  | "Acne"
  | "Aging"
  | "Dark Spots"
  | "Dryness"
  | "Dullness"
  | "Fine Lines"
  | "Hyperpigmentation"
  | "Large Pores"
  | "Redness"
  | "Sensitivity"
  | "Uneven Texture";

export type ProductTag =
  | "Bestseller"
  | "New Arrival"
  | "Limited Edition"
  | "Award Winner"
  | "Cruelty-Free"
  | "Vegan"
  | "Organic"
  | "Dermatologist Tested"
  | "Fragrance-Free"
  | "Hypoallergenic";

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  inStock: boolean;
  stockCount: number;
  sku?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  helpful: number;
  date: string;
}

export interface ReviewResponse {
  id: string;
  userName: string;
  date: string;
  comment: string;
  isOfficial: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userId?: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
  images?: string[];
  skinType?: SkinType;
  ageRange?: string;
  responses?: ReviewResponse[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  slug: string;
  image: string | StaticImageData;  // ✅ Accept both string and StaticImageData
  images: (string | StaticImageData)[];
  videoUrl?: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  questionCount?: number;
  description: string;
  shortDescription?: string;
  keyIngredients: string[];
  fullIngredientList?: string;
  benefits: string[];
  howToUse: string[];
  skinTypes: SkinType[];
  skinConcerns?: SkinConcern[];
  size: string;
  variants?: ProductVariant[];
  inStock: boolean;
  stockCount: number;
  lowStockThreshold?: number;
  restockDate?: string;
  isFeatured?: boolean;
  isNew?: boolean;
  tags?: ProductTag[];
  collections?: string[];
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  warnings?: string[];
  faq?: FAQ[];
  relatedProducts?: string[];
  bundleWith?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  addedAt: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface SearchFilters {
  categories?: ProductCategory[];
  brands?: string[];
  skinTypes?: SkinType[];
  skinConcerns?: SkinConcern[];
  priceRange?: { min: number; max: number };
  rating?: number;
  inStock?: boolean;
  tags?: ProductTag[];
}

export interface SortOption {
  value: string;
  label: string;
}

/* ============================
   IMAGE IMPORTS (ALL USED)
   ============================ */

import pic1 from "../assets/products/cerave-cleanser.png";
import pic2 from "../assets/products/ordinary-serum.png";
import pic3 from "../assets/products/laroche-moisturizer.png";
import pic4 from "../assets/products/neutrogena-sunscreen.png";
import pic5 from "../assets/products/tatcha-cream.png";
import pic6 from "../assets/products/olay-retinol.png";
import pic7 from "../assets/products/paulas-choice.png";
import pic8 from "../assets/products/elf-hydrating.png";
import pic9 from "../assets/products/innisfree-serum.png";
import pic10 from "../assets/products/drunk-elephant.png";
import pic11 from "../assets/products/fenty-cleanser.png";
import pic12 from "../assets/products/aveeno-daily.png";
import pic13 from "../assets/products/glow-recipe.png";
import pic14 from "../assets/products/cosrx-snail.png";
import pic15 from "../assets/products/first-aid-beauty.png";
import pic16 from "../assets/products/kiehl's-cream.png";
import pic17 from "../assets/products/clinique-gel.png";
import pic18 from "../assets/products/laneige-sleeping mask.png";
import pic19 from "../assets/products/skinfix-barrier.png";
import pic20 from "../assets/products/summer-fridays.png";

/* ============================
   MOCK PRODUCTS (20 items)
   ============================ */

export const productsData: Product[] = [
  {
    id: "prod_001",
    name: "Hydrating Facial Cleanser",
    brand: "CeraVe",
    category: "Cleanser",
    slug: "cerave-hydrating-facial-cleanser",
    image: pic1,
    images: [pic1],
    price: 159900,
    oldPrice: 179900,
    discount: 11,
    currency: "KSh",
    rating: 4.8,
    reviewCount: 2456,
    description:
      "Gentle, non-foaming cleanser with essential ceramides and hyaluronic acid to protect and hydrate sensitive skin.",
    shortDescription: "Gentle cleanser with ceramides & hyaluronic acid",
    keyIngredients: ["Ceramides", "Hyaluronic Acid", "Glycerin"],
    benefits: [
      "Cleanses without stripping moisture",
      "Restores skin barrier",
      "Fragrance-free"
    ],
    howToUse: [
      "Wet face with lukewarm water",
      "Massage a dime-sized amount for 30–60s",
      "Rinse and pat dry; use morning & night"
    ],
    skinTypes: ["All", "Dry", "Sensitive", "Normal"],
    skinConcerns: ["Dryness", "Sensitivity"],
    size: "355ml",
    inStock: true,
    stockCount: 45,
    lowStockThreshold: 8,
    isFeatured: true,
    tags: ["Dermatologist Tested", "Fragrance-Free", "Bestseller"],
    collections: ["Daily Essentials"],
    faq: [
      {
        id: "faq_001_1",
        question: "Will it remove light makeup?",
        answer: "Yes — removes light face and minimal eye makeup; double cleanse for heavy makeup.",
        helpful: 42,
        date: "2024-09-15"
      }
    ],
    bundleWith: ["prod_003", "prod_005"],
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2024-10-20T00:00:00Z"
  },
  {
    id: "prod_002",
    name: "Niacinamide 10% + Zinc 1%",
    brand: "The Ordinary",
    category: "Serum",
    slug: "the-ordinary-niacinamide-10pct-zinc-1pct",
    image: pic2,
    images: [pic2],
    price: 99900,
    oldPrice: 114900,
    discount: 13,
    currency: "KSh",
    rating: 4.6,
    reviewCount: 3891,
    description:
      "High-strength formula to reduce blemishes, control sebum and visibly minimize pores.",
    shortDescription: "Niacinamide serum for oil control & pores",
    keyIngredients: ["Niacinamide 10%", "Zinc PCA 1%"],
    benefits: [
      "Reduces blemishes",
      "Controls oil",
      "Improves skin texture"
    ],
    howToUse: [
      "Apply a few drops to the face morning and/or evening after cleansing",
      "Do not mix with pure vitamin C (L-Ascorbic Acid)"
    ],
    skinTypes: ["Oily", "Combination", "All", "Acne-Prone"],
    skinConcerns: ["Acne", "Large Pores", "Uneven Texture"],
    size: "30ml",
    inStock: true,
    stockCount: 67,
    isFeatured: true,
    tags: ["Bestseller", "Cruelty-Free", "Vegan"],
    warnings: ["Avoid mixing with pure vitamin C products."],
    bundleWith: ["prod_007", "prod_001"],
    createdAt: "2023-02-10T00:00:00Z",
    updatedAt: "2024-10-18T00:00:00Z"
  },
  {
    id: "prod_003",
    name: "Toleriane Double Repair Moisturizer SPF 30",
    brand: "La Roche-Posay",
    category: "Moisturizer",
    slug: "la-roche-posay-toleriane-double-repair-spf30",
    image: pic3,
    images: [pic3],
    price: 209900,
    oldPrice: 249900,
    discount: 16,
    currency: "KSh",
    rating: 4.7,
    reviewCount: 1876,
    description:
      "Lightweight moisturizer that hydrates for 48 hours and provides broad-spectrum SPF protection.",
    shortDescription: "48-hour hydration + SPF 30",
    keyIngredients: ["Ceramide-3", "Niacinamide", "Thermal Spring Water"],
    benefits: [
      "Hydrates long-term",
      "Restores the barrier",
      "Daily SPF protection"
    ],
    howToUse: [
      "Apply liberally in the morning to face and neck after serum",
      "Re-apply SPF if exposed to direct sunlight for extended periods"
    ],
    skinTypes: ["All", "Sensitive", "Dry"],
    skinConcerns: ["Dryness", "Redness"],
    size: "75ml",
    inStock: true,
    stockCount: 34,
    lowStockThreshold: 12,
    isFeatured: false,
    tags: ["Dermatologist Tested", "Fragrance-Free"],
    createdAt: "2023-03-20T00:00:00Z",
    updatedAt: "2024-10-15T00:00:00Z"
  },
  {
    id: "prod_004",
    name: "Hydro Boost Water Gel",
    brand: "Neutrogena",
    category: "Moisturizer",
    slug: "neutrogena-hydro-boost-water-gel",
    image: pic4,
    images: [pic4],
    price: 179900,
    oldPrice: 199900,
    discount: 10,
    currency: "KSh",
    rating: 4.5,
    reviewCount: 2134,
    description:
      "Oil-free water gel with hyaluronic acid for instant hydration and long-lasting moisture.",
    shortDescription: "Hyaluronic acid water gel",
    keyIngredients: ["Hyaluronic Acid", "Olive Extract"],
    benefits: [
      "Instant hydration",
      "Non-comedogenic",
      "Good base under makeup"
    ],
    howToUse: [
      "Apply to face and neck after serum, morning and night",
      "Layer under sunscreen during the day"
    ],
    skinTypes: ["All", "Oily", "Combination", "Normal"],
    skinConcerns: ["Dryness", "Dullness"],
    size: "50g",
    inStock: true,
    stockCount: 56,
    isFeatured: false,
    tags: ["Dermatologist Tested"],
    createdAt: "2023-04-05T00:00:00Z",
    updatedAt: "2024-10-12T00:00:00Z"
  },
  {
    id: "prod_005",
    name: "The Dewy Skin Cream",
    brand: "Tatcha",
    category: "Moisturizer",
    slug: "tatcha-dewy-skin-cream",
    image: pic5,
    images: [pic5],
    price: 649900,
    oldPrice: 709900,
    discount: 8,
    currency: "KSh",
    rating: 4.9,
    reviewCount: 987,
    description:
      "Luxury dew-boosting cream for soft, luminous skin with Japanese botanical actives.",
    shortDescription: "Luxurious dewy cream",
    keyIngredients: ["Hadasei-3", "Squalane", "Rice Extract"],
    benefits: [
      "Plumps and hydrates",
      "Adds natural glow",
      "Silky texture"
    ],
    howToUse: [
      "Warm a pearl-sized amount in palms",
      "Press into clean face and neck; use AM & PM"
    ],
    skinTypes: ["All", "Dry", "Normal"],
    skinConcerns: ["Dryness", "Fine Lines"],
    size: "50ml",
    inStock: true,
    stockCount: 23,
    lowStockThreshold: 5,
    isFeatured: true,
    tags: ["Award Winner", "Cruelty-Free"],
    collections: ["Luxury"],
    createdAt: "2023-05-15T00:00:00Z",
    updatedAt: "2024-10-10T00:00:00Z"
  },
  {
    id: "prod_006",
    name: "Regenerist Retinol 24 Night Moisturizer",
    brand: "Olay",
    category: "Treatment",
    slug: "olay-regenerist-retinol-24-night",
    image: pic6,
    images: [pic6],
    price: 289900,
    oldPrice: 319900,
    discount: 9,
    currency: "KSh",
    rating: 4.6,
    reviewCount: 1654,
    description:
      "Retinol-enriched night cream that works overnight to reduce fine lines and even skin tone.",
    shortDescription: "Overnight retinol treatment",
    keyIngredients: ["Retinol", "Niacinamide", "Peptides"],
    benefits: [
      "Reduces fine lines",
      "Improves texture",
      "Gentle for nightly use"
    ],
    howToUse: [
      "Use only at night on clean, dry skin",
      "Start 2–3 times/week and increase as tolerated",
      "Always apply SPF in the morning"
    ],
    skinTypes: ["All", "Dry", "Mature"],
    skinConcerns: ["Aging", "Fine Lines", "Uneven Texture"],
    size: "50ml",
    inStock: true,
    stockCount: 41,
    isFeatured: false,
    tags: ["Dermatologist Tested"],
    warnings: ["Use only at night; use SPF during day."],
    createdAt: "2023-06-20T00:00:00Z",
    updatedAt: "2024-10-08T00:00:00Z"
  },
  {
    id: "prod_007",
    name: "Skin Perfecting 2% BHA Liquid Exfoliant",
    brand: "Paula's Choice",
    category: "Exfoliant",
    slug: "paulas-choice-2pct-bha-liquid",
    image: pic7,
    images: [pic7],
    price: 319900,
    oldPrice: 374900,
    discount: 15,
    currency: "KSh",
    rating: 4.8,
    reviewCount: 4523,
    description:
      "Cult-favorite leave-on exfoliant with 2% salicylic acid to clear pores and smooth texture.",
    shortDescription: "2% BHA leave-on exfoliant",
    keyIngredients: ["Salicylic Acid 2%", "Green Tea Extract"],
    benefits: [
      "Unclogs pores",
      "Reduces blackheads",
      "Improves tone & texture"
    ],
    howToUse: [
      "After cleansing, apply with a cotton pad or palms",
      "Use 1–2 times daily; follow with moisturizer"
    ],
    skinTypes: ["All", "Oily", "Acne-Prone"],
    skinConcerns: ["Acne", "Large Pores", "Uneven Texture"],
    size: "118ml",
    inStock: true,
    stockCount: 38,
    isFeatured: true,
    tags: ["Bestseller", "Cruelty-Free"],
    collections: ["Acne Solutions"],
    createdAt: "2023-07-10T00:00:00Z",
    updatedAt: "2024-10-05T00:00:00Z"
  },
  {
    id: "prod_008",
    name: "Holy Hydration! Face Cream",
    brand: "e.l.f.",
    category: "Moisturizer",
    slug: "elf-holy-hydration-face-cream",
    image: pic8,
    images: [pic8],
    price: 89900,
    oldPrice: 99900,
    discount: 10,
    currency: "KSh",
    rating: 4.4,
    reviewCount: 876,
    description:
      "Affordable, lightweight cream delivering hyaluronic acid + niacinamide for supple, plump skin.",
    shortDescription: "Affordable hydration with premium actives",
    keyIngredients: ["Hyaluronic Acid", "Niacinamide", "Peptides"],
    benefits: [
      "Quick absorption",
      "Plumps skin",
      "Good under makeup"
    ],
    howToUse: [
      "Apply after serum morning & night",
      "Massage until absorbed"
    ],
    skinTypes: ["All", "Dry", "Normal"],
    skinConcerns: ["Dryness", "Dullness"],
    size: "50g",
    inStock: true,
    stockCount: 89,
    isFeatured: false,
    tags: ["Cruelty-Free", "Vegan"],
    createdAt: "2023-08-15T00:00:00Z",
    updatedAt: "2024-10-03T00:00:00Z"
  },
  {
    id: "prod_009",
    name: "Green Tea Seed Serum",
    brand: "Innisfree",
    category: "Serum",
    slug: "innisfree-green-tea-seed-serum",
    image: pic9,
    images: [pic9],
    price: 229900,
    oldPrice: 259900,
    discount: 12,
    currency: "KSh",
    rating: 4.7,
    reviewCount: 1432,
    description:
      "Hydrating antioxidant serum formulated with Jeju green tea to strengthen the moisture barrier.",
    shortDescription: "Hydrating antioxidant serum",
    keyIngredients: ["Green Tea Extract", "Green Tea Seed Oil"],
    benefits: [
      "Antioxidant protection",
      "Hydration boost",
      "Soothes irritation"
    ],
    howToUse: [
      "Use after cleansing and toning; pat 2–3 drops into skin",
      "Follow with moisturizer"
    ],
    skinTypes: ["All", "Sensitive", "Combination"],
    skinConcerns: ["Dryness", "Sensitivity"],
    size: "80ml",
    inStock: true,
    stockCount: 52,
    isFeatured: false,
    isNew: true,
    tags: ["New Arrival", "Cruelty-Free"],
    createdAt: "2024-08-01T00:00:00Z",
    updatedAt: "2024-10-01T00:00:00Z"
  },
  {
    id: "prod_010",
    name: "Protini Polypeptide Cream",
    brand: "Drunk Elephant",
    category: "Moisturizer",
    slug: "drunk-elephant-protini-polypeptide-cream",
    image: pic10,
    images: [pic10],
    price: 569900,
    oldPrice: 629900,
    discount: 10,
    currency: "KSh",
    rating: 4.8,
    reviewCount: 2341,
    description:
      "Protein-rich moisturizer combining peptides and amino acids to restore bounce and firmness.",
    shortDescription: "Peptide-rich moisturizer for elasticity",
    keyIngredients: ["Signal Peptide Complex", "Pygmy Waterlily"],
    benefits: [
      "Improves elasticity",
      "Restores bounce",
      "Improves texture"
    ],
    howToUse: [
      "Apply day and night after serums",
      "Massage into face and neck until absorbed"
    ],
    skinTypes: ["All", "Mature", "Normal"],
    skinConcerns: ["Aging", "Fine Lines"],
    size: "50ml",
    inStock: true,
    stockCount: 28,
    lowStockThreshold: 6,
    isFeatured: true,
    tags: ["Award Winner", "Cruelty-Free"],
    collections: ["Luxury"],
    createdAt: "2023-09-10T00:00:00Z",
    updatedAt: "2024-09-28T00:00:00Z"
  },
  {
    id: "prod_011",
    name: "Fenty Skin Matcha Cleanser",
    brand: "Fenty Skin",
    category: "Cleanser",
    slug: "fenty-skin-matcha-cleanser",
    image: pic11,
    images: [pic11],
    price: 249900,
    oldPrice: 279900,
    discount: 11,
    currency: "KSh",
    rating: 4.5,
    reviewCount: 642,
    description:
      "Foaming matcha-based cleanser that purifies without stripping. Good for daily cleansing in humid climates.",
    shortDescription: "Matcha foaming cleanser",
    keyIngredients: ["Matcha Extract", "Glycerin"],
    benefits: ["Purifies", "Light hydration", "Fresh texture"],
    howToUse: ["Lather and massage onto wet skin, rinse thoroughly."],
    skinTypes: ["All", "Oily", "Combination"],
    skinConcerns: ["Dullness", "Acne"],
    size: "150ml",
    inStock: true,
    stockCount: 40,
    isFeatured: false,
    tags: ["Vegan"],
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-09-20T00:00:00Z"
  },
  {
    id: "prod_012",
    name: "Aveeno Daily Moisturizing Lotion",
    brand: "Aveeno",
    category: "Moisturizer",
    slug: "aveeno-daily-moisturizing-lotion",
    image: pic12,
    images: [pic12],
    price: 119900,
    oldPrice: 139900,
    discount: 14,
    currency: "KSh",
    rating: 4.3,
    reviewCount: 512,
    description:
      "Light daily lotion with colloidal oatmeal for everyday hydration — body and face-friendly for normal skin.",
    shortDescription: "Daily moisturizing lotion with colloidal oatmeal",
    keyIngredients: ["Colloidal Oatmeal", "Glycerin"],
    benefits: ["Calms dry skin", "Non-greasy", "Dermatologist recommended"],
    howToUse: ["Apply to body or face as needed; ideal after bathing."],
    skinTypes: ["All", "Dry", "Normal"],
    skinConcerns: ["Dryness", "Sensitivity"],
    size: "354ml",
    inStock: true,
    stockCount: 75,
    isFeatured: false,
    tags: ["Hypoallergenic"],
    createdAt: "2022-11-02T00:00:00Z",
    updatedAt: "2024-08-30T00:00:00Z"
  },
  {
    id: "prod_013",
    name: "Watermelon Glow Sleeping Mask",
    brand: "Glow Recipe",
    category: "Mask",
    slug: "glow-recipe-watermelon-glow-sleeping-mask",
    image: pic13,
    images: [pic13],
    price: 339900,
    oldPrice: 379900,
    discount: 10,
    currency: "KSh",
    rating: 4.7,
    reviewCount: 842,
    description:
      "Overnight mask that gently exfoliates and hydrates for radiant skin by morning.",
    shortDescription: "Overnight exfoliating & hydrating mask",
    keyIngredients: ["AHAs", "Watermelon Extract"],
    benefits: ["Softens texture", "Hydrates", "Brightens overnight"],
    howToUse: ["Apply as last step; leave overnight; use 2–3 times/week."],
    skinTypes: ["All", "Dry", "Normal"],
    skinConcerns: ["Dullness", "Uneven Texture"],
    size: "100ml",
    inStock: true,
    stockCount: 27,
    isFeatured: false,
    tags: ["Cruelty-Free"],
    createdAt: "2023-10-12T00:00:00Z",
    updatedAt: "2024-09-12T00:00:00Z"
  },
  {
    id: "prod_014",
    name: "Advanced Snail Mucin Cream",
    brand: "COSRX",
    category: "Treatment",
    slug: "cosrx-advanced-snail-mucin-cream",
    image: pic14,
    images: [pic14],
    price: 219900,
    oldPrice: 249900,
    discount: 12,
    currency: "KSh",
    rating: 4.6,
    reviewCount: 1010,
    description:
      "Repairing cream powered by snail mucin to support barrier repair and hydration.",
    shortDescription: "Repair cream with snail mucin",
    keyIngredients: ["Snail Secretion Filtrate", "Panthenol"],
    benefits: ["Repairs skin", "Soothes", "Hydrates"],
    howToUse: ["Apply thin layer after serums to areas needing repair."],
    skinTypes: ["All", "Sensitive"],
    skinConcerns: ["Dryness", "Redness"],
    size: "50ml",
    inStock: true,
    stockCount: 30,
    isFeatured: false,
    tags: ["Cruelty-Free"],
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2024-08-05T00:00:00Z"
  },
  {
    id: "prod_015",
    name: "Ultra Repair Face Moisturizer",
    brand: "First Aid Beauty",
    category: "Moisturizer",
    slug: "first-aid-beauty-ultra-repair-face-moisturizer",
    image: pic15,
    images: [pic15],
    price: 289900,
    oldPrice: 319900,
    discount: 9,
    currency: "KSh",
    rating: 4.5,
    reviewCount: 410,
    description:
      "Rich, fast-absorbing moisturizer that soothes redness and protects the skin barrier.",
    shortDescription: "Barrier-supporting moisturiser",
    keyIngredients: ["Colloidal Oatmeal", "Ceramides"],
    benefits: ["Calms redness", "Strengthens barrier"],
    howToUse: ["Use after cleansing; suitable as part of e-pharmacy recommended regimens."],
    skinTypes: ["Dry", "Sensitive"],
    skinConcerns: ["Redness", "Dryness"],
    size: "50ml",
    inStock: true,
    stockCount: 21,
    isFeatured: false,
    tags: ["Hypoallergenic"],
    createdAt: "2022-08-12T00:00:00Z",
    updatedAt: "2024-07-20T00:00:00Z"
  },
  {
    id: "prod_016",
    name: "Ultra Facial Cream",
    brand: "Kiehl's",
    category: "Moisturizer",
    slug: "kiehls-ultra-facial-cream",
    image: pic16,
    images: [pic16],
    price: 449900,
    oldPrice: 499900,
    discount: 10,
    currency: "KSh",
    rating: 4.6,
    reviewCount: 980,
    description:
      "All-day hydration with lightweight, non-greasy texture suitable for everyday use in varied climates.",
    shortDescription: "Everyday hydration cream",
    keyIngredients: ["Squalane", "Glacial Glycoprotein"],
    benefits: ["Long-lasting hydration", "Lightweight"],
    howToUse: ["Apply morning and night to face and neck."],
    skinTypes: ["All"],
    skinConcerns: ["Dryness"],
    size: "125ml",
    inStock: true,
    stockCount: 18,
    lowStockThreshold: 5,
    isFeatured: false,
    tags: ["Dermatologist Tested"],
    createdAt: "2021-11-01T00:00:00Z",
    updatedAt: "2024-06-16T00:00:00Z"
  },
  {
    id: "prod_017",
    name: "Moisture Surge Hydrating Gel-Cream",
    brand: "Clinique",
    category: "Moisturizer",
    slug: "clinique-moisture-surge-gel-cream",
    image: pic17,
    images: [pic17],
    price: 259900,
    oldPrice: 289900,
    discount: 10,
    currency: "KSh",
    rating: 4.4,
    reviewCount: 650,
    description:
      "Lightweight gel-cream that provides instant hydration and lasts for hours — great in humid climates.",
    shortDescription: "Hydrating gel-cream",
    keyIngredients: ["Hyaluronic Acid", "Aloe Vera"],
    benefits: ["Quick absorption", "Hydration boost"],
    howToUse: ["Apply as needed after serums."],
    skinTypes: ["All", "Combination"],
    skinConcerns: ["Dryness", "Dullness"],
    size: "50ml",
    inStock: true,
    stockCount: 36,
    isFeatured: false,
    createdAt: "2023-03-05T00:00:00Z",
    updatedAt: "2024-05-11T00:00:00Z"
  },
  {
    id: "prod_018",
    name: "Laneige Water Sleeping Mask",
    brand: "Laneige",
    category: "Mask",
    slug: "laneige-water-sleeping-mask",
    image: pic18,
    images: [pic18],
    price: 199900,
    oldPrice: 229900,
    discount: 13,
    currency: "KSh",
    rating: 4.7,
    reviewCount: 1210,
    description:
      "Overnight sleeping mask that moisturizes and revitalizes tired-looking skin.",
    shortDescription: "Overnight intense hydration",
    keyIngredients: ["Hydro Ionized Mineral Water", "Beta-Glucan"],
    benefits: ["Revitalizes overnight", "Hydration lock-in"],
    howToUse: ["Apply a thin layer as last step before bed; rinse in the morning."],
    skinTypes: ["All", "Dry"],
    skinConcerns: ["Dryness", "Dullness"],
    size: "70ml",
    inStock: true,
    stockCount: 33,
    isFeatured: false,
    createdAt: "2023-02-02T00:00:00Z",
    updatedAt: "2024-04-01T00:00:00Z"
  },
  {
    id: "prod_019",
    name: "Barrier+ Triple Lipid Restore",
    brand: "Skinfix",
    category: "Treatment",
    slug: "skinfix-barrier-plus-triple-lipid",
    image: pic19,
    images: [pic19],
    price: 309900,
    oldPrice: 349900,
    discount: 11,
    currency: "KSh",
    rating: 4.6,
    reviewCount: 430,
    description:
      "Barrier repair formula with essential lipids to restore and protect dry or compromised skin.",
    shortDescription: "Triple-lipid barrier repair",
    keyIngredients: ["Ceramides", "Cholesterol", "Fatty Acids"],
    benefits: ["Restores barrier", "Soothes sensitivity"],
    howToUse: ["Use after cleansing on dry areas or all over face as needed."],
    skinTypes: ["Dry", "Sensitive"],
    skinConcerns: ["Sensitivity", "Dryness"],
    size: "48ml",
    inStock: true,
    stockCount: 26,
    isFeatured: false,
    createdAt: "2022-05-18T00:00:00Z",
    updatedAt: "2024-03-21T00:00:00Z"
  },
  {
    id: "prod_020",
    name: "Jet Lag Mask",
    brand: "Summer Fridays",
    category: "Mask",
    slug: "summer-fridays-jet-lag-mask",
    image: pic20,
    images: [pic20],
    price: 379900,
    oldPrice: 419900,
    discount: 9,
    currency: "KSh",
    rating: 4.5,
    reviewCount: 540,
    description:
      "Overnight revitalizing mask that hydrates and balances skin after long travel or long days.",
    shortDescription: "Revitalizing travel-friendly mask",
    keyIngredients: ["Niacinamide", "Ceramides"],
    benefits: ["Rehydrates", "Restores radiance"],
    howToUse: ["Apply as a mask or leave overnight for an intensive boost."],
    skinTypes: ["All", "Normal"],
    skinConcerns: ["Dullness", "Dryness"],
    size: "90ml",
    inStock: true,
    stockCount: 12,
    lowStockThreshold: 5,
    isFeatured: true,
    tags: ["Cruelty-Free"],
    createdAt: "2023-12-01T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z"
  }
];

/* ============================
   MOCK REVIEWS
   ============================ */

export const reviewsData: Review[] = [
  {
    id: "rev_001",
    productId: "prod_001",
    userName: "Sarah M.",
    rating: 5,
    date: "2024-10-15T00:00:00Z",
    title: "Best cleanser for dry skin!",
    comment:
      "Incredibly gentle — doesn't leave my skin tight. Great for sensitive skin in Nairobi's dry season.",
    verified: true,
    helpful: 45,
    skinType: "Dry",
    ageRange: "25-34"
  },
  {
    id: "rev_002",
    productId: "prod_002",
    userName: "James K.",
    rating: 4,
    date: "2024-10-10T00:00:00Z",
    title: "Good for oily skin",
    comment:
      "Controls shine and reduced breakouts after two weeks. Affordable and effective.",
    verified: true,
    helpful: 12,
    skinType: "Oily",
    ageRange: "35-44"
  },
  {
    id: "rev_003",
    productId: "prod_010",
    userName: "Aisha N.",
    rating: 5,
    date: "2024-09-20T00:00:00Z",
    title: "Noticeable firming",
    comment:
      "Used with other products — skin feels firmer and looks fresher. Worth the price from the e-pharmacy.",
    verified: true,
    helpful: 23,
    skinType: "Normal",
    ageRange: "45-54"
  }
];

/* ============================
   DATA ACCESS & UTILITIES
   ============================ */

export const getProductById = (id: string): Product | undefined =>
  productsData.find((p) => p.id === id);

export const getProductBySlug = (slug: string): Product | undefined =>
  productsData.find((p) => p.slug === slug);

export const getAllProducts = (): Product[] => [...productsData];

export const getProductsByCategory = (category: ProductCategory): Product[] =>
  productsData.filter((p) => p.category === category);

export const getProductsByBrand = (brand: string): Product[] =>
  productsData.filter((p) => p.brand.toLowerCase() === brand.toLowerCase());

export const getFeaturedProducts = (limit?: number): Product[] => {
  const featured = productsData.filter((p) => p.isFeatured);
  return limit ? featured.slice(0, limit) : featured;
};

export const getNewProducts = (limit?: number): Product[] => {
  const newest = productsData.filter((p) => p.isNew);
  return limit ? newest.slice(0, limit) : newest;
};

export const getSaleProducts = (limit?: number): Product[] => {
  const sale = productsData.filter((p) => p.oldPrice && p.oldPrice > p.price);
  return limit ? sale.slice(0, limit) : sale;
};

export const getRelatedProducts = (productId: string, limit = 4): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  let related = productsData.filter((p) => p.id !== productId && p.category === product.category);
  if (related.length < limit) {
    const brandMatches = productsData.filter(
      (p) => p.id !== productId && p.brand === product.brand && !related.find((r) => r.id === p.id)
    );
    related = [...related, ...brandMatches];
  }
  return related.slice(0, limit);
};

export const getFrequentlyBoughtTogether = (productId: string): Product[] => {
  const product = getProductById(productId);
  if (!product || !product.bundleWith) return [];
  return product.bundleWith
    .map((id) => getProductById(id))
    .filter((p): p is Product => p !== undefined);
};

export const searchProducts = (query: string, filters?: SearchFilters): Product[] => {
  let results = [...productsData];
  const q = query.trim().toLowerCase();
  if (q) {
    results = results.filter((p) =>
      [
        p.name,
        p.brand,
        p.category,
        p.description,
        ...(p.keyIngredients || [])
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }
  if (!filters) return results;
  if (filters.categories?.length) {
    results = results.filter((p) => filters.categories!.includes(p.category));
  }
  if (filters.brands?.length) {
    results = results.filter((p) => filters.brands!.includes(p.brand));
  }
  if (filters.skinTypes?.length) {
    results = results.filter((p) => filters.skinTypes!.some((t) => p.skinTypes.includes(t)));
  }
  if (filters.skinConcerns?.length) {
    results = results.filter((p) => p.skinConcerns && filters.skinConcerns!.some((c) => p.skinConcerns!.includes(c)));
  }
  if (filters.priceRange) {
    results = results.filter((p) => p.price >= filters.priceRange!.min && p.price <= filters.priceRange!.max);
  }
  if (filters.rating) {
    results = results.filter((p) => p.rating >= filters.rating!);
  }
  if (filters.inStock) {
    results = results.filter((p) => p.inStock && p.stockCount > 0);
  }
  if (filters.tags?.length) {
    results = results.filter((p) => p.tags && filters.tags!.some((t) => p.tags!.includes(t)));
  }
  return results;
};

export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const items = [...products];
  switch (sortBy) {
    case "price-low":
      return items.sort((a, b) => a.price - b.price);
    case "price-high":
      return items.sort((a, b) => b.price - a.price);
    case "rating":
      return items.sort((a, b) => b.rating - a.rating);
    case "reviews":
      return items.sort((a, b) => b.reviewCount - a.reviewCount);
    case "newest":
      return items.sort((a, b) => (new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()));
    case "name-asc":
      return items.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return items.sort((a, b) => b.name.localeCompare(a.name));
    case "featured":
      return items.sort((a, b) => (a.isFeatured && !b.isFeatured ? -1 : !a.isFeatured && b.isFeatured ? 1 : 0));
    default:
      return items;
  }
};

export const getSortOptions = (): SortOption[] => [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "reviews", label: "Most Reviewed" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" }
];

export const getReviewsByProductId = (productId: string): Review[] =>
  reviewsData.filter((r) => r.productId === productId);

export const getReviewsPaginated = (productId: string, page = 1, perPage = 10) => {
  const all = getReviewsByProductId(productId);
  const total = all.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const start = (page - 1) * perPage;
  return { reviews: all.slice(start, start + perPage), total, pages };
};

export const calculateAverageRating = (productId: string): number => {
  const reviews = getReviewsByProductId(productId);
  if (!reviews.length) return 0;
  const sum = reviews.reduce((s, r) => s + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

export const getRatingDistribution = (productId: string): Record<number, number> => {
  const reviews = getReviewsByProductId(productId);
  const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reviews.forEach((r) => (dist[r.rating] = (dist[r.rating] || 0) + 1));
  return dist;
};

export const sortReviews = (reviews: Review[], sortBy: string): Review[] => {
  const items = [...reviews];
  switch (sortBy) {
    case "most-helpful":
      return items.sort((a, b) => b.helpful - a.helpful);
    case "highest-rating":
      return items.sort((a, b) => b.rating - a.rating);
    case "lowest-rating":
      return items.sort((a, b) => a.rating - b.rating);
    case "newest":
      return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    case "oldest":
      return items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    default:
      return items;
  }
};

export const filterReviewsByRating = (reviews: Review[], rating: number): Review[] =>
  reviews.filter((r) => r.rating === rating);

export const formatPrice = (price: number, currency = "KSh"): string => {
  const value = (price / 100).toFixed(2);
  return `${currency} ${Number(value).toLocaleString("en-KE")}`;
};

export const formatPriceShort = (price: number, currency = "KSh"): string => {
  const whole = Math.round(price / 100);
  return `${currency} ${whole.toLocaleString("en-KE")}`;
};

export const calculateDiscount = (oldPrice: number, newPrice: number): number => {
  if (!oldPrice || oldPrice <= newPrice) return 0;
  return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
};

export const calculateSavings = (oldPrice: number, newPrice: number): number => {
  if (!oldPrice || oldPrice <= newPrice) return 0;
  return oldPrice - newPrice;
};

export const isOnSale = (product: Product): boolean => 
  !!(product.oldPrice && product.oldPrice > product.price);

export const isInStock = (product: Product): boolean => 
  product.inStock && product.stockCount > 0;

export const getStockStatus = (product: Product): string => {
  if (!product.inStock) {
    return product.restockDate ? `Out of Stock - Restocking ${formatDate(product.restockDate)}` : "Out of Stock";
  }
  if (product.stockCount === 0) return "Out of Stock";
  const threshold = product.lowStockThreshold ?? 10;
  if (product.stockCount <= threshold) return `Only ${product.stockCount} left in stock!`;
  return "In Stock";
};

export const isLowStock = (product: Product): boolean => {
  if (!product.inStock || product.stockCount === 0) return false;
  const threshold = product.lowStockThreshold ?? 10;
  return product.stockCount <= threshold;
};

export const getAllCategories = (): ProductCategory[] => {
  const set = new Set<ProductCategory>();
  productsData.forEach((p) => set.add(p.category));
  return Array.from(set).sort();
};

export const getAllBrands = (): string[] => {
  const set = new Set<string>();
  productsData.forEach((p) => set.add(p.brand));
  return Array.from(set).sort();
};

export const getAllSkinTypes = (): SkinType[] => {
  const set = new Set<SkinType>();
  productsData.forEach((p) => p.skinTypes.forEach((t) => set.add(t)));
  return Array.from(set).sort();
};

export const getAllSkinConcerns = (): SkinConcern[] => {
  const set = new Set<SkinConcern>();
  productsData.forEach((p) => p.skinConcerns?.forEach((c) => set.add(c)));
  return Array.from(set).sort();
};

export const getCategoryCount = (category: ProductCategory): number =>
  productsData.filter((p) => p.category === category).length;

export const getBrandCount = (brand: string): number =>
  productsData.filter((p) => p.brand === brand).length;

export const formatDate = (dateString: string): string => {
  const d = new Date(dateString);
  return d.toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" });
};

export const formatRelativeTime = (dateString: string): string => {
  const d = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

export const getStarRating = (rating: number): { full: number; half: boolean; empty: number } => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return { full, half, empty };
};

export const truncateText = (text: string, maxLength: number): string =>
  text.length <= maxLength ? text : text.slice(0, maxLength).trim() + "...";

export const generateSlug = (name: string): string =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const getPriceRange = (products: Product[]): { min: number; max: number } => {
  if (!products.length) return { min: 0, max: 0 };
  const prices = products.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
};

export const calculateCartSubtotal = (items: CartItem[]): number =>
  items.reduce((total, item) => {
    const product = getProductById(item.productId);
    if (!product) return total;
    const variantPrice = item.variantId ? product.variants?.find((v) => v.id === item.variantId)?.price : undefined;
    const price = variantPrice ?? product.price;
    return total + price * item.quantity;
  }, 0);

export const calculateCartSavings = (items: CartItem[]): number =>
  items.reduce((total, item) => {
    const product = getProductById(item.productId);
    if (!product || !product.oldPrice) return total;
    const savings = product.oldPrice - product.price;
    return total + savings * item.quantity;
  }, 0);

export const validateCartItem = (item: CartItem): { valid: boolean; message?: string } => {
  const product = getProductById(item.productId);
  if (!product) return { valid: false, message: "Product not found" };
  if (!isInStock(product)) return { valid: false, message: "Product is out of stock" };
  if (item.quantity > product.stockCount) return { valid: false, message: `Only ${product.stockCount} available in stock` };
  return { valid: true };
};

export const getProductsByCollection = (collectionName: string): Product[] =>
  productsData.filter((p) => p.collections?.includes(collectionName));

export const getAllCollections = (): string[] => {
  const set = new Set<string>();
  productsData.forEach((p) => p.collections?.forEach((c) => set.add(c)));
  return Array.from(set).sort();
};

export default {
  productsData,
  reviewsData,
  getProductById,
  getProductBySlug,
  getAllProducts,
  getProductsByCategory,
  getProductsByBrand,
  getFeaturedProducts,
  getNewProducts,
  getSaleProducts,
  getRelatedProducts,
  getFrequentlyBoughtTogether,
  searchProducts,
  sortProducts,
  getSortOptions,
  getReviewsByProductId,
  getReviewsPaginated,
  calculateAverageRating,
  getRatingDistribution,
  sortReviews,
  filterReviewsByRating,
  formatPrice,
  formatPriceShort,
  calculateDiscount,
  calculateSavings,
  isOnSale,
  isInStock,
  getStockStatus,
  isLowStock,
  getAllCategories,
  getAllBrands,
  getAllSkinTypes,
  getAllSkinConcerns,
  getCategoryCount,
  getBrandCount,
  formatDate,
  formatRelativeTime,
  getStarRating,
  truncateText,
  generateSlug,
  getPriceRange,
  calculateCartSubtotal,
  calculateCartSavings,
  validateCartItem,
  getProductsByCollection,
  getAllCollections
};