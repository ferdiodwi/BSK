"use client";

import { useEffect, useRef, useState } from "react";
import { X, Check, Calculator, ArrowRight } from "lucide-react";
import { useLocale } from "../lib/i18n";
import {
  activeElementRef,
  ariaLabelAttr,
  ariaModalAttrs,
  attachKeydown,
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
  { id: "tiger", name: "Honda Tiger 2000 / Revo", desc: "Tata bodi total & penyesuaian dudukan mesin/knalpot", baseModifier: 150000 },
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
    desc: "Bikin subframe baru, setting kemiringan shock, as roda center 100%",
    price: 850000,
  },
  {
    id: "restorasi",
    name: "Paket Restorasi Komplit + Cat",
    desc: "Tata bodi + repaint oven rangka & bodi + rakit kelistrikan rapi",
    price: 2200000,
  },
  {
    id: "tune-up",
    name: "Paket Tune-Up & Setting Herex",
    desc: "Servis karbu/injeksi, klep, pengapian, dan balancing getaran mesin",
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
  initialPackageId,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialPackageId?: string;
}) {
  const locale = useLocale();
  const [selectedBike, setSelectedBike] = useState<string>(BIKES[0].id);
  const [selectedPackage, setSelectedPackage] = useState<string>(initialPackageId || PACKAGES[1].id);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
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
      : "Tanpa Add-on Tambahan";

  const waHref = buildWorkshopWhatsAppUrl(
    "6285159506662",
    activeBikeObj.name,
    activePackageObj.name,
    selectedAddonsText,
    totalEstimate,
    locale
  );

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-6"
      role="dialog"
      {...ariaModalAttrs("estimator-modal-title")}
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="bsk-dialog-in relative z-10 w-full max-w-[880px] overflow-hidden rounded-3xl border border-white/10 bg-[#12141C] text-white shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#181B26] px-6 py-4">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-[#E51919]" />
            <h3 id="estimator-modal-title" className="font-hero text-lg font-bold text-white uppercase tracking-wider">
              Kalkulator Estimasi Biaya Tata Body
            </h3>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            {...ariaLabelAttr("Tutup modal estimasi")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-gray-300 transition-colors hover:bg-[#E51919] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="max-h-[80vh] overflow-y-auto p-6">
          {/* Step 1: Pilih Basis Motor */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#FFE600]">
              1. Pilih Basis Motor Anda
            </label>
            <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {BIKES.map((bike) => (
                <button
                  key={bike.id}
                  type="button"
                  onClick={() => setSelectedBike(bike.id)}
                  className={`flex flex-col rounded-xl p-3 text-left transition-all ${
                    selectedBike === bike.id
                      ? "border border-[#E51919] bg-[#E51919]/15 shadow-[0_0_15px_rgba(229,25,25,0.25)]"
                      : "border border-white/5 bg-[#181B26] hover:border-white/20"
                  }`}
                >
                  <span className="font-hero text-sm font-bold text-white">{bike.name}</span>
                  <span className="mt-0.5 text-xs text-gray-400">{bike.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Pilih Paket Jasa */}
          <div className="mt-6">
            <label className="text-xs font-bold uppercase tracking-wider text-[#FFE600]">
              2. Pilih Paket Tata Body / Jasa
            </label>
            <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {PACKAGES.map((pkg) => (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`flex flex-col justify-between rounded-xl p-3.5 text-left transition-all ${
                    selectedPackage === pkg.id
                      ? "border border-[#E51919] bg-[#E51919]/15 shadow-[0_0_15px_rgba(229,25,25,0.25)]"
                      : "border border-white/5 bg-[#181B26] hover:border-white/20"
                  }`}
                >
                  <div>
                    <span className="font-hero text-sm font-bold text-white">{pkg.name}</span>
                    <p className="mt-1 text-xs text-gray-400 leading-snug">{pkg.desc}</p>
                  </div>
                  <div className="mt-3 font-hero text-sm font-bold text-[#E51919]">
                    {formatIDR(pkg.price)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Pilih Add-On Tambahan */}
          <div className="mt-6">
            <label className="text-xs font-bold uppercase tracking-wider text-[#FFE600]">
              3. Opsi Tambahan / Finishing (Opsional)
            </label>
            <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {ADDONS.map((addon) => {
                const isChecked = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    className={`flex items-center justify-between rounded-xl p-3 text-left transition-all ${
                      isChecked
                        ? "border border-[#FFE600] bg-[#FFE600]/10"
                        : "border border-white/5 bg-[#181B26] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-4 w-4 items-center justify-center rounded border ${
                          isChecked
                            ? "border-[#FFE600] bg-[#FFE600] text-black"
                            : "border-white/30"
                        }`}
                      >
                        {isChecked && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-semibold text-gray-200">{addon.name}</span>
                    </div>
                    <span className="font-hero text-xs font-bold text-gray-300">
                      +{formatIDR(addon.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Estimate Summary & Direct WhatsApp Action */}
          <div className="mt-8 rounded-2xl border border-[#E51919]/40 bg-gradient-to-r from-[#1B1E2B] to-[#141620] p-5">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <span className="text-xs font-semibold text-gray-400">Total Estimasi Biaya</span>
                <div className="font-hero text-3xl font-extrabold text-[#FFE600]">
                  {formatIDR(totalEstimate)}
                </div>
                <span className="text-[11px] text-gray-400">
                  *Estimasi transparan, tidak ada biaya siluman saat pengerjaan.
                </span>
              </div>

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] px-6 py-3.5 font-hero text-sm font-bold tracking-wider text-white uppercase shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all hover:scale-103 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
              >
                <WhatsAppLogo className="h-4 w-4" />
                <span>BOOKING VIA WHATSAPP</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
