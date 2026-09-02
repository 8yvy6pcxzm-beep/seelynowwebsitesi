"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type GlowButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "glass";
  external?: boolean;
  className?: string;
  onClick?: () => void;
} & ({ href: string; type?: undefined } | { href?: undefined; type: "submit" | "button" });

const styles = (variant: "primary" | "glass") =>
  cn(
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold",
    "transition-[box-shadow,background-color,border-color] duration-300",
    "outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080C14]",
    variant === "primary"
      ? "bg-accent-500 text-white shadow-glow hover:shadow-glow-lg active:shadow-glow"
      : "glass-dark text-white hover:bg-white/10 hover:shadow-[0_0_28px_-8px_#8B5CF6] active:bg-white/[0.06]",
  );

/** CTA butonu — birincil (turuncu, dış glow) veya cam (koyu zemin üzerinde
 * ikincil aksiyon) varyantı. `href` verilirse link, `type` verilirse gerçek
 * bir form butonu (`submit`/`button`) render eder. Hover'da belirgin
 * scale+glow, tap'te (active) geri çekilme mikro-etkileşimi var. */
export function GlowButton({ children, variant = "primary", external = false, className, onClick, ...rest }: GlowButtonProps) {
  if ("href" in rest && rest.href !== undefined) {
    return (
      <motion.a
        href={rest.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        onClick={onClick}
        whileHover={{ scale: 1.045, y: -1 }}
        whileTap={{ scale: 0.95, y: 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className={cn(styles(variant), className)}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={rest.type ?? "button"}
      onClick={onClick}
      whileHover={{ scale: 1.045, y: -1 }}
      whileTap={{ scale: 0.95, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={cn(styles(variant), className)}
    >
      {children}
    </motion.button>
  );
}
