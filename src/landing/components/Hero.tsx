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
      moveBikeY(ny * 5);
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
      className="bsk-dark-section relative flex min-h-[580px] flex-col justify-end overflow-hidden bg-[#141518] pt-20 pb-6 text-white sm:min-h-[680px] sm:pt-24 sm:pb-7 lg:min-h-[min(100dvh,920px)] lg:pt-24 lg:pb-8"
    >
      {/* Anchor background to bottom so warm sunlit garage floor sits directly beneath the motorcycle stand and wheels */}
      <img
        src="/background.png"
        alt=""
        aria-hidden="true"
        width={2048}
        height={1143}
        fetchPriority="high"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-bottom select-none"
      />

      {/* Contrast scrim keeping warm sunlit brick floor bright under the wheels while holding high text contrast at top and bottom edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.16)_42%,rgba(0,0,0,0.48)_78%,rgba(0,0,0,0.84)_100%)]"
      />

      {/* Main Centered Showcase Block */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-4 sm:px-8">
        {/* Title Lockup Flanking Overhead */}
        <div {...heroEnterAttr(0)} className="mx-auto max-w-[940px]">
          <div className="flex items-baseline justify-between gap-4 px-1">
            <span className="font-condensed text-sm tracking-[0.06em] text-white uppercase sm:text-xl lg:text-2xl">
              {bind(block, "subtitle", "BSK CUSTOM")}
            </span>
            <span className="font-condensed text-sm tracking-[0.06em] text-[#FF6B35] uppercase sm:text-xl lg:text-2xl">
              {locale === "en" ? activeBike.categoryLabelEn : activeBike.categoryLabel}
            </span>
          </div>

          <h1
            ref={titleLayerRef}
            className="mt-1 text-center font-condensed text-[clamp(3.8rem,13vw,10.5rem)] leading-[0.84] tracking-[-0.01em] text-white uppercase drop-shadow-[0_10px_28px_rgba(0,0,0,0.5)] select-none"
          >
            {activeBike.heroTitle}
          </h1>
        </div>

        {/* Larger Center Bike Stage Positioned Directly Over Garage Floor */}
        <div className="relative mx-auto -mt-10 flex w-full max-w-[940px] flex-col items-center sm:-mt-16 lg:-mt-24">
          <div ref={bikeLayerRef} className="w-full max-w-[880px] xl:max-w-[920px]">
            <div key={activeBike.id} className="bsk-bike-swap relative mx-auto w-fit max-w-full">
              {/* Wide soft cast shadow projected across the brick floor below chassis and tires */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-[8%] -bottom-2 left-[8%] z-10 h-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.52)_48%,transparent_78%)] blur-[4px] sm:h-12"
              />

              {/* Rear and front tire cast shadows seated below elevated wheels */}
              <div
                aria-hidden="true"
                style={{ left: `${activeBike.rearXPercent}%` }}
                className="pointer-events-none absolute bottom-[2%] z-10 h-6 w-[22%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.45)_55%,transparent_80%)] blur-[3px]"
              />
              <div
                aria-hidden="true"
                style={{ left: `${activeBike.frontXPercent}%` }}
                className="pointer-events-none absolute bottom-[2%] z-10 h-6 w-[22%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.4)_55%,transparent_80%)] blur-[3px]"
              />

              {/* Tight ambient-occlusion contact shadow anchored directly at the center stand tip */}
              <div
                aria-hidden="true"
                style={{ left: `${activeBike.standXPercent}%` }}
                className="pointer-events-none absolute -bottom-1 z-10 h-4 w-[16%] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.98)_0%,rgba(0,0,0,0.8)_45%,transparent_78%)] blur-[1.5px]"
              />

              <img
                src={activeBike.imageUrl}
                alt={`${activeBike.name} - ${activeBike.categoryLabel}`}
                width={activeBike.width}
                height={activeBike.height}
                fetchPriority="high"
                decoding="async"
                className="relative z-20 block h-auto max-h-[300px] w-auto max-w-full object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.75)] sm:max-h-[420px] lg:max-h-[500px] xl:max-h-[540px]"
              />
            </div>
          </div>

          {/* Bottom Centered Underlined Action Link */}
          <div {...heroEnterAttr(0.18)} className="relative z-30 mt-3 flex flex-col items-center gap-2">
            <a
              href="#galeri"
              className="inline-flex min-h-[44px] items-center border-b-2 border-[#FF5722] px-2 pb-1 font-condensed text-base tracking-[0.12em] text-[#FF6B35] uppercase transition-colors hover:border-white hover:text-white sm:text-lg"
            >
              {tr("Lihat Detail Garapan", locale)}
            </a>

            {/* Mobile arrow controls */}
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

      {/* Left Edge Peeking Wheel Scaled and Grounded to Match Center Bike */}
      <div className="pointer-events-none absolute bottom-16 left-0 z-20 hidden md:block lg:bottom-20">
        <span className="mb-4 block pl-6 font-condensed text-sm tracking-widest text-[#D1D5DB] uppercase lg:pl-12">
          {prevBike.name}
        </span>
        <button
          type="button"
          onClick={handlePrev}
          aria-label={`${tr("Motor Sebelumnya", locale)}: ${prevBike.name}`}
          className="pointer-events-auto relative block w-[420px] -translate-x-[74%] opacity-75 transition-all duration-300 hover:-translate-x-[68%] hover:opacity-100 lg:w-[540px] lg:-translate-x-[76%] lg:hover:-translate-x-[70%]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[6%] -bottom-1 left-[55%] z-10 h-5 rounded-full bg-black/85 blur-sm"
          />
          <img
            src={prevBike.imageUrl}
            alt=""
            aria-hidden="true"
            width={prevBike.width}
            height={prevBike.height}
            className="relative z-20 h-auto w-full object-contain brightness-75 drop-shadow-[0_14px_18px_rgba(0,0,0,0.9)]"
          />
        </button>
      </div>

      {/* Minimal Paired < > Controls + Right Edge Peeking Wheel */}
      <div className="pointer-events-none absolute right-0 bottom-16 z-30 hidden md:flex md:flex-col md:items-end lg:bottom-20">
        <div className="pointer-events-auto mb-8 mr-8 flex items-center gap-3 lg:mr-14">
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
          className="pointer-events-auto relative w-[420px] translate-x-[74%] opacity-75 transition-all duration-300 hover:translate-x-[68%] hover:opacity-100 lg:w-[540px] lg:translate-x-[76%] lg:hover:translate-x-[70%]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[55%] -bottom-1 left-[6%] z-10 h-5 rounded-full bg-black/85 blur-sm"
          />
          <img
            src={nextBike.imageUrl}
            alt=""
            aria-hidden="true"
            width={nextBike.width}
            height={nextBike.height}
            className="relative z-20 h-auto w-full object-contain brightness-75 drop-shadow-[0_14px_18px_rgba(0,0,0,0.9)]"
          />
        </button>
      </div>
    </section>
  );
}
