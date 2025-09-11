import type React from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeContextProvider } from "@/context/theme-context"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeContextProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </ThemeProvider>
    </ThemeContextProvider>
  )
}
