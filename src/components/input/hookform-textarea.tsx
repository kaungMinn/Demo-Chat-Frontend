import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Textarea } from "../ui/textarea";

function HookformTextarea<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  isRequired = false,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
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
            <Textarea
              placeholder={placeholder}
              className="min-h-40"

              {...field}
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

export default HookformTextarea;
