// ============================================================================
// src/data/cvsProducts.ts
// Central Source of Truth for CVS Products (Optimized + DRY + MVC Friendly)
// ============================================================================

import { StaticImageData } from "next/image";

// ===============================
// 🔹 Type Definitions
// ===============================
export interface Product {
  id: number;
  name: string;
  slug: string;
  image: string | StaticImageData;
  price: number;
  category: string;
  subCategory: string;
  inStock: boolean;
}

// ===============================
// 🔹 Static Image Imports
// ===============================
import amlodipineImg from "../assets/products/BloodPressure/Amlodipine.png";
import atenololImg from "../assets/products/BloodPressure/Atenolol.png";
import bisoprololImg from "../assets/products/BloodPressure/Bisoprolol.png";
import candesartanImg from "../assets/products/BloodPressure/Candesartan.png";
import chlorthalidoneImg from "../assets/products/BloodPressure/Chlorthalidone.png";
import enalaprilImg from "../assets/products/BloodPressure/Enalapril.png";
import furosemideImg from "../assets/products/BloodPressure/Furosemide.png";
import hydrochlorothiazideImg from "../assets/products/BloodPressure/Hydrochlorothiazide.png";
import losartanImg from "../assets/products/BloodPressure/Losartan.png";
import nifedipineImg from "../assets/products/BloodPressure/Nifedipine.png";
import spironolactoneImg from "../assets/products/BloodPressure/Spironolactone.png";
import telmisartanImg from "../assets/products/BloodPressure/Telmisartan.png";
import valsartanImg from "../assets/products/BloodPressure/Valsartan.png";

// ===============================
// 🔹 Helper: Generate Slug
// ===============================
const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// ===============================
// 🔹 Canonical Product Definitions
// (One source of truth — no duplication)
// ===============================
const baseProducts = {
  Amlodipine: { name: "Amlodipine", image: amlodipineImg, price: 2395 },
  Atenolol: { name: "Atenolol", image: atenololImg, price: 2747 },
  Bisoprolol: { name: "Bisoprolol", image: bisoprololImg, price: 1714 },
  Candesartan: { name: "Candesartan", image: candesartanImg, price: 1420 },
  Furosemide: { name: "Furosemide", image: furosemideImg, price: 1200 },
  Spironolactone: { name: "Spironolactone", image: spironolactoneImg, price: 1350 },
  Enalapril: { name: "Enalapril", image: enalaprilImg, price: 1520 },
  Telmisartan: { name: "Telmisartan", image: telmisartanImg, price: 1380 },
  Valsartan: { name: "Valsartan", image: valsartanImg, price: 1420 },
  Losartan: { name: "Losartan", image: losartanImg, price: 1470 },
  Chlorthalidone: { name: "Chlorthalidone", image: chlorthalidoneImg, price: 1320 },
  Hydrochlorothiazide: {
    name: "Hydrochlorothiazide",
    image: hydrochlorothiazideImg,
    price: 1410,
  },
  Nifedipine: { name: "Nifedipine", image: nifedipineImg, price: 1450 },
};

// ===============================
// 🔹 Category Mapping (DRY)
// ===============================
const categoryMap = {
  Hypertension: [
    "Amlodipine",
    "Atenolol",
    "Bisoprolol",
    "Candesartan",
    "Furosemide",
    "Spironolactone",
    "Enalapril",
    "Telmisartan",
    "Valsartan",
    "Losartan",
    "Chlorthalidone",
    "Hydrochlorothiazide",
    "Nifedipine",
  ],

  "Congestive Heart Failure": ["Candesartan", "Furosemide", "Spironolactone"],

  "Coronary Artery Disease": ["Enalapril", "Telmisartan", "Valsartan"],

  DVT: ["Losartan", "Chlorthalidone"],

  "Other Cardiac Conditions": ["Hydrochlorothiazide", "Nifedipine"],
};

// ===============================
// 🔹 Generate Final Product Array (MVC-friendly)
// ===============================
let idCounter = 1;

export const cvsProducts: Product[] = Object.entries(categoryMap).flatMap(
  ([subCategory, productNames]) =>
    productNames.map((productName) => {
      const base = baseProducts[productName as keyof typeof baseProducts];

      return {
        id: idCounter++,
        name: base.name,
        slug: slugify(base.name),
        image: base.image,
        price: base.price,
        category: "Cardiovascular",
        subCategory,
        inStock: true,
      } satisfies Product;
    })
);

// ===============================
// 🔹 Controller-Style Helpers (MVC)
// ===============================
export const getProductBySlug = (slug: string): Product | undefined =>
  cvsProducts.find((p) => p.slug === slug);

export const getSimilarProducts = (product: Product, limit = 4): Product[] =>
  cvsProducts
    .filter(
      (p) =>
        p.subCategory === product.subCategory &&
        p.slug !== product.slug
    )
    .slice(0, limit);

export const getProductsByCategory = (subCategory: string): Product[] =>
  cvsProducts.filter((p) => p.subCategory === subCategory);
