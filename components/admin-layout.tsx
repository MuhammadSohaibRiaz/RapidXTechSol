"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LogOut, Clock, Shield } from "lucide-react"
import { useThemeContext } from "@/context/theme-context"
import { useAdminAuth } from "@/lib/auth"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { mode, color } = useThemeContext()
  const { logout, sessionTimeRemaining, formatSessionTime, extendSession } = useAdminAuth()
  const [showExtendDialog, setShowExtendDialog] = useState(false)

  // Show extend session dialog when 5 minutes remaining
  useEffect(() => {
    if (sessionTimeRemaining > 0 && sessionTimeRemaining <= 5 * 60 * 1000 && !showExtendDialog) {
      setShowExtendDialog(true)
    }
  }, [sessionTimeRemaining, showExtendDialog])

  const getCardBgClass = () => {
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

  const handleExtendSession = () => {
    extendSession()
    setShowExtendDialog(false)
  }

  return (
    <div className="min-h-screen theme-bg theme-transition">
      {/* Admin Header */}
      <header
        className={`${getCardBgClass()} backdrop-blur-md border-b border-gray-300 dark:border-gray-600 theme-transition sticky top-0 z-40`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold theme-text theme-transition">Admin Panel</h1>
                <p className="text-xs theme-text opacity-60 theme-transition">Content Management System</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Session Timer */}
              <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono text-primary">{formatSessionTime(sessionTimeRemaining)}</span>
              </div>

              {/* Logout Button */}
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
      </header>

      {/* Main Content */}
      <main className="relative">{children}</main>

      {/* Session Extension Dialog */}
      {showExtendDialog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-6 w-full max-w-md shadow-2xl theme-transition`}
          >
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold theme-text theme-transition mb-2">Session Expiring Soon</h2>
              <p className="theme-text opacity-70 theme-transition">
                Your session will expire in {formatSessionTime(sessionTimeRemaining)}. Would you like to extend it?
              </p>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleExtendSession} className="flex-1 bg-primary hover:bg-primary/90 text-white">
                Extend Session
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowExtendDialog(false)}
                className="flex-1 bg-transparent theme-text border-gray-300 dark:border-gray-600"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Footer */}
      <footer
        className={`${getCardBgClass()} backdrop-blur-md border-t border-gray-300 dark:border-gray-600 theme-transition mt-12`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="text-center">
            <p className="text-sm theme-text opacity-60 theme-transition">
              © 2024 RapidXTech Admin Panel • Secure Content Management
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
