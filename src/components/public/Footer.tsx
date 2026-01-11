import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const categories = [
  { name: 'Politika', slug: 'politika' },
  { name: 'Ekonomija', slug: 'ekonomija' },
  { name: 'Kultura', slug: 'kultura' },
  { name: 'Sport', slug: 'sport' },
  { name: 'Mišljenja', slug: 'misljenja' },
];

const legalLinks = [
  { name: 'O nama', href: '/o-nama' },
  { name: 'Kontakt', href: '/kontakt' },
  { name: 'Uvjeti korištenja', href: '/uvjeti' },
  { name: 'Politika privatnosti', href: '/privatnost' },
  { name: 'Kolačići', href: '/kolacici' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white text-2xl font-bold mb-4">Rijeka Online</h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Nezavisni portal za vijesti iz Rijeke i Primorsko-goranske županije.
              Pružamo kvalitetne, provjerene i pravovremene informacije.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@rijekaonline.hr"
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Kategorije</h4>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/${category.slug}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Informacije</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} Rijeka Online. Sva prava pridržana.
          </p>
          <p className="text-gray-500 text-sm">
            Izrađeno s ♥ u Rijeci
          </p>
        </div>
      </div>
    </footer>
  );
}
