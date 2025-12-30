// ============================================================================
// HTNData.ts — Hypertension Products Data Layer (Model)
// MVC • DRY • Type-Safe • Optimized • Modern Next.js 16
// ============================================================================

import type { StaticImageData } from "next/image";

// ============================================================================
// Static Imports (Batch Import Pattern)
// ============================================================================
const images = {
  amlodipine: require("../assets/products/BloodPressure/Amlodipine.png"),
  atenolol: require("../assets/products/BloodPressure/Atenolol.png"),
  bisoprolol: require("../assets/products/BloodPressure/Bisoprolol.png"),
  candesartan: require("../assets/products/BloodPressure/Candesartan.png"),
  chlorthalidone: require("../assets/products/BloodPressure/Chlorthalidone.png"),
  enalapril: require("../assets/products/BloodPressure/Enalapril.png"),
  furosemide: require("../assets/products/BloodPressure/Furosemide.png"),
  hydrochlorothiazide: require("../assets/products/BloodPressure/Hydrochlorothiazide.png"),
  losartan: require("../assets/products/BloodPressure/Losartan.png"),
  nifedipine: require("../assets/products/BloodPressure/Nifedipine.png"),
  spironolactone: require("../assets/products/BloodPressure/Spironolactone.png"),
  telmisartan: require("../assets/products/BloodPressure/Telmisartan.png"),
  valsartan: require("../assets/products/BloodPressure/Valsartan.png"),
} as const;

// ============================================================================
// Type Definitions
// ============================================================================
export type ProductCategory =
  | "Calcium Channel Blocker"
  | "Beta Blocker"
  | "Angiotensin II Receptor Blocker (ARB)"
  | "Thiazide-like Diuretic"
  | "ACE Inhibitor"
  | "Loop Diuretic"
  | "Thiazide Diuretic"
  | "Potassium-Sparing Diuretic";

export type StockStatus = "In Stock" | "Out of Stock";
export type Badge = "SALE" | "NEW" | "HOT";

export interface Usage {
  dosage: string;
  administration: string;
  storage: string;
  warning: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  manufacturer: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  stock: StockStatus;
  image: StaticImageData | string;
  rating: number;
  badge?: Badge;
  description: string;
  features: string[];
  usage: Usage;
}

