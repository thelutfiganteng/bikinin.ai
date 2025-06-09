"use client"

import type React from "react"
import { useState } from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import SplashScreen from "@/components/splash-screen"
import { ScrollObserverProvider } from "@/components/scroll-observer"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showSplash, setShowSplash] = useState(true)

  const handleSplashComplete = () => {
    setShowSplash(false)
  }

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <title>Bikinin.ai - Solusi Digital dengan AI untuk Bisnis Anda</title>
        <meta
          name="description"
          content="Layanan manajemen sosial media, pembuatan konten dengan AI, customer service 24 jam, dan pengembangan website profesional."
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {showSplash ? (
            <SplashScreen onComplete={handleSplashComplete} />
          ) : (
            <ScrollObserverProvider>
              <Header />
              {children}
            </ScrollObserverProvider>
          )}
        </ThemeProvider>
      </body>
    </html>
  )
}
