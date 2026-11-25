"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { BSK_BIKES, type BikeSpec } from "../content/site";
import { bind } from "../lib/bind";
import { tr, useLocale } from "../lib/i18n";
import {
  activeElementRef,
  ariaLabelAttr,
  ariaModalAttrs,
  attachKeydown,
  focusElement,
  imgPerfProps,
  isEscapeKey,
  lockDocumentScroll,
  revealUp,
  type SectionComponentProps,
} from "../lib/helpers";

type FilterCategory = "Semua" | "Tata Body Rangka" | "Full Build";

export function ShowcaseGallery({ block, onOpenInquiry }: SectionComponentProps) {
  const locale = useLocale();
  const [filter, setFilter] = useState<FilterCategory>("Semua");
  const [inspectedBike, setInspectedBike] = useState<BikeSpec | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const filteredBikes =
    filter === "Semua"
      ? BSK_BIKES
      : BSK_BIKES.filter((bike) => bike.category === filter);

  useEffect(() => {
    if (!inspectedBike) return;
    const previous = activeElementRef();
    const unlockScroll = lockDocumentScroll(true);
    focusElement(closeBtnRef.current);

    const detachKeys = attachKeydown((key) => {
      if (isEscapeKey(key)) setInspectedBike(null);
    });

    return () => {
      unlockScroll();
      detachKeys();
      focusElement(previous);
    };
  }, [inspectedBike]);

  const filterOptions: Array<{ key: FilterCategory; label: string; count: number }> = [
    { key: "Semua", label: tr("Semua", locale), count: BSK_BIKES.length },
    {
      key: "Tata Body Rangka",
      label: tr("Tata Body Rangka", locale),
      count: BSK_BIKES.filter((b) => b.category === "Tata Body Rangka").length,
    },
    {
      key: "Full Build",
      label: tr("Full Build", locale),
      count: BSK_BIKES.filter((b) => b.category === "Full Build").length,
    },
  ];

  return (
    <section
      id="galeri"
      className="border-b border-black/10 bg-[#F5F5F6] text-[#111216]"
    >
      <div className="mx-auto max-w-[1400px] border-x border-black/10 px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        {/* Header + Filter Controls */}
        <div
          {...revealUp(0)}
          className="flex flex-col justify-between gap-6 border-b border-black/10 pb-8 lg:flex-row lg:items-end"
        >
          <div>
            <span className="font-mono text-xs font-bold tracking-widest text-[#D62810] uppercase">
              {tr(bind(block, "subtitle", "UNIT NYATA WORKSHOP"), locale)}
            </span>
            <h2 className="mt-2 font-hero text-3xl font-bold tracking-tight text-[#111216] uppercase sm:text-4xl lg:text-5xl">
              {tr(bind(block, "title", "Galeri 5 Unit Garapan BSK"), locale)}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#4B5563]">
              {tr(
                bind(
                  block,
                  "description",
                  "Lima contoh hasil penataan rangka dan full build dari studio BSK Custom. Klik unit untuk melihat spesifikasi ubahan lengkap."
                ),
                locale
              )}
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter kategori garapan motor"
            className="flex flex-wrap gap-2"
          >
            {filterOptions.map((opt) => {
              const isSelected = filter === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setFilter(opt.key)}
                  className={`inline-flex min-h-[44px] items-center gap-2 border px-4 py-2 text-xs font-bold uppercase transition-colors ${
                    isSelected
                      ? "border-[#141518] bg-[#141518] text-white"
                      : "border-black/15 bg-white text-[#111216] hover:border-[#111216]"
                  }`}
                >
                  <span>{opt.label}</span>
                  <span
                    className={`font-mono text-[11px] ${
                      isSelected ? "text-[#FFE600]" : "text-[#4B5563]"
                    }`}
                  >
                    ({opt.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Builds Grid or Explicit Empty State */}
        {filteredBikes.length === 0 ? (
          <div className="mt-10 border border-black/10 bg-white p-12 text-center">
            <p className="text-sm font-semibold text-[#4B5563]">
              {tr("Tidak ada unit pada kategori ini.", locale)}
            </p>
            <button
              type="button"
              onClick={() => setFilter("Semua")}
              className="mt-4 inline-flex min-h-[44px] items-center bg-[#D62810] px-5 py-2 text-xs font-bold text-white uppercase"
            >
              {tr("Tampilkan Semua Unit", locale)}
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBikes.map((bike, idx) => (
              <article
                key={bike.id}
                {...revealUp(Number((idx * 0.05).toFixed(2)))}
                className={`group flex flex-col justify-between border border-black/10 bg-white transition-colors hover:border-[#111216] ${
                  idx === 0 && filter === "Semua" ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div>
                  <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F5F5F6] p-5">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute font-hero text-6xl font-bold tracking-tight text-[#111216]/[0.06] uppercase select-none sm:text-7xl"
                    >
                      {bike.watermark}
                    </span>
                    <img
                      src={bike.imageUrl}
                      alt={`${bike.name} - ${bike.categoryLabel}`}
                      width={2048}
                      height={2048}
                      {...imgPerfProps()}
                      className="relative z-10 h-full max-h-[250px] w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <span className="absolute top-3 left-3 z-20 bg-[#141518] px-2.5 py-1 font-mono text-[10px] font-bold tracking-wider text-white uppercase">
                      {locale === "en" ? bike.categoryLabelEn : bike.categoryLabel}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-hero text-xl font-bold text-[#111216] uppercase sm:text-2xl">
                        {bike.name}
                      </h3>
                      <span className="shrink-0 font-mono text-xs font-bold text-[#D62810] uppercase">
                        0{idx + 1}
                      </span>
                    </div>

                    <p className="mt-2 font-mono text-xs font-semibold text-[#4B5563]">
                      {bike.platform}
                    </p>
                    <p className="mt-2.5 text-sm leading-relaxed text-[#4B5563]">
                      {locale === "en" ? bike.focusEn : bike.focus}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-black/10 px-6 py-4">
                  <button
                    type="button"
                    onClick={() => setInspectedBike(bike)}
                    className="min-h-[44px] text-xs font-bold tracking-wider text-[#111216] uppercase underline-offset-4 hover:text-[#D62810] hover:underline"
                  >
                    {tr("Lihat Detail Spek", locale)}
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenInquiry?.({ bikeId: bike.inquiryBikeId })}
                    className="inline-flex min-h-[44px] items-center bg-[#141518] px-4 py-2 font-hero text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#D62810]"
                  >
                    {tr("Konsultasi Konsep Ini", locale)}
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Build Case-Study Modal (no prices) */}
      {inspectedBike && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
          role="dialog"
          {...ariaModalAttrs("build-spec-modal-title")}
        >
          <div className="fixed inset-0" onClick={() => setInspectedBike(null)} aria-hidden="true" />
          <div className="bsk-dialog-in relative z-10 w-full max-w-[760px] border border-black/15 bg-white text-[#111216] shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 bg-[#141518] px-6 py-4 text-white">
              <div>
                <span className="font-mono text-[10px] font-bold tracking-wider text-[#FFE600] uppercase">
                  {locale === "en" ? inspectedBike.categoryLabelEn : inspectedBike.categoryLabel}
                </span>
                <h3 id="build-spec-modal-title" className="font-hero text-xl font-bold uppercase">
                  {inspectedBike.name}
                </h3>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setInspectedBike(null)}
                {...ariaLabelAttr("Tutup detail garapan")}
                className="flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors hover:bg-[#D62810]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="max-h-[80vh] overflow-y-auto p-6">
              <div className="flex items-center justify-center bg-[#F5F5F6] p-6">
                <img
                  src={inspectedBike.imageUrl}
                  alt={inspectedBike.name}
                  width={2048}
                  height={2048}
                  className="max-h-[280px] w-auto object-contain"
                />
              </div>

              <dl className="mt-6 space-y-3 border-t border-black/10 pt-5 text-sm">
                <div className="flex justify-between gap-4 border-b border-black/5 pb-2">
                  <dt className="font-mono text-xs font-bold text-[#4B5563] uppercase">
                    {tr("Basis", locale)}
                  </dt>
                  <dd className="font-semibold text-[#111216]">{inspectedBike.platform}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-black/5 pb-2">
                  <dt className="font-mono text-xs font-bold text-[#4B5563] uppercase">
                    {tr("Aliran", locale)}
                  </dt>
                  <dd className="font-hero text-sm font-bold text-[#D62810] uppercase">
                    {locale === "en" ? inspectedBike.categoryLabelEn : inspectedBike.categoryLabel}
                  </dd>
                </div>
                <div className="border-b border-black/5 pb-2">
                  <dt className="font-mono text-xs font-bold text-[#4B5563] uppercase">
                    {tr("Fokus", locale)}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[#111216]">
                    {locale === "en" ? inspectedBike.focusEn : inspectedBike.focus}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs font-bold text-[#4B5563] uppercase">
                    Finishing
                  </dt>
                  <dd className="mt-1 text-sm text-[#111216]">
                    {locale === "en" ? inspectedBike.finishingEn : inspectedBike.finishing}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-black/10 pt-5">
                <button
                  type="button"
                  onClick={() => setInspectedBike(null)}
                  className="min-h-[44px] border border-black/20 px-5 py-2 text-xs font-bold text-[#111216] uppercase hover:bg-[#F5F5F6]"
                >
                  {tr("Tutup", locale)}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const targetBike = inspectedBike.inquiryBikeId;
                    setInspectedBike(null);
                    onOpenInquiry?.({ bikeId: targetBike });
                  }}
                  className="min-h-[44px] bg-[#D62810] px-6 py-2 font-hero text-xs font-bold tracking-wider text-white uppercase hover:bg-[#C41E0A]"
                >
                  {tr("Konsultasi Konsep Ini", locale)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
