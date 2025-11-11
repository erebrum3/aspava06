'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { Locale } from '@/i18n/config';
import type { Translations } from '@/data/locales/nl';
import { HeroBackground } from './hero/HeroBackground';
import { TrustTrinity } from './hero/TrustTrinity';
import { CTAGroup } from './hero/CTAGroup';

interface HeroSectionProps {
  lang: Locale;
  dict: Translations;
}

export default function HeroSection({ lang, dict }: HeroSectionProps) {
  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Layer */}
      <HeroBackground />

      {/* Olive Frame - Center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-0 flex items-center justify-center z-[3] pointer-events-none"
      >
        <div className="relative w-[900px] h-[900px]">
          <Image
            src="/images/olive/olive-frame.png"
            alt=""
            fill
            className="object-contain"
            quality={100}
          />
        </div>
      </motion.div>

      {/* Olive Branch - Top (Navbar'ın hemen altı) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 0.12, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-[5] pointer-events-none"
      >
        <svg
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-24 h-24 md:w-28 md:h-28"
          style={{ filter: 'invert(1) brightness(1.5)' }}
        >
          <path
            d="M48 16C38 24 32 40 36 56C40 72 52 80 60 84M48 16C58 24 64 40 60 56C56 72 44 80 36 84"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-white"
          />
          <ellipse cx="36" cy="32" rx="5" ry="7" fill="currentColor" className="text-white" opacity="0.6" />
          <ellipse cx="48" cy="36" rx="5" ry="7" fill="currentColor" className="text-white" opacity="0.6" />
          <ellipse cx="60" cy="32" rx="5" ry="7" fill="currentColor" className="text-white" opacity="0.6" />
          <ellipse cx="40" cy="48" rx="5" ry="7" fill="currentColor" className="text-white" opacity="0.6" />
          <ellipse cx="56" cy="48" rx="5" ry="7" fill="currentColor" className="text-white" opacity="0.6" />
        </svg>
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-7xl mx-auto">

        {/* Trust Badges - Subtle Glassmorphism */}
        <TrustTrinity />

        {/* Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 max-w-4xl mx-auto"
        >
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-3 leading-tight">
            <span className="text-white drop-shadow-lg">{dict.hero.headline1}</span>
          </h1>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-medium leading-tight mt-3">
            <span className="text-emerald-400 drop-shadow-lg">{dict.hero.headline2}</span>
          </h2>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base md:text-lg text-slate-200 mt-6 max-w-2xl mx-auto"
          >
            {dict.hero.tagline}
          </motion.p>
        </motion.div>

        {/* CTA Group */}
        <div className="mt-10">
          <CTAGroup lang={lang} dict={dict} />
        </div>

        {/* Urgency Signal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mt-8"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
          </span>
          <svg className="w-4 h-4 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-white font-medium">{dict.hero.openToday}</span>
        </motion.div>

        {/* Olive Branch - Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.12, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        >
          <div className="flex items-center gap-6">
            {/* Left line */}
            <div className="w-20 md:w-28 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

            {/* Olive branch icon - rotated */}
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10 md:w-12 md:h-12"
              style={{ filter: 'invert(1) brightness(1.5)', transform: 'rotate(180deg)' }}
            >
              <path
                d="M20 7C16 10 14 16 16 23C18 30 22 33 25 35M20 7C24 10 26 16 24 23C22 30 18 33 15 35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="text-white"
              />
              <ellipse cx="16" cy="13" rx="2" ry="3" fill="currentColor" className="text-white" opacity="0.6" />
              <ellipse cx="20" cy="15" rx="2" ry="3" fill="currentColor" className="text-white" opacity="0.6" />
              <ellipse cx="24" cy="13" rx="2" ry="3" fill="currentColor" className="text-white" opacity="0.6" />
              <ellipse cx="17" cy="20" rx="2" ry="3" fill="currentColor" className="text-white" opacity="0.6" />
              <ellipse cx="23" cy="20" rx="2" ry="3" fill="currentColor" className="text-white" opacity="0.6" />
            </svg>

            {/* Right line */}
            <div className="w-20 md:w-28 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          </div>
        </motion.div>

      </div>

      {/* Emerald Gradient Line - Hero Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-90"></div>
    </section>
  );
}
