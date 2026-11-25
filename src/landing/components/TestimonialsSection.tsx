"use client";

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

function TestimonialCard({
  item,
  locale,
}: {
  item: TestimonialItem;
  locale: "id" | "en";
}) {
  return (
    <article className="flex h-full w-[310px] shrink-0 flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#141518] p-6 transition-colors duration-200 hover:border-[#FF6B35]/45 hover:bg-[#16181D] sm:w-[370px] sm:p-7 lg:w-[400px]">
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
  const animClass =
    direction === "right" ? "bsk-marquee-right" : "bsk-marquee-left";

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className="group/marquee relative flex overflow-hidden"
    >
      <div
        className={`flex w-max will-change-transform group-hover/marquee:[animation-play-state:paused] motion-reduce:w-full motion-reduce:overflow-x-auto motion-reduce:[animation:none] ${animClass}`}
      >
        {items.map((item) => (
          <div key={item.id} className="flex pr-4 sm:pr-5">
            <TestimonialCard item={item} locale={locale} />
          </div>
        ))}

        {/* Seamless loop duplicate hidden from screen readers and motion-reduce fallback */}
        <div aria-hidden="true" className="flex motion-reduce:hidden">
          {items.map((item) => (
            <div key={`${item.id}-dup`} className="flex pr-4 sm:pr-5">
              <TestimonialCard item={item} locale={locale} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection({ block }: SectionComponentProps) {
  const locale = useLocale();
  const lineTwo = bind(block, "extra.title_line2", "Lempeng, Rapi, Siap Jalan.");
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
      <div className="mx-auto max-w-[1440px] px-5 pt-20 sm:px-8 sm:pt-24 lg:px-12 lg:pt-28 xl:px-14">
        <div {...revealUp(0)} className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center justify-center gap-3">
            <span className="h-[1px] w-7 bg-[#FF6B35]" aria-hidden="true" />
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[#FF6B35] uppercase">
              {tr(bind(block, "subtitle", "CATATAN OWNER & ANAK BENGKEL"), locale)}
            </p>
            <span className="h-[1px] w-7 bg-[#FF6B35]" aria-hidden="true" />
          </div>
          <h2 className="mt-4 font-display text-[2.15rem] leading-[1.06] font-bold tracking-[-0.025em] text-[#F9FAFB] sm:text-5xl lg:text-[3.5rem] xl:text-[3.85rem]">
            <span className="block">{tr(bind(block, "title", "Kata Pemilik Motor."), locale)}</span>
            <span className="block">{tr(lineTwo, locale)}</span>
          </h2>
        </div>
      </div>

      {/* Opposing Dual-Row Scrolling Marquee Track */}
      <div {...revealUp(0.08)} className="relative mx-auto mt-12 max-w-[1600px] pb-20 sm:pb-24 lg:pb-28">
        {/* Soft Left & Right Edge Vignettes */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#090A0D] to-transparent sm:w-28 lg:w-44"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#090A0D] to-transparent sm:w-28 lg:w-44"
        />

        <div className="space-y-4 sm:space-y-5">
          {/* Top Row Scrolling Right */}
          <MarqueeRow
            items={topRow}
            direction="right"
            locale={locale}
            ariaLabel={tr("Testimoni pelanggan baris atas", locale)}
          />

          {/* Bottom Row Scrolling Left */}
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