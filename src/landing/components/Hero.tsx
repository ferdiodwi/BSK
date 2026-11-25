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
      className="bsk-dark-section relative flex min-h-[560px] flex-col justify-end overflow-hidden bg-[#141518] pt-20 pb-8 text-white sm:min-h-[680px] sm:pt-24 sm:pb-10 lg:min-h-[100dvh] lg:pt-28 lg:pb-12"
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

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.16)_42%,rgba(0,0,0,0.48)_78%,rgba(0,0,0,0.84)_100%)]"
      />

      {/* Main Centered Showcase Block */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-4 sm:px-8">
        {/* Title Lockup Flanking Overhead — single-line condensed lockup prevents height jumps */}
        <div {...heroEnterAttr(0)} className="mx-auto max-w-[940px]">
          <div className="flex items-baseline justify-between gap-2 px-1">
            <span className="font-condensed text-xs tracking-[0.06em] text-white uppercase whitespace-nowrap sm:text-xl lg:text-2xl">
              {bind(block, "subtitle", "BSK CUSTOM")}
            </span>
            <span className="font-condensed text-xs tracking-[0.06em] text-[#FF6B35] uppercase whitespace-nowrap sm:text-xl lg:text-2xl">
              {locale === "en" ? activeBike.categoryLabelEn : activeBike.categoryLabel}
            </span>
          </div>

          <h1
            ref={titleLayerRef}
            className="mt-1 text-center font-condensed text-[clamp(2.4rem,10.5vw,10rem)] leading-[0.84] tracking-[-0.01em] text-white uppercase whitespace-nowrap drop-shadow-[0_10px_28px_rgba(0,0,0,0.5)] select-none"
          >
            {activeBike.heroTitle}
          </h1>
        </div>

        {/* Fixed-Height Center Bike Stage with Left and Right Flank Arrows */}
        <div className="relative mx-auto -mt-8 flex w-full max-w-[1060px] flex-col items-center sm:-mt-14 lg:-mt-22">
          <div className="relative flex h-[230px] w-full items-end justify-center px-10 sm:h-[360px] sm:px-14 lg:h-[460px] lg:px-16 xl:h-[500px]">
            {/* Left Arrow Flanking the Bike */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label={tr("Motor Sebelumnya", locale)}
              className="absolute top-1/2 left-0 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-[#D1D5DB] transition-colors hover:text-white sm:left-1"
            >
              <ChevronLeft className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
            </button>

            {/* Center Motorcycle Wrapper Locked to Bottom Floor Plane */}
            <div ref={bikeLayerRef} className="flex h-full w-full items-end justify-center">
              <div
                key={activeBike.id}
                className="bsk-bike-swap relative flex max-h-full max-w-full items-end justify-center"
              >
                {/* Wide soft cast shadow projected across the brick floor */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-[8%] -bottom-2 left-[8%] z-10 h-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.52)_48%,transparent_78%)] blur-[4px] sm:h-12"
                />

                {/* Rear and front tire cast shadows */}
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

                {/* Tight ambient-occlusion contact shadow at center stand tip */}
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
                  className="relative z-20 block max-h-[230px] w-auto max-w-full object-contain object-bottom drop-shadow-[0_12px_18px_rgba(0,0,0,0.75)] sm:max-h-[360px] lg:max-h-[460px] xl:max-h-[500px]"
                />
              </div>
            </div>

            {/* Right Arrow Flanking the Bike */}
            <button
              type="button"
              onClick={handleNext}
              aria-label={tr("Motor Berikutnya", locale)}
              className="absolute top-1/2 right-0 z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-[#D1D5DB] transition-colors hover:text-white sm:right-1"
            >
              <ChevronRight className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
            </button>
          </div>

          {/* Bottom Centered Underlined Action Link */}
          <div {...heroEnterAttr(0.18)} className="relative z-30 mt-4 flex flex-col items-center">
            <a
              href="#galeri"
              className="inline-flex min-h-[44px] items-center border-b-2 border-[#FF5722] px-2 pb-1 font-condensed text-base tracking-[0.12em] text-[#FF6B35] uppercase transition-colors hover:border-white hover:text-white sm:text-lg"
            >
              {tr("Lihat Detail Garapan", locale)}
            </a>
          </div>
        </div>
      </div>

      {/* Left Edge Peeking Wheel — fixed height keeps floor level identical across all 5 bikes */}
      <div className="pointer-events-none absolute bottom-16 left-0 z-20 hidden md:block lg:bottom-24">
        <button
          type="button"
          onClick={handlePrev}
          aria-label={`${tr("Motor Sebelumnya", locale)}: ${prevBike.name}`}
          className="pointer-events-auto relative flex h-[240px] items-end -translate-x-[74%] opacity-75 transition-all duration-300 hover:-translate-x-[68%] hover:opacity-100 lg:h-[310px] lg:-translate-x-[76%] lg:hover:-translate-x-[70%]"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-[6%] -bottom-1 left-[55%] z-10 block h-5 rounded-full bg-black/85 blur-sm"
          />
          <img
            src={prevBike.imageUrl}
            alt=""
            aria-hidden="true"
            width={prevBike.width}
            height={prevBike.height}
            className="relative z-20 h-full w-auto object-contain object-bottom brightness-75 drop-shadow-[0_14px_18px_rgba(0,0,0,0.9)]"
          />
        </button>
      </div>

      {/* Right Edge Peeking Wheel — fixed height keeps floor level identical across all 5 bikes */}
      <div className="pointer-events-none absolute right-0 bottom-16 z-20 hidden md:block lg:bottom-24">
        <button
          type="button"
          onClick={handleNext}
          aria-label={`${tr("Motor Berikutnya", locale)}: ${nextBike.name}`}
          className="pointer-events-auto relative flex h-[240px] items-end translate-x-[74%] opacity-75 transition-all duration-300 hover:translate-x-[68%] hover:opacity-100 lg:h-[310px] lg:translate-x-[76%] lg:hover:translate-x-[70%]"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-[55%] -bottom-1 left-[6%] z-10 block h-5 rounded-full bg-black/85 blur-sm"
          />
          <img
            src={nextBike.imageUrl}
            alt=""
            aria-hidden="true"
            width={nextBike.width}
            height={nextBike.height}
            className="relative z-20 h-full w-auto object-contain object-bottom brightness-75 drop-shadow-[0_14px_18px_rgba(0,0,0,0.9)]"
          />
        </button>
      </div>
    </section>
  );
}
