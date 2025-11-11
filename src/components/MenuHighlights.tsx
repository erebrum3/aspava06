'use client';

import { useState } from 'react';
import { menuData } from '@/data/menuData';
import MenuItemCard from './MenuItemCard';
import Link from 'next/link';
import type { Locale } from '@/i18n/config';
import type { Translations } from '@/data/locales/nl';

interface MenuHighlightsProps {
  lang: Locale;
  dict: Translations;
}

// Category filter configuration
const categoryFilters = [
  { id: 'alle', label: { nl: 'Alle', tr: 'Hepsi', en: 'All' } },
  { id: 'pides', label: { nl: 'Pide', tr: 'Pide', en: 'Pide' } },
  { id: 'kapsalon', label: { nl: 'Kapsalon', tr: 'Kapsalon', en: 'Kapsalon' } },
  { id: 'durum', label: { nl: 'Dürüm', tr: 'Dürüm', en: 'Wrap' } },
  { id: 'schotels', label: { nl: 'Schotels', tr: 'Tabaklar', en: 'Plates' } },
  { id: 'snacks', label: { nl: 'Snacks', tr: 'Atıştırmalıklar', en: 'Snacks' } },
];

export default function MenuHighlights({ lang, dict }: MenuHighlightsProps) {
  const [activeFilter, setActiveFilter] = useState('alle');

  // Filter menu items based on active filter
  const getFilteredItems = () => {
    if (activeFilter === 'alle') {
      // Show first 9 items from all categories
      return menuData
        .flatMap(category => category.items)
        .slice(0, 9);
    }

    // Show items from selected category
    const category = menuData.find(cat => cat.id === activeFilter);
    return category ? category.items.slice(0, 9) : [];
  };

  const filteredItems = getFilteredItems();

  return (
    <section id="menu" className="pt-8 pb-16 md:pt-10 md:pb-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-neutral-900 mb-4">
            {dict.menu.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {dict.menu.subtitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categoryFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {filter.label[lang]}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              lang={lang}
              dict={dict}
              showRecommended={activeFilter === 'alle'}
            />
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Link
            href={`/${lang}/menu`}
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            {dict.menu.viewAll}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
