const fs = require('fs');
const path = require('path');

console.log('Converting eaa-questions.json to questions.ts...');

try {
  const jsonPath = path.join(__dirname, '../src/data/eaa-questions.json');
  const jsonData = fs.readFileSync(jsonPath, 'utf-8');
  const data = JSON.parse(jsonData);
  
  const escapeString = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\t/g, '\\t');
  };
  
  let tsContent = `export interface Question {
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
  
  data.questions.forEach((q, index) => {
    tsContent += `  {\n`;
    tsContent += `    id: ${q.id},\n`;
    tsContent += `    question: "${escapeString(q.question)}",\n`;
    tsContent += `    optionA: "${escapeString(q.options.A)}",\n`;
    tsContent += `    optionB: "${escapeString(q.options.B)}",\n`;
    tsContent += `    optionC: "${escapeString(q.options.C)}",\n`;
    tsContent += `    optionD: "${escapeString(q.options.D)}",\n`;
    
    if (q.options.E) {
      tsContent += `    optionE: "${escapeString(q.options.E)}",\n`;
    }
    
    tsContent += `    correctAnswer: "${q.correctAnswer}",\n`;
    tsContent += `    explanation: "${escapeString(q.explanation)}"\n`;
    tsContent += index < data.questions.length - 1 ? `  },\n` : `  }\n`;
  });
  
  tsContent += `];\n\nexport const getRandomQuestions = (count: number = 20): Question[] => {\n`;
  tsContent += `  const shuffled = [...questions].sort(() => 0.5 - Math.random());\n`;
  tsContent += `  return shuffled.slice(0, Math.min(count, questions.length));\n`;
  tsContent += `};\n`;
  
  const outputPath = path.join(__dirname, '../src/data/questions.ts');
  fs.writeFileSync(outputPath, tsContent, 'utf-8');
  
  console.log(`✅ Successfully converted ${data.questions.length} questions to TypeScript!`);
  console.log(`📝 File created: ${outputPath}`);
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
