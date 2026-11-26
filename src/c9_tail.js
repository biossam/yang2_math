// ===== 데이터 색인 · 학년 범위 =====
const C={};CONCEPTS.forEach((c,i)=>{c.i=i;C[c.id]=c});
const EXAMS={};for(let g=1;g<=6;g++){EXAMS[g+'-1']=g+'학년 1학기';EXAMS[g+'-2']=g+'학년 2학기'}
const RANGES_G={};for(let g=1;g<=6;g++)RANGES_G[g]=[[g+'-1','1학기'],[g+'-2','2학기'],[g+'a',g+'학년 전체']];
const RANGES=[].concat(...Object.values(RANGES_G));
const gradeOfRange=r=>+String(r)[0]||1;
const subjOf=u=>UNITS[u].g+'학년';
const LV=['','기본','응용','도전'];
const TY={ox:'O, X',mc:'고르기',sa:'답 쓰기',self:'말로 설명하기'};
const INTERVAL=[0,1,2,4,7,14,30];
// 보기 중 정답과 값이 같은 것(예: {{2§4}}와 {{1§2}}, 0.5와 0.50)은 빼요
const valOf=s=>{s=String(s).replace(/,/g,'').replace(/\s*(cm²|cm³|cm|mm|km|m²|m|°|개|명|원|번|자루|장|살|일|분|초|시간|kg|g|mL|L|%|배|상자|권|컵|봉지)$/,'').trim();let m=s.match(/^(\d+)?\{\{(\d+)§(\d+)\}\}$/);if(m)return (+(m[1]||0)*+m[3]+ +m[2])/+m[3];if(/^\d+(\.\d+)?$/.test(s))return +s;return null};
// 분수 보기: 정답이 늘 가운데에 오지 않도록 순위를 섞는다 (같은 분모로 보기를 바꿔 넣음)
const frBal=p=>{const m=String(p.x[0]).match(/^(\d+)?\{\{(\d+)§(\d+)\}\}$/);if(!m)return;const q=+m[3],mixed=!!m[1];const V=p.x.map(valOf);if(V.some(v=>v==null))return;const a=V[0];
  const fm=N=>{if(N<=0||!Number.isInteger(N))return null;if(mixed){const w=Math.floor(N/q),r=N%q;return w&&r?`${w}{{${r}§${q}}}`:null}return `{{${N}§${q}}}`};
  let D=p.x.slice(1).map((x,i)=>({x,v:V[i+1]}));const r=ri(0,Math.min(3,D.length));let guard=0;
  while(guard++<6){const lo=D.filter(d=>d.v<a).length;if(lo===r)break;const all=[a,...D.map(d=>d.v)];
    if(lo>r){const i=D.findIndex(d=>d.v<a);let k=1,nx=null;while(k<8&&!nx){const N=Math.round(a*q)+k;const t=fm(N);if(t&&!D.some(d=>Math.abs(d.v-N/q)<1e-9))nx={x:t,v:N/q};k++}if(!nx)break;D.splice(i,1,nx)}
    else{const i=D.findIndex(d=>d.v>a);let k=1,nx=null;while(k<8&&!nx){const N=Math.round(a*q)-k;const t=fm(N);if(t&&!D.some(d=>Math.abs(d.v-N/q)<1e-9))nx={x:t,v:N/q};k++}if(!nx)break;D.splice(i,1,nx)}}
  p.x=[p.x[0],...D.map(d=>d.x)]};
for(const k in GEN){const f=GEN[k];GEN[k]=()=>{const p=f();if(p&&p.t==='mc'){const v=valOf(p.x[0]);if(v!=null)p.x=[p.x[0],...p.x.slice(1).filter(o=>{const w=valOf(o);return w==null||Math.abs(w-v)>1e-9})];frBal(p)}return p}}
