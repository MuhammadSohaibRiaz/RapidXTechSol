import type React from "react"
import { AdminAuth } from "@/components/admin-auth"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuth>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">{children}</div>
    </AdminAuth>
  )
}
