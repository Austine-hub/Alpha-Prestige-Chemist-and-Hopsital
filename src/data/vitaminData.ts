

import type { StaticImageData } from "next/image";

// ============================================================================
// 📦 IMAGE ASSET IMPORTS
// ============================================================================

import image1 from "../assets/vitamins/vitamin_d.png";
import image2 from "../assets/vitamins/vitamin_c.png";
import image3 from "../assets/vitamins/omega3.png";
import image4 from "../assets/vitamins/multivitamin.png";
import image5 from "../assets/vitamins/zinc.png";
import image6 from "../assets/vitamins/magnesium.png";
import image7 from "../assets/vitamins/probiotics.png";
import image8 from "../assets/vitamins/collagen.png";
import image9 from "../assets/vitamins/calcium.png";
import image10 from "../assets/vitamins/iron.png";
import image11 from "../assets/vitamins/vitamin_b12.png";
import image12 from "../assets/vitamins/turmeric.png";
import image13 from "../assets/vitamins/melatonin.png";
import image14 from "../assets/vitamins/glucosamine.png";

// ============================================================================
// 🧬 TYPE DEFINITIONS
// ============================================================================

export type HealthCategory =
  | "Immune Support"
  | "Bone & Joint"
  | "Digestive Health"
  | "Energy & Metabolism"
  | "Heart & Brain Health"
  | "Sleep & Mood"
  | "Beauty & Skin"
  | "Herbal Supplements";

export type SupplementForm =
  | "Capsule"
  | "Tablet"
  | "Softgel"
  | "Liquid"
  | "Powder"
  | "Gummy";

export type HealthGoal =
  | "General Wellness"
  | "Energy Boost"
  | "Sleep Quality"
  | "Stress Relief"
  | "Muscle Recovery"
  | "Weight Management"
  | "Focus & Memory"
  | "Bone & Joint"
  | "Immune Support"
  | "Beauty & Skin"
  | "Digestive Health"
  | "Heart & Brain Health";

export type ProductTag =
  | "Bestseller"
  | "New Arrival"
  | "Vegan"
  | "Non-GMO"
  | "Gluten-Free"
  | "High Potency"
  | "Organic"
  | "Sustainably Sourced"
  | "Herbal";

// ============================================================================
// 🧾 PRODUCT MODEL
// ============================================================================

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: HealthCategory;
  slug: string;

  image: string | StaticImageData;
  images: (string | StaticImageData)[];

  packSize: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  currency: string;

  rating: number;
  reviewCount: number;

  description: string;
  fullDescription: string;

  keyIngredients: string[];
  benefits: string[];
  suggestedUse: string[];

  form: SupplementForm;
  healthGoals: HealthGoal[];
  specifications: Record<string, string>;

  inStock: boolean;
  stockCount: number;

  isFeatured?: boolean;
  isTrending: boolean;
  tags?: ProductTag[];

  /** ISO date — used for sorting, analytics, "New arrivals" */
  createdAt?: string;
}

// ============================================================================
// 💾 PRODUCT DATA
// ============================================================================

