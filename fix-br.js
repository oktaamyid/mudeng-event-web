const fs = require('fs');
let code = fs.readFileSync('src/app/page.tsx', 'utf-8');
code = code.replace(/<br>/g, '<br />');
code = code.replace(/<hr>/g, '<hr />');
fs.writeFileSync('src/app/page.tsx', code);
console.log('Fixed br and hr tags');
