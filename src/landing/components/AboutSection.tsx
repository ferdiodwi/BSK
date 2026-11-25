"use client";

import { ArrowUpRight, Compass, Layers, Wrench } from "lucide-react";
import { site } from "../content/site";
import { bind } from "../lib/bind";
import { tr, useLocale } from "../lib/i18n";
import { imgPerfProps, revealLeft, revealRight, sortedItems, buildDirectWhatsAppUrl, type SectionComponentProps } from "../lib/helpers";
import { InstagramLogo, TikTokLogo, WhatsAppLogo } from "../ui/BrandLogos";

const PILLAR_ICONS = [Compass, Wrench, Layers] as const;

export function AboutSection({ block }: SectionComponentProps) {
  const locale = useLocale();
  const pillars = sortedItems(block.items);

  return (
    <section
      id="about"
      className="bsk-dark-section relative overflow-hidden bg-[linear-gradient(to_bottom,#07080A_0%,#0B0C10_22%,#0E1015_100%)] text-[#F9FAFB]"
    >
      {/* Minimal vertical scroll guide fading seamlessly from Hero (#07080A) into About (#0E1015) */}
      <div
        aria-hidden="true"
        className="pointer-events-none mx-auto flex max-w-[1440px] flex-col items-center pt-6"
      >
        <span className="h-10 w-px bg-gradient-to-b from-transparent via-[#FF6B35]/65 to-transparent" />
        <span className="mt-2 h-px w-24 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 pt-10 pb-20 sm:px-8 sm:pt-14 sm:pb-24 lg:px-12 lg:pt-16 lg:pb-28 xl:px-14">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left Editorial Photo Card: clean about.jpeg portrait */}
          <div {...revealLeft(0)} className="lg:col-span-5">
            <div className="group mx-auto max-w-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#141518] shadow-[0_24px_60px_rgba(0,0,0,0.6)] lg:max-w-none">
              <img
                src="/about.jpeg"
                alt={tr("Proses pengerjaan tata body dan perakitan rangka di bengkel BSK Custom", locale)}
                width={1792}
                height={2400}
                {...imgPerfProps()}
                className="aspect-[3/4] h-auto w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </div>
          </div>

          {/* Right Bento Content Block */}
          <div {...revealRight(0.08)} className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#FF6B35]" aria-hidden="true" />
              <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[#FF6B35] uppercase">
                {tr(bind(block, "subtitle", "SPESIALIS TATA BODY CB & RANGKA PRESISI"), locale)}
              </p>
            </div>

            <h2 className="mt-4 font-display text-4xl leading-[1.02] font-bold tracking-[-0.025em] text-[#F9FAFB] sm:text-5xl lg:text-[3.75rem] xl:text-[4.15rem]">
              {tr(bind(block, "title", "Tentang BSK Custom"), locale)}
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#D1D5DB] sm:text-lg">
              {tr(
                bind(
                  block,
                  "description",
                  "BSK Custom berfokus menangani tata body CB, perbaikan geometri rangka, dan penataan kaki-kaki motor klasik maupun harian. Setiap unit dikerjakan dengan pengukuran senter yang teliti, pengelasan matang, serta fitting tangki dan jok yang rapat agar tampilan motor rapi sekaligus stabil dikendarai."
                ),
                locale
              )}
            </p>

            {/* 3 Dark Bento Workmanship Cards */}
            {pillars.length > 0 && (
              <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {pillars.map((item, idx) => {
                  const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
                  return (
                    <div
                      key={idx}
                      className="group rounded-2xl border border-white/[0.08] bg-[#141518] p-6 transition-colors duration-200 hover:border-[#FF6B35]/45 hover:bg-[#16181D]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-semibold text-[#FF8A5B]">
                          0{idx + 1}
                        </span>
                        <Icon
                          className="h-5 w-5 text-[#9CA3AF] transition-colors group-hover:text-[#FF6B35]"
                          aria-hidden="true"
                        />
                      </div>
                      <h3 className="mt-5 font-display text-base leading-snug font-bold text-[#F9FAFB] sm:text-lg">
                        {tr(item.title || "", locale)}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-[#A1A1AA]">
                        {tr(item.description || "", locale)}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Primary CTA & Rounded Dark Social Actions */}
            <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-7">
              <a
                href={buildDirectWhatsAppUrl(
                  site.contact.whatsapp_number,
                  locale === "en" ? "bodywork and custom frame build" : "tata body dan custom rangka",
                  locale
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-xl bg-white px-7 py-3.5 font-sans text-xs font-bold tracking-[0.12em] text-[#111216] uppercase transition-colors hover:bg-[#FF6B35] sm:text-sm"
              >
                <span>{tr("Konsultasi Konsep Garapan", locale)}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>

              <div className="flex items-center gap-3">
                <a
                  href={site.contact.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram BSK Custom"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#141518] text-[#D1D5DB] transition-colors hover:border-[#FF6B35]/60 hover:bg-[#16181D] hover:text-[#FF6B35]"
                >
                  <InstagramLogo className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href={site.contact.tiktok_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok BSK Custom"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#141518] text-[#D1D5DB] transition-colors hover:border-[#FF6B35]/60 hover:bg-[#16181D] hover:text-[#FF6B35]"
                >
                  <TikTokLogo className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href={`https://wa.me/${site.contact.whatsapp_number}?text=${encodeURIComponent(
                    "Halo BSK Custom, saya ingin konsultasi mengenai tata body motor."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp BSK Custom"
                  className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#141518] text-[#D1D5DB] transition-colors hover:border-[#6EE7B7]/50 hover:bg-[#16181D] hover:text-[#6EE7B7]"
                >
                  <WhatsAppLogo className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}