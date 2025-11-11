# Aspava 06 Restaurant Website

Multi-language restaurant website built with Next.js 16, React 19, and Tailwind CSS v4.

## 🚀 Production Deploy Checklist

### Pre-Deployment (Complete these before going live)

- [x] TypeScript build error fixed (layout.tsx params type)
- [x] Footer contact information displays correctly
- [ ] **KVK / BTW real numbers updated** in `src/data/restaurantConfig.ts`
- [x] robots.txt added to `/public`
- [x] sitemap.ts added for SEO
- [ ] **Run `npm run build` successfully** (no errors)
- [ ] Test all pages in production build (`npm run build && npm start`)

### Deployment Steps

- [ ] Deploy to Vercel (or preferred hosting platform)
- [ ] Custom domain configured (www.aspava06.nl)
- [ ] SSL certificate active (automatic with Vercel)
- [ ] DNS records configured:
  - A record pointing to hosting
  - CNAME for www subdomain
- [ ] Test all language variants (nl, tr, en)
- [ ] Verify sitemap.xml accessible at `/sitemap.xml`
- [ ] Verify robots.txt accessible at `/robots.txt`

### Post-Deployment

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Add Google Analytics (optional)
- [ ] Update Instagram/Facebook links with website URL
- [ ] Update WhatsApp Business profile with website
- [ ] Update Google My Business listing
- [ ] Test on mobile devices
- [ ] Test on different browsers

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.1 (App Router)
- **React**: 19.2.0
- **TypeScript**: 5.x (Strict mode)
- **Styling**: Tailwind CSS v4
- **Fonts**: Playfair Display, Inter, Montserrat
- **i18n**: Custom middleware-based routing (nl, tr, en)

## 📁 Project Structure

```
src/
├── app/
│   ├── [lang]/              # Multi-language routes
│   │   ├── layout.tsx       # Main layout with i18n
│   │   ├── page.tsx         # Homepage
│   │   ├── menu/            # Menu page
│   │   └── (legal)/         # Legal pages (privacy, terms, cookies)
│   ├── sitemap.ts           # Dynamic sitemap generation
│   └── globals.css          # Global styles
├── components/              # React components (12 components)
├── data/
│   ├── menuData.ts          # 66 menu items, 11 categories
│   ├── restaurantConfig.ts  # Business information
│   ├── reviewsData.ts       # Customer reviews
│   ├── brandConfig.ts       # Design tokens
│   └── locales/             # Translations (nl, tr, en)
├── i18n/
│   ├── config.ts            # Language configuration
│   └── get-dictionary.ts    # Dictionary loader
└── lib/
    └── types.ts             # TypeScript type definitions
```

## 🌐 Features

- ✅ Multi-language support (Dutch, Turkish, English)
- ✅ 66 menu items with allergen information
- ✅ SEO optimized (meta tags, OpenGraph, structured data)
- ✅ Mobile responsive design
- ✅ WhatsApp ordering integration
- ✅ Google Maps integration
- ✅ Customer reviews section
- ✅ Legal pages (Privacy, Terms, Cookies)
- ✅ Image optimization with fallback system
- ✅ Type-safe translations

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd aspava06-restaurant

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 📝 Configuration

### Restaurant Information

Update business details in `src/data/restaurantConfig.ts`:

```typescript
export const restaurantConfig = {
  name: 'Aspava 06',
  location: {
    address: 'Broersveld 113B',
    postalCode: '3111 LE',
    city: 'Schiedam',
    // ...
  },
  contact: {
    phone: '+31 6 43653765',
    email: 'info@aspava06.nl',
    whatsapp: '31643653765',
  },
  business: {
    kvk: 'TODO-REAL-KVK-NUMBER',  // Update before production!
    btw: 'TODO-REAL-BTW-NUMBER',  // Update before production!
  },
  // ...
};
```

### Menu Items

Edit menu in `src/data/menuData.ts`:

```typescript
export const menuData: MenuCategory[] = [
  {
    id: 'pides',
    name: { nl: "Pide's", tr: 'Pideler', en: "Pide's" },
    items: [
      {
        id: 'pide-kiyma',
        name: { nl: 'Kıymalı Pide', tr: 'Kıymalı Pide', en: 'Minced Meat Pide' },
        price: 8.50,
        allergens: ['gluten', 'dairy'],
        // ...
      },
    ],
  },
];
```

### Translations

Update translations in `src/data/locales/`:
- `nl.ts` - Dutch (base language)
- `tr.ts` - Turkish
- `en.ts` - English

All translations are type-safe. If you add a key to `nl.ts`, TypeScript will require the same key in `tr.ts` and `en.ts`.

## 🎨 Customization

### Brand Colors

Edit `src/data/brandConfig.ts` to change colors, typography, and spacing.

### Images

Place images in `public/images/`:
- `/images/logo-256.png` - Logo (256x256)
- `/images/logo-512.png` - Logo (512x512)
- `/images/aspava-interior.jpg` - Restaurant interior
- `/images/menu/*.jpg` - Menu item images

## 📊 SEO

- Meta tags configured per language
- OpenGraph tags for social sharing
- Structured data (JSON-LD) for rich snippets
- Dynamic sitemap at `/sitemap.xml`
- Robots.txt at `/robots.txt`
- Alternate language links (hreflang)

## 🐛 Known Issues & Fixes

### Issue: TypeScript build error
**Fixed**: Updated `layout.tsx` params type to `Promise<{ lang: string }>` for Next.js 16 compatibility.

### Issue: Footer not showing contact info
**Fixed**: Updated property access from `restaurantConfig.phone` to `restaurantConfig.contact.phone`.

### Issue: Missing sitemap
**Fixed**: Added `src/app/sitemap.ts` for dynamic sitemap generation.

## 📄 License

This project is private and proprietary.

## 🤝 Support

For support, email info@aspava06.nl or contact via WhatsApp: +31 6 43653765

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
