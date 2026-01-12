# 🚀 Rijeka Online - Deployment Guide

## ✅ LOGIN IS NOW FIXED!

Your site is ready to use **right now** at: http://localhost:3001/admin/login

**Test Credentials:**
- **Admin**: `admin@rijeka.online` / `admin123`
- **Editor**: `marko@rijeka.online` / `editor123`
- **Author**: `ana@rijeka.online` / `author123`

Try logging in now - it should work!

---

## 🚀 DEPLOY TO VERCEL (3 Steps - 5 Minutes)

### Method 1: Vercel Dashboard (Easiest)

1. **Go to:** [vercel.com](https://vercel.com)
2. **Sign in** with GitHub
3. **Click "Add New Project"**
4. **Import** your repository: `rijeka-online`
5. **Configure:**
   - Framework Preset: Next.js
   - Build Command: `pnpm build`
   - Install Command: `pnpm install`
6. **Add Environment Variables:**
   ```
   NEXTAUTH_SECRET=NDjPBK/Jp/PwNGaxo9mdiGAoNYquUOGHvz/9EJqJMeY=
   NEXTAUTH_URL=https://your-site.vercel.app
   NODE_ENV=production
   ```
7. **Click "Deploy"**

**That's it!** Your site will be live in 2-3 minutes.

---

### Method 2: Vercel CLI (Alternative)

```bash
# 1. Login to Vercel
npx vercel login

# 2. Deploy
npx vercel

# 3. Deploy to production
npx vercel --prod
```

---

## 🌐 YOUR GITHUB REPO

**Repository:** https://github.com/f246632/rijeka-online

Your code is now on GitHub! You can:
- Share it
- Collaborate with others
- Deploy from GitHub to Vercel

---

## ⚙️ ENVIRONMENT VARIABLES FOR DEPLOYMENT

When deploying, add these environment variables in Vercel dashboard:

### Required:
```
NEXTAUTH_SECRET=NDjPBK/Jp/PwNGaxo9mdiGAoNYquUOGHvz/9EJqJMeY=
NEXTAUTH_URL=https://your-app.vercel.app
```

### Optional (for database - add later):
```
DATABASE_URL=your-postgresql-connection-string
```

### Optional (for image upload - add later):
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## 📝 WHAT WORKS NOW

### ✅ Locally (http://localhost:3001):
- **Login works!** Use test credentials above
- Full admin panel
- Article management
- Category & tag management
- Public website
- All features

### ✅ After Deployment:
- Same features online
- Public URL to share
- Professional hosting
- Automatic HTTPS
- Global CDN

---

## 🎯 NEXT STEPS

1. **TEST LOGIN NOW:** http://localhost:3001/admin/login
2. **Deploy to Vercel:** Follow Method 1 above
3. **Get your live URL:** Example: `rijeka-online.vercel.app`
4. **Share your site!**

### Later (Optional):
- Connect real database (Supabase/Railway)
- Set up Cloudinary for images
- Connect custom domain: `rijeka.online`

---

## 🆘 QUICK HELP

### Login still not working?
1. Refresh the page: http://localhost:3001/admin/login
2. Clear browser cache (Cmd+Shift+R on Mac)
3. Check console for errors

### Need custom domain?
1. Go to Vercel dashboard
2. Project Settings → Domains
3. Add `rijeka.online`
4. Update DNS records as instructed

### Need database?
Use the SQL script in `/docs/manual-database-setup.sql` in Supabase

---

## 📞 YOUR SITE INFO

- **Local**: http://localhost:3001
- **GitHub**: https://github.com/f246632/rijeka-online
- **Vercel**: Will be available after deployment

**Ready to go live in 5 minutes!** 🚀
