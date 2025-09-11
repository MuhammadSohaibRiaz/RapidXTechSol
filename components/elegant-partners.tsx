"use client"

import { useState, useEffect } from "react"
import type { TrustedPartner } from "@/lib/supabase"
import { OptimizedImage } from "./optimized-image"

interface ElegantPartnersProps {
  partners: TrustedPartner[]
}

export function ElegantPartners({ partners }: ElegantPartnersProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (partners.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % partners.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [partners.length])

  if (!partners || partners.length === 0) {
    return null
  }

  // Show all partners if 6 or fewer, otherwise show in carousel
  const showCarousel = partners.length > 6
  const visiblePartners = showCarousel ? partners.slice(currentIndex, currentIndex + 6) : partners

  return (
    <div className="w-full">
      {showCarousel ? (
        <div className="relative overflow-hidden">
          <div className="flex transition-transform duration-500 ease-in-out">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 w-full">
              {visiblePartners.map((partner, index) => (
                <PartnerCard key={`${partner.id}-${currentIndex}-${index}`} partner={partner} />
              ))}
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(partners.length / 6) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 6)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Math.floor(currentIndex / 6) === index
                    ? "bg-blue-600 dark:bg-blue-400"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      )}
    </div>
  )
}

function PartnerCard({ partner }: { partner: TrustedPartner }) {
  return (
    <div className="group flex items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700">
      <div className="relative w-full h-16 flex items-center justify-center">
        {partner.company_website ? (
          <a
            href={partner.company_website}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
            title={partner.description || partner.company_name}
          >
            <OptimizedImage
              src={partner.company_logo}
              alt={partner.company_name}
              fill
              className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
            />
          </a>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <OptimizedImage
              src={partner.company_logo}
              alt={partner.company_name}
              fill
              className="object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
            />
          </div>
        )}
      </div>
    </div>
  )
}
