'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const photos = [
  {
    id: 1,
    src: '/images/restaurant/int1.jpg',
    alt: 'Aspava 06 Restaurant Interior',
    size: 'large',
    badge: null,
  },
  {
    id: 2,
    src: '/images/restaurant/int2.jpg',
    alt: 'Restaurant Interior',
    size: 'small',
    badge: {
      text: '⭐ Authentiek Turks',
      subtext: 'Traditionele recepten',
    },
  },
  {
    id: 3,
    src: '/images/restaurant/int3.jpg',
    alt: 'Turkish Cuisine Details',
    size: 'small',
    badge: null,
  },
];

export const RestaurantGallery = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
      {/* Desktop: Bento Grid */}
      <div className="hidden md:grid md:grid-cols-3 md:grid-rows-2 gap-4 h-[600px]">
        {/* Large Photo - Left (2x2) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group h-full"
        >
          <Image
            src={photos[0].src}
            alt={photos[0].alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 66vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>

        {/* Small Photo 1 - Top Right */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group h-full"
        >
          <Image
            src={photos[1].src}
            alt={photos[1].alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badge */}
          {photos[1].badge && (
            <div className="absolute bottom-4 left-4 bg-emerald-500 text-white px-4 py-3 rounded-xl shadow-lg backdrop-blur-sm">
              <p className="font-bold text-sm md:text-base">{photos[1].badge.text}</p>
              <p className="text-xs text-emerald-100">{photos[1].badge.subtext}</p>
            </div>
          )}
        </motion.div>

        {/* Small Photo 2 - Bottom Right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group h-full"
        >
          <Image
            src={photos[2].src}
            alt={photos[2].alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      </div>

      {/* Mobile: Stack */}
      <div className="md:hidden flex flex-col gap-4">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative h-64 rounded-2xl overflow-hidden shadow-lg group"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            {photo.badge && (
              <div className="absolute bottom-4 left-4 bg-emerald-500 text-white px-4 py-3 rounded-xl shadow-lg backdrop-blur-sm">
                <p className="font-bold text-sm">{photo.badge.text}</p>
                <p className="text-xs text-emerald-100">{photo.badge.subtext}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
