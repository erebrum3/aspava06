import { MenuCategory } from '@/lib/types';

export const menuData: MenuCategory[] = [
  {
    id: 'pides',
    name: {
      nl: "Pide's (100% Halal)",
      tr: "Pideler (100% Helal)",
      en: "Pides (100% Halal)"
    },
    description: {
      nl: 'Turkse pides vers gebakken in onze traditionele steenoven',
      tr: 'Geleneksel taş fırında taze pişirilmiş Türk pideleri',
      en: 'Turkish flatbreads baked fresh in our traditional stone oven'
    },
    order: 1,
    items: [
      {
        id: 'peynirli-pide',
        name: {
          nl: 'Kaas pide',
          tr: 'Peynirli pide',
          en: 'Cheese pide'
        },
        description: {
          nl: 'Turkse pide met kaas',
          tr: 'Peynirli Türk pidesi',
          en: 'Turkish flatbread with cheese'
        },
        price: 9.00,
        currency: '€',
        category: 'pides',
        image: '/images/menu/nl_10511503_aspava06_food_sebzeli_pide_1x1.png',
        allergens: ['gluten', 'dairy'],
        isVegetarian: true,
      },
      {
        id: 'sebzeli-pide',
        name: {
          nl: 'Groente pide',
          tr: 'Sebzeli pide',
          en: 'Vegetable pide'
        },
        description: {
          nl: 'Turkse pide met verse groenten',
          tr: 'Taze sebzeli Türk pidesi',
          en: 'Turkish flatbread with fresh vegetables'
        },
        price: 9.00,
        currency: '€',
        category: 'pides',
        image: '/images/menu/nl_10511503_aspava06_food_sebzeli_pide_1x1.png',
        allergens: ['gluten'],
        isVegetarian: true,
      },
      {
        id: 'sucuklu-pide',
        name: {
          nl: 'Sucuk pide',
          tr: 'Sucuklu pide',
          en: 'Spicy sausage pide'
        },
        description: {
          nl: 'Turkse pide met pikante worst',
          tr: 'Sucuklu Türk pidesi',
          en: 'Turkish flatbread with spicy sausage'
        },
        price: 10.00,
        currency: '€',
        category: 'pides',
        image: '/images/menu/mss_sucuklu-pide_zkf.png',
        allergens: ['gluten'],
        isSpicy: true,
      },
      {
        id: 'etli-ekmek-pide',
        name: {
          nl: 'Gehakt pide',
          tr: 'Etli ekmek pide',
          en: 'Minced meat pide'
        },
        description: {
          nl: 'Turkse pide met gehakt',
          tr: 'Kıymalı Türk pidesi',
          en: 'Turkish flatbread with minced meat'
        },
        price: 12.50,
        currency: '€',
        category: 'pides',
        image: '/images/menu/nl_10511503_aspava06_food_etli_ekmek_pide_1x1.png',
        allergens: ['gluten'],
      },
      {
        id: 'kusbasi-pide',
        name: {
          nl: 'Blokjes lam pide',
          tr: 'Kuşbaşı pide',
          en: 'Diced lamb pide'
        },
        description: {
          nl: 'Turkse pide met blokjes lam',
          tr: 'Kuşbaşı etli Türk pidesi',
          en: 'Turkish flatbread with diced lamb'
        },
        price: 14.50,
        currency: '€',
        category: 'pides',
        image: '/images/menu/nl_10511503_aspava06_food_kusbasi_pide_1x1.png',
        allergens: ['gluten'],
        isPopular: true,
      },
      {
        id: 'mevlana-pide',
        name: {
          nl: 'Speciale mix pide',
          tr: 'Mevlana pide',
          en: 'Special mix pide'
        },
        description: {
          nl: 'Turkse pide met speciale mix',
          tr: 'Özel karışım Türk pidesi',
          en: 'Turkish flatbread with special mix'
        },
        price: 13.50,
        currency: '€',
        category: 'pides',
        image: '/images/menu/nl_10511503_aspava06_food_mevlana_pide_1x1.png',
        allergens: ['gluten'],
      },
      {
        id: 'aspava-special-pide',
        name: {
          nl: 'Aspava special pide',
          tr: 'Aspava özel pide',
          en: 'Aspava special pide'
        },
        description: {
          nl: 'Huisspecialiteit Turkse pide',
          tr: 'Ev özel Türk pidesi',
          en: 'House special Turkish flatbread'
        },
        price: 14.00,
        currency: '€',
        category: 'pides',
        image: '/images/menu/nl_10511503_aspava06_food_turkse_pizza_salade_1x1.png',
        allergens: ['gluten'],
        isPopular: true,
      },
    ],
  },
  {
    id: 'kapsalon',
    name: {
      nl: 'Kapsalon (100% Halal)',
      tr: 'Kapsalon (100% Helal)',
      en: 'Kapsalon (100% Halal)'
    },
    description: {
      nl: 'Hollands-Turkse fusie: friet met vlees, kaas, verse salade en saus',
      tr: 'Hollanda-Türk füzyonu: patates, et, peynir, taze salata ve sos',
      en: 'Dutch-Turkish fusion: fries with meat, cheese, fresh salad and sauce'
    },
    order: 2,
    items: [
      {
        id: 'kapsalon-kipdoner-groot',
        name: {
          nl: 'Kapsalon kipdöner groot',
          tr: 'Tavuk döner kapsalon büyük',
          en: 'Large chicken döner kapsalon'
        },
        description: {
          nl: 'Grote kipshoarma kapsalon met friet, salade en saus',
          tr: 'Büyük tavuk döner kapsalon patates, salata ve sosla',
          en: 'Large chicken döner with fries, salad and sauce'
        },
        price: 10.00,
        currency: '€',
        category: 'kapsalon',
        image: '/images/menu/nl_10511503_aspava06_food_kapsalon_kipdoner_groot_1x1.png',
        allergens: ['gluten', 'dairy'],
        isPopular: true,
      },
      {
        id: 'kapsalon-shoarma-groot',
        name: {
          nl: 'Kapsalon shoarma groot',
          tr: 'Şavarma kapsalon büyük',
          en: 'Large shawarma kapsalon'
        },
        description: {
          nl: 'Grote shawarma kapsalon met friet, salade en saus',
          tr: 'Büyük şavarma kapsalon patates, salata ve sosla',
          en: 'Large shawarma with fries, salad and sauce'
        },
        price: 12.00,
        currency: '€',
        category: 'kapsalon',
        image: '/images/menu/nl_10511503_aspava06_food_kapsalon_shoarma_groot_1x1.png',
        allergens: ['gluten', 'dairy'],
        isPopular: true,
      },
      {
        id: 'kapsalon-kipdoner-klein',
        name: {
          nl: 'Kapsalon kipdöner klein',
          tr: 'Tavuk döner kapsalon küçük',
          en: 'Small chicken döner kapsalon'
        },
        description: {
          nl: 'Kleine kipshoarma kapsalon met friet, salade en saus',
          tr: 'Küçük tavuk döner kapsalon patates, salata ve sosla',
          en: 'Small chicken döner with fries, salad and sauce'
        },
        price: 8.00,
        currency: '€',
        category: 'kapsalon',
        image: '/images/menu/nl_10511503_aspava06_food_kapsalon_kipdoner_groot_1x1.png',
        allergens: ['gluten', 'dairy'],
      },
      {
        id: 'kapsalon-shoarma-klein',
        name: {
          nl: 'Kapsalon shoarma klein',
          tr: 'Şavarma kapsalon küçük',
          en: 'Small shawarma kapsalon'
        },
        description: {
          nl: 'Kleine shawarma kapsalon met friet, salade en saus',
          tr: 'Küçük şavarma kapsalon patates, salata ve sosla',
          en: 'Small shawarma with fries, salad and sauce'
        },
        price: 9.00,
        currency: '€',
        category: 'kapsalon',
        image: '/images/menu/nl_10511503_aspava06_food_kapsalon_shoarma_klein_1x1.png',
        allergens: ['gluten', 'dairy'],
      },
      {
        id: 'kapsalon-falafel',
        name: {
          nl: 'Kapsalon falafel',
          tr: 'Falafel kapsalon',
          en: 'Falafel kapsalon'
        },
        description: {
          nl: 'Falafel kapsalon met friet, salade en saus',
          tr: 'Falafel kapsalon patates, salata ve sosla',
          en: 'Falafel with fries, salad and sauce'
        },
        price: 8.50,
        currency: '€',
        category: 'kapsalon',
        image: '/images/menu/nl_10511503_aspava06_food_kapsalon_falafel_1x1.png',
        allergens: ['gluten', 'sesame'],
        isVegetarian: true,
      },
    ],
  },
  {
    id: 'turkse-pizza',
    name: {
      nl: 'Turkse Pizza (100% Halal)',
      tr: 'Türk Pizzası (100% Helal)',
      en: 'Turkish Pizza (100% Halal)'
    },
    description: {
      nl: 'Knapperige Turkse platbrood met verse ingrediënten',
      tr: 'Taze malzemelerle çıtır Türk ekmeği',
      en: 'Crispy Turkish flatbread with fresh ingredients'
    },
    order: 3,
    items: [
      {
        id: 'turkse-pizza-salade',
        name: {
          nl: 'Turkse pizza salade',
          tr: 'Salatalı Türk pizzası',
          en: 'Turkish pizza with salad'
        },
        description: {
          nl: 'Turkse pizza met verse salade',
          tr: 'Taze salatalı Türk pizzası',
          en: 'Turkish pizza with fresh salad'
        },
        price: 4.00,
        currency: '€',
        category: 'turkse-pizza',
        image: '/images/menu/nl_10511503_aspava06_food_turkse_pizza_salade_1x1.png',
        allergens: ['gluten'],
        isVegetarian: true,
      },
      {
        id: 'turkse-pizza-kip',
        name: {
          nl: 'Turkse pizza kip',
          tr: 'Tavuklu Türk pizzası',
          en: 'Turkish pizza with chicken'
        },
        description: {
          nl: 'Turkse pizza met kip',
          tr: 'Tavuklu Türk pizzası',
          en: 'Turkish pizza with chicken'
        },
        price: 8.50,
        currency: '€',
        category: 'turkse-pizza',
        image: '/images/menu/mss_turkse-pizza-kip_rdl.png',
        allergens: ['gluten'],
      },
      {
        id: 'turkse-pizza-shoarma',
        name: {
          nl: 'Turkse pizza shoarma',
          tr: 'Şavarmalı Türk pizzası',
          en: 'Turkish pizza with shawarma'
        },
        description: {
          nl: 'Turkse pizza met shawarma',
          tr: 'Şavarmalı Türk pizzası',
          en: 'Turkish pizza with shawarma'
        },
        price: 12.00,
        currency: '€',
        category: 'turkse-pizza',
        image: '/images/menu/mss_turkse-pizza-shoarma_r6p.png',
        allergens: ['gluten'],
        isPopular: true,
      },
    ],
  },
  {
    id: 'durum',
    name: {
      nl: 'Dürüm (100% Halal)',
      tr: 'Dürüm (100% Helal)',
      en: 'Dürüm Wraps (100% Halal)'
    },
    description: {
      nl: 'Verse wraps gevuld met gegrild vlees en groenten',
      tr: 'Izgara et ve sebzelerle dolu taze dürümler',
      en: 'Fresh wraps filled with grilled meat and vegetables'
    },
    order: 4,
    items: [
      {
        id: 'durum-kip',
        name: {
          nl: 'Dürüm kip',
          tr: 'Tavuk dürüm',
          en: 'Chicken wrap'
        },
        description: {
          nl: 'Wrap met kip',
          tr: 'Tavuklu dürüm',
          en: 'Chicken wrap'
        },
        price: 10.00,
        currency: '€',
        category: 'durum',
        image: '/images/menu/mss_durum-kip_dpo.png',
        allergens: ['gluten'],
      },
      {
        id: 'durum-shoarma',
        name: {
          nl: 'Dürüm shoarma',
          tr: 'Şavarma dürüm',
          en: 'Shawarma wrap'
        },
        description: {
          nl: 'Wrap met shawarma',
          tr: 'Şavarmalı dürüm',
          en: 'Shawarma wrap'
        },
        price: 12.00,
        currency: '€',
        category: 'durum',
        image: '/images/menu/mss_durum-shoarma_lem.png',
        allergens: ['gluten'],
        isPopular: true,
      },
    ],
  },
  {
    id: 'broodjes',
    name: {
      nl: 'Broodjes (100% Halal)',
      tr: 'Sandviçler (100% Helal)',
      en: 'Sandwiches (100% Halal)'
    },
    description: {
      nl: 'Verse broodjes met keuze uit verschillende vullingen',
      tr: 'Çeşitli iç harçlarla taze sandviçler',
      en: 'Fresh sandwiches with your choice of filling'
    },
    order: 5,
    items: [
      {
        id: 'broodje-falafel',
        name: {
          nl: 'Broodje falafel',
          tr: 'Falafel sandviç',
          en: 'Falafel sandwich'
        },
        description: {
          nl: 'Broodje met falafel',
          tr: 'Falafel sandviç',
          en: 'Falafel sandwich'
        },
        price: 7.00,
        currency: '€',
        category: 'broodjes',
        image: '/images/menu/mss_broodje-kip_wlp.png',
        allergens: ['gluten', 'sesame'],
        isVegetarian: true,
      },
      {
        id: 'broodje-kip',
        name: {
          nl: 'Broodje kip',
          tr: 'Tavuk sandviç',
          en: 'Chicken sandwich'
        },
        description: {
          nl: 'Broodje met kip',
          tr: 'Tavuklu sandviç',
          en: 'Chicken sandwich'
        },
        price: 8.00,
        currency: '€',
        category: 'broodjes',
        image: '/images/menu/mss_broodje-kip_wlp.png',
        allergens: ['gluten'],
      },
      {
        id: 'broodje-shoarma',
        name: {
          nl: 'Broodje shoarma',
          tr: 'Şavarma sandviç',
          en: 'Shawarma sandwich'
        },
        description: {
          nl: 'Broodje met shawarma',
          tr: 'Şavarmalı sandviç',
          en: 'Shawarma sandwich'
        },
        price: 10.00,
        currency: '€',
        category: 'broodjes',
        image: '/images/menu/mss_broodje-shoarma_d4d.png',
        allergens: ['gluten'],
        isPopular: true,
      },
    ],
  },
  {
    id: 'schotels',
    name: {
      nl: 'Schotels (100% Halal)',
      tr: 'Tabaklarımız (100% Helal)',
      en: 'Dinner Plates (100% Halal)'
    },
    description: {
      nl: 'Complete dinerborden met friet, salade, saus en brood',
      tr: 'Patates, salata, sos ve ekmekli komple yemek tabakları',
      en: 'Complete dinner plates with fries, salad, sauce and bread'
    },
    order: 6,
    items: [
      {
        id: 'schotel-kipdoner',
        name: {
          nl: 'Schotel kipdöner',
          tr: 'Tavuk döner tabak',
          en: 'Chicken döner plate'
        },
        description: {
          nl: 'Kipshoarma schotel met friet, salade, saus en brood',
          tr: 'Tavuk döner tabağı patates, salata, sos ve ekmekle',
          en: 'Chicken döner plate with fries, salad, sauce and bread'
        },
        price: 15.00,
        currency: '€',
        category: 'schotels',
        image: '/images/menu/nl_10511503_aspava06_food_schotel_kipdoner_1x1.png',
        allergens: ['gluten'],
      },
      {
        id: 'schotel-shoarma',
        name: {
          nl: 'Schotel shoarma',
          tr: 'Şavarma tabak',
          en: 'Shawarma plate'
        },
        description: {
          nl: 'Shawarma schotel met friet, salade, saus en brood',
          tr: 'Şavarma tabağı patates, salata, sos ve ekmekle',
          en: 'Shawarma plate with fries, salad, sauce and bread'
        },
        price: 17.00,
        currency: '€',
        category: 'schotels',
        image: '/images/menu/mss_schotel-shoarma_10g.png',
        allergens: ['gluten'],
        isPopular: true,
      },
      {
        id: 'schotel-falafel',
        name: {
          nl: 'Schotel falafel',
          tr: 'Falafel tabak',
          en: 'Falafel plate'
        },
        description: {
          nl: 'Falafel schotel met friet, salade, saus en brood',
          tr: 'Falafel tabağı patates, salata, sos ve ekmekle',
          en: 'Falafel plate with fries, salad, sauce and bread'
        },
        price: 12.50,
        currency: '€',
        category: 'schotels',
        image: '/images/menu/mss_schotel-shoarma_10g.png',
        allergens: ['gluten', 'sesame'],
        isVegetarian: true,
      },
      {
        id: 'schotel-et-doner',
        name: {
          nl: 'Schotel Et döner',
          tr: 'Et döner tabak',
          en: 'Meat döner plate'
        },
        description: {
          nl: 'Vleesdöner schotel met friet, salade, saus en brood',
          tr: 'Et döner tabağı patates, salata, sos ve ekmekle',
          en: 'Meat döner plate with fries, salad, sauce and bread'
        },
        price: 17.00,
        currency: '€',
        category: 'schotels',
        image: '/images/menu/nl_10511503_aspava06_food_schotel_et_doner_1x1.png',
        allergens: ['gluten'],
      },
    ],
  },
  {
    id: 'burgers',
    name: {
      nl: 'Burgers (100% Halal)',
      tr: 'Burgerler (100% Helal)',
      en: 'Burgers (100% Halal)'
    },
    description: {
      nl: 'Sappige burgers met verse toppings',
      tr: 'Taze malzemelerle sulu burgerler',
      en: 'Juicy burgers with fresh toppings'
    },
    order: 7,
    items: [
      {
        id: 'hamburger',
        name: {
          nl: 'Hamburger',
          tr: 'Hamburger',
          en: 'Hamburger'
        },
        description: {
          nl: 'Runderburger',
          tr: 'Sığır eti burger',
          en: 'Beef burger'
        },
        price: 12.50,
        currency: '€',
        category: 'burgers',
        image: '/images/menu/nl_10511503_aspava06_food_hamburger_1x1.png',
        allergens: ['gluten', 'dairy'],
      },
      {
        id: 'kipburger',
        name: {
          nl: 'Kipburger',
          tr: 'Tavuk burger',
          en: 'Chicken burger'
        },
        description: {
          nl: 'Kipburger',
          tr: 'Tavuk burger',
          en: 'Chicken burger'
        },
        price: 10.00,
        currency: '€',
        category: 'burgers',
        image: '/images/menu/mss_kipburger_vpc.png',
        allergens: ['gluten', 'dairy'],
      },
    ],
  },
  {
    id: 'snacks',
    name: {
      nl: 'Snacks',
      tr: 'Atıştırmalıklar',
      en: 'Snacks'
    },
    description: {
      nl: 'Hollandse favorieten en krokante lekkernijen',
      tr: 'Hollanda favorileri ve çıtır lezzetler',
      en: 'Dutch favorites and crispy treats'
    },
    order: 8,
    items: [
      {
        id: 'patat-met',
        name: {
          nl: 'Patat met',
          tr: 'Soslu patates',
          en: 'Fries with sauce'
        },
        description: {
          nl: 'Friet met saus',
          tr: 'Soslu patates kızartması',
          en: 'Fries with sauce'
        },
        price: 4.50,
        currency: '€',
        category: 'snacks',
        allergens: [],
        isVegetarian: true,
      },
      {
        id: 'kaassouffle',
        name: {
          nl: 'Kaassoufflé',
          tr: 'Peynirli sufle',
          en: 'Cheese soufflé'
        },
        description: {
          nl: 'Kaassoufflé',
          tr: 'Peynirli sufle',
          en: 'Cheese soufflé'
        },
        price: 3.55,
        currency: '€',
        category: 'snacks',
        allergens: ['gluten', 'dairy'],
        isVegetarian: true,
      },
      {
        id: 'frikandel',
        name: {
          nl: 'Frikandel',
          tr: 'Frikandel',
          en: 'Frikandel'
        },
        description: {
          nl: 'Hollandse gehaktworst',
          tr: 'Hollanda kıymalı sosisi',
          en: 'Dutch minced-meat sausage'
        },
        price: 4.50,
        currency: '€',
        category: 'snacks',
        allergens: [],
      },
      {
        id: 'mexicano',
        name: {
          nl: 'Mexicano',
          tr: 'Mexicano',
          en: 'Mexicano'
        },
        description: {
          nl: 'Pittige Hollandse snack',
          tr: 'Baharatlı Hollanda atıştırmalığı',
          en: 'Spicy Dutch snack'
        },
        price: 4.50,
        currency: '€',
        category: 'snacks',
        allergens: [],
        isSpicy: true,
      },
      {
        id: 'kipnuggets',
        name: {
          nl: 'Kipnuggets 6 stuks',
          tr: 'Tavuk nugget 6 adet',
          en: 'Chicken nuggets 6 pieces'
        },
        description: {
          nl: '6 krokante kipnuggets',
          tr: '6 adet çıtır tavuk nugget',
          en: '6 crispy chicken nuggets'
        },
        price: 7.50,
        currency: '€',
        category: 'snacks',
        allergens: ['gluten'],
      },
    ],
  },
  {
    id: 'soepen',
    name: {
      nl: 'Soepen',
      tr: 'Çorbalar',
      en: 'Soups'
    },
    description: {
      nl: 'Verwarmende Turkse soepen',
      tr: 'Isıtan Türk çorbaları',
      en: 'Warming Turkish soups'
    },
    order: 9,
    items: [
      {
        id: 'mercimek',
        name: {
          nl: 'Mercimek',
          tr: 'Mercimek çorbası',
          en: 'Lentil soup'
        },
        description: {
          nl: 'Turkse linzensoep',
          tr: 'Türk mercimek çorbası',
          en: 'Turkish lentil soup'
        },
        price: 6.00,
        currency: '€',
        category: 'soepen',
        allergens: [],
        isVegetarian: true,
      },
    ],
  },
  {
    id: 'dranken',
    name: {
      nl: 'Dranken',
      tr: 'İçecekler',
      en: 'Beverages'
    },
    description: {
      nl: 'Verfrissende dranken',
      tr: 'Serinletici içecekler',
      en: 'Refreshing beverages'
    },
    order: 10,
    items: [
      {
        id: 'golden-power',
        name: {
          nl: 'Golden power',
          tr: 'Golden power',
          en: 'Golden power'
        },
        description: {
          nl: 'Energiedrank',
          tr: 'Enerji içeceği',
          en: 'Energy drink'
        },
        price: 3.00,
        currency: '€',
        category: 'dranken',
        allergens: [],
        isVegetarian: true,
      },
      {
        id: 'red-bull',
        name: {
          nl: 'Red Bull',
          tr: 'Red Bull',
          en: 'Red Bull'
        },
        description: {
          nl: 'Energiedrank',
          tr: 'Enerji içeceği',
          en: 'Energy drink'
        },
        price: 3.50,
        currency: '€',
        category: 'dranken',
        allergens: [],
        isVegetarian: true,
      },
      {
        id: 'capri-sun',
        name: {
          nl: 'Capri-Sun',
          tr: 'Capri-Sun',
          en: 'Capri-Sun'
        },
        description: {
          nl: 'Vruchtensap zakje',
          tr: 'Meyve suyu poşeti',
          en: 'Fruit juice pouch'
        },
        price: 2.00,
        currency: '€',
        category: 'dranken',
        allergens: [],
        isVegetarian: true,
      },
      {
        id: 'aa-drink',
        name: {
          nl: 'AA Drink',
          tr: 'AA Drink',
          en: 'AA Drink'
        },
        description: {
          nl: 'Sportdrank',
          tr: 'Spor içeceği',
          en: 'Sports drink'
        },
        price: 2.50,
        currency: '€',
        category: 'dranken',
        allergens: [],
        isVegetarian: true,
      },
      {
        id: 'fernandes',
        name: {
          nl: 'Fernandes',
          tr: 'Fernandes',
          en: 'Fernandes'
        },
        description: {
          nl: 'Hollandse frisdrank',
          tr: 'Hollanda gazlı içeceği',
          en: 'Dutch soft drink'
        },
        price: 2.50,
        currency: '€',
        category: 'dranken',
        allergens: [],
        isVegetarian: true,
      },
      {
        id: 'kizilay',
        name: {
          nl: 'Kızılay',
          tr: 'Kızılay maden suyu',
          en: 'Kızılay mineral water'
        },
        description: {
          nl: 'Turks mineraalwater',
          tr: 'Türk maden suyu',
          en: 'Turkish mineral water'
        },
        price: 2.00,
        currency: '€',
        category: 'dranken',
        allergens: [],
        isVegetarian: true,
      },
      {
        id: 'uludag',
        name: {
          nl: 'Uludağ',
          tr: 'Uludağ gazoz',
          en: 'Uludağ sparkling drink'
        },
        description: {
          nl: 'Turks koolzuurhoudend fruitsapje',
          tr: 'Türk meyveli gazoz',
          en: 'Turkish sparkling fruit drink'
        },
        price: 2.50,
        currency: '€',
        category: 'dranken',
        allergens: [],
        isVegetarian: true,
      },
      {
        id: 'lipton',
        name: {
          nl: 'Lipton Ice Tea',
          tr: 'Lipton Ice Tea',
          en: 'Lipton Ice Tea'
        },
        description: {
          nl: 'IJsthee',
          tr: 'Buzlu çay',
          en: 'Iced tea'
        },
        price: 2.50,
        currency: '€',
        category: 'dranken',
        allergens: [],
        isVegetarian: true,
      },
      {
        id: 'ayran-drink',
        name: {
          nl: 'Ayran',
          tr: 'Ayran',
          en: 'Ayran'
        },
        description: {
          nl: 'Verfrissende gezouten yoghurtdrank',
          tr: 'Serinletici ayran',
          en: 'Refreshing salted yogurt drink'
        },
        price: 2.50,
        currency: '€',
        category: 'dranken',
        allergens: ['dairy'],
        isVegetarian: true,
      },
      {
        id: 'water',
        name: {
          nl: 'Water',
          tr: 'Su',
          en: 'Water'
        },
        description: {
          nl: 'Plat water',
          tr: 'Su',
          en: 'Still water'
        },
        price: 1.50,
        currency: '€',
        category: 'dranken',
        allergens: [],
        isVegetarian: true,
      },
      {
        id: 'cola',
        name: {
          nl: 'Coca-Cola',
          tr: 'Coca-Cola',
          en: 'Coca-Cola'
        },
        description: {
          nl: 'Klassieke cola',
          tr: 'Klasik kola',
          en: 'Classic cola'
        },
        price: 2.50,
        currency: '€',
        category: 'dranken',
        allergens: [],
        isVegetarian: true,
      },
      {
        id: 'fanta',
        name: {
          nl: 'Fanta',
          tr: 'Fanta',
          en: 'Fanta'
        },
        description: {
          nl: 'Sinaasappelfrisdrank',
          tr: 'Portakal gazoz',
          en: 'Orange soda'
        },
        price: 2.50,
        currency: '€',
        category: 'dranken',
        allergens: [],
        isVegetarian: true,
      },
      {
        id: 'sprite',
        name: {
          nl: 'Sprite',
          tr: 'Sprite',
          en: 'Sprite'
        },
        description: {
          nl: 'Citroen-limoensoda',
          tr: 'Limon-lime gazoz',
          en: 'Lemon-lime soda'
        },
        price: 2.50,
        currency: '€',
        category: 'dranken',
        allergens: [],
        isVegetarian: true,
      },
      {
        id: 'fristi',
        name: {
          nl: 'Fristi',
          tr: 'Fristi',
          en: 'Fristi'
        },
        description: {
          nl: 'Hollandse yoghurtdrank',
          tr: 'Hollanda yoğurt içeceği',
          en: 'Dutch yogurt drink'
        },
        price: 2.00,
        currency: '€',
        category: 'dranken',
        allergens: ['dairy'],
        isVegetarian: true,
      },
    ],
  },
  {
    id: 'sauzen',
    name: {
      nl: 'Sauzen',
      tr: 'Soslar',
      en: 'Sauces'
    },
    description: {
      nl: 'Extra sauzen bij je maaltijd',
      tr: 'Yemeğinize ekstra soslar',
      en: 'Extra sauces to complement your meal'
    },
    order: 11,
    items: [
      {
        id: 'knoflooksaus',
        name: {
          nl: 'Knoflooksaus',
          tr: 'Sarımsak sos',
          en: 'Garlic sauce'
        },
        description: {
          nl: 'Knoflooksaus',
          tr: 'Sarımsak sosu',
          en: 'Garlic sauce'
        },
        price: 1.00,
        currency: '€',
        category: 'sauzen',
        allergens: ['dairy'],
        isVegetarian: true,
      },
      {
        id: 'sambal',
        name: {
          nl: 'Sambal',
          tr: 'Sambal (acı sos)',
          en: 'Sambal (chili sauce)'
        },
        description: {
          nl: 'Pittige chilisaus',
          tr: 'Baharatlı biber sosu',
          en: 'Spicy chili sauce'
        },
        price: 1.00,
        currency: '€',
        category: 'sauzen',
        allergens: [],
        isVegetarian: true,
        isSpicy: true,
      },
      {
        id: 'mayonaise',
        name: {
          nl: 'Mayonaise',
          tr: 'Mayonez',
          en: 'Mayonnaise'
        },
        description: {
          nl: 'Mayonaise',
          tr: 'Mayonez',
          en: 'Mayonnaise'
        },
        price: 1.00,
        currency: '€',
        category: 'sauzen',
        allergens: ['eggs'],
        isVegetarian: true,
      },
      {
        id: 'ketchup',
        name: {
          nl: 'Ketchup',
          tr: 'Ketçap',
          en: 'Ketchup'
        },
        description: {
          nl: 'Tomatenketchup',
          tr: 'Domates ketçap',
          en: 'Tomato ketchup'
        },
        price: 1.00,
        currency: '€',
        category: 'sauzen',
        allergens: [],
        isVegetarian: true,
      },
    ],
  },
];
