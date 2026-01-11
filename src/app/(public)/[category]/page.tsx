import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import ArticleCard from '@/components/public/ArticleCard';
import CategoryNav from '@/components/public/CategoryNav';
import { getMockArticlesByCategory } from '@/lib/mockData';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const categories: Record<string, { name: string; color: string; description: string }> = {
  politika: {
    name: 'Politika',
    color: 'blue',
    description: 'Najnovije vijesti iz političkog života Rijeke i regije'
  },
  ekonomija: {
    name: 'Ekonomija',
    color: 'green',
    description: 'Poslovne vijesti, tržišta i ekonomski razvoj'
  },
  kultura: {
    name: 'Kultura',
    color: 'purple',
    description: 'Kulturni eventi, umjetnost i zabava'
  },
  sport: {
    name: 'Sport',
    color: 'red',
    description: 'Sportske vijesti, rezultati i analize'
  },
  misljenja: {
    name: 'Mišljenja',
    color: 'orange',
    description: 'Kolumne, analize i komentari'
  },
};

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-600' },
  green: { bg: 'bg-green-600', text: 'text-green-600', border: 'border-green-600' },
  purple: { bg: 'bg-purple-600', text: 'text-purple-600', border: 'border-purple-600' },
  red: { bg: 'bg-red-600', text: 'text-red-600', border: 'border-red-600' },
  orange: { bg: 'bg-orange-600', text: 'text-orange-600', border: 'border-orange-600' },
};

export async function generateMetadata({ params }: CategoryPageProps) {
  const categoryData = categories[params.category];

  if (!categoryData) {
    return {
      title: 'Kategorija nije pronađena',
    };
  }

  return {
    title: `${categoryData.name} - Rijeka Online`,
    description: categoryData.description,
  };
}

// Generate static params for all categories
export function generateStaticParams() {
  return Object.keys(categories).map((category) => ({
    category,
  }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryData = categories[params.category];

  if (!categoryData) {
    notFound();
  }

  const articles = getMockArticlesByCategory(params.category);
  const colors = colorClasses[categoryData.color];

  // Split articles for different layouts
  const featuredArticle = articles[0];
  const topArticles = articles.slice(1, 4);
  const remainingArticles = articles.slice(4);

  return (
    <div className="bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              Naslovnica
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">{categoryData.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className={`${colors.bg} text-white rounded-lg p-8 mb-8`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            {categoryData.name}
          </h1>
          <p className="text-xl text-white/90">
            {categoryData.description}
          </p>
        </div>

        {/* Category Navigation */}
        <CategoryNav />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Article in Category */}
            {featuredArticle && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <ArticleCard
                  article={featuredArticle}
                  variant="default"
                  showImage={true}
                  showExcerpt={true}
                />
                <div className="p-6" />
              </div>
            )}

            {/* Top Articles */}
            {topArticles.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className={`text-2xl font-bold mb-6 pb-2 border-b-4 ${colors.border}`}>
                  Istaknuto
                </h2>
                <div className="space-y-6">
                  {topArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      variant="horizontal"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Remaining Articles */}
            {remainingArticles.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className={`text-2xl font-bold mb-6 pb-2 border-b-4 ${colors.border}`}>
                  Sve vijesti
                </h2>
                <div className="space-y-6">
                  {remainingArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      variant="horizontal"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Pagination Placeholder */}
            <div className="flex justify-center gap-2">
              <button className="px-4 py-2 bg-white rounded-lg shadow-sm font-semibold text-gray-700 hover:bg-gray-50">
                Prethodna
              </button>
              <button className={`px-4 py-2 ${colors.bg} text-white rounded-lg shadow-sm font-semibold`}>
                1
              </button>
              <button className="px-4 py-2 bg-white rounded-lg shadow-sm font-semibold text-gray-700 hover:bg-gray-50">
                2
              </button>
              <button className="px-4 py-2 bg-white rounded-lg shadow-sm font-semibold text-gray-700 hover:bg-gray-50">
                3
              </button>
              <button className="px-4 py-2 bg-white rounded-lg shadow-sm font-semibold text-gray-700 hover:bg-gray-50">
                Sljedeća
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Latest from Category */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8 sticky top-24">
              <h3 className={`text-2xl font-bold mb-6 pb-2 border-b-2 ${colors.border}`}>
                Najnovije
              </h3>
              <div className="space-y-6">
                {articles.slice(0, 5).map((article, index) => (
                  <div key={article.id} className="flex gap-4">
                    <span className="text-4xl font-bold text-gray-300">
                      {index + 1}
                    </span>
                    <ArticleCard
                      article={article}
                      variant="compact"
                      showImage={false}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className={`${colors.bg} text-white rounded-lg shadow-sm p-6`}>
              <h3 className="text-2xl font-bold mb-3">
                Newsletter
              </h3>
              <p className="text-white/90 mb-4">
                Pretplatite se i primajte vijesti iz kategorije {categoryData.name}
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Vaš email"
                  className="w-full px-4 py-2 rounded-lg text-gray-900"
                />
                <button
                  type="submit"
                  className="w-full bg-white text-gray-900 font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Pretplati se
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
