# born-to-blossom

Born To Blossom — a holistic wellness landing site built with Next.js, TypeScript, and Tailwind CSS.

## Prerequisites

Install these before you start:

| Tool | Version |
|------|---------|
| [Node.js](https://nodejs.org/) | 18.x or newer (20+ recommended) |
| [npm](https://www.npmjs.com/) | Comes with Node.js |
| [Git](https://git-scm.com/) | Any recent version |

Check your versions:

```bash
node -v
npm -v
git --version
```

## First-time setup (after cloning)

### 1. Clone the repository

```bash
git clone git@github.com:ankita219819/born-to-blossom.git
cd born-to-blossom
```

If you use HTTPS instead of SSH:

```bash
git clone https://github.com/ankita219819/born-to-blossom.git
cd born-to-blossom
```

### 2. Install dependencies

```bash
npm install
```

This reads `package-lock.json` and installs all required packages into `node_modules/`.

### 3. Run the development server

**Local only (browser on this machine):**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Local + network access (phone, other devices on same Wi‑Fi, or ngrok):**

```bash
npm run dev -- --hostname 0.0.0.0 --port 3000
```

- Local: [http://localhost:3000](http://localhost:3000)
- Network: `http://<your-computer-ip>:3000`

> No `.env` file is required for local development. The site runs with the content and assets already in the repo.

### 4. Stop the server

Press `Ctrl + C` in the terminal where the dev server is running.

## Other useful commands

| Command | Description |
|---------|-------------|
| `npm run build` | Create a production build |
| `npm run start` | Run the production build (run `build` first) |
| `npm run lint` | Run ESLint |

Production flow:

```bash
npm run build
npm run start
```

Then open [http://localhost:3000](http://localhost:3000).

## Project structure (overview)

```
app/              Next.js App Router pages and global styles
components/       UI sections (Hero, About, Services, Booking, etc.)
lib/              Content data, motion presets, utilities
public/           Static images and assets
```

## Troubleshooting

**Port 3000 already in use**

```bash
npm run dev -- --hostname 0.0.0.0 --port 3001
```

**Dependencies out of sync after pulling changes**

```bash
npm install
```

**Clean reinstall**

```bash
rm -rf node_modules .next
npm install
npm run dev
```

**Ngrok / tunnel warning about `allowedDevOrigins`**

If you expose the dev server via ngrok and see a Next.js cross-origin warning, you can add your tunnel domain to `next.config.ts` when needed. The site still loads; this is a dev-only notice.

## Tech stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion, Lenis smooth scroll, Embla Carousel
