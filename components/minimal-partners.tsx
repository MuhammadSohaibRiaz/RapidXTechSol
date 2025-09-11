"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useThemeContext } from "@/context/theme-context"

// Even more minimal version with just 3-4 select partners
const partners = [
  { name: "StartupX", logo: "/placeholder.svg?height=32&width=100&text=StartupX" },
  { name: "TechFlow", logo: "/placeholder.svg?height=32&width=100&text=TechFlow" },
  { name: "InnovateCo", logo: "/placeholder.svg?height=32&width=100&text=InnovateCo" },
]

export function MinimalPartners() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { color, mode } = useThemeContext()

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % partners.length)
    }, 4000) // Slower transition for more elegance
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-12 theme-bg theme-transition relative">
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          {/* Very subtle heading */}
          <p className="text-xs uppercase tracking-widest theme-text opacity-50 mb-8 theme-transition">
            Trusted by innovative teams
          </p>

          {/* Single company display with smooth transitions */}
          <div className="flex justify-center items-center h-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={partners[currentIndex].name}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1], // Custom easing for smooth feel
                }}
                className={`${
                  mode === "dark" || color === "black" ? "grayscale-0" : "opacity-70"
                } transition-all duration-300`}
              >
                <img
                  src={partners[currentIndex].logo || "/placeholder.svg"}
                  alt={partners[currentIndex].name}
                  className="h-8 w-auto object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Minimal dots indicator */}
          <div className="flex justify-center mt-6 space-x-1">
            {partners.map((_, index) => (
              <div
                key={index}
                className={`w-1 h-1 rounded-full transition-all duration-500 ${
                  index === currentIndex
                    ? "bg-primary w-4"
                    : mode === "dark" || color === "black"
                      ? "bg-gray-800"
                      : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
