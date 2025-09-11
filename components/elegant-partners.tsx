"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { OptimizedImage } from "./optimized-image"
import { useThemeContext } from "@/context/theme-context"
import { PartnersCMS } from "@/lib/supabase-cms"
import type { TrustedPartner } from "@/lib/supabase"

export function ElegantPartners() {
  const { mode, color } = useThemeContext()
  const [partners, setPartners] = useState<TrustedPartner[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPartners()
  }, [])

  const loadPartners = async () => {
    try {
      const data = await PartnersCMS.getPublishedPartners()
      setPartners(data)
    } catch (error) {
      console.error("Error loading partners:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getCardBgClass = () => {
    if (mode === "dark" || color === "black") {
      return "bg-gray-900/40"
    } else {
      return "bg-white/40"
    }
  }

  if (isLoading) {
    return (
      <section className="py-20 theme-bg theme-transition">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-64 mx-auto mb-4 animate-pulse" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-6 animate-pulse`}>
                <div className="h-16 bg-gray-300 dark:bg-gray-700 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (partners.length === 0) {
    return null
  }

  return (
    <section className="py-20 theme-bg theme-transition relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent theme-gradient-text theme-transition mb-6">
            Trusted Partners
          </h2>
          <p className="text-xl theme-text opacity-80 theme-transition max-w-3xl mx-auto">
            We collaborate with industry leaders to deliver exceptional results for our clients.
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 theme-transition group cursor-pointer`}
              onClick={() => partner.company_website && window.open(partner.company_website, "_blank")}
            >
              <div className="relative h-16 flex items-center justify-center">
                <OptimizedImage
                  src={partner.company_logo}
                  alt={partner.company_name}
                  width={120}
                  height={60}
                  className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                />
              </div>

              {/* Partner Info on Hover */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="font-semibold theme-text text-center text-sm theme-transition">
                  {partner.company_name}
                </h4>
                {partner.partnership_type && (
                  <p className="text-xs theme-text opacity-70 text-center mt-1 capitalize theme-transition">
                    {partner.partnership_type} Partner
                  </p>
                )}
                {partner.is_featured && (
                  <div className="flex justify-center mt-2">
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-600 rounded text-xs font-medium">
                      Featured
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Partners Section */}
        {partners.some((p) => p.is_featured) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <h3 className="text-2xl font-bold theme-text text-center mb-8 theme-transition">Featured Partnerships</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners
                .filter((p) => p.is_featured)
                .map((partner, index) => (
                  <motion.div
                    key={partner.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`${getCardBgClass()} backdrop-blur-md rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 theme-transition`}
                  >
                    <div className="text-center">
                      <div className="relative h-20 mb-4 flex items-center justify-center">
                        <OptimizedImage
                          src={partner.company_logo}
                          alt={partner.company_name}
                          width={160}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                      <h4 className="font-bold theme-text mb-2 theme-transition">{partner.company_name}</h4>
                      {partner.description && (
                        <p className="theme-text opacity-70 text-sm theme-transition">{partner.description}</p>
                      )}
                      {partner.company_website && (
                        <a
                          href={partner.company_website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-4 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
                        >
                          Visit Website →
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
