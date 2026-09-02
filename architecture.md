# Seelynow.com — Redesign Architecture

**Durum:** Şu an canlı site statik HTML (`internet sitesi teknik.AI/index.html`, Vercel proje `seelynow-ai`). Bu doküman, o siteyi Lein Digital referanslı, 3D/animasyonlu, modern bir Next.js uygulamasına taşımanın mimarisini tanımlar.

**Bu bir karar dokümanı, henüz uygulama değil.** İncele, üzerinde değişiklik iste, onaylayınca inşa ederiz — hiçbir şey bu dokümandan otomatik olarak canlıya gitmez.

---

## 1. Teknoloji Stack'i

| Katman | Seçim | Neden |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | Mevcut SeelyDeal projesiyle aynı ekosistem — aynı deploy pipeline (Vercel), aynı bilgi birikimi |
| Styling | **Tailwind CSS** | Design token'ları (renk, spacing, radius) tek yerden yönetmek için |
| Hareket | **Framer Motion** | Hover, scroll-reveal, stagger — bölüm 4'teki tüm mikro etkileşimler |
| 3D | **Spline** (`@splinetool/react-spline`) | Kod yazmadan sahne kurulur, tasarımcı bağımsız güncelleyebilir |
| İnteraktif 3D (opsiyonel, faz 2) | **React Three Fiber** | Sadece cursor-tepkili gerçek zamanlı sahneler gerekirse |
| İkon animasyonu | **Lottie** (`lottie-react`) | Buton/ikon mikro-hareketleri — Spline'dan çok daha hafif |
| UI primitifleri | **Radix Primitives** + kendi bileşenlerimiz | Shadcn UI'ın temelini oluşturur, erişilebilirlik ücretsiz gelir |
| Form/CTA | Mevcut Calendly entegrasyonu korunur | `calendly.com/seelynow/tanisma-gorusmesi` zaten çalışıyor, dokunma |

---

## 2. Proje Klasör Yapısı

```
seelynow-web/
├── app/
│   ├── layout.tsx                # kök layout, font + tema tokenları
│   ├── page.tsx                  # ana sayfa (section bileşenlerini sıralar)
│   ├── globals.css               # design tokenları + glass/shadow utility'leri
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   └── gdpr/page.tsx              # mevcut 3 sayfa aynen taşınır
│
├── components/
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── services.tsx
│   │   ├── about.tsx
│   │   └── cta.tsx
│   ├── 3d/
│   │   ├── spline-scene.tsx       # lazy-loaded Spline wrapper (bkz. §4)
│   │   ├── floating-object.tsx    # Framer Motion idle-float wrapper
│   │   └── scenes/                # her hero/kart için ayrı .splinecode referansı
│   ├── motion/
│   │   ├── scroll-reveal.tsx      # reusable scroll-in-view wrapper
│   │   ├── stagger-group.tsx      # çocuklarını sırayla reveal eder
│   │   └── glow-button.tsx        # CTA'daki tıklama glow'u
│   └── ui/                        # Radix tabanlı buton/kart/input primitifleri
│
├── hooks/
│   ├── use-reduced-motion.ts      # prefers-reduced-motion kısayolu
│   └── use-in-view.ts             # IntersectionObserver sarmalayıcı
│
├── lib/
│   ├── constants.ts                # Calendly linki, sosyal linkler, vb.
│   └── seo.ts                      # metadata üreticileri (bkz. §6)
│
├── public/
│   └── assets/
│       ├── 3d/                    # Spline export fallback poster görselleri
│       └── lottie/                 # .json animasyon dosyaları
│
├── tailwind.config.ts              # bkz. §3
└── next.config.ts
```

---

## 3. Tasarım Sistemi & Temalandırma

