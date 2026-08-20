const fs = require('fs');
const path = require('path');

const indexPath = path.join(process.cwd(), 'src/data/posts/index.ts');
let content = fs.readFileSync(indexPath, 'utf-8');

// Generate imports for 45 to 95
let imports = '';
for (let i = 45; i <= 95; i++) {
  imports += \`import post\${i} from "./post-\${i}";\n\`;
}

// Insert imports after post44
content = content.replace('import post44 from "./post-44";', 'import post44 from "./post-44";\n' + imports);

// Generate list of new posts to add to allPosts array
let newPostsList = '';
for (let i = 95; i >= 45; i--) {
  newPostsList += \`  post\${i},\n\`;
}

// Insert new posts into allPosts array (keeping post44 as first for now if that was the intent, or put 95 first)
content = content.replace('  post44,', '  post95,\n  post94,\n  post93,\n  post92,\n  post91,\n  post90,\n  post89,\n  post88,\n  post87,\n  post86,\n  post85,\n  post84,\n  post83,\n  post82,\n  post81,\n  post80,\n  post79,\n  post78,\n  post77,\n  post76,\n  post75,\n  post74,\n  post73,\n  post72,\n  post71,\n  post70,\n  post69,\n  post68,\n  post67,\n  post66,\n  post65,\n  post64,\n  post63,\n  post62,\n  post61,\n  post60,\n  post59,\n  post58,\n  post57,\n  post56,\n  post55,\n  post54,\n  post53,\n  post52,\n  post51,\n  post50,\n  post49,\n  post48,\n  post47,\n  post46,\n  post45,\n  post44,');

fs.writeFileSync(indexPath, content);
console.log('Successfully updated src/data/posts/index.ts with new posts.');
