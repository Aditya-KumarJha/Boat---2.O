const fs = require('fs');

// Read the JSON file
const data = JSON.parse(fs.readFileSync('headphone2_with_type.json', 'utf8'));

// Count occurrences of each type
const typeCount = {};

data.forEach(item => {
  const type = item.type || 'unknown';
  typeCount[type] = (typeCount[type] || 0) + 1;
});

// Print results
console.log("Type Counts:");
for (const [type, count] of Object.entries(typeCount)) {
  console.log(`${type}: ${count}`);
}
