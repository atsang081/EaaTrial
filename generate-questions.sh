#!/bin/bash

echo "🚀 Importing all 928 questions from JSON..."

node scripts/auto-import.js

if [ $? -eq 0 ]; then
    echo "✨ Done! All 928 questions are now loaded."
else
    echo "❌ Error during import"
    exit 1
fi
