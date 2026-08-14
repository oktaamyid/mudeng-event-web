# Mudeng Event Web - Architecture Decisions & Patterns

## 1. Stack Teknologi Utama
- **Framework Core:** Next.js 15 (App Router). Menitikberatkan penggunaan *Server Components* untuk SEO yang lebih baik dan *client components* (`"use client"`) hanya pada interaktivitas antarmuka.
- **Bahasa Pemrograman:** TypeScript dengan Mode Ketat (*Strict Mode*). Dilarang keras menggunakan tipe `any`, harus menggunakan validasi tipe atau `unknown`.
- **Database & ORM:** PostgreSQL dengan Drizzle ORM. Skema diatur di dalam `src/db/schema.ts`.
- **UI & Styling:** Tailwind CSS v4, dikonfigurasi menggunakan sintaks `@theme` di `globals.css` beserta dukungan variabel custom. Komponen UI berbasis **shadcn/ui**.
- **Form & Validation:** Kombinasi `react-hook-form` dan `zod` untuk memastikan integritas input sisi klien (*client-side*) maupun validasi ketat di sisi server.

## 2. Pola Arsitektur Spesifik

### 2.1. Pola Hybrid Snapshot untuk Dynamic Forms
Pendekatan konvensional biasanya hanya menyimpan nilai jawaban pendaftar (contoh: `{"q1": "Jawaban"}`). Namun pada Mudeng Event, sistem *form* sangat dinamis. Admin bisa mengubah atau menghapus pertanyaan (struktur *form*) di masa depan.
**Solusi:** Menyimpan data menggunakan **Hybrid Snapshot Pattern** di dalam kolom JSONB `answers` di tabel `registrations`.
Struktur Snapshot:
```json
{
  "field_id_1": {
    "label": "Nama Lengkap",
    "type": "text",
    "value": "Budi Santoso"
  }
}
```
**Keuntungan:** Rekam jejak jawaban 100% aman dan bisa dibaca (di *Dashboard* atau CSV) meskipun kolom sumber pertanyaan di tabel *events* dihapus oleh admin di masa depan.

### 2.2. Manajemen State Mutations (Server Actions)
Semua manipulasi data (Create, Update, Delete) TIDAK dilakukan melalui API Route REST klasik (`/api/...`), melainkan menggunakan arsitektur **Server Actions**.
- Semua *Server Actions* diletakkan terpusat di folder `src/lib/actions/`.
- Setiap fungsi yang memodifikasi data (contoh: `updateRegistrationStatus`, `deleteUser`) harus selalu mengecek autentikasi dan otorisasi *session* (`session.role === "admin"`) secara redundan di sisi server sebelum mengeksekusi Drizzle *queries*.
- Mengembalikan *return type* standar: `{ success: boolean, error?: string, data?: any }`.

### 2.3. Pendekatan Styling Komponen
Karena kita menggunakan arsitektur Tailwind v4 `@theme`, beberapa modifikasi tingkat dalam (*deep styling*) pada komponen seperti `shadcn/ui` Button mungkin mengalami konflik *class*. 
- Standar penulisan: Gunakan fungsi `cn()` dari `tailwind-merge`. 
- Pengecualian (*Edge Cases*): Jika ada konflik perpaduan warna kustom dari variabel lokal (contoh: `--color-badge-green`), gunakan *Inline CSS Style* spesifik (`style={{ backgroundColor: "var(...)" }}`) di atas komponen dasar untuk memaksa *rendering* melampaui konflik kelas.

## 3. Struktur Folder Utama
- `src/app/` : Menyimpan logika *routing* aplikasi (Halaman publik & `/admin`).
- `src/components/` : Menyimpan semua blok UI (*Hero*, *FormBuilder*, dll).
- `src/components/ui/` : Menyimpan fondasi komponen dasar (*Button*, *Dialog*, *Table*, dll) dari shadcn.
- `src/lib/` : Menyimpan utilitas, skema *zod*, *server actions*, dan logika autentikasi.
- `src/db/` : Menyimpan konfigurasi koneksi *database*, skema *Drizzle*, dan *seed*.
- `docs/` : Menyimpan seluruh dokumentasi pusat yang wajib dibaca oleh AI Assistant (PRD, Arsitektur, Tech Spec).
