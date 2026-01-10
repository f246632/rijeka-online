# Rijeka Online - Professional News Publication

A modern news publication website built with Next.js 14, featuring a traditional newspaper design inspired by BBC News and The Guardian.

## Features

- **Modern Tech Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **CMS**: Custom admin panel with rich text editor (TipTap)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5 with role-based access
- **Image Hosting**: Cloudinary with automatic optimization
- **SEO Optimized**: Meta tags, sitemap, RSS feed
- **Responsive Design**: Mobile-first, traditional newspaper layout

## Getting Started

### Prerequisites

- Node.js 20+ and pnpm
- PostgreSQL database (local or cloud)
- Cloudinary account (free tier works)

### Installation

1. Install dependencies:

\`\`\`bash
pnpm install
\`\`\`

2. Set up environment variables:

\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env` and add your database URL, NextAuth secret, and Cloudinary credentials.

3. Initialize the database:

\`\`\`bash
pnpm db:migrate
pnpm db:seed
\`\`\`

4. Start the development server:

\`\`\`bash
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
rijeka-online/
├── prisma/              # Database schema and migrations
├── src/
│   ├── app/            # Next.js App Router
│   │   ├── (public)/  # Public-facing pages
│   │   ├── (admin)/   # Admin panel
│   │   └── api/       # API routes
│   ├── components/     # React components
│   ├── lib/           # Utilities and configs
│   └── types/         # TypeScript types
├── tests/              # Test files
├── docs/               # Documentation
└── scripts/            # Utility scripts
\`\`\`

## Admin Panel

Access the admin panel at `/admin/login` with the credentials created during seeding.

Default admin user:
- Email: admin@rijeka.online
- Password: (set during seed)

## Deployment

The app is optimized for deployment on Vercel:

\`\`\`bash
vercel --prod
\`\`\`

Don't forget to set environment variables in your Vercel project settings.

## Documentation

- [Architecture](./docs/architecture.md)
- [API Documentation](./docs/api.md)
- [User Guide](./docs/user-guide.md)
- [Deployment Guide](./docs/deployment.md)

## License

Proprietary - All rights reserved
