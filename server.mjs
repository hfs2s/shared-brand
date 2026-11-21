import http from 'node:http';
import {createReadStream} from 'node:fs';
import {readFile, realpath, stat} from 'node:fs/promises';
import {extname, join, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = await realpath(fileURLToPath(new URL('./public', import.meta.url)));
const port = Number(process.env.PORT || 3698);
const mime = {
  '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8',
  '.js':'text/javascript; charset=utf-8', '.json':'application/json',
  '.txt':'text/plain; charset=utf-8', '.md':'text/markdown; charset=utf-8',
  '.svg':'image/svg+xml', '.png':'image/png', '.jpg':'image/jpeg', '.webp':'image/webp',
  '.mp4':'video/mp4', '.woff2':'font/woff2', '.ttf':'font/ttf',
  '.pdf':'application/pdf', '.zip':'application/zip',
};
const filename = /^\/(?:[\w+-][\w.+ -]*\/)*(?:[\w+-][\w.+ -]*)?$/;
const aliases = new Map([['/visuals','/artifacts/photography'], ['/visuals.html','/artifacts/photography'], ['/brand-studies','/brand-studies/']]);
const policy = "default-src 'self'; img-src 'self' data:; media-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'none'; form-action 'none'; base-uri 'self'; object-src 'none'; frame-ancestors ";
const videoPage = '/artifacts/video';
const videoGuide = videoPage + '.md';

function describeVideoPage(shell) {
  return shell.replace('<title>Shared Studio</title>', `<title>Stage video · Shared Studio</title>
  <meta name="description" content="Stage video production guide with motion warnings, framing, clip specifications and Juan’s active-listening reference.">
  <link rel="canonical" href="https://brand.getshared.ai${videoPage}">
  <link rel="alternate" type="text/markdown" title="Stage video production guide" href="${videoGuide}">`)
    .replace(/\s*<noscript>.*?<\/noscript>/, '')
    .replace('<main>', `<main>
    <noscript>
      <section class="wrap">
        <h1>Stage video</h1>
        <p><a href="/together/video?studio_document=1">Open the video guide and reference clips</a></p>
        <p><a href="${videoGuide}">Read the production guide in Markdown</a></p>
      </section>
    </noscript>`);
}

async function resolve(path) {
  const file = await realpath(join(root, path)).catch(() => null);
  if (!file?.startsWith(root + sep)) return null;
  const details = await stat(file);
  return details.isFile() ? {file, size:details.size} : null;
}
function answer(res, status, body = '') {
  res.writeHead(status, {'Content-Type':'text/plain; charset=utf-8'});
  res.end(body);
}
function redirect(res, path, search) {
  res.writeHead(302, {Location:path + search});
  res.end();
}
async function serve(req, res) {
  res.setHeader('X-Content-Type-Options','nosniff');
  res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
  res.setHeader('Cache-Control','no-cache');
  res.setHeader('Content-Security-Policy',policy + "'none'");
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow','GET, HEAD');
    return answer(res,405,'Method not allowed');
  }
  const url = new URL(req.url,'http://loopback.invalid');
  const route = decodeURIComponent(url.pathname);
  if (url.origin !== 'http://loopback.invalid' || !filename.test(route)) return answer(res,404,'Not found');
  if (aliases.has(route)) return redirect(res,aliases.get(route),url.search);
  const specimen = url.searchParams.get('studio_document') === '1';
  const legacy = route === '/together' || route.startsWith('/together/');
  if (legacy && !specimen && (!extname(route) || extname(route) === '.html')) {
    return redirect(res,route.slice('/together'.length).replace(/(?:\/index)?\.html$/,'') || '/',url.search);
  }

  let staged = legacy || route.startsWith('/_studio/') || route.startsWith('/brand-studies/') || route === '/studio-index' || route === '/DESIGN.md' || route === '/robots.txt'
    ? route : '/together' + (route === '/index.html' ? '/' : route);
  if (staged.endsWith('/') && staged !== '/together/' && !staged.startsWith('/brand-studies/')) staged = staged.slice(0,-1);
  const path = staged === '/studio-index' ? '/index.html' : staged.endsWith('/') ? staged + 'index.html' : extname(staged) ? staged : staged + '.html';
  const type = extname(path);
  if (!Object.hasOwn(mime,type)) return answer(res,404,'Not found');
  let asset = await resolve(path);
  if (!asset && path.startsWith('/together/') && !legacy) asset = await resolve(path.slice('/together'.length));
  if (!asset) return answer(res,404,'Not found');

  if (type === '.html') {
    if (!specimen && route.endsWith('.html')) {
      const canonical = route === '/index.html' ? '/' : route.replace(/(?:\/index)?\.html$/,'');
      return redirect(res,canonical,url.search);
    }
    if (!specimen) asset = await resolve('/_studio/index.html');
    res.setHeader('Content-Type',mime[type]);
    let html = await readFile(asset.file,'utf8');
    if (!specimen && path === '/together/artifacts/video.html') {
      res.setHeader('Link', `<${videoGuide}>; rel="alternate"; type="text/markdown"`);
      html = describeVideoPage(html);
    }
    if (specimen) {
      res.setHeader('Content-Security-Policy',policy + "'self'");
      if (req.headers['sec-fetch-dest'] === 'iframe') {
        html = html.replace(/<\/head>/i,'<link rel="stylesheet" href="/_studio/document.css"></head>');
      }
    }
    res.setHeader('Content-Length',Buffer.byteLength(html));
    res.end(req.method === 'HEAD' ? undefined : html);
    return;
  }

  res.setHeader('Content-Type',mime[type]);
  if (route === '/DESIGN.md') res.setHeader('Content-Disposition','attachment; filename="DESIGN.md"');
  if (type === '.mp4' || type === '.pdf' || type === '.zip') {
    res.setHeader('Accept-Ranges','bytes');
    if (req.headers.range) {
      const match = /^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      const start = match?.[1] ? Number(match[1]) : match?.[2] ? Math.max(0,asset.size-Number(match[2])) : asset.size;
      const end = match?.[1] && match[2] ? Math.min(asset.size-1,Number(match[2])) : asset.size-1;
      if (start > end) {
        res.setHeader('Content-Range','bytes */' + asset.size);
        return answer(res,416,'Range not satisfiable');
      }
      res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${asset.size}`,'Content-Length':end-start+1});
      if (req.method === 'HEAD') return res.end();
      createReadStream(asset.file,{start,end}).on('error',()=>res.destroy()).pipe(res);
      return;
    }
  }
  res.setHeader('Content-Length',asset.size);
  if (req.method === 'HEAD') return res.end();
  createReadStream(asset.file).on('error',()=>res.destroy()).pipe(res);
}

http.createServer((req,res) => {
  serve(req,res).catch(error => {
    if (res.headersSent) res.destroy();
    else answer(res,error instanceof URIError ? 400 : 500,'Could not serve this page');
  });
}).listen(port,'127.0.0.1',() => console.log(`Shared Studio listens on http://127.0.0.1:${port}`));
