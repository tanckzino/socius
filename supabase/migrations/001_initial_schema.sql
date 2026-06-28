-- ============================================================
-- SociUS — Schema inicial do banco de dados
-- ============================================================

-- Extensões necessárias
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

-- ============================================================
-- ENUM TYPES
-- ============================================================

create type user_role as enum (
  'founder',
  'investor',
  'developer',
  'strategic_partner',
  'service_provider'
);

create type availability_type as enum (
  'full_time',
  'part_time',
  'weekends',
  'flexible'
);

create type match_status as enum (
  'pending',
  'matched',
  'rejected'
);

create type message_status as enum (
  'sent',
  'delivered',
  'read'
);

create type project_stage as enum (
  'idea',
  'mvp',
  'launched',
  'scaling'
);

create type swipe_direction as enum (
  'right',
  'left'
);

-- ============================================================
-- PROFILES TABLE
-- ============================================================

create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null unique,
  full_name text not null,
  avatar_url text,
  city text,
  state text,
  country text default 'BR',
  linkedin_url text,
  bio text,
  role user_role not null default 'founder',
  skills text[] default '{}',
  interests text[] default '{}',
  available_capital numeric(15, 2),
  availability availability_type default 'flexible',
  project_description text,
  is_verified boolean default false,
  is_premium boolean default false,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- RLS Policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (is_active = true);

create policy "Users can insert their own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- Trigger: auto update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure update_updated_at();

-- Auto-create profile on signup
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- ============================================================
-- SWIPES TABLE
-- ============================================================

create table public.swipes (
  id uuid default uuid_generate_v4() primary key,
  swiper_id uuid references public.profiles(id) on delete cascade not null,
  swiped_id uuid references public.profiles(id) on delete cascade not null,
  direction swipe_direction not null,
  created_at timestamptz default now(),
  unique (swiper_id, swiped_id)
);

alter table public.swipes enable row level security;

create policy "Users can view their own swipes"
  on public.swipes for select using (auth.uid() = swiper_id);

create policy "Users can insert their own swipes"
  on public.swipes for insert with check (auth.uid() = swiper_id);

-- ============================================================
-- MATCHES TABLE
-- ============================================================

create table public.matches (
  id uuid default uuid_generate_v4() primary key,
  user_id_1 uuid references public.profiles(id) on delete cascade not null,
  user_id_2 uuid references public.profiles(id) on delete cascade not null,
  status match_status default 'matched',
  created_at timestamptz default now(),
  constraint no_self_match check (user_id_1 != user_id_2),
  constraint ordered_users check (user_id_1 < user_id_2),
  unique (user_id_1, user_id_2)
);

alter table public.matches enable row level security;

create policy "Users can view their own matches"
  on public.matches for select
  using (auth.uid() = user_id_1 or auth.uid() = user_id_2);

-- Auto-create match when both users swipe right
create or replace function check_and_create_match()
returns trigger as $$
begin
  if new.direction = 'right' then
    if exists (
      select 1 from public.swipes
      where swiper_id = new.swiped_id
        and swiped_id = new.swiper_id
        and direction = 'right'
    ) then
      insert into public.matches (user_id_1, user_id_2)
      values (
        least(new.swiper_id, new.swiped_id),
        greatest(new.swiper_id, new.swiped_id)
      )
      on conflict do nothing;
    end if;
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_swipe_right
  after insert on public.swipes
  for each row execute procedure check_and_create_match();

-- ============================================================
-- CONVERSATIONS TABLE
-- ============================================================

create table public.conversations (
  id uuid default uuid_generate_v4() primary key,
  match_id uuid references public.matches(id) on delete cascade,
  participant_1 uuid references public.profiles(id) on delete cascade not null,
  participant_2 uuid references public.profiles(id) on delete cascade not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique (participant_1, participant_2)
);

alter table public.conversations enable row level security;

create policy "Users can view their own conversations"
  on public.conversations for select
  using (auth.uid() = participant_1 or auth.uid() = participant_2);

create trigger conversations_updated_at
  before update on public.conversations
  for each row execute procedure update_updated_at();

-- ============================================================
-- MESSAGES TABLE
-- ============================================================

create table public.messages (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid references public.conversations(id) on delete cascade not null,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  status message_status default 'sent',
  created_at timestamptz default now()
);

alter table public.messages enable row level security;

create policy "Conversation participants can view messages"
  on public.messages for select
  using (
    exists (
      select 1 from public.conversations c
      where c.id = conversation_id
        and (c.participant_1 = auth.uid() or c.participant_2 = auth.uid())
    )
  );

create policy "Conversation participants can insert messages"
  on public.messages for insert
  with check (
    auth.uid() = sender_id and
    exists (
      select 1 from public.conversations c
      where c.id = conversation_id
        and (c.participant_1 = auth.uid() or c.participant_2 = auth.uid())
    )
  );

-- Update conversation updated_at on new message
create or replace function update_conversation_on_message()
returns trigger as $$
begin
  update public.conversations
  set updated_at = now()
  where id = new.conversation_id;
  return new;
end;
$$ language plpgsql;

create trigger on_new_message
  after insert on public.messages
  for each row execute procedure update_conversation_on_message();

-- Enable realtime for messages
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.matches;

-- ============================================================
-- PROJECTS TABLE
-- ============================================================

create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text not null,
  stage project_stage default 'idea',
  required_roles user_role[] default '{}',
  investment_needed numeric(15, 2),
  tags text[] default '{}',
  is_public boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.projects enable row level security;

create policy "Public projects viewable by all"
  on public.projects for select using (is_public = true);

create policy "Owners can manage their projects"
  on public.projects for all using (auth.uid() = owner_id);

-- ============================================================
-- INDEXES
-- ============================================================

create index idx_profiles_role on public.profiles(role);
create index idx_profiles_city on public.profiles(city);
create index idx_profiles_country on public.profiles(country);
create index idx_profiles_is_active on public.profiles(is_active);
create index idx_profiles_skills on public.profiles using gin(skills);
create index idx_profiles_interests on public.profiles using gin(interests);
create index idx_swipes_swiper on public.swipes(swiper_id);
create index idx_swipes_swiped on public.swipes(swiped_id);
create index idx_matches_user1 on public.matches(user_id_1);
create index idx_matches_user2 on public.matches(user_id_2);
create index idx_messages_conversation on public.messages(conversation_id, created_at);
create index idx_conversations_participants on public.conversations(participant_1, participant_2);

-- Full text search on profiles
create index idx_profiles_fts on public.profiles
  using gin(to_tsvector('portuguese', coalesce(full_name, '') || ' ' || coalesce(bio, '') || ' ' || coalesce(project_description, '')));

-- ============================================================
-- VIEWS
-- ============================================================

-- View: profiles with match score (simplified)
create or replace view public.profile_feed as
select
  p.*,
  (select count(*) from public.swipes s where s.swiped_id = p.id and s.direction = 'right') as likes_received,
  (select count(*) from public.matches m where m.user_id_1 = p.id or m.user_id_2 = p.id) as match_count
from public.profiles p
where p.is_active = true;
