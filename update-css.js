const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'styles.css');
let content = fs.readFileSync(cssPath, 'utf-8');

if (!content.includes('CODE PROTECTION STYLES')) {
  const protectionCss = `

/* ==========================================================================
   CODE PROTECTION STYLES
   ========================================================================== */
body {
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

/* Keep selection enabled inside the code block */
.code-block, 
.env-output,
pre,
code {
  -webkit-user-select: text !important;
  -moz-user-select: text !important;
  user-select: text !important;
}
`;
  content += protectionCss;
  fs.writeFileSync(cssPath, content, 'utf-8');
  console.log('Successfully updated styles.css');
} else {
  console.log('styles.css already contains protection rules');
}
