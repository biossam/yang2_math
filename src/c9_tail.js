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
