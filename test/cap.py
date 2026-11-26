import asyncio,subprocess,time
from playwright.async_api import async_playwright
async def main():
    srv=subprocess.Popen(['python3','-m','http.server','8765','--bind','127.0.0.1'],cwd='/home/claude/nm',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('http://localhost:8765/app.html');await pg.wait_for_timeout(900)
        r=await pg.evaluate("()=>{closeModal();S.sp='both';save();const R=rmS();R.coins=0;R.earn=null;const g=[];for(let i=0;i<20;i++)g.push(rmEarn(2));return [g.join(','),R.coins,starToday().n]}")
        print(r)
        await pg.evaluate("()=>{const R=rmS();R.earn={d:today(),n:29};save();RUN={mode:'practice',steps:[{k:'probs',list:[{cid:'n52',t:'sa',l:1},{cid:'n52',t:'sa',l:1},{cid:'n52',t:'sa',l:1}],res:[true,true,true],fast:{}},{k:'done'}],i:1,start:Date.now()};rewardSet();go('run')}")
        print(await pg.evaluate("()=>[RUN.reward.stars,RUN.reward.got,document.querySelector('.rwcard').innerText.replace(/\\n+/g,' | ')]"))
        await pg.evaluate("()=>{RUN=null;go('home')}");print(await pg.evaluate("()=>[...document.querySelectorAll('small')].map(e=>e.textContent).filter(t=>t.includes('오늘'))"))
        print('errs',errs);await b.close()
    srv.terminate()
asyncio.run(main())
