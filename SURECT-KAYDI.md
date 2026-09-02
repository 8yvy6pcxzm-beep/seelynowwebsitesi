# seelynow.com — Bağlantı Kurulumu Süreç Kaydı

## Kaynak dosya (canlı site buradan yayınlanıyor)
`/Users/elifakyuz/Desktop/seelynow - internet sitesi/TEKNİK/internet sitesi teknik.AI/index.html`
Deploy: Vercel proje adı `seelynow-ai` (`.vercel/project.json`)

## Calendly
- Link: https://calendly.com/seelynow/tanisma-gorusmesi
- Tespit edilen toplantı türü: "Tanışma Görüşmesi" — sahibi Elif Akyuz
- Görüşmeler Google Meet üzerinden yapılıyor (kullanıcı teyidi, 2026-08-03)
- Not: Calendly sayfası JS ile render olduğu için süre/açıklama otomatik çekilemedi, sadece meta veriden etkinlik adı doğrulandı.

## Yapılacaklar / Durum
- [x] Site içindeki tüm linkleri (mailto, #anchor, harici) tara ve listele
- [x] "Book a Call" / "Book a Free Call" butonlarını (nav desktop, nav mobil, hero, contact bölümü — 4 buton) Calendly linkine bağla, `target="_blank"` ile yeni sekmede açılıyor
- [x] mailto: linkleri kontrol edildi — info@seelynow.com doğru, çalışıyor
- [x] SEO hatası düzeltildi: canonical/og:url yanlışlıkla `seelynow.ai`'ye gidiyordu → `seelynow.com` yapıldı
- [x] og:image kırıktı (`/og-image.jpg` 404 veriyordu) → mevcut `logo.png`'ye yönlendirildi
- [x] Deploy edildi (`vercel --prod`, dpl_2aMk67DZ1gt1PFTDkB244vWqwJ1q), canlıda doğrulandı
- [x] Footer'daki LinkedIn ikonu kaldırıldı (kullanıcı: "henüz yok")
- [x] Privacy Policy / Terms of Use / GDPR — taslak sayfalar yazıldı (`privacy.html`, `terms.html`, `gdpr.html`), footer linklendi, deploy edildi. NOT: bunlar standart taslak metin, gerçek avukat incelemesi değil — kullanıcı isterse daha sonra profesyonel gözden geçirme yaptırabilir.
- [ ] "Request a Demo" ve "Learn More" butonları hâlâ `#contact` bölümüne scroll ediyor (bilinçli bırakıldı — o bölümde artık hem Calendly hem mailto var)

## Not
Dosya `chflags uchg` ile kilitliydi ("kilit sistemi" — KLASOR-REHBERI.txt). Düzenleme için kilit kaldırıldı, değişiklikler sonrası tekrar kilitlendi.

## Calendly API entegrasyonu (2026-08-03)
- Tam yetkili Personal Access Token alındı, `seelynowwebsitesi/.env.local` içine kaydedildi (git'e eklenmez, chmod 600).
- Calendly hesabı: Elif Akyuz, akyuzelif05@gmail.com, scheduling_url: calendly.com/seelynow
- Aktif randevular teyit edildi (4 adet, "Tanışma Görüşmesi"): Ayşenur Seymen (4 Ağu 11:00, telefon), "Zzzzz" x2 (4 Ağu 13:00 + 6 Ağu 15:00, WhatsApp — muhtemelen test kaydı, kullanıcıya soruldu), Gökhan Ercan (7 Ağu 15:30, Google Meet)
- Randevular zaten Calendly → Google Takvim'e otomatik yazılıyor (calendar_event.kind: google). Kullanıcı Mac'te Google hesabını Apple Takvim'e bağladı (2026-08-03) — bundan sonra tüm randevular otomatik Apple Takvim'de görünecek.
- [x] KAPANDI: "yeni randevu → elif@seelynow.ink mail" otomasyonu (n8n webhook + Calendly Workflows denemeleri) kullanıcı tarafından vazgeçildi — "zaten diğer maile geliyor" (akyuzelif05@gmail.com, Calendly'nin varsayılan host bildirimi), yeterli bulundu (2026-08-03). n8n/Calendly API key'leri `.env.local`'de duruyor, ileride lazım olursa kullanılabilir.
- Kullanıcı ileride aynı Calendly entegrasyonunu seelydeal.seelynow.com'a da yapmak istiyor.

## AI yardım kutucuğu "Seely" (2026-08-03)
- Backend: SeelyDeal'da `app/api/site-assistant/route.ts` (Anthropic claude-sonnet-5, CORS ile seelynow.com + seely-deal.vercel.app + localhost izinli). Mevcut `ANTHROPIC_API_KEY` kullanıldı, ekstra key almaya gerek kalmadı.
- Frontend: `public/widget.js` (SeelyDeal) — Shadow DOM içinde bağımsız, sağ altta yuvarlak buton, sohbet paneli, Calendly + mailto CTA'ları. `https://seely-deal.vercel.app/widget.js` adresinden serve ediliyor.
- ÖNEMLİ: SeelyDeal'ın gerçek canlı adresi `https://seely-deal.vercel.app` — kullanıcının bahsettiği "seelydeal.seelynow.com" custom domain'i HENÜZ KURULMAMIŞ. İleride kurulursa widget.js ve API_URL referansları (index.html'deki script src + widget.js içindeki API_URL fallback) güncellenmeli.
- seelynow.com (index.html + privacy/terms/gdpr.html) ve SeelyDeal'ın kendi marketing sayfası ((marketing)/layout.tsx, next/script lazyOnload) — ikisine de eklendi, deploy edildi, canlıda doğrulandı.
- Not: SeelyDeal projesinin lokal `.vercel/project.json`'ı yanlış/eski bir org'a bağlıydı ("tender" projesi, erişilemeyen org) — doğru proje `seely-deal` (avelifakyuz1-6566s-projects) olarak yeniden linklendi (`vercel link`).
- İYİLEŞTİRME (2026-08-03): Widget hangi sitede olduğunu Origin header'ından anlıyor artık — seelynow.com'da ajans sistem promptu, seelydeal.seelynow.com'da (= seely-deal.vercel.app, aynı deploy) SeelyDeal'a özel sistem promptu (app.config.ts'deki gerçek pricing/features/faq'dan otomatik oluşturuluyor). DÜZELTME: seelydeal.seelynow.com zaten canlıydı, önceki "henüz kurulmadı" notum yanlıştı — `vercel domains ls` sadece apex domain kaydını gösteriyor, subdomain alias'ları göstermiyor.
- DÜRÜSTLÜK KATMANI (2026-08-03): route.ts'e "GERÇEK KURULUM DURUMU" bloğu eklendi — widget artık CRM/SSO/roller gibi altyapısı olup gerçek sağlayıcıya bağlı olmayan özellikler için "hazır/bağlı" demiyor, "kurulum sürecinde özel bağlanır" diyor. Deploy edildi, test edildi (CRM ve SSO soruları doğru cevaplandı).

## SeelyDeal DB migration backlog düzeltmesi (2026-08-04)
- BUG: Kayıt ol ("Başla") tıklanınca "companies_plan_check" hatası — kök neden: canlı Supabase veritabanı hâlâ eski paket isimlerini (`starter/growth/scale`) bekliyordu, kod ise yeni isimleri (`lite/pro/custom`) gönderiyordu. 8 migration dosyası (20260730030000'den 20260803120000'e kadar) hiç canlıya uygulanmamıştı (`supabase migration list` ile tespit edildi).
- ÇÖZÜM: Her migration'ı tek tek inceleyip (bazı tablolar kısmen elle uygulanmış olduğu için `supabase db push` çakışma verdi), idempotent hale getirip `supabase db query --linked` ile canlıya uyguladım: OTP/görüntüleme takibi tabloları, CRM bağlantı tabloları, görüntüleme bölüm-süreleri, canlı fiyat seçimi kolonları, doküman kütüphanesi paket kısıtlaması (lite → yeni doküman ekleyemez), OTP brute-force koruması. Sonra `supabase migration repair --status applied` ile migration geçmişini gerçek duruma eşitledim. `migration list` artık local=remote, tam senkron.
- Kayıt olma hatası doğrulandı ve çözüldü.

## Ödeme sıklığı başına ayrı ödeme linki (2026-08-04)
- BUG RAPORU: Kullanıcı AI ile teklif yazarken (aylık/yıllık ödeme seçenekli) "iki farklı ödeme sıklığı için iki farklı ödeme linki ekleyebilir miyim?" diye sordu, AI'dan hiç cevap gelmedi (sohbet sessizce takıldı).
- KÖK NEDEN 1 (özellik eksikliği): `billingOptions`da sadece `{key, label, price}` vardı, ödeme linki teklife tek/global olarak bağlıydı (`payment_link` kolonu) — sıklık başına ayrı link tutulamıyordu.
- KÖK NEDEN 2 (sessiz hata): AI muhtemelen teklifi güncelleyip json bloğunu tekrar döndürdü ama yazı kısmı boştu; frontend (`ai-draft-dialog.tsx`) boş `reply`'i sessizce mesaj olarak ekliyordu — kullanıcı hiçbir şey görmedi.
- ÇÖZÜM: `BillingOption` tipine opsiyonel `paymentLink` eklendi (DB'de migration gerekmedi, `billing_options` zaten jsonb). AI taslak dialogu ve manuel düzenleme dialogunda artık her ödeme seçeneğinin kendi link input'u var (seçenek varsa tekil "Ödeme linki" alanı gizleniyor). İmzalama route'u (`sign/route.ts`) artık seçilen `billingKey`'in linkini kullanıyor, yoksa tekil `payment_link`'e düşüyor. Boş AI cevabı için fallback mesaj eklendi ("Teklifi güncelledim, önizlemeden kontrol edebilirsin"). Deploy edildi, tsc temiz.
- EK DÜZELTME: draft-proposal sistem promptuna "kullanıcının her sorusuna mutlaka yazıyla cevap ver, sadece json bloğu dönüp sessiz kalma" kuralı + yeni per-option ödeme linki özelliğinin AI tarafından bilinmesi eklendi (kullanıcı "iki ayrı link ekleyebilir miyim" diye sorarsa artık doğru cevap veriyor).
- EK İSTEK: site-assistant (Seely widget) "bilmiyorum" fallback'i artık "elif@seelynow.ink ile iletişime geçiniz" diyor (önceden sadece info@seelynow.com/Calendly öneriyordu). Test edildi, doğru çalışıyor.

## Kararlar
- Site tasarımı kullanıcı tarafından "çirkin" olarak nitelendi, yeniden tasarlanacak — bu tur sadece bağlantıları/içeriği çalışır hale getirmek için, tasarıma dokunulmuyor.
