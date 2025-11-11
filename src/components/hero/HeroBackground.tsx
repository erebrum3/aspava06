'use client';

import { useState } from 'react';
import Image from 'next/image';

export const HeroBackground = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="absolute inset-0">
      {/* Background Image */}
      <Image
        src={imgError ? "/images/logo-256.png" : "/images/hero2.jpg"}
        alt="Aspava 06 Restaurant"
        fill
        className="object-cover"
        quality={85}
        priority
        onError={() => setImgError(true)}
      />

      {/* Gradient Overlay - Enhanced contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/70 to-black/75" />

      {/* Olive Branch Watermark - Bottom right corner */}
      <div className="absolute bottom-8 right-8 opacity-8 pointer-events-none hidden md:block">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M60 20C45 30 40 50 45 70C50 90 65 100 75 105M60 20C75 30 80 50 75 70C70 90 55 100 45 105"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <ellipse cx="45" cy="40" rx="4" ry="6" fill="white" opacity="0.6" />
          <ellipse cx="55" cy="45" rx="4" ry="6" fill="white" opacity="0.6" />
          <ellipse cx="65" cy="40" rx="4" ry="6" fill="white" opacity="0.6" />
          <ellipse cx="75" cy="45" rx="4" ry="6" fill="white" opacity="0.6" />
          <ellipse cx="50" cy="60" rx="4" ry="6" fill="white" opacity="0.6" />
          <ellipse cx="70" cy="60" rx="4" ry="6" fill="white" opacity="0.6" />
        </svg>
      </div>
    </div>
  );
};
