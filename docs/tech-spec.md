# Mudeng Event Web - Technical Specification

## 1. Skema Database (Drizzle ORM)

### Tabel `events`
Tabel utama untuk mendefinisikan *event* yang diselenggarakan.
- `id`: varchar(255) (Primary Key)
- `slug`: varchar(255) (Unique, untuk URL)
- `title`: varchar(255)
- `description`: text
- `formFields`: jsonb (Berisi susunan dan konfigurasi pertanyaan form pendaftaran yang didefinisikan oleh Admin).
- `googleSheetId`: varchar(255) *(Rencana ke depan untuk sinkronisasi Google Sheets)*
- `createdAt`, `updatedAt`

#### Struktur Konfigurasi `formFields` JSON:
```json
[
  {
    "id": "q1_name",
    "type": "text", // enum: "text", "textarea", "checkbox", "radio", "select"
    "label": "Nama Lengkap",
    "required": true,
    "step": 1,
    "options": ["Pria", "Wanita"], // Hanya untuk radio/select/checkbox
    "allowOtherOption": false, // Memunculkan input "Lainnya"
    "dependsOn": "q0_status", // ID pertanyaan lain untuk logika kondisional
    "dependsOnValue": "Mahasiswa" // Jawaban spesifik yang memicu munculnya form ini
  }
]
```

### Tabel `registrations`
Menyimpan pendaftar (peserta) setiap *event*.
- `id`: varchar(255) (Primary Key)
- `eventId`: varchar(255) (Foreign Key ke `events`)
- `email`: varchar(255) (Diekstrak otomatis dari `answers` demi indeks cepat)
- `fullName`: varchar(255) (Diekstrak otomatis dari `answers` demi indeks cepat)
- `status`: varchar(50) (Enum: `PENDING`, `APPROVED`, `REJECTED`)
- `answers`: jsonb (Menyimpan Hybrid Snapshot jawaban pendaftar).

### Tabel `users`
Menyimpan administrator atau staff aplikasi.
- `id`: varchar(255) (Primary Key)
- `email`: varchar(255)
- `role`: varchar(50) (Enum: `admin`, `user`)

## 2. API & Ekspor Data

### Export CSV (Excel)
Terdapat *Server Action* bernama `exportRegistrantsCSV` yang melakukan pemrosesan dinamis di *backend*.
- Fungsi ini membaca *Hybrid Snapshot* dari kolom `answers`.
- Jika struktur jawaban berbentuk objek (Snapshot baru), ia mengekstrak kunci `label` sebagai *Header* Excel.
- Jika berbentuk teks murni (Sistem lawas), ia menggunakan `field_id` sebagai fallback.
- Array (jawaban dari *checkbox*) digabungkan menggunakan koma `.join(", ")` kecuali jika sistem mendeteksi bentuk Array tunggal (*corrupted string spreading*), di mana ia akan melakukan sanitasi sebelum menggabungkan.

## 3. Library Utama
- `react-hook-form` & `@hookform/resolvers/zod`: *Handling* form pendaftaran *multi-step*.
- `lucide-react`: Seluruh ikon UI.
- `drizzle-orm` & `postgres`: Koneksi database tipe-aman (*type-safe*).
- `xlsx` (Rencana untuk dieksplorasi) / Google Sheets API `google-spreadsheet`.
