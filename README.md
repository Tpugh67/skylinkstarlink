# SkyLinkStarLink — Unified App

A Next.js 14 application combining the public website and internal back office in one unified codebase.

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## URL structure

| Route | Description |
|-------|-------------|
| `/` | Public homepage |
| `/dashboard` | Back office dashboard |
| `/leads` | Lead management |
| `/proposals` | Proposal center |
| `/payments` | Payment tracking |
| `/team` | Team & roles |
| `/comms` | Communication hub |
| `/settings` | Settings |

## Role-based access

Switch roles using the user switcher at the bottom of the sidebar (demo only).

| Role | Access |
|------|--------|
| Founder | Everything |
| Sales | Dashboard, Leads, Proposals, Comms |
| Developer | Dashboard, Comms |
| Designer | Dashboard, Comms |
| CRM Specialist | Dashboard, Leads, Proposals, Comms |
| VA | Dashboard, Leads, Proposals, Comms |

## Planned integrations (next steps)

- **Supabase** — real authentication & database
- **Stripe** — billing and payment tracking
- **PipeDesk** — CRM and pipeline sync
- **Slack / Discord** — team messaging
- **Gmail** — client communication
- **Upwork / Fiverr / Freelancer** — lead feed integration

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React icons

## File structure

```
src/
  app/
    page.tsx              ← Public homepage
    dashboard/page.tsx    ← Back office dashboard
    leads/page.tsx
    proposals/page.tsx
    payments/page.tsx
    team/page.tsx
    comms/page.tsx
    settings/page.tsx
  components/
    ui/index.tsx          ← Shared UI (Badge, Button, Card, etc.)
    layout/
      Sidebar.tsx         ← Back office sidebar + role switcher
      BackOfficeLayout.tsx
  lib/
    auth.tsx              ← Auth context + role permissions
    data.ts               ← Mock data (replace with Supabase)
```
