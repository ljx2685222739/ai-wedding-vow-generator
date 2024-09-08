import Header from '@/components/Header'
import ChatInterface from '@/components/ChatInterface'
import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <div className="flex-grow"> {/* 添加这个 div */}
          <ChatInterface />
        </div>
        <AboutSection />
      </main>
      <Footer />
    </div>
  )
}
