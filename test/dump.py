import asyncio,subprocess,time,sys
from playwright.async_api import async_playwright
async def main():
    srv=subprocess.Popen(['python3','-m','http.server','8765','--bind','127.0.0.1'],cwd='/home/claude/nm',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page()
        await pg.goto('http://localhost:8765/app.html');await pg.wait_for_timeout(1200)
        out=await pg.evaluate(r'''(n)=>{const T=h=>h.replace(/<span class="fr"><span>(.*?)<\/span><span>(.*?)<\/span><\/span>/g,'[$1/$2]').replace(/<[^>]+>/g,'');let o='';for(const k in GEN){for(let i=0;i<n;i++){const p=GEN[k]();o+=k+' | '+T(fmt(p.q)).replace(/\n/g,' / ')+' || '+(p.t==='mc'?p.x.map(x=>T(fmt(x))).join(' ; '):T(fmt(String(p.x))))+' || '+T(fmt(p.s))+(p.fig?' [fig]':'')+'\n'}}return o}''',int(sys.argv[1]))
        print(out);await b.close()
    srv.terminate()
asyncio.run(main())
