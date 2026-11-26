import asyncio,subprocess,time
from playwright.async_api import async_playwright
async def main():
    srv=subprocess.Popen(['python3','-m','http.server','8765','--bind','127.0.0.1'],cwd='/home/claude/nm',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page();await pg.goto('http://localhost:8765/app.html');await pg.wait_for_timeout(1000)
        out=await pg.evaluate(r'''()=>{const T=h=>h.replace(/<span class="fr"><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/g,'($1/$2)').replace(/<[^>]+>/g,'');const f=s=>T(fmt(String(s)));let o='';
          CONCEPTS.forEach(c=>{o+=`\n## ${c.id} ${c.ex} ${c.t}\n`;c.sum.forEach(s=>o+='S '+f(s)+'\n');c.fl.forEach(([q,a])=>o+='F '+f(q)+' → '+f(a)+'\n');
          c.pr.forEach(p=>o+=`P[${p.t}] ${f(p.q)} → ${p.t==='mc'?f(p.x[0])+' (오답: '+p.x.slice(1).map(f).join(', ')+')':p.t==='ox'?(p.x?'O':'X'):p.t==='sa'?f(p.x):''} :: ${f(p.s)}\n`)});return o}''')
        open('test/static.txt','w').write(out);await b.close()
    srv.terminate()
asyncio.run(main())
