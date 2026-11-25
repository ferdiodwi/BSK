"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { BSK_GALLERY, type GalleryItem } from "../content/site";
import { bind } from "../lib/bind";
import { tr, useLocale } from "../lib/i18n";
import {
  activeElementRef,
  ariaLabelAttr,
  ariaModalAttrs,
  attachKeydown,
  focusElement,
  isEscapeKey,
  lockDocumentScroll,
  revealUp,
  type SectionComponentProps,
} from "../lib/helpers";

function wrapContinuousOffset(idx: number, pos: number, length: number): number {
  let diff = idx - pos;
  diff -= Math.round(diff / length) * length;
  return diff;
}

function wrapIndex(pos: number, length: number): number {
  return ((Math.round(pos) % length) + length) % length;
}

export function ShowcaseGallery({ block }: SectionComponentProps) {
  const locale = useLocale();
  const [galleryState, setGalleryState] = useState<{
    activeIndex: number;
    warm: number[];
  }>(() => {
    const initial: number[] = [];
    for (let i = 0; i < BSK_GALLERY.length; i++) {
      if (Math.abs(wrapContinuousOffset(i, 0, BSK_GALLERY.length)) <= 5) {
        initial.push(i);
      }
    }
    return { activeIndex: 0, warm: initial };
  });
  const activeIndex = galleryState.activeIndex;
  const loadedSet = useMemo(() => new Set(galleryState.warm), [galleryState.warm]);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Continuous motion refs: identical fluid glide for click-hold drag, wheel scroll, and arrow clicks
  const targetPosRef = useRef(0);
  const currentPosRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastClientXRef = useRef(0);
  const velocityPxRef = useRef(0);
  const totalMovementRef = useRef(0);
  const suppressClickRef = useRef(false);
  const wheelSnapTimerRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const kickAnimationRef = useRef<() => void>(() => {});

  const items = BSK_GALLERY;
  const activeItem = items[activeIndex] ?? items[0];

  // Unified rAF coverflow render & damping loop (runs only while animating)
  useEffect(() => {
    const length = items.length;
    if (length === 0) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const applyCardTransforms = (pos: number) => {
      const stageWidth = stageRef.current?.clientWidth ?? 1280;
      const maxVisible = stageWidth >= 960 ? 3.55 : stageWidth >= 600 ? 2.55 : 1.55;

      for (let idx = 0; idx < length; idx++) {
        const el = cardRefs.current[idx];
        if (!el) continue;

        const rel = wrapContinuousOffset(idx, pos, length);
        const abs = Math.abs(rel);
        el.dataset.ready = "true";

        if (abs > maxVisible) {
          el.style.visibility = "hidden";
          el.style.pointerEvents = "none";
          continue;
        }

        const translatePct =
          abs <= 1
            ? rel * 54
            : abs <= 2
              ? Math.sign(rel) * (54 + (abs - 1) * 42)
              : Math.sign(rel) * (96 + (abs - 2) * 34);
        const scaleVal =
          abs <= 2 ? 1 - abs * 0.16 : Math.max(0.42, 0.68 - (abs - 2) * 0.14);
        const zVal = Math.round(50 - abs * 10);
        const dim =
          abs <= 1
            ? Math.max(0.5, 1 - abs * 0.5)
            : abs <= 2
              ? Math.max(0.28, 0.5 - (abs - 1) * 0.22)
              : Math.max(0.12, 0.28 - (abs - 2) * 0.12);
        const dimHover = Math.min(1, dim + 0.24);
        const isCenterNow = abs < 0.35;

        el.style.visibility = "visible";
        el.style.pointerEvents = "auto";
        el.style.zIndex = String(zVal);
        el.style.transform = `translate(-50%, -50%) translateX(${translatePct.toFixed(2)}%) scale(${scaleVal.toFixed(4)})`;
        el.style.setProperty("--dim", dim.toFixed(3));
        el.style.setProperty("--dim-hover", dimHover.toFixed(3));
        el.dataset.active = isCenterNow ? "true" : "false";
        el.dataset.dragging = isDraggingRef.current ? "true" : "false";
      }
    };

    const tick = () => {
      const diff = targetPosRef.current - currentPosRef.current;
      const draggingNow = isDraggingRef.current;

      if (prefersReduced) {
        currentPosRef.current = targetPosRef.current;
      } else {
        const factor = draggingNow ? 0.36 : 0.15;
        currentPosRef.current += diff * factor;
      }

      applyCardTransforms(currentPosRef.current);

      const nearest = wrapIndex(currentPosRef.current, length);
      setGalleryState((prev) => {
        if (prev.activeIndex === nearest) return prev;
        const nextWarm = new Set(prev.warm);
        for (let i = 0; i < length; i++) {
          if (Math.abs(wrapContinuousOffset(i, nearest, length)) <= 5) {
            nextWarm.add(i);
          }
        }
        return {
          activeIndex: nearest,
          warm: nextWarm.size === prev.warm.length ? prev.warm : Array.from(nextWarm),
        };
      });

      const stillMoving = Math.abs(targetPosRef.current - currentPosRef.current) > 0.0012;
      if (stillMoving || draggingNow) {
        rafIdRef.current = window.requestAnimationFrame(tick);
      } else {
        currentPosRef.current = targetPosRef.current;
        applyCardTransforms(currentPosRef.current);
        rafIdRef.current = null;
      }
    };

    const startLoop = () => {
      if (rafIdRef.current === null) {
        rafIdRef.current = window.requestAnimationFrame(tick);
      }
    };

    const onResize = () => applyCardTransforms(currentPosRef.current);
    kickAnimationRef.current = startLoop;
    applyCardTransforms(currentPosRef.current);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [items.length]);

  const moveBySteps = (steps: number) => {
    targetPosRef.current = Math.round(targetPosRef.current) + steps;
    kickAnimationRef.current();
  };

  const focusNearestItem = (idx: number) => {
    const rel = wrapContinuousOffset(idx, targetPosRef.current, items.length);
    targetPosRef.current = Math.round(targetPosRef.current + rel);
    kickAnimationRef.current();
  };

  // Continuous click-hold-drag scrubbing with momentum snap on release
  useEffect(() => {
    if (!isDragging) return;
    const DRAG_PX_PER_CARD = 210;

    const onPointerMove = (e: PointerEvent) => {
      const dx = e.clientX - lastClientXRef.current;
      lastClientXRef.current = e.clientX;
      velocityPxRef.current = dx;
      totalMovementRef.current += Math.abs(dx);
      if (totalMovementRef.current > 7) {
        suppressClickRef.current = true;
      }

      targetPosRef.current -= dx / DRAG_PX_PER_CARD;
      kickAnimationRef.current();
    };

    const finishDrag = () => {
      isDraggingRef.current = false;
      setIsDragging(false);

      // Apply slight inertial carry on quick flicks before snapping cleanly to nearest card
      const flickCarry = Math.max(-0.65, Math.min(0.65, -velocityPxRef.current / 28));
      targetPosRef.current = Math.round(targetPosRef.current + flickCarry);
      velocityPxRef.current = 0;
      kickAnimationRef.current();

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
  }, [isDragging]);

  // Continuous horizontal trackpad swipe / Shift + Mouse Wheel with identical snap glide
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const WHEEL_PX_PER_CARD = 190;

    const onWheel = (e: WheelEvent) => {
      const isHorizontalIntent =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ||
        (e.shiftKey && Math.abs(e.deltaY) > 0);
      if (!isHorizontalIntent) return;

      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      targetPosRef.current += delta / WHEEL_PX_PER_CARD;
      kickAnimationRef.current();

      if (wheelSnapTimerRef.current !== null) {
        window.clearTimeout(wheelSnapTimerRef.current);
      }
      wheelSnapTimerRef.current = window.setTimeout(() => {
        targetPosRef.current = Math.round(targetPosRef.current);
        kickAnimationRef.current();
        wheelSnapTimerRef.current = null;
      }, 130);
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      stage.removeEventListener("wheel", onWheel);
      if (wheelSnapTimerRef.current !== null) {
        window.clearTimeout(wheelSnapTimerRef.current);
      }
    };
  }, []);

  // Lightbox keyboard navigation & accessible focus return
  const handleLightboxStep = (dir: -1 | 1) => {
    if (!lightboxItem || items.length <= 1) return;
    const curIdx = items.findIndex((i) => i.id === lightboxItem.id);
    if (curIdx === -1) return;
    const nextIdx = (curIdx + dir + items.length) % items.length;
    setLightboxItem(items[nextIdx]);
    focusNearestItem(nextIdx);
  };

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
      const rel = wrapContinuousOffset(nextIdx, targetPosRef.current, items.length);
      targetPosRef.current = Math.round(targetPosRef.current + rel);
      kickAnimationRef.current();
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
    isDraggingRef.current = true;
    lastClientXRef.current = e.clientX;
    velocityPxRef.current = 0;
    totalMovementRef.current = 0;
    suppressClickRef.current = false;
    setIsDragging(true);
    kickAnimationRef.current();
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

        {/* Continuous 60fps Center-Focus Coverflow Stage */}
        {activeItem && (
          <div {...revealUp(0.08)} className="mt-12">
            <div
              ref={stageRef}
              onPointerDown={onStagePointerDown}
              onDragStart={(e) => e.preventDefault()}
              className={`relative mx-auto h-[370px] w-full max-w-[1320px] touch-pan-y select-none sm:h-[470px] lg:h-[520px] ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
            >
              {items.map((item, idx) => {
                const itemTitle = locale === "en" ? item.titleEn : item.title;
                const isActive = idx === activeIndex;

                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    type="button"
                    onClick={() => {
                      if (suppressClickRef.current) return;
                      if (isActive) setLightboxItem(item);
                      else focusNearestItem(idx);
                    }}
                    aria-label={
                      isActive
                        ? `${tr("Show Foto Penuh", locale)}: ${itemTitle}`
                        : `${itemTitle}`
                    }
                    className={`bsk-coverflow-card group absolute top-1/2 left-1/2 aspect-[3/4] w-[250px] overflow-hidden rounded-2xl bg-[#141518] shadow-[0_24px_60px_rgba(0,0,0,0.85)] sm:w-[325px] lg:w-[360px] ${
                      isDragging
                        ? "cursor-grabbing"
                        : isActive
                          ? "cursor-grab"
                          : "cursor-pointer"
                    }`}
                  >
                    {loadedSet.has(idx) && (
                      <Image
                        src={item.imageUrl}
                        alt={itemTitle}
                        width={item.width}
                        height={item.height}
                        quality={75}
                        sizes="(max-width: 640px) 250px, (max-width: 1024px) 325px, 360px"
                        draggable={false}
                        className="bsk-coverflow-img h-full w-full object-cover object-center"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Clean Bottom Controls + Caption */}
            <div className="mx-auto mt-6 flex max-w-2xl items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => moveBySteps(-1)}
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
                onClick={() => moveBySteps(1)}
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
          {...ariaModalAttrs()}
          {...ariaLabelAttr(locale === "en" ? lightboxItem.titleEn : lightboxItem.title)}
        >
          <div
            className="fixed inset-0"
            onClick={() => setLightboxItem(null)}
            aria-hidden="true"
          />

          <div className="bsk-dialog-in relative z-10 flex max-h-[92vh] w-full max-w-[1040px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#090A0D] text-[#F9FAFB] shadow-2xl">
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => setLightboxItem(null)}
              {...ariaLabelAttr(tr("Tutup preview foto", locale))}
              className="absolute top-3 right-3 z-30 flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-[#141518]/90 text-white transition-colors hover:border-[#FF6B35] hover:bg-[#FF6B35] hover:text-[#111216] sm:top-4 sm:right-4"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="relative flex flex-1 items-center justify-center p-3 sm:p-5">
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

              <Image
                src={lightboxItem.imageUrl}
                alt={locale === "en" ? lightboxItem.titleEn : lightboxItem.title}
                width={lightboxItem.width}
                height={lightboxItem.height}
                quality={85}
                priority
                sizes="(max-width: 768px) 92vw, 900px"
                className="h-auto max-h-[84vh] w-auto max-w-full rounded-xl object-contain"
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
          </div>
        </div>
      )}
    </section>
  );
}