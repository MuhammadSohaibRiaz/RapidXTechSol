"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LogOut, Home, Settings, User } from "lucide-react"
import { useThemeContext } from "@/context/theme-context"
import { useAdminAuth } from "@/lib/auth"
import Link from "next/link"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { mode, color } = useThemeContext()
  const { logout } = useAdminAuth()

  const getHeaderBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/60"
    } else {
      return "bg-white/60"
    }
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout()
    }
  }

  return (
    <div className="min-h-screen theme-bg theme-transition">
      {/* Admin Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${getHeaderBgClass()} backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 theme-transition`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="w-8 h-8 bg-gradient-to-r theme-gradient-text rounded-lg flex items-center justify-center"
              >
                <Settings className="w-4 h-4 text-white" />
              </motion.div>
              <div>
                <h1 className="text-lg font-bold theme-text theme-transition">Admin Panel</h1>
                <p className="text-xs theme-text opacity-60 theme-transition">RapidXSolution CMS</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="theme-text hover:bg-primary/10">
                  <Home className="w-4 h-4 mr-2" />
                  View Site
                </Button>
              </Link>

              <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10">
                <User className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Admin</span>
              </div>

              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600 hover:bg-red-50">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Admin Content */}
      <main className="relative">{children}</main>

      {/* Admin Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`${getHeaderBgClass()} backdrop-blur-md border-t border-gray-200 dark:border-gray-700 mt-16 theme-transition`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-sm theme-text opacity-60 theme-transition">
            <p>&copy; 2024 RapidXSolution. All rights reserved.</p>
            <p>Admin Panel v1.0</p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
