// src/data/nervousData.ts
const img = (file: string) => `/assets/products/${file}`;



export type StockStatus = "In Stock" | "Out of Stock" | "Limited";

export interface cnsProduct {
  /** Core identity */
  id: number;
  slug: string; // first-class routing key
  name: string;

  /** Presentation */
  image: string;
  category: string;

  /** Commercial */
  price: number; // raw numeric (KES)
  stock: StockStatus;

  /** Clinical content (exam-safe, neutral) */
  description: string;
  fullDescription?: string;
  indications: string[];

  /** UI-ready extensions (future-proof) */
  features?: string[];
  howToUse?: string;
}

/* -------------------------------------------------------------------------- */
/*                               SLUG UTILITIES                               */
/* -------------------------------------------------------------------------- */

const createSlug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/* -------------------------------------------------------------------------- */
/*                                    MODEL                                   */
/* -------------------------------------------------------------------------- */
/** Pure data only — no logic */

const PRODUCTS: cnsProduct[] = [
  {
    id: 1,
    name: "Sertraline (Zoloft)",
    slug: createSlug("Sertraline (Zoloft)"),
    image: img("sertraline.png"),
    category: "Antidepressant (SSRI)",
    price: 1820,
    stock: "In Stock",
    description:
      "Selective serotonin reuptake inhibitor used in common depressive and anxiety disorders.",
    indications: [
      "Major depressive disorder",
      "Generalized anxiety disorder",
      "Obsessive–compulsive disorder",
      "Post-traumatic stress disorder",
    ],
    features: [
      "First-line SSRI in multiple guidelines",
      "Favorable safety profile",
      "Once-daily dosing",
    ],
  },
  {
    id: 2,
    name: "Alprazolam (Xanax)",
    slug: createSlug("Alprazolam (Xanax)"),
    image: img("alprazolam.png"),
    category: "Anxiolytic (Benzodiazepine)",
    price: 960,
    stock: "In Stock",
    description:
      "Short-acting benzodiazepine indicated for acute anxiety states.",
    indications: [
      "Acute anxiety disorders",
      "Panic disorder",
    ],
    features: [
      "Rapid onset of action",
      "Short-term use only",
      "Risk of dependence with prolonged use",
    ],
  },
  {
    id: 3,
    name: "Gabapentin (Neurontin)",
    slug: createSlug("Gabapentin (Neurontin)"),
    image: img("gabapentin.png"),
    category: "Anticonvulsant / Neuropathic Pain",
    price: 2100,
    stock: "In Stock",
    description:
      "Antiepileptic agent commonly used in neuropathic pain syndromes.",
    indications: [
      "Neuropathic pain",
      "Adjunctive therapy in focal seizures",
    ],
  },
  {
    id: 4,
    name: "Duloxetine (Cymbalta)",
    slug: createSlug("Duloxetine (Cymbalta)"),
    image: img("duloxetine.png"),
    category: "SNRI / Neuropathic Pain",
    price: 2350,
    stock: "In Stock",
    description:
      "Serotonin–norepinephrine reuptake inhibitor with antidepressant and analgesic effects.",
    indications: [
      "Major depressive disorder",
      "Diabetic neuropathic pain",
      "Generalized anxiety disorder",
    ],
  },
  {
    id: 5,
    name: "Olanzapine (Zyprexa)",
    slug: createSlug("Olanzapine (Zyprexa)"),
    image: img("olanzapine.png"),
    category: "Atypical Antipsychotic",
    price: 2640,
    stock: "In Stock",
    description:
      "Second-generation antipsychotic used in psychotic and mood disorders.",
    indications: [
      "Schizophrenia",
      "Bipolar affective disorder",
    ],
  },
  {
    id: 6,
    name: "Levetiracetam (Keppra)",
    slug: createSlug("Levetiracetam (Keppra)"),
    image: img("levetiracetam.png"),
    category: "Antiepileptic",
    price: 1980,
    stock: "In Stock",
    description:
      "Broad-spectrum antiepileptic with minimal drug interactions.",
    indications: [
      "Focal seizures",
      "Generalized tonic-clonic seizures",
    ],
  },
  {
    id: 7,
    name: "Donepezil (Aricept)",
    slug: createSlug("Donepezil (Aricept)"),
    image: img("donepezil.png"),
    category: "Cholinesterase Inhibitor",
    price: 2890,
    stock: "In Stock",
    description:
      "Cognitive enhancer used in mild to moderate Alzheimer’s disease.",
    indications: [
      "Alzheimer’s disease",
    ],
  },
  {
    id: 8,
    name: "Fluoxetine (Prozac)",
    slug: createSlug("Fluoxetine (Prozac)"),
    image: img("fluoxetine.png"),
    category: "Antidepressant (SSRI)",
    price: 1750,
    stock: "In Stock",
    description:
      "Long-acting SSRI widely used in depressive and anxiety disorders.",
    indications: [
      "Major depressive disorder",
      "Obsessive–compulsive disorder",
      "Bulimia nervosa",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*                                 CONTROLLER                                 */
/* -------------------------------------------------------------------------- */
/** All logic centralized here — views import only these helpers */

export const formatPrice = (price: number): string =>
  Number.isFinite(price) ? `KES ${price.toLocaleString()}` : "KES —";

export const getStockStatus = (product: cnsProduct): StockStatus =>
  product.stock ?? "Out of Stock";

export const getProductBySlug = (slug?: string): cnsProduct | undefined => {
  if (!slug) return undefined;
  return PRODUCTS.find((p) => p.slug === slug);
};

export const getSimilarProducts = (
  currentId: number,
  limit = 4
): cnsProduct[] =>
  PRODUCTS.filter((p) => p.id !== currentId).slice(0, limit);

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

const cnsData = {
  products: PRODUCTS,
  getProductBySlug,
  getSimilarProducts,
  formatPrice,
  getStockStatus,
};

export default cnsData;
