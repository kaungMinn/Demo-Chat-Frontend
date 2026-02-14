import { zodResolver } from "@hookform/resolvers/zod";
import { Bot, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { GridScan } from "@/components/grid-scan";
import PrimaryLoading from "@/components/loadings/primary-loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/features/auth/auth.hooks";
import { ConversationRoutes } from "@/features/conversations/conversation.routes";
import { cn } from "@/lib/utils";

import type { LoginFormHookFormType } from "./hookform";

import { LoginFormHookForm } from "./hookform";

function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginFormHookFormType>({ resolver: zodResolver(LoginFormHookForm.schema), defaultValues: LoginFormHookForm.defaultValues });

  const { mutateAsync: loginMutationAsync, isPending } = useAuth.loginMutation();

  const onSubmit = async (data: LoginFormHookFormType) => {
    await loginMutationAsync(data).then((response) => {
      if (response?.data?.success) {
        navigate(`${ConversationRoutes.paths.cover}`, {
          state: {
            userId: response?.data?.details?.user?.userId,
          },
        });
      }
    });
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-black">

        {/* <DarkVeil hueShift={55} noiseIntensity={0} scanlineFrequency={20} speed={2} warpAmount={0} resolutionScale={1} /> */}
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          gridScale={0.1}
          scanColor="#00b843"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>

      <div className={cn("light z-50 relative h-screen w-screen  flex flex-col gap-5 items-center justify-center")}>

        <div className="flex flex-col gap-5 items-center text-white">
          <Bot size={50} />
          <Label>Bleep</Label>
        </div>
        <Card className="w-100 ">

          <CardHeader>
            <CardTitle className="flex justify-between items-end">
              Login

            </CardTitle>

          </CardHeader>

          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="email">Email *</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    {...form.register("email")}
                  />

                  {form.formState.errors && <Label className="text-red-500">{form.formState.errors.email?.message}</Label>}
                </Field>

                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password *</FieldLabel>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="Enter password"
                      type={showPassword ? "text" : "password"}
                      required
                      {...form.register("password")}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {form.formState.errors && <Label className="text-red-500">{form.formState.errors.password?.message}</Label>}
                </Field>
                <Field>
                  <Button disabled={isPending} type="submit" className="cursor-pointer">{isPending ? <PrimaryLoading /> : "Login"}</Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoginForm;
