import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { Input } from "../ui/input";

function HookformInput<T extends FieldValues>({
  form,
  name,
  label,
  placeholder,
  type = "text",
  isRequired = false,
}: {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
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
            <Input
              type={type}
              placeholder={placeholder}
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

export default HookformInput;
