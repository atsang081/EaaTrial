# Questions Data Generator

This script automatically generates the `src/data/questions.ts` file from the Excel file containing all 935 exam questions.

## Prerequisites

The script requires:
- Node.js installed
- The `xlsx` package (already added to package.json)
- The Excel file located at: `src/assets/EAA_Questions_Set_v2.xlsx`

## Usage

Run the script from the project root directory:

```bash
node scripts/generate-questions.js
```

Or using npm/bun:

```bash
npm run generate-questions
# or
bun run generate-questions
```

## What it does

1. Reads the Excel file from `src/assets/EAA_Questions_Set_v2.xlsx`
2. Extracts all 935 questions with their:
   - Question ID (1-935)
   - Question text
   - Options A, B, C, D, and optionally E
   - Correct answer
   - Detailed explanation
3. Generates a properly formatted TypeScript file at `src/data/questions.ts`
4. Handles special characters and quotes correctly
5. Creates the `getRandomQuestions()` utility function

## Output

The script will create/update `src/data/questions.ts` with:
- Complete TypeScript interface definition
- Array of all 935 questions
- Helper function to get random questions for exams

## Expected Output

```
Extracted 935 questions from the Excel file.
✅ Successfully generated questions.ts with 935 questions!
📝 File written to: /path/to/src/data/questions.ts
```

## Troubleshooting

If you encounter errors:
1. Ensure the Excel file exists at `src/assets/EAA_Questions_Set_v2.xlsx`
2. Check that you have write permissions for `src/data/`
3. Verify Node.js is installed: `node --version`
4. Install dependencies: `npm install` or `bun install`
