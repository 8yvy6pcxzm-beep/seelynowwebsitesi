import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { siteMetadata } from "@/lib/seo";
import { Header } from "@/components/sections/header";
import { Footer } from "@/components/sections/footer";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${plusJakartaSans.variable} ${jetBrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        {children}
        <Footer />

        {/* Calendly popup widget — Hero'daki "Keşif Görüşmesi" CTA'sı sayfadan
           ayrılmadan (yeni sekme yerine overlay popup) buluşma ayarlar. */}
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />

        {/* Seely AI yardım kutucuğu — mevcut widget.js entegrasyonu, sayfa
           yüklenmesini bloklamaması için lazyOnload ile (bkz. SURECT-KAYDI.md).
           data-theme="dark": widget.js'teki site-bazlı tema desteği — sadece
           bu site koyu/neon (mor/siyan) görünür, diğer SeelyDeal müşterileri
           etkilenmez. */}
        <Script src="https://seely-deal.vercel.app/widget.js" data-theme="dark" strategy="lazyOnload" />
      </body>
    </html>
  );
}
