import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb navigation"
      className={`flex items-center space-x-2 text-sm ${className}`}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isFirst = index === 0;

        return (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <svg
                className="w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M10 6L6 12l4 6 4-6v6H6v6l4-6 4z" />
              </svg>
            )}

            {item.href ? (
              <Link
                href={item.href}
                className={`${
                  item.current
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-500 hover:text-gray-700'
                } transition-colors duration-200`}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`${
                  item.current
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            )}

            {!isLast && (
              <svg
                className="w-4 h-4 text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M10 6L6 12l4 6 4-6v6H6v6l4-6 4z" />
              </svg>
            )}
          </div>
        );
      })}
    </nav>
  );
}

// Predefined breadcrumb sets for common routes
export const homeBreadcrumbs: BreadcrumbItem[] = [
  { label: 'Home', href: 'https://by-adana.vercel.app', current: false }
];

export const portfolioBreadcrumbs: BreadcrumbItem[] = [
  { label: 'Home', href: 'https://by-adana.vercel.app', current: false },
  { label: 'Portfolio', href: 'https://by-adana.vercel.app/#portfolio', current: true }
];

export const digitalPartnersBreadcrumbs: BreadcrumbItem[] = [
  { label: 'Home', href: 'https://by-adana.vercel.app', current: false },
  { label: 'Digital Partners', href: 'https://by-adana.vercel.app/#digital-partners', current: true }
];

export const contactBreadcrumbs: BreadcrumbItem[] = [
  { label: 'Home', href: 'https://by-adana.vercel.app', current: false },
  { label: 'Contact', href: 'https://by-adana.vercel.app/#contact', current: true }
];