import asyncio,subprocess,time
from playwright.async_api import async_playwright
async def main():
    srv=subprocess.Popen(['python3','-m','http.server','8765','--bind','127.0.0.1'],cwd='/home/claude/nm',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
    async with async_playwright() as p:
        b=await p.chromium.launch();ctx=await b.new_context(**p.devices['iPhone 13']);pg=await ctx.new_page()
        await pg.goto('http://localhost:8765/app.html');await pg.wait_for_timeout(1000)
        await pg.evaluate("()=>{closeModal();S.sp='both';[100,3,22].forEach(i=>S.dex[i]=today());const R=rmS();R.jsAuto=false;[['sofa',20,84],['bed',75,90],['desk',50,80]].forEach(([k,x,y])=>R.items.push({id:R.nid++,k,x,y,f:0}));save();go('room')}");await pg.wait_for_timeout(800)
        for k in ['sofa','desk','bed']:
            r=await pg.evaluate(f"""()=>{{const e=[...document.querySelectorAll('#rmscene .rmi')].find(e=>rmS().items.find(i=>String(i.id)===e.dataset.rmi).k==='{k}');const b=e.getBoundingClientRect();const cx=b.left+b.width/2,cy=b.top+b.height*.6;const top=document.elementFromPoint(cx,cy);return [cx,cy,top.className&&top.className.baseVal!==undefined?'svg:'+(top.closest('[class]')||0).className:top.className,(top.closest('.rmi,.rmc')||0).className]}}""")
            print(k,r)
            await pg.mouse.click(r[0],r[1]);await pg.wait_for_timeout(2700)
            print('  ->',await pg.evaluate("()=>{const e=document.querySelector('#rmscene .rmjs');return [e.style.left,e.style.top,e._pose]}"))
        await b.close()
    srv.terminate()
asyncio.run(main())
