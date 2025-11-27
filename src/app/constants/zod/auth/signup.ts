import z from "zod";

const passwordField = z
  .string()
  .min(8, "Password must be at least 8 characters");

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid Email Address"),
  password: passwordField,
});

export const passwordSchema = z.object({
  password: passwordField,
});

export type TRegisterSchema = z.infer<typeof registerSchema>;
