import { StatsCard } from "@/components/admin/StatsCard";
import { ArticleTable } from "@/components/admin/ArticleTable";
import { FileText, Eye, CheckCircle, Edit } from "lucide-react";
import { mockArticles } from "@/lib/mockData";

// Use mock data for stats
async function getStats() {
  const articles = mockArticles;

  return {
    total: articles.length,
    published: articles.filter((a) => a.status === "PUBLISHED").length,
    drafts: articles.filter((a) => a.status === "DRAFT").length,
    totalViews: articles.reduce((sum, a) => sum + (a.viewCount || 0), 0),
  };
}

// Get recent articles from mock data
async function getRecentArticles() {
  return mockArticles.slice(0, 5);
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const recentArticles = await getRecentArticles();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Nadzorna ploča</h1>
        <p className="text-gray-600 mt-2">Dobrodošli natrag!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Ukupno članaka"
          value={stats.total.toString()}
          icon={FileText}
          description="Svi članci u sustavu"
        />
        <StatsCard
          title="Objavljeno"
          value={stats.published.toString()}
          icon={CheckCircle}
          description="Javno dostupni članci"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Skice"
          value={stats.drafts.toString()}
          icon={Edit}
          description="Članci u pripremi"
        />
        <StatsCard
          title="Ukupni pregledi"
          value={stats.totalViews.toLocaleString()}
          icon={Eye}
          description="Svi pregledi članaka"
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Brze akcije</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/articles/new"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FileText className="w-5 h-5" />
            Novi članak
          </a>
          <a
            href="/admin/categories"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Upravljaj kategorijama
          </a>
          <a
            href="/admin/tags"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Upravljaj oznakama
          </a>
        </div>
      </div>

      {/* Recent Articles */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Nedavni članci
        </h2>
        <ArticleTable articles={recentArticles} />
      </div>
    </div>
  );
}
