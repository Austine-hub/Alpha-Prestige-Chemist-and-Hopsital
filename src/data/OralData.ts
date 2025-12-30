//src/data/OralData.ts

export type StockStatus = "In Stock" | "Out of Stock";

export interface OralProduct {
  id: number;
  name: string;
  slug: string; // SEO-safe, deterministic
  image: string; // string-only (Next/Image compatible)
  category: "Oral Care";
  subCategory: string;
  price: number; // normalized integer (KES)
  stock: StockStatus;

  // --- Clinical-safe content (future-proof) ---
  features: string[];
  description: string[];
  usage: string[];
}

/* -------------------------------------------------------------------------- */
/*                             INTERNAL UTILITIES                              */
/* -------------------------------------------------------------------------- */

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const normalizePrice = (value: number): number =>
  Number.isFinite(value) && value > 0 ? Math.round(value) : 0;

/* -------------------------------------------------------------------------- */
/*                              PRODUCT MODEL                                  */
/* -------------------------------------------------------------------------- */

export const oralProducts: OralProduct[] = [
  {
    id: 1,
    name: "Colgate Total Whitening Toothpaste 120g",
    slug: slugify("Colgate Total Whitening Toothpaste 120g"),
    image: "/assets/products/cerave-cleanser.png",
    category: "Oral Care",
    subCategory: "Toothpaste",
    price: normalizePrice(650),
    stock: "In Stock",
    features: [
      "Contains fluoride for caries prevention",
      "Helps reduce plaque accumulation",
      "Daily-use toothpaste",
    ],
    description: [
      "A fluoride-containing toothpaste indicated for routine oral hygiene.",
      "Supports prevention of dental caries when used as part of regular brushing.",
    ],
    usage: [
      "Brush teeth twice daily",
      "Do not swallow; spit out after brushing",
    ],
  },

  {
    id: 2,
    name: "Sensodyne Repair & Protect Toothpaste 100g",
    slug: slugify("Sensodyne Repair & Protect Toothpaste 100g"),
    image: "/assets/products/ordinary-serum.png",
    category: "Oral Care",
    subCategory: "Toothpaste",
    price: normalizePrice(950),
    stock: "In Stock",
    features: [
      "Designed for dentine hypersensitivity",
      "Forms a protective mineral layer",
    ],
    description: [
      "Formulated for the management of tooth sensitivity.",
      "Suitable for long-term daily use.",
    ],
    usage: [
      "Brush twice daily",
      "Avoid rinsing vigorously after brushing",
    ],
  },

  {
    id: 3,
    name: "Listerine Cool Mint Mouthwash 500ml",
    slug: slugify("Listerine Cool Mint Mouthwash 500ml"),
    image: "/assets/products/neutrogena-sunscreen.png",
    category: "Oral Care",
    subCategory: "Mouthwash",
    price: normalizePrice(1100),
    stock: "In Stock",
    features: [
      "Adjunct to mechanical brushing",
      "Freshens breath",
    ],
    description: [
      "Antiseptic mouth rinse used as an adjunct to tooth brushing.",
      "Not a substitute for brushing or flossing.",
    ],
    usage: [
      "Rinse for 30 seconds",
      "Do not swallow",
    ],
  },

  /* ---------------------------------------------------------------------- */
  /*                          ADDITIONAL COMPONENTS                          */
  /* ---------------------------------------------------------------------- */

  {
    id: 4,
    name: "Oral-B Pro-Health Toothbrush (Medium Bristles)",
    slug: slugify("Oral-B Pro-Health Toothbrush Medium Bristles"),
    image: "/assets/products/laroche-moisturizer.png",
    category: "Oral Care",
    subCategory: "Toothbrush",
    price: normalizePrice(500),
    stock: "In Stock",
    features: [
      "Medium bristles for effective plaque removal",
      "Gentle on gums",
    ],
    description: [
      "Manual toothbrush designed to support daily oral hygiene.",
      "Helps reduce plaque when used with proper brushing technique.",
    ],
    usage: [
      "Brush twice daily",
      "Replace toothbrush every 3 months",
    ],
  },

  {
    id: 5,
    name: "Colgate Plax Fresh Tea Mouthwash 500ml",
    slug: slugify("Colgate Plax Fresh Tea Mouthwash 500ml"),
    image: "/assets/products/tatcha-cream.png",
    category: "Oral Care",
    subCategory: "Mouthwash",
    price: normalizePrice(950),
    stock: "In Stock",
    features: [
      "Alcohol-free formulation",
      "Helps control plaque bacteria",
    ],
    description: [
      "Mouth rinse intended for daily adjunctive oral hygiene.",
      "Provides a fresh mouthfeel without alcohol-related irritation.",
    ],
    usage: [
      "Rinse for 30 seconds twice daily",
      "Do not swallow",
    ],
  },

  {
    id: 6,
    name: "Crest 3D White Brilliance Toothpaste 116g",
    slug: slugify("Crest 3D White Brilliance Toothpaste 116g"),
    image: "/assets/products/olay-retinol.png",
    category: "Oral Care",
    subCategory: "Toothpaste",
    price: normalizePrice(1200),
    stock: "In Stock",
    features: [
      "Advanced whitening formulation",
      "Enamel-safe cleaning system",
    ],
    description: [
      "Whitening toothpaste formulated to remove surface stains.",
      "Intended for daily use as part of routine oral care.",
    ],
    usage: [
      "Brush twice daily",
      "Avoid swallowing",
    ],
  },

  {
    id: 7,
    name: "Oral-B Glide Pro-Health Dental Floss 40m",
    slug: slugify("Oral-B Glide Pro-Health Dental Floss 40m"),
    image: "/assets/products/paulas-choice.png",
    category: "Oral Care",
    subCategory: "Dental Floss",
    price: normalizePrice(650),
    stock: "In Stock",
    features: [
      "Slides easily between teeth",
      "Helps remove interdental plaque",
    ],
    description: [
      "Dental floss intended for daily interdental cleaning.",
      "Complements brushing for comprehensive oral hygiene.",
    ],
    usage: [
      "Use once daily",
      "Gently floss between teeth without snapping",
    ],
  },

  {
    id: 8,
    name: "Sensodyne Fresh Mint Toothpaste 100g",
    slug: slugify("Sensodyne Fresh Mint Toothpaste 100g"),
    image: "/assets/products/elf-hydrating.png",
    category: "Oral Care",
    subCategory: "Toothpaste",
    price: normalizePrice(900),
    stock: "In Stock",
    features: [
      "Relieves tooth sensitivity",
      "Refreshing mint flavor",
    ],
    description: [
      "Specially formulated toothpaste for sensitive teeth.",
      "Provides daily protection against sensitivity.",
    ],
    usage: [
      "Brush twice daily",
      "Avoid swallowing",
    ],
  },

  {
    id: 9,
    name: "TheraBreath Fresh Breath Oral Rinse 473ml",
    slug: slugify("TheraBreath Fresh Breath Oral Rinse 473ml"),
    image: "/assets/products/innisfree-serum.png",
    category: "Oral Care",
    subCategory: "Mouthwash",
    price: normalizePrice(1650),
    stock: "In Stock",
    features: [
      "Targets oral malodor",
      "Non-burning formulation",
    ],
    description: [
      "Oral rinse designed to neutralize sulfur compounds responsible for bad breath.",
      "Alcohol-free and suitable for routine use.",
    ],
    usage: [
      "Rinse for 30 seconds",
      "Use twice daily",
    ],
  },

  {
    id: 10,
    name: "Colgate 360° Total Advanced Toothbrush",
    slug: slugify("Colgate 360 Total Advanced Toothbrush"),
    image: "/assets/products/drunk-elephant.png",
    category: "Oral Care",
    subCategory: "Toothbrush",
    price: normalizePrice(700),
    stock: "In Stock",
    features: [
      "Integrated tongue cleaner",
      "Full-mouth cleaning design",
    ],
    description: [
      "Toothbrush designed to clean teeth, tongue, cheeks, and gums.",
      "Supports comprehensive oral hygiene.",
    ],
    usage: [
      "Brush twice daily",
      "Replace every 3 months",
    ],
  },

  {
    id: 11,
    name: "Oral-B Electric Toothbrush Vitality CrossAction",
    slug: slugify("Oral-B Electric Toothbrush Vitality CrossAction"),
    image: "/assets/products/fenty-cleanser.png",
    category: "Oral Care",
    subCategory: "Electric Toothbrush",
    price: normalizePrice(3800),
    stock: "In Stock",
    features: [
      "Oscillating brush head",
      "Rechargeable electric design",
    ],
    description: [
      "Electric toothbrush intended to enhance plaque removal.",
      "Suitable for routine daily brushing.",
    ],
    usage: [
      "Use twice daily",
      "Follow manufacturer charging instructions",
    ],
  },

  {
    id: 12,
    name: "Crest Pro-Health Advanced Mouthwash 1L",
    slug: slugify("Crest Pro-Health Advanced Mouthwash 1L"),
    image: "/assets/products/aveeno-daily.png",
    category: "Oral Care",
    subCategory: "Mouthwash",
    price: normalizePrice(1450),
    stock: "In Stock",
    features: [
      "Alcohol-free formulation",
      "Supports gum health",
    ],
    description: [
      "Advanced mouth rinse formulated to reduce plaque and gingivitis.",
      "Intended for daily adjunctive oral care.",
    ],
    usage: [
      "Rinse for 30 seconds twice daily",
      "Do not swallow",
    ],
  },

  {
    id: 13,
    name: "Colgate Optic White Renewal Toothpaste 85g",
    slug: slugify("Colgate Optic White Renewal Toothpaste 85g"),
    image: "/assets/products/glow-recipe.png",
    category: "Oral Care",
    subCategory: "Toothpaste",
    price: normalizePrice(1150),
    stock: "In Stock",
    features: [
      "Whitening-focused formulation",
      "Helps remove surface stains",
    ],
    description: [
      "Toothpaste designed to improve tooth brightness.",
      "Suitable for routine oral hygiene.",
    ],
    usage: [
      "Brush twice daily",
      "Avoid swallowing",
    ],
  },

  {
    id: 14,
    name: "Tom’s of Maine Fluoride-Free Toothpaste 100g",
    slug: slugify("Toms of Maine Fluoride-Free Toothpaste 100g"),
    image: "/assets/products/cosrx-snail.png",
    category: "Oral Care",
    subCategory: "Toothpaste",
    price: normalizePrice(1050),
    stock: "In Stock",
    features: [
      "Fluoride-free formulation",
      "Mild cleansing action",
    ],
    description: [
      "Toothpaste intended for individuals avoiding fluoride.",
      "Supports routine oral hygiene.",
    ],
    usage: [
      "Brush twice daily",
      "Spit out after brushing",
    ],
  },

  {
    id: 15,
    name: "GUM Soft-Picks Advanced Dental Picks (60 pack)",
    slug: slugify("GUM Soft-Picks Advanced Dental Picks 60 pack"),
    image: "/assets/products/first-aid-beauty.png",
    category: "Oral Care",
    subCategory: "Dental Picks",
    price: normalizePrice(850),
    stock: "In Stock",
    features: [
      "Soft flexible tips",
      "Gentle on gums",
    ],
    description: [
      "Interdental cleaning aids designed for plaque removal.",
      "Suitable for daily oral hygiene routines.",
    ],
    usage: [
      "Use daily between teeth",
      "Dispose after use if damaged",
    ],
  },
];



/* -------------------------------------------------------------------------- */
/*                              CONTROLLER API                                  */
/* -------------------------------------------------------------------------- */

export const getProductBySlug = (slug: string): OralProduct | null => {
  if (!slug) return null;
  return oralProducts.find((p) => p.slug === slug) ?? null;
};

export const getSimilarProducts = (
  product: OralProduct,
  limit = 4
): OralProduct[] =>
  oralProducts
    .filter(
      (p) => p.subCategory === product.subCategory && p.slug !== product.slug
    )
    .slice(0, limit);

export const formatPrice = (price: number): string =>
  `KES ${normalizePrice(price).toLocaleString()}`;

export const getStockStatus = (stock: StockStatus): {
  label: string;
  isInStock: boolean;
} => ({
  label: stock === "In Stock" ? "✓ In Stock" : "✕ Out of Stock",
  isInStock: stock === "In Stock",
});

/* -------------------------------------------------------------------------- */
/*                               EXPORT TYPES                                   */
/* -------------------------------------------------------------------------- */

export type Product = OralProduct;
