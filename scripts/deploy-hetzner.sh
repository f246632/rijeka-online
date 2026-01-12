#!/bin/bash
set -e

# Rijeka Online - Hetzner Deployment Script
# This script deploys the Next.js app to your Hetzner server

echo "🚀 Deploying Rijeka Online to Hetzner..."

# Configuration
APP_NAME="rijeka-online"
APP_DIR="/var/www/$APP_NAME"
PM2_APP_NAME="rijeka-online"

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}📦 Installing dependencies...${NC}"
cd $APP_DIR
pnpm install --frozen-lockfile

echo -e "${BLUE}🔨 Building production bundle...${NC}"
pnpm run build

echo -e "${BLUE}⚙️  Setting up environment...${NC}"
# Environment file should already exist on server

echo -e "${BLUE}🔄 Restarting application with PM2...${NC}"
if pm2 list | grep -q "$PM2_APP_NAME"; then
    pm2 restart $PM2_APP_NAME
    echo -e "${GREEN}✅ Application restarted${NC}"
else
    pm2 start npm --name "$PM2_APP_NAME" -- start
    pm2 save
    echo -e "${GREEN}✅ Application started${NC}"
fi

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${BLUE}🌐 Your site should be running on port 3000${NC}"
