"use client";

import { bind } from "../lib/bind";
import { revealUp, sortedItems, type SectionComponentProps } from "../lib/helpers";
import { Star, Quote } from "lucide-react";

export function Testimonials({ block }: SectionComponentProps) {
  const reviews = sortedItems(block.items);

  return (
    <section id="testimonials" className="relative overflow-hidden bg-[#0D0F16] py-20 lg:py-28">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div {...revealUp(0)} className="text-center">
          <span className="inline-block rounded-full bg-[#E51919]/15 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#FFE600] border border-[#E51919]/30">
            {bind(block, "subtitle", "ULASAN KOMUNITAS & KONSUMEN")}
          </span>
          <h2 className="mt-4 font-hero text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            {bind(block, "title", "KATA MEREKA TENTANG BSK CUSTOM")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">
            {bind(
              block,
              "description",
              "Kepuasan sedulur bikers dan pecinta motor klasik adalah kebanggaan workshop kami."
            )}
          </p>
        </div>

        {/* Testimonials 3 Columns Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              {...revealUp(Number((idx * 0.1).toFixed(2)))}
              className="relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#141620] p-6 shadow-xl"
            >
              <div>
                {/* 5 Stars Rating & Quote Icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#FFE600]">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-white/10" />
                </div>

                {/* Quote Text */}
                <p className="mt-4 text-xs italic leading-relaxed text-gray-300">
                  &ldquo;{rev.description}&rdquo;
                </p>
              </div>

              {/* Author & Motor Type */}
              <div className="mt-6 border-t border-white/10 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-hero text-sm font-bold text-white uppercase">
                    {rev.title}
                  </h4>
                  <span className="text-[11px] font-semibold text-[#E51919]">
                    {bind(rev, "extra.motor", "Owner Motor")}
                  </span>
                </div>
                <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-bold text-[#10B981]">
                  Verified Owner
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
