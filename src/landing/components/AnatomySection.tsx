"use client";

import { useState } from "react";
import { ANATOMY_POINTS, BSK_BIKES } from "../content/site";
import { bind } from "../lib/bind";
import { tr, useLocale } from "../lib/i18n";
import { imgPerfProps, revealUp, type SectionComponentProps } from "../lib/helpers";

export function AnatomySection({ block, onOpenInquiry }: SectionComponentProps) {
  const locale = useLocale();
  const [activePointId, setActivePointId] = useState(ANATOMY_POINTS[1].id);
  const [unitKey, setUnitKey] = useState<"black-gold" | "raw-frame">("raw-frame");

  const inspectionBike =
    unitKey === "raw-frame"
      ? BSK_BIKES.find((b) => b.id === "cb-raw-frame") ?? BSK_BIKES[1]
      : BSK_BIKES.find((b) => b.id === "cb-black-gold") ?? BSK_BIKES[0];

  const activePoint =
    ANATOMY_POINTS.find((p) => p.id === activePointId) ?? ANATOMY_POINTS[0];

  return (
    <section
      id="anatomi"
      className="border-b border-black/10 bg-white text-[#111216]"
    >
      <div className="mx-auto max-w-[1400px] border-x border-black/10 px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        {/* Top Header Row */}
        <div {...revealUp(0)} className="flex flex-col justify-between gap-6 border-b border-black/10 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <span className="font-mono text-xs font-bold tracking-widest text-[#D62810] uppercase">
              {tr(bind(block, "subtitle", "INSPEKSI TEKNIS"), locale)}
            </span>
            <h2 className="mt-2 font-hero text-3xl font-bold tracking-tight text-[#111216] uppercase sm:text-4xl lg:text-5xl">
              {tr(bind(block, "title", "Anatomi Tata Body Presisi"), locale)}
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#4B5563]">
            {tr(
              bind(
                block,
                "description",
                "Pilih titik pemeriksaan pada motor untuk melihat standar pengerjaan dan penyetelan BSK Custom."
              ),
              locale
            )}
          </p>
        </div>

        {/* Asymmetric 12-Col Inspection Workspace */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left 7 Cols: Interactive Motorcycle Blueprint Canvas */}
          <div className="lg:col-span-7">
            <div className="border border-black/10 bg-[#F5F5F6] p-4 sm:p-6">
              {/* Switch between finished Rolling Chassis (5.png) and Raw Bare Frame (8.png) */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-4">
                <span className="font-mono text-xs font-semibold text-[#4B5563] uppercase">
                  {tr("Unit Inspeksi", locale)}
                </span>
                <div className="inline-flex border border-black/15 bg-white">
                  <button
                    type="button"
                    aria-pressed={unitKey === "raw-frame"}
                    onClick={() => setUnitKey("raw-frame")}
                    className={`min-h-[44px] px-4 text-xs font-bold uppercase transition-colors ${
                      unitKey === "raw-frame"
                        ? "bg-[#141518] text-white"
                        : "bg-white text-[#111216] hover:bg-[#F5F5F6]"
                    }`}
                  >
                    CB Raw Frame
                  </button>
                  <button
                    type="button"
                    aria-pressed={unitKey === "black-gold"}
                    onClick={() => setUnitKey("black-gold")}
                    className={`min-h-[44px] border-l border-black/15 px-4 text-xs font-bold uppercase transition-colors ${
                      unitKey === "black-gold"
                        ? "bg-[#141518] text-white"
                        : "bg-white text-[#111216] hover:bg-[#F5F5F6]"
                    }`}
                  >
                    CB 100 Black Gold
                  </button>
                </div>
              </div>

              {/* Keep 1:1 square ratio matching 2048x2048 cutouts so hotspot coordinates align across breakpoints */}
              <div className="relative mx-auto mt-4 aspect-square w-full max-w-[440px]">
                <img
                  key={inspectionBike.id}
                  src={inspectionBike.imageUrl}
                  alt={`Inspeksi anatomi rangka ${inspectionBike.name}`}
                  width={2048}
                  height={2048}
                  {...imgPerfProps()}
                  className="h-full w-full object-contain"
                />

                {ANATOMY_POINTS.map((point) => {
                  const isActive = point.id === activePoint.id;
                  return (
                    <button
                      key={point.id}
                      type="button"
                      onClick={() => setActivePointId(point.id)}
                      aria-pressed={isActive}
                      aria-label={`${point.number} ${locale === "en" ? point.titleEn : point.title}`}
                      style={{ left: `${point.xPercent}%`, top: `${point.yPercent}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border-2 font-mono text-xs font-bold shadow-md transition-transform ${
                        isActive
                          ? "z-20 scale-110 border-white bg-[#D62810] text-white"
                          : "z-10 border-[#141518] bg-white text-[#111216] hover:scale-105 hover:bg-[#141518] hover:text-white"
                      }`}
                    >
                      {point.number}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Active Engineering Detail & Point Selector List */}
          <div className="flex flex-col justify-between lg:col-span-5">
            {/* Point Selection Tabs */}
            <div>
              <span className="font-mono text-xs font-bold tracking-wider text-[#4B5563] uppercase">
                {tr("Titik Pengecekan", locale)}
              </span>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                {ANATOMY_POINTS.map((point) => {
                  const isActive = point.id === activePoint.id;
                  return (
                    <button
                      key={point.id}
                      type="button"
                      onClick={() => setActivePointId(point.id)}
                      aria-pressed={isActive}
                      className={`flex min-h-[48px] items-center justify-between border px-4 py-3 text-left transition-colors ${
                        isActive
                          ? "border-[#141518] bg-[#141518] text-white"
                          : "border-black/10 bg-[#F5F5F6] text-[#111216] hover:border-black/30"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`font-mono text-xs font-bold ${
                            isActive ? "text-[#FFE600]" : "text-[#D62810]"
                          }`}
                        >
                          {point.number}
                        </span>
                        <span className="text-sm font-bold">
                          {locale === "en" ? point.titleEn : point.title}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Specification Readout */}
            <div className="mt-6 border border-black/10 bg-[#F5F5F6] p-6">
              <div className="flex items-center justify-between border-b border-black/10 pb-3">
                <span className="font-mono text-xs font-bold text-[#D62810] uppercase">
                  {tr("Standar Pengerjaan", locale)} · {activePoint.number}
                </span>
                <span className="font-mono text-xs font-semibold text-[#111216]">
                  {locale === "en" ? activePoint.standardEn : activePoint.standard}
                </span>
              </div>

              <h3 className="mt-4 font-hero text-2xl font-bold text-[#111216] uppercase">
                {locale === "en" ? activePoint.titleEn : activePoint.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#4B5563]">
                {locale === "en" ? activePoint.detailEn : activePoint.detail}
              </p>

              <button
                type="button"
                onClick={() => onOpenInquiry?.({ bikeId: inspectionBike.inquiryBikeId })}
                className="mt-6 inline-flex min-h-[44px] items-center bg-[#D62810] px-5 py-2.5 font-hero text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#C41E0A]"
              >
                {tr("Konsultasi Konsep", locale)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
