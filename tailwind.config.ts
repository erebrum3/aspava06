import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'aspava-red': '#DC2626',
        'aspava-dark': '#1F2937',
        'aspava-gold': '#D4AF37',
        'aspava-cream': '#FAFAF9',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Montserrat', 'sans-serif'],
      },
      opacity: {
        '8': '0.08',
        '85': '0.85',
      },
      boxShadow: {
        'emerald-glow': '0 0 20px rgba(16, 185, 129, 0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
