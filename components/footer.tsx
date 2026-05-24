import Link from "next/link"
import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 fill-primary text-primary" />
          <span className="font-serif font-bold text-foreground">
            BloodBridge
          </span>
        </div>
        <div className="flex gap-8">
          <Link
            href="/search"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Find Donors
          </Link>
          <Link
            href="/register"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Register
          </Link>
          <Link
            href="/auth/login"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Log In
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          Made in India. Built to save lives.
        </p>
      </div>
    </footer>
  )
}
