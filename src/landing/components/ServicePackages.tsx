"use client";

import {
  ArrowRight,
  Cog,
  Compass,
  Cpu,
  Crosshair,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { bind } from "../lib/bind";
import { tr, useLocale } from "../lib/i18n";
import { revealUp, sortedItems, type SectionComponentProps } from "../lib/helpers";

const SERVICE_ICONS = {
  rangka: Compass,
  body: Layers,
  kaki: Crosshair,
  mesin: Cog,
  kelistrikan: Cpu,
  mentahan: ShieldCheck,
} as const;

type ServiceIconKey = keyof typeof SERVICE_ICONS;

export function ServicePackages({ block, onOpenInquiry }: SectionComponentProps) {
  const locale = useLocale();
  const services = sortedItems(block.items);
  const lineTwo = bind(block, "extra.title_line2", "Presisi di rangka & mesin.");

  return (
    <section
      id="layanan"
      className="bsk-dark-section relative overflow-hidden bg-[linear-gradient(to_bottom,#0E1015_0%,#0B0C10_22%,#090A0D_100%)] text-[#F9FAFB]"
    >
      <div
        aria-hidden="true"
        className="mx-auto h-px w-full max-w-[1320px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        {/* Left-Aligned Bold Two-Line Editorial Header */}
        <div {...revealUp(0)} className="max-w-3xl">
          <p className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#FF6B35] uppercase">
            {tr(bind(block, "subtitle", "LAYANAN BENGKEL & GARAPAN CUSTOM"), locale)}
          </p>
          <h2 className="mt-3 font-display text-3xl leading-[1.06] font-bold tracking-[-0.025em] text-[#F9FAFB] sm:text-5xl">
            <span className="block">{tr(bind(block, "title", "Rapi di tata body."), locale)}</span>
            <span className="block">{tr(lineTwo, locale)}</span>
          </h2>
        </div>

        {/* Asymmetric 4-Col Bento Grid (Row 1: 2+1+1 | Row 2: 2+1+1) */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((svc, idx) => {
            const isWide = Number(svc.extra?.span ?? 1) === 2;
            const isFeatured = Boolean(svc.extra?.featured);
            const iconKey = (svc.extra?.iconKey as ServiceIconKey) ?? "rangka";
            const Icon = SERVICE_ICONS[iconKey] ?? Compass;
            const tags = (svc.extra?.tags as string[]) ?? [];
            const ctaLabel = (svc.extra?.ctaLabel as string) ?? "Konsultasi layanan ini";

            return (
              <article
                key={svc.id ?? idx}
                {...revealUp(Number((idx * 0.05).toFixed(2)))}
                className={`group flex min-h-[260px] flex-col justify-between rounded-[4px] border p-6 transition-colors duration-200 sm:p-7 lg:min-h-[295px] ${
                  isWide ? "md:col-span-2 lg:col-span-2" : "lg:col-span-1"
                } ${
                  isFeatured
                    ? "border-[#FF6B35]/40 bg-[#15171F] hover:border-[#FF6B35]/75"
                    : "border-white/[0.08] bg-[#121419] hover:border-white/25 hover:bg-[#15171E]"
                }`}
              >
                <div>
                  {/* Card Index + Technical Icon */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-mono text-xs ${
                        isFeatured ? "font-semibold text-[#FF8A5B]" : "text-[#9CA3AF]"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <Icon
                      className={`h-[18px] w-[18px] transition-colors ${
                        isFeatured
                          ? "text-[#FF8A5B]"
                          : "text-[#9CA3AF] group-hover:text-[#FF6B35]"
                      }`}
                      strokeWidth={1.6}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Service Name & Description */}
                  <h3
                    className={`mt-7 font-display leading-snug font-bold tracking-tight text-[#F9FAFB] ${
                      isWide ? "text-xl sm:text-2xl" : "text-lg sm:text-xl"
                    }`}
                  >
                    {tr(svc.title || "", locale)}
                  </h3>
                  <p
                    className={`mt-2.5 text-xs leading-relaxed text-[#A1A1AA] sm:text-[13px] ${
                      isWide ? "max-w-lg" : ""
                    }`}
                  >
                    {tr(svc.description || "", locale)}
                  </p>
                </div>

                {/* Bottom Pill Tags + Inline Consultation Trigger */}
                <div className="mt-auto pt-7">
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-full border border-white/10 bg-[#1A1C22]/85 px-3 py-1 text-[11px] font-medium text-[#D1D5DB]"
                        >
                          {tr(tag, locale)}
                        </span>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => onOpenInquiry?.({ packageId: svc.id || "full-rangka" })}
                    className={`mt-5 inline-flex min-h-[44px] w-full items-center text-left text-xs font-semibold text-[#FF8A5B] transition-colors hover:text-[#F9FAFB] ${
                      isWide ? "justify-start gap-2.5" : "justify-between gap-2"
                    }`}
                  >
                    <span>{tr(ctaLabel, locale)}</span>
                    <ArrowRight
                      className="h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}