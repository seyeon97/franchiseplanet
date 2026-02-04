#!/bin/bash

# Auth Setup Script for better-auth
# This script sets up better-auth with email/password + username authentication

set -e

echo "🔐 Setting up better-auth..."

# Check if DB is already set up
DB_PLUGIN=$(npm pkg get cg.plugins.db 2>/dev/null || echo "undefined")
if [ "$DB_PLUGIN" = "undefined" ] || [ "$DB_PLUGIN" = "{}" ]; then
  echo "❌ Error: Database is not set up yet!"
  echo "Please run db-setup first:"
  echo "  bash -c '.claude/skills/db-setup/scripts/setup.sh'"
  exit 1
fi

# Check if auth is already configured
AUTH_PLUGIN=$(npm pkg get cg.plugins.auth 2>/dev/null || echo "undefined")
if [ "$AUTH_PLUGIN" != "undefined" ] && [ "$AUTH_PLUGIN" != "{}" ]; then
  echo "⚠️  Auth is already configured!"
  echo "Skipping setup..."
  exit 0
fi

# Check if auth schema already exists
if [ -f "src/server/db/plugin/auth/schema.ts" ]; then
  echo "⚠️  Auth schema already exists!"
  echo "Skipping auth schema setup, but continuing with other configurations..."
  SKIP_SCHEMA=true
else
  SKIP_SCHEMA=false
fi

# 1. Create auth server file with generated secret
echo "📝 Creating auth server configuration..."
mkdir -p src/server/auth
AUTH_SECRET=$(openssl rand -hex 32)
sed "s/replace-this-with-random-secret-on-setup/$AUTH_SECRET/" .claude/skills/auth-setup/assets/auth.ts > src/server/auth/index.ts
echo "✅ Generated AUTH_SECRET: ${AUTH_SECRET:0:8}..."

# 2. Add auth schema
if [ "$SKIP_SCHEMA" = false ]; then
  echo "📝 Adding auth schema..."

  # Copy auth schema to plugin directory
  mkdir -p src/server/db/plugin/auth
  cp .claude/skills/auth-setup/assets/auth-schema.ts src/server/db/plugin/auth/schema.ts

  # Add export to main schema.ts if not exists
  if ! grep -q 'export \* from "./plugin/auth/schema"' src/server/db/schema.ts 2>/dev/null; then
    echo "" >> src/server/db/schema.ts
    echo '// Auth plugin tables' >> src/server/db/schema.ts
    echo 'export * from "./plugin/auth/schema";' >> src/server/db/schema.ts
  fi
else
  echo "⏭️  Skipping auth schema (already exists)"
fi

# 3. Create auth API route
echo "📝 Creating auth API route..."
mkdir -p src/app/api/auth/\[...all\]
cp .claude/skills/auth-setup/assets/auth-route.ts src/app/api/auth/\[...all\]/route.ts

# 4. Create auth client
echo "📝 Creating auth client..."
cp .claude/skills/auth-setup/assets/auth-client.ts src/lib/auth-client.ts

# 5. Generate BETTER_AUTH_SECRET if not exists
echo "🔑 Generating BETTER_AUTH_SECRET..."
if [ ! -f .env.local ]; then
  touch .env.local
fi

if ! grep -q "BETTER_AUTH_SECRET" .env.local 2>/dev/null; then
  SECRET=$(openssl rand -base64 32)
  echo "BETTER_AUTH_SECRET=$SECRET" >> .env.local
  echo "✅ BETTER_AUTH_SECRET added to .env.local"
else
  echo "✅ BETTER_AUTH_SECRET already exists"
fi
echo ""

# 6. Update package.json with auth plugin metadata
echo "📝 Updating package.json..."
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
if (!pkg.cg) pkg.cg = {};
if (!pkg.cg.plugins) pkg.cg.plugins = {};
pkg.cg.plugins.auth = {
  createdAt: new Date().toISOString(),
  provider: 'better-auth',
  features: ['email-password', 'username']
};
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"
echo "✅ package.json updated"
echo ""

# 7. Generate and apply migrations
echo "📋 Generating and applying migrations..."
npx drizzle-kit generate
npx drizzle-kit migrate
echo "✅ Migrations applied"
echo ""

# 8. Restart dev server
echo "📋 Restarting dev server..."
.tools/start-dev-server.sh 3000
echo "✅ Dev server restarted"
echo ""

echo "🎉 Auth setup complete!"
echo ""
echo "You can now use auth in your app:"
echo "  import { signIn, signOut } from '@/lib/auth-client'"
echo "  import { getServerSession } from '@/server/auth'"
echo ""
