// src/lib/giatmara-data.ts

export type AvailabilityStatus = "AVAILABLE" | "BUSY" | "UNAVAILABLE";
export type PlanTier = "BASIC" | "PRO" | "PREMIUM";

export interface GiatmaraSkill {
  id: string;
  name: string;
  malayName: string;
  cluster: string;
  slug: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  location: string;
  clientLocation?: string;
  completedDate?: string;
  summary?: string;
  costRM: number;
}

export interface TraineeListing {
  id: string;
  name: string;
  email: string;
  headline: string;
  bio: string;
  phone: string;
  whatsapp: string;
  state: string;
  city: string;
  giatmaraCenter: string;
  graduationYear: number;
  studentId: string;
  certifications: string[];
  portfolio?: PortfolioProject[];
  isVerified: boolean;
  isPubliclyListed: boolean;
  planTier: PlanTier;
  availability: AvailabilityStatus;
  workingHours: string;
  emergencyAvailable: boolean;
  startingRateRM: number;
  skills: string[]; // Array of skill slugs
  rating: number;
  completedJobs: number;
}

// Official GIATMARA TVET Skill Clusters (Static dataset to eliminate external API dependency)
export const GIATMARA_SKILLS: GiatmaraSkill[] = [
  {
    id: "sk-1",
    name: "Single & Three Phase Wiring (PW2 / PW4)",
    malayName: "Pendawaian Elektrik (PW2 / PW4)",
    cluster: "Elektrikal & Elektronik",
    slug: "electrical-wiring",
  },
  {
    id: "sk-2",
    name: "Air-Conditioning & Refrigeration (HVAC)",
    malayName: "Teknologi Penyejukbekuan & Penyamanan Udara",
    cluster: "Mekanikal & HVAC",
    slug: "aircond-hvac",
  },
  {
    id: "sk-3",
    name: "Domestic Plumbing & Sanitary",
    malayName: "Teknologi Bekalan Air & Pembetungan",
    cluster: "Senibina & Bangunan",
    slug: "plumbing",
  },
  {
    id: "sk-4",
    name: "Automotive Servicing & Diagnostics",
    malayName: "Teknologi Automotif",
    cluster: "Pengangkutan",
    slug: "automotive",
  },
  {
    id: "sk-5",
    name: "Motorcycle Maintenance & Overhaul",
    malayName: "Teknologi Motosikal",
    cluster: "Pengangkutan",
    slug: "motorcycle-repair",
  },
  {
    id: "sk-6",
    name: "Welding & Metal Fabrication (3G/6G)",
    malayName: "Teknologi Kimpalan & Fabrikasi Logam",
    cluster: "Pembuatan",
    slug: "welding-fabrication",
  },
  {
    id: "sk-7",
    name: "Custom Tailoring & Fashion Design",
    malayName: "Senireka Fesyen & Jahitan Pakaian",
    cluster: "Fesyen & Tekstil",
    slug: "tailoring-fashion",
  },
  {
    id: "sk-8",
    name: "Culinary Arts & Confectionery Catering",
    malayName: "Masakan & Pramusaji / Pastri",
    cluster: "Kulinari",
    slug: "culinary-pastry",
  },
  {
    id: "sk-9",
    name: "Hair Styling & Beauty Therapy",
    malayName: "Senireka Gaya Rambut & Terapi Kecantikan",
    cluster: "Dandanan & Kosmetologi",
    slug: "beauty-hair",
  },
  {
    id: "sk-10",
    name: "Computer Networking & PC Repair",
    malayName: "Teknologi Sistem Komputer & Rangkaian",
    cluster: "Teknologi Maklumat",
    slug: "computer-networking",
  },
];

// Official GIATMARA Centers Grouped by Malaysian State
export const GIATMARA_CENTERS_BY_STATE: Record<string, string[]> = {
  Perak: [
    "GIATMARA Kuala Kangsar",
    "GIATMARA Ipoh",
    "GIATMARA Tambun",
    "GIATMARA Taiping",
    "GIATMARA Teluk Intan",
    "GIATMARA Manjung",
    "GIATMARA Batu Gajah",
  ],
  Selangor: [
    "GIATMARA Shah Alam",
    "GIATMARA Petaling Jaya",
    "GIATMARA Gombak",
    "GIATMARA Kajang",
    "GIATMARA Klang",
    "GIATMARA Bangi",
  ],
  "WP Kuala Lumpur": [
    "GIATMARA Batu",
    "GIATMARA Cheras",
    "GIATMARA Setiawangsa",
    "GIATMARA Kepong",
    "GIATMARA Lembah Pantai",
  ],
  Johor: [
    "GIATMARA Johor Bahru",
    "GIATMARA Pasir Gudang",
    "GIATMARA Batu Pahat",
    "GIATMARA Muar",
    "GIATMARA Kluang",
  ],
  Kedah: [
    "GIATMARA Alor Setar",
    "GIATMARA Sungai Petani",
    "GIATMARA Kulim",
    "GIATMARA Langkawi",
  ],
  "Pulau Pinang": [
    "GIATMARA Kepala Batas",
    "GIATMARA Bukit Mertajam",
    "GIATMARA Nibong Tebal",
    "GIATMARA Balik Pulau",
  ],
  Melaka: ["GIATMARA Masjid Tanah", "GIATMARA Bukit Katil", "GIATMARA Jasin"],
  "Negeri Sembilan": ["GIATMARA Seremban", "GIATMARA Port Dickson", "GIATMARA Rembau"],
  Pahang: ["GIATMARA Kuantan", "GIATMARA Temerloh", "GIATMARA Pekan"],
  Kelantan: ["GIATMARA Kota Bharu", "GIATMARA Pasir Mas", "GIATMARA Machang"],
  Terengganu: ["GIATMARA Kuala Terengganu", "GIATMARA Kemaman", "GIATMARA Dungun"],
  Sabah: ["GIATMARA Kota Kinabalu", "GIATMARA Sandakan", "GIATMARA Tawau"],
  Sarawak: ["GIATMARA Kuching", "GIATMARA Miri", "GIATMARA Sibu"],
  Perlis: ["GIATMARA Kangar", "GIATMARA Arau", "GIATMARA Padang Besar"],
};

