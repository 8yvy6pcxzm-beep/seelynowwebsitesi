import { CALENDLY_URL } from "@/lib/constants";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

/** Calendly popup'ını açar (widget.js henüz yüklenmediyse sekme olarak açığa
 * düşer) — Hero'daki "Keşif Görüşmesi" CTA'sı için, sayfadan ayrılmadan
 * buluşma ayarlamayı sağlar. */
export function openCalendlyPopup() {
  if (typeof window !== "undefined" && window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL });
  } else if (typeof window !== "undefined") {
    window.open(CALENDLY_URL, "_blank", "noopener");
  }
}
