-- Create chat history table to store AI conversations
create table if not exists public.chat_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Chat context and content
  context text not null, -- 'financial', 'loan', 'investment', 'insurance', 'general'
  message text not null,
  response text not null,
  
  -- Metadata
  session_id uuid default gen_random_uuid()
);

-- Enable RLS
alter table public.chat_history enable row level security;

-- RLS policies
create policy "users_select_own_chat_history"
  on public.chat_history for select
  using (auth.uid() = user_id);

create policy "users_insert_own_chat_history"
  on public.chat_history for insert
  with check (auth.uid() = user_id);
