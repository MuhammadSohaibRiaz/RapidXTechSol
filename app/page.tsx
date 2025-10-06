"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "../components/ui/button"
import { StatsSection } from "../components/stats-section"
import { CompanyCarousel } from "../components/company-carousel"
import { FloatingCards } from "../components/floating-cards"
import { ScrollSection } from "../components/scroll-section"
import { TestimonialsSection } from "../components/testimonials-section"
import Link from "next/link"
import { useRef } from "react"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <div className="bg-transparent theme-transition">
      <section ref={containerRef} className="min-h-screen relative flex items-center justify-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
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

        <motion.div style={{ opacity, scale, y }} className="relative z-10 text-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent theme-gradient-text mb-6 theme-transition">
              Innovative Software Solutions
            </h1>
            <p className="text-xl md:text-2xl theme-text mb-12 max-w-3xl mx-auto theme-transition">
              We build cutting-edge applications that transform businesses and deliver exceptional user experiences
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/portfolio">
                <Button
                  size="lg"
                  className="bg-gradient-to-r theme-gradient-text text-white hover:opacity-90 transform hover:-translate-y-1 transition-all duration-200 theme-transition"
                >
                  Our Work
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary hover:bg-primary/10 transform hover:-translate-y-1 transition-all duration-200 theme-transition bg-transparent"
                >
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <span className="theme-text text-sm theme-transition">Scroll to explore</span>
        </motion.div>
      </section>

      <StatsSection />

      <FloatingCards />

      <ScrollSection />

      <TestimonialsSection />

      <CompanyCarousel />

      <section className="py-32 theme-bg relative theme-transition">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent theme-gradient-text theme-transition">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl theme-text max-w-2xl mx-auto theme-transition">
              Partner with RapidXTech to build innovative software solutions that drive growth and efficiency
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r theme-gradient-text text-white hover:opacity-90 transform hover:-translate-y-1 transition-all duration-200 theme-transition"
              >
                Start Your Project
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
