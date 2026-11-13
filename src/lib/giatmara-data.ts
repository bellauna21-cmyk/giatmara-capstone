// src/lib/giatmara-data.ts

export type AvailabilityStatus = "AVAILABLE" | "BUSY" | "UNAVAILABLE";
export type PlanTier = "TRIAL" | "BASIC" | "PRO" | "PREMIUM";
export type PaymentProofStatus = "NONE" | "PENDING" | "VERIFIED";

export interface GiatmaraSkill {
  id: string;
  name: string;
  malayName: string;
  shortMalay: string;
  shortEn: string;
  cluster: string;
  slug: string;
  iconName: string;
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
  district: string;
  city: string;
  giatmaraCenter: string;
  graduationYear: number;
  experienceYears: number;
  studentId: string;
  certifications: string[];
  portfolio?: PortfolioProject[];
  isVerified: boolean;
  isPubliclyListed: boolean;
  isAccountActive: boolean;
  planTier: PlanTier;
  trialEndsAt?: string;
  paymentProofStatus?: PaymentProofStatus;
  paymentReference?: string;
  availability: AvailabilityStatus;
  availableDays: string[];
  startTime: string;
  endTime: string;
  workingHours: string;
  emergencyAvailable: boolean;
  startingRateRM: number;
  skills: string[]; // Array of skill slugs
  rating: number;
  completedJobs: number;
}

export const DAYS_OF_WEEK = [
  { id: "Isnin", ms: "Isnin", en: "Mon" },
  { id: "Selasa", ms: "Selasa", en: "Tue" },
  { id: "Rabu", ms: "Rabu", en: "Wed" },
  { id: "Khamis", ms: "Khamis", en: "Thu" },
  { id: "Jumaat", ms: "Jumaat", en: "Fri" },
  { id: "Sabtu", ms: "Sabtu", en: "Sat" },
  { id: "Ahad", ms: "Ahad", en: "Sun" },
];

export const TIME_SLOTS = [
  "07:00 PG",
  "08:00 PG",
  "08:30 PG",
  "09:00 PG",
  "10:00 PG",
  "12:00 TGH",
  "02:00 PTG",
  "05:00 PTG",
  "06:00 PTG",
  "07:00 MLM",
  "09:00 MLM",
  "10:00 MLM",
  "11:00 MLM",
  "24 Jam",
];

