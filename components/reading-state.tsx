"use client";

import { type CSSProperties, useEffect, useRef } from "react";

const sectionIds = ["idea", "current-reading", "supplementary"] as const;

function setCurrentSection(sectionId: string | null) {
  document.querySelectorAll<HTMLElement>("[data-section-link]").forEach((link) => {
    if (sectionId && link.dataset.sectionLink === sectionId) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

export function ReadingState() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      progressRef.current?.style.setProperty("--reading-progress", String(progress));
    };

    const updateFromHash = () => {
      const target = window.location.hash.slice(1);
      setCurrentSection(sectionIds.includes(target as (typeof sectionIds)[number]) ? target : null);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visible?.target.id) setCurrentSection(visible.target.id);
      },
      { rootMargin: "-22% 0px -62%", threshold: [0, 0.25, 0.6] },
    );

    sectionIds.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) observer.observe(section);
    });

    const mobileMenu = document.querySelector<HTMLDetailsElement>(".site-header__menu");
    const mobileLinks = document.querySelectorAll<HTMLAnchorElement>(
      ".site-header__menu nav a",
    );
    const closeMobileMenu = () => mobileMenu?.removeAttribute("open");
    mobileLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));

    updateProgress();
    updateFromHash();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress, { passive: true });
    window.addEventListener("hashchange", updateFromHash);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      window.removeEventListener("hashchange", updateFromHash);
      mobileLinks.forEach((link) => link.removeEventListener("click", closeMobileMenu));
    };
  }, []);

  return (
    <div
      ref={progressRef}
      className="site-header__progress"
      style={{ "--reading-progress": 0 } as CSSProperties}
      aria-hidden="true"
    />
  );
}
