import type { Metadata } from "next";
import { SITE_URL } from "./constants";

/**
 * Statik siteden taşınırken kaybedilmemesi gereken iki düzeltme (bkz. mimari
 * doküman §6.3 / SURECT-KAYDI.md): canonical hep .com'a gitmeli (.ai değil),
 * og:image kırık olmamalı.
 */
export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Seelynow — Yapay Zekâ Otomasyonu Ajansı",
    template: "%s | Seelynow",
  },
  description:
    "Seelynow, işletmenize daha fazla müşteri, daha fazla zaman ve daha hızlı operasyonlar kazandıran yapay zekâ destekli dijital çözümler kurar.",
  alternates: {
    canonical: SITE_URL,
  },
  // favicon/apple-touch-icon burada tanımlanmıyor — app/icon.tsx ve
  // app/apple-icon.tsx (Next.js dosya-bazlı metadata konvansiyonu) build
  // sırasında PNG üretip <head>'e otomatik enjekte ediyor.
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Seelynow",
    title: "Seelynow — Yapay Zekâ Otomasyonu Ajansı",
    description:
      "Seelynow, işletmenize daha fazla müşteri, daha fazla zaman ve daha hızlı operasyonlar kazandıran yapay zekâ destekli dijital çözümler kurar.",
    images: ["/assets/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
  },
};
