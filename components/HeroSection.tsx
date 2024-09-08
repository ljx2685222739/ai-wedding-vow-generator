"use client";  // Add this line at the top of the file

import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  const scrollToChat = () => {
    const chatElement = document.getElementById('chat-interface');
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center">
      <Image
        src="/hero-image.jpg"
        alt="Wedding Vows Background"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Create Your Perfect Wedding Vows
        </h1>
        <p className="text-xl text-white mb-8">
          Let our AI assist you in crafting heartfelt and personalized vows
        </p>
        <Button onClick={scrollToChat} size="lg">
          Start Generate
        </Button>
      </div>
    </div>
  )
}