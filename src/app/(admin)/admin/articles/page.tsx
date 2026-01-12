import { ArticleTable } from "@/components/admin/ArticleTable";
import { mockArticles } from "@/lib/mockData";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { status?: string; search?: string; category?: string };
}) {
  // Filter articles based on search params using mock data
  let articles = mockArticles;

  if (searchParams.status && searchParams.status !== "all") {
    articles = articles.filter(
      (a) => a.status.toLowerCase() === searchParams.status?.toLowerCase()
    );
  }

  if (searchParams.search) {
    const search = searchParams.search.toLowerCase();
    articles = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(search) ||
        a.excerpt.toLowerCase().includes(search)
    );
  }

  if (searchParams.category) {
    articles = articles.filter(
      (a) => a.category.slug === searchParams.category
    );
  }

  const stats = {
    all: mockArticles.length,
    published: mockArticles.filter((a) => a.status === "PUBLISHED").length,
    draft: mockArticles.filter((a) => a.status === "DRAFT").length,
    review: mockArticles.filter((a) => a.status === "REVIEW").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Članci</h1>
          <p className="text-gray-600 mt-1">Upravljajte svim člancima</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Novi članak
        </Link>
      </div>

      {/* Status Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex gap-8 px-6" aria-label="Tabs">
            <Link
              href="/admin/articles?status=all"
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                !searchParams.status || searchParams.status === "all"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Svi ({stats.all})
            </Link>
            <Link
              href="/admin/articles?status=published"
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                searchParams.status === "published"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Objavljeno ({stats.published})
            </Link>
            <Link
              href="/admin/articles?status=draft"
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                searchParams.status === "draft"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Skice ({stats.draft})
            </Link>
            <Link
              href="/admin/articles?status=review"
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                searchParams.status === "review"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Na pregledu ({stats.review})
            </Link>
          </nav>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b border-gray-200">
          <form className="flex gap-4">
            <input
              type="search"
              name="search"
              placeholder="Pretraži članke..."
              defaultValue={searchParams.search}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              name="category"
              defaultValue={searchParams.category}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sve kategorije</option>
              <option value="politika">Politika</option>
              <option value="ekonomija">Ekonomija</option>
              <option value="kultura">Kultura</option>
              <option value="sport">Sport</option>
              <option value="misljenja">Mišljenja</option>
            </select>
            <button
              type="submit"
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Filtriraj
            </button>
          </form>
        </div>

        {/* Articles Table */}
        <div className="p-6">
          <ArticleTable articles={articles} />
        </div>
      </div>
    </div>
  );
}
