#!/bin/bash

# SmartProf Hansraj - Quick APK Builder Script
# This script automates the APK generation process

set -e

echo "================================"
echo "SmartProf Hansraj APK Builder"
echo "================================"
echo ""

# Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed"
    echo "Please download from https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✓ Node.js detected: $NODE_VERSION"
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed"
    exit 1
fi

echo "Step 1: Creating Expo project..."
echo "================================"

PROJECT_NAME="SmartProfHansraj"

if [ -d "$PROJECT_NAME" ]; then
    echo "Project directory already exists"
    read -p "Delete and recreate? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf "$PROJECT_NAME"
    else
        echo "Using existing project directory"
    fi
fi

if [ ! -d "$PROJECT_NAME" ]; then
    npx create-expo-app@latest "$PROJECT_NAME" --yes
fi

cd "$PROJECT_NAME"

echo ""
echo "Step 2: Installing dependencies..."
echo "================================"

npm install @supabase/supabase-js @react-native-async-storage/async-storage expo-constants expo-build-properties

echo ""
echo "Step 3: Installing EAS CLI..."
echo "================================"

npm install -g eas-cli

echo ""
echo "Step 4: Checking Expo authentication..."
echo "================================"

if ! eas whoami &> /dev/null; then
    echo "You need to log in to Expo"
    echo "Running: eas login"
    eas login
fi

echo ""
echo "Step 5: Building APK..."
echo "================================"
echo ""
echo "This will take 5-15 minutes..."
echo "You will receive an email with the download link when complete"
echo ""

eas build --platform android --non-interactive

echo ""
echo "================================"
echo "✓ APK Build Complete!"
echo "================================"
echo ""
echo "Check your email for the download link"
echo ""
