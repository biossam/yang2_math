import asyncio,subprocess,time
from playwright.async_api import async_playwright
async def main():
    srv=subprocess.Popen(['python3','-m','http.server','8765','--bind','127.0.0.1'],cwd='/home/claude/nm',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':1200,'height':800});await pg.goto('http://localhost:8765/app.html');await pg.wait_for_timeout(1000)
        html=await pg.evaluate(r'''()=>{let o='';for(const k of ['g14a','g24a','g22a','n34a','n13a','n23a','d22a','d41a','d42a','d31a','g41c','g51b','g33a','g45a']){let n=0;for(let i=0;i<80&&n<2;i++){const p=GEN[k]();if(!p.fig)continue;n++;o+=`<div style="display:inline-block;width:270px;vertical-align:top;margin:3px;padding:5px;border:1px solid #ccc;font:11px sans-serif"><b>${k}</b> ${fmt(p.q)}<div class="qfig">${p.fig}</div>정답 <b>${fmt(String(p.t==='mc'?p.x[0]:p.x).split('|')[0])}</b></div>`}}return o}''')
        await pg.set_content('<style>.qfig{background:#FFFDF7;padding:4px}.fr{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;font-size:.85em}.fr span:first-child{border-bottom:1px solid}</style>'+html);await pg.screenshot(path='test/figs.png',full_page=True)
        await b.close()
    srv.terminate()
asyncio.run(main())
