"use client"

import { useState, useEffect } from "react"

const ADMIN_PASSWORD = "rapidx2024admin"
const MAX_ATTEMPTS = 3
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes
const SESSION_DURATION = 30 * 60 * 1000 // 30 minutes

interface AuthState {
  isAuthenticated: boolean
  failedAttempts: number
  lockoutUntil: number | null
  sessionExpiry: number | null
}

export function useAdminAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    failedAttempts: 0,
    lockoutUntil: null,
    sessionExpiry: null,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(0)

  // Load auth state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("adminAuthState")
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState)
        const now = Date.now()

        // Check if session is still valid
        if (parsed.sessionExpiry && now < parsed.sessionExpiry) {
          setAuthState({
            ...parsed,
            isAuthenticated: true,
          })
        } else {
          // Session expired
          setAuthState({
            isAuthenticated: false,
            failedAttempts: parsed.failedAttempts || 0,
            lockoutUntil: parsed.lockoutUntil,
            sessionExpiry: null,
          })
        }
      } catch (error) {
        console.error("Error parsing auth state:", error)
      }
    }
    setIsLoading(false)
  }, [])

  // Save auth state to localStorage
  useEffect(() => {
    localStorage.setItem("adminAuthState", JSON.stringify(authState))
  }, [authState])

  // Session timer
  useEffect(() => {
    if (authState.isAuthenticated && authState.sessionExpiry) {
      const interval = setInterval(() => {
        const now = Date.now()
        const remaining = authState.sessionExpiry! - now

        if (remaining <= 0) {
          // Session expired
          setAuthState((prev) => ({
            ...prev,
            isAuthenticated: false,
            sessionExpiry: null,
          }))
          setSessionTimeRemaining(0)
        } else {
          setSessionTimeRemaining(remaining)
        }
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [authState.isAuthenticated, authState.sessionExpiry])

  const login = (password: string): boolean => {
    const now = Date.now()

    // Check if locked out
    if (authState.lockoutUntil && now < authState.lockoutUntil) {
      return false
    }

    if (password === ADMIN_PASSWORD) {
      // Successful login
      setAuthState({
        isAuthenticated: true,
        failedAttempts: 0,
        lockoutUntil: null,
        sessionExpiry: now + SESSION_DURATION,
      })
      return true
    } else {
      // Failed login
      const newFailedAttempts = authState.failedAttempts + 1
      const shouldLockout = newFailedAttempts >= MAX_ATTEMPTS

      setAuthState((prev) => ({
        ...prev,
        isAuthenticated: false,
        failedAttempts: newFailedAttempts,
        lockoutUntil: shouldLockout ? now + LOCKOUT_DURATION : null,
        sessionExpiry: null,
      }))
      return false
    }
  }

  const logout = () => {
    setAuthState((prev) => ({
      ...prev,
      isAuthenticated: false,
      sessionExpiry: null,
    }))
  }

  const extendSession = () => {
    if (authState.isAuthenticated) {
      setAuthState((prev) => ({
        ...prev,
        sessionExpiry: Date.now() + SESSION_DURATION,
      }))
    }
  }

  const getRemainingAttempts = (): number => {
    return Math.max(0, MAX_ATTEMPTS - authState.failedAttempts)
  }

  const getLockoutTimeRemaining = (): number => {
    if (!authState.lockoutUntil) return 0
    return Math.max(0, authState.lockoutUntil - Date.now())
  }

  const formatTime = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const isLockedOut = authState.lockoutUntil ? Date.now() < authState.lockoutUntil : false
  const lockoutTimeRemaining = getLockoutTimeRemaining()

  return {
    isAuthenticated: authState.isAuthenticated,
    isLoading,
    failedAttempts: authState.failedAttempts,
    isLockedOut,
    lockoutTimeRemaining,
    sessionTimeRemaining,
    login,
    logout,
    extendSession,
    getRemainingAttempts,
    formatLockoutTime: formatTime,
    formatSessionTime: formatTime,
  }
}
