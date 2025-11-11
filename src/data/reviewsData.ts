export interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
  source: 'Google' | 'Thuisbezorgd';
}

export interface ReviewsOverall {
  rating: number;
  totalReviews: number;
  google: number;
  thuisbezorgd: number;
}

export interface ReviewsData {
  overall: ReviewsOverall;
  featured: Review[];
}

export const reviewsData: ReviewsData = {
  overall: {
    rating: 4.9,
    totalReviews: 100,
    google: 4.9,
    thuisbezorgd: 4.6,
  },
  featured: [
    {
      name: 'Sarah M.',
      rating: 5,
      date: '2 weken geleden',
      text: 'Heerlijke authentieke Turkse gerechten! De pide is perfect gebakken en het vlees is altijd mals. Vriendelijke bediening ook!',
      source: 'Google',
    },
    {
      name: 'Ahmed K.',
      rating: 5,
      date: '3 weken geleden',
      text: 'Beste kapsalon in Schiedam! Grote porties en altijd vers. 100% halal ook, wat belangrijk voor mij is.',
      source: 'Thuisbezorgd',
    },
    {
      name: 'Lisa van der Berg',
      rating: 5,
      date: '1 maand geleden',
      text: 'Snelle levering en eten was nog warm. De shoarma schotel is echt een aanrader. Wij bestellen hier vaak!',
      source: 'Thuisbezorgd',
    },
    {
      name: 'Mehmet Y.',
      rating: 5,
      date: '1 maand geleden',
      text: 'Eindelijk een restaurant die echte Turkse smaak serveert! Reminds me of home. Kuşbaşı pide is fantastisch.',
      source: 'Google',
    },
  ],
};
