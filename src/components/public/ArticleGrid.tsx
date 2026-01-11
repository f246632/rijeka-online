import ArticleCard from './ArticleCard';

interface Article {
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
}

interface ArticleGridProps {
  articles: Article[];
  columns?: 1 | 2 | 3 | 4;
  variant?: 'default' | 'compact' | 'horizontal';
  showImage?: boolean;
  showExcerpt?: boolean;
  className?: string;
}

export default function ArticleGrid({
  articles,
  columns = 3,
  variant = 'default',
  showImage = true,
  showExcerpt = true,
  className = ''
}: ArticleGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-8 ${className}`}>
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          article={article}
          variant={variant}
          showImage={showImage}
          showExcerpt={showExcerpt}
        />
      ))}
    </div>
  );
}
