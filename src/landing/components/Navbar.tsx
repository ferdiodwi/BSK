"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { bind } from "../lib/bind";
import { toggleLocale, useLocale } from "../lib/i18n";
import { FlagIcon } from "../ui/FlagIcon";
import { WhatsAppLogo, InstagramLogo } from "../ui/BrandLogos";
import {
  ariaLabelAttr,
  attachKeydown,
  attachWindowScroll,
  isEscapeKey,
  sortedItems,
  type SectionComponentProps,
} from "../lib/helpers";

export function Navbar({ block }: SectionComponentProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const locale = useLocale();

  const links = sortedItems(block.items);
  const waNumber = bind(block, "extra.whatsapp_number", "6285159506662");

  useEffect(() => {
    return attachWindowScroll(20, setScrolled);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    return attachKeydown((key) => {
      if (isEscapeKey(key)) setMobileMenuOpen(false);
    });
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#0B0C10]/90 shadow-2xl backdrop-blur-md py-2.5"
          : "bg-transparent py-4"
      }`}
    >
      <div className="mx-auto flex max-w-[1360px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <a
          href="#top"
          className="group flex items-center gap-3 transition-transform hover:scale-102"
        >
          <img
            src="/logo.png"
            alt="BSK Custom Logo"
            className="h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(229,25,25,0.4)] sm:h-12"
          />
          <div className="flex flex-col">
            <span className="font-hero text-xl font-extrabold tracking-wider text-white sm:text-2xl">
              BSK <span className="text-[#E51919]">CUSTOM</span>
            </span>
            <span className="text-[10px] font-bold tracking-widest text-[#FFE600] uppercase">
              TATA BODY CB
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map((item, idx) => (
            <a
              key={idx}
              href={item.icon || "#"}
              className="text-[14px] font-medium text-gray-300 transition-colors hover:text-[#E51919]"
            >
              {item.title}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Instagram Link */}
          <a
            href="https://instagram.com/bsk.custom"
            target="_blank"
            rel="noopener noreferrer"
            {...ariaLabelAttr("Instagram BSK Custom")}
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[#161822] text-gray-300 transition-all hover:border-[#E51919] hover:text-[#E51919] sm:flex"
          >
            <InstagramLogo className="h-4 w-4" />
          </a>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={toggleLocale}
            {...ariaLabelAttr("Ganti Bahasa / Switch Language")}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#161822] px-3 py-1.5 text-xs font-semibold text-gray-200 transition-all hover:border-[#E51919]"
          >
            <span>{locale.toUpperCase()}</span>
            <FlagIcon isEn={locale === "en"} />
          </button>

          {/* Quick WhatsApp CTA Button */}
          <a
            href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
              "Halo BSK Custom, saya ingin konsultasi mengenai tata body motor saya."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#E51919] to-[#FF5722] px-4 py-2 text-xs font-bold text-white shadow-[0_0_20px_rgba(229,25,25,0.35)] transition-all hover:scale-103 hover:shadow-[0_0_25px_rgba(255,87,34,0.5)] md:inline-flex"
          >
            <WhatsAppLogo className="h-4 w-4 text-white" />
            <span>KONSULTASI WA</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            {...ariaLabelAttr(mobileMenuOpen ? "Tutup menu" : "Buka menu")}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-[#161822] text-white lg:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-[60px] border-b border-white/10 bg-[#0B0C10]/95 p-5 shadow-2xl backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-3">
            {links.map((item, idx) => (
              <a
                key={idx}
                href={item.icon || "#"}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg p-2.5 text-[15px] font-semibold text-gray-200 transition-colors hover:bg-white/5 hover:text-[#E51919]"
              >
                {item.title}
              </a>
            ))}
            <a
              href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                "Halo BSK Custom, saya ingin konsultasi tata body motor."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E51919] to-[#FF5722] p-3 text-sm font-bold text-white"
            >
              <WhatsAppLogo className="h-4 w-4" />
              <span>KONSULTASI VIA WHATSAPP</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
