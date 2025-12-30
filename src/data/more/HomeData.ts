//src/data/more/HomeData.ts

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface DealModel {
  readonly id: string;
  readonly slug: string;
  readonly name: string;
  readonly image: string;
  readonly mrp: number;
  readonly price: number;
  readonly discount: number;
  readonly category: string;
  readonly description: string;
  readonly specs: Record<string, string>;
}

export interface DealViewModel extends DealModel {
  readonly img: string;
  readonly mrpKSH: number;
  readonly priceKSH: number;
  readonly mrpFormattedKSH: string;
  readonly priceFormattedKSH: string;
  readonly savingsKSH: number;
}

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  SCALE_FACTOR: 120,
  MIN_PRICE: 150,
  MAX_PRICE: 2500,
  CURRENCY: "KES",
  LOCALE: "en-KE",
} as const;

const formatter = new Intl.NumberFormat(CONFIG.LOCALE, {
  style: "currency",
  currency: CONFIG.CURRENCY,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

// ============================================================================
// UTILITIES
// ============================================================================

const clamp = (val: number, min: number, max: number) => 
  Math.max(min, Math.min(max, val));

const scalePrice = (val: number): number => {
  if (!Number.isFinite(val) || val < 0) return CONFIG.MIN_PRICE;
  return clamp(
    Math.round(val * CONFIG.SCALE_FACTOR),
    CONFIG.MIN_PRICE,
    CONFIG.MAX_PRICE
  );
};

const formatPrice = (amount: number): string => 
  formatter.format(Math.max(0, amount));

const slugify = (text: string): string =>
  text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const isValid = (deal: DealModel): boolean =>
  Boolean(
    deal.id &&
    deal.slug &&
    deal.name &&
    deal.image &&
    Number.isFinite(deal.mrp) &&
    Number.isFinite(deal.price) &&
    deal.mrp >= deal.price &&
    deal.price >= 0 &&
    deal.discount >= 0 &&
    deal.discount <= 100 &&
    deal.specs
  );

// ============================================================================
// DATA TRANSFORMATION
// ============================================================================

const toViewModel = (deal: DealModel): DealViewModel => {
  const mrpKSH = scalePrice(deal.mrp);
  const priceKSH = scalePrice(deal.price);

  return {
    ...deal,
    img: deal.image,
    mrpKSH,
    priceKSH,
    mrpFormattedKSH: formatPrice(mrpKSH),
    priceFormattedKSH: formatPrice(priceKSH),
    savingsKSH: Math.max(0, mrpKSH - priceKSH),
  };
};

// ============================================================================
// DATA SOURCE
// ============================================================================

const DEALS: readonly DealModel[] = [
  {
    id: "deal-001",
    slug: slugify("OneTouch Select Plus Glucometer Kit"),
    name: "OneTouch Select Plus Glucometer Kit",
    image: "/assets/products/OneTouchSelectPlusGlucometerKit.png",
    mrp: 5294,
    price: 4500,
    discount: 15,
    category: "Deals",
    description: "Accurate blood glucose monitoring kit with test strips and lancets. Features color-coded range indicators and fast results.",
    specs: { Brand: "OneTouch", TestTime: "5 seconds", SampleSize: "1.0 µL", BatteryLife: "1000 tests", Warranty: "Lifetime" },
  },
  {
    id: "deal-002",
    slug: slugify("iProven Digital Thermometer"),
    name: "iProven Digital Thermometer",
    image: "/assets/products/iProvenDigitalThermometer.png",
    mrp: 1117,
    price: 950,
    discount: 15,
    category: "Deals",
    description: "Medical-grade digital thermometer with instant readings. Features fever alarm, memory recall, and automatic shut-off.",
    specs: { Brand: "iProven", Accuracy: "±0.1°C", Range: "32°C - 42.9°C", BatteryType: "LR41", AutoShutOff: "10 minutes" },
  },
  {
    id: "deal-003",
    slug: slugify("First Aid Kit Essentials 110 pcs"),
    name: "First Aid Kit Essentials (110 pcs)",
    image: "/assets/products/First Aid Kit Essentials (110 pcs).png",
    mrp: 3765,
    price: 3200,
    discount: 15,
    category: "Deals",
    description: "Professional-grade first aid kit containing 110 essential medical supplies. Perfect for home, car, office, or travel.",
    specs: { Brand: "Johnson & Johnson", Items: "110 pieces", CaseDimensions: "20 x 15 x 7 cm", Weight: "650g", Material: "Hard plastic case" },
  },
  {
    id: "deal-004",
    slug: slugify("Swift Pregnancy Test Kit Cassette"),
    name: "Swift Pregnancy Test Kit (Cassette)",
    image: "/assets/products/Swift-Pregnancy-Test-Kit.png",
    mrp: 333,
    price: 250,
    discount: 25,
    category: "Deals",
    description: "Over 99% accurate pregnancy test for early detection. Simple cassette design with results in 3-5 minutes.",
    specs: { Brand: "Pharmaplus", Sensitivity: "25 mIU/mL", Accuracy: ">99%", TestTime: "3-5 minutes", Format: "Cassette" },
  },
  {
    id: "deal-005",
    slug: slugify("Omron Bronze Blood Pressure Monitor"),
    name: "Omron Bronze Blood Pressure Monitor",
    image: "/assets/products/OmronBronzeBloodPressurMonitor.png",
    mrp: 10000,
    price: 8500,
    discount: 15,
    category: "Deals",
    description: "Advanced BP monitor with IntelliSense technology. Features irregular heartbeat detection and 60-reading memory.",
    specs: { Brand: "Omron", CuffSize: "22-42 cm", Memory: "60 readings", Power: "4 AA batteries", Warranty: "5 years" },
  },
  {
    id: "deal-006",
    slug: slugify("Accu-Chek Softclix Lancets 100s"),
    name: "Accu-Chek Softclix Lancets (100s)",
    image: "/assets/products/Accu-ChekSoftclixLancets.png",
    mrp: 2118,
    price: 1800,
    discount: 15,
    category: "Deals",
    description: "Premium sterile lancets designed for virtually painless blood sampling. Ultra-thin needle for smooth skin entry.",
    specs: { Brand: "Accu-Chek", Gauge: "28G", Quantity: "100 lancets", Compatibility: "Softclix device" },
  },
  {
    id: "deal-007",
    slug: slugify("Elastoplast Sensitive Plasters 20s"),
    name: "Elastoplast Sensitive Plasters (20s)",
    image: "/assets/products/ElastoplastSensitivePlasters.png",
    mrp: 750,
    price: 600,
    discount: 20,
    category: "Deals",
    description: "Hypoallergenic, breathable plasters with extra-soft material. Ideal for sensitive skin and non-stick protection.",
    specs: { Brand: "Elastoplast", Quantity: "20 plasters", Material: "Soft fabric", Adhesive: "Hypoallergenic" },
  },
  {
    id: "deal-008",
    slug: slugify("Vicks Warm Mist Humidifier"),
    name: "Vicks Warm Mist Humidifier",
    image: "/assets/products/Vickswarmmisthumidifier.png",
    mrp: 11176,
    price: 9500,
    discount: 15,
    category: "Deals",
    description: "Relieves cold and flu symptoms by adding soothing moisture to the air. Features a medicine cup for vapors.",
    specs: { Brand: "Vicks", Capacity: "3.8 liters", Runtime: "12 hours", RoomSize: "25 m²" },
  },
  {
    id: "deal-009",
    slug: slugify("Omron Peak Flow Meter"),
    name: "Omron Peak Flow Meter",
    image: "/assets/products/Omronpeakflowmeter.png",
    mrp: 4941,
    price: 4200,
    discount: 15,
    category: "Deals",
    description: "Personal peak flow meter for monitoring lung function and asthma control. Measures expiratory flow rate (PEFR).",
    specs: { Brand: "Omron", Range: "60-800 L/min", Material: "Medical-grade plastic", Weight: "85g" },
  },
  {
    id: "deal-010",
    slug: slugify("Purell Advanced Hand Sanitizer 500ml"),
    name: "Purell Advanced Hand Sanitizer (500ml)",
    image: "/assets/products/PurellAdvancedHandSanitizer.png",
    mrp: 812,
    price: 650,
    discount: 20,
    category: "Deals",
    description: "Kills 99.99% of germs instantly. Enhanced with moisturizers to condition skin and prevent dryness.",
    specs: { Brand: "Purell", Volume: "500 ml", Alcohol: "70%", Format: "Gel" },
  },
  {
    id: "deal-011",
    slug: slugify("COVID-19 Rapid Antigen Test Kit"),
    name: "COVID-19 Rapid Antigen Test Kit",
    image: "/assets/products/Covid19Test.png",
    mrp: 1500,
    price: 1200,
    discount: 20,
    category: "Deals",
    description: "FDA-approved rapid antigen test. Provides results in 15 minutes from a simple nasal swab sample.",
    specs: { Brand: "Abbott", Sensitivity: "95.2%", Specificity: "99.4%", ResultTime: "15 minutes" },
  },
  {
    id: "deal-012",
    slug: slugify("Electric Heating Pad for Back Pain"),
    name: "Electric Heating Pad for Back Pain",
    image: "/assets/products/ElectricHeatingPadForBack Pain.png",
    mrp: 4470,
    price: 3800,
    discount: 15,
    category: "Deals",
    description: "Adjustable heat therapy pad with 6 settings. Ultra-soft microplush cover and auto shut-off for safety.",
    specs: { Brand: "Sunbeam", Size: "30 x 60 cm", Power: "100W", AutoShutOff: "2 hours" },
  },
  {
    id: "deal-013",
    slug: slugify("Pulse Oximeter Fingertip"),
    name: "Pulse Oximeter Fingertip",
    image: "/assets/products/PulseOximeter.png",
    mrp: 3125,
    price: 2500,
    discount: 20,
    category: "Deals",
    description: "Accurately measures blood oxygen saturation (SpO2) and pulse rate with a bright OLED display.",
    specs: { Brand: "Contec", SpO2Range: "35%-100%", Accuracy: "±2%", BatteryType: "2 AAA" },
  },
  {
    id: "deal-014",
    slug: slugify("Reusable Hot and Cold Gel Pack"),
    name: "Reusable Hot & Cold Gel Pack",
    image: "/assets/products/GelPack.png",
    mrp: 1117,
    price: 950,
    discount: 15,
    category: "Deals",
    description: "Flexible therapy pack for pain and swelling. Remains flexible when frozen and includes a fabric cover.",
    specs: { Brand: "TheraPearl", Size: "25 x 13 cm", Material: "Non-toxic gel", Weight: "400g" },
  },
  {
    id: "deal-015",
    slug: slugify("Medline Adjustable Walking Cane"),
    name: "Medline Adjustable Walking Cane",
    image: "/assets/products/WalkingCane.png",
    mrp: 5647,
    price: 4800,
    discount: 15,
    category: "Deals",
    description: "Durable aluminum walking cane with 10 height positions. Features a contoured handle and non-slip tip.",
    specs: { Brand: "Medline", Material: "Aluminum", HeightRange: "76-99 cm", WeightCapacity: "136 kg" },
  },
];

// ============================================================================
// PUBLIC API
// ============================================================================

export const getAllDealsInKSH = (): readonly DealViewModel[] =>
  DEALS.filter(isValid).map(toViewModel);

export const getDealInKSH = (slug: string): DealViewModel | undefined => {
  if (!slug) return undefined;
  const normalized = slug.toLowerCase().trim();
  const deal = DEALS.find(d => d.slug === normalized && isValid(d));
  return deal ? toViewModel(deal) : undefined;
};

export const getDealById = (id: string): DealViewModel | undefined => {
  if (!id) return undefined;
  const deal = DEALS.find(d => d.id === id && isValid(d));
  return deal ? toViewModel(deal) : undefined;
};

export const getDealSlugs = (): ReadonlyArray<{ slug: string }> =>
  DEALS.filter(isValid).map(d => ({ slug: d.slug }));

export const getActiveDealsCount = (): number =>
  DEALS.filter(isValid).length;