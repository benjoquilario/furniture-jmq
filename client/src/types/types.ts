export interface User {
  id: string
  name: string
  email: string
  hashedPassword: string
  role: string

  image: string

  createdAt: Date
  updatedAt: Date
}

export interface ISelectedFile {
  url: string
  furnitureId?: string
  id?: string
  key: string
}
