const fs = require('fs');
const path = require('path');

const indexPath = path.join(process.cwd(), 'src/data/posts/index.ts');
let content = fs.readFileSync(indexPath, 'utf-8');

let imports = '';
for (let i = 45; i <= 95; i++) {
  imports += "import post" + i + " from \"./post-" + i + "\";\n";
}

content = content.replace('import post44 from "./post-44";', 'import post44 from "./post-44";\n' + imports);

let newPostsList = '';
for (let i = 95; i >= 45; i--) {
  newPostsList += "  post" + i + ",\n";
}

content = content.replace('  post44,', newPostsList + '  post44,');

fs.writeFileSync(indexPath, content);
console.log('Successfully updated src/data/posts/index.ts with new posts.');
