import asyncio,subprocess,time
from playwright.async_api import async_playwright
async def main():
    srv=subprocess.Popen(['python3','-m','http.server','8765','--bind','127.0.0.1'],cwd='/home/claude/nm',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
    async with async_playwright() as p:
        b=await p.chromium.launch();ctx=await b.new_context(**p.devices['iPhone 13']);pg=await ctx.new_page();errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('http://localhost:8765/app.html');await pg.wait_for_timeout(1000)
        html=await pg.evaluate("""()=>{const looks=[rmLook(),{hair:'long',top:'dress',acc:'ribbon',hold:'book',skin:1,hc:2,tc:3,pc:1,face:'smile'},{hair:'curly',top:'hoodie',acc:'glasses',hold:'churu',skin:3,hc:0,tc:5,pc:2,face:'wink'}];
          return looks.map(o=>['stand',...JS_ACTS.map(a=>a[0])].map(k=>`<div style="display:inline-block;width:76px;text-align:center;font:10px sans-serif;vertical-align:bottom">${jsSvg(o,0,k==='spin'?'stand':k).replace('<svg ','<svg width="70" ')}<br>${k}</div>`).join('')).join('<br>')}""")
        pg2=await ctx.new_page();await pg2.set_content('<body style="background:#FFF6E6;margin:6px"><style>.rmz{font:700 7px sans-serif;fill:#5B8DEF}</style>'+html+'</body>')
        await pg2.screenshot(path='test/poses.png',full_page=True)
        await pg.evaluate("()=>{closeModal();S.sp='both';[100,3,22].forEach(i=>S.dex[i]=today());save();go('room')}");await pg.wait_for_timeout(800)
        seen=set()
        for i in range(40):
            await pg.evaluate("()=>{const el=document.querySelector('#rmscene .rmjs');el._busy=0;jsWalk()}");await pg.wait_for_timeout(120)
            seen.add(await pg.evaluate("()=>document.querySelector('#rmscene .rmjs')._pose||'walk'"))
        await pg.evaluate("()=>{const el=document.querySelector('#rmscene .rmjs');for(let i=0;i<6;i++)el.click()}")
        await pg.evaluate("()=>{RM_TAB='me';rmRender()}");await pg.wait_for_timeout(300)
        await pg.click('[data-jsprev="wave"]');await pg.wait_for_timeout(300)
        print('poses seen',sorted(seen),'errs',errs);await b.close()
    srv.terminate()
asyncio.run(main())
