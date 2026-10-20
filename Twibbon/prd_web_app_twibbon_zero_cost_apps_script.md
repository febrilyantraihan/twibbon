# PRODUCT REQUIREMENTS DOCUMENT

## 1. Informasi Produk

- **Nama Produk:** FrameKu Serverless (Zero-Cost Twibbon Engine)
- **Versi:** 1.0.0 (MVP Zero-Cost Edition)
- **Status:** Ready for Development
- **Platform:** Web Responsive (Mobile-First & Desktop)
- **Target Pengguna:** Kreator Kampanye (Komunitas, Sekolah, Pesantren, Organisasi Sosial) & Pendukung Umum (Supporters)
- **Developer/Studio:** FTH Studio
- **Biaya Operasional (Infra/SaaS):** Rp 0,- (Memanfaatkan Google Workspace Free Tier & GitHub Pages)

---

## 2. Ringkasan Produk

FrameKu Serverless adalah platform kampanye visual berbasis web yang memungkinkan pembuat kampanye mengunggah bingkai foto digital transparan (twibbon), membagikan tautan kampanye, dan membiarkan para pendukung memasang foto profil mereka ke dalam bingkai tersebut secara mandiri.

Seluruh ekosistem dirancang dengan arsitektur tanpa biaya berlangganan (*zero infrastructure cost*):
1. **Frontend Hosting:** GitHub Pages / Cloudflare Pages (Free Tier).
2. **Backend API:** Google Apps Script (Web App Endpoint `doGet` & `doPost`).
3. **Database:** Google Sheets (sebagai penyimpanan relasional sederhana via Apps Script).
4. **Asset Storage:** Google Drive (penyimpanan file PNG template bingkai dengan *direct image link*).
5. **Image Processing:** 100% Client-Side HTML5 Canvas (perangkat pengguna), sehingga tidak membebani kuota eksekusi Google Apps Script dan menjamin privasi pengguna.

---

## 3. Latar Belakang

Banyak komunitas nirlaba, panitia wisuda, sekolah, dan organisasi pemuda membutuhkan media promosi twibbon untuk acara mereka. Namun, mereka terbentur oleh:
1. Platform komersial yang dipenuhi iklan banner yang mengganggu kenyamanan audiens.
2. Keharusan membayar biaya langganan bulanan jika ingin fitur tanpa iklan dan tautan kustom.
3. Ketiadaan anggaran untuk menyewa server VPS, database cloud, atau storage komersial (S3).

Dengan memanfaatkan kuota gratis Google Suite/Gmail yang sudah dimiliki oleh sebagian besar admin organisasi, FrameKu Serverless menghadirkan solusi fungsional berkualitas tinggi dengan pengeluaran finansial Rp 0,-.

---

## 4. Problem Statement

1. **Kendala Biaya Server:** Membangun aplikasi kampanye foto konvensional membutuhkan database dan komputasi gambar yang mahal saat terjadi lonjakan trafik viral.
2. **Keterbatasan Kuota Layanan Gratis:** Layanan gratis seperti Google Apps Script memiliki limit eksekusi (6 menit per eksekusi, kuota harian transfer), sehingga manipulasi gambar berat **tidak boleh** dilakukan di backend Google Apps Script.
3. **Kemudahan Akses Non-Teknis:** Admin komunitas butuh cara praktis mengelola kampanye tanpa perlu melakukan setup database cloud yang kompleks.

---

## 5. Product Vision

Menghadirkan solusi web app kampanye bingkai foto yang mandiri, berkecepatan tinggi, bebas iklan komersial, dan 100% gratis selamanya untuk organisasi, sekolah, dan komunitas independen.

---

## 6. Product Goals

### Primary Goals
- Mengoperasikan sistem backend dan penyimpanan data dengan total biaya server Rp 0,- menggunakan kombinasi Google Apps Script, Google Sheets, dan Google Drive.
- Menjamin pemrosesan foto 100% berjalan di peramban supporter melalui HTML5 Canvas tanpa mengirim foto supporter ke Google Drive (menghemat penyimpanan 15 GB Drive milik admin).
- Memastikan supporter dapat memposisikan foto dan mengunduh hasil beresolusi tinggi (1080x1080 px) dalam waktu kurang dari 3 detik tanpa login.

### Secondary Goals
- Mempermudah admin mengelola, mengecek data, dan memantau jumlah unduhan langsung dari antarmuka Google Sheets tanpa perlu membuka dashboard aplikasi jika tidak sempat.
- Mengimplementasikan sistem autentikasi sederhana berbasis Password Hash / Secret Key untuk kreator tanpa memerlukan layanan OAuth berbayar.

---

## 7. Target Users

