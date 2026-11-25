"use client";

import { ArrowUpRight, Check, Clock } from "lucide-react";
import { bind } from "../lib/bind";
import { tr, useLocale } from "../lib/i18n";
import { revealUp, sortedItems, type SectionComponentProps } from "../lib/helpers";

export function ServicePackages({ block, onOpenInquiry }: SectionComponentProps) {
  const locale = useLocale();
  const packages = sortedItems(block.items);

  return (
    <section
      id="layanan"
      className="bsk-dark-section relative overflow-hidden bg-[linear-gradient(to_bottom,#0E1015_0%,#0B0C10_100%)] text-[#F9FAFB]"
    >
      {/* Subtle seamless section divider matching AboutSection gradient exit */}
      <div
        aria-hidden="true"
        className="mx-auto h-px w-full max-w-[1320px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
        {/* Top Split Editorial Header */}
        <div
          {...revealUp(0)}
          className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-7 bg-[#FF6B35]" aria-hidden="true" />
              <p className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#FF6B35] uppercase">
                {tr(bind(block, "subtitle", "RUANG LINGKUP GARAPAN"), locale)}
              </p>
            </div>
            <h2 className="mt-4 font-display text-3xl leading-[1.04] font-bold tracking-[-0.025em] text-[#F9FAFB] sm:text-5xl">
              {tr(bind(block, "title", "Layanan Tata Body & Jasa Bengkel"), locale)}
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#D1D5DB]">
            {tr(
              bind(
                block,
                "description",
                "Penentuan rincian pengerjaan disesuaikan dengan kondisi rangka awal, basis motor, dan kelengkapan part. Kirim konsep motor Anda untuk cek jadwal dan penawaran langsung via WhatsApp."
              ),
              locale
            )}
          </p>
        </div>

        {/* 2x2 Dark Bento Package Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
          {packages.map((pkg, idx) => {
            const isFeatured = Boolean(pkg.extra?.featured);
            const highlights = (pkg.extra?.highlights as string[]) ?? [];
            const duration = (pkg.extra?.duration as string) ?? "3 - 5 Hari Kerja";
            const scope = (pkg.extra?.scope as string) ?? "Tata Body & Rangka";

            return (
              <article
                key={pkg.id ?? idx}
                {...revealUp(Number((idx * 0.06).toFixed(2)))}
                className={`flex flex-col justify-between rounded-2xl border p-6 transition-colors duration-200 sm:p-7 ${
                  isFeatured
                    ? "border-[#FF6B35]/35 bg-[#16181F] hover:border-[#FF6B35]/60"
                    : "border-white/[0.08] bg-[#141518] hover:border-white/20 hover:bg-[#16181F]"
                }`}
              >
                <div>
                  {/* Meta Header: Index, Featured Tag & Duration Chip */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-semibold text-[#FF8A5B]">
                        0{idx + 1}
                      </span>
                      {isFeatured && (
                        <span className="rounded-full border border-[#FF6B35]/30 bg-[#FF6B35]/12 px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-[0.12em] text-[#FF8A5B] uppercase">
                          {tr("Fokus Bengkel", locale)}
                        </span>
                      )}
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-[#D1D5DB]">
                      <Clock className="h-3.5 w-3.5 text-[#FF6B35]" aria-hidden="true" />
                      {tr(duration, locale)}
                    </span>
                  </div>

                  {/* Scope & Package Headline */}
                  <p className="mt-5 font-mono text-[11px] tracking-[0.14em] text-[#9CA3AF] uppercase">
                    {tr(scope, locale)}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl leading-snug font-bold tracking-tight text-[#F9FAFB] sm:text-2xl">
                    {tr(pkg.title || "", locale)}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#D1D5DB]">
                    {tr(pkg.description || "", locale)}
                  </p>

                  {/* Workmanship Highlights */}
                  {highlights.length > 0 && (
                    <ul className="mt-5 space-y-2 border-t border-white/[0.08] pt-4">
                      {highlights.map((feat, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-start gap-2.5 text-xs leading-relaxed text-[#A1A1AA]"
                        >
                          <Check
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FF6B35]"
                            aria-hidden="true"
                          />
                          <span>{tr(feat, locale)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Package Consultation Trigger */}
                <div className="mt-6 pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenInquiry?.({ packageId: pkg.id || "full-rangka" })}
                    className={`inline-flex min-h-[44px] w-full items-center justify-between rounded-xl px-5 py-2.5 font-sans text-xs font-bold tracking-[0.12em] uppercase transition-colors ${
                      isFeatured
                        ? "bg-white text-[#111216] hover:bg-[#FF6B35]"
                        : "border border-white/15 bg-white/[0.03] text-[#F9FAFB] hover:border-[#FF6B35] hover:bg-[#FF6B35] hover:text-[#111216]"
                    }`}
                  >
                    <span>{tr("Konsultasi Paket Ini", locale)}</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Workshop Note & Custom Request Bar */}
        <div
          {...revealUp(0.18)}
          className="mt-6 flex flex-col justify-between gap-4 rounded-2xl border border-white/[0.08] bg-[#141518] px-5 py-4 sm:flex-row sm:items-center sm:px-6"
        >
          <p className="font-mono text-xs leading-relaxed text-[#9CA3AF]">
            {tr(
              bind(
                block,
                "extra.note",
                "Waktu pengerjaan bergantung pada antrean bengkel, kondisi rangka awal, dan ketersediaan part."
              ),
              locale
            )}
          </p>

          <button
            type="button"
            onClick={() => onOpenInquiry?.({ packageId: "full-rangka" })}
            className="inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-xl border border-[#FF6B35]/40 bg-[#FF6B35]/10 px-5 py-2.5 font-sans text-xs font-bold tracking-[0.1em] text-[#FF8A5B] uppercase transition-colors hover:border-[#FF6B35] hover:bg-[#FF6B35] hover:text-[#111216]"
          >
            <span>{tr("Ajukan Konsep Garapan", locale)}</span>
            <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}