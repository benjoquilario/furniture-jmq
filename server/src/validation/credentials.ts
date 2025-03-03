import * as z from 'zod';

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const signUpSchema = signInSchema.extend({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  confirmPassword: z.string().min(3),
});

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
