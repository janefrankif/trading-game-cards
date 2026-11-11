const fs = require('fs');

let fileContent = fs.readFileSync('lib/marketplace-data.ts', 'utf8');

fileContent = fileContent.replace(']];\n\nexport interface', '];\n\nexport interface');

fs.writeFileSync('lib/marketplace-data.ts', fileContent, 'utf8');
console.log('Successfully fixed lib/marketplace-data.ts');
