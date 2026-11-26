// ===== 초등 수학: 단원(학년 × 4영역) =====
const DOM={N:'수와 연산',R:'변화와 관계',G:'도형과 측정',D:'자료와 가능성'};
const UNITS={};for(let g=1;g<=6;g++)for(const k in DOM)UNITS[g+k]={g,t:DOM[k]};
const P=(l,t,q,x,s)=>({l,t,q,x,s});
// ===== 초등 문제 도우미 =====
const gcd=(a,b)=>b?gcd(b,a%b):a, lcm=(a,b)=>a/gcd(a,b)*b;
const F=(n,d)=>`{{${n}§${d}}}`;                      // 분수 표시
const red=(n,d)=>{const g=gcd(n,d);return [n/g,d/g]};
const FM=(n,d)=>{const w=Math.floor(n/d),r=n%d;if(!r)return String(w);return (w?String(w):'')+F(r,d)}; // 대분수 표시
const FR=(n,d)=>{[n,d]=red(n,d);return d===1?String(n):F(n,d)};   // 기약분수(가분수 그대로)
const FRM=(n,d)=>{[n,d]=red(n,d);return FM(n,d)};                  // 기약분수(대분수로)
const FS=(n,d)=>{[n,d]=red(n,d);return d===1?String(n):n+'/'+d};   // 입력 정답용 a/b
const cm=n=>Number(n).toLocaleString('en-US');                       // 1,234
const dc=(x,k=4)=>String(+(+x).toFixed(k));                          // 소수 표시 (오차 없애기)
const sa=(l,q,x,s)=>({l,t:'sa',q,x:String(x),s});
const ox=(l,q,v,s)=>({l,t:'ox',q,x:!!v,s});
const fig=(p,f)=>{p.fig=f;return p};
const tm=(h,m)=>m?`${h}시 ${m}분`:`${h}시`;
const numDs=(n,step=1)=>[n+step,n-step,n+2*step,n-2*step,n+10*step,n+3*step].filter(v=>v>=0&&v!==n);
const mcn=(l,q,ans,s,extra=[],step=1)=>mc(l,q,cm(ans),extra.map(v=>typeof v==='number'?cm(v):v).concat(numDs(ans,step).map(cm)),s);
const mcd=(l,q,ans,s,extra=[],step=.1)=>mc(l,q,dc(ans),extra.map(v=>typeof v==='number'?dc(v):v).concat(numDs(ans,step).map(v=>dc(v))),s);
const KO=['영','하나','둘','셋','넷','다섯','여섯','일곱','여덟','아홉'];
const ORD=['','첫째','둘째','셋째','넷째','다섯째','여섯째','일곱째','여덟째','아홉째'];
const NAMES=['민준','서연','도윤','하은','지호','수아','예준','지유','시우','하린'];
const ITEMS=[['사탕','개'],['구슬','개'],['연필','자루'],['딸기','개'],['스티커','장'],['쿠키','개'],['색종이','장'],['풍선','개']];
const josa=(w,a,b)=>{const c=String(w).charCodeAt(String(w).length-1);if(c>=48&&c<=57){return '013678'.includes(String(w).slice(-1))?w+a:w+b}const k=c-0xAC00;return w+((k>=0&&k<11172&&k%28)?a:b)};
// ===== 그림 (SVG) =====
const SV=(w,h,body,cls='')=>`<svg class="mfig ${cls}" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-hidden="true">${body}</svg>`;
const INK='#4A3B34',PAL=['#FF9F7A','#7CD7C2','#8FB0F5','#FFD66B','#C9A7EB','#FFB8C6'];
function figClock(h,m){const cx=60,cy=60;let t=`<circle cx="60" cy="60" r="54" fill="#FFFDF7" stroke="${INK}" stroke-width="3"/>`;
  for(let i=0;i<60;i++){const a=i*6*Math.PI/180,r1=i%5?50:46;t+=`<line x1="${cx+50*Math.sin(a)}" y1="${cy-50*Math.cos(a)}" x2="${cx+r1*Math.sin(a)}" y2="${cy-r1*Math.cos(a)}" stroke="${INK}" stroke-width="${i%5?1:2}"/>`}
  for(let n=1;n<=12;n++){const a=n*30*Math.PI/180;t+=`<text x="${cx+38*Math.sin(a)}" y="${cy-38*Math.cos(a)+5}" font-size="13" text-anchor="middle" fill="${INK}" font-weight="700">${n}</text>`}
  const ha=((h%12)+m/60)*30*Math.PI/180,ma=m*6*Math.PI/180;
  t+=`<line x1="60" y1="60" x2="${cx+24*Math.sin(ha)}" y2="${cy-24*Math.cos(ha)}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><line x1="60" y1="60" x2="${cx+40*Math.sin(ma)}" y2="${cy-40*Math.cos(ma)}" stroke="#FF7563" stroke-width="3" stroke-linecap="round"/><circle cx="60" cy="60" r="4" fill="${INK}"/>`;
  return SV(120,120,t)}
