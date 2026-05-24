import Link from "next/link"
import { Heart, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 inline-flex items-center gap-2">
          <Heart className="h-7 w-7 fill-primary text-primary" />
          <span className="text-xl font-bold font-serif text-foreground">
            BloodBridge
          </span>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
            <Mail className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold font-serif text-foreground">
            Check your email
          </h1>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {"We've sent you a confirmation email. Please verify your email address to complete your registration and start saving lives."}
          </p>
          <Link href="/auth/login">
            <Button variant="outline" className="mt-6">
              Back to Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
