import type { Metadata } from "next";
import { Playfair_Display, Inter, Montserrat } from "next/font/google";
import { i18n, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import StructuredData from '@/components/StructuredData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileActionBar from '@/components/MobileActionBar';
import "../globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-accent",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

const seoData = {
  nl: {
    title: "Aspava 06 - Authentieke Turkse Restaurant in Schiedam",
    description: "Bestel heerlijke Turkse gerechten online. 100% Halal, dagelijks vers bereid. Pide, kebab, kapsalon en meer. Gratis bezorging in Schiedam.",
    keywords: "turkse restaurant schiedam, halal restaurant, pide schiedam, kebab bezorgen, turkse gerechten, aspava 06, turkse keuken, thuisbezorgd schiedam",
  },
  tr: {
    title: "Aspava 06 - Schiedam'da Otantik Türk Restoranı",
    description: "Lezzetli Türk yemeklerini online sipariş edin. 100% Helal, her gün taze hazırlanır. Pide, kebap, kapsalon ve daha fazlası. Schiedam'da ücretsiz teslimat.",
    keywords: "türk restoranı schiedam, helal restoran, pide schiedam, kebap sipariş, türk yemekleri, aspava 06, türk mutfağı, schiedam teslimat",
  },
  en: {
    title: "Aspava 06 - Authentic Turkish Restaurant in Schiedam",
    description: "Order delicious Turkish dishes online. 100% Halal, freshly prepared daily. Pide, kebab, kapsalon and more. Free delivery in Schiedam.",
    keywords: "turkish restaurant schiedam, halal restaurant, pide schiedam, kebab delivery, turkish cuisine, aspava 06, turkish food, schiedam delivery",
  },
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  // Fix for "undefined" string - fallback to default locale
  const locale: Locale = (lang && lang !== 'undefined' ? lang : 'nl') as Locale;
  const seo = seoData[locale];

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: "Aspava 06" }],
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `https://aspava06.nl/${locale}`,
      siteName: "Aspava 06",
      locale: locale === 'nl' ? 'nl_NL' : locale === 'tr' ? 'tr_TR' : 'en_US',
      type: "website",
    },
    alternates: {
      canonical: `https://aspava06.nl/${locale}`,
      languages: {
        'nl': 'https://aspava06.nl/nl',
        'tr': 'https://aspava06.nl/tr',
        'en': 'https://aspava06.nl/en',
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: rawLang } = await params;
  // Fix for "undefined" string - use type assertion for Next.js 16 compatibility
  const lang: Locale = (rawLang && rawLang !== 'undefined' ? rawLang : 'nl') as Locale;
  const dict = getDictionary(lang);

  const seo = seoData[lang];

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <meta name="description" content={seo.description} />
        <link rel="alternate" hrefLang="nl" href="https://aspava06.nl/nl" />
        <link rel="alternate" hrefLang="tr" href="https://aspava06.nl/tr" />
        <link rel="alternate" hrefLang="en" href="https://aspava06.nl/en" />
        <link rel="alternate" hrefLang="x-default" href="https://aspava06.nl/nl" />
        <StructuredData lang={lang} />
      </head>
      <body className={`${playfairDisplay.variable} ${inter.variable} ${montserrat.variable} font-body antialiased`}>
        <Navbar lang={lang} dict={dict} />
        {children}
        <Footer lang={lang} dict={dict} />
        <MobileActionBar />
      </body>
    </html>
  );
}
