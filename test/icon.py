import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page()
        await pg.goto('http://localhost:8765/app.html');await pg.wait_for_timeout(1000)
        svg=await pg.evaluate("""()=>{const c=BREEDS[0],d=BREEDS.find(b=>b.n==='웰시 코기');return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" fill="#FFF1DC"/><circle cx="256" cy="268" r="190" fill="#FFD9A8" opacity=".55"/><g transform="translate(40,150) scale(5.4)">${bFace(d)}</g><g transform="translate(250,150) scale(5.4)">${bFace(c)}</g><text x="256" y="470" font-size="64" text-anchor="middle" font-family="Jua,sans-serif" font-weight="800" fill="#2FB59E">+ − × ÷</text></svg>`}""")
        open('/home/claude/nm/icon.svg','w').write(svg)
        for n,sz,pad in [('icon-512',512,0),('icon-192',192,0),('icon-180',180,0),('icon-maskable-512',512,1),('icon-maskable-192',192,1)]:
            pg2=await b.new_page(viewport={'width':sz,'height':sz})
            inner=svg if not pad else svg.replace('<g transform','<g transform="translate(51,51) scale(.8)"><g transform',1).replace('</svg>','</g></svg>')
            await pg2.set_content(f'<body style="margin:0">{inner.replace("<svg ",f"<svg width=\"{sz}\" height=\"{sz}\" ",1)}</body>')
            await pg2.screenshot(path=f'/home/claude/nm/{n}.png',clip={'x':0,'y':0,'width':sz,'height':sz})
        await b.close()
asyncio.run(main())
