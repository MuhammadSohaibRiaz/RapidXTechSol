"use client"

import { useState, useEffect } from "react"

// Admin configuration
const ADMIN_CONFIG = {
  PIN: "2024", // Change this to your desired PIN
  SESSION_DURATION: 30 * 60 * 1000, // 30 minutes in milliseconds
  MAX_ATTEMPTS: 5,
  LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes lockout
}

interface AuthState {
  isAuthenticated: boolean
  attempts: number
  lockedUntil: number | null
  sessionExpiry: number | null
}

// Storage keys
const STORAGE_KEYS = {
  AUTH_STATE: "rapidx_admin_auth",
  SESSION: "rapidx_admin_session",
}

const ADMIN_PIN = "2024" // Change this to your desired PIN

export function useAdminAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    attempts: 0,
    lockedUntil: null,
    sessionExpiry: null,
  })
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth state from localStorage
  useEffect(() => {
    const initAuth = () => {
      try {
        const savedAuth = localStorage.getItem(STORAGE_KEYS.AUTH_STATE)
        const savedSession = localStorage.getItem(STORAGE_KEYS.SESSION)

        if (savedAuth) {
          const parsedAuth = JSON.parse(savedAuth)
          const now = Date.now()

          // Check if locked
          if (parsedAuth.lockedUntil && now < parsedAuth.lockedUntil) {
            setAuthState(parsedAuth)
            setIsLoading(false)
            return
          }

          // Check session validity
          if (savedSession && parsedAuth.sessionExpiry && now < parsedAuth.sessionExpiry) {
            setAuthState({ ...parsedAuth, isAuthenticated: true })
          } else {
            // Session expired, clear auth
            clearAuth()
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error)
        clearAuth()
      }
      setIsLoading(false)
    }

    initAuth()
  }, [])

  // Save auth state to localStorage
  const saveAuthState = (newState: AuthState) => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_STATE, JSON.stringify(newState))
      if (newState.isAuthenticated) {
        localStorage.setItem(STORAGE_KEYS.SESSION, "active")
      }
    } catch (error) {
      console.error("Error saving auth state:", error)
    }
  }

  // Clear authentication
  const clearAuth = () => {
    const clearedState = {
      isAuthenticated: false,
      attempts: 0,
      lockedUntil: null,
      sessionExpiry: null,
    }
    setAuthState(clearedState)
    localStorage.removeItem(STORAGE_KEYS.AUTH_STATE)
    localStorage.removeItem(STORAGE_KEYS.SESSION)
  }

  // Authenticate with PIN
  const authenticate = (pin: string): { success: boolean; message: string } => {
    const now = Date.now()

    // Check if locked
    if (authState.lockedUntil && now < authState.lockedUntil) {
      const remainingTime = Math.ceil((authState.lockedUntil - now) / 60000)
      return {
        success: false,
        message: `Account locked. Try again in ${remainingTime} minutes.`,
      }
    }

    // Validate PIN
    if (pin === ADMIN_PIN) {
      const newState = {
        isAuthenticated: true,
        attempts: 0,
        lockedUntil: null,
        sessionExpiry: now + ADMIN_CONFIG.SESSION_DURATION,
      }
      setAuthState(newState)
      saveAuthState(newState)
      return { success: true, message: "Authentication successful!" }
    } else {
      const newAttempts = authState.attempts + 1
      const newState = {
        ...authState,
        attempts: newAttempts,
        lockedUntil: newAttempts >= ADMIN_CONFIG.MAX_ATTEMPTS ? now + ADMIN_CONFIG.LOCKOUT_DURATION : null,
      }
      setAuthState(newState)
      saveAuthState(newState)

      if (newAttempts >= ADMIN_CONFIG.MAX_ATTEMPTS) {
        return {
          success: false,
          message: `Too many failed attempts. Account locked for 15 minutes.`,
        }
      } else {
        return {
          success: false,
          message: `Invalid PIN. ${ADMIN_CONFIG.MAX_ATTEMPTS - newAttempts} attempts remaining.`,
        }
      }
    }
  }

  // Logout
  const logout = () => {
    clearAuth()
  }

  // Check if session is valid
  const isSessionValid = () => {
    if (!authState.isAuthenticated || !authState.sessionExpiry) return false
    return Date.now() < authState.sessionExpiry
  }

  // Get remaining session time
  const getRemainingSessionTime = () => {
    if (!authState.sessionExpiry) return 0
    return Math.max(0, authState.sessionExpiry - Date.now())
  }

  // Get lockout remaining time
  const getLockoutRemainingTime = () => {
    if (!authState.lockedUntil) return 0
    return Math.max(0, authState.lockedUntil - Date.now())
  }

  return {
    isAuthenticated: authState.isAuthenticated && isSessionValid(),
    isLoading,
    attempts: authState.attempts,
    isLocked: authState.lockedUntil ? Date.now() < authState.lockedUntil : false,
    authenticate,
    logout,
    getRemainingSessionTime,
    getLockoutRemainingTime,
  }
}

export function authenticateAdmin(pin: string): Promise<{ success: boolean; error?: string }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (pin === ADMIN_PIN) {
        // Store session in localStorage
        localStorage.setItem("admin_session", "authenticated")
        localStorage.setItem("admin_session_time", Date.now().toString())
        resolve({ success: true })
      } else {
        resolve({ success: false, error: "Invalid PIN" })
      }
    }, 1000) // Simulate network delay
  })
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false

  const session = localStorage.getItem("admin_session")
  const sessionTime = localStorage.getItem("admin_session_time")

  if (!session || !sessionTime) return false

  // Check if session is expired (24 hours)
  const now = Date.now()
  const sessionStart = Number.parseInt(sessionTime)
  const twentyFourHours = 24 * 60 * 60 * 1000

  if (now - sessionStart > twentyFourHours) {
    clearAdminSession()
    return false
  }

  return session === "authenticated"
}

export function clearAdminSession(): void {
  if (typeof window === "undefined") return

  localStorage.removeItem("admin_session")
  localStorage.removeItem("admin_session_time")
}
