import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ContactForm: React.FC = () => {
  return (
    <form className="space-y-6 bg-white p-6 rounded-xl shadow-lg">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Nama
            </label>
            <Input id="name" placeholder="Nama Lengkap" className="border-gray-300" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <Input id="email" type="email" placeholder="email@perusahaan.com" className="border-gray-300" />
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-medium text-gray-700">
            Perusahaan
          </label>
          <Input id="company" placeholder="Nama Perusahaan" className="border-gray-300" />
        </div>
        <div className="space-y-2">
          <label htmlFor="service" className="text-sm font-medium text-gray-700">
            Layanan yang Diminati
          </label>
          <Select>
            <SelectTrigger className="border-gray-300">
              <SelectValue placeholder="Pilih Layanan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="social-media">Management Sosial Media</SelectItem>
              <SelectItem value="content-creator">Content Creator With AI</SelectItem>
              <SelectItem value="customer-service">Customer Service 24 jam With AI</SelectItem>
              <SelectItem value="web-dev">Website Developing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-gray-700">
            Pesan
          </label>
          <Textarea id="message" placeholder="Ceritakan kebutuhan Anda..." className="border-gray-300 min-h-[120px]" />
        </div>
      </div>
      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
        Kirim Pesan
      </Button>
    </form>
  )
}

export default ContactForm
