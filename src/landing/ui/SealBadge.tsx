import React from "react";

export function SealBadge({
  href = "#booking",
  label = "Booking Slot Sekarang",
  topSlot = "PRESISI",
  bottomSlot = "GARANSI",
  className = "h-[120px] w-[120px]",
}: {
  href?: string;
  label?: string;
  topSlot?: React.ReactNode;
  bottomSlot?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className={`group relative flex items-center justify-center rounded-full border border-[#E51919]/50 bg-[#161822]/90 text-white shadow-[0_0_25px_rgba(229,25,25,0.3)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#FF5722] hover:shadow-[0_0_35px_rgba(255,87,34,0.5)] ${className}`}
    >
      <div className="absolute inset-1 rounded-full border border-dashed border-[#FFE600]/40 transition-transform duration-700 group-hover:rotate-45" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center font-display uppercase tracking-widest">
        <span className="text-[11px] font-bold text-[#FFE600]">{topSlot}</span>
        <span className="my-0.5 text-[15px] font-extrabold text-[#E51919] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          100%
        </span>
        <span className="text-[10px] font-semibold text-gray-300">{bottomSlot}</span>
      </div>
    </a>
  );
}
