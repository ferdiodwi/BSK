"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BSK_BIKES } from "../content/site";
import { bind } from "../lib/bind";
import { tr, useLocale } from "../lib/i18n";
import { heroEnterAttr, type SectionComponentProps } from "../lib/helpers";

export function Hero({ block }: SectionComponentProps) {
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef<HTMLElement>(null);
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
      moveBikeX(nx * 14);
      moveBikeY(ny * 6);
      moveTitleX(-nx * 10);
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
      className="bsk-dark-section relative flex min-h-[560px] flex-col justify-end overflow-hidden bg-[#141518] pt-24 pb-8 text-white sm:min-h-[640px] sm:pt-28 sm:pb-10 lg:min-h-[min(100dvh,860px)] lg:pt-32 lg:pb-12"
    >
      {/* Full-bleed Industrial Garage Backdrop (background.png) */}
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

      {/* Top and bottom dark scrims preserving warm brick garage floor while keeping high WCAG contrast */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.7)_0%,rgba(0,0,0,0.22)_45%,rgba(0,0,0,0.75)_100%)]"
      />

      {/* Main Centered Showcase Block */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-4 sm:px-8">
        {/* Title Lockup Flanking Overhead (Harley-Davidson / AT $ style without prices) */}
        <div {...heroEnterAttr(0)} className="mx-auto max-w-[880px]">
          <div className="flex items-baseline justify-between gap-4 px-1">
            <span className="font-condensed text-sm tracking-[0.06em] text-white uppercase sm:text-xl lg:text-2xl">
              {bind(block, "subtitle", "BSK CUSTOM")}
            </span>
            <span className="font-condensed text-sm tracking-[0.06em] text-[#FF6B35] uppercase sm:text-xl lg:text-2xl">
              {locale === "en" ? activeBike.categoryLabelEn : activeBike.categoryLabel}
            </span>
          </div>

          {/* Giant Solid Condensed White Title Behind Motorcycle Cutout (Single H1) */}
          <h1
            ref={titleLayerRef}
            className="mt-1 text-center font-condensed text-[clamp(3.6rem,12.5vw,9.8rem)] leading-[0.84] tracking-[-0.01em] text-white uppercase drop-shadow-[0_10px_28px_rgba(0,0,0,0.5)] select-none"
          >
            {activeBike.heroTitle}
          </h1>
        </div>

        {/* Center Bike Stage Overlapping Deeply Into Lower Half of Headline */}
        <div className="relative mx-auto -mt-8 flex w-full max-w-[840px] flex-col items-center sm:-mt-16 lg:-mt-24">
          <div ref={bikeLayerRef} className="w-full max-w-[740px]">
            <div key={activeBike.id} className="bsk-bike-swap relative flex flex-col items-center">
              <img
                src={activeBike.imageUrl}
                alt={`${activeBike.name} - ${activeBike.categoryLabel}`}
                width={activeBike.width}
                height={activeBike.height}
                fetchPriority="high"
                decoding="async"
                className="relative z-20 h-auto max-h-[260px] w-full object-contain drop-shadow-[0_20px_26px_rgba(0,0,0,0.9)] sm:max-h-[360px] lg:max-h-[440px]"
              />
              {/* Tire floor shadow right beneath wheels */}
              <div
                aria-hidden="true"
                className="relative z-10 -mt-3 h-4 w-[76%] rounded-full bg-black/85 blur-md"
              />
            </div>
          </div>

          {/* Bottom Centered Underlined Action Link (Harley VIEW ALL SPECS & PRICING style) */}
          <div {...heroEnterAttr(0.18)} className="mt-4 flex flex-col items-center gap-3">
            <a
              href="#galeri"
              onClick={(e) => {
                // Keep direct navigation to specs gallery, with inquiry accessible via top button or gallery
                if (e.metaKey || e.ctrlKey) return;
              }}
              className="inline-flex min-h-[44px] items-center border-b-2 border-[#FF5722] px-2 pb-1 font-condensed text-base tracking-[0.12em] text-[#FF6B35] uppercase transition-colors hover:border-white hover:text-white sm:text-lg"
            >
              {tr("Lihat Detail Garapan", locale)}
            </a>

            {/* Mobile arrow controls only (on desktop, arrows sit cleanly on right side like Harley shot) */}
            <div className="flex items-center gap-4 md:hidden">
              <button
                type="button"
                onClick={handlePrev}
                aria-label={tr("Motor Sebelumnya", locale)}
                className="flex h-11 w-11 items-center justify-center text-[#D1D5DB] transition-colors hover:text-white"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden="true" />
              </button>
              <span className="font-mono text-xs text-[#D1D5DB]">
                0{activeIndex + 1} / 0{bikes.length}
              </span>
              <button
                type="button"
                onClick={handleNext}
                aria-label={tr("Motor Berikutnya", locale)}
                className="flex h-11 w-11 items-center justify-center text-[#D1D5DB] transition-colors hover:text-white"
              >
                <ChevronRight className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Left Edge Peeking Wheel + Model Name (aligned horizontally to floor level) */}
      <div className="pointer-events-none absolute bottom-24 left-0 z-20 hidden md:block lg:bottom-28">
        <span className="mb-4 block pl-6 font-condensed text-sm tracking-widest text-[#D1D5DB] uppercase lg:pl-12">
          {prevBike.name}
        </span>
        <button
          type="button"
          onClick={handlePrev}
          aria-label={`${tr("Motor Sebelumnya", locale)}: ${prevBike.name}`}
          className="pointer-events-auto block w-[360px] -translate-x-[74%] opacity-75 transition-all duration-300 hover:-translate-x-[68%] hover:opacity-100 lg:w-[440px] lg:-translate-x-[76%] lg:hover:-translate-x-[70%]"
        >
          <img
            src={prevBike.imageUrl}
            alt=""
            aria-hidden="true"
            width={prevBike.width}
            height={prevBike.height}
            className="h-auto w-full object-contain brightness-75 drop-shadow-[0_14px_18px_rgba(0,0,0,0.9)]"
          />
        </button>
      </div>

      {/* Minimal Paired < > Controls + Right Edge Peeking Wheel */}
      <div className="pointer-events-none absolute right-0 bottom-24 z-30 hidden md:flex md:flex-col md:items-end lg:bottom-28">
        {/* Clean minimal < > arrow pair floating right above the right doorway/bike */}
        <div className="pointer-events-auto mb-6 mr-8 flex items-center gap-3 lg:mr-14">
          <button
            type="button"
            onClick={handlePrev}
            aria-label={tr("Motor Sebelumnya", locale)}
            className="flex h-11 w-11 items-center justify-center text-[#D1D5DB] transition-colors hover:text-white"
          >
            <ChevronLeft className="h-6 w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label={tr("Motor Berikutnya", locale)}
            className="flex h-11 w-11 items-center justify-center text-[#D1D5DB] transition-colors hover:text-white"
          >
            <ChevronRight className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label={`${tr("Motor Berikutnya", locale)}: ${nextBike.name}`}
          className="pointer-events-auto w-[360px] translate-x-[74%] opacity-75 transition-all duration-300 hover:translate-x-[68%] hover:opacity-100 lg:w-[440px] lg:translate-x-[76%] lg:hover:translate-x-[70%]"
        >
          <img
            src={nextBike.imageUrl}
            alt=""
            aria-hidden="true"
            width={nextBike.width}
            height={nextBike.height}
            className="h-auto w-full object-contain brightness-75 drop-shadow-[0_14px_18px_rgba(0,0,0,0.9)]"
          />
        </button>
      </div>
    </section>
  );
}
