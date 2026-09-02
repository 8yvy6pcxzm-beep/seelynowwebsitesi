"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock3, Handshake } from "lucide-react";
import { AmbientCanvas } from "@/components/motion/ambient-canvas";
import { GlowButton } from "@/components/motion/glow-button";
import { openCalendlyPopup } from "@/lib/calendly";

const MOCKUP_ROWS = [
  { label: "Aktif otomasyonlar", value: "12", tone: "#8B5CF6" },
  { label: "Bugün işlenen talep", value: "348", tone: "#06B6D4" },
  { label: "Ortalama yanıt süresi", value: "1.2sn", tone: "#FF6A2B" },
];

// Ölçülmemiş/uydurma istatistik yayınlamamak için sayısal "counter" yerine
// doğrulanabilir, nitel güven ifadeleri — gerçek rakamlar elimize geçtiğinde
// buraya sayısal sayaç olarak eklenebilir.
const TRUST_ROW = [
  { icon: Clock3, label: "7/24 çalışan sistemler" },
  { icon: Handshake, label: "Birebir, kişisel ortaklık" },
  { icon: ShieldCheck, label: "Sadece işe yarıyorsa devam" },
];

/** Hero — leinDigital tarzı: koyu/gece zemin (#030305), fareye tepki veren
 * Canvas2D parçacık dalgası, solda dev tipografi + 2 CTA, sağda 3D obje
 * yerine katmanlı cam "dashboard mockup" (floating animation). */
export function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-surface">
      <div className="absolute inset-0">
        <AmbientCanvas />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(55% 45% at 12% 18%, color-mix(in oklch, #8b5cf6 32%, transparent) 0%, transparent 70%), " +
            "radial-gradient(50% 40% at 88% 78%, color-mix(in oklch, #06b6d4 26%, transparent) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-6xl flex-col items-center gap-14 px-6 py-24 md:flex-row md:items-center md:justify-between md:py-0">
        <div className="max-w-xl space-y-7 text-center md:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-ink/5 px-3 py-1 text-xs font-semibold tracking-wide text-ink/60">
            <img src="/logo/mark.svg" alt="" aria-hidden="true" className="h-4 w-4" />
            seelynow
          </span>
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Yapay Zekâ Otomasyonu ile{" "}
            <span className="bg-gradient-to-r from-[#FF6A2B] via-[#8B5CF6] to-[#06B6D4] bg-clip-text text-transparent">
              İşinizi Ölçekleyin
            </span>
          </h1>
          <p className="max-w-md text-base text-ink-soft lg:text-lg">
            İşletmeniz için 7/24 çalışan akıllı sistemler kuruyoruz. Daha fazla verim, sıfır karmaşa.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:justify-start">
            <GlowButton type="button" variant="primary" onClick={openCalendlyPopup}>
              Keşif Görüşmesi Ayarla
            </GlowButton>
            <GlowButton href="/#contact" variant="glass">
              Brief Gönder
            </GlowButton>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 md:justify-start">
            {TRUST_ROW.map((item) => {
              const Icon = item.icon;
              return (
                <span key={item.label} className="flex items-center gap-1.5 text-xs font-medium text-ink/50">
                  <Icon className="h-3.5 w-3.5 text-[#06B6D4]" aria-hidden="true" />
                  {item.label}
                </span>
              );
            })}
          </div>
        </div>

        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="glass w-full max-w-sm rounded-xl2 border border-ink/10 p-6 backdrop-blur-xl"
          aria-hidden="true"
        >
          <div className="mb-5 flex items-center justify-between border-b border-ink/10 pb-4">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF6A2B]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#8B5CF6]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#06B6D4]/80" />
            </span>
            <span className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
              Sistem Aktif
            </span>
          </div>

          <div className="space-y-3">
            {MOCKUP_ROWS.map((row, i) => (
              <motion.div
                key={row.label}
                animate={{ y: [0, i % 2 === 0 ? -6 : 6, 0] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                className="glass-dark flex items-center justify-between rounded-xl border border-ink/10 px-4 py-3"
              >
                <span className="text-sm text-ink-soft">{row.label}</span>
                <span
                  className="text-sm font-bold"
                  style={{ color: row.tone }}
                >
                  {row.value}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-5 h-20 overflow-hidden rounded-xl border border-ink/10 bg-ink/[0.03] p-3">
            <svg viewBox="0 0 200 60" className="h-full w-full" aria-hidden="true">
              <polyline
                points="0,45 25,30 50,38 75,15 100,25 125,10 150,20 175,5 200,18"
                fill="none"
                stroke="url(#heroChart)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="heroChart" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#FF6A2B" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
