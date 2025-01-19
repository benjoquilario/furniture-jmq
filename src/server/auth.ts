"use server"

import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
import db from "@/lib/db"
import { hashPassword } from "@/lib/utils"
import { validatedAction } from "@/lib/auth/middleware"
import { comparePasswords, setSession } from "@/lib/auth/session"
import * as z from "zod"
import { signUpSchema } from "@/lib/validations/credentials"

const signInSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(4).max(100),
})

export const login = validatedAction(signInSchema, async (data, _formData) => {
  const { email, password } = data

  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  })

  if (!user) {
    return {
      error: "Invalid email or password",
      email,
      password,
    }
  }

  const isPasswordValid = await comparePasswords(password, user.hashedPassword!)

  if (!isPasswordValid) {
    return {
      error: "Invalid email or password",
      email,
      password,
    }
  }

  await setSession(user)

  redirect("/")
})

export const signUp = validatedAction(signUpSchema, async (data, _formData) => {
  const { email, password, confirmPassword, firstName, lastName } = data

  const isEmailExist = await db.user.findFirst({
    where: { email },
  })

  if (isEmailExist) {
    return {
      error: "User already exist",
    }
  }

  const hashedPassword = await hashPassword(password)
  const randomNumber = Math.floor(Math.random() * 6) + 1

  if (password !== confirmPassword) {
    return {
      error: "The passwords did not match",
    }
  }

  const newUser = {
    role: "USER",
    email,
    hashedPassword: hashedPassword,
    name: `${firstName} ${lastName}`,
    image: `/avatar-${randomNumber}.png`,
  }

  await db.user.create({
    data: newUser,
  })

  redirect("/login")
})
