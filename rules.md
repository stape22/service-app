# ✅ DEVELOPMENT RULES – Service Industry App

This file defines the coding standards, architectural patterns, and workflow practices for the Service Industry App. All contributors and agents (human or AI) must follow these rules consistently.

---

## 🔧 TECH & TOOLING

* **Frontend:** React (with Vite), TailwindCSS, shadcn/ui
* **Backend:** Supabase (Auth, Database, Storage, Edge Functions)
* **Design System:** Atomic Design
* **Component Library:** shadcn/ui (or similar, modular + accessible)
* **Environment:** Cursor with Claude or GPT Agents
* **Version Control:** Git + GitHub

---

## 🧱 CODE ORGANIZATION RULES

### Project Structure (Atomic Design)

```
/components
  /atoms
  /molecules
  /organisms
  /templates
  /pages
/context
/hooks
/lib
/styles
/utils
/routes
/supabase
```

### Component Guidelines

* Components must be reusable and follow single-responsibility.
* Components are categorized by purpose (Atomic Design)

  * Atoms: Input, Button, Label, etc.
  * Molecules: FormField, InputGroup
  * Organisms: AuthForm, TopNav, Sidebar
  * Templates: Layouts and shells
  * Pages: Full pages only used in routing
* Use TypeScript for all components.
* Include props validation, sensible defaults, and documentation.

### Folder Hygiene

* Co-locate styles with components.
* Co-locate tests (where applicable).
* Use consistent naming: `camelCase` for files, `PascalCase` for components.

---

## 🧩 STATE MANAGEMENT & CONTEXT

* Use React Context only for global/shared state (e.g., auth)
* Prefer hooks + local state for isolated component logic
* AuthContext must be initialized and exposed app-wide
* Protect routes using `ProtectedRoute` wrapper

---

## 🔐 SUPABASE RULES

* All access via Supabase client must be wrapped in helper functions
* Each table must have RLS (Row-Level Security) enabled
* Policies must be defined per role (admin, roofer, customer)
* Supabase functions must be documented inline
* Auth tokens must not be exposed in logs

---

## 🎨 UI & UX STANDARDS

* Follow the Figma design system exactly unless overridden by a decision log
* Responsive-first: design must work from mobile → desktop
* Show loading states and success/failure toasts for all async actions
* Error states must be handled with user feedback
* Use skeleton loaders for async component hydration

---

## 📋 TASK TRACKING & WORKFLOW

* All changes must map to a task in `tasks.md`
* Each UI element and interaction must be a subtask
* No silent changes: every update must be logged
* If a new component, hook, or file is added, log it
* If Supabase schema changes, log it with before/after
* If a bug is fixed, reference the original task and cause

---

## 📝 DEV LOGGING & AUDIT TRAIL

* Every change made by a Claude/Cursor agent must be logged in `dev-log.md`
* Logs must include:

  * Date & timestamp
  * Agent or human author
  * Task or file updated
  * Summary of what was changed and why
* Major decisions must include justification and alternatives considered

---

## 🛠 BUILD & DEPLOYMENT

* Use `npm run build` before every deployment
* Never commit `.env` or Supabase keys
* Build output must be checked locally before pushing to main
* Deployment flow must be documented once implemented

---

## ✅ LINTING & QUALITY

* Run `npm run lint` before commit
* Use Prettier for formatting
* ESLint + Tailwind plugins should be configured
* CI should be added to run checks before merging PRs

---

## 📦 FUTURE AUTOMATIONS

* GitHub Actions will handle daily sync jobs (e.g., Supabase cron replacement)
* Supabase Edge Functions may be added to encapsulate business logic

---

## 🧪 TESTING & QUALITY ASSURANCE

* All new components, hooks, and utility functions must include unit tests.
* Tests should be colocated in `__tests__` folders or as `*.test.ts(x)` files next to the code under test.
* Use a modern test runner (e.g., Vitest or Jest) and assertion library.
* Aim for high coverage, but prioritize meaningful, maintainable tests over 100% coverage.
* All tests must pass before merging or deploying.
* Add integration and E2E tests as the app grows.

---

All agents and humans must follow these rules unless a documented override is committed in the `dev-log.md`.

> These rules are living and will evolve as the system grows.
