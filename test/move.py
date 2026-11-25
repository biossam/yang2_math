import asyncio,subprocess,time
from playwright.async_api import async_playwright
async def main():
    srv=subprocess.Popen(['python3','-m','http.server','8765','--bind','127.0.0.1'],cwd='/home/claude/nm',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
    async with async_playwright() as p:
        b=await p.chromium.launch();ctx=await b.new_context(**p.devices['iPhone 13']);pg=await ctx.new_page();errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('http://localhost:8765/app.html');await pg.wait_for_timeout(1000)
        await pg.evaluate("()=>{closeModal();S.sp='both';[100,3,22].forEach(i=>S.dex[i]=today());save();const R=rmS();[['sofa',20,84],['bed',75,90],['desk',50,80]].forEach(([k,x,y])=>R.items.push({id:R.nid++,k,x,y,f:0}));save();go('room')}");await pg.wait_for_timeout(800)
        pos=lambda: pg.evaluate("()=>{const e=document.querySelector('#rmscene .rmjs');return [e.style.left,e.style.top,e._pose||'']}")
        sc=await pg.query_selector('#rmscene');bb=await sc.bounding_box()
        await pg.mouse.click(bb['x']+bb['width']*.2,bb['y']+bb['height']*.85);await pg.wait_for_timeout(2700);print('floor',await pos())
        items=await pg.evaluate("()=>[...document.querySelectorAll('#rmscene .rmi')].map(e=>{const o=rmS().items.find(i=>String(i.id)===e.dataset.rmi);return o&&o.k})");print('items',items)
        for k in ['sofa','bed','desk','shelf']:
            if k in items:
                i=items.index(k);await pg.click(f'#rmscene .rmi >> nth={i}',force=True);await pg.wait_for_timeout(2800);print(k,await pos())
        await pg.click('#rmscene .rmc >> nth=0',force=True);await pg.wait_for_timeout(2800);print('cat',await pos(),'modal',await pg.evaluate("()=>!!document.querySelector('.modal.show,.mbg.show,#modal:not(.hide)')"))
        await pg.evaluate("()=>closeModal()")
        await pg.screenshot(path='test/move.png')
        await pg.evaluate("()=>{RM_TAB='me';rmRender()}");await pg.click('[data-jsauto]');await pg.wait_for_timeout(300)
        print('auto',await pg.evaluate("()=>rmS().jsAuto"),'saved',await pg.evaluate("()=>[rmS().jx,rmS().jy]"))
        print('errs',errs);await b.close()
    srv.terminate()
asyncio.run(main())
