import { useEffect, useSyncExternalStore } from "react";

export type Locale = "id" | "en";

const STORAGE_KEY = "bsk-locale";

let currentLocale: Locale = "id";
let storageHydrated = false;
const listeners = new Set<() => void>();

function syncDocumentMeta(next: Locale) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = next;
  document.title =
    next === "en"
      ? "BSK CUSTOM | Precision CB Bodywork & Frame Alignment"
      : "BSK CUSTOM | Spesialis Tata Body CB & Rangka Presisi";
}

export function setLocale(next: Locale): void {
  if (currentLocale !== next) {
    currentLocale = next;
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Storage may be unavailable in private browsing contexts
      }
    }
    syncDocumentMeta(next);
    listeners.forEach((notify) => notify());
    return;
  }
  syncDocumentMeta(next);
}

export function toggleLocale(): void {
  setLocale(currentLocale === "id" ? "en" : "id");
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Locale {
  return currentLocale;
}

function getServerSnapshot(): Locale {
  return "id";
}

export function useLocale(): Locale {
  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    if (storageHydrated || typeof window === "undefined") return;
    storageHydrated = true;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "en" && currentLocale !== "en") {
        currentLocale = "en";
        syncDocumentMeta("en");
        listeners.forEach((notify) => notify());
      } else {
        syncDocumentMeta(currentLocale);
      }
    } catch {
      syncDocumentMeta(currentLocale);
    }
  }, []);

  return value;
}

