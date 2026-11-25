"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "../content/site";
import { tr, toggleLocale, useLocale } from "../lib/i18n";
import {
  ariaLabelAttr,
  attachKeydown,
  attachWindowScroll,
  buildDirectWhatsAppUrl,
  isEscapeKey,
  sortedItems,
  type SectionComponentProps,
} from "../lib/helpers";

export function Navbar({ block }: SectionComponentProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const locale = useLocale();

  const links = sortedItems(block.items);
  const waHref = buildDirectWhatsAppUrl(
    site.contact.whatsapp_number,
    locale === "en" ? "custom motorcycle build" : "konsep garapan motor",
    locale
  );

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
          : "bg-gradient-to-b from-black/75 via-black/35 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8 lg:px-14">
        {/* Left: Brand Logo */}
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
            className="h-9 w-auto object-contain sm:h-11"
          />
        </a>

        {/* Center: Clean Horizontal Nav Links */}
        <nav aria-label="Navigasi utama" className="hidden items-center gap-7 lg:flex xl:gap-9">
          {links.map((item, idx) => {
            const href = item.icon || "#hero";
            const isExternal = href.startsWith("http");
            return (
              <a
                key={idx}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="inline-flex min-h-[44px] items-center px-1 font-hero text-[13px] font-medium tracking-[0.14em] text-[#E5E7EB] uppercase transition-colors hover:text-[#FF6B35]"
              >
                {tr(item.title || "", locale)}
              </a>
            );
          })}
        </nav>

        {/* Right: Minimal Language Toggle + Direct WhatsApp CTA */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggleLocale}
            {...ariaLabelAttr(locale === "id" ? "Ganti ke Bahasa Inggris" : "Switch to Indonesian")}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center px-2 font-mono text-[11px] font-bold tracking-wider text-[#D1D5DB] uppercase transition-colors hover:text-white"
          >
            {locale.toUpperCase()}
          </button>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-[44px] items-center border border-[#FF5722] bg-transparent px-6 font-hero text-xs font-semibold tracking-[0.16em] text-[#FF6B35] uppercase transition-colors hover:border-[#D62810] hover:bg-[#D62810] hover:text-white active:scale-[0.98] md:inline-flex"
          >
            {tr("Ajukan Konsep", locale)}
          </a>

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
            {links.map((item, idx) => {
              const href = item.icon || "#hero";
              const isExternal = href.startsWith("http");
              return (
                <a
                  key={idx}
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex min-h-[44px] items-center px-3 font-hero text-sm font-semibold tracking-wider text-[#F3F4F6] uppercase transition-colors hover:bg-white/5 hover:text-[#FF6B35]"
                >
                  {tr(item.title || "", locale)}
                </a>
              );
            })}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 flex min-h-[44px] w-full items-center justify-center bg-[#D62810] px-4 font-hero text-xs font-bold tracking-widest text-white uppercase hover:bg-[#C41E0A]"
            >
              {tr("Ajukan Konsep", locale)}
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}