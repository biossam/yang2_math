import asyncio,subprocess,time
from playwright.async_api import async_playwright
async def main():
    srv=subprocess.Popen(['python3','-m','http.server','8765','--bind','127.0.0.1'],cwd='/home/claude/nm',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page();await pg.goto('http://localhost:8765/app.html');await pg.wait_for_timeout(1000)
        html=await pg.evaluate("()=>[0,2,5].map(hc=>JS_OPT.hair.map(([h,t])=>`<div style='display:inline-block;text-align:center;font:10px sans-serif;width:80px'>${jsSvg({skin:hc?2:0,hair:h,hc,top:'tee',tc:1,pc:0,acc:'none',face:'smile',hold:'none'}).replace('<svg ','<svg width=\"74\" ')}<br>${t} c${hc}</div>`).join('')).join('<br>')")
        await pg.set_content('<body style="background:#FFF6E6">'+html);await pg.screenshot(path='test/hair.png',full_page=True);await b.close()
    srv.terminate()
asyncio.run(main())
