"use client"

import { motion } from "framer-motion"
import { useThemeContext } from "@/context/theme-context"
import type { TrustedPartner } from "@/lib/supabase"
import { getImageUrl } from "@/lib/utils"

interface ElegantPartnersProps {
  partners: TrustedPartner[]
}

export function ElegantPartners({ partners }: ElegantPartnersProps) {
  const { mode, color } = useThemeContext()

  const getCardBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/20"
    } else {
      return "bg-white/20"
    }
  }

  if (partners.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={`${getCardBgClass()} backdrop-blur-sm rounded-2xl p-8 theme-transition`}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
        {partners.map((partner, index) => (
          <motion.div
            key={partner.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center group"
          >
            {partner.company_website ? (
              <a
                href={partner.company_website}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-all duration-300 hover:scale-110 filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
                title={partner.company_name}
              >
                <img
                  src={getImageUrl(partner.company_logo) || "/placeholder.svg"}
                  alt={partner.company_name}
                  className="h-12 w-auto max-w-full object-contain"
                />
              </a>
            ) : (
              <div
                className="transition-all duration-300 hover:scale-110 filter grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
                title={partner.company_name}
              >
                <img
                  src={getImageUrl(partner.company_logo) || "/placeholder.svg"}
                  alt={partner.company_name}
                  className="h-12 w-auto max-w-full object-contain"
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
