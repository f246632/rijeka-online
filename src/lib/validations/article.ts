import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(1, "Naslov je obavezan").max(200, "Naslov ne može biti duži od 200 znakova"),
  slug: z.string().min(1, "Slug je obavezan").regex(/^[a-z0-9-]+$/, "Slug može sadržavati samo mala slova, brojeve i crtice"),
  subtitle: z.string().max(300, "Podnaslov ne može biti duži od 300 znakova").optional(),
  excerpt: z.string().min(10, "Sažetak mora imati najmanje 10 znakova").max(500, "Sažetak ne može biti duži od 500 znakova"),
  content: z.string().min(50, "Sadržaj mora imati najmanje 50 znakova"),
  categoryId: z.string().min(1, "Kategorija je obavezna"),
  tags: z.array(z.string()).default([]),
  featuredImage: z.string().url("Slika mora biti validna URL adresa").optional(),
  metaTitle: z.string().max(60, "Meta naslov ne može biti duži od 60 znakova").optional(),
  metaDescription: z.string().max(160, "Meta opis ne može biti duži od 160 znakova").optional(),
  metaKeywords: z.array(z.string()).default([]),
  status: z.enum(["DRAFT", "REVIEW", "SCHEDULED", "PUBLISHED"]).default("DRAFT"),
  publishedAt: z.string().datetime().optional(),
});

export type ArticleFormData = z.infer<typeof articleSchema>;

export const categorySchema = z.object({
  name: z.string().min(1, "Naziv je obavezan").max(50, "Naziv ne može biti duži od 50 znakova"),
  slug: z.string().min(1, "Slug je obavezan").regex(/^[a-z0-9-]+$/, "Slug može sadržavati samo mala slova, brojeve i crtice"),
  description: z.string().max(200, "Opis ne može biti duži od 200 znakova").optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, "Boja mora biti u HEX formatu").default("#3B82F6"),
  icon: z.string().optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;

export const tagSchema = z.object({
  name: z.string().min(1, "Naziv je obavezan").max(30, "Naziv ne može biti duži od 30 znakova"),
  slug: z.string().min(1, "Slug je obavezan").regex(/^[a-z0-9-]+$/, "Slug može sadržavati samo mala slova, brojeve i crtice"),
});

export type TagFormData = z.infer<typeof tagSchema>;
