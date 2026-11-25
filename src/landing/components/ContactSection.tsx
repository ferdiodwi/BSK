"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import { site } from "../content/site";
import { bind } from "../lib/bind";
import { tr, useLocale } from "../lib/i18n";
import { revealUp, type SectionComponentProps } from "../lib/helpers";
import { InstagramLogo, TikTokLogo, WhatsAppLogo } from "../ui/BrandLogos";

const TOPICS = [
  "Custom Rangka & Subframe",
  "Tata Body & Fitting Tangki-Jok",
  "Rolling Chassis & Kaki-Kaki",
  "Garap Mesin & Tune-Up Herex",
  "Kelistrikan & Pengapian",
  "Rakitan Mentahan & Unit Utuh",
] as const;

export function ContactSection({ block }: SectionComponentProps) {
  const locale = useLocale();
  const [name, setName] = useState("");
  const [bikeModel, setBikeModel] = useState("");
  const [topic, setTopic] = useState<string>(TOPICS[0]);
  const [notes, setNotes] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);

  const buildContactWhatsAppUrl = () => {
    const cleanPhone = site.contact.whatsapp_number.replace(/\D/g, "");
    const sender = name.trim() || (locale === "en" ? "Customer" : "Owner Motor");
    const bike = bikeModel.trim() || (locale === "en" ? "Not specified yet" : "Belum disebut");
    const detail = notes.trim();
    const translatedTopic = tr(topic, locale);

    const text =
      locale === "en"
        ? `Hello BSK Custom, my name is ${sender}.\n• Motorcycle Base: ${bike}\n• Service Needed: ${translatedTopic}${
            detail ? `\n• Notes: ${detail}` : ""
          }\n\nWould like to consult and check workshop schedule.`
        : `Halo BSK Custom, saya ${sender}.\n• Basis Motor: ${bike}\n• Keperluan: ${translatedTopic}${
            detail ? `\n• Kondisi / Catatan: ${detail}` : ""
          }\n\nMau konsultasi garapan dan cek jadwal bengkel ya min.`;

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = buildContactWhatsAppUrl();
    setSubmittedUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="kontak"
      className="bsk-dark-section relative overflow-hidden bg-[linear-gradient(to_bottom,#090A0D_0%,#0B0D12_55%,#090A0D_100%)] text-[#F9FAFB]"
    >
      <div
        aria-hidden="true"
        className="mx-auto h-px w-full max-w-[1440px] bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-24 lg:px-12 lg:py-28 xl:px-14">
        {/* Top Row: Contact Details + Quick WhatsApp Form Card */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Editorial Contact Block */}
          <div {...revealUp(0)} className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#FF6B35]" aria-hidden="true" />
              <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[#FF6B35] uppercase">
                {tr(bind(block, "subtitle", "KONTAK & KONSULTASI BENGKEL"), locale)}
              </p>
            </div>

            <h2 className="mt-4 font-display text-4xl leading-[1.04] font-bold tracking-[-0.025em] text-[#F9FAFB] sm:text-5xl lg:text-[3.5rem]">
              {tr(bind(block, "title", "Hubungi BSK Custom"), locale)}
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#D1D5DB]">
              {tr(
                bind(
                  block,
                  "description",
                  "Mau tanya soal tata bodi, custom rangka, kaki-kaki, atau janjian mampir ke bengkel? Kirim pesan lewat form di sebelah atau langsung chat WhatsApp."
                ),
                locale
              )}
            </p>

            {/* Direct Contact Channels */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${site.contact.whatsapp_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2.5 rounded-xl border border-white/10 bg-[#141518] px-4 py-2.5 text-sm font-medium text-[#F9FAFB] transition-colors hover:border-[#6EE7B7]/60 hover:text-[#6EE7B7]"
              >
                <WhatsAppLogo className="h-4 w-4 text-[#6EE7B7]" aria-hidden="true" />
                <span>{site.contact.whatsapp_display}</span>
              </a>

              <a
                href={site.contact.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-[#141518] px-4 py-2.5 text-sm font-medium text-[#D1D5DB] transition-colors hover:border-[#FF6B35]/60 hover:text-[#FF8A5B]"
              >
                <InstagramLogo className="h-4 w-4" aria-hidden="true" />
                <span>{site.contact.instagram_user}</span>
              </a>

              <a
                href={site.contact.tiktok_url}
                target={site.contact.tiktok_url.startsWith("http") ? "_blank" : undefined}
                rel={site.contact.tiktok_url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-[#141518] px-4 py-2.5 text-sm font-medium text-[#D1D5DB] transition-colors hover:border-[#FF6B35]/60 hover:text-[#FF8A5B]"
              >
                <TikTokLogo className="h-4 w-4" aria-hidden="true" />
                <span>TikTok</span>
              </a>
            </div>

            {/* 3-Column Concise Workshop Channels (matching reference layout) */}
            <div className="mt-10 grid grid-cols-1 gap-6 border-t border-white/10 pt-8 sm:grid-cols-3">
              <div>
                <h3 className="font-display text-sm font-bold text-[#F9FAFB]">
                  {tr("Konsultasi Garapan", locale)}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#9CA3AF]">
                  {tr(
                    "Tanya kecocokan tangki, jok, shock, atau rangka sebelum motor dibawa ke bengkel.",
                    locale
                  )}
                </p>
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-[#F9FAFB]">
                  {tr("Cek Slot Bengkel", locale)}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#9CA3AF]">
                  {tr(
                    "Pastikan jadwal dan kesiapan part lebih dulu via WA supaya pas datang langsung dikerjakan.",
                    locale
                  )}
                </p>
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-[#F9FAFB]">
                  {tr("Kunjungan Workshop", locale)}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#9CA3AF]">
                  {tr(
                    "Mampir langsung cek kondisi komstir, arm, atau diskusi konsep langsung bareng mekanik.",
                    locale
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Right Form Card (builds live WhatsApp consultation brief) */}
          <div {...revealUp(0.08)} className="lg:col-span-5">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/[0.08] bg-[#141518] p-6 shadow-2xl sm:p-8"
            >
              <h3 className="font-display text-2xl font-bold text-[#F9FAFB]">
                {tr("Kirim Pesan Cepat", locale)}
              </h3>
              <p className="mt-1.5 text-sm text-[#9CA3AF]">
                {tr("Isi singkat lalu langsung teruskan ke WhatsApp admin.", locale)}
              </p>

              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-[11px] font-semibold tracking-wider text-[#D1D5DB] uppercase"
                    >
                      {tr("Nama", locale)}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={tr("Nama kamu", locale)}
                      className="mt-1.5 min-h-[46px] w-full rounded-xl border border-white/10 bg-[#0E1015] px-3.5 py-2.5 text-sm text-[#F9FAFB] placeholder:text-[#9CA3AF] focus:border-[#FF6B35] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-bike"
                      className="block font-mono text-[11px] font-semibold tracking-wider text-[#D1D5DB] uppercase"
                    >
                      {tr("Basis Motor", locale)}
                    </label>
                    <input
                      id="contact-bike"
                      type="text"
                      value={bikeModel}
                      onChange={(e) => setBikeModel(e.target.value)}
                      placeholder={tr("Misal: CB 100 / GL", locale)}
                      className="mt-1.5 min-h-[46px] w-full rounded-xl border border-white/10 bg-[#0E1015] px-3.5 py-2.5 text-sm text-[#F9FAFB] placeholder:text-[#9CA3AF] focus:border-[#FF6B35] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-topic"
                    className="block font-mono text-[11px] font-semibold tracking-wider text-[#D1D5DB] uppercase"
                  >
                    {tr("Keperluan Garapan", locale)}
                  </label>
                  <select
                    id="contact-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="mt-1.5 min-h-[46px] w-full rounded-xl border border-white/10 bg-[#0E1015] px-3.5 py-2.5 text-sm text-[#F9FAFB] focus:border-[#FF6B35] focus:outline-none"
                  >
                    {TOPICS.map((opt) => (
                      <option key={opt} value={opt}>
                        {tr(opt, locale)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="contact-notes"
                      className="block font-mono text-[11px] font-semibold tracking-wider text-[#D1D5DB] uppercase"
                    >
                      {tr("Kondisi / Catatan Motor", locale)}
                    </label>
                    <span className="font-mono text-[11px] text-[#9CA3AF]">
                      {notes.length}/300
                    </span>
                  </div>
                  <textarea
                    id="contact-notes"
                    rows={3}
                    maxLength={300}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={tr(
                      "Ceritakan kondisi motor sekarang atau ubahan yang diinginkan...",
                      locale
                    )}
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0E1015] p-3.5 text-sm text-[#F9FAFB] placeholder:text-[#9CA3AF] focus:border-[#FF6B35] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-6 py-3 font-sans text-xs font-bold tracking-[0.1em] text-[#111216] uppercase transition-colors hover:bg-white sm:text-sm"
                >
                  <WhatsAppLogo className="h-4 w-4" aria-hidden="true" />
                  <span>{tr("Kirim via WhatsApp", locale)}</span>
                </button>

                {submittedUrl && (
                  <p className="text-center text-xs text-[#D1D5DB]">
                    {tr("Pesan siap dikirim:", locale)}{" "}
                    <a
                      href={submittedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#FF8A5B] underline hover:text-white"
                    >
                      {tr("Buka WhatsApp Sekarang", locale)}
                    </a>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Row: Google Maps Embed + Workshop Location Info */}
        <div
          {...revealUp(0.1)}
          className="mt-16 grid grid-cols-1 items-center gap-10 border-t border-white/10 pt-14 sm:mt-20 sm:pt-16 lg:grid-cols-12 lg:gap-12"
        >
          {/* Left Map Embed */}
          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#141518] shadow-[0_24px_60px_rgba(0,0,0,0.6)]">
              <iframe
                title={tr("Peta lokasi bengkel BSK Custom", locale)}
                src={site.contact.maps_embed_url}
                width={600}
                height={450}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="block h-[280px] w-full border-0 sm:h-[380px] lg:h-[420px]"
              />
            </div>
          </div>

          {/* Right Location Copy */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-[#FF6B35]" aria-hidden="true" />
              <p className="font-mono text-xs font-semibold tracking-[0.2em] text-[#FF6B35] uppercase">
                {tr("LOKASI WORKSHOP", locale)}
              </p>
            </div>

            <h3 className="mt-4 font-display text-3xl leading-[1.08] font-bold tracking-[-0.02em] text-[#F9FAFB] sm:text-4xl lg:text-[2.75rem]">
              {tr("Mampir Langsung ke BSK Custom", locale)}
            </h3>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#D1D5DB] sm:text-base">
              {tr(
                "Bisa bawa unit langsung ke bengkel untuk ukur rangka, fitting bodi, atau diskusi ubahan bareng mekanik. Gunakan pin Google Maps BSK CUSTOM di sebelah untuk rute tercepat.",
                locale
              )}
            </p>

            <div className="mt-6 space-y-3 rounded-2xl border border-white/[0.08] bg-[#141518] p-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#FF6B35]" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[11px] font-semibold tracking-wider text-[#9CA3AF] uppercase">
                    {tr("Titik Lokasi Maps", locale)}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-[#F9FAFB]">
                    {site.contact.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-white/[0.08] pt-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#FF6B35]" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[11px] font-semibold tracking-wider text-[#9CA3AF] uppercase">
                    {tr("WhatsApp Admin", locale)}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-[#F9FAFB]">
                    {site.contact.whatsapp_display}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-white/[0.08] pt-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#FF6B35]" aria-hidden="true" />
                <div>
                  <p className="font-mono text-[11px] font-semibold tracking-wider text-[#9CA3AF] uppercase">
                    {tr("Jadwal Workshop", locale)}
                  </p>
                  <p className="mt-0.5 text-sm text-[#D1D5DB]">
                    {tr(site.contact.hours, locale)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <a
                href={site.contact.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-sans text-xs font-bold tracking-[0.1em] text-[#111216] uppercase transition-colors hover:bg-[#FF6B35] sm:w-auto sm:text-sm"
              >
                <span>{tr("Buka di Google Maps", locale)}</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}