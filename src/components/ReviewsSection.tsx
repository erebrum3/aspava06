'use client';

import { reviewsData } from '@/data/reviewsData';
import type { Locale } from '@/i18n/config';
import type { Translations } from '@/data/locales/nl';

interface ReviewsSectionProps {
  lang: Locale;
  dict: Translations;
}

// Helper function to get initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

// Color palette for avatars (matching Figma design)
const avatarColors = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-emerald-500',
  'bg-pink-500',
  'bg-cyan-500',
  'bg-orange-500',
];

export default function ReviewsSection({ lang, dict }: ReviewsSectionProps) {
  const { overall, featured } = reviewsData;

  return (
    <section className="pt-8 pb-16 md:pt-10 md:pb-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-neutral-900 mb-4">
            {dict.reviews.title}
          </h2>
          <p className="text-lg text-gray-600 flex items-center justify-center gap-2">
            <span className="text-amber-500 text-2xl font-bold">{overall.rating}</span>
            <span className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-amber-500 fill-amber-500"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </span>
            <span className="text-gray-500">({overall.totalReviews}+ {dict.reviews.reviewsText})</span>
          </p>
        </div>

        {/* Review Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featured.map((review, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              {/* Avatar with initials */}
              <div className="flex flex-col items-center mb-4">
                <div className={`w-16 h-16 rounded-full ${avatarColors[index % avatarColors.length]} flex items-center justify-center mb-3`}>
                  <span className="text-white text-xl font-bold">
                    {getInitials(review.name)}
                  </span>
                </div>
                <p className="font-semibold text-neutral-900 text-center">{review.name}</p>
              </div>

              {/* Star Rating */}
              <div className="flex items-center justify-center gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < review.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300 fill-gray-300'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-center text-sm leading-relaxed mb-4">
                {review.text}
              </p>

              {/* Date at bottom */}
              <p className="text-xs text-gray-500 text-center">{review.date}</p>
            </div>
          ))}
        </div>

        {/* View More Link */}
        <div className="text-center">
          <a
            href="https://www.google.com/search?q=Aspava+06+Schiedam"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-300"
          >
            {dict.reviews.viewMore} {dict.reviews.google}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
