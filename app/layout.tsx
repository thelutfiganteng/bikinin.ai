import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import ClientLayout from "./ClientLayout"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}

export const metadata = {
      generator: 'v0.dev'
    };
