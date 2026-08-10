# 📋 Product Requirements Document (PRD)
## Undangan Pernikahan Online — "Love Letter Digital"

---

> **Versi:** 1.0.0
> **Tanggal Dibuat:** 30 Juni 2026
> **Dibuat untuk:** Proyek Undangan Pernikahan Teman
> **Status:** Draft Final

---

## 1. RINGKASAN EKSEKUTIF

### 1.1 Gambaran Produk
**"Love Letter Digital"** adalah sebuah website undangan pernikahan online berbasis HTML/CSS/JavaScript statis yang dapat di-host secara gratis (GitHub Pages, Vercel, Netlify, dll). Website ini dirancang dengan nuansa **Luxury & Glamour** bertema **Dusty Rose & Gold**, memberikan kesan elegan, mewah, dan romantis bagi setiap tamu undangan yang membukanya.

### 1.2 Tujuan Produk
- Memberikan pengalaman undangan digital yang berkesan dan berbeda dari undangan biasa
- Memudahkan pengantin menerima konfirmasi kehadiran tamu secara otomatis
- Menyediakan media penerimaan hadiah digital yang elegan dan mudah digunakan
- Mengurangi biaya cetak undangan fisik sekaligus menjangkau tamu yang lebih luas

### 1.3 Target Pengguna
| Kelompok | Deskripsi |
|---|---|
| **Tamu Undangan** | Keluarga, sahabat, rekan kerja yang menerima link undangan |
| **Pengantin / Admin** | Pemilik undangan yang mengelola konten dan data RSVP |

---

## 2. IDENTITAS VISUAL & DESAIN

### 2.1 Tema & Palet Warna

| Peran Warna | Kode Hex | Keterangan |
|---|---|---|
| **Primary** | `#C9A96E` | Gold metalik utama |
| **Secondary** | `#D4A5A5` | Dusty Rose lembut |
| **Accent** | `#F5E6D3` | Cream / Champagne |
| **Dark** | `#2C1810` | Coklat tua / teks utama |
| **Background** | `#FDF6F0` | Off-white hangat |
| **Shimmer** | `#FFD700` | Gold shimmer untuk efek glitter |

### 2.2 Gaya Visual
- **Aesthetic:** Luxury Glamour — kesan mahal, mewah, berkelas
- **Motif dekoratif:** Ornamen gold foil (garis tipis emas, frame sudut, divider ukiran)
- **Partikel efek:** Hujan kelopak bunga mawar + partikel gold glitter saat halaman dibuka
- **Tipografi:**
  - **Heading / Nama Pengantin:** Font serif elegan (contoh: `Cormorant Garamond`, `Playfair Display`)
  - **Body / Isi teks:** Font sans-serif bersih (contoh: `Lato`, `Montserrat`)
  - **Aksen / Quote:** Font script mewah (contoh: `Great Vibes`, `Alex Brush`)

### 2.3 Ornamen & Dekorasi
- Watermark floral transparan di latar belakang beberapa section
- Gold divider line dengan ornamen tengah (❧ atau ✦) antar section
- Frame sudut gold di elemen-elemen penting (hero section, nama pengantin)
- Subtle texture kertas perkamen di background

---

## 3. ARSITEKTUR & STRUKTUR HALAMAN

### 3.1 Alur Pengguna (User Flow)

```
Tamu klik link undangan
        ↓
[LAYAR SAMPUL] — Animasi amplop/surat tertutup
        ↓
Tamu klik tombol "Buka Undangan"
        ↓
Efek confetti gold + kelopak bunga meledak
        ↓
[KONTEN UTAMA] — Single page scroll
        ↓
Section 1: Hero (Nama Pengantin + Tanggal)
Section 2: Bismillah / Pembuka
Section 3: Detail Acara
Section 4: Countdown Timer
Section 5: Lokasi & Peta
Section 6: Galeri / Foto Pengantin
Section 7: Amplop Digital
Section 8: RSVP (Konfirmasi Kehadiran)
Section 9: Guestbook (Ucapan & Doa)
Section 10: Penutup & Terima Kasih
```

### 3.2 Struktur File Proyek

