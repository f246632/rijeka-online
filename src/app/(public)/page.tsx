import FeaturedArticle from '@/components/public/FeaturedArticle';
import ArticleCard from '@/components/public/ArticleCard';
import ArticleGrid from '@/components/public/ArticleGrid';
import Link from 'next/link';
import {
  getMockFeaturedArticle,
  getMockLatestArticles,
  getMockArticlesByCategory,
  breakingNews
} from '@/lib/mockData';

export const metadata = {
  title: 'Rijeka Online - Nezavisne vijesti iz Rijeke i regije',
  description: 'Najnovije vijesti iz Rijeke, Primorsko-goranske županije i šire regije. Politika, ekonomija, sport, kultura i više.',
};

export default function HomePage() {
  const featuredArticle = getMockFeaturedArticle();
  const latestArticles = getMockLatestArticles(9);
  const politicsArticles = getMockArticlesByCategory('politika').slice(0, 4);
  const economyArticles = getMockArticlesByCategory('ekonomija').slice(0, 3);
  const cultureArticles = getMockArticlesByCategory('kultura').slice(0, 2);
  const sportArticles = getMockArticlesByCategory('sport').slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breaking News Bar */}
      <div className="bg-red-600 text-white px-6 py-3 rounded-lg mb-8">
        <div className="flex items-center gap-4">
          <span className="font-bold text-sm uppercase tracking-wide">
            NAJNOVIJE
          </span>
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-8 animate-scroll">
              {breakingNews.map((news) => (
                <Link
                  key={news.id}
                  href={`/article/${news.slug}`}
                  className="hover:underline whitespace-nowrap"
                >
                  • {news.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Article */}
      <FeaturedArticle article={featuredArticle} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Articles (2 columns) */}
        <div className="lg:col-span-2 space-y-12">
          {/* Latest Articles */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900 border-b-4 border-blue-600 pb-2">
                Najnovije vijesti
              </h2>
            </div>
            <ArticleGrid articles={latestArticles.slice(1, 4)} columns={2} />
          </section>

          {/* Politics Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900 border-b-4 border-blue-600 pb-2">
                Politika
              </h2>
              <Link
                href="/politika"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Sve iz politike →
              </Link>
            </div>
            <div className="space-y-6">
              {politicsArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  variant="horizontal"
                />
              ))}
            </div>
          </section>

          {/* Economy Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900 border-b-4 border-green-600 pb-2">
                Ekonomija
              </h2>
              <Link
                href="/ekonomija"
                className="text-green-600 hover:text-green-800 font-semibold"
              >
                Sve iz ekonomije →
              </Link>
            </div>
            <ArticleGrid articles={economyArticles} columns={2} />
          </section>

          {/* Culture & Sport Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Culture */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 border-b-4 border-purple-600 pb-2">
                  Kultura
                </h2>
                <Link
                  href="/kultura"
                  className="text-purple-600 hover:text-purple-800 font-semibold text-sm"
                >
                  Više →
                </Link>
              </div>
              <div className="space-y-6">
                {cultureArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    variant="default"
                    showExcerpt={false}
                  />
                ))}
              </div>
            </section>

            {/* Sport */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 border-b-4 border-red-600 pb-2">
                  Sport
                </h2>
                <Link
                  href="/sport"
                  className="text-red-600 hover:text-red-800 font-semibold text-sm"
                >
                  Više →
                </Link>
              </div>
              <div className="space-y-6">
                {sportArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    variant="default"
                    showExcerpt={false}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="lg:col-span-1">
          {/* Most Read */}
          <section className="bg-gray-50 p-6 rounded-lg mb-8 sticky top-24">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-300 pb-2">
              Najčitanije
            </h3>
            <div className="space-y-6">
              {latestArticles.slice(0, 5).map((article, index) => (
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
          </section>

          {/* Newsletter Signup */}
          <section className="bg-blue-600 text-white p-6 rounded-lg">
            <h3 className="text-2xl font-bold mb-3">
              Pretplatite se na newsletter
            </h3>
            <p className="text-blue-100 mb-4">
              Primajte najvažnije vijesti direktno u svoj email
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Vaš email"
                className="w-full px-4 py-2 rounded-lg text-gray-900"
              />
              <button
                type="submit"
                className="w-full bg-white text-blue-600 font-bold py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Pretplati se
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
