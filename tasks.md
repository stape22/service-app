# 📋 TASKS.md – Full Project Task Breakdown

*All development tasks must follow the provided Figma prototype designs, adhering strictly to best practices, accessibility standards, and the Atomic Design System. The project uses a Supabase MCP server for backend automation and a GitHub MCP server for deployment workflows.*

## �� Project Setup

* [x] Initialize React + Vite project
* [x] Install TailwindCSS and configure with PostCSS
* [x] Install component library (e.g. shadcn/ui)
* [x] Set up basic folder structure using Atomic Design
* [x] Add routing with React Router
* [x] Set up Supabase client
* [x] Add .env.local for Supabase credentials

## 🔐 Authentication

* [x] Install @supabase/supabase-js
* [x] Create Supabase client config in /supabase/client.ts
* [x] Create AuthContext provider for login/logout/session
* [x] Create reusable <ProtectedRoute /> wrapper
* [ ] Build Login form (email/password) – follow Figma design
* [ ] Build Signup form (email/password) – follow Figma design
* [ ] Add form validation and error handling
* [ ] Redirect on successful login/signup

## 🧱 Atomic Component System

### Atoms

* [x] Button – styled per Figma
* [x] Input – styled per Figma
* [x] Label
* [x] Badge

### Molecules

* [x] FormGroup
* [x] AuthForm
* [x] NavItem

### Organisms

* [x] TopNav
* [x] Sidebar
* [ ] LoginForm
* [ ] SignupForm

### Templates

* [ ] AuthPageTemplate
* [ ] DashboardLayout

### Pages

* [ ] /login – not included in figma
* [ ] /signup – not included in figma
* [ ] /dashboard
* [ ] /dashboard/jobs
* [ ] /dashboard/roofers
* [ ] /dashboard/customers

## 📆 Supabase Data Models

* [ ] Create users table with roles: admin, roofer, customer
* [ ] Create roofers table (name, email, phone)
* [ ] Create customers table (name, address, email, phone)
* [ ] Create jobs table (title, status, roofer_id, customer_id, due_date)
* [ ] Enable RLS and set access policies per role

## 📂 Dashboard Features

### Jobs

* [ ] View job list (table)
* [ ] Add new job
* [ ] Edit job
* [ ] Delete job
* [ ] Kanban view by status
* [ ] Calendar view by due date

### Roofers

* [ ] View roofer list
* [ ] Add new roofer
* [ ] Edit roofer
* [ ] Delete roofer

### Customers

* [ ] View customer list
* [ ] Add new customer
* [ ] Edit customer
* [ ] Delete customer

## 📊 UX Polish

* [ ] Show loading states on forms and fetches
* [ ] Handle Supabase errors with toasts
* [ ] Make layout responsive for mobile
* [ ] Add 404 page and route guard
* [ ] Optimize Tailwind and remove unused styles

---

> This file will expand with more tasks as the Figma prototype is analyzed and broken into components and flows. All features must implement the approved Figma design and follow the best practices documented in rules.md.

## 🛠 GitHub & CI Setup

* [ ] Initialize local git repository
* [ ] Create/connect to GitHub repository
* [ ] Add remote origin and push code
* [ ] Add .github/workflows/ci.yml for automated tests/linting
* [ ] Document GitHub/CI setup in README.md

## ⚡ Supabase MCP Server Automation

* [ ] Document MCP server role and setup in README.md
* [ ] Add scripts/config for MCP automation (if needed)
* [ ] Add tasks for schema migrations, RLS policy automation, etc.
* [ ] Ensure all automation steps are logged in dev-log.md