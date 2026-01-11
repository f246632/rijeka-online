import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { hr } from 'date-fns/locale';
import { ChevronRight, Facebook, Twitter, Share2 } from 'lucide-react';
import ArticleCard from '@/components/public/ArticleCard';
import { getMockArticleBySlug, getMockLatestArticles } from '@/lib/mockData';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

const categoryColors: Record<string, string> = {
  politika: 'bg-blue-600 text-white',
  ekonomija: 'bg-green-600 text-white',
  kultura: 'bg-purple-600 text-white',
  sport: 'bg-red-600 text-white',
  misljenja: 'bg-orange-600 text-white',
};

export async function generateMetadata({ params }: ArticlePageProps) {
  const article = getMockArticleBySlug(params.slug);

  if (!article) {
    return {
      title: 'Članak nije pronađen',
    };
  }

  return {
    title: `${article.title} - Rijeka Online`,
    description: article.excerpt || article.subtitle,
    openGraph: {
      title: article.title,
      description: article.excerpt || article.subtitle,
      images: article.featuredImage ? [article.featuredImage] : [],
      type: 'article',
      publishedTime: article.publishedAt.toISOString(),
      authors: [article.author.name],
    },
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getMockArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getMockLatestArticles(4).filter(a => a.id !== article.id).slice(0, 3);
  const categoryColor = categoryColors[article.category.slug] || 'bg-gray-600 text-white';

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
            <Link href={`/${article.category.slug}`} className="hover:text-gray-900">
              {article.category.name}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900 truncate">{article.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Article Content */}
          <article className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
              {/* Category Badge */}
              <span className={`category-badge ${categoryColor}`}>
                {article.category.name}
              </span>

              {/* Title & Subtitle */}
              <h1 className="news-headline mt-4 mb-4">
                {article.title}
              </h1>

              {article.subtitle && (
                <p className="news-subtitle mb-6">
                  {article.subtitle}
                </p>
              )}

              {/* Author & Date */}
              <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-gray-600">
                      {article.author.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {article.author.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(article.publishedAt), {
                        addSuffix: true,
                        locale: hr
                      })} • {new Date(article.publishedAt).toLocaleDateString('hr-HR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Podijeli na Facebooku"
                  >
                    <Facebook className="w-5 h-5 text-blue-600" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Podijeli na Twitteru"
                  >
                    <Twitter className="w-5 h-5 text-blue-400" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Kopiraj link"
                  >
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Featured Image */}
              {article.featuredImage && (
                <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {article.excerpt && (
                  <p className="text-xl text-gray-700 font-medium leading-relaxed mb-8">
                    {article.excerpt}
                  </p>
                )}

                {/* Mock article content - replace with actual content from database */}
                <div dangerouslySetInnerHTML={{ __html: article.content }} />

                {/* Extended mock content for demonstration */}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <h2>Ključni detalji</h2>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <h2>Reakcije i komentari</h2>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                  laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                  architecto beatae vitae dicta sunt explicabo.
                </p>

                <blockquote>
                  <p>
                    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                    sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
                  </p>
                </blockquote>

                <p>
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                  adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
                  dolore magnam aliquam quaerat voluptatem.
                </p>

                <h2>Zaključak</h2>
                <p>
                  Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
                  laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure
                  reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.
                </p>
              </div>

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm font-semibold text-gray-600">Oznake:</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
                    Rijeka
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
                    Vijesti
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
                    {article.category.name}
                  </span>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Related Articles */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8 sticky top-24">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-300 pb-2">
                Povezane vijesti
              </h3>
              <div className="space-y-6">
                {relatedArticles.map((relatedArticle) => (
                  <ArticleCard
                    key={relatedArticle.id}
                    article={relatedArticle}
                    variant="compact"
                    showImage={false}
                  />
                ))}
              </div>

              <Link
                href={`/${article.category.slug}`}
                className={`block text-center mt-6 py-2 px-4 ${categoryColor} rounded-lg hover:opacity-90 transition-opacity font-semibold`}
              >
                Sve iz kategorije {article.category.name}
              </Link>
            </div>

            {/* Ad Space */}
            <div className="bg-gray-200 rounded-lg p-6 text-center text-gray-500">
              <p className="text-sm mb-2">Oglasni prostor</p>
              <div className="bg-gray-300 h-64 flex items-center justify-center">
                300x250
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
