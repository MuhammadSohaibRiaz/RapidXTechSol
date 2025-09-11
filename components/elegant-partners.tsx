"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useThemeContext } from "@/context/theme-context"

const trustedPartners = [
  { name: "Startup Alpha", logo: "/placeholder.svg?height=36&width=110&text=Alpha" },
  { name: "Beta Innovations", logo: "/placeholder.svg?height=36&width=110&text=Beta" },
  { name: "Gamma Tech", logo: "/placeholder.svg?height=36&width=110&text=Gamma" },
  { name: "Delta Solutions", logo: "/placeholder.svg?height=36&width=110&text=Delta" },
]

export function ElegantPartners() {
  const [visiblePartners, setVisiblePartners] = useState([0, 1])
  const { color, mode } = useThemeContext()

  useEffect(() => {
    const interval = setInterval(() => {
      setVisiblePartners((prev) => {
        const next = [(prev[0] + 1) % trustedPartners.length, (prev[1] + 1) % trustedPartners.length]
        return next
      })
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 theme-bg theme-transition relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Elegant heading */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="inline-flex items-center space-x-2 mb-4"
            >
              <div className={`w-8 h-[1px] ${mode === "dark" || color === "black" ? "bg-gray-600" : "bg-gray-400"}`} />
              <span className="text-xs uppercase tracking-[0.2em] theme-text opacity-60 theme-transition">
                Partnerships
              </span>
              <div className={`w-8 h-[1px] ${mode === "dark" || color === "black" ? "bg-gray-600" : "bg-gray-400"}`} />
            </motion.div>
            <h2 className="text-xl md:text-2xl font-light theme-text opacity-90 theme-transition">
              Building the future together
            </h2>
          </div>

          {/* Partners display */}
          <div className="flex justify-center items-center space-x-12 md:space-x-16 h-20">
            {visiblePartners.map((partnerIndex, displayIndex) => (
              <motion.div
                key={`${trustedPartners[partnerIndex].name}-${partnerIndex}`}
                initial={{ opacity: 0, x: displayIndex === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  delay: displayIndex * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={`group cursor-pointer ${
                  mode === "dark" || color === "black" ? "grayscale hover:grayscale-0" : "opacity-50 hover:opacity-100"
                } transition-all duration-700 hover:scale-105`}
              >
                <img
                  src={trustedPartners[partnerIndex].logo || "/placeholder.svg"}
                  alt={trustedPartners[partnerIndex].name}
                  className="h-9 w-auto object-contain filter group-hover:brightness-110 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>

          {/* Elegant progress indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-10 flex justify-center"
          >
            <div className="flex space-x-1">
              {trustedPartners.map((_, index) => (
                <div
                  key={index}
                  className={`h-[2px] transition-all duration-700 ${
                    visiblePartners.includes(index)
                      ? "w-6 bg-primary"
                      : mode === "dark" || color === "black"
                        ? "w-2 bg-gray-700"
                        : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Subtle call-to-action */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xs theme-text opacity-40 mt-8 theme-transition"
          >
            Join our growing network of innovative partners
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
