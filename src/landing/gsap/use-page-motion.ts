"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

function ensureRegistered() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

function reducedMotionActive(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function usePageMotion(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    ensureRegistered();
    if (reducedMotionActive()) return;

    const ctx = gsap.context(() => {
      // Speed lines draw animation on hero
      const speedLines = root.querySelectorAll<SVGPathElement>("[data-speed-line]");
      speedLines.forEach((path) => {
        const len = path.getTotalLength();
        const delay = Number(path.dataset.lineDelay || "0");
        const duration = Number(path.dataset.lineDuration || "1.0");
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration,
          delay,
          ease: "power2.out",
        });
      });

      // Scroll-triggered speed lines
      const scrollLines = root.querySelectorAll<SVGPathElement>("[data-scroll-speed-line]");
      scrollLines.forEach((path) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: path.closest("section") ?? path,
            start: "top 80%",
            once: true,
          },
        });
      });

      // Hero stagger entrance
      const heroEnters = root.querySelectorAll<HTMLElement>("[data-hero-enter]");
      if (heroEnters.length > 0) {
        gsap.from(heroEnters, {
          opacity: 0,
          y: 20,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform",
        });
      }

      // Scroll-reveal triggers
      const reveals = root.querySelectorAll<HTMLElement>("[data-reveal]");
      reveals.forEach((el) => {
        const dir = el.dataset.reveal;
        const delay = Number(el.dataset.revealDelay || "0");
        const x = dir === "left" ? -35 : dir === "right" ? 35 : 0;
        const y = x === 0 ? 25 : 0;

        gsap.from(el, {
          opacity: 0,
          x,
          y,
          duration: 0.65,
          delay,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, [rootRef]);
}
