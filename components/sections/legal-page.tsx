type LegalSection = {
  heading: string;
  body: React.ReactNode;
};

/** Yasal sayfalar (Gizlilik/Şartlar/KVKK) için ortak koyu tema düzeni —
 * seelynow.com'daki içerik korunarak site genelindeki cam/koyu temaya
 * taşındı. */
export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 py-24">
      <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-ink-soft">Son güncelleme: {updated}</p>

      <div className="mt-10 space-y-8">
        {sections.map((section) => (
          <section key={section.heading} className="glass rounded-xl2 border border-white/10 p-6">
            <h2 className="mb-2 text-xl font-bold text-ink">{section.heading}</h2>
            <div className="space-y-2 text-sm leading-relaxed text-ink-soft">{section.body}</div>
          </section>
        ))}
      </div>
    </main>
  );
}
