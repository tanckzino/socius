import Navbar from '@/components/landing/Navbar'
import Hero from '@/components/landing/Hero'
import ProfileTypes from '@/components/landing/ProfileTypes'
import Features from '@/components/landing/Features'
import HowItWorks from '@/components/landing/HowItWorks'
import Stats from '@/components/landing/Stats'
import Testimonials from '@/components/landing/Testimonials'
import Pricing from '@/components/landing/Pricing'
import CTASection from '@/components/landing/CTASection'
import Footer from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0D0D0D]">
      <Navbar />
      <Hero />
      <ProfileTypes />
      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <Pricing />
      <CTASection />
      <Footer />
    </main>
  )
}
