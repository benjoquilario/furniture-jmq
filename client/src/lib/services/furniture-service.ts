import { Furniture } from "../validations/furnitures"

export const createFurniture = async (
  furniture: Furniture,
  accessToken: string
) => {
  try {
    const res = await fetch("http://localhost:4000/furniture/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(furniture),
    })

    const data = await res.json()

    return data
  } catch (error) {
    console.error("An error occurred while creating furniture", error)
  }
}
