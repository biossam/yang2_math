
// ===== JIBSA: 집사 캐릭터 =====
const JS_SKIN=['#FFE3CF','#F7CFAE','#E8B48B','#C98B62','#9A6444'];
const JS_HC=['#3B2A22','#6B4630','#B07A4A','#E8C16A','#2F3550','#E58FA6','#8C8C96'];
const JS_TC=['#FF9F7A','#7CD7C2','#8FB0F5','#FFD66B','#C9A7EB','#FFB8C6','#FFFFFF','#4A4F6B'];
const JS_PC=['#5B6B8C','#3B3F4F','#B08A6A','#7CA8D9','#E8A0B4'];
const JS_OPT={
  hair:[['short','짧은 머리'],['bob','단발'],['long','긴 머리'],['pony','포니테일'],['bun','똥머리'],['curly','곱슬']],
  top:[['apron','집사 앞치마'],['hoodie','동물 귀 후드'],['tee','티셔츠'],['dress','원피스'],['suit','집사 정장']],
  acc:[['none','없음'],['catears','동물 귀띠'],['ribbon','리본'],['glasses','동그란 안경'],['cap','모자'],['flower','꽃핀']],
  face:[['smile','방긋'],['wink','윙크'],['happy','행복'],['ooh','놀람']],
  hold:[['none','빈손'],['churu','츄르'],['wand','낚싯대'],['book','수학책'],['cat','아기 동물']]};
function rmLook(){const R=rmS();R.look=Object.assign({skin:0,hair:'short',hc:0,top:'apron',tc:0,pc:0,acc:'catears',face:'smile',hold:'none'},R.look||{});return R.look}
function jsClean(o){o=o||{};const pick=(k,arr)=>arr.some(a=>a[0]===o[k])?o[k]:arr[0][0];const n=(k,max)=>Math.max(0,Math.min(max-1,(+o[k]|0)));
  return {skin:n('skin',JS_SKIN.length),hair:pick('hair',JS_OPT.hair),hc:n('hc',JS_HC.length),top:pick('top',JS_OPT.top),tc:n('tc',JS_TC.length),pc:n('pc',JS_PC.length),acc:pick('acc',JS_OPT.acc),face:pick('face',JS_OPT.face),hold:pick('hold',JS_OPT.hold)}}
