"use client";

import { useState } from "react";
import { bind } from "../lib/bind";
import { formatIDR, revealUp, sortedItems, type SectionComponentProps } from "../lib/helpers";
import { ServiceEstimatorModal } from "./ServiceEstimatorModal";
import { Check, Clock, ArrowRight, Sparkles } from "lucide-react";

export function ServicePackages({ block }: SectionComponentProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPkgId, setSelectedPkgId] = useState<string>("full-rangka");

  const packages = sortedItems(block.items);

  const handleOpenModal = (pkgTitle?: string) => {
    if (pkgTitle?.includes("Standar")) setSelectedPkgId("standar");
    else if (pkgTitle?.includes("Full Rangka")) setSelectedPkgId("full-rangka");
    else if (pkgTitle?.includes("Restorasi")) setSelectedPkgId("restorasi");
    else setSelectedPkgId("tune-up");

    setModalOpen(true);
  };

  return (
    <section id="services" className="relative overflow-hidden bg-[#0B0C10] py-20 lg:py-28">
      {/* Background Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#E51919]/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div {...revealUp(0)} className="text-center">
          <span className="inline-block rounded-full bg-[#E51919]/15 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#FFE600] border border-[#E51919]/30">
            {bind(block, "subtitle", "PILIHAN TEPAT SESUAI KEBUTUHAN MOTOR ANDA")}
          </span>
          <h2 className="mt-4 font-hero text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            {bind(block, "title", "PAKET TATA BODY & JASA BENGKEL")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">
            {bind(
              block,
              "description",
              "Semua paket sudah termasuk konsultasi konsep, pengerjaan presisi, dan garansi kelurusan rangka."
            )}
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div id="estimator" className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg, idx) => {
            const isFeatured = Boolean(pkg.extra?.featured);
            const features = (pkg.extra?.features as string[]) ?? [];
            const duration = (pkg.extra?.duration as string) ?? "3-5 Hari";

            return (
              <div
                key={idx}
                {...revealUp(Number((idx * 0.08).toFixed(2)))}
                className={`relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02] ${
                  isFeatured
                    ? "border-2 border-[#E51919] bg-gradient-to-b from-[#1C1F2E] to-[#12141C] shadow-[0_0_35px_rgba(229,25,25,0.3)]"
                    : "border border-white/10 bg-[#141620] hover:border-white/20"
                }`}
              >
                {/* Popular Ribbon for Featured Card */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#E51919] to-[#FF5722] px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-md flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3" />
                    <span>Paling Diminati</span>
                  </div>
                )}

                <div>
                  {/* Package Title */}
                  <h3 className="font-hero text-xl font-bold text-white uppercase tracking-wide">
                    {pkg.title}
                  </h3>

                  {/* Price Tag */}
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-hero text-2xl font-extrabold text-[#FFE600] sm:text-3xl">
                      {bind(pkg, "extra.price_display", formatIDR(Number(pkg.extra?.price ?? 450000)))}
                    </span>
                  </div>

                  {/* Working Duration Badge */}
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock className="h-3.5 w-3.5 text-[#E51919]" />
                    <span>Estimasi: {duration}</span>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-xs leading-relaxed text-gray-300 border-t border-white/10 pt-4">
                    {pkg.description}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="mt-5 space-y-2.5">
                    {features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-200">
                        <Check className="h-4 w-4 shrink-0 text-[#10B981] stroke-[2.5]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Direct Action Button */}
                <button
                  type="button"
                  onClick={() => handleOpenModal(pkg.title)}
                  className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl py-3 font-hero text-xs font-bold tracking-wider uppercase transition-all ${
                    isFeatured
                      ? "bg-gradient-to-r from-[#E51919] to-[#FF5722] text-white shadow-[0_0_20px_rgba(229,25,25,0.4)] hover:shadow-[0_0_30px_rgba(255,87,34,0.6)]"
                      : "border border-white/20 bg-[#1B1E2A] text-white hover:border-[#E51919] hover:bg-[#E51919]"
                  }`}
                >
                  <span>HITUNG ESTIMASI</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Global Footer Note */}
        <div {...revealUp(0.3)} className="mt-12 text-center text-xs text-gray-400">
          {bind(block, "extra.note", "Estimasi waktu pengerjaan 3 - 14 hari kerja tergantung antrian dan paket.")}
        </div>
      </div>

      {/* Interactive Estimator Modal */}
      <ServiceEstimatorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialPackageId={selectedPkgId}
      />
    </section>
  );
}