```
wedding-invitation/
├── index.html                  ← Halaman utama
├── style.css                   ← Semua styling
├── script.js                   ← Semua JavaScript & animasi
├── config.js                   ← ⭐ FILE KONFIGURASI UTAMA (mudah diedit)
├── assets/
│   ├── audio/
│   │   └── backsound.mp3       ← File lagu (ganti sesuai keinginan)
│   ├── images/
│   │   ├── couple-1.jpg        ← Foto pengantin
│   │   ├── couple-2.jpg
│   │   ├── couple-3.jpg
│   │   └── bg-pattern.png      ← Tekstur background
│   └── icons/
│       └── favicon.ico
└── README.md                   ← Panduan edit untuk pengantin
```

---

## 4. FILE KONFIGURASI UTAMA (`config.js`)

> Seluruh informasi undangan diubah hanya di satu file ini. Pengantin **tidak perlu menyentuh** `index.html`, `style.css`, atau `script.js` sama sekali.

```javascript
// ============================================================
//  ✨ KONFIGURASI UNDANGAN PERNIKAHAN — EDIT DI SINI SAJA ✨
// ============================================================

const WEDDING_CONFIG = {

  // --- IDENTITAS PENGANTIN ---
  groom: {
    name: "Nama Pengantin Pria",
    nickname: "Rendra",
    parentInfo: "Putra pertama dari Bapak ... & Ibu ...",
    photo: "assets/images/groom.jpg"
  },
  bride: {
    name: "Nama Pengantin Wanita",
    nickname: "Sari",
    parentInfo: "Putri pertama dari Bapak ... & Ibu ...",
    photo: "assets/images/bride.jpg"
  },

  // --- DETAIL ACARA ---
  events: [
    {
      name: "Akad Nikah",
      date: "2026-09-12",          // Format: YYYY-MM-DD
      time: "08:00",
      endTime: "10:00",
      venue: "Masjid Al-Ikhlas",
      address: "Jl. Contoh No. 1, Sidoarjo, Jawa Timur",
      mapsLink: "https://maps.google.com/?q=...",
      mapsEmbed: "https://www.google.com/maps/embed?pb=..."
    },
    {
      name: "Resepsi Pernikahan",
      date: "2026-09-12",
      time: "11:00",
      endTime: "14:00",
      venue: "Grand Ballroom Hotel XYZ",
      address: "Jl. Contoh No. 2, Sidoarjo, Jawa Timur",
      mapsLink: "https://maps.google.com/?q=...",
      mapsEmbed: "https://www.google.com/maps/embed?pb=..."
    }
  ],

  // --- COUNTDOWN TARGET (Ambil dari acara pertama otomatis) ---
  countdownTarget: "2026-09-12T08:00:00",

  // --- BACKSOUND ---
  audio: {
    file: "assets/audio/backsound.mp3",  // Ganti file MP3 sesuka hati
    autoplay: true,                       // true = langsung putar saat buka
    title: "Perfect - Ed Sheeran"        // Nama lagu yang ditampilkan
  },

  // --- GALERI FOTO ---
  gallery: [
    "assets/images/couple-1.jpg",
    "assets/images/couple-2.jpg",
    "assets/images/couple-3.jpg",
    "assets/images/couple-4.jpg",
    "assets/images/couple-5.jpg",
    "assets/images/couple-6.jpg"
  ],

  // --- AMPLOP DIGITAL ---
  digitalGift: {
    enabled: true,
    accounts: [
      {
        bank: "BCA",
        accountNumber: "1234567890",
        accountName: "Nama Pengantin",
        logoUrl: "assets/icons/bca.png",
        qrisImage: "assets/images/qris-bca.png"    // Opsional
      },
      {
        bank: "Mandiri",
        accountNumber: "0987654321",
        accountName: "Nama Pengantin",
        logoUrl: "assets/icons/mandiri.png",
        qrisImage: ""
      },
      {
        bank: "GoPay / OVO / Dana",
        accountNumber: "08xxxxxxxxxx",
        accountName: "Nama Pengantin",
        logoUrl: "assets/icons/ewallet.png",
        qrisImage: "assets/images/qris-ewallet.png"
      }
    ]
  },

  // --- RSVP & GOOGLE SHEETS ---
  rsvp: {
    googleScriptUrl: "https://script.google.com/macros/s/XXXXXXXXXXXXXXX/exec",
    maxGuests: 2   // Maksimal tamu per RSVP
  },

  // --- QUOTE / AYAT PEMBUKA ---
  openingQuote: {
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا",
    translation: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri.",
    source: "QS. Ar-Rum: 21"
  },

  // --- TEKS PENUTUP ---
  closingMessage: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.",

  // --- INFORMASI KONTAK ---
  contact: {
    groomPhone: "08xxxxxxxxxx",
    bridePhone: "08xxxxxxxxxx"
  }
};
```

