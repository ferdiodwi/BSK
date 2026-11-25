"use client";

import { useEffect, useRef, useState } from "react";
import { X, Check, Copy } from "lucide-react";
import { site } from "../content/site";
import { tr, useLocale } from "../lib/i18n";
import {
  activeElementRef,
  ariaLabelAttr,
  ariaModalAttrs,
  attachKeydown,
  buildEstimateSummaryText,
  buildWorkshopWhatsAppUrl,
  focusElement,
  formatIDR,
  isEscapeKey,
  lockDocumentScroll,
} from "../lib/helpers";
import { WhatsAppLogo } from "../ui/BrandLogos";

export type EstimatorBike = {
  id: string;
  name: string;
  desc: string;
  baseModifier: number;
};

export type EstimatorPackage = {
  id: string;
  name: string;
  desc: string;
  price: number;
};

export type EstimatorAddon = {
  id: string;
  name: string;
  price: number;
};

const BIKES: EstimatorBike[] = [
  { id: "cb-gelatik", name: "Honda CB Gelatik / 100", desc: "Setting tangki tipis & jok rata rangka", baseModifier: 0 },
  { id: "cb-dream", name: "Honda CB Dream / Twin", desc: "Setting bodi montok & subframe kekar", baseModifier: 50000 },
  { id: "gl-series", name: "Honda GL 100 / Pro / Max", desc: "Setting postur herex / restomod klasik", baseModifier: 50000 },
  { id: "megapro", name: "Megapro Hiu / Primus", desc: "Setting rangka belakang & dudukan shock dobel", baseModifier: 100000 },
  { id: "tiger", name: "Honda Tiger 2000 / Revo", desc: "Tata bodi total & penyesuaian dudukan mesin", baseModifier: 150000 },
];

const PACKAGES: EstimatorPackage[] = [
  {
    id: "standar",
    name: "Paket Tata Body Standar",
    desc: "Fitting dudukan tangki, jok ngepress rapi, slebor depan/belakang, begel",
    price: 450000,
  },
  {
    id: "full-rangka",
    name: "Paket Full Rangka & Senter Kaki",
    desc: "Bikin subframe baru, setting kemiringan shock, as roda center",
    price: 850000,
  },
  {
    id: "restorasi",
    name: "Paket Restorasi Komplit + Cat Oven",
    desc: "Tata bodi, repaint oven rangka & bodi, serta rakit kelistrikan rapi",
    price: 2200000,
  },
  {
    id: "tune-up",
    name: "Paket Tune-Up & Setting Herex",
    desc: "Servis karbu/injeksi, klep, pengapian, dan uji jalan",
    price: 350000,
  },
];

const ADDONS: EstimatorAddon[] = [
  { id: "repaint-rangka", name: "Repaint Rangka Oven Anti Gores", price: 450000 },
  { id: "custom-jok", name: "Jok Custom Busa Latex / Kulit Mbtech", price: 250000 },
  { id: "kabel-rapi", name: "Penyembunyian Kabel Bodi Rapi", price: 150000 },
  { id: "polish-mesin", name: "Poles Blok Mesin / Bak Kopling Kilap", price: 200000 },
];