export const products: Product[] = [
  {
    id: "prod_101",
    name: "Vitamin D3 + K2 Complex",
    brand: "HealthCore",
    category: "Immune Support",
    slug: "healthcore-vitamin-d3-k2-complex",
    image: image1,
    images: [image1],
    packSize: "120 Softgels",
    price: 1350,
    originalPrice: 1590,
    discount: "15% Off",
    currency: "KES",
    rating: 4.8,
    reviewCount: 3456,
    description:
      "High-potency Vitamin D3 and K2 blend designed to support bone density, immunity, and cardiovascular health.",
    fullDescription:
      "Advanced D3 (5000 IU) + K2 (MK-7) formula supporting calcium absorption, immune strength, and cardiovascular health.",
    keyIngredients: ["Vitamin D3 (5000 IU)", "Vitamin K2 (MK-7)"],
    benefits: [
      "Supports bone and joint strength",
      "Boosts immune function",
      "Enhances calcium metabolism",
    ],
    suggestedUse: ["Take 1 softgel daily with a fat-containing meal."],
    form: "Softgel",
    healthGoals: ["General Wellness", "Bone & Joint", "Immune Support"],
    specifications: {
      Strength: "5000 IU D3 + 100mcg K2",
      Servings: "120",
      Purity: "Third-party tested",
    },
    inStock: true,
    stockCount: 150,
    isFeatured: true,
    isTrending: true,
    tags: ["Bestseller", "Non-GMO", "High Potency"],
    createdAt: "2023-11-20T00:00:00Z",
  },

  {
    id: "prod_102",
    name: "Vitamin C 1000mg Timed Release",
    brand: "ImmunePro",
    category: "Immune Support",
    slug: "immunepro-vitamin-c-1000mg-timed-release",
    image: image2,
    images: [image2],
    packSize: "100 Tablets",
    price: 890,
    originalPrice: 990,
    currency: "KES",
    rating: 4.7,
    reviewCount: 2120,
    description:
      "Sustained-release Vitamin C formula for long-lasting antioxidant and immune support.",
    fullDescription:
      "Timed-release Vitamin C for all-day antioxidant protection and immune strength.",
    keyIngredients: ["Ascorbic Acid (1000 mg)", "Rose Hips"],
    benefits: [
      "All-day antioxidant support",
      "Supports collagen synthesis",
      "Boosts immune health",
    ],
    suggestedUse: ["Take 1 tablet daily with meals."],
    form: "Tablet",
    healthGoals: ["General Wellness", "Immune Support", "Beauty & Skin"],
    specifications: {
      Strength: "1000 mg",
      Vegan: "Yes",
    },
    inStock: true,
    stockCount: 88,
    isTrending: true,
    tags: ["Vegan", "Gluten-Free"],
    createdAt: "2024-01-10T00:00:00Z",
  },

    {
    id: "prod_105",
    name: "Probiotic Gummies for Adults",
    brand: "GutHealth",
    category: "Digestive Health",
    slug: "guthealth-probiotic-gummies-adults",
    image: image5,
    images: [image5],
    packSize: "60 Gummies",
    price: 1250,
    originalPrice: 1450,
    discount: "10% Off",
    currency: "KES",
    rating: 4.5,
    reviewCount: 980,
    description:
      "Delicious cherry-flavored gummies providing essential probiotics for a balanced gut and improved digestion.",
    fullDescription:
      "Contains 5 billion CFUs of beneficial bacteria to support digestive and immune health. A tasty way to get your daily dose of gut support.",
    keyIngredients: ["Bacillus Coagulans", "Chicory Root Fiber"],
    benefits: [
      "Supports gut flora balance",
      "Aids in healthy digestion",
      "Boosts nutrient absorption",
    ],
    suggestedUse: ["Chew 2 gummies daily."],
    form: "Gummy",
    healthGoals: ["General Wellness", "Digestive Health", "Immune Support"],
    specifications: {
      CFU: "5 Billion",
      Flavor: "Natural Cherry",
      Vegan: "No",
    },
    inStock: true,
    stockCount: 95,
    isTrending: true,
    tags: ["New Arrival", "Gluten-Free"],
  },
  {
    id: "prod_106",
    name: "Magnesium Glycinate Complex",
    brand: "CalmMind",
    category: "Sleep & Mood",
    slug: "calmmind-magnesium-glycinate-complex",
    image: image6,
    images: [image6],
    packSize: "180 Capsules",
    price: 1690,
    currency: "KES",
    rating: 4.9,
    reviewCount: 2900,
    description:
      "Highly bioavailable form of Magnesium for relaxation, sleep quality, and muscle recovery.",
    fullDescription:
      "Magnesium Glycinate is known for its superior absorption and gentle effect on the stomach. Essential for over 300 bodily functions, especially sleep and stress management.",
    keyIngredients: ["Magnesium Glycinate (400mg)"],
    benefits: [
      "Promotes deep, restorative sleep",
      "Relieves muscle cramps and tension",
      "Supports nervous system health",
    ],
    suggestedUse: ["Take 3 capsules 30 minutes before bed."],
    form: "Capsule",
    healthGoals: ["Sleep Quality", "Stress Relief", "General Wellness"],
    specifications: {
      Strength: "400 mg",
      Form: "Capsule",
      Absorption: "High",
    },
    inStock: true,
    stockCount: 42,
    isTrending: true,
    tags: ["Bestseller", "Non-GMO"],
  },
  {
    id: "prod_107",
    name: "High Potency Biotin 10000 mcg",
    brand: "HairSkinNails",
    category: "Beauty & Skin",
    slug: "hsn-high-potency-biotin",
    image: image7,
    images: [image7],
    packSize: "100 Tablets",
    price: 750,
    currency: "KES",
    rating: 4.4,
    reviewCount: 1800,
    description:
      "Supports healthy hair growth, stronger nails, and radiant skin from the inside out.",
    fullDescription:
      "Biotin is a key B-vitamin that plays a crucial role in the body's metabolic function and is vital for maintaining the health of hair, skin, and nails.",
    keyIngredients: ["Biotin (10000 mcg)", "Calcium"],
    benefits: [
      "Promotes hair thickness and shine",
      "Strengthens brittle nails",
      "Supports skin health",
    ],
    suggestedUse: ["Take 1 tablet daily with a meal."],
    form: "Tablet",
    healthGoals: ["Beauty & Skin", "General Wellness"],
    specifications: {
      Strength: "10000 mcg",
      Formula: "Hair, Skin, Nails",
      Servings: "100",
    },
    inStock: true,
    stockCount: 210,
    isTrending: false,
    tags: ["Gluten-Free", "High Potency"],
  },
  {
    id: "prod_108",
    name: "Pure Marine Collagen Powder",
    brand: "VitaBloom",
    category: "Bone & Joint",
    slug: "vitabloom-pure-marine-collagen-powder",
    image: image8,
    images: [image8],
    packSize: "300g Powder",
    price: 2490,
    originalPrice: 2890,
    discount: "14% Off",
    currency: "KES",
    rating: 4.7,
    reviewCount: 3100,
    description:
      "Unflavored, highly dissolvable collagen peptides to support joint flexibility and skin elasticity.",
    fullDescription:
      "Sustainably sourced marine collagen (Type I & III). Easily mixes into hot or cold drinks to support healthy bones, joints, and connective tissue.",
    keyIngredients: ["Hydrolyzed Marine Collagen Peptides"],
    benefits: [
      "Improves joint comfort and mobility",
      "Reduces fine lines and wrinkles",
      "Supports lean muscle mass",
    ],
    suggestedUse: ["Mix 1 scoop into 8oz of liquid daily."],
    form: "Powder",
    healthGoals: ["Bone & Joint", "Beauty & Skin", "Muscle Recovery"],
    specifications: {
      Type: "Marine (Type I & III)",
      ServingSize: "10g",
      Flavor: "Unflavored",
    },
    inStock: true,
    stockCount: 70,
    isTrending: true,
    tags: ["Sustainably Sourced", "Bestseller", "New Arrival"],
  },
  

  {
    id: "prod_109",
    name: "B-Complex Ultra Formula",
    brand: "EnergyPlus",
    category: "Energy & Metabolism",
    slug: "energyplus-bcomplex-ultra",
    image: image9,
    images: [image9],
    packSize: "90 Vegetarian Capsules",
    price: 1250,
    originalPrice: 1450,
    discount: "14% Off",
    currency: "KES",
    rating: 4.6,
    reviewCount: 1400,
    description: "Complete B vitamin complex with methyl-B12 for maximum energy and nerve support.",
    fullDescription: "All eight essential B vitamins in their co-enzymated, bioavailable forms to support cellular energy production, brain function, and a healthy nervous system. Vegan-friendly.",
    keyIngredients: ["Methylcobalamin (B12)", "Folate (B9)", "Thiamine (B1)"],
    benefits: ["Increases natural energy levels", "Supports nerve health and mood", "Aids in stress management"],
    suggestedUse: ["Take 1 capsule in the morning with food."],
    form: "Capsule",
    healthGoals: ["Energy Boost", "Stress Relief", "Focus & Memory"],
    specifications: {
      Formula: "Co-Enzymated",
      Form: "Vegetarian Capsule",
      B12_Type: "Methylcobalamin",
    },
    inStock: true,
    stockCount: 110,
    isTrending: true,
    tags: ["Vegan", "Non-GMO"],
    createdAt: "2023-11-20T00:00:00Z",
  },
  {
    id: "prod_110",
    name: "Gentle Iron 25mg",
    brand: "NutraEssentials",
    category: "Energy & Metabolism",
    slug: "nutraessentials-gentle-iron",
    image: image10,
    images: [image10],
    packSize: "90 Vegetarian Capsules",
    price: 990,
    currency: "KES",
    rating: 4.4,
    reviewCount: 780,
    description: "Highly tolerated iron bisglycinate that is gentle on the stomach.",
    fullDescription: "A non-constipating form of iron (Ferrous Bisglycinate) to support red blood cell formation and fight fatigue without the common side effects of standard iron supplements.",
    keyIngredients: ["Iron Bisglycinate (25mg)"],
    benefits: ["Supports healthy red blood cells", "Fights fatigue and low energy", "Gentle on the digestive system"],
    suggestedUse: ["Take 1 capsule daily with food, or as directed by a healthcare provider."],
    form: "Capsule",
    healthGoals: ["Energy Boost"],
    specifications: {
      Strength: "25 mg",
      Form: "Capsule",
      Tolerance: "Gentle on stomach",
    },
    inStock: true,
    stockCount: 55,
    isTrending: false,
    tags: ["Gluten-Free", "Vegan"],
    createdAt: "2023-09-01T00:00:00Z",
  },
  {
    id: "prod_111",
    name: "Ashwagandha KSM-66 600mg",
    brand: "AdaptogenLabs",
    category: "Herbal Supplements",
    slug: "adaptogenlabs-ashwagandha-ksm66",
    image: image11,
    images: [image11],
    packSize: "60 Vegan Capsules",
    price: 1490,
    originalPrice: 1750,
    discount: "15% Off",
    currency: "KES",
    rating: 4.8,
    reviewCount: 2900,
    description: "Clinically studied KSM-66 extract for stress and cognitive support.",
    fullDescription: "A powerful adaptogen that helps the body manage stress, promotes balance, and improves cognitive functions like memory and focus. High concentration of active compounds (withanolides).",
    keyIngredients: ["Ashwagandha Root Extract (KSM-66)"],
    benefits: ["Reduces cortisol and stress", "Promotes calmness and relaxation", "Supports cognitive performance"],
    suggestedUse: ["Take 1 capsule twice daily with meals."],
    form: "Capsule",
    healthGoals: ["Stress Relief", "Sleep Quality", "Focus & Memory"],
    specifications: {
      Strength: "600 mg",
      Extract: "KSM-66 (High concentration)",
      Form: "Vegan Capsule",
    },
    inStock: true,
    stockCount: 30,
    isFeatured: true,
    isTrending: true,
    tags: ["Bestseller", "Herbal", "Organic"],
    createdAt: "2023-07-01T00:00:00Z",
  },
  {
    id: "prod_112",
    name: "Turmeric Curcumin Complex",
    brand: "FlexJoint",
    category: "Bone & Joint",
    slug: "flexjoint-turmeric-curcumin",
    image: image12,
    images: [image12],
    packSize: "120 Vegetarian Capsules",
    price: 1550,
    originalPrice: 1790,
    discount: "13% Off",
    currency: "KES",
    rating: 4.7,
    reviewCount: 1650,
    description: "Enhanced absorption formula for joint comfort and inflammatory support.",
    fullDescription: "Contains a high dose of Curcuminoids combined with Black Pepper extract (Piperine) to maximize absorption, providing potent antioxidant and anti-inflammatory benefits.",
    keyIngredients: ["Curcuminoids", "Black Pepper Extract (Piperine)"],
    benefits: ["Supports joint mobility and comfort", "Powerful anti-inflammatory action", "Antioxidant protection"],
    suggestedUse: ["Take 2 capsules daily with food."],
    form: "Capsule",
    healthGoals: ["Bone & Joint", "General Wellness"],
    specifications: {
      Strength: "1000 mg",
      Enhancement: "With Piperine",
      Form: "Vegetarian Capsule",
    },
    inStock: true,
    stockCount: 60,
    isTrending: true,
    tags: ["High Potency", "Vegan"],
    createdAt: "2023-05-10T00:00:00Z",
  },
{
  id: "prod_113",
  name: "Melatonin 5mg Gummies",
  brand: "SleepAid",
  category: "Sleep & Mood",
  slug: "sleepaid-melatonin-gummies",
  image: image13,
  images: [image13],
  packSize: "60 Gummies",
  price: 1050,
  currency: "KES",
  rating: 4.5,
  reviewCount: 950,
  description:
    "Delicious berry-flavored gummies designed to help you fall asleep faster and maintain healthy sleep cycles.",
  fullDescription:
    "Melatonin is a hormone naturally produced by the body that regulates sleep-wake cycles. These easy-to-take gummies help reset your internal clock and promote calm, restorative sleep. Not intended for activities requiring full alertness after consumption.",
  keyIngredients: ["Melatonin (5mg)"],
  benefits: [
    "Reduces time to fall asleep",
    "Supports healthy sleep cycles",
    "Non-habit forming",
  ],
  suggestedUse: ["Take 1–2 gummies 30 minutes before bedtime."],
  form: "Gummy",
  healthGoals: ["Sleep Quality"],
  specifications: {
    Strength: "5 mg",
    Form: "Gummy",
    Flavor: "Natural Berry",
  },
  inStock: true,
  stockCount: 25,
  isTrending: false,
  tags: ["New Arrival", "Gluten-Free"],
  createdAt: "2024-09-15T00:00:00Z",
},

  {
    id: "prod_114",
    name: "Glucosamine Chondroitin MSM",
    brand: "FlexJoint",
    category: "Bone & Joint",
    slug: "flexjoint-glucosamine-msm",
    image: image14,
    images: [image14],
    packSize: "180 Tablets",
    price: 2400,
    originalPrice: 2800,
    discount: "14% Off",
    currency: "KES",
    rating: 4.6,
    reviewCount: 1800,
    description: "The ultimate joint formula for flexibility and connective tissue support.",
    fullDescription: "A powerful combination that helps maintain the structural integrity of joints, cartilage, and connective tissues, promoting long-term joint health and mobility.",
    keyIngredients: ["Glucosamine Sulfate", "Chondroitin Sulfate", "MSM"],
    benefits: ["Supports cartilage repair", "Lubricates joints for better mobility", "Reduces discomfort"],
    suggestedUse: ["Take 3 tablets daily with food."],
    form: "Tablet",
    healthGoals: ["Bone & Joint"],
    specifications: {
      Strength: "1500mg Glucosamine",
      "Per Serving": "3 Tablets",
    },
    inStock: true,
    stockCount: 70,
    isFeatured: true,
    isTrending: true,
    tags: ["Bestseller", "High Potency"],
    createdAt: "2023-03-20T00:00:00Z",
  },


];

// ============================================================================
// 🛠️ CONTROLLER UTILITIES
// ============================================================================

export const formatPrice = (price: number): string =>
  new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    minimumFractionDigits: 0,
  })
    .format(price)
    .replace("KES", "KSH");

export const getAllProducts = (): Product[] => [...products];

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getTrendingProducts = (): Product[] =>
  products.filter((p) => p.isTrending);

export const getNewArrivals = (): Product[] =>
  products
    .filter((p) => p.createdAt)
    .sort(
      (a, b) =>
        new Date(b.createdAt!).getTime() -
        new Date(a.createdAt!).getTime()
    );

export const searchProducts = (query: string): Product[] => {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q)
  );
};
