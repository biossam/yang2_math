import asyncio,subprocess,time,json
from playwright.async_api import async_playwright
OUT='/home/claude/nm/test/shots/'
async def main():
    import os;os.makedirs(OUT,exist_ok=True)
    srv=subprocess.Popen(['python3','-m','http.server','8765','--bind','127.0.0.1'],cwd='/home/claude/nm',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
    async with async_playwright() as p:
        b=await p.chromium.launch()
        ctx=await b.new_context(**p.devices['iPhone 13'])
        pg=await ctx.new_page();errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('http://localhost:8765/app.html');await pg.wait_for_timeout(1500)
        await pg.screenshot(path=OUT+'01_onboard.png')
        await pg.click('[data-obg="3"]');await pg.click('[data-obs="both"]');await pg.click('[data-obgo]');await pg.wait_for_timeout(600)
        await pg.screenshot(path=OUT+'02_launch.png')
        await pg.click('[data-lp="daily"]');await pg.wait_for_timeout(500)
        for i in range(8):
            st=await pg.evaluate("()=>{const st=RUN&&RUN.steps[RUN.i];return st?st.k:null}")
            if st!='probs':break
            await pg.screenshot(path=OUT+f'03_prob{i}.png')
            t=await pg.evaluate("()=>{const st=RUN.steps[RUN.i];return st.list[st.j].t}")
            if t=='mc': await pg.click('.opt >> nth=0')
            elif t=='ox': await pg.click('.oxb >> nth=0')
            elif t=='sa':
                x=await pg.evaluate("()=>{const st=RUN.steps[RUN.i];return String(st.list[st.j].x).split('|')[0]}")
                await pg.fill('#sain',x);await pg.click('[data-act="sacheck"]')
            else:
                await pg.click('[data-act="reveal"]');await pg.click('[data-self="1"]')
            await pg.wait_for_timeout(200)
            if i==0: await pg.screenshot(path=OUT+'04_answered.png',full_page=True)
            await pg.click('[data-act="pnext"]');await pg.wait_for_timeout(200)
        await pg.screenshot(path=OUT+'05_done.png')
        await pg.click('[data-act="finish"]');await pg.wait_for_timeout(1500)
        await pg.screenshot(path=OUT+'06_home.png',full_page=True)
        hc=await pg.evaluate("()=>[...document.querySelectorAll('.hcat')].length")
        print('hidden pets on home',hc)
        # find all hidden
        n=await pg.evaluate("async()=>{let n=0;for(const el of document.querySelectorAll('.hcat:not(.found)')){findCat(el.dataset.cat,el);closeModal();n++}return n}")
        print('found',n, await pg.evaluate("()=>Object.keys(S.dex).map(i=>BREEDS[i].n+(BREEDS[i].sp))"))
        # concept page
        await pg.evaluate("()=>go('concept','n34')");await pg.wait_for_timeout(300)
        await pg.screenshot(path=OUT+'07_concept.png',full_page=True)
        # give pets & go room
        await pg.evaluate("()=>{[100,105,110,3,22,121,128].forEach(i=>S.dex[i]=today());save();RM_TAB='room';go('room')}");await pg.wait_for_timeout(2500)
        await pg.screenshot(path=OUT+'08_room.png')
        await pg.evaluate("()=>openDex()");await pg.wait_for_timeout(500)
        await pg.screenshot(path=OUT+'09_dex.png')
        await pg.evaluate("()=>{closeModal();go('settings')}");await pg.wait_for_timeout(300)
        await pg.screenshot(path=OUT+'10_settings.png',full_page=True)
        print('errors',errs)
        await b.close()
    srv.terminate()
asyncio.run(main())
