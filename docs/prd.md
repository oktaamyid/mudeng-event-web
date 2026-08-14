# Mudeng Event Web - Product Requirements Document (PRD)

## 1. Visi Produk
Mudeng Event Web adalah platform manajemen acara (event) modern yang dirancang untuk memudahkan penyelenggara dalam membuat halaman *landing page* acara, mengumpulkan pendaftaran melalui formulir dinamis yang bisa di-*custom* (Form Builder), serta mengelola data peserta secara profesional dengan sistem validasi dan ekspor data yang kuat.

## 2. Target Pengguna
1. **Admin (Penyelenggara):** Memiliki akses penuh untuk membuat *event*, mendesain pertanyaan formulir pendaftaran, memverifikasi (Approve/Pending) pendaftar, mengekspor data, dan mengelola hak akses sistem (Users Administration).
2. **User (Peserta):** Mengakses *landing page* yang *responsive* dan indah, serta mengisi formulir pendaftaran *multi-step* tanpa hambatan (*frictionless*).

## 3. Fitur Utama (Core Features)

### 3.1. Dynamic Form Builder
- Admin dapat menambahkan, mengubah, atau menghapus kolom pertanyaan secara dinamis untuk setiap *event*.
- Mendukung berbagai tipe input: Text, Checkbox, Radio, Select.
- Mendukung pengaturan opsi "Lainnya" (Other) yang memunculkan input teks tambahan.
- Sistem form *multi-step* untuk memecah form panjang agar lebih ramah pengguna.
- Logika percabangan (*conditional logic*) di mana pertanyaan tertentu hanya muncul jika jawaban sebelumnya memenuhi kriteria.

### 3.2. Registrant Management (Dashboard)
- Tabel pendaftar *real-time* dengan fitur *search* dan *filter*.
- Sistem validasi status pendaftar: **Pending** vs **Approved**.
- Dialog *Pop-up* detail pendaftar dengan UI/UX kelas atas.
- **Hybrid Snapshot System**: Jawaban pendaftar dikunci beserta judul pertanyaannya saat mendaftar, untuk mencegah kerusakan data jika Admin mengubah pertanyaan di masa depan.
- **Export to CSV**: Mengubah data pendaftar (termasuk jawaban *custom form*) menjadi format Excel secara dinamis.

### 3.3. Users Administration
- Manajemen *role* (Admin vs User).
- Admin dapat menaikkan/menurunkan hak akses pengguna lain.
- Penghapusan akun secara aman.

### 3.4. Landing Page Event
- Halaman publik *event* dengan performa tinggi (Next.js App Router).
- Desain *modern* dengan animasi halus, *glassmorphism*, dan kompatibilitas *mobile*.

## 4. Rencana Pengembangan (Roadmap & Pending)
- **Fase 1 (Selesai):** Dynamic Form, Dashboard Registrants, Export CSV dasar, User Management, Hybrid Snapshot.
- **Fase 2 (Pending):** Integrasi Sinkronisasi Langsung ke Google Sheets API (Opsi 2).
- **Fase 3 (Masa Depan):** Rich Text Editor untuk kolom deskripsi *Event*. Pembangkitan *E-Ticket* atau *E-Certificate* otomatis bagi peserta berstatus "Approved".

## 5. Matriks Keberhasilan
- Kecepatan pemuatan halaman (LCP) < 2.5s.
- Tidak ada *error* data korup saat format *form* diubah di tengah berjalannya pendaftaran.
- Pengalaman UI admin yang intuitif (mengurangi waktu manajemen data hingga 50%).
