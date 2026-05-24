import Link from "next/link"
import { Heart, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

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
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10">
            <AlertTriangle className="h-7 w-7 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold font-serif text-foreground">
            Something went wrong
          </h1>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {params?.error
              ? `Error: ${params.error}`
              : "An unspecified error occurred during authentication."}
          </p>
          <Link href="/auth/login">
            <Button className="mt-6">Try Again</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