---

## 5. FITUR-FITUR DETAIL

### 5.1 Animasi Sampul Pembuka

**Deskripsi:** Saat pertama kali membuka URL, tamu disambut dengan layar penuh berupa ilustrasi amplop / surat mewah berwarna gold dengan nama pengantin tertulis di atasnya.

**Perilaku:**
- Background: gradient gelap dengan partikel gold melayang pelan
- Ornamen gold foil di sudut-sudut sampul
- Nama pengantin dengan font script elegan, beranimasi `fadeIn`
- Tombol **"Buka Undangan ✉️"** dengan efek shimmer/kilap
- Saat tombol diklik:
  1. Animasi amplop "terbuka" (CSS transform / flip)
  2. Efek **ledakan confetti gold + kelopak bunga mawar** selama 3 detik
  3. Overlay memudar, konten utama muncul dengan animasi `slideUp`
  4. Backsound mulai diputar otomatis

**Catatan teknis:** Konfetti dibuat menggunakan library `canvas-confetti` (CDN, ringan, gratis).

---

### 5.2 Efek Partikel & Visual

| Efek | Trigger | Keterangan |
|---|---|---|
| **Gold confetti + kelopak** | Saat amplop dibuka | canvas-confetti, warna gold & dusty rose |
| **Floating rose petals** | Background terus-menerus | CSS keyframe animation, 8–12 kelopak |
| **Gold shimmer text** | Nama pengantin | CSS gradient animation `background-clip: text` |
| **Glitter sparkle** | Hover elemen penting | Pseudo-element CSS ::before/::after |
| **Parallax scroll** | Section hero | Background bergerak lebih lambat dari scroll |
| **Fade-in section** | Saat section masuk viewport | Intersection Observer API |

---

### 5.3 Countdown Timer

**Deskripsi:** Hitung mundur real-time menuju tanggal akad nikah.

**Tampilan:** 4 kotak mewah dengan angka besar, label di bawah
```
[ 74 ]  [ 12 ]  [ 08 ]  [ 30 ]
  Hari    Jam    Menit   Detik
```
- Setiap kotak punya border gold dan background semi-transparan
- Angka berubah dengan animasi `flip` (efek kartu balik)
- Setelah hari H, diganti teks: *"Alhamdulillah, hari bahagia telah tiba! 🌹"*

---

### 5.4 Peta Lokasi (Google Maps)

**Deskripsi:** Embed peta interaktif untuk setiap lokasi acara.

**Fitur:**
- Tab untuk berpindah antara "Akad" dan "Resepsi"
- Embed Google Maps iframe yang bisa di-zoom dan di-scroll
- Tombol **"Buka di Google Maps"** → buka aplikasi Google Maps langsung
- Tombol **"Salin Alamat"** → copy teks alamat ke clipboard
- Tampilan kartu alamat dengan ikon gold (📍 lokasi, 🕐 waktu, 🗓️ tanggal)

---

### 5.5 Amplop Digital — Animasi Buka Amplop

**Deskripsi:** Section khusus dengan konsep interaktif buka amplop digital untuk kirim hadiah uang.

**Alur Interaksi:**
1. Tamu melihat ilustrasi amplop tertutup berwarna gold
2. Ada teks: *"Titip Doa & Rezeki"* dengan ikon ❤️
3. Tamu mengklik amplop → animasi amplop **terbuka** (CSS 3D flip)
4. Muncul kartu cantik berisi pilihan metode pembayaran:

