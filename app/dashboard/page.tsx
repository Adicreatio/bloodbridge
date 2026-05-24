import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DashboardContent } from "@/components/dashboard-content"

export const metadata = {
  title: "Dashboard - BloodBridge",
  description: "Manage your donor profile and availability.",
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: donor } = await supabase
    .from("donors")
    .select("*")
    .eq("user_id", user.id)
    .single()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <DashboardContent user={user} donor={donor} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
