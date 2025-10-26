import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://by-adana.vercel.app'),
  title: 'Adana Digital - Digital Marketing Agency Indonesia',
  description: 'Adana Digital is a leading digital marketing agency in Indonesia, specializing in performance marketing, social media advertising, and digital transformation strategies. Partner with us to accelerate your business growth.',
  keywords: [
    'digital marketing agency Indonesia',
    'social media marketing Jakarta',
    'performance marketing',
    'Google Ads agency',
    'Meta Ads specialist',
    'TikTok Ads Indonesia',
    'digital transformation',
    'online advertising agency',
    'social media management',
    'digital marketing services',
    'e-commerce marketing',
    'brand awareness campaigns',
    'lead generation Indonesia'
  ],
  authors: [{ name: 'Adana Digital' }],
  creator: 'Adana Digital',
  publisher: 'Adana Digital',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_ID',
    url: 'https://by-adana.vercel.app',
    title: 'Adana Digital - Digital Marketing Agency Indonesia',
    description: 'Adana Digital is a leading digital marketing agency in Indonesia, specializing in performance marketing, social media advertising, and digital transformation strategies. Partner with us to accelerate your business growth.',
    siteName: 'Adana Digital',
    images: [
      {
        url: 'https://by-adana.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Adana Digital - Digital Marketing Agency'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adana Digital - Digital Marketing Agency Indonesia',
    description: 'Adana Digital is a leading digital marketing agency in Indonesia, specializing in performance marketing, social media advertising, and digital transformation strategies.',
    images: ['https://by-adana.vercel.app/og-image.jpg']
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code'
  }
};