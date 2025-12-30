// src/app/system/cvs/data.ts

export interface CVSProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  category: "Cardiovascular";
  subCategory:
    | "Hypertension"
    | "Congestive Heart Failure"
    | "Coronary Artery Disease"
    | "DVT"
    | "Other Cardiac Conditions";
  stock: "In Stock" | "Out of Stock";
}

// ✅ Single Source of Truth (no duplicated rows)
export const cvsProducts: readonly CVSProduct[] = Object.freeze([
  {
    id: "amlodipine",
    name: "Amlodipine",
    image: "/assets/products/BloodPressure/Amlodipine.png",
    price: 2395,
    category: "Cardiovascular",
    subCategory: "Hypertension",
    stock: "In Stock",
  },
  {
    id: "atenolol",
    name: "Atenolol",
    image: "/assets/products/BloodPressure/Atenolol.png",
    price: 2747,
    category: "Cardiovascular",
    subCategory: "Hypertension",
    stock: "In Stock",
  },
  {
    id: "bisoprolol",
    name: "Bisoprolol",
    image: "/assets/products/BloodPressure/Bisoprolol.png",
    price: 1714,
    category: "Cardiovascular",
    subCategory: "Hypertension",
    stock: "In Stock",
  },
  {
    id: "candesartan",
    name: "Candesartan",
    image: "/assets/products/BloodPressure/Candesartan.png",
    price: 1420,
    category: "Cardiovascular",
    subCategory: "Congestive Heart Failure",
    stock: "In Stock",
  },
  {
    id: "furosemide",
    name: "Furosemide",
    image: "/assets/products/BloodPressure/Furosemide.png",
    price: 1200,
    category: "Cardiovascular",
    subCategory: "Congestive Heart Failure",
    stock: "In Stock",
  },
  {
    id: "spironolactone",
    name: "Spironolactone",
    image: "/assets/products/BloodPressure/Spironolactone.png",
    price: 1350,
    category: "Cardiovascular",
    subCategory: "Congestive Heart Failure",
    stock: "In Stock",
  },
  {
    id: "enalapril",
    name: "Enalapril",
    image: "/assets/products/BloodPressure/Enalapril.png",
    price: 1520,
    category: "Cardiovascular",
    subCategory: "Coronary Artery Disease",
    stock: "In Stock",
  },
  {
    id: "telmisartan",
    name: "Telmisartan",
    image: "/assets/products/BloodPressure/Telmisartan.png",
    price: 1380,
    category: "Cardiovascular",
    subCategory: "Coronary Artery Disease",
    stock: "In Stock",
  },
  {
    id: "valsartan",
    name: "Valsartan",
    image: "/assets/products/BloodPressure/Valsartan.png",
    price: 1420,
    category: "Cardiovascular",
    subCategory: "Coronary Artery Disease",
    stock: "In Stock",
  },
  {
    id: "losartan",
    name: "Losartan",
    image: "/assets/products/BloodPressure/Losartan.png",
    price: 1470,
    category: "Cardiovascular",
    subCategory: "DVT",
    stock: "In Stock",
  },
  {
    id: "chlorthalidone",
    name: "Chlorthalidone",
    image: "/assets/products/BloodPressure/Chlorthalidone.png",
    price: 1320,
    category: "Cardiovascular",
    subCategory: "DVT",
    stock: "In Stock",
  },
  {
    id: "hydrochlorothiazide",
    name: "Hydrochlorothiazide",
    image: "/assets/products/BloodPressure/Hydrochlorothiazide.png",
    price: 1410,
    category: "Cardiovascular",
    subCategory: "Other Cardiac Conditions",
    stock: "In Stock",
  },
  {
    id: "nifedipine",
    name: "Nifedipine",
    image: "/assets/products/BloodPressure/Nifedipine.png",
    price: 1450,
    category: "Cardiovascular",
    subCategory: "Other Cardiac Conditions",
    stock: "In Stock",
  },
]);

// ✅ Helpers (controller-style, view-safe)
export const getSubCategories = () =>
  Array.from(new Set(cvsProducts.map((p) => p.subCategory)));

export const getProductsBySubCategory = (sub: CVSProduct["subCategory"]) =>
  cvsProducts.filter((p) => p.subCategory === sub);
