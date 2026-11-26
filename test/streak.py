import asyncio,subprocess,time,sys
sys.path.insert(0,'test')
from reward import solve
from playwright.async_api import async_playwright
async def main():
    srv=subprocess.Popen(['python3','-m','http.server','8765','--bind','127.0.0.1'],cwd='/home/claude/nm',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
    async with async_playwright() as p:
        b=await p.chromium.launch();ctx=await b.new_context(**p.devices['iPhone 13']);pg=await ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('http://localhost:8765/app.html');await pg.wait_for_timeout(900)
        await pg.evaluate("()=>{closeModal();S.sp='both';const R=rmS();R.coins=0;R.earn=null;save()}")
        await pg.evaluate("()=>startProbs(practiceList(['n52','n53'],6).map(q=>q.t==='self'?genOne('n52'):q).map(prepare),'연속')");await solve(pg,'right')
        print('6 right: streakStars',await pg.evaluate("()=>RUN.streakStars"),'reward',await pg.evaluate("()=>[RUN.reward.stars,RUN.reward.got]"),'coins',await pg.evaluate("()=>[rmS().coins,starToday().n]"))
        print(await pg.evaluate("()=>document.querySelector('.rwcard').innerText.replace(/\\n+/g,' | ')"))
        print('errs',errs);await b.close()
    srv.terminate()
asyncio.run(main())
