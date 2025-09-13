"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Lock, User, AlertCircle, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useThemeContext } from "@/context/theme-context"

interface AdminAuthProps {
  onAuthenticated: () => void
}

const ADMIN_USERNAME = "rapidxadmin"
const ADMIN_PASSWORD = "RapidX2024@Admin"
const MAX_ATTEMPTS = 3
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes
const SESSION_DURATION = 30 * 60 * 1000 // 30 minutes
const WARNING_TIME = 5 * 60 * 1000 // 5 minutes

export function AdminAuth({ onAuthenticated }: AdminAuthProps) {
  const { mode, color } = useThemeContext()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)
  const [lockoutTime, setLockoutTime] = useState(0)
  const [sessionTime, setSessionTime] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Load stored data on mount
  useEffect(() => {
    const storedAttempts = localStorage.getItem("admin_attempts")
    const storedLockout = localStorage.getItem("admin_lockout")
    const storedSession = localStorage.getItem("admin_session")

    if (storedAttempts) {
      setAttempts(Number.parseInt(storedAttempts))
    }

    if (storedLockout) {
      const lockoutEnd = Number.parseInt(storedLockout)
      if (Date.now() < lockoutEnd) {
        setIsLocked(true)
        setLockoutTime(lockoutEnd)
      } else {
        localStorage.removeItem("admin_lockout")
        localStorage.removeItem("admin_attempts")
        setAttempts(0)
      }
    }

    if (storedSession) {
      const sessionEnd = Number.parseInt(storedSession)
      if (Date.now() < sessionEnd) {
        setSessionTime(sessionEnd)
        onAuthenticated()
      } else {
        localStorage.removeItem("admin_session")
      }
    }
  }, [onAuthenticated])

  // Timer effects
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isLocked && lockoutTime > 0) {
      interval = setInterval(() => {
        const remaining = lockoutTime - Date.now()
        if (remaining <= 0) {
          setIsLocked(false)
          setLockoutTime(0)
          setAttempts(0)
          localStorage.removeItem("admin_lockout")
          localStorage.removeItem("admin_attempts")
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isLocked, lockoutTime])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (sessionTime > 0) {
      interval = setInterval(() => {
        const remaining = sessionTime - Date.now()
        if (remaining <= WARNING_TIME && !showWarning) {
          setShowWarning(true)
        }
        if (remaining <= 0) {
          localStorage.removeItem("admin_session")
          setSessionTime(0)
          setShowWarning(false)
          // Force page reload to show login again
          window.location.reload()
        }
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [sessionTime, showWarning])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (isLocked) {
      setError("Account is locked. Please wait before trying again.")
      setIsLoading(false)
      return
    }

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Success
      const sessionEnd = Date.now() + SESSION_DURATION
      localStorage.setItem("admin_session", sessionEnd.toString())
      localStorage.removeItem("admin_attempts")
      localStorage.removeItem("admin_lockout")
      setSessionTime(sessionEnd)
      setAttempts(0)
      onAuthenticated()
    } else {
      // Failed attempt
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      localStorage.setItem("admin_attempts", newAttempts.toString())

      if (newAttempts >= MAX_ATTEMPTS) {
        const lockoutEnd = Date.now() + LOCKOUT_DURATION
        setIsLocked(true)
        setLockoutTime(lockoutEnd)
        localStorage.setItem("admin_lockout", lockoutEnd.toString())
        setError(`Too many failed attempts. Account locked for 15 minutes.`)
      } else {
        setError(`Invalid credentials. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`)
      }
    }

    setIsLoading(false)
  }

  const extendSession = () => {
    const newSessionEnd = Date.now() + SESSION_DURATION
    localStorage.setItem("admin_session", newSessionEnd.toString())
    setSessionTime(newSessionEnd)
    setShowWarning(false)
  }

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
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

  // Session warning dialog
  if (showWarning) {
    const remaining = sessionTime - Date.now()
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-8 max-w-md mx-4 shadow-xl`}
        >
          <div className="text-center">
            <Clock className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className={`text-xl font-bold ${getTextClass()} mb-2`}>Session Expiring Soon</h3>
            <p className={`${getSecondaryTextClass()} mb-4`}>
              Your session will expire in {formatTime(remaining)}. Would you like to extend it?
            </p>
            <div className="flex gap-3">
              <Button onClick={extendSession} className="flex-1 bg-primary hover:bg-primary/90 text-white">
                Extend Session
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem("admin_session")
                  window.location.reload()
                }}
                className="flex-1"
              >
                Logout
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen theme-bg theme-transition relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <motion.div
        className="absolute inset-0 theme-glow blur-3xl theme-transition opacity-20"
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
        className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-8 w-full max-w-md mx-4 shadow-xl relative z-10`}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className={`text-2xl font-bold ${getTextClass()} mb-2`}>Admin Access</h1>
          <p className={`${getSecondaryTextClass()}`}>Enter your credentials to access the admin panel</p>
        </div>

        {/* Session Timer */}
        {sessionTime > 0 && (
          <div className="mb-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-green-600 text-sm font-medium">Session Active</span>
              <span className="text-green-600 text-sm font-mono">{formatTime(sessionTime - Date.now())}</span>
            </div>
          </div>
        )}

        {/* Lockout Timer */}
        {isLocked && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-center mb-2">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-600 font-medium">Account Locked</span>
            </div>
            <p className="text-red-600 text-sm mb-2">Too many failed attempts</p>
            <div className="text-red-600 text-sm font-mono">Unlocks in: {formatTime(lockoutTime - Date.now())}</div>
          </div>
        )}

        {/* Attempt Counter */}
        {attempts > 0 && !isLocked && (
          <div className="mb-6 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-yellow-600 text-sm">Failed Attempts</span>
              <span className="text-yellow-600 text-sm font-bold">
                {attempts}/{MAX_ATTEMPTS}
              </span>
            </div>
            <div className="w-full bg-yellow-200 rounded-full h-2 mt-2">
              <div
                className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(attempts / MAX_ATTEMPTS) * 100}%` }}
              />
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium ${getTextClass()} mb-2`}>Username</label>
            <div className="relative">
              <User
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${getSecondaryTextClass()}`}
              />
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`pl-10 ${getTextClass()} bg-transparent border-gray-300 dark:border-gray-600`}
                placeholder="Enter username"
                disabled={isLocked || isLoading}
                required
              />
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium ${getTextClass()} mb-2`}>Password</label>
            <div className="relative">
              <Lock
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${getSecondaryTextClass()}`}
              />
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`pl-10 pr-10 ${getTextClass()} bg-transparent border-gray-300 dark:border-gray-600`}
                placeholder="Enter password"
                disabled={isLocked || isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${getSecondaryTextClass()} hover:text-primary`}
                disabled={isLocked || isLoading}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
            >
              <div className="flex items-center">
                <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                <span className="text-red-600 text-sm">{error}</span>
              </div>
            </motion.div>
          )}

          <Button
            type="submit"
            disabled={isLocked || isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Authenticating...
              </div>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className={`mt-6 text-center text-xs ${getSecondaryTextClass()}`}>
          <p>Secure admin access • Session timeout: 30 minutes</p>
          <p className="mt-1">Max attempts: {MAX_ATTEMPTS} • Lockout: 15 minutes</p>
        </div>
      </motion.div>
    </div>
  )
}
