"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { tr, toggleLocale, useLocale } from "../lib/i18n";
import { FlagIcon } from "../ui/FlagIcon";
import {
  ariaLabelAttr,
  attachKeydown,
  attachWindowScroll,
  isEscapeKey,
  sortedItems,
  type SectionComponentProps,
} from "../lib/helpers";

export function Navbar({ block, onOpenInquiry }: SectionComponentProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const locale = useLocale();

  const links = sortedItems(block.items);

  useEffect(() => {
    return attachWindowScroll(32, setScrolled);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    return attachKeydown((key) => {
      if (isEscapeKey(key)) setMobileMenuOpen(false);
    });
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        scrolled
          ? "border-b border-white/15 bg-[#141518]/95 shadow-lg"
          : "bg-gradient-to-b from-black/80 via-black/45 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3.5 sm:px-8 lg:px-12">
        {/* Trimmed BSK Custom Brand Sticker Logo */}
        <a
          href="#hero"
          aria-label="Beranda BSK Custom"
          className="flex min-h-[44px] items-center transition-transform hover:scale-[1.02]"
        >
          <img
            src="/logo.png"
            alt="BSK Custom - Tata Body CB"
            width={1935}
            height={828}
            className="h-9 w-auto object-contain sm:h-11 lg:h-12"
          />
        </a>

        {/* Centered Editorial Nav Links */}
        <nav aria-label="Navigasi utama" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map((item, idx) => (
            <a
              key={idx}
              href={item.icon || "#hero"}
              className="inline-flex min-h-[44px] items-center px-1 font-hero text-xs font-semibold tracking-widest text-[#F3F4F6] uppercase transition-colors hover:text-[#FF6B35]"
            >
              {tr(item.title || "", locale)}
            </a>
          ))}
        </nav>

        {/* Right Controls: Language Toggle + Rectangular Bordered Action (Harley TEST RIDE motif) */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={toggleLocale}
            {...ariaLabelAttr(locale === "id" ? "Ganti ke Bahasa Inggris" : "Switch to Indonesian")}
            className="inline-flex min-h-[44px] items-center gap-2 border border-white/25 bg-[#141518]/80 px-3 text-xs font-bold text-[#F3F4F6] transition-colors hover:border-white"
          >
            <span>{locale.toUpperCase()}</span>
            <FlagIcon isEn={locale === "en"} />
          </button>

          <button
            type="button"
            onClick={() => onOpenInquiry?.()}
            className="hidden min-h-[44px] items-center border border-[#FF5722] bg-[#141518]/75 px-5 font-hero text-xs font-bold tracking-widest text-[#FF6B35] uppercase transition-colors hover:border-[#D62810] hover:bg-[#D62810] hover:text-white active:scale-[0.98] md:inline-flex"
          >
            {tr("Ajukan Konsep", locale)}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            {...ariaLabelAttr(
              mobileMenuOpen ? tr("Tutup menu navigasi", locale) : tr("Buka menu navigasi", locale)
            )}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 border border-white/25 bg-[#141518]/85 px-3 text-xs font-bold text-white uppercase transition-colors hover:border-white lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
            <span>{tr("Menu", locale)}</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Navigasi seluler"
          className="border-t border-white/15 bg-[#141518] px-4 py-4 shadow-2xl lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {links.map((item, idx) => (
              <a
                key={idx}
                href={item.icon || "#hero"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center px-3 font-hero text-sm font-semibold tracking-wider text-[#F3F4F6] uppercase transition-colors hover:bg-white/5 hover:text-[#FF6B35]"
              >
                {tr(item.title || "", locale)}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry?.();
              }}
              className="mt-3 flex min-h-[44px] w-full items-center justify-center bg-[#D62810] px-4 font-hero text-xs font-bold tracking-widest text-white uppercase hover:bg-[#C41E0A]"
            >
              {tr("Ajukan Konsep", locale)}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
