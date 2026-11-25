import asyncio,subprocess,time,json,sys
from playwright.async_api import async_playwright
async def main():
    srv=subprocess.Popen(['python3','-m','http.server','8765','--bind','127.0.0.1'],cwd='/home/claude/nm',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    time.sleep(1)
    async with async_playwright() as p:
        b=await p.chromium.launch()
        pg=await b.new_page()
        errs=[]
        pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('http://localhost:8765/app.html');await pg.wait_for_timeout(1500)
        res=await pg.evaluate(r'''()=>{
          const out={bad:[],cnt:{},samples:{}};
          const chk=(k,p)=>{const B=m=>out.bad.push(k+': '+m+' | '+JSON.stringify(p).slice(0,300));
            if(!p||!p.q)return B('no q');
            const all=[p.q,p.s,...(p.t==='self'?[]:Array.isArray(p.x)?p.x:[String(p.x)])].join(' ');
            if(/undefined|NaN|null|Infinity|\[object/.test(all))B('bad token');
            if(/\((가|를|는|은|이|을|과|와)\)/.test(all))B('josa');
            if(/[−+×÷] −|\(−/.test(all))B('neg');
            if(p.t==='mc'){if(!Array.isArray(p.x)||p.x.length<3)B('few opts '+(p.x||[]).length);if(new Set(p.x).size!==p.x.length)B('dup');if(p.x.some(v=>typeof v!=='string'))B('nonstr')}
            if(p.t==='sa'&&(p.x===''||p.x==null))B('empty sa');
            if(p.t==='ox'&&typeof p.x!=='boolean')B('ox');
            const html=fmt(p.q)+(p.t==='mc'?p.x.map(fmt).join(''):'')+fmt(p.s);if(/\{\{|§/.test(html))B('fmt left');
            // 산술 검산
            const m=p.q.match(/^([\d,.]+) ([+−×÷]) ([\d,.]+) = \?$/);
            if(m){const a=+m[1].replace(/,/g,''),b=+m[3].replace(/,/g,'');const v={'+':a+b,'−':a-b,'×':a*b,'÷':a/b}[m[2]];const ans=String(p.t==='mc'?p.x[0]:String(p.x).split('|')[0]).replace(/,/g,'');
              if(!/몫/.test(ans)&&!/§/.test(ans)&&Math.abs(+ans-v)>1e-9)B('arith '+v+' vs '+ans)}
          };
          for(const k in GEN){out.cnt[k]=0;out.samples[k]=[];for(let i=0;i<400;i++){let p;try{p=GEN[k]()}catch(e){out.bad.push(k+': throw '+e.message);break}chk(k,p);out.cnt[k]++;if(i<3)out.samples[k].push({q:p.q,x:p.x,s:p.s})}}
          // 개념 검사
          const used=new Set();CONCEPTS.forEach(c=>{(c.gen||[]).forEach(g=>{used.add(g);if(!GEN[g])out.bad.push(c.id+': missing gen '+g)});if(!UNITS[c.u])out.bad.push(c.id+' unit');if(!EXAMS[c.ex])out.bad.push(c.id+' ex');c.pr.forEach((p,i)=>chk(c.id+'-'+i,p));if(!c.bk||!c.bk.pts.length)out.bad.push(c.id+' bk');if(c.pic)try{c.pic()}catch(e){out.bad.push(c.id+' pic')}});
          out.unused=Object.keys(GEN).filter(k=>!used.has(k));
          out.per={};for(let g=1;g<=6;g++)for(const s of ['-1','-2'])out.per[g+s]=CONCEPTS.filter(c=>c.ex===g+s).length;
          out.n=CONCEPTS.length;return out}''')
        print('pageerrors',errs[:5]); print('concepts',res['n'],res['per']); print('unused',res['unused'])
        print('BAD',len(res['bad'])); 
        seen=set()
        for x in res['bad']:
            k=x.split(':')[0]+x.split('|')[0][-20:]
            if k in seen: continue
            seen.add(k); print(' ',x)
        json.dump(res['samples'],open('/home/claude/nm/test/samples.json','w'),ensure_ascii=False,indent=0)
        await b.close()
    srv.terminate()
asyncio.run(main())
