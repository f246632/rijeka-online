-- Rijeka Online - Manual Database Setup SQL
-- Run this in your Supabase SQL Editor if connection issues persist

-- Create enums
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'EDITOR', 'AUTHOR', 'CONTRIBUTOR');
CREATE TYPE "ArticleStatus" AS ENUM ('DRAFT', 'REVIEW', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED');

-- Create users table
CREATE TABLE "users" (
    "id" TEXT PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" DEFAULT 'AUTHOR' NOT NULL,
    "bio" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE INDEX "users_email_idx" ON "users"("email");

-- Create categories table
CREATE TABLE "categories" (
    "id" TEXT PRIMARY KEY,
    "name" VARCHAR(100) UNIQUE NOT NULL,
    "slug" VARCHAR(100) UNIQUE NOT NULL,
    "description" TEXT,
    "color" VARCHAR(7) DEFAULT '#2563eb' NOT NULL,
    "icon" VARCHAR(50),
    "displayOrder" INTEGER DEFAULT 0 NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE INDEX "categories_slug_idx" ON "categories"("slug");
CREATE INDEX "categories_displayOrder_idx" ON "categories"("displayOrder");

-- Create tags table
CREATE TABLE "tags" (
    "id" TEXT PRIMARY KEY,
    "name" VARCHAR(50) UNIQUE NOT NULL,
    "slug" VARCHAR(50) UNIQUE NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE INDEX "tags_slug_idx" ON "tags"("slug");

-- Create articles table
CREATE TABLE "articles" (
    "id" TEXT PRIMARY KEY,
    "slug" VARCHAR(200) UNIQUE NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "subtitle" VARCHAR(300),
    "excerpt" VARCHAR(500) NOT NULL,
    "content" JSONB NOT NULL,
    "contentHtml" TEXT NOT NULL,
    "featuredImage" TEXT,
    "imageCaption" VARCHAR(300),
    "imageCredit" VARCHAR(100),
    "status" "ArticleStatus" DEFAULT 'DRAFT' NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "scheduledFor" TIMESTAMP(3),
    "viewCount" INTEGER DEFAULT 0 NOT NULL,
    "metaTitle" VARCHAR(60),
    "metaDescription" VARCHAR(160),
    "keywords" TEXT[],
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE,
    FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT
);

CREATE INDEX "articles_slug_idx" ON "articles"("slug");
CREATE INDEX "articles_status_publishedAt_idx" ON "articles"("status", "publishedAt");
CREATE INDEX "articles_authorId_idx" ON "articles"("authorId");
CREATE INDEX "articles_categoryId_idx" ON "articles"("categoryId");
CREATE INDEX "articles_createdAt_idx" ON "articles"("createdAt");

-- Create article-tag junction table
CREATE TABLE "_ArticleToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    FOREIGN KEY ("A") REFERENCES "articles"("id") ON DELETE CASCADE,
    FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE
);

CREATE UNIQUE INDEX "_ArticleToTag_AB_unique" ON "_ArticleToTag"("A", "B");
CREATE INDEX "_ArticleToTag_B_index" ON "_ArticleToTag"("B");

-- Create sessions table (for NextAuth)
CREATE TABLE "sessions" (
    "id" TEXT PRIMARY KEY,
    "sessionToken" VARCHAR(255) UNIQUE NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE INDEX "sessions_userId_idx" ON "sessions"("userId");

-- Create verification tokens table
CREATE TABLE "verification_tokens" (
    "identifier" VARCHAR(255) NOT NULL,
    "token" VARCHAR(255) UNIQUE NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    UNIQUE ("identifier", "token")
);

-- Create site settings table
CREATE TABLE "site_settings" (
    "id" TEXT PRIMARY KEY DEFAULT 'singleton',
    "siteName" VARCHAR(100) DEFAULT 'Rijeka Online' NOT NULL,
    "siteDescription" TEXT,
    "logo" TEXT,
    "favicon" TEXT,
    "contactEmail" VARCHAR(255),
    "socialFacebook" VARCHAR(255),
    "socialTwitter" VARCHAR(255),
    "socialInstagram" VARCHAR(255),
    "enableComments" BOOLEAN DEFAULT false NOT NULL,
    "enableNewsletter" BOOLEAN DEFAULT false NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Add full-text search (PostgreSQL specific)
ALTER TABLE "articles" ADD COLUMN "search_vector" tsvector;
CREATE INDEX "articles_search_idx" ON "articles" USING GIN("search_vector");

-- Function to update search vector
CREATE OR REPLACE FUNCTION update_article_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW."search_vector" := to_tsvector('english', COALESCE(NEW.title, '') || ' ' || COALESCE(NEW."contentHtml", ''));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update search vector
CREATE TRIGGER article_search_vector_update
    BEFORE INSERT OR UPDATE ON "articles"
    FOR EACH ROW
    EXECUTE FUNCTION update_article_search_vector();

-- Success message
SELECT 'Database schema created successfully!' AS status;
