import asyncio,subprocess,time
from playwright.async_api import async_playwright
async def main():
    srv=subprocess.Popen(['python3','-m','http.server','8765','--bind','127.0.0.1'],cwd='/home/claude/nm',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
    async with async_playwright() as p:
        b=await p.chromium.launch();ctx=await b.new_context(**p.devices['iPhone 13']);pg=await ctx.new_page();errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('http://localhost:8765/app.html');await pg.wait_for_timeout(1200)
        await pg.evaluate("()=>{closeModal();S.sp='both';S.range='3a';for(let i=100;i<150;i++)S.dex[i]=today();[1,5,9].forEach(i=>S.dex[i]=today());save()}")
        await pg.set_content('<body style="background:#fff">'+await pg.evaluate("()=>BREEDS.slice(100).map(b=>`<div style='display:inline-block;width:72px;text-align:center;font-size:9px'><svg viewBox='0 -2 40 36' width='70' height='62'>${bFace(b)}</svg><br>${b.n}</div>`).join('')")+'</body>')
        await pg.screenshot(path='test/shots/dogs.png',full_page=True)
        await pg.goto('http://localhost:8765/app.html');await pg.wait_for_timeout(1200)
        await pg.evaluate("()=>{closeModal();go('room')}");await pg.wait_for_timeout(3000)
        await pg.evaluate("()=>window.scrollTo(0,350)");await pg.wait_for_timeout(500)
        await pg.screenshot(path='test/shots/room2.png')
        print(errs);await b.close()
    srv.terminate()
asyncio.run(main())