```
╔════════════════════════════════╗
║     💌 Amplop Digital          ║
║  Doa & Rezeki Anda sangat      ║
║  berarti bagi kami 🙏          ║
╟────────────────────────────────╢
║  [ BCA ]  [ Mandiri ]  [ QRIS ]║
╟────────────────────────────────╢
║  No. Rekening: 1234 5678 90    ║
║  a/n Nama Pengantin            ║
║                                ║
║  [📋 Salin Nomor Rekening]     ║
║  [📱 Tampilkan QR Code]        ║
╚════════════════════════════════╝
```

5. Tombol **"Salin Nomor Rekening"** → copy ke clipboard + notifikasi toast *"Nomor berhasil disalin! ✓"*
6. Tombol **"Tampilkan QR Code"** → modal dengan gambar QRIS full-size
7. Bisa menutup kembali amplop dengan klik tombol close

**Catatan:** Tidak ada sistem pembayaran otomatis — ini hanya tampilan informasi rekening yang elegan. Cocok dan aman.

---

### 5.6 Sistem RSVP → Google Sheets

**Deskripsi:** Form konfirmasi kehadiran tamu yang terhubung langsung ke Google Sheets via Google Apps Script.

**Field Form RSVP:**

| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| Nama Lengkap | Text input | ✅ | Nama tamu |
| No. HP / WhatsApp | Text input | ✅ | Untuk konfirmasi lanjutan |
| Konfirmasi Kehadiran | Radio button | ✅ | Hadir / Tidak Hadir / Ragu-ragu |
| Jumlah Tamu | Number (1–5) | ✅ | Hanya muncul jika "Hadir" |
| Acara yang Dihadiri | Checkbox | ✅ | Akad / Resepsi / Keduanya |
| Pesan / Ucapan | Textarea | ❌ | Opsional |

**Alur Data:**

```
Tamu isi form → klik "Kirim Konfirmasi"
        ↓
JavaScript fetch POST ke Google Apps Script URL
        ↓
Apps Script validasi & tulis ke Google Sheets
        ↓
Response sukses → tampilkan animasi sukses (✓ + confetti kecil)
        ↓
Data tersimpan di Sheet dengan kolom:
[Timestamp | Nama | No.HP | Status | Jml Tamu | Acara | Pesan]
```

**Google Apps Script (kode dasar untuk di-deploy):**

