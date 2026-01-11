'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const categories = [
  { name: 'Sve', slug: '', color: 'gray' },
  { name: 'Politika', slug: 'politika', color: 'blue' },
  { name: 'Ekonomija', slug: 'ekonomija', color: 'green' },
  { name: 'Kultura', slug: 'kultura', color: 'purple' },
  { name: 'Sport', slug: 'sport', color: 'red' },
  { name: 'Mišljenja', slug: 'misljenja', color: 'orange' },
];

const colorClasses: Record<string, string> = {
  gray: 'bg-gray-600 hover:bg-gray-700',
  blue: 'bg-blue-600 hover:bg-blue-700',
  green: 'bg-green-600 hover:bg-green-700',
  purple: 'bg-purple-600 hover:bg-purple-700',
  red: 'bg-red-600 hover:bg-red-700',
  orange: 'bg-orange-600 hover:bg-orange-700',
};

export default function CategoryNav() {
  const pathname = usePathname();

  const isActive = (slug: string) => {
    if (slug === '') return pathname === '/';
    return pathname.startsWith(`/${slug}`);
  };

  return (
    <nav className="flex flex-wrap gap-3 mb-8">
      {categories.map((category) => {
        const active = isActive(category.slug);
        const colorClass = colorClasses[category.color] || colorClasses.gray;

        return (
          <Link
            key={category.slug || 'all'}
            href={category.slug ? `/${category.slug}` : '/'}
            className={`
              px-4 py-2 rounded-full font-medium transition-all
              ${active
                ? `${colorClass} text-white shadow-lg`
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {category.name}
          </Link>
        );
      })}
    </nav>
  );
}
