import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DonorSearch } from "@/components/donor-search"
import { Search } from "lucide-react"

export const metadata = {
  title: "Find Donors - BloodBridge",
  description:
    "Search for blood donors across India. Filter by blood group, state, and city to find the nearest available donor.",
}

export default function SearchPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Search className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight font-serif text-foreground">
              Find Blood Donors
            </h1>
            <p className="mt-2 text-muted-foreground">
              Search for available donors by blood group, state, and city across India.
              Enable location to see the nearest donors first.
            </p>
          </div>

          <DonorSearch />
        </div>
      </main>
      <Footer />
    </div>
  )
}
