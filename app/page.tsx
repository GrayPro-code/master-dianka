import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { AboutDiana } from "@/components/philosophy"
import { Projects } from "@/components/projects"
import { Portfolio } from "@/components/portfolio"
import { Reviews } from "@/components/reviews"
import { BookingForm } from "@/components/booking-form"
import { Footer } from "@/components/footer"


export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <AboutDiana />
      <Projects />
      <Portfolio />
      <Reviews />
      <BookingForm />
      <Footer />
    </main>
  )
}
