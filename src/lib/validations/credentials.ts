import * as z from "zod"

export const signInInputSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const signUpInputSchema = signInInputSchema
  .extend({
    confirmPassword: z
      .string()
      .min(3, "Confirm password must be at least 3 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export type SignInInput = z.infer<typeof signInInputSchema>
export type SignUpInput = z.infer<typeof signUpInputSchema>
