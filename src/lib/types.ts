// Core Types for Aspava 06 Restaurant Website

export type LocalizedText = {
  nl: string;
  tr: string;
  en: string;
};

export interface MenuItem {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  price: number;
  currency: string;
  category: string;
  image?: string;
  allergens?: string[];
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
}

export interface MenuCategory {
  id: string;
  name: LocalizedText;
  description?: LocalizedText;
  order: number;
  items: MenuItem[];
}

export interface RestaurantConfig {
  name: string;
  tagline: string;
  description: string;
  location: {
    address: string;
    city: string;
    country: string;
    postalCode: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone: string;
    email: string;
    whatsapp?: string;
  };
  business?: {
    kvk?: string;
    btw?: string;
  };
  social?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    tripadvisor?: string;
    thuisbezorgd?: string;
    googleMaps?: string;
  };
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
      closed?: boolean;
    };
  };
  logo: {
    main: string;
    light?: string;
    dark?: string;
    favicon?: string;
    og?: string;
  };
  images?: {
    hero?: string;
    interior?: string;
    food?: string;
  };
  features: string[];
  cuisine: string[];
  certifications?: {
    halal?: boolean;
    organic?: boolean;
  };
}

export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  textLight: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

export interface BrandTypography {
  fontFamily: {
    heading: string;
    body: string;
    accent: string;
  };
  fontSize: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

export interface BrandConfig {
  colors: BrandColors;
  typography: BrandTypography;
  spacing: {
    section: string;
    container: string;
    card: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export interface LegalText {
  title: string;
  lastUpdated: string;
  content: string;
}

export interface LegalTexts {
  privacy: LegalText;
  terms: LegalText;
  cookies: LegalText;
}
