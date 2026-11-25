// yang2수학 미니홈피 · 친구랑 놀기 서버 (외부 패키지 없음)
// 방 정보는 메모리에만 있고, 놀이가 끝나거나 30분 동안 아무도 없으면 지워져요.
'use strict';
const http = require('node:http');
const crypto = require('node:crypto');

const PORT = +process.env.PORT || 8080;
const ORIGINS = (process.env.ALLOW_ORIGINS || 'https://biossam.github.io,http://localhost:8765').split(',').map(s => s.trim()).filter(Boolean);
const MAX_ROOMS = 300, MAX_PEOPLE = 8, IDLE_MS = 30 * 60e3, LIFE_MS = 3 * 3600e3, BODY_MAX = 24 * 1024;
const POSES = new Set(['sit', 'sleep', 'lie', 'stretch', 'wave']);
const SAYS = 8, TOYS = new Set(['🪶', '🔴', '🫧', '🐭', '⚽', '🦋']), SNACKS = new Set(['🍡', '🥫', '🍗', '🥛']);
const rooms = new Map();
const ipHits = new Map();

const now = () => Date.now();
const tokHash = t => crypto.createHash('sha256').update(String(t)).digest('hex');
const safeEq = (a, b) => { const x = Buffer.from(String(a)), y = Buffer.from(String(b)); return x.length === y.length && crypto.timingSafeEqual(x, y); };
const num = (v, lo, hi, d = lo) => { v = +v; return Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : d; };
const word = (v, max) => typeof v === 'string' && /^[a-z0-9]{1,16}$/.test(v) && v.length <= max ? v : null;
function cleanNick(v) { const s = String(v || '').replace(/[<>&"'`\\\u0000-\u001f\u007f]/g, '').replace(/\s+/g, ' ').trim().slice(0, 8); return s || '친구'; }
function cleanCats(a) { return (Array.isArray(a) ? a : []).slice(0, 12).map(c => ({ i: num(c && c.i, 0, 199) | 0 })).filter((c, n, arr) => arr.findIndex(d => d.i === c.i) === n); }
function cleanSnap(s) {
  s = s && typeof s === 'object' ? s : {};
  return {
    name: cleanNick(s.name || '방').slice(0, 10), t: word(s.t, 12) || 'room',
    wall: word(s.wall, 12) || 'cream', floor: word(s.floor, 12) || 'wood',
    items: (Array.isArray(s.items) ? s.items : []).slice(0, 40).map((it, n) => ({ id: n + 1, k: word(it && it.k, 12) || 'box', x: num(it.x, -10, 110), y: num(it.y, 0, 110), f: it.f ? 1 : 0 })),
  };
}
function clientIp(req) { const x = String(req.headers['x-forwarded-for'] || '').split(',').map(s => s.trim()).filter(Boolean); return x[x.length - 1] || req.socket.remoteAddress || ''; }
function limited(key, n, ms) { const t = now(); let h = ipHits.get(key); if (!h || t - h.t > ms) { h = { t, n: 0 }; ipHits.set(key, h); } h.n++; return h.n > n; }

function headers(req, extra = {}) {
  const o = req.headers.origin; const h = {
    'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', 'Cache-Control': 'no-store',
    'Content-Security-Policy': "default-src 'none'; frame-ancestors 'none'", 'Strict-Transport-Security': 'max-age=31536000', ...extra,
  };
  if (o && ORIGINS.includes(o)) { h['Access-Control-Allow-Origin'] = o; h['Vary'] = 'Origin'; h['Access-Control-Allow-Headers'] = 'Content-Type'; h['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'; }
  return h;
}
function send(req, res, code, obj) { res.writeHead(code, headers(req, { 'Content-Type': 'application/json; charset=utf-8' })); res.end(JSON.stringify(obj)); }
function readJson(req) {
  return new Promise((ok, no) => {
    if (!/^application\/json/.test(req.headers['content-type'] || '')) return no(new Error('json'));
    let size = 0; const parts = [];
    req.on('data', c => { size += c.length; if (size > BODY_MAX) { no(new Error('big')); req.destroy(); } else parts.push(c); });
    req.on('end', () => { try { ok(JSON.parse(Buffer.concat(parts).toString('utf8') || '{}')); } catch (e) { no(e); } });
    req.on('error', no);
  });
}
function newCode() { for (let k = 0; k < 50; k++) { const c = String(crypto.randomInt(1000, 10000)); if (!rooms.has(c)) return c; } return null; }
function pubPeople(r) { return [...r.people.values()].map(p => ({ pid: p.pid, nick: p.nick, host: p.pid === r.host, cats: p.cats, look: p.look, on: p.clients.size > 0 })); }
function broadcast(r, ev) { r.last = now(); r.seq++; const line = `id: ${r.seq}\ndata: ${JSON.stringify(ev)}\n\n`; for (const p of r.people.values()) for (const c of p.clients) c.write(line); }
function auth(body) { const r = rooms.get(String(body.code || '')); if (!r) return [null, null, 'gone']; const p = r.people.get(String(body.pid || '')); if (!p || !safeEq(p.tok, tokHash(body.tok))) return [r, null, 'auth']; return [r, p, null]; }
function closeRoom(r, why) { broadcast(r, { t: 'closed', why }); for (const p of r.people.values()) for (const c of p.clients) c.end(); rooms.delete(r.code); }
const LOOK = { hair: ['short', 'bob', 'long', 'pony', 'bun', 'curly'], top: ['apron', 'hoodie', 'tee', 'dress', 'suit'], acc: ['none', 'catears', 'ribbon', 'glasses', 'cap', 'flower'], face: ['smile', 'wink', 'happy', 'ooh'], hold: ['none', 'churu', 'wand', 'book', 'cat'] };
function cleanLook(o) { o = o && typeof o === 'object' ? o : {}; const r = {}; for (const [k, a] of Object.entries(LOOK)) r[k] = a.includes(o[k]) ? o[k] : a[0]; for (const [k, m] of [['skin', 5], ['hc', 7], ['tc', 8], ['pc', 5]]) r[k] = num(o[k], 0, m - 1) | 0; return r; }
function uniqNick(r, n) { const used = new Set([...r.people.values()].map(p => p.nick)); if (!used.has(n)) return n; for (let k = 2; k < 99; k++) { const m = n.slice(0, 7) + k; if (!used.has(m)) return m; } return n; }
function addPerson(r, nick, cats, look) { const pid = crypto.randomBytes(6).toString('hex'), tok = crypto.randomBytes(18).toString('base64url'); const p = { pid, tok: tokHash(tok), nick: uniqNick(r, cleanNick(nick)), cats: cleanCats(cats), look: cleanLook(look), clients: new Set(), last: now(), acts: { t: 0, n: 0 } }; r.people.set(pid, p); return [p, tok]; }

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x'); const ip = clientIp(req);
  if (req.method === 'OPTIONS') { res.writeHead(204, headers(req)); return res.end(); }
  if (url.pathname === '/health' || url.pathname === '/') return send(req, res, 200, { ok: true, rooms: rooms.size });
  if (req.method === 'POST' && req.headers.origin && !ORIGINS.includes(req.headers.origin)) return send(req, res, 403, { err: 'origin' });
  if (limited('ip:' + ip, 600, 60e3)) return send(req, res, 429, { err: 'slow' });
  try {
    if (req.method === 'GET' && url.pathname === '/api/events') {
      const [r, p, err] = auth({ code: url.searchParams.get('code'), pid: url.searchParams.get('pid'), tok: url.searchParams.get('tok') });
      if (err) return send(req, res, err === 'gone' ? 404 : 403, { err });
      res.writeHead(200, headers(req, { 'Content-Type': 'text/event-stream; charset=utf-8', 'Connection': 'keep-alive', 'X-Accel-Buffering': 'no' }));
      res.write(`retry: 3000\ndata: ${JSON.stringify({ t: 'hello', snap: r.snap, people: pubPeople(r), pos: r.pos, seek: r.seek ? { hides: r.seek.hides, found: r.seek.found } : null, me: p.pid })}\n\n`);
      const wasOn = p.clients.size > 0; p.clients.add(res); p.last = now();
      if (!wasOn) broadcast(r, { t: 'people', people: pubPeople(r) });
      const hb = setInterval(() => res.write(': hb\n\n'), 20e3);
      req.on('close', () => { clearInterval(hb); p.clients.delete(res); if (rooms.has(r.code) && p.clients.size === 0) broadcast(r, { t: 'people', people: pubPeople(r) }); });
      return;
    }
    if (req.method !== 'POST') return send(req, res, 404, { err: 'nf' });
    const body = await readJson(req);
    if (url.pathname === '/api/create') {
      if (limited('create:' + ip, 20, 600e3)) return send(req, res, 429, { err: 'slow' });
      if (rooms.size >= MAX_ROOMS) return send(req, res, 503, { err: 'full' });
      const code = newCode(); if (!code) return send(req, res, 503, { err: 'full' });
      const r = { code, created: now(), last: now(), seq: 0, snap: cleanSnap(body.snap), people: new Map(), pos: [], host: null };
      const [p, tok] = addPerson(r, body.nick, body.cats, body.look); r.host = p.pid; rooms.set(code, r);
      return send(req, res, 200, { code, pid: p.pid, tok });
    }
    if (url.pathname === '/api/join') {
      if (limited('join:' + ip, 40, 600e3)) return send(req, res, 429, { err: 'slow' });
      const r = rooms.get(String(body.code || '').replace(/\D/g, ''));
      if (!r) return send(req, res, 404, { err: 'gone' });
      if (r.people.size >= MAX_PEOPLE) return send(req, res, 409, { err: 'many' });
      const [p, tok] = addPerson(r, body.nick, (body.cats || []).slice(0, 3), body.look);
      broadcast(r, { t: 'people', people: pubPeople(r), join: p.nick });
      return send(req, res, 200, { code: r.code, pid: p.pid, tok });
    }
    if (url.pathname === '/api/act') {
      const [r, p, err] = auth(body); if (err) return send(req, res, err === 'gone' ? 404 : 403, { err });
      const t = now(); if (t - p.acts.t > 1000) { p.acts = { t, n: 0 }; } if (++p.acts.n > 8) return send(req, res, 429, { err: 'slow' });
      p.last = t; const by = p.pid;
      switch (body.t) {
        case 'pos': {
          if (by !== r.host) return send(req, res, 403, { err: 'host' });
          r.pos = (Array.isArray(body.pos) ? body.pos : []).slice(0, 40).map(c => ({ k: String(c.k || '').slice(0, 20).replace(/[^a-z0-9-]/g, ''), x: num(c.x, -10, 110), y: num(c.y, 0, 115), z: num(c.z, 0, 200) | 0, pose: POSES.has(c.pose) ? c.pose : 'sit', w: c.w ? 1 : 0 }));
          broadcast(r, { t: 'pos', pos: r.pos }); break;
        }
        case 'toy': { if (!TOYS.has(body.e)) return send(req, res, 400, { err: 'toy' }); const path = (Array.isArray(body.path) ? body.path : []).slice(0, 8).map(q => [num(q[0], 4, 96), num(q[1], 60, 98)]); broadcast(r, { t: 'toy', e: body.e, path, by }); break; }
        case 'snack': { if (!SNACKS.has(body.e)) return send(req, res, 400, { err: 'snack' }); broadcast(r, { t: 'snack', e: body.e, x: num(body.x, 6, 94), y: num(body.y, 64, 98), by }); break; }
        case 'say': broadcast(r, { t: 'say', m: num(body.m, 0, SAYS - 1) | 0, by }); break;
        case 'seek': {
          if (r.seek && t - r.seek.at < 5 * 60e3) return send(req, res, 409, { err: 'seeking' });
          const keys = new Set([...r.people.values()].flatMap(q => q.cats.map(c => q.pid + '-' + c.i)));
          const hides = {}; (Array.isArray(body.hides) ? body.hides : []).slice(0, 40).forEach(h => { const k = String(h && h.k || ''); if (keys.has(k)) hides[k] = { x: num(h.x, -5, 105), y: num(h.y, 20, 112), z: num(h.z, 0, 200) | 0 }; });
          if (!Object.keys(hides).length) return send(req, res, 400, { err: 'nocat' });
          r.seek = { at: t, by, hides, found: {} }; broadcast(r, { t: 'seek', hides, by }); break;
        }
        case 'found': {
          const k = String(body.k || ''); if (!r.seek || !r.seek.hides[k]) return send(req, res, 200, { ok: false });
          if (r.seek.found[k]) return send(req, res, 200, { ok: false, late: true });
          r.seek.found[k] = by; const total = Object.keys(r.seek.hides).length, n = Object.keys(r.seek.found).length;
          broadcast(r, { t: 'found', k, by, n, total });
          if (n >= total) { const score = {}; Object.values(r.seek.found).forEach(q => score[q] = (score[q] || 0) + 1); r.seek = null; broadcast(r, { t: 'seekend', score }); }
          break;
        }
        case 'pet': broadcast(r, { t: 'pet', k: String(body.k || '').slice(0, 20).replace(/[^a-z0-9-]/g, ''), by }); break;
        case 'cats': p.cats = cleanCats((body.cats || []).slice(0, by === r.host ? 12 : 3)); broadcast(r, { t: 'people', people: pubPeople(r) }); break;
        case 'leave':
          if (by === r.host) { closeRoom(r, 'host'); break; }
          for (const c of p.clients) c.end(); r.people.delete(by); broadcast(r, { t: 'people', people: pubPeople(r), left: p.nick }); break;
        default: return send(req, res, 400, { err: 'type' });
      }
      return send(req, res, 200, { ok: true });
    }
    return send(req, res, 404, { err: 'nf' });
  } catch (e) { return send(req, res, 400, { err: 'bad' }); }
});

setInterval(() => {
  const t = now();
  for (const r of rooms.values()) {
    const anyOn = [...r.people.values()].some(p => p.clients.size > 0);
    if (t - r.created > LIFE_MS || (!anyOn && t - r.last > IDLE_MS)) closeRoom(r, 'time');
    else if (!anyOn && t - r.last > 5 * 60e3 && !r.people.get(r.host)?.clients.size) closeRoom(r, 'host');
  }
  for (const [k, h] of ipHits) if (t - h.t > 600e3) ipHits.delete(k);
}, 30e3).unref();

server.headersTimeout = 15e3; server.requestTimeout = 0; server.keepAliveTimeout = 65e3;
server.listen(PORT, () => console.log(`yang2 놀이터 서버 :${PORT} · 허용 ${ORIGINS.join(' ')}`));
