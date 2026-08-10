# 📝 PANDUAN EDIT UNDANGAN PERNIKAHAN DIGITAL

## Daftar Isi
- [Struktur File](#struktur-file)
- [Cara Edit Data Undangan](#cara-edit-data-undangan)
- [Panduan Edit Setiap Bagian](#panduan-edit-setiap-bagian)
- [Cara Menambah Foto Galeri](#cara-menambah-foto-galeri)
- [Cara Setup Google Sheets untuk RSVP](#cara-setup-google-sheets-untuk-rsvp)
- [Cara Mengganti Musik](#cara-mengganti-musik)
- [Cara Embed Google Maps](#cara-embed-google-maps)
- [Tips & Troubleshooting](#tips--troubleshooting)

---

## Struktur File

```
Love Letter Digital/
├── index.html          → Halaman utama (JANGAN diubah)
├── config.js           → ✨ FILE UTAMA YANG PERLU DIEDIT ✨
├── script.js           → Logika interaksi (JANGAN diubah)
├── style.css           → Styling/tampilan (JANGAN diubah)
├── README.md           → Dokumentasi umum
├── PANDUAN_EDIT.md     → File ini
└── assets/
    ├── audio/
    │   └── backsound.mp3    → File musik latar
    ├── images/
    │   └── engagement.jpg   → Foto galeri
    └── icons/
        └── favicon.ico      → Icon browser tab
```

**PENTING:** Anda hanya perlu mengedit file `config.js`. File lainnya (`index.html`, `script.js`, `style.css`) TIDAK perlu diubah.

---

## Cara Edit Data Undangan

Buka file `config.js` dengan text editor (Notepad, VS Code, dll). File ini berisi semua data undangan dalam format JavaScript object.

### Format Penulisan
- Teks/string ditulis di dalam tanda kutip: `"teks disini"`
- Angka ditulis tanpa tanda kutip: `2`
- Boolean ditulis: `true` atau `false`
- Setiap baris diakhiri koma (`,`) kecuali baris terakhir dalam blok
- Jangan hapus tanda kurung kurawal `{}` atau kurung siku `[]`

---

## Panduan Edit Setiap Bagian

### 1. Identitas Pengantin Pria

```javascript
groom: {
  name: "Mohammad Hadi Ifan",          // Ganti dengan nama lengkap
  nickname: "Ifan",                    // Ganti dengan nama panggilan
  parentInfo: "Putra dari Bapak ... & Ibu ...",  // Info orang tua
  photo: ""                            // Kosongkan (tidak pakai foto)
},
```

### 2. Identitas Pengantin Wanita

```javascript
bride: {
  name: "Erlina Nur Amelia",           // Ganti dengan nama lengkap
  nickname: "Erlina",                  // Ganti dengan nama panggilan
  parentInfo: "Putri dari Bapak ... & Ibu ...",  // Info orang tua
  photo: ""                            // Kosongkan (tidak pakai foto)
},
```

### 3. Detail Acara (Akad & Resepsi)

```javascript
events: [
  {
    name: "Akad Nikah",                // Nama acara
    date: "2026-09-20",               // Format: TAHUN-BULAN-TANGGAL
    time: "08:00",                    // Jam mulai (format 24 jam: HH:MM)
    endTime: "Selesai",               // Jam selesai atau teks "Selesai"
    venue: "Kediaman Mempelai Wanita", // Nama tempat
    address: "RT.06/RW.03 Dsn. Lundo...", // Alamat lengkap
    mapsLink: "https://maps.google.com/?q=...",   // Link Google Maps
    mapsEmbed: "https://www.google.com/maps/embed?pb=..."  // URL embed
  },
  {
    // Acara kedua (resepsi) — format sama seperti di atas
  }
],
```

**Catatan Format Tanggal:**
- Gunakan format `YYYY-MM-DD` (contoh: `"2026-09-20"` = 20 September 2026)
- Gunakan format 24 jam untuk waktu (contoh: `"13:00"` = jam 1 siang)

### 4. Target Countdown (Hitung Mundur)

```javascript
countdownTarget: "2026-09-20T08:00:00",
```

- Format: `"YYYY-MM-DDTHH:MM:SS"`
- Biasanya diisi dengan waktu acara pertama (akad)

### 5. Musik Latar

```javascript
audio: {
  file: "assets/audio/backsound.mp3",  // Path ke file MP3
  autoplay: true,                      // true = putar otomatis
  title: "Judul Lagu - Penyanyi"      // Tampil di mini player
},
```

### 6. Galeri Foto

```javascript
gallery: [
  "assets/images/engagement.jpg",      // Foto 1
  "assets/images/prewedding1.jpg",     // Foto 2 (tambahkan di sini)
  "assets/images/prewedding2.jpg"      // Foto 3 (tambahkan di sini)
],
```

- Letakkan file foto di folder `assets/images/`
- Tambahkan path-nya di array `gallery`
- Format yang didukung: JPG, PNG, WebP

### 7. Amplop Digital

```javascript
digitalGift: {
  enabled: true,                       // true = tampilkan, false = sembunyikan
  accounts: [
    {
      bank: "DANA",                    // Nama bank/e-wallet
      accountNumber: "083141348232",   // Nomor rekening/HP
      accountName: "Mohammad Hadi Ifan", // Nama pemilik
      logoUrl: "",                     // URL logo bank (opsional)
      qrisImage: ""                    // Path gambar QR QRIS (opsional)
    }
  ]
},
```

### 8. RSVP & Google Sheets

```javascript
rsvp: {
  googleScriptUrl: "https://script.google.com/macros/s/.../exec",
  maxGuests: 2                         // Maksimal tamu per undangan
},
```

### 9. Ayat Pembuka

```javascript
openingQuote: {
  arabic: "...",                       // Teks ayat dalam bahasa Arab
  translation: "...",                  // Terjemahan bahasa Indonesia
  source: "QS. Ar-Rum: 21"           // Sumber ayat
},
```

### 10. Pesan Penutup

```javascript
closingMessage: "Merupakan suatu kehormatan dan kebahagiaan...",
```

### 11. Kontak Pengantin

```javascript
contact: {
  groomPhone: "081234567890",          // No. HP pengantin pria
  bridePhone: "089876543210"           // No. HP pengantin wanita
},
```

---

## Cara Menambah Foto Galeri

1. Siapkan file foto (JPG/PNG/WebP), usahakan ukuran di bawah 500KB per foto
2. Salin file foto ke folder `assets/images/`
3. Buka `config.js`, cari bagian `gallery`
4. Tambahkan path foto baru:

```javascript
gallery: [
  "assets/images/engagement.jpg",
  "assets/images/foto_baru.jpg"       // Tambahkan di sini
],
```

---

## Cara Setup Google Sheets untuk RSVP

### Langkah 1: Buat Google Spreadsheet
1. Buka [Google Sheets](https://sheets.google.com)
2. Buat spreadsheet baru
3. Beri nama kolom di baris pertama:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Phone`
   - D1: `Attendance`
   - E1: `GuestCount`
   - F1: `Events`
   - G1: `Message`

### Langkah 2: Buat Google Apps Script
1. Di spreadsheet, klik menu **Extensions > Apps Script**
2. Hapus semua kode default
3. Paste kode berikut:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  if (data.type === 'guestbook') {
    sheet.appendRow([
      new Date(),
      data.name,
      '',
      '',
      '',
      '',
      data.message
    ]);
  } else {
    sheet.appendRow([
      new Date(),
      data.name,
      data.phone,
      data.attendance,
      data.guestCount,
      data.events,
      data.message
    ]);
  }

  return ContentService.createTextOutput(
    JSON.stringify({ status: 'success' })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var result = [];

  for (var i = 1; i < data.length; i++) {
    if (data[i][6]) {
      result.push({
        name: data[i][1],
        message: data[i][6],
        timestamp: data[i][0]
      });
    }
  }

  return ContentService.createTextOutput(
    JSON.stringify(result)
  ).setMimeType(ContentService.MimeType.JSON);
}
```

### Langkah 3: Deploy
1. Klik **Deploy > New deployment**
2. Pilih **Web app**
3. Description: "Wedding RSVP"
4. Execute as: **Me**
5. Who has access: **Anyone**
6. Klik **Deploy**
7. Salin URL yang muncul
8. Paste URL tersebut ke `config.js` bagian `rsvp.googleScriptUrl`

---

## Cara Mengganti Musik

1. Siapkan file musik format **MP3** (maksimal 5MB)
2. Rename menjadi `backsound.mp3` (atau nama lain)
3. Salin ke folder `assets/audio/`
4. Jika namanya bukan `backsound.mp3`, update path di `config.js`:

```javascript
audio: {
  file: "assets/audio/nama_file_baru.mp3",
  autoplay: true,
  title: "Judul Lagu - Penyanyi"
},
```

---

## Cara Embed Google Maps

### Mendapatkan Link Google Maps
1. Buka [Google Maps](https://maps.google.com)
2. Cari lokasi acara
3. Klik **Share > Copy link**
4. Paste ke `mapsLink` di `config.js`

### Mendapatkan Embed URL
1. Di Google Maps, klik **Share > Embed a map**
2. Salin kode iframe yang muncul
3. Ambil HANYA bagian URL dari `src="..."` (tanpa tag `<iframe>`)
4. Paste ke `mapsEmbed` di `config.js`

Contoh:
```
Kode iframe: <iframe src="https://www.google.com/maps/embed?pb=!1m18!..." ...></iframe>
Yang di-copy: https://www.google.com/maps/embed?pb=!1m18!...
```

---

## Cara Mengirim Undangan ke Tamu

Tambahkan parameter `?to=NamaTamu` di URL undangan:

```
https://domain-anda.com/?to=Budi%20Santoso
```

- Gunakan `%20` untuk spasi, atau
- Gunakan `+` untuk spasi: `?to=Budi+Santoso`

---

## Tips & Troubleshooting

### Musik Tidak Bisa Autoplay
Browser modern memblokir autoplay audio. Musik akan mulai diputar setelah pengguna menekan tombol "Buka Undangan". Ini adalah perilaku normal.

### RSVP Tidak Terkirim
1. Pastikan URL Google Apps Script sudah benar
2. Pastikan deployment-nya sudah di-set ke **Anyone**
3. Cek apakah ada error di Console browser (F12 > Console)

### Foto Tidak Muncul
1. Pastikan file foto sudah ada di folder `assets/images/`
2. Pastikan nama file di `config.js` sama persis (case-sensitive)
3. Pastikan format file didukung (JPG, PNG, WebP)

### Website Lambat
1. Kompres foto menggunakan [TinyPNG](https://tinypng.com) atau [Squoosh](https://squoosh.app)
2. Kompres file MP3 menggunakan [MP3Smaller](https://www.mp3smaller.com)
3. Usahakan total ukuran semua aset di bawah 5MB

### Cara Deploy ke Internet
Anda bisa menggunakan hosting gratis seperti:
- **Netlify**: Upload folder langsung di [netlify.com](https://netlify.com)
- **Vercel**: Upload folder di [vercel.com](https://vercel.com)
- **GitHub Pages**: Push ke repository GitHub, aktifkan Pages
- **Firebase Hosting**: `firebase deploy` setelah setup

---

## Bantuan

Jika ada pertanyaan atau kendala, hubungi developer:
- **Teguh Imam Subarkah** (Designer & Developer)
