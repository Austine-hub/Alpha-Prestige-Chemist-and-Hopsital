// ============================================================
// 📦 src/data/details/vitaminData.ts
// MVVM Pattern: Model + ViewModel Layer
// ============================================================

const IMG_BASE = "/assets/vitamins" as const;

// ============================================================
// 🔹 Domain Models
// ============================================================
export interface Product {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly brand: string;
  readonly category: string;
  readonly description: string;
  readonly fullDescription: string;
  readonly packSize: string;
  readonly price: number;
  readonly originalPrice: number;
  readonly discount: number;
  readonly stock: number;
  readonly image: string;
  readonly trending: boolean;
  readonly features: readonly string[];
  readonly specifications: Readonly<Record<string, string>>;
  readonly ingredients?: string;
  readonly usage?: string;
  readonly warnings?: string;
}

export interface ProductViewModel extends Product {
  readonly priceKSH: number;
  readonly mrpKSH: number;
  readonly savingsKSH: number;
  readonly priceFormattedKSH: string;
  readonly mrpFormattedKSH: string;
  readonly discountLabel: string;
  readonly hasDiscount: boolean;
}

export type SortMode = "price-asc" | "price-desc" | "name" | "newest" | "popular";

// ============================================================
// 🛠️ Utilities
// ============================================================
const resolveImg = (file: string): string => `${IMG_BASE}/${file}`;