| Role | Deskripsi | Kebutuhan Utama |
|---|---|---|
| **Campaign Creator (Admin)** | Pengelola organisasi, panitia acara, admin media sosial pesantren/sekolah. | Membuat kampanye baru, mengunggah template PNG ke Google Drive, mendapatkan tautan unik, dan melihat rekap jumlah unduhan. |
| **Supporter (Publik)** | Peserta acara, wali santri, siswa, alumni, masyarakat umum. | Membuka link di HP, memilih foto dari galeri/kamera, mengatur ukuran dan posisi foto, lalu mengunduh hasil tanpa registrasi. |

---

## 8. Scope

### In Scope
- Static Frontend responsif (HTML5, Tailwind CSS via CDN, Vanilla JavaScript / Alpine.js).
- Integrasi Google Apps Script (GAS) sebagai REST API (JSON response via `ContentService`).
- Penyimpanan database pada Google Sheets:
  - Sheet `Campaigns`: Menyimpan ID, slug, judul, URL frame Google Drive, status, dan counter.
  - Sheet `Admins`: Menyimpan email dan hash password kreator.
- Pengunggahan frame oleh kreator: File frame diubah menjadi Base64 di frontend, dikirim ke Apps Script, dan disimpan langsung ke Google Drive folder publik yang ditentukan.
- Canvas Editor Interaktif (Client-Side):
  - Upload foto pendukung (JPG/PNG/WEBP).
  - Pan / Geser posisi foto.
  - Pinch-to-zoom (touch) & Slider zoom.
  - Rotasi 90° searah jarum jam.
  - Flip horizontal (cermin).
- Render & Download: Ekspor komposit 1080x1080 px format JPEG kualitas 90%.
- Counter Tracking: Penambahan angka unduhan (*downloads count*) secara asinkronus ke Google Sheets.

### Out of Scope
- Registrasi publik mandiri (karena kuota Google Apps Script terbatas, admin dibuat secara manual di sheet `Admins` atau dibatasi maksimal 3 admin).
- Pengiriman email otomatis konfirmasi (menghindari konsumsi kuota 100 email/hari Google Apps Script).
- Multi-format rasio (MVP dibatasi rasio 1:1 persegi).
- Pemrosesan gambar di backend Google Apps Script.

---

## 9. User Journey

### Journey 1: Kreator Kampanye (Admin)
1. Kreator membuka halaman `/admin.html`.
2. Kreator login menggunakan email dan kata sandi yang telah terdaftar di sheet `Admins`.
3. Kreator memilih menu "Buat Kampanye Baru".
4. Kreator memasukkan judul, slug tautan (`contoh: milad-2026`), deskripsi singkat, dan memilih file PNG frame transparan (1080x1080 px).
5. Sistem mengonversi file ke Base64, mengirimkannya ke Google Apps Script.
6. Google Apps Script menyimpan file ke Google Drive, mengatur izin akses menjadi publik, dan mencatat URL file serta metadata ke Google Sheets.
7. Kreator menerima tautan kampanye (`https://nama-web.github.io/?c=milad-2026`) dan menyalinnya untuk disebarkan.

### Journey 2: Supporter (Publik)
1. Supporter mengklik tautan kampanye dari WhatsApp.
2. Halaman memuat metadata kampanye dan mengambil gambar bingkai dari Google Drive via direct link.
3. Supporter menekan tombol "Pilih Foto".
4. Supporter mengunggah foto dari galeri HP; foto langsung tampil di bawah bingkai transparan.
5. Supporter menggeser foto dan memperbesar/memperkecil agar pas dengan bingkai.
6. Supporter menekan tombol "Unduh Foto".
7. Browser memproses canvas lokal, mengunduh file JPEG ke HP supporter, dan mengirim request fetch ke Google Apps Script untuk menambah angka unduhan di Google Sheets.

---

## 10. User Flow

### 10.1 User Flow: Supporter (Pemasangan & Unduh)
```text
Buka URL: ?c=[slug]
        │
        ▼
Ambil Data Kampanye dari Google Apps Script (doGet)
        │
        ▼
Tampilkan Judul, Deskripsi & Frame Transparan di Canvas
        │
        ▼
Supporter Memilih Foto Lokal (File Reader API)
        │
        ▼
Render Foto pada Canvas Layer Bawah
        │
        ▼
Kontrol Gestur: Pan (Geser) / Pinch (Cubit Zoom) / Rotasi
        │
        ▼
Klik Tombol "Unduh Foto"
        │
        ├─────────────────────────────────────────────────┐
        ▼                                                 ▼
Ekspor Canvas ke JPEG (toBlob)                  Kirim Ping POST ke Apps Script
        │                                                 │
        ▼                                                 ▼
Trigger Download Browser: twibbon-[slug].jpg    Increment Counter di Google Sheet
```

