import asyncio,subprocess,time,os
from playwright.async_api import async_playwright
async def main():
    srv=subprocess.Popen(['python3','-m','http.server','8765','--bind','127.0.0.1'],cwd='/home/claude/nm',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    ps=subprocess.Popen(['node','server.js'],cwd='/home/claude/nm/party',env={**os.environ,'PORT':'8790','ALLOW_ORIGINS':'http://localhost:8765'},stdout=subprocess.DEVNULL,stderr=subprocess.STDOUT);time.sleep(1.5)
    async with async_playwright() as p:
        b=await p.chromium.launch();errs=[]
        async def mk(name,ids,block_sse=False,block_all=False):
            ctx=await b.new_context(**p.devices['iPhone 13']);pg=await ctx.new_page();pg.on('pageerror',lambda e:errs.append(name+str(e)))
            if block_sse: await pg.route('**/api/events*',lambda r:r.abort())
            if block_all: await pg.route('http://localhost:8790/**',lambda r:r.abort())
            await pg.goto('http://localhost:8765/app.html');await pg.wait_for_timeout(900)
            await pg.evaluate(f"()=>{{localStorage.setItem('ptURL','http://localhost:8790');closeModal();S.sp='both';{';'.join(f'S.dex[{i}]=today()' for i in ids)};save()}}");await pg.reload();await pg.wait_for_timeout(900)
            await pg.evaluate("()=>{closeModal();go('room')}");await pg.wait_for_timeout(500);return pg
        h=await mk('host',[100,105,3],block_sse=True);g=await mk('guest',[110,22],block_sse=True)
        await h.evaluate("()=>ptOpen()");await h.fill('[data-ptnick]','토리');await h.click('[data-pt="host"]');await h.wait_for_timeout(9000)
        code=await h.evaluate("()=>PT.code");print('code',code,'host polling',await h.evaluate("()=>PT.polling"))
        await h.screenshot(path='test/qr.png')
        await g.evaluate(f"()=>ptOpen('{code}')");await g.fill('[data-ptnick]','멍멍이');await g.click('[data-pt="join"]');await g.wait_for_timeout(9000)
        print('host sees',await h.evaluate("()=>(PT.people||[]).map(x=>x.nick+(x.on?'+':'-'))"),'guest sees',await g.evaluate("()=>(PT.people||[]).map(x=>x.nick+(x.on?'+':'-'))"),'guest polling',await g.evaluate("()=>PT.polling"))
        await g.evaluate("()=>ptApi('/api/act',{code:PT.code,pid:PT.pid,tok:PT.tok,t:'say',m:2})");await h.wait_for_timeout(2500)
        print('host bubble',await h.evaluate("()=>[...document.querySelectorAll('.ptbub')].map(e=>e.textContent)"))
        await h.evaluate("()=>ptClose()");await g.wait_for_timeout(3500)
        print('guest after close',await g.evaluate("()=>document.querySelector('#rmparty .ptmsg b')?.textContent"))
        x=await mk('blocked',[3],block_all=True);t0=time.time()
        await x.evaluate("()=>ptOpen()");await x.fill('[data-ptnick]','하늘');await x.click('[data-pt="host"]')
        for i in range(40):
            await x.wait_for_timeout(1000)
            m=await x.evaluate("()=>document.querySelector('#rmparty .ptmsg b')?.textContent")
            if m and '연결할 수 없' in m:break
        print('blocked msg after',round(time.time()-t0),'s:',m);await x.screenshot(path='test/blocked.png')
        print('errs',errs);await b.close()
    srv.terminate();ps.terminate()
asyncio.run(main())
