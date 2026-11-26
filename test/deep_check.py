import asyncio,subprocess,time,json
from playwright.async_api import async_playwright
JS=r'''()=>{
const G=(a,b)=>b?G(b,a%b):Math.abs(a);
const V=s=>{s=String(s).replace(/,/g,'').replace(/\s*(cm²|cm³|cm|mm|km|m²|m|°|개|명|원|번|자루|장|살|일|분|초|시간|kg|g|mL|L|%|배|상자|권|컵|봉지)$/,'').trim();
  let m=s.match(/^(\d+)?\{\{(\d+)§(\d+)\}\}$/);if(m){const w=+(m[1]||0),n=+m[2],d=+m[3];return [w*d+n,d]}
  m=s.match(/^(\d+)\/(\d+)$/);if(m)return [+m[1],+m[2]];
  if(/^-?\d+(\.\d+)?$/.test(s)){const k=(s.split('.')[1]||'').length;return [Math.round(+s*10**k),10**k]}return null};
const eq=(a,b)=>a&&b&&a[0]*b[1]===b[0]*a[1];
const mul=(a,b)=>[a[0]*b[0],a[1]*b[1]],div=(a,b)=>[a[0]*b[1],a[1]*b[0]],add=(a,b)=>[a[0]*b[1]+b[0]*a[1],a[1]*b[1]],sub=(a,b)=>[a[0]*b[1]-b[0]*a[1],a[1]*b[1]];
const NUM='((?:\\d+)?\\{\\{\\d+§\\d+\\}\\}|[\\d,]+(?:\\.\\d+)?)';
const bad=[];const note=(k,m,p)=>bad.push(k+': '+m+' | '+p.q.replace(/\n/g,' / ')+' => '+JSON.stringify(p.x));
for(const k in GEN){for(let i=0;i<500;i++){const p=GEN[k]();
  const ans=p.t==='mc'?p.x[0]:String(p.x).split('|')[0];const av=V(ans);
  if(p.t==='mc'&&av){p.x.slice(1).forEach(o=>{if(eq(V(o),av))note(k,'같은 값 보기 '+o,p)})}
  if(p.t==='mc'&&p.x.slice(1).includes(ans))note(k,'정답 중복',p);
  // 사칙 계산식 검산 (분수·소수·자연수, 왼쪽부터 같은 우선순위 2항)
  const m=p.q.match(new RegExp('^'+NUM+' ([+−×÷]) '+NUM+' = \\?'));
  if(m&&!/몫과 나머지/.test(p.q)){const a=V(m[1]),b=V(m[3]);const r={'+':add,'−':sub,'×':mul,'÷':div}[m[2]](a,b);if(av&&!eq(r,av))note(k,'계산 틀림 (기대 '+r[0]/r[1]+')',p);
    if(av&&/§/.test(ans)){const mm=ans.match(/\{\{(\d+)§(\d+)\}\}/);if(G(+mm[1],+mm[2])!==1)note(k,'기약분수 아님',p);if(+mm[1]>=+mm[2])note(k,'대분수로 안 바꿈',p)}}
  const q=p.q.match(/^([\d,]+) ÷ (\d+)의 몫과 나머지는\?/);if(q){const n=+q[1].replace(/,/g,''),d=+q[2];if(ans!==`몫 ${Math.floor(n/d)}, 나머지 ${n%d}`)note(k,'몫나머지',p)}
  const bl=p.q.match(/^(\d+) \+ □ = 10/);if(bl&&+ans!==10-+bl[1])note(k,'□',p);
  const sq=p.q.match(/^□ ([+−×]) (\d+) = (\d+)/);if(sq){const b=+sq[2],c=+sq[3];const v={'+':c-b,'−':c+b,'×':c/b}[sq[1]];if(+ans!==v)note(k,'□식',p)}
  const sq2=p.q.match(/^(\d+) − □ = (\d+)/);if(sq2&&+ans!==+sq2[1]-+sq2[2])note(k,'□식2',p);
  const dv=p.q.match(/^(\d+) ÷ □ = (\d+)/);if(dv&&+ans*+dv[2]!==+dv[1])note(k,'□÷',p);
  const pr=p.q.match(/^(\d+) : (\d+) = (\d+) : □/);if(pr&&+pr[1]*+ans!==+pr[2]*+pr[3])note(k,'비례식',p);
  const pr2=p.q.match(/^(\d+) : □ = (\d+) : (\d+)/);if(pr2&&+pr2[1]*+pr2[3]!==+ans*+pr2[2])note(k,'비례식2',p);
  const av2=p.q.match(/^([\d, ]+)의 평균은\?/);if(av2){const L=av2[1].split(',').map(Number);if(L.reduce((a,b)=>a+b,0)/L.length!==+ans)note(k,'평균',p)}
  const ang=p.q.match(/^삼각형의 두 각이 (\d+)°, (\d+)°/);if(ang&&+ans!==180-+ang[1]-+ang[2])note(k,'각',p);
  const lcm=p.q.match(/^(\d+)와 (\d+)의 최소공배수/);if(lcm){const a=+lcm[1],b=+lcm[2];if(+ans!==a*b/G(a,b))note(k,'lcm',p)}
  const gc=p.q.match(/^(\d+)와 (\d+)의 최대공약수/);if(gc&&+ans!==G(+gc[1],+gc[2]))note(k,'gcd',p);
  const dg=p.q.match(/^([\d,]+)에서 숫자 (\d)(?:이|가|는) /);if(dg){const s=dg[1].replace(/,/g,'');const i=s.indexOf(dg[2]);if(s.split(dg[2]).length>2)note(k,'숫자 두 번',p);else if(+ans.replace(/,/g,'')!==+dg[2]*10**(s.length-1-i))note(k,'자릿값',p)}
  const ro=p.q.match(/^([\d,]+)을 (올림|버림|반올림)하여 (십|백|천)의/);if(ro){const v=+ro[1].replace(/,/g,''),u={십:10,백:100,천:1000}[ro[3]];const r=ro[2]==='올림'?Math.ceil(v/u)*u:ro[2]==='버림'?Math.floor(v/u)*u:Math.round(v/u)*u;if(+ans.replace(/,/g,'')!==r)note(k,'어림',p)}
}}
return bad}'''
async def main():
    srv=subprocess.Popen(['python3','-m','http.server','8765','--bind','127.0.0.1'],cwd='/home/claude/nm',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(1)
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page();await pg.goto('http://localhost:8765/app.html');await pg.wait_for_timeout(1000)
        bad=await pg.evaluate(JS);seen={}
        for x in bad:
            k=x.split(' | ')[0]
            seen.setdefault(k,[]).append(x)
        print('total',len(bad))
        for k,v in seen.items(): print(len(v),'×',v[0][:300])
        await b.close()
    srv.terminate()
asyncio.run(main())
