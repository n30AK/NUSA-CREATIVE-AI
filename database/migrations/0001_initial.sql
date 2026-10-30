-- NUSA CREATIVE AI — additive MVP schema
-- Apply to the development branch first. Do not run against production without review.

create table if not exists public.nca_projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  platform text not null default 'multi',
  created_at timestamptz not null default now()
);

create table if not exists public.nca_products (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.nca_projects(id) on delete cascade,
  source_platform text not null default 'manual',
  source_url text,
  name text not null,
  description text,
  product_facts jsonb not null default '{}'::jsonb,
  facts_verified boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.nca_generation_jobs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.nca_projects(id) on delete set null,
  product_id uuid references public.nca_products(id) on delete set null,
  job_type text not null check (job_type in ('product_brief','image','video','voice','content_pack')),
  status text not null default 'queued' check (status in ('queued','running','succeeded','failed','cancelled')),
  mode text not null default 'hemat' check (mode in ('hemat','hybrid','premium')),
  input jsonb not null default '{}'::jsonb,
  output jsonb not null default '{}'::jsonb,
  estimated_cost numeric(12,4) not null default 0,
  actual_cost numeric(12,4) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists nca_products_project_created_idx on public.nca_products(project_id, created_at desc);
create index if not exists nca_jobs_status_created_idx on public.nca_generation_jobs(status, created_at);