### 10.2 User Flow: Kreator (Upload Kampanye Baru)
```text
Buka /admin.html
        │
        ▼
Input Email & Password ──► Verifikasi via Apps Script
        │ Lolos
        ▼
Dashboard Admin
        │
        ▼
Input Judul, Slug, & Upload File PNG Transparan
        │
        ▼
Validasi Client-Side: Wajib PNG & Terdapat Transparansi
        │ Lolos
        ▼
Konversi File PNG ke Base64
        │
        ▼
Kirim POST Request ke Google Apps Script (doPost)
        │
        ├─► Simpan File ke Google Drive (DriveApp)
        ├─► Set File Permission: Anyone with link can view
        └─► Append Row Baru ke Sheet "Campaigns"
        │
        ▼
Response JSON: Sukses + URL Kampanye Publik
```

---

## 11. Information Architecture

```text
├── Halaman Publik Supporter (index.html)
│   ├── Routing Berbasis Query Parameter (?c=slug-kampanye)
│   ├── Header Kampanye (Judul & Nama Penyelenggara)
│   ├── Canvas Area (Interactive Viewport)
│   ├── Controls Floating Toolbar (Zoom Slider, Putar, Cermin, Reset, Ganti Foto)
│   ├── Action Section (Tombol "Unduh Foto", Tombol "Salin Link")
│   └── Section Info (Deskripsi Kampanye & Total Unduhan)
│
├── Halaman Admin / Kreator (admin.html)
│   ├── Form Login (Email & Password)
│   └── Panel Dashboard
│       ├── Ringkasan Statistik (Total Kampanye, Total Unduhan)
│       ├── Form Tambah Kampanye Baru
│       │   ├── Input Judul & Slug
│       │   ├── Input Deskripsi
│       │   ├── File Uploader PNG + Preview Deteksi Transparansi
│       │   └── Tombol "Publish Kampanye"
│       └── Tabel Daftar Kampanye
│           ├── Kolom: Slug, Judul, Total Unduhan, Status, Aksi
│           └── Aksi: Buka Link, Toggle Aktif/Nonaktif, Hapus
│
└── Google Workspace Storage (Backend)
    ├── Google Sheets Database ("FrameKu_DB")
    │   ├── Sheet: Campaigns
    │   └── Sheet: Admins
    └── Google Drive Folder ("FrameKu_Frames")
        └── [file_id].png (File template frame publik)
```

---

## 12. Functional Requirements

### 12.1 Client-Side Routing via Query Parameter
- **Tujuan:** Menghindari kebutuhan server-side routing (Apache/Nginx/Node) agar aplikasi dapat berjalan di static hosting gratis (GitHub Pages).
- **Aktor:** Supporter.
- **Input:** URL browser dengan parameter `?c=[slug]` (contoh: `https://user.github.io/frameku/?c=harlah-45`).
- **Process:**
  1. JavaScript membaca parameter `const slug = new URLSearchParams(window.location.search).get('c')`.
  2. Frontend melakukan `fetch()` ke Web App URL Google Apps Script: `GET [GAS_URL]?action=getCampaign&slug=[slug]`.
  3. Mengambil data JSON dan merender aset gambar frame.
- **Output:** Tampilan kampanye spesifik.
- **Business Rules:** Jika parameter `?c=` kosong, tampilkan halaman beranda default atau daftar kampanye aktif.
- **Validation:** Slug hanya boleh berupa karakter alfanumerik dan tanda hubung (`-`).
- **Error Handling:** Jika slug tidak ditemukan pada Google Sheet, tampilkan pesan: *"Kampanye tidak ditemukan atau telah dinonaktifkan."*

### 12.2 Autentikasi Admin Sederhana
- **Tujuan:** Mengamankan halaman admin tanpa sistem OAuth berbayar.
- **Aktor:** Kreator / Admin.
- **Input:** Email dan Password.
- **Process:**
  1. Frontend mengirim request `POST` ke Google Apps Script berisi email dan password.
  2. Apps Script memeriksa sheet `Admins`.
  3. Membandingkan password hash (menggunakan SHA-256 bawaan `Utilities.computeDigest` di Apps Script).
  4. Mengembalikan sesi token sementara (token string acak + timestamp kadaluarsa) yang disimpan di `sessionStorage` browser.
- **Output:** Akses ke dashboard admin.
- **Business Rules:** Sesi berlaku selama 4 jam di browser.
- **Validation:** Email dan password wajib diisi.
- **Error Handling:** Pesan error: `"Email atau password salah."` jika tidak cocok.

### 12.3 Pengunggahan Template Frame ke Google Drive
- **Tujuan:** Menyimpan gambar template transparan tanpa biaya storage komersial.
- **Aktor:** Kreator / Admin.
- **Input:** File PNG, judul kampanye, slug, deskripsi.
- **Process:**
  1. Frontend memvalidasi file PNG di sisi browser (cek channel Alpha transparan).
  2. File dibaca sebagai Data URL (Base64).
  3. Frontend mengirim payload JSON via POST ke Google Apps Script.
  4. Apps Script mendekode Base64 menjadi Blob menggunakan `Utilities.base64Decode`.
  5. File disimpan ke Folder Google Drive yang ditentukan (`DriveApp.getFolderById`).
  6. File diset izin publik: `file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW)`.
  7. Ambil URL file direct view (`https://lh3.googleusercontent.com/d/[FILE_ID]` atau direct download format).
  8. Tambahkan baris baru di sheet `Campaigns`.