// Official TVET Skill Clusters with Visual Icon Identifiers
export const GIATMARA_SKILLS: GiatmaraSkill[] = [
  {
    id: "sk-1",
    name: "Electrical Wiring (PW2 / PW4)",
    malayName: "Pendawaian Elektrik (PW2 / PW4)",
    shortMalay: "Elektrik & Pendawaian",
    shortEn: "Electrical Wiring",
    cluster: "Elektrikal & Elektronik",
    slug: "electrical-wiring",
    iconName: "Zap",
  },
  {
    id: "sk-2",
    name: "Air-Conditioning & HVAC",
    malayName: "Penyaman Udara & Penyejukbekuan (Aircond)",
    shortMalay: "Servis Aircond",
    shortEn: "Aircond & HVAC",
    cluster: "Mekanikal & HVAC",
    slug: "aircond-hvac",
    iconName: "Snowflake",
  },
  {
    id: "sk-3",
    name: "Plumbing & Sanitary Piping",
    malayName: "Kerja Paip & Bekalan Air",
    shortMalay: "Baiki Paip & Air",
    shortEn: "Plumbing & Piping",
    cluster: "Senibina & Bangunan",
    slug: "plumbing",
    iconName: "Droplets",
  },
  {
    id: "sk-4",
    name: "Automotive Servicing & Repair",
    malayName: "Servis & Baik Pulih Kereta (Automotif)",
    shortMalay: "Mekanik Kereta",
    shortEn: "Car Mechanic",
    cluster: "Pengangkutan",
    slug: "automotive",
    iconName: "Car",
  },
  {
    id: "sk-5",
    name: "Motorcycle Maintenance",
    malayName: "Baik Pulih & Servis Motosikal",
    shortMalay: "Mekanik Motosikal",
    shortEn: "Motorcycle Repair",
    cluster: "Pengangkutan",
    slug: "motorcycle-repair",
    iconName: "Bike",
  },
  {
    id: "sk-6",
    name: "Welding & Metal Fabrication",
    malayName: "Kimpalan Besi, Awning & Jeriji (Welding)",
    shortMalay: "Kimpalan & Besi",
    shortEn: "Welding & Grille",
    cluster: "Pembuatan",
    slug: "welding-fabrication",
    iconName: "Flame",
  },
  {
    id: "sk-7",
    name: "Custom Tailoring & Fashion",
    malayName: "Jahitan Pakaian & Tempahan Fesyen",
    shortMalay: "Jahitan & Pakaian",
    shortEn: "Tailoring & Fashion",
    cluster: "Fesyen & Tekstil",
    slug: "tailoring-fashion",
    iconName: "Scissors",
  },
  {
    id: "sk-8",
    name: "Culinary, Catering & Pastry",
    malayName: "Kulinari, Katering & Pastri",
    shortMalay: "Masakan & Katering",
    shortEn: "Catering & Pastry",
    cluster: "Kulinari",
    slug: "culinary-pastry",
    iconName: "UtensilsCrossed",
  },
  {
    id: "sk-9",
    name: "Hair Styling & Beauty Therapy",
    malayName: "Dandanan Rambut & Terapi Kecantikan",
    shortMalay: "Gunting & Dandanan",
    shortEn: "Hair & Grooming",
    cluster: "Dandanan & Kosmetologi",
    slug: "beauty-hair",
    iconName: "Sparkles",
  },
  {
    id: "sk-10",
    name: "Computer, Laptop & Networking",
    malayName: "Baik Pulih Komputer, Laptop & Rangkaian",
    shortMalay: "Komputer & IT",
    shortEn: "PC & Networking",
    cluster: "Teknologi Maklumat",
    slug: "computer-networking",
    iconName: "Laptop",
  },
];