function figFracBar(n,d,col='#7CD7C2'){const W=Math.min(240,d*30),w=W/d;let t='';for(let i=0;i<d;i++)t+=`<rect x="${2+i*w}" y="4" width="${w}" height="30" fill="${i<n?col:'#fff'}" stroke="${INK}" stroke-width="2"/>`;return SV(W+4,38,t)}
function figFracCircle(n,d,col='#FFD66B'){const r=46,cx=50,cy=50;let t='';if(d===1)return SV(100,100,`<circle cx="50" cy="50" r="46" fill="${n?col:'#fff'}" stroke="${INK}" stroke-width="2"/>`);
  for(let i=0;i<d;i++){const a0=i/d*2*Math.PI-Math.PI/2,a1=(i+1)/d*2*Math.PI-Math.PI/2;t+=`<path d="M50 50 L${cx+r*Math.cos(a0)} ${cy+r*Math.sin(a0)} A${r} ${r} 0 ${1/d>.5?1:0} 1 ${cx+r*Math.cos(a1)} ${cy+r*Math.sin(a1)}Z" fill="${i<n?col:'#fff'}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`}return SV(100,100,t)}
function figDots(n,per=5,col='#FF9F7A'){const rows=Math.ceil(n/per)||1;let t='';for(let i=0;i<n;i++){const x=16+(i%per)*26,y=16+Math.floor(i/per)*26;t+=`<circle cx="${x}" cy="${y}" r="10" fill="${col}" stroke="${INK}" stroke-width="2"/>`}return SV(per*26+6,rows*26+6,t)}
function figGroups(a,b){let t='';const gw=Math.min(5,a)*16+12,gh=Math.ceil(a/5)*16+12;for(let g=0;g<b;g++){const ox=4+g*(gw+8);t+=`<rect x="${ox}" y="4" width="${gw}" height="${gh}" rx="10" fill="#FFF6E6" stroke="${INK}" stroke-width="1.6" stroke-dasharray="4 3"/>`;for(let i=0;i<a;i++)t+=`<circle cx="${ox+14+(i%5)*16}" cy="${18+Math.floor(i/5)*16}" r="6" fill="${PAL[g%6]}" stroke="${INK}" stroke-width="1.4"/>`}return SV(b*(gw+8)+4,gh+8,t)}
function figTens(tn,on){let t='';for(let i=0;i<tn;i++){const x=6+i*22;t+=`<rect x="${x}" y="6" width="14" height="90" rx="3" fill="#FFD66B" stroke="${INK}" stroke-width="1.8"/>`;for(let k=1;k<10;k++)t+=`<line x1="${x}" y1="${6+k*9}" x2="${x+14}" y2="${6+k*9}" stroke="${INK}" stroke-width=".8"/>`}
  for(let i=0;i<on;i++){t+=`<rect x="${10+tn*22+(i%3)*18}" y="${60+Math.floor(i/3)*-12-0}" width="12" height="12" rx="2" fill="#7CD7C2" stroke="${INK}" stroke-width="1.6"/>`}
  return SV(tn*22+70,102,t)}
function figPoly(n,col='#8FB0F5'){if(n===0)return SV(110,110,`<circle cx="55" cy="55" r="46" fill="${col}" stroke="${INK}" stroke-width="2.4"/>`);let p=[];for(let i=0;i<n;i++){const a=-Math.PI/2+i*2*Math.PI/n;p.push((55+46*Math.cos(a)).toFixed(1)+','+(58+46*Math.sin(a)).toFixed(1))}return SV(110,110,`<polygon points="${p.join(' ')}" fill="${col}" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>`)}
function figBar(labels,vals,unit,step){const H=130,mx=Math.max(...vals),top=Math.ceil(mx/step)*step||step,bw=34,W=40+labels.length*(bw+16);let t='';
  for(let v=0;v<=top;v+=step){const y=H-v/top*(H-16);t+=`<line x1="34" y1="${y}" x2="${W-4}" y2="${y}" stroke="#E6DCCB"/><text x="28" y="${y+4}" font-size="10" text-anchor="end" fill="${INK}">${v}</text>`}
  labels.forEach((l,i)=>{const x=44+i*(bw+16),h=vals[i]/top*(H-16);t+=`<rect x="${x}" y="${H-h}" width="${bw}" height="${h}" fill="${PAL[i%6]}" stroke="${INK}" stroke-width="1.6"/><text x="${x+bw/2}" y="${H+15}" font-size="11" text-anchor="middle" fill="${INK}">${l}</text>`});
  t+=`<line x1="34" y1="${H}" x2="${W-4}" y2="${H}" stroke="${INK}" stroke-width="1.6"/><text x="2" y="10" font-size="9" fill="${INK}">(${unit})</text>`;return SV(W,H+22,t)}
