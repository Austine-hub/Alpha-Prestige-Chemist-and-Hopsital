// src/data/details/sexualData.ts

// src/data/details/sexualData.ts
// ===============================================================
// SexualData.ts — MODEL Layer (MVC • DRY • SSOT)
// Central data + helpers for sexual & reproductive products
// ===============================================================

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

export const img = (file: string) => `/assets/sexual/${file}`;

export const formatPrice = (price: number): string =>
  `KES ${price.toLocaleString("en-KE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

export const getStockStatus = (p: Partial<Product>): string => {
  const s = p.stock ?? 0;
  if (s <= 0) return "Out of Stock";
  if (s < 50) return "Low Stock";
  return "In Stock";
};

// -----------------------------
// RAW PRODUCTS (no guaranteed slugs)
// -----------------------------

type RawProduct = Omit<Product, "slug"> & { slug?: string };

export const rawProducts: RawProduct[] = [
  {
    id: 1,
    name: "Oxytocin Injection 10IU",
    image: img("Oxytocin.png"),
    category: "Obstetric Medicines",
    price: 120,
    oldPrice: 140,
    discount: 10,
    stock: 250,
    badge: "Bestseller",
    description: "Uterotonic for labor induction and postpartum hemorrhage control.",
    fullDescription:
      "Oxytocin is used to induce labor, strengthen uterine contractions, and control postpartum bleeding.",
    howToUse: "Administer intramuscularly or intravenously under medical supervision.",
    features: ["Labor induction", "Controls postpartum bleeding", "Short-acting uterotonic hormone"],
    specifications: {
      Strength: "10 IU/mL",
      Form: "Injection",
      Manufacturer: "PharmaLife Ltd.",
      Storage: "Store below 25°C — protect from light",
    },
  },

  {
    id: 2,
    name: "Misoprostol 200mcg Tablets",
    slug: slugify("Misoprostol 200mcg Tablets"),
    image: img("misoprostol.png"),
    category: "Reproductive Health",
    price: 150,
    oldPrice: 165,
    discount: 10,
    stock: 300,
    description:
      "Prostaglandin analog used for cervical ripening and postpartum hemorrhage prevention.",
    fullDescription:
      "Misoprostol promotes uterine contractions and is used for postpartum hemorrhage control and cervical ripening.",
    howToUse: "Take orally or vaginally as directed by a healthcare provider.",
    features: ["Cervical ripening", "Uterotonic", "Prevents PPH"],
    specifications: {
      Strength: "200 mcg",
      Packaging: "Tablets",
      Manufacturer: "Cipla Ltd.",
      Storage: "Store below 30°C.",
    },
  },

  {
    id: 3,
    name: "Mifepristone 200mg Tablets",
    slug: slugify("Mifepristone 200mg Tablets"),
    image: img("mifepristone.png"),
    category: "Reproductive Health",
    price: 1900,
    oldPrice: 2100,
    discount: 12,
    stock: 120,
    description:
      "Antiprogestin used in medical abortion and fibroid treatment.",
    fullDescription:
      "Mifepristone blocks progesterone receptors and is used with Misoprostol for medical termination.",
    howToUse: "Take orally under medical supervision.",
    features: ["Medical abortion protocol", "Fibroid management"],
    specifications: {
      Strength: "200 mg",
      Packaging: "1 tablet blister",
      CountryOfOrigin: "India",
    },
  },

  {
    id: 4,
    name: "Combined Oral Contraceptive Pills",
    slug: slugify("Combined Oral Contraceptive Pills"),
    image: img("coc.png"),
    category: "Contraceptives",
    price: 380,
    oldPrice: 430,
    discount: 14,
    stock: 500,
    description:
      "Used for birth control and menstrual cycle regulation.",
    fullDescription:
      "Contains estrogen and progestin to prevent ovulation, regulate cycles, and reduce menstrual discomfort.",
    howToUse: "Take one tablet daily at the same time.",
    features: [
      "Prevents pregnancy",
      "Regulates cycles",
      "Reduces dysmenorrhea",
    ],
    specifications: {
      Dosage: "Daily tablet",
      Manufacturer: "Pfizer",
      ShelfLife: "36 months",
    },
  },

  {
    id: 5,
    name: "Depo-Provera Injection 150mg/mL",
    slug: slugify("Depo-Provera Injection 150mg/mL"),
    image: img("depo.png"),
    category: "Contraceptives",
    price: 260,
    oldPrice: 300,
    discount: 12,
    stock: 250,
    description:
      "Injectable contraceptive effective for 3 months.",
    fullDescription:
      "Provides long-acting reversible contraception for up to 12 weeks.",
    howToUse: "Administer intramuscularly every 12 weeks.",
    features: ["3-month contraception", "Reversible method"],
    specifications: {
      Strength: "150 mg/mL",
      Form: "Injection",
      Manufacturer: "Pfizer",
    },
  },

  {
    id: 6,
    name: "Medroxyprogesterone 10mg Tablets",
    slug: slugify("Medroxyprogesterone 10mg Tablets"),
    image: img("medroxyprogesterone.png"),
    category: "Hormone Therapy",
    price: 500,
    oldPrice: 580,
    discount: 15,
    stock: 220,
    description:
      "Used for abnormal uterine bleeding and hormone therapy.",
    fullDescription:
      "Helps regulate menstrual cycles and treat endometrial hyperplasia.",
    howToUse: "Take once daily for 5–10 days or as prescribed.",
    features: ["Cycle regulation", "Hormonal balance"],
    specifications: {
      Strength: "10 mg",
      Manufacturer: "Sun Pharma",
    },
  },

  {
    id: 7,
    name: "Clomiphene Citrate 50mg Tablets",
    slug: slugify("Clomiphene Citrate 50mg Tablets"),
    image: img("clomiphene.png"),
    category: "Fertility Management",
    price: 1150,
    oldPrice: 1280,
    discount: 10,
    stock: 180,
    description:
      "Ovulation inducer widely used in infertility treatment.",
    fullDescription:
      "Clomiphene stimulates ovulation by increasing gonadotropin release.",
    howToUse:
      "Take daily for 5 days starting on cycle day 3–5.",
    features: ["Induces ovulation", "Improves fertility"],
    specifications: {
      Strength: "50 mg",
      Manufacturer: "Serono Labs",
    },
  },

  {
    id: 8,
    name: "Letrozole 2.5mg Tablets",
    slug: slugify("Letrozole 2.5mg Tablets"),
    image: img("Letrozole.png"),
    category: "Fertility Management",
    price: 950,
    oldPrice: 1080,
    discount: 11,
    stock: 160,
    description:
      "Aromatase inhibitor used for ovulation induction.",
    fullDescription:
      "Reduces estrogen production to stimulate ovulation; commonly used in PCOS.",
    howToUse: "Take once daily for 5 consecutive days.",
    features: ["Stimulates ovulation", "PCOS ovulation induction"],
    specifications: {
      Strength: "2.5 mg",
      Manufacturer: "Cipla Ltd.",
    },
  },

  {
    id: 9,
    name: "Ferrous Sulfate 200mg Tablets",
    slug: slugify("Ferrous Sulfate 200mg Tablets"),
    image: img("ferrous.png"),
    category: "Prenatal Supplements",
    price: 150,
    oldPrice: 180,
    discount: 10,
    stock: 450,
    description:
      "Iron supplement used in pregnancy-related anemia.",
    fullDescription:
      "Replenishes iron stores and boosts hemoglobin levels.",
    howToUse: "Take one tablet daily with water.",
    features: ["Prevents anemia", "Supports fetal development"],
    specifications: {
      Strength: "200 mg",
      Manufacturer: "GSK",
    },
  },

  {
    id: 10,
    name: "Folic Acid 5mg Tablets",
    slug: slugify("Folic Acid 5mg Tablets"),
    image: img("folicAcid.png"),
    category: "Prenatal Supplements",
    price: 90,
    oldPrice: 110,
    discount: 12,
    stock: 600,
    description: "Prevents neural tube defects in pregnancy.",
    fullDescription:
      "Essential before conception and during early pregnancy for fetal neural development.",
    howToUse: "Take one tablet daily.",
    features: ["Neural tube protection"],
    specifications: {
      Strength: "5 mg",
      ShelfLife: "36 months",
    },
  },

  {
  id: 11,
  name: "Magnesium Sulfate Injection 50%",
  slug: slugify("Magnesium Sulfate Injection 50%"),
  image: img("magnesium-sulfate.png"),
  category: "Obstetric Medicines",
  price: 95,
  oldPrice: 120,
  discount: 15,
  stock: 300,
  description: "Used in preeclampsia and eclampsia for seizure control.",
  fullDescription:
    "Magnesium sulfate is the anticonvulsant of choice in obstetric emergencies such as preeclampsia and eclampsia.",
  howToUse: "Administer intravenously under strict medical supervision.",
  features: ["Prevents seizures", "Emergency obstetric use"],
  specifications: {
    Strength: "50%",
    Form: "Injection",
    Manufacturer: "Generic Pharma",
  },
},

{
  id: 12,
  name: "Nifedipine 10mg Tablets",
  slug: slugify("Nifedipine 10mg Tablets"),
  image: img("Nifedipine.png"),
  category: "Tocolytics & Antihypertensives",
  price: 290,
  oldPrice: 330,
  discount: 10,
  stock: 260,
  description: "Used for hypertension and preterm labor.",
  fullDescription:
    "Nifedipine is a calcium channel blocker used for pregnancy-safe blood pressure control and to reduce uterine contractions.",
  howToUse: "Take orally every 8 hours or as prescribed.",
  features: ["Reduces uterine contractions", "Safe in pregnancy"],
  specifications: {
    Strength: "10 mg",
    Manufacturer: "Bayer",
  },
},

{
  id: 13,
  name: "Methyldopa 250mg Tablets",
  slug: slugify("Methyldopa 250mg Tablets"),
  image: img("methyldopa.png"),
  category: "Antihypertensives",
  price: 370,
  oldPrice: 420,
  discount: 11,
  stock: 280,
  description: "Safe antihypertensive for pregnancy.",
  fullDescription:
    "Methyldopa lowers blood pressure via central sympathetic inhibition and is widely used in pregnancy.",
  howToUse: "Take orally 2–3 times daily as directed.",
  features: ["Fetal-safe antihypertensive", "Long-term BP control"],
  specifications: {
    Strength: "250 mg",
    Manufacturer: "GlaxoSmithKline",
  },
},

{
  id: 14,
  name: "Labetalol 100mg Tablets",
  slug: slugify("Labetalol 100mg Tablets"),
  image: img("labetalol.png"),
  category: "Antihypertensives",
  price: 590,
  oldPrice: 640,
  discount: 10,
  stock: 200,
  description: "Preferred antihypertensive in gestational hypertension.",
  fullDescription:
    "Labetalol provides combined alpha and beta blockade, effectively reducing blood pressure while preserving uteroplacental flow.",
  howToUse: "Take 100mg orally twice daily or as prescribed.",
  features: ["Rapid BP control", "Safe in pregnancy"],
  specifications: {
    Strength: "100 mg",
    Manufacturer: "Cipla Ltd.",
    ShelfLife: "36 months",
  },
},

{
  id: 15,
  name: "Betamethasone Injection 12mg/2mL",
  slug: slugify("Betamethasone Injection 12mg/2mL"),
  image: img("betamethasone.png"),
  category: "Corticosteroids",
  price: 680,
  oldPrice: 760,
  discount: 13,
  stock: 150,
  description: "Steroid used for fetal lung maturation in preterm labor.",
  fullDescription:
    "Betamethasone accelerates fetal lung maturation and reduces neonatal respiratory distress syndrome.",
  howToUse: "Inject 12mg IM every 24 hours for two doses.",
  features: ["Fetal lung maturity", "Preterm birth preparation"],
  specifications: {
    Strength: "12 mg/2 mL",
    Form: "Injection",
    Manufacturer: "GSK",
  },
},

{
  id: 16,
  name: "Dexamethasone 4mg/mL Injection",
  slug: slugify("Dexamethasone 4mg/mL Injection"),
  image: img("Dexamethasone.png"),
  category: "Corticosteroids",
  price: 250,
  oldPrice: 290,
  discount: 13,
  stock: 230,
  description: "Corticosteroid for inflammation and fetal lung maturity.",
  fullDescription:
    "Dexamethasone is used to promote fetal lung development and manage inflammatory obstetric conditions.",
  howToUse: "Administer 4mg IM every 12 hours for four doses.",
  features: ["Lung maturity", "Anti-inflammatory"],
  specifications: {
    Strength: "4 mg/mL",
    Manufacturer: "Pfizer",
  },
},

{
  id: 17,
  name: "Cephalexin 500mg Capsules",
  slug: slugify("Cephalexin 500mg Capsules"),
  image: img("Cephalexin.png"),
  category: "Antibiotics",
  price: 250,
  oldPrice: 290,
  discount: 12,
  stock: 400,
  description: "Antibiotic for UTIs and wound infections in pregnancy.",
  fullDescription:
    "Cephalexin is a first-generation cephalosporin effective against common urinary and soft tissue infections in pregnancy.",
  howToUse: "Take one capsule every 8 hours for 5–7 days.",
  features: ["Pregnancy-safe antibiotic", "Broad-spectrum"],
  specifications: {
    Strength: "500 mg",
    Manufacturer: "Abbott",
    Packaging: "Capsules",
  },
},

{
  id: 18,
  name: "Amoxicillin-Clavulanate 625mg Tablets",
  slug: slugify("Amoxicillin-Clavulanate 625mg Tablets"),
  image: img("Amoxicillin.png"),
  category: "Antibiotics",
  price: 480,
  oldPrice: 550,
  discount: 12,
  stock: 350,
  description: "Broad-spectrum antibiotic safe in pregnancy.",
  fullDescription:
    "Amoxicillin-clavulanate treats respiratory, urinary, pelvic, and mixed infections by inhibiting β-lactamase producing bacteria.",
  howToUse: "Take one tablet every 12 hours after meals or as prescribed.",
  features: ["Broad coverage", "β-lactamase inhibitor", "Pregnancy-safe"],
  specifications: {
    Strength: "625 mg",
    Manufacturer: "GSK",
  },
},

{
  id: 19,
  name: "Metronidazole Vaginal Gel 0.75%",
  slug: slugify("Metronidazole Vaginal Gel 0.75%"),
  image: img("MetronidazoleGel.png"),
  category: "Antimicrobials",
  price: 350,
  oldPrice: 400,
  discount: 10,
  stock: 190,
  description: "Topical antibiotic for bacterial vaginosis.",
  fullDescription:
    "Metronidazole vaginal gel inhibits anaerobic bacterial DNA synthesis, effectively treating BV with minimal systemic absorption.",
  howToUse: "Apply intravaginally once daily at bedtime for 5 days.",
  features: ["Effective for BV", "Topical application", "Minimal systemic absorption"],
  specifications: {
    Strength: "0.75%",
    Form: "Gel (40g tube)",
    Manufacturer: "Pfizer",
  },
},

{
  id: 20,
  name: "Fluconazole 150mg Capsules",
  slug: slugify("Fluconazole 150mg Capsules"),
  image: img("Fluconazole.png"),
  category: "Antifungals",
  price: 320,
  oldPrice: 370,
  discount: 10,
  stock: 270,
  description: "Antifungal for vaginal candidiasis.",
  fullDescription:
    "Fluconazole inhibits fungal ergosterol synthesis and treats vulvovaginal or oral candidiasis effectively.",
  howToUse: "Single 150mg oral dose or as prescribed by a doctor.",
  features: ["One-dose therapy", "Broad antifungal coverage", "Well tolerated"],
  specifications: {
    Strength: "150 mg",
    Manufacturer: "Pfizer",
    Packaging: "Capsule",
  },
},

{
  id: 21,
  name: "Acyclovir 400mg Tablets",
  slug: slugify("Acyclovir 400mg Tablets"),
  image: img("Acyclovir.png"),
  category: "Antivirals",
  price: 390,
  oldPrice: 440,
  discount: 10,
  stock: 190,
  description: "Antiviral for genital herpes.",
  fullDescription:
    "Acyclovir inhibits viral DNA polymerase, reducing HSV outbreaks and recurrence in pregnancy-safe doses.",
  howToUse: "Take one tablet 3–5 times daily for 5–10 days or as prescribed.",
  features: ["Reduces outbreaks", "Antiviral", "Pregnancy-safe"],
  specifications: {
    Strength: "400 mg",
    Manufacturer: "GlaxoSmithKline",
  },
},

{
  id: 22,
  name: "Azithromycin 500mg Tablets",
  slug: slugify("Azithromycin 500mg Tablets"),
  image: img("Azithromycin.png"),
  category: "Antibiotics",
  price: 680,
  oldPrice: 760,
  discount: 11,
  stock: 260,
  description: "Antibiotic for chlamydia and other STIs.",
  fullDescription:
    "Azithromycin is a macrolide antibiotic used as a single-dose therapy for chlamydia and certain genital infections.",
  howToUse: "Take 1g orally as a single dose (two 500mg tablets).",
  features: ["Single-dose therapy", "Broad coverage", "Safe in pregnancy"],
  specifications: {
    Strength: "500 mg",
    Manufacturer: "Pfizer",
    ShelfLife: "36 months",
  },
},

{
  id: 23,
  name: "Ceftriaxone 1g Injection",
  slug: slugify("Ceftriaxone 1g Injection"),
  image: img("Ceftriaxone.png"),
  category: "Antibiotics",
  price: 850,
  oldPrice: 970,
  discount: 15,
  stock: 190,
  description: "Broad-spectrum antibiotic for severe infections.",
  fullDescription:
    "Ceftriaxone, a third-generation cephalosporin, is used for PID, sepsis, and severe infections, safe in pregnancy.",
  howToUse: "Administer IM or IV once daily as prescribed.",
  features: ["Broad-spectrum", "Once-daily dosing", "Pregnancy-safe"],
  specifications: {
    Strength: "1 g/vial",
    Form: "Injection powder",
    Manufacturer: "Roche",
  },
},

{
  id: 24,
  name: "Magnesium Oxide 400mg Tablets",
  slug: slugify("Magnesium Oxide 400mg Tablets"),
  image: img("magnesium.png"),
  category: "Mineral Supplements",
  price: 150,
  oldPrice: 180,
  discount: 12,
  stock: 350,
  description: "Mineral supplement for pregnancy-related leg cramps.",
  fullDescription:
    "Magnesium oxide supports muscle and bone health and helps reduce leg cramps during pregnancy.",
  howToUse: "Take one tablet daily with meals.",
  features: ["Reduces cramps", "Supports muscle and bone health", "Prenatal supplement"],
  specifications: {
    Strength: "400 mg",
    Manufacturer: "Bayer Healthcare",
  },
},

{
  id: 25,
  name: "Iron Sucrose Injection 100mg",
  slug: slugify("Iron Sucrose Injection 100mg"),
  image: img("iron-sucrose.png"),
  category: "IV Supplements",
  price: 1600,
  oldPrice: 1800,
  discount: 10,
  stock: 140,
  description: "IV iron used for severe pregnancy anemia.",
  fullDescription:
    "Iron sucrose replenishes iron stores rapidly and safely in moderate to severe iron-deficiency anemia.",
  howToUse: "Administer intravenously in divided doses as prescribed.",
  features: ["Rapid anemia correction", "IV formulation", "Pregnancy-safe"],
  specifications: {
    Strength: "100 mg/5 mL",
    Manufacturer: "Vifor Pharma",
    Storage: "Store below 25°C; protect from light.",
  },
},


];


// -----------------------------
// PRODUCTS — guaranteed slugs (SSOT)
// -----------------------------

export const products: Product[] = rawProducts.map((r) => ({
  ...r,
  slug: normalizeSlug(r.slug ?? r.name),
}));

// -----------------------------
// QUERY UTILITIES (Reusable + DRY)
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
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
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
// DEFAULT EXPORT (clean imports)
// -----------------------------

const SexualData = {
  rawProducts,
  products,
  normalizeSlug,
  slugify,
  img,
  formatPrice,
  getStockStatus,
  getProductBySlug,
  getProductById,
  getSimilarProducts,
  getProductsByCategory,
  searchProducts,
  sortProducts,
  isInStock,
};

export default SexualData;
