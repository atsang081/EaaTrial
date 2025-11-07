const fs = require('fs');
const path = require('path');

// Read the original questions file
const filePath = path.join(__dirname, '../src/data/eaa-questions.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log(`Original question count: ${data.questions.length}`);

// If we have more than 300 questions, reduce to approximately 300 (removing about 600)
if (data.questions.length > 300) {
  // Shuffle array function
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Keep only a random subset of questions (approximately 300)
  const shuffledQuestions = shuffleArray([...data.questions]);
  const reducedQuestions = shuffledQuestions.slice(0, 300);

  // Update the data
  data.questions = reducedQuestions;
  data.totalQuestions = reducedQuestions.length;

  // Write back to file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

  console.log(`Reduced question count: ${data.questions.length}`);
  console.log(`Removed ${928 - data.questions.length} questions`);
} else {
  console.log(`Question count is already at or below target: ${data.questions.length}`);
}