#!/bin/bash

# Image Generation API Setup Script
# This script sets up Gemini AI image generation capabilities

set -e

echo "🎨 Setting up Gemini Image Generation API..."

# Get the project root (4 levels up from scripts/)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../../.." && pwd)"
SKILL_DIR="$SCRIPT_DIR/.."

# Create necessary directories
echo "📁 Creating directory structure..."
mkdir -p "$PROJECT_ROOT/src/server/ai"

# Copy the image.ts template
echo "📄 Copying image.ts template..."
cp "$SKILL_DIR/assets/image.ts" "$PROJECT_ROOT/src/server/ai/image.ts"

# Install required dependencies
echo "📦 Installing Google Gemini AI dependency..."
cd "$PROJECT_ROOT"
pnpm add @google/genai

echo "✅ Image generation API setup complete!"
echo ""
echo "📝 File created: src/server/ai/image.ts"
echo ""
echo "⚠️  NEXT STEP: You need to configure your Google Gemini API Key"
echo "   The skill will now prompt you for your API key..."
