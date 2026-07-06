import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Category } from "@/types/category";
import { ModelListParams } from "@/types/model";
import { statusLabels } from "@/lib/uz-labels";

interface ModelsToolbarProps {
  params: ModelListParams;
  onChange: (params: ModelListParams) => void;
  categories: Category[];
}

const SORT_OPTIONS: { value: NonNullable<ModelListParams["sortBy"]>; label: string }[] = [
  { value: "createdAt", label: "Yaratilgan sana" },
  { value: "name", label: "Nomi" },
  { value: "launchDate", label: "Chiqarilgan sana" },
  { value: "conversion", label: "Konversiya" },
  { value: "score", label: "Score" },
];

export function ModelsToolbar({ params, onChange, categories }: ModelsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Model nomi bo'yicha qidirish..."
          className="pl-9"
          value={params.search ?? ""}
          onChange={(e) => onChange({ ...params, search: e.target.value, page: 1 })}
        />
      </div>

      <Select
        value={params.categoryId ?? "all"}
        onValueChange={(value) =>
          onChange({ ...params, categoryId: value === "all" ? undefined : value, page: 1 })
        }
      >
        <SelectTrigger className="sm:w-44">
          <SelectValue placeholder="Kategoriya" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Barcha kategoriyalar</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={params.status ?? "all"}
        onValueChange={(value) =>
          onChange({
            ...params,
            status: value === "all" ? undefined : (value as ModelListParams["status"]),
            page: 1,
          })
        }
      >
        <SelectTrigger className="sm:w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Barcha statuslar</SelectItem>
          {Object.entries(statusLabels).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={params.sortBy ?? "createdAt"}
        onValueChange={(value) =>
          onChange({ ...params, sortBy: value as ModelListParams["sortBy"] })
        }
      >
        <SelectTrigger className="sm:w-48">
          <SelectValue placeholder="Saralash" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
