import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

import DateRangePicker from "@/components/date-picker/date-range-picker";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

function HookformDateRange<T extends FieldValues>({
  form,
  name,
  label,
  isRequired = false,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  isRequired?: boolean;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>
            {label}
            {isRequired && <span className="">*</span>}
          </FormLabel>
          <FormControl>
            <DateRangePicker
              value={field.value}
              onChange={field.onChange}
            />
          </FormControl>
          <div className="min-h-5 pt-1">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}

export default HookformDateRange;
