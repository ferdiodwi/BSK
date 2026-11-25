"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { tr, toggleLocale, useLocale } from "../lib/i18n";
import { FlagIcon } from "../ui/FlagIcon";
import { InstagramLogo } from "../ui/BrandLogos";
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
    return attachWindowScroll(16, setScrolled);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    return attachKeydown((key) => {
      if (isEscapeKey(key)) setMobileMenuOpen(false);
    });
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-40 transition-colors duration-200 border-b ${
        scrolled
          ? "border-black/10 bg-[#FFFFFF] shadow-sm"
          : "border-black/10 bg-[#F5F5F6]"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-6 lg:px-10">
        {/* Brand Identity */}
        <a
          href="#hero"
          className="flex min-h-[44px] items-center gap-3 text-[#111216] transition-opacity hover:opacity-85"
        >
          <img
            src="/logo.png"
            alt="Logo BSK Custom"
            width={2048}
            height={2048}
            className="h-9 w-9 object-contain sm:h-10 sm:w-10"
          />
          <div className="flex flex-col leading-none">
            <span className="font-hero text-xl font-bold tracking-tight text-[#111216] sm:text-2xl">
              BSK <span className="text-[#D62810]">CUSTOM</span>
            </span>
            <span className="mt-0.5 font-mono text-[10px] font-semibold tracking-widest text-[#4B5563] uppercase">
              TATA BODY CB
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav aria-label="Navigasi utama" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map((item, idx) => (
            <a
              key={idx}
              href={item.icon || "#hero"}
              className="inline-flex min-h-[44px] items-center px-1 text-sm font-semibold text-[#111216] transition-colors hover:text-[#D62810]"
            >
              {tr(item.title || "", locale)}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://instagram.com/bsk.custom"
            target="_blank"
            rel="noopener noreferrer"
            {...ariaLabelAttr("Instagram BSK Custom")}
            className="hidden h-11 w-11 items-center justify-center border border-black/15 bg-white text-[#111216] transition-colors hover:border-[#D62810] hover:text-[#D62810] sm:inline-flex"
          >
            <InstagramLogo className="h-4 w-4" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={toggleLocale}
            {...ariaLabelAttr(locale === "id" ? "Ganti ke Bahasa Inggris" : "Switch to Indonesian")}
            className="inline-flex min-h-[44px] items-center gap-2 border border-black/15 bg-white px-3 text-xs font-bold text-[#111216] transition-colors hover:border-[#111216]"
          >
            <span>{locale.toUpperCase()}</span>
            <FlagIcon isEn={locale === "en"} />
          </button>

          <button
            type="button"
            onClick={() => onOpenInquiry?.()}
            className="hidden min-h-[44px] items-center bg-[#D62810] px-5 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#C41E0A] active:scale-[0.98] md:inline-flex"
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
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 border border-black/20 bg-white px-3 text-xs font-bold text-[#111216] uppercase transition-colors hover:border-[#111216] lg:hidden"
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
          className="border-t border-black/10 bg-white px-4 py-4 shadow-lg lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {links.map((item, idx) => (
              <a
                key={idx}
                href={item.icon || "#hero"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center px-3 text-sm font-semibold text-[#111216] transition-colors hover:bg-[#F5F5F6] hover:text-[#D62810]"
              >
                {tr(item.title || "", locale)}
              </a>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-black/10 pt-3">
              <a
                href="https://instagram.com/bsk.custom"
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center justify-center gap-2 border border-black/15 bg-[#F5F5F6] px-3 text-xs font-bold text-[#111216]"
              >
                <InstagramLogo className="h-4 w-4" aria-hidden="true" />
                <span>@bsk.custom</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry?.();
                }}
                className="flex min-h-[44px] items-center justify-center bg-[#D62810] px-3 text-xs font-bold tracking-wider text-white uppercase"
              >
                {tr("Ajukan Konsep", locale)}
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
