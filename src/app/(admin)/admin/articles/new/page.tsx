"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleSchema, type ArticleFormData } from "@/lib/validations/article";
import { TipTapEditor } from "@/components/admin/TipTapEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { generateSlug } from "@/lib/utils";
import { Save, Eye, Send, X, ArrowLeft } from "lucide-react";
import Link from "next/link";

// Mock data - will be replaced with database queries
const mockCategories = [
  { id: "1", name: "Vijesti", slug: "vijesti" },
  { id: "2", name: "Kultura", slug: "kultura" },
  { id: "3", name: "Sport", slug: "sport" },
  { id: "4", name: "Gospodarstvo", slug: "gospodarstvo" },
];

const mockTags = [
  { id: "1", name: "Lokalno", slug: "lokalno" },
  { id: "2", name: "Politika", slug: "politika" },
  { id: "3", name: "Događanja", slug: "dogadanja" },
  { id: "4", name: "Intervju", slug: "intervju" },
];

export default function NewArticlePage() {
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [metaKeywords, setMetaKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      status: "DRAFT",
      tags: [],
      metaKeywords: [],
    },
  });

  const title = watch("title");

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setValue("title", newTitle);
    setValue("slug", generateSlug(newTitle));
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
    setValue("tags", selectedTags);
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !metaKeywords.includes(keywordInput.trim())) {
      const newKeywords = [...metaKeywords, keywordInput.trim()];
      setMetaKeywords(newKeywords);
      setValue("metaKeywords", newKeywords);
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    const newKeywords = metaKeywords.filter((k) => k !== keyword);
    setMetaKeywords(newKeywords);
    setValue("metaKeywords", newKeywords);
  };

  const onSubmit = async (data: ArticleFormData) => {
    try {
      // TODO: Save to database via API
      console.log("Spremanje članka:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Članak uspješno spremljen!");
      router.push("/admin/articles");
    } catch (error) {
      console.error("Greška pri spremanju:", error);
      alert("Došlo je do greške pri spremanju članka.");
    }
  };

  const handleSaveDraft = () => {
    setValue("status", "DRAFT");
    handleSubmit(onSubmit)();
  };

  const handlePublish = () => {
    setValue("status", "PUBLISHED");
    setValue("publishedAt", new Date().toISOString());
    handleSubmit(onSubmit)();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/articles">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Novi članak</h1>
          <p className="text-gray-600 mt-2">Kreirajte i objavite novi članak</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Osnovne informacije</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">
                Naslov <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                {...register("title")}
                onChange={handleTitleChange}
                placeholder="Unesite naslov članka"
                className="mt-1"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="slug">
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input
                id="slug"
                {...register("slug")}
                placeholder="url-adresa-clanka"
                className="mt-1"
              />
              {errors.slug && (
                <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="subtitle">Podnaslov</Label>
              <Input
                id="subtitle"
                {...register("subtitle")}
                placeholder="Opcionalni podnaslov"
                className="mt-1"
              />
              {errors.subtitle && (
                <p className="text-red-500 text-sm mt-1">{errors.subtitle.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="excerpt">
                Sažetak <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="excerpt"
                {...register("excerpt")}
                placeholder="Kratak sažetak članka koji će se prikazati na naslovnici"
                rows={3}
                className="mt-1"
              />
              {errors.excerpt && (
                <p className="text-red-500 text-sm mt-1">{errors.excerpt.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">
            Sadržaj <span className="text-red-500">*</span>
          </h2>
          <Controller
            name="content"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TipTapEditor
                content={field.value}
                onChange={field.onChange}
                placeholder="Počnite pisati članak..."
              />
            )}
          />
          {errors.content && (
            <p className="text-red-500 text-sm mt-2">{errors.content.message}</p>
          )}
        </div>

        {/* Classification */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Klasifikacija</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="categoryId">
                Kategorija <span className="text-red-500">*</span>
              </Label>
              <Select id="categoryId" {...register("categoryId")} className="mt-1">
                <option value="">Odaberite kategoriju</option>
                {mockCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
              {errors.categoryId && (
                <p className="text-red-500 text-sm mt-1">{errors.categoryId.message}</p>
              )}
            </div>

            <div>
              <Label>Oznake</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {mockTags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedTags.includes(tag.id)
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Naslovna slika</h2>
          <div>
            <Label htmlFor="featuredImage">URL slike</Label>
            <Input
              id="featuredImage"
              {...register("featuredImage")}
              type="url"
              placeholder="https://example.com/image.jpg"
              className="mt-1"
            />
            <p className="text-sm text-gray-500 mt-1">
              Privremeno unesite URL slike. Cloudinary integracija dolazi uskoro.
            </p>
            {errors.featuredImage && (
              <p className="text-red-500 text-sm mt-1">{errors.featuredImage.message}</p>
            )}
          </div>
        </div>

        {/* SEO Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">SEO postavke</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="metaTitle">Meta naslov</Label>
              <Input
                id="metaTitle"
                {...register("metaTitle")}
                placeholder="Optimizirani naslov za pretraživače (maks. 60 znakova)"
                className="mt-1"
                maxLength={60}
              />
              {errors.metaTitle && (
                <p className="text-red-500 text-sm mt-1">{errors.metaTitle.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="metaDescription">Meta opis</Label>
              <Textarea
                id="metaDescription"
                {...register("metaDescription")}
                placeholder="Opis članka za pretraživače (maks. 160 znakova)"
                rows={3}
                className="mt-1"
                maxLength={160}
              />
              {errors.metaDescription && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.metaDescription.message}
                </p>
              )}
            </div>

            <div>
              <Label>Ključne riječi</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addKeyword();
                    }
                  }}
                  placeholder="Dodaj ključnu riječ i pritisni Enter"
                />
                <Button type="button" onClick={addKeyword} variant="outline">
                  Dodaj
                </Button>
              </div>
              {metaKeywords.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {metaKeywords.map((keyword) => (
                    <Badge key={keyword} variant="secondary" className="gap-1">
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/articles")}
          >
            Odustani
          </Button>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => alert("Pregled funkcionalnost dolazi uskoro")}
            >
              <Eye className="h-4 w-4 mr-2" />
              Pregled
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={handleSaveDraft}
              disabled={isSubmitting}
            >
              <Save className="h-4 w-4 mr-2" />
              Spremi skicu
            </Button>

            <Button
              type="button"
              onClick={handlePublish}
              disabled={isSubmitting}
            >
              <Send className="h-4 w-4 mr-2" />
              Objavi
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
