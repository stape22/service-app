# 💠 Service Industry App – Built with Cursor + Supabase

This is a responsive web application for managing service industry workflows (roofers, customers, jobs, etc). The frontend is designed using a Figma prototype and built with React, styled with Tailwind CSS and a modern component library (like shadcn/ui). Supabase powers the backend, including authentication, database, storage, and edge functions.

---

## 🚀 Tech Stack

| Layer      | Tech                                         |
| ---------- | -------------------------------------------- |
| Frontend   | React (with Vite), TailwindCSS, shadcn/ui    |
| Backend    | Supabase (Auth, DB, Storage, Edge Functions) |
| Design     | Atomic Design System                         |
| Dev Agent  | Claude in Cursor                             |
| Versioning | Git + GitHub                                 |

---

## 🧱 Project Structure

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

> Components follow the Atomic Design methodology for maintainable UI architecture.

---

## 📐 Figma Design Reference Directory

- The `Figma Design/` directory contains reference code exported from Figma and is NOT part of the production build.
- Do NOT import from `Figma Design/components/ui/` in app code. Use it only for design reference and porting new primitives.
- This directory may contain code that does not build or run (e.g., invalid imports, missing dependencies).
- All production code must live in `src/` and follow the atomic/component system.
- **All Figma Design imports have been removed from app code. Placeholders are in place for atomic/component migration. See dev-log.md for audit details.**

---

## 🥉 Key Features

* 🔐 Supabase Auth with role-based access (Admin, Roofer, Customer)
* 🧱 Figma-based component system with clean, reusable UI parts
* 📆 Supabase tables: Users, Roofers, Customers, Jobs
* 🗂️ Dashboard views: Kanban, Table, Calendar
* 📱 Mobile-first responsive design

---

## 🔐 Authentication

* Login and Signup forms will be implemented last per the updated project plan.

---

## 💠 Setup Instructions

1. **Clone the repo:**

   ```bash
   git clone https://github.com/your-org/your-repo.git
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Supabase:**

   * Create a `.env.local` file:

     ```
     VITE_SUPABASE_URL=https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key
     ```

4. **Run the dev server:**

   ```bash
   npm run dev
   ```

---

## 🔄 Scripts

| Command         | Description                |
| --------------- | -------------------------- |
| `npm run dev`   | Start the local dev server |
| `npm run build` | Create production build    |
| `npm run lint`  | Lint all files with ESLint |

---

## 📋 Task Management

All implementation steps are broken down into small, actionable tasks in `tasks.md`. These are suitable for execution by junior developers and track full coverage of design → code → backend integration.

---

## 📌 Notes

* Designed for use with Claude inside Cursor.
* Component library should be used for all UI pieces (e.g., forms, buttons, dialogs).
* Supabase is used for full-stack capabilities (not just auth).

---

## 🛠 GitHub & CI Setup

- This project should be connected to a GitHub repository for version control and collaboration.
- CI/CD is handled via GitHub Actions (see .github/workflows/).
- On every push, tests and linting are run automatically.
- See tasks.md for setup steps.

## ⚡ Supabase MCP Server Integration

- The project uses a Supabase MCP server for backend automation (schema migrations, RLS, etc.).
- See tasks.md for automation and integration tasks.
- Ensure your Supabase project is connected and credentials are set in .env.local.

## ⚡ Supabase MCP Server Automation

This project uses the Supabase MCP server for backend automation, including:
- Schema migrations (tables, columns, indexes)
- RLS (Row-Level Security) policy automation
- Database seeding and test data
- Automated backups and environment sync

**How to use:**
- All automation tasks are tracked in tasks.md and logged in dev-log.md
- Use the MCP server CLI or dashboard to apply migrations and policies
- Ensure your .env.local is configured with the correct Supabase project credentials
- See the Supabase docs and MCP server documentation for advanced usage

### MCP Server CLI Setup & Verification

1. **Install the Supabase CLI:**
   - **Windows:** Use [Scoop](https://scoop.sh/) (recommended):
     ```sh
     scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
     scoop install supabase
     ```
   - **Mac/Linux:** Use Homebrew or download the binary from [Supabase CLI Releases](https://github.com/supabase/cli/releases).
   - **Note:** `npm install -g supabase` is deprecated and will not work.
2. **Configure environment:**
   - Ensure `.env.local` contains your Supabase project URL and anon key.
3. **Verify connection:**
   - Run a test command (e.g., `supabase --version`) to verify access.
4. **Troubleshooting:**
   - If the CLI is not recognized in your editor/IDE terminal, restart the editor or your computer to refresh the PATH.
   - If issues persist, use your system terminal for CLI commands and the editor for code.

---

## 🔑 Secrets Management

- Create a `.env.secret` file in your project root for highly sensitive secrets (e.g., Supabase DB password).
- Example:
  ```
  SUPABASE_DB_PASSWORD=your-db-password
  ```
- This file is ignored by git (see .gitignore) and should never be committed.
- Reference `.env.secret` for CLI/database operations as needed.
