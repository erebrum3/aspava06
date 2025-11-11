import HeroSection from '@/components/HeroSection';
import MenuHighlights from '@/components/MenuHighlights';
import ReviewsSection from '@/components/ReviewsSection';
import OrangeWall from '@/components/OrangeWall';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';
import OliveDivider from '@/components/OliveDivider';
import { getDictionary } from '@/i18n/get-dictionary';
import { type Locale } from '@/i18n/config';

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  // Fix for "undefined" string - use type assertion for Next.js 16 compatibility
  const lang: Locale = (rawLang && rawLang !== 'undefined' ? rawLang : 'nl') as Locale;
  const dict = getDictionary(lang);

  return (
    <main>
      <HeroSection lang={lang} dict={dict} />

      {/* Divider 1: Hero → Menu (olive1.png) */}
      <OliveDivider variant={1} className="py-8" />

      <MenuHighlights lang={lang} dict={dict} />

      {/* Divider 2: Menu → Reviews (olive2.png) */}
      <OliveDivider variant={2} className="py-8" />

      <ReviewsSection lang={lang} dict={dict} />

      <OrangeWall dict={dict} />

      {/* Divider 3: OrangeWall → About (olive3.png) */}
      <OliveDivider variant={3} className="py-8" />

      <AboutSection lang={lang} dict={dict} />
      <ContactSection lang={lang} dict={dict} />
    </main>
  );
}
