# Konsep Desain Utama — MUDENG 2026 Landing Page

> Dokumen ini disesuaikan langsung dari desain Figma: **WEBSITE EVENT CL — MUDENG 2026** (node `40:2`).

Konsep ini mengedepankan estetika bersih (clean), minimalis, dengan tipografi yang kuat serta kontras warna foto yang berani (high-contrast photography) untuk memberikan kesan teknologi masa depan yang mahal dan profesional.

---

## 1. Aturan Tipografi (Typography)

Sistem tipografi menggunakan dua keluarga font utama yang diekstrak dari Figma:

### Font Families

| Peran                     | Font Family     | Weight          | Contoh Penggunaan                       |
| ------------------------- | --------------- | --------------- | --------------------------------------- |
| **Hero Headline**         | `Anton`         | Regular (400)   | "TAKE OVER THE TIMELINE"                |
| **Section Heading (H2)**  | `Anton`         | Regular (400)   | "MUDENG CREATIVE POWERHOUSE"            |
| **Sub-heading (H3)**      | `Geist`         | SemiBold (600)  | "Growth that pops", "Foundation"        |
| **Body / Paragraph**      | `Geist`         | Medium (500)    | Deskripsi, teks pendukung               |
| **Navigation Links**      | `Inter`         | Medium (500)    | About, Services, Process, Projects      |
| **Button Text**           | `Geist`         | Medium (500)    | "Daftar Sekarang", "Lihat Detail"       |
| **Badge / Indicator**     | `Geist`         | Medium (500)    | Angka statistik: 8600, 1520, 1160, 730  |
| **Tag / Pill Label**      | `Geist`         | Medium (500)    | "System", "Structure", "Hooks"          |

### Ukuran Font (Font Sizes)

| Elemen                    | Ukuran     | Line Height   | Letter Spacing  |
| ------------------------- | ---------- | ------------- | --------------- |
| Hero Headline             | `96px`     | `92.16px`     | `-3.84px`       |
| Section H2 (large)        | `96px`     | `92.16px`     | `-3.84px`       |
| Section H2 (medium)       | `72px`     | —             | —               |
| H3 Card Title             | `32px`     | `34.56px`     | `-0.96px`       |
| Body / Subtitle           | `24px`     | `29.76px`     | `-0.48px`       |
| Body Paragraph (card)     | `18px`     | `22.32px`     | `-0.36px`       |
| Navigation Link           | `~14px`    | `23.25px`     | `-0.45px`       |
| Button Text               | `16px`     | `19.84px`     | `-0.32px`       |
| Tag / Pill Text           | `16px`     | `19.84px`     | `-0.32px`       |
| Badge Number              | `16px`     | `19.84px`     | `-0.32px`       |
| Footer Link               | `16px`     | `19.84px`     | —               |

---

## 2. Palet Warna (Color Palette)

### Warna Utama

| Elemen                           | Warna / Kode                                     |
| -------------------------------- | ------------------------------------------------ |
| **Latar Belakang Utama**         | `#FFFFFF` (Putih bersih)                         |
| **Warna Teks Utama**             | `rgba(26, 26, 26, 1)` / `#1A1A1A` (Hitam pekat) |
| **Warna Teks Pendukung**         | `rgba(26, 26, 26, 0.65)` (Abu-abu gelap 65%)    |
| **Warna Teks Card Tag**          | `rgba(255, 255, 255, 0.65)` (Putih 65%)         |
| **Warna Teks Card Title**        | `#FFFFFF` (Putih)                                |
| **Warna Navigation Link**        | `#57575A`                                        |
| **Warna Teks Tombol Sekunder**   | `#383838`                                        |

### Warna Aksen / Brand

