import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { hr } from 'date-fns/locale';

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    subtitle?: string;
    excerpt?: string;
    slug: string;
    category: {
      name: string;
      slug: string;
      color?: string;
    };
    author: {
      name: string;
    };
    featuredImage?: string;
    publishedAt: Date;
  };
  variant?: 'default' | 'compact' | 'horizontal';
  showImage?: boolean;
  showExcerpt?: boolean;
}

const categoryColors: Record<string, string> = {
  politika: 'bg-blue-600 text-white',
  ekonomija: 'bg-green-600 text-white',
  kultura: 'bg-purple-600 text-white',
  sport: 'bg-red-600 text-white',
  misljenja: 'bg-orange-600 text-white',
};

export default function ArticleCard({
  article,
  variant = 'default',
  showImage = true,
  showExcerpt = true
}: ArticleCardProps) {
  const categoryColor = categoryColors[article.category.slug] || 'bg-gray-600 text-white';

  if (variant === 'compact') {
    return (
      <article className="border-b border-gray-200 pb-4 last:border-0">
        <Link href={`/article/${article.slug}`} className="group">
          <span className={`category-badge ${categoryColor} text-xs`}>
            {article.category.name}
          </span>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-600 transition-colors mt-2 leading-tight">
            {article.title}
          </h3>
          <p className="news-byline mt-2">
            {article.author.name} • {formatDistanceToNow(new Date(article.publishedAt), {
              addSuffix: true,
              locale: hr
            })}
          </p>
        </Link>
      </article>
    );
  }

  if (variant === 'horizontal') {
    return (
      <article className="border-b border-gray-200 pb-6 mb-6 last:border-0">
        <Link href={`/article/${article.slug}`} className="group">
          <div className="flex gap-6">
            {showImage && article.featuredImage && (
              <div className="flex-shrink-0 w-48 h-32 relative overflow-hidden rounded-lg">
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="flex-1">
              <span className={`category-badge ${categoryColor} text-xs`}>
                {article.category.name}
              </span>
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-600 transition-colors mt-2 leading-tight">
                {article.title}
              </h3>
              {article.subtitle && (
                <p className="text-lg text-gray-600 mt-2 font-medium">
                  {article.subtitle}
                </p>
              )}
              {showExcerpt && article.excerpt && (
                <p className="news-excerpt mt-3 line-clamp-2">
                  {article.excerpt}
                </p>
              )}
              <p className="news-byline mt-3">
                {article.author.name} • {formatDistanceToNow(new Date(article.publishedAt), {
                  addSuffix: true,
                  locale: hr
                })}
              </p>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="group">
      <Link href={`/article/${article.slug}`}>
        {showImage && article.featuredImage && (
          <div className="relative w-full h-64 overflow-hidden rounded-lg mb-4">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <span className={`category-badge ${categoryColor} text-xs`}>
          {article.category.name}
        </span>
        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-600 transition-colors mt-3 leading-tight">
          {article.title}
        </h3>
        {article.subtitle && (
          <p className="text-lg text-gray-600 mt-2 font-medium">
            {article.subtitle}
          </p>
        )}
        {showExcerpt && article.excerpt && (
          <p className="news-excerpt mt-3 line-clamp-3">
            {article.excerpt}
          </p>
        )}
        <p className="news-byline mt-3">
          {article.author.name} • {formatDistanceToNow(new Date(article.publishedAt), {
            addSuffix: true,
            locale: hr
          })}
        </p>
      </Link>
    </article>
  );
}
