"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LogOut, Clock, AlertTriangle, Shield, RefreshCw } from "lucide-react"
import { useThemeContext } from "@/context/theme-context"
import { useAdminAuth } from "@/lib/auth"

interface AdminLayoutProps {
  children: React.ReactNode
}

const SESSION_DURATION = 30 * 60 * 1000 // 30 minutes
const WARNING_TIME = 5 * 60 * 1000 // 5 minutes before expiry

export function AdminLayout({ children }: AdminLayoutProps) {
  const { mode, color } = useThemeContext()
  const { logout } = useAdminAuth()
  const [sessionEnd, setSessionEnd] = useState<number | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const [showExtendDialog, setShowExtendDialog] = useState(false)

  useEffect(() => {
    // Initialize or restore session
    const storedSession = localStorage.getItem("admin_session_end")
    if (storedSession) {
      const sessionEndTime = Number.parseInt(storedSession)
      if (Date.now() < sessionEndTime) {
        setSessionEnd(sessionEndTime)
      } else {
        // Session expired
        logout()
        return
      }
    } else {
      // New session
      const newSessionEnd = Date.now() + SESSION_DURATION
      setSessionEnd(newSessionEnd)
      localStorage.setItem("admin_session_end", newSessionEnd.toString())
    }
  }, [logout])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (sessionEnd) {
      interval = setInterval(() => {
        const remaining = Math.max(0, sessionEnd - Date.now())
        setTimeRemaining(remaining)

        if (remaining === 0) {
          logout()
        } else if (remaining <= WARNING_TIME && !showWarning) {
          setShowWarning(true)
          setShowExtendDialog(true)
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [sessionEnd, showWarning, logout])

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const extendSession = () => {
    const newSessionEnd = Date.now() + SESSION_DURATION
    setSessionEnd(newSessionEnd)
    localStorage.setItem("admin_session_end", newSessionEnd.toString())
    setShowWarning(false)
    setShowExtendDialog(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_session_end")
    logout()
  }

  const getCardBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/90 border border-gray-700/50"
    } else {
      return "bg-white/95 border border-gray-200/50"
    }
  }

  const getTextClass = () => {
    if (mode === "dark" || color === "black") {
      return "text-white"
    } else {
      return "text-gray-900"
    }
  }

  const getSecondaryTextClass = () => {
    if (mode === "dark" || color === "black") {
      return "text-gray-300"
    } else {
      return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen theme-bg theme-transition">
      {/* Admin Header */}
      <div className={`${getCardBgClass()} backdrop-blur-md border-b shadow-lg theme-transition sticky top-0 z-40`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className={`text-lg font-bold ${getTextClass()} theme-transition`}>Admin Panel</h1>
                <p className={`text-xs ${getSecondaryTextClass()} theme-transition`}>RapidXTech CMS</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Session Timer */}
              <div className="flex items-center space-x-2">
                <Clock className={`w-4 h-4 ${timeRemaining <= WARNING_TIME ? "text-orange-500" : "text-primary"}`} />
                <span className={`text-sm font-mono ${getTextClass()} theme-transition`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>

              {/* Session Warning Indicator */}
              {showWarning && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"
                />
              )}

              {/* Logout Button */}
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className={`${getTextClass()} border-red-500/30 hover:bg-red-500/10 hover:border-red-500/50`}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">{children}</div>

      {/* Session Extension Dialog */}
      <AnimatePresence>
        {showExtendDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-6 w-full max-w-md shadow-2xl theme-transition`}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-orange-500" />
                </div>
                <h2 className={`text-xl font-bold ${getTextClass()} mb-2 theme-transition`}>Session Expiring Soon</h2>
                <p className={`${getSecondaryTextClass()} theme-transition`}>
                  Your admin session will expire in {formatTime(timeRemaining)}
                </p>
              </div>

              <div className="flex gap-3">
                <Button onClick={extendSession} className="flex-1 bg-primary hover:bg-primary/90 text-white">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Extend Session
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="flex-1 border-red-500/30 text-red-500 hover:bg-red-500/10 bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>

              <div className="mt-4 text-center">
                <p className={`text-xs ${getSecondaryTextClass()} theme-transition`}>
                  Session will be extended by 30 minutes
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
