import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      department?: string
    } & DefaultSession["user"]
  }
}
