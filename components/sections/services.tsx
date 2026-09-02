"use client";

import { type PointerEvent, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Megaphone, Headset, Settings2, Landmark, Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { cn } from "@/lib/utils";

type Service = {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  glow: string;
  span: string;
  icon: typeof Megaphone;
};

const services: Service[] = [
  {
    id: "sales-marketing",
    title: "Satış & Pazarlama",
    description:
      "Doğru müşterilere ulaşan otomasyonlar kurarız: potansiyel müşteriyi bulur, nitelendirir ve ilk teması sizin yerinize kurar.",
    deliverables: ["Lead kaynağı & nitelendirme akışı", "Otomatik ilk temas & takip dizisi", "CRM'e entegre teslim"],
    glow: "#8B5CF6",
    span: "sm:col-span-2",
    icon: Megaphone,
  },
  {
    id: "customer-support",
    title: "Müşteri Desteği",
    description:
      "WhatsApp, Instagram, e-posta — hangi kanaldan gelirse gelsin, müşterilerinize 7/24 yanıt veren chatbot'lar kurarız.",
    deliverables: ["7/24 çok kanallı chatbot", "İnsan devir noktası tanımı", "Sık sorular & bilgi tabanı kurulumu"],
    glow: "#06B6D4",
    span: "sm:col-span-1",
    icon: Headset,
  },
  {
    id: "operations",
    title: "Operasyon",
    description: "Veri girişi ve raporlama gibi rutin işleri otomasyona bırakın, ekibiniz asıl işe odaklansın.",
    deliverables: ["Veri girişi otomasyonu", "Günlük/haftalık rapor akışı", "Araçlar arası senkronizasyon"],
    glow: "#FF6A2B",
    span: "sm:col-span-1",
    icon: Settings2,
  },
  {
    id: "admin-finance",
    title: "Yönetim & Finans",
    description: "Faturalama, evrak işleri ve randevu planlamasını otomatikleştirip idari yükünüzü hafifletiriz.",
    deliverables: ["Fatura & belge otomasyonu", "Randevu/rezervasyon akışı", "Ödeme takip bildirimleri"],
    glow: "#8B5CF6",
    span: "sm:col-span-2",
    icon: Landmark,
  },
];

function ServiceCard({ service }: { service: Service }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const scale = useSpring(1, { stiffness: 200, damping: 20 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });
  const Icon = service.icon;
  const briefHref = `/?service=${encodeURIComponent(service.title)}#contact`;

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 8);
    rotateX.set(py * -8);
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1 });
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.article
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => scale.set(1.02)}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, scale, transformPerspective: 800 }}
      className={cn(
        "glass group relative flex flex-col overflow-hidden rounded-xl2 border border-white/10 p-7 transition-shadow duration-300",
        service.span,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(600px circle at ${spotlight.x}px ${spotlight.y}px, color-mix(in oklch, ${service.glow} 22%, transparent), transparent 40%)`,
        }}
      />
      {/* Mobilde (dokunmatik ekranlarda hover olmadığı için) neon kenarlık
          varsayılan olarak hafif opaklıkta görünür kalır; md+ ekranlarda
          sadece hover'da belirir. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl2 border border-white/15 opacity-35 transition-opacity duration-300 md:border-0 md:opacity-0 md:group-hover:opacity-100"
        style={{
          boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${service.glow} 55%, transparent), 0 0 40px -8px ${service.glow}`,
        }}
      />
      <div
        className="relative z-10 mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5"
        style={{ color: service.glow }}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="relative z-10 text-lg font-bold text-ink">{service.title}</h3>
      <p className="relative z-10 mt-1.5 text-sm text-ink-soft">{service.description}</p>

      <ul className="relative z-10 mt-4 space-y-1.5">
        {service.deliverables.map((item) => (
          <li key={item} className="flex items-start gap-2 text-xs text-white/60">
            <span
              className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
              style={{ backgroundColor: service.glow }}
              aria-hidden="true"
            />
            {item}
          </li>
        ))}
      </ul>

      <a
        href={briefHref}
        className="relative z-10 mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold opacity-0 transition-all duration-300 group-hover:opacity-100 md:translate-y-1 md:group-hover:translate-y-0"
        style={{ color: service.glow }}
      >
        Bu Hizmet İçin Brief Ver
        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
      </a>
    </motion.article>
  );
}

/** SeelyDeal'i (ajansın kendi yazılım ürünü — AI destekli satış teklif aracı)
 * tanıtan "Built by Us" vitrin kartı — ajansın teknik yetkinliğinin somut
 * kanıtı olarak bento grid'e bir öne çıkan kart olarak eklenir. */
function BuiltByUsCard() {
  return (
    <div
      className="group relative overflow-hidden rounded-xl2 border border-white/10 p-7 sm:col-span-3"
      style={{
        background:
          "radial-gradient(60% 100% at 0% 0%, color-mix(in oklch, #8b5cf6 16%, transparent) 0%, transparent 60%), " +
          "radial-gradient(60% 100% at 100% 100%, color-mix(in oklch, #06b6d4 14%, transparent) 0%, transparent 60%), " +
          "color-mix(in oklch, white 5%, transparent)",
      }}
    >
      <div className="relative z-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#06B6D4]">
            <Sparkles className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-[#06B6D4]">Kendi Ürünümüz</span>
            <h3 className="mt-1 text-lg font-bold text-ink">SeelyDeal</h3>
            <p className="mt-1 max-w-xl text-sm text-ink-soft">
              Kurduğumuz otomasyonların arkasındaki mühendisliğin kanıtı: AI destekli satış teklifi ve fiyat
              teklifi aracımız SeelyDeal'i biz tasarladık, biz kurduk ve biz kullanıyoruz.
            </p>
          </div>
        </div>
        <a
          href="https://seelydeal.seelynow.com"
          target="_blank"
          rel="noreferrer"
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          İncele
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

/** Hizmetler — Bento-grid düzeni; kart üzerine gelindiğinde subtle 3D tilt,
 * spotlight (cursor-takip radial glow) ve kenarlarda neon mor/cyan/turuncu
 * parlama uygulanır (transform + opacity tabanlı, top/left kullanılmaz). */
export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-24">
      <ScrollReveal>
        <div className="mb-12 max-w-xl">
          <span className="text-xs font-semibold uppercase tracking-wide text-accent-500">Neler Yapıyoruz</span>
          <h2 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">İşinizin her alanına özel otomasyon</h2>
        </div>
      </ScrollReveal>

      <div className="grid gap-5 sm:grid-cols-3">
        {services.map((service, i) => (
          <ScrollReveal key={service.id} delay={i * 0.08} className={service.span}>
            <ServiceCard service={service} />
          </ScrollReveal>
        ))}
        <ScrollReveal delay={services.length * 0.08} className="sm:col-span-3">
          <BuiltByUsCard />
        </ScrollReveal>
      </div>
    </section>
  );
}
