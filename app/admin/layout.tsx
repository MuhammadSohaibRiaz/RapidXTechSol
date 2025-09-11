import type React from "react"

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen">{children}</div>
}
