import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeContextProvider } from "@/context/theme-context"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeContextProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <div className="min-h-screen">{children}</div>
      </ThemeProvider>
    </ThemeContextProvider>
  )
}
