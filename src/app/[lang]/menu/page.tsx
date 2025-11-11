import { menuData } from '@/data/menuData';
import MenuItemCard from '@/components/MenuItemCard';
import { getDictionary } from '@/i18n/get-dictionary';
import { type Locale } from '@/i18n/config';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = lang as Locale;

  const titles = {
    nl: 'Volledig Menu - Aspava 06',
    tr: 'Tam Menü - Aspava 06',
    en: 'Full Menu - Aspava 06',
  };

  const descriptions = {
    nl: 'Bekijk ons volledige menu met authentieke Turkse gerechten. Pide, kebab, kapsalon, grills en meer. 100% Halal, vers bereid.',
    tr: 'Otantik Türk yemekleriyle tam menümüze göz atın. Pide, kebap, kapsalon, ızgara ve daha fazlası. 100% Helal, taze hazırlanmış.',
    en: 'View our full menu with authentic Turkish dishes. Pide, kebab, kapsalon, grills and more. 100% Halal, freshly prepared.',
  };

  return {
    title: titles[locale] || titles.nl,
    description: descriptions[locale] || descriptions.nl,
  };
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  const lang: Locale = (rawLang && rawLang !== 'undefined' ? rawLang : 'nl') as Locale;
  const dict = getDictionary(lang);

  return (
    <main className="min-h-screen bg-[#FAFAF9]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
            {dict.menu.title}
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            {dict.menu.subtitle}
          </p>
          <p className="text-sm text-white/80 mt-3">
            Direct via WhatsApp • Geen commissies • Snel klaar
          </p>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          {menuData.map((category) => (
            <div key={category.id} className="mb-20">
              {/* Category Header */}
              <div className="text-center mb-10">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
                  {category.name[lang]}
                </h2>
                {category.description && (
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    {category.description[lang]}
                  </p>
                )}
                <div className="w-24 h-1 bg-red-600 mx-auto mt-4"></div>
              </div>

              {/* Category Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    lang={lang}
                    dict={dict}
                    showRecommended
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Order CTA */}
      <section className="bg-white py-16 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl font-bold text-neutral-900 mb-4">
            Bestel Nu via WhatsApp
          </h2>
          <p className="text-gray-600 mb-8">
            Stuur ons een bericht op WhatsApp om uw bestelling te plaatsen.
          </p>
          <a
            href="https://wa.me/31643653765"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            {dict.hero.cta || 'Bestel via WhatsApp'}
          </a>
        </div>
      </section>
    </main>
  );
}
