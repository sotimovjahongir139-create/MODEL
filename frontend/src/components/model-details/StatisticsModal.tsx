import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { useAddStatistic } from "@/hooks/useStatistics";
import { extractErrorMessage } from "@/services/api";

const stageOptions: { value: "INTEREST" | "QUOTATIONS" | "SAMPLES" | "SALES"; label: string }[] = [
  { value: "INTEREST", label: "Qiziqish" },
  { value: "QUOTATIONS", label: "Taklif" },
  { value: "SAMPLES", label: "Namuna" },
  { value: "SALES", label: "Sotuv" },
];

const statisticSchema = z.object({
  interest: z.coerce.number().int().min(0, "0 dan kichik bo'lmasligi kerak"),
  quotations: z.coerce.number().int().min(0, "0 dan kichik bo'lmasligi kerak"),
  samples: z.coerce.number().int().min(0, "0 dan kichik bo'lmasligi kerak"),
  sales: z.coerce.number().int().min(0, "0 dan kichik bo'lmasligi kerak"),
  clients: z
    .array(
      z.object({
        name: z.string().min(1, "Mijoz ismini kiriting"),
        stage: z.enum(["INTEREST", "QUOTATIONS", "SAMPLES", "SALES"]),
      })
    )
    .optional(),
  note: z.string().optional(),
});

type StatisticFormValues = z.infer<typeof statisticSchema>;

interface StatisticsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modelId: string;
}

export function StatisticsModal({ open, onOpenChange, modelId }: StatisticsModalProps) {
  const addStatistic = useAddStatistic(modelId);

  const form = useForm<StatisticFormValues>({
    resolver: zodResolver(statisticSchema),
    defaultValues: { interest: 0, quotations: 0, samples: 0, sales: 0, clients: [], note: "" },
  });

  const clientsFieldArray = useFieldArray({
    control: form.control,
    name: "clients",
  });

  async function onSubmit(values: StatisticFormValues) {
    try {
      await addStatistic.mutateAsync(values);
      toast.success("Statistika qo'shildi");
      form.reset({ interest: 0, quotations: 0, samples: 0, sales: 0, clients: [], note: "" });
      onOpenChange(false);
    } catch (error) {
      toast.error(extractErrorMessage(error, "Statistika qo'shishda xatolik yuz berdi"));
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Statistika qo'shish</DialogTitle>
          <DialogDescription>
            Kiritilgan qiymatlar avvalgi umumiy natijalarga qo'shiladi, ustidan yozilmaydi.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="interest"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Qiziqish</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quotations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Taklif</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="samples"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Namuna</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sales"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sotuv</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        name={field.name}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.valueAsNumber || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <FormLabel>Mijozlar</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => clientsFieldArray.append({ name: "", stage: "INTEREST" })}
                >
                  <Plus className="size-4" />
                  Qo'shish
                </Button>
              </div>
              {clientsFieldArray.fields.map((clientField, index) => (
                <div key={clientField.id} className="flex items-start gap-2">
                  <FormField
                    control={form.control}
                    name={`clients.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="sr-only">Mijoz ismi</FormLabel>
                        <FormControl>
                          <Input placeholder="Mijoz ismini kiriting" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`clients.${index}.stage`}
                    render={({ field }) => (
                      <FormItem className="w-40">
                        <FormLabel className="sr-only">Bosqich</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Bosqich" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {stageOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mt-0.5"
                    onClick={() => clientsFieldArray.remove(index)}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Izoh (ixtiyoriy)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Qo'shimcha izoh..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Bekor qilish
              </Button>
              <Button type="submit" disabled={addStatistic.isPending}>
                {addStatistic.isPending ? "Saqlanmoqda..." : "Saqlash"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
