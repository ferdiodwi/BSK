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
  "Rakitan Mentahan & Non-Cat": "Raw Assembly (No Repaint)",
  "Fokus pengerjaan mekanis, rangka mentahan, dan perakitan unit siap jalan atau siap masuk tukang cat pilihan Anda tanpa layanan repaint.":
    "Dedicated mechanical, raw frame, and rolling assembly work ready for the road or your chosen painter without workshop repainting.",
  "Fokus Rangka & Mesin": "Frame & Engine Focus",
  "Siap Naik Cat Sendiri": "Paint-Ready Prep",
  "Non-Repaint": "No Repaint Service",
  "Konsultasi rakitan": "Consult raw assembly",
  "Las Subframe Pipa Seamless": "Seamless Pipe Subframe Weld",
  "Jok Custom Busa Latex / Kulit Mbtech": "Custom Latex Foam / Mbtech Seat",
  "Penyembunyian Kabel Bodi Rapi": "Clean Hidden Wiring Loom Routing",
  "Poles Blok Mesin / Bak Kopling Kilap": "Engine & Clutch Cover Mirror Polish",
  "Contoh: Rangka bekas las lama, tangki bawa sendiri, butuh setel komstir.":
    "Example: Frame has previous welds, bringing my own tank, steering head needs alignment.",

  // Gallery
  "UNIT NYATA WORKSHOP": "REAL WORKSHOP BUILDS",
  "Galeri 5 Unit Garapan BSK": "BSK Custom 5 Build Showcase",
  "Lima contoh hasil penataan rangka dan full build dari studio BSK Custom. Klik unit untuk melihat spesifikasi ubahan lengkap.":
    "Five real frame alignment and full build examples from BSK Custom. Select any build to inspect its specifications.",
  "Semua": "All",
  "Tata Body Rangka": "Rolling Chassis",
  "Full Build": "Full Build",
  "Lihat Detail Spek": "Inspect Build Specs",
  "Konsultasi Konsep Ini": "Consult This Build",
  "Tutup": "Close",
  "Tidak ada unit pada kategori ini.": "No builds match this filter.",
  "Tampilkan Semua Unit": "Show All Builds",

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
  "Konsultasi Konsep & Jadwal Pengerjaan": "Build Consultation & Workshop Scheduling",
  "Kirim foto kondisi motor saat ini atau pilih paket yang diinginkan lewat formulir pengajuan konsep sebelum datang ke bengkel.":
    "Send photos of your bike or pick your desired scope via the build inquiry form before visiting the shop.",
  "Konsultasi & Lokasi Workshop": "Consultation & Workshop Location",
  "Instagram Resmi": "Official Instagram",
  "WhatsApp Admin": "Admin WhatsApp",
  "Alamat Workshop": "Workshop Address",
  "Jam Operasional": "Operating Hours",
  "Chat via WhatsApp": "Chat via WhatsApp",

  // Build Inquiry Modal
  "Pengajuan Konsep & Konsultasi Bengkel": "Build Concept & Workshop Inquiry",
  "1. Pilih Basis Motor": "1. Select Motorcycle Base",
  "2. Pilih Paket Layanan": "2. Select Service Package",
  "3. Tambahan Pekerjaan (Opsional)": "3. Optional Add-Ons",
  "4. Status Part & Bodi": "4. Parts & Bodywork Status",
  "Part & bodi bawa sendiri": "Bringing own parts & body",
  "Minta dicarikan bengkel": "Request workshop to source parts",
  "Catatan Kondisi Motor (Opsional)": "Bike Condition Notes (Optional)",
  "Ringkasan Pengajuan Konsep": "Build Inquiry Summary",
  "Salin Format Konsultasi": "Copy Inquiry Text",
  "Format Tersalin": "Inquiry Copied",
  "Tanya Jadwal & Penawaran via WA": "Ask Schedule & Quote via WA",

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
