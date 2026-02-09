-- ==========================================
-- Database Schema for AI Projects Analysis
-- ==========================================

-- 1. Clean up (Optional - use caution in production)
-- drop table if exists public.cases;

-- 2. Create 'cases' table
create table if not exists public.cases (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  locale text not null default 'zh',
  title text not null,
  summary text,
  category text,
  monetization text,
  stage text,
  published_at timestamptz,
  tags text[], 
  cover text,
  content text, 
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  
  -- Constraint to ensure uniqueness for slug per locale
  unique (slug, locale)
);

-- 3. Enable Row Level Security (RLS)
alter table public.cases enable row level security;

-- 4. Create Access Policies
-- Policy: Allow anyone (anon + authenticated) to READ cases
create policy "Public Read Access"
  on public.cases for select
  using ( true );

-- Policy: Allow Key-based insertion/updates (Service Role usually bypasses RLS, but for anon/authenticated setup):
-- IMPORTANT: For the sync script to work with the 'anon' key (if Service Key is not used), 
-- we temporarily allow insert/update. 
-- IN PRODUCTION: You should use the SERVICE_ROLE_KEY for the script and NOT enable this policy.
create policy "Enable Insert for Sync"
  on public.cases for insert
  with check ( true );

create policy "Enable Update for Sync"
  on public.cases for update
  using ( true );

-- 5. Create Indexes (Optional but recommended for performance)
create index if not exists cases_slug_idx on public.cases (slug);
create index if not exists cases_category_idx on public.cases (category);

-- 6. Refresh Schema Cache (Crucial for PostgREST to see the changes immediately)
NOTIFY pgrst, 'reload config';
