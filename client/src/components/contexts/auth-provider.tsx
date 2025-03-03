import * as React from "react"

export interface Session {
  status: "authenticated" | "loading" | "unauthenticated"
  accessToken: string | null
  user: any | null
}

const sessionDefaultValue: Session = {
  status: "loading",
  accessToken: null,
  user: null,
}

export const AuthContext = React.createContext<{
  session: Session
  setSession: React.Dispatch<React.SetStateAction<Session>>
}>({
  session: sessionDefaultValue,
  setSession: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = React.useState(sessionDefaultValue)

  const refreshSession = async () => {
    const res = await fetch("http://localhost:4000/auth/refresh", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!res.ok) {
      setSession({ status: "unauthenticated", accessToken: null, user: null })
      return
    }

    const data = await res.json()

    setSession({ ...data, status: "authenticated" })
  }

  React.useEffect(() => {
    if (session.accessToken || session.user) return

    refreshSession()

    const interval = setInterval(refreshSession, 14 * 60 * 1000)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider value={{ session, setSession }}>
      {children}
    </AuthContext.Provider>
  )
}
