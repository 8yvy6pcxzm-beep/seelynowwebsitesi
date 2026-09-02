"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

type Particle = {
  x: number;
  y: number;
  baseY: number;
  radius: number;
  hueColor: string;
  phase: number;
  speed: number;
};

const COLORS = ["#8B5CF6", "#06B6D4", "#FF6A2B"];
const PARTICLE_DENSITY = 1 / 9000; // parçacık sayısı = alan * yoğunluk
const MOBILE_BREAKPOINT = 768;
const MOBILE_PARTICLE_COUNT = 35; // düşük donanımlı telefonlarda kasma/batarya tüketimini önler

/**
 * Saf HTML5 Canvas2D ile ambient particle-wave arka planı — Three.js/WebGL
 * yerine geçer. Fareye hafifçe tepki verir (parallax itme), sürekli hafif
 * dalgalanır. `prefers-reduced-motion` açıkken statik tek kareye döner.
 */
export function AmbientCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles: Particle[] = [];
    let mouseX = 0;
    let mouseY = 0;
    let rafId = 0;
    let time = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      mouseX = width / 2;
      mouseY = height / 2;

      const count =
        window.innerWidth < MOBILE_BREAKPOINT
          ? MOBILE_PARTICLE_COUNT
          : Math.max(24, Math.min(90, Math.round(width * height * PARTICLE_DENSITY)));
      particles = Array.from({ length: count }, () => {
        const y = Math.random() * height;
        return {
          x: Math.random() * width,
          y,
          baseY: y,
          radius: 1 + Math.random() * 1.8,
          hueColor: COLORS[Math.floor(Math.random() * COLORS.length)],
          phase: Math.random() * Math.PI * 2,
          speed: 0.3 + Math.random() * 0.5,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        const wave = Math.sin(time * 0.0006 * p.speed + p.phase) * 14;
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.hypot(dx, dy);
        const near = dist < 160;
        const influence = Math.max(0, 1 - dist / 260);
        const pushX = influence * -dx * 0.03;
        const pushY = influence * -dy * 0.03;

        const x = p.x + pushX;
        const y = p.baseY + wave + pushY;

        ctx.beginPath();
        ctx.arc(x, y, near ? p.radius * 1.8 : p.radius + influence * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = near ? "#06B6D4" : p.hueColor;
        ctx.shadowBlur = near ? 14 : 0;
        ctx.shadowColor = "#06B6D4";
        ctx.globalAlpha = 0.35 + influence * 0.4;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    };

    const loop = (t: number) => {
      time = t;
      draw();
      rafId = requestAnimationFrame(loop);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    if (reducedMotion) {
      draw();
    } else {
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("pointer-events-none block h-full w-full", className)}
    />
  );
}