- **Output:** Entri kampanye baru tersimpan di Google Sheet dan file tersimpan di Google Drive.
- **Business Rules:** Ukuran file template maksimal 2.5 MB (untuk mencegah limit payload request Google Apps Script).
- **Validation:** File wajib berekstensi `.png`.
- **Error Handling:** Jika kuota Google Drive penuh atau request timeout, tampilkan notifikasi: `"Gagal menyimpan file ke Google Drive. Coba perkecil ukuran file PNG."`

### 12.4 Canvas Editor Interaktif (Client-Side)
- **Tujuan:** Menempatkan foto supporter di balik bingkai secara presisi dan instan.
- **Aktor:** Supporter.
- **Input:** File foto pribadi dari galeri perangkat.
- **Process:**
  1. File dibaca secara lokal menggunakan `FileReader.readAsDataURL()`.
  2. Foto di-load sebagai objek Image pada HTML5 Canvas layer 0.
  3. Template frame di-load pada layer 1 (posisi lock di koordinat 0,0).
  4. Event listener sentuh (Touch Events & Pointer Events) mengatur transformasi foto:
     - Drag 1 jari: `offsetX += deltaX`, `offsetY += deltaY`.
     - Pinch 2 jari / Slider: Mengubah skala `scaleFactor`.
     - Tombol Rotasi: `rotation = (rotation + 90) % 360`.
     - Tombol Cermin: `flipHorizontal = !flipHorizontal`.
- **Output:** Preview gambar komposit interaktif 60 FPS pada viewport ponsel.
- **Business Rules:** Foto supporter sama sekali **tidak dikirimkan** ke server Google untuk menjaga privasi dan menghemat kuota Google Drive.
- **Validation:** Format file foto supporter harus berupa gambar (`image/*`).
- **Error Handling:** Jika format gambar tidak didukung browser, tampilkan: `"Format foto tidak valid. Gunakan format JPG atau PNG."`

### 12.5 Ekspor Gambar & Tracking Counter (Background Fetch)
- **Tujuan:** Mengunduh hasil pengeditan dan memperbarui statistik unduhan.
- **Aktor:** Supporter.
- **Input:** Klik tombol "Unduh Foto".
- **Process:**
  1. Buat elemen Offscreen Canvas tersembunyi berukuran 1080x1080 piksel.
  2. Gambar foto supporter dengan transformasi proporsional yang telah disesuaikan.
  3. Gambar template frame di atas foto supporter pada resolusi 1080x1080 piksel.
  4. Eksekusi `canvas.toBlob((blob) => { ... }, 'image/jpeg', 0.90)`.
  5. Buat tautan virtual download: `<a href="blob_url" download="frameku-[slug].jpg">` dan picu klik otomatis.
  6. Kirim request asynchronous ke Apps Script: `POST [GAS_URL]?action=incrementDownload&slug=[slug]`.
  7. Apps Script mencari slug di sheet `Campaigns` dan menambah nilai kolom `downloads_count` sebanyak +1.
- **Output:** File JPEG tersimpan di galeri pengguna; angka unduhan di database bertambah.
- **Business Rules:** Kegagalan koneksi saat increment counter tidak boleh membatalkan proses pengunduhan gambar pengguna.
- **Validation:** Tombol unduh tidak dapat ditekan jika foto belum dipilih.
- **Error Handling:** Jika memori canvas crash di HP berspesifikasi sangat rendah, lakukan fallback ke resolusi 800x800 piksel.

---

## 13. Role & Permission

| Modul / Fitur | Supporter (Publik) | Kreator / Admin |
|---|:---:|:---:|
| Akses Landing Page / Daftar Kampanye | ✓ | ✓ |
| Mengunggah Foto Pribadi ke Canvas Lokal | ✓ | ✓ |
| Mengunduh Hasil Komposit Twibbon | ✓ | ✓ |
| Login ke `/admin.html` | - | ✓ |
| Membuat Kampanye Baru (Upload Frame) | - | ✓ |
| Mengubah Status Kampanye (Active / Inactive) | - | ✓ |
| Melihat Rekap Statistik di Dashboard | - | ✓ |
| Mengedit Langsung Spreadsheet Database | - | ✓ (via Google Sheets) |

---

## 14. Business Rules

