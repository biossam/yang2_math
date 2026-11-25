import asyncio,subprocess,time,os
from playwright.async_api import async_playwright
async def main():
    srv=subprocess.Popen(['python3','-m','http.server','8765','--bind','127.0.0.1'],cwd='/home/claude/nm',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    ps=subprocess.Popen(['node','server.js'],cwd='/home/claude/nm/party',env={**os.environ,'PORT':'8790','ALLOW_ORIGINS':'http://localhost:8765'},stdout=subprocess.DEVNULL,stderr=subprocess.STDOUT);time.sleep(1.5)
    async with async_playwright() as p:
        b=await p.chromium.launch();errs=[]
        async def mk(name,ids):
            ctx=await b.new_context(**p.devices['iPhone 13']);pg=await ctx.new_page();pg.on('pageerror',lambda e:errs.append(name+str(e)))
            await pg.goto('http://localhost:8765/app.html');await pg.wait_for_timeout(1000)
            await pg.evaluate(f"()=>{{localStorage.setItem('ptURL','http://localhost:8790');closeModal();S.sp='both';{';'.join(f'S.dex[{i}]=today()' for i in ids)};save();go('room')}}");await pg.reload();await pg.wait_for_timeout(1000)
            await pg.evaluate("()=>{closeModal();go('room')}");await pg.wait_for_timeout(800);return pg
        h=await mk('host',[100,105,3]);g=await mk('guest',[110,22])
        await h.evaluate("()=>ptOpen()");await h.wait_for_timeout(400)
        await h.fill('[data-ptnick]','토리');await h.click('[data-pt="host"]');await h.wait_for_timeout(2500)
        code=await h.evaluate("()=>PT.code");print('code',code)
        await g.evaluate(f"()=>ptOpen('{code}')");await g.wait_for_timeout(400)
        await g.fill('[data-ptnick]','멍멍이');await g.click('[data-pt="join"]');await g.wait_for_timeout(3500)
        print('host people',await h.evaluate("()=>Object.values(PT.people||{}).map(x=>x.nick||x.n)"),'guest people',await g.evaluate("()=>Object.values(PT.people||{}).map(x=>x.nick||x.n)"))
        await h.screenshot(path='test/shots/p_host.png');await g.screenshot(path='test/shots/p_guest.png')
        print('errs',errs);await b.close()
    srv.terminate();ps.terminate()
asyncio.run(main())
