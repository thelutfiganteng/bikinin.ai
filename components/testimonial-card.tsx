import type React from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface TestimonialProps {
  testimonial: {
    name: string
    company: string
    content: string
    avatar: string
  }
  index?: number
}

const TestimonialCard: React.FC<TestimonialProps> = ({ testimonial, index = 0 }) => {
  return (
    <Card
      className="bg-white/10 backdrop-blur-sm border-white/20 shadow-lg h-full hover:shadow-2xl hover:bg-white/15 transition-all duration-500 ease-standard hover:scale-105 hover:-translate-y-2 ripple-effect"
      style={{
        animationDelay: `${index * 200}ms`,
        animation: "fadeInScale 0.6s ease-standard forwards",
      }}
    >
      <CardContent className="pt-6">
        <div className="mb-4 transform hover:scale-110 transition-transform duration-300">
          <svg
            width="45"
            height="36"
            className="text-purple-300 opacity-70"
            viewBox="0 0 45 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 18H9C9 12.477 13.477 8 19 8V12C15.686 12 13 14.686 13 18H13.5C15.433 18 17 19.567 17 21.5V30.5C17 32.433 15.433 34 13.5 34H4.5C2.567 34 1 32.433 1 30.5V21.5C1 19.567 2.567 18 4.5 18H13.5ZM40.5 18H36C36 12.477 40.477 8 46 8V12C42.686 12 40 14.686 40 18H40.5C42.433 18 44 19.567 44 21.5V30.5C44 32.433 42.433 34 40.5 34H31.5C29.567 34 28 32.433 28 30.5V21.5C28 19.567 29.567 18 31.5 18H40.5Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <p className="text-white/90 mb-6 leading-relaxed">{testimonial.content}</p>
      </CardContent>
      <CardFooter className="border-t border-white/10 pt-4">
        <div className="flex items-center gap-4">
          <Avatar className="hover:scale-110 transition-transform duration-300">
            <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
            <AvatarFallback className="bg-purple-700">{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-white hover:text-purple-200 transition-colors duration-300">
              {testimonial.name}
            </p>
            <p className="text-sm text-blue-200 hover:text-blue-100 transition-colors duration-300">
              {testimonial.company}
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TestimonialCard
