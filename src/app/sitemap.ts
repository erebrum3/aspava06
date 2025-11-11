import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.aspava06.nl';
  const locales = ['nl', 'tr', 'en'] as const;
  const paths = ['', '/menu', '/privacy-policy', '/terms', '/cookies'];

  const urls = [];

  for (const lang of locales) {
    for (const path of paths) {
      urls.push({
        url: `${baseUrl}/${lang}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: path === '' ? 1.0 : 0.8,
      });
    }
  }

  return urls;
}
