import NextAuth, { DefaultSession } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import db from "@/lib/db"
import Credentials from "next-auth/providers/credentials"
import { signInInputSchema } from "@/lib/validations/credentials"
import { comparePasswords } from "./lib/auth/session"
import { authConfig } from "@/auth.config"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
    } & DefaultSession["user"]
  }
}

const { providers: authConfigProviders, ...authConfigRest } = authConfig

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfigRest,
  // @ts-expect-error
  adapter: PrismaAdapter(db),
  providers: [
    ...authConfigProviders,
    Credentials({
      async authorize(credentials) {
        const validatedFields = await signInInputSchema.parseAsync(credentials)

        const { email, password } = validatedFields

        if (!email || !password) {
          return null
        }

        const user = await db.user.findFirst({
          where: {
            email,
          },
        })

        if (user && user.hashedPassword) {
          const isPasswordValid = await comparePasswords(
            password,
            user.hashedPassword
          )

          if (isPasswordValid) {
            return {
              id: user.id,
              image: user.image,
              email: user.email,
              name: user.name,
              role: user.role,
              emailVerified: user.emailVerified,
            }
          }
        }

        return null
      },
    }),
  ],
})
