import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAddStatistic } from "@/hooks/useStatistics";
import { extractErrorMessage } from "@/services/api";

const statisticSchema = z.object({
  interest: z.coerce.number().int().min(0, "0 dan kichik bo'lmasligi kerak"),
  quotations: z.coerce.number().int().min(0, "0 dan kichik bo'lmasligi kerak"),
  samples: z.coerce.number().int().min(0, "0 dan kichik bo'lmasligi kerak"),
  sales: z.coerce.number().int().min(0, "0 dan kichik bo'lmasligi kerak"),
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
    defaultValues: { interest: 0, quotations: 0, samples: 0, sales: 0, note: "" },
  });

  async function onSubmit(values: StatisticFormValues) {
    try {
      await addStatistic.mutateAsync(values);
      toast.success("Statistika qo'shildi");
      form.reset({ interest: 0, quotations: 0, samples: 0, sales: 0, note: "" });
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
