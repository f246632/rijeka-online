# 🚀 Deploy Rijeka Online to Hetzner Server

## Quick Deployment Steps

### 1. **On Your Hetzner Server (First Time Setup)**

SSH into your server and run these commands:

```bash
# Install required software (if not already installed)
curl -fsSL https://get.pnpm.io/install.sh | sh -
sudo npm install -g pm2

# Create app directory
sudo mkdir -p /var/www/rijeka-online
sudo chown $USER:$USER /var/www/rijeka-online

# Clone your repository
cd /var/www
git clone https://github.com/f246632/rijeka-online.git
cd rijeka-online

# Create .env file
cat > .env << 'EOF'
NEXTAUTH_SECRET=NDjPBK/Jp/PwNGaxo9mdiGAoNYquUOGHvz/9EJqJMeY=
NEXTAUTH_URL=http://your-server-ip:3000
NODE_ENV=production
EOF

# Install dependencies
pnpm install

# Build the app
pnpm run build

# Start with PM2
pm2 start npm --name "rijeka-online" -- start
pm2 save
pm2 startup
```

### 2. **Configure Nginx (Optional but Recommended)**

```bash
sudo nano /etc/nginx/sites-available/rijeka-online
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name rijeka.online www.rijeka.online;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/rijeka-online /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 3. **Add SSL with Let's Encrypt (Recommended)**

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d rijeka.online -d www.rijeka.online
```

### 4. **Deploy Updates (Future Deployments)**

When you push changes to GitHub, SSH to your server and run:

```bash
cd /var/www/rijeka-online
git pull origin master
pnpm install
pnpm run build
pm2 restart rijeka-online
```

Or use the deployment script:

```bash
cd /var/www/rijeka-online
bash scripts/deploy-hetzner.sh
```

## 🔍 Useful Commands

```bash
# Check if app is running
pm2 status

# View logs
pm2 logs rijeka-online

# Restart app
pm2 restart rijeka-online

# Stop app
pm2 stop rijeka-online

# Monitor resources
pm2 monit
```

## 🌐 Access Your Site

After deployment:
- **Without Nginx**: http://your-server-ip:3000
- **With Nginx**: http://rijeka.online
- **With SSL**: https://rijeka.online

## 🔐 Login Credentials

- **Admin**: admin@rijeka.online / admin123
- **Editor**: marko@rijeka.online / editor123
- **Author**: ana@rijeka.online / author123

## 🔧 Troubleshooting

### Port 3000 already in use:
```bash
pm2 delete rijeka-online
lsof -ti:3000 | xargs kill -9
pm2 start npm --name "rijeka-online" -- start
```

### Build fails:
```bash
rm -rf .next node_modules
pnpm install
pnpm run build
```

### Check server logs:
```bash
pm2 logs rijeka-online --lines 100
```

## 📊 Server Requirements

- **Node.js**: 18.x or higher
- **RAM**: Minimum 1GB (2GB recommended)
- **Disk**: 2GB free space
- **OS**: Ubuntu 20.04+ or similar

## 🔄 Auto-Deploy with GitHub Webhooks (Optional)

You can set up automatic deployments when you push to GitHub:

1. Create webhook script on server:
```bash
sudo nano /var/www/deploy-webhook.sh
```

2. Add:
```bash
#!/bin/bash
cd /var/www/rijeka-online
git pull origin master
pnpm install
pnpm run build
pm2 restart rijeka-online
```

3. Make executable:
```bash
sudo chmod +x /var/www/deploy-webhook.sh
```

4. Set up webhook endpoint using webhook listener (optional advanced setup)

---

**Need Help?**
- Check PM2 logs: `pm2 logs rijeka-online`
- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
- Check if port 3000 is accessible: `curl http://localhost:3000`
