const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, 'public', 'products');
let imageFiles = [];
try {
  imageFiles = fs.readdirSync(imageDir);
} catch (e) {
  console.log("Error reading image dir");
  process.exit(1);
}

const fileContent = fs.readFileSync('lib/marketplace-data.ts', 'utf8');

const startStr = 'export const SAMPLE_CARDS: CardItem[] = [';
const endStr = '];\n\nexport interface StrategyTopic';

const startIndex = fileContent.indexOf(startStr);
const endIndex = fileContent.indexOf(endStr);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find boundaries');
  process.exit(1);
}

let cards = [];
try {
   const cardsJsonStr = '[' + fileContent.substring(startIndex + startStr.length, endIndex) + ']';
   cards = JSON.parse(cardsJsonStr);
} catch (e) {
   console.log("Error parsing json", e);
   process.exit(1);
}

const normalizeStr = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

for (const card of cards) {
    let bestMatch = null;
    let bestScore = -1;
    
    const targetName = normalizeStr(card.name);
    
    for (const file of imageFiles) {
        if (file === 'Home.jpeg' || !file.includes('.')) continue;
        
        const fileName = normalizeStr(file.split('.')[0]);
        
        // Exact match
        if (fileName === targetName) {
            bestMatch = file;
            break;
        }
        
        // Substring match
        if (fileName.includes(targetName) || targetName.includes(fileName)) {
            bestMatch = file;
            bestScore = 10;
        } else if (bestScore < 5) {
            // Partial word match logic for complex names
            let score = 0;
            const targetWords = card.name.toLowerCase().split(/[^a-z0-9]/).filter(Boolean);
            const fileWords = file.toLowerCase().split('.')[0].split(/[^a-z0-9]/).filter(Boolean);
            
            for (const word of targetWords) {
                if (fileWords.includes(word)) score++;
            }
            if (score > 1 && score > bestScore) {
                bestScore = score;
                bestMatch = file;
            }
        }
    }
    
    if (bestMatch) {
        card.image = `/products/${bestMatch}`;
    }
}

const newFileContent = fileContent.substring(0, startIndex) +
  'export const SAMPLE_CARDS: CardItem[] = ' + JSON.stringify(cards, null, 2) +
  fileContent.substring(endIndex);

fs.writeFileSync('lib/marketplace-data.ts', newFileContent, 'utf8');
console.log('Successfully mapped images in lib/marketplace-data.ts');
