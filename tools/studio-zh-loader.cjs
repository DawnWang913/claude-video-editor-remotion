// Translate display strings at build time. React owns the translated text, so
// this avoids DOM mutation, fragile observers, and edits to node_modules.
const ts = require('typescript');
const fs = require('node:fs');
const path = require('node:path');
const dictionaryPath = path.join(__dirname, 'studio-zh.json');
const displayKeys = new Set(['children', 'label', 'title', 'placeholder', 'aria-label', 'tooltip', 'description', 'confirmLabel', 'cancelLabel', 'buttonLabel', 'text', 'emptyText', 'heading', 'quickSwitcherLabel', 'ariaLabel']);
const displayVariables = new Set(['label', 'title', 'tooltip', 'buttonLabel', 'placeholder', 'accessibilityLabel', 'renderLabel']);
function nameOf(node) { return node && (ts.isIdentifier(node) || ts.isStringLiteral(node)) ? node.text : ''; }
function isDisplay(node) {
  // These upstream helpers return human-readable labels, never enum values.
  if (ts.isReturnStatement(node.parent)) {
    let fn = node.parent;
    while (fn && !ts.isFunctionLike(fn)) fn = fn.parent;
    const name = fn && (nameOf(fn.name) || (ts.isVariableDeclaration(fn.parent) ? nameOf(fn.parent.name) : ''));
    if (['getPreviewSizeLabel', 'humanReadableLogLevel'].includes(name)) return true;
  }
  let n = node;
  while (n.parent) {
    const p = n.parent;
    if (ts.isPropertyAssignment(p)) return p.initializer === n && displayKeys.has(nameOf(p.name));
    if (ts.isVariableDeclaration(p)) return p.initializer === n && displayVariables.has(nameOf(p.name));
    if (ts.isConditionalExpression(p)) { if (p.condition === n) return false; }
    else if (ts.isBinaryExpression(p)) { if (p.operatorToken.kind !== ts.SyntaxKind.PlusToken) return false; }
    else if (!(ts.isArrayLiteralExpression(p) || ts.isParenthesizedExpression(p) || ts.isTemplateExpression(p) || ts.isTemplateSpan(p) || ts.isArrowFunction(p))) return false;
    n = p;
  }
  return false;
}
function translate(source, filename, dictionary) {
  if (!/[\\/]@remotion[\\/]studio[\\/]dist[\\/]/.test(filename) || /[\\/]WebMcp\.js$/.test(filename)) return source;
  const file = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  const replacements = [];
  function visit(node) {
    // Only translate a render-mode name when it is displayed in a template.
    // The original enum is still passed unchanged to the render API.
    if (ts.isIdentifier(node) && node.text === 'renderMode' && ts.isTemplateSpan(node.parent) && isDisplay(node)) {
      replacements.push({start: node.getStart(file), end: node.end, text: '({video:"视频",audio:"音频",still:"静帧",sequence:"图像序列"}[renderMode] ?? renderMode)'});
    }
    const templateToken = ts.isTemplateHead(node) || ts.isTemplateMiddle(node) || ts.isTemplateTail(node);
    if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || templateToken) && isDisplay(node) && Object.hasOwn(dictionary, node.text)) {
      const text = dictionary[node.text];
      // Preserve all line positions and untouched code for debugging/source editing.
      let replacement = JSON.stringify(text);
      if (templateToken) {
        const escaped = text.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
        replacement = (ts.isTemplateHead(node) ? '`' : '}') + escaped + (ts.isTemplateTail(node) ? '`' : '${');
      }
      replacements.push({start: node.getStart(file), end: node.end, text: replacement});
    }
    ts.forEachChild(node, visit);
  }
  visit(file);
  for (const edit of replacements.sort((a,b) => b.start-a.start)) source = source.slice(0,edit.start) + edit.text + source.slice(edit.end);
  return source;
}
module.exports = function(source) {
  this.cacheable?.();
  this.addDependency(dictionaryPath);
  this.addDependency(__filename);
  return translate(source, this.resourcePath, JSON.parse(fs.readFileSync(dictionaryPath, 'utf8')));
};
module.exports.translate = translate;
