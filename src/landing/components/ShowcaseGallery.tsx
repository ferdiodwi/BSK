"use client";

import { bind } from "../lib/bind";
import { revealUp, sortedItems, type SectionComponentProps } from "../lib/helpers";
import { InstagramLogo } from "../ui/BrandLogos";

export function ShowcaseGallery({ block }: SectionComponentProps) {
  const items = sortedItems(block.items);

  return (
    <section id="gallery" className="relative overflow-hidden bg-[#0B0C10] py-20 lg:py-28">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div {...revealUp(0)} className="text-center">
          <span className="inline-block rounded-full bg-[#E51919]/15 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#FFE600] border border-[#E51919]/30">
            {bind(block, "subtitle", "PORTOFOLIO BSK CUSTOM")}
          </span>
          <h2 className="mt-4 font-hero text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            {bind(block, "title", "KARYA & HASIL GARAPAN")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">
            {bind(
              block,
              "description",
              "Beberapa motor konsumen yang telah selesai ditata bodi dan rangkanya di workshop kami."
            )}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              {...revealUp(Number((idx * 0.08).toFixed(2)))}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#141620] transition-all duration-300 hover:border-[#E51919] hover:shadow-[0_0_30px_rgba(229,25,25,0.25)]"
            >
              {/* Image Preview Box with Logo Overlay */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0D0E12] flex items-center justify-center p-6">
                <img
                  src={item.image_url || "/logo.png"}
                  alt={item.title || "Garapan Motor BSK Custom"}
                  className="h-28 w-auto object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(229,25,25,0.4)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141620] via-transparent to-transparent opacity-80" />
                <span className="absolute top-3 left-3 rounded-md bg-[#E51919] px-2 py-0.5 font-hero text-[10px] font-bold uppercase tracking-wider text-white">
                  Done Presisi
                </span>
              </div>

              {/* Detail Content */}
              <div className="p-5">
                <h3 className="font-hero text-base font-bold text-white leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-400">
                  {item.description}
                </p>

                <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                  <span className="text-[11px] font-semibold text-[#FFE600]">
                    Tata Body & Subframe
                  </span>
                  <a
                    href="https://instagram.com/bsk.custom"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[11px] text-gray-400 transition-colors hover:text-[#E51919]"
                  >
                    <InstagramLogo className="h-3 w-3" />
                    <span>Lihat di IG</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
