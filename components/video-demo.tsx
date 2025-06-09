"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface VideoItem {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  category: string
}

const VideoDemo: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const videos: VideoItem[] = [
    {
      id: "social-media",
      title: "Management Sosial Media",
      description:
        "Lihat bagaimana AI mengelola konten sosial media Anda secara otomatis dengan analisis engagement real-time",
      thumbnail: "images/managementsosmed.png",
      duration: "1:00",
      category: "Social Media",
    },
    {
      id: "content-creator",
      title: "Content Creator With AI",
      description: "Demo pembuatan konten blog, caption, dan materi marketing menggunakan AI dalam hitungan detik",
      thumbnail: "images/web.png",
      duration: "2:00",
      category: "AI Content",
    },
    {
      id: "customer-service",
      title: "Customer Service 24 jam With AI",
      description: "Simulasi chatbot AI yang menangani pertanyaan pelanggan dengan respons yang natural dan akurat",
      thumbnail: "images/contentcreator.png",
      duration: "2:58",
      category: "AI Support",
    },
    {
      id: "web-development",
      title: "Website Developing",
      description: "Proses pembuatan website profesional dari konsep hingga deployment dengan teknologi terdepan",
      thumbnail: "images/websitedeveloper.png",
      duration: "4:00",
      category: "Web Dev",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Main Featured Image */}
      <div className="relative">
        {/* <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-sky-twilight to-sky-dusk">
          <div className="aspect-video relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
            <img
              src="https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
              alt="Transformasi Digital dengan Bikinin.ai"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 animate-neon-pulse">
                Transformasi Digital dengan Bikinin.ai
              </h3>
              <p className="text-white/90 text-lg">
                Lihat bagaimana semua layanan kami bekerja secara terintegrasi untuk bisnis Anda
              </p>
            </div>
          </div>
        </Card> */}
      </div>

      {/* Individual Product Demos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video, index) => (
          <Card
            key={video.id}
            className={`group cursor-pointer overflow-hidden border-0 shadow-lg transition-all duration-500 hover:shadow-neon ${
              hoveredCard === video.id ? "scale-105" : ""
            }`}
            onMouseEnter={() => setHoveredCard(video.id)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              animationDelay: `${index * 150}ms`,
              animation: "slideInUp 0.6s ease-out forwards",
            }}
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-gradient-to-r from-blue-neon to-purple-neon text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  {video.category}
                </span>
              </div>

              {/* Duration */}
              <div className="absolute top-4 right-4">
                <span className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded text-sm font-medium">
                  {video.duration}
                </span>
              </div>
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-black group-hover:text-blue-neon transition-colors duration-300 animate-neon-pulse">
                {video.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-black-300 text-sm leading-relaxed mb-4">{video.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default VideoDemo