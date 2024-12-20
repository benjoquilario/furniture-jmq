import NextAuth, { DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import db from "@/lib/db"
import { signInSchema } from "./lib/validations/credentials"
import { comparePasswords } from "./lib/utils"
import { authConfig } from "./auth.config"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "eassword", type: "password" },
      },
      authorize: async (credentials) => {
        const validatedFiels = signInSchema.safeParse(credentials)

        if (validatedFiels.success) {
          const { email, password } = validatedFiels.data

          if (!email || !password) throw new Error("Missing fields")

          const user = await db.user.findUnique({
            where: {
              email: email,
            },
          })

          if (!user) throw new Error("User not found")

          const isPasswordValid = await comparePasswords(
            password,
            user.hashedPassword!
          )

          if (!isPasswordValid) return null

          return {
            id: user.id,
            image: user.image,
            email: user.email,
            name: user.name,
          }
        }

        return null
      },
    }),
  ],
})
