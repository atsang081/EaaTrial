const fs = require('fs');

// Read the questions file
const questionsFile = fs.readFileSync('./src/data/questions.ts', 'utf8');

// Count the number of questions by counting id patterns
const idMatches = questionsFile.match(/id: \d+/g);
const questionCount = idMatches ? idMatches.length : 0;

console.log(`Total questions in database: ${questionCount}`);

// Show a preview of the first 5 questions
console.log('\nPreview of first 5 questions:');
console.log('============================');

// Extract questions data
const questionMatches = questionsFile.match(/\{[^}]*id: \d+[^}]*\}/gs);
if (questionMatches) {
  const previewCount = Math.min(5, questionMatches.length);
  for (let i = 0; i < previewCount; i++) {
    const question = questionMatches[i];
    const idMatch = question.match(/id: (\d+)/);
    const questionMatch = question.match(/question: "([^"]+)"/);
    
    console.log(`Question ${idMatch ? idMatch[1] : 'N/A'}: ${questionMatch ? questionMatch[1] : 'N/A'}`);
  }
}

console.log(`\n... and ${questionCount - previewCount} more questions.`);