"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlowButton } from "@/components/motion/glow-button";
import { openCalendlyPopup } from "@/lib/calendly";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Neler Yapıyoruz", href: "/#services" },
  { label: "Nasıl Çalışırız", href: "/#process" },
  { label: "İletişim", href: "/#contact" },
];

/** Sabit, cam efektli üst navigasyon — scroll'da hafifçe koyulaşır/belirginleşir. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled ? "border-b border-white/10 bg-black/40 backdrop-blur-xl" : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="flex items-center gap-2 rounded-full bg-[#080C14]/60 py-1.5 pl-1.5 pr-3 backdrop-blur-md"
        >
          <img src="/logo/mark.svg" alt="" aria-hidden="true" className="h-6 w-6" />
          <span className="text-base font-extrabold tracking-tight text-ink">seelynow</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <GlowButton type="button" variant="primary" onClick={openCalendlyPopup} className="px-5 py-2.5 text-xs">
          Ücretsiz Görüşme
        </GlowButton>
      </div>
    </motion.header>
  );
}
