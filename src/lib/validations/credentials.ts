import * as z from "zod"

export const signInSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(4, {
    message: "Password is required",
  }),
})

export const signUpSchema = signInSchema
  .extend({
    firstName: z.string().min(3, {
      message: "FirstName must be at least 4 character",
    }),
    lastName: z.string().min(3, {
      message: "LastName must be at least 4 character",
    }),
    confirmPassword: z.string().min(3, {
      message: "Password must be at least 4 character",
    }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      })
    }
  })

export type SignIn = z.infer<typeof signInSchema>
export type SignUp = z.infer<typeof signUpSchema>
