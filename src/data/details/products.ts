// src/data/details/products.ts

/* =========================================================
   GLOBAL CONSTANTS
   ========================================================= */

export const CURRENCIES = ["KES"] as const;
export type Currency = (typeof CURRENCIES)[number];

/**
 * Branded ID for extra type safety in large codebases
 */
export type ProductId = number & { readonly __brand: "ProductId" };

/* =========================================================
   DOMAIN TYPES
   ========================================================= */

export interface ProductReview {
  readonly id: string;
  readonly author: string;
  readonly rating: 1 | 2 | 3 | 4 | 5;
  readonly comment: string;
  readonly date: string; // ISO 8601
  readonly verifiedPurchase: boolean;
}

export interface Product {
  readonly id: ProductId;
  readonly name: string;
  readonly price: number;
  readonly currency: Currency;
  readonly image: string;
  readonly description: string;
  readonly category: string;
  readonly tags: readonly string[];

  /* Inventory */
  readonly stock: number;
  readonly inStock: boolean;
  readonly isNew?: boolean;

  /* Content */
  readonly features: readonly string[];
  readonly rating: number; // 0–5
  readonly reviewCount: number;
  readonly reviews?: readonly ProductReview[];

  /* Discovery */
  readonly relatedCategoryKeys?: readonly string[];
}

/* =========================================================
   IMMUTABLE PRODUCT DATA (SSOT)
   ========================================================= */

const PRODUCTS = [
  {
    id: 1 as ProductId,
    name: "Dewyglot Lemon-Grass Essential Oil 15ml",
    price: 900,
    currency: "KES",
    image: "/assets/products3/1.jpg",
    description:
      "A pure, steam-distilled lemongrass essential oil ideal for aromatherapy, skin care, and relaxation.",
    category: "Skincare",
    tags: ["essential oil", "aromatherapy", "organic"],
    stock: 42,
    inStock: true,
    isNew: true,
    features: [
      "100% pure essential oil",
      "Steam distilled for potency",
      "No synthetic additives or fillers",
      "Safe for diffusers and topical application",
    ],
    rating: 4.7,
    reviewCount: 128,
    relatedCategoryKeys: ["Skincare", "Wellness"],
    reviews: [
      {
        id: "r1",
        author: "Jane D.",
        rating: 5,
        comment: "Smells divine and very refreshing!",
        date: "2025-01-15",
        verifiedPurchase: true,
      },
      {
        id: "r2",
        author: "Mark O.",
        rating: 4,
        comment: "High quality bottle design.",
        date: "2024-12-20",
        verifiedPurchase: true,
      },
    ],
  },
  {
    id: 2 as ProductId,
    name: "SKIN1004 Centella Toning Toner 210ml",
    price: 1132,
    currency: "KES",
    image: "/assets/products3/2.jpg",
    description:
      "A gentle, pH-balanced toner enriched with Centella Asiatica to soothe, hydrate, and strengthen skin barrier.",
    category: "Skincare",
    tags: ["toner", "centella", "hydrating"],
    stock: 18,
    inStock: true,
    features: [
      "Centella Asiatica extract from Madagascar",
      "Non-comedogenic and alcohol-free",
      "Exfoliates gently with PHA",
      "Restores skin pH balance",
    ],
    rating: 4.8,
    reviewCount: 312,
    relatedCategoryKeys: ["Skincare"],
  },
  {
    id: 3 as ProductId,
    name: "Dewyglot Organic Castor Oil",
    price: 700,
    currency: "KES",
    image: "/assets/products3/3.jpg",
    description:
      "Cold-pressed organic castor oil for hair strengthening, scalp nourishment, and skin hydration.",
    category: "Haircare",
    tags: ["castor oil", "organic", "hair growth"],
    stock: 0,
    inStock: false,
    features: [
      "Premium cold-pressed extraction",
      "Hexane-free and 100% organic",
      "Promotes thicker lashes and brows",
      "Deeply hydrates dry scalp",
    ],
    rating: 4.6,
    reviewCount: 89,
    relatedCategoryKeys: ["Haircare", "Skincare"],
  },

  {
  id: 4 as ProductId,
  name: "CeraVe Intensive Moisturizing Lotion 236ml",
  price: 2850,
  currency: "KES",
  image: "/assets/products3/4.jpg",
  description:
    "A rich, dermatologist-developed moisturizing lotion formulated with ceramides to restore and protect the skin barrier.",
  category: "Skincare",
  tags: ["moisturizer", "ceramides", "dry skin", "dermatologist tested"],
  stock: 25,
  inStock: true,
  features: [
    "Formulated with essential ceramides",
    "Long-lasting hydration for very dry skin",
    "Non-greasy and fast absorbing",
    "Fragrance-free and suitable for sensitive skin",
  ],
  rating: 4.8,
  reviewCount: 540,
  relatedCategoryKeys: ["Skincare"],
},

{
  id: 5 as ProductId,
  name: "Lalo Jasmine Strengthening Hair Serum 100ml",
  price: 2398,
  currency: "KES",
  image: "/assets/products3/5.jpg",
  description:
    "A nourishing jasmine-infused hair serum designed to strengthen hair strands, reduce breakage, and enhance shine.",
  category: "Haircare",
  tags: ["hair serum", "strengthening", "jasmine", "shine"],
  stock: 14,
  inStock: true,
  features: [
    "Strengthens weak and brittle hair",
    "Lightweight, non-greasy formula",
    "Enhances natural shine",
    "Suitable for daily use",
  ],
  rating: 4.5,
  reviewCount: 96,
  relatedCategoryKeys: ["Haircare"],
},

{
  id: 6 as ProductId,
  name: "Lalo Hydrating UV Defense Sunscreen SPF50 100ml",
  price: 2300,
  currency: "KES",
  image: "/assets/products3/6.jpg",
  description:
    "A broad-spectrum SPF50 sunscreen offering advanced UV protection while keeping skin hydrated and comfortable.",
  category: "Skincare",
  tags: ["sunscreen", "SPF50", "UV protection", "hydrating"],
  stock: 30,
  inStock: true,
  features: [
    "Broad-spectrum UVA & UVB protection",
    "Hydrating and lightweight texture",
    "No white cast",
    "Suitable for daily wear",
  ],
  rating: 4.6,
  reviewCount: 210,
  relatedCategoryKeys: ["Skincare", "Wellness"],
},

{
  id: 7 as ProductId,
  name: "La Roche-Posay Effaclar Duo+M Unipod Patches",
  price: 2000,
  currency: "KES",
  image: "/assets/products3/7.jpg",
  description:
    "Targeted acne treatment patches designed to visibly reduce blemishes and prevent post-acne marks.",
  category: "Acne Care",
  tags: ["acne treatment", "blemish control", "patches"],
  stock: 20,
  inStock: true,
  features: [
    "Targets active blemishes",
    "Helps prevent post-acne marks",
    "Dermatologist tested",
    "Suitable for sensitive skin",
  ],
  rating: 4.7,
  reviewCount: 180,
  relatedCategoryKeys: ["Skincare", "Acne Care"],
},

{
  id: 8 as ProductId,
  name: "Dercos Densi-Solutions Thickening Shampoo 250ml",
  price: 3000,
  currency: "KES",
  image: "/assets/products3/8.jpg",
  description:
    "A volumizing shampoo clinically designed to improve hair density and thickness from the first wash.",
  category: "Haircare",
  tags: ["thickening shampoo", "hair density", "volumizing"],
  stock: 12,
  inStock: true,
  features: [
    "Improves hair thickness and volume",
    "Strengthens hair fibers",
    "Lightweight cleansing formula",
    "Clinically tested",
  ],
  rating: 4.4,
  reviewCount: 134,
  relatedCategoryKeys: ["Haircare"],
},

{
  id: 9 as ProductId,
  name: "Dercos Anti-Dandruff Shampoo Normal/Oily Hair 200ml",
  price: 3000,
  currency: "KES",
  image: "/assets/products3/9.jpg",
  description:
    "An anti-dandruff shampoo formulated for normal to oily hair, providing long-lasting dandruff control.",
  category: "Haircare",
  tags: ["anti-dandruff", "oily scalp", "scalp care"],
  stock: 16,
  inStock: true,
  features: [
    "Eliminates visible dandruff",
    "Controls excess oil",
    "Soothes itchy scalp",
    "Dermatologically tested",
  ],
  rating: 4.6,
  reviewCount: 201,
  relatedCategoryKeys: ["Haircare"],
},

{
  id: 10 as ProductId,
  name: "Dercos Anti-Dandruff Shampoo Dry Hair 200ml",
  price: 3000,
  currency: "KES",
  image: "/assets/products3/10.jpg",
  description:
    "A nourishing anti-dandruff shampoo tailored for dry hair and sensitive scalp conditions.",
  category: "Haircare",
  tags: ["anti-dandruff", "dry hair", "scalp nourishment"],
  stock: 10,
  inStock: true,
  features: [
    "Eliminates dandruff flakes",
    "Nourishes dry scalp",
    "Prevents recurrence of dandruff",
    "Gentle cleansing formula",
  ],
  rating: 4.5,
  reviewCount: 167,
  relatedCategoryKeys: ["Haircare"],
},


] as const satisfies readonly Product[];

