import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { hr } from 'date-fns/locale';

interface FeaturedArticleProps {
  article: {
    id: string;
    title: string;
    subtitle?: string;
    excerpt?: string;
    slug: string;
    category: {
      name: string;
      slug: string;
    };
    author: {
      name: string;
    };
    featuredImage?: string;
    publishedAt: Date;
  };
}

const categoryColors: Record<string, string> = {
  politika: 'bg-blue-600 text-white',
  ekonomija: 'bg-green-600 text-white',
  kultura: 'bg-purple-600 text-white',
  sport: 'bg-red-600 text-white',
  misljenja: 'bg-orange-600 text-white',
};

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  const categoryColor = categoryColors[article.category.slug] || 'bg-gray-600 text-white';

  return (
    <article className="relative group mb-12">
      <Link href={`/article/${article.slug}`}>
        {article.featuredImage && (
          <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg">
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
        )}

        <div className={`${article.featuredImage ? 'absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white' : 'py-8'}`}>
          <span className={`category-badge ${categoryColor} text-sm`}>
            {article.category.name}
          </span>
          <h1 className={`news-headline mt-4 ${article.featuredImage ? 'text-white' : 'text-gray-900'}`}>
            {article.title}
          </h1>
          {article.subtitle && (
            <p className={`news-subtitle ${article.featuredImage ? 'text-gray-200' : 'text-gray-600'}`}>
              {article.subtitle}
            </p>
          )}
          {article.excerpt && (
            <p className={`news-excerpt mt-4 max-w-3xl ${article.featuredImage ? 'text-gray-100' : 'text-gray-700'}`}>
              {article.excerpt}
            </p>
          )}
          <p className={`news-byline mt-4 ${article.featuredImage ? 'text-gray-300' : 'text-gray-500'}`}>
            {article.author.name} • {formatDistanceToNow(new Date(article.publishedAt), {
              addSuffix: true,
              locale: hr
            })}
          </p>
        </div>
      </Link>
    </article>
  );
}