| Elemen                           | Warna / Kode                                                          |
| -------------------------------- | --------------------------------------------------------------------- |
| **Primary Brand (Hero text)**    | `#6849E1` (Ungu/Violet)                                              |
| **Tombol Utama (CTA)**           | `#6849E1` solid                                                       |
| **Tombol CTA Navbar**            | `linear-gradient(118.92deg, rgb(102, 103, 228) 0%, rgba(102, 103, 228, 0.8) 100%)` |
| **Tombol CTA Navbar Shadow**     | `0px 10px 20px 0px rgba(31, 81, 218, 0.3)`                           |
| **Tombol Sekunder**              | `rgba(124, 122, 234, 0.1)` (Ungu transparan)                        |
| **Navbar Logo Gradient BG**      | `linear-gradient(to bottom, rgba(124, 122, 234, 0.3), rgba(86, 198, 242, 0.3))` |
| **Navbar Logo Shadow**           | `0px 5px 14px 0px rgba(0, 0, 0, 0.15)`                              |

### Warna Badge / Floating Indicator

| Badge     | Warna Ikon          |
| --------- | ------------------- |
| Badge 1   | `#2979FA` (Biru)    |
| Badge 2   | `#F5284B` (Merah)   |
| Badge 3   | `#F56628` (Jingga)  |
| Badge 4   | `#49C420` (Hijau)   |

### Warna Elemen Lainnya

| Elemen                           | Warna / Kode                                     |
| -------------------------------- | ------------------------------------------------ |
| **Navbar Outer Background**      | `#F6F6FD` (Abu-abu keunguan sangat muda)         |
| **Navbar Inner Background**      | `#FFFFFF` (Putih)                                |
| **Navbar Inner Shadow**          | `0px 3px 10px 0px rgba(0, 0, 0, 0.05)`          |
| **Card Shadow**                  | `0px 16px 48px -4px rgba(26, 26, 26, 0.2)`      |
| **Card Border**                  | `4px solid white`                                |
| **Card Gradient Overlay**        | `linear-gradient(to bottom, rgba(26,26,26,0), rgba(26,26,26,0.8))` |
| **Badge Drop Shadow**            | `0px 12px 10px rgba(26, 26, 26, 0.1)`           |

---

## 3. Tata Letak (Layout)

### Dimensi Halaman

| Properti               | Nilai        |
| ---------------------- | ------------ |
| Lebar halaman penuh    | `1920px`     |
| Tinggi total halaman   | `14514px`    |
| Padding horizontal     | `240px` per sisi (konten di area `1440px`) |
| Content max-width      | `1440px`     |

### Grid & Spacing

| Elemen                    | Detail                                               |
| ------------------------- | ---------------------------------------------------- |
| Hero area height          | `1075px` (termasuk background)                       |
| Hero content top offset   | `243px` dari atas halaman                            |
| Image blocks area         | `1440px × 304px`, 4 gambar bulat (rounded square)   |
| Benefits card grid        | 3 kolom × 2 baris, card `469.33px × 560px`          |
| Card spacing horizontal   | `~16px` gap                                          |
| Card spacing vertical     | `16px` gap                                           |
| Curriculum card grid      | 3 kolom, card `469.33px`                             |
| Footer content area       | `1440px`, padding horizontal `240px`                 |

---

## 4. Komponen Antarmuka (UI Components)

### 4.1 Bilah Navigasi (Navigation Bar)

- **Posisi**: Fixed di atas halaman, centered
- **Bentuk luar**: Kapsul (pill), `border-radius: 999px`
- **Background luar**: `#F6F6FD` (abu-abu keunguan sangat muda), tinggi `61.25px`
- **Bentuk dalam**: Kapsul putih, `border-radius: 999px`, tinggi `53.25px`
- **Background dalam**: `#FFFFFF` dengan `box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.05)`
- **Logo**: Gradient background (ungu → biru), rounded full, dengan shadow
- **Menu**: Horizontal, font `Inter Medium`, ukuran `~14px`, warna `#57575A`
- **Tombol CTA**: Kapsul gradient ungu, teks putih `Geist Medium 14px`, dengan shadow biru

### 4.2 Bagian Hero (Hero Section)

- **Background**: Pattern/texture image full width (`1920 × 1075px`)
- **Headline**: "TAKE OVER THE TIMELINE" — `Anton Regular 96px`, warna `#6849E1`, center-aligned
- **Subtitle**: `Geist Medium 24px`, warna `rgba(26, 26, 26, 0.65)`, center-aligned
- **CTA Buttons**: Dua tombol berdampingan:
  - **Primary**: "Daftar Sekarang" — `#6849E1`, `border-radius: 100px`, teks putih
  - **Secondary**: "Lihat Detail" — `rgba(124, 122, 234, 0.1)`, `border-radius: 100px`, teks `#383838`
