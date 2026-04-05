-- Quantum Space AGI — PostgreSQL schema (Supabase-compatible)
-- Run with: psql $DATABASE_URL -f database/qsagi-schema.sql

-- Runs table
create table if not exists qsagi_runs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid null,
  scenario text not null,
  params jsonb not null,
  summary jsonb not null,
  points jsonb not null
);

create index if not exists qsagi_runs_created_at_idx on qsagi_runs (created_at desc);
create index if not exists qsagi_runs_scenario_idx on qsagi_runs (scenario);

-- Leaderboard table (optional: derived from runs)
create table if not exists qsagi_leaderboard (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  user_id uuid null,
  display_name text not null,
  scenario text not null,
  score numeric not null,
  run_id uuid references qsagi_runs(id) on delete cascade
);

create index if not exists qsagi_leaderboard_scenario_score_idx on qsagi_leaderboard (scenario, score desc);

-- Row Level Security (Supabase)
alter table qsagi_runs enable row level security;
alter table qsagi_leaderboard enable row level security;

-- Runs: insert any (anonymous), select only owner
create policy "runs_insert_any" on qsagi_runs
for insert with check (true);

create policy "runs_select_owner" on qsagi_runs
for select using (auth.uid() = user_id);

-- Leaderboard: public read, public insert
create policy "leaderboard_select_public" on qsagi_leaderboard
for select using (true);

create policy "leaderboard_insert_any" on qsagi_leaderboard
for insert with check (true);
