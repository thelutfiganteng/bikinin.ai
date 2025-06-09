"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"

const Header: React.FC = () => {
  const isMobile = useMobile()

  const navItems = [
    { name: "Beranda", href: "/" },
    { name: "Layanan", href: "#layanan" },
    { name: "Tentang", href: "#tentang" },
    { name: "Demo", href: "#demo" },
    { name: "Partner", href: "#partners" },
    { name: "Kontak", href: "#kontak" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Bikinin.ai Logo" className="h-20 w-auto" />
            {/* <span className="text-xl font-bold">Bikinin.ai</span> */}
          </Link>
        </div>

        {!isMobile ? (
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        ) : null}

        <div className="flex items-center gap-4">
          <a href="https://wa.me/628983064613" target="_blank" rel="noopener noreferrer">
            <Button className="hidden md:flex bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              Mulai Gratis
            </Button>
          </a>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 mt-4">
                  <a href="https://wa.me/628983064613" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Mulai Gratis
                    </Button>
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Header
