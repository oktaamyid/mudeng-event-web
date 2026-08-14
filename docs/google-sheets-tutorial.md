# Tutorial: Panduan Setup Google Sheets & Drive API

Tutorial ini dibuat khusus untuk memandu Anda melakukan integrasi antara sistem Mudeng Event Web dengan ekosistem Google Workspace. Dengan mengikuti tutorial ini, sistem Anda nantinya mampu membuat dokumen _Spreadsheet_ secara otomatis langsung ke dalam Google Drive Anda.

> [!IMPORTANT]
> Ikuti panduan ini langkah demi langkah. Jangan ada yang terlewat, karena otentikasi Google Cloud sangat sensitif terhadap kesalahan pengetikan atau tahapan yang dilewati.

---

## Tahap 1: Persiapan Google Cloud Project

1. Buka situs **[Google Cloud Console](https://console.cloud.google.com/)** dan _login_ menggunakan akun Google Anda.
2. Di pojok kiri atas (sebelah logo Google Cloud), klik menu _dropdown_ proyek, lalu klik tombol **New Project**.
3. Beri nama proyek Anda (misalnya: `Mudeng Web Event`), lalu klik **Create**. Tunggu beberapa detik hingga proyek selesai dibuat.
4. Pastikan proyek yang Anda buat tadi sudah **aktif** (terpilih di pojok kiri atas).

## Tahap 2: Mengaktifkan API yang Dibutuhkan

Aplikasi kita membutuhkan dua izin (_API_): Satu untuk membaca/menulis tabel (_Sheets API_), dan satu lagi untuk membuat/memindahkan file ke folder Anda (_Drive API_).

1. Di bilah pencarian atas Google Cloud, ketik **"Google Sheets API"**.
2. Klik hasil pencariannya, lalu klik tombol **Enable** (Aktifkan).
3. Setelah selesai loading, kembali ke bilah pencarian atas, ketik **"Google Drive API"**.
4. Klik hasil pencariannya, lalu klik tombol **Enable** (Aktifkan).

## Tahap 3: Membuat Akun Robot (Service Account)

Sistem _website_ kita butuh "akun" tersendiri agar bisa berkomunikasi dengan Google. Kita menyebutnya _Service Account_.

1. Di menu sebelah kiri, klik lambang tiga garis (Hamburger Menu) > pilih **APIs & Services** > **Credentials**.
2. Di halaman Credentials, klik tombol **+ CREATE CREDENTIALS** di bagian atas, lalu pilih **Service Account**.
3. **Step 1 (Service account details):**
    - _Service account name_: Isi dengan `mudeng-sheets`
    - _Service account ID_: Biarkan otomatis terisi.
    - Klik **Create and Continue**.
4. **Step 2 (Grant this service account access):**
    - Pada kolom _Select a role_, cari dan pilih **Editor**.
    - Klik **Continue**.
5. **Step 3:** Lewati saja, langsung klik **Done**.

## Tahap 4: Mengambil Kunci Rahasia (JSON Key)

1. Anda akan kembali ke halaman _Credentials_. Di bagian bawah (area _Service Accounts_), Anda akan melihat akun robot yang baru dibuat (biasanya emailnya berakhiran `...gserviceaccount.com`).
2. **Copy (Salin)** alamat email robot tersebut. Kita akan membutuhkannya sebentar lagi.
3. Klik _email_ tersebut untuk masuk ke pengaturannya.
4. Pindah ke _tab_ **KEYS** di bagian atas.
5. Klik **Add Key** > **Create new key**.
6. Pilih format **JSON**, lalu klik **Create**.
7. File `.json` akan otomatis terunduh ke komputer Anda. Simpan file ini baik-baik.

## Tahap 5: Menyiapkan Folder di Google Drive Anda

Langkah ini penting agar file _Spreadsheet_ yang dibuat oleh robot bisa langsung muncul di Drive pribadi Anda.

1. Buka **[Google Drive](https://drive.google.com/)** pribadi Anda.
2. Buat folder baru, beri nama (misalnya: `Data Pendaftar Mudeng`).
3. Klik kanan pada folder tersebut, pilih **Share (Bagikan)**.
4. Di kolom email, **Paste (Tempelkan)** _email Service Account_ yang Anda _copy_ pada Tahap 4, langkah 2.
5. Pastikan hak aksesnya adalah **Editor**. Hilangkan centang "Notify people", lalu klik **Share**.
6. Sekarang buka masuk ke dalam folder tersebut. Perhatikan URL (Alamat Web) di browser Anda.
   Contoh URL: `https://drive.google.com/drive/folders/1aBcD2eFgH3iJ4kLmN5oP6qRsT7uV8wXx`
7. **Copy** kode acak yang berada di paling belakang URL tersebut (`1aBcD2eFgH3iJ...`). Itu adalah **Folder ID** Anda.

---

## Tahap 6: Menyambungkan Semuanya ke Aplikasi

Buka _file_ kunci `.json` yang terunduh di Tahap 4 menggunakan Notepad atau VS Code.
Lalu, buka _file_ `.env` di _project website_ Anda, dan tambahkan pengaturan berikut:

```env
# ---------------------------------------------
# GOOGLE SHEETS & DRIVE API CONFIGURATION
# ---------------------------------------------

# Ambil dari file JSON (client_email)
GOOGLE_CLIENT_EMAIL="mudeng-sheets@nama-project-anda.iam.gserviceaccount.com"

# Ambil dari file JSON (private_key).
# PENTING: Harus utuh termasuk tulisan "-----BEGIN PRIVATE KEY-----" sampai ujungnya.
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgk...\n...q8=\n-----END PRIVATE KEY-----\n"

# Ambil dari URL Google Drive Anda (Tahap 5)
GOOGLE_DRIVE_FOLDER_ID="1aBcD2eFgH3iJ4kLmN5oP6qRsT7uV8wXx"
```

> [!WARNING]
> Sangat penting: Pastikan nilai `GOOGLE_PRIVATE_KEY` diapit oleh tanda kutip ganda `""` agar karakter `\n` di dalamnya bisa terbaca dengan benar oleh sistem.

---

### Selesai! 🎉

Jika Anda sudah menyelesaikan 6 tahap di atas dan variabel di `.env` sudah terisi, infrastruktur Google Anda sudah 100% siap!
Anda tinggal mengabari saya (AI Assistant), dan saya akan langsung membuatkan kode _Node.js_ (_backend_) untuk melakukan integrasinya.
