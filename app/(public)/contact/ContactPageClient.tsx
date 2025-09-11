"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react"
import { useThemeContext } from "@/context/theme-context"

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@rapidxsolution.com",
    link: "mailto:hello@rapidxsolution.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 123-4567",
    link: "tel:+15551234567",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "123 Tech Street, Digital City, DC 12345",
    link: "https://maps.google.com",
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "Mon - Fri: 9AM - 6PM EST",
    link: null,
  },
]

const services = [
  "Web Development",
  "Mobile App Development",
  "E-commerce Solutions",
  "UI/UX Design",
  "Digital Marketing",
  "Custom Software",
  "Consulting",
  "Other",
]

export function ContactPageClient() {
  const { mode, color } = useThemeContext()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const getCardBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/40"
    } else {
      return "bg-white/40"
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen theme-bg theme-transition relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
            <CardContent className="p-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold theme-text mb-4 theme-transition">Thank You!</h1>
              <p className="text-lg theme-text opacity-80 mb-8 theme-transition">
                We've received your message and will get back to you within 24 hours.
              </p>
              <Button
                onClick={() => {
                  setIsSubmitted(false)
                  setFormData({
                    name: "",
                    email: "",
                    company: "",
                    service: "",
                    budget: "",
                    message: "",
                  })
                }}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Send Another Message
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen theme-bg theme-transition relative overflow-hidden">
      {/* Background Elements */}
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

      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent theme-gradient-text theme-transition">
              Get In Touch
            </h1>
            <p className="text-xl theme-text opacity-80 max-w-3xl mx-auto theme-transition">
              Ready to start your project? Let's discuss your ideas and create something amazing together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold theme-text mb-6 theme-transition">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="theme-text theme-transition">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="theme-text bg-transparent border-gray-300 dark:border-gray-600"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="theme-text theme-transition">
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="theme-text bg-transparent border-gray-300 dark:border-gray-600"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="company" className="theme-text theme-transition">
                          Company
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="theme-text bg-transparent border-gray-300 dark:border-gray-600"
                          placeholder="Your Company"
                        />
                      </div>
                      <div>
                        <Label htmlFor="service" className="theme-text theme-transition">
                          Service Needed
                        </Label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2 rounded-md border ${
                            mode === "dark" || color === "black"
                              ? "border-gray-600 bg-gray-800/50"
                              : "border-gray-300 bg-white/50"
                          } theme-text theme-transition`}
                        >
                          <option value="">Select a service</option>
                          {services.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="budget" className="theme-text theme-transition">
                        Project Budget
                      </Label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 rounded-md border ${
                          mode === "dark" || color === "black"
                            ? "border-gray-600 bg-gray-800/50"
                            : "border-gray-300 bg-white/50"
                        } theme-text theme-transition`}
                      >
                        <option value="">Select budget range</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value="10k-25k">$10,000 - $25,000</option>
                        <option value="25k-50k">$25,000 - $50,000</option>
                        <option value="50k+">$50,000+</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="theme-text theme-transition">
                        Project Details *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="theme-text bg-transparent border-gray-300 dark:border-gray-600"
                        placeholder="Tell us about your project, goals, and any specific requirements..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-white py-3"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold theme-text mb-6 theme-transition">Contact Information</h2>
                  <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="p-3 bg-primary/20 rounded-lg">
                          <info.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold theme-text theme-transition">{info.title}</h3>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="theme-text opacity-80 theme-transition hover:text-primary"
                              target={info.link.startsWith("http") ? "_blank" : undefined}
                              rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="theme-text opacity-80 theme-transition">{info.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold theme-text mb-4 theme-transition">Why Choose Us?</h3>
                  <ul className="space-y-3">
                    {[
                      "Free initial consultation",
                      "24/7 project support",
                      "Agile development process",
                      "100% satisfaction guarantee",
                      "Post-launch maintenance",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center theme-text theme-transition">
                        <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
