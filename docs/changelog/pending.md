# Pending Changelog

Gunakan file ini untuk mencatat setiap perubahan yang dilakukan sebelum dikonsolidasi menjadi rilis besar.

Format entri:
`[HH:MM] - [FILE] - [CHANGE] - [WHY]`

---

- [22:08] - `src/app/admin/events/[slug]/registrants/page.tsx` - Menambahkan tombol `ExportButton` di antarmuka Admin - Untuk mengizinkan pengguna mengunduh data pendaftar dalam format CSV.
- [22:08] - `src/lib/actions/users.ts` - Membuat Server Actions (`getUsers`, `updateUserRole`, `deleteUser`) - Untuk memfasilitasi administrasi pengguna aplikasi.
- [22:08] - `src/app/admin/users/page.tsx` - Membuat halaman tabel Users Administration - Untuk mengelola daftar admin dan user di dashboard.
- [22:09] - `src/components/AppSidebar.tsx` - Menambahkan link menu "Users" - Agar halaman administrasi pengguna dapat diakses.
- [22:15] - `src/app/admin/events/[slug]/registrants/page.tsx` - Merombak desain Dialog pendaftar dan menggunakan *inline style* untuk tombol Approve - Untuk menghindari konflik *class* Tailwind dan membuat tampilan lebih profesional.
- [22:20] - `src/app/admin/events/[slug]/registrants/page.tsx` - Menambahkan logika pembersihan (sanitasi) nilai *Array* dari *checkbox* - Untuk memperbaiki data *draft* korup akibat perubahan tipe *field* dari teks ke *checkbox*.
- [22:42] - `docs/prd.md`, `docs/architect.md`, `docs/tech-spec.md` - Membuat dokumentasi sentral sistem Mudeng Web Event - Berdasarkan permintaan *user* untuk referensi *AI Assistant* ke depannya, mematuhi Global Rules.
