"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BSK_BIKES } from "../content/site";
import { bind } from "../lib/bind";
import { tr, useLocale } from "../lib/i18n";
import { formatIDR, heroEnterAttr, type SectionComponentProps } from "../lib/helpers";

export function Hero({ block, onOpenEstimator }: SectionComponentProps) {
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const bikeLayerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  const bikes = BSK_BIKES;
  const activeBike = bikes[activeIndex] ?? bikes[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? bikes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % bikes.length);
  };

  // Mouse parallax depth for the motorcycle cutout against giant background type (desktop pointer only)
  useEffect(() => {
    const stage = stageRef.current;
    const bikeEl = bikeLayerRef.current;
    const watermarkEl = watermarkRef.current;
    if (!stage || !bikeEl || !watermarkEl || typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (prefersReduced || !isFinePointer) return;

    const moveBikeX = gsap.quickTo(bikeEl, "x", { duration: 0.45, ease: "power2.out" });
    const moveBikeY = gsap.quickTo(bikeEl, "y", { duration: 0.45, ease: "power2.out" });
    const moveTextX = gsap.quickTo(watermarkEl, "x", { duration: 0.6, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      moveBikeX(nx * 18);
      moveBikeY(ny * 10);
      moveTextX(-nx * 14);
    };

    const onMouseLeave = () => {
      moveBikeX(0);
      moveBikeY(0);
      moveTextX(0);
    };

    stage.addEventListener("mousemove", onMouseMove);
    stage.addEventListener("mouseleave", onMouseLeave);
    return () => {
      stage.removeEventListener("mousemove", onMouseMove);
      stage.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const stepDisplay = `0${activeIndex + 1} / 0${bikes.length}`;

  return (
    <section
      id="hero"
      className="relative overflow-hidden border-b border-black/10 bg-[#F5F5F6] text-[#111216]"
    >
      {/* Split racing orange-red architectural block behind right stage on large screens */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 hidden h-full w-[34%] bg-[#D62810] lg:block"
      />

      <div className="relative z-10 mx-auto max-w-[1400px] border-x border-black/10">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Editorial Info Column */}
          <div className="flex flex-col justify-between px-5 pt-10 pb-8 sm:px-8 lg:col-span-5 lg:px-10 lg:py-14">
            <div>
              {/* Numeric Index & Category */}
              <div {...heroEnterAttr(0)} className="flex items-center justify-between border-b border-black/10 pb-4">
                <span className="font-mono text-xs font-bold tracking-widest text-[#D62810]">
                  {stepDisplay}
                </span>
                <span className="font-mono text-xs font-semibold tracking-wider text-[#4B5563] uppercase">
                  {locale === "en" ? activeBike.categoryLabelEn : activeBike.categoryLabel}
                </span>
              </div>

              {/* Single H1 for document semantics */}
              <h1
                {...heroEnterAttr(0.08)}
                className="mt-6 font-hero text-[clamp(2.25rem,4.4vw,3.8rem)] font-bold leading-[0.98] tracking-tight text-[#111216] uppercase"
              >
                {tr(bind(block, "title", "Tata Body CB & Rangka Presisi"), locale)}
              </h1>

              {/* Active Bike Name Highlight */}
              <p
                {...heroEnterAttr(0.14)}
                className="mt-3 font-hero text-xl font-bold tracking-wide text-[#D62810] uppercase sm:text-2xl"
              >
                {activeBike.name}
              </p>

              <p
                {...heroEnterAttr(0.18)}
                className="mt-4 max-w-md text-sm leading-relaxed text-[#4B5563] sm:text-base"
              >
                {tr(
                  bind(
                    block,
                    "description",
                    "Penataan tangki, jok, subframe, dan kelurusan kaki-kaki motor klasik maupun harian. Rapi di mata, lurus saat dikendarai."
                  ),
                  locale
                )}
              </p>

              {/* Active Bike Key Specs Table */}
              <dl {...heroEnterAttr(0.24)} className="mt-6 space-y-3 border-t border-black/10 pt-5 text-xs sm:text-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-mono font-semibold text-[#4B5563] uppercase">{tr("Basis", locale)}</dt>
                  <dd className="text-right font-semibold text-[#111216]">{activeBike.platform}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <dt className="font-mono font-semibold text-[#4B5563] uppercase">{tr("Mulai Dari", locale)}</dt>
                  <dd className="text-right font-hero text-lg font-bold text-[#D62810] tabular-nums">
                    {formatIDR(activeBike.basePrice)}
                  </dd>
                </div>
                <div className="border-t border-black/5 pt-2.5">
                  <dt className="font-mono text-[11px] font-semibold text-[#4B5563] uppercase">
                    {tr("Fokus", locale)}
                  </dt>
                  <dd className="mt-1 text-xs leading-relaxed text-[#111216]">
                    {locale === "en" ? activeBike.focusEn : activeBike.focus}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Primary & Secondary CTAs */}
            <div {...heroEnterAttr(0.3)} className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenEstimator?.({ bikeId: activeBike.estimatorBikeId })}
                className="inline-flex min-h-[48px] items-center justify-center bg-[#D62810] px-6 py-3 font-hero text-sm font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#C41E0A] active:scale-[0.98]"
              >
                {tr(bind(block, "extra.primary_cta_label", "Hitung Estimasi Biaya"), locale)}
              </button>

              <a
                href="#galeri"
                className="inline-flex min-h-[48px] items-center justify-center border border-black/20 bg-white px-6 py-3 font-hero text-sm font-bold tracking-wider text-[#111216] uppercase transition-colors hover:border-[#111216] hover:bg-[#111216] hover:text-white"
              >
                {tr(bind(block, "extra.secondary_cta_label", "Lihat Detail Garapan"), locale)}
              </a>
            </div>
          </div>

          {/* Right Motorcycle Showcase Stage (KTM layered typography + PNG cutout) */}
          <div
            ref={stageRef}
            className="relative flex min-h-[360px] flex-col items-center justify-center overflow-hidden px-4 py-8 sm:min-h-[460px] lg:col-span-7 lg:min-h-[580px] lg:px-8"
          >
            {/* Solid accent block behind bike on mobile/tablet so split motif remains consistent */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 right-0 h-full w-[38%] bg-[#D62810] lg:hidden"
            />

            {/* Giant Background Watermark Typography */}
            <div
              ref={watermarkRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
            >
              <span className="font-hero text-[clamp(4.8rem,15vw,11.5rem)] font-bold tracking-tighter text-[#111216]/[0.09] uppercase whitespace-nowrap">
                {activeBike.watermark}
              </span>
            </div>

            {/* Active Bike Cutout Image (Hero LCP image: no lazy, fetchPriority=high) */}
            <div ref={bikeLayerRef} className="relative z-10 w-full max-w-[600px]">
              <div key={activeBike.id} className="bsk-bike-swap relative flex flex-col items-center">
                <img
                  src={activeBike.imageUrl}
                  alt={`${activeBike.name} - ${activeBike.categoryLabel}`}
                  width={2048}
                  height={2048}
                  fetchPriority="high"
                  decoding="async"
                  className="h-auto max-h-[320px] w-full object-contain drop-shadow-[0_18px_20px_rgba(17,18,22,0.28)] sm:max-h-[410px] lg:max-h-[470px]"
                />
                {/* Ground contact shadow */}
                <div
                  aria-hidden="true"
                  className="-mt-3 h-4 w-[68%] rounded-full bg-black/25 blur-md"
                />
              </div>
            </div>

            {/* Floating Step Control Arrows on Stage */}
            <div className="relative z-20 mt-4 flex w-full items-center justify-between lg:px-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label={tr("Motor Sebelumnya", locale)}
                  className="flex h-11 w-11 items-center justify-center border border-black/20 bg-white text-[#111216] transition-colors hover:border-[#111216] hover:bg-[#111216] hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label={tr("Motor Berikutnya", locale)}
                  className="flex h-11 w-11 items-center justify-center border border-black/20 bg-white text-[#111216] transition-colors hover:border-[#111216] hover:bg-[#111216] hover:text-white"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <span className="bg-[#141518] px-3 py-1.5 font-mono text-[11px] font-semibold text-white">
                {locale === "en" ? activeBike.finishingEn : activeBike.finishing}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Thumbnail Selector Bar (KTM Panel 1 & 4 style) */}
        <div className="border-t border-black/10 bg-white">
          <div
            role="tablist"
            aria-label="Pilih unit motor BSK Custom"
            className="grid grid-cols-2 divide-x divide-y divide-black/10 sm:grid-cols-5 sm:divide-y-0"
          >
            {bikes.map((bike, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={bike.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveIndex(idx)}
                  className={`group flex min-h-[72px] items-center gap-3 px-4 py-3 text-left transition-colors ${
                    isSelected
                      ? "bg-[#141518] text-white"
                      : "bg-white text-[#111216] hover:bg-[#F5F5F6]"
                  }`}
                >
                  <img
                    src={bike.imageUrl}
                    alt=""
                    aria-hidden="true"
                    width={2048}
                    height={2048}
                    loading="eager"
                    className="h-11 w-14 shrink-0 object-contain transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="min-w-0">
                    <span
                      className={`block font-mono text-[10px] font-bold ${
                        isSelected ? "text-[#FFE600]" : "text-[#D62810]"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span className="block truncate font-hero text-xs font-bold tracking-wide uppercase sm:text-sm">
                      {bike.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
