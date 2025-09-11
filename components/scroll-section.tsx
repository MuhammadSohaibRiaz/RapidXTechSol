"use client"

import { motion, useScroll } from "framer-motion"
import { useRef } from "react"
import { useThemeContext } from "@/context/theme-context"

const features = [
  {
    title: "Custom Software Development",
    description: "Tailored solutions designed specifically for your business needs and challenges.",
    icon: "💻",
  },
  {
    title: "Agile Methodology",
    description: "Iterative development with regular deliverables and continuous improvement.",
    icon: "🔄",
  },
  {
    title: "Technical Excellence",
    description: "High-quality code, robust architecture, and scalable solutions built to last.",
    icon: "⚙️",
  },
]

export function ScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })
  const { color, mode } = useThemeContext()

  return (
    <section ref={containerRef} className="py-32 theme-bg theme-transition relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent theme-gradient-text theme-transition mb-4">
            Why Choose RapidXTech
          </h2>
          <p className="text-xl theme-text opacity-70 max-w-2xl mx-auto theme-transition">
            Partner with a team that delivers excellence at every step of your software journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative group h-full"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r theme-gradient-text rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 theme-transition"></div>
              <div
                className={`relative ${mode === "dark" || color === "black" ? "bg-gray-900" : "bg-white"} p-8 rounded-lg h-full flex flex-col transform transition duration-500 hover:-translate-y-2 theme-transition`}
              >
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-semibold theme-text mb-2 theme-transition">{feature.title}</h3>
                <p className="theme-text opacity-70 theme-transition">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
