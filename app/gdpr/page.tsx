import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "KVKK",
  description: "Seelynow KVKK / GDPR bilgilendirmesi.",
};

export default function GdprPage() {
  return (
    <LegalPage
      title="KVKK"
      updated="Ağustos 2026"
      sections={[
        {
          heading: "Veri sorumlusu",
          body: (
            <p>
              Seelynow, bu web sitesi üzerinden toplanan kişisel bilgiler için veri sorumlusu olarak hareket
              eder. İletişim:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-magic-cyan hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          ),
        },
        {
          heading: "İşlemenin hukuki dayanağı",
          body: (
            <p>
              Bilgilerinizi rızanıza dayanarak (bize e-posta gönderdiğinizde veya görüşme ayarladığınızda) ve
              uygun olduğunda, talebinize yanıt verme ve talep ettiğiniz hizmeti sunma konusundaki meşru
              menfaatimize dayanarak işleriz.
            </p>
          ),
        },
        {
          heading: "Haklarınız",
          body: (
            <div className="space-y-2">
              <p>AB/AEA'da bulunuyorsanız aşağıdaki haklara sahipsiniz:</p>
              <ul className="list-inside list-disc space-y-1">
                <li>Sizinle ilgili tuttuğumuz kişisel verilere erişme</li>
                <li>Hatalı verilerin düzeltilmesini talep etme</li>
                <li>Verilerinizin silinmesini talep etme</li>
                <li>Verilerinizin işlenmesine itiraz etme veya sınırlandırma talep etme</li>
                <li>Verilerinizin taşınabilir bir formatta bir kopyasını talep etme</li>
                <li>Rızanızı istediğiniz zaman geri çekme</li>
              </ul>
              <p>
                Bu haklardan herhangi birini kullanmak için{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-magic-cyan hover:underline">
                  {CONTACT_EMAIL}
                </a>{" "}
                adresine e-posta gönderin. Makul bir süre içinde yanıt vereceğiz.
              </p>
            </div>
          ),
        },
        {
          heading: "Uluslararası aktarımlar",
          body: (
            <p>
              Kullandığımız bazı üçüncü taraf araçlar (randevu ve e-posta sağlayıcılarımız gibi) verileri
              AB/AEA dışında işleyebilir. Bu sağlayıcılar, uluslararası veri aktarımları için kendi uyumluluk
              güvencelerini sürdürür.
            </p>
          ),
        },
        {
          heading: "İlgili",
          body: (
            <p>
              Ne topladığımız ve nedenine dair ayrıntılar için{" "}
              <a href="/privacy" className="font-semibold text-magic-cyan hover:underline">
                Gizlilik Politikamıza
              </a>{" "}
              da bakabilirsiniz.
            </p>
          ),
        },
      ]}
    />
  );
}
