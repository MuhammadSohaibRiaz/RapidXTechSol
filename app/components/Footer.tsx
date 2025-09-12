"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Linkedin, Twitter, Instagram } from "lucide-react"

const Footer = () => {
  return (
    <footer className="theme-bg theme-transition backdrop-blur-md">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2 theme-text theme-transition">RapidXTech</h3>
            <p className="text-sm theme-text opacity-80 theme-transition">
              Delivering innovative software solutions with a focus on quality and client success.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2 theme-text theme-transition">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="theme-text opacity-80 hover:opacity-100 transition-colors theme-transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="theme-text opacity-80 hover:opacity-100 transition-colors theme-transition"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="theme-text opacity-80 hover:opacity-100 transition-colors theme-transition"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="theme-text opacity-80 hover:opacity-100 transition-colors theme-transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="theme-text opacity-80 hover:opacity-100 transition-colors theme-transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2 theme-text theme-transition">Connect With Us</h4>
            <div className="flex space-x-4">
              <motion.a
                href="https://www.facebook.com/profile.php?id=61578327400188"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-text hover:opacity-80 transition-colors theme-transition"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/108194958"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-text hover:opacity-80 transition-colors theme-transition"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://x.com/RapidxTech"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-text hover:opacity-80 transition-colors theme-transition"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">X (Twitter)</span>
                <Twitter className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/rapidxtech/"
                target="_blank"
                rel="noopener noreferrer"
                className="theme-text hover:opacity-80 transition-colors theme-transition"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </motion.a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-current border-opacity-10 pt-8 text-sm text-center">
          <p className="theme-text opacity-80 theme-transition">&copy; 2024 RapidXTech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
