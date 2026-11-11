const fs = require('fs');
const newCards = require('./generated_cards.json');

const fileContent = fs.readFileSync('lib/marketplace-data.ts', 'utf8');

const startStr = 'export const SAMPLE_CARDS: CardItem[] = [';
const endStr = '];\n\nexport interface StrategyTopic';

const startIndex = fileContent.indexOf(startStr);
const endIndex = fileContent.indexOf(endStr);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find boundaries');
  process.exit(1);
}

const newFileContent = fileContent.substring(0, startIndex) +
  'export const SAMPLE_CARDS: CardItem[] = ' + JSON.stringify(newCards, null, 2) +
  fileContent.substring(endIndex);

fs.writeFileSync('lib/marketplace-data.ts', newFileContent, 'utf8');
console.log('Successfully updated lib/marketplace-data.ts');