function jsSvg(o,xmlns){o=jsClean(o);const OL=RM_OL,sk=JS_SKIN[o.skin],hc=JS_HC[o.hc],tc=JS_TC[o.tc],pc=JS_PC[o.pc];const st=`stroke="${OL}" stroke-width="1.6" stroke-linejoin="round"`;
  let back='',front='',body='',acc='',hold='',face='';
  // 머리 뒤
  if(o.hair==='bob')back=`<path d="M11 28C11 9 49 9 49 28V44c0 3-5 3-5 0V32H16v12c0 3-5 3-5 0z" fill="${hc}" ${st}/>`;
  if(o.hair==='long')back=`<path d="M11 28C11 9 49 9 49 28V62c0 3-6 3-6 0V34H17v28c0 3-6 3-6 0z" fill="${hc}" ${st}/>`;
  if(o.hair==='pony')back=`<path d="M44 16c10-2 14 8 10 18-2 5-6 6-6 2 2-6 0-12-6-14z" fill="${hc}" ${st}/>`;
  if(o.hair==='bun')back=`<circle cx="30" cy="10" r="7" fill="${hc}" ${st}/>`;
  if(o.hair==='curly')back=`<g fill="${hc}" ${st}>${[[13,24],[11,33],[14,41],[47,24],[49,33],[46,41]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5"/>`).join('')}</g>`;
  // 몸
  const arm=(x1,y1,x2,y2,c)=>`<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${OL}" stroke-width="6.4" stroke-linecap="round"/><path d="M${x1} ${y1}L${x2} ${y2}" stroke="${c}" stroke-width="4" stroke-linecap="round"/><circle cx="${x2}" cy="${y2+1}" r="2.8" fill="${sk}" ${st}/>`;
  const sleeve=o.top==='apron'?tc:tc;
  const legs=`<rect x="22" y="66" width="6.5" height="11" rx="2" fill="${pc}" ${st}/><rect x="31.5" y="66" width="6.5" height="11" rx="2" fill="${pc}" ${st}/><ellipse cx="25" cy="78.5" rx="5" ry="2.8" fill="${OL}"/><ellipse cx="35" cy="78.5" rx="5" ry="2.8" fill="${OL}"/>`;
  const armL=arm(20,50,14,61,sleeve),armR=o.hold==='none'?arm(40,50,46,61,sleeve):arm(40,50,47,55,sleeve);
  if(o.top==='dress')body=`${legs}<path d="M21 46h18l7 24H14z" fill="${tc}" ${st}/><path d="M16 64h28" stroke="#fff" stroke-width="1.6" stroke-dasharray="2 2"/>`;
  else body=`${legs}<path d="M20 49c0-3 2-4 5-4h10c3 0 5 1 5 4l1 19H19z" fill="${tc}" ${st}/>`;
  if(o.top==='apron')body+=`<path d="M23 50h14v17H23z" fill="#fff" ${st}/><path d="M23 50l-2-4M37 50l2-4" stroke="${OL}" stroke-width="1.2"/><g fill="#FFB8C6"><circle cx="30" cy="60" r="2.6"/><circle cx="26.8" cy="56.4" r="1.2"/><circle cx="29" cy="55" r="1.2"/><circle cx="31.4" cy="55" r="1.2"/><circle cx="33.4" cy="56.6" r="1.2"/></g>`;
  if(o.top==='hoodie')body+=`<path d="M24 60h12v6H24z" fill="none" ${st}/><path d="M27 46v6M33 46v6" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>`;
  if(o.top==='tee')body+=`<path d="M27 54c1-2 2-2 3 0 1-2 2-2 3 0-1 3-2 4-3 5-1-1-2-2-3-5z" fill="#FF7563"/>`;
  if(o.top==='suit')body+=`<path d="M30 46l-5 6 5 15 5-15z" fill="#fff" ${st}/><path d="M28 47h4l-1 2h-2z" fill="#FF7563" stroke="${OL}" stroke-width="1"/><circle cx="30" cy="58" r=".9" fill="${OL}"/><circle cx="30" cy="62" r=".9" fill="${OL}"/>`;
  body+=armL+armR;
  // 고양이 후드 귀(머리 뒤에)
  if(o.top==='hoodie')back=`<path d="M10 30C9 8 51 8 50 30l-2 14H12z" fill="${tc}" ${st}/><path d="M13 16l1-11 9 6zM47 16l-1-11-9 6z" fill="${tc}" ${st}/><path d="M15 13l.6-5 4 3zM45 13l-.6-5-4 3z" fill="#FFB8C6"/>`+back;
  // 머리
  const head=`<circle cx="15" cy="31" r="3" fill="${sk}" ${st}/><circle cx="45" cy="31" r="3" fill="${sk}" ${st}/><circle cx="30" cy="28" r="16.5" fill="${sk}" ${st}/>`;
  const bang={short:`M13.5 27C13 12 47 12 46.5 27C44 21 39 19 35.5 22.5C32.5 18 26 18.5 23.5 22.5C20 20.5 15.5 22 13.5 27z`,
    bob:`M13.5 28C13 12 47 12 46.5 28C40 26 35 23 32 19C28 24 21 27 13.5 28z`,long:`M13.5 28C13 12 47 12 46.5 28C40 26 35 23 32 19C28 24 21 27 13.5 28z`,
    pony:`M13.5 27C13 12 47 12 46.5 27C43 22 37 21 33 17C30 22 20 24 13.5 27z`,bun:`M13.5 26C13 12 47 12 46.5 26C42 22 34 19 30 21C26 19 18 22 13.5 26z`,
    curly:`M13.5 27C13 12 47 12 46.5 27C45 23 42 22 40 23C39 20 35 19 33 21C31 18 27 18 25 21C23 19 19 20 18 23C16 22 14 24 13.5 27z`}[o.hair];
  front=o.top==='hoodie'&&o.hair!=='curly'?`<path d="${bang}" fill="${hc}" ${st} transform="translate(30 27) scale(.96) translate(-30 -27)"/>`:`<path d="${bang}" fill="${hc}" ${st}/>`;
  // 얼굴
  const eye=(x)=>`<ellipse cx="${x}" cy="31" rx="1.9" ry="2.5" fill="${OL}"/><circle cx="${x+.7}" cy="30" r=".7" fill="#fff"/>`;
  const arc=(x)=>`<path d="M${x-2.2} 31.5q2.2-2.8 4.4 0" stroke="${OL}" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
  face=(o.face==='happy'?arc(24)+arc(36):o.face==='wink'?eye(24)+arc(36):eye(24)+eye(36))+`<ellipse cx="20.5" cy="36" rx="2.6" ry="1.6" fill="#FFB8C6" opacity=".85"/><ellipse cx="39.5" cy="36" rx="2.6" ry="1.6" fill="#FFB8C6" opacity=".85"/>`+
    (o.face==='ooh'?`<ellipse cx="30" cy="38" rx="1.8" ry="2.2" fill="#B5544A" stroke="${OL}" stroke-width="1"/>`:`<path d="M27 37q1.5 2.2 3 0q1.5 2.2 3 0" stroke="${OL}" stroke-width="1.3" fill="none" stroke-linecap="round"/>`);
  // 꾸미기
  if(o.acc==='catears')acc=`<path d="M17 18l2-10 7 6zM43 18l-2-10-7 6z" fill="${OL}"/><path d="M19.5 15.5l1-5 3.5 3zM40.5 15.5l-1-5-3.5 3z" fill="#FFB8C6"/><path d="M15 21C18 12 42 12 45 21" stroke="${OL}" stroke-width="2" fill="none"/>`;
  if(o.acc==='ribbon')acc=`<g transform="translate(41 16) rotate(20)"><path d="M0 0l-7-4v8zM0 0l7-4v8z" fill="#FF7563" ${st}/><circle r="2" fill="#FF9F7A" ${st}/></g>`;
  if(o.acc==='glasses')acc=`<circle cx="24" cy="31" r="4.4" fill="rgba(255,255,255,.25)" stroke="${OL}" stroke-width="1.4"/><circle cx="36" cy="31" r="4.4" fill="rgba(255,255,255,.25)" stroke="${OL}" stroke-width="1.4"/><path d="M28.4 31h3.2" stroke="${OL}" stroke-width="1.4"/>`;
  if(o.acc==='cap')acc=`<path d="M13 22C13 8 47 8 47 22z" fill="#5B8DEF" ${st}/><path d="M30 22h19c2 0 2 3 0 3H30z" fill="#4A78D6" ${st}/><g fill="#fff"><circle cx="30" cy="15" r="2"/><circle cx="27.4" cy="12" r=".9"/><circle cx="30" cy="11" r=".9"/><circle cx="32.6" cy="12" r=".9"/></g>`;
  if(o.acc==='flower')acc=`<g transform="translate(18 17)">${[0,72,144,216,288].map(a=>`<ellipse rx="2.4" ry="3.6" transform="rotate(${a}) translate(0 -3)" fill="#FFB8C6" stroke="${OL}" stroke-width="1"/>`).join('')}<circle r="2" fill="#FFD66B" stroke="${OL}" stroke-width="1"/></g>`;
  // 손에 든 것
  if(o.hold==='churu')hold=`<g transform="translate(48 52) rotate(-25)"><rect x="-2.4" y="-9" width="4.8" height="12" rx="1.4" fill="#FFD66B" ${st}/><path d="M-2.4 -5h4.8" stroke="#FF7563" stroke-width="1.6"/></g>`;
  if(o.hold==='wand')hold=`<path d="M47 56L56 34" stroke="${OL}" stroke-width="1.6" stroke-linecap="round"/><path d="M56 34c2 4 1 8-2 10" stroke="${OL}" stroke-width=".9" fill="none"/><path d="M54 44c-3 1-4 4-2 6 2-1 3-3 2-6z" fill="#7CD7C2" stroke="${OL}" stroke-width="1"/>`;
  if(o.hold==='book')hold=`<g transform="translate(48 55) rotate(-12)"><rect x="-6" y="-7" width="12" height="14" rx="1.5" fill="#5B8DEF" ${st}/><path d="M-3 -1h6M0 -4v6" stroke="#fff" stroke-width="1.4"/></g>`;
  if(o.hold==='cat')hold=`<g transform="translate(50 53)"><ellipse cx="0" cy="2" rx="7" ry="5" fill="#FFC9A3" ${st}/><path d="M-6 -2l1-6 4 3zM6 -2l-1-6-4 3z" fill="#FFC9A3" ${st}/><circle cx="-2.4" cy="0" r=".9" fill="${OL}"/><circle cx="2.4" cy="0" r=".9" fill="${OL}"/><path d="M-1 2.4q1 1 2 0" stroke="${OL}" stroke-width=".8" fill="none"/></g>`;
  return `<svg ${xmlns?'xmlns="http://www.w3.org/2000/svg" width="480" height="672" ':''}viewBox="0 0 60 84">${back}${body}${head}${front}${face}${acc}${hold}</svg>`}
// 미니홈피 탭
function jsTabHTML(){const o=rmLook();const R=rmS();
  const sw=(k,arr)=>`<div class="jsrow"><b>${{skin:'피부',hc:'머리 색',tc:'옷 색',pc:'바지·신발'}[k]}</b><div class="jssw">${arr.map((c,n)=>`<button class="${o[k]===n?'on':''}" data-jsopt="${k}:${n}" style="background:${c}" aria-label="${n+1}"></button>`).join('')}</div></div>`;
  const ch=(k,lab)=>`<div class="jsrow"><b>${lab}</b><div class="camopts">${JS_OPT[k].map(([v,t])=>`<button class="${o[k]===v?'on':''}" data-jsopt="${k}:${v}">${t}</button>`).join('')}</div></div>`;
  return `<div class="jsbox"><div class="jsprev">${jsSvg(o)}<span>${esc(R.name||'나')}</span></div><div class="jsbtns"><button class="rmbtn" data-jsrand>🎲 아무거나</button></div></div>
   ${ch('hair','머리 모양')}${sw('hc',JS_HC)}${sw('skin',JS_SKIN)}${ch('top','옷')}${sw('tc',JS_TC)}${sw('pc',JS_PC)}${ch('acc','꾸미기')}${ch('face','표정')}${ch('hold','손에 든 것')}
   <p class="rmhint" style="margin-top:12px">만든 집사는 미니룸에서 친구들과 함께 지내고, 친구랑 놀기와 셀카에도 나와요.</p>`}
function jsWalk(){const el=document.querySelector('#rmscene .rmjs');if(!el||RM_SEEK||RM_EDIT)return;if(Math.random()<.55)return;const x0=parseFloat(el.style.left),x=10+Math.random()*80,y=78+Math.random()*18;el.classList.toggle('rmflip',x<x0);el.classList.add('rmwalk');el.style.left=x+'%';el.style.top=y+'%';el.style.zIndex=Math.round(y)+1;clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('rmwalk'),2400)}
const JS_SAY=['오늘도 3문제 풀었어!','다들 밥 먹었니? 🍡','공부 끝나면 놀아 줄게!','우리 애들 최고 💗','숨바꼭질 할 사람~?','츄르 시간이다!'];
document.addEventListener('click',e=>{const t=e.target.closest('[data-jsopt],[data-jsrand],#rmscene .rmjs');if(!t)return;e.preventDefault();e.stopPropagation();const o=rmLook();
  if(t.classList.contains('rmjs')){if(RM_EDIT||RM_SEEK)return;t.classList.remove('jsjump');void t.offsetWidth;t.classList.add('jsjump');const h=document.createElement('i');h.className='jsbub';h.textContent=JS_SAY[Math.floor(Math.random()*JS_SAY.length)];t.appendChild(h);setTimeout(()=>h.remove(),2200);return}
  if(t.dataset.jsrand!=null){const r=a=>Math.floor(Math.random()*a);Object.assign(o,{skin:r(JS_SKIN.length),hc:r(JS_HC.length),tc:r(JS_TC.length),pc:r(JS_PC.length)});['hair','top','acc','face','hold'].forEach(k=>o[k]=JS_OPT[k][r(JS_OPT[k].length)][0]);save();return rmRender()}
  const [k,v]=t.dataset.jsopt.split(':');o[k]=/^\d+$/.test(v)?+v:v;save();rmRender()},true);
