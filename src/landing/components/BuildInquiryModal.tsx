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
  buildBuildInquiryText,
  buildWorkshopWhatsAppUrl,
  focusElement,
  isEscapeKey,
  lockDocumentScroll,
} from "../lib/helpers";
import { WhatsAppLogo } from "../ui/BrandLogos";

export type InquiryBike = {
  id: string;
  name: string;
  desc: string;
};

export type InquiryPackage = {
  id: string;
  name: string;
  desc: string;
};

export type InquiryAddon = {
  id: string;
  name: string;
};

const BIKES: InquiryBike[] = [
  { id: "cb-gelatik", name: "Honda CB Gelatik / 100", desc: "Setting tangki tipis & jok rata rangka" },
  { id: "cb-dream", name: "Honda CB Dream / Twin", desc: "Setting bodi montok & subframe kekar" },
  { id: "gl-series", name: "Honda GL 100 / Pro / Max", desc: "Setting postur herex / restomod klasik" },
  { id: "megapro", name: "Megapro Hiu / Primus", desc: "Setting rangka belakang & dudukan shock dobel" },
  { id: "tiger", name: "Honda Tiger 2000 / Revo", desc: "Tata bodi total & penyesuaian dudukan mesin" },
];

const PACKAGES: InquiryPackage[] = [
  {
    id: "full-rangka",
    name: "Custom Rangka & Subframe",
    desc: "Potong-sambung subframe pipa seamless, las dudukan shock, dan senter komstir",
  },
  {
    id: "standar",
    name: "Tata Body & Fitting",
    desc: "Fitting dudukan tangki rata, jok slim presisi, slebor depan/belakang, dan begel",
  },
  {
    id: "kaki-kaki",
    name: "Rolling Chassis & Kaki-Kaki",
    desc: "Setel swingarm, dudukan cakram, kemiringan shock, dan senter jalur rantai serta as roda",
  },
  {
    id: "mesin",
    name: "Garap Mesin, Tune-Up & Herex",
    desc: "Servis mesin, korek harian/touring, setting klep, serta karburator atau throttle body",
  },
  {
    id: "kelistrikan",
    name: "Kelistrikan & Pengapian",
    desc: "Perapihan kabel bodi tersembunyi, cek pengapian, kiprok, dan instalasi lampu",
  },
  {
    id: "mentahan",
    name: "Rakitan Mentahan & Unit Utuh",
    desc: "Perakitan motor dari rangka dasar, penataan braket, dudukan mesin, dan pengecekan mekanis",
  },
];

const ADDONS: InquiryAddon[] = [
  { id: "subframe-seamless", name: "Las Subframe Pipa Seamless" },
  { id: "custom-jok", name: "Jok Custom Busa Latex / Kulit Mbtech" },
  { id: "kabel-rapi", name: "Penyembunyian Kabel Bodi Rapi" },
  { id: "polish-mesin", name: "Poles Blok Mesin / Bak Kopling Kilap" },
];

const PARTS_OPTIONS = [
  "Part & bodi bawa sendiri",
  "Minta dicarikan bengkel",
] as const;

