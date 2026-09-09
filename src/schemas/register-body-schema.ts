import * as z from "zod";

export const registerBodySchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z
    .email("Email must be a valid email")
    .max(50, "Email must be at most 50 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(40, "Password must be at most 20 characters"),
});

export type RegisterBodySchema = z.infer<typeof registerBodySchema>;