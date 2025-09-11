"use client"

import { useState, useEffect } from "react"

const ADMIN_PIN = "2024"
const SESSION_DURATION = 30 * 60 * 1000 // 30 minutes
const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

interface AuthState {
  isAuthenticated: boolean
  sessionStart: number | null
  attempts: number
  lockoutStart: number | null
}

const getStoredAuthState = (): AuthState => {
  if (typeof window === "undefined") {
    return {
      isAuthenticated: false,
      sessionStart: null,
      attempts: 0,
      lockoutStart: null,
    }
  }

  try {
    const stored = localStorage.getItem("admin_auth_state")
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error("Error parsing stored auth state:", error)
  }

  return {
    isAuthenticated: false,
    sessionStart: null,
    attempts: 0,
    lockoutStart: null,
  }
}

const setStoredAuthState = (state: AuthState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("admin_auth_state", JSON.stringify(state))
  }
}

export function useAdminAuth() {
  const [authState, setAuthState] = useState<AuthState>(getStoredAuthState)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuthStatus = () => {
      const currentTime = Date.now()
      const state = getStoredAuthState()

      // Check if locked out
      if (state.lockoutStart && currentTime - state.lockoutStart < LOCKOUT_DURATION) {
        setAuthState(state)
        setIsLoading(false)
        return
      }

      // Clear lockout if expired
      if (state.lockoutStart && currentTime - state.lockoutStart >= LOCKOUT_DURATION) {
        const newState = { ...state, lockoutStart: null, attempts: 0 }
        setAuthState(newState)
        setStoredAuthState(newState)
        setIsLoading(false)
        return
      }

      // Check session validity
      if (state.isAuthenticated && state.sessionStart) {
        if (currentTime - state.sessionStart < SESSION_DURATION) {
          setAuthState(state)
        } else {
          // Session expired
          const newState = { ...state, isAuthenticated: false, sessionStart: null }
          setAuthState(newState)
          setStoredAuthState(newState)
        }
      } else {
        setAuthState(state)
      }

      setIsLoading(false)
    }

    checkAuthStatus()

    // Check session every minute
    const interval = setInterval(checkAuthStatus, 60000)
    return () => clearInterval(interval)
  }, [])

  const authenticate = (pin: string) => {
    const currentTime = Date.now()
    const currentState = getStoredAuthState()

    // Check if locked out
    if (currentState.lockoutStart && currentTime - currentState.lockoutStart < LOCKOUT_DURATION) {
      const remainingTime = Math.ceil((LOCKOUT_DURATION - (currentTime - currentState.lockoutStart)) / 1000)
      return {
        success: false,
        message: `Account locked. Try again in ${Math.ceil(remainingTime / 60)} minutes.`,
      }
    }

    if (pin === ADMIN_PIN) {
      const newState: AuthState = {
        isAuthenticated: true,
        sessionStart: currentTime,
        attempts: 0,
        lockoutStart: null,
      }
      setAuthState(newState)
      setStoredAuthState(newState)
      return { success: true, message: "Authentication successful" }
    } else {
      const newAttempts = currentState.attempts + 1
      const newState: AuthState = {
        ...currentState,
        isAuthenticated: false,
        attempts: newAttempts,
        lockoutStart: newAttempts >= MAX_ATTEMPTS ? currentTime : null,
      }
      setAuthState(newState)
      setStoredAuthState(newState)

      if (newAttempts >= MAX_ATTEMPTS) {
        return {
          success: false,
          message: "Too many failed attempts. Account locked for 15 minutes.",
        }
      }

      return {
        success: false,
        message: `Invalid PIN. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`,
      }
    }
  }

  const logout = () => {
    const newState: AuthState = {
      isAuthenticated: false,
      sessionStart: null,
      attempts: authState.attempts,
      lockoutStart: authState.lockoutStart,
    }
    setAuthState(newState)
    setStoredAuthState(newState)
  }

  const getRemainingSessionTime = () => {
    if (!authState.isAuthenticated || !authState.sessionStart) return 0
    const elapsed = Date.now() - authState.sessionStart
    return Math.max(0, SESSION_DURATION - elapsed)
  }

  const getLockoutRemainingTime = () => {
    if (!authState.lockoutStart) return 0
    const elapsed = Date.now() - authState.lockoutStart
    return Math.max(0, LOCKOUT_DURATION - elapsed)
  }

  const isLocked = authState.lockoutStart && getLockoutRemainingTime() > 0

  return {
    isAuthenticated: authState.isAuthenticated && !isLocked,
    isLoading,
    attempts: authState.attempts,
    isLocked: !!isLocked,
    authenticate,
    logout,
    getRemainingSessionTime,
    getLockoutRemainingTime,
  }
}

export const authenticateAdmin = (pin: string) => {
  return pin === ADMIN_PIN ? { success: true } : { success: false, error: "Invalid PIN" }
}

export const clearAdminSession = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("admin_auth_state")
  }
}

export const isAdminAuthenticated = () => {
  const state = getStoredAuthState()
  if (!state.isAuthenticated || !state.sessionStart) return false

  const currentTime = Date.now()
  return currentTime - state.sessionStart < SESSION_DURATION
}
