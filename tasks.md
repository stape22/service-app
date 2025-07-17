# 📋 TASKS.md – Full Project Task Breakdown

*All development tasks must follow the provided Figma prototype designs, adhering strictly to best practices, accessibility standards, and the Atomic Design System. The project uses a Supabase MCP server for backend automation and a GitHub MCP server for deployment workflows.*

# 🚨 BLOCKER: Resolve Vite/Radix UI Import & Peer Dependency Errors

* [x] Fix Vite import error: Failed to resolve import "@radix-ui/react-tabs" (and any similar errors for Radix UI or other atomic dependencies)
  * Investigate and resolve missing package, peer dependency conflicts, or lockfile corruption
  * Ensure @radix-ui/react-tabs is installed and compatible with current React version (React 19 vs 18)
  * If needed, downgrade React to 18 for compatibility, or use --legacy-peer-deps
  * Clean node_modules and lockfile if necessary
  * Confirm all atomic/organism imports build and run in dev and production
  * Document all steps and outcomes in dev-log.md

##  Project Setup

* [x] Initialize React + Vite project
* [x] Install TailwindCSS and configure with PostCSS
* [x] Install component library (e.g. shadcn/ui)
* [x] Set up basic folder structure using Atomic Design
* [x] Add routing with React Router
* [x] Set up Supabase client
* [x] Add .env.local for Supabase credentials
* [x] Install Supabase CLI (via Scoop, not npm - see dev-log.md for troubleshooting)
* [x] Create .env.secret for Supabase DB password

## 🔐 Authentication

* [x] Install @supabase/supabase-js
* [x] Create Supabase client config in /supabase/client.ts
* [x] Create AuthContext provider for login/logout/session
* [x] Create reusable <ProtectedRoute /> wrapper
* [x] Build Login form (email/password) – follow Figma design
* [x] Build Signup form (email/password) – follow Figma design
* [x] Add form validation and error handling
* [x] Redirect on successful login/signup

## 🧱 Atomic Component System

### Figma Reference Only Policy

* [x] Never import from `Figma Design/components/ui/` in app code
* [x] Port new primitives to `src/components/atoms/` as needed, adapting to project conventions and dependencies
* [x] Remove unused Figma-only dependencies if reintroduced

### Atoms

* [x] Button – styled per Figma
* [x] Input – styled per Figma
* [x] Label
* [x] Badge
* [x] Calendar – styled per Figma
  * [x] [KNOWN ISSUE] Fix test runner/module resolution issue with cn utility import in Calendar and Button atoms (see dev-log.md) (Resolved: No cn import issue; react-day-picker does not render day grid in test env)
  * [ ] [KNOWN ISSUE] Revisit Calendar atom tests after resolving cn import to ensure all tests pass and coverage is complete
* [x] Popover – styled per Figma
* [x] Avatar – ported from Figma, used in KanbanBoard and other components

### Molecules

* [x] FormGroup
* [x] AuthForm
* [x] NavItem

### Organisms

* [x] TopNav
* [x] Sidebar
* [x] LoginForm
  * [ ] [KNOWN ISSUE] Revisit LoginForm validation error test for async/DOM update issue (see dev-log.md for details)
* [x] SignupForm

### Templates

* [x] AuthPageTemplate
* [x] DashboardLayout

### Pages

* [x] /login – not included in figma
* [x] /signup – not included in figma
* [x] /dashboard
* [x] /dashboard/jobs
* [x] /dashboard/roofers
* [x] /dashboard/customers

# Note: Only these four are top-level pages per Figma navigation. Add/Edit entity screens (e.g., add-customer, edit-job) are subviews or modals, not separate routes.

## 📆 Supabase Data Models

* [x] Create users table with roles: admin, roofer, customer
* [x] Create roofers table (name, email, phone)
* [x] Create customers table (name, address, email, phone)
* [x] Create jobs table (title, status, roofer_id, customer_id, due_date)
* [x] Enable RLS and set access policies per role

## 📂 Dashboard Features

### Jobs

* [x] View job list (table)
* [x] Add new job
  * [x] AddJobForm molecule: implement basic info section (Job Number, Customer, etc.)
  * [x] AddJobForm molecule: unit test for basic info section
  * [x] AddJobForm molecule: implement status, priority, estimated cost, description, notes section
  * [x] AddJobForm molecule: unit test for status, priority, estimated cost, description, notes section
  * [x] AddJobForm molecule: implement scheduled date section (Calendar + Popover)
  * [x] AddJobForm molecule: unit test for scheduled date section
  * [x] AddJobForm molecule: implement advanced sections (roofing specs, drawing, photos, submission)
    * [ ] [POST-MVP] Port DrawingCanvas molecule (full interactive drawing, undo/redo, export, etc.)
    * [x] [MVP] Placeholder for DrawingCanvas (disabled canvas or "Coming soon" message); see dev-log.md
    * [ ] [POST-MVP] Port PhotoUpload molecule (full photo upload, preview, category, etc.)
    * [x] [MVP] Placeholder for PhotoUpload (disabled upload or "Coming soon" message); see dev-log.md
  * [x] AddJobForm molecule: unit test for advanced sections
