import { Mail } from "lucide-react";
import { CONTACT_EMAIL } from "@/lib/constants";

const COMPANY_LINKS = [
  { label: "Hizmetler", href: "/#services" },
  { label: "Nasıl Çalışırız", href: "/#process" },
  { label: "İletişim", href: "/#contact" },
];

const LEGAL_LINKS = [
  { label: "Gizlilik Politikası", href: "/privacy" },
  { label: "Kullanım Şartları", href: "/terms" },
  { label: "KVKK", href: "/gdpr" },
];

/** Alt bilgi — seelynow.com'daki footer içeriği (marka, şirket/yasal linkler,
 * telif) koyu temaya taşındı. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#05070D] pb-6 pt-16" role="contentinfo">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 50% at 10% 0%, color-mix(in oklch, #ff6a2b 10%, transparent) 0%, transparent 55%), " +
            "radial-gradient(35% 45% at 90% 100%, color-mix(in oklch, #8b5cf6 14%, transparent) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <a href="/" className="mb-5 flex w-fit items-center gap-2.5">
              <img src="/logo/mark.svg" alt="" aria-hidden="true" className="h-7 w-7" />
              <span className="text-lg font-extrabold tracking-tight text-white">seelynow</span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              İşletmelerin daha akıllı çalışmasına yardımcı olan dijital otomasyon ve yapay zekâ entegrasyonu
              ajansı.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-[#8B5CF6]"
                aria-label="Bize e-posta gönderin"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <nav aria-label="Şirket linkleri">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">Şirket</p>
            <ul className="space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/75 transition-colors hover:text-[#06B6D4]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Yasal linkler">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">Yasal</p>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/75 transition-colors hover:text-[#06B6D4]">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-white/60">&copy; 2026 Seelynow Dijital Otomasyon Ajansı. Tüm hakları saklıdır.</p>
          <p className="text-xs text-white/35">Özenle inşa edildi. Yapay zekâ ile güçlendirildi.</p>
        </div>
      </div>
    </footer>
  );
}