// ============================================================================
// Product Catalog (Data-Driven Approach)
// ============================================================================
const productData: Omit<Product, "slug">[] = [
  {
    id: 1,
    name: "Norvasc (Amlodipine)",
    manufacturer: "Pfizer, USA",
    category: "Calcium Channel Blocker",
    price: 3200,
    originalPrice: 3500,
    stock: "In Stock",
    image: images.amlodipine,
    rating: 4.7,
    badge: "SALE",
    description:
      "Long-acting calcium channel blocker for hypertension and angina. Relaxes blood vessels, reducing cardiac workload with once-daily dosing.",
    features: [
      "Clinically proven calcium channel blocker",
      "Effective for hypertension and angina",
      "Once-daily sustained control",
      "Well-tolerated, guideline-recommended",
    ],
    usage: {
      dosage: "5–10 mg once daily as prescribed",
      administration: "With or without food",
      storage: "Below 30°C, dry place, away from light",
      warning: "Do not stop abruptly; taper under supervision",
    },
  },
  {
    id: 2,
    name: "Tenormin (Atenolol)",
    manufacturer: "AstraZeneca, UK",
    category: "Beta Blocker",
    price: 2800,
    originalPrice: 3000,
    stock: "In Stock",
    image: images.atenolol,
    rating: 4.6,
    description:
      "Cardioselective beta-blocker lowering blood pressure by reducing heart rate. Used for angina and post-MI management.",
    features: [
      "Cardioselective with fewer respiratory effects",
      "Long-term hypertension control",
      "Improves post-heart attack survival",
      "Once-daily convenience",
    ],
    usage: {
      dosage: "25–100 mg once daily",
      administration: "With water, same time daily",
      storage: "Below 25°C, protected from moisture",
      warning: "Avoid sudden withdrawal to prevent rebound",
    },
  },
  {
    id: 3,
    name: "Concor (Bisoprolol)",
    manufacturer: "Merck, Germany",
    category: "Beta Blocker",
    price: 3400,
    originalPrice: 3700,
    stock: "In Stock",
    image: images.bisoprolol,
    rating: 4.9,
    badge: "NEW",
    description:
      "Highly selective beta-1 blocker for hypertension and heart failure. Improves cardiac efficiency with minimal respiratory effects.",
    features: [
      "Highly cardioselective beta-1 blocker",
      "Proven in heart failure and hypertension",
      "Minimizes fatigue and dizziness",
      "Trusted European formulation",
    ],
    usage: {
      dosage: "5–10 mg daily or as advised",
      administration: "Morning, before meals",
      storage: "Below 30°C, away from sunlight",
      warning: "Consult doctor before dosage changes",
    },
  },
  {
    id: 4,
    name: "Atacand (Candesartan)",
    manufacturer: "AstraZeneca, Sweden",
    category: "Angiotensin II Receptor Blocker (ARB)",
    price: 3600,
    originalPrice: 3850,
    stock: "In Stock",
    image: images.candesartan,
    rating: 4.8,
    description:
      "Potent ARB relaxing blood vessels for effective BP control. Reduces stroke and heart failure risk in hypertensive patients.",
    features: [
      "Long-acting ARB with sustained effect",
      "Reduces cardiovascular events",
      "Suitable for diabetic and elderly patients",
      "Minimal electrolyte imbalance risk",
    ],
    usage: {
      dosage: "8–32 mg once daily",
      administration: "With or without food",
      storage: "Room temperature (15–30°C)",
      warning: "Avoid during pregnancy",
    },
  },
  {
    id: 5,
    name: "Hygroton (Chlorthalidone)",
    manufacturer: "Novartis, Switzerland",
    category: "Thiazide-like Diuretic",
    price: 3000,
    originalPrice: 3200,
    stock: "In Stock",
    image: images.chlorthalidone,
    rating: 4.5,
    description:
      "Thiazide-like diuretic removing excess salt and water. Lowers BP and reduces fluid retention with long half-life.",
    features: [
      "Effective in combination therapy",
      "Long half-life, once-daily dosing",
      "Reduces stroke risk",
      "Preferred diuretic in guidelines",
    ],
    usage: {
      dosage: "12.5–25 mg daily",
      administration: "Morning with water",
      storage: "Tightly closed, below 30°C",
      warning: "Monitor electrolytes long-term",
    },
  },
  {
    id: 6,
    name: "Renitec (Enalapril)",
    manufacturer: "MSD, Netherlands",
    category: "ACE Inhibitor",
    price: 3100,
    originalPrice: 3400,
    stock: "In Stock",
    image: images.enalapril,
    rating: 4.4,
    description:
      "ACE inhibitor relaxing blood vessels, reducing cardiac workload. Used in hypertension and heart failure management.",
    features: [
      "Proven mortality benefit",
      "Effective in hypertension and heart failure",
      "Protective in diabetic nephropathy",
      "Improves arterial compliance",
    ],
    usage: {
      dosage: "5–20 mg once or twice daily",
      administration: "Same time daily",
      storage: "Below 25°C, away from moisture",
      warning: "Discontinue if persistent dry cough",
    },
  },
  {
    id: 7,
    name: "Lasix (Furosemide)",
    manufacturer: "Sanofi, France",
    category: "Loop Diuretic",
    price: 2700,
    originalPrice: 2950,
    stock: "In Stock",
    image: images.furosemide,
    rating: 4.6,
    description:
      "Potent loop diuretic for hypertension and edema from heart failure, liver, or kidney disease.",
    features: [
      "Rapid-acting loop diuretic",
      "Reduces fluid overload and BP",
      "Relieves heart failure symptoms",
      "Decades of trusted clinical use",
    ],
    usage: {
      dosage: "20–80 mg once or twice daily",
      administration: "Morning to avoid nocturia",
      storage: "Original packaging, below 30°C",
      warning: "Monitor electrolytes and hydration",
    },
  },
  {
    id: 8,
    name: "Hydrosan (Hydrochlorothiazide)",
    manufacturer: "Teva, Israel",
    category: "Thiazide Diuretic",
    price: 2900,
    originalPrice: 3100,
    stock: "In Stock",
    image: images.hydrochlorothiazide,
    rating: 4.3,
    description:
      "Promotes sodium and water excretion to lower BP and prevent fluid retention. First-line hypertension therapy.",
    features: [
      "First-line therapy for hypertension",
      "Economical and effective",
      "Synergistic with other agents",
      "Once-daily oral administration",
    ],
    usage: {
      dosage: "12.5–50 mg once daily",
      administration: "Preferably in morning",
      storage: "Tightly closed, below 30°C",
      warning: "Avoid excessive sunlight",
    },
  },
  {
    id: 9,
    name: "Cozaar (Losartan)",
    manufacturer: "Merck, USA",
    category: "Angiotensin II Receptor Blocker (ARB)",
    price: 3300,
    originalPrice: 3500,
    stock: "In Stock",
    image: images.losartan,
    rating: 4.8,
    description:
      "ARB lowering BP and protecting kidneys, especially in diabetic patients. Minimal cough risk compared to ACE inhibitors.",
    features: [
      "Well-tolerated, minimal cough risk",
      "Renoprotective in diabetes",
      "Once-daily administration",
      "Clinically validated efficacy",
    ],
    usage: {
      dosage: "50–100 mg daily",
      administration: "With or without food",
      storage: "Room temperature, below 30°C",
      warning: "Avoid in pregnancy; monitor kidneys",
    },
  },
  {
    id: 10,
    name: "Adalat (Nifedipine)",
    manufacturer: "Bayer, Germany",
    category: "Calcium Channel Blocker",
    price: 3200,
    originalPrice: 3450,
    stock: "In Stock",
    image: images.nifedipine,
    rating: 4.7,
    description:
      "Relaxes and widens blood vessels for improved flow. Reduces BP and angina symptoms with high safety profile.",
    features: [
      "Fast-acting calcium channel blocker",
      "Effective in chronic and acute hypertension",
      "Useful for pregnancy-induced hypertension",
      "High long-term safety profile",
    ],
    usage: {
      dosage: "10–30 mg two to three times daily",
      administration: "Swallow whole, do not crush",
      storage: "Below 25°C, dry place",
      warning: "Avoid abrupt withdrawal",
    },
  },
  {
    id: 11,
    name: "Aldactone (Spironolactone)",
    manufacturer: "Pfizer, USA",
    category: "Potassium-Sparing Diuretic",
    price: 3400,
    originalPrice: 3700,
    stock: "In Stock",
    image: images.spironolactone,
    rating: 4.9,
    description:
      "Potassium-sparing diuretic countering aldosterone to reduce fluid retention and BP. Used in resistant hypertension.",
    features: [
      "Prevents potassium loss vs thiazides",
      "Effective in resistant hypertension",
      "Improves heart failure outcomes",
      "Supports hormonal balance",
    ],
    usage: {
      dosage: "25–100 mg daily",
      administration: "With food to reduce GI upset",
      storage: "Cool, dry place",
      warning: "Monitor potassium and renal function",
    },
  },
  {
    id: 12,
    name: "Micardis (Telmisartan)",
    manufacturer: "Boehringer Ingelheim, Germany",
    category: "Angiotensin II Receptor Blocker (ARB)",
    price: 3550,
    originalPrice: 3800,
    stock: "In Stock",
    image: images.telmisartan,
    rating: 4.8,
    description:
      "ARB with long half-life providing 24-hour BP control. Offers organ protection with excellent tolerability.",
    features: [
      "Sustained 24-hour BP control",
      "Excellent tolerability profile",
      "Metabolically neutral (diabetic-safe)",
      "Once-daily convenience",
    ],
    usage: {
      dosage: "40–80 mg once daily",
      administration: "With or without meals",
      storage: "Below 30°C",
      warning: "Do not use during pregnancy",
    },
  },
  {
    id: 13,
    name: "Diovan (Valsartan)",
    manufacturer: "Novartis, Switzerland",
    category: "Angiotensin II Receptor Blocker (ARB)",
    price: 3700,
    originalPrice: 4000,
    stock: "In Stock",
    image: images.valsartan,
    rating: 4.9,
    description:
      "ARB for hypertension and post-heart failure management. Blocks angiotensin II to relax vessels and reduce cardiac strain.",
    features: [
      "Proven in hypertension and heart failure",
      "Reduces hospitalizations and mortality",
      "Excellent long-term safety profile",
      "Trusted by cardiologists worldwide",
    ],
    usage: {
      dosage: "80–160 mg once daily",
      administration: "With or without food",
      storage: "Below 25°C",
      warning: "Avoid during pregnancy",
    },
  },
];

