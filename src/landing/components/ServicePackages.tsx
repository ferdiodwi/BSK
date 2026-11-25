"use client";

import { bind } from "../lib/bind";
import { tr, useLocale } from "../lib/i18n";
import { formatIDR, revealUp, sortedItems, type SectionComponentProps } from "../lib/helpers";

export function ServicePackages({ block, onOpenEstimator }: SectionComponentProps) {
  const locale = useLocale();
  const packages = sortedItems(block.items);

  return (
    <section
      id="paket"
      className="bsk-dark-section border-b border-white/10 bg-[#141518] text-white"
    >
      <div className="mx-auto max-w-[1400px] border-x border-white/10 px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Sticky Editorial Summary (4 Cols) */}
          <div className="lg:col-span-4">
            <div {...revealUp(0)} className="lg:sticky lg:top-28">
              <span className="font-mono text-xs font-bold tracking-widest text-[#FFE600] uppercase">
                {tr(bind(block, "subtitle", "ESTIMASI TRANSPARAN"), locale)}
              </span>
              <h2 className="mt-3 font-hero text-3xl font-bold leading-tight tracking-tight text-white uppercase sm:text-4xl lg:text-5xl">
                {tr(bind(block, "title", "Paket Tata Body & Jasa Bengkel"), locale)}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#D1D5DB]">
                {tr(
                  bind(
                    block,
                    "description",
                    "Biaya jasa dihitung transparan sesuai basis motor dan tingkat pengerjaan rangka. Persetujuan pemilik selalu diminta sebelum pengerjaan dimulai."
                  ),
                  locale
                )}
              </p>

              <button
                type="button"
                onClick={() => onOpenEstimator?.({ packageId: "full-rangka" })}
                className="mt-8 inline-flex min-h-[48px] items-center justify-center bg-[#D62810] px-6 py-3 font-hero text-sm font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#C41E0A]"
              >
                {tr("Buka Kalkulator Estimasi", locale)}
              </button>

              <p className="mt-4 font-mono text-xs leading-relaxed text-[#9CA3AF]">
                {tr(
                  bind(
                    block,
                    "extra.note",
                    "Durasi pengerjaan 1 sampai 14 hari kerja bergantung antrean bengkel dan ketersediaan part."
                  ),
                  locale
                )}
              </p>
            </div>
          </div>

          {/* Right Architectural Specification Rows (8 Cols) */}
          <div className="lg:col-span-8">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {packages.map((pkg, idx) => {
                const isFeatured = Boolean(pkg.extra?.featured);
                const highlights = (pkg.extra?.highlights as string[]) ?? [];
                const duration = (pkg.extra?.duration as string) ?? "3 - 5 Hari Kerja";
                const priceDisplay = bind(
                  pkg,
                  "extra.price_display",
                  formatIDR(Number(pkg.extra?.price ?? 450000))
                );

                return (
                  <div
                    key={pkg.id ?? idx}
                    {...revealUp(Number((idx * 0.06).toFixed(2)))}
                    className={`py-7 transition-colors sm:px-6 ${
                      isFeatured ? "bg-[#1D1F26]" : "hover:bg-[#1A1C23]"
                    }`}
                  >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div className="max-w-lg">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-mono text-xs font-bold text-[#FFE600]">
                            0{idx + 1}
                          </span>
                          <h3 className="font-hero text-xl font-bold tracking-wide text-white uppercase sm:text-2xl">
                            {tr(pkg.title || "", locale)}
                          </h3>
                          {isFeatured && (
                            <span className="bg-[#FFE600] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#111216] uppercase">
                              {tr("Fokus Bengkel", locale)}
                            </span>
                          )}
                        </div>
                        <p className="mt-2.5 text-sm leading-relaxed text-[#D1D5DB]">
                          {tr(pkg.description || "", locale)}
                        </p>
                      </div>

                      <div className="shrink-0 sm:text-right">
                        <div className="font-hero text-2xl font-bold text-[#FFE600] tabular-nums sm:text-3xl">
                          {priceDisplay}
                        </div>
                        <div className="mt-1 font-mono text-xs text-[#9CA3AF]">
                          {tr("Estimasi Pengerjaan", locale)}: {duration}
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col justify-between gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-end">
                      <ul className="space-y-1.5 text-xs text-[#D1D5DB]">
                        {highlights.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 shrink-0 bg-[#D62810]" aria-hidden="true" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        type="button"
                        onClick={() => onOpenEstimator?.({ packageId: pkg.id || "full-rangka" })}
                        className="inline-flex min-h-[44px] shrink-0 items-center justify-center border border-white/25 bg-transparent px-5 py-2 font-hero text-xs font-bold tracking-wider text-white uppercase transition-colors hover:border-[#FFE600] hover:bg-[#FFE600] hover:text-[#111216]"
                      >
                        {tr("Pilih & Hitung", locale)}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
