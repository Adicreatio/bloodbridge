"use client"

import { useState, useTransition, useEffect, useMemo } from "react"
import { MapPin, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { registerDonor } from "@/app/register/actions"
import { toast } from "sonner"
import { INDIAN_STATES, INDIAN_CITIES } from "@/lib/indian-locations"
import type { IndianState } from "@/lib/indian-locations"

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export function DonorRegisterForm() {
  const [isPending, startTransition] = useTransition()
  const [bloodGroup, setBloodGroup] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [locationStatus, setLocationStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle")

  const cities = useMemo(() => {
    if (!selectedState) return []
    return INDIAN_CITIES[selectedState as IndianState] || []
  }, [selectedState])

  useEffect(() => {
    setSelectedCity("")
  }, [selectedState])

  useEffect(() => {
    getLocation()
  }, [])

  function getLocation() {
    if (!navigator.geolocation) {
      setLocationStatus("error")
      toast.error("Geolocation is not supported by your browser")
      return
    }
    setLocationStatus("loading")
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude.toString())
        setLongitude(pos.coords.longitude.toString())
        setLocationStatus("success")
        toast.success("Location detected successfully")
      },
      () => {
        setLocationStatus("error")
        toast.error("Unable to retrieve location. Please allow location access.")
      }
    )
  }

  async function handleSubmit(formData: FormData) {
    if (!bloodGroup) {
      toast.error("Please select a blood group")
      return
    }
    if (!selectedState) {
      toast.error("Please select a state")
      return
    }
    if (!selectedCity) {
      toast.error("Please select a city")
      return
    }
    formData.set("blood_group", bloodGroup)
    formData.set("state", selectedState)
    formData.set("city", selectedCity)
    formData.set("latitude", latitude)
    formData.set("longitude", longitude)

    startTransition(async () => {
      const result = await registerDonor(formData)
      if (result?.error) {
        toast.error(result.error)
      }
    })
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-6">
      {/* Name & Email */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="full_name">Full Name</Label>
          <Input
            id="full_name"
            name="full_name"
            placeholder="Rahul Sharma"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="rahul@example.com"
            required
          />
        </div>
      </div>

      {/* Phone & Blood Group */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="flex gap-2">
            <div className="flex h-9 items-center rounded-md border border-input bg-muted px-3 text-sm text-muted-foreground">
              +91
            </div>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="98765 43210"
              pattern="[0-9]{10}"
              maxLength={10}
              className="flex-1"
              required
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Enter 10-digit mobile number
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Blood Group</Label>
          <Select value={bloodGroup} onValueChange={setBloodGroup}>
            <SelectTrigger>
              <SelectValue placeholder="Select blood group" />
            </SelectTrigger>
            <SelectContent>
              {BLOOD_GROUPS.map((bg) => (
                <SelectItem key={bg} value={bg}>
                  {bg}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* State & City */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label>State / UT</Label>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger>
              <SelectValue placeholder="Select state" />
            </SelectTrigger>
            <SelectContent>
              {INDIAN_STATES.map((st) => (
                <SelectItem key={st} value={st}>
                  {st}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <Label>City</Label>
          <Select
            value={selectedCity}
            onValueChange={setSelectedCity}
            disabled={!selectedState}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={
                  selectedState ? "Select city" : "Select a state first"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Last Donation Date */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="last_donation_date">
          Last Donation Date (optional)
        </Label>
        <Input id="last_donation_date" name="last_donation_date" type="date" />
      </div>

      {/* Location */}
      <div className="rounded-xl border border-border bg-secondary/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Location
              </p>
              {locationStatus === "loading" && (
                <p className="text-xs text-muted-foreground">
                  Detecting your location...
                </p>
              )}
              {locationStatus === "success" && (
                <p className="text-xs text-muted-foreground">
                  Location captured ({parseFloat(latitude).toFixed(4)},{" "}
                  {parseFloat(longitude).toFixed(4)})
                </p>
              )}
              {locationStatus === "error" && (
                <p className="text-xs text-destructive">
                  Location not available. Please enable location access.
                </p>
              )}
              {locationStatus === "idle" && (
                <p className="text-xs text-muted-foreground">
                  Click the button to detect your location
                </p>
              )}
            </div>
          </div>
          {(locationStatus === "idle" || locationStatus === "error") && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={getLocation}
            >
              Detect
            </Button>
          )}
          {locationStatus === "loading" && (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-2 w-full"
        disabled={isPending || locationStatus !== "success"}
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Registering...
          </>
        ) : (
          "Register as Donor"
        )}
      </Button>
    </form>
  )
}
