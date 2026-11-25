import React from "react";

export function FlagIcon({ isEn }: { isEn: boolean }) {
  if (isEn) {
    // UK flag
    return (
      <svg className="h-3.5 w-4.5 overflow-hidden rounded-xs" viewBox="0 0 640 480" aria-hidden="true">
        <path fill="#012169" d="M0 0h640v480H0z" />
        <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-179L0 64V0h75z" />
        <path fill="#C8102E" d="m424 288 216 159v33h-44L368 318v-30zm-208 0-216 159v33h44l228-162v-30zM0 33l200 148h34L34 0H0v33zm640 0L440 181h-34l200-148h34V0z" />
        <path fill="#FFF" d="M241 0v480h158V0H241zM0 161v158h640V161H0z" />
        <path fill="#C8102E" d="M267 0v480h106V0H267zM0 187v106h640V187H0z" />
      </svg>
    );
  }

  // Indonesian flag
  return (
    <svg className="h-3.5 w-4.5 overflow-hidden rounded-xs" viewBox="0 0 640 480" aria-hidden="true">
      <path fill="#E11919" d="M0 0h640v240H0z" />
      <path fill="#FFFFFF" d="M0 240h640v240H0z" />
    </svg>
  );
}
