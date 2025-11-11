import Image from 'next/image';
import { restaurantConfig } from '@/data/restaurantConfig';
import type { Locale } from '@/i18n/config';
import type { Translations } from '@/data/locales/nl';

interface ContactSectionProps {
  lang: Locale;
  dict: Translations;
}

export default function ContactSection({ lang, dict }: ContactSectionProps) {
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent('Broersveld 113B, 3111 LE Schiedam, Netherlands')}&zoom=16`;

  // Dinamik açılış saati kontrolü
  const checkOpenStatus = () => {
    const now = new Date();
    const day = now.getDay(); // 0=Pazar, 1=Pazartesi, ..., 6=Cumartesi
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentTime = currentHour * 60 + currentMinute;

    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
    const todayKey = days[day];
    const todayHours = restaurantConfig.openingHours[todayKey];

    const [openHour, openMin] = todayHours.open.split(':').map(Number);
    const [closeHour, closeMin] = todayHours.close.split(':').map(Number);
    const openTime = openHour * 60 + openMin;
    const closeTime = closeHour * 60 + closeMin;

    const isOpen = currentTime >= openTime && currentTime < closeTime;
    return { isOpen, closeTime: todayHours.close };
  };

  const { isOpen, closeTime } = checkOpenStatus();

  return (
    <section id="contact" className="pt-8 pb-20 md:pt-10 md:pb-28 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            {dict.contact.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {dict.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Address */}
            <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-500 p-3 rounded-xl text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-neutral-900 mb-2">{dict.contact.address}</h3>
                  <p className="text-gray-700">{restaurantConfig.location.address}</p>
                  <p className="text-gray-700">{restaurantConfig.location.postalCode} {restaurantConfig.location.city}</p>
                  <p className="text-gray-700">Netherlands</p>
                  <div className="mt-3">
                    <span className={`inline-flex items-center gap-1 text-sm px-3 py-1.5 rounded-full font-medium ${
                      isOpen
                        ? 'text-emerald-700 bg-emerald-100'
                        : 'text-red-700 bg-red-100'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'
                      }`}></span>
                      {isOpen ? `${dict.contact.openNow} ${closeTime}` : dict.contact.closedNow}
                    </span>
                  </div>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Broersveld 113B, 3111 LE Schiedam')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold mt-3 transition-colors"
                  >
                    {dict.contact.getDirections}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-cyan-50 p-6 rounded-2xl border border-cyan-100">
              <div className="flex items-start gap-4">
                <div className="bg-cyan-500 p-3 rounded-xl text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-neutral-900 mb-2">{dict.contact.phone}</h3>
                  <a href={`tel:${restaurantConfig.contact.phone}`} className="text-gray-700 hover:text-cyan-600 font-medium transition-colors">
                    {restaurantConfig.contact.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-emerald-500 p-6 rounded-2xl shadow-lg shadow-emerald-500/30">
              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-white mb-2">{dict.contact.whatsapp}</h3>
                  <a
                    href={`https://wa.me/31643653765?text=${encodeURIComponent(`Hallo! Ik wil graag bestellen bij Aspava 06.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-50 hover:text-white hover:underline font-medium transition-colors"
                  >
                    +31 6 43653765
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="bg-gray-700 p-3 rounded-xl text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-neutral-900 mb-2">{dict.contact.email}</h3>
                  <a href={`mailto:${restaurantConfig.contact.email}`} className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                    {restaurantConfig.contact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
              <div className="flex items-start gap-4">
                <div className="bg-amber-500 p-3 rounded-xl text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-neutral-900 mb-3">{dict.contact.hours}</h3>
                  <div className="space-y-2 text-sm">
                    {Object.entries(restaurantConfig.openingHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between">
                        <span className="text-gray-700 capitalize font-medium">{dict.days[day as keyof typeof dict.days]}</span>
                        <span className="text-gray-900 font-semibold">
                          {hours.open} - {hours.close}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="relative h-[600px] rounded-xl overflow-hidden shadow-lg">
            <iframe
              src={mapUrl}
              className="w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Aspava 06 Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
