"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useThemeContext } from "@/context/theme-context"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Button } from "@/components/ui/button"
import { LogOut, Settings, Home } from "lucide-react"
import { clearAdminSession } from "@/lib/auth"
import Link from "next/link"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { mode, color } = useThemeContext()

  const handleLogout = () => {
    clearAdminSession()
    window.location.href = "/admin"
  }

  const getHeaderBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/40"
    } else {
      return "bg-white/40"
    }
  }

  return (
    <div className="min-h-screen theme-bg theme-transition">
      {/* Admin Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${getHeaderBgClass()} backdrop-blur-md border-b border-gray-300 dark:border-gray-600 theme-transition sticky top-0 z-50`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <Home className="w-5 h-5 theme-text" />
                <span className="font-bold theme-text theme-transition">RapidXSolution</span>
              </Link>
              <div className="hidden md:block w-px h-6 bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center space-x-2">
                <Settings className="w-4 h-4 text-primary" />
                <span className="font-medium theme-text theme-transition">Admin Dashboard</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeSwitcher />
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="bg-transparent theme-text border-gray-300 dark:border-gray-600 hover:bg-red-50 hover:border-red-300 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:border-red-600 dark:hover:text-red-400"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative">{children}</main>

      {/* Admin Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`${getHeaderBgClass()} backdrop-blur-md border-t border-gray-300 dark:border-gray-600 theme-transition mt-auto`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm theme-text opacity-60 theme-transition">
            <p>© 2024 RapidXSolution Admin Panel</p>
            <p>Secure Admin Access</p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