### 3.1 Renk paleti — `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Ana marka — soğuk lacivertin yerini alan canlı kobalt/indigo
        brand: {
          50:  "#EEF0FF",
          200: "#C2C0FF",
          500: "#4A3AE0",   // ana marka rengi
          700: "#2E1F9E",   // koyu zemin / hero arka planı
          900: "#170F52",
        },
        // Tek accent: turuncu (CTA, hover, glow) — lime/mor'u ikincil dekor olarak sakla
        accent: {
          400: "#FF8952",
          500: "#FF6A2B",   // birincil CTA rengi
          600: "#E0501A",
        },
        // Sadece 3D obje iç ışığında kullan, buton/CTA'da asla
        magic: {
          violet: "#8B2FE0",
          lime:   "#A6D608",
        },
        surface: {
          DEFAULT: "#FBFAF8",  // kırık beyaz açık zemin
          sunken:  "#F3F1EC",
          dark:    "#0E0D16",  // koyu hero zemini
        },
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(46,31,158,0.12), inset 0 1px 0 rgba(255,255,255,0.4)",
        glow: "0 0 40px rgba(255,106,43,0.35)",
      },
      backdropBlur: {
        glass: "20px",
      },
    },
  },
} satisfies Config;
```

### 3.2 Glassmorphism & yumuşak gölge — `app/globals.css`

```css
@layer utilities {
  .glass {
    background: color-mix(in oklch, white 65%, transparent);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
    border: 1px solid color-mix(in oklch, white 50%, transparent);
    box-shadow: var(--tw-shadow-glass, 0 8px 32px rgba(46,31,158,0.12));
  }

  .glass-dark {
    background: color-mix(in oklch, #170F52 55%, transparent);
    backdrop-filter: blur(20px) saturate(140%);
    border: 1px solid color-mix(in oklch, white 12%, transparent);
  }

  .rim-glow {
    /* kenar boyunca ince ışık — 3D objelerin "gerçek ışık" imzası (bkz. konsept 04) */
    box-shadow:
      inset 0 0 0 1px color-mix(in oklch, var(--rim-color, #FF6A2B) 40%, transparent),
      0 0 24px color-mix(in oklch, var(--rim-color, #FF6A2B) 25%, transparent);
  }
}
```

---

## 4. 3D & Animasyon Entegrasyon Stratejisi

### 4.1 Spline'ı kasma yapmadan gömmek

Spline runtime'ı ~150-200KB'lık ayrı bir JS paketi getirir — bunu asla ana bundle'a karıştırma, her zaman `dynamic()` ile, `ssr: false` ile ve bir fallback poster görseliyle yükle:

```tsx
// components/3d/spline-scene.tsx
"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Image from "next/image";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null,
});

export function SplineScene({
  sceneUrl,
  posterSrc,
  className,
}: {
  sceneUrl: string;
  posterSrc: string;   // fallback: sahne yüklenene kadar / mobilde statik göster
  className?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={className} style={{ position: "relative" }}>
      {!loaded && (
        <Image
          src={posterSrc}
          alt=""
          fill
          className="object-contain"
          priority
        />
      )}
      <Spline
        scene={sceneUrl}
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}
      />
    </div>
  );
}
```

### 4.2 Yeniden kullanılabilir hareket wrapper'ları

```tsx
// components/3d/floating-object.tsx
"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function FloatingObject({
  children,
  amplitude = 12,
  duration = 6,
}: {
  children: React.ReactNode;
  amplitude?: number;
  duration?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;

  return (
    <motion.div
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
```

```tsx
// components/motion/scroll-reveal.tsx
"use client";

import { motion } from "framer-motion";

export function ScrollReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

```tsx
// components/motion/stagger-group.tsx
"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function StaggerGroup({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children }: { children: React.ReactNode }) {
  return <motion.div variants={item}>{children}</motion.div>;
}
```

Kullanım (hizmet kartları):

```tsx
<StaggerGroup>
  <div className="grid grid-cols-3 gap-4">
    {services.map((s) => (
      <StaggerItem key={s.id}>
        <ServiceCard {...s} />
      </StaggerItem>
    ))}
  </div>
</StaggerGroup>
```

---

## 5. Sayfa Mimarisi

### 5.1 Hero

```tsx
// components/sections/hero.tsx
export function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-surface-dark text-white">
      <SplineScene
        sceneUrl="/scenes/aurora-hero.splinecode"
        posterSrc="/assets/3d/aurora-poster.jpg"
        className="absolute inset-0"
      />
      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-6">
        <div className="max-w-xl space-y-6">
          <h1 className="text-5xl font-extrabold leading-tight">
            AI ile teklif yazmanın en hızlı yolu
          </h1>
          <p className="text-lg text-white/70">…</p>
          <div className="flex gap-3">
            <GlowButton href={CALENDLY_URL} variant="primary">Ücretsiz Görüşme</GlowButton>
            <GlowButton href="#services" variant="glass">Neler Yapıyoruz</GlowButton>
          </div>
        </div>
        <FloatingObject amplitude={16} duration={7}>
          <SplineScene sceneUrl="/scenes/hero-object.splinecode" posterSrc="/assets/3d/hero-object-poster.jpg" className="ml-auto h-[420px] w-[420px]" />
        </FloatingObject>
      </div>
    </section>
  );
}
```

### 5.2 Services — 3D ikonlu, hover'da parlayan kartlar

```tsx
// components/sections/services.tsx
export function ServiceCard({ title, description, sceneUrl }: ServiceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="glass group rounded-xl2 p-6"
      style={{ "--rim-color": "#FF6A2B" } as React.CSSProperties}
    >
      <div className="rim-glow rounded-xl2 mb-4 h-32 w-32 transition-transform duration-300 group-hover:rotate-6">
        <SplineScene sceneUrl={sceneUrl} posterSrc={`/assets/3d/${title}-poster.jpg`} className="h-full w-full" />
      </div>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mt-1 text-sm text-black/60">{description}</p>
    </motion.div>
  );
}
```

### 5.3 Interactive CTA

```tsx
// components/motion/glow-button.tsx
"use client";
import { motion } from "framer-motion";

export function GlowButton({ href, variant, children }: GlowButtonProps) {
  return (
    <motion.a
      href={href}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "relative inline-flex items-center rounded-full px-6 py-3 font-semibold transition-shadow",
        variant === "primary" ? "bg-accent-500 text-white shadow-glow hover:shadow-[0_0_56px_rgba(255,106,43,0.5)]" : "glass text-white"
      )}
    >
      {children}
    </motion.a>
  );
}
```

---

## 6. Performans & SEO Stratejisi

### 6.1 Performans bütçesi

| Varlık türü | Bütçe | Uygulama |
|---|---|---|
| Toplam JS (ilk yükleme) | < 250KB gzip | Spline/R3F her zaman `dynamic(..., {ssr:false})` — ana bundle'a asla girmez |
| Spline sahnesi (her biri) | < 2MB | Sahne başına düşük-poly export, dokuları sıkıştır |
| LCP (mobil) | < 2.5s | Hero'da 3D yerine **poster görsel** ilk boyanır, sahne arkadan yüklenir (bkz. §4.1) |
| CLS | < 0.1 | 3D konteynerlerine her zaman sabit `aspect-ratio` / boyut ver, layout shift'e izin verme |

### 6.2 Fallback & responsive 3D

- **Mobilde (< 768px):** Ağır Spline sahnelerini hiç yükleme — sadece `posterSrc` statik görseli göster. `useMediaQuery` ile sahne import'unu koşullu yap.
- **Yavaş bağlantı (`navigator.connection.saveData`):** Aynı şekilde statik postere düş.
- **`prefers-reduced-motion`:** Tüm ambient float/parallax animasyonlarını kapat (`use-reduced-motion.ts`), sadece durum geri bildirimlerini (buton tıklama) bırak.

```ts
// hooks/use-reduced-motion.ts
import { useEffect, useState } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}
```

### 6.3 SEO — mevcut düzeltmeleri koru

Statik siteden taşınırken kaybedilmemesi gereken üç şey (bkz. `SURECT-KAYDI.md`):

```ts
// lib/seo.ts
export const siteMetadata = {
  metadataBase: new URL("https://seelynow.com"),   // canonical hep .com, .ai değil
  openGraph: {
    url: "https://seelynow.com",
    images: ["/assets/logo.png"],                   // og-image 404 hatası tekrarlanmasın
  },
};
```

- Privacy / Terms / GDPR sayfaları aynen `app/privacy`, `app/terms`, `app/gdpr` altına taşınır, içerik değişmez.
- `widget.js` (Seely AI kutucuğu) entegrasyonu korunur — yeni `app/layout.tsx`'e `next/script` ile `strategy="lazyOnload"` olarak eklenir (SeelyDeal'daki mevcut kalıp aynen kullanılır).

---

## 7. Göç Planı (özet)

1. Yeni Next.js projesini bu iskeletle kur, **tasarıma dokunmadan** önce Calendly + widget + SEO taglarının birebir taşındığını doğrula.
2. Bölüm 3 (renk/tipografi) token'larını uygula, hiç 3D eklemeden deploy edip gözle kontrol et.
3. Framer Motion mikro etkileşimlerini ekle (hover, scroll-reveal) — 3D olmadan bile "canlı" hissi test edilir.
4. Tek bir Spline sahnesiyle hero'yu dene, onaylanınca kalan sahneleri üret.
5. Performans bütçesini (Lighthouse, mobil) doğrula, sonra `seelynow-ai` Vercel projesine production deploy.

**Şu an hiçbir adım uygulanmadı — bu doküman onay bekliyor.**
