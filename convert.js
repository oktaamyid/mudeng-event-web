const fs = require('fs');
let html = fs.readFileSync('legacy/index.html', 'utf-8');

// Extract body contents
const bodyMatch = html.match(/<body>([\s\S]*?)<script src="js\/main\.js"><\/script>\s*<\/body>/);
if (!bodyMatch) {
    console.error('Body not found');
    process.exit(1);
}
let body = bodyMatch[1];

// Convert class to className
body = body.replace(/class=/g, 'className=');

// Convert for to htmlFor
body = body.replace(/for=/g, 'htmlFor=');

// Fix unclosed img tags
body = body.replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 />');

// Fix unclosed input tags
body = body.replace(/<input([^>]*?)(?<!\/)>/g, '<input$1 />');

// Fix style="text-align:center;"
body = body.replace(/style="([^"]*)"/g, (match, styles) => {
    const obj = {};
    styles.split(';').forEach(s => {
        if (!s.trim()) return;
        const parts = s.split(':');
        let key = parts[0].trim();
        const value = parts[1].trim();
        key = key.replace(/-([a-z])/g, g => g[1].toUpperCase());
        obj[key] = value;
    });
    return `style={{ ${Object.entries(obj).map(([k,v]) => `${k}: '${v}'`).join(', ')} }}`;
});

// Remove comments
body = body.replace(/<!--[\s\S]*?-->/g, '');

const pageContent = `
export default function Home() {
  return (
    <main>
      ${body}
    </main>
  );
}
`;

fs.writeFileSync('src/app/page.tsx', pageContent);
console.log('Converted to page.tsx');
