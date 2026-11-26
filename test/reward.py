import asyncio,subprocess,time
from playwright.async_api import async_playwright
async def solve(pg,mode,slow=True):
    # mode: 'right' or 'wrong'
    for i in range(12):
        st=await pg.evaluate("()=>{const s=RUN&&RUN.steps[RUN.i];return s?s.k:null}")
        if st=='learn': await pg.click('[data-act="next"]');await pg.wait_for_timeout(150);continue
        if st!='probs':return
        if slow: await pg.evaluate("()=>{const s=RUN.steps[RUN.i];s.shown[s.j]=Date.now()-5000}")
        t=await pg.evaluate("()=>{const s=RUN.steps[RUN.i];return s.list[s.j].t}")
        right=mode=='right'
        if t=='mc': await pg.click('.opt[data-pick="0"]' if right else '.opt:not([data-pick="0"]) >> nth=0')
        elif t=='ox':
            x=await pg.evaluate("()=>{const s=RUN.steps[RUN.i];return s.list[s.j].x}")
            await pg.click(f'[data-ox="{str(x==right).lower()}"]')
        elif t=='sa':
            x=await pg.evaluate("()=>{const s=RUN.steps[RUN.i];return String(s.list[s.j].x).split('|')[0]}")
            await pg.fill('#sain',x if right else '99999');await pg.click('[data-act="sacheck"]')
        else:
            await pg.click('[data-act="reveal"]');await pg.click('[data-self="1"]' if right else '[data-self="0"]')
        await pg.wait_for_timeout(120)
        if await pg.evaluate("()=>document.getElementById('modal').classList.contains('on')"): print('  (modal)');await pg.evaluate("()=>closeModal()")
        await pg.click('[data-act="pnext"]');await pg.wait_for_timeout(150)
        if await pg.evaluate("()=>document.getElementById('modal').classList.contains('on')"):
            print('  help modal:',(await pg.evaluate("()=>document.querySelector('#modal h3').textContent")));await pg.click('#modal [data-mb="0"]');await pg.wait_for_timeout(150)
async def main():
    srv=subprocess.Popen(['python3','-m','http.server','8765','--bind','127.0.0.1'],cwd='/home/claude/nm',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
    async with async_playwright() as p:
        b=await p.chromium.launch();ctx=await b.new_context(**p.devices['iPhone 13']);pg=await ctx.new_page();errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('http://localhost:8765/app.html');await pg.wait_for_timeout(1000)
        await pg.evaluate("()=>{closeModal();S.sp='both';S.range='5a';save();render()}")
        coins=lambda: pg.evaluate("()=>[rmS().coins||0,S.setN||0]")
        print('start',await coins())
        await pg.evaluate("()=>startProbs(practiceList(['n52','n53'],3),'테스트')");await solve(pg,'right')
        print('all right ->',await pg.evaluate("()=>RUN.reward&&[RUN.reward.stars,RUN.reward.an]"),await coins())
        await pg.evaluate("()=>startProbs(practiceList(['n52','n53'],3),'테스트')");await solve(pg,'right',slow=False)
        print('fast right ->',await pg.evaluate("()=>RUN.reward&&[RUN.reward.stars,RUN.reward.an,RUN.reward.fast]"),await coins())
        await pg.evaluate("()=>startProbs(practiceList(['n52','n53'],4),'테스트')");await solve(pg,'wrong')
        print('all wrong ->',await pg.evaluate("()=>RUN.reward&&[RUN.reward.stars,RUN.reward.an,RUN.reward.wrong.length,RUN.reward.pend]"),await coins(),'fixDue',await pg.evaluate("()=>S.fixDue"))
        await pg.screenshot(path='test/rw_done.png',full_page=True)
        await pg.click('[data-act="fixgo"]');await pg.wait_for_timeout(300);await pg.screenshot(path='test/rw_learn.png')
        await solve(pg,'right')
        print('fix ->',await pg.evaluate("()=>RUN.reward&&[RUN.mode,RUN.reward.bonus,RUN.reward.an]"),await coins(),'fixDue',await pg.evaluate("()=>S.fixDue"))
        await pg.screenshot(path='test/rw_fix.png',full_page=True)
        print('errs',errs);await b.close()
    srv.terminate()
asyncio.run(main())
