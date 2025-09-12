"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, AlertTriangle, Shield, Eye, EyeOff } from "lucide-react"
import { useThemeContext } from "@/context/theme-context"
import { useAdminAuth } from "@/lib/auth"

interface AdminAuthProps {
  onAuthenticated: () => void
}

export function AdminAuth({ onAuthenticated }: AdminAuthProps) {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { mode, color } = useThemeContext()
  const { login, failedAttempts, isLockedOut, lockoutTimeRemaining, getRemainingAttempts, formatLockoutTime } =
    useAdminAuth()

  const getCardBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/40"
    } else {
      return "bg-white/40"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (isLockedOut) {
      setError(`Account locked. Try again in ${formatLockoutTime(lockoutTimeRemaining)}`)
      return
    }

    if (!password.trim()) {
      setError("Please enter the admin password")
      return
    }

    setIsLoading(true)

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const success = login(password)
    if (success) {
      onAuthenticated()
    } else {
      setPassword("")
      if (isLockedOut) {
        setError(`Too many failed attempts. Account locked for ${formatLockoutTime(lockoutTimeRemaining)}`)
      } else {
        const remaining = getRemainingAttempts()
        setError(`Invalid password. ${remaining} attempt${remaining !== 1 ? "s" : ""} remaining.`)
      }
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen theme-bg theme-transition relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <motion.div
        className="absolute inset-0 theme-glow blur-3xl theme-transition"
        animate={{
          x: ["0%", "100%", "0%"],
          y: ["0%", "50%", "0%"],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-8 w-full max-w-md shadow-2xl theme-transition relative z-10`}
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4"
          >
            {isLockedOut ? <AlertTriangle className="w-8 h-8 text-white" /> : <Shield className="w-8 h-8 text-white" />}
          </motion.div>
          <h1 className="text-2xl font-bold theme-text theme-transition mb-2">Admin Access</h1>
          <p className="theme-text opacity-70 theme-transition">
            {isLockedOut ? "Account temporarily locked" : "Enter your password to access the admin panel"}
          </p>
        </div>

        {isLockedOut ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg p-4 mb-6">
              <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 mx-auto mb-2" />
              <p className="text-red-800 dark:text-red-200 text-sm">
                Too many failed attempts. Please wait {formatLockoutTime(lockoutTimeRemaining)} before trying again.
              </p>
            </div>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium theme-text mb-2 theme-transition">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 theme-text opacity-50" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="pl-10 pr-10 theme-text bg-transparent border-gray-300 dark:border-gray-600"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 theme-text opacity-50 hover:opacity-80 transition-opacity"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg p-3"
              >
                <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
              </motion.div>
            )}

            {failedAttempts > 0 && !isLockedOut && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-3"
              >
                <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                  {getRemainingAttempts()} attempt{getRemainingAttempts() !== 1 ? "s" : ""} remaining before lockout
                </p>
              </motion.div>
            )}

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white"
              disabled={isLoading || isLockedOut}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Authenticating...
                </div>
              ) : isLockedOut ? (
                "Account Locked"
              ) : (
                "Access Admin Panel"
              )}
            </Button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-xs theme-text opacity-50 theme-transition">
            Secure admin access • Session expires in 30 minutes
          </p>
        </div>
      </motion.div>
    </div>
  )
}
