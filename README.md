# GIATMARA SkillsHub - Platform Direktori Kemahiran & Usahawan TVET

Platform direktori usahawan teknikal dan pelatih bertauliah GIATMARA Malaysia yang dibina dengan **Next.js (App Router)**, **React 19**, **Tailwind CSS**, dan **Prisma ORM (PostgreSQL)**.

---

## 🛠 Ciri-Ciri Utama (Core Features)

1. **Direktori Awam (Client Directory)**
   - Carian kemahiran mengikut kluster TVET rasmi (Elektrikal PW2/PW4, Penyejukbekuan & HVAC, Automotif, Kimpalan, Paip & Jahitan).
   - Penapis negeri mengikut kesemua cawangan GIATMARA di 14 buah negeri.
   - Panggilan pantas skuad kecemasan 24/7 (Emergency Callout).
   - Butang hubungan terus melalui WhatsApp tanpa caj perantara.

2. **Studio Pelatih & Usahawan (Trainee Studio)**
   - Status ketersediaan langsung (*Available Now*, *Booked Today*, *Away*).
   - Pengurusan profil, kadar upah asas (RM/jam), sijil kemahiran SKM & log projek selesai.
   - Pilihan pakej langganan bulanan usahawan (ToyyibPay FPX).

3. **Konsol Pentadbir (Admin Console)**
   - Kawalan penuh CRUD maklumat pelatih.
   - Pengesahan nombor matriks GIATMARA (*Matrix Verification*).
   - Pengurusan katalog kemahiran TVET & lejar langganan FPX.

---

## 🗄️ Persediaan Pangkalan Data (PostgreSQL & Prisma)

Projek ini telah dilengkapi dengan skema Prisma rasmi di [`prisma/schema.prisma`](./prisma/schema.prisma) untuk PostgreSQL (Supabase / Neon / Local PostgreSQL).

### 1. Konfigurasi `.env`
Salin fail `.env.example` kepada `.env`:

```env
DATABASE_URL="postgresql://<USER>:<PASSWORD>@<HOST>:5432/<DATABASE>?schema=public"
DIRECT_URL="postgresql://<USER>:<PASSWORD>@<HOST>:5432/<DATABASE>?schema=public"
```

### 2. Jana Skema & Segerak Database
```bash
npx prisma generate
npx prisma db push
```

---

## 🚀 Menjalankan Aplikasi Secara Lokal

```bash
# 1. Pasang dependensi
npm install

# 2. Mulakan pelayan pembangunan
npm run dev
```

Buka pelayar web di [http://localhost:3000](http://localhost:3000).

---

## 📤 Arahan Tolak ke GitHub (Push to GitHub)

Jika komputer anda belum mempunyai `git` CLI dipasang:
1. Muat turun Git untuk Windows dari [git-scm.com/download/win](https://git-scm.com/download/win) dan pasang.
2. Buka terminal (PowerShell atau Command Prompt) dalam folder projek ini dan jalankan:

```bash
# Inisialisasi Git repository
git init

# Tambah repositori GitHub sebagai remote origin
git remote add origin https://github.com/bellauna21-cmyk/giatmara-capstone.git

# Semak dan tambah semua fail
git add .

# Buat komit pertama
git commit -m "feat: GIATMARA SkillsHub modern directory with PostgreSQL schema"

# Tetapkan branch main dan push ke GitHub
git branch -M main
git push -u origin main
```

