-- 001_init_schema.sql
-- Initial schema for Service Industry App

-- Users table
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  role text not null check (role in ('admin', 'roofer', 'customer')),
  created_at timestamptz not null default now()
);

-- Roofers table
create table if not exists roofers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text unique not null,
  phone text,
  created_at timestamptz not null default now()
);

-- Customers table
create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  email text unique not null,
  phone text,
  created_at timestamptz not null default now()
);

-- Jobs table
create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  status text not null,
  roofer_id uuid references roofers(id),
  customer_id uuid references customers(id),
  due_date date,
  created_at timestamptz not null default now()
); 