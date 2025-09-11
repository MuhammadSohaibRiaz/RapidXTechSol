"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Users, Award, Zap, Shield, Globe } from "lucide-react"
import { useThemeContext } from "@/context/theme-context"
import { StatsSection } from "@/components/stats-section"
import { FloatingCards } from "@/components/floating-cards"
import { ScrollSection } from "@/components/scroll-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ElegantPartners } from "@/components/elegant-partners"
import { useSupabaseCMS } from "@/lib/supabase-cms"
import type { ClientReview, TrustedPartner } from "@/lib/supabase"

export default function HomePage() {
  const { mode, color } = useThemeContext()
  const cms = useSupabaseCMS()

  const [reviews, setReviews] = useState<ClientReview[]>([])
  const [partners, setPartners] = useState<TrustedPartner[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [reviewsData, partnersData] = await Promise.all([cms.getFeaturedReviews(), cms.getFeaturedPartners()])
        setReviews(reviewsData)
        setPartners(partnersData)
      } catch (error) {
        console.error("Error loading homepage data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const getGradientClass = () => {
    switch (color) {
      case "blue":
        return "from-blue-600 via-purple-600 to-cyan-600"
      case "green":
        return "from-green-600 via-emerald-600 to-teal-600"
      case "purple":
        return "from-purple-600 via-pink-600 to-indigo-600"
      case "red":
        return "from-red-600 via-pink-600 to-orange-600"
      case "orange":
        return "from-orange-600 via-red-600 to-pink-600"
      case "yellow":
        return "from-yellow-600 via-orange-600 to-red-600"
      case "black":
        return mode === "dark" ? "from-gray-800 via-gray-700 to-gray-600" : "from-gray-900 via-gray-800 to-gray-700"
      default:
        return "from-blue-600 via-purple-600 to-cyan-600"
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent theme-gradient-text theme-transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transform Your Business with{" "}
              <span className={`bg-gradient-to-r ${getGradientClass()} bg-clip-text text-transparent`}>
                Innovative Solutions
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl theme-text opacity-80 mb-8 max-w-3xl mx-auto theme-transition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We craft cutting-edge software solutions that drive growth, enhance efficiency, and deliver exceptional
              user experiences for businesses of all sizes.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Discuss Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-semibold rounded-full border-2 theme-text hover:bg-primary/10 transition-all duration-300 bg-transparent"
              >
                View Our Work
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Floating Cards */}
      <FloatingCards />

      {/* Stats Section */}
      <StatsSection />

      {/* Services Section */}
      <section className="py-20 px-6 relative z-10">
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
              From concept to deployment, we provide comprehensive solutions tailored to your unique business needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Web Development",
                description: "Modern, responsive websites and web applications built with cutting-edge technologies",
                features: ["React & Next.js", "Full-Stack Solutions", "E-commerce Platforms", "Progressive Web Apps"],
              },
              {
                icon: Zap,
                title: "Mobile Development",
                description: "Native and cross-platform mobile apps that deliver exceptional user experiences",
                features: ["iOS & Android", "React Native", "Flutter", "App Store Optimization"],
              },
              {
                icon: Shield,
                title: "Enterprise Solutions",
                description: "Scalable enterprise software solutions designed for complex business requirements",
                features: ["Custom Software", "System Integration", "Cloud Migration", "API Development"],
              },
              {
                icon: Users,
                title: "UI/UX Design",
                description: "User-centered design that combines aesthetics with functionality and usability",
                features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
              },
              {
                icon: Award,
                title: "Digital Transformation",
                description: "Comprehensive digital transformation strategies to modernize your business processes",
                features: ["Process Automation", "Digital Strategy", "Technology Consulting", "Change Management"],
              },
              {
                icon: CheckCircle,
                title: "Quality Assurance",
                description: "Rigorous testing and quality assurance to ensure flawless software performance",
                features: ["Automated Testing", "Performance Testing", "Security Audits", "Code Reviews"],
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-background/30 backdrop-blur-md rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 theme-transition"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-primary/20 mr-4">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold theme-text theme-transition">{service.title}</h3>
                </div>
                <p className="theme-text opacity-80 mb-6 theme-transition">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center theme-text opacity-70 theme-transition">
                      <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Partners Section */}
      {!isLoading && partners.length > 0 && (
        <section className="py-20 px-6 relative z-10">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent theme-gradient-text theme-transition">
                Trusted by Leading Companies
              </h2>
              <p className="text-xl theme-text opacity-80 max-w-3xl mx-auto theme-transition">
                We're proud to partner with innovative companies across various industries
              </p>
            </motion.div>
            <ElegantPartners partners={partners} />
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {!isLoading && reviews.length > 0 && <TestimonialsSection reviews={reviews} />}

      {/* Scroll Section */}
      <ScrollSection />

      {/* CTA Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-background/30 backdrop-blur-md rounded-2xl p-12 text-center shadow-2xl theme-transition"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent theme-gradient-text theme-transition">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl theme-text opacity-80 mb-8 max-w-3xl mx-auto theme-transition">
              Let's discuss how we can help you achieve your goals with innovative software solutions tailored to your
              needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-semibold rounded-full border-2 theme-text hover:bg-primary/10 transition-all duration-300 bg-transparent"
              >
                Schedule a Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
