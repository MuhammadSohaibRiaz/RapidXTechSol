"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Linkedin, Twitter, Instagram, Mail, Phone, MapPin, ArrowRight } from "lucide-react"
import { useThemeContext } from "@/context/theme-context"

export default function Footer() {
  const { mode, color } = useThemeContext()

  const getTextClass = () => {
    if (mode === "dark" || color === "black") {
      return "text-gray-300"
    } else {
      return "text-gray-600"
    }
  }

  const getHeadingClass = () => {
    if (mode === "dark" || color === "black") {
      return "text-white"
    } else {
      return "text-gray-900"
    }
  }

  const getBorderClass = () => {
    if (mode === "dark" || color === "black") {
      return "border-gray-700"
    } else {
      return "border-gray-200"
    }
  }

  const getCardBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/50"
    } else {
      return "bg-white/50"
    }
  }

  return (
    <footer className="theme-bg theme-transition relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,rgba(255,255,255,0),white,rgba(255,255,255,0))]" />
        <motion.div
          className="absolute inset-0 theme-glow blur-3xl theme-transition opacity-20"
          animate={{
            x: ["0%", "100%", "0%"],
            y: ["0%", "50%", "0%"],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className={`text-2xl font-bold ${getHeadingClass()} theme-transition`}>RapidXTech</h3>
            <p className={`${getTextClass()} theme-transition leading-relaxed`}>
              Transforming ideas into powerful digital solutions. We specialize in web development, mobile apps, and
              custom software that drives business growth.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://www.facebook.com/profile.php?id=61578327400188"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white hover:shadow-lg transition-shadow"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/108194958"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white hover:shadow-lg transition-shadow"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://x.com/RapidxTech"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white hover:shadow-lg transition-shadow"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/rapidxtech/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white hover:shadow-lg transition-shadow"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className={`text-lg font-semibold ${getHeadingClass()} theme-transition`}>Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Portfolio", href: "/portfolio" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`${getTextClass()} hover:text-primary theme-transition flex items-center group`}
                  >
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className={`text-lg font-semibold ${getHeadingClass()} theme-transition`}>Services</h4>
            <ul className="space-y-2">
              {[
                "Web Development",
                "Mobile Apps",
                "E-commerce Solutions",
                "Custom Software",
                "UI/UX Design",
                "Digital Marketing",
              ].map((service) => (
                <li key={service}>
                  <span className={`${getTextClass()} theme-transition flex items-center group cursor-pointer`}>
                    <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h4 className={`text-lg font-semibold ${getHeadingClass()} theme-transition`}>Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <a
                  href="mailto:info@rapidxtech.com"
                  className={`${getTextClass()} hover:text-primary theme-transition`}
                >
                  sohaibriaz201@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+1234567890" className={`${getTextClass()} hover:text-primary theme-transition`}>
                  +92 (325) 484-8523
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary mt-1" />
                <span className={`${getTextClass()} theme-transition`}>
                  Y Block, Main Street
                  <br />
                  Sheikhupura City, 39350
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-6 mb-8 ${getBorderClass()} border theme-transition`}
        >
          <div className="text-center">
            <h4 className={`text-xl font-semibold ${getHeadingClass()} mb-2 theme-transition`}>Stay Updated</h4>
            <p className={`${getTextClass()} mb-4 theme-transition`}>
              Subscribe to our newsletter for the latest tech insights and project updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className={`flex-1 px-4 py-2 rounded-lg ${getCardBgClass()} ${getBorderClass()} border ${getTextClass()} placeholder-gray-400 focus:outline-none focus:border-primary theme-transition`}
              />
              <button className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg transition-shadow font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className={`border-t ${getBorderClass()} pt-8 theme-transition`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className={`${getTextClass()} text-sm theme-transition`}>© 2024 RapidXTech. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/privacy" className={`${getTextClass()} hover:text-primary text-sm theme-transition`}>
                Privacy Policy
              </Link>
              <Link href="/terms" className={`${getTextClass()} hover:text-primary text-sm theme-transition`}>
                Terms of Service
              </Link>
              <Link href="/cookies" className={`${getTextClass()} hover:text-primary text-sm theme-transition`}>
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
