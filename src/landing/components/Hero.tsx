"use client";

import { useState } from "react";
import { bind } from "../lib/bind";
import {
  formatIDR,
  heroEnterAttr,
  speedLineAttr,
  type SectionComponentProps,
} from "../lib/helpers";
import { SealBadge } from "../ui/SealBadge";
import { WhatsAppLogo } from "../ui/BrandLogos";
import { Wrench, ShieldCheck, CheckCircle2 } from "lucide-react";

export function Hero({ block }: SectionComponentProps) {
  const [selectedBikeIdx, setSelectedBikeIdx] = useState(0);

  const bikes = block.items ?? [];
  const activeBike = bikes[selectedBikeIdx] ?? bikes[0];
  const waNumber = bind(block, "extra.whatsapp_number", "6285159506662");

  return (
    <section
      id="top"
      className="relative min-h-[92vh] overflow-hidden bg-[#0B0C10] pt-28 pb-16 lg:pt-36 lg:pb-24"
    >
      {/* Background Carbon & Grid Effect */}
      <div className="hero-grid-field pointer-events-none absolute inset-0 z-0 opacity-60" />

      {/* Dynamic Animated Speed Line Path (GSAP Target) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 320"
        className="pointer-events-none absolute top-12 left-0 z-0 h-[220px] w-full opacity-35"
      >
        <path
          d="M-50,180 Q320,40 720,200 T1490,90"
          fill="none"
          stroke="url(#racingGradient)"
          strokeWidth="3"
          {...speedLineAttr(0.2, 1.4)}
        />
        <defs>
          <linearGradient id="racingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E51919" />
            <stop offset="50%" stopColor="#FF5722" />
            <stop offset="100%" stopColor="#FFE600" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Headlines & Action CTA */}
          <div className="lg:col-span-7">
            {/* Top Category Badge */}
            <div {...heroEnterAttr(0)} className="inline-flex items-center gap-2 rounded-full border border-[#E51919]/40 bg-[#161822]/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FFE600] shadow-[0_0_15px_rgba(229,25,25,0.2)]">
              <span className="h-2 w-2 rounded-full bg-[#E51919] animate-pulse" />
              <span>{bind(block, "extra.badge_text", "SPESIALIS TATA BODY CB & HEREX")}</span>
            </div>

            {/* Giant Racing Headline */}
            <h1 {...heroEnterAttr(0.1)} className="mt-5 font-hero text-[clamp(2.5rem,5.5vw,4.8rem)] font-extrabold leading-[0.98] tracking-tight text-white uppercase">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400">
                {bind(block, "title", "PRESISI RANGKA")}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E51919] via-[#FF5722] to-[#FFE600]">
                {bind(block, "subtitle", "SEMPURNA DI SETIAP SUDUT")}
              </span>
            </h1>

            {/* Sub-description */}
            <p {...heroEnterAttr(0.2)} className="mt-6 max-w-[620px] text-base leading-relaxed text-gray-300 sm:text-lg">
              {bind(
                block,
                "description",
                "Bengkel spesialis tata body CB, restorasi rangka center, dan custom kaki-kaki motor klasik/herex. Dikerjakan dengan alat ukur presisi dan standar pengerjaan rapi tanpa kompromi."
              )}
            </p>

            {/* Trust Metrics Bar */}
            <div {...heroEnterAttr(0.25)} className="mt-8 grid grid-cols-3 gap-3 border-y border-white/10 py-4 sm:gap-6 sm:py-5">
              <div>
                <div className="font-hero text-2xl font-bold text-white sm:text-3xl">
                  {bind(block, "extra.stat_bikes", "1.200+")}
                </div>
                <div className="text-xs text-gray-400">
                  {bind(block, "extra.stat_bikes_label", "Motor Ditata Center")}
                </div>
              </div>
              <div className="border-x border-white/10 px-3 sm:px-6">
                <div className="font-hero text-2xl font-bold text-[#FFE600] sm:text-3xl">
                  {bind(block, "extra.stat_rating", "4.9 ★")}
                </div>
                <div className="text-xs text-gray-400">
                  {bind(block, "extra.stat_rating_label", "Kepuasan Komunitas")}
                </div>
              </div>
              <div>
                <div className="font-hero text-2xl font-bold text-[#10B981] sm:text-3xl">
                  {bind(block, "extra.stat_warranty", "100%")}
                </div>
                <div className="text-xs text-gray-400">
                  {bind(block, "extra.stat_warranty_label", "Garansi Rangka Lurus")}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div {...heroEnterAttr(0.3)} className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#estimator"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#E51919] to-[#FF5722] px-6 py-3.5 font-hero text-sm font-bold tracking-wider text-white uppercase shadow-[0_0_25px_rgba(229,25,25,0.4)] transition-all hover:scale-103 hover:shadow-[0_0_35px_rgba(255,87,34,0.6)]"
              >
                <Wrench className="h-4 w-4" />
                <span>{bind(block, "extra.primary_cta_label", "Hitung Estimasi Biaya")}</span>
              </a>

              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent(
                  "Halo BSK Custom, saya mau konsultasi langsung via WhatsApp."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-[#161822] px-6 py-3.5 font-hero text-sm font-bold tracking-wider text-gray-200 uppercase transition-all hover:border-[#10B981] hover:text-[#10B981]"
              >
                <WhatsAppLogo className="h-4 w-4 text-[#10B981]" />
                <span>{bind(block, "extra.secondary_cta_label", "Konsultasi WhatsApp")}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Bike Card & Seal Badge */}
          <div className="relative lg:col-span-5">
            {/* Guarantee Seal Badge */}
            <div className="absolute -top-6 -right-2 z-20 sm:-top-8 sm:-right-4">
              <SealBadge
                href="#process"
                label="Garansi Presisi 100%"
                topSlot={bind(block, "extra.seal_top", "PRESISI")}
                bottomSlot={bind(block, "extra.seal_bottom", "GARANSI")}
              />
            </div>

            {/* Interactive Motor Model Showcase Card */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#14161F] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                  <ShieldCheck className="h-4 w-4 text-[#E51919]" />
                  <span>Kategori Motor Spesialisasi</span>
                </div>
                <span className="rounded-full bg-[#E51919]/20 px-2.5 py-0.5 text-[11px] font-bold text-[#FFE600]">
                  BSK Spec
                </span>
              </div>

              {/* Bike Switcher Buttons */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {bikes.map((bike, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedBikeIdx(idx)}
                    className={`rounded-xl p-2.5 text-left text-xs font-bold transition-all ${
                      selectedBikeIdx === idx
                        ? "border border-[#E51919] bg-[#E51919]/15 text-white shadow-[0_0_15px_rgba(229,25,25,0.3)]"
                        : "border border-white/5 bg-[#1B1E2A] text-gray-400 hover:text-white"
                    }`}
                  >
                    {bike.title}
                  </button>
                ))}
              </div>

              {/* Active Bike Preview Detail */}
              {activeBike && (
                <div className="mt-6 rounded-2xl border border-white/5 bg-[#0D0E12] p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#E51919]">
                        {bind(activeBike, "extra.badge", "Pilihan Favorit")}
                      </span>
                      <h4 className="mt-1 font-hero text-xl font-bold text-white">
                        {activeBike.title}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-gray-400">Mulai Dari</span>
                      <div className="font-hero text-lg font-bold text-[#FFE600]">
                        {formatIDR(Number(activeBike.extra?.base_price ?? 650000))}
                      </div>
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-relaxed text-gray-300">
                    {activeBike.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981]" />
                      Senter Waterpass
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#10B981]" />
                      Las Seamless Rapi
                    </span>
                  </div>
                </div>
              )}

              {/* Quick direct book CTA */}
              <a
                href="#estimator"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-[#E51919]/40 bg-[#1B1E2A] py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#E51919]"
              >
                <span>PILIH OPSI DETAIL DI ESTIMATOR</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
