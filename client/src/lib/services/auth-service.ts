export const login = async (email: string, password: string) => {
  try {
    const res = await fetch("http://localhost:4000/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    return data
  } catch (error) {
    console.error("An error occurred while logging in", error)
  }
}
