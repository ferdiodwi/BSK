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
  "Anatomi Presisi": "Frame Anatomy",
  "Paket & Biaya": "Packages & Pricing",
  "Galeri Unit": "Build Gallery",
  "Bengkel": "Workshop",
  "Hitung Estimasi": "Cost Estimator",
  "Menu": "Menu",
  "Buka menu navigasi": "Open navigation menu",
  "Tutup menu navigasi": "Close navigation menu",

  // Hero
  "Tata Body CB & Rangka Presisi": "CB Bodywork & Precision Frame Alignment",
  "Penataan tangki, jok, subframe, dan kelurusan kaki-kaki motor klasik maupun harian. Rapi di mata, lurus saat dikendarai.":
    "Precision tank fitting, seat alignment, subframe welding, and wheel geometry for classic CB and daily custom builds.",
  "Hitung Estimasi Biaya": "Calculate Estimate",
  "Lihat Detail Garapan": "View Build Gallery",
  "Motor Sebelumnya": "Previous Motorcycle",
  "Motor Berikutnya": "Next Motorcycle",
  "Mulai Dari": "Starting From",
  "Kategori": "Category",
  "Basis": "Platform",
  "Fokus": "Focus",

  // Anatomy
  "Anatomi Tata Body Presisi": "Precision Bodywork Anatomy",
  "Pilih titik pemeriksaan pada motor untuk melihat standar pengerjaan dan penyetelan BSK Custom.":
    "Select an inspection point on the motorcycle to view BSK Custom welding and alignment standards.",
  "Unit Inspeksi": "Inspection Unit",
  "Titik Pengecekan": "Inspection Points",
  "Standar Pengerjaan": "Workmanship Standard",

  // Packages & Gallery
  "ESTIMASI TRANSPARAN": "TRANSPARENT ESTIMATES",
  "Paket Tata Body & Jasa Bengkel": "Bodywork & Workshop Service Packages",
  "Biaya jasa dihitung transparan sesuai basis motor dan tingkat pengerjaan rangka. Persetujuan pemilik selalu diminta sebelum pengerjaan dimulai.":
    "Labor costs are calculated transparently based on frame platform and work scope. Owner approval is always confirmed before work begins.",
  "Buka Kalkulator Estimasi": "Open Cost Estimator",
  "Pilih & Hitung": "Select & Estimate",
  "Estimasi Pengerjaan": "Estimated Duration",
  "Fokus Bengkel": "Workshop Core",
  "Durasi pengerjaan 1 sampai 14 hari kerja bergantung antrean bengkel dan ketersediaan part.":
    "Turnaround takes 1 to 14 working days depending on workshop queue and parts availability.",
  "Paket Tata Body Standar": "Standard Bodywork Package",
  "Pemasangan set bodi lengkap: dudukan tangki, setting jok presisi, dudukan slebor depan dan belakang, serta begel.":
    "Complete body fitment: tank mounts, flush seat alignment, front and rear fenders, and grab rail setup.",
  "Paket Full Rangka & Senter Kaki": "Full Frame & Wheel Alignment",
  "Penyelarasan rangka total, bikin subframe pipa seamless baru, dudukan shock dobel simetris, dan senter as roda depan-belakang.":
    "Complete frame truing, seamless pipe subframe fabrication, symmetrical twin shock mounts, and front-rear axle centering.",
  "Paket Restorasi Komplit + Cat Oven": "Full Restoration + Oven Paint",
  "Bangun motor dari rangka dasar: tata body penuh, repaint oven 3 lapis rangka dan bodi, serta perakitan kabel bodi tersembunyi.":
    "Ground-up build: complete bodywork, 3-coat oven paint for frame and body, and hidden wiring loom assembly.",
  "Paket Tune-Up & Setting Harian / Herex": "Daily & Herex Engine Tune-Up",
  "Perawatan performa mesin dan kelistrikan: servis karburator atau throttle body, setel klep, cek pengapian, dan ganti oli.":
    "Engine and electrical service: carburetor or throttle body cleaning, valve clearance adjustment, ignition check, and oil change.",

  // Gallery
  "UNIT NYATA WORKSHOP": "REAL WORKSHOP BUILDS",
  "Galeri 5 Unit Garapan BSK": "BSK Custom 5 Build Showcase",
  "Lima contoh hasil penataan rangka dan full build dari studio BSK Custom. Klik unit untuk melihat spesifikasi ubahan lengkap.":
    "Five real frame alignment and full build examples from BSK Custom. Select any build to inspect its specifications.",
  "Semua": "All",
  "Tata Body Rangka": "Rolling Chassis",
  "Full Build": "Full Build",
  "Lihat Detail Spek": "Inspect Build Specs",
  "Tutup": "Close",
  "Tidak ada unit pada kategori ini.": "No builds match this filter.",
  "Tampilkan Semua Unit": "Show All Builds",

  // SOP & Workshop
  "INSPEKSI TEKNIS": "TECHNICAL INSPECTION",
  "KONSULTASI & LOKASI": "CONSULTATION & LOCATION",
  "Alur Kerja Bengkel": "Workshop Workflow",
  "Setiap unit melewati tahapan ukur sebelum las untuk menjamin kestabilan berkendara dan kerapian tampilan.":
    "Every motorcycle goes through measurement checks before welding to ensure straight tracking and clean body lines.",
  "01. Cek Rangka Awal": "01. Initial Frame Check",
  "Pemeriksaan kondisi leher komstir, lengan ayun, dan titik simetris rangka dasar.":
    "Inspecting steering neck geometry, swingarm alignment, and baseline frame symmetry.",
  "02. Penentuan Konsep": "02. Build Planning",
  "Pemilihan tangki, jok, dan jarak main suspensi serta persetujuan estimasi biaya.":
    "Selecting tank, seat, and suspension stance with transparent cost approval.",
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
  "Kirim foto kondisi motor saat ini atau pilih paket yang diinginkan lewat kalkulator estimasi sebelum datang ke bengkel.":
    "Send photos of your bike or pick your desired package via the cost estimator before visiting the shop.",
  "Konsultasi & Lokasi Workshop": "Consultation & Workshop Location",
  "Instagram Resmi": "Official Instagram",
  "WhatsApp Admin": "Admin WhatsApp",
  "Alamat Workshop": "Workshop Address",
  "Jam Operasional": "Operating Hours",
  "Chat via WhatsApp": "Chat via WhatsApp",

  // Modal
  "Kalkulator Estimasi Biaya Tata Body": "Bodywork Cost Estimator",
  "1. Pilih Basis Motor": "1. Select Motorcycle Base",
  "2. Pilih Paket Jasa": "2. Select Service Package",
  "3. Tambahan Pekerjaan (Opsional)": "3. Optional Add-Ons",
  "Total Estimasi Jasa": "Estimated Service Total",
  "Salin Ringkasan": "Copy Summary",
  "Ringkasan Tersalin": "Summary Copied",
  "Kirim ke WhatsApp": "Send via WhatsApp",
};

export function tr(key: string, locale: Locale): string {
  if (locale === "id") return key;
  return EN_MAP[key] ?? key;
}
