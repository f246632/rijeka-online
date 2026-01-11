"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tagSchema, type TagFormData } from "@/lib/validations/article";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { generateSlug } from "@/lib/utils";
import { Plus, Edit, Trash2, X } from "lucide-react";

// Mock data - will be replaced with database queries
const mockTags = [
  { id: "1", name: "Lokalno", slug: "lokalno", _count: { articles: 24 } },
  { id: "2", name: "Politika", slug: "politika", _count: { articles: 18 } },
  { id: "3", name: "Događanja", slug: "dogadanja", _count: { articles: 15 } },
  { id: "4", name: "Intervju", slug: "intervju", _count: { articles: 8 } },
  { id: "5", name: "Crna kronika", slug: "crna-kronika", _count: { articles: 12 } },
];

export default function TagsPage() {
  const [tags, setTags] = useState(mockTags);
  const [editingTag, setEditingTag] = useState<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TagFormData>({
    resolver: zodResolver(tagSchema),
  });

  const name = watch("name");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setValue("name", newName);
    if (!editingTag) {
      setValue("slug", generateSlug(newName));
    }
  };

  const handleEdit = (tag: any) => {
    setEditingTag(tag);
    setValue("name", tag.name);
    setValue("slug", tag.slug);
  };

  const handleCancelEdit = () => {
    setEditingTag(null);
    reset();
  };

  const handleDelete = (tagId: string) => {
    if (confirm("Jeste li sigurni da želite obrisati ovu oznaku?")) {
      // TODO: Implement delete functionality
      console.log("Brisanje oznake:", tagId);
      alert("Funkcionalnost brisanja će biti implementirana.");
    }
  };

  const onSubmit = async (data: TagFormData) => {
    try {
      // TODO: Save to database via API
      console.log("Spremanje oznake:", data);
      alert("Oznaka uspješno spremljena!");
      handleCancelEdit();
    } catch (error) {
      console.error("Greška:", error);
      alert("Došlo je do greške pri spremanju oznake.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Upravljanje oznakama</h1>
        <p className="text-gray-600 mt-2">Dodajte i upravljajte oznakama članaka</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Add/Edit Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingTag ? "Uredi oznaku" : "Nova oznaka"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">
                Naziv <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                {...register("name")}
                onChange={handleNameChange}
                placeholder="Unesite naziv oznake"
                className="mt-1"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="slug">
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input
                id="slug"
                {...register("slug")}
                placeholder="url-oznaka"
                className="mt-1"
              />
              {errors.slug && (
                <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
              )}
            </div>

            <div className="flex gap-2">
              {editingTag && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancelEdit}
                  className="flex-1"
                >
                  Odustani
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {editingTag ? "Ažuriraj" : "Dodaj"} oznaku
              </Button>
            </div>
          </form>
        </div>

        {/* Tags List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Sve oznake ({tags.length})</h2>

            {tags.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Nema kreiranih oznaka. Dodajte prvu oznaku.
              </p>
            ) : (
              <div className="space-y-2">
                {tags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <h3 className="font-medium text-gray-900">{tag.name}</h3>
                      <p className="text-sm text-gray-500">
                        /{tag.slug}
                        {tag._count && ` • ${tag._count.articles} članaka`}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(tag)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Uredi
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(tag.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1 text-red-600" />
                        Obriši
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}