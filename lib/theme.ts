export const THEME_STORAGE_KEY = "seelynow-theme";

export type Theme = "dark" | "light";

/** <head>'te paint'ten önce çalışan engelleyici script — localStorage'daki
 * tercihi <html data-theme> attribute'üne uygular, böylece sayfa ilk
 * yüklendiğinde yanlış temayla bir kare bile flaşlamaz (FOUC yok).
 * Attribute yoksa varsayılan zaten dark (globals.css :root). */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'){document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`;
