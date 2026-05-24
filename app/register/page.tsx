import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DonorRegisterForm } from "@/components/donor-register-form"
import { Heart } from "lucide-react"

export const metadata = {
  title: "Register as Donor - BloodBridge",
  description:
    "Register as a blood donor and help save lives across India. Select your state, city, and blood group.",
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Heart className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight font-serif text-foreground">
              Become a Donor
            </h1>
            <p className="mt-2 text-muted-foreground">
              Fill out the form below to register as a blood donor in India.
              Select your state and city so people nearby can find you. You must be signed in to register.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <DonorRegisterForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
