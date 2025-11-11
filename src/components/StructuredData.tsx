'use client';

import { restaurantConfig } from '@/data/restaurantConfig';
import type { Locale } from '@/i18n/config';

interface StructuredDataProps {
  lang: Locale;
}

export default function StructuredData({ lang }: StructuredDataProps) {
  const descriptions = {
    nl: 'Authentieke Turkse restaurant in Schiedam. 100% Halal, dagelijks vers bereid. Pide, kebab, kapsalon en meer.',
    tr: "Schiedam'da otantik Türk restoranı. 100% Helal, her gün taze hazırlanır. Pide, kebap, kapsalon ve daha fazlası.",
    en: 'Authentic Turkish restaurant in Schiedam. 100% Halal, freshly prepared daily. Pide, kebab, kapsalon and more.',
  };

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: restaurantConfig.name,
    description: descriptions[lang],
    image: [
      "https://www.aspava06.nl/images/logo-512.png",
      "https://www.aspava06.nl/images/logo-256.png"
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: restaurantConfig.location.address,
      addressLocality: restaurantConfig.location.city,
      postalCode: restaurantConfig.location.postalCode,
      addressCountry: 'NL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: restaurantConfig.location.coordinates?.lat,
      longitude: restaurantConfig.location.coordinates?.lng,
    },
    telephone: restaurantConfig.contact.phone,
    email: restaurantConfig.contact.email,
    url: 'https://www.aspava06.nl',
    servesCuisine: restaurantConfig.cuisine,
    priceRange: '€€',
    acceptsReservations: false,
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '11:00',
        closes: '22:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '100',
      bestRating: '5',
      worstRating: '1',
    },
    paymentAccepted: ['Cash', 'Credit Card', 'Debit Card', 'iDEAL'],
    currenciesAccepted: 'EUR',
    inLanguage: ['nl', 'tr', 'en'],
    hasMenu: `https://www.aspava06.nl/${lang}#menu`,
    takeawayAvailable: true,
    smokingAllowed: false,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