// Official Malaysian Districts (Daerah) Grouped by State (Negeri)
export const MALAYSIA_DISTRICTS_BY_STATE: Record<string, string[]> = {
  Perak: [
    "Kuala Kangsar",
    "Kinta (Ipoh / Batu Gajah)",
    "Larut, Matang & Selama (Taiping)",
    "Manjung (Seri Manjung / Lumut)",
    "Hilir Perak (Teluk Intan)",
    "Batang Padang (Tapah)",
    "Muallim (Tanjung Malim)",
    "Kampar",
    "Perak Tengah (Seri Iskandar)",
    "Kerian (Parit Buntar)",
    "Hulu Perak (Gerik)",
  ],
  Selangor: [
    "Petaling (Shah Alam / PJ / Subang)",
    "Hulu Langat (Kajang / Bangi / Ampang)",
    "Klang",
    "Gombak (Selayang / Rawang)",
    "Sepang (Cyberjaya / Nilai)",
    "Kuala Langat (Banting)",
    "Kuala Selangor",
    "Hulu Selangor (Kuala Kubu Bharu)",
    "Sabak Bernam",
  ],
  "WP Kuala Lumpur": [
    "Cheras",
    "Setiawangsa / Wangsa Maju",
    "Titiwangsa / Kampung Baru",
    "Batu / Sentul",
    "Kepong / Segambut",
    "Lembah Pantai / Bangsar",
    "Bandar Tun Razak / Bukit Jalil",
  ],
  Johor: [
    "Johor Bahru / Iskandar Puteri",
    "Pasir Gudang",
    "Batu Pahat",
    "Muar",
    "Kluang",
    "Kulai",
    "Kota Tinggi",
    "Segamat",
    "Pontian",
    "Tangkak",
    "Mersing",
  ],
  Kedah: [
    "Kota Setar (Alor Setar)",
    "Kuala Muda (Sungai Petani)",
    "Kulim",
    "Kubang Pasu (Jitra)",
    "Langkawi",
    "Baling",
    "Pendang",
    "Yan",
  ],
  "Pulau Pinang": [
    "Seberang Perai Utara (Kepala Batas / Butterworth)",
    "Seberang Perai Tengah (Bukit Mertajam / Perai)",
    "Seberang Perai Selatan (Nibong Tebal)",
    "Timur Laut (George Town)",
    "Barat Daya (Bayan Lepas / Balik Pulau)",
  ],
  Melaka: [
    "Melaka Tengah (Ayer Keroh / Bandar Melaka)",
    "Alor Gajah (Masjid Tanah)",
    "Jasin",
  ],
  "Negeri Sembilan": [
    "Seremban / Nilai",
    "Port Dickson",
    "Jempol (Bahau)",
    "Tampin",
    "Kuala Pilah",
    "Rembau",
    "Jelebu",
  ],
  Pahang: [
    "Kuantan",
    "Temerloh",
    "Bentong",
    "Pekan",
    "Raub",
    "Jerantut",
    "Maran",
    "Cameron Highlands",
    "Rompin",
  ],
  Kelantan: [
    "Kota Bharu",
    "Pasir Mas",
    "Tumpat",
    "Bachok",
    "Tanah Merah",
    "Machang",
    "Kuala Krai",
    "Gua Musang",
  ],
  Terengganu: [
    "Kuala Terengganu / Kuala Nerus",
    "Kemaman (Chukai)",
    "Dungun",
    "Besut (Jertih)",
    "Marang",
    "Hulu Terengganu (Kuala Berang)",
    "Setiu",
  ],
  Sabah: [
    "Kota Kinabalu",
    "Penampang / Putatan",
    "Sandakan",
    "Tawau",
    "Lahad Datu",
    "Keningau",
    "Tuaran",
    "Papar",
  ],
  Sarawak: [
    "Kuching / Samarahan",
    "Miri",
    "Sibu",
    "Bintulu",
    "Sri Aman",
    "Sarikei",
    "Limbang",
  ],
  Perlis: ["Kangar", "Arau", "Padang Besar"],
};

// Kept for backward compatibility where referenced
export const GIATMARA_CENTERS_BY_STATE: Record<string, string[]> =
  MALAYSIA_DISTRICTS_BY_STATE;

export const MALAYSIA_STATES: string[] = Object.keys(
  MALAYSIA_DISTRICTS_BY_STATE
);