* [x] Edit job
* [x] Delete job
* [x] Kanban view by status
* [x] Calendar view by due date

### Roofers

* [x] View roofer list
* [x] Add new roofer
* [x] Delete roofer

### Customers

* [x] View customer list
* [x] Add new customer
* [x] Edit customer
* [x] Delete customer

## 📊 UX Polish

* [ ] Show loading states on forms and fetches
* [ ] Handle Supabase errors with toasts
* [ ] Make layout responsive for mobile
* [ ] Add 404 page and route guard
* [ ] Optimize Tailwind and remove unused styles

---

> This file will expand with more tasks as the Figma prototype is analyzed and broken into components and flows. All features must implement the approved Figma design and follow the best practices documented in rules.md.

## 🛠 GitHub & CI Setup

* [x] Initialize local git repository
* [x] Create/connect to GitHub repository
* [x] Add remote origin and push code
* [x] Add .github/workflows/ci.yml for automated tests/linting
* [ ] Document GitHub/CI setup in README.md

## ⚡ Supabase MCP Server Automation

* [x] Set up MCP server CLI or dashboard access
* [x] Document and apply schema migrations (tables, columns, indexes)
* [ ] Automate RLS policy creation and updates
* [ ] Add scripts/tasks for database seeding and test data
* [ ] Set up automated backups and environment sync
* [ ] Log all MCP automation actions in dev-log.md

## 🛠 Figma Reference Build Errors (Non-Production)

* [x] Identify all Figma Design/components/ui files causing Vite import errors
* [x] Remove or comment out all invalid imports (e.g., @radix-ui/react-avatar@1.1.3) in Figma reference files
* [x] Add a README note: Figma Design directory is for reference only and not part of the build
* [x] Ensure Vite build passes with Figma Design directory present
* [x] Document all actions in dev-log.md

> All Figma Design imports have been removed from app code. Placeholders are in place for atomic/molecule/organism migration. See dev-log.md for details.

## Known Issues / Technical Debt

* [ ] [Calendar] Test runner/module resolution issue with cn utility import (see dev-log.md for troubleshooting and next steps)
* [ ] [General] Review all ported primitives for ESM/CJS compatibility and test runner import hygiene
* [ ] Investigate and resolve test runner/TypeScript config issues preventing AddJobForm tests from running (paused)
  - Research shows this is a known Vitest/React issue, often related to index file exports, ESM/CJS interop, or shared utilities.
  - Error occurs with any real atom reintroduced, but not with mocks; all atom tests pass in isolation.
  - Next steps for future resumption:
    1. Try direct import of atoms in test (not via index).
    2. Review atoms index file for export issues.
    3. Check for problematic shared utilities.
* [ ] Incrementally reintroduce real atom components in AddJobForm test to isolate test runner error (paused)
* [ ] [Dependency] React 19 vs react-day-picker@8.10.1 conflict: Downgrade react and react-dom to ^18.3.1, react-router-dom to ^6.28.0. Verify all tests and builds after change. (See dev-log.md for details)

## Dev Environment

* [ ] [KNOWN ISSUE] Ensure Supabase CLI is recognized in all dev environments (Cursor/editor and user terminal); document any required steps

---

# [2024-06-10] Recent Progress
- KanbanBoard organism implemented per Figma (see dev-log.md)
- Avatar atom ported and integrated
- Tailwind config updated for Figma tokens; build errors resolved
- useAuth export and blank screen fix complete
- All changes documented in dev-log.md

# [2024-06-11] Dev Notes
- Removed unused 'idx' variable from AddRooferForm.tsx contacts.map callback to resolve linter warning. No functional changes.

## 🔄 Refactor: Dashboard vs. Jobs Page Responsibilities

**Goal:**
Ensure the Dashboard is view-only (shows jobs in calendar, table, kanban, etc.) and the Jobs page is for adding/managing jobs (no multi-view display).

### Tasks & Subtasks

1. **Audit Current Implementation**
   - [x] Review Dashboard page for job views (calendar, table, kanban).
   - [x] Review Jobs page for job views and job management features.

2. **Refactor Pages**
   - [x] Move all job view components (calendar, table, kanban) to Dashboard.
   - [x] Ensure Jobs page contains only job creation and management features (add, edit, delete).

3. **Update Navigation**
   - [ ] Update navigation labels and routes to reflect new structure.

4. **Update Tests**
   - [ ] Update or add unit tests for Dashboard (view-only).
   - [ ] Update or add unit tests for Jobs page (add/edit/delete only).

5. **Update Documentation**
   - [ ] Update README.md with new page purposes and user flow.
   - [ ] Add dev-log.md entry for this change.
   - [ ] Update tasks.md with this checklist.
