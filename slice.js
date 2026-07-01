const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src/app/page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

const componentsDir = path.join(__dirname, 'src/components');
if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
}

function extractTag(tag, className, componentName) {
  const startStr = `<${tag} className="${className}"`;
  const endStr = `</${tag}>`;
  
  const startIndex = content.indexOf(startStr);
  if (startIndex === -1) return null;
  
  let depth = 0;
  let endIndex = -1;
  let i = startIndex;
  
  while (i < content.length) {
    if (content.substr(i, `<${tag}`.length) === `<${tag}` && content.substr(i, `<${tag}>`.length) !== `<${tag}/>`) {
      depth++;
    } else if (content.substr(i, `</${tag}>`.length) === `</${tag}>`) {
      depth--;
      if (depth === 0) {
        endIndex = i + `</${tag}>`.length;
        break;
      }
    }
    i++;
  }
  
  if (endIndex === -1) return null;
  
  const chunk = content.substring(startIndex, endIndex);
  
  // write component
  const compCode = `export default function ${componentName}() {\n  return (\n    ${chunk}\n  );\n}\n`;
  fs.writeFileSync(path.join(componentsDir, `${componentName}.tsx`), compCode);
  
  // replace chunk in content
  content = content.replace(chunk, `<${componentName} />`);
  return true;
}

const sections = [
  { tag: 'nav', classBase: 'navbar', name: 'Navbar' },
  { tag: 'section', classBase: 'hero', name: 'Hero' },
  { tag: 'section', classBase: 'about section-spacing', name: 'About' },
  { tag: 'section', classBase: 'benefits section-spacing', name: 'Benefits' },
  { tag: 'section', classBase: 'approach section-spacing', name: 'Approach' },
  { tag: 'section', classBase: 'system section-spacing', name: 'System' },
  { tag: 'section', classBase: 'events section-spacing', name: 'Events' },
  { tag: 'section', classBase: 'curriculum section-spacing', name: 'Curriculum' },
  { tag: 'section', classBase: 'preview section-spacing', name: 'Preview' },
  { tag: 'section', classBase: 'testimonials section-spacing', name: 'Testimonials' },
  { tag: 'section', classBase: 'faq section-spacing', name: 'FAQ' },
  { tag: 'section', classBase: 'cta-section section-spacing', name: 'CTA' },
  { tag: 'footer', classBase: 'footer', name: 'Footer' }
];

let imports = [];

sections.forEach(s => {
  if (extractTag(s.tag, s.classBase, s.name)) {
    imports.push(`import ${s.name} from "@/components/${s.name}";`);
  }
});

// Update page.tsx
content = imports.join('\n') + '\n\n' + content;
fs.writeFileSync(pagePath, content);
console.log('Slicing completed');
