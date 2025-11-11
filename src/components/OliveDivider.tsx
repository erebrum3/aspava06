'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface OliveDividerProps {
  variant?: 1 | 2 | 3;
  className?: string;
  animate?: boolean;
}

export default function OliveDivider({
  variant = 1,
  className = '',
  animate = true
}: OliveDividerProps) {
  const dividerContent = (
    <div className={`flex justify-center items-center ${className}`}>
      {/* Olive branch image from /images/olive/ folder */}
      <div className="relative w-full max-w-[90%] md:max-w-[85%] lg:max-w-[80%] h-20 md:h-24 lg:h-28">
        <Image
          src={`/images/olive/olive${variant}.png`}
          alt="Olive branch divider"
          fill
          className="object-contain opacity-80"
          priority={false}
        />
      </div>
    </div>
  );

  if (!animate) {
    return dividerContent;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {dividerContent}
    </motion.div>
  );
}
