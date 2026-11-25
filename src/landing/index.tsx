"use client";

import { useRef, type ComponentType } from "react";
import "./styles.css";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AboutSection } from "./components/AboutSection";
import { ServicePackages } from "./components/ServicePackages";
import { ShowcaseGallery } from "./components/ShowcaseGallery";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
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
  AboutSection,
  ServicePackages,
  ShowcaseGallery,
  TestimonialsSection,
  ContactSection,
  Footer,
};

export function Landing() {
  const rootRef = useRef<HTMLDivElement>(null);

  usePageMotion(rootRef);

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
      />
    ));
  };

  const headerSections = activeSections.filter((s) => s.section.type === "Navbar");
  const footerSections = activeSections.filter((s) => s.section.type === "Footer");
  const mainSections = activeSections.filter(
    (s) => s.section.type !== "Navbar" && s.section.type !== "Footer"
  );

  return (
    <div ref={rootRef} className="bsk-landing">
      {headerSections.map(renderSection)}

      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {mainSections.map(renderSection)}
      </main>

      {footerSections.map(renderSection)}
    </div>
  );
}

export default Landing;