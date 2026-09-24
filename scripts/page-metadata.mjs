import { readFile, writeFile, mkdir } from 'node:fs/promises';
const pages = JSON.parse(await readFile('src/lib/page-meta.json', 'utf8'));
const template = await readFile('dist/index.html', 'utf8');
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
for (const [route, [label, , description]] of Object.entries(pages)) {
  const title = escape(`${label} | Tymo's Studio`);
  const url = `https://tymostudio.com${route}`;
  let html = template.replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")[^"]*("\s*\/?>)/g, `$1${escape(description)}$2`)
    .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*("\s*\/?>)/g, `$1${title}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*("\s*\/?>)/, `$1${url}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*("\s*\/?>)/, `$1${url}$2`);
  if (route === '/welcome') html = html.replace('</head>', '<meta name="robots" content="noindex,follow" /></head>');
  if (route === '/') await writeFile('dist/index.html', html);
  else { await mkdir(`dist${route}`, { recursive: true }); await writeFile(`dist${route}/index.html`, html); }
}
// Cloudflare serves this for missing routes; React renders the matching 404 screen.
await writeFile('dist/404.html', template.replace('</head>', '<meta name="robots" content="noindex,follow" /></head>'));
console.log(`Generated metadata for ${Object.keys(pages).length} routes.`);
