import { UserPlus, MapPin, Phone } from "lucide-react"

const steps = [
  {
    icon: UserPlus,
    title: "Register as a Donor",
    description:
      "Sign up with your blood type, city, state, and availability. Your information stays private and secure until someone in India needs help.",
  },
  {
    icon: MapPin,
    title: "Location-Based Matching",
    description:
      "Search by blood group, state, and city to find the nearest available donors. Location-based sorting finds donors closest to you across India.",
  },
  {
    icon: Phone,
    title: "Connect & Save Lives",
    description:
      "Call or email the nearest matching donor directly. A simple phone call can save a life -- no middlemen, no delays.",
  },
]

export function HowItWorks() {
  return (
    <section className="border-t border-border bg-secondary/50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight font-serif text-foreground md:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three simple steps to connect donors with those in need
          </p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <step.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
