"use client";

import { useRef, useState, type ComponentType } from "react";
import "./styles.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AnatomySection } from "./components/AnatomySection";
import { ServicePackages } from "./components/ServicePackages";
import { BuildInquiryModal } from "./components/BuildInquiryModal";
import { site } from "./content/site";
import { usePageMotion } from "./gsap/use-page-motion";
import {
  blockRenderKey,
  sortedBlocks,
  type LandingSection,
  type SectionComponentProps,
} from "./lib/helpers";

const views: Record<string, ComponentType<SectionComponentProps>> = {
  Navbar,
  Hero,
  AnatomySection,
  ServicePackages,
};

export function Landing() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inquiryState, setInquiryState] = useState<{
    open: boolean;
    bikeId?: string;
    packageId?: string;
  }>({ open: false });

  usePageMotion(rootRef);

  const openInquiry = (opts?: { bikeId?: string; packageId?: string }) => {
    setInquiryState({
      open: true,
      bikeId: opts?.bikeId,
      packageId: opts?.packageId,
    });
  };

  const closeInquiry = () => {
    setInquiryState((prev) => ({ ...prev, open: false }));
  };

  const pages = [...(site.pages ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const activeSections = pages.flatMap((page, pIdx) =>
    [...(page.sections ?? [])]
      .filter((section) => section.is_active !== false)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
      .map((section, sIdx) => ({ section, pIdx, sIdx }))
  );

  const renderSection = (entry: { section: LandingSection; pIdx: number; sIdx: number }) => {
    const View = views[entry.section.type];
    if (!View) return null;
    return sortedBlocks(entry.section.blocks).map((block, bIdx) => (
      <View
        key={blockRenderKey(entry.pIdx, entry.sIdx, bIdx)}
        section={entry.section}
        block={block}
        onOpenInquiry={openInquiry}
      />
    ));
  };

  const headerSections = activeSections.filter((s) => s.section.type === "Navbar");
  const mainSections = activeSections.filter((s) => s.section.type !== "Navbar");

  return (
    <div ref={rootRef} className="bsk-landing">
      {headerSections.map(renderSection)}

      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {mainSections.map(renderSection)}
      </main>

      {inquiryState.open && (
        <BuildInquiryModal
          key={`${inquiryState.bikeId || "default"}-${inquiryState.packageId || "default"}`}
          isOpen={inquiryState.open}
          onClose={closeInquiry}
          initialBikeId={inquiryState.bikeId}
          initialPackageId={inquiryState.packageId}
        />
      )}
    </div>
  );
}

export default Landing;
