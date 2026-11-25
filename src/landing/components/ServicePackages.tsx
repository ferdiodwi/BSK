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
        className="mx-auto h-px w-full max-w-[1440px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28 xl:px-14">
        {/* Left-Aligned Bold Two-Line Editorial Header */}
        <div {...revealUp(0)} className="max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[#FF6B35]" aria-hidden="true" />
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[#FF6B35] uppercase">
              {tr(bind(block, "subtitle", "LAYANAN BENGKEL & GARAPAN CUSTOM"), locale)}
            </p>
          </div>
          <h2 className="mt-4 font-display text-[2.15rem] leading-[1.04] font-bold tracking-[-0.025em] text-[#F9FAFB] sm:text-5xl lg:text-[3.5rem] xl:text-[3.85rem]">
            <span className="block">{tr(bind(block, "title", "Rapi di tata body."), locale)}</span>
            <span className="block">{tr(lineTwo, locale)}</span>
          </h2>
        </div>

        {/* Asymmetric 4-Col Bento Grid matching AboutSection card language */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {services.map((svc, idx) => {
            const isWide = Number(svc.extra?.span ?? 1) === 2;
            const iconKey = (svc.extra?.iconKey as ServiceIconKey) ?? "rangka";
            const Icon = SERVICE_ICONS[iconKey] ?? Compass;
            const tags = (svc.extra?.tags as string[]) ?? [];
            const ctaLabel = (svc.extra?.ctaLabel as string) ?? "Konsultasi layanan ini";

            return (
              <article
                key={svc.id ?? idx}
                {...revealUp(Number((idx * 0.05).toFixed(2)))}
                className={`group flex min-h-[290px] flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#141518] p-6 transition-colors duration-200 hover:border-[#FF6B35]/45 hover:bg-[#16181D] sm:p-7 xl:p-8 lg:min-h-[330px] ${
                  isWide ? "md:col-span-2 lg:col-span-2" : "lg:col-span-1"
                }`}
              >
                <div>
                  {/* Card Index + Technical Icon (matched to AboutSection cards) */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-semibold text-[#FF8A5B]">
                      0{idx + 1}
                    </span>
                    <Icon
                      className="h-5 w-5 text-[#9CA3AF] transition-colors group-hover:text-[#FF6B35]"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Service Name & Description */}
                  <h3
                    className={`mt-7 font-display leading-snug font-bold tracking-tight text-[#F9FAFB] ${
                      isWide ? "text-2xl sm:text-[1.75rem]" : "text-xl sm:text-[1.35rem]"
                    }`}
                  >
                    {tr(svc.title || "", locale)}
                  </h3>
                  <p
                    className={`mt-3 text-sm leading-relaxed text-[#A1A1AA] sm:text-[15px] ${
                      isWide ? "max-w-xl" : ""
                    }`}
                  >
                    {tr(svc.description || "", locale)}
                  </p>
                </div>

                {/* Bottom Pill Tags + Inline Consultation Trigger */}
                <div className="mt-auto pt-8">
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-full border border-white/10 bg-[#1A1C22]/85 px-3.5 py-1.5 text-xs font-medium text-[#D1D5DB]"
                        >
                          {tr(tag, locale)}
                        </span>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => onOpenInquiry?.({ packageId: svc.id || "full-rangka" })}
                    className={`mt-5 inline-flex min-h-[44px] w-full items-center text-left text-[13px] font-semibold text-[#FF8A5B] transition-colors hover:text-[#F9FAFB] sm:text-sm ${
                      isWide ? "justify-start gap-2.5" : "justify-between gap-2"
                    }`}
                  >
                    <span>{tr(ctaLabel, locale)}</span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
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