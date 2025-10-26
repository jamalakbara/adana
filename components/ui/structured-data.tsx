interface BusinessInfo {
  name: string;
  description: string;
  url: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: string;
    longitude: string;
  };
  openingHours: string[];
  sameAs: string[];
}

interface Service {
  type: string;
  name: string;
  description: string;
  areaServed: string;
}

interface StructuredDataProps {
  businessInfo?: BusinessInfo;
  services?: Service[];
  type?: 'LocalBusiness' | 'Organization' | 'Service';
}

export function StructuredData({
  businessInfo,
  services = [],
  type = 'Organization'
}: StructuredDataProps) {
  const defaultBusinessInfo: BusinessInfo = {
    name: 'Adana Digital',
    description: 'Leading digital marketing agency in Indonesia specializing in performance marketing, social media advertising, and digital transformation strategies.',
    url: 'https://by-adana.vercel.app',
    telephone: '+62-21-1234567',
    email: 'info@adana-digital.com',
    address: {
      streetAddress: 'Jl. Example No. 123',
      addressLocality: 'Jakarta',
      addressRegion: 'DKI Jakarta',
      postalCode: '12345',
      addressCountry: 'Indonesia'
    },
    geo: {
      latitude: '-6.2088',
      longitude: '106.8456'
    },
    openingHours: [
      'Mo-Fr 09:00-18:00',
      'Sa 09:00-15:00'
    ],
    sameAs: [
      'https://www.instagram.com/adanadigital',
      'https://www.linkedin.com/company/adanadigital',
      'https://www.facebook.com/adanadigital'
    ]
  };

  const currentBusinessInfo = businessInfo || defaultBusinessInfo;
  const allServices: Service[] = [
    ...services,
    {
      type: 'Service',
      name: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to boost your online presence and drive business growth.',
      areaServed: 'Indonesia'
    },
    {
      type: 'Service',
      name: 'Social Media Advertising',
      description: 'Targeted social media campaigns on Meta, TikTok, and other platforms for maximum ROI.',
      areaServed: 'Southeast Asia'
    },
    {
      type: 'Service',
      name: 'Performance Marketing',
      description: 'Data-driven performance marketing campaigns focused on conversions and measurable results.',
      areaServed: 'Indonesia'
    },
    {
      type: 'Service',
      name: 'Digital Transformation',
      description: 'Complete digital transformation services to modernize your business operations.',
      areaServed: 'Indonesia'
    }
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': type,
        ...currentBusinessInfo,
        ...(allServices.length > 0 && {
          'offers': allServices
        })
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}