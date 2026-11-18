-- IRINGA SOKO MKONONI: Supabase PostgreSQL schema
-- Paste this entire file into Supabase Dashboard > SQL Editor > New query > Run.
create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  phone text unique,
  region text not null default 'Iringa',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz not null default now()
);
insert into public.categories(name,slug) values
 ('Mazao','mazao'),('Simu','simu'),('Electronics','electronics'),('Nguo','nguo'),
 ('Viatu','viatu'),('Samani','samani'),('Magari','magari'),('Huduma','huduma')
on conflict (slug) do nothing;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references public.profiles(id) on delete cascade,
  category_id uuid references public.categories(id),
  title text not null,
  description text not null default '',
  price numeric(14,2) not null check (price >= 0),
  condition text not null default 'Mpya',
  location text not null,
  seller_name text not null default '',
  seller_phone text not null,
  image_url text,
  status text not null default 'active' check (status in ('draft','active','sold','hidden','removed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists products_category_status_idx on public.products(category_id,status);
create index if not exists products_created_idx on public.products(created_at desc);
create index if not exists products_search_idx on public.products using gin (to_tsvector('simple', coalesce(title,'') || ' ' || coalesce(description,'')));

create table if not exists public.favorites (
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(user_id,product_id)
);

create table if not exists public.needs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  item text not null,
  details text not null default '',
  budget numeric(14,2) check (budget is null or budget >= 0),
  location text not null,
  contact_name text not null,
  contact_phone text not null,
  status text not null default 'open' check(status in ('open','fulfilled','closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete set null,
  buyer_id uuid not null references public.profiles(id),
  seller_id uuid not null references public.profiles(id),
  quantity integer not null default 1 check(quantity > 0),
  amount numeric(14,2) not null check(amount >= 0),
  delivery_address text not null,
  delivery_phone text not null,
  status text not null default 'pending' check(status in ('pending','accepted','processing','shipped','delivered','cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.shipments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references public.orders(id) on delete cascade,
  tracking_number text unique not null,
  courier_name text not null default '',
  delivery_address text not null,
  status text not null default 'received' check(status in ('received','picked_up','in_transit','out_for_delivery','delivered','failed','returned')),
  last_location text not null default '',
  estimated_delivery timestamptz,
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  buyer_id uuid not null references public.profiles(id) on delete cascade,
  seller_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  created_at timestamptz not null default now(),
  check (buyer_id <> seller_id)
);
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists messages_conversation_created_idx on public.messages(conversation_id,created_at);

create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  subject text not null,
  status text not null default 'open' check(status in ('open','in_progress','resolved','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists public.support_logs (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.support_tickets(id) on delete cascade,
  sender_id uuid references public.profiles(id) on delete set null,
  sender_type text not null check(sender_type in ('customer','agent','bot','system')),
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.promotions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  plan text not null,
  amount numeric(14,2) not null check(amount >= 0),
  status text not null default 'pending' check(status in ('pending','paid','rejected','expired')),
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now()
);

-- Create/update a profile automatically when someone signs up through Supabase Auth.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles(id,full_name,phone)
  values(new.id, coalesce(new.raw_user_meta_data ->> 'full_name',''), nullif(new.raw_user_meta_data ->> 'phone',''))
  on conflict (id) do nothing;
  return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Enable Row Level Security on all application tables.
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.favorites enable row level security;
alter table public.needs enable row level security;
alter table public.orders enable row level security;
alter table public.shipments enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.support_tickets enable row level security;
alter table public.support_logs enable row level security;
alter table public.promotions enable row level security;

-- Profiles: signed-in users can read profiles for marketplace seller details; only owner edits own.
drop policy if exists profiles_read_signed_in on public.profiles;
create policy profiles_read_signed_in on public.profiles for select to authenticated using (true);
drop policy if exists profiles_insert_self on public.profiles;
create policy profiles_insert_self on public.profiles for insert to authenticated with check (auth.uid() = id);
drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

-- Categories are public read-only.
drop policy if exists categories_public_read on public.categories;
create policy categories_public_read on public.categories for select to anon,authenticated using (true);

-- Active products are public; owners manage only their own listings.
drop policy if exists products_public_active_read on public.products;
create policy products_public_active_read on public.products for select to anon,authenticated using (status = 'active' or auth.uid() = seller_id);
drop policy if exists products_insert_owner on public.products;
create policy products_insert_owner on public.products for insert to authenticated with check (auth.uid() = seller_id);
drop policy if exists products_update_owner on public.products;
create policy products_update_owner on public.products for update to authenticated using (auth.uid() = seller_id) with check (auth.uid() = seller_id);
drop policy if exists products_delete_owner on public.products;
create policy products_delete_owner on public.products for delete to authenticated using (auth.uid() = seller_id);

-- Favorites are private to each user.
drop policy if exists favorites_owner_all on public.favorites;
create policy favorites_owner_all on public.favorites for all to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Needs are public to view; only signed-in owners can create/update/delete.
drop policy if exists needs_public_read on public.needs;
create policy needs_public_read on public.needs for select to anon,authenticated using (status = 'open' or auth.uid() = user_id);
drop policy if exists needs_owner_insert on public.needs;
create policy needs_owner_insert on public.needs for insert to authenticated with check (auth.uid() = user_id);
drop policy if exists needs_owner_update on public.needs;
create policy needs_owner_update on public.needs for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists needs_owner_delete on public.needs;
create policy needs_owner_delete on public.needs for delete to authenticated using (auth.uid() = user_id);

-- Orders visible only to buyer/seller. Buyer creates; either party can update their order.
drop policy if exists orders_participant_read on public.orders;
create policy orders_participant_read on public.orders for select to authenticated using (auth.uid() in (buyer_id,seller_id));
drop policy if exists orders_buyer_insert on public.orders;
create policy orders_buyer_insert on public.orders for insert to authenticated with check (auth.uid() = buyer_id);
drop policy if exists orders_participant_update on public.orders;
create policy orders_participant_update on public.orders for update to authenticated using (auth.uid() in (buyer_id,seller_id)) with check (auth.uid() in (buyer_id,seller_id));

-- Shipment access follows order participants.
drop policy if exists shipments_party_read on public.shipments;
create policy shipments_party_read on public.shipments for select to authenticated using (exists(select 1 from public.orders o where o.id=order_id and auth.uid() in (o.buyer_id,o.seller_id)));
drop policy if exists shipments_seller_insert on public.shipments;
create policy shipments_seller_insert on public.shipments for insert to authenticated with check (exists(select 1 from public.orders o where o.id=order_id and auth.uid()=o.seller_id));
drop policy if exists shipments_seller_update on public.shipments;
create policy shipments_seller_update on public.shipments for update to authenticated using (exists(select 1 from public.orders o where o.id=order_id and auth.uid()=o.seller_id)) with check (exists(select 1 from public.orders o where o.id=order_id and auth.uid()=o.seller_id));

-- Conversation participants only.
drop policy if exists conversations_participant_all on public.conversations;
create policy conversations_participant_all on public.conversations for all to authenticated using (auth.uid() in (buyer_id,seller_id)) with check (auth.uid() in (buyer_id,seller_id));
drop policy if exists messages_participant_read on public.messages;
create policy messages_participant_read on public.messages for select to authenticated using (exists(select 1 from public.conversations c where c.id=conversation_id and auth.uid() in (c.buyer_id,c.seller_id)));
drop policy if exists messages_sender_insert on public.messages;
create policy messages_sender_insert on public.messages for insert to authenticated with check (auth.uid()=sender_id and exists(select 1 from public.conversations c where c.id=conversation_id and auth.uid() in (c.buyer_id,c.seller_id)));
drop policy if exists messages_participant_update on public.messages;
create policy messages_participant_update on public.messages for update to authenticated using (exists(select 1 from public.conversations c where c.id=conversation_id and auth.uid() in (c.buyer_id,c.seller_id)));

-- Support ticket owner and their support logs.
drop policy if exists tickets_owner_read on public.support_tickets;
create policy tickets_owner_read on public.support_tickets for select to authenticated using (auth.uid()=user_id);
drop policy if exists tickets_owner_insert on public.support_tickets;
create policy tickets_owner_insert on public.support_tickets for insert to authenticated with check (auth.uid()=user_id);
drop policy if exists tickets_owner_update on public.support_tickets;
create policy tickets_owner_update on public.support_tickets for update to authenticated using (auth.uid()=user_id) with check (auth.uid()=user_id);
drop policy if exists support_logs_ticket_owner_read on public.support_logs;
create policy support_logs_ticket_owner_read on public.support_logs for select to authenticated using (exists(select 1 from public.support_tickets t where t.id=ticket_id and t.user_id=auth.uid()));
drop policy if exists support_logs_ticket_owner_insert on public.support_logs;
create policy support_logs_ticket_owner_insert on public.support_logs for insert to authenticated with check (sender_id=auth.uid() and exists(select 1 from public.support_tickets t where t.id=ticket_id and t.user_id=auth.uid()));

-- Promotions are private to the account owner.
drop policy if exists promotions_owner_all on public.promotions;
create policy promotions_owner_all on public.promotions for all to authenticated using (auth.uid()=user_id) with check (auth.uid()=user_id);

-- Storage bucket for product photos. File path must start with the authenticated user's UUID.
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('product-images','product-images',true,5242880,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public=true,file_size_limit=5242880,allowed_mime_types=array['image/jpeg','image/png','image/webp'];
drop policy if exists product_images_public_read on storage.objects;
create policy product_images_public_read on storage.objects for select using (bucket_id='product-images');
drop policy if exists product_images_owner_insert on storage.objects;
create policy product_images_owner_insert on storage.objects for insert to authenticated with check (bucket_id='product-images' and (storage.foldername(name))[1]=auth.uid()::text);
drop policy if exists product_images_owner_update on storage.objects;
create policy product_images_owner_update on storage.objects for update to authenticated using (bucket_id='product-images' and (storage.foldername(name))[1]=auth.uid()::text) with check (bucket_id='product-images' and (storage.foldername(name))[1]=auth.uid()::text);
drop policy if exists product_images_owner_delete on storage.objects;
create policy product_images_owner_delete on storage.objects for delete to authenticated using (bucket_id='product-images' and (storage.foldername(name))[1]=auth.uid()::text);

-- Updated-at triggers.
drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles for each row execute procedure public.set_updated_at();
drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at before update on public.products for each row execute procedure public.set_updated_at();
drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at before update on public.orders for each row execute procedure public.set_updated_at();
drop trigger if exists support_tickets_updated_at on public.support_tickets;
create trigger support_tickets_updated_at before update on public.support_tickets for each row execute procedure public.set_updated_at();
