'use client';

import Image from 'next/image';
import { restaurantConfig } from '@/data/restaurantConfig';
import { MenuItem } from '@/lib/types';
import type { Locale } from '@/i18n/config';
import type { Translations } from '@/data/locales/nl';

interface MenuItemCardProps {
  item: MenuItem;
  lang: Locale;
  dict: Translations;
  showRecommended?: boolean;
}

export default function MenuItemCard({
  item,
  lang,
  dict,
  showRecommended = false
}: MenuItemCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 overflow-hidden group border border-gray-100">
      {/* Item Image */}
      <div className="relative h-56 bg-gradient-to-br from-emerald-100 to-cyan-100 overflow-hidden">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name[lang]}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-20 h-20 text-emerald-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {showRecommended && item.isPopular && (
            <span className="px-3 py-1.5 bg-amber-500 text-white text-xs font-bold rounded-full shadow-lg">
              ⭐ {dict.menu.recommended}
            </span>
          )}
          {item.isVegetarian && (
            <span className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
              {dict.menu.vegetarian}
            </span>
          )}
          {item.isSpicy && (
            <span className="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
              🌶️ {dict.menu.spicy}
            </span>
          )}
        </div>

        {/* Halal badge in bottom left */}
        {restaurantConfig.certifications?.halal && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
              ✓ {dict.menu.halal}
            </span>
          </div>
        )}
      </div>

      {/* Item Details */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-heading text-lg font-bold text-neutral-900 flex-1">
            {item.name[lang]}
          </h3>
          <span className="bg-emerald-50 px-3 py-1.5 rounded-lg text-emerald-700 font-extrabold text-xl whitespace-nowrap ml-3 shadow-sm">
            {item.currency}{item.price.toFixed(2)}
          </span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {item.description[lang]}
        </p>

        {/* Allergens */}
        {item.allergens && item.allergens.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-gray-100">
            {item.allergens.map((allergen) => (
              <span
                key={allergen}
                className="bg-gray-50 text-gray-600 text-[11px] px-2.5 py-1 rounded-full font-medium"
              >
                {dict.allergens[allergen as keyof typeof dict.allergens] || allergen}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
