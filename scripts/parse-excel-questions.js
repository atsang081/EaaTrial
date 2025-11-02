const fs = require('fs');
const path = require('path');

// Read the parsed markdown file
const parsedData = `題號|問題|選項A|選項B|選項C|選項D|選項E|正確答案|解釋
1|放盤紙有沒有有效期限制？|沒有|除非是獨家代理，否則沒有有效期限制。|有效期不可以超過1個月。|有效期不可以超過3個月。|有效期不可以超過6個月。|A|放盤紙一般是指表格3 ：出售香港住宅物業用的地產代理協議。放盤紙沒有有效期限制，然而必須明確列明生效日期以及屆滿日。（首尾兩天包括在內）`;

// Parse markdown table and generate TypeScript file
console.log('Parsing Excel questions from parsed document...');

const escapeString = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
};

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

export const questions: Question[] = [
`;

// This will be replaced with actual parsed data
const questions = [];

// Add questions from parsed data
fileContent += `];

export const getRandomQuestions = (count: number = 20): Question[] => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, questions.length));
};
`;

const outputPath = path.join(__dirname, '../src/data/questions.ts');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, fileContent, 'utf-8');

console.log(`✅ Successfully generated ${questions.length} questions!`);
console.log(`📝 File: ${outputPath}`);
