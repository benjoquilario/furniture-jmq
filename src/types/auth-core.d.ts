import type { AdapterUser as DefaultAdapterUser } from "@auth/core/adapters"
import { type User } from "@prisma/client"

declare module "@auth/core/adapters" {
  export interface AdapterUser extends DefaultAdapterUser {
    role: User["role"]
  }
}
