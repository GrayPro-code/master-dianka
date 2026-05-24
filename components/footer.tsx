import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="py-16 md:py-24 bg-[#FF6EAD] text-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/hously-logo.svg"
                alt="Hously"
                width={120}
                height={32}
                className="w-auto h-6"
              />
            </Link>
            <p className="leading-relaxed max-w-sm">
              We design spaces that elevate living. A refined architectural experience where form, light, and intention
              meet.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-medium mb-4">Studio</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="#projects" className="hover:opacity-80 transition">Projects</Link></li>
              <li><Link href="#about" className="hover:opacity-80 transition">About</Link></li>
              <li><Link href="#services" className="hover:opacity-80 transition">Services</Link></li>
              <li><Link href="#contact" className="hover:opacity-80 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium mb-4">Connect</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="mailto:hello@hously.com" className="hover:opacity-80 transition">hello@hously.com</a></li>
              <li><a href="tel:+1234567890" className="hover:opacity-80 transition">+1 (234) 567-890</a></li>
              <li><a href="#" className="hover:opacity-80 transition">Instagram</a></li>
              <li><a href="#" className="hover:opacity-80 transition">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm">
          <p>© 2025 Hously. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:opacity-80 transition">Privacy</Link>
            <Link href="#" className="hover:opacity-80 transition">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