1. **Zero Server Photo Processing:** Semua proses pengolahan foto supporter terjadi 100% di browser pengguna (Client-Side). Foto pengguna dilarang dikirim ke Google Apps Script atau Google Drive.
2. **Keterbatasan Kuota Google Apps Script:** Ukuran file frame yang diunggah kreator dibatasi maksimal 2.5 MB agar tidak menabrak batas payload POST Google Apps Script (sekitar 5-10 MB limit).
3. **Penyimpanan Direct Link:** Gambar frame yang disimpan di Google Drive harus memiliki URL publik langsung (*direct link*) yang kompatibel dengan CORS canvas, menggunakan URL format: `https://lh3.googleusercontent.com/d/{FILE_ID}`.
4. **Keunikan Slug Kampanye:** Dua kampanye tidak boleh memiliki slug yang sama. Pengecekan keunikan dilakukan terhadap kolom `slug` pada sheet `Campaigns`.
5. **Aksesibilitas Tanpa Biaya:** Aplikasi tidak mengintegrasikan layanan berbayar pihak ketiga mana pun.

---

## 15. Data Model

### Entity: Admins
| Field | Type | Required | Description |
|---|---|---|---|
| id | String (UUID) | Yes | Identifier unik admin |
| email | String | Yes | Alamat email admin (login) |
| password_hash | String | Yes | SHA-256 hash dari password |
| name | String | Yes | Nama admin/organisasi |
| created_at | String (ISO) | Yes | Tanggal pendaftaran |

### Entity: Campaigns
| Field | Type | Required | Description |
|---|---|---|---|
| id | String (UUID) | Yes | Identifier unik kampanye |
| slug | String | Yes | Tautan unik URL (misal: `harlah-50`) |
| title | String | Yes | Judul kampanye |
| description | String | No | Deskripsi atau teks ajakan |
| drive_file_id | String | Yes | ID berkas pada Google Drive |
| frame_url | String | Yes | URL langsung aset PNG |
| status | String | Yes | `ACTIVE` atau `INACTIVE` |
| downloads_count | Integer | Yes | Jumlah total unduhan |
| created_at | String (ISO) | Yes | Tanggal pembuatan |

---

## 16. Database Structure (Google Sheets Schema)

Database menggunakan 1 file Google Spreadsheet bernama **`FrameKu_Database`** dengan 2 tab/sheet:

### Sheet 1: `Admins`
| Header Kolom (Baris 1) | Tipe Data | Contoh Nilai |
|---|---|---|
| `id` | Text | `adm-001` |
| `email` | Text | `panitia@gmail.com` |
| `password_hash` | Text | `8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918` |
| `name` | Text | `Panitia Milad 2026` |
| `created_at` | Text | `2026-10-04T10:00:00Z` |

### Sheet 2: `Campaigns`
| Header Kolom (Baris 1) | Tipe Data | Contoh Nilai |
|---|---|---|
| `id` | Text | `cmp-101` |
| `slug` | Text | `milad-pesantren-50` |
| `title` | Text | `Peringatan Milad Ke-50 Pesantren` |
| `description` | Text | `Pasang foto profilmu untuk memeriahkan milad emas!` |
| `drive_file_id` | Text | `1A2b3C4d5E6f7G8h9I0jKLM` |
| `frame_url` | Text | `https://lh3.googleusercontent.com/d/1A2b3C4d5E6f7G8h9I0jKLM` |
| `status` | Text | `ACTIVE` |
| `downloads_count` | Number | `342` |
| `created_at` | Text | `2026-10-04T10:15:00Z` |

---

## 17. UI/UX Requirements

- **Desain Mobile-First:** Fokus utama pada tampilan layar ponsel 360px – 430px (layar vertikal/portrait).
- **Struktur Antarmuka Supporter:**
  - Header ramping: Logo kecil dan judul kampanye.
  - Komponen Utama: Kotak Canvas persegi di bagian atas-tengah.
  - Placeholder: Sebelum foto dipilih, canvas menampilkan bingkai dengan watermark siluet avatar dan tombol mencolok *"Pilih Foto Saya"*.
  - Floating Controls (muncul setelah foto diunggah):
    - Slider horizontal untuk perbesaran (Zoom 1x hingga 3x).
    - Tombol ikon rotasi 90° (↺).
    - Tombol ikon cermin/flip (⇄).
    - Tombol ganti foto.
  - Tombol Utama di Bawah: Tombol berukuran besar berwarna kontras *"Unduh Twibbon"* (disabled jika belum ada foto).
  - Tombol Sekunder: *"Salin Link Kampanye"*.
- **Feedback & State:**
  - Loading Spinner saat mengambil data kampanye awal.
  - Animasi progress singkat saat proses penggabungan canvas dilakukan.
  - Toast message berwarna hijau saat tautan berhasil disalin ke clipboard.

---

## 18. Responsive Design

### Mobile (360px – 430px) — Prioritas Tertinggi
- Kanvas berukuran otomatis: `width: calc(100vw - 32px)`, `max-width: 380px`, rasio aspek 1:1.
- Tombol aksi memiliki tinggi minimal 48px agar nyaman ditekan ibu jari.
- Slider zoom memiliki thumb target sentuh minimal 32px.

