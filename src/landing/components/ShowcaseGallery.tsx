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
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);

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

  // Center active thumbnail inside the horizontal rail without vertical page scroll
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const activeThumb = rail.children[safeIndex] as HTMLElement | undefined;
    if (!activeThumb) return;
    const targetLeft =
      activeThumb.offsetLeft - rail.clientWidth / 2 + activeThumb.clientWidth / 2;
    rail.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
  }, [safeIndex]);

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
    dragStartX.current = e.clientX;
  };

  const onStagePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    if (Math.abs(delta) < 42) return;
    if (delta > 0) handlePrev();
    else handleNext();
  };

  const activeTitle =
    locale === "en" ? activeItem?.titleEn ?? activeItem?.title : activeItem?.title;
  const activeDesc =
    locale === "en"
      ? activeItem?.descriptionEn ?? activeItem?.description
      : activeItem?.description;

  const lightboxIndex = lightboxItem
    ? items.findIndex((i) => i.id === lightboxItem.id)
    : -1;

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

        {/* Center-Focus Coverflow Stacked Stage */}
        {activeItem && (
          <div {...revealUp(0.08)} className="mt-12">
            <div
              onPointerDown={onStagePointerDown}
              onPointerUp={onStagePointerUp}
              onPointerCancel={() => {
                dragStartX.current = null;
              }}
              className="relative mx-auto h-[370px] w-full max-w-[1160px] touch-pan-y select-none sm:h-[470px] lg:h-[520px]"
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

                const scaleVal = isCenter ? 1 : abs === 1 ? 0.84 : 0.68;
                const zClass = isCenter ? "z-30" : abs === 1 ? "z-20" : "z-10";
                const itemTitle = locale === "en" ? item.titleEn : item.title;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      if (isCenter) setLightboxItem(item);
                      else setActiveIndex(idx);
                    }}
                    aria-label={
                      isCenter
                        ? `${tr("Show Foto Penuh", locale)}: ${itemTitle}`
                        : `${itemTitle}`
                    }
                    style={{
                      transform: `translate(-50%, -50%) translateX(${translatePercent}) scale(${scaleVal})`,
                    }}
                    className={`group absolute top-1/2 left-1/2 aspect-[3/4] w-[250px] overflow-hidden rounded-2xl border bg-[#141518] transition-all duration-300 ease-out sm:w-[325px] lg:w-[360px] ${zClass} ${
                      isCenter
                        ? "border-[#FF6B35]/60 opacity-100 shadow-[0_28px_70px_rgba(0,0,0,0.85)]"
                        : abs === 1
                          ? "border-white/15 opacity-75 shadow-[0_20px_45px_rgba(0,0,0,0.75)] hover:opacity-95"
                          : "hidden border-white/10 opacity-40 shadow-[0_14px_35px_rgba(0,0,0,0.65)] hover:opacity-70 sm:block"
                    }`}
                  >
                    <img
                      src={item.imageUrl}
                      alt={itemTitle}
                      width={item.width}
                      height={item.height}
                      {...imgPerfProps()}
                      draggable={false}
                      className={`h-full w-full object-cover object-center transition-transform duration-500 ${
                        isCenter
                          ? "group-hover:scale-[1.03]"
                          : "brightness-[0.72] group-hover:brightness-90"
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
                <p className="font-mono text-xs font-semibold tracking-[0.14em] text-[#FF8A5B] uppercase">
                  {String(safeIndex + 1).padStart(2, "0")} /{" "}
                  {String(items.length).padStart(2, "0")}
                </p>
                <h3 className="mt-1.5 truncate font-display text-xl font-bold text-[#F9FAFB] sm:text-2xl">
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

            {/* Horizontal Scrollable Thumbnail Filmstrip */}
            <div className="mt-8 border-t border-white/[0.08] pt-6">
              <div
                ref={railRef}
                role="region"
                aria-label={tr("Daftar foto galeri BSK Custom", locale)}
                className="flex gap-2.5 overflow-x-auto pb-2 [scrollbar-color:#FF6B35_#141518] [scrollbar-width:thin]"
              >
                {items.map((item, idx) => {
                  const isCurrent = idx === safeIndex;
                  const thumbTitle = locale === "en" ? item.titleEn : item.title;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`${String(idx + 1).padStart(2, "0")}. ${thumbTitle}`}
                      aria-current={isCurrent ? "true" : undefined}
                      className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-xl border transition-all sm:h-24 sm:w-20 ${
                        isCurrent
                          ? "border-[#FF6B35] ring-2 ring-[#FF6B35]/60"
                          : "border-white/10 opacity-55 hover:border-white/30 hover:opacity-90"
                      }`}
                    >
                      <img
                        src={item.imageUrl}
                        alt=""
                        aria-hidden="true"
                        width={item.width}
                        height={item.height}
                        {...imgPerfProps()}
                        className="h-full w-full object-cover object-center"
                      />
                    </button>
                  );
                })}
              </div>
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
                <p className="font-mono text-[11px] font-semibold tracking-[0.16em] text-[#FF8A5B] uppercase">
                  {String((lightboxIndex >= 0 ? lightboxIndex : 0) + 1).padStart(2, "0")} /{" "}
                  {String(items.length).padStart(2, "0")}
                </p>
                <h3
                  id="gallery-lightbox-title"
                  className="mt-0.5 truncate font-display text-lg font-bold sm:text-xl"
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