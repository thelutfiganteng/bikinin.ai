"use client"

import { createContext, useContext, useRef, useEffect, useState, type ReactNode } from "react"

interface ScrollObserverContextType {
  scrollY: number
  scrollProgress: number
}

const ScrollObserverContext = createContext<ScrollObserverContextType>({
  scrollY: 0,
  scrollProgress: 0,
})

export const useScrollObserver = () => useContext(ScrollObserverContext)

interface ScrollObserverProviderProps {
  children: ReactNode
}

export const ScrollObserverProvider = ({ children }: ScrollObserverProviderProps) => {
  const [scrollY, setScrollY] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Calculate scroll progress (0 to 1)
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1)
      setScrollProgress(progress)
    }

    // Set initial values
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return <ScrollObserverContext.Provider value={{ scrollY, scrollProgress }}>{children}</ScrollObserverContext.Provider>
}

interface ScrollRevealProps {
  children: ReactNode
  threshold?: number
  rootMargin?: string
  animation?: string
  delay?: number
  duration?: number
  once?: boolean
  className?: string
}

export const ScrollReveal = ({
  children,
  threshold = 0.1,
  rootMargin = "0px",
  animation = "fadeInScale",
  delay = 0,
  duration = 800,
  once = true,
  className = "",
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin, once])

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? "animate-" + animation : "opacity-0"}`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
        animationFillMode: "both",
      }}
    >
      {children}
    </div>
  )
}

interface ParallaxProps {
  children: ReactNode
  speed?: number
  className?: string
  direction?: "up" | "down" | "left" | "right"
}

export const Parallax = ({ children, speed = 0.5, className = "", direction = "up" }: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      // Check if element is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate how far the element is from the center of the viewport
        const elementCenter = rect.top + rect.height / 2
        const viewportCenter = windowHeight / 2
        const distanceFromCenter = elementCenter - viewportCenter

        // Calculate parallax offset
        const newOffset = distanceFromCenter * speed * -0.1
        setOffset(newOffset)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  const getTransform = () => {
    switch (direction) {
      case "up":
      case "down":
        return `translateY(${direction === "down" ? -offset : offset}px)`
      case "left":
      case "right":
        return `translateX(${direction === "right" ? -offset : offset}px)`
      default:
        return `translateY(${offset}px)`
    }
  }

  return (
    <div
      ref={ref}
      className={`${className} transition-transform will-change-transform`}
      style={{
        transform: getTransform(),
      }}
    >
      {children}
    </div>
  )
}
