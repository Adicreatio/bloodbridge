"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  User,
  Droplets,
  MapPin,
  Phone,
  Mail,
  Calendar,
  LogOut,
  UserPlus,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface Donor {
  id: string
  full_name: string
  email: string
  phone: string
  blood_group: string
  city: string
  state: string
  latitude: number
  longitude: number
  last_donation_date: string | null
  is_available: boolean
  created_at: string
  updated_at: string
}

export function DashboardContent({
  user,
  donor,
}: {
  user: SupabaseUser
  donor: Donor | null
}) {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  async function toggleAvailability() {
    if (!donor) return
    const supabase = createClient()
    const { error } = await supabase
      .from("donors")
      .update({ is_available: !donor.is_available, updated_at: new Date().toISOString() })
      .eq("id", donor.id)

    if (error) {
      toast.error("Failed to update availability")
    } else {
      toast.success(
        donor.is_available
          ? "You are now marked as unavailable"
          : "You are now available to donate"
      )
      router.refresh()
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-serif text-foreground">
            Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            Welcome back, {donor?.full_name || user.email}
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="gap-2">
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>

      {/* No donor profile yet */}
      {!donor && (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
            <UserPlus className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Complete your donor profile
          </h2>
          <p className="max-w-md text-muted-foreground">
            You haven{"'"}t registered as a donor yet. Register now to start
            helping people in need of blood.
          </p>
          <Link href="/register">
            <Button className="gap-2">
              <Droplets className="h-4 w-4" />
              Register as Donor
            </Button>
          </Link>
        </div>
      )}

      {/* Donor Profile */}
      {donor && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Card */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                <User className="h-5 w-5 text-primary" />
                Donor Profile
              </h2>
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary font-bold text-base px-3 py-1"
              >
                {donor.blood_group}
              </Badge>
            </div>

            <div className="mt-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {donor.full_name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{donor.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{donor.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">
                  {donor.city}, {donor.state}
                </span>
              </div>
              {donor.last_donation_date && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    Last donated:{" "}
                    {new Date(donor.last_donation_date).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            <Link href="/register">
              <Button variant="outline" size="sm" className="mt-6 w-full">
                Edit Profile
              </Button>
            </Link>
          </div>

          {/* Availability Card */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Droplets className="h-5 w-5 text-primary" />
              Availability
            </h2>

            <div className="mt-6 flex flex-col items-center gap-4 py-4">
              {donor.is_available ? (
                <>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-green-700">
                      Available
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      You are currently visible to people searching for blood
                      donors.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
                    <XCircle className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-muted-foreground">
                      Unavailable
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      You are hidden from search results. Toggle back when ready
                      to donate.
                    </p>
                  </div>
                </>
              )}

              <Button
                onClick={toggleAvailability}
                variant={donor.is_available ? "outline" : "default"}
                className="mt-2 w-full"
              >
                {donor.is_available
                  ? "Mark as Unavailable"
                  : "Mark as Available"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
