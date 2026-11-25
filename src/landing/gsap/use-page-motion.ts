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
      const heroEnters = root.querySelectorAll<HTMLElement>("[data-hero-enter]");
      if (heroEnters.length > 0) {
        gsap.from(heroEnters, {
          opacity: 0,
          y: 16,
          duration: 0.55,
          stagger: 0.07,
          ease: "power3.out",
          clearProps: "transform",
        });
      }

      const reveals = root.querySelectorAll<HTMLElement>("[data-reveal]");
      reveals.forEach((el) => {
        const dir = el.dataset.reveal;
        const delay = Number(el.dataset.revealDelay || "0");
        const x = dir === "left" ? -28 : dir === "right" ? 28 : 0;
        const y = x === 0 ? 18 : 0;

        gsap.from(el, {
          opacity: 0,
          x,
          y,
          duration: 0.58,
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
