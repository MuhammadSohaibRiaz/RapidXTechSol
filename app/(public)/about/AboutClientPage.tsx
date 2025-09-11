"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Target, Award, Heart, Code, Lightbulb, Shield, Zap } from "lucide-react"
import Link from "next/link"
import { useThemeContext } from "@/context/theme-context"
import { OptimizedImage } from "@/components/optimized-image"

const values = [
  {
    icon: Code,
    title: "Excellence in Code",
    description: "We write clean, maintainable, and scalable code that stands the test of time.",
  },
  {
    icon: Lightbulb,
    title: "Innovation First",
    description: "We stay ahead of technology trends to deliver cutting-edge solutions.",
  },
  {
    icon: Heart,
    title: "Client-Centric",
    description: "Your success is our success. We build lasting partnerships with our clients.",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Rigorous testing and quality control ensure flawless deliverables.",
  },
]

const team = [
  {
    name: "Alex Johnson",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    bio: "10+ years in tech leadership, passionate about digital transformation.",
  },
  {
    name: "Sarah Chen",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    bio: "Full-stack architect with expertise in scalable web applications.",
  },
  {
    name: "Michael Rodriguez",
    role: "Lead Designer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    bio: "Award-winning designer focused on user experience and interface design.",
  },
  {
    name: "Emily Davis",
    role: "Project Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    bio: "Agile expert ensuring projects are delivered on time and within budget.",
  },
]

const stats = [
  { icon: Users, number: "500+", label: "Happy Clients" },
  { icon: Target, number: "1000+", label: "Projects Completed" },
  { icon: Award, number: "50+", label: "Awards Won" },
  { icon: Zap, number: "5+", label: "Years Experience" },
]

export function AboutClientPage() {
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

      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="container mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent theme-gradient-text theme-transition">
              About RapidXSolution
            </h1>
            <p className="text-xl theme-text opacity-80 max-w-3xl mx-auto theme-transition">
              We're a passionate team of developers, designers, and digital strategists committed to transforming
              businesses through innovative technology solutions.
            </p>
          </motion.div>

          {/* Our Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
              <CardContent className="p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent theme-gradient-text theme-transition">
                      Our Story
                    </h2>
                    <p className="text-lg theme-text opacity-80 mb-6 theme-transition leading-relaxed">
                      Founded in 2019, RapidXSolution emerged from a simple belief: that every business deserves access
                      to world-class digital solutions. What started as a small team of passionate developers has grown
                      into a full-service digital agency.
                    </p>
                    <p className="text-lg theme-text opacity-80 mb-8 theme-transition leading-relaxed">
                      Today, we've helped over 500 businesses transform their digital presence, from startups to Fortune
                      500 companies. Our commitment to excellence and innovation drives everything we do.
                    </p>
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white" asChild>
                      <Link href="/contact">Work With Us</Link>
                    </Button>
                  </div>
                  <div>
                    <OptimizedImage
                      src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                      alt="Our team working together"
                      width={600}
                      height={400}
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <Card
                    className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition text-center`}
                  >
                    <CardContent className="p-8">
                      <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                      <div className="text-3xl font-bold theme-text mb-2 theme-transition">{stat.number}</div>
                      <div className="theme-text opacity-70 theme-transition">{stat.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent theme-gradient-text theme-transition">
                Our Values
              </h2>
              <p className="text-xl theme-text opacity-80 max-w-3xl mx-auto theme-transition">
                These core principles guide every decision we make and every solution we deliver
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition h-full`}>
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="p-3 bg-primary/20 rounded-lg mr-4">
                          <value.icon className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold theme-text theme-transition">{value.title}</h3>
                      </div>
                      <p className="theme-text opacity-80 theme-transition leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Our Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-20"
          >
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent theme-gradient-text theme-transition">
                Meet Our Team
              </h2>
              <p className="text-xl theme-text opacity-80 max-w-3xl mx-auto theme-transition">
                The talented individuals who make the magic happen
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                >
                  <Card
                    className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition text-center`}
                  >
                    <CardContent className="p-8">
                      <OptimizedImage
                        src={member.image}
                        alt={member.name}
                        width={150}
                        height={150}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="text-xl font-bold theme-text mb-2 theme-transition">{member.name}</h3>
                      <Badge variant="secondary" className="mb-4">
                        {member.role}
                      </Badge>
                      <p className="theme-text opacity-80 theme-transition text-sm">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className={`${getCardBgClass()} backdrop-blur-md border-0 shadow-lg theme-transition`}>
              <CardContent className="p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent theme-gradient-text theme-transition">
                  Ready to Work Together?
                </h2>
                <p className="text-xl theme-text opacity-80 mb-8 max-w-2xl mx-auto theme-transition">
                  Let's discuss your project and see how we can help you achieve your digital goals
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4" asChild>
                    <Link href="/contact">Start Your Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="px-8 py-4 bg-transparent" asChild>
                    <Link href="/portfolio">View Our Work</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
