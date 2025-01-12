'use client';

import { Hero } from '@/components/Hero'
import { Features } from '@/components/Features'
import { Footer } from '@/components/Footer'
import { ParticleBackground } from '@/components/ParticleBackground'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col relative overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10 flex-grow">
        <div className="w-full max-w-[2560px] mx-auto">
          <Hero />
          <Features />
        </div>
      </div>
      <Footer />
    </div>
  )
}