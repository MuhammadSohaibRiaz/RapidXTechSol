"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Smartphone, Globe, Zap, Users, Award, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useThemeContext } from "@/context/theme-context"
import { StatsSection } from "@/components/stats-section"
import { FloatingCards } from "@/components/floating-cards"
import { ScrollSection } from "@/components/scroll-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ElegantPartners } from "@/components/elegant-partners"

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies",
    features: ["React & Next.js", "Full-Stack Solutions", "E-commerce Platforms", "CMS Integration"],
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications for iOS and Android",
    features: ["React Native", "Flutter", "Native iOS/Android", "App Store Optimization"],
  },
  {
    icon: Code,
    title: "Custom Software",
    description: "Tailored software solutions to meet your specific business needs",
    features: ["API Development", "Database Design", "Cloud Integration", "Microservices"],
  },
  {
    icon: Zap,
    title: "Digital Transformation",
    description: "Modernize your business processes with cutting-edge technology",
    features: ["Process Automation", "Cloud Migration", "Legacy System Updates", "Digital Strategy"],
  },
]

const technologies = ["React", "Next.js", "TypeScript", "Node.js", "Python", "AWS", "Docker", "PostgreSQL"]

const achievements = [
  { icon: Users, number: "500+", label: "Happy Clients" },
  { icon: Code, number: "1000+", label: "Projects Completed" },
  { icon: Award, number: "50+", label: "Awards Won" },
  { icon: Globe, number: "25+", label: "Countries Served" },
]

export default function Home() {
  const { mode, color } = useThemeContext()

  const getCardBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/40"
    } else {
      return "bg-white/40"
    }
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

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium bg-primary/10 border-primary/20">
              🚀 Transforming Ideas Into Digital Reality
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent theme-gradient-text theme-transition">
              Digital Innovation
              <br />
              <span className="text-primary">Made Simple</span>
            </h1>

            <p className="text-xl md:text-2xl theme-text opacity-80 mb-8 max-w-3xl mx-auto theme-transition">
              We craft exceptional digital experiences that drive growth, enhance user engagement, and transform
              businesses for the modern world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg" asChild>
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg bg-transparent" asChild>
                <Link href="/portfolio">View Our Work</Link>
              </Button>
            </div>

            {/* Technology Stack */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="px-4 py-2 bg-secondary/20 theme-text rounded-full text-sm font-medium theme-transition hover:bg-secondary/30 cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection achievements={achievements} />

      {/* Services Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent theme-gradient-text theme-transition">
              Our Services
            </h2>
            <p className="text-xl theme-text opacity-80 max-w-3xl mx-auto theme-transition">
              From concept to deployment, we provide end-to-end digital solutions that drive results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg h-full theme-transition hover:transform hover:scale-105 transition-all duration-300`}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="p-3 bg-primary/20 rounded-lg mr-4">
                        <service.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold theme-text theme-transition">{service.title}</h3>
                    </div>
                    <p className="theme-text opacity-80 mb-6 theme-transition">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center theme-text theme-transition">
                          <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Cards Section */}
      <FloatingCards />

      {/* Scroll Section */}
      <ScrollSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Partners Section */}
      <ElegantPartners />

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
              <CardContent className="p-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent theme-gradient-text theme-transition">
                  Ready to Transform Your Business?
                </h2>
                <p className="text-xl theme-text opacity-80 mb-8 max-w-2xl mx-auto theme-transition">
                  Let's discuss your project and explore how we can help you achieve your digital goals with innovative
                  solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg" asChild>
                    <Link href="/contact">
                      Get Free Consultation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="px-8 py-4 text-lg bg-transparent" asChild>
                    <Link href="/about">Learn More About Us</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
