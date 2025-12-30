// src/data/RespiratoryData.ts

// -----------------------------
// Product Interface
// -----------------------------
export interface Product {
  id: number;
  name: string;
  slug: string;
  image: string; // path or imported StaticImageData
  category: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  description: string;
  fullDescription?: string;
  brand?: string;
  stock?: number;
  trending?: boolean;
  howToUse?: string;
  features?: string[];
  specifications?: Record<string, string>;
  badge?: string;
}

// -----------------------------
// Normalization & helpers (DRY)
// -----------------------------
export const normalizeSlug = (text: string): string =>
  text
    .toString()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const slugify = normalizeSlug;

export const img = (file: string) => `/assets/product/${file}`;

export const formatPrice = (price: number): string =>
  `KES ${price.toLocaleString("en-KE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

export const getStockStatus = (p: Partial<Product>): string => {
  const s = p.stock ?? 0;
  if (s <= 0) return "Out of Stock";
  if (s < 50) return "Low Stock";
  return "In Stock";
};

// -----------------------------
// RAW PRODUCTS (slugs auto-generated)
// -----------------------------
type RawProduct = Omit<Product, "slug"> & { slug?: string };

export const rawProducts: RawProduct[] = [
  { id: 1, name: "Amoxicillin 500mg Capsules (30’s)", image: img("Amoxicillin.png"), price: 850, category: "Antibiotic", stock: 200, description: "Broad-spectrum antibiotic.", badge: "Bestseller" },
  { id: 2, name: "Azithromycin 500mg Tablets (6’s)", image: img("Azithromycin.png"), price: 1240, category: "Antibiotic", stock: 150, description: "Macrolide antibiotic for respiratory infections." },
  { id: 3, name: "Clarithromycin 500mg Tablets (14’s)", image: img("Clarithromycin.png"), price: 1680, category: "Antibiotic", stock: 120, description: "Used for bacterial respiratory infections." },
  { id: 4, name: "Augmentin 625mg Tabs (14’s)", image: img("Augmentin.png"), price: 1950, category: "Antibiotic", stock: 100, description: "Combination antibiotic with clavulanic acid." },
  { id: 5, name: "Levofloxacin 500mg Tablets (10’s)", image: img("Levofloxacin.png"), price: 1820, category: "Antibiotic", stock: 80, description: "Fluoroquinolone antibiotic." },
  { id: 6, name: "Cefuroxime Axetil 500mg Tablets (14’s)", image: img("Cefuroxime Axetil 500mg Tablets.png"), price: 1720, category: "Antibiotic", stock: 75, description: "Second-generation cephalosporin antibiotic." },
  { id: 7, name: "Ceftriaxone 1g Injection (Single Vial)", image: img("Ceftriaxone.png"), price: 640, category: "Injection", stock: 90, description: "Broad-spectrum injectable antibiotic." },
  { id: 8, name: "Erythromycin 500mg Tablets (20’s)", image: img("Erythromycin2.png"), price: 980, category: "Antibiotic", stock: 130, description: "Macrolide antibiotic for respiratory infections." },
  { id: 9, name: "Ventolin Inhaler (Salbutamol 100mcg)", image: img("Ventolin.png"), price: 850, category: "Bronchodilator", stock: 250, description: "Short-acting bronchodilator for asthma." },
  { id: 10, name: "Symbicort Inhaler (Budesonide + Formoterol)", image: img("Symbicort-Inhaler.png"), price: 2850, category: "Inhaler", stock: 200, description: "Combination inhaler for asthma and COPD." },
  { id: 11, name: "Ambroxol Syrup 100ml", image: img("ambroxol.png"), price: 520, category: "Expectorant", stock: 300, description: "Helps clear mucus in respiratory tract." },
  { id: 12, name: "Bromhexine Syrup 100ml", image: img("Bromhexine.png"), price: 490, category: "Mucolytic", stock: 270, description: "Mucolytic for easier expectoration." },
  { id: 13, name: "Benylin Dry Cough Syrup 100ml", image: img("Benylin-Dry-Cough.png"), price: 720, category: "Cough Suppressant", stock: 150, description: "Relieves dry cough." },
  { id: 14, name: "Cetirizine 10mg Tablets (30’s)", image: img("Cetirizine.png"), price: 650, category: "Antihistamine", stock: 180, description: "Used to relieve allergy symptoms." },
  { id: 15, name: "Montelukast 10mg Tablets (30’s)", image: img("Montelukast.png"), price: 1180, category: "Respiratory Anti-inflammatory", stock: 160, description: "Leukotriene receptor antagonist for asthma." },
];

// -----------------------------
// PRODUCTS — guaranteed slugs
// -----------------------------
export const products: Product[] = rawProducts.map((r) => ({
  ...r,
  slug: normalizeSlug(r.slug ?? r.name),
}));

// -----------------------------
// QUERY UTILITIES
// -----------------------------
export const getProductBySlug = (slug?: string): Product | undefined => {
  if (!slug) return undefined;
  const norm = normalizeSlug(slug);
  return products.find((p) => normalizeSlug(p.slug) === norm);
};

export const getProductById = (id: number | string): Product | undefined =>
  products.find((p) => p.id === Number(id));

export const getSimilarProducts = (id: number | string, limit = 4): Product[] => {
  const product = getProductById(id);
  if (!product) return [];
  return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
};

export const getProductsByCategory = (category: string): Product[] =>
  products.filter((p) => p.category.toLowerCase() === category.toLowerCase());

export const searchProducts = (query: string): Product[] => {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.description ?? "").toLowerCase().includes(q)
  );
};

export const sortProducts = (type: "priceAsc" | "priceDesc" | "discount"): Product[] => {
  switch (type) {
    case "priceAsc":
      return [...products].sort((a, b) => a.price - b.price);
    case "priceDesc":
      return [...products].sort((a, b) => b.price - a.price);
    case "discount":
      return [...products].sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));
    default:
      return products;
  }
};

export const isInStock = (id: number | string): boolean => {
  const p = getProductById(id);
  return p ? (p.stock ?? 0) > 0 : false;
};

// -----------------------------
// DEFAULT EXPORT
// -----------------------------
const RespiratoryData = {
  rawProducts,
  products,
  normalizeSlug,
  slugify,
  img,
  formatPrice,
  getProductBySlug,
  getProductById,
  getSimilarProducts,
  searchProducts,
  sortProducts,
  getProductsByCategory,
  isInStock,
  getStockStatus,
};

export default RespiratoryData;
