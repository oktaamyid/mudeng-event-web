# Mudeng Event Web

Official event showcase, dynamic registration, and mini-CMS platform for **MUDENG (Multimedia Digital Engagement)** STT Terpadu Nurul Fikri.

Built with **Next.js 16 (App Router + Turbopack)**, **React 19**, **Tailwind CSS v4**, **Drizzle ORM**, and **Bun**.

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (`basePath: /event`, `output: standalone`)
- **Runtime & Package Manager:** [Bun](https://bun.sh/) (`bun.lock`) + Node.js 20 (Docker production runner)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (`strict` mode)
- **Database & ORM:** PostgreSQL ([Neon Serverless](https://neon.tech/)) + [Drizzle ORM](https://orm.drizzle.team/)
- **Styling & UI:** [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) + [Lucide React](https://lucide.dev/)
- **Animations & Scroll:** [Framer Motion](https://www.framer.com/motion/) + [Lenis](https://lenis.darkroom.engineering/)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Rich Text & File Uploads:** [ReactQuill](https://github.com/zenoamaro/react-quill) (`react-quill-new`) + [UploadThing](https://uploadthing.com/)
- **Integrations:** Google Sheets API (`googleapis`)

## Key Features

- **Public Event Showcase & Registration (`/[slug]`, `/[slug]/register`)**:
  - Dynamic event pages with customizable **Event Info Card** (`Nama Proker`, `Kategori`, `Format`, `Fokus`, `Output`, etc.).
  - Multi-step dynamic registration form with conditional logic, file upload + inline image preview, and rich-text confirmation messages.
  - Instagram profile embed (`@mudengsttnf`) for auto-latest social proof on the home page.
- **Admin Dashboard (`/admin`)**:
  - **Events & Form Builder (`/admin/events`)**: Create/edit events with drag-and-drop form builder, rich text sections, UploadThing image management (with auto-delete), and dirty-state sticky action bar.
  - **Registrants Management (`/admin/events/[slug]/registrants`)**: Search, status filtering, view/edit/delete registrants, inline file preview, CSV export, and **Sync to Google Sheets** with automatic report-ready table formatting.
  - **Home CMS (`/admin/content`)**: Manage home Course Cards, Testimonials / Instagram feed mode, Home FAQs, and About stats from the database (`site_content`).
  - **Users Management (`/admin/users`)**: Role-based access control (`admin` / `user`).

## Project Structure

- `src/app/`: Next.js App Router pages (`/`, `/[slug]`, `/[slug]/register`, `/admin/*`, `/dashboard`, `/api/uploadthing`).
- `src/components/`: UI components (`Hero`, `Benefits`, `Testimonials`, `FormBuilder`, `RegistrationForm`, `EventInfoEditor`, `event-detail/*`, `ui/*`).
- `src/db/`: Drizzle schema (`schema.ts`), migrations, and seed scripts.
- `src/lib/`: Server Actions (`actions/events.ts`, `actions/cms.ts`, `actions/sheets.ts`, `actions/upload.ts`, `actions/users.ts`), auth session, and CMS defaults.
- `docs/`: Architecture (`architect.md`), Technical Spec (`tech-spec.md`), PRD (`prd.md`), and changelog (`changelog/pending.md`).

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (`>= 1.3`)
- PostgreSQL database (e.g. Neon)

### Installation

1. Navigate into `event-web` and install dependencies:
   ```bash
   cd event-web
   bun install
   ```

2. Configure `.env` (database URL, JWT secret, UploadThing token, Google Sheets credentials).

3. Push database schema:
   ```bash
   bunx drizzle-kit push
   ```

### Development

```bash
bun dev
```

Open [http://localhost:3000/event](http://localhost:3000/event) in your browser.

### Verification & Production Build

```bash
bun run lint
bunx tsc --noEmit
bun run build
bun run start
```

### Docker

The `Dockerfile` uses Bun (`oven/bun:1-alpine`) for dependency installation and Next.js build, and `node:20-alpine` for the standalone production server on port `4000`.
