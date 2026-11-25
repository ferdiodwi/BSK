"use client";

import { site } from "../content/site";
import { bind } from "../lib/bind";
import { tr, useLocale } from "../lib/i18n";
import { imgPerfProps, revealLeft, revealRight, sortedItems, type SectionComponentProps } from "../lib/helpers";
import { InstagramLogo, TikTokLogo, WhatsAppLogo } from "../ui/BrandLogos";

export function AboutSection({ block, onOpenInquiry }: SectionComponentProps) {
  const locale = useLocale();
  const pillars = sortedItems(block.items);

  return (
    <section
      id="about"
      className="border-b border-black/10 bg-[#F3F0EA] text-[#111216]"
    >
      <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Portrait Photo (about.jpeg: builder working on CB/GL at BSK workshop) */}
          <div {...revealLeft(0)} className="lg:col-span-5">
            <div className="mx-auto max-w-[440px] overflow-hidden bg-[#141518] shadow-[0_18px_40px_rgba(17,18,22,0.14)] lg:max-w-none">
              <img
                src="/about.jpeg"
                alt="Proses pengerjaan tata body dan perakitan rangka di bengkel BSK Custom"
                width={1792}
                height={2400}
                {...imgPerfProps()}
                className="aspect-[3/4] h-auto w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Right Content Block (matching clean 2-column reference + 3 workshop standards) */}
          <div {...revealRight(0.08)} className="lg:col-span-7">
            <h2 className="font-condensed text-4xl leading-[0.94] tracking-tight text-[#111216] uppercase sm:text-5xl lg:text-6xl">
              {tr(bind(block, "title", "Tentang BSK Custom"), locale)}
            </h2>

            <p className="mt-3 font-hero text-sm font-bold tracking-[0.12em] text-[#C41E0A] uppercase sm:text-base">
              {tr(bind(block, "subtitle", "BSK CUSTOM - SPESIALIS TATA BODY CB & RANGKA PRESISI"), locale)}
            </p>

            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#374151] sm:text-base">
              {tr(
                bind(
                  block,
                  "description",
                  "BSK Custom berfokus menangani tata body CB, perbaikan geometri rangka, dan penataan kaki-kaki motor klasik maupun harian. Setiap unit dikerjakan dengan pengukuran senter yang teliti, pengelasan matang, serta fitting tangki dan jok yang rapat agar tampilan motor rapi sekaligus stabil dikendarai."
                ),
                locale
              )}
            </p>

            {/* 3 Workshop Workmanship Standards */}
            {pillars.length > 0 && (
              <div className="mt-8 grid grid-cols-1 gap-6 border-t border-black/15 pt-7 sm:grid-cols-3">
                {pillars.map((item, idx) => (
                  <div key={idx}>
                    <span className="font-mono text-xs font-bold text-[#C41E0A]">
                      0{idx + 1}
                    </span>
                    <h3 className="mt-1.5 font-hero text-sm font-bold tracking-wide text-[#111216] uppercase">
                      {tr(item.title || "", locale)}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[#4B5563]">
                      {tr(item.description || "", locale)}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Social Links & Consultation Action */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-6">
              <div className="flex items-center gap-2">
                <a
                  href={site.contact.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram BSK Custom"
                  className="flex h-11 w-11 items-center justify-center border border-black/15 bg-white text-[#111216] transition-colors hover:border-[#C41E0A] hover:text-[#C41E0A]"
                >
                  <InstagramLogo className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={site.contact.tiktok_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok BSK Custom"
                  className="flex h-11 w-11 items-center justify-center border border-black/15 bg-white text-[#111216] transition-colors hover:border-[#C41E0A] hover:text-[#C41E0A]"
                >
                  <TikTokLogo className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={`https://wa.me/${site.contact.whatsapp_number}?text=${encodeURIComponent(
                    "Halo BSK Custom, saya ingin konsultasi mengenai tata body motor."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp BSK Custom"
                  className="flex h-11 w-11 items-center justify-center border border-black/15 bg-white text-[#111216] transition-colors hover:border-[#047857] hover:text-[#047857]"
                >
                  <WhatsAppLogo className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <button
                type="button"
                onClick={() => onOpenInquiry?.()}
                className="inline-flex min-h-[44px] items-center justify-center bg-[#141518] px-6 py-2.5 font-hero text-xs font-bold tracking-widest text-white uppercase transition-colors hover:bg-[#C41E0A]"
              >
                {tr("Konsultasi Konsep Garapan", locale)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
