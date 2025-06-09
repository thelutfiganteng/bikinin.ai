"use client"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, ArrowRight, MessageSquare, Sparkles, Headphones, Code } from "lucide-react"
import TestimonialCard from "@/components/testimonial-card"
import VideoDemo from "@/components/video-demo"
import ContactForm from "@/components/contact-form"
import AboutSection from "@/components/about-section"
import PartnerSection from "@/components/auto-scrolling-partners"
import HeroBackground from "@/components/webgl/hero-background"
import ParticleBackground from "@/components/webgl/particle-background"
import InteractiveCard from "@/components/webgl/interactive-card"
import { ScrollReveal, useScrollObserver } from "@/components/scroll-observer"

export default function Home() {
  const { scrollProgress } = useScrollObserver()
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${scrollProgress})`
    }
  }, [scrollProgress])

  const services = [
    {
      title: "Management Sosial Media",
      description:
        "Kelola semua platform sosial media Anda dengan strategi yang terukur dan konten yang menarik untuk meningkatkan engagement dan konversi.",
      icon: <MessageSquare className="h-10 w-10 text-blue-neon" />,
      color1: "#00f2ff", // Neon blue
      color2: "#6600ff", // Neon indigo
    },
    {
      title: "Content Creator With AI",
      description:
        "Ciptakan konten berkualitas tinggi dengan bantuan AI untuk blog, sosial media, dan kebutuhan marketing lainnya secara cepat dan efisien.",
      icon: <Sparkles className="h-10 w-10 text-purple-neon" />,
      color1: "#bf00ff", // Neon purple
      color2: "#ff00ff", // Neon pink
    },
    {
      title: "Customer Service 24 jam With AI",
      description:
        "Layanan pelanggan non-stop dengan AI yang responsif untuk menjawab pertanyaan dan menyelesaikan masalah pelanggan kapan saja.",
      icon: <Headphones className="h-10 w-10 text-neon-cyan" />,
      color1: "#00ffff", // Neon cyan
      color2: "#00f2ff", // Neon blue
    },
    {
      title: "Website Developing",
      description:
        "Bangun website profesional yang responsif, cepat, dan sesuai dengan kebutuhan bisnis Anda untuk meningkatkan presence online.",
      icon: <Code className="h-10 w-10 text-neon-green" />,
      color1: "#00ff8c", // Neon green
      color2: "#00ffff", // Neon cyan
    },
  ]

  const testimonials = [
    {
      name: "Budi Santoso",
      company: "PT Maju Bersama",
      content:
        "Bikinin.ai telah membantu kami meningkatkan engagement sosial media sebesar 200% dalam 3 bulan. Tim mereka sangat profesional dan responsif.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Siti Rahayu",
      company: "StartUp Indonesia",
      content:
        "Layanan customer service 24 jam dengan AI sangat membantu bisnis kami yang beroperasi secara global. Pelanggan selalu mendapatkan respon cepat.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Dian Wijaya",
      company: "Digital Marketing Agency",
      content:
        "Content yang dihasilkan oleh AI Bikinin.ai sangat berkualitas dan sesuai dengan brand voice kami. Sangat menghemat waktu dan resources.",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <main className="flex min-h-screen flex-col">
      {/* Progress Bar */}
      <div ref={progressBarRef} className="progress-bar" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sky-twilight via-sky-dusk to-sky-night text-white py-20 md:py-32 overflow-hidden">
        <HeroBackground />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal animation="fadeInLeft">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-neon-pulse">
                  Transformasi Digital Bisnis Anda dengan <span className="text-neon-blue">Bikinin.ai</span>
                </h1>
                <p className="text-lg md:text-xl text-blue-100">
                  Solusi AI terdepan untuk manajemen sosial media, pembuatan konten menggunakan AI, layanan pelanggan 24/7, dan
                  pengembangan website profesional.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <a href="#layanan">
                      <Button
                        size="lg"
                        className="bg-transparent border border-neon-cyan text-neon-cyan hover:bg-neon-cyan/10 shadow-neon ripple-effect hover:scale-105 transition-all duration-300"
                      >
                        Mulai Sekarang <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                    <a href="https://wa.me/628983064613" target="_blank" rel="noopener noreferrer">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-neon-pink text-neon-pink hover:bg-neon-pink/10 shadow-neon-pink ripple-effect hover:scale-105 transition-all duration-300"
                      >
                        Hubungi Kami
                      </Button>
                    </a>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fadeInRight" delay={300}>
              <div className="relative">
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-purple-neon rounded-full opacity-20 blur-3xl animate-pulse"></div>
                <div
                  className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-neon rounded-full opacity-20 blur-3xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div className="relative bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-xl hover:shadow-neon transition-all duration-500 hover:scale-105">
                  <img
                    src="images/logo.png"
                    alt="Bikinin.ai Dashboard"
                    className="rounded-lg w-full"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent"></div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-black" id="layanan">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal animation="fadeInUp">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-neon-pulse">Layanan Kami</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Tingkatkan performa bisnis Anda dengan layanan digital terbaik yang didukung teknologi AI
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ScrollReveal key={index} animation="zoomIn" delay={index * 150}>
                <InteractiveCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  color1={service.color1}
                  color2={service.color2}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Video Demo Section */}
      <section className="py-20 bg-gradient-to-br from-sky-aurora to-sky-night relative overflow-hidden" id="demo">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <ScrollReveal animation="fadeInUp">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-neon-pulse">
                Lihat Demo Produk Kami
              </h2>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Saksikan bagaimana Bikinin.ai dapat membantu transformasi digital bisnis Anda
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal animation="fadeIn" delay={300}>
            <div className="max-w-4xl mx-auto">
              <VideoDemo />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Partners Section - Now using AutoScrollingPartners */}
      <PartnerSection />
      

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollReveal animation="zoomIn">
            <div className="bg-gradient-to-br from-sky-twilight to-sky-dusk rounded-3xl p-8 md:p-12 shadow-xl border border-purple-neon/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-white animate-neon-pulse">
                    Siap untuk Transformasi Digital?
                  </h2>
                  <p className="text-xl text-blue-100">
                    Hubungi kami sekarang untuk konsultasi gratis dan mulai tingkatkan bisnis Anda dengan Bikinin.ai
                  </p>
                </div>
                <div className="flex justify-center md:justify-end">
                  <a href="https://wa.me/628983064613" target="_blank" rel="noopener noreferrer">
                    <Button
                      size="lg"
                      className="bg-transparent border border-neon-green text-neon-green hover:bg-neon-green/10 shadow-neon-green px-8 ripple-effect hover:scale-105 transition-all duration-300"
                    >
                      Mulai Sekarang <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold animate-neon-pulse">Bikinin.ai</h3>
              <p className="text-gray-400">Solusi digital terdepan untuk bisnis Anda dengan teknologi AI</p>
              <div className="flex space-x-4">
              <a href="https://wa.me/628983064613" className="text-gray-400 hover:text-neon-cyan transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18.36 5.64a9 9 0 1 0-12.73 12.73l-1.06 3.17 3.17-1.06a9 9 0 0 0 10.62-14.84zM12 3a9 9 0 0 1 6.36 15.36 9 9 0 0 1-12.73 0 9 9 0 0 1 0-12.73A9 9 0 0 1 12 3zm.28 4.9a4.5 4.5 0 0 0-3.9 6.75l-.3.53-.53-.3a.75.75 0 0 0-.75 1.3l1.06.6a.75.75 0 0 0 1.3-.75l-.6-1.06a4.5 4.5 0 0 0 3.83-6.07 4.5 4.5 0 0 0-1.01-.01zm2.47 7.28a.75.75 0 0 0-1.06-.06 3 3 0 0 1-4.24 0 .75.75 0 0 0-1.06 1.06 4.5 4.5 0 0 0 6.36 0 .75.75 0 0 0 .06-1zm-2.47-2.47a.75.75 0 0 0 0 1.06 1.5 1.5 0 0 1 0 2.12.75.75 0 0 0 1.06 1.06 3 3 0 0 0 0-4.24.75.75 0 0 0-1.06 0z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/bikinin.ai/" className="text-gray-400 hover:text-neon-pink transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                {/* <a href="#" className="text-gray-400 hover:text-blue-neon transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a> */}
                {/* <a href="#" className="text-gray-400 hover:text-purple-neon transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a> */}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-neon-cyan">Layanan</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Management Sosial Media
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Content Creator With AI
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Customer Service 24 jam
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Website Developing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-purple-neon">Perusahaan</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#tentang" className="text-gray-400 hover:text-white transition-colors">
                    Tentang Kami
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Karir
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Partner
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-neon-green">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Kontak
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Dokumentasi
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Kebijakan Privasi
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Bikinin.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
