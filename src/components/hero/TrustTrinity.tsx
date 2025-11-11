'use client';

import { motion } from 'framer-motion';

interface Badge {
  icon: string;
  text: string;
}

const badges: Badge[] = [
  {
    icon: '✓',
    text: '100% Halal',
  },
  {
    icon: '👨‍👩‍👧‍👦',
    text: 'Familie',
  },
  {
    icon: '⭐',
    text: '4.9',
  },
];

export const TrustTrinity = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex flex-wrap items-center justify-center gap-3 mb-8"
    >
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-transform duration-200"
        >
          <span className="text-sm">{badge.icon}</span>
          <span className="text-sm font-semibold">{badge.text}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};
