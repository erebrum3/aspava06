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
    nl: 'Lees onze algemene voorwaarden voor bestellingen bij Aspava 06. Levering, betaling, allergenen en meer.',
    tr: 'Aspava 06\'da sipariş için genel koşullarımızı okuyun. Teslimat, ödeme, alerjenler ve daha fazlası.',
    en: 'Read our terms and conditions for orders at Aspava 06. Delivery, payment, allergens and more.',
  };

  return {
    title: `${dict.legal.termsTitle} | Aspava 06`,
    description: descriptions[lang],
    alternates: {
      languages: {
        nl: '/nl/terms',
        tr: '/tr/terms',
        en: '/en/terms',
      },
    },
  };
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function TermsPage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = getDictionary(lang);

  return (
    <main className="max-w-4xl mx-auto py-16 px-4 md:px-6 lg:px-8">
      <div className="prose prose-neutral max-w-none">
        <h1 className="text-4xl font-bold mb-8 text-neutral-900">
          {dict.legal.termsTitle}
        </h1>

        <div className="space-y-6 text-neutral-700">
          {lang === 'nl' && (
            <>
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Algemeen</h2>
                <p>
                  Deze voorwaarden zijn van toepassing op alle bestellingen bij Aspava 06,
                  Broersveld 113B, 3111 LE Schiedam.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Bestellingen</h2>
                <p>
                  Bestellingen kunnen via WhatsApp of telefoon worden geplaatst.
                  Een bestelling is een verzoek en wordt door ons bevestigd.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Prijzen & Betaling</h2>
                <p>
                  Alle prijzen zijn inclusief BTW. Betaling bij levering via contant of PIN.
                  Prijzen zijn indicatief en kunnen wijzigen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Levering</h2>
                <p>
                  Levertijd: 30-60 minuten. Minimum bestelbedrag voor bezorging: €15,00.
                  Bezorggebied: Schiedam en directe omgeving.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Allergenen</h2>
                <p className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                  <strong>⚠️ Belangrijk:</strong> Bij vragen over allergenen neem altijd
                  contact op: +31 6 43653765
                </p>
              </section>
            </>
          )}

          {lang === 'tr' && (
            <>
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. Genel</h2>
                <p>
                  Bu koşullar Aspava 06'daki tüm siparişler için geçerlidir,
                  Broersveld 113B, 3111 LE Schiedam.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Siparişler</h2>
                <p>
                  Siparişler WhatsApp veya telefon ile verilebilir.
                  Sipariş bir taleptir ve tarafımızdan onaylanır.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Fiyatlar ve Ödeme</h2>
                <p>
                  Tüm fiyatlar KDV dahildir. Teslimat sırasında nakit veya PIN ile ödeme yapılır.
                  Fiyatlar gösterge niteliğindedir ve değişebilir.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Teslimat</h2>
                <p>
                  Teslimat süresi: 30-60 dakika. Teslimat için minimum sipariş tutarı: €15,00.
                  Teslimat bölgesi: Schiedam ve yakın çevre.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Alerjenler</h2>
                <p className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                  <strong>⚠️ Önemli:</strong> Alerjenler hakkında sorularınız için her zaman
                  iletişime geçin: +31 6 43653765
                </p>
              </section>
            </>
          )}

          {lang === 'en' && (
            <>
              <section>
                <h2 className="text-2xl font-semibold mb-4">1. General</h2>
                <p>
                  These terms apply to all orders at Aspava 06,
                  Broersveld 113B, 3111 LE Schiedam.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">2. Orders</h2>
                <p>
                  Orders can be placed via WhatsApp or phone.
                  An order is a request and will be confirmed by us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">3. Prices & Payment</h2>
                <p>
                  All prices include VAT. Payment upon delivery via cash or PIN.
                  Prices are indicative and subject to change.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">4. Delivery</h2>
                <p>
                  Delivery time: 30-60 minutes. Minimum order amount for delivery: €15.00.
                  Delivery area: Schiedam and immediate surroundings.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">5. Allergens</h2>
                <p className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                  <strong>⚠️ Important:</strong> For questions about allergens, always
                  contact us: +31 6 43653765
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
