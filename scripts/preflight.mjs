import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const failures = []
const notes = []

function walk(dir, predicate = () => true) {
  if (!fs.existsSync(dir)) return []
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(full, predicate))
    else if (predicate(full)) out.push(full)
  }
  return out
}

const jsonFiles = walk(root, f => f.endsWith('.json'))
for (const file of jsonFiles) {
  try { JSON.parse(fs.readFileSync(file, 'utf8')) }
  catch (error) { failures.push(`JSON 无法解析: ${path.relative(root, file)} (${error.message})`) }
}
notes.push(`JSON: ${jsonFiles.length} 个文件`)

const sourceFiles = [
  ...walk(path.join(root, 'app'), f => /\.(js|jsx)$/.test(f)),
  ...walk(path.join(root, 'components'), f => /\.(js|jsx)$/.test(f)),
  ...walk(path.join(root, 'lib'), f => /\.(js|jsx)$/.test(f)),
]

const publicRefs = new Set()
for (const file of sourceFiles) {
  const text = fs.readFileSync(file, 'utf8')
  for (const match of text.matchAll(/(?:from\s+|import\s*\()?['"](\.{1,2}\/[^'"]+)['"]/g)) {
    const spec = match[1]
    const base = path.resolve(path.dirname(file), spec)
    const candidates = [base, `${base}.js`, `${base}.jsx`, `${base}.json`, path.join(base, 'index.js'), path.join(base, 'index.jsx')]
    if (!candidates.some(fs.existsSync)) failures.push(`相对 import 缺失: ${path.relative(root, file)} -> ${spec}`)
  }
  for (const match of text.matchAll(/['"](\/(?:data|images|portraits)\/[^'"?#]+)['"]/g)) publicRefs.add(match[1])
}

for (const ref of publicRefs) {
  const full = path.join(root, 'public', ref.replace(/^\//, ''))
  if (!fs.existsSync(full)) failures.push(`公开资源缺失: ${ref}`)
}
notes.push(`源码: ${sourceFiles.length} 个 JS/JSX；公开资源字面引用: ${publicRefs.size} 个`)

const allTextFiles = walk(root, f => !/\.(png|jpg|jpeg|webp|ico|pdf|gz|tar)$/.test(f))
const secretPatterns = [
  /(?:APP_SECRET|CLIENT_SECRET|API_KEY)\s*[=:]\s*['"][A-Za-z0-9_\-]{16,}['"]/i,
  /(?:sk-|xox[baprs]-)[A-Za-z0-9_\-]{20,}/,
]
for (const file of allTextFiles) {
  const text = fs.readFileSync(file, 'utf8')
  if (secretPatterns.some(pattern => pattern.test(text))) failures.push(`疑似凭证残留: ${path.relative(root, file)}`)
}

for (const required of ['package.json', 'next.config.js', 'vercel.json', 'public/site.webmanifest', 'public/apple-touch-icon.png']) {
  if (!fs.existsSync(path.join(root, required))) failures.push(`部署文件缺失: ${required}`)
}

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
notes.push(`Next.js: ${pkg.dependencies?.next || '未声明'}；Node: ${pkg.engines?.node || '未声明'}`)

for (const note of notes) console.log(`✓ ${note}`)
if (failures.length) {
  for (const item of failures) console.error(`✗ ${item}`)
  console.error(`\nPreflight failed: ${failures.length} problem(s).`)
  process.exit(1)
}
console.log('\nPreflight passed.')