### Desktop & Tablet (> 768px)
- Tata letak terpusat (*centered container*) dengan lebar maksimal 720px.
- Kanvas dibatasi maksimal 450x450 piksel agar tetap proporsional dan tidak memakan tinggi layar monitor.

---

## 19. Validation

| Field / Aksi | Aturan Validasi | Respon Sistem |
|---|---|---|
| **Slug Kampanye** | Wajib unik, panjang 3-50 karakter, regex: `^[a-z0-9-]+$` | Tampilkan: *"Slug hanya boleh huruf kecil, angka, dan tanda minus."* |
| **Upload Frame (Admin)** | Tipe berkas `image/png`, ukuran file <= 2.5 MB, rasio 1:1, memiliki saluran transparan | Tampilkan: *"File harus berformat PNG transparan rasio 1:1 di bawah 2.5 MB."* |
| **Upload Foto (Supporter)** | Format citra (`image/*`), ukuran file <= 15 MB | Tampilkan: *"Silakan pilih berkas foto yang valid."* |
| **Password Admin** | Minimal 6 karakter | Tampilkan: *"Password minimal 6 karakter."* |

---

## 20. Error Handling

- **CORS Redirect pada Apps Script:** Google Apps Script secara standar melakukan redirect HTTP 302 saat merespon request. Fetch API di frontend wajib menggunakan mode `cors` dan mengikuti redirect secara default.
- **Koneksi Internet Lambat saat Load Frame:** Tampilkan animasi shimmer skeleton pada area kanvas. Jika gagal termuat dalam 10 detik, tampilkan tombol *"Muat Ulang Bingkai"*.
- **Browser Memblokir Unduhan Otomatis (In-App Browser Instagram/TikTok):** Jika download otomatis gagal dipicu, sediakan tombol cadangan: *"Buka Gambar di Tab Baru"* atau instruksi *"Tekan dan tahan gambar untuk menyimpan ke galeri"*.
- **Kuota Eksekusi Harian Apps Script Tercapai:** Tampilkan fallback pesan informatif: *"Sistem sedang sibuk. Silakan coba kembali dalam beberapa saat."*

---

## 21. Loading & Empty States

- **Loading State:**
  - Canvas menampilkan animasi spinner di tengah kanvas bertuliskan *"Memuat bingkai..."*.
  - Tombol aksi utama menampilkan indikator loading saat memproses render.
- **Empty State (Halaman Tanpa Slug / Slug Salah):**
  - Tampilkan ilustrasi netral dengan teks: *"Kampanye tidak ditemukan. Periksa kembali tautan yang Anda terima."*
- **Empty State (Admin Dashboard):**
  - Jika belum ada kampanye di sheet: *"Belum ada kampanye yang dibuat. Klik 'Tambah Kampanye' untuk memulai."*

---

## 22. Notification

- **In-App Toast Notification:**
  - Sukses salin tautan: *"Tautan berhasil disalin ke papan klip!"* (durasi 2.5 detik).
  - Sukses simpan kampanye: *"Kampanye berhasil diterbitkan!"*.
  - Kesalahan validasi: Toast merah berisi deskripsi kesalahan.

---

## 23. Search, Filter & Sorting

*(Diimplementasikan di Dashboard Admin)*
- **Search:** Pencarian teks langsung di tabel admin berdasarkan judul atau slug.
- **Sorting:** Urutkan kampanye berdasarkan jumlah unduhan terbanyak atau tanggal terbaru secara client-side.

---

## 24. Reporting & Export

- **Rekap Otomatis di Google Sheets:** Karena database adalah Google Sheets, admin dapat langsung:
  - Membuka spreadsheet Google Drive secara mandiri.
  - Mengunduh rekap dalam format file `.xlsx` atau `.pdf` bawaan Google Sheets kapan saja tanpa perlu fitur export tambahan di aplikasi.

---

## 25. Security

1. **Client-Side Image Privacy:** Foto supporter tidak pernah dikirim ke jaringan/server. Proses crop dan rendering murni berjalan di RAM peramban supporter.
2. **Kredensial Google Terisolasi:** Script Google Apps Script di-deploy dengan opsi:
   - *Execute as:* **Me (Pemilik Akun Google)**
   - *Who has access:* **Anyone (Siapa saja, termasuk anonim)**
   Frontend tidak pernah menyimpan API Key sensitif Google; semua logika penulisan database dikontrol secara internal di dalam kode Apps Script.
3. **Penyimpanan Password Admin:** Password disimpan di Google Sheet dalam bentuk hash satu arah (SHA-256) menggunakan `Utilities.computeDigest`.
4. **Sanitasi Input:** Nilai judul dan deskripsi dibersihkan dari tag HTML sebelum ditulis ke Google Sheet untuk mencegah serangan XSS tersimpan (*Stored XSS*).

