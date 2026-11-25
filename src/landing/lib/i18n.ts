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
        // Ignore storage errors in restricted contexts
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
  "Layanan": "Services",
  "Proses": "Process",
  "Galeri": "Gallery",
  "Keunggulan": "Why Us",
  "Estimasi": "Estimator",
  "Testimoni": "Reviews",
  "Lokasi": "Location",
  "Konsultasi": "Consultation",
  "Menu": "Menu",
  "Buka menu navigasi": "Open navigation menu",
  "Tutup menu navigasi": "Close navigation menu",

  // Common CTA
  "Booking Slot": "Book a Slot",
  "Konsultasi WhatsApp": "WhatsApp Consultation",
  "Lihat Semua Paket": "Explore Packages",
  "Hitung Estimasi Biaya": "Calculate Cost Estimate",
};

export function tr(key: string, locale: Locale): string {
  if (locale === "id") return key;
  return EN_MAP[key] ?? key;
}
