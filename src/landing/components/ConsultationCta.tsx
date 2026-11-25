"use client";

import { bind } from "../lib/bind";
import { revealUp, type SectionComponentProps } from "../lib/helpers";
import { WhatsAppLogo } from "../ui/BrandLogos";
import { MessageSquareText } from "lucide-react";

export function ConsultationCta({ block }: SectionComponentProps) {
  const waNumber = bind(block, "extra.whatsapp_number", "6285159506662");

  return (
    <section className="relative overflow-hidden bg-[#0B0C10] py-20 lg:py-24">
      {/* Background Neon Glow */}
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 bg-gradient-to-r from-[#E51919]/10 via-[#FF5722]/15 to-[#FFE600]/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
        <div
          {...revealUp(0)}
          className="relative overflow-hidden rounded-3xl border border-[#E51919]/40 bg-gradient-to-r from-[#171924] via-[#1C1F2D] to-[#171924] p-8 text-center shadow-[0_0_50px_rgba(229,25,25,0.25)] sm:p-12 lg:p-16"
        >
          {/* Subtle Speedline background in card */}
          <div className="hero-grid-field pointer-events-none absolute inset-0 opacity-40" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#E51919]/20 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#FFE600]">
              <MessageSquareText className="h-3.5 w-3.5" />
              <span>KONSULTASI GRATIS</span>
            </span>

            <h2 className="mt-5 font-hero text-2xl font-extrabold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
              {bind(block, "title", "PUNYA MOTOR CB ATAU RANGKA YANG INGIN DITATA?")}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">
              {bind(
                block,
                "description",
                "Mulai dari sekadar pasang tangki, set rangka, hingga bangun full custom dari nol. Tim BSK Custom siap mewujudkannya dengan hasil rapi dan bergaransi."
              )}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                  "Halo BSK Custom, saya mau konsultasi konsep tata body motor saya."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#10B981] to-[#059669] px-8 py-4 font-hero text-sm font-bold tracking-wider text-white uppercase shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all hover:scale-104 hover:shadow-[0_0_35px_rgba(16,185,129,0.6)]"
              >
                <WhatsAppLogo className="h-5 w-5" />
                <span>{bind(block, "extra.cta_label", "Chat WhatsApp Sekarang")}</span>
              </a>

              <a
                href="#estimator"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-[#141620] px-6 py-4 font-hero text-sm font-bold tracking-wider text-gray-200 uppercase transition-all hover:border-[#E51919] hover:text-white"
              >
                <span>Buka Kalkulator Biaya</span>
              </a>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              {bind(block, "extra.sub_label", "Gratis Konsultasi Konsep & Perhitungan Biaya")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
