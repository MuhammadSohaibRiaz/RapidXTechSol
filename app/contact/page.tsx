"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Loader2 } from "lucide-react"
import { useThemeContext } from "@/context/theme-context"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const { mode, color } = useThemeContext()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate success (you would replace this with your actual API call)
    setIsSubmitting(false)
    setSubmitStatus("success")
    setFormData({ name: "", email: "", message: "" })

    // Reset status after 3 seconds
    setTimeout(() => setSubmitStatus("idle"), 3000)
  }

  const inputBgClass =
    mode === "dark" || color === "black" ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-300"

  return (
    <div className="min-h-screen theme-bg theme-transition relative overflow-hidden">
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

      <div className="container mx-auto px-6 py-12 relative z-10">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-8 text-center bg-clip-text text-transparent theme-gradient-text theme-transition"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h1>
        <motion.form
          onSubmit={handleSubmit}
          className={`max-w-md mx-auto ${mode === "dark" || color === "black" ? "bg-gray-900/30" : "bg-white/30"} backdrop-blur-md p-8 rounded-lg shadow-lg theme-transition`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium theme-text mb-2 theme-transition">
              Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`${inputBgClass} theme-text focus:border-primary theme-transition`}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium theme-text mb-2 theme-transition">
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`${inputBgClass} theme-text focus:border-primary theme-transition`}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium theme-text mb-2 theme-transition">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className={`${inputBgClass} theme-text focus:border-primary theme-transition`}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-white theme-transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
          {submitStatus === "success" && <p className="mt-4 text-green-500 text-center">Message sent successfully!</p>}
          {submitStatus === "error" && (
            <p className="mt-4 text-red-500 text-center">An error occurred. Please try again.</p>
          )}
        </motion.form>
      </div>
    </div>
  )
}
