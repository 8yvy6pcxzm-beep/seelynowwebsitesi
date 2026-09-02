"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { GlowButton } from "@/components/motion/glow-button";
import { CONTACT_EMAIL } from "@/lib/constants";

/** İletişim — minimalist, cam efektli form. Şu an sadece görsel/istemci
 * tarafı hazır; gerçek gönderim (e-posta servisi ya da API route) bağlanana
 * kadar submit bir teşekkür mesajı gösterir, hiçbir yere veri göndermez.
 * Bento kartlarındaki "Bu Hizmet İçin Brief Ver" linki `?service=` query
 * param'ı ile buraya gelir — mesaj alanı ilgili hizmetle önceden doldurulur. */
export function Contact() {
  const [sent, setSent] = useState(false);
  const searchParams = useSearchParams();
  const service = searchParams.get("service");

  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-24">
      <ScrollReveal>
        <div className="mb-10 text-center">
          <span className="text-xs font-semibold uppercase tracking-wide text-magic-cyan">İletişim</span>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Bize yazın</h2>
          <p className="mt-2 text-base text-ink-soft lg:text-lg">
            Ya da doğrudan <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent-400 underline underline-offset-4">{CONTACT_EMAIL}</a>
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="glass neon-ring space-y-4 rounded-xl2 p-8"
          style={{ "--neon-color": "#8b5cf6" } as React.CSSProperties}
        >
          {sent ? (
            <p className="py-6 text-center text-ink">
              Teşekkürler — mesajınız alındı, en kısa sürede dönüş yapacağız.
            </p>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  type="text"
                  placeholder="Adınız"
                  className="rounded-xl border border-ink/10 bg-ink/5 px-4 py-3 text-sm text-ink placeholder:text-ink-soft focus:border-accent-500 focus:outline-none"
                />
                <input
                  required
                  type="email"
                  placeholder="E-posta"
                  className="rounded-xl border border-ink/10 bg-ink/5 px-4 py-3 text-sm text-ink placeholder:text-ink-soft focus:border-accent-500 focus:outline-none"
                />
              </div>
              <textarea
                required
                rows={4}
                placeholder="Nasıl yardımcı olabiliriz?"
                defaultValue={service ? `Merhaba, "${service}" hizmeti hakkında brief vermek istiyorum:\n\n` : undefined}
                className="w-full resize-none rounded-xl border border-ink/10 bg-ink/5 px-4 py-3 text-sm text-ink placeholder:text-ink-soft focus:border-accent-500 focus:outline-none"
              />
              <GlowButton type="submit" variant="primary" className="w-full justify-center">
                Gönder
              </GlowButton>
            </>
          )}
        </form>
      </ScrollReveal>
    </section>
  );
}
