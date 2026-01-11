"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema, type CategoryFormData } from "@/lib/validations/article";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateSlug } from "@/lib/utils";
import { Plus, Edit, Trash2, GripVertical } from "lucide-react";

// Mock data - will be replaced with database queries
const mockCategories = [
  { id: "1", name: "Vijesti", slug: "vijesti", color: "#3B82F6", description: "Lokalne i nacionalne vijesti", displayOrder: 1 },
  { id: "2", name: "Kultura", slug: "kultura", color: "#EC4899", description: "Kulturni događaji i recenzije", displayOrder: 2 },
  { id: "3", name: "Sport", slug: "sport", color: "#10B981", description: "Sportske vijesti i rezultati", displayOrder: 3 },
  { id: "4", name: "Gospodarstvo", slug: "gospodarstvo", color: "#F59E0B", description: "Ekonomija i poslovanje", displayOrder: 4 },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      color: "#3B82F6",
    },
  });

  const name = watch("name");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setValue("name", newName);
    if (!editingCategory) {
      setValue("slug", generateSlug(newName));
    }
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setValue("name", category.name);
    setValue("slug", category.slug);
    setValue("description", category.description || "");
    setValue("color", category.color);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    reset();
  };

  const handleDelete = (categoryId: string) => {
    if (confirm("Jeste li sigurni da želite obrisati ovu kategoriju?")) {
      // TODO: Implement delete functionality
      console.log("Brisanje kategorije:", categoryId);
      alert("Funkcionalnost brisanja će biti implementirana.");
    }
  };

  const onSubmit = async (data: CategoryFormData) => {
    try {
      // TODO: Save to database via API
      console.log("Spremanje kategorije:", data);
      alert("Kategorija uspješno spremljena!");
      handleCancelEdit();
    } catch (error) {
      console.error("Greška:", error);
      alert("Došlo je do greške pri spremanju kategorije.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Upravljanje kategorijama</h1>
        <p className="text-gray-600 mt-2">Dodajte i upravljajte kategorijama članaka</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Add/Edit Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingCategory ? "Uredi kategoriju" : "Nova kategorija"}
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
                placeholder="Unesite naziv kategorije"
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
                placeholder="url-kategorija"
                className="mt-1"
              />
              {errors.slug && (
                <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Opis</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Kratak opis kategorije"
                rows={3}
                className="mt-1"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="color">
                Boja <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="color"
                  {...register("color")}
                  type="color"
                  className="w-20 h-10"
                />
                <Input
                  {...register("color")}
                  type="text"
                  placeholder="#3B82F6"
                  className="flex-1"
                />
              </div>
              {errors.color && (
                <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>
              )}
            </div>

            <div className="flex gap-2">
              {editingCategory && (
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
                {editingCategory ? "Ažuriraj" : "Dodaj"} kategoriju
              </Button>
            </div>
          </form>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">Sve kategorije ({categories.length})</h2>

            {categories.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Nema kreiranih kategorija. Dodajte prvu kategoriju.
              </p>
            ) : (
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-500">
                          /{category.slug}
                          {category.description && ` • ${category.description}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(category)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Uredi
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(category.id)}
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
