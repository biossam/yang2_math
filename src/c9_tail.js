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
for(const k in GEN){const f=GEN[k];GEN[k]=()=>{const p=f();if(p&&p.t==='mc'){const v=valOf(p.x[0]);if(v!=null)p.x=[p.x[0],...p.x.slice(1).filter(o=>{const w=valOf(o);return w==null||Math.abs(w-v)>1e-9})]}return p}}
