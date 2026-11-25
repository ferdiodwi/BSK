"use client";

import { site } from "../content/site";
import { bind } from "../lib/bind";
import { tr, useLocale } from "../lib/i18n";
import { revealUp, sortedItems, type SectionComponentProps } from "../lib/helpers";
import { InstagramLogo, WhatsAppLogo } from "../ui/BrandLogos";

export function WorkshopSection({ block, onOpenEstimator }: SectionComponentProps) {
  const locale = useLocale();
  const steps = sortedItems(block.items);

  return (
    <section
      id="bengkel"
      className="border-b border-black/10 bg-white text-[#111216]"
    >
      <div className="mx-auto max-w-[1400px] border-x border-black/10 px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        {/* Part A: 5-Step Workshop SOP Architectural Strip */}
        <div {...revealUp(0)} className="border-b border-black/10 pb-8">
          <span className="font-mono text-xs font-bold tracking-widest text-[#D62810] uppercase">
            {tr(bind(block, "subtitle", "KONSULTASI & LOKASI"), locale)}
          </span>
          <div className="mt-2 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <h2 className="font-hero text-3xl font-bold tracking-tight text-[#111216] uppercase sm:text-4xl">
              {tr(bind(block, "title", "Alur Kerja Bengkel"), locale)}
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-[#4B5563]">
              {tr(
                bind(
                  block,
                  "description",
                  "Setiap unit melewati tahapan ukur sebelum las untuk menjamin kestabilan berkendara dan kerapian tampilan."
                ),
                locale
              )}
            </p>
          </div>
        </div>

        <ol className="grid grid-cols-1 divide-y divide-black/10 border-b border-black/10 sm:grid-cols-2 sm:divide-x lg:grid-cols-5 lg:divide-y-0">
          {steps.map((step, idx) => (
            <li
              key={idx}
              {...revealUp(Number((idx * 0.05).toFixed(2)))}
              className="flex flex-col justify-between p-5 sm:p-6"
            >
              <div>
                <span className="font-mono text-xs font-bold text-[#D62810]">
                  0{idx + 1}
                </span>
                <h3 className="mt-2 font-hero text-base font-bold text-[#111216] uppercase">
                  {tr(step.title || "", locale).replace(/^\d+\.\s*/, "")}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#4B5563]">
                  {tr(step.description || "", locale)}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Part B: Split Consultation Banner + Honest Workshop Details */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left 7 Cols: Bold Red-Orange CTA Block */}
          <div
            {...revealUp(0.05)}
            className="flex flex-col justify-between bg-[#D62810] p-7 text-white sm:p-10 lg:col-span-7"
          >
            <div>
              <span className="font-mono text-xs font-bold tracking-widest text-white/90 uppercase">
                BSK CUSTOM · TATA BODY CB
              </span>
              <h3 className="mt-3 font-hero text-3xl font-bold leading-tight uppercase sm:text-4xl">
                {tr("Konsultasi Konsep & Jadwal Pengerjaan", locale)}
              </h3>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/95">
                {tr(
                  "Kirim foto kondisi motor saat ini atau pilih paket yang diinginkan lewat kalkulator estimasi sebelum datang ke bengkel.",
                  locale
                )}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onOpenEstimator?.()}
                className="inline-flex min-h-[48px] items-center justify-center bg-[#141518] px-6 py-3 font-hero text-sm font-bold tracking-wider text-white uppercase transition-colors hover:bg-black"
              >
                {tr("Hitung Estimasi Biaya", locale)}
              </button>

              <a
                href={site.contact.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 border border-white bg-transparent px-5 py-3 font-hero text-sm font-bold tracking-wider text-white uppercase transition-colors hover:bg-white hover:text-[#111216]"
              >
                <InstagramLogo className="h-4 w-4" aria-hidden="true" />
                <span>{site.contact.instagram_user}</span>
              </a>
            </div>
          </div>

          {/* Right 5 Cols: Workshop Contact & Honest Editable Fields */}
          <div
            {...revealUp(0.1)}
            className="flex flex-col justify-between border border-black/10 bg-[#F5F5F6] p-7 sm:p-8 lg:col-span-5"
          >
            <h3 className="font-hero text-xl font-bold text-[#111216] uppercase">
              {tr("Konsultasi & Lokasi Workshop", locale)}
            </h3>

            <dl className="mt-6 space-y-4 text-sm">
              <div className="border-b border-black/10 pb-3">
                <dt className="font-mono text-[11px] font-bold text-[#4B5563] uppercase">
                  {tr("Instagram Resmi", locale)}
                </dt>
                <dd className="mt-1">
                  <a
                    href={site.contact.instagram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#D62810] hover:underline"
                  >
                    {site.contact.instagram_user}
                  </a>
                </dd>
              </div>

              <div className="border-b border-black/10 pb-3">
                <dt className="font-mono text-[11px] font-bold text-[#4B5563] uppercase">
                  {tr("Alamat Workshop", locale)}
                </dt>
                <dd className="mt-1 font-medium text-[#111216]">
                  {site.contact.address}
                </dd>
              </div>

              <div className="border-b border-black/10 pb-3">
                <dt className="font-mono text-[11px] font-bold text-[#4B5563] uppercase">
                  {tr("Jam Operasional", locale)}
                </dt>
                <dd className="mt-1 font-medium text-[#111216]">
                  {site.contact.hours}
                </dd>
              </div>

              <div>
                <dt className="font-mono text-[11px] font-bold text-[#4B5563] uppercase">
                  {tr("WhatsApp Admin", locale)}
                </dt>
                <dd className="mt-1 font-medium text-[#111216]">
                  {site.contact.whatsapp_display}
                </dd>
              </div>
            </dl>

            <a
              href={`https://wa.me/${site.contact.whatsapp_number}?text=${encodeURIComponent(
                "Halo BSK Custom, saya mau konsultasi tata body motor."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-[44px] w-full items-center justify-center gap-2 bg-[#047857] px-5 py-3 font-hero text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#065F46]"
            >
              <WhatsAppLogo className="h-4 w-4" aria-hidden="true" />
              <span>{tr("Chat via WhatsApp", locale)}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