- **Floating Badges**: 4 buah badge kapsul putih dengan ikon berwarna dan angka statistik
  - Badges sengaja ditempatkan miring (`rotate: ±10deg`) untuk kesan dinamis
  - Ukuran badge: `~80px × 32px`, `border-radius: 100px`
  - Shadow: `0px 12px 10px rgba(26, 26, 26, 0.1)`

### 4.3 Image Blocks (Hero Photo Grid)

- 4 buah gambar potret dalam frame rounded square
- Ukuran per frame: `~277px × 277px`
- `border-radius: 32px`
- Posisi vertikal bervariasi (staggered) untuk kesan dinamis
- Foto-foto: potret high-contrast dengan latar belakang warna berani

### 4.4 Section About Us

- Statistik counter: `250+` peserta, `95` kategori, `100+` mentor, `100+` portofolio
- Font angka: `Anton`-style bold, ukuran besar (~`48px`)
- Video wrapper: `1200px × 650px`, rounded corners, tombol play centered

### 4.5 Kartu Grid Konten (Benefits Content Cards)

- **Grid**: 3 kolom × 2 baris
- **Ukuran kartu**: `469.33px × 560px`
- **Border radius**: `32px`
- **Border**: `4px solid white`
- **Shadow**: `0px 16px 48px -4px rgba(26, 26, 26, 0.2)`
- **Foto**: Full-bleed, potret high-contrast
- **Gradient overlay**: Di 40% bawah, `rgba(26,26,26,0) → rgba(26,26,26,0.8)`
- **Blur overlay**: Progressive blur berlapis (8 layer: 0.156px → 20px) menggunakan mask
- **Tag text**: `Geist Medium 16px`, warna `rgba(255, 255, 255, 0.65)`
- **Title text**: `Geist SemiBold 32px`, warna `#FFFFFF`
- **Description text**: `Geist Medium 18px`, warna `rgba(255, 255, 255, 0.65)`

### 4.6 Section Approach (MUDENG Creative Powerhouse)

- Headline: "MUDENG CREATIVE POWERHOUSE" — `Anton 96px`, warna `#6849E1`
- 3 kolom benefit text: "Clear System", "Every Platform", "Real Results"
- Floating icon bubbles: Logo tool kreatif (Figma, Canva, Photoshop, CapCut, Dribbble, Instagram)
  - Ukuran bubble: `~95px × 95px` dan `~102px × 102px`
  - Posisi menyebar dan bertumpuk di atas/bawah area teks
- Decorative scribble SVGs

### 4.7 Section System (THE SYSTEM THAT PROVIDES)

- Headline: "THE SYSTEM THAT PROVIDES" — `Anton` style, ukuran besar
- Icon Pills grid: 3 kolom × 3 baris
  - Setiap pill: ikon wrapper `80px × 80px` + label `Geist SemiBold 32px`
  - Pill items: System-Based, No Guesswork, Reusable System, Repeatable Wins, Clear Direction, Smart Posting, Repeatable Wins, Creator-First, Easy Consistency

### 4.8 Section Benefits (You'll love this course)

- Headline: "You'll love this course" — `Anton`-style bold
- Subtitle: `Geist Medium`, warna abu-abu

### 4.9 Curriculum Cards

- Grid 3 kolom, card `469.33px × 703.72px`
- Dua bagian per card:
  - **Atas (Content Block)**: `304px` tinggi, berisi icon, nomor modul (`01`, `02`, `03`), judul modul, deskripsi
  - **Bawah (Details Block)**: `399.72px` tinggi, berisi daftar pelajaran bernomor (1-7) + tag pills
- Tag pills: Kapsul abu-abu kecil dengan ikon + label (System, Structure, Hooks, Formats, etc.)
- Modul:
  1. **Foundation** — Build a simple system
  2. **Content** — Create content people pause for
  3. **Momentum** — Scale what works

### 4.10 Section Preview (MUDENG PROVIDES PRACTICAL TRAINING)

