"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useThemeContext } from "@/context/theme-context"

// Reduced number of companies for startup stage
const companies = [
  { name: "TechStart", logo: "/placeholder.svg?height=40&width=120&text=TechStart" },
  { name: "InnovateHub", logo: "/placeholder.svg?height=40&width=120&text=InnovateHub" },
  { name: "StartupLab", logo: "/placeholder.svg?height=40&width=120&text=StartupLab" },
  { name: "DigitalForge", logo: "/placeholder.svg?height=40&width=120&text=DigitalForge" },
  { name: "CodeCraft", logo: "/placeholder.svg?height=40&width=120&text=CodeCraft" },
]

export function CompanyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { color, mode } = useThemeContext()

  // Auto-advance every 3 seconds
  useState(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % companies.length)
    }, 3000)
    return () => clearInterval(interval)
  })

  return (
    <section className="py-16 theme-bg theme-transition relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />

      <div className="container mx-auto px-4 relative">
        {/* Subtle heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-wider theme-text opacity-60 mb-2 theme-transition">
            Trusted Partners
          </p>
          <h2 className="text-lg md:text-xl font-medium theme-text opacity-80 theme-transition">
            Building relationships with forward-thinking companies
          </h2>
        </motion.div>

        {/* Desktop Version - Shows 2 companies side by side */}
        <div className="hidden md:block">
          <div className="flex justify-center items-center space-x-16 h-20">
            {[0, 1].map((offset) => {
              const companyIndex = (currentIndex + offset) % companies.length
              const company = companies[companyIndex]

              return (
                <motion.div
                  key={`${company.name}-${companyIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: offset * 0.1 }}
                  className={`flex items-center justify-center ${
                    mode === "dark" || color === "black"
                      ? "grayscale hover:grayscale-0"
                      : "opacity-60 hover:opacity-100"
                  } transition-all duration-500 hover:scale-110`}
                >
                  <img
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    className="h-8 w-auto max-w-[120px] object-contain"
                  />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile Version - Shows 1 company at a time */}
        <div className="md:hidden">
          <div className="flex justify-center items-center h-20">
            <motion.div
              key={`mobile-${companies[currentIndex].name}-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className={`flex items-center justify-center ${
                mode === "dark" || color === "black" ? "grayscale hover:grayscale-0" : "opacity-70 hover:opacity-100"
              } transition-all duration-500`}
            >
              <img
                src={companies[currentIndex].logo || "/placeholder.svg"}
                alt={companies[currentIndex].name}
                className="h-10 w-auto max-w-[140px] object-contain"
              />
            </motion.div>
          </div>
        </div>

        {/* Subtle progress indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {companies.map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary scale-125"
                  : mode === "dark" || color === "black"
                    ? "bg-gray-700"
                    : "bg-gray-300"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
            />
          ))}
        </div>

        {/* Optional: Add a subtle "and more" text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-6"
        >
          <p className="text-xs theme-text opacity-40 theme-transition">...and growing</p>
        </motion.div>
      </div>
    </section>
  )
}