function figLine(labels,vals,unit,step){const H=130,mx=Math.max(...vals),mn=Math.min(...vals),lo=Math.max(0,Math.floor((mn-step)/step)*step),top=Math.ceil(mx/step)*step,gw=44,W=50+labels.length*gw;let t='';
  for(let v=lo;v<=top;v+=step){const y=H-(v-lo)/(top-lo)*(H-16);t+=`<line x1="40" y1="${y}" x2="${W-4}" y2="${y}" stroke="#E6DCCB"/><text x="34" y="${y+4}" font-size="10" text-anchor="end" fill="${INK}">${v}</text>`}
  const pts=vals.map((v,i)=>[60+i*gw,H-(v-lo)/(top-lo)*(H-16)]);t+=`<polyline points="${pts.map(p=>p.join(',')).join(' ')}" fill="none" stroke="#FF7563" stroke-width="2.6"/>`;
  pts.forEach((p,i)=>{t+=`<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="#fff" stroke="#FF7563" stroke-width="2.4"/><text x="${p[0]}" y="${H+15}" font-size="11" text-anchor="middle" fill="${INK}">${labels[i]}</text>`});
  t+=`<line x1="40" y1="${H}" x2="${W-4}" y2="${H}" stroke="${INK}" stroke-width="1.6"/><text x="2" y="10" font-size="9" fill="${INK}">(${unit})</text>`;return SV(W,H+22,t)}
function figRuler(st,len){const u=20,W=Math.max(st+len+1,8)*u+20;let t=`<rect x="10" y="40" width="${W-20}" height="30" fill="#FFF3C9" stroke="${INK}" stroke-width="1.6"/>`;
  for(let i=0;i<=(W-20)/u;i++){t+=`<line x1="${10+i*u}" y1="40" x2="${10+i*u}" y2="52" stroke="${INK}" stroke-width="1.4"/><text x="${10+i*u}" y="66" font-size="10" text-anchor="middle" fill="${INK}">${i}</text>`;if(i<(W-20)/u)t+=`<line x1="${10+i*u+u/2}" y1="40" x2="${10+i*u+u/2}" y2="46" stroke="${INK}"/>`}
  t+=`<rect x="${10+st*u}" y="14" width="${len*u}" height="18" rx="9" fill="#FF9F7A" stroke="${INK}" stroke-width="1.8"/>`;return SV(W,74,t)}
function figAngle(deg){const r=60,cx=20,cy=90,a=deg*Math.PI/180;const x2=cx+r*Math.cos(a),y2=cy-r*Math.sin(a);const ar=20;
  return SV(deg>90?150:110,100,`<g transform="translate(${deg>90?44:0},0)"><line x1="${cx}" y1="${cy}" x2="${cx+r+10}" y2="${cy}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><line x1="${cx}" y1="${cy}" x2="${x2}" y2="${y2}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>${deg===90?`<path d="M${cx+14} ${cy}V${cy-14}H${cx}" fill="none" stroke="#FF7563" stroke-width="2"/>`:`<path d="M${cx+ar} ${cy} A${ar} ${ar} 0 0 0 ${cx+ar*Math.cos(a)} ${cy-ar*Math.sin(a)}" fill="none" stroke="#FF7563" stroke-width="2.4"/>`}</g>`)}
