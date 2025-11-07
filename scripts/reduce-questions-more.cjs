const fs = require('fs');
const path = require('path');

// Read the current questions file
const filePath = path.join(__dirname, '../src/data/eaa-questions.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log(`Current question count: ${data.questions.length}`);

// If we have more than 100 questions, reduce by 200 (to a minimum of 100)
if (data.questions.length > 100) {
  // Calculate how many questions to keep (remove 200, but keep at least 100)
  const questionsToKeep = Math.max(100, data.questions.length - 200);
  
  // Shuffle array function
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Keep only a random subset of questions
  const shuffledQuestions = shuffleArray([...data.questions]);
  const reducedQuestions = shuffledQuestions.slice(0, questionsToKeep);

  // Update the data
  data.questions = reducedQuestions;
  data.totalQuestions = reducedQuestions.length;

  // Write back to file
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

  console.log(`Reduced question count: ${data.questions.length}`);
  console.log(`Removed ${300 - data.questions.length} questions`);
  console.log(`Kept ${questionsToKeep} questions`);
} else {
  console.log(`Question count is already at or below minimum: ${data.questions.length}`);
}