```javascript
// Code.gs — Deploy sebagai Web App (Anyone can access)
function doPost(e) {
  const sheet = SpreadsheetApp.openById("SPREADSHEET_ID_DISINI")
                              .getSheetByName("RSVP");
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.name,
    data.phone,
    data.attendance,
    data.guestCount || 0,
    data.events,
    data.message || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

**Struktur Google Sheets:**

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Timestamp | Nama | No. HP | Status Hadir | Jml Tamu | Acara | Pesan |

---

### 5.7 Guestbook — Ucapan & Doa

**Deskripsi:** Tamu dapat menulis ucapan dan doa yang ditampilkan di halaman undangan.

**Alur:**
- Tamu mengisi nama + ucapan → submit
- Data dikirim ke Google Sheets (sheet terpisah "Guestbook")
- Ucapan langsung muncul di halaman dalam bentuk kartu cantik
- Kartu ucapan ditampilkan menggunakan data yang di-fetch dari Apps Script (GET request)

**Tampilan kartu ucapan:**
```
╔──────────────────────────────╗
│ 🌸  Budi Santoso             │
│  "Semoga menjadi keluarga    │
│   yang sakinah, mawaddah,    │
│   warahmah. Aamiin 🤲"       │
│                  12 Sep 2026 │
╚──────────────────────────────╝
```

- Maksimal tampilkan 10 ucapan terbaru, dengan tombol "Lihat Semua"
- Animasi kartu masuk dari bawah saat di-scroll

---

### 5.8 Backsound & Music Player

**Deskripsi:** Musik latar romantis yang dapat dikontrol tamu.

**Fitur:**
- Autoplay saat undangan dibuka (setelah interaksi pertama tamu)
- Mini player mengambang di pojok kanan bawah:
  ```
  ♪ Perfect - Ed Sheeran    [▶/⏸]  [🔇]
  ```
- Animasi vinyl/disc berputar saat lagu play
- Tombol play/pause dan mute
- **Cara ganti lagu:** cukup ganti file `assets/audio/backsound.mp3` dan ubah `audio.title` di `config.js`

---

### 5.9 Galeri Foto

**Deskripsi:** Slideshow foto pengantin yang elegan.

**Spesifikasi:**
- Carousel auto-play dengan interval 4 detik
- Efek transisi: `crossfade` + sedikit zoom-in
- Frame gold elegant di sekeliling foto
- Navigasi panah kiri/kanan + dot indicator di bawah
- Klik foto → lightbox (foto besar + navigasi)
- **Mobile:** swipe kiri/kanan untuk ganti foto

---

## 6. RESPONSIVITAS (RESPONSIVE DESIGN)

### 6.1 Breakpoint Layout

| Perangkat | Lebar Viewport | Penyesuaian Utama |
|---|---|---|
| **Mobile** | < 768px | 1 kolom, font lebih kecil, tombol full-width |
| **Tablet** | 768px – 1024px | 2 kolom, spacing medium |
| **Desktop** | > 1024px | 2–3 kolom, layout penuh, efek hover aktif |

### 6.2 Prinsip Mobile-First

- Semua layout dimulai dari mobile, diperluas ke desktop menggunakan CSS `min-width` media queries
- Gambar menggunakan `max-width: 100%` dan format WebP untuk loading cepat
- Touch-friendly: tombol minimal 44×44px, swipe gesture untuk galeri
- Sticky navigation bar di mobile untuk akses cepat ke tiap section
- Font size responsif menggunakan CSS `clamp()`:
  ```css
  font-size: clamp(1.5rem, 5vw, 3rem);
  ```

---

## 7. PERFORMA & TEKNIS

### 7.1 Stack Teknologi

| Layer | Teknologi | Alasan |
|---|---|---|
| **Markup** | HTML5 | Standar, ringan, SEO-friendly |
| **Styling** | CSS3 + Custom Properties | Animasi smooth, variabel mudah diganti |
| **Interaksi** | Vanilla JavaScript (ES6+) | Tanpa framework, loading cepat |
| **Animasi** | CSS Keyframes + Intersection Observer | Native, performa tinggi |
| **Konfetti** | `canvas-confetti` (CDN) | Ringan ~7KB |
| **Hosting** | GitHub Pages / Vercel / Netlify | Gratis, HTTPS otomatis |
| **Backend RSVP** | Google Apps Script | Gratis, tanpa server |
| **Database** | Google Sheets | Mudah dilihat pengantin |
| **Font** | Google Fonts (CDN) | Gratis, beragam pilihan elegan |

### 7.2 Target Performa

| Metrik | Target |
|---|---|
| First Contentful Paint | < 2 detik |
| Largest Contentful Paint | < 3 detik |
| Total Page Size | < 2 MB (termasuk gambar dikompresi) |
| Lighthouse Score | > 80 (Performance), > 90 (Accessibility) |

### 7.3 Optimasi

- Gambar dikompres ke WebP, max 500KB per foto
- Font Google Fonts di-preload di `<head>`
- CSS & JS di-minify sebelum deploy
- Lazy loading untuk gambar galeri di bawah fold
- `will-change: transform` hanya pada elemen animasi aktif

---

## 8. PANDUAN KONTEN (MUDAH DIEDIT)

### 8.1 Checklist Pengisian Konten untuk Pengantin

**Yang perlu disiapkan sebelum website diaktifkan:**

```
☐ Nama lengkap kedua pengantin & nama orang tua
☐ Tanggal, waktu, dan lokasi Akad Nikah
☐ Tanggal, waktu, dan lokasi Resepsi
☐ Link Google Maps untuk kedua lokasi
☐ Foto pengantin (min. 4 foto, format JPG/PNG, maks 500KB/foto)
☐ File lagu MP3 untuk backsound (maks 5MB)
☐ Nomor rekening bank (nama bank, no. rek, nama pemilik)
☐ Foto QR Code QRIS (opsional, format PNG)
☐ No. HP pengantin (untuk tombol hubungi)
☐ Google Spreadsheet ID (setelah setup Apps Script)
```

### 8.2 Langkah Deploy (README untuk Pengantin)

```
1. Download / clone file proyek
2. Buka config.js — isi semua data sesuai checklist di atas
3. Ganti file di folder assets/ (foto, lagu, QR code)
4. Setup Google Apps Script:
   a. Buat Google Spreadsheet baru
   b. Buka Extensions → Apps Script
   c. Paste kode dari bagian 5.6 PRD ini
   d. Deploy → New Deployment → Web App → Anyone
   e. Copy URL deployment → paste ke config.js (rsvp.googleScriptUrl)