export const MALAYSIA_STATES: string[] = Object.keys(GIATMARA_CENTERS_BY_STATE);

export const SUBSCRIPTION_TIERS = [
  {
    tier: "BASIC" as PlanTier,
    name: "Basic Pelatih",
    priceRM: 15,
    period: "/ bulan",
    popular: false,
    description: "Penyenaraian asas 30 hari dalam Direktori Usahawan GIATMARA.",
    badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
    maxSkills: 3,
    features: [
      "30-day public listing in client directory",
      "Up to 3 verified GIATMARA skills",
      "Direct WhatsApp & phone call button",
      "Standard search ranking",
    ],
  },
  {
    tier: "PRO" as PlanTier,
    name: "Pro Usahawan",
    priceRM: 30,
    period: "/ bulan",
    popular: true,
    description: "Pilihan terbaik untuk usahawan aktif dengan portfolio & sijil SKM.",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    maxSkills: 10,
    features: [
      "Everything in Basic",
      "Up to 10 skills + custom starting price (RM)",
      "Priority placement above Basic listings",
      "Display SKM certificates & project portfolio",
    ],
  },
  {
    tier: "PREMIUM" as PlanTier,
    name: "Featured Pakar",
    priceRM: 50,
    period: "/ bulan",
    popular: false,
    description: "Kedudukan teratas di halaman utama & lencana Skuad Kecemasan 24/7.",
    badgeColor: "bg-amber-100 text-amber-900 border-amber-400",
    maxSkills: 99,
    features: [
      "Everything in Pro",
      "Top Featured spotlight on Homepage & Search",
      "Gold 'Pakar Disahkan' badge",
      "24/7 Emergency Callout highlight badge",
    ],
  },
];