function figRect(w,h,lw,lh,col='#C9A7EB'){const k=Math.min(150/w,80/h),W=w*k,H=h*k;return SV(W+60,H+40,`<rect x="30" y="10" width="${W}" height="${H}" fill="${col}" fill-opacity=".55" stroke="${INK}" stroke-width="2.2"/><text x="${30+W/2}" y="${H+28}" font-size="12" text-anchor="middle" fill="${INK}" font-weight="700">${lw}</text><text x="24" y="${10+H/2+4}" font-size="12" text-anchor="end" fill="${INK}" font-weight="700">${lh}</text>`)}
function figTri(lb,lh,b,h){b=b||8;h=h||5;const k=Math.min(160/(b*1.15),90/h),W=b*k,H=h*k,ax=20+W*.35;return SV(Math.round(W*1.15+40),Math.round(H+34),`<polygon points="20,${H+10} ${20+W},${H+10} ${ax},10" fill="#7CD7C2" fill-opacity=".6" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/><line x1="${ax}" y1="10" x2="${ax}" y2="${H+10}" stroke="#FF7563" stroke-width="1.8" stroke-dasharray="4 3"/><path d="M${ax} ${H+2}h8v8" fill="none" stroke="#FF7563" stroke-width="1.4"/><text x="${20+W/2}" y="${H+27}" font-size="12" text-anchor="middle" fill="${INK}" font-weight="700">${lb}</text><text x="${ax-5}" y="${10+H/2+4}" font-size="12" text-anchor="end" fill="#C0392B" font-weight="700">${lh}</text>`)}
function figPara(lb,lh,b,h){b=b||8;h=h||5;const off=Math.min(b*.35,h*.6),k=Math.min(170/(b+off),90/h),W=b*k,H=h*k,O=off*k,x0=14,xm=x0+O+Math.min(W*.4,W-10);return SV(Math.round(W+O+30),Math.round(H+34),`<polygon points="${x0},${H+10} ${x0+W},${H+10} ${x0+W+O},10 ${x0+O},10" fill="#FFD66B" fill-opacity=".6" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/><line x1="${xm}" y1="10" x2="${xm}" y2="${H+10}" stroke="#FF7563" stroke-width="1.8" stroke-dasharray="4 3"/><path d="M${xm} ${H+2}h8v8" fill="none" stroke="#FF7563" stroke-width="1.4"/><text x="${x0+W/2}" y="${H+27}" font-size="12" text-anchor="middle" fill="${INK}" font-weight="700">${lb}</text><text x="${xm+6}" y="${10+H/2+4}" font-size="12" fill="#C0392B" font-weight="700">${lh}</text>`)}
function figTrap(la,lb,lh,a,b,h){a=a||4;b=b||8;h=h||5;const k=Math.min(180/b,85/h),A=a*k,Bw=b*k,H=h*k,x0=14,ta=x0+(Bw-A)*.5,xm=x0+Bw/2;return SV(Math.round(Bw+30),Math.round(H+44),`<polygon points="${x0},${H+22} ${x0+Bw},${H+22} ${ta+A},22 ${ta},22" fill="#FFB8C6" fill-opacity=".6" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/><line x1="${xm}" y1="22" x2="${xm}" y2="${H+22}" stroke="#FF7563" stroke-width="1.8" stroke-dasharray="4 3"/><text x="${ta+A/2}" y="16" font-size="12" text-anchor="middle" fill="${INK}" font-weight="700">${la}</text><text x="${x0+Bw/2}" y="${H+39}" font-size="12" text-anchor="middle" fill="${INK}" font-weight="700">${lb}</text><text x="${xm+6}" y="${22+H/2+4}" font-size="12" fill="#C0392B" font-weight="700">${lh}</text>`)}
function figCircle(lab,kind){return SV(130,120,`<circle cx="62" cy="60" r="50" fill="#8FB0F5" fill-opacity=".35" stroke="${INK}" stroke-width="2.4"/><circle cx="62" cy="60" r="3" fill="${INK}"/>${kind==='d'?`<line x1="12" y1="60" x2="112" y2="60" stroke="#FF7563" stroke-width="2.4"/>`:`<line x1="62" y1="60" x2="112" y2="60" stroke="#FF7563" stroke-width="2.4"/>`}<text x="${kind==='d'?62:88}" y="54" font-size="12" text-anchor="middle" fill="#C0392B" font-weight="700">${lab}</text>`)}
function figPic(labels,vals,unit){const big=Math.floor,ic=(x,y,s)=>`<circle cx="${x}" cy="${y}" r="${s}" fill="#FFD66B" stroke="${INK}" stroke-width="1.4"/><circle cx="${x-s*.3}" cy="${y-s*.2}" r="${s*.14}" fill="${INK}"/><circle cx="${x+s*.3}" cy="${y-s*.2}" r="${s*.14}" fill="${INK}"/>`;let t='',W=300;
  labels.forEach((l,i)=>{const y=22+i*34;t+=`<text x="6" y="${y+5}" font-size="12" fill="${INK}" font-weight="700">${l}</text><line x1="60" y1="${y+17}" x2="${W}" y2="${y+17}" stroke="#E6DCCB"/>`;let x=74;for(let k=0;k<big(vals[i]/10);k++){t+=ic(x,y,11);x+=26}for(let k=0;k<vals[i]%10;k++){t+=ic(x,y+3,6);x+=15}});
  t+=`<g transform="translate(0,${labels.length*34+12})">${ic(20,6,11)}<text x="36" y="11" font-size="11" fill="${INK}">10${unit}</text>${ic(90,8,6)}<text x="100" y="11" font-size="11" fill="${INK}">1${unit}</text></g>`;return SV(W,labels.length*34+30,t)}
