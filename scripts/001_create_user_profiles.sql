-- Create user profiles table to store financial data across all portals
create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Basic profile information
  full_name text,
  age integer,
  city text,
  occupation text,
  
  -- Financial information
  monthly_income numeric(12,2),
  monthly_expenses numeric(12,2),
  current_savings numeric(12,2),
  dependents integer default 0,
  
  -- Risk and goals
  risk_tolerance text check (risk_tolerance in ('conservative', 'moderate', 'aggressive')),
  financial_goals text[],
  investment_experience text check (investment_experience in ('beginner', 'intermediate', 'advanced')),
  
  -- Portal-specific data (JSON for flexibility)
  financial_data jsonb default '{}'::jsonb,
  loan_data jsonb default '{}'::jsonb,
  investment_data jsonb default '{}'::jsonb,
  insurance_data jsonb default '{}'::jsonb
);

-- Enable RLS
alter table public.user_profiles enable row level security;

-- RLS policies
create policy "users_select_own_profile"
  on public.user_profiles for select
  using (auth.uid() = id);

create policy "users_insert_own_profile"
  on public.user_profiles for insert
  with check (auth.uid() = id);

create policy "users_update_own_profile"
  on public.user_profiles for update
  using (auth.uid() = id);

create policy "users_delete_own_profile"
  on public.user_profiles for delete
  using (auth.uid() = id);
