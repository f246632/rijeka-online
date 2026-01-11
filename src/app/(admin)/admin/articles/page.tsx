import { ArticleTable } from "@/components/admin/ArticleTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Plus, Search } from "lucide-react";
import Link from "next/link";

interface SearchParams {
  searchParams: {
    q?: string;
    status?: string;
    category?: string;
  };
}

async function getArticles(searchParams: SearchParams["searchParams"]) {
  const where: any = {};

  if (searchParams.q) {
    where.OR = [
      { title: { contains: searchParams.q, mode: "insensitive" } },
      { excerpt: { contains: searchParams.q, mode: "insensitive" } },
    ];
  }

  if (searchParams.status) {
    where.status = searchParams.status;
  }

  if (searchParams.category) {
    where.categoryId = searchParams.category;
  }

  const articles = await prisma.article.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: { name: true },
      },
      category: {
        select: { name: true, color: true },
      },
    },
  });

  return articles;
}

async function getCategories() {
  return prisma.category.findMany({
    orderBy: { displayOrder: "asc" },
  });
}

export default async function ArticlesPage({ searchParams }: SearchParams) {
  const [articles, categories] = await Promise.all([
    getArticles(searchParams),
    getCategories(),
  ]);

  const statusCounts = {
    all: await prisma.article.count(),
    published: await prisma.article.count({ where: { status: "PUBLISHED" } }),
    draft: await prisma.article.count({ where: { status: "DRAFT" } }),
    review: await prisma.article.count({ where: { status: "REVIEW" } }),
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Članci</h1>
          <p className="mt-1 text-sm text-gray-600">
            Upravljajte svim člancima na portalu
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/articles/new">
            <Plus className="mr-2 h-4 w-4" />
            Novi članak
          </Link>
        </Button>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 border-b">
        <Link
          href="/admin/articles"
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            !searchParams.status
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Sve ({statusCounts.all})
        </Link>
        <Link
          href="/admin/articles?status=PUBLISHED"
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            searchParams.status === "PUBLISHED"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Objavljeno ({statusCounts.published})
        </Link>
        <Link
          href="/admin/articles?status=DRAFT"
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            searchParams.status === "DRAFT"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Nacrta ({statusCounts.draft})
        </Link>
        <Link
          href="/admin/articles?status=REVIEW"
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            searchParams.status === "REVIEW"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Na pregledu ({statusCounts.review})
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filteri</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  name="q"
                  placeholder="Pretraži članke..."
                  defaultValue={searchParams.q}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              name="category"
              defaultValue={searchParams.category}
              className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="">Sve kategorije</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <Button type="submit">Filtriraj</Button>
          </form>
        </CardContent>
      </Card>

      {/* Articles table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Članci ({articles.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ArticleTable articles={articles} />
        </CardContent>
      </Card>
    </div>
  );
}
