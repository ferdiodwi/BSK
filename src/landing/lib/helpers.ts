import type { Locale } from "./i18n";

export type { Locale };

export type LandingItem = {
  id?: string;
  title?: string;
  description?: string;
  icon?: string;
  image_url?: string;
  order?: number;
  extra?: Record<string, unknown> | null;
};

export type LandingBlock = {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  image_url?: string;
  icon?: string;
  order?: number;
  extra?: Record<string, unknown> | null;
  items?: LandingItem[];
};

export type LandingSection = {
  id?: string;
  type: string;
  order?: number;
  is_active?: boolean;
  blocks?: LandingBlock[];
};

export type LandingPage = {
  id?: string;
  title?: string;
  slug?: string;
  order?: number;
  is_home?: boolean;
  sections?: LandingSection[];
};

export type LandingPayload = {
  name?: string;
  slug?: string;
  description?: string;
  preview_image_url?: string | null;
  category?: string;
  pages?: LandingPage[];
};

export type SectionComponentProps = {
  section?: LandingSection;
  block: LandingBlock;
};

export function sortedBlocks(blocks?: LandingBlock[]): LandingBlock[] {
  if (!blocks) return [];
  return [...blocks].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function sortedItems(items?: LandingItem[]): LandingItem[] {
  if (!items) return [];
  return [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function blockRenderKey(pIdx: number, sIdx: number, bIdx: number): string {
  return `block-${pIdx}-${sIdx}-${bIdx}`;
}

export function formatIDR(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function revealUp(delay = 0) {
  return {
    "data-reveal": "up",
    "data-reveal-delay": String(delay),
  };
}

export function revealLeft(delay = 0) {
  return {
    "data-reveal": "left",
    "data-reveal-delay": String(delay),
  };
}

export function revealRight(delay = 0) {
  return {
    "data-reveal": "right",
    "data-reveal-delay": String(delay),
  };
}

export function heroEnterAttr(delay = 0) {
  return {
    "data-hero-enter": "true",
    "data-reveal-delay": String(delay),
  };
}

export function speedLineAttr(delay = 0, duration = 1.0) {
  return {
    "data-speed-line": "true",
    "data-line-delay": String(delay),
    "data-line-duration": String(duration),
  };
}

export function scrollSpeedLineAttr() {
  return {
    "data-scroll-speed-line": "true",
  };
}

export function imgPerfProps() {
  return {
    loading: "lazy" as const,
    decoding: "async" as const,
  };
}

export function labelledByAttr(id?: string) {
  return id ? { "aria-labelledby": id } : {};
}

export function ariaLabelAttr(label?: string) {
  return label ? { "aria-label": label } : {};
}

export function ariaModalAttrs(titleId?: string) {
  return {
    "aria-modal": true,
    ...(titleId ? { "aria-labelledby": titleId } : {}),
  };
}

export function lockDocumentScroll(lock: boolean) {
  if (typeof document === "undefined") return () => {};
  const original = document.body.style.overflow;
  if (lock) {
    document.body.style.overflow = "hidden";
  }
  return () => {
    document.body.style.overflow = original;
  };
}

export function activeElementRef(): HTMLElement | null {
  if (typeof document === "undefined") return null;
  return document.activeElement as HTMLElement | null;
}

export function focusElement(el: HTMLElement | null) {
  if (!el) return;
  el.focus();
}

export function isEscapeKey(key: string): boolean {
  return key === "Escape" || key === "Esc";
}

export function attachKeydown(handler: (key: string) => void) {
  if (typeof window === "undefined") return () => {};
  const listener = (e: KeyboardEvent) => handler(e.key);
  window.addEventListener("keydown", listener);
  return () => window.removeEventListener("keydown", listener);
}

export function attachWindowScroll(threshold: number, onStateChange: (scrolled: boolean) => void) {
  if (typeof window === "undefined") return () => {};
  const onScroll = () => {
    onStateChange(window.scrollY > threshold);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  return () => window.removeEventListener("scroll", onScroll);
}

export function buildWorkshopWhatsAppUrl(
  phone: string,
  bikeModel: string,
  packageName: string,
  customNeeds: string,
  totalEstimate: number,
  locale: Locale,
): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const formattedPrice = formatIDR(totalEstimate);

  const text =
    locale === "en"
      ? `Hello BSK Custom, I would like to book a bodywork & frame alignment slot:\n\n• Bike Model: ${bikeModel}\n• Package: ${packageName}\n• Specific Needs: ${customNeeds}\n• Estimated Total: ${formattedPrice}\n\nCould you please let me know the available schedule? Thank you!`
      : `Halo BSK Custom, saya ingin booking slot tata body & rangka:\n\n• Tipe Motor: ${bikeModel}\n• Paket: ${packageName}\n• Kebutuhan Tambahan: ${customNeeds}\n• Estimasi Total: ${formattedPrice}\n\nKira-kira slot pengerjaan terdekat ready kapan ya Mas? Terima kasih!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
