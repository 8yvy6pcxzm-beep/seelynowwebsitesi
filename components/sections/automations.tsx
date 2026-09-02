import { MessageCircle, Mail, FileText, CalendarClock, Package, LineChart } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { GlowButton } from "@/components/motion/glow-button";

type Automation = {
  title: string;
  description: string;
  icon: typeof MessageCircle;
};

const AUTOMATIONS: Automation[] = [
  {
    title: "WhatsApp Destek Botu",
    description: "WhatsApp'ta 7/24 anında yanıt.",
    icon: MessageCircle,
  },
  {
    title: "Müşteri Adayı Takibi",
    description: "Otomatik takip e-postaları ve hatırlatmalar.",
    icon: Mail,
  },
  {
    title: "Fatura & Belge Otomasyonu",
    description: "Belgeleri elle uğraşmadan oluşturup gönderin.",
    icon: FileText,
  },
  {
    title: "Sosyal Medya Planlama",
    description: "İçeriği otomatik planlayıp yayınlayın.",
    icon: CalendarClock,
  },
  {
    title: "Sipariş & Stok Takibi",
    description: "Stok ve siparişleri gerçek zamanlı takip edin.",
    icon: Package,
  },
  {
    title: "Otomatik Raporlama",
    description: "Günlük ve haftalık raporlar otomatik gelsin.",
    icon: LineChart,
  },
];

/** Sık kurulan otomasyonlar — seelynow.com'daki "Popular Automations"
 * bölümü, koyu tema/glass ile taşındı. */
export function Automations() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24" aria-label="Sık kurduğumuz otomasyonlar">
      <ScrollReveal>
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Sık Kurduğumuz Otomasyonlar</h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-400 lg:text-lg">
            Hazır bir otomasyonla başlayın ya da size özel bir çözüm isteyin. Hepsini ücretsiz demo ile deneyin —
            yalnızca işinize yarıyorsa devam edin.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AUTOMATIONS.map((item, i) => {
          const Icon = item.icon;
          return (
            <ScrollReveal key={item.title} delay={i * 0.05}>
              <div className="glass flex items-start gap-3.5 rounded-xl border border-white/10 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_32px_-10px_#06B6D4]">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-[#06B6D4]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-ink">{item.title}</h3>
                  <p className="mt-0.5 text-xs text-ink-soft">{item.description}</p>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>

      <ScrollReveal delay={0.2}>
        <div className="mt-12 text-center">
          <GlowButton href="/#contact" variant="primary">
            Demo İste
          </GlowButton>
        </div>
      </ScrollReveal>
    </section>
  );
}
