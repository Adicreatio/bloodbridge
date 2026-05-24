import Link from "next/link"
import { Droplets, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center lg:py-36">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-medium text-secondary-foreground">
            Seva through blood donation
          </span>
        </div>

        <h1 className="max-w-4xl text-balance text-4xl font-bold leading-tight tracking-tight font-serif text-foreground md:text-6xl lg:text-7xl">
          Find blood donors{" "}
          <span className="text-primary">across India</span>
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
          BloodBridge connects blood donors with those in need across every state and city in India. Register as a donor or search for one near you -- every drop of blood can save a life.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link href="/search">
            <Button size="lg" className="gap-2 px-8 text-base">
              <Search className="h-4 w-4" />
              Find a Donor
            </Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline" className="gap-2 px-8 text-base">
              <Droplets className="h-4 w-4" />
              Register as Donor
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-20 grid w-full max-w-4xl grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-foreground font-serif md:text-4xl">
              36
            </span>
            <span className="mt-1 text-sm text-muted-foreground">
              States & UTs
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-foreground font-serif md:text-4xl">
              500+
            </span>
            <span className="mt-1 text-sm text-muted-foreground">
              Cities Covered
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-foreground font-serif md:text-4xl">
              24/7
            </span>
            <span className="mt-1 text-sm text-muted-foreground">
              Always Available
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-foreground font-serif md:text-4xl">
              Free
            </span>
            <span className="mt-1 text-sm text-muted-foreground">
              No Cost Ever
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