/* =========================================================
   INDEXES (PERFORMANCE OPTIMIZED)
   ========================================================= */

/**
 * O(1) product lookup — preferred for Details pages
 */
const PRODUCT_MAP: ReadonlyMap<ProductId, Product> = new Map(
  PRODUCTS.map((p) => [p.id, p])
);

/* =========================================================
   PUBLIC SELECTORS
   ========================================================= */

export const getAllProducts = (): readonly Product[] => PRODUCTS;

export const getProductById = (
  id: ProductId | null | undefined
): Product | undefined => {
  if (!id) return undefined;
  return PRODUCT_MAP.get(id);
};

/**
 * Stable, deterministic related products selector
 * (avoids Math.random() for hydration & UX consistency)
 */
export const getRelatedProducts = (
  product: Product,
  limit = 4
): Product[] => {
  return PRODUCTS.filter((p) => {
    if (p.id === product.id) return false;

    if (p.category === product.category) return true;

    return (
      p.relatedCategoryKeys?.some((key) =>
        product.relatedCategoryKeys?.includes(key)
      ) ?? false
    );
  }).slice(0, limit);
};

/* =========================================================
   UTILITIES
   ========================================================= */

/**
 * Safe parsing for Next.js route params
 */
export const parseId = (
  value: string | string[] | null | undefined
): ProductId | null => {
  if (!value) return null;

  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);

  return Number.isInteger(parsed) && parsed > 0
    ? (parsed as ProductId)
    : null;
};

/**
 * Localized price formatting (KES-optimized)
 */
export const formatPrice = (
  amount: number,
  currency: Currency = "KES"
): string => {
  return new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/* =========================================================
   LEGACY EXPORT (NON-BREAKING)
   ========================================================= */

/**
 * @deprecated Use getAllProducts() instead
 */
export const productsArray = PRODUCTS;
