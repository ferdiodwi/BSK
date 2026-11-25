"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Globe, Menu, X } from "lucide-react";
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
import { WhatsAppLogo } from "../ui/BrandLogos";

export function Navbar({ block }: SectionComponentProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("#hero");
  const locale = useLocale();

  const links = sortedItems(block.items);
  const waHref = buildDirectWhatsAppUrl(
    site.contact.whatsapp_number,
    locale === "en" ? "custom motorcycle build" : "konsep garapan motor",
    locale
  );

  useEffect(() => {
    return attachWindowScroll(28, setScrolled);
  }, []);

  // Track currently visible section for active nav highlight
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sectionIds = sortedItems(block.items)
      .map((item) => item.icon || "")
      .filter((href) => href.startsWith("#"))
      .map((href) => href.slice(1));

    const updateActiveByScroll = () => {
      const markerY = window.scrollY + window.innerHeight * 0.35;
      let current = sectionIds[0] ? `#${sectionIds[0]}` : "#hero";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= markerY) {
          current = `#${id}`;
        }
      }
      setActiveHash(current);
    };

    updateActiveByScroll();
    window.addEventListener("scroll", updateActiveByScroll, { passive: true });
    window.addEventListener("resize", updateActiveByScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActiveByScroll);
      window.removeEventListener("resize", updateActiveByScroll);
    };
  }, [block.items]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    return attachKeydown((key) => {
      if (isEscapeKey(key)) setMobileMenuOpen(false);
    });
  }, [mobileMenuOpen]);

  return (
    <header
      className={`bsk-dark-section fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.08] bg-[#090A0D]/85 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-md"
          : "bg-gradient-to-b from-[#07080A]/80 via-[#07080A]/35 to-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-3.5 sm:px-8 lg:px-12 xl:px-14">
        {/* Left: Brand Logo */}
        <a
          href="#hero"
          aria-label="Beranda BSK Custom"
          className="flex min-h-[44px] shrink-0 items-center transition-transform hover:scale-[1.02]"
        >
          <Image
            src="/logo.webp"
            alt="BSK Custom - Tata Body CB"
            width={560}
            height={240}
            sizes="112px"
            priority
            className="h-9 w-auto object-contain sm:h-10"
          />
        </a>

        {/* Center: Clean Horizontal Nav Links with Active Scroll Indicator */}
        <nav aria-label="Navigasi utama" className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map((item, idx) => {
            const href = item.icon || "#hero";
            const isExternal = href.startsWith("http");
            const isActive = !isExternal && activeHash === href;
            return (
              <a
                key={idx}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                aria-current={isActive ? "true" : undefined}
                className={`relative inline-flex min-h-[44px] items-center px-1 text-xs font-semibold tracking-[0.14em] whitespace-nowrap uppercase transition-colors ${
                  isActive
                    ? "text-[#FF8A5B]"
                    : "text-[#D1D5DB] hover:text-[#F9FAFB]"
                }`}
              >
                <span>{tr(item.title || "", locale)}</span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute right-1 bottom-2 left-1 h-[2px] rounded-full bg-[#FF6B35]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Language Pill + Modern Rounded WhatsApp CTA + Mobile Trigger */}
        <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={toggleLocale}
            {...ariaLabelAttr(
              locale === "id" ? "Ganti ke Bahasa Inggris" : "Switch to Indonesian"
            )}
            className="inline-flex min-h-[42px] items-center gap-1.5 rounded-xl border border-white/10 bg-[#141518]/80 px-3 font-mono text-[11px] font-semibold tracking-wider text-[#D1D5DB] uppercase transition-colors hover:border-[#FF6B35]/50 hover:text-white"
          >
            <Globe className="h-3.5 w-3.5 text-[#FF6B35]" aria-hidden="true" />
            <span>{locale.toUpperCase()}</span>
          </button>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-[42px] items-center gap-2 rounded-xl border border-[#FF6B35]/60 bg-[#141518]/80 px-4 py-2 font-sans text-xs font-bold tracking-[0.1em] whitespace-nowrap text-[#FF8A5B] uppercase backdrop-blur-sm transition-colors hover:border-[#FF6B35] hover:bg-[#FF6B35] hover:text-[#111216] md:inline-flex"
          >
            <WhatsAppLogo className="h-3.5 w-3.5" aria-hidden="true" />
            <span>{tr("Konsultasi", locale)}</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            {...ariaLabelAttr(
              mobileMenuOpen ? tr("Tutup menu navigasi", locale) : tr("Buka menu navigasi", locale)
            )}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-xl border border-white/15 bg-[#141518]/90 px-3.5 text-xs font-bold text-white uppercase transition-colors hover:border-[#FF6B35]/60 lg:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
            <span className="text-[11px] font-semibold tracking-wider">{tr("Menu", locale)}</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Navigasi seluler"
          className="border-t border-white/10 bg-[#0B0C10]/95 px-5 py-4 shadow-2xl backdrop-blur-md lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {links.map((item, idx) => {
              const href = item.icon || "#hero";
              const isExternal = href.startsWith("http");
              const isActive = !isExternal && activeHash === href;
              return (
                <a
                  key={idx}
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex min-h-[44px] items-center justify-between rounded-xl px-3.5 text-sm font-semibold tracking-wider uppercase transition-colors ${
                    isActive
                      ? "bg-[#FF6B35]/12 text-[#FF8A5B]"
                      : "text-[#E5E7EB] hover:bg-white/[0.04] hover:text-[#F9FAFB]"
                  }`}
                >
                  <span>{tr(item.title || "", locale)}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-[#FF6B35]"
                    />
                  )}
                </a>
              );
            })}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-4 text-xs font-bold tracking-[0.12em] text-[#111216] uppercase transition-colors hover:bg-white"
            >
              <WhatsAppLogo className="h-4 w-4" aria-hidden="true" />
              <span>{tr("Konsultasi", locale)}</span>
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}