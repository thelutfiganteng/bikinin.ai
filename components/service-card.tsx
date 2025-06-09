import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Sparkles, Headphones, Code } from "lucide-react"

interface ServiceProps {
  service: {
    title: string
    description: string
    icon: string
  }
  index?: number
}

const ServiceCard: React.FC<ServiceProps> = ({ service, index = 0 }) => {
  const getIcon = () => {
    switch (service.icon) {
      case "MessageSquare":
        return <MessageSquare className="h-10 w-10 text-blue-600" />
      case "Sparkles":
        return <Sparkles className="h-10 w-10 text-purple-600" />
      case "HeadphonesIcon":
        return <Headphones className="h-10 w-10 text-indigo-600" />
      case "Code":
        return <Code className="h-10 w-10 text-blue-600" />
      default:
        return <MessageSquare className="h-10 w-10 text-blue-600" />
    }
  }

  return (
    <Card
      className="group border-none shadow-lg hover:shadow-2xl transition-all duration-500 ease-standard h-full cursor-pointer ripple-effect hover:scale-105 hover:-translate-y-2"
      style={{
        animationDelay: `${index * 150}ms`,
        animation: "slideInUp 0.6s ease-standard forwards",
      }}
    >
      <CardHeader className="pb-2">
        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300 ease-standard">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-2xl w-fit group-hover:shadow-lg transition-shadow duration-300">
            {getIcon()}
          </div>
        </div>
        <CardTitle className="text-xl font-bold group-hover:text-blue-600 transition-colors duration-300 ease-standard">
          {service.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {service.description}
        </p>
        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-standard">
          <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceCard
