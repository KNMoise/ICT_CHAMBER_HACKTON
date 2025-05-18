"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"

export function MainNav() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const isAdmin = session?.user.role === "ADMIN" || session?.user.role === "OFFICIAL"
  const baseUrl = isAdmin ? "/admin" : "/dashboard"

  const routes = [
    {
      href: baseUrl,
      label: "Dashboard",
      active: pathname === baseUrl,
    },
    {
      href: `${baseUrl}/complaints`,
      label: "Complaints",
      active: pathname === `${baseUrl}/complaints`,
    },
  ]

  if (isAdmin) {
    routes.push({
      href: "/admin/users",
      label: "Users",
      active: pathname === "/admin/users",
    })
  }

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mr-4">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <span className="font-bold">CES</span>
      </Link>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-primary" : "text-muted-foreground",
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
