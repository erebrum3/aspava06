import type { Locale } from './config';
import { nl } from '@/data/locales/nl';
import { tr } from '@/data/locales/tr';
import { en } from '@/data/locales/en';

const dictionaries = {
  nl,
  tr,
  en,
};

export const getDictionary = (locale: Locale) => {
  return dictionaries[locale] || dictionaries.nl;
};
