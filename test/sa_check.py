import asyncio,subprocess,time
from playwright.async_api import async_playwright
async def main():
    srv=subprocess.Popen(['python3','-m','http.server','8765','--bind','127.0.0.1'],cwd='/home/claude/nm',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page();await pg.goto('http://localhost:8765/app.html');await pg.wait_for_timeout(1000)
        r=await pg.evaluate(r'''()=>{const bad=new Set();const kinds={};for(const k in GEN)for(let i=0;i<300;i++){const p=GEN[k]();if(p.t!=='sa')continue;const x=String(p.x).split('|')[0];
          if(/§|\{\{/.test(x))bad.add(k+' 분수 정답(입력 불가): '+p.q);
          if(!/^-?[\d.]+$/.test(x.replace(/,/g,'')))bad.add(k+' 숫자 아닌 정답: '+x+' | '+p.q);
          const unit=(p.q.match(/몇 ([^\s?]+)\??$/)||[])[1];if(unit)kinds[unit]=1}
          CONCEPTS.forEach(c=>c.pr.forEach(p=>{if(p.t==='sa'&&!/^-?[\d.,]+$/.test(String(p.x)))bad.add(c.id+' 정적 숫자 아닌 답: '+p.x)}));
          return {bad:[...bad].slice(0,30),units:Object.keys(kinds)}}''')
        print(r);await b.close()
    srv.terminate()
asyncio.run(main())
