"use client"

import { useState, useRef, useEffect } from "react"
import { ScrollReveal } from "@/components/scroll-observer"

interface Partner {
  name: string
  logo: string
}

interface AutoScrollingPartnersProps {
  partners: Partner[]
  speed?: number
  pauseOnHover?: boolean
  className?: string
}

const AutoScrollingPartners = ({
  partners,
  speed = 30,
  pauseOnHover = true,
  className = "",
}: AutoScrollingPartnersProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const innerScrollerRef = useRef<HTMLDivElement>(null)
  const [scrollerWidth, setScrollerWidth] = useState(0)
  const [animationDuration, setAnimationDuration] = useState(0)

  // Duplicate partners array to create seamless scrolling effect
  const allPartners = [...partners, ...partners]

  // Calculate animation duration based on content width and speed
  useEffect(() => {
    if (innerScrollerRef.current) {
      const scrollerWidth = innerScrollerRef.current.offsetWidth
      setScrollerWidth(scrollerWidth)
      // Calculate duration based on width and speed (slower speed = longer duration)
      const calculatedDuration = scrollerWidth / speed
      setAnimationDuration(calculatedDuration)
    }
  }, [partners, speed])

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div
        ref={scrollerRef}
        className="scroller relative flex overflow-hidden"
        onMouseEnter={() => pauseOnHover && setIsHovered(true)}
        onMouseLeave={() => pauseOnHover && setIsHovered(false)}
      >
        <style jsx global>{`
          @keyframes scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-${scrollerWidth / 2}px);
            }
          }

          .scroller-inner {
            animation: scroll ${animationDuration}s linear infinite;
            animation-play-state: ${isHovered ? "paused" : "running"};
            min-width: 100%;
          }
        `}</style>

        <div ref={innerScrollerRef} className="scroller-inner flex items-center justify-around min-width-full">
          {allPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="partner-item flex items-center justify-center mx-8 my-4 transition-transform duration-300 hover:scale-110"
            >
              <div className="bg-white rounded-lg shadow-md p-4 md:p-6 w-40 h-24 md:w-48 md:h-28 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500">
                <img
                  src={partner.logo || "/placeholder.svg?height=80&width=160"}
                  alt={`${partner.name} logo`}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const PartnerSection = () => {
  const partners: Partner[] = [
    { name: "PLN UPDL Palembang", logo: "/images/logoPln.jpg" },
    { name: "ATR-BPN Ogan Komering Ilir", logo: "/images/logoBpn.jpg" },
    // { name: "FutureWorks", logo: "/images/partner3.svg" },
    // { name: "DigitalSolutions", logo: "/images/partner4.svg" },
    // { name: "SmartBusiness", logo: "/images/partner5.svg" },
    // { name: "CloudTech", logo: "/placeholder.svg?height=80&width=160" },
    // { name: "DataMinds", logo: "/placeholder.svg?height=80&width=160" },
    // { name: "AIVentures", logo: "/placeholder.svg?height=80&width=160" },
  ]

  return (
    <section className="py-20 bg-white" id="partners">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal animation="fadeInUp">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Partner Kami</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bergabung dengan ratusan bisnis yang telah mempercayai Bikinin.ai untuk transformasi digital mereka
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fadeIn">
          <div className="relative">
            {/* Gradient fade effect on left side */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10"></div>

            {/* Auto-scrolling partners */}
            <AutoScrollingPartners partners={partners} speed={25} />

            {/* Gradient fade effect on right side */}
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fadeInUp" delay={300}>
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-6">Ingin menjadi partner kami?</p>
            <a href="https://wa.me/628983064613" target="_blank" rel="noopener noreferrer">
              <button className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-medium text-white shadow transition-colors hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Hubungi Kami untuk Partnership
              </button>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default PartnerSection