---

## 26. Audit Trail

Setiap baris di Google Sheets mencatat stempel waktu ISO (`created_at`) saat pembuatan kampanye. Riwayat revisi isi spreadsheet dapat dilihat secara alami melalui fitur bawaan **Google Sheets Version History**.

---

## 27. Edge Cases

1. **Supporter Mengunggah Foto Vertikal / Portrait yang Sangat Panjang:**
   - Sistem kanvas otomatis menyesuaikan ukuran awal dengan metode `Math.max(widthRatio, heightRatio)` sehingga tidak ada celah kosong di dalam lubang bingkai (*aspect fill*).
2. **Google Drive Link Mengalami Limit Bandwidth:**
   - URL Google Drive dialihkan melalui format thumbnail berkecepatan tinggi: `https://lh3.googleusercontent.com/d/{FILE_ID}=s1080` yang di-cache di infrastruktur Google CDN global.
3. **Supporter Membuka Web Tanpa Koneksi Internet Setelah Halaman Termuat:**
   - Karena kanvas berjalan di sisi lokal, proses pasang foto dan download hasil tetap berfungsi sempurna meskipun supporter kehilangan sinyal saat mengedit.

---

## 28. Acceptance Criteria

### Feature: Pemasangan Twibbon Supporter
- [ ] Pengguna dapat membuka halaman via tautan `?c=[slug]` dan melihat bingkai termuat.
- [ ] Pengguna dapat memilih foto dari memori ponsel atau kamera.
- [ ] Pengguna dapat menggeser posisi foto di dalam bingkai menggunakan sentuhan jari.
- [ ] Pengguna dapat memperbesar dan memperkecil foto menggunakan slider zoom atau sentuhan cubit.
- [ ] Pengguna dapat memutar foto sebesar 90 derajat searah jarum jam.
- [ ] Menekan tombol "Unduh Foto" menghasilkan berkas JPEG 1080x1080 piksel yang tersimpan di HP.
- [ ] Angka unduhan di Google Sheet bertambah +1 setelah unduhan berhasil.

### Feature: Manajemen Kampanye oleh Admin
- [ ] Admin dapat login dengan email dan password.
- [ ] Admin dapat mengunggah file template PNG dan memasukkan custom slug.
- [ ] File PNG otomatis tersimpan di folder Google Drive dan link tersimpan di Google Sheet.
- [ ] Admin dapat melihat total unduhan masing-masing kampanye di halaman admin.

---

## 29. Non-Functional Requirements

- **Zero Hosting Cost:** Arsitektur harus dapat beroperasi penuh pada paket gratis selamanya (GitHub Pages + Google Free Tier 15 GB).
- **Performa Responsif:** Bobot file HTML/CSS/JS frontend utama < 150 KB (di luar gambar bingkai).
- **Waktu Eksekusi Render Kanvas:** < 500 ms pada perangkat Android entry-level.
- **Kesesuaian Kuota Google Apps Script:**
  - Google Drive: Hingga 15 GB penyimpanan berkas gratis (cukup untuk menampung > 10.000 file template frame PNG).
  - Apps Script URL Fetch calls: Kuota harian 20.000 request/hari (sangat memadai untuk skala komunitas).

---

## 30. Technical Considerations

### 30.1 Arsitektur Sistem
```text
[ Browser Supporter / Admin ]
        │
        ├── (1) Load Static Web App (HTML/CSS/JS) ──► [ GitHub Pages (Free) ]
        │
        ├── (2) Manipulasi Canvas & Download ──────► [ Local Device RAM (0 Cost) ]
        │
        └── (3) API Call (doGet / doPost) ─────────► [ Google Apps Script ]
                                                            │
                                              ┌─────────────┴─────────────┐
                                              ▼                           ▼
                                      [ Google Sheets ]           [ Google Drive ]
                                      (Database Tabel)            (Storage PNG Frame)
```

### 30.2 Boilerplate Backend Google Apps Script (`Code.gs`)
Apps Script menangani endpoint CORS melalui `ContentService`:

