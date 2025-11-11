'use client';
import type { Locale } from '@/i18n/config';
import type { Translations } from '@/data/locales/nl';
import GallerySection from './GallerySection';

interface AboutSectionProps {
  lang: Locale;
  dict: Translations;
}

export default function AboutSection({ lang, dict }: AboutSectionProps) {
  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      title: dict.about.feature1,
      description: '100% gecertificeerd halal vlees',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      borderColor: 'border-emerald-200',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: dict.about.feature2,
      description: 'Familiebedrijf sinds oprichting',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      borderColor: 'border-blue-200',
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: dict.about.feature3,
      description: 'Dagelijks vers bereid',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      borderColor: 'border-amber-200',
    },
  ];

  return (
    <section className="pt-8 pb-16 md:pt-10 md:pb-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-neutral-900 mb-4">
            {dict.about.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {dict.about.description}
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.bgColor} ${feature.borderColor} border-2 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${feature.iconColor} bg-white shadow-lg mb-6`}>
                {feature.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-neutral-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Restaurant Gallery - Vertical + Horizontal Grid */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
              {dict.about.galleryTitle}
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              {dict.about.gallerySubtitle}
            </p>
          </div>
          <GallerySection lang={lang} dict={dict} />
        </div>
      </div>
    </section>
  );
}