// Initial Mock Trainees for Prototype Demonstration
export const INITIAL_TRAINEES: TraineeListing[] = [
  {
    id: "tr-101",
    name: "Muhammad Haziq bin Roslan",
    email: "haziq.pw2@gmail.com",
    headline: "Certified PW2 Wireman & Residential Aircond Specialist",
    bio: "Graduated from GIATMARA Kuala Kangsar with Suruhanjaya Tenaga PW2 competency. Specializing in DB box upgrades, concealed house wiring, fan/lighting installation, and chemical aircond servicing across Ipoh and Kuala Kangsar.",
    phone: "+60125438890",
    whatsapp: "60125438890",
    state: "Perak",
    city: "Kuala Kangsar / Ipoh",
    giatmaraCenter: "GIATMARA Kuala Kangsar",
    graduationYear: 2024,
    studentId: "GM-PK-2024-0812",
    certifications: [
      "Sijil Kompetensi Pendawai Elektrik PW2 (Suruhanjaya Tenaga)",
      "Sijil Profesional GIATMARA",
    ],
    portfolio: [
      { id: "p-1", title: "Full 3-Phase DB Board Upgrade & ELCB Testing", location: "Meru Raya, Ipoh", costRM: 480 },
      { id: "p-2", title: "2.0HP Inverter Aircond Overhaul & Gas Topup", location: "Chandan Putri, Kuala Kangsar", costRM: 150 },
    ],
    isVerified: true,
    isPubliclyListed: true,
    planTier: "PREMIUM",
    availability: "AVAILABLE",
    workingHours: "Mon - Sun, 8:30 AM - 9:00 PM",
    emergencyAvailable: true,
    startingRateRM: 60,
    skills: ["electrical-wiring", "aircond-hvac"],
    rating: 4.9,
    completedJobs: 47,
  },
  {
    id: "tr-102",
    name: "Nurul Aina binti Zulkifli",
    email: "aina.tailor@gmail.com",
    headline: "Custom Baju Kurung, Kebaya & Alteration Tailor",
    bio: "Trained in Senireka Fesyen & Pakaian at GIATMARA Shah Alam. Accepting custom orders for Bridal, Raya collections, corporate uniforms, and express garment alterations.",
    phone: "+60173921145",
    whatsapp: "60173921145",
    state: "Selangor",
    city: "Shah Alam",
    giatmaraCenter: "GIATMARA Shah Alam",
    graduationYear: 2025,
    studentId: "GM-SL-2025-0341",
    certifications: ["SKM Tahap 3 Pembuatan Pakaian Wanita", "Sijil Profesional GIATMARA"],
    portfolio: [
      { id: "p-3", title: "Bridal Songket Kebaya & Beading Set", location: "Seksyen 7, Shah Alam", costRM: 320 },
      { id: "p-4", title: "Corporate Batik Uniform Batch (15 Pax)", location: "Subang Jaya", costRM: 950 },
    ],
    isVerified: true,
    isPubliclyListed: true,
    planTier: "PRO",
    availability: "AVAILABLE",
    workingHours: "Tue - Sun, 10:00 AM - 7:00 PM",
    emergencyAvailable: false,
    startingRateRM: 35,
    skills: ["tailoring-fashion"],
    rating: 4.8,
    completedJobs: 62,
  },
  {
    id: "tr-103",
    name: "Syafiq Danial bin Kamarudin",
    email: "syafiq.welding@gmail.com",
    headline: "Mobile Welder, Awning & Grille Fabricator + Pipe Repair",
    bio: "On-site portable welding services for residential gates, window grilles, polycarbonate awnings, and emergency burst pipe repairs in Johor Bahru and Pasir Gudang.",
    phone: "+60197762310",
    whatsapp: "60197762310",
    state: "Johor",
    city: "Johor Bahru",
    giatmaraCenter: "GIATMARA Pasir Gudang",
    graduationYear: 2023,
    studentId: "GM-JH-2023-1120",
    certifications: ["SKM Tahap 3 Proses Kimpalan Arka Logam Berperisai (3G)"],
    portfolio: [
      { id: "p-5", title: "Custom Mild Steel Folding Main Gate Welding", location: "Taman Daya, JB", costRM: 1400 },
    ],
    isVerified: true,
    isPubliclyListed: true,
    planTier: "PREMIUM",
    availability: "AVAILABLE",
    workingHours: "Mon - Sat, 9:00 AM - 6:30 PM",
    emergencyAvailable: true,
    startingRateRM: 80,
    skills: ["welding-fabrication", "plumbing"],
    rating: 4.9,
    completedJobs: 38,
  },
  {
    id: "tr-104",
    name: "Aiman Hakim bin Ismail",
    email: "aiman.automech@gmail.com",
    headline: "Mobile Car & Motorcycle Breakdown Mechanic",
    bio: "Home-visit engine servicing, battery replacement, brake pad change, and OBD2 computer diagnostics around Cheras and Kuala Lumpur.",
    phone: "+60138819022",
    whatsapp: "60138819022",
    state: "WP Kuala Lumpur",
    city: "Cheras",
    giatmaraCenter: "GIATMARA Cheras",
    graduationYear: 2025,
    studentId: "GM-KL-2025-0194",
    certifications: ["SKM Tahap 2 Servis Selepas Jualan Automotif"],
    portfolio: [
      { id: "p-6", title: "On-site Alternator & Battery Rescue", location: "Bandar Tun Razak, KL", costRM: 280 },
    ],
    isVerified: false,
    isPubliclyListed: true,
    planTier: "BASIC",
    availability: "BUSY",
    workingHours: "Daily, 9:00 AM - 10:00 PM",
    emergencyAvailable: true,
    startingRateRM: 50,
    skills: ["automotive", "motorcycle-repair"],
    rating: 4.7,
    completedJobs: 19,
  },
  {
    id: "tr-105",
    name: "Mohd Amirul bin Hassan",
    email: "amirul.piping@gmail.com",
    headline: "Licensed Domestic Plumber & Water Tank Specialist",
    bio: "Trained at GIATMARA Ipoh in domestic water supply and sanitary piping. Fixing water pump issues, concealed pipe leaks, clogged drains, and bathroom fittings.",
    phone: "+60112849301",
    whatsapp: "60112849301",
    state: "Perak",
    city: "Ipoh / Batu Gajah",
    giatmaraCenter: "GIATMARA Ipoh",
    graduationYear: 2024,
    studentId: "GM-PK-2024-0419",
    certifications: ["Sijil Profesional GIATMARA Teknologi Bekalan Air"],
    portfolio: [
      { id: "p-7", title: "Poly Water Tank & Booster Pump Bypass Piping", location: "Station 18, Ipoh", costRM: 350 },
    ],
    isVerified: true,
    isPubliclyListed: true,
    planTier: "PRO",
    availability: "AVAILABLE",
    workingHours: "Mon - Sat, 8:00 AM - 7:00 PM",
    emergencyAvailable: true,
    startingRateRM: 45,
    skills: ["plumbing"],
    rating: 4.8,
    completedJobs: 29,
  },
];
