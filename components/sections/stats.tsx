import { ScrollReveal } from "@/components/motion/scroll-reveal";

const STATS = [
  {
    title: "Yapay Zekâ Odaklı Otomasyon",
    description: "En güncel yapay zekâ modelleri üzerine kurulu özel sistemler.",
    glow: "#8B5CF6",
  },
  {
    title: "Size Özel",
    description: "Her çözüm tam olarak sizin iş akışınıza göre tasarlanır.",
    glow: "#06B6D4",
  },
  {
    title: "Birebir Çalışma",
    description: "Her projede doğrudan, kişisel iş birliği.",
    glow: "#FF6A2B",
  },
  {
    title: "Hızlı Teslim",
    description: "İlk fikirden canlı sisteme, hızlıca.",
    glow: "#8B5CF6",
  },
];

/** seelynow.com'daki "Why work with us" değer önerileri kartları — koyu
 * temaya taşındı, glass + neon hover. */
export function Stats() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16" aria-label="Neden bizimle çalışmalısınız">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
        {STATS.map((item, i) => (
          <ScrollReveal key={item.title} delay={i * 0.06}>
            <div
              className="glass group flex h-full min-h-[168px] flex-col justify-between rounded-xl2 border border-ink/10 p-6 transition-shadow duration-300"
              style={{ "--rim-color": item.glow } as React.CSSProperties}
            >
              <span
                className="mb-4 inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: item.glow }}
                aria-hidden="true"
              />
              <div>
                <h3 className="text-base font-bold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-sm text-ink-soft">{item.description}</p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
