import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image src="/logo.png" alt="Logo" width={200} height={100} /> {/* 更新了宽度和高度 */}
        <Link href="/" className="font-bold text-lg">
          AI Wedding Vow Generator
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/login" className="hover:underline">
          Login
        </Link>
        <Button variant="secondary">Sign Up</Button>
      </div>
    </header>
  )
}