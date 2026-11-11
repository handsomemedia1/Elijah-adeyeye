-- Run once in the Supabase dashboard: SQL Editor > New query > paste > Run.
-- The website can add subscribers but cannot read them.
-- View the list in Table Editor > portfolio_newsletter_subscribers.

create table if not exists public.portfolio_newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique
    check (email = lower(email) and length(email) <= 254 and email ~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  created_at timestamptz not null default now()
);

alter table public.portfolio_newsletter_subscribers enable row level security;

revoke all on public.portfolio_newsletter_subscribers from anon, authenticated;
grant insert (email) on public.portfolio_newsletter_subscribers to anon;

drop policy if exists "Anyone can subscribe" on public.portfolio_newsletter_subscribers;
create policy "Anyone can subscribe"
  on public.portfolio_newsletter_subscribers
  for insert to anon
  with check (true);
