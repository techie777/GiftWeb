import './globals.css';
import ScrollToTop from '../components/ScrollToTop';

export const metadata = {
  title: 'GiftPortal Luxe | Premium Luxury Flowers, Cakes & Personalized Gifts',
  description: 'Handcrafted luxury flowers, artisan cakes, gourmet hampers, personalized gifts, and toys with express same-day delivery across 100+ cities in India.',
  keywords: 'online gift delivery, fresh flowers, birthday cakes, anniversary gifts, personalized gifts, corporate hampers, express delivery India, same day gift delivery',
  metadataBase: new URL('https://giftportalluxe.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GiftPortal Luxe - World-Class Premium Gifting & Express Delivery',
    description: 'Fresh Dutch bouquets, master patissier cakes, and bespoke personalized keepsakes delivered with live photo confirmation.',
    url: 'https://giftportalluxe.com',
    siteName: 'GiftPortal Luxe',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'GiftPortal Luxe Luxury Gifts and Flowers',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GiftPortal Luxe - Premium Luxury Gifts, Flowers & Cakes',
    description: 'Express 2-hour delivery on handcrafted floral bouquets, designer cakes & custom personalized gifts across India.',
    images: ['https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&h=630&fit=crop'],
    creator: '@giftportalluxe',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.svg',
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://giftportalluxe.com/#organization',
      name: 'GiftPortal Luxe',
      url: 'https://giftportalluxe.com',
      logo: 'https://giftportalluxe.com/favicon.svg',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-1800-589-3443',
        contactType: 'customer service',
        areaServed: 'IN',
        availableLanguage: ['en', 'hi']
      },
      sameAs: [
        'https://instagram.com/giftportalluxe',
        'https://facebook.com/giftportalluxe',
        'https://twitter.com/giftportalluxe'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://giftportalluxe.com/#website',
      url: 'https://giftportalluxe.com',
      name: 'GiftPortal Luxe',
      description: 'World-Class Premium Luxury Gifting Portal',
      publisher: {
        '@id': 'https://giftportalluxe.com/#organization'
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://giftportalluxe.com/?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500&family=Playfair+Display:ital,wght@0,600;1,600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(regs) {
                  for (var r of regs) { r.unregister(); }
                });
              }
            `,
          }}
        />
      </head>
      <body className="bg-[#FAF8F5] text-slate-900 font-sans antialiased selection:bg-rose-100 selection:text-rose-900">
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
