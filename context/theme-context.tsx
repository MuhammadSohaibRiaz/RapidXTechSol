"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type ThemeMode = "dark" | "light"
type ThemeColor = "blue" | "green" | "purple" | "red" | "orange" | "white" | "black"

type ThemeContextType = {
  mode: ThemeMode
  color: ThemeColor
  setMode: (mode: ThemeMode) => void
  setColor: (color: ThemeColor) => void
  getGradient: (type: "from" | "to" | "text") => string
  getBgClass: () => string
  getTextClass: () => string
  getAccentClass: () => string
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Theme configuration for different color schemes
const themeConfig = {
  blue: {
    dark: {
      from: "from-blue-900",
      to: "to-blue-800",
      text: "from-blue-400 to-emerald-400",
      bg: "bg-gradient-to-b from-blue-900 to-blue-800",
      textColor: "text-white",
      accent: "bg-blue-500",
      glow: "from-blue-500/20 to-emerald-500/20",
    },
    light: {
      from: "from-blue-100",
      to: "to-blue-50",
      text: "from-blue-600 to-emerald-600",
      bg: "bg-gradient-to-b from-blue-50 to-white",
      textColor: "text-gray-800",
      accent: "bg-blue-500",
      glow: "from-blue-200/40 to-emerald-200/40",
    },
  },
  green: {
    dark: {
      from: "from-emerald-900",
      to: "to-emerald-800",
      text: "from-emerald-400 to-blue-400",
      bg: "bg-gradient-to-b from-emerald-900 to-emerald-800",
      textColor: "text-white",
      accent: "bg-emerald-500",
      glow: "from-emerald-500/20 to-blue-500/20",
    },
    light: {
      from: "from-emerald-100",
      to: "to-emerald-50",
      text: "from-emerald-600 to-blue-600",
      bg: "bg-gradient-to-b from-emerald-50 to-white",
      textColor: "text-gray-800",
      accent: "bg-emerald-500",
      glow: "from-emerald-200/40 to-blue-200/40",
    },
  },
  purple: {
    dark: {
      from: "from-purple-900",
      to: "to-purple-800",
      text: "from-purple-400 to-pink-400",
      bg: "bg-gradient-to-b from-purple-900 to-purple-800",
      textColor: "text-white",
      accent: "bg-purple-500",
      glow: "from-purple-500/20 to-pink-500/20",
    },
    light: {
      from: "from-purple-100",
      to: "to-purple-50",
      text: "from-purple-600 to-pink-600",
      bg: "bg-gradient-to-b from-purple-50 to-white",
      textColor: "text-gray-800",
      accent: "bg-purple-500",
      glow: "from-purple-200/40 to-pink-200/40",
    },
  },
  red: {
    dark: {
      from: "from-red-900",
      to: "to-red-800",
      text: "from-red-400 to-orange-400",
      bg: "bg-gradient-to-b from-red-900 to-red-800",
      textColor: "text-white",
      accent: "bg-red-500",
      glow: "from-red-500/20 to-orange-500/20",
    },
    light: {
      from: "from-red-100",
      to: "to-red-50",
      text: "from-red-600 to-orange-600",
      bg: "bg-gradient-to-b from-red-50 to-white",
      textColor: "text-gray-800",
      accent: "bg-red-500",
      glow: "from-red-200/40 to-orange-200/40",
    },
  },
  orange: {
    dark: {
      from: "from-orange-900",
      to: "to-orange-800",
      text: "from-orange-400 to-yellow-400",
      bg: "bg-gradient-to-b from-orange-900 to-orange-800",
      textColor: "text-white",
      accent: "bg-orange-500",
      glow: "from-orange-500/20 to-yellow-500/20",
    },
    light: {
      from: "from-orange-100",
      to: "to-orange-50",
      text: "from-orange-600 to-yellow-600",
      bg: "bg-gradient-to-b from-orange-50 to-white",
      textColor: "text-gray-800",
      accent: "bg-orange-500",
      glow: "from-orange-200/40 to-yellow-200/40",
    },
  },
  // Special themes
  white: {
    light: {
      from: "from-gray-50",
      to: "to-white",
      text: "from-gray-700 to-gray-900",
      bg: "bg-gradient-to-b from-gray-50 to-white",
      textColor: "text-gray-800",
      accent: "bg-gray-200",
      glow: "from-gray-200/30 to-gray-100/30",
    },
    dark: {
      from: "from-gray-50",
      to: "to-white",
      text: "from-gray-700 to-gray-900",
      bg: "bg-gradient-to-b from-gray-50 to-white",
      textColor: "text-gray-800",
      accent: "bg-gray-200",
      glow: "from-gray-200/30 to-gray-100/30",
    },
  },
  black: {
    dark: {
      from: "from-gray-900",
      to: "to-black",
      text: "from-gray-300 to-white",
      bg: "bg-gradient-to-b from-gray-900 to-black",
      textColor: "text-white",
      accent: "bg-gray-700",
      glow: "from-gray-700/20 to-gray-800/20",
    },
    light: {
      from: "from-gray-900",
      to: "to-black",
      text: "from-gray-300 to-white",
      bg: "bg-gradient-to-b from-gray-900 to-black",
      textColor: "text-white",
      accent: "bg-gray-700",
      glow: "from-gray-700/20 to-gray-800/20",
    },
  },
}

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("dark")
  const [color, setColor] = useState<ThemeColor>("blue")

  useEffect(() => {
    // Check if theme is stored in localStorage
    const storedMode = localStorage.getItem("themeMode") as ThemeMode | null
    const storedColor = localStorage.getItem("themeColor") as ThemeColor | null

    if (storedMode) {
      setMode(storedMode)
    }

    if (storedColor) {
      setColor(storedColor)
    }

    // Apply theme to document
    document.documentElement.classList.toggle("light-mode", mode === "light")
    document.documentElement.classList.toggle("dark-mode", mode === "dark")
    document.documentElement.setAttribute("data-theme-color", color)
  }, [mode, color])

  const updateMode = (newMode: ThemeMode) => {
    setMode(newMode)
    localStorage.setItem("themeMode", newMode)
    document.documentElement.classList.toggle("light-mode", newMode === "light")
    document.documentElement.classList.toggle("dark-mode", newMode === "dark")
  }

  const updateColor = (newColor: ThemeColor) => {
    setColor(newColor)
    localStorage.setItem("themeColor", newColor)
    document.documentElement.setAttribute("data-theme-color", newColor)
  }

  const getGradient = (type: "from" | "to" | "text") => {
    // Special handling for white/black themes
    if (color === "white" || color === "black") {
      return themeConfig[color][mode][type]
    }
    return themeConfig[color][mode][type]
  }

  const getBgClass = () => {
    return themeConfig[color][mode].bg
  }

  const getTextClass = () => {
    return themeConfig[color][mode].textColor
  }

  const getAccentClass = () => {
    return themeConfig[color][mode].accent
  }

  return (
    <ThemeContext.Provider
      value={{
        mode,
        color,
        setMode: updateMode,
        setColor: updateColor,
        getGradient,
        getBgClass,
        getTextClass,
        getAccentClass,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeContextProvider")
  }
  return context
}
