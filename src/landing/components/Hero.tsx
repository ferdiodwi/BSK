"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BSK_BIKES } from "../content/site";
import { bind } from "../lib/bind";
import { tr, useLocale } from "../lib/i18n";
import { heroEnterAttr, type SectionComponentProps } from "../lib/helpers";

export function Hero({ block, onOpenInquiry }: SectionComponentProps) {
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const bikeLayerRef = useRef<HTMLDivElement>(null);
  const titleLayerRef = useRef<HTMLHeadingElement>(null);

  const bikes = BSK_BIKES;
  const activeBike = bikes[activeIndex] ?? bikes[0];
  const prevIndex = activeIndex === 0 ? bikes.length - 1 : activeIndex - 1;
  const nextIndex = (activeIndex + 1) % bikes.length;
  const prevBike = bikes[prevIndex];
  const nextBike = bikes[nextIndex];

  const handlePrev = () => setActiveIndex(prevIndex);
  const handleNext = () => setActiveIndex(nextIndex);

  useEffect(() => {
    const stage = stageRef.current;
    const bikeEl = bikeLayerRef.current;
    const titleEl = titleLayerRef.current;
    if (!stage || !bikeEl || !titleEl || typeof window === "undefined") return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (prefersReduced || !isFinePointer) return;

    const moveBikeX = gsap.quickTo(bikeEl, "x", { duration: 0.45, ease: "power2.out" });
    const moveBikeY = gsap.quickTo(bikeEl, "y", { duration: 0.45, ease: "power2.out" });
    const moveTitleX = gsap.quickTo(titleEl, "x", { duration: 0.65, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      moveBikeX(nx * 16);
      moveBikeY(ny * 8);
      moveTitleX(-nx * 12);
    };

    const onMouseLeave = () => {
      moveBikeX(0);
      moveBikeY(0);
      moveTitleX(0);
    };

    stage.addEventListener("mousemove", onMouseMove);
    stage.addEventListener("mouseleave", onMouseLeave);
    return () => {
      stage.removeEventListener("mousemove", onMouseMove);
      stage.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={stageRef}
      className="bsk-dark-section relative overflow-hidden bg-[#141518] pt-24 pb-10 text-white sm:pt-28 sm:pb-12 lg:pt-32 lg:pb-14"
    >
      {/* Industrial Workshop Garage Backdrop (background.png) */}
      <img
        src="/background.png"
        alt=""
        aria-hidden="true"
        width={2048}
        height={1143}
        fetchPriority="high"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center select-none"
      />

      {/* Contrast scrim keeping the warm garage floor visible while guaranteeing >= 4.5:1 text readability */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/85"
      />

      {/* Left & Right Peeking Neighbor Bikes (Harley Street 750 edge framing) */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label={`${tr("Motor Sebelumnya", locale)}: ${prevBike.name}`}
        className="group absolute bottom-[12%] -left-[16%] z-10 hidden w-[30%] max-w-[380px] text-left opacity-55 transition-all duration-300 hover:-left-[13%] hover:opacity-90 lg:block"
      >
        <span className="mb-3 block pl-[58%] font-hero text-xs font-bold tracking-widest text-[#D1D5DB] uppercase group-hover:text-white">
          {prevBike.name}
        </span>
        <img
          src={prevBike.imageUrl}
          alt=""
          aria-hidden="true"
          width={prevBike.width}
          height={prevBike.height}
          className="h-auto w-full object-contain brightness-75 drop-shadow-[0_14px_20px_rgba(0,0,0,0.85)]"
        />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label={`${tr("Motor Berikutnya", locale)}: ${nextBike.name}`}
        className="group absolute bottom-[12%] -right-[16%] z-10 hidden w-[30%] max-w-[380px] text-right opacity-55 transition-all duration-300 hover:-right-[13%] hover:opacity-90 lg:block"
      >
        <span className="mb-3 block pr-[58%] font-hero text-xs font-bold tracking-widest text-[#D1D5DB] uppercase group-hover:text-white">
          {nextBike.name}
        </span>
        <img
          src={nextBike.imageUrl}
          alt=""
          aria-hidden="true"
          width={nextBike.width}
          height={nextBike.height}
          className="h-auto w-full object-contain brightness-75 drop-shadow-[0_14px_20px_rgba(0,0,0,0.85)]"
        />
      </button>

      {/* Main Centered Stage */}
      <div className="relative z-20 mx-auto max-w-[1160px] px-4 sm:px-8">
        {/* Top Metadata Lockup Flanking Giant Title */}
        <div {...heroEnterAttr(0)} className="mx-auto max-w-[880px]">
          <div className="flex flex-wrap items-baseline justify-between gap-2 px-1">
            <span className="font-hero text-xs font-bold tracking-widest text-[#F3F4F6] uppercase sm:text-base">
              {bind(block, "subtitle", "BSK CUSTOM")} · {activeBike.platform}
            </span>
            <span className="font-hero text-xs font-bold tracking-widest text-[#FF6B35] uppercase sm:text-base">
              {locale === "en" ? activeBike.categoryLabelEn : activeBike.categoryLabel}
            </span>
          </div>

          {/* Massive White Headline Behind Bike Cutout (Single H1) */}
          <h1
            ref={titleLayerRef}
            className="mt-1 text-center font-hero text-[clamp(3.1rem,10.8vw,8.4rem)] font-bold leading-[0.88] tracking-tight text-white uppercase drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)]"
          >
            {activeBike.heroTitle}
          </h1>
        </div>

        {/* Center Hero Motorcycle Overlapping Lower Title */}
        <div className="relative mx-auto -mt-5 w-full max-w-[760px] sm:-mt-10 lg:-mt-16">
          <div ref={bikeLayerRef}>
            <div key={activeBike.id} className="bsk-bike-swap relative flex flex-col items-center">
              <img
                src={activeBike.imageUrl}
                alt={`${activeBike.name} - ${activeBike.categoryLabel}`}
                width={activeBike.width}
                height={activeBike.height}
                fetchPriority="high"
                decoding="async"
                className="relative z-20 h-auto max-h-[260px] w-full object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.85)] sm:max-h-[340px] lg:max-h-[410px]"
              />
              {/* Ground tire contact shadow right on the workshop floor */}
              <div
                aria-hidden="true"
                className="relative z-10 -mt-3 h-4 w-[76%] rounded-full bg-black/80 blur-md"
              />
            </div>
          </div>

          {/* Right Side Arrow Controls (< >) flanking the bike on desktop */}
          <div className="pointer-events-none absolute top-1/2 right-0 left-0 z-30 hidden -translate-y-1/2 justify-between md:flex lg:-right-16 lg:-left-16">
            <button
              type="button"
              onClick={handlePrev}
              aria-label={tr("Motor Sebelumnya", locale)}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center border border-white/25 bg-[#141518]/80 text-white transition-colors hover:border-[#FF5722] hover:bg-[#D62810]"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label={tr("Motor Berikutnya", locale)}
              className="pointer-events-auto flex h-12 w-12 items-center justify-center border border-white/25 bg-[#141518]/80 text-white transition-colors hover:border-[#FF5722] hover:bg-[#D62810]"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Bottom Focus Description + Underlined Action Link (Harley VIEW ALL SPECS motif) */}
        <div {...heroEnterAttr(0.18)} className="mx-auto mt-3 max-w-[680px] text-center">
          <p className="text-xs leading-relaxed text-[#E5E7EB] sm:text-sm">
            {locale === "en" ? activeBike.focusEn : activeBike.focus}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onOpenInquiry?.({ bikeId: activeBike.inquiryBikeId })}
              className="inline-flex min-h-[44px] items-center border-b-2 border-[#FF5722] px-2 py-2 font-hero text-sm font-bold tracking-widest text-[#FF6B35] uppercase transition-colors hover:border-white hover:text-white sm:text-base"
            >
              {tr(bind(block, "extra.primary_cta_label", "Konsultasi Konsep Garapan"), locale)}
            </button>

            <a
              href="#galeri"
              className="inline-flex min-h-[44px] items-center border border-white/25 bg-[#141518]/75 px-5 py-2 font-hero text-xs font-bold tracking-widest text-[#F3F4F6] uppercase transition-colors hover:border-white hover:bg-white hover:text-[#111216]"
            >
              {tr(bind(block, "extra.secondary_cta_label", "Lihat Detail Garapan"), locale)}
            </a>
          </div>

          {/* Mobile Prev/Next + 5-unit Switcher Dots */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              aria-label={tr("Motor Sebelumnya", locale)}
              className="flex h-11 w-11 items-center justify-center border border-white/20 bg-[#141518]/85 text-white md:hidden"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>

            <div
              role="tablist"
              aria-label="Pilih motor BSK Custom"
              className="flex flex-wrap items-center justify-center gap-1.5"
            >
              {bikes.map((bike, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <button
                    key={bike.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-label={bike.name}
                    onClick={() => setActiveIndex(idx)}
                    className={`min-h-[44px] min-w-[44px] px-3 font-mono text-xs font-bold transition-colors ${
                      isSelected
                        ? "bg-[#D62810] text-white"
                        : "border border-white/15 bg-[#141518]/80 text-[#D1D5DB] hover:border-white/50 hover:text-white"
                    }`}
                  >
                    0{idx + 1}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleNext}
              aria-label={tr("Motor Berikutnya", locale)}
              className="flex h-11 w-11 items-center justify-center border border-white/20 bg-[#141518]/85 text-white md:hidden"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
