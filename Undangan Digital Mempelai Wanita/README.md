# Panduan Penggunaan Undangan Pernikahan Online "Love Letter Digital" 💌

Selamat atas rencana pernikahan Anda! 🌹 Dokumen ini adalah panduan langkah demi langkah untuk mengubah data pada website undangan pernikahan Anda.

---

## 1. Persiapan Awal
Pastikan Anda sudah menyiapkan hal-hal berikut:
- [ ] Nama lengkap kedua pengantin & nama orang tua
- [ ] Tanggal, waktu, dan lokasi Akad Nikah & Resepsi
- [ ] Link Google Maps untuk kedua lokasi
- [ ] Foto pengantin (min. 4 foto, format JPG/PNG/WebP, disarankan maks 500KB/foto agar loading cepat)
- [ ] File lagu MP3 untuk backsound (maks 5MB)
- [ ] Nomor rekening bank dan/atau e-wallet
- [ ] Foto QR Code QRIS (opsional, format PNG)
- [ ] Nomor HP / WhatsApp pengantin pria & wanita

---

## 2. Cara Mengubah Data (Penting! ⭐)
Anda **HANYA PERLU MENGUBAH SATU FILE** yaitu file `config.js`. Anda TIDAK PERLU membuka atau mengedit `index.html`, `style.css`, ataupun `script.js`.

1. Buka file `config.js` menggunakan text editor biasa (seperti Notepad) atau code editor (seperti VS Code).
2. Temukan baris-baris yang memiliki komentar `// EDIT DISINI`.
3. Ganti teks di dalam tanda kutip `" "` sesuai dengan data Anda.
   *Contoh:*
   `name: "Muhammad Rendra Pratama", // EDIT DISINI` diubah menjadi
   `name: "Budi Santoso", // EDIT DISINI`
4. Simpan (Save) file tersebut.

---

## 3. Cara Mengatur Titik Google Maps
Agar peta (map) lokasi acara dapat muncul di undangan, Anda perlu menyalin tautan "Embed" dari Google Maps:
1. Buka [Google Maps](https://www.google.com/maps) di browser (disarankan via komputer).
2. Cari lokasi gedung/tempat acara Anda.
3. Klik tombol **Share (Bagikan)** di panel informasi lokasi.
4. Pilih tab **Embed a map (Sematkan peta)**.
5. Klik **Copy HTML (Salin HTML)**.
6. Paste (tempelkan) hasil salinan tersebut di tempat lain sementara (seperti Notepad). Anda akan melihat kode panjang seperti:
   `<iframe src="https://www.google.com/maps/embed?pb=!1m18!..." width="600" ...></iframe>`
7. Ambil **hanya bagian link (URL)** yang ada di dalam `src="..."` (teks yang dimulai dengan `https://www.google.com/maps/embed?pb=...`).
8. Buka `config.js`, lalu *paste* link tersebut ke bagian `mapsEmbed` di acara Akad/Resepsi Anda.

---

## 4. Cara Mengganti Foto dan Lagu
Website ini menggunakan folder `assets/` untuk menyimpan file media.
1. Siapkan foto pertunangan Anda (atau foto lainnya) dan masukkan ke dalam folder `assets/images/`.
2. Pastikan nama file foto tersebut sesuai dengan yang tertulis di `config.js` pada bagian `gallery` (contoh: `engagement.jpg`).
3. (Catatan: Foto individu mempelai sudah tidak digunakan sesuai permintaan Anda, sehingga Anda hanya perlu fokus pada foto galeri ini).
4. Siapkan file lagu `.mp3`, beri nama `backsound.mp3`, dan letakkan di dalam folder `assets/audio/`. Jangan lupa perbarui bagian `audio.title` di `config.js` dengan judul lagu yang baru.
5. Masukkan gambar QRIS Anda (jika ada) ke `assets/images/qris-ewallet.png`.
6. Jika perlu mengganti logo bank, letakkan di `assets/icons/`.

---

## 5. Cara Menghubungkan Form Konfirmasi Kehadiran (RSVP) ke Google Sheets
Website ini bisa otomatis menyimpan daftar tamu yang akan hadir ke Google Sheets Anda secara gratis. Ikuti langkah berikut:

1. Buka Google Sheets (https://sheets.google.com) dan buat Spreadsheet baru. Beri nama (misal: "RSVP Pernikahan").
2. Ubah nama Sheet1 (di bagian bawah kiri) menjadi `RSVP`.
3. Buat juga Sheet baru dan beri nama `Guestbook`. (Ini untuk menampung ucapan tamu).
4. Klik menu **Extensions (Ekstensi)** > **Apps Script**.
5. Hapus semua kode yang ada, lalu salin (copy) dan tempel (paste) kode di bawah ini:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var data = JSON.parse(e.postData.contents);
  var type = data.type || 'rsvp';
  
  if (type === 'guestbook') {
    var ws = sheet.getSheetByName("Guestbook");
    ws.appendRow([new Date(), data.name, data.message]);
  } else {
    var ws = sheet.getSheetByName("RSVP");
    ws.appendRow([
      new Date(),
      data.name,
      data.phone,
      data.attendance,
      data.guestCount || 0,
      data.events,
      data.message || ""
    ]);
  }

  return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Guestbook");
  var data = sheet.getDataRange().getValues();
  var result = [];
  
  // Skip baris pertama (header) jika ada
  for (var i = 1; i < data.length; i++) {
    result.push({
      timestamp: data[i][0],
      name: data[i][1],
      message: data[i][2]
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}
```

6. Simpan project (ikon disket).
7. Klik tombol biru **Deploy** (Terapkan) di pojok kanan atas, pilih **New deployment** (Penerapan baru).
8. Pada menu gerigi (Select type), pilih **Web app**.
9. Isi "Description" bebas.
10. Pada bagian "Execute as", pilih **Me** (Anda).
11. Pada bagian "Who has access", ubah menjadi **Anyone** (Siapa saja).
12. Klik **Deploy**. (Anda mungkin akan diminta untuk memberikan izin akses (Authorize access) ke akun Google Anda, lanjutkan saja walau ada peringatan keamanan).
13. Salin **Web app URL** yang muncul.
14. Buka kembali file `config.js` Anda, cari bagian `rsvp: { googleScriptUrl: "..." }` dan ganti URL-nya dengan URL yang baru Anda salin.

---

## 6. Cara Mempublikasikan (Hosting Gratis)
Untuk membuat undangan ini bisa diakses orang lain melalui internet, Anda bisa menggunakan layanan gratis seperti **GitHub Pages**, **Netlify**, atau **Vercel**.

**Cara paling mudah (dengan Netlify):**
1. Buat folder bernama `undangan-saya` dan masukkan semua file undangan ke dalamnya (`index.html`, `style.css`, `script.js`, `config.js`, dan folder `assets/`).
2. Buka web https://app.netlify.com/drop
3. Seret (Drag & Drop) folder `undangan-saya` tadi ke area yang disediakan di halaman Netlify.
4. Tunggu beberapa saat, website Anda akan langsung online! Anda bisa mengubah link URL-nya di pengaturan Netlify (Site Settings > Change site name).

Selamat mencoba dan semoga lancar sampai hari H! 💍✨
