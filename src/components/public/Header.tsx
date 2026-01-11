'use client';

import Link from 'next/link';
import { Menu, X, Search } from 'lucide-react';
import { useState } from 'react';

const categories = [
  { name: 'Politika', slug: 'politika', color: 'politics' },
  { name: 'Ekonomija', slug: 'ekonomija', color: 'economy' },
  { name: 'Kultura', slug: 'kultura', color: 'culture' },
  { name: 'Sport', slug: 'sport', color: 'sport' },
  { name: 'Mišljenja', slug: 'misljenja', color: 'opinion' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      {/* Top Bar */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <div className="text-gray-600">
            {new Date().toLocaleDateString('hr-HR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-600 hover:text-gray-900">
              Prijava
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
              Rijeka Online
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Nezavisne vijesti iz Rijeke i regije
            </p>
          </Link>

          {/* Search & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Pretraživanje"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center justify-start gap-8 py-3">
            <li>
              <Link
                href="/"
                className="text-gray-900 font-semibold hover:text-gray-600 transition-colors"
              >
                Naslovnica
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/${category.slug}`}
                  className="relative text-gray-700 font-medium hover:text-gray-900 transition-colors group"
                >
                  {category.name}
                  <span
                    className={`absolute bottom-0 left-0 w-0 h-0.5 bg-${category.color} group-hover:w-full transition-all duration-300`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <ul className="md:hidden py-4 space-y-4">
              <li>
                <Link
                  href="/"
                  className="block text-gray-900 font-semibold hover:text-gray-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Naslovnica
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/${category.slug}`}
                    className="block text-gray-700 font-medium hover:text-gray-900 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
    </header>
  );
}
