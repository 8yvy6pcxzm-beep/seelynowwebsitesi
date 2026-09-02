import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "Seelynow gizlilik politikası — hangi bilgileri topluyoruz, nasıl kullanıyoruz.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Gizlilik Politikası"
      updated="Ağustos 2026"
      sections={[
        {
          heading: "Kimiz",
          body: (
            <p>
              Seelynow, dijital otomasyon ve yapay zekâ entegrasyonu ajansıdır. Bu politika, bu web sitesi
              üzerinden topladığımız bilgileri ve bunları nasıl kullandığımızı açıklar. İletişim:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-magic-cyan hover:underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          ),
        },
        {
          heading: "Topladığımız bilgiler",
          body: (
            <p>
              Bize doğrudan sağladığınız bilgileri toplarız — örneğin bize e-posta gönderdiğinizde ya da
              randevu aracımız (Calendly) üzerinden görüşme ayarladığınızda. Bu; adınızı, e-posta adresinizi,
              telefon numaranızı ve işletme ihtiyaçlarınız hakkında bize anlattıklarınızı içerebilir.
            </p>
          ),
        },
        {
          heading: "Nasıl kullanıyoruz",
          body: (
            <p>
              Bu bilgileri yalnızca talebinize yanıt vermek, keşif görüşmeleri planlamak ve yürütmek, ve
              talep ettiğiniz hizmetleri sunmak için kullanırız. Bilgilerinizi üçüncü taraflara satmayız.
            </p>
          ),
        },
        {
          heading: "Üçüncü taraf hizmetler",
          body: (
            <p>
              Bu site, çalışabilmek için Google Fonts ve bir randevu aracı (Calendly) kullanır. Bu sağlayıcılar,
              hizmetlerini sunmanın bir parçası olarak sınırlı teknik veriler (ör. IP adresi) işleyebilir. Bu
              sitede reklam izleyicileri kullanmıyoruz.
            </p>
          ),
        },
        {
          heading: "Veri saklama ve haklarınız",
          body: (
            <p>
              İletişim bilgilerinizi yalnızca sizinle iletişim kurmak veya bir hizmet sunmak için gereken süre
              boyunca saklarız. Bilgilerinize erişme, düzeltme veya silme talebinizi{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-magic-cyan hover:underline">
                {CONTACT_EMAIL}
              </a>{" "}
              adresine e-posta göndererek her zaman yapabilirsiniz. AB'ye özgü haklar için ayrıca{" "}
              <a href="/gdpr" className="font-semibold text-magic-cyan hover:underline">
                KVKK sayfamıza
              </a>{" "}
              bakınız.
            </p>
          ),
        },
        {
          heading: "Değişiklikler",
          body: <p>Bu politikayı zaman zaman güncelleyebiliriz. Yukarıdaki tarih en son değişikliği yansıtır.</p>,
        },
      ]}
    />
  );
}
