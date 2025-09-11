"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { useThemeContext } from "@/context/theme-context"

const stats = [
  { number: 150, suffix: "+", label: "Projects Delivered", icon: "🚀" },
  { number: 50, suffix: "+", label: "Enterprise Clients", icon: "🏢" },
  { number: 8, suffix: "+", label: "Years of Excellence", icon: "⭐" },
]

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const { color } = useThemeContext()

  if (isInView && count !== value) {
    setTimeout(() => {
      setCount((prev) => {
        const nextCount = prev + Math.ceil((value - prev) / 10)
        return nextCount > value ? value : nextCount
      })
    }, 50)
  }

  return (
    <span
      ref={ref}
      className="text-7xl md:text-8xl font-bold bg-clip-text text-transparent theme-gradient-text theme-transition"
    >
      {count}
      {suffix}
    </span>
  )
}

export function StatsSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden theme-bg theme-transition">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('/grid.svg')] bg-center opacity-20" />
        <motion.div
          className="absolute inset-0 theme-glow blur-3xl theme-transition"
          animate={{
            x: ["0%", "100%", "0%"],
            y: ["0%", "50%", "0%"],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center space-y-4"
            >
              <span className="text-4xl">{stat.icon}</span>
              <Counter value={stat.number} suffix={stat.suffix} />
              <motion.p
                className="text-xl theme-text opacity-70 theme-transition"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
              >
                {stat.label}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
