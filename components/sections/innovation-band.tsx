import { ScrollReveal } from "@/components/motion/scroll-reveal";

/** "Always Up to Date" bandı — seelynow.com'daki tek satırlık güven bloğu,
 * koyu temada neon glow'lu cam panel olarak taşındı. */
export function InnovationBand() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <ScrollReveal>
        <div
          className="relative overflow-hidden rounded-xl2 border border-white/10 px-8 py-12 text-center md:px-14 md:py-14"
          style={{
            background:
              "radial-gradient(60% 80% at 20% 15%, color-mix(in oklch, #8b5cf6 22%, transparent) 0%, transparent 55%), " +
              "radial-gradient(50% 70% at 85% 85%, color-mix(in oklch, #06b6d4 20%, transparent) 0%, transparent 55%), " +
              "color-mix(in oklch, white 5%, transparent)",
          }}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-semibold text-white/70">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#06B6D4]" aria-hidden="true" />
            Her Zaman Güncel
          </span>
          <h2 className="mx-auto max-w-3xl text-2xl font-extrabold leading-snug tracking-tight text-ink md:text-4xl">
            Her yeni teknoloji, işletmenizin yeni bir iş ortağı olabilir.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-400 lg:text-lg">
            Gelişen her yeni teknolojiyi sizin için yakından takip eder, işinize nasıl değer katabileceğini
            araştırırız; <span className="font-semibold text-magic-cyan">seelynow</span> çatısı altında işletmenizi
            her zaman güncel tutarız.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
