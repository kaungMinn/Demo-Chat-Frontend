import z from "zod";

const schema = z.object({
  email: z.string().nonempty("Email is required"),
  password: z.string().nonempty("Password is required").min(4, "Password must be at least 4"),
});

export type LoginFormHookFormType = z.infer<typeof schema>;

const defaultValues: LoginFormHookFormType = {
  email: "",
  password: "",
};

export const LoginFormHookForm = { schema, defaultValues };