export function ServiceEstimatorModal({
  isOpen,
  onClose,
  initialBikeId,
  initialPackageId,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialBikeId?: string;
  initialPackageId?: string;
}) {
  const locale = useLocale();
  const [selectedBike, setSelectedBike] = useState<string>(initialBikeId || BIKES[0].id);
  const [selectedPackage, setSelectedPackage] = useState<string>(initialPackageId || PACKAGES[1].id);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const activeBikeObj = BIKES.find((b) => b.id === selectedBike) ?? BIKES[0];
  const activePackageObj = PACKAGES.find((p) => p.id === selectedPackage) ?? PACKAGES[0];

  const totalEstimate =
    activePackageObj.price +
    activeBikeObj.baseModifier +
    selectedAddons.reduce((sum, addonId) => {
      const addon = ADDONS.find((a) => a.id === addonId);
      return sum + (addon ? addon.price : 0);
    }, 0);

  const selectedAddonsText =
    selectedAddons.length > 0
      ? selectedAddons.map((id) => ADDONS.find((a) => a.id === id)?.name).join(", ")
      : "Tanpa tambahan";

  const waHref = buildWorkshopWhatsAppUrl(
    site.contact.whatsapp_number,
    activeBikeObj.name,
    activePackageObj.name,
    selectedAddonsText,
    totalEstimate,
    locale
  );

  const handleCopySummary = async () => {
    const summary = buildEstimateSummaryText(
      activeBikeObj.name,
      activePackageObj.name,
      selectedAddonsText,
      totalEstimate,
      locale
    );
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard unavailable in insecure contexts
    }
  };

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (!isOpen) return;
    const previous = activeElementRef();
    const unlockScroll = lockDocumentScroll(true);
    focusElement(closeBtnRef.current);

    const detachKeys = attachKeydown((key) => {
      if (isEscapeKey(key)) onClose();
    });

    return () => {
      unlockScroll();
      detachKeys();
      focusElement(previous);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-xs sm:p-6"
      role="dialog"
      {...ariaModalAttrs("estimator-modal-title")}
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="bsk-dialog-in relative z-10 w-full max-w-[880px] overflow-hidden border border-black/15 bg-white text-[#111216] shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-black/10 bg-[#141518] px-6 py-4 text-white">
          <h3 id="estimator-modal-title" className="font-hero text-lg font-bold tracking-wider uppercase sm:text-xl">
            {tr("Kalkulator Estimasi Biaya Tata Body", locale)}
          </h3>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            {...ariaLabelAttr("Tutup modal estimasi")}
            className="flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors hover:bg-[#D62810]"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="max-h-[82vh] overflow-y-auto p-6">
          {/* 1. Bike Selector */}
          <fieldset>
            <legend className="font-mono text-xs font-bold tracking-wider text-[#D62810] uppercase">
              {tr("1. Pilih Basis Motor", locale)}
            </legend>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {BIKES.map((bike) => {
                const isSelected = selectedBike === bike.id;
                return (
                  <button
                    key={bike.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedBike(bike.id)}
                    className={`flex min-h-[56px] flex-col border p-3.5 text-left transition-colors ${
                      isSelected
                        ? "border-[#141518] bg-[#141518] text-white"
                        : "border-black/15 bg-[#F5F5F6] text-[#111216] hover:border-black/40"
                    }`}
                  >
                    <span className="font-hero text-sm font-bold uppercase">{bike.name}</span>
                    <span className={`mt-0.5 text-xs ${isSelected ? "text-[#D1D5DB]" : "text-[#4B5563]"}`}>
                      {bike.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* 2. Package Selector */}
          <fieldset className="mt-6">
            <legend className="font-mono text-xs font-bold tracking-wider text-[#D62810] uppercase">
              {tr("2. Pilih Paket Jasa", locale)}
            </legend>
            <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {PACKAGES.map((pkg) => {
                const isSelected = selectedPackage === pkg.id;
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`flex flex-col justify-between border p-4 text-left transition-colors ${
                      isSelected
                        ? "border-[#D62810] bg-[#D62810] text-white"
                        : "border-black/15 bg-[#F5F5F6] text-[#111216] hover:border-black/40"
                    }`}
                  >
                    <div>
                      <span className="font-hero text-sm font-bold uppercase">{pkg.name}</span>
                      <p className={`mt-1 text-xs leading-snug ${isSelected ? "text-white/90" : "text-[#4B5563]"}`}>
                        {pkg.desc}
                      </p>
                    </div>
                    <div className={`mt-3 font-hero text-base font-bold tabular-nums ${isSelected ? "text-[#FFE600]" : "text-[#D62810]"}`}>
                      {formatIDR(pkg.price)}
                    </div>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* 3. Optional Add-Ons */}
          <fieldset className="mt-6">
            <legend className="font-mono text-xs font-bold tracking-wider text-[#D62810] uppercase">
              {tr("3. Tambahan Pekerjaan (Opsional)", locale)}
            </legend>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {ADDONS.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    aria-pressed={isChecked}
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex min-h-[48px] items-center justify-between border p-3.5 text-left transition-colors ${
                      isChecked
                        ? "border-[#141518] bg-[#141518] text-white"
                        : "border-black/15 bg-white text-[#111216] hover:bg-[#F5F5F6]"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className={`flex h-4 w-4 shrink-0 items-center justify-center border ${
                          isChecked
                            ? "border-[#FFE600] bg-[#FFE600] text-[#111216]"
                            : "border-black/30 bg-white"
                        }`}
                      >
                        {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                      </span>
                      <span className="text-xs font-semibold">{addon.name}</span>
                    </span>
                    <span className={`font-hero text-xs font-bold tabular-nums ${isChecked ? "text-[#FFE600]" : "text-[#111216]"}`}>
                      +{formatIDR(addon.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Estimate Output & Actions */}
          <div className="mt-8 border border-black/15 bg-[#141518] p-5 text-white">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <span className="font-mono text-xs text-[#D1D5DB] uppercase">
                  {tr("Total Estimasi Jasa", locale)}
                </span>
                <div className="mt-1 font-hero text-3xl font-bold text-[#FFE600] tabular-nums">
                  {formatIDR(totalEstimate)}
                </div>
                {site.contact.whatsapp_is_placeholder && (
                  <p className="mt-1 font-mono text-[11px] text-[#9CA3AF]">
                    Catatan: Nomor WA admin masih placeholder di site.ts.
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 border border-white/25 bg-transparent px-4 py-3 font-hero text-xs font-bold tracking-wider text-white uppercase transition-colors hover:border-[#FFE600] hover:text-[#FFE600]"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" aria-hidden="true" />
                      <span>{tr("Ringkasan Tersalin", locale)}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" aria-hidden="true" />
                      <span>{tr("Salin Ringkasan", locale)}</span>
                    </>
                  )}
                </button>

                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 bg-[#047857] px-6 py-3 font-hero text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#065F46]"
                >
                  <WhatsAppLogo className="h-4 w-4" aria-hidden="true" />
                  <span>{tr("Kirim ke WhatsApp", locale)}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
