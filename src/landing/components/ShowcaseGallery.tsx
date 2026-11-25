"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { BSK_GALLERY, site, type GalleryItem } from "../content/site";
import { bind } from "../lib/bind";
import { tr, useLocale } from "../lib/i18n";
import {
  activeElementRef,
  ariaLabelAttr,
  ariaModalAttrs,
  attachKeydown,
  buildDirectWhatsAppUrl,
  focusElement,
  imgPerfProps,
  isEscapeKey,
  lockDocumentScroll,
  revealUp,
  type SectionComponentProps,
} from "../lib/helpers";

function circularOffset(idx: number, activeIdx: number, length: number): number {
  let diff = idx - activeIdx;
  const half = length / 2;
  if (diff > half) diff -= length;
  if (diff < -half) diff += length;
  return diff;
}

export function ShowcaseGallery({ block }: SectionComponentProps) {
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffsetPx, setDragOffsetPx] = useState(0);

  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const lastClientXRef = useRef(0);
  const totalMovementRef = useRef(0);
  const accumDeltaRef = useRef(0);
  const suppressClickRef = useRef(false);
  const wheelAccumRef = useRef(0);

  const items = BSK_GALLERY;
  const safeIndex = items.length > 0 ? activeIndex % items.length : 0;
  const activeItem = items[safeIndex] ?? items[0];

  const handlePrev = () => {
    if (items.length <= 1) return;
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (items.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handleLightboxStep = (dir: -1 | 1) => {
    if (!lightboxItem || items.length <= 1) return;
    const curIdx = items.findIndex((i) => i.id === lightboxItem.id);
    if (curIdx === -1) return;
    const nextIdx = (curIdx + dir + items.length) % items.length;
    setLightboxItem(items[nextIdx]);
    setActiveIndex(nextIdx);
  };

  // Continuous click-hold-drag scrubbing across window so moving past card bounds never stalls
  useEffect(() => {
    if (!isDragging) return;
    const STEP_PX = 135;

    const onPointerMove = (e: PointerEvent) => {
      const dx = e.clientX - lastClientXRef.current;
      lastClientXRef.current = e.clientX;
      totalMovementRef.current += Math.abs(dx);
      if (totalMovementRef.current > 7) {
        suppressClickRef.current = true;
      }

      accumDeltaRef.current += dx;
      while (accumDeltaRef.current >= STEP_PX) {
        accumDeltaRef.current -= STEP_PX;
        setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
      }
      while (accumDeltaRef.current <= -STEP_PX) {
        accumDeltaRef.current += STEP_PX;
        setActiveIndex((prev) => (prev + 1) % items.length);
      }

      setDragOffsetPx(accumDeltaRef.current);
    };

    const finishDrag = () => {
      if (accumDeltaRef.current >= 42) {
        setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
      } else if (accumDeltaRef.current <= -42) {
        setActiveIndex((prev) => (prev + 1) % items.length);
      }
      accumDeltaRef.current = 0;
      setDragOffsetPx(0);
      setIsDragging(false);
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    };

    const prevCursor = document.body.style.cursor;
    document.body.style.cursor = "grabbing";
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", finishDrag);
    window.addEventListener("pointercancel", finishDrag);
    return () => {
      document.body.style.cursor = prevCursor;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", finishDrag);
      window.removeEventListener("pointercancel", finishDrag);
    };
  }, [isDragging, items.length]);

  // Horizontal trackpad scroll or Shift + Mouse Wheel navigation without blocking vertical scroll
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const WHEEL_STEP = 60;
    const onWheel = (e: WheelEvent) => {
      const isHorizontalIntent =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) || (e.shiftKey && Math.abs(e.deltaY) > 0);
      if (!isHorizontalIntent) return;

      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      wheelAccumRef.current += delta;

      while (wheelAccumRef.current >= WHEEL_STEP) {
        wheelAccumRef.current -= WHEEL_STEP;
        setActiveIndex((prev) => (prev + 1) % items.length);
      }
      while (wheelAccumRef.current <= -WHEEL_STEP) {
        wheelAccumRef.current += WHEEL_STEP;
        setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
      }
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      stage.removeEventListener("wheel", onWheel);
    };
  }, [items.length]);

  // Lightbox keyboard navigation & accessible focus return
  useEffect(() => {
    if (!lightboxItem) return;
    const previous = activeElementRef();
    const unlockScroll = lockDocumentScroll(true);
    focusElement(closeBtnRef.current);

    const stepItem = (dir: -1 | 1) => {
      if (items.length <= 1) return;
      const curIdx = items.findIndex((i) => i.id === lightboxItem.id);
      if (curIdx === -1) return;
      const nextIdx = (curIdx + dir + items.length) % items.length;
      setLightboxItem(items[nextIdx]);
      setActiveIndex(nextIdx);
    };

    const detachKeys = attachKeydown((key) => {
      if (isEscapeKey(key)) {
        setLightboxItem(null);
      } else if (key === "ArrowLeft") {
        stepItem(-1);
      } else if (key === "ArrowRight") {
        stepItem(1);
      }
    });

    return () => {
      unlockScroll();
      detachKeys();
      focusElement(previous);
    };
  }, [lightboxItem, items]);

  const onStagePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    lastClientXRef.current = e.clientX;
    totalMovementRef.current = 0;
    accumDeltaRef.current = 0;
    suppressClickRef.current = false;
    setDragOffsetPx(0);
    setIsDragging(true);
  };

  const activeTitle =
    locale === "en" ? activeItem?.titleEn ?? activeItem?.title : activeItem?.title;
  const activeDesc =
    locale === "en"
      ? activeItem?.descriptionEn ?? activeItem?.description
      : activeItem?.description;

  return (
    <section
      id="galeri"
      className="bsk-dark-section relative overflow-hidden bg-[linear-gradient(to_bottom,#090A0D_0%,#0C0E13_50%,#090A0D_100%)] text-[#F9FAFB]"
    >
      <div
        aria-hidden="true"
        className="mx-auto h-px w-full max-w-[1440px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28 xl:px-14">
        {/* Clean Minimal Editorial Header */}
        <div {...revealUp(0)} className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[#FF6B35]" aria-hidden="true" />
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[#FF6B35] uppercase">
              {tr(bind(block, "subtitle", "DOKUMENTASI GARAPAN NYATA"), locale)}
            </p>
          </div>
          <h2 className="mt-4 font-display text-[2.15rem] leading-[1.04] font-bold tracking-[-0.025em] text-[#F9FAFB] sm:text-5xl lg:text-[3.5rem] xl:text-[3.85rem]">
            {tr(bind(block, "title", "Galeri Unit & Rangka BSK"), locale)}
          </h2>
        </div>

        {/* Center-Focus Coverflow Stacked Stage (Click-Hold Drag & Horizontal Scroll) */}
        {activeItem && (
          <div {...revealUp(0.08)} className="mt-12">
            <div
              ref={stageRef}
              onPointerDown={onStagePointerDown}
              className={`relative mx-auto h-[370px] w-full max-w-[1160px] touch-pan-y select-none sm:h-[470px] lg:h-[520px] ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
            >
              {items.map((item, idx) => {
                const offset = circularOffset(idx, safeIndex, items.length);
                const abs = Math.abs(offset);
                if (abs > 2) return null;
                if (items.length < 3 && abs === 2) return null;
                if (items.length === 1 && offset !== 0) return null;

                const isCenter = offset === 0;

                const translatePercent =
                  offset === 0
                    ? "0%"
                    : offset === -1
                      ? "-54%"
                      : offset === 1
                        ? "54%"
                        : offset === -2
                          ? "-96%"
                          : "96%";

                const liveDragShift = Math.round(dragOffsetPx * 0.45);
                const scaleVal = isCenter ? 1 : abs === 1 ? 0.84 : 0.68;
                const zClass = isCenter ? "z-30" : abs === 1 ? "z-20" : "z-10";
                const itemTitle = locale === "en" ? item.titleEn : item.title;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (suppressClickRef.current) return;
                      if (isCenter) setLightboxItem(item);
                      else setActiveIndex(idx);
                    }}
                    aria-label={
                      isCenter
                        ? `${tr("Show Foto Penuh", locale)}: ${itemTitle}`
                        : `${itemTitle}`
                    }
                    style={{
                      transform: `translate(-50%, -50%) translateX(calc(${translatePercent} + ${liveDragShift}px)) scale(${scaleVal})`,
                    }}
                    className={`group absolute top-1/2 left-1/2 aspect-[3/4] w-[250px] overflow-hidden rounded-2xl bg-[#141518] sm:w-[325px] lg:w-[360px] ${
                      isDragging
                        ? "cursor-grabbing transition-[box-shadow,filter] duration-75"
                        : isCenter
                          ? "cursor-grab transition-all duration-300 ease-out"
                          : "cursor-pointer transition-all duration-300 ease-out"
                    } ${zClass} ${
                      isCenter
                        ? "shadow-[0_28px_70px_rgba(0,0,0,0.9)]"
                        : abs === 1
                          ? "shadow-[0_20px_45px_rgba(0,0,0,0.85)]"
                          : "hidden shadow-[0_14px_35px_rgba(0,0,0,0.8)] sm:block"
                    }`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={itemTitle}
                      width={item.width}
                      height={item.height}
                      {...imgPerfProps()}
                      draggable={false}
                      className={`h-full w-full object-cover object-center transition-[transform,filter] duration-500 ${
                        isCenter
                          ? isDragging
                            ? "brightness-100"
                            : "brightness-100 group-hover:scale-[1.03]"
                          : abs === 1
                            ? "brightness-[0.5] group-hover:brightness-[0.76]"
                            : "brightness-[0.28] group-hover:brightness-[0.52]"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Clean Bottom Controls + Caption (no extra action pill clutter) */}
            <div className="mx-auto mt-6 flex max-w-2xl items-center justify-between gap-4">
              <button
                type="button"
                onClick={handlePrev}
                aria-label={tr("Foto Sebelumnya", locale)}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#141518] text-[#D1D5DB] transition-colors hover:border-[#FF6B35] hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="min-w-0 flex-1 text-center">
                <h3 className="truncate font-display text-xl font-bold text-[#F9FAFB] sm:text-2xl">
                  {activeTitle}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-[#A1A1AA]">
                  {activeDesc}
                </p>
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label={tr("Foto Berikutnya", locale)}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#141518] text-[#D1D5DB] transition-colors hover:border-[#FF6B35] hover:text-white"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Show Lightbox Overlay (opens on clicking active center photo) */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 backdrop-blur-md sm:p-6"
          role="dialog"
          {...ariaModalAttrs("gallery-lightbox-title")}
        >
          <div
            className="fixed inset-0"
            onClick={() => setLightboxItem(null)}
            aria-hidden="true"
          />

          <div className="bsk-dialog-in relative z-10 flex max-h-[92vh] w-full max-w-[1040px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#121419] text-[#F9FAFB] shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-3.5 sm:px-6">
              <div className="min-w-0">
                <h3
                  id="gallery-lightbox-title"
                  className="truncate font-display text-lg font-bold sm:text-xl"
                >
                  {locale === "en" ? lightboxItem.titleEn : lightboxItem.title}
                </h3>
              </div>

              <button
                ref={closeBtnRef}
                type="button"
                onClick={() => setLightboxItem(null)}
                {...ariaLabelAttr(tr("Tutup preview foto", locale))}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-[#16181D] text-white transition-colors hover:border-[#FF6B35] hover:text-[#FF6B35]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center bg-[#090A0D] p-3 sm:p-5">
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleLightboxStep(-1)}
                  aria-label={tr("Foto Sebelumnya", locale)}
                  className="absolute top-1/2 left-3 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#141518]/90 text-white transition-colors hover:border-[#FF6B35] hover:bg-[#FF6B35] hover:text-[#111216] sm:left-5"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
              )}

              <img
                src={lightboxItem.imageUrl}
                alt={locale === "en" ? lightboxItem.titleEn : lightboxItem.title}
                width={lightboxItem.width}
                height={lightboxItem.height}
                className="max-h-[64vh] w-auto max-w-full rounded-xl object-contain"
              />

              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleLightboxStep(1)}
                  aria-label={tr("Foto Berikutnya", locale)}
                  className="absolute top-1/2 right-3 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#141518]/90 text-white transition-colors hover:border-[#FF6B35] hover:bg-[#FF6B35] hover:text-[#111216] sm:right-5"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
            </div>

            <div className="flex flex-col justify-between gap-4 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
              <p className="text-sm leading-relaxed text-[#D1D5DB]">
                {locale === "en" ? lightboxItem.descriptionEn : lightboxItem.description}
              </p>

              <a
                href={buildDirectWhatsAppUrl(
                  site.contact.whatsapp_number,
                  locale === "en" ? lightboxItem.titleEn : lightboxItem.title,
                  locale
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-xl bg-[#FF6B35] px-5 py-2.5 font-sans text-xs font-bold tracking-[0.1em] text-[#111216] uppercase transition-colors hover:bg-white"
              >
                {tr("Konsultasi Unit Serupa", locale)}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}