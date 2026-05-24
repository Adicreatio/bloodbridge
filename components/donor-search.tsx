"use client"

import { useState, useMemo } from "react"
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Loader2,
  Navigation,
  Droplets,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { INDIAN_STATES, INDIAN_CITIES } from "@/lib/indian-locations"
import type { IndianState } from "@/lib/indian-locations"

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

interface Donor {
  id: string
  full_name: string
  blood_group: string
  city: string
  state: string
  phone: string
  email: string
  latitude: number
  longitude: number
  is_available: boolean
  last_donation_date: string | null
  distance?: number
}

export function DonorSearch() {
  const [bloodGroup, setBloodGroup] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [lat, setLat] = useState<number | null>(null)
  const [lng, setLng] = useState<number | null>(null)
  const [donors, setDonors] = useState<Donor[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [locating, setLocating] = useState(false)

  const cities = useMemo(() => {
    if (!selectedState || selectedState === "all") return []
    return INDIAN_CITIES[selectedState as IndianState] || []
  }, [selectedState])

  function detectLocation() {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser")
      return
    }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude)
        setLng(pos.coords.longitude)
        setLocating(false)
        toast.success("Location detected! Results will be sorted by distance.")
      },
      () => {
        setLocating(false)
        toast.error("Unable to get location. Results won't be sorted by distance.")
      }
    )
  }

  async function handleSearch() {
    setLoading(true)
    setSearched(true)

    const params = new URLSearchParams()
    if (bloodGroup) params.set("blood_group", bloodGroup)
    if (selectedState && selectedState !== "all")
      params.set("state", selectedState)
    if (selectedCity && selectedCity !== "all")
      params.set("city", selectedCity)
    if (lat !== null && lng !== null) {
      params.set("lat", lat.toString())
      params.set("lng", lng.toString())
    }

    try {
      const res = await fetch(`/api/donors/search?${params.toString()}`)
      const data = await res.json()
      if (data.error) {
        toast.error(data.error)
        setDonors([])
      } else {
        setDonors(data.donors)
        if (data.donors.length === 0) {
          toast.info("No donors found matching your criteria")
        }
      }
    } catch {
      toast.error("Failed to search. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Search Controls */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-col gap-4">
          {/* Row 1: Blood Group + State + City */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">
                Blood Group Needed
              </label>
              <Select value={bloodGroup} onValueChange={setBloodGroup}>
                <SelectTrigger>
                  <SelectValue placeholder="All blood groups" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All blood groups</SelectItem>
                  {BLOOD_GROUPS.map((bg) => (
                    <SelectItem key={bg} value={bg}>
                      {bg}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">
                State / UT
              </label>
              <Select
                value={selectedState}
                onValueChange={(v) => {
                  setSelectedState(v)
                  setSelectedCity("")
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All states" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All states</SelectItem>
                  {INDIAN_STATES.map((st) => (
                    <SelectItem key={st} value={st}>
                      {st}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">
                City
              </label>
              <Select
                value={selectedCity}
                onValueChange={setSelectedCity}
                disabled={!selectedState || selectedState === "all"}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      selectedState && selectedState !== "all"
                        ? "All cities"
                        : "Select a state first"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All cities</SelectItem>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 2: Actions */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={detectLocation}
                disabled={locating}
                className="gap-2"
              >
                {locating ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Navigation className="h-4 w-4" />
                )}
                {lat !== null ? "Located" : "My Location"}
              </Button>
              <Button
                onClick={handleSearch}
                disabled={loading}
                className="gap-2"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                Search Donors
              </Button>
            </div>
            {lat !== null && (
              <p className="text-xs text-muted-foreground">
                Your location detected - results sorted by distance
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      {searched && !loading && donors.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card py-16 text-center">
          <Droplets className="h-12 w-12 text-muted-foreground/40" />
          <p className="text-lg font-medium text-foreground">
            No donors found
          </p>
          <p className="text-sm text-muted-foreground">
            Try a different blood group, state, or city
          </p>
        </div>
      )}

      {donors.length > 0 && (
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-muted-foreground">
            {donors.length} donor{donors.length !== 1 ? "s" : ""} found
          </p>
          {donors.map((donor) => (
            <DonorCard key={donor.id} donor={donor} />
          ))}
        </div>
      )}
    </div>
  )
}

function DonorCard({ donor }: { donor: Donor }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-foreground">
              {donor.full_name}
            </h3>
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary font-bold"
            >
              {donor.blood_group}
            </Badge>
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>
                {donor.city}, {donor.state}
              </span>
              {donor.distance !== undefined && (
                <span className="ml-1 font-medium text-primary">
                  ({donor.distance.toFixed(1)} km away)
                </span>
              )}
            </div>
            {donor.last_donation_date && (
              <p className="text-xs text-muted-foreground">
                Last donated:{" "}
                {new Date(donor.last_donation_date).toLocaleDateString("en-IN")}
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <a
            href={`tel:+91${donor.phone}`}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">Call</span>
          </a>
          <a
            href={`mailto:${donor.email}`}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Email</span>
          </a>
        </div>
      </div>
    </div>
  )
}
