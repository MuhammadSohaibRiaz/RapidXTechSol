"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LogOut, Timer, User, Shield } from "lucide-react"
import { useAdminAuth } from "@/lib/auth"
import { useThemeContext } from "@/context/theme-context"

interface AdminLayoutProps {
  children: React.ReactNode
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { mode, color } = useThemeContext()
  const { logout, getRemainingSessionTime } = useAdminAuth()

  const [sessionTime, setSessionTime] = useState(0)

  // Update session timer
  useEffect(() => {
    const updateTimer = () => {
      const remaining = getRemainingSessionTime()
      setSessionTime(Math.ceil(remaining / 1000))
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [getRemainingSessionTime])

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen theme-bg theme-transition">
      {/* Admin Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`${getHeaderBgClass()} backdrop-blur-md border-b border-gray-300 dark:border-gray-700 sticky top-0 z-50 theme-transition`}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Admin Badge */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-primary" />
                <span className="font-semibold theme-text theme-transition">Admin Panel</span>
              </div>
              <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-primary/20 rounded-full">
                <User className="w-3 h-3 text-primary" />
                <span className="text-xs text-primary font-medium">Administrator</span>
              </div>
            </div>

            {/* Session Info & Logout */}
            <div className="flex items-center space-x-4">
              {/* Session Timer */}
              <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-green-500/20 rounded-full">
                <Timer className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-500 font-medium">{formatTime(sessionTime)}</span>
              </div>

              {/* Logout Button */}
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 hover:bg-red-500/20 hover:text-red-500 hover:border-red-500/50 transition-colors bg-transparent"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="theme-transition">{children}</main>

      {/* Session Warning */}
      {sessionTime <= 300 &&
        sessionTime > 0 && ( // 5 minutes warning
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-4 right-4 bg-yellow-500/90 text-black px-4 py-2 rounded-lg shadow-lg z-50"
          >
            <div className="flex items-center space-x-2">
              <Timer className="w-4 h-4" />
              <span className="text-sm font-medium">Session expires in {formatTime(sessionTime)}</span>
            </div>
          </motion.div>
        )}
    </div>
  )
}