export function BuildInquiryModal({
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
  const [selectedPackage, setSelectedPackage] = useState<string>(initialPackageId || PACKAGES[0].id);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [partsStatus, setPartsStatus] = useState<string>(PARTS_OPTIONS[0]);
  const [notes, setNotes] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const activeBikeObj = BIKES.find((b) => b.id === selectedBike) ?? BIKES[0];
  const activePackageObj = PACKAGES.find((p) => p.id === selectedPackage) ?? PACKAGES[0];

  const selectedAddonsText =
    selectedAddons.length > 0
      ? selectedAddons.map((id) => ADDONS.find((a) => a.id === id)?.name).join(", ")
      : "Tidak ada tambahan";

  const translatedPartsStatus = tr(partsStatus, locale);

  const waHref = buildWorkshopWhatsAppUrl(
    site.contact.whatsapp_number,
    activeBikeObj.name,
    activePackageObj.name,
    selectedAddonsText,
    translatedPartsStatus,
    notes,
    locale
  );

  const handleCopySummary = async () => {
    const summary = buildBuildInquiryText(
      activeBikeObj.name,
      activePackageObj.name,
      selectedAddonsText,
      translatedPartsStatus,
      notes,
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
      {...ariaModalAttrs("inquiry-modal-title")}
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="bsk-dialog-in relative z-10 w-full max-w-[880px] overflow-hidden border border-black/15 bg-white text-[#111216] shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-black/10 bg-[#141518] px-6 py-4 text-white">
          <h3 id="inquiry-modal-title" className="font-hero text-lg font-bold tracking-wider uppercase sm:text-xl">
            {tr("Pengajuan Konsep & Konsultasi Bengkel", locale)}
          </h3>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            {...ariaLabelAttr("Tutup formulir pengajuan konsep")}
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
              {tr("2. Pilih Paket Layanan", locale)}
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
                      <span className="font-hero text-sm font-bold uppercase">{tr(pkg.name, locale)}</span>
                      <p className={`mt-1 text-xs leading-snug ${isSelected ? "text-white/90" : "text-[#4B5563]"}`}>
                        {pkg.desc}
                      </p>
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
                    className={`flex min-h-[48px] items-center gap-2.5 border p-3.5 text-left transition-colors ${
                      isChecked
                        ? "border-[#141518] bg-[#141518] text-white"
                        : "border-black/15 bg-white text-[#111216] hover:bg-[#F5F5F6]"
                    }`}
                  >
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
                    <span className="text-xs font-semibold">{tr(addon.name, locale)}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* 4. Parts Availability Status */}
          <fieldset className="mt-6">
            <legend className="font-mono text-xs font-bold tracking-wider text-[#D62810] uppercase">
              {tr("4. Status Part & Bodi", locale)}
            </legend>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {PARTS_OPTIONS.map((opt) => {
                const isSelected = partsStatus === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setPartsStatus(opt)}
                    className={`flex min-h-[48px] items-center border px-4 py-3 text-left text-xs font-bold transition-colors ${
                      isSelected
                        ? "border-[#141518] bg-[#141518] text-white"
                        : "border-black/15 bg-[#F5F5F6] text-[#111216] hover:border-black/40"
                    }`}
                  >
                    {tr(opt, locale)}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Optional Condition Notes with Explicit Label */}
          <div className="mt-6">
            <label
              htmlFor="motor-condition-notes"
              className="block font-mono text-xs font-bold tracking-wider text-[#D62810] uppercase"
            >
              {tr("Catatan Kondisi Motor (Opsional)", locale)}
            </label>
            <textarea
              id="motor-condition-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={tr("Contoh: Rangka bekas las lama, tangki bawa sendiri, butuh setel komstir.", locale)}
              className="mt-2 w-full border border-black/20 bg-[#F5F5F6] p-3 text-xs text-[#111216] placeholder:text-[#6B7280] focus:border-[#D62810] focus:bg-white focus:outline-none"
            />
          </div>

          {/* Summary Brief & WhatsApp Routing (No Pricing Shown) */}
          <div className="mt-8 border border-black/15 bg-[#141518] p-5 text-white">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div className="space-y-1">
                <span className="font-mono text-xs font-bold text-[#FFE600] uppercase">
                  {tr("Ringkasan Pengajuan Konsep", locale)}
                </span>
                <div className="font-hero text-lg font-bold text-white uppercase">
                  {activeBikeObj.name} · {tr(activePackageObj.name, locale)}
                </div>
                <p className="font-mono text-xs text-[#D1D5DB]">
                  {translatedPartsStatus}
                </p>
                {site.contact.whatsapp_is_placeholder && (
                  <p className="pt-1 font-mono text-[11px] text-[#9CA3AF]">
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
                      <span>{tr("Format Tersalin", locale)}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" aria-hidden="true" />
                      <span>{tr("Salin Format Konsultasi", locale)}</span>
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
                  <span>{tr("Tanya Jadwal & Penawaran via WA", locale)}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
