import { getDictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return [
    { lang: 'nl' as Locale },
    { lang: 'tr' as Locale },
    { lang: 'en' as Locale },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = getDictionary(lang);

  const descriptions = {
    nl: 'Lees ons privacybeleid. Hoe wij uw gegevens verzamelen en gebruiken. Uw rechten en bescherming.',
    tr: 'Gizlilik politikamızı okuyun. Verilerinizi nasıl topladığımız ve kullandığımız. Haklarınız ve korumanız.',
    en: 'Read our privacy policy. How we collect and use your data. Your rights and protection.',
  };

  return {
    title: `${dict.legal.privacyTitle} | Aspava 06`,
    description: descriptions[lang],
    alternates: {
      languages: {
        nl: '/nl/privacy-policy',
        tr: '/tr/privacy-policy',
        en: '/en/privacy-policy',
      },
    },
  };
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function PrivacyPolicyPage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = getDictionary(lang);

  return (
    <main className="max-w-4xl mx-auto py-16 px-4 md:px-6 lg:px-8">
      <div className="prose prose-neutral max-w-none">
        <h1 className="text-4xl font-bold mb-8 text-neutral-900">
          {dict.legal.privacyTitle}
        </h1>

        <div className="space-y-6 text-neutral-700">
          {lang === 'nl' && (
            <>
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Informatie die wij verzamelen</h2>
                <p>
                  Wij verzamelen alleen de informatie die noodzakelijk is voor het verwerken
                  van uw bestelling: naam, telefoonnummer, en bezorgadres (indien van toepassing).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Gebruik van informatie</h2>
                <p>
                  Uw gegevens worden uitsluitend gebruikt voor het verwerken van bestellingen
                  en communicatie over uw bestelling. Wij delen uw gegevens niet met derden
                  voor marketingdoeleinden.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Bewaartermijn</h2>
                <p>
                  Bestelgegevens worden bewaard conform de fiscale wetgeving (7 jaar).
                  Contactgegevens worden bewaard tot u verzoekt om verwijdering.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Uw rechten</h2>
                <p>
                  U heeft het recht op inzage, correctie, en verwijdering van uw gegevens.
                  Neem contact op via <a href="mailto:info@aspava06.nl" className="text-red-600 hover:underline">info@aspava06.nl</a>
                </p>
              </section>
            </>
          )}

          {lang === 'tr' && (
            <>
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Topladığımız Bilgiler</h2>
                <p>
                  Sadece siparişinizi işlemek için gerekli bilgileri topluyoruz: adınız, telefon numaranız
                  ve teslimat adresiniz (geçerliyse).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Bilgilerin Kullanımı</h2>
                <p>
                  Verileriniz yalnızca siparişleri işlemek ve siparişiniz hakkında iletişim kurmak için kullanılır.
                  Pazarlama amaçları için verilerinizi üçüncü taraflarla paylaşmıyoruz.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Saklama Süresi</h2>
                <p>
                  Sipariş verileri vergi mevzuatına uygun olarak saklanır (7 yıl).
                  İletişim bilgileri silme talebinde bulunana kadar saklanır.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Haklarınız</h2>
                <p>
                  Verilerinizi görme, düzeltme ve silme hakkına sahipsiniz.
                  İletişim: <a href="mailto:info@aspava06.nl" className="text-red-600 hover:underline">info@aspava06.nl</a>
                </p>
              </section>
            </>
          )}

          {lang === 'en' && (
            <>
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                <p>
                  We only collect information necessary to process your order: name, phone number,
                  and delivery address (if applicable).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Use of Information</h2>
                <p>
                  Your data is used exclusively for processing orders and communicating about your order.
                  We do not share your data with third parties for marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Retention Period</h2>
                <p>
                  Order data is retained in accordance with tax legislation (7 years).
                  Contact information is retained until you request deletion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Your Rights</h2>
                <p>
                  You have the right to access, correct, and delete your data.
                  Contact: <a href="mailto:info@aspava06.nl" className="text-red-600 hover:underline">info@aspava06.nl</a>
                </p>
              </section>
            </>
          )}

          <p className="text-sm text-gray-500 mt-8">
            {dict.legal.lastUpdated}: November 2025
          </p>
        </div>
      </div>
    </main>
  );
}
