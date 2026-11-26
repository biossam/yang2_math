import asyncio,subprocess,time
from playwright.async_api import async_playwright
JS=r'''()=>{const bad=[],cnt={};const n2={삼:3,사:4,오:5,육:6,칠:7,팔:8};const ans=p=>String(p.t==='mc'?p.x[0]:String(p.x).split('|')[0]).replace(/,/g,'');
 const near=(a,b)=>Math.abs(a-b)<1e-6;
 for(const k of ['g61a','g62a','g62b','g63a','g64a','g64b','g65a']){cnt[k]=0;for(let i=0;i<2000;i++){const p=GEN[k]();cnt[k]++;const q=p.q,a=+ans(p);let m,v=null;
  if(m=q.match(/^(.)(각기둥|각뿔)의 (면|모서리|꼭짓점)/)){const n=n2[m[1]];v=m[2]==='각기둥'?{면:n+2,모서리:3*n,꼭짓점:2*n}[m[3]]:{면:n+1,모서리:2*n,꼭짓점:n+1}[m[3]]}
  else if(m=q.match(/^한 모서리가 (\d+) cm인 정육면체의 부피/))v=m[1]**3;
  else if(m=q.match(/^한 모서리가 (\d+) cm인 정육면체의 겉넓이/))v=6*m[1]**2;
  else if(m=q.match(/^가로 (\d+) cm, 세로 (\d+) cm, 높이 (\d+) cm인 직육면체의 부피/))v=m[1]*m[2]*m[3];
  else if(m=q.match(/^가로 (\d+) cm, 세로 (\d+) cm, 높이 (\d+) cm인 직육면체의 겉넓이/)){const [x,y,z]=[+m[1],+m[2],+m[3]];v=2*(x*y+y*z+z*x)}
  else if(m=q.match(/칸마다 ([\d, ]+)층/))v=m[1].split(',').reduce((s,t)=>s+ +t,0);
  else if(m=q.match(/^지름이 (\d+) cm인 원의 원주.*원주율 ([\d.]+)/))v=m[1]*m[2];
  else if(m=q.match(/^반지름이 (\d+) cm인 원의 원주.*원주율 ([\d.]+)/))v=2*m[1]*m[2];
  else if(m=q.match(/^반지름이 (\d+) cm인 원의 넓이.*원주율 ([\d.]+)/))v=m[1]*m[1]*m[2];
  else if(m=q.match(/반지름이 (\d+) cm인 원기둥의 전개도에서 옆면의 가로.*원주율 ([\d.]+)/))v=2*m[1]*m[2];
  else if(/어느 방향에서 보아도 원/.test(q))v='구';else if(/밑면이 원 1개/.test(q))v='원뿔';else if(/밑면이 2개이고/.test(q))v='원기둥';
  else bad.push(k+' 검산 못함: '+q);
  if(v!=null){const A=typeof v==='string'?ans(p):a;if(typeof v==='string'?A!==v:!near(A,v))bad.push(`${k}: ${q} → 정답 ${ans(p)}, 검산 ${v}`)}
  if(p.t==='mc'&&new Set(p.x).size!==p.x.length)bad.push(k+' 보기 중복 '+p.x)}}
 return {bad:[...new Set(bad)].slice(0,30),cnt}}'''
async def main():
    srv=subprocess.Popen(['python3','-m','http.server','8765','--bind','127.0.0.1'],cwd='/home/claude/nm',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':900,'height':600});await pg.goto('http://localhost:8765/app.html');await pg.wait_for_timeout(1000)
        r=await pg.evaluate(JS);print(r)
        html=await pg.evaluate(r'''()=>{let o='';const seen=new Set();for(const k of ['g62a','g62b','g64a','g64b','g63a','g53b']){let n=0;for(let i=0;i<60&&n<2;i++){const p=GEN[k]();if(!p.fig||seen.has(p.q))continue;seen.add(p.q);n++;o+=`<div style="display:inline-block;width:280px;vertical-align:top;margin:4px;padding:6px;border:1px solid #ccc;font:12px sans-serif"><b>${k}</b> ${fmt(p.q)}<div class="qfig">${p.fig}</div>정답 ${fmt(String(p.t==='mc'?p.x[0]:p.x).split('|')[0])}</div>`}}
          ['g53','g62','g64','g65','g61','g63'].forEach(id=>{const c=C[id];if(c&&c.pic)o+=`<div style="display:inline-block;width:200px;margin:4px;font:12px sans-serif"><b>${id} 개념 그림</b><div class="qfig">${c.pic()}</div></div>`});return o}''')
        await pg.set_content('<link><style>.qfig{background:#FFFDF7;padding:6px}</style>'+html);await pg.screenshot(path='test/g6geo.png',full_page=True)
        await b.close()
    srv.terminate()
asyncio.run(main())
