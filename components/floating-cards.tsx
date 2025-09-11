"use client"

import type React from "react"
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion"
import { useRef } from "react"
import { useMediaQuery } from "../hooks/use-media-query"
import { useThemeContext } from "@/context/theme-context"
import Link from "next/link"

const technologies = [
  { name: "Web Development", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
  { name: "Mobile Development", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { name: "Cloud Solutions", color: "bg-gradient-to-r from-emerald-500 to-teal-500" },
  { name: "UI/UX Design", color: "bg-gradient-to-r from-orange-500 to-amber-500" },
  { name: "DevOps & Infrastructure", color: "bg-gradient-to-r from-indigo-500 to-purple-500" },
  { name: "E-commerce Solutions", color: "bg-gradient-to-r from-rose-500 to-red-500" },
  { name: "AI & Machine Learning", color: "bg-gradient-to-r from-green-500 to-emerald-500" },
  { name: "Blockchain Development", color: "bg-gradient-to-r from-violet-500 to-purple-500" },
  { name: "Data Analytics", color: "bg-gradient-to-r from-cyan-500 to-blue-500" },
]

export function FloatingCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { color, mode } = useThemeContext()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    }
  }

  // Determine text color based on theme
  const textColor = mode === "dark" || color === "black" ? "text-white" : "text-gray-800"

  return (
    <section className="min-h-screen theme-bg theme-transition py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      <div ref={containerRef} className="container mx-auto px-4 relative min-h-[600px]" onMouseMove={handleMouseMove}>
        <motion.div
          className="text-center space-y-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent theme-gradient-text theme-transition">
            Our Services
          </h2>
          <p className="text-xl theme-text opacity-70 max-w-2xl mx-auto theme-transition">
            Comprehensive software development solutions tailored to your business needs
          </p>
        </motion.div>

        {isMobile ? (
          <div className="grid grid-cols-2 gap-4 mb-12">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                className={`p-4 rounded-xl shadow-xl backdrop-blur-md
                  ${tech.color} transition-all duration-300
                  cursor-pointer transform-gpu`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-sm font-medium text-white whitespace-normal drop-shadow-lg">{tech.name}</span>
              </motion.div>
            ))}

            {/* Ready to Innovate card for mobile */}
            <motion.div
              className="col-span-2 mt-4 bg-gradient-to-r theme-gradient-text p-6 rounded-xl shadow-xl backdrop-blur-md theme-transition"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: technologies.length * 0.05 }}
            >
              <h3 className="text-xl font-bold text-white mb-2">Ready to Innovate?</h3>
              <p className="text-white text-sm mb-3">Let's build your next software solution together</p>
              <Link href="/contact">
                <button
                  className={`${mode === "dark" || color === "black" ? "bg-white text-gray-800" : "bg-gray-800 text-white"} px-4 py-1.5 rounded-full text-sm hover:bg-opacity-90 transition-opacity`}
                >
                  Contact Us
                </button>
              </Link>
            </motion.div>
          </div>
        ) : (
          <div className="relative flex justify-center items-center h-[600px]">
            {technologies.map((tech, index) => (
              <FloatingCard
                key={tech.name}
                text={tech.name}
                color={tech.color}
                mouseX={mouseX}
                mouseY={mouseY}
                index={index}
              />
            ))}

            {/* Ready to Innovate card for desktop */}
            <motion.div
              className="absolute bg-gradient-to-r theme-gradient-text p-6 rounded-xl shadow-xl backdrop-blur-md transform-gpu theme-transition"
              style={{
                x: 0,
                y: 0,
                z: 50,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: technologies.length * 0.1 }}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            >
              <h3 className="text-xl font-bold text-white mb-2">Ready to Innovate?</h3>
              <p className="text-white mb-3">Let's build your next software solution together</p>
              <Link href="/contact">
                <button
                  className={`${mode === "dark" || color === "black" ? "bg-white text-gray-800" : "bg-gray-800 text-white"} px-6 py-2 rounded-full hover:bg-opacity-90 transition-opacity`}
                >
                  Contact Us
                </button>
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  )
}

interface FloatingCardProps {
  text: string
  color: string
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  index: number
}

function FloatingCard({ text, color, mouseX, mouseY, index }: FloatingCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  const distance = useTransform([mouseX, mouseY], ([mx, my]) => {
    if (!ref.current) return 0
    const rect = ref.current.getBoundingClientRect()
    const dx = mx - (rect.left + rect.width / 2)
    const dy = my - (rect.top + rect.height / 2)
    return Math.sqrt(dx * dx + dy * dy)
  })

  const rotateX = useSpring(useTransform(distance, [0, 400], [15, -15]))
  const rotateY = useSpring(useTransform(distance, [0, 400], [-15, 15]))
  const scale = useSpring(useTransform(distance, [0, 400], [1.05, 0.95]))

  // Calculate position in an oval
  const angle = (index / technologies.length) * Math.PI * 2
  const a = 300 // horizontal radius
  const b = 200 // vertical radius
  const x = Math.cos(angle) * a
  const y = Math.sin(angle) * b

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        scale,
        x,
        y,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`absolute p-6 rounded-xl shadow-xl backdrop-blur-md
        ${color} hover:shadow-2xl transition-all duration-300
        cursor-pointer transform-gpu`}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    >
      <span className="text-lg font-medium text-white whitespace-nowrap drop-shadow-lg">{text}</span>
    </motion.div>
  )
}
