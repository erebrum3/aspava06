export interface RestaurantData {
  name: string;
  location: string;
  whatsappNumber: string;
  rating: number;
  reviewCount: number;
  established: number;
  cuisine: string;
  openUntil: string;
  isOpen: boolean;
  certifications: string[];
  businessType: string;
}

export interface HeroProps {
  restaurant: RestaurantData;
  backgroundImage?: string;
  className?: string;
}

export interface TrustTrinityProps {
  certifications: string[];
  businessType: string;
  established: number;
  rating: number;
  reviewCount: number;
}

export interface CTAGroupProps {
  whatsappNumber: string;
  restaurantName: string;
  menuHref?: string;
}

export interface UrgencySignalProps {
  isOpen: boolean;
  openUntil: string;
  className?: string;
}

export interface HeroBackgroundProps {
  imageSrc?: string;
  alt: string;
  className?: string;
}