const EN_MAP: Record<string, string> = {
  // Navigation
  "Showcase": "Showcase",
  "Tentang": "About",
  "Layanan": "Services",
  "Galeri": "Gallery",
  "Testimoni": "Reviews",
  "Kontak": "Contact",
  "Anatomi Presisi": "Frame Anatomy",
  "Layanan & Paket": "Services & Packages",
  "Galeri Unit": "Build Gallery",
  "Bengkel": "Workshop",
  "Ajukan Konsep": "Start a Build",
  "Menu": "Menu",
  "Buka menu navigasi": "Open navigation menu",
  "Tutup menu navigasi": "Close navigation menu",

  // Hero
  "Tata Body CB & Rangka Presisi": "CB Bodywork & Precision Frame Alignment",
  "Penataan tangki, jok, subframe, dan kelurusan kaki-kaki motor klasik maupun harian. Rapi di mata, lurus saat dikendarai.":
    "Precision tank fitting, seat alignment, subframe welding, and wheel geometry for classic CB and daily custom builds.",
  "Konsultasi Konsep": "Consult Your Build",
  "Konsultasi Konsep Garapan": "Consult Your Build",
  "Lihat Detail Garapan": "View Build Gallery",
  "Motor Sebelumnya": "Previous Motorcycle",
  "Motor Berikutnya": "Next Motorcycle",
  "Kategori": "Category",
  "Basis": "Platform",
  "Aliran": "Build Type",
  "Fokus": "Focus",

  // Anatomy
  "INSPEKSI TEKNIS": "TECHNICAL INSPECTION",
  "Anatomi Tata Body Presisi": "Precision Bodywork Anatomy",
  "Pilih titik pemeriksaan pada motor untuk melihat standar pengerjaan dan penyetelan BSK Custom.":
    "Select an inspection point on the motorcycle to view BSK Custom welding and alignment standards.",
  "Unit Inspeksi": "Inspection Unit",
  "Titik Pengecekan": "Inspection Points",
  "Standar Pengerjaan": "Workmanship Standard",

  // Services Bento Grid
  "LAYANAN BENGKEL & GARAPAN CUSTOM": "WORKSHOP & CUSTOM SERVICES",
  "Rapi di tata body.": "Clean in bodywork.",
  "Presisi di rangka & mesin.": "Precision in frame & engine.",
  "Custom Rangka & Subframe": "Custom Frame & Subframe",
  "Pembuatan dan perbaikan geometri rangka CB, GL, Megapro, hingga Tiger. Mulai dari potong-sambung subframe pipa seamless, las dudukan shock, sampai senter leher komstir agar lurus dikendarai.":
    "Frame geometry fabrication and correction for CB, GL, Megapro, and Tiger platforms. Covers seamless pipe subframe welding, shock mounts, and steering neck alignment.",
  "Potong & Sambung Subframe": "Subframe Cut & Weld",
  "Senter Komstir": "Steering Neck Alignment",
  "Las Pipa Tebal": "Seamless Tube Welding",
  "Konsultasi custom rangka": "Consult frame work",
  "Tata Body & Fitting": "Bodywork & Fitment",
  "Penataan set bodi proporsional tanpa celah renggang: tangki duduk rata, jok slim ngepress rangka, serta pemasangan slebor dan begel.":
    "Proportional body set fitment without gaps: level tank mounting, flush slim seat alignment, plus fender and grab rail setup.",
  "Fitting Tangki Rata": "Level Tank Fitment",
  "Jok Slim Rapi": "Flush Slim Seat",
  "Slebor & Begel": "Fenders & Grab Rail",
  "Konsultasi tata body": "Consult bodywork",
  "Rolling Chassis & Kaki-Kaki": "Rolling Chassis & Suspension",
  "Penyelarasan sektor kaki-kaki depan dan belakang: setel swingarm, dudukan cakram, kemiringan shock, dan senter jalur rantai serta as roda.":
    "Front and rear chassis alignment: swingarm setup, disc brake mounts, shock angle, chain tracking, and wheel centering.",
  "Senter As Roda": "Axle Centering",
  "Setel Swingarm": "Swingarm Alignment",
  "Jalur Rantai Lurus": "Straight Chain Line",
  "Konsultasi kaki-kaki": "Consult chassis setup",
  "Garap Mesin, Tune-Up & Herex": "Engine Build, Tune-Up & Herex",
  "Penanganan dapur pacu untuk kebutuhan harian tangguh maupun spek touring dan herex. Meliputi servis rutin, korek harian, setting rasio, setel klep, serta penataan karburator atau throttle body.":
    "Engine work for reliable daily riding, touring, or herex builds. Covers routine tune-ups, mild porting, gearbox setup, valve clearance, and carburetor or throttle body tuning.",
  "Tune-Up & Servis": "Engine Tune-Up",
  "Spek Harian / Herex": "Daily & Herex Specs",
  "Karbu & Klep": "Carb & Valve Tuning",
  "Konsultasi garap mesin": "Consult engine build",
  "Kelistrikan & Pengapian": "Electrical & Ignition",
  "Perakitan dan perapihan jalur kabel bodi tersembunyi agar rangka bersih, pengecekan pengapian, kiprok, hingga instalasi lampu stabil.":
    "Clean hidden wiring loom routing for an uncluttered frame, ignition diagnostics, regulator checks, and stable lighting setup.",
  "Kabel Bodi Rapi": "Hidden Wiring Loom",
  "Cek Pengapian": "Ignition Diagnostics",
  "Full DC & Lampu": "Full DC & Lighting",
  "Konsultasi kelistrikan": "Consult wiring work",
  "Rakitan Mentahan & Unit Utuh": "Raw & Complete Mechanical Assembly",
  "Perakitan motor dari rangka dasar sampai berdiri utuh siap jalan. Mencakup penataan braket, dudukan mesin, kelengkapan mekanis, dan pengecekan ulang sebelum turun jalan.":
    "Complete motorcycle assembly from bare frame to road-ready stance, including brackets, engine mounts, mechanical setup, and final inspection.",
  "Rakit Rolling Unit": "Rolling Unit Build",
  "Braket & Dudukan": "Brackets & Mounts",
  "Siap Turun Jalan": "Road-Ready Setup",
  "Konsultasi rakitan": "Consult assembly",
  "Las Subframe Pipa Seamless": "Seamless Pipe Subframe Weld",
  "Jok Custom Busa Latex / Kulit Mbtech": "Custom Latex Foam / Mbtech Seat",
  "Penyembunyian Kabel Bodi Rapi": "Clean Hidden Wiring Loom Routing",
  "Poles Blok Mesin / Bak Kopling Kilap": "Engine & Clutch Cover Mirror Polish",
  "Contoh: Rangka bekas las lama, tangki bawa sendiri, butuh setel komstir.":
    "Example: Frame has previous welds, bringing my own tank, steering head needs alignment.",

  // Gallery
  "DOKUMENTASI GARAPAN NYATA": "REAL WORKSHOP ARCHIVE",
  "Galeri Unit & Rangka BSK": "BSK Frame & Build Gallery",
  "Filter kategori galeri bengkel": "Filter workshop gallery category",
  "Semua": "All",
  "Rangka & Kaki-Kaki": "Frame & Chassis",
  "Unit & Proses Bengkel": "Complete Units & Bench",
  "Show Foto Penuh": "Full View",
  "Tanya Garapan Ini": "Ask About This Build",
  "Konsultasi Unit Serupa": "Consult Similar Build",
  "Foto Sebelumnya": "Previous Photo",
  "Foto Berikutnya": "Next Photo",
  "Tutup preview foto": "Close photo preview",
  "Daftar foto galeri BSK Custom": "BSK Custom gallery photo strip",

  // Testimonials
  "CERITA DARI BENGKEL": "RIDER & WORKSHOP STORIES",
  "Kata Anak Motor.": "What Riders Say.",
  "Lempeng, Rapi, Enak Dipake.": "Straight, Tight, Road Ready.",
  "Testimoni pelanggan baris atas": "Customer testimonials top row",
  "Testimoni pelanggan baris bawah": "Customer testimonials bottom row",

  // Contact & Location
  "KONTAK & KONSULTASI BENGKEL": "CONTACT & WORKSHOP CONSULTATION",
  "Hubungi BSK Custom": "Contact BSK Custom",
  "Mau tanya soal tata bodi, custom rangka, kaki-kaki, atau janjian mampir ke bengkel? Isi pesan singkat di samping atau langsung chat WhatsApp.":
    "Questions about bodywork, custom frames, suspension setup, or visiting the shop? Fill the quick form or reach us directly on WhatsApp.",
  "Konsultasi Garapan": "Build Consultation",
  "Tanya kecocokan tangki, jok, shock, atau rangka sebelum motor dibawa ke bengkel.":
    "Ask about tank, seat, shock, or frame fitment before bringing your bike to the shop.",
  "Cek Slot Bengkel": "Check Workshop Queue",
  "Pastikan jadwal dan kesiapan part lebih dulu via WA supaya pas datang langsung dikerjakan.":
    "Confirm workshop schedule and parts availability on WhatsApp before dropping by.",
  "Kunjungan Workshop": "Workshop Visit",
  "Mampir langsung cek kondisi komstir, arm, atau diskusi konsep langsung bareng mekanik.":
    "Stop by to inspect steering neck alignment, swingarm setup, or discuss build plans directly with the mechanic.",
  "Kirim Pesan Cepat": "Quick WhatsApp Brief",
  "Isi singkat lalu langsung teruskan ke WhatsApp admin.":
    "Fill out a quick note and send straight to our admin WhatsApp.",
  "Nama": "Name",
  "Nama kamu": "Your name",
  "Basis Motor": "Motorcycle Base",
  "Misal: CB 100 / GL": "e.g., CB 100 / GL",
  "Keperluan Garapan": "Work Needed",
  "Tata Body & Fitting Tangki-Jok": "Bodywork & Tank-Seat Fitment",
  "Garap Mesin & Tune-Up Herex": "Engine Build & Herex Tune-Up",
  "Kondisi / Catatan Motor": "Bike Condition / Notes",
  "Ceritakan kondisi motor sekarang atau ubahan yang diinginkan...":
    "Describe your current bike condition or custom build goals...",
  "Kirim via WhatsApp": "Send via WhatsApp",
  "Pesan siap dikirim:": "Ready to send:",
  "Buka WhatsApp Sekarang": "Open WhatsApp Now",
  "Peta lokasi bengkel BSK Custom": "BSK Custom workshop location map",
  "LOKASI WORKSHOP": "WORKSHOP LOCATION",
  "Mampir Langsung ke BSK Custom": "Visit BSK Custom Workshop",
  "Bisa bawa unit langsung ke bengkel untuk ukur rangka, fitting bodi, atau diskusi ubahan bareng mekanik. Gunakan pin Google Maps BSK CUSTOM di sebelah untuk rute tercepat.":
    "Bring your bike directly to the shop for frame checks, body fitting, or face-to-face planning with our builders. Use the BSK CUSTOM Google Maps pin for direct directions.",
  "Titik Lokasi Maps": "Google Maps Pin",
  "Jadwal Workshop": "Workshop Schedule",
  "Konfirmasi jadwal & antrean via WhatsApp sebelum datang.":
    "Confirm workshop hours and queue via WhatsApp before visiting.",
  "Buka di Google Maps": "Open in Google Maps",

  // Footer
  "Tata body rapi. Rangka presisi. Siap turun jalan.":
    "Clean bodywork. Precision frame alignment. Built for the road.",
  "Spesialis Tata Body CB & Rangka Presisi.":
    "CB Bodywork & Precision Frame Specialist.",
  "Kembali ke Atas": "Back to Top",
  "Chat WhatsApp": "WhatsApp Chat",
  "Rute Bengkel": "Workshop Directions",

  // SOP & Workshop
  "KONSULTASI & LOKASI": "CONSULTATION & LOCATION",
  "Alur Kerja Bengkel": "Workshop Workflow",
  "Setiap unit melewati tahapan ukur sebelum las untuk menjamin kestabilan berkendara dan kerapian tampilan.":
    "Every motorcycle goes through measurement checks before welding to ensure straight tracking and clean body lines.",
  "01. Cek Rangka Awal": "01. Initial Frame Check",
  "Pemeriksaan kondisi leher komstir, lengan ayun, dan titik simetris rangka dasar.":
    "Inspecting steering neck geometry, swingarm alignment, and baseline frame symmetry.",
  "02. Penentuan Konsep": "02. Build Planning",
  "Pemilihan tangki, jok, dan jarak main suspensi serta persetujuan rincian pengerjaan.":
    "Selecting tank, seat, and suspension stance with transparent work scope approval.",
  "03. Fabrikasi & Las": "03. Fabrication & Welding",
  "Pemotongan, penyambungan subframe, serta pembuatan braket bodi yang kokoh.":
    "Cutting, subframe welding, and fabricating sturdy body mounting brackets.",
  "04. Senter Kaki-Kaki": "04. Wheel & Axle Centering",
  "Penyelarasan as roda depan-belakang, posisi slebor, dan jalur rantai.":
    "Aligning front and rear axles, fender clearance, and chain tracking.",
  "05. Finishing & Uji Jalan": "05. Finishing & Road Test",
  "Pembersihan las, perakitan akhir, dan pengecekan kestabilan sebelum serah terima.":
    "Weld cleanup, final assembly, and stability road testing before handover.",
  "Konsultasi & Lokasi Workshop": "Consultation & Workshop Location",
  "Instagram Resmi": "Official Instagram",
  "WhatsApp Admin": "Admin WhatsApp",
  "Alamat Workshop": "Workshop Address",
  "Jam Operasional": "Operating Hours",
  "Chat via WhatsApp": "Chat via WhatsApp",

  // About Section
  "Tentang BSK Custom": "About BSK Custom",
  "SPESIALIS TATA BODY CB & RANGKA PRESISI":
    "CB BODYWORK & PRECISION FRAME SPECIALIST",
  "Proses pengerjaan tata body dan perakitan rangka di bengkel BSK Custom":
    "Bodywork fitting and frame assembly process at BSK Custom workshop",
  "BSK Custom berfokus menangani tata body CB, perbaikan geometri rangka, dan penataan kaki-kaki motor klasik maupun harian. Setiap unit dikerjakan dengan pengukuran senter yang teliti, pengelasan matang, serta fitting tangki dan jok yang rapat agar tampilan motor rapi sekaligus stabil dikendarai.":
    "BSK Custom specializes in Honda CB bodywork, frame geometry correction, and suspension alignment for classic and daily custom motorcycles. Every unit goes through careful centering measurements, solid welding, and tight tank-to-seat fitment so it looks clean and tracks straight on the road.",
  "Senter Rangka & Komstir": "Frame & Steering Alignment",
  "Geometri leher komstir dan as roda diukur presisi agar motor stabil saat berkendara.":
    "Steering neck and axle geometry are measured precisely so the bike tracks straight at speed.",
  "Las Rapi & Kokoh": "Clean & Solid Welding",
  "Sambungan pipa subframe dikerjakan matang agar kuat untuk pemakaian harian maupun touring.":
    "Subframe pipe joints are welded cleanly for daily riding durability and long-distance touring.",
  "Fitting Tanpa Celah": "Zero-Gap Fitment",
  "Pertemuan tangki, jok, dan slebor ditata proporsional tanpa celah renggang.":
    "Tank, seat, and fender junctions are aligned proportionally without awkward gaps.",
};

export function tr(key: string, locale: Locale): string {
  if (locale === "id") return key;
  return EN_MAP[key] ?? key;
}
