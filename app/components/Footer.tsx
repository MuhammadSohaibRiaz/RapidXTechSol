"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, Instagram, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useThemeContext } from "@/context/theme-context"

export function Footer() {
  const { mode, color } = useThemeContext()

  const getCardBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/80"
    } else {
      return "bg-white/80"
    }
  }

  const getTextClass = () => {
    if (mode === "dark" || color === "black") {
      return "text-white"
    } else {
      return "text-gray-900"
    }
  }

  const getSecondaryTextClass = () => {
    if (mode === "dark" || color === "black") {
      return "text-gray-300"
    } else {
      return "text-gray-600"
    }
  }

  const getMutedTextClass = () => {
    if (mode === "dark" || color === "black") {
      return "text-gray-400"
    } else {
      return "text-gray-500"
    }
  }

  return (
    <footer
      className={`${getCardBgClass()} backdrop-blur-md border-t border-gray-200 dark:border-gray-800 theme-transition`}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className={`text-2xl font-bold ${getTextClass()} mb-4 theme-transition`}>RapidXTech</h3>
            <p className={`${getSecondaryTextClass()} mb-6 theme-transition`}>
              Transforming ideas into powerful digital solutions. We specialize in web development, mobile apps, and
              enterprise software that drives business growth.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61578327400188"
                target="_blank"
                rel="noopener noreferrer"
                className={`${getMutedTextClass()} hover:text-primary theme-transition`}
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/108194958"
                target="_blank"
                rel="noopener noreferrer"
                className={`${getMutedTextClass()} hover:text-primary theme-transition`}
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/RapidxTech"
                target="_blank"
                rel="noopener noreferrer"
                className={`${getMutedTextClass()} hover:text-primary theme-transition`}
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/rapidxtech/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${getMutedTextClass()} hover:text-primary theme-transition`}
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className={`text-lg font-semibold ${getTextClass()} mb-4 theme-transition`}>Quick Links</h4>
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
                    className={`${getSecondaryTextClass()} hover:text-primary theme-transition flex items-center group`}
                  >
                    <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
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
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className={`text-lg font-semibold ${getTextClass()} mb-4 theme-transition`}>Services</h4>
            <ul className="space-y-2">
              {[
                "Web Development",
                "Mobile App Development",
                "UI/UX Design",
                "E-commerce Solutions",
                "Enterprise Software",
                "Digital Marketing",
              ].map((service) => (
                <li key={service}>
                  <span className={`${getSecondaryTextClass()} theme-transition`}>{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className={`text-lg font-semibold ${getTextClass()} mb-4 theme-transition`}>Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className={`w-4 h-4 ${getMutedTextClass()} mr-3`} />
                <a
                  href="mailto:info@rapidxtech.com"
                  className={`${getSecondaryTextClass()} hover:text-primary theme-transition`}
                >
                  info@rapidxtech.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className={`w-4 h-4 ${getMutedTextClass()} mr-3`} />
                <a href="tel:+1234567890" className={`${getSecondaryTextClass()} hover:text-primary theme-transition`}>
                  +1 (234) 567-8900
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className={`w-4 h-4 ${getMutedTextClass()} mr-3 mt-1`} />
                <span className={`${getSecondaryTextClass()} theme-transition`}>
                  123 Tech Street
                  <br />
                  Innovation City, IC 12345
                </span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className={`text-sm font-semibold ${getTextClass()} mb-2 theme-transition`}>Stay Updated</h5>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className={`${getTextClass()} bg-transparent border-gray-300 dark:border-gray-600 rounded-r-none`}
                />
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-l-none">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className={`${getMutedTextClass()} text-sm theme-transition`}>© 2024 RapidXTech. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className={`${getMutedTextClass()} hover:text-primary text-sm theme-transition`}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={`${getMutedTextClass()} hover:text-primary text-sm theme-transition`}>
              Terms of Service
            </Link>
            <Link href="/cookies" className={`${getMutedTextClass()} hover:text-primary text-sm theme-transition`}>
              Cookie Policy
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
