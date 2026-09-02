import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/legal-page";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Kullanım Şartları",
  description: "Seelynow kullanım şartları.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Kullanım Şartları"
      updated="Ağustos 2026"
      sections={[
        {
          heading: "Kabul",
          body: <p>Bu web sitesini (seelynow.com) kullanarak bu şartları kabul etmiş olursunuz. Kabul etmiyorsanız lütfen siteyi kullanmayın.</p>,
        },
        {
          heading: "Sitenin kullanımı",
          body: (
            <p>
              Bu web sitesi, Seelynow'un hizmetleri hakkında bilgi paylaşmak ve ziyaretçilerin bizimle
              iletişime geçmesini ya da keşif görüşmesi ayarlamasını sağlamak için sunulur. Siteyi yalnızca
              yasal amaçlarla kullanmayı ve işleyişini bozmamayı kabul edersiniz.
            </p>
          ),
        },
        {
          heading: "Sonuç garantisi yok",
          body: (
            <p>
              Bu sitede yer alan yapay zekâ destekli otomasyon, sonuç ya da zaman çizelgesi açıklamaları genel
              ve örnek niteliklidir. Gerçek sonuçlar, ilgili çalışmaya bağlıdır ve ayrı bir teklif veya
              sözleşmede belirlenir.
            </p>
          ),
        },
        {
          heading: "Fikri mülkiyet",
          body: (
            <p>
              Bu sitedeki içerik, tasarım ve marka unsurları, aksi belirtilmedikçe Seelynow'a aittir. İzinsiz
              kopyalayamaz veya yeniden kullanamazsınız.
            </p>
          ),
        },
        {
          heading: "Üçüncü taraf bağlantılar ve araçlar",
          body: (
            <p>
              Bu site, üçüncü taraf araçlara (randevu ve e-posta sağlayıcılarımız gibi) bağlantı verir. Bu
              üçüncü taraf hizmetlerin içeriğinden veya uygulamalarından sorumlu değiliz.
            </p>
          ),
        },
        {
          heading: "Değişiklikler",
          body: <p>Bu şartları zaman zaman güncelleyebiliriz. Bir değişiklikten sonra siteyi kullanmaya devam etmeniz, güncellenmiş şartları kabul ettiğiniz anlamına gelir.</p>,
        },
        {
          heading: "İletişim",
          body: (
            <p>
              Bu şartlarla ilgili sorularınız mı var? Bize{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-magic-cyan hover:underline">
                {CONTACT_EMAIL}
              </a>{" "}
              adresinden ulaşabilirsiniz.
            </p>
          ),
        },
      ]}
    />
  );
}
