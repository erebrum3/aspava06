'use client';

import { reviewsData } from '@/data/reviewsData';
import type { Locale } from '@/i18n/config';
import type { Translations } from '@/data/locales/nl';

interface TrustBadgeProps {
  variant?: 'default' | 'compact' | 'large';
  showReviews?: boolean;
  className?: string;
  lang: Locale;
  dict: Translations;
}

export default function TrustBadge({
  variant = 'default',
  showReviews = true,
  className = '',
  dict
}: TrustBadgeProps) {
  const { overall } = reviewsData;

  // Calculate star display
  const fullStars = Math.floor(overall.rating); // 4
  const partialStar = overall.rating % 1; // 0.9
  const emptyStars = 5 - Math.ceil(overall.rating); // 0

  // Variant styles
  const variantStyles = {
    compact: {
      container: 'text-sm gap-1',
      star: 'w-4 h-4',
      rating: 'text-sm',
    },
    default: {
      container: 'text-base gap-2',
      star: 'w-5 h-5',
      rating: 'text-base',
    },
    large: {
      container: 'text-lg gap-3',
      star: 'w-6 h-6',
      rating: 'text-lg',
    },
  };

  const styles = variantStyles[variant];

  return (
    <div className={`inline-flex items-center ${styles.container} ${className}`}>
      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {/* Full stars */}
        {Array.from({ length: fullStars }, (_, i) => (
          <svg
            key={`full-${i}`}
            className={`${styles.star} text-aspava-gold transition-all duration-300 hover:scale-125 hover:rotate-12 cursor-pointer`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}

        {/* Partial star */}
        {partialStar > 0 && (
          <svg
            className={`${styles.star} transition-all duration-300 hover:scale-125 hover:rotate-12 cursor-pointer`}
            viewBox="0 0 20 20"
          >
            <defs>
              <linearGradient id={`partialStarGradient-${variant}`}>
                <stop offset={`${partialStar * 100}%`} stopColor="#D4AF37" />
                <stop offset={`${partialStar * 100}%`} stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#partialStarGradient-${variant})`}
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        )}

        {/* Empty stars */}
        {Array.from({ length: emptyStars }, (_, i) => (
          <svg
            key={`empty-${i}`}
            className={`${styles.star} text-gray-300 transition-all duration-300 hover:scale-125 hover:rotate-12 hover:text-aspava-gold cursor-pointer`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Rating */}
      <span className={`font-semibold ${styles.rating}`}>
        {overall.rating}/5
      </span>

      {/* Reviews Count */}
      {showReviews && (
        <>
          <span className="text-gray-400">|</span>
          <span className={`text-gray-600 ${styles.rating}`}>
            {overall.totalReviews} {dict.reviews.reviewsText}
          </span>
        </>
      )}
    </div>
  );
}
