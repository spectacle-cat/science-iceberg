import fs from 'node:fs';
import assert from 'node:assert/strict';
import path from 'node:path';
const tree=JSON.parse(fs.readFileSync('content/tree.json')),cards=JSON.parse(fs.readFileSync('content/cards.json'));
const ids=new Set(tree.map(n=>n.id));assert.equal(ids.size,tree.length,'Topic IDs must be unique');
assert.deepEqual(tree.filter(n=>!n.parent).map(n=>n.id).sort(),['biology','chemistry','physics']);
for(const n of tree){assert.match(n.id,/^[a-z][a-z0-9-]*$/);assert.ok(n.title);assert.ok(['biology','chemistry','physics'].includes(n.subject));assert.ok(n.source.startsWith('https://'));let current=n;const seen=new Set();while(current.parent){assert.ok(!seen.has(current.id),'Tree cycle');seen.add(current.id);assert.ok(ids.has(current.parent),'Missing parent');current=tree.find(t=>t.id===current.parent)}assert.equal(current.id,n.subject);assert.ok(fs.existsSync(`dist/${n.id}/index.html`),'Missing topic page');}
const fields=['kicker','headline','intro','question','idea','use','activity','twist','parent','misconception','science'];
for(const [id,c] of Object.entries(cards)){assert.ok(ids.has(id),'Unknown card ID');for(const f of fields)assert.ok(typeof c[f]==='string'&&c[f].trim(),`${id}: missing ${f}`);assert.ok(Array.isArray(c.hooks)&&c.hooks.length===3);for(const hook of c.hooks)assert.ok(hook.length===2&&hook.every(x=>typeof x==='string'&&x.trim()));assert.ok(c.sources?.length);for(const s of c.sources)assert.ok(s.title&&/^https:\/\//.test(s.url));}
for(const n of tree){const html=fs.readFileSync(`dist/${n.id}/index.html`,'utf8');assert.equal(html.includes('START WITH A QUESTION'),Boolean(cards[n.id]),'Content readiness mismatch');assert.equal(html.includes('NOT WRITTEN YET'),!cards[n.id],'Placeholder mismatch');}
for(const file of ['dist/index.html',...tree.map(n=>`dist/${n.id}/index.html`)]){const html=fs.readFileSync(file,'utf8');for(const [,url] of html.matchAll(/(?:href|src)="([^"]+)"/g)){if(/^(https?:|#)/.test(url))continue;let target=path.resolve(path.dirname(file),url.split('#')[0]);if(url.split('#')[0].endsWith('/')||url.startsWith('#'))target=path.join(target,'index.html');assert.ok(fs.existsSync(target),`Broken link ${file}: ${url}`)}}
console.log(`Validated ${tree.length} topics, ${Object.keys(cards).length} cards, parent relationships, placeholders and all local links.`);
