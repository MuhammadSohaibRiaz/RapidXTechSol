"use client"

import { useState, useEffect } from "react"

const ADMIN_PIN = "2024"
const SESSION_KEY = "admin_session"
const FAILED_ATTEMPTS_KEY = "admin_failed_attempts"
const LOCKOUT_KEY = "admin_lockout"
const SESSION_DURATION = 30 * 60 * 1000 // 30 minutes
const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

interface AdminSession {
  authenticated: boolean
  timestamp: number
}

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [failedAttempts, setFailedAttempts] = useState(0)
  const [isLockedOut, setIsLockedOut] = useState(false)
  const [lockoutTimeRemaining, setLockoutTimeRemaining] = useState(0)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isLockedOut && lockoutTimeRemaining > 0) {
      interval = setInterval(() => {
        setLockoutTimeRemaining((prev) => {
          if (prev <= 1000) {
            setIsLockedOut(false)
            localStorage.removeItem(LOCKOUT_KEY)
            localStorage.removeItem(FAILED_ATTEMPTS_KEY)
            setFailedAttempts(0)
            return 0
          }
          return prev - 1000
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isLockedOut, lockoutTimeRemaining])

  const checkAuthStatus = () => {
    try {
      // Check lockout status
      const lockoutData = localStorage.getItem(LOCKOUT_KEY)
      if (lockoutData) {
        const lockoutTime = Number.parseInt(lockoutData)
        const timeRemaining = lockoutTime - Date.now()
        if (timeRemaining > 0) {
          setIsLockedOut(true)
          setLockoutTimeRemaining(timeRemaining)
          setIsLoading(false)
          return
        } else {
          localStorage.removeItem(LOCKOUT_KEY)
          localStorage.removeItem(FAILED_ATTEMPTS_KEY)
        }
      }

      // Check failed attempts
      const attempts = localStorage.getItem(FAILED_ATTEMPTS_KEY)
      if (attempts) {
        setFailedAttempts(Number.parseInt(attempts))
      }

      // Check session
      const sessionData = localStorage.getItem(SESSION_KEY)
      if (sessionData) {
        const session: AdminSession = JSON.parse(sessionData)
        const isExpired = Date.now() - session.timestamp > SESSION_DURATION

        if (session.authenticated && !isExpired) {
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem(SESSION_KEY)
        }
      }
    } catch (error) {
      console.error("Error checking auth status:", error)
      localStorage.removeItem(SESSION_KEY)
    }
    setIsLoading(false)
  }

  const authenticate = (pin: string): boolean => {
    if (isLockedOut) {
      return false
    }

    if (pin === ADMIN_PIN) {
      const session: AdminSession = {
        authenticated: true,
        timestamp: Date.now(),
      }
      localStorage.setItem(SESSION_KEY, JSON.stringify(session))
      localStorage.removeItem(FAILED_ATTEMPTS_KEY)
      setIsAuthenticated(true)
      setFailedAttempts(0)
      return true
    } else {
      const newAttempts = failedAttempts + 1
      setFailedAttempts(newAttempts)
      localStorage.setItem(FAILED_ATTEMPTS_KEY, newAttempts.toString())

      if (newAttempts >= MAX_ATTEMPTS) {
        const lockoutUntil = Date.now() + LOCKOUT_DURATION
        localStorage.setItem(LOCKOUT_KEY, lockoutUntil.toString())
        setIsLockedOut(true)
        setLockoutTimeRemaining(LOCKOUT_DURATION)
      }
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem(SESSION_KEY)
    setIsAuthenticated(false)
  }

  const getRemainingAttempts = () => {
    return Math.max(0, MAX_ATTEMPTS - failedAttempts)
  }

  const formatLockoutTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return {
    isAuthenticated,
    isLoading,
    authenticate,
    logout,
    failedAttempts,
    isLockedOut,
    lockoutTimeRemaining,
    getRemainingAttempts,
    formatLockoutTime,
  }
}
