"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, Lock, Timer, AlertTriangle, CheckCircle } from "lucide-react"
import { useAdminAuth } from "@/lib/auth"
import { useThemeContext } from "@/context/theme-context"

interface AdminAuthProps {
  onAuthenticated: () => void
}

export function AdminAuth({ onAuthenticated }: AdminAuthProps) {
  const { mode, color } = useThemeContext()
  const { authenticate, attempts, isLocked, getLockoutRemainingTime } = useAdminAuth()

  const [pin, setPin] = useState("")
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")
  const [lockoutTime, setLockoutTime] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Update lockout timer
  useEffect(() => {
    if (isLocked) {
      const updateTimer = () => {
        const remaining = getLockoutRemainingTime()
        setLockoutTime(Math.ceil(remaining / 1000))

        if (remaining <= 0) {
          setMessage("")
          setMessageType("")
        }
      }

      updateTimer()
      const interval = setInterval(updateTimer, 1000)
      return () => clearInterval(interval)
    }
  }, [isLocked, getLockoutRemainingTime])

  const getCardBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/40"
    } else {
      return "bg-white/40"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!pin.trim() || isLocked || isLoading) return

    setIsLoading(true)
    setMessage("")
    setMessageType("")

    try {
      const result = authenticate(pin)

      if (result.success) {
        setMessage("Access granted! Redirecting...")
        setMessageType("success")
        setPin("")
        setTimeout(() => {
          onAuthenticated()
        }, 1000)
      } else {
        setMessage(result.message)
        setMessageType("error")
        setPin("")
      }
    } catch (error) {
      setMessage("Authentication error. Please try again.")
      setMessageType("error")
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

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
            <Shield className="w-8 h-8 text-primary" />
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

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* PIN Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 theme-text opacity-40" />
            </div>
            <Input
              type="password"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              disabled={isLocked || isLoading}
              maxLength={6}
              className="pl-10 text-center text-lg tracking-wider theme-text bg-transparent border-2"
              autoComplete="off"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!pin.trim() || isLocked || isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              "Access Dashboard"
            )}
          </Button>
        </motion.form>

        {/* Status Messages */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 p-3 rounded-lg flex items-center space-x-2 ${
              messageType === "success" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
            }`}
          >
            {messageType === "success" ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            <span className="text-sm">{message}</span>
          </motion.div>
        )}

        {/* Lockout Timer */}
        {isLocked && lockoutTime > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center space-x-2"
          >
            <Timer className="w-4 h-4" />
            <span className="text-sm">Locked for: {formatTime(lockoutTime)}</span>
          </motion.div>
        )}

        {/* Security Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 pt-4 border-t border-gray-300 dark:border-gray-600"
        >
          <div className="flex items-center justify-between text-xs theme-text opacity-50 theme-transition">
            <span>Attempts: {attempts}/5</span>
            <span>Session: 30min</span>
          </div>
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
