"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LogOut, Shield, Home } from "lucide-react"
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
      return "bg-gray-900/40"
    } else {
      return "bg-white/40"
    }
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout()
      window.location.reload()
    }
  }

  return (
    <div className="min-h-screen theme-bg theme-transition">
      {/* Admin Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${getHeaderBgClass()} backdrop-blur-md border-b border-gray-200 dark:border-gray-700 theme-transition sticky top-0 z-40`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold theme-text theme-transition">Admin Panel</h1>
                <p className="text-xs theme-text opacity-60 theme-transition">RapidXTech CMS</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent theme-text border-gray-300 dark:border-gray-600"
                >
                  <Home className="w-4 h-4 mr-2" />
                  View Site
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="bg-transparent theme-text border-gray-300 dark:border-gray-600 hover:bg-red-50 hover:border-red-300 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:border-red-700 dark:hover:text-red-400"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Admin Content */}
      <main>{children}</main>
    </div>
  )
}
