import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adana Digital Agency | Performance Marketing & Media Solutions",
  description:
    "Adana Digital is a modern digital agency specializing in performance marketing, media buying, and digital transformation. We help brands grow with data-driven strategies across Meta Ads, Google Ads, TikTok, and more.",
  keywords: [
    "digital agency",
    "performance marketing",
    "media buying",
    "digital transformation",
    "social media marketing",
    "google ads",
    "meta ads",
    "tiktok ads",
    "digital marketing agency",
    "marketing agency",
    "online advertising"
  ],
  authors: [{ name: "Adana Digital Agency" }],
  creator: "Adana Digital Agency",
  publisher: "Adana Digital Agency",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://by-adana.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Adana Digital Agency | Performance Marketing & Media Solutions",
    description: "Adana Digital is a modern digital agency specializing in performance marketing, media buying, and digital transformation. We help brands grow with data-driven strategies.",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://by-adana.vercel.app',
    siteName: "Adana Digital Agency",
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Adana Digital Agency - Performance Marketing & Media Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Adana Digital Agency | Performance Marketing & Media Solutions",
    description: "Adana Digital is a modern digital agency specializing in performance marketing, media buying, and digital transformation.",
    images: {
      url: 'https://by-adana.vercel.app/og-image.jpg',
      alt: 'Adana Digital Agency - Performance Marketing & Media Solutions',
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: "https://by-adana.vercel.app/favicon.ico",
    shortcut: "https://by-adana.vercel.app/favicon-16x16.png",
    apple: "https://by-adana.vercel.app/apple-touch-icon.png",
  },
  manifest: "https://by-adana.vercel.app/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
