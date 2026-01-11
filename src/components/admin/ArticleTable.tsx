"use client";

import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import { Edit, Eye, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Article {
  id: string;
  title: string;
  status: "DRAFT" | "REVIEW" | "SCHEDULED" | "PUBLISHED" | "ARCHIVED";
  author: {
    name: string;
  };
  category: {
    name: string;
    color: string;
  };
  viewCount: number;
  publishedAt?: Date | string | null;
  createdAt: Date | string;
}

interface ArticleTableProps {
  articles: Article[];
}

const statusLabels: Record<string, string> = {
  DRAFT: "Nacrt",
  REVIEW: "Na pregledu",
  SCHEDULED: "Zakazano",
  PUBLISHED: "Objavljeno",
  ARCHIVED: "Arhivirano",
};

const statusColors: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-800",
  REVIEW: "bg-yellow-100 text-yellow-800",
  SCHEDULED: "bg-blue-100 text-blue-800",
  PUBLISHED: "bg-green-100 text-green-800",
  ARCHIVED: "bg-red-100 text-red-800",
};

export function ArticleTable({ articles }: ArticleTableProps) {
  if (articles.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="text-muted-foreground">Nema članaka za prikaz.</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Naslov</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Kategorija</TableHead>
            <TableHead>Autor</TableHead>
            <TableHead>Pregledi</TableHead>
            <TableHead>Datum</TableHead>
            <TableHead className="text-right">Akcije</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map((article) => (
            <TableRow key={article.id}>
              <TableCell className="font-medium max-w-md">
                <Link
                  href={`/admin/articles/${article.id}/edit`}
                  className="hover:underline"
                >
                  {article.title}
                </Link>
              </TableCell>
              <TableCell>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                    statusColors[article.status]
                  )}
                >
                  {statusLabels[article.status]}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: `${article.category.color}20`,
                    color: article.category.color,
                  }}
                >
                  {article.category.name}
                </span>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {article.author.name}
              </TableCell>
              <TableCell className="text-sm">{article.viewCount}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDateTime(
                  article.publishedAt || article.createdAt
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  {article.status === "PUBLISHED" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      title="Pregled"
                    >
                      <Link href={`/articles/${article.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    title="Uredi"
                  >
                    <Link href={`/admin/articles/${article.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Izbriši"
                    onClick={() => {
                      if (
                        confirm(
                          `Jeste li sigurni da želite izbrisati članak "${article.title}"?`
                        )
                      ) {
                        // Delete functionality will be implemented
                        console.log("Delete article:", article.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
