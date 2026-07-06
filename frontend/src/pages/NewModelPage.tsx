import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { PageHeader } from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { ModelForm, ModelFormSchema } from "@/components/models/ModelForm";
import { useCreateModel, useModel, useUpdateModel } from "@/hooks/useModels";
import { extractErrorMessage } from "@/services/api";

export default function NewModelPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const { data: existingModel, isLoading } = useModel(id);
  const createModel = useCreateModel();
  const updateModel = useUpdateModel(id ?? "");

  async function handleSubmit(values: ModelFormSchema, image?: File) {
    try {
      if (isEdit && id) {
        const model = await updateModel.mutateAsync({ ...values, image });
        toast.success("Model muvaffaqiyatli yangilandi");
        navigate(`/models/${model.id}`);
      } else {
        const model = await createModel.mutateAsync({ ...values, image });
        toast.success("Model muvaffaqiyatli qo'shildi");
        navigate(`/models/${model.id}`);
      }
    } catch (error) {
      toast.error(extractErrorMessage(error, "Saqlashda xatolik yuz berdi"));
    }
  }

  if (isEdit && isLoading) {
    return <div className="text-muted-foreground">Yuklanmoqda...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={isEdit ? "Modelni tahrirlash" : "Yangi model"}
        description={
          isEdit
            ? "Model ma'lumotlarini yangilang"
            : "Yangi padoshva modelini tizimga qo'shing"
        }
      />
      <Card className="max-w-xl">
        <CardContent className="pt-6">
          <ModelForm
            mode={isEdit ? "edit" : "create"}
            defaultModel={existingModel}
            onSubmit={handleSubmit}
            onCancel={() => navigate(-1)}
            isSubmitting={createModel.isPending || updateModel.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
