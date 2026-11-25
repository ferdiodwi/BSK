"use client";

import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";
import { BSK_TESTIMONIALS, type TestimonialItem } from "../content/site";
import { bind } from "../lib/bind";
import { tr, useLocale } from "../lib/i18n";
import { revealUp, type SectionComponentProps } from "../lib/helpers";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function wrapTrackOffset(x: number, setWidth: number): number {
  if (setWidth <= 0) return 0;
  const mod = ((x % setWidth) + setWidth) % setWidth;
  return mod - setWidth;
}

function TestimonialCard({
  item,
  locale,
  onCardHover,
}: {
  item: TestimonialItem;
  locale: "id" | "en";
  onCardHover: (hovered: boolean) => void;
}) {
  return (
    <article
      onMouseEnter={() => onCardHover(true)}
      onMouseLeave={() => onCardHover(false)}
      className="bsk-testimonial-card flex h-full w-[290px] shrink-0 flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#141518] p-5 transition-colors duration-200 hover:border-[#FF6B35]/45 hover:bg-[#16181D] sm:w-[370px] sm:p-7 lg:w-[400px]"
    >
      <div>
        <Quote className="h-6 w-6 fill-[#FF6B35] text-[#FF6B35]" aria-hidden="true" />
        <p className="mt-4 text-sm leading-relaxed text-[#E5E7EB] sm:text-[15px]">
          {locale === "en" ? item.quoteEn : item.quote}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-3.5 border-t border-white/[0.08] pt-4">
        <div
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#1B1D24] font-mono text-xs font-bold text-[#FF8A5B]"
        >
          {getInitials(item.name)}
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-display text-sm font-bold text-[#F9FAFB]">
            {item.name}
          </h3>
          <p className="truncate text-xs text-[#9CA3AF]">
            {locale === "en" ? item.bikeEn : item.bike}
          </p>
        </div>
      </div>
    </article>
  );
}

function MarqueeRow({
  items,
  direction,
  locale,
  ariaLabel,
}: {
  items: TestimonialItem[];
  direction: "right" | "left";
  locale: "id" | "en";
  ariaLabel: string;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  const offsetPxRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const lastClientXRef = useRef(0);
  const velocityPxRef = useRef(0);
  const setWidthRef = useRef(0);

  // Measure single-set width (3 identical sets make loop seamless even on ultrawide displays)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let initialized = false;

    const measure = () => {
      const single = track.scrollWidth / 3;
      if (single > 0) {
        setWidthRef.current = single;
        if (!initialized && direction === "left") {
          offsetPxRef.current = -210;
        }
        initialized = true;
        offsetPxRef.current = wrapTrackOffset(offsetPxRef.current, single);
        track.style.transform = `translate3d(${offsetPxRef.current.toFixed(2)}px, 0, 0)`;
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items.length, direction]);

  // Continuous 60fps auto-scroll + inertial release + hover pause
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const baseSpeed = prefersReduced ? 0 : direction === "right" ? 38 : -38;

    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      const setWidth = setWidthRef.current;

      if (setWidth > 0 && !isDraggingRef.current) {
        if (Math.abs(velocityPxRef.current) > 0.25) {
          offsetPxRef.current = wrapTrackOffset(
            offsetPxRef.current + velocityPxRef.current,
            setWidth
          );
          velocityPxRef.current *= 0.92;
        } else {
          velocityPxRef.current = 0;
          if (!isHoveredRef.current && baseSpeed !== 0) {
            offsetPxRef.current = wrapTrackOffset(
              offsetPxRef.current + baseSpeed * dt,
              setWidth
            );
          }
        }
        track.style.transform = `translate3d(${offsetPxRef.current.toFixed(2)}px, 0, 0)`;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [direction]);

  // Global drag-hold tracking so dragging continues smoothly beyond card edges
  useEffect(() => {
    if (!isDragging) return;
    const track = trackRef.current;

    const onPointerMove = (e: PointerEvent) => {
      const dx = e.clientX - lastClientXRef.current;
      lastClientXRef.current = e.clientX;
      velocityPxRef.current = dx * 0.75;

      const setWidth = setWidthRef.current;
      if (track && setWidth > 0) {
        offsetPxRef.current = wrapTrackOffset(offsetPxRef.current + dx, setWidth);
        track.style.transform = `translate3d(${offsetPxRef.current.toFixed(2)}px, 0, 0)`;
      }
    };

    const finishDrag = (e: PointerEvent) => {
      isDraggingRef.current = false;
      setIsDragging(false);
      const underCursor = document.elementFromPoint(e.clientX, e.clientY);
      isHoveredRef.current = Boolean(underCursor?.closest(".bsk-testimonial-card"));
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

  // Support horizontal trackpad / Shift + Mouse Wheel scrolling cleanly
  useEffect(() => {
    const region = regionRef.current;
    const track = trackRef.current;
    if (!region || !track) return;

    const onWheel = (e: WheelEvent) => {
      const isHorizontalIntent =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ||
        (e.shiftKey && Math.abs(e.deltaY) > 0);
      if (!isHorizontalIntent) return;

      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const setWidth = setWidthRef.current;
      if (setWidth > 0) {
        offsetPxRef.current = wrapTrackOffset(offsetPxRef.current - delta, setWidth);
        track.style.transform = `translate3d(${offsetPxRef.current.toFixed(2)}px, 0, 0)`;
      }
    };

    region.addEventListener("wheel", onWheel, { passive: false });
    return () => region.removeEventListener("wheel", onWheel);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    isDraggingRef.current = true;
    lastClientXRef.current = e.clientX;
    velocityPxRef.current = 0;
    setIsDragging(true);
  };

  return (
    <div
      ref={regionRef}
      role="region"
      aria-label={ariaLabel}
      onPointerDown={onPointerDown}
      onDragStart={(e) => e.preventDefault()}
      className={`relative flex overflow-hidden touch-pan-y select-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      <div ref={trackRef} className="flex w-max will-change-transform">
        {items.map((item) => (
          <div key={item.id} className="flex pr-4 sm:pr-5">
            <TestimonialCard
              item={item}
              locale={locale}
              onCardHover={(hovered) => {
                isHoveredRef.current = hovered;
              }}
            />
          </div>
        ))}

        {/* Duplicate sets for seamless wrap and ultrawide screens (hidden from screen readers) */}
        {[1, 2].map((copyIdx) => (
          <div key={copyIdx} aria-hidden="true" className="flex">
            {items.map((item) => (
              <div key={`${item.id}-dup-${copyIdx}`} className="flex pr-4 sm:pr-5">
                <TestimonialCard
                  item={item}
                  locale={locale}
                  onCardHover={(hovered) => {
                    isHoveredRef.current = hovered;
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TestimonialsSection({ block }: SectionComponentProps) {
  const locale = useLocale();
  const lineTwo = bind(block, "extra.title_line2", "Lempeng, Rapi, Enak Dipake.");
  const mid = Math.ceil(BSK_TESTIMONIALS.length / 2);
  const topRow = BSK_TESTIMONIALS.slice(0, mid);
  const bottomRow = BSK_TESTIMONIALS.slice(mid);

  return (
    <section
      id="testimoni"
      className="bsk-dark-section relative overflow-hidden bg-[linear-gradient(to_bottom,#090A0D_0%,#0B0D12_50%,#090A0D_100%)] text-[#F9FAFB]"
    >
      <div
        aria-hidden="true"
        className="mx-auto h-px w-full max-w-[1440px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      {/* Centered Editorial Headline matching dual-marquee showcase reference */}
      <div className="mx-auto max-w-[1440px] px-5 pt-14 sm:px-8 sm:pt-24 lg:px-12 lg:pt-28 xl:px-14">
        <div {...revealUp(0)} className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="h-[1px] w-7 bg-[#FF6B35]" aria-hidden="true" />
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[#FF6B35] uppercase">
              {tr(bind(block, "subtitle", "CERITA DARI BENGKEL"), locale)}
            </p>
            <span className="h-[1px] w-7 bg-[#FF6B35]" aria-hidden="true" />
          </div>
          <h2 className="mt-4 font-display text-[2.15rem] leading-[1.06] font-bold tracking-[-0.025em] text-[#F9FAFB] sm:text-5xl lg:text-[3.5rem] xl:text-[3.85rem]">
            <span className="block">{tr(bind(block, "title", "Kata Anak Motor."), locale)}</span>
            <span className="block">{tr(lineTwo, locale)}</span>
          </h2>
        </div>
      </div>

      {/* Opposing Dual-Row Draggable & Hover-Pausable Marquee */}
      <div {...revealUp(0.08)} className="relative mx-auto mt-10 max-w-[1600px] pb-14 sm:mt-12 sm:pb-24 lg:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-[#090A0D] to-transparent sm:w-28 lg:w-44"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-[#090A0D] to-transparent sm:w-28 lg:w-44"
        />

        <div className="space-y-4 sm:space-y-5">
          <MarqueeRow
            items={topRow}
            direction="right"
            locale={locale}
            ariaLabel={tr("Testimoni pelanggan baris atas", locale)}
          />

          <MarqueeRow
            items={bottomRow}
            direction="left"
            locale={locale}
            ariaLabel={tr("Testimoni pelanggan baris bawah", locale)}
          />
        </div>
      </div>
    </section>
  );
}