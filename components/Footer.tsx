import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-6 px-6 flex items-center justify-between">
      <p className="text-sm">© 2023 AI Chat. All rights reserved.</p>
      <nav className="flex items-center gap-4">
        <Link href="/terms" className="hover:underline">
          Terms of Service
        </Link>
        <Link href="/privacy" className="hover:underline">
          Privacy Policy
        </Link>
      </nav>
    </footer>
  )
}