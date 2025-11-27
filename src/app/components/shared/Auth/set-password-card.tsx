"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { passwordSchema } from "@/src/app/constants/zod/auth/signup";
import { useAuthMutations } from "@/src/app/hooks/useAuthMutations";
import { useSession } from "next-auth/react";

const setPasswordSchema = passwordSchema
  .extend({
    confirmPassword: z.string().min(8, "Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type SetPasswordFormValues = z.infer<typeof setPasswordSchema>;

export default function SetPasswordCard() {
  const { setPasswordMutation } = useAuthMutations();
  const { update } = useSession();
  const [formMessage, setFormMessage] = useState<{
    type: "error" | "success";
    content: string;
  } | null>(null);

  const form = useForm<SetPasswordFormValues>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SetPasswordFormValues) => {
    try {
      setFormMessage(null);
      await setPasswordMutation.mutateAsync({
        password: values.password,
      });
      await update({ hasPassword: true });
      setFormMessage({
        type: "success",
        content: "Password set! You can now sign in with email and password.",
      });
      form.reset();
    } catch (error) {
      setFormMessage({
        type: "error",
        content:
          error instanceof Error
            ? error.message
            : "Unable to set password right now.",
      });
    }
  };

  const isSubmitting = setPasswordMutation.isPending;

  return (
    <div className='rounded-2xl border border-purple-500/30 bg-black/60 p-6 text-white shadow-lg'>
      <h2 className='text-xl font-semibold mb-2'>Add a password</h2>
      <p className='text-sm text-gray-300 mb-4'>
        You signed up with Google. Set a password so you can also log in with
        email and password.
      </p>

      {formMessage && (
        <div
          className={`mb-4 rounded-lg border px-3 py-2 text-sm ${
            formMessage.type === "success"
              ? "border-green-500/50 bg-green-500/10 text-green-200"
              : "border-red-500/50 bg-red-500/10 text-red-200"
          }`}
        >
          {formMessage.content}
        </div>
      )}

      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='new-password' className='text-gray-200'>
            New password
          </Label>
          <Input
            id='new-password'
            type='password'
            {...form.register("password")}
            placeholder='••••••••'
            className='bg-black/50 border-purple-500/50 text-white placeholder:text-gray-500 focus:border-purple-400'
          />
          {form.formState.errors.password && (
            <p className='text-xs text-red-300'>
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='confirm-password' className='text-gray-200'>
            Confirm password
          </Label>
          <Input
            id='confirm-password'
            type='password'
            {...form.register("confirmPassword")}
            placeholder='••••••••'
            className='bg-black/50 border-purple-500/50 text-white placeholder:text-gray-500 focus:border-purple-400'
          />
          {form.formState.errors.confirmPassword && (
            <p className='text-xs text-red-300'>
              {form.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type='submit'
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className='w-full bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-60'
        >
          {isSubmitting ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Saving...
            </>
          ) : (
            "Save password"
          )}
        </Button>
      </form>
    </div>
  );
}
