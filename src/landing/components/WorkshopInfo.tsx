"use client";

import { bind } from "../lib/bind";
import { revealUp, type SectionComponentProps } from "../lib/helpers";
import { MapPin, Clock, Phone } from "lucide-react";
import { InstagramLogo } from "../ui/BrandLogos";

export function WorkshopInfo({ block }: SectionComponentProps) {
  const address = bind(block, "extra.address", "Jl. Otomotif Presisi No. 12, Workshop BSK Custom");
  const city = bind(block, "extra.city", "Jawa Timur, Indonesia");
  const hours = bind(block, "extra.hours", "Senin - Sabtu: 08:30 - 17:30 WIB (Minggu Libur)");
  const phone = bind(block, "extra.whatsapp", "0851-5950-6662");
  const ig = bind(block, "extra.instagram", "@bsk.custom");

  return (
    <section id="contact" className="relative overflow-hidden bg-[#0D0F16] py-20 lg:py-24">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <div {...revealUp(0)} className="text-center">
          <span className="inline-block rounded-full bg-[#E51919]/15 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#FFE600] border border-[#E51919]/30">
            {bind(block, "subtitle", "MAMPIR KE WORKSHOP KAMI")}
          </span>
          <h2 className="mt-4 font-hero text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
            {bind(block, "title", "LOKASI & KONTAK WORKSHOP")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base">
            {bind(
              block,
              "description",
              "Silakan datang langsung untuk melihat proses pengerjaan atau konsultasi santai sambil ngopi."
            )}
          </p>
        </div>

        {/* Info Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Alamat */}
          <div {...revealUp(0.05)} className="rounded-2xl border border-white/5 bg-[#141620] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E51919]/10 text-[#E51919]">
              <MapPin className="h-5 w-5" />
            </div>
            <h4 className="mt-4 font-hero text-base font-bold text-white uppercase">Alamat Workshop</h4>
            <p className="mt-2 text-xs leading-relaxed text-gray-300">{address}</p>
            <span className="mt-1 block text-xs text-gray-400">{city}</span>
          </div>

          {/* Card 2: Jam Operasional */}
          <div {...revealUp(0.1)} className="rounded-2xl border border-white/5 bg-[#141620] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E51919]/10 text-[#E51919]">
              <Clock className="h-5 w-5" />
            </div>
            <h4 className="mt-4 font-hero text-base font-bold text-white uppercase">Jam Buka</h4>
            <p className="mt-2 text-xs leading-relaxed text-gray-300">{hours}</p>
            <span className="mt-2 inline-block rounded-md bg-[#10B981]/15 px-2 py-0.5 text-[10px] font-bold text-[#10B981]">
              Open Regular Days
            </span>
          </div>

          {/* Card 3: WhatsApp Admin */}
          <div {...revealUp(0.15)} className="rounded-2xl border border-white/5 bg-[#141620] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E51919]/10 text-[#E51919]">
              <Phone className="h-5 w-5" />
            </div>
            <h4 className="mt-4 font-hero text-base font-bold text-white uppercase">WhatsApp Resmi</h4>
            <p className="mt-2 text-xs leading-relaxed text-gray-300">{phone}</p>
            <a
              href="https://wa.me/6285159506662"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#10B981] hover:underline"
            >
              <span>Chat Fast Response</span>
              <span>→</span>
            </a>
          </div>

          {/* Card 4: Instagram Resmi */}
          <div {...revealUp(0.2)} className="rounded-2xl border border-white/5 bg-[#141620] p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E51919]/10 text-[#E51919]">
              <InstagramLogo className="h-5 w-5" />
            </div>
            <h4 className="mt-4 font-hero text-base font-bold text-white uppercase">Instagram</h4>
            <p className="mt-2 text-xs leading-relaxed text-gray-300">{ig}</p>
            <a
              href="https://instagram.com/bsk.custom"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#E51919] hover:underline"
            >
              <span>Follow Update Project</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
