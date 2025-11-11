'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Locale } from '@/i18n/config';
import type { Translations } from '@/data/locales/nl';

interface GallerySectionProps {
  lang: Locale;
  dict: Translations;
}

export default function GallerySection({ lang, dict }: GallerySectionProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {/* Sol dikey fotoğraf */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="col-span-2 md:col-span-1 row-span-2 relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
        >
          <div className="relative w-full aspect-[3/5]">
            <Image
              src="/images/restaurant/int1.jpg"
              alt="Aspava 06 Restaurant"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-white text-base font-semibold drop-shadow-lg">
                  {dict.about.galleryCaption1}
                </p>
              </div>
            </div>

            {/* Badge - Moved from right top image */}
            <div className="absolute bottom-4 left-4 bg-emerald-500 text-white px-4 py-3 rounded-xl shadow-lg backdrop-blur-sm">
              <p className="font-bold text-sm">⭐ Authentiek Turks</p>
              <p className="text-xs text-emerald-100">Traditionele recepten</p>
            </div>
          </div>
        </motion.div>

        {/* Sağ üst */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="col-span-1 relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
        >
          <div className="relative w-full aspect-[4/3]">
            <Image
              src="/images/restaurant/int2.jpg"
              alt="Restaurant Interior"
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-white text-base font-semibold drop-shadow-lg">
                  {dict.about.galleryCaption2}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sağ alt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="col-span-1 relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
        >
          <div className="relative w-full aspect-[4/3]">
            <Image
              src="/images/restaurant/int3.jpg"
              alt="Turkish Cuisine Details"
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-white text-base font-semibold drop-shadow-lg">
                  {dict.about.galleryCaption3}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
  );
}
