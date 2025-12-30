//src/data/gitData.ts

import type { StaticImageData } from "next/image";


import pic1 from "../assets/products/Omeprazole.png";
import pic2 from "../assets/products/Pantoprazole.png";
import pic3 from "../assets/products/metronidazole-gel.png";
import pic4 from "../assets/products/amoxicillin-clavulanate.png";
import pic5 from "../assets/products/Loperamide.png";
import pic6 from "../assets/products/Omeprazole.png";
import pic7 from "../assets/products/Ondansetron.png";
import pic8 from "../assets/products/Esomeprazole.png";
import pic9 from "../assets/products/ORS1.png";
import pic10 from "../assets/products/Probiotic.png";

// ---------------------------------------------------------------------------
// Types (MODEL)
// ---------------------------------------------------------------------------
export type StockStatus = "In Stock" | "Out of Stock";

export interface GitProduct {
  id: number;
  name: string;
  slug: string; // auto-generated
  image: StaticImageData;
  price: number;
  category: string;
  stock: StockStatus;

  // Optional extended fields (Details page ready)
  description?: string;
  fullDescription?: string;
  features?: string[];
  howToUse?: string;
}

// ---------------------------------------------------------------------------
// Utilities (CONTROLLER helpers — framework agnostic)
// ---------------------------------------------------------------------------
const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[®™]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const formatPrice = (price: number): string => `KES ${price.toLocaleString()}`;

const getStockStatus = (product: GitProduct): StockStatus => product.stock;

// ---------------------------------------------------------------------------
// Raw Data (NO logic here — DRY)
// ---------------------------------------------------------------------------
const RAW_GIT_PRODUCTS: Omit<GitProduct, "slug">[] = [
  {
    id: 1,
    name: "Omeprazole 20mg Capsules (Losec®)",
    image: pic1,
    price: 350,
    category: "Proton Pump Inhibitor (PPI)",
    stock: "In Stock",
    description: "Reduces stomach acid production and relieves GERD symptoms.",
  },
  {
    id: 2,
    name: "Pantoprazole 40mg Tablets (Protonix®)",
    image: pic2,
    price: 420,
    category: "Proton Pump Inhibitor (PPI)",
    stock: "In Stock",
  },
  {
    id: 3,
    name: "Metronidazole 400mg Tablets (Flagyl®)",
    image: pic3,
    price: 250,
    category: "Antibiotic / Antiprotozoal",
    stock: "In Stock",
  },
  {
    id: 4,
    name: "Amoxicillin-Clavulanate 625mg Tabs (Augmentin®)",
    image: pic4,
    price: 850,
    category: "Antibiotic (Broad-Spectrum)",
    stock: "In Stock",
  },
  {
    id: 5,
    name: "Loperamide 2mg Capsules (Imodium®)",
    image: pic5,
    price: 300,
    category: "Antidiarrheal",
    stock: "In Stock",
  },
  {
    id: 6,
    name: "Domperidone 10mg Tablets (Motilium®)",
    image: pic6,
    price: 280,
    category: "Prokinetic / Antiemetic",
    stock: "In Stock",
  },
  {
    id: 7,
    name: "Ondansetron 8mg Tablets (Zofran®)",
    image: pic7,
    price: 650,
    category: "Antiemetic (5-HT3 Antagonist)",
    stock: "In Stock",
  },
  {
    id: 8,
    name: "Esomeprazole 40mg Tablets (Nexium®)",
    image: pic8,
    price: 520,
    category: "Proton Pump Inhibitor (PPI)",
    stock: "In Stock",
  },
  {
    id: 9,
    name: "Oral Rehydration Salts (ORS)",
    image: pic9,
    price: 100,
    category: "Electrolyte Rehydration",
    stock: "In Stock",
  },
  {
    id: 10,
    name: "Probiotic Capsules (Lactobacillus GG / Florastor®)",
    image: pic10,
    price: 900,
    category: "Gut Flora Support",
    stock: "In Stock",
  },
];

// ---------------------------------------------------------------------------
// Normalized Data (AUTO-SLUGS)
// ---------------------------------------------------------------------------
export const gitProducts: GitProduct[] = RAW_GIT_PRODUCTS.map((p) => ({
  ...p,
  slug: slugify(p.name),
}));

// ---------------------------------------------------------------------------
// Selectors / Query Helpers (CONTROLLER)
// ---------------------------------------------------------------------------
const getAllProducts = (): GitProduct[] => gitProducts;

const getProductBySlug = (slug: string): GitProduct | undefined =>
  gitProducts.find((p) => p.slug === slug);

const getProductById = (id: number): GitProduct | undefined =>
  gitProducts.find((p) => p.id === id);

const getSimilarProducts = (id: number, limit = 4): GitProduct[] => {
  const current = getProductById(id);
  if (!current) return [];

  return gitProducts
    .filter((p) => p.category === current.category && p.id !== id)
    .slice(0, limit);
};

// ---------------------------------------------------------------------------
// Default Export (MVC-friendly bundle)
// ---------------------------------------------------------------------------
const gitData = {
  // model
  gitProducts,

  // selectors
  getAllProducts,
  getProductBySlug,
  getProductById,
  getSimilarProducts,

  // utils
  formatPrice,
  getStockStatus,
};

export default gitData;
