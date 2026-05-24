"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export async function registerDonor(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/register")
  }

  const fullName = formData.get("full_name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const bloodGroup = formData.get("blood_group") as string
  const city = formData.get("city") as string
  const state = formData.get("state") as string
  const latitude = parseFloat(formData.get("latitude") as string)
  const longitude = parseFloat(formData.get("longitude") as string)
  const lastDonationDate = formData.get("last_donation_date") as string

  if (!fullName || !email || !phone || !bloodGroup || !city || !state || isNaN(latitude) || isNaN(longitude)) {
    return { error: "All fields are required. Please allow location access." }
  }

  // Check if donor already exists for this user
  const { data: existingDonor } = await supabase
    .from("donors")
    .select("id")
    .eq("user_id", user.id)
    .single()

  if (existingDonor) {
    // Update existing donor
    const { error } = await supabase
      .from("donors")
      .update({
        full_name: fullName,
        email,
        phone,
        blood_group: bloodGroup,
        city,
        state,
        latitude,
        longitude,
        last_donation_date: lastDonationDate || null,
        is_available: true,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id)

    if (error) {
      return { error: error.message }
    }
  } else {
    const { error } = await supabase.from("donors").insert({
      user_id: user.id,
      full_name: fullName,
      email,
      phone,
      blood_group: bloodGroup,
      city,
      state,
      latitude,
      longitude,
      last_donation_date: lastDonationDate || null,
      is_available: true,
    })

    if (error) {
      return { error: error.message }
    }
  }

  redirect("/dashboard")
}
