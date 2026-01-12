# Database Connection Troubleshooting

## Issue
Cannot connect to Supabase database.

## Possible Causes

### 1. **Supabase Project is Paused** (Most Common)
Free tier Supabase projects pause after 7 days of inactivity.

**Solution:**
1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your project: `seciepwgozzhujftakrq`
3. If you see "Paused" status, click **"Restore"** or **"Resume"**
4. Wait 2-3 minutes for the database to start
5. Then try again: `pnpm db:seed`

### 2. **Wrong Connection String**
The pooler connection might be incorrect.

**Your connection details:**
- Project: `seciepwgozzhujftakrq`
- Region: `eu-west-2`
- Pooler: `aws-1-eu-west-2.pooler.supabase.com:6543`

**Get the correct connection string:**
1. Go to Supabase Dashboard
2. Settings → Database
3. Copy the **"Connection string"** under **"Connection pooling"** (Transaction mode)
4. Replace `[YOUR-PASSWORD]` with: `12345Mirmirmir!!`
5. Update `.env` file

### 3. **Network/Firewall Issues**
Your network might be blocking the connection.

**Quick Test:**
```bash
curl -v https://aws-1-eu-west-2.pooler.supabase.com
```

If this fails, try:
- Different network (mobile hotspot)
- VPN
- Check firewall settings

## Alternative Solution: Manual SQL Setup

If connection keeps failing, you can set up the database manually:

### Step 1: Run SQL in Supabase Dashboard

1. Go to Supabase → SQL Editor
2. Copy all SQL from `/Users/m./rijeka-online/docs/manual-database-setup.sql`
3. Paste and click "Run"

### Step 2: Manually Add Test Users

Run this SQL in Supabase:

```sql
-- Insert test users
INSERT INTO users (id, name, email, password, role, created_at, updated_at)
VALUES
  ('admin-001', 'Admin', 'admin@rijeka.online', '$2a$10$YourHashedPasswordHere', 'ADMIN', NOW(), NOW()),
  ('editor-001', 'Marko Horvat', 'marko@rijeka.online', '$2a$10$YourHashedPasswordHere', 'EDITOR', NOW(), NOW()),
  ('author-001', 'Ana Kovač', 'ana@rijeka.online', '$2a$10$YourHashedPasswordHere', 'AUTHOR', NOW(), NOW());

-- For hashed password, use: admin123, editor123, author123
-- You'll need to generate bcrypt hashes for these
```

## Quick Fix: Temporary Dev Mode

If you just want to test the admin panel **without database**, I can create a temporary development mode with hardcoded credentials.

This would let you explore the admin interface immediately while we debug the database.

Would you like me to implement this?
