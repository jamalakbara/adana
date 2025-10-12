#!/bin/bash

# Development Setup Script for CMS
echo "🚀 Setting up CMS Development Environment..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp .env.local.example .env.local
    echo "⚠️  Please edit .env.local with your Supabase credentials"
else
    echo "✅ .env.local already exists"
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi

# Check TypeScript compilation
echo "🔍 Running TypeScript type check..."
npm run type-check

if [ $? -eq 0 ]; then
    echo "✅ TypeScript compilation successful"
else
    echo "❌ TypeScript compilation failed"
    exit 1
fi

# Check build
echo "🏗️  Testing build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

echo ""
echo "🎉 Development setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local with your Supabase credentials"
echo "2. Set up your Supabase database using the migrations in lib/db/migrations/"
echo "3. Run 'npm run dev' to start the development server"
echo "4. Visit http://localhost:3000/admin to access the CMS interface"
echo ""
echo "Useful commands:"
echo "- npm run dev      : Start development server"
echo "- npm run build    : Build for production"
echo "- npm run type-check: Check TypeScript types"
echo "- npm run lint     : Run ESLint"