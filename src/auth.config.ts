import type { NextAuthConfig } from "next-auth"

declare module "next-auth" {
  interface User {
    role?: string
  }
}

export const authConfig = {
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === "update") {
        return { ...token, ...session.user }
      }

      if (user?.id) token.id = user.id
      if (user?.role) token.role = user.role

      return token
    },
    session: ({ session, token }) => {
      session.user.id = token.id as string
      session.user.role = token.role as string

      return session
    },
    authorized({ auth, request }) {
      const { nextUrl } = request

      const isLoggedIn = !!auth?.user
      const isOnProfile = nextUrl.pathname.startsWith("/dashboard")
      const isOnAuth =
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/sign-up")

      if (isOnProfile) {
        if (isLoggedIn) return true
        return Response.redirect(new URL("/login", nextUrl))
      }

      if (isOnAuth) {
        if (!isLoggedIn) return true
        return Response.redirect(new URL("/dashboard", nextUrl))
      }

      return true
    },
  },
  providers: [],
} satisfies NextAuthConfig