export const SUBSCRIPTION_TIERS = [
  {
    tier: "TRIAL" as PlanTier,
    name: "Percubaan Percuma Perintis",
    nameEn: "3-Month Free Pioneer Trial",
    priceRM: 0,
    period: "/ 3 bulan pertama",
    periodEn: "/ first 3 months",
    popular: false,
    description:
      "Akses percuma selama 3 bulan untuk pakar kemahiran perintis menyertai direktori.",
    descriptionEn:
      "3 months free directory listing for pioneer skilled specialists.",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-300",
    maxSkills: 5,
    features: [
      "Penyenaraian awam percuma selama 3 bulan (90 hari)",
      "Sehingga 5 kemahiran utama & profil lengkap",
      "Butang hubungan terus WhatsApp & Panggilan",
      "Boleh naik taraf pada bila-bila masa",
    ],
    featuresEn: [
      "Free 3-month (90 days) public directory listing",
      "Up to 5 primary skills & full profile",
      "Direct WhatsApp & phone call buttons",
      "Upgrade anytime after trial",
    ],
  },
  {
    tier: "BASIC" as PlanTier,
    name: "Pelan Asas Pakar",
    nameEn: "Basic Specialist Plan",
    priceRM: 15,
    period: "/ bulan",
    periodEn: "/ month",
    popular: false,
    description:
      "Penyenaraian bulanan standard selepas tamat tempoh percubaan 3 bulan.",
    descriptionEn:
      "Standard monthly directory listing after the 3-month free trial.",
    badgeColor: "bg-slate-100 text-slate-800 border-slate-300",
    maxSkills: 5,
    features: [
      "Penyenaraian aktif 30 hari dalam direktori negeri & daerah",
      "Sehingga 5 bidang kemahiran",
      "Hubungan terus WhatsApp pelanggan tanpa komisen",
      "Paparan sijil & jadual waktu operasi fleksibel",
    ],
    featuresEn: [
      "30-day active listing in state & district directory",
      "Up to 5 skill specializations",
      "Zero-commission direct WhatsApp client leads",
      "Display certificates & flexible working hours",
    ],
  },
  {
    tier: "PRO" as PlanTier,
    name: "Pelan Pro Pakar",
    nameEn: "Pro Specialist Plan",
    priceRM: 30,
    period: "/ bulan",
    periodEn: "/ month",
    popular: true,
    description:
      "Pilihan terbaik untuk pakar aktif dengan paparan portfolio kerja & keutamaan carian.",
    descriptionEn:
      "Best for active specialists with project portfolio & priority search placement.",
    badgeColor: "bg-blue-50 text-blue-800 border-blue-300",
    maxSkills: 10,
    features: [
      "Semua manfaat Pelan Asas",
      "Kedudukan carian lebih tinggi mengikut daerah",
      "Paparan penuh rekod projek & pengalaman kerja",
      "Sehingga 10 bidang kemahiran",
    ],
    featuresEn: [
      "Everything in Basic Plan",
      "Priority ranking in state & district searches",
      "Full completed work log & portfolio showcase",
      "Up to 10 skill specializations",
    ],
  },
  {
    tier: "PREMIUM" as PlanTier,
    name: "Pelan Utama (Featured)",
    nameEn: "Featured Expert Plan",
    priceRM: 50,
    period: "/ bulan",
    periodEn: "/ month",
    popular: false,
    description:
      "Kedudukan teratas di halaman utama & lencana panggilan kecemasan 24/7.",
    descriptionEn:
      "Top homepage spotlight placement & 24/7 Emergency Callout badge.",
    badgeColor: "bg-amber-50 text-amber-900 border-amber-300",
    maxSkills: 99,
    features: [
      "Semua manfaat Pelan Pro",
      "Senarai teratas (Featured) di halaman utama direktori",
      "Lencana Khas 'Pakar Disahkan' & Skuad Kecemasan 24/7",
      "Sokongan pengesahan pantas oleh Urusetia Direktori",
    ],
    featuresEn: [
      "Everything in Pro Plan",
      "Top Featured spotlight on directory homepage",
      "Gold 'Verified Expert' & 24/7 Emergency Callout badge",
      "Priority verification support by Directory Management",
    ],
  },
];

