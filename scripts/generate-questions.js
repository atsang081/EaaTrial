const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// Read the Excel file directly
const excelPath = path.join(__dirname, '../src/assets/EAA_Questions_Set_v2.xlsx');
let workbook;

try {
  workbook = XLSX.readFile(excelPath);
} catch (error) {
  console.error('Error reading Excel file. Please ensure the file exists at:', excelPath);
  process.exit(1);
}

// Get the first sheet
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Convert to JSON
const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

const questions = [];

// Escape function to handle quotes and special characters
const escapeString = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/\\/g, '\\\\')   // Escape backslashes
    .replace(/"/g, '\\"')      // Escape double quotes
    .replace(/\n/g, '\\n')     // Escape newlines
    .replace(/\r/g, '\\r')     // Escape carriage returns
    .replace(/\t/g, '\\t');    // Escape tabs
};

// Skip header row and process data rows
// Expected columns: 題號, 問題, 選項A, 選項B, 選項C, 選項D, 選項E, 正確答案, 解釋
for (let i = 1; i < data.length; i++) {
  const row = data[i];
  
  if (row.length >= 9) {
    const [id, question, optionA, optionB, optionC, optionD, optionE, correctAnswer, explanation] = row;
    
    // Skip empty rows
    if (!id || !question) continue;
    
    questions.push({
      id: parseInt(id),
      question: escapeString(question),
      optionA: escapeString(optionA),
      optionB: escapeString(optionB),
      optionC: escapeString(optionC),
      optionD: escapeString(optionD),
      optionE: optionE ? escapeString(optionE) : undefined,
      correctAnswer: String(correctAnswer).trim(),
      explanation: escapeString(explanation)
    });
  }
}

console.log(`Extracted ${questions.length} questions from the parsed document.`);

// Generate the TypeScript file content
const generateQuestionsFile = () => {
  let fileContent = `export interface Question {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  optionE?: string;
  correctAnswer: string;
  explanation: string;
}

export const questions: Question[] = [\n`;

  // Add all questions
  questions.forEach((q, index) => {
    const optionE = q.optionE ? `\n    optionE: "${q.optionE}",` : '';
    fileContent += `  {
    id: ${q.id},
    question: "${q.question}",
    optionA: "${q.optionA}",
    optionB: "${q.optionB}",
    optionC: "${q.optionC}",
    optionD: "${q.optionD}",${optionE}
    correctAnswer: "${q.correctAnswer}",
    explanation: "${q.explanation}"
  }${index < questions.length - 1 ? ',' : ''}
`;
  });

  fileContent += `];

export const getRandomQuestions = (count: number = 20): Question[] => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, questions.length));
};
`;

  return fileContent;
};

// Write the generated content to the questions.ts file
const outputPath = path.join(__dirname, '../src/data/questions.ts');
const fileContent = generateQuestionsFile();

try {
  fs.writeFileSync(outputPath, fileContent, 'utf-8');
  console.log(`✅ Successfully generated questions.ts with ${questions.length} questions!`);
  console.log(`📝 File written to: ${outputPath}`);
} catch (error) {
  console.error('❌ Error writing questions.ts file:', error.message);
  process.exit(1);
}
