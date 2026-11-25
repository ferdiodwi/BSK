"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BSK_BIKES, site } from "../content/site";
import { bind } from "../lib/bind";
import { tr, useLocale } from "../lib/i18n";
import { buildDirectWhatsAppUrl, heroEnterAttr, type SectionComponentProps } from "../lib/helpers";

export function Hero({ block }: SectionComponentProps) {
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const stageRef = useRef<HTMLElement>(null);
  const bikeLayerRef = useRef<HTMLDivElement>(null);
  const titleLayerRef = useRef<HTMLHeadingElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const bikes = BSK_BIKES;
  const activeBike = bikes[activeIndex] ?? bikes[0];
  const prevIndex = activeIndex === 0 ? bikes.length - 1 : activeIndex - 1;
  const nextIndex = (activeIndex + 1) % bikes.length;
  const prevBike = bikes[prevIndex];
  const nextBike = bikes[nextIndex];

  const handlePrev = () => setActiveIndex(prevIndex);
  const handleNext = () => setActiveIndex(nextIndex);

  const onStageTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const onStageTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const startX = touchStartXRef.current;
    touchStartXRef.current = null;
    if (startX === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? startX) - startX;
    if (Math.abs(dx) < 42) return;
    if (dx < 0) handleNext();
    else handlePrev();
  };

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
      className="bsk-dark-section relative flex min-h-[100dvh] flex-col justify-center overflow-hidden bg-[#07080A] pt-14 pb-12 text-white sm:pt-24 sm:pb-10 md:justify-end md:pt-28 md:pb-12"
    >
      {/* Anchor garage backdrop at bottom so brick floor frames lower section naturally */}
      <Image
        src="/background.webp"
        alt=""
        aria-hidden="true"
        fill
        priority
        quality={80}
        sizes="100vw"
        className="pointer-events-none object-cover object-bottom select-none"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.16)_42%,rgba(0,0,0,0.48)_78%,rgba(7,8,10,0.9)_100%)]"
      />

      {/* Seamless floor fade so bottom edge dissolves into AboutSection (#07080A) without a hard horizontal cut */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[12] h-28 bg-gradient-to-b from-transparent via-[#07080A]/75 to-[#07080A]"
      />

      {/* Main Centered Showcase Block */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-4 sm:px-8">
        {/* Bold Poster Title Lockup positioned cleanly behind motorcycle layer (z-10 vs z-20) */}
        <div {...heroEnterAttr(0)} className="relative z-10 mx-auto max-w-[940px]">
          <div className="flex items-baseline justify-between gap-3 px-1">
            <span className="shrink-0 font-condensed text-[11px] tracking-[0.06em] text-white uppercase whitespace-nowrap sm:text-xl lg:text-2xl">
              {bind(block, "subtitle", "BSK CUSTOM")}
            </span>
            <span className="min-w-0 truncate text-right font-condensed text-[11px] tracking-[0.06em] text-[#FF6B35] uppercase sm:text-xl lg:text-2xl">
              {locale === "en" ? activeBike.categoryLabelEn : activeBike.categoryLabel}
            </span>
          </div>

          <h1
            ref={titleLayerRef}
            className="mt-1 text-center font-condensed text-[clamp(2.9rem,14.8vw,10rem)] leading-[0.83] tracking-[-0.01em] text-white uppercase whitespace-nowrap drop-shadow-[0_10px_28px_rgba(0,0,0,0.55)] select-none"
          >
            {activeBike.heroTitle}
          </h1>
        </div>

        {/* Fixed-Height Center Bike Stage overlapping in front of bold poster text */}
        <div className="relative z-20 mx-auto -mt-9 flex w-full max-w-[1060px] flex-col items-center sm:-mt-14 lg:-mt-22">
          <div
            onTouchStart={onStageTouchStart}
            onTouchEnd={onStageTouchEnd}
            className="relative flex h-[195px] w-full items-end justify-center px-8 touch-pan-y sm:h-[360px] sm:px-14 lg:h-[460px] lg:px-16 xl:h-[500px]"
          >
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

                <Image
                  src={activeBike.imageUrl}
                  alt={`${activeBike.name} - ${activeBike.categoryLabel}`}
                  width={activeBike.width}
                  height={activeBike.height}
                  priority={activeIndex === 0}
                  quality={85}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 76vw, 760px"
                  className="relative z-20 block h-auto max-h-[195px] w-auto max-w-full object-contain object-bottom drop-shadow-[0_12px_18px_rgba(0,0,0,0.75)] sm:max-h-[360px] lg:max-h-[460px] xl:max-h-[500px]"
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

          {/* Bottom Centered Underlined Direct WhatsApp Action for Active Bike */}
          <div {...heroEnterAttr(0.18)} className="relative z-30 mt-4 flex flex-col items-center">
            <a
              href={buildDirectWhatsAppUrl(site.contact.whatsapp_number, activeBike.name, locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center border-b-2 border-[#FF5722] px-2 pb-1 font-condensed text-base tracking-[0.12em] text-[#FF6B35] uppercase transition-colors hover:border-white hover:text-white sm:text-lg"
            >
              {tr(bind(block, "extra.primary_cta_label", "Konsultasi Konsep Garapan"), locale)}
            </a>
          </div>
        </div>
      </div>

      {/* Left Edge Peeking Wheel: fixed height keeps floor level identical across all 5 bikes */}
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
          <Image
            src={prevBike.imageUrl}
            alt=""
            aria-hidden="true"
            width={prevBike.width}
            height={prevBike.height}
            quality={80}
            loading="lazy"
            sizes="(max-width: 767px) 1px, (min-width: 1024px) 480px, 380px"
            className="relative z-20 h-full w-auto object-contain object-bottom brightness-75 drop-shadow-[0_14px_18px_rgba(0,0,0,0.9)]"
          />
        </button>
      </div>

      {/* Right Edge Peeking Wheel: fixed height keeps floor level identical across all 5 bikes */}
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
          <Image
            src={nextBike.imageUrl}
            alt=""
            aria-hidden="true"
            width={nextBike.width}
            height={nextBike.height}
            quality={80}
            loading="lazy"
            sizes="(max-width: 767px) 1px, (min-width: 1024px) 480px, 380px"
            className="relative z-20 h-full w-auto object-contain object-bottom brightness-75 drop-shadow-[0_14px_18px_rgba(0,0,0,0.9)]"
          />
        </button>
      </div>
    </section>
  );
}
