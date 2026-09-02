"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

/** Sun/Moon tema switcher — Header'da CTA butonunun yanında. Sayfa düzeni
 * hiç değişmeden, sadece CSS değişkenleri (`<html data-theme>`) üzerinden
 * renkler yumuşak bir geçişle (bkz. globals.css transition) değişir.
 *
 * İlk render'da her zaman "dark" varsayar (sunucu ile aynı) — asıl tercih
 * layout.tsx'teki engelleyici script tarafından paint öncesi zaten DOM'a
 * uygulanmıştır; burada sadece ikon durumu mount sonrası senkronize edilir,
 * bu yüzden hydration uyuşmazlığı oluşmaz. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    setTheme(current);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // localStorage kapalıysa (gizli mod vb.) sessizce yoksay
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Aydınlık temaya geç" : "Koyu temaya geç"}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-ink/5 text-ink transition-colors hover:bg-ink/10"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}
