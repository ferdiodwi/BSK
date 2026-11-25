"use client";

import Image from "next/image";
import { ChevronDown, Globe, MapPin, Phone } from "lucide-react";
import { site } from "../content/site";
import { bind } from "../lib/bind";
import { tr, toggleLocale, useLocale } from "../lib/i18n";
import { ariaLabelAttr, buildDirectWhatsAppUrl, type SectionComponentProps } from "../lib/helpers";
import { InstagramLogo, TikTokLogo, WhatsAppLogo } from "../ui/BrandLogos";

const NAV_LINKS = [
  { label: "Showcase", href: "#hero" },
  { label: "Tentang", href: "#about" },
  { label: "Layanan", href: "#layanan" },
  { label: "Galeri", href: "#galeri" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "Kontak", href: "#kontak" },
] as const;

const SERVICE_LINKS = [
  "Custom Rangka & Subframe",
  "Tata Body & Fitting",
  "Rolling Chassis & Kaki-Kaki",
  "Garap Mesin, Tune-Up & Herex",
  "Kelistrikan & Pengapian",
  "Rakitan Mentahan & Unit Utuh",
] as const;

export function Footer({ block }: SectionComponentProps) {
  const locale = useLocale();
  const isTikTokExternal = site.contact.tiktok_url.startsWith("http");
  const waQuickHref = buildDirectWhatsAppUrl(
    site.contact.whatsapp_number,
    locale === "en" ? "custom motorcycle build" : "konsep garapan motor",
    locale
  );

  return (
    <footer className="bsk-dark-section border-t border-white/10 bg-[#090A0D] text-[#F9FAFB]">
      <div className="mx-auto max-w-[1440px] px-5 pt-10 pb-8 sm:px-8 sm:pt-14 sm:pb-10 lg:px-12 xl:px-14">
        {/* Tier 1: Brand Logo & Workshop Tagline */}
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-8 sm:flex-row sm:items-center">
          <a
            href="#hero"
            aria-label="BSK Custom"
            className="inline-flex min-h-[44px] items-center gap-3 self-start transition-opacity hover:opacity-90"
          >
            <Image
              src="/logo.webp"
              alt="BSK Custom"
              width={560}
              height={240}
              sizes="112px"
              className="h-9 w-auto object-contain sm:h-10"
            />
          </a>

          <p className="text-sm text-[#A1A1AA]">
            {tr(
              bind(block, "description", "Tata body rapi. Rangka presisi. Siap turun jalan."),
              locale
            )}
          </p>
        </div>

        {/* Tier 2: Navigation, Service Focus, Contact Rows & Language/Social Controls */}
        <div className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 sm:gap-10 sm:py-12 lg:grid-cols-12">
          {/* Col 1: Page Navigation */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold tracking-wide text-[#F9FAFB]">
              {tr("Bengkel", locale)}
            </h3>
            <ul className="mt-3 space-y-1 md:mt-4 md:space-y-2.5">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-[#9CA3AF] transition-colors hover:text-[#FF8A5B] md:min-h-[28px]"
                  >
                    {tr(item.label, locale)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Workshop Specialties */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold tracking-wide text-[#F9FAFB]">
              {tr("Layanan", locale)}
            </h3>
            <ul className="mt-3 space-y-1 md:mt-4 md:space-y-2.5">
              {SERVICE_LINKS.map((svc) => (
                <li key={svc}>
                  <a
                    href="#layanan"
                    className="inline-flex min-h-[44px] items-center text-sm text-[#9CA3AF] transition-colors hover:text-[#FF8A5B] md:min-h-[28px]"
                  >
                    {tr(svc, locale)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Contact & Location */}
          <div className="lg:col-span-4">
            <h3 className="font-display text-sm font-bold tracking-wide text-[#F9FAFB]">
              {tr("Kontak", locale)}
            </h3>
            <ul className="mt-4 space-y-3.5">
              <li>
                <a
                  href={`https://wa.me/${site.contact.whatsapp_number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[44px] items-center gap-3 text-sm text-[#D1D5DB] transition-colors hover:text-[#6EE7B7]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#141518] text-[#FF6B35] transition-colors group-hover:border-[#6EE7B7]/40 group-hover:text-[#6EE7B7]">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>{site.contact.whatsapp_display}</span>
                </a>
              </li>

              <li>
                <a
                  href={site.contact.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[44px] items-center gap-3 text-sm text-[#D1D5DB] transition-colors hover:text-[#FF8A5B]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#141518] text-[#FF6B35] transition-colors group-hover:border-[#FF6B35]/50">
                    <InstagramLogo className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>{site.contact.instagram_user}</span>
                </a>
              </li>

              <li>
                <a
                  href={site.contact.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[44px] items-center gap-3 text-sm text-[#D1D5DB] transition-colors hover:text-[#FF8A5B]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#141518] text-[#FF6B35] transition-colors group-hover:border-[#FF6B35]/50">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span>{site.contact.address}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Language Switcher Pill & Social Squares */}
          <div className="flex flex-col justify-start gap-5 lg:col-span-3 lg:items-end">
            <button
              type="button"
              onClick={toggleLocale}
              {...ariaLabelAttr(
                locale === "id" ? "Ganti ke Bahasa Inggris" : "Switch to Indonesian"
              )}
              className="inline-flex min-h-[44px] items-center gap-2.5 self-start rounded-xl border border-white/15 bg-[#141518] px-4 py-2 text-xs font-semibold text-[#F9FAFB] transition-colors hover:border-[#FF6B35]/60 lg:self-end"
            >
              <Globe className="h-4 w-4 text-[#FF6B35]" aria-hidden="true" />
              <span>{locale === "id" ? "Indonesia" : "English"}</span>
              <ChevronDown className="h-3.5 w-3.5 text-[#9CA3AF]" aria-hidden="true" />
            </button>

            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={site.contact.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram BSK Custom"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#141518] text-[#D1D5DB] transition-colors hover:border-[#FF6B35]/60 hover:text-[#FF6B35]"
              >
                <InstagramLogo className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href={site.contact.tiktok_url}
                target={isTikTokExternal ? "_blank" : undefined}
                rel={isTikTokExternal ? "noopener noreferrer" : undefined}
                aria-label="TikTok BSK Custom"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#141518] text-[#D1D5DB] transition-colors hover:border-[#FF6B35]/60 hover:text-[#FF6B35]"
              >
                <TikTokLogo className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href={waQuickHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp BSK Custom"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#141518] text-[#D1D5DB] transition-colors hover:border-[#6EE7B7]/50 hover:text-[#6EE7B7]"
              >
                <WhatsAppLogo className="h-4 w-4" aria-hidden="true" />
              </a>

              <a
                href={site.contact.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Google Maps BSK Custom"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#141518] text-[#D1D5DB] transition-colors hover:border-[#FF6B35]/60 hover:text-[#FF6B35]"
              >
                <MapPin className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Tier 3: Bottom Bar */}
        <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row sm:items-center">
          <p className="text-xs text-[#9CA3AF]">
            © 2026 BSK Custom.{" "}
            {tr("Spesialis Tata Body CB & Rangka Presisi.", locale)}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-[#9CA3AF]">
            <a href="#hero" className="inline-flex min-h-[44px] items-center transition-colors hover:text-[#F9FAFB] md:min-h-[28px]">
              {tr("Kembali ke Atas", locale)}
            </a>
            <a
              href={waQuickHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center transition-colors hover:text-[#FF8A5B] md:min-h-[28px]"
            >
              {tr("Chat WhatsApp", locale)}
            </a>
            <a
              href={site.contact.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center transition-colors hover:text-[#FF8A5B] md:min-h-[28px]"
            >
              {tr("Rute Bengkel", locale)}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}