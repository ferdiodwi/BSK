"use client";

import { bind } from "../lib/bind";
import { revealUp, sortedItems, type SectionComponentProps } from "../lib/helpers";
import { CheckCircle2, Ruler, Cog, Hammer, Shield } from "lucide-react";

const STEP_ICONS = [Ruler, Cog, Hammer, CheckCircle2, Shield];

export function PrecisionProcess({ block }: SectionComponentProps) {
  const steps = sortedItems(block.items);

  return (
    <section id="process" className="relative overflow-hidden bg-[#0D0F16] py-20 lg:py-28">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div {...revealUp(0)} className="text-center">
          <span className="inline-block rounded-full bg-[#E51919]/15 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#FFE600] border border-[#E51919]/30">
            {bind(block, "subtitle", "STANDAR KERJA BSK CUSTOM")}
          </span>
          <h2 className="mt-4 font-hero text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            {bind(block, "title", "SOP 5 TAHAPAN TATA BODY PRESISI")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">
            {bind(
              block,
              "description",
              "Kami tidak sekadar memasang bodi. Setiap lekukan, dudukan baut, dan kelurusan rangka melewati pengukuran waterpass & laser center agar motor enak dilihat dan stabil dikendarai."
            )}
          </p>
        </div>

        {/* 5 Steps Grid with Connecting Timeline */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, idx) => {
            const IconComponent = STEP_ICONS[idx % STEP_ICONS.length];
            return (
              <div
                key={idx}
                {...revealUp(Number((idx * 0.08).toFixed(2)))}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/5 bg-[#141620] p-6 transition-all duration-300 hover:border-[#E51919]/60 hover:bg-[#181B28] hover:shadow-[0_0_25px_rgba(229,25,25,0.2)]"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-hero text-2xl font-extrabold text-[#FFE600] opacity-80 group-hover:opacity-100">
                      0{idx + 1}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E51919]/10 text-[#E51919] group-hover:bg-[#E51919] group-hover:text-white transition-colors">
                      <IconComponent className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Step Title */}
                  <h3 className="mt-5 font-hero text-lg font-bold text-white leading-snug">
                    {step.title?.replace(/^\d+\.\s*/, "")}
                  </h3>

                  {/* Step Description */}
                  <p className="mt-2.5 text-xs leading-relaxed text-gray-400">
                    {step.description}
                  </p>
                </div>

                {/* Sub-bar indicator */}
                <div className="mt-6 h-1 w-full rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full w-0 bg-gradient-to-r from-[#E51919] to-[#FF5722] transition-all duration-500 group-hover:w-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
