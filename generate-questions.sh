#!/bin/bash

echo "🚀 Generating questions.ts from Excel file..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if the Excel file exists
if [ ! -f "src/assets/EAA_Questions_Set_v2.xlsx" ]; then
    echo "❌ Error: Excel file not found at src/assets/EAA_Questions_Set_v2.xlsx"
    exit 1
fi

# Run the generation script
node scripts/generate-questions.js

if [ $? -eq 0 ]; then
    echo ""
    echo "✨ Done! The questions database has been updated with all 935 questions."
    echo "📊 You can now use the exam app with the complete question set."
else
    echo ""
    echo "❌ Something went wrong. Please check the error messages above."
    exit 1
fi
