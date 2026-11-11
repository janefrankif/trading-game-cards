const fs = require('fs');
const content = fs.readFileSync('lib/marketplace-data.ts', 'utf8');
const startStr = 'export const SAMPLE_CARDS: CardItem[] = [';
const startIndex = content.indexOf(startStr) + startStr.length;
const endStr = '];\n\nexport interface StrategyTopic';
const endIndex = content.indexOf(endStr);
const substr = content.substring(startIndex, endIndex);

try {
    JSON.parse('[' + substr + ']');
    console.log("valid");
} catch (e) {
    console.log(e.message);
}