// ============================================================================
// Auto-Generate Slugs and Export Products
// ============================================================================
export const htnProducts: Product[] = productData.map((p) => ({
  ...p,
  slug: p.name.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-"),
}));

// ============================================================================
// Utility Functions (Model Helpers)
// ============================================================================

/** Format price in KES with locale */
export const formatPrice = (price: number) => `KES ${price.toLocaleString()}`;

/** Get product by slug */
export const getProductBySlug = (slug: string) =>
  htnProducts.find((p) => p.slug === slug);

/** Get product by ID */
export const getProductById = (id: number) =>
  htnProducts.find((p) => p.id === id);

/** Get similar products by category (excluding current) */
export const getSimilarProducts = (category: string, excludeId: number, limit = 4) =>
  htnProducts
    .filter((p) => p.category === category && p.id !== excludeId)
    .slice(0, limit);

/** Get products by category */
export const getProductsByCategory = (category: ProductCategory) =>
  htnProducts.filter((p) => p.category === category);

/** Get products in stock */
export const getInStockProducts = () =>
  htnProducts.filter((p) => p.stock === "In Stock");

/** Get products with badge */
export const getProductsWithBadge = (badge: Badge) =>
  htnProducts.filter((p) => p.badge === badge);

/** Search products by name */
export const searchProducts = (query: string) =>
  htnProducts.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

/** Get all unique categories */
export const getCategories = () =>
  Array.from(new Set(htnProducts.map((p) => p.category)));

export default htnProducts;