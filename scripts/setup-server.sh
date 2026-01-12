#!/bin/bash
set -e

# Rijeka Online - Server Setup Script
# Run this ONCE on your Hetzner server to set up everything

echo "🚀 Setting up Rijeka Online on Hetzner..."

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Configuration
APP_NAME="rijeka-online"
APP_DIR="/var/www/$APP_NAME"
REPO_URL="https://github.com/f246632/rijeka-online.git"

echo -e "${BLUE}📋 Step 1/6: Checking prerequisites...${NC}"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js not found. Installing...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}⚠️  pnpm not found. Installing...${NC}"
    curl -fsSL https://get.pnpm.io/install.sh | sh -
    export PNPM_HOME="$HOME/.local/share/pnpm"
    export PATH="$PNPM_HOME:$PATH"
fi

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}⚠️  PM2 not found. Installing...${NC}"
    npm install -g pm2
fi

echo -e "${GREEN}✅ Prerequisites installed${NC}"

echo -e "${BLUE}📂 Step 2/6: Setting up application directory...${NC}"

# Create app directory if it doesn't exist
if [ ! -d "$APP_DIR" ]; then
    sudo mkdir -p /var/www
    sudo chown $USER:$USER /var/www
    cd /var/www
    git clone $REPO_URL
    echo -e "${GREEN}✅ Repository cloned${NC}"
else
    echo -e "${YELLOW}⚠️  Directory exists, pulling latest changes...${NC}"
    cd $APP_DIR
    git pull origin master
fi

echo -e "${BLUE}⚙️  Step 3/6: Creating environment file...${NC}"

# Create .env file
cat > $APP_DIR/.env << 'EOF'
NEXTAUTH_SECRET=NDjPBK/Jp/PwNGaxo9mdiGAoNYquUOGHvz/9EJqJMeY=
NEXTAUTH_URL=http://localhost:3000
NODE_ENV=production
EOF

echo -e "${GREEN}✅ Environment file created${NC}"

echo -e "${BLUE}📦 Step 4/6: Installing dependencies...${NC}"
cd $APP_DIR
pnpm install --frozen-lockfile

echo -e "${BLUE}🔨 Step 5/6: Building application...${NC}"
pnpm run build

echo -e "${BLUE}🚀 Step 6/6: Starting application with PM2...${NC}"

# Stop existing instance if running
if pm2 list | grep -q "$APP_NAME"; then
    pm2 delete $APP_NAME
fi

# Start with PM2
pm2 start npm --name "$APP_NAME" -- start
pm2 save
pm2 startup | tail -n 1 | bash

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Rijeka Online is now running!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}🌐 Access your site:${NC}"
echo -e "   Local: http://localhost:3000"
echo -e "   Network: http://$(hostname -I | awk '{print $1}'):3000"
echo ""
echo -e "${BLUE}🔐 Admin login:${NC}"
echo -e "   Email: admin@rijeka.online"
echo -e "   Password: admin123"
echo ""
echo -e "${BLUE}📊 Useful commands:${NC}"
echo -e "   pm2 status           - Check app status"
echo -e "   pm2 logs $APP_NAME   - View logs"
echo -e "   pm2 restart $APP_NAME - Restart app"
echo -e "   pm2 monit            - Monitor resources"
echo ""
echo -e "${YELLOW}💡 Tip: Set up Nginx as reverse proxy for production use${NC}"
echo -e "   See: /var/www/$APP_NAME/docs/HETZNER-DEPLOYMENT.md"
echo ""