5. Upload ke GitHub → aktifkan GitHub Pages
6. Sebarkan link! 🎉
```

---

## 9. KEAMANAN & PRIVASI

| Aspek | Pendekatan |
|---|---|
| **Data tamu** | Tersimpan di Google Sheets privat milik pengantin |
| **Nomor rekening** | Ditampilkan hanya di dalam modal (tidak langsung terlihat) |
| **Apps Script URL** | Tidak perlu disembunyikan, hanya bisa menerima POST |
| **Spam RSVP** | Implementasi honeypot field + rate limiting sederhana |
| **HTTPS** | Wajib (otomatis di GitHub Pages / Vercel / Netlify) |

---

## 10. MILESTONE & ESTIMASI PENGERJAAN

| No | Tahap | Deskripsi | Estimasi Waktu |
|---|---|---|---|
| 1 | **Setup & Struktur** | HTML skeleton, config.js, folder assets | 0.5 hari |
| 2 | **Sampul & Animasi Buka** | Layar pembuka, animasi amplop, konfetti | 1 hari |
| 3 | **Hero & Konten Utama** | Section pengantin, quote, detail acara | 1 hari |
| 4 | **Countdown Timer** | Logic JS + animasi flip | 0.5 hari |
| 5 | **Galeri Foto** | Carousel + lightbox | 1 hari |
| 6 | **Amplop Digital** | Animasi buka amplop, modal rekening | 1 hari |
| 7 | **Peta Lokasi** | Google Maps embed + tab switching | 0.5 hari |
| 8 | **RSVP + Google Sheets** | Form, Apps Script, response handler | 1 hari |
| 9 | **Guestbook** | Form ucapan + tampilan kartu | 1 hari |
| 10 | **Backsound & Player** | Audio API + mini player UI | 0.5 hari |
| 11 | **Responsivitas** | Mobile/tablet/desktop fine-tuning | 1 hari |
| 12 | **Testing & Deploy** | Cross-browser, performa, deploy | 1 hari |
| | **TOTAL ESTIMASI** | | **~10 hari kerja** |

---

## 11. REFERENSI & INSPIRASI

- **Font yang direkomendasikan:**
  - Heading: `Cormorant Garamond` atau `Playfair Display`
  - Script: `Great Vibes` atau `Dancing Script`
  - Body: `Lato` atau `Montserrat`
- **Library CDN:**
  - Konfetti: `https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js`
  - Swiper (galeri): `https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js`
- **Hosting gratis:** GitHub Pages, Vercel, Netlify

---

## 12. CATATAN PENGEMBANG

> **Prinsip utama proyek ini:**
> 1. **Satu file konfigurasi** — semua data ada di `config.js`, pengantin tidak perlu menyentuh kode
> 2. **Tanpa framework berat** — murni HTML/CSS/JS agar loading cepat dan mudah di-maintain
> 3. **Mobile-first** — mayoritas tamu akan membuka via smartphone
> 4. **Elegan tanpa berlebihan** — efek visual memperkuat kesan, bukan mengganggu konten
> 5. **Data tamu aman** — semua masuk Google Sheets milik pengantin sendiri

---

*Dokumen PRD ini dibuat sebagai panduan lengkap untuk pengembangan website undangan pernikahan online "Love Letter Digital". Semoga pernikahan temanmu menjadi momen yang penuh berkah dan kenangan indah. 🌹💍*

---
**Versi Dokumen:** 1.0.0 | **Dibuat:** 30 Juni 2026