- Headline besar: "MUDENG PROVIDES PRACTICAL TRAINING TO BOOST YOUR CREATIVE DIGITAL SKILL"
- Video wrapper: `880px × 495px`, rounded, tombol play centered
- Floating badges tersebar di sekitar headline

### 4.11 Section Testimonials (Real stories from creators)

- Headline: "Real stories from creators" — dua baris, centered
- Testimonial cards: Kapsul putih rounded, berisi:
  - 5 bintang rating
  - Teks testimonial
  - Avatar + nama (Jordan P., Alex R., Sofia K., Lena M., etc.)
- Cards tersebar/overlapping untuk kesan dinamis
- Decorative scribble SVGs

### 4.12 Section CTA (LEARN BETTER BUILD SMARTER)

- Headline: "LEARN BETTER BUILD SMARTER" — `Anton`
- Surrounding photo ring: 10+ foto potret dalam lingkaran/arc arrangement
- Tombol CTA: "Daftar Sekarang"
- Subtitle text di atasnya

### 4.13 Section FAQ

- Accordion style, lebar `560px`
- Pertanyaan:
  - Is this course beginner-friendly?
  - Will this work for my niche?
  - What if I don't see results?
  - Which plan should I choose?
  - Can I access this on mobile?
- Setiap item: tinggi `70.31px` collapsed, icon expand/collapse di kanan

### 4.14 Footer

- **Struktur**: 4 kolom menu + logo area + newsletter form
- **Menu Columns**:
  - Menu: Approach, Instructor, Curriculum, Pricing
  - Support: Email Us, Telegram, Live chat, Help Center
  - Follow: Instagram, TikTok, YouTube
  - Resources: Free Lesson, Course Guide, Community
- **Newsletter**: Input email + tombol "Subscribe"
- **Legal**: "© 2026, All Rights Reserved" + Privacy Policy + Back To Top

---

## 5. Panduan Interaksi dan Animasi (Interaction Guide)

### Efek Kemunculan (Entrance Animation)
- Gunakan animasi geser ke atas secara perlahan (`slide-up`) dipadukan dengan efek memudar (`fade-in`) saat elemen pertama kali masuk ke viewport.
- Stagger delay antar elemen: `100ms - 200ms`

### Animasi Pegas Lembut (Soft Spring)
- Elemen floating badges menggunakan transisi berbasis pegas (spring physics)
- Saat muncul atau merespons kursor, badges terkesan memantul secara alami

### Progressive Blur (Card Overlay)
- 8 layer blur bertingkat dari `0.156px` → `20px` menggunakan mask image
- Gradient hitam di bawah: `rgba(26,26,26,0) → rgba(26,26,26,0.8)`

### Interaksi Kursor (Hover State)
- **Tombol utama**: `scale(1.05)` atau berubah ke shade lebih terang secara halus
- **Tombol sekunder**: Background opacity meningkat saat hover
- **Kartu konten**: Subtle tilt effect / micro-tilt untuk feedback interaktif
- **Navigation links**: Perubahan warna halus saat hover

### Badge Rotation
- Badges menggunakan `rotate: ±10deg` statis, dengan hover effect yang menambah sedikit gerakan

---

## 6. Responsivitas (Responsive Notes)

Desain Figma saat ini menggunakan viewport `1920px` (Desktop). Untuk implementasi responsif:

| Breakpoint     | Lebar     | Catatan                                              |
| -------------- | --------- | ---------------------------------------------------- |
| Desktop Large  | `≥1440px` | Padding `240px`, full layout                         |
| Desktop        | `1024px`  | Kurangi padding, 2-kolom grid untuk benefit cards    |
| Tablet         | `768px`   | Navbar collapse ke hamburger, 1-2 kolom grid         |
| Mobile         | `≤480px`  | Stack vertikal, headline ukuran dikurangi 50%        |

---

## 7. Referensi Sumber Figma

- **File**: WEBSITE EVENT CL — MUDENG 2026
- **Node utama**: `40:2` (Landing Page)
- **URL**: `https://www.figma.com/design/NlzslCk20NsBVHrsMTz0zy/WEBSITE-EVENT-CL---MUDENG-2026?node-id=40-2&m=dev`