function figBox(a,b,c,la,lb,lc){// 가로 a(앞 밑변), 세로 b(안쪽으로 비스듬히), 높이 c(세로선) — 길이에 맞춰 그려요
  const k=Math.min(130/(a+b*.6),95/(c+b*.45)),W=a*k,H=c*k,dx=b*k*.6,dy=b*k*.45,x0=48,y0=10+dy;
  const P=(...q)=>q.map(p=>p.join(',')).join(' ');
  return SV(Math.round(x0+W+dx+44),Math.round(y0+H+26),`<polygon points="${P([x0,y0],[x0+W,y0],[x0+W,y0+H],[x0,y0+H])}" fill="#FFD66B" fill-opacity=".55" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/><polygon points="${P([x0,y0],[x0+dx,y0-dy],[x0+W+dx,y0-dy],[x0+W,y0])}" fill="#FFE9A8" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/><polygon points="${P([x0+W,y0],[x0+W+dx,y0-dy],[x0+W+dx,y0+H-dy],[x0+W,y0+H])}" fill="#F2C24E" fill-opacity=".7" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/><text x="${x0+W/2}" y="${y0+H+18}" font-size="12" text-anchor="middle" fill="${INK}" font-weight="700">${la}</text><text x="${x0+W+dx/2+6}" y="${y0+H-dy/2+12}" font-size="12" fill="${INK}" font-weight="700">${lb}</text><text x="${x0-5}" y="${y0+H/2+4}" font-size="12" text-anchor="end" fill="${INK}" font-weight="700">${lc}</text>`)}
function figShapesRow(list){// list of 'box','cyl','ball'
  const d={box:`<polygon points="6,22 36,22 36,52 6,52" fill="#FF9F7A" stroke="${INK}" stroke-width="1.8"/><polygon points="6,22 18,10 48,10 36,22" fill="#FFC2A8" stroke="${INK}" stroke-width="1.8"/><polygon points="36,22 48,10 48,40 36,52" fill="#E8835E" stroke="${INK}" stroke-width="1.8"/>`,
   cyl:`<path d="M8 14v34a17 6 0 0 0 34 0V14" fill="#7CD7C2" stroke="${INK}" stroke-width="1.8"/><ellipse cx="25" cy="14" rx="17" ry="6" fill="#B5EADD" stroke="${INK}" stroke-width="1.8"/>`,
   ball:`<circle cx="26" cy="31" r="21" fill="#8FB0F5" stroke="${INK}" stroke-width="1.8"/><path d="M12 24q14 8 28 0" stroke="#fff" stroke-width="2" fill="none"/>`};
  return SV(list.length*58,58,list.map((k,i)=>`<g transform="translate(${i*58},2)">${d[k]}</g>`).join(''))}
function figCubes(layers){// layers: 위에서 본 각 칸의 층 수 배열 (한 줄)
  let t='';const s=22;layers.forEach((h,i)=>{for(let k=0;k<h;k++){const x=8+i*s,y=90-(k+1)*s;t+=`<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${PAL[(i+k)%6]}" stroke="${INK}" stroke-width="1.6"/>`}});return SV(layers.length*s+16,96,t)}
// 숫자·분수 뒤 조사 고치기: 3을/2를, 1로/3으로, {{1§3}}을(3분의 1) …
function jfix(s){if(s==null)return s;s=String(s);const CON='013678',RIEUL='178';
  s=s.replace(/(\d)(이에요|예요)/g,(m,d)=>d+(CON.includes(d)?'이에요':'예요'));
  return s.replace(/(\d|\}\}|°|%)(을|를|이|가|은|는|과|와|으로|로)(?=[\s,.?!)」…·:]|$)/g,(m,pre,pt,off)=>{let d=pre;
    if(pre==='}}'){const st=s.lastIndexOf('{{',off);const num=s.slice(st+2,s.indexOf('§',st));d=num.slice(-1)}
    if(pre==='°'||pre==='%')d='2';
    if(!/\d/.test(d))return m;const con=CON.includes(d);
    const pairs={을:['을','를'],를:['을','를'],이:['이','가'],가:['이','가'],은:['은','는'],는:['은','는'],과:['과','와'],와:['과','와']};
    if(pt==='으로'||pt==='로')return pre+(con&&!RIEUL.includes(d)?'으로':'로');
    return pre+(con?pairs[pt][0]:pairs[pt][1])})}
