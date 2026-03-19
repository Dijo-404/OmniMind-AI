#!/bin/bash

# OmniMind AI — Project Vanguard Unified Launcher
# High-Integrity Multi-Agent Platform

# 🎨 Premium UI Elements
BLUE='\033[0;34m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "   ____                  _ __  ____           __ "
echo "  / __ \____ ___  ____  (_)  |/ / /_  ____  / / "
echo " / / / / __ \`__ \/ __ \/ / /|_/ / __ \/ __ \/ /  "
echo "/ /_/ / / / / / / / / / / /  / / / / / /_/ / /   "
echo "\____/_/ /_/ /_/_/ /_/_/_/  /_/_/ /_/\____/_/    "
echo -e "${NC}"
echo -e "${CYAN}🚀 Initializing Project Vanguard Intelligence Engine...${NC}"

# Check for Node.js
if ! command -v npm &> /dev/null
then
    echo -e "${NC}❌ Error: 'npm' not found. Please install Node.js."
    exit 1
fi

# Check for Python
if ! command -v python3 &> /dev/null
then
    echo -e "${NC}❌ Error: 'python3' not found. Please install Python."
    exit 1
fi

# 🛤️ Navigation
ROOT_DIR=$(pwd)

# 📦 Dependency Check (Optional/Silent)
echo -e "${CYAN}📦 Ensuring Neural Dependencies...${NC}"
npm install &> /dev/null

# ⚡ Neural Launch (Concurrently)
echo -e "${GREEN}✨ Launching Frontend & Backend Nodes...${NC}"
echo -e "${GREEN}🔗 Vanguard Hub: http://localhost:3000${NC}"
echo -e "${GREEN}🔗 Core API Hub: http://localhost:8000${NC}"

npm run dev
