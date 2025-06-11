"use server"

import { signIn, signOut } from "@/auth"
import {
  type SignInInput,
  type SignUpInput,
  signInInputSchema,
  signUpInputSchema,
} from "@/lib/validations/credentials"
import { AuthError } from "next-auth"
import db from "@/lib/db"
import { hashPassword } from "@/lib/auth/session"

type Res =
  | { success: true }
  | { success: false; error: string; statusCode: 401 | 500 }

export const login = async (values: SignInInput): Promise<Res> => {
  try {
    const validatedFields = signInInputSchema.safeParse(values)

    if (!validatedFields.success) {
      return {
        success: false,
        statusCode: 401,
        error: "Invalid Fields",
      }
    }

    await signIn("credentials", { ...values, redirect: false })

    return { success: true }
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
        case "CallbackRouteError":
          return {
            success: false,
            error: "Invalid credentials",
            statusCode: 401,
          }
        case "AccessDenied":
          return {
            success: false,
            error:
              "Please verify your email, sign up again to resend verification email",
            statusCode: 401,
          }
        // custom error
        case "OAuthAccountAlreadyLinked" as AuthError["type"]:
          return {
            success: false,
            error: "Login with your Google or Github account",
            statusCode: 401,
          }
        default:
          return {
            success: false,
            error: "Oops. Something went wrong",
            statusCode: 500,
          }
      }
    }

    console.error(err)
    return { success: false, error: "Internal Server Error", statusCode: 500 }
  }
}

export async function signUp(values: SignUpInput): Promise<Res> {
  const validatedFields = signUpInputSchema.safeParse(values)

  if (!validatedFields.success) {
    return { success: false, error: "Invalid Fields", statusCode: 401 }
  }

  const { email, password, confirmPassword } = validatedFields.data

  try {
    // const isEmailInvited = await db.inviteTeam.findFirst({
    //   where: {
    //     email,
    //   },
    // })

    // if (!isEmailInvited) {
    //   return {
    //     success: false,
    //     error: "You're not invited to join the team",
    //     statusCode: 401,
    //   }
    // }

    const existingUser = await db.user.findFirst({
      where: {
        email,
      },
    })

    if (existingUser)
      return {
        statusCode: 401,
        success: false,
        error: "Email already exists",
      }

    if (password !== confirmPassword) {
      return { error: "Passwords don't match", success: false, statusCode: 401 }
    }

    const passwordHash = await hashPassword(password)

    await db.user.create({
      data: {
        email,
        hashedPassword: passwordHash,
      },
    })

    return {
      success: true,
    }
  } catch (err) {
    console.error(err)
    return { success: false, error: "Internal Server Error", statusCode: 500 }
  }
}

export async function logout() {
  return await signOut()
}
