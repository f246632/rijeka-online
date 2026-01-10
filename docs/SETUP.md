# Rijeka Online - Setup Guide

## ✅ Phase 1: Foundation (COMPLETED)

The project foundation has been successfully set up with all core infrastructure in place.

### What's Been Created

1. **Project Structure** (SPARC-compliant)
   - Next.js 14 with App Router
   - TypeScript configured
   - Tailwind CSS set up
   - All directories organized properly

2. **Database Schema** (PostgreSQL + Prisma)
   - User model (with roles: ADMIN, EDITOR, AUTHOR, CONTRIBUTOR)
   - Article model (with status workflow: DRAFT → REVIEW → SCHEDULED → PUBLISHED → ARCHIVED)
   - Category model (with colors for UI)
   - Tag model (many-to-many with articles)
   - Session model (for NextAuth.js)
   - Site Settings model (global config)

3. **Sample Data** (Seed file ready)
   - 3 test users (admin, editor, author)
   - 5 categories (Politika, Ekonomija, Kultura, Sport, Mišljenja)
   - 5 tags
   - 4 published articles + 1 draft
   - All content in Croatian

4. **Utilities**
   - Prisma client setup
   - Utility functions (date formatting, slug generation, etc.)
   - Tailwind CSS theme with news-specific styles
   - Git repository initialized

---

## 🚀 Next Steps - Set Up Database

Before you can run the application, you need to set up a PostgreSQL database.

### Option 1: Using Supabase (Recommended for Quick Start)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Get your database connection string from Settings → Database
4. Update `.env` file:
   ```
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[YOUR-HOST]:5432/postgres"
   ```

### Option 2: Using Local PostgreSQL

1. Install PostgreSQL on your machine
2. Create a database:
   ```bash
   createdb rijeka_online
   ```
3. Update `.env` file:
   ```
   DATABASE_URL="postgresql://postgres:password@localhost:5432/rijeka_online?schema=public"
   ```

### Option 3: Using Railway (Another Cloud Option)

1. Go to [railway.app](https://railway.app)
2. Create a new PostgreSQL database
3. Get the connection string
4. Update `.env` file

---

## 📦 Initialize Database

Once you have your database set up, run these commands:

```bash
# Navigate to project directory
cd rijeka-online

# Run database migrations
pnpm db:migrate

# Seed the database with sample data
pnpm db:seed
```

After seeding, you'll have these test accounts:
- **Admin**: admin@rijeka.online / admin123
- **Editor**: marko@rijeka.online / editor123
- **Author**: ana@rijeka.online / author123

---

## 🎨 What's Next: Authentication & Admin Panel

The next phase of development will include:

1. **NextAuth.js Setup** - Secure authentication system
2. **Admin Login Page** - Professional login interface
3. **Admin Dashboard** - Overview with statistics
4. **Category/Tag Management** - CRUD interfaces
5. **Article List** - Data table with filters

After authentication is set up, we'll build:
- Rich text editor (TipTap)
- Image upload (Cloudinary)
- Public homepage
- Article detail pages
- Search functionality
- SEO features

---

## 📝 Environment Variables

Before starting development, update your `.env` file:

### Required Immediately
```
DATABASE_URL="your-postgresql-connection-string"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
```

### Required for Image Upload (Later)
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="get-from-cloudinary.com"
CLOUDINARY_API_KEY="get-from-cloudinary.com"
CLOUDINARY_API_SECRET="get-from-cloudinary.com"
```

---

## 🏃 Running the Development Server

Once database is set up, start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) - you should see a placeholder homepage.

---

## 📂 Project Structure

```
rijeka-online/
├── prisma/
│   ├── schema.prisma       # Database models
│   └── seed.ts             # Sample data
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Homepage
│   │   └── globals.css     # Global styles
│   └── lib/
│       ├── prisma.ts       # Database client
│       └── utils.ts        # Helper functions
├── config/                  # Configuration files
├── docs/                    # Documentation
├── tests/                   # Tests (to be added)
└── public/                  # Static assets
```

---

## ⚙️ Available Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm db:migrate       # Run migrations
pnpm db:push          # Push schema changes
pnpm db:seed          # Seed sample data
pnpm db:generate      # Generate Prisma client

# Code Quality
pnpm lint             # Run ESLint
pnpm typecheck        # Type checking

# Testing (to be implemented)
pnpm test             # Run tests
pnpm test:e2e         # Run E2E tests
```

---

## 🎯 Current Status

- ✅ Project setup complete
- ✅ Database schema defined
- ✅ Seed data ready
- ✅ Git initialized
- ⏳ Database connection needed
- ⏳ Authentication pending
- ⏳ Admin panel pending
- ⏳ Public site pending

---

## 📚 Documentation

- [Architecture Overview](./architecture.md) - To be created
- [API Documentation](./api.md) - To be created
- [User Guide](./user-guide.md) - To be created
- [Deployment Guide](./deployment.md) - To be created

---

## 💡 Tips

1. **Database First**: Set up your database connection before proceeding
2. **Environment Variables**: Never commit `.env` to Git (already in `.gitignore`)
3. **Seed Data**: The seed script creates Croatian content - perfect for testing
4. **Development Flow**: Make changes → Test → Commit → Repeat
5. **Production Ready**: This setup is designed for deployment to Vercel

---

## 🆘 Troubleshooting

### "Can't reach database server"
- Check your DATABASE_URL in `.env`
- Ensure your database is running
- Verify network connectivity (for cloud databases)

### "Prisma Client not found"
- Run `pnpm db:generate`

### "Port 3000 already in use"
- Stop other Next.js projects
- Or use: `PORT=3001 pnpm dev`

---

Ready to continue? Set up your database and run the migrations!
