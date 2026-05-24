import { Header } from "@/components/header"
import { ThreeDCardHero } from "@/components/3d-card-demo"
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
      <ThreeDCardHero />
      <AboutDiana />
      <Projects />
      <Portfolio />
      <Reviews />
      <BookingForm />
      <Footer />
    </main>
  )
}
