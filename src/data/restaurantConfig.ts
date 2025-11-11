import { RestaurantConfig } from '@/lib/types';

export const restaurantConfig: RestaurantConfig = {
  name: 'Aspava 06',
  tagline: 'Authentic Turkish Cuisine in the Heart of Schiedam',
  description: 'Experience the rich flavors of traditional Turkish cuisine at Aspava 06. Our family-owned restaurant brings generations of culinary expertise to Schiedam, serving authentic dishes made with love and the finest ingredients.',

  location: {
    address: 'Broersveld 113B',
    city: 'Schiedam',
    country: 'Netherlands',
    postalCode: '3111 LE',
    coordinates: {
      lat: 51.9175,
      lng: 4.3900,
    },
  },

  contact: {
    phone: '+31 6 43653765',
    email: 'info@aspava06.nl',
    whatsapp: '31643653765',
  },

  business: {
    kvk: 'TODO-REAL-KVK-NUMBER', // PRODUCTION: Replace with actual KVK number
    btw: 'TODO-REAL-BTW-NUMBER', // PRODUCTION: Replace with actual BTW/VAT number
  },

  social: {
    instagram: 'https://instagram.com/aspava_06',
    thuisbezorgd: 'https://www.thuisbezorgd.nl/aspava-06-schiedam',
    googleMaps: 'https://maps.google.com/?q=Broersveld+113B,+3111+LE+Schiedam,+Netherlands',
  },

  openingHours: {
    monday: {
      open: '11:00',
      close: '22:00',
    },
    tuesday: {
      open: '11:00',
      close: '22:00',
    },
    wednesday: {
      open: '11:00',
      close: '22:00',
    },
    thursday: {
      open: '11:00',
      close: '22:00',
    },
    friday: {
      open: '11:00',
      close: '22:00',
    },
    saturday: {
      open: '11:00',
      close: '22:00',
    },
    sunday: {
      open: '12:00',
      close: '22:00',
    },
  },

  logo: {
    main: '/images/logo-256.png',
    favicon: '/favicon.ico',
    og: '/images/logo-og.png',
  },

  images: {
    hero: '/images/aspava-exterior.jpg',
    interior: '/images/aspava-interior.jpg',
    food: '/images/aspava-food.jpg',
  },

  features: [
    'Authentic Turkish Recipes',
    'Fresh Daily Ingredients',
    'Halal Certified',
    'Vegetarian Options',
    'Family Friendly',
    'Takeaway Available',
    'Catering Services',
    'Private Events',
  ],

  cuisine: [
    'Turkish',
    'Mediterranean',
    'Middle Eastern',
    'Halal',
  ],

  certifications: {
    halal: true,
  },
};
