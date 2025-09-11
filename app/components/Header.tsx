"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../../components/ui/button"
import { usePathname } from "next/navigation"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { useThemeContext } from "@/context/theme-context"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { color, mode } = useThemeContext()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Determine header background based on theme and scroll state
  const getHeaderBgClass = () => {
    if (isScrolled) {
      if (color === "white" && mode === "light") {
        return "bg-white/90 backdrop-blur-md border-b border-gray-200"
      } else if (color === "black" || mode === "dark") {
        return "bg-gray-900/80 backdrop-blur-md"
      } else {
        return "bg-background/80 backdrop-blur-md"
      }
    } else {
      return "bg-transparent"
    }
  }

  // Determine mobile menu background based on theme
  const getMobileMenuBgClass = () => {
    if (color === "white" && mode === "light") {
      return "bg-white/95 backdrop-blur-md border-t border-gray-200"
    } else {
      return "bg-gray-900/95 backdrop-blur-md"
    }
  }

  // Determine mobile menu text color based on theme
  const getMobileMenuTextClass = () => {
    if (color === "white" && mode === "light") {
      return "text-gray-800"
    } else {
      return "text-white"
    }
  }

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${getHeaderBgClass()}`}>
      <nav className="container mx-auto mb-5 px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            <span className="bg-clip-text text-transparent theme-gradient-text theme-transition">RapidXTech</span>
          </Link>
          <div className="flex items-center space-x-4">
            <ThemeSwitcher />
            <Button
              variant="ghost"
              className="theme-text md:hidden theme-transition"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              Menu
            </Button>
          </div>
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`theme-text hover:opacity-80 transition-colors relative ${
                  pathname === item.href ? "opacity-100 font-medium" : "opacity-80"
                } theme-transition`}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-current" layoutId="underline" />
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`md:hidden ${getMobileMenuBgClass()}`}
          >
            <div className="container mx-auto px-6 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block py-2 ${getMobileMenuTextClass()} hover:opacity-80 transition-colors ${
                    pathname === item.href ? "opacity-100 font-medium" : "opacity-80"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
