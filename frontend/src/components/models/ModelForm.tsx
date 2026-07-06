import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCategories } from "@/hooks/useCategories";
import { Model, ModelStatus } from "@/types/model";
import { statusLabels } from "@/lib/uz-labels";
import { resolveImageUrl } from "@/lib/image";

const modelFormSchema = z.object({
  name: z.string().min(1, "Model nomi kiritilishi shart"),
  categoryId: z.string().min(1, "Kategoriya tanlanishi shart"),
  launchDate: z.string().min(1, "Sana tanlanishi shart"),
  status: z.enum(["ACTIVE", "INACTIVE", "DISCONTINUED"] as const),
});

export type ModelFormSchema = z.infer<typeof modelFormSchema>;

interface ModelFormProps {
  mode: "create" | "edit";
  defaultModel?: Model;
  onSubmit: (values: ModelFormSchema, image?: File) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export function ModelForm({ defaultModel, onSubmit, onCancel, isSubmitting }: ModelFormProps) {
  const { data: categories } = useCategories();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imageError, setImageError] = React.useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(
    defaultModel ? resolveImageUrl(defaultModel.imagePath) : null
  );

  const form = useForm<ModelFormSchema>({
    resolver: zodResolver(modelFormSchema),
    defaultValues: {
      name: defaultModel?.name ?? "",
      categoryId: defaultModel?.categoryId ?? "",
      launchDate: defaultModel ? defaultModel.launchDate.slice(0, 10) : "",
      status: defaultModel?.status ?? "ACTIVE",
    },
  });

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setImageError("Faqat JPG yoki PNG formatdagi rasm yuklash mumkin");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setImageError("Rasm hajmi 5MB dan oshmasligi kerak");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setImageError(null);
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleRemoveImage(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setImageFile(null);
    setImageError(null);
    setPreviewUrl(defaultModel ? resolveImageUrl(defaultModel.imagePath) : null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(values: ModelFormSchema) {
    await onSubmit(values, imageFile ?? undefined);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col items-start gap-2">
          <label className="text-sm font-medium">Model rasmi</label>
          <div className="relative">
            <label
              htmlFor="model-image"
              className="flex size-32 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed bg-muted transition-colors hover:bg-accent"
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Model rasmi" className="size-full object-cover" />
              ) : (
                <ImagePlus className="size-6 text-muted-foreground" />
              )}
            </label>
            {previewUrl && (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm transition-colors hover:opacity-90"
                aria-label="Rasmni o'chirish"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          <input
            id="model-image"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleImageChange}
          />
          {imageError && <p className="text-sm text-destructive">{imageError}</p>}
        </div>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model nomi</FormLabel>
              <FormControl>
                <Input placeholder="Masalan: Air Classic 01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kategoriya</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Kategoriyani tanlang" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="launchDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ishlab chiqarilgan sana</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                value={field.value}
                onValueChange={(value) => field.onChange(value as ModelStatus)}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Statusni tanlang" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={onCancel} className="w-full sm:w-auto">
            Bekor qilish
          </Button>
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? "Saqlanmoqda..." : "Saqlash"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
