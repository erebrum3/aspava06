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
    nl: 'Lees ons cookiebeleid. Wij gebruiken alleen noodzakelijke cookies, geen tracking. Uw privacy is belangrijk.',
    tr: 'Çerez politikamızı okuyun. Sadece gerekli çerezleri kullanıyoruz, takip yok. Gizliliğiniz önemlidir.',
    en: 'Read our cookie policy. We only use necessary cookies, no tracking. Your privacy is important.',
  };

  return {
    title: `${dict.legal.cookiesTitle} | Aspava 06`,
    description: descriptions[lang],
    alternates: {
      languages: {
        nl: '/nl/cookies',
        tr: '/tr/cookies',
        en: '/en/cookies',
      },
    },
  };
}

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function CookiesPage({ params }: PageProps) {
  const { lang: rawLang } = await params;
  const lang = rawLang as Locale;
  const dict = getDictionary(lang);

  return (
    <main className="max-w-4xl mx-auto py-16 px-4 md:px-6 lg:px-8">
      <div className="prose prose-neutral max-w-none">
        <h1 className="text-4xl font-bold mb-8 text-neutral-900">
          {dict.legal.cookiesTitle}
        </h1>

        <div className="space-y-6 text-neutral-700">
          {lang === 'nl' && (
            <>
              <section>
                <h2 className="text-2xl font-semibold mb-4">Wat zijn cookies?</h2>
                <p>
                  Cookies zijn kleine tekstbestanden die worden opgeslagen wanneer u
                  onze website bezoekt. Ze helpen de website goed te functioneren.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Welke cookies gebruiken wij?</h2>
                <h3 className="text-xl font-semibold mt-4 mb-2">Noodzakelijke cookies</h3>
                <p>
                  Deze zijn essentieel voor het functioneren van de website, zoals
                  taalvoorkeur en sessie-informatie.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Wij gebruiken GEEN:</h2>
                <ul className="list-disc pl-6">
                  <li>Tracking cookies</li>
                  <li>Marketing cookies</li>
                  <li>Google Analytics</li>
                  <li>Social media cookies</li>
                </ul>
                <p className="mt-4 font-semibold text-green-700">
                  ✓ Uw privacy is belangrijk. Wij verkopen geen gegevens.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Vragen?</h2>
                <p>
                  Neem contact op via <a href="mailto:info@aspava06.nl" className="text-red-600 hover:underline">info@aspava06.nl</a>
                </p>
              </section>
            </>
          )}

          {lang === 'tr' && (
            <>
              <section>
                <h2 className="text-2xl font-semibold mb-4">Çerezler nedir?</h2>
                <p>
                  Çerezler, web sitemizi ziyaret ettiğinizde saklanan küçük metin dosyalarıdır.
                  Web sitesinin düzgün çalışmasına yardımcı olurlar.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Hangi çerezleri kullanıyoruz?</h2>
                <h3 className="text-xl font-semibold mt-4 mb-2">Gerekli çerezler</h3>
                <p>
                  Bunlar web sitesinin çalışması için gereklidir, örneğin dil tercihi
                  ve oturum bilgileri.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Kullanmadığımız çerezler:</h2>
                <ul className="list-disc pl-6">
                  <li>Takip çerezleri</li>
                  <li>Pazarlama çerezleri</li>
                  <li>Google Analytics</li>
                  <li>Sosyal medya çerezleri</li>
                </ul>
                <p className="mt-4 font-semibold text-green-700">
                  ✓ Gizliliğiniz önemlidir. Verilerinizi satmıyoruz.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Sorular?</h2>
                <p>
                  İletişim: <a href="mailto:info@aspava06.nl" className="text-red-600 hover:underline">info@aspava06.nl</a>
                </p>
              </section>
            </>
          )}

          {lang === 'en' && (
            <>
              <section>
                <h2 className="text-2xl font-semibold mb-4">What are cookies?</h2>
                <p>
                  Cookies are small text files that are stored when you visit our website.
                  They help the website function properly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Which cookies do we use?</h2>
                <h3 className="text-xl font-semibold mt-4 mb-2">Necessary cookies</h3>
                <p>
                  These are essential for the website to function, such as language
                  preference and session information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">We do NOT use:</h2>
                <ul className="list-disc pl-6">
                  <li>Tracking cookies</li>
                  <li>Marketing cookies</li>
                  <li>Google Analytics</li>
                  <li>Social media cookies</li>
                </ul>
                <p className="mt-4 font-semibold text-green-700">
                  ✓ Your privacy is important. We do not sell data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold mb-4">Questions?</h2>
                <p>
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