```javascript
function doGet(e) {
  const action = e.parameter.action;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  if (action === "getCampaign") {
    const slug = e.parameter.slug;
    const sheet = ss.getSheetByName("Campaigns");
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === slug && data[i][6] === "ACTIVE") {
        const result = {
          id: data[i][0],
          slug: data[i][1],
          title: data[i][2],
          description: data[i][3],
          frameUrl: data[i][5],
          downloads: data[i][7]
        };
        return createResponse({ status: "success", data: result });
      }
    }
    return createResponse({ status: "error", message: "Campaign not found" });
  }
  return createResponse({ status: "error", message: "Invalid action" });
}

function doPost(e) {
  const postData = JSON.parse(e.postData.contents);
  const action = postData.action;
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  if (action === "incrementDownload") {
    const slug = postData.slug;
    const sheet = ss.getSheetByName("Campaigns");
    const data = sheet.getDataRange().getValues();
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === slug) {
        const currentCount = Number(data[i][7]) || 0;
        sheet.getRange(i + 1, 8).setValue(currentCount + 1);
        return createResponse({ status: "success", newCount: currentCount + 1 });
      }
    }
  }

  if (action === "createCampaign") {
    // 1. Verifikasi token/kredensial admin
    // 2. Decode base64 frame & simpan ke Google Drive
    const folderId = "FOLDER_ID_GOOGLE_DRIVE_DISINI";
    const folder = DriveApp.getFolderById(folderId);
    const contentType = "image/png";
    const bytes = Utilities.base64Decode(postData.imageBase64);
    const blob = Utilities.newBlob(bytes, contentType, postData.slug + ".png");
    const file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    const fileId = file.getId();
    const frameUrl = "https://lh3.googleusercontent.com/d/" + fileId;
    
    // 3. Simpan row ke Google Sheet
    const sheet = ss.getSheetByName("Campaigns");
    const newId = "cmp-" + new Date().getTime();
    sheet.appendRow([newId, postData.slug, postData.title, postData.description, fileId, frameUrl, "ACTIVE", 0, new Date().toISOString()]);
    
    return createResponse({ status: "success", slug: postData.slug, frameUrl: frameUrl });
  }

  return createResponse({ status: "error", message: "Action not recognized" });
}

function createResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

## 31. Dependencies

- **Hosting Frontend:** GitHub Pages / Cloudflare Pages / Vercel Hobby (Gratis selamanya).
- **CSS Framework:** Tailwind CSS via CDN (`https://cdn.tailwindcss.com`).
- **Backend Runtime:** Google Apps Script Runtime Engine V8.
- **Database Engine:** Google Sheets API Service via SpreadsheetApp.
- **Media Storage:** Google Drive Folder via DriveApp.

---

## 32. Assumptions

1. Pemilik web memiliki setidaknya satu akun Google (Gmail biasa) dengan sisa penyimpanan Google Drive yang cukup untuk menyimpan file template PNG (1 file = ~1 MB).
2. Supporter menggunakan peramban modern (Chrome, Safari, Firefox, Edge) yang telah mendukung HTML5 Canvas dan Fetch API.
3. Kreator mengunggah bingkai PNG yang sudah dilubangi secara transparan dari aplikasi desain grafis (Canva/Photoshop/Figma).

---

## 33. Open Questions

1. Apakah folder Google Drive penyimpanan bingkai perlu dibedakan per bulan atau disatukan dalam satu folder utama? *(Asumsi saat ini: Cukup 1 folder Google Drive khusus)*.
2. Apakah admin ingin tautan kampanye dapat diakses dengan domain kustom (contoh: `twibbon.namapesantren.com`)? *(Dapat dihubungkan gratis via DNS Cloudflare/GitHub Pages jika memiliki domain sendiri)*.

---

## 34. Implementation Priority

### P0 — Critical (MVP Core)
- Google Apps Script: Endpoint `getCampaign` dan `incrementDownload`.
- Google Sheets: Skema tabel `Campaigns`.
- Frontend Supporter: Canvas editor interaktif (load bingkai dari Drive, pasang foto lokal, pan, pinch zoom, rotasi, dan ekspor 1080x1080 px).
- Direct download file hasil ke perangkat pengguna.

### P1 — Important
- Google Apps Script: Endpoint `createCampaign` untuk upload file PNG ke Google Drive via Base64.
- Halaman `admin.html` sederhana untuk mengunggah kampanye baru dan melihat statistik unduhan.
- Tombol salin tautan kampanye dengan toast notifikasi.

### P2 — Optional
- Fitur QR Code generator otomatis untuk tautan kampanye di halaman admin.
- Mode gelap (*Dark Mode*) pada antarmuka supporter.

---

## 35. MVP Definition

Produk MVP dinyatakan selesai dan siap digunakan jika:
1. Admin dapat mengunggah file bingkai PNG ke Google Drive melalui antarmuka web dan mendapatkan tautan kampanye unik.
2. Supporter dapat membuka tautan tersebut di smartphone, memasukkan foto mereka, menyesuaikan posisi, dan mengunduh twibbon berkualitas jernih tanpa membayar dan tanpa login.
3. Total biaya hosting, komputasi, dan penyimpanan adalah **Rp 0,- / $0**.

---

## 36. Future Development

- Ekstensi fitur teks otomatis (misal: menambahkan nama pengguna otomatis di atas sertifikat/frame secara client-side).
- Dukungan rasio foto vertikal 9:16 untuk kebutuhan Story Instagram/TikTok.
- Pembuatan filter warna foto otomatis (Greyscale, Vintage, Vibrant) langsung di canvas.