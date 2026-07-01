# Mudeng Event Web

Mudeng Event Web is the official platform for MUDENG (Multimedia Digital Engagement) STT Terpadu Nurul Fikri to showcase, manage, and register for various creative events, such as UI Craft, Creative Craft, and MuCreX.

This project is built with **Next.js (App Router)** and styled using **Tailwind CSS**, with smooth animations powered by **Framer Motion**.

## 🚀 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Database (Serverless):** [@neondatabase/serverless](https://neon.tech/)
- **Package Manager:** [pnpm](https://pnpm.io/)

## 📂 Project Structure

- `src/app/`: Next.js App Router pages (e.g., `/`, `/events/[slug]`).
- `src/components/`: Reusable React components used across the website.
    - `event-detail/`: Specific components for the individual event pages.
- `src/data/`: Static data sources like `events.ts` containing the event catalog.
- `src/lib/`: Utility libraries and database configuration (`db.ts`).
- `public/`: Static assets such as images and icons.

## 🛠️ Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine. We recommend using `pnpm` as the package manager.

```bash
npm install -g pnpm
```

### Installation

1. Clone the repository and navigate into the `event-web` directory:

    ```bash
    cd event-web
    ```

2. Install the project dependencies:
    ```bash
    pnpm install
    ```

### Running the Development Server

Start the local development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page will auto-update as you edit the files.

### Building for Production

To create an optimized production build:

```bash
pnpm build
```

To start the production server locally:

```bash
pnpm start
```

## 🎨 Design & Assets

The website implements modern web design practices including interactive hover states, beautiful gradients, and micro-animations via Framer Motion to ensure an engaging user experience.
Assets and visual references are stored in the `public/assets` folder.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request.
