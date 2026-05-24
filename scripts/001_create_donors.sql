create table if not exists public.donors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text not null,
  blood_group text not null,
  city text not null,
  state text not null,
  latitude double precision not null,
  longitude double precision not null,
  last_donation_date date,
  is_available boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
