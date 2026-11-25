"use client";

import { site } from "../content/site";
import { bind } from "../lib/bind";
import { tr, useLocale } from "../lib/i18n";
import { type SectionComponentProps } from "../lib/helpers";
import { InstagramLogo, TikTokLogo } from "../ui/BrandLogos";

export function Footer({ block, onOpenInquiry }: SectionComponentProps) {
  const locale = useLocale();
  const copyright = bind(
    block,
    "extra.copyright",
    "© 2026 BSK Custom. Tata Body CB & Rangka Presisi."
  );

  return (
    <footer className="bsk-dark-section bg-[#141518] py-10 text-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-center">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo BSK Custom"
              width={1935}
              height={828}
              className="h-9 w-auto object-contain"
            />
            <div>
              <span className="font-hero text-lg font-bold tracking-wider text-white uppercase">
                BSK <span className="text-[#FFE600]">CUSTOM</span>
              </span>
              <p className="font-mono text-[11px] text-[#9CA3AF]">
                TATA BODY CB
              </p>
            </div>
          </div>

          {/* Anchor Navigation matching actual sections */}
          <nav aria-label="Navigasi footer" className="flex flex-wrap items-center gap-5 text-xs font-semibold text-[#D1D5DB]">
            <a href="#hero" className="inline-flex min-h-[44px] items-center hover:text-[#FFE600]">
              {tr("Showcase", locale)}
            </a>
            <a href="#anatomi" className="inline-flex min-h-[44px] items-center hover:text-[#FFE600]">
              {tr("Anatomi Presisi", locale)}
            </a>
            <a href="#paket" className="inline-flex min-h-[44px] items-center hover:text-[#FFE600]">
              {tr("Layanan & Paket", locale)}
            </a>
            <a href="#galeri" className="inline-flex min-h-[44px] items-center hover:text-[#FFE600]">
              {tr("Galeri Unit", locale)}
            </a>
            <a href="#bengkel" className="inline-flex min-h-[44px] items-center hover:text-[#FFE600]">
              {tr("Bengkel", locale)}
            </a>
            <button
              type="button"
              onClick={() => onOpenInquiry?.()}
              className="inline-flex min-h-[44px] items-center text-[#FFE600] hover:underline"
            >
              {tr("Ajukan Konsep", locale)}
            </button>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-2.5">
            <a
              href={site.contact.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram BSK Custom"
              className="flex h-11 w-11 items-center justify-center border border-white/15 text-[#D1D5DB] transition-colors hover:border-[#FFE600] hover:text-[#FFE600]"
            >
              <InstagramLogo className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={site.contact.tiktok_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok BSK Custom"
              className="flex h-11 w-11 items-center justify-center border border-white/15 text-[#D1D5DB] transition-colors hover:border-[#FFE600] hover:text-[#FFE600]"
            >
              <TikTokLogo className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-2 text-xs text-[#9CA3AF] sm:flex-row">
          <p>{copyright}</p>
          <p>{site.contact.instagram_user}</p>
        </div>
      </div>
    </footer>
  );
}
