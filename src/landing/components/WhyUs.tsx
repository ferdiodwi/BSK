"use client";

import { bind } from "../lib/bind";
import { revealUp, sortedItems, type SectionComponentProps } from "../lib/helpers";
import { CheckCircle, Flame, Award, ShieldCheck } from "lucide-react";

export function WhyUs({ block }: SectionComponentProps) {
  const items = sortedItems(block.items);

  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return CheckCircle;
      case 1:
        return Flame;
      case 2:
        return Award;
      default:
        return ShieldCheck;
    }
  };

  return (
    <section id="why-us" className="relative overflow-hidden bg-[#0D0F16] py-20 lg:py-28">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div {...revealUp(0)} className="text-center">
          <span className="inline-block rounded-full bg-[#E51919]/15 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#FFE600] border border-[#E51919]/30">
            {bind(block, "subtitle", "KOMITMEN KUALITAS & KEPUASAN")}
          </span>
          <h2 className="mt-4 font-hero text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            {bind(block, "title", "MENGAPA HARUS TATA BODY DI BSK CUSTOM?")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">
            {bind(
              block,
              "description",
              "Bodi motor yang rapi bukan hanya soal gaya, tapi juga kestabilan dan keselamatan saat melaju kencang di jalanan."
            )}
          </p>
        </div>

        {/* 4 Value Pillars */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => {
            const IconComponent = getIcon(idx);
            return (
              <div
                key={idx}
                {...revealUp(Number((idx * 0.08).toFixed(2)))}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-[#141620] p-6 transition-all duration-300 hover:border-[#E51919]/50 hover:bg-[#181B26] hover:shadow-[0_0_25px_rgba(229,25,25,0.2)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E51919]/10 text-[#E51919] group-hover:bg-[#E51919] group-hover:text-white transition-colors">
                  <IconComponent className="h-6 w-6" />
                </div>

                <h3 className="mt-5 font-hero text-lg font-bold text-white uppercase tracking-wide">
                  {item.title}
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-gray-400">
                  {item.description}
                </p>

                <div className="mt-6 flex items-center gap-1.5 text-[11px] font-bold text-[#FFE600] uppercase tracking-wider opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span>Standar Presisi</span>
                  <span>✓</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
