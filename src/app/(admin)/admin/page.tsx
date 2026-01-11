import { StatsCard } from "@/components/admin/StatsCard";
import { ArticleTable } from "@/components/admin/ArticleTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import {
  FileText,
  CheckCircle,
  FileEdit,
  Eye,
  TrendingUp,
  Plus,
} from "lucide-react";
import Link from "next/link";

async function getDashboardStats() {
  const [totalArticles, publishedArticles, draftArticles, totalViews] =
    await Promise.all([
      prisma.article.count(),
      prisma.article.count({ where: { status: "PUBLISHED" } }),
      prisma.article.count({ where: { status: "DRAFT" } }),
      prisma.article.aggregate({
        _sum: {
          viewCount: true,
        },
      }),
    ]);

  return {
    totalArticles,
    publishedArticles,
    draftArticles,
    totalViews: totalViews._sum.viewCount || 0,
  };
}

async function getRecentArticles() {
  const articles = await prisma.article.findMany({
    take: 10,
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

export default async function AdminDashboard() {
  const [stats, recentArticles] = await Promise.all([
    getDashboardStats(),
    getRecentArticles(),
  ]);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Nadzorna ploča</h1>
          <p className="mt-1 text-sm text-gray-600">
            Dobrodošli u admin panel Rijeka Online
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/articles/new">
            <Plus className="mr-2 h-4 w-4" />
            Novi članak
          </Link>
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Ukupno članaka"
          value={stats.totalArticles}
          description="Svi članci u sustavu"
          icon={FileText}
        />
        <StatsCard
          title="Objavljeno"
          value={stats.publishedArticles}
          description="Živih članaka na portalu"
          icon={CheckCircle}
          className="border-green-200 bg-green-50"
        />
        <StatsCard
          title="Nacrta"
          value={stats.draftArticles}
          description="Članci u izradi"
          icon={FileEdit}
          className="border-yellow-200 bg-yellow-50"
        />
        <StatsCard
          title="Ukupni pregledi"
          value={stats.totalViews.toLocaleString("hr-HR")}
          description="Svi pregledi članaka"
          icon={Eye}
          className="border-blue-200 bg-blue-50"
        />
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>Brze akcije</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link href="/admin/articles/new">
              <Plus className="mr-2 h-4 w-4" />
              Novi članak
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/articles">
              <FileText className="mr-2 h-4 w-4" />
              Svi članci
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/categories">
              <TrendingUp className="mr-2 h-4 w-4" />
              Upravljanje kategorijama
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/settings">
              <Eye className="mr-2 h-4 w-4" />
              Postavke portala
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Recent articles */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Nedavni članci</CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/articles">Vidi sve</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <ArticleTable articles={recentArticles} />
        </CardContent>
      </Card>
    </div>
  );
}