// Initial Seeded Skilled Specialists
export const INITIAL_TRAINEES: TraineeListing[] = [
  {
    id: "tr-101",
    name: "Muhammad Haziq bin Roslan",
    email: "haziq.pw2@gmail.com",
    headline: "Pendawai Elektrik Bertauliah (PW2) & Pakar Servis Aircond",
    bio: "Pakar pendawaian elektrik kediaman & komersial dengan tauliah PW2 Suruhanjaya Tenaga. Berpengalaman selama 6 tahun dalam naik taraf kotak agihan (DB Box), pendawaian tambahan, pemasangan lampu/kipas, serta penyelenggaraan penyaman udara (chemical overhaul & topup gas).",
    phone: "+60125438890",
    whatsapp: "60125438890",
    state: "Perak",
    district: "Kuala Kangsar",
    city: "Kuala Kangsar / Ipoh",
    giatmaraCenter: "Kuala Kangsar",
    graduationYear: 2020,
    experienceYears: 6,
    studentId: "PKR-PK-0812",
    certifications: [
      "Sijil Kompetensi Pendawai Elektrik PW2 (Suruhanjaya Tenaga)",
      "Sijil Kemahiran Malaysia (SKM) Tahap 3 Elektrikal",
    ],
    portfolio: [
      {
        id: "p-1",
        title: "Naik Taraf Kotak DB 3-Fasa & Ujian ELCB Kediaman",
        location: "Meru Raya, Ipoh",
        costRM: 480,
      },
      {
        id: "p-2",
        title: "Servis Chemical Overhaul 3 Unit Aircond Inverter",
        location: "Chandan Putri, Kuala Kangsar",
        costRM: 320,
      },
    ],
    isVerified: true,
    isPubliclyListed: true,
    isAccountActive: true,
    planTier: "PREMIUM",
    trialEndsAt: "2027-02-11",
    paymentProofStatus: "VERIFIED",
    availability: "AVAILABLE",
    availableDays: ["Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"],
    startTime: "08:30 PG",
    endTime: "07:00 MLM",
    workingHours: "Isnin - Sabtu • 08:30 PG - 07:00 MLM",
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
    headline: "Pakar Jahitan Pakaian Wanita, Baju Pengantin & Ubah Suai (Alteration)",
    bio: "Tukang jahit berpengalaman selama 5 tahun menerima tempahan Baju Kurung Moden, Kebaya, busana nikah/sanding, pakaian seragam korporat, serta khidmat ubah suai pakaian pantas.",
    phone: "+60173921145",
    whatsapp: "60173921145",
    state: "Selangor",
    district: "Petaling (Shah Alam / PJ / Subang)",
    city: "Shah Alam",
    giatmaraCenter: "Shah Alam",
    graduationYear: 2021,
    experienceYears: 5,
    studentId: "PKR-SL-0341",
    certifications: [
      "SKM Tahap 3 Pembuatan Pakaian Wanita",
      "Sijil Profesional Senireka Fesyen",
    ],
    portfolio: [
      {
        id: "p-3",
        title: "Tempahan Set Kebaya Songket Pengantin & Sulaman Manik",
        location: "Seksyen 7, Shah Alam",
        costRM: 450,
      },
      {
        id: "p-4",
        title: "Jahitan Pukal Baju Korporat Batik (15 Pasang)",
        location: "Subang Jaya",
        costRM: 950,
      },
    ],
    isVerified: true,
    isPubliclyListed: true,
    isAccountActive: true,
    planTier: "PRO",
    trialEndsAt: "2027-02-11",
    paymentProofStatus: "VERIFIED",
    availability: "AVAILABLE",
    availableDays: ["Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu", "Ahad"],
    startTime: "10:00 PG",
    endTime: "07:00 MLM",
    workingHours: "Selasa - Ahad • 10:00 PG - 07:00 MLM",
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
    headline: "Pakar Kimpalan Bergerak (Mobile Welder), Awning, Grill & Paip",
    bio: "Menyediakan perkhidmatan kimpalan terus ke rumah untuk pintu pagar besi (gate), jeriji keselamatan (grill), bumbung awning polycarbonate/metal deck, serta pembaikan paip bocor sekitar Johor Bahru dan Pasir Gudang.",
    phone: "+60197762310",
    whatsapp: "60197762310",
    state: "Johor",
    district: "Johor Bahru / Iskandar Puteri",
    city: "Johor Bahru / Pasir Gudang",
    giatmaraCenter: "Johor Bahru",
    graduationYear: 2019,
    experienceYears: 7,
    studentId: "PKR-JH-1120",
    certifications: [
      "SKM Tahap 3 Kimpalan Arka Logam Berperisai (3G/6G)",
      "Kad Hijau CIDB (Personel Binaan)",
    ],
    portfolio: [
      {
        id: "p-5",
        title: "Fabrikasi & Pemasangan Pintu Pagar Lipat (Folding Gate)",
        location: "Taman Daya, Johor Bahru",
        costRM: 1400,
      },
    ],
    isVerified: true,
    isPubliclyListed: true,
    isAccountActive: true,
    planTier: "TRIAL",
    trialEndsAt: "2027-02-11",
    paymentProofStatus: "NONE",
    availability: "AVAILABLE",
    availableDays: ["Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"],
    startTime: "09:00 PG",
    endTime: "06:00 PTG",
    workingHours: "Isnin - Sabtu • 09:00 PG - 06:00 PTG",
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
    headline: "Mekanik Bergerak Kereta & Motosikal (Breakdown & Servis Rumah)",
    bio: "Khidmat pemeriksaan enjin ke rumah/lokasi rosak, tukar bateri kereta, pad brek, servis minyak hitam, dan imbasan diagnostik komputer OBD2 di sekitar Cheras dan Kuala Lumpur.",
    phone: "+60138819022",
    whatsapp: "60138819022",
    state: "WP Kuala Lumpur",
    district: "Cheras",
    city: "Cheras / Bandar Tun Razak",
    giatmaraCenter: "Cheras",
    graduationYear: 2022,
    experienceYears: 4,
    studentId: "PKR-KL-0194",
    certifications: ["SKM Tahap 2 Servis Selepas Jualan Automotif"],
    portfolio: [
      {
        id: "p-6",
        title: "Bantuan Kecemasan Penukaran Alternator & Bateri",
        location: "Bandar Tun Razak, KL",
        costRM: 280,
      },
    ],
    isVerified: true,
    isPubliclyListed: true,
    isAccountActive: true,
    planTier: "TRIAL",
    trialEndsAt: "2027-02-11",
    paymentProofStatus: "NONE",
    availability: "BUSY",
    availableDays: [
      "Isnin",
      "Selasa",
      "Rabu",
      "Khamis",
      "Jumaat",
      "Sabtu",
      "Ahad",
    ],
    startTime: "09:00 PG",
    endTime: "10:00 MLM",
    workingHours: "Isnin - Ahad • 09:00 PG - 10:00 MLM",
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
    headline: "Pakar Paip Kediaman, Tangki Air & Pam Penggalak (Plumber)",
    bio: "Berpengalaman 5 tahun dalam pemasangan dan pembaikan sistem bekalan air rumah, masalah tekanan air rendah, paip bocor dalam dinding, saluran tersumbat, dan pemasangan kelengkapan bilik air.",
    phone: "+60112849301",
    whatsapp: "60112849301",
    state: "Perak",
    district: "Kinta (Ipoh / Batu Gajah)",
    city: "Ipoh / Batu Gajah",
    giatmaraCenter: "Ipoh",
    graduationYear: 2021,
    experienceYears: 5,
    studentId: "PKR-PK-0419",
    certifications: [
      "Sijil Kemahiran Teknologi Bekalan Air & Perpaipan Domestik",
    ],
    portfolio: [
      {
        id: "p-7",
        title: "Pemasangan Tangki Air Poly & Pam Air Bypass",
        location: "Station 18, Ipoh",
        costRM: 350,
      },
    ],
    isVerified: true,
    isPubliclyListed: true,
    isAccountActive: true,
    planTier: "PRO",
    trialEndsAt: "2027-02-11",
    paymentProofStatus: "VERIFIED",
    availability: "AVAILABLE",
    availableDays: ["Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"],
    startTime: "08:00 PG",
    endTime: "07:00 MLM",
    workingHours: "Isnin - Sabtu • 08:00 PG - 07:00 MLM",
    emergencyAvailable: true,
    startingRateRM: 45,
    skills: ["plumbing"],
    rating: 4.8,
    completedJobs: 29,
  },
];
