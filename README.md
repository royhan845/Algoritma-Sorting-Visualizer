# Algo-Visualizer 3D

Sebuah aplikasi web interaktif untuk memvisualisasikan cara kerja algoritma pengurutan (*sorting*) secara 3D. Dibangun dengan desain antarmuka bergaya **Retro Neo-Brutalism** yang fokus pada keterbacaan tinggi dan pengalaman pengguna yang mulus.

**Live Demo:** [https://algoritma-sorting-visualizer.vercel.app/](https://algoritma-sorting-visualizer.vercel.app/)

---

## Fitur Utama

- **Visualisasi 3D Interaktif:** Menggunakan balok 3D untuk merepresentasikan nilai array. Pengguna bisa memutar (pan/zoom) kamera 3D secara bebas.
- **Animasi Transisi Mulus:** Setiap pertukaran data (SWAP) dan perbandingan nilai dianimasikan dengan *smooth* menggunakan kalkulasi fisika (React Spring).
- **Dua Algoritma Populer:** Mendukung visualisasi **Bubble Sort** dan **Selection Sort** beserta penjelasan teori dan rumus kompleksitasnya.
- **Kontrol Penuh Pengguna:** - Kecepatan animasi bisa diatur (Slider).
  - Bisa membuat data acak otomatis (*Randomize*).
  - Bisa memasukkan angka secara manual (Custom Input).
- **Log Langkah Terperinci:** Menampilkan terminal status dan jejak langkah algoritma baris demi baris, lengkap dengan *highlight* pada kode pemrograman yang sedang dieksekusi.
- **Auto-Scroll UX:** Layar akan otomatis fokus ke area kanvas 3D saat visualisasi dimulai agar presentasi berjalan rapi.

---

## Teknologi yang Digunakan

Aplikasi ini dibangun menggunakan *stack* web modern berbasis React:

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **3D Rendering:** [React Three Fiber](https://r3f.docs.pmnd.rs/) & [Three.js](https://threejs.org/)
- **Animasi Fisika 3D:** [React Spring](https://www.react-spring.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Gaya Retro Neo-Brutalism)
- **Deployment:** [Vercel](https://vercel.com/)

---

## Struktur Komponen Penting

- `app/layout.tsx` : Mengatur tata letak utama (*Root Layout*), *metadata* aplikasi, dan gaya *background* retro (kotak-kotak milimeter) secara global.
- `app/page.tsx` : Otak utama aplikasi yang mengatur seluruh *state*, logika algoritma (*Bubble & Selection*), dan tata letak kanvas 3D.
- `components/SortBlock.tsx` : Komponen 3D (*Mesh*) untuk merender balok, teks angka, dan mengatur warna serta animasi transisi menggunakan React Spring.
- `components/ControlPanel.tsx` : Panel UI kontrol utama (tombol acak, set input manual, *dropdown* pilihan algoritma, dan *slider* pengatur kecepatan).
- `components/CodeViewer.tsx` : Menampilkan kode sumber algoritma dan kotak riwayat langkah (*step history*) yang dapat bergulir secara otomatis.
- `components/AlgorithmInfo.tsx` : Panel informasi yang menampilkan teori algoritma, rumus kompleksitas, dan *Live Stats* (jumlah perbandingan & pertukaran).
- `components/TerminalLog.tsx` : Baris status bergaya terminal retro di bagian bawah layar untuk memberikan umpan balik interaktif kepada pengguna.

---

## Dibuat oleh:

**Royhan Firdaus** - Mahasiswa Program Studi Informatika - Universitas Amikom Purwokerto.  

*Proyek ini dibangun untuk keperluan riset dan eksplorasi visualisasi algoritma menggunakan teknologi web 3D.*