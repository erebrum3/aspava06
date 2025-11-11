'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import type { Translations } from '@/data/locales/nl';

interface OrangeWallProps {
  dict: Translations;
}

export default function OrangeWall({ dict }: OrangeWallProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Görünürlük (scroll ilerledikçe 1 → 0.2 arası)
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section
      ref={ref}
      className="relative h-[50vh]"
      aria-label="Otantik atmosfer duvar bölümü"
    >
      {/* Sabit arka plan */}
      <motion.div
        style={{
          backgroundImage: "url('/images/wall-orange.jpg')",
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.8)',
          opacity,
        }}
        className="absolute inset-0"
      />

      {/* Üstüne hafif overlay */}
      <div className="absolute inset-0 bg-black/30" />
    </section>
  );
}
