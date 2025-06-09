import type React from "react"

interface PartnerProps {
  partner: {
    name: string
    logo: string
  }
}

const PartnerLogo: React.FC<PartnerProps> = ({ partner }) => {
  return (
    <div className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300">
      <img src={partner.logo || "/placeholder.svg"} alt={`${partner.name} logo`} className="h-12 md:h-16" />
    </div>
  )
}

export default PartnerLogo
