import { ScrollReveal } from "@/components/motion/scroll-reveal";

const STEPS = [
  {
    number: "01",
    title: "Keşif",
    description:
      "Operasyonlarınızı derinlemesine inceler, sorunlu noktaları haritalar ve en yüksek getiriye sahip otomasyon fırsatlarını buluruz.",
  },
  {
    number: "02",
    title: "Tasarım",
    description:
      "Çözümü baştan tasarlarız — tek satır kod yazılmadan önce sistem akışlarını, entegrasyonları ve başarı ölçütlerini tanımlarız.",
  },
  {
    number: "03",
    title: "İnşa",
    description:
      "Mühendislerimiz otomasyon sisteminizi güvenilirlik ve kusursuz entegrasyon sağlayacak şekilde kurar, test eder ve geliştirir.",
  },
  {
    number: "04",
    title: "Devreye Al & Optimize Et",
    description:
      "Sistemleri devreye alır, performansı izler ve işiniz büyüdükçe gelişmeleri için sürekli ayarlarız.",
  },
];

/** Süreç — seelynow.com'daki "How We Work" 4 adımı, koyu temaya taşındı. */
export function Process() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-6 py-24" aria-label="Nasıl çalışırız">
      <ScrollReveal>
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-magic-violet">Nasıl Çalışırız</span>
          <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
            Sorun ve çözüm arasındaki en kısa mesafe
          </h2>
          <p className="mt-3 text-base text-gray-400 lg:text-lg">
            Her projenin zamanında ve ölçülebilir sonuç vermesi için özel olarak planlanmış şeffaf bir süreç
            tecrübe edersiniz.
          </p>
        </div>
      </ScrollReveal>

      <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <ScrollReveal key={step.number} delay={i * 0.08}>
            <li className="glass h-full rounded-xl2 border border-white/10 p-7">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 font-extrabold text-magic-cyan">
                {step.number}
              </div>
              <h3 className="text-base font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.description}</p>
            </li>
          </ScrollReveal>
        ))}
      </ol>
    </section>
  );
}
