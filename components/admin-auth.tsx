"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, Eye, EyeOff, AlertCircle } from "lucide-react"
import { useThemeContext } from "@/context/theme-context"
import { authenticateAdmin } from "@/lib/auth"

interface AdminAuthProps {
  onAuthenticated: () => void
}

export function AdminAuth({ onAuthenticated }: AdminAuthProps) {
  const { mode, color } = useThemeContext()
  const [pin, setPin] = useState("")
  const [showPin, setShowPin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [attempts, setAttempts] = useState(0)

  const getCardBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/40"
    } else {
      return "bg-white/40"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!pin.trim()) {
      setError("Please enter the admin PIN")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const result = await authenticateAdmin(pin)

      if (result.success) {
        onAuthenticated()
      } else {
        setError(result.error || "Invalid PIN")
        setAttempts((prev) => prev + 1)
        setPin("")

        // Add delay after failed attempts
        if (attempts >= 2) {
          setTimeout(() => setIsLoading(false), 2000)
        } else {
          setIsLoading(false)
        }
      }
    } catch (error) {
      setError("Authentication failed. Please try again.")
      setIsLoading(false)
    }
  }

  const isBlocked = attempts >= 5

  return (
    <div className="min-h-screen theme-bg theme-transition relative overflow-hidden flex items-center justify-center">
      {/* Background */}
      <div className="absolute inset-0">
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
      </div>

      {/* Auth Form */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className={`${getCardBgClass()} backdrop-blur-md rounded-2xl p-8 w-full max-w-md mx-4 shadow-2xl theme-transition relative z-10`}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mb-4"
          >
            <Lock className="w-8 h-8 text-primary" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold bg-clip-text text-transparent theme-gradient-text theme-transition mb-2"
          >
            Admin Access
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="theme-text opacity-70 theme-transition"
          >
            Enter your PIN to access the dashboard
          </motion.p>
        </div>

        {isBlocked ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-500 mb-2">Access Blocked</h3>
            <p className="theme-text opacity-70 theme-transition text-sm">
              Too many failed attempts. Please try again later.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* PIN Input */}
            <div>
              <label htmlFor="pin" className="block text-sm font-medium theme-text mb-2 theme-transition">
                Admin PIN
              </label>
              <div className="relative">
                <Input
                  id="pin"
                  type={showPin ? "text" : "password"}
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter your PIN"
                  className="theme-text bg-transparent pr-10"
                  disabled={isLoading}
                  maxLength={10}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 theme-text opacity-50 hover:opacity-100 transition-opacity"
                  disabled={isLoading}
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!pin.trim() || isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Authenticating...</span>
                </div>
              ) : (
                "Access Dashboard"
              )}
            </Button>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center space-x-2 text-red-500 text-sm"
              >
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Attempts Counter */}
            {attempts > 0 && (
              <p className="text-center text-sm theme-text opacity-50 theme-transition">
                Failed attempts: {attempts}/5
              </p>
            )}
          </motion.form>
        )}

        {/* Security Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 pt-4 border-t border-gray-300 dark:border-gray-600"
        >
          <p className="text-center text-xs theme-text opacity-40 theme-transition">
            Authorized personnel only. All access attempts are logged.
          </p>
        </motion.div>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="absolute -top-2 -right-2 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium"
        >
          Secure
        </motion.div>
      </motion.div>
    </div>
  )
}