const normalizePct = (val?: number | string): number => {
  if (typeof val === "number") return val;
  if (typeof val === "string") {
    const parsed = parseInt(val.replace(/\D/g, ""), 10);
    return isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

// ============================================================
// 📊 Data Store
// ============================================================
const productsRaw: readonly Product[] = [
  {
    id: "1",
    slug: "vitamin-d3-1000-iu-softgels",
    name: "Vitamin D3 1000 IU Softgels",
    brand: "Nature Made",
    category: "Bone & Immunity Support",
    description: "Essential vitamin for bone strength and immune defense.",
    fullDescription: "Vitamin D3 is crucial for maintaining healthy bones and teeth through enhanced calcium absorption. It also supports immune system function, muscle health, and cellular growth. Our premium softgels use the highly bioavailable D3 (cholecalciferol) form for optimal absorption. Non-GMO, gluten-free, and third-party tested for purity.",
    packSize: "100 Softgels",
    price: 950,
    originalPrice: 1150,
    discount: normalizePct(17),
    stock: 85,
    image: resolveImg("vitamin_d.png"),
    trending: true,
    features: [
      "Supports bone density and calcium absorption",
      "Boosts immune system function",
      "Highly absorbable D3 (cholecalciferol) form",
      "Non-GMO, gluten-free, no artificial colors",
      "Third-party tested for purity and potency",
    ],
    specifications: {
      Strength: "1000 IU per softgel",
      Form: "Softgel",
      "Serving Size": "1 softgel daily",
      "Country of Origin": "USA",
      Certification: "USP Verified",
    },
    ingredients: "Vitamin D3 (as Cholecalciferol), Soybean Oil, Gelatin, Glycerin, Corn Oil",
    usage: "Take one softgel daily with food for best absorption. Consult healthcare provider before use if pregnant or on medication.",
    warnings: "Keep out of reach of children. Do not exceed recommended dose. Consult physician if taking blood thinners.",
  },
  {
    id: "2",
    slug: "vitamin-c-1000mg-tablets",
    name: "Vitamin C 1000mg Tablets",
    brand: "NOW Foods",
    category: "Antioxidant & Immune Health",
    description: "Powerful antioxidant that supports immune resilience.",
    fullDescription: "High-potency Vitamin C provides powerful antioxidant protection against free radicals while supporting immune system health, collagen production, and iron absorption. Our formula includes Rose Hips for added bioflavonoids that enhance vitamin C absorption and efficacy.",
    packSize: "60 Tablets",
    price: 720,
    originalPrice: 880,
    discount: normalizePct("18% Off"),
    stock: 110,
    image: resolveImg("vitamin_c.png"),
    trending: true,
    features: [
      "Potent antioxidant protection",
      "Supports immune system health",
      "Promotes collagen synthesis for healthy skin",
      "Enhanced with Rose Hips bioflavonoids",
      "Vegan, non-GMO, GMP certified",
    ],
    specifications: {
      Strength: "1000mg per tablet",
      Form: "Tablet",
      "Serving Size": "1–2 tablets daily",
      "Country of Origin": "USA",
      Certification: "GMP Quality Assured",
    },
    ingredients: "Vitamin C (as Ascorbic Acid), Rose Hips, Cellulose, Stearic Acid, Silicon Dioxide",
    usage: "Take 1–2 tablets daily with meals. Divide doses for better absorption.",
    warnings: "May cause stomach upset in sensitive individuals. Reduce dose if diarrhea occurs.",
  },
  {
    id: "3",
    slug: "omega-3-fish-oil-1000mg",
    name: "Omega-3 Fish Oil 1000mg",
    brand: "Nordic Naturals",
    category: "Heart & Brain Health",
    description: "Premium omega-3 for cardiovascular and cognitive support.",
    fullDescription: "Our pharmaceutical-grade fish oil is molecularly distilled for exceptional purity and provides optimal ratios of EPA and DHA omega-3 fatty acids. Supports heart health, brain function, joint flexibility, and healthy inflammatory response. Sustainably sourced from wild-caught fish with superior freshness.",
    packSize: "120 Softgels",
    price: 1450,
    originalPrice: 1650,
    discount: normalizePct("12% Off"),
    stock: 60,
    image: resolveImg("omega3.png"),
    trending: true,
    features: [
      "High-potency EPA and DHA omega-3s",
      "Molecularly distilled for purity",
      "Supports heart, brain, and joint health",
      "Sustainably sourced from wild fish",
      "Lemon flavored, no fishy aftertaste",
    ],
    specifications: {
      Strength: "1000mg (640mg EPA/DHA per serving)",
      Form: "Softgel",
      "Serving Size": "2 softgels daily",
      "Country of Origin": "Norway",
      Certification: "Friend of the Sea certified",
    },
    ingredients: "Fish Oil (from Anchovies and Sardines), Gelatin, Glycerin, Natural Lemon Flavor, Vitamin E",
    usage: "Take 2 softgels daily with food. Store in cool, dry place.",
    warnings: "Consult physician if taking blood thinners. Keep refrigerated after opening.",
  },
  {
    id: "4",
    slug: "daily-multivitamin",
    name: "Daily Multivitamin",
    brand: "Centrum",
    category: "Overall Wellness",
    description: "Complete balanced formula to fill nutritional gaps.",
    fullDescription: "Scientifically formulated multivitamin with 24 essential nutrients including vitamins A, C, D, E, K, B-complex, and key minerals. Supports immune health, energy metabolism, bone health, and overall wellness. Ideal for adults seeking comprehensive daily nutrition.",
    packSize: "90 Tablets",
    price: 980,
    originalPrice: 1200,
    discount: normalizePct("18% Off"),
    stock: 130,
    image: resolveImg("multivitamin.png"),
    trending: true,
    features: [
      "24 essential vitamins and minerals",
      "Supports immune, energy, and bone health",
      "Iron for healthy blood cells",
      "B-vitamins for energy metabolism",
      "Gluten-free, non-GMO",
    ],
    specifications: {
      Strength: "Complete daily formula",
      Form: "Tablet",
      "Serving Size": "1 tablet daily",
      "Country of Origin": "USA",
      Certification: "USP Verified",
    },
    ingredients: "Vitamins A, C, D, E, K, B-complex, Calcium, Iron, Zinc, Magnesium, and more",
    usage: "Take one tablet daily with food and water.",
    warnings: "Contains iron. Keep out of reach of children. Accidental overdose can be harmful.",
  },
  {
    id: "5",
    slug: "zinc-picolinate-50mg",
    name: "Zinc Picolinate 50mg",
    brand: "Thorne Research",
    category: "Immunity & Skin Health",
    description: "Superior absorption zinc for immune and skin health.",
    fullDescription: "Zinc picolinate is the most bioavailable form of zinc, ensuring optimal absorption and utilization. Essential for immune function, wound healing, protein synthesis, DNA synthesis, and cell division. Supports healthy skin, hair, and nail growth.",
    packSize: "60 Capsules",
    price: 850,
    originalPrice: 950,
    discount: normalizePct(11),
    stock: 55,
    image: resolveImg("zinc.png"),
    trending: false,
    features: [
      "Highly absorbable picolinate form",
      "Supports immune system function",
      "Promotes healthy skin and wound healing",
      "Essential for protein synthesis",
      "NSF Certified for Sport",
    ],
    specifications: {
      Strength: "50mg elemental zinc",
      Form: "Capsule",
      "Serving Size": "1 capsule daily",
      "Country of Origin": "USA",
      Certification: "NSF Certified",
    },
    ingredients: "Zinc (as Zinc Picolinate), Hypromellose Capsule, Leucine, Silicon Dioxide",
    usage: "Take 1 capsule daily with food or as recommended by healthcare practitioner.",
    warnings: "High doses may cause nausea. Do not exceed recommended dose.",
  },
  {
    id: "6",
    slug: "magnesium-glycinate",
    name: "Magnesium Glycinate",
    brand: "Pure Encapsulations",
    category: "Sleep & Muscle Relaxation",
    description: "Highly absorbable magnesium for relaxation and sleep.",
    fullDescription: "Magnesium glycinate provides highly bioavailable magnesium in a chelated form that is gentle on the stomach. Supports muscle relaxation, healthy sleep patterns, nervous system function, bone health, and cardiovascular health. The glycinate form minimizes laxative effects.",
    packSize: "180 Capsules",
    price: 1600,
    originalPrice: 1800,
    discount: normalizePct("11% Off"),
    stock: 70,
    image: resolveImg("magnesium.png"),
    trending: true,
    features: [
      "Highly absorbable chelated form",
      "Supports muscle relaxation and sleep",
      "Gentle on digestive system",
      "Promotes calm and relaxation",
      "Hypoallergenic, vegan formula",
    ],
    specifications: {
      Strength: "120mg per capsule",
      Form: "Capsule",
      "Serving Size": "1–3 capsules daily",
      "Country of Origin": "USA",
      Certification: "Hypoallergenic certified",
    },
    ingredients: "Magnesium (as Magnesium Glycinate), Vegetarian Capsule, Ascorbyl Palmitate",
    usage: "Take 1–3 capsules daily with meals. Best taken in evening for sleep support.",
    warnings: "May cause drowsiness. Consult physician if taking medications.",
  },
  {
    id: "7",
    slug: "probiotic-50-billion-cfu",
    name: "Probiotic 50 Billion CFU",
    brand: "Garden of Life",
    category: "Digestive Health",
    description: "Multi-strain probiotic for optimal gut balance.",
    fullDescription: "Our clinically studied probiotic formula contains 16 diverse strains and 50 billion CFU to support digestive health, immune function, and nutrient absorption. Shelf-stable with patented delivery technology ensuring live bacteria reach the intestines. Includes prebiotics for enhanced efficacy.",
    packSize: "30 Capsules",
    price: 1900,
    originalPrice: 2200,
    discount: normalizePct(14),
    stock: 40,
    image: resolveImg("probiotics.png"),
    trending: true,
    features: [
      "50 billion CFU with 16 probiotic strains",
      "Supports digestive and immune health",
      "Shelf-stable, no refrigeration needed",
      "Delayed-release capsules",
      "Organic, gluten-free, dairy-free",
    ],
    specifications: {
      Strength: "50 billion CFU",
      Form: "Delayed-release capsule",
      "Serving Size": "1 capsule daily",
      "Country of Origin": "USA",
      Certification: "USDA Organic, Non-GMO Project",
    },
    ingredients: "Probiotic Blend (16 strains including Lactobacillus and Bifidobacterium), Organic Potato Starch, Vegetable Cellulose",
    usage: "Take 1 capsule daily on empty stomach or as directed by healthcare practitioner.",
    warnings: "If pregnant, nursing, or on immunosuppressants, consult physician before use.",
  },
  {
    id: "8",
    slug: "marine-collagen-peptides",
    name: "Marine Collagen Peptides",
    brand: "Vital Proteins",
    category: "Skin, Hair & Joints",
    description: "Premium collagen for skin elasticity and joint health.",
    fullDescription: "Our marine collagen peptides are sourced from wild-caught fish and are highly bioavailable Type I collagen. Supports skin elasticity, hydration, and firmness while promoting healthy hair, nails, and joint function. Easily dissolves in hot or cold liquids with neutral taste.",
    packSize: "284g Powder",
    price: 2500,
    originalPrice: 2800,
    discount: normalizePct("10% Off"),
    stock: 95,
    image: resolveImg("collagen.png"),
    trending: true,
    features: [
      "Wild-caught marine collagen peptides",
      "Supports skin, hair, and nail health",
      "Promotes joint flexibility",
      "Easily digestible and absorbable",
      "Unflavored, mixes easily",
    ],
    specifications: {
      Strength: "10g collagen per serving",
      Form: "Powder",
      "Serving Size": "2 scoops (20g)",
      "Country of Origin": "Sourced globally",
      Certification: "Paleo-friendly, Keto-certified",
    },
    ingredients: "Marine Collagen Peptides (from Wild-Caught Fish)",
    usage: "Mix 2 scoops in 8oz of hot or cold liquid daily. Add to coffee, smoothies, or water.",
    warnings: "Not suitable for individuals with fish allergies.",
  },
  {
    id: "9",
    slug: "calcium-magnesium-tablets",
    name: "Calcium & Magnesium Tablets",
    brand: "Solaray",
    category: "Bone Health",
    description: "Balanced formula for strong bones and muscle function.",
    fullDescription: "Our synergistic blend provides calcium and magnesium in optimal 2:1 ratio to support bone density, muscle contraction, nerve transmission, and cardiovascular function. Enhanced with Vitamin D for improved calcium absorption and utilization.",
    packSize: "100 Tablets",
    price: 650,
    originalPrice: 750,
    discount: normalizePct(13),
    stock: 120,
    image: resolveImg("calcium.png"),
    trending: false,
    features: [
      "Optimal 2:1 calcium to magnesium ratio",
      "Supports bone density and strength",
      "Promotes healthy muscle function",
      "Enhanced with Vitamin D3",
      "Easy-to-swallow tablets",
    ],
    specifications: {
      Strength: "1000mg Calcium, 500mg Magnesium",
      Form: "Tablet",
      "Serving Size": "2 tablets daily",
      "Country of Origin": "USA",
      Certification: "Lab verified",
    },
    ingredients: "Calcium (as Carbonate and Citrate), Magnesium (as Oxide and Citrate), Vitamin D3, Cellulose, Stearic Acid",
    usage: "Take 2 tablets daily with meals, preferably divided throughout the day.",
    warnings: "Consult physician if taking medications. Do not exceed recommended dose.",
  },
  {
    id: "10",
    slug: "iron-complex-gentle-formula",
    name: "Iron Complex Gentle Formula",
    brand: "MegaFood",
    category: "Energy & Blood Health",
    description: "Non-constipating iron for energy and healthy blood.",
    fullDescription: "Our gentle iron formula combines iron with whole foods and FoodState Nutrients for optimal absorption and tolerance. Supports healthy red blood cell production, oxygen transport, and energy metabolism without causing constipation or stomach upset.",
    packSize: "60 Tablets",
    price: 1100,
    originalPrice: 1300,
    discount: normalizePct(15),
    stock: 80,
    image: resolveImg("iron.png"),
    trending: false,
    features: [
      "Gentle, non-constipating formula",
      "Supports healthy blood and energy",
      "Enhanced with whole foods",
      "Can be taken on empty stomach",
      "Gluten-free, vegetarian, non-GMO",
    ],
    specifications: {
      Strength: "26mg elemental iron",
      Form: "Tablet",
      "Serving Size": "1 tablet daily",
      "Country of Origin": "USA",
      Certification: "Certified B Corp, Non-GMO Project",
    },
    ingredients: "Iron (as Ferrous Bisglycinate), Organic Brown Rice, Beet Root, Vitamin C",
    usage: "Take 1 tablet daily with or without food.",
    warnings: "Keep out of reach of children. Accidental iron overdose is harmful to children.",
  },
  {
    id: "11",
    slug: "vitamin-b12-methylcobalamin",
    name: "Vitamin B12 Methylcobalamin",
    brand: "Jarrow Formulas",
    category: "Energy & Nervous System",
    description: "Active B12 for brain, nerve, and energy support.",
    fullDescription: "Methylcobalamin is the bioactive, coenzyme form of vitamin B12 used directly by the body. Superior to cyanocobalamin, it supports neurological function, red blood cell formation, energy metabolism, and homocysteine regulation. Lozenge form allows for enhanced absorption.",
    packSize: "100 Lozenges",
    price: 780,
    originalPrice: 900,
    discount: normalizePct(13),
    stock: 65,
    image: resolveImg("vitamin_b12.png"),
    trending: true,
    features: [
      "Active methylcobalamin form",
      "Supports brain and nerve health",
      "Promotes healthy energy metabolism",
      "Better absorption than cyanocobalamin",
      "Pleasant cherry flavor",
    ],
    specifications: {
      Strength: "1000mcg per lozenge",
      Form: "Sublingual lozenge",
      "Serving Size": "1 lozenge daily",
      "Country of Origin": "USA",
      Certification: "Vegan, Non-GMO",
    },
    ingredients: "Vitamin B12 (as Methylcobalamin), Xylitol, Cellulose, Natural Cherry Flavor, Stearic Acid",
    usage: "Dissolve 1 lozenge under tongue daily or as directed by healthcare professional.",
    warnings: "Consult physician if pregnant, nursing, or taking medications.",
  },
  {
    id: "12",
    slug: "turmeric-curcumin-complex",
    name: "Turmeric Curcumin Complex",
    brand: "Gaia Herbs",
    category: "Inflammation Support",
    description: "Potent anti-inflammatory for joint and overall health.",
    fullDescription: "Our full-spectrum turmeric extract provides 95% curcuminoids enhanced with black pepper (BioPerine) for superior absorption. Supports healthy inflammatory response, joint mobility, antioxidant protection, and overall wellness. Vegan, organic, and sustainably sourced.",
    packSize: "120 Vegan Capsules",
    price: 1350,
    originalPrice: 1550,
    discount: normalizePct("13% Off"),
    stock: 50,
    image: resolveImg("turmeric.png"),
    trending: true,
    features: [
      "95% standardized curcuminoids",
      "Enhanced with BioPerine for absorption",
      "Supports healthy inflammation response",
      "Promotes joint mobility and comfort",
      "Organic, vegan, non-GMO",
    ],
    specifications: {
      Strength: "500mg per capsule",
      Form: "Vegan capsule",
      "Serving Size": "1–2 capsules daily",
      "Country of Origin": "USA",
      Certification: "USDA Organic, Certified B Corp",
    },
    ingredients: "Organic Turmeric Root Extract (95% Curcuminoids), Black Pepper Extract (BioPerine), Organic Turmeric Root, Plant-derived Capsule",
    usage: "Take 1–2 capsules daily with meals for best results.",
    warnings: "May interact with blood thinners. Consult physician if pregnant or taking medications.",
  },
] as const;

// ============================================================
// 🔄 ViewModel Transformer
// ============================================================
const toViewModel = (p: Product): ProductViewModel => ({
  ...p,
  priceKSH: p.price,
  mrpKSH: p.originalPrice,
  savingsKSH: p.originalPrice - p.price,
  priceFormattedKSH: formatPrice(p.price),
  mrpFormattedKSH: formatPrice(p.originalPrice),
  discountLabel: p.discount > 0 ? `${p.discount}% Off` : "",
  hasDiscount: p.originalPrice > p.price,
});

// ============================================================
// 📊 Public API
// ============================================================
export const products = productsRaw.map(toViewModel);

export const getProductBySlug = (slug: string): ProductViewModel | undefined =>
  products.find((p) => p.slug === slug);

export const getProductById = (id: string): ProductViewModel | undefined =>
  products.find((p) => p.id === id);

export const getTrendingProducts = (): readonly ProductViewModel[] =>
  products.filter((p) => p.trending);

export const getSimilarProducts = (slug: string, limit = 4): readonly ProductViewModel[] => {
  const base = getProductBySlug(slug);
  return base ? products.filter((p) => p.category === base.category && p.slug !== slug).slice(0, limit) : [];
};

export const getProductsByCategory = (cat: string): readonly ProductViewModel[] =>
  products.filter((p) => p.category === cat);

export const getLowStockProducts = (threshold = 50): readonly ProductViewModel[] =>
  products.filter((p) => p.stock > 0 && p.stock <= threshold);

export const searchProducts = (query: string): readonly ProductViewModel[] => {
  const q = query.trim().toLowerCase();
  return q ? products.filter((p) => [p.name, p.brand, p.category, p.description].some((f) => f.toLowerCase().includes(q))) : products;
};

export const sortProducts = (items: readonly ProductViewModel[], mode: SortMode): ProductViewModel[] => {
  const copy = [...items];
  const sorts: Record<SortMode, () => ProductViewModel[]> = {
    "price-asc": () => copy.sort((a, b) => a.price - b.price),
    "price-desc": () => copy.sort((a, b) => b.price - a.price),
    name: () => copy.sort((a, b) => a.name.localeCompare(b.name)),
    popular: () => copy.sort((a, b) => Number(b.trending) - Number(a.trending)),
    newest: () => copy.reverse(),
  };
  return sorts[mode]?.() ?? copy;
};

export const getCategories = (): string[] => [...new Set(products.map((p) => p.category))];

export const getProductStats = () => ({
  total: products.length,
  trending: getTrendingProducts().length,
  lowStock: getLowStockProducts().length,
  categories: getCategories().length,
  avgPrice: Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length),
});

// Backward compatibility aliases
export const getDealInKSH = getProductBySlug;
export const getAllDealsInKSH = (): readonly ProductViewModel[] => products;