import type { FieldValues, UseFormReturn } from "react-hook-form";

import { dataUtils } from "@/utils/data";

import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import ImageInput from "./image-input";

function HookFormImageInput<T extends FieldValues>({ form, name }: { form: UseFormReturn<T>; name: keyof T }) {
  return (
    <FormField
      control={form.control}
      name={name as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Attachment Image</FormLabel>
          <FormControl>
            <ImageInput
              initialImageUrl={typeof field.value === "object" ? URL.createObjectURL(field.value) : (field.value && typeof field.value === "string") ? dataUtils.imgURL(field.value, "small") : field.value}
              onFileChange={file => field.onChange(file)}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export default HookFormImageInput;
