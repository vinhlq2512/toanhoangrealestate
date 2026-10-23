"use client";

import { useEffect } from "react";
import { usePathname } from "@/i18n/navigation";

const revealTargets = [
  ".welcome-copy",
  ".feature-card",
  ".section-heading",
  ".city-card",
  ".social-layout > div",
  ".channel-row",
  ".service-card",
  ".property-card",
  ".business-panel",
  ".faq-group",
  ".contact-info-copy",
  ".social-contact",
  ".contact-banner .banner-content",
];

export function ScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = document.querySelectorAll<HTMLElement>(revealTargets.join(","));
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.dataset.scrollRevealed = "true";
          observer.unobserve(element);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
    );

    elements.forEach((element) => {
      if (element.dataset.scrollRevealed === "true") return;
      element.dataset.scrollReveal = "true";
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
