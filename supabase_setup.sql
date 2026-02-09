-- 1. Create the table
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
  unique (slug, locale)
);

-- 2. Enable RLS
alter table public.cases enable row level security;

-- 3. Create Policies (Required for ANON key access)
create policy "Allow public read access"
  on public.cases for select
  using ( true );

create policy "Allow insert/update for all (temporarily for sync)"
  on public.cases for insert
  with check ( true );

create policy "Allow update for all (temporarily for sync)"
  on public.cases for update
  using ( true );

-- 4. Reload Schema Cache
NOTIFY pgrst, 'reload config';
