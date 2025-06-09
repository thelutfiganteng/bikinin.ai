"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal } from "@/components/scroll-observer"
import { Users, Target, Lightbulb, Award, Globe, Zap, Heart, TrendingUp, Shield } from "lucide-react"

interface TeamMember {
  name: string
  role: string
  description: string
  avatar: string
  skills: string[]
  social: {
    linkedin?: string
    twitter?: string
    github?: string
  }
}

interface Stat {
  number: string
  label: string
  icon: React.ReactNode
}

interface Value {
  title: string
  description: string
  icon: React.ReactNode
}

const AboutSection: React.FC = () => {
  const stats: Stat[] = [
    {
      number: "500+",
      label: "Klien Puas",
      icon: <Users className="h-8 w-8 text-blue-600" />,
    },
    {
      number: "1000+",
      label: "Proyek Selesai",
      icon: <Target className="h-8 w-8 text-purple-600" />,
    },
    {
      number: "99%",
      label: "Tingkat Kepuasan",
      icon: <Award className="h-8 w-8 text-indigo-600" />,
    },
    {
      number: "24/7",
      label: "Support AI",
      icon: <Zap className="h-8 w-8 text-blue-600" />,
    },
  ]

  const values: Value[] = [
    {
      title: "Inovasi Berkelanjutan",
      description: "Kami selalu mengadopsi teknologi terdepan untuk memberikan solusi terbaik bagi klien.",
      icon: <Lightbulb className="h-12 w-12 text-yellow-500" />,
    },
    {
      title: "Kualitas Terjamin",
      description: "Setiap proyek dikerjakan dengan standar kualitas tinggi dan perhatian detail yang maksimal.",
      icon: <Shield className="h-12 w-12 text-green-500" />,
    },
    {
      title: "Kolaborasi Tim",
      description: "Kami percaya bahwa kerja sama tim yang solid menghasilkan solusi yang luar biasa.",
      icon: <Heart className="h-12 w-12 text-red-500" />,
    },
    {
      title: "Pertumbuhan Bersama",
      description: "Kesuksesan klien adalah kesuksesan kami. Kami berkomitmen untuk tumbuh bersama.",
      icon: <TrendingUp className="h-12 w-12 text-blue-500" />,
    },
  ]

  const teamMembers: TeamMember[] = [
    {
      name: "Ahmad Rizki",
      role: "CEO & Founder",
      description:
        "Visioner dengan pengalaman 10+ tahun di bidang teknologi dan AI. Memimpin transformasi digital untuk berbagai perusahaan.",
      avatar: "/placeholder.svg?height=300&width=300",
      skills: ["AI Strategy", "Business Development", "Leadership"],
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Sari Dewi",
      role: "CTO & Co-Founder",
      description:
        "Expert dalam pengembangan AI dan machine learning. Bertanggung jawab atas inovasi teknologi di Bikinin.ai.",
      avatar: "/placeholder.svg?height=300&width=300",
      skills: ["Machine Learning", "AI Development", "System Architecture"],
      social: {
        linkedin: "#",
        github: "#",
      },
    },
    {
      name: "Budi Santoso",
      role: "Head of Design",
      description:
        "Creative director dengan passion untuk user experience. Menciptakan desain yang tidak hanya indah tapi juga fungsional.",
      avatar: "/placeholder.svg?height=300&width=300",
      skills: ["UI/UX Design", "Brand Identity", "Creative Direction"],
      social: {
        linkedin: "#",
        twitter: "#",
      },
    },
    {
      name: "Maya Putri",
      role: "Lead Developer",
      description:
        "Full-stack developer dengan expertise dalam modern web technologies. Mengubah ide menjadi aplikasi yang powerful.",
      avatar: "/placeholder.svg?height=300&width=300",
      skills: ["React", "Node.js", "Cloud Architecture"],
      social: {
        linkedin: "#",
        github: "#",
      },
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50" id="tentang">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <ScrollReveal animation="fadeInUp">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-blue-600 border-blue-600">
              Tentang Kami
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Membangun Masa Depan Digital Bersama</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Bikinin.ai lahir dari visi untuk memberdayakan bisnis Indonesia dengan teknologi AI terdepan. Kami percaya
              bahwa setiap bisnis, besar atau kecil, berhak mendapatkan akses ke solusi digital yang canggih.
            </p>
          </div>
        </ScrollReveal>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <ScrollReveal animation="fadeInLeft">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">Cerita Kami</h3>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Didirikan pada tahun 2025, Bikinin.ai muncul sebagai respons terhadap kebutuhan
                  mendesak akan transformasi digital. Kami melihat banyak bisnis yang kesulitan beradaptasi dengan era
                  digital yang bergerak cepat.
                </p>
                <p>
                  Dengan tim yang terdiri dari para ahli AI, developer berpengalaman, dan creative minds, kami mulai
                  membangun solusi yang tidak hanya canggih secara teknologi, tetapi juga mudah digunakan dan terjangkau
                  untuk semua kalangan bisnis.
                </p>
                <p>
                  ~M Lutfi Kurniawan as Leader~
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fadeInRight" delay={200}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl opacity-20"></div>
              <img
                src="/images/leader.jpg"
                alt="Bikinin.ai Team"
                className="relative rounded-xl shadow-xl w-full h-auto"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Stats Section */}

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <ScrollReveal animation="fadeInLeft">
            <Card className="p-8 border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Misi Kami</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Memberdayakan setiap bisnis di Indonesia dengan teknologi AI yang mudah diakses, terjangkau, dan
                  efektif. Kami berkomitmen untuk menjadi partner terpercaya dalam perjalanan transformasi digital
                  setiap klien.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal animation="fadeInRight" delay={200}>
            <Card className="p-8 border-none shadow-lg hover:shadow-xl transition-all duration-300 h-full">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Visi Kami</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Menjadi perusahaan teknologi AI terdepan di Asia Tenggara yang dikenal karena inovasi, kualitas, dan
                  dampak positif terhadap ekosistem bisnis digital regional.
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>

        {/* Values Section */}
        <ScrollReveal animation="fadeInUp">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nilai-Nilai Kami</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Prinsip-prinsip yang memandu setiap langkah kami dalam memberikan layanan terbaik
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((value, index) => (
            <ScrollReveal key={index} animation="zoomIn" delay={index * 150}>
              <Card className="p-6 border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
                <CardContent className="p-0 text-center">
                  <div className="mb-6 flex justify-center">
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-2xl">{value.icon}</div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        

        
      </div>
    </section>
  )
}

export default AboutSection
