"use client";

import { GlowButton } from "@/components/motion/glow-button";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { openCalendlyPopup } from "@/lib/calendly";

/** Kapanış bölümü — koyu zemin üzerinde tek, net bir randevu çağrısı. */
export function Cta() {
  return (
    <section className="bg-surface-raised px-6 py-24 text-ink">
      <ScrollReveal>
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            İşinizi bir sonraki seviyeye taşımaya hazır mısınız?
          </h2>
          <p className="max-w-xl text-base text-ink-soft lg:text-lg">
            15 dakikalık kısa bir görüşmede işletmenize özel hangi otomasyonun en çok fark yaratacağını birlikte bulalım.
          </p>
          <GlowButton type="button" variant="primary" onClick={openCalendlyPopup}>
            Ücretsiz Görüşme Ayarla
          </GlowButton>
        </div>
      </ScrollReveal>
    </section>
  );
}
