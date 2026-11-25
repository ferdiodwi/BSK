"use client";

import { bind } from "../lib/bind";
import { type SectionComponentProps } from "../lib/helpers";
import { InstagramLogo, TikTokLogo, WhatsAppLogo } from "../ui/BrandLogos";

export function Footer({ block }: SectionComponentProps) {
  const copyright = bind(
    block,
    "extra.copyright",
    "© 2026 BSK Custom. All Rights Reserved. Presisi Rangka & Jiwa Otomotif."
  );

  return (
    <footer className="border-t border-white/10 bg-[#08090D] py-12 text-white">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="BSK Custom Logo"
              className="h-10 w-auto object-contain drop-shadow-[0_0_10px_rgba(229,25,25,0.4)]"
            />
            <div>
              <span className="font-hero text-lg font-extrabold tracking-wider text-white">
                BSK <span className="text-[#E51919]">CUSTOM</span>
              </span>
              <p className="text-[11px] text-gray-400">
                Spesialis Tata Body CB & Rangka Presisi
              </p>
            </div>
          </div>

          {/* Quick Anchor Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-300">
            <a href="#top" className="hover:text-[#E51919] transition-colors">
              Home
            </a>
            <a href="#process" className="hover:text-[#E51919] transition-colors">
              SOP Proses
            </a>
            <a href="#services" className="hover:text-[#E51919] transition-colors">
              Paket Jasa
            </a>
            <a href="#estimator" className="hover:text-[#E51919] transition-colors">
              Kalkulator Biaya
            </a>
            <a href="#gallery" className="hover:text-[#E51919] transition-colors">
              Galeri Garapan
            </a>
            <a href="#contact" className="hover:text-[#E51919] transition-colors">
              Lokasi Workshop
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com/bsk.custom"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram BSK Custom"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#141620] text-gray-300 transition-colors hover:border-[#E51919] hover:text-[#E51919]"
            >
              <InstagramLogo className="h-4 w-4" />
            </a>
            <a
              href="https://tiktok.com/@bsk.custom"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok BSK Custom"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#141620] text-gray-300 transition-colors hover:border-[#E51919] hover:text-[#E51919]"
            >
              <TikTokLogo className="h-4 w-4" />
            </a>
            <a
              href="https://wa.me/6285159506662"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp BSK Custom"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#141620] text-[#10B981] transition-colors hover:border-[#10B981]"
            >
              <WhatsAppLogo className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 border-t border-white/5 pt-6 text-center text-xs text-gray-500">
          {copyright}
        </div>
      </div>
    </footer>
  );
}
