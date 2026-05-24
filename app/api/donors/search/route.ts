import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

function haversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371 // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const bloodGroup = searchParams.get("blood_group")
  const state = searchParams.get("state")
  const city = searchParams.get("city")
  const lat = parseFloat(searchParams.get("lat") || "")
  const lng = parseFloat(searchParams.get("lng") || "")

  const supabase = await createClient()

  let query = supabase
    .from("donors")
    .select("id, full_name, blood_group, city, state, phone, email, latitude, longitude, is_available, last_donation_date")
    .eq("is_available", true)

  if (bloodGroup && bloodGroup !== "all") {
    query = query.eq("blood_group", bloodGroup)
  }

  if (state && state !== "all") {
    query = query.eq("state", state)
  }

  if (city && city !== "all") {
    query = query.eq("city", city)
  }

  const { data: donors, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Sort by distance if user lat/lng provided
  let results = donors || []
  if (!isNaN(lat) && !isNaN(lng)) {
    results = results
      .map((donor) => ({
        ...donor,
        distance: haversineDistance(lat, lng, donor.latitude, donor.longitude),
      }))
      .sort((a, b) => a.distance - b.distance)
  }

  return NextResponse.json({ donors: results })
}
