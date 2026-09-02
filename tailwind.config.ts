import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Ana marka — soğuk lacivertin yerini alan canlı kobalt/indigo
        brand: {
          50: "#EEF0FF",
          100: "#DEDCFF",
          200: "#C2C0FF",
          300: "#9E97FF",
          400: "#6F5FEA",
          500: "#4A3AE0", // ana marka rengi
          600: "#3B2CC7",
          700: "#2E1F9E", // koyu zemin / hero arka planı
          800: "#22177A",
          900: "#170F52",
        },
        // Tek accent: turuncu (CTA, hover, glow) — lime/mor'u ikincil dekor olarak sakla
        accent: {
          300: "#FFB08A",
          400: "#FF8952",
          500: "#FF6A2B", // birincil CTA rengi
          600: "#E0501A",
          700: "#B83C10",
        },
        // Neon ikincil tonlar — kart/buton glow'unda, 3D obje iç ışığında
        magic: {
          violet: "#8B5CF6",
          cyan: "#06B6D4",
          lime: "#A6D608",
        },
        // Tüm site artık koyu tema (B2B Glassmorphism Techwave — slate navy zemin)
        surface: {
          DEFAULT: "#080C14",
          sunken: "#05070D",
          raised: "#0E1420",
          line: "rgba(255,255,255,0.1)",
          dark: "#080C14",
          "dark-sunken": "#05070D",
        },
        ink: {
          DEFAULT: "#F2F1F5",
          soft: "#9B99A8",
        },
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(46,31,158,0.12), inset 0 1px 0 rgba(255,255,255,0.4)",
        glow: "0 0 40px rgba(255,106,43,0.35)",
        "glow-lg": "0 0 56px rgba(255,106,43,0.5)",
      },
      backdropBlur: {
        glass: "20px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
