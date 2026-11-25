
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
function jsSvg(o,xmlns,pose){o=jsClean(o);pose=pose||'stand';const PZ=JS_POSE[pose]||JS_POSE.stand;if(PZ.face)o=Object.assign({},o,{face:PZ.face});if(PZ.noHold||PZ.R)o=Object.assign({},o,{hold:'none'});const OL=RM_OL,sk=JS_SKIN[o.skin],hc=JS_HC[o.hc],tc=JS_TC[o.tc],pc=JS_PC[o.pc];const st=`stroke="${OL}" stroke-width="1.6" stroke-linejoin="round"`;
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
  const legs=PZ.sit?`<path d="M15 66c0-2 2-3 4-3h22c2 0 4 1 4 3v4c0 3-2 5-5 5H20c-3 0-5-2-5-5z" fill="${pc}" ${st}/><path d="M30 66v8" stroke="${OL}" stroke-width="1.2"/><ellipse cx="16.5" cy="74" rx="4" ry="2.6" fill="${OL}"/><ellipse cx="43.5" cy="74" rx="4" ry="2.6" fill="${OL}"/>`:`<rect x="22" y="66" width="6.5" height="11" rx="2" fill="${pc}" ${st}/><rect x="31.5" y="66" width="6.5" height="11" rx="2" fill="${pc}" ${st}/><ellipse cx="25" cy="78.5" rx="5" ry="2.8" fill="${OL}"/><ellipse cx="35" cy="78.5" rx="5" ry="2.8" fill="${OL}"/>`;
  let armL=arm(20,50,14,61,sleeve),armR=o.hold==='none'?arm(40,50,46,61,sleeve):arm(40,50,47,55,sleeve);if(PZ.L)armL=arm(20,50,PZ.L[0],PZ.L[1],sleeve);if(PZ.R)armR=arm(40,50,PZ.R[0],PZ.R[1],sleeve);if(PZ.wave)armR=`<g class="jswv" style="transform-origin:40px 50px">${armR}</g>`;
  if(o.top==='dress')body=`${legs}<path d="M21 46h18l7 24H14z" fill="${tc}" ${st}/><path d="M16 64h28" stroke="#fff" stroke-width="1.6" stroke-dasharray="2 2"/>`;
  else body=`${legs}<path d="M20 49c0-3 2-4 5-4h10c3 0 5 1 5 4l1 19H19z" fill="${tc}" ${st}/>`;
  if(o.top==='apron')body+=`<path d="M23 50h14v17H23z" fill="#fff" ${st}/><path d="M23 50l-2-4M37 50l2-4" stroke="${OL}" stroke-width="1.2"/><g fill="#FFB8C6"><circle cx="30" cy="60" r="2.6"/><circle cx="26.8" cy="56.4" r="1.2"/><circle cx="29" cy="55" r="1.2"/><circle cx="31.4" cy="55" r="1.2"/><circle cx="33.4" cy="56.6" r="1.2"/></g>`;
  if(o.top==='hoodie')body+=`<path d="M24 60h12v6H24z" fill="none" ${st}/><path d="M27 46v6M33 46v6" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>`;
  if(o.top==='tee')body+=`<path d="M27 54c1-2 2-2 3 0 1-2 2-2 3 0-1 3-2 4-3 5-1-1-2-2-3-5z" fill="#FF7563"/>`;
  if(o.top==='suit')body+=`<path d="M30 46l-5 6 5 15 5-15z" fill="#fff" ${st}/><path d="M28 47h4l-1 2h-2z" fill="#FF7563" stroke="${OL}" stroke-width="1"/><circle cx="30" cy="58" r=".9" fill="${OL}"/><circle cx="30" cy="62" r=".9" fill="${OL}"/>`;
  body+=armL+armR;if(pose==='read')body+=`<g transform="translate(30 56)"><path d="M0 -5C-3 -7 -8 -7 -10 -5V5C-8 3 -3 3 0 5z" fill="#fff" ${st}/><path d="M0 -5C3 -7 8 -7 10 -5V5C8 3 3 3 0 5z" fill="#fff" ${st}/><path d="M-7 -2h5M-7 1h5M2 -2h5M2 1h5" stroke="#9AA9C9" stroke-width=".8"/></g>`;
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
  const ey=pose==='read'?32.5:31;const eye=(x)=>`<ellipse cx="${x}" cy="${ey}" rx="1.9" ry="2.5" fill="${OL}"/><circle cx="${x+.7}" cy="${ey-1}" r=".7" fill="#fff"/>`;
  const shut=(x)=>`<path d="M${x-2.2} 30.5q2.2 2.6 4.4 0" stroke="${OL}" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
  const arc=(x)=>`<path d="M${x-2.2} 31.5q2.2-2.8 4.4 0" stroke="${OL}" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
  face=(o.face==='shut'?shut(24)+shut(36):o.face==='happy'?arc(24)+arc(36):o.face==='wink'?eye(24)+arc(36):eye(24)+eye(36))+`<ellipse cx="20.5" cy="36" rx="2.6" ry="1.6" fill="#FFB8C6" opacity=".85"/><ellipse cx="39.5" cy="36" rx="2.6" ry="1.6" fill="#FFB8C6" opacity=".85"/>`+
    (o.face==='shut'&&pose==='sleep'?`<ellipse cx="30" cy="38.4" rx="1.2" ry="1" fill="#B5544A"/>`:o.face==='ooh'||pose==='stretch'?`<ellipse cx="30" cy="38" rx="1.8" ry="2.2" fill="#B5544A" stroke="${OL}" stroke-width="1"/>`:`<path d="M27 37q1.5 2.2 3 0q1.5 2.2 3 0" stroke="${OL}" stroke-width="1.3" fill="none" stroke-linecap="round"/>`);
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
  const zz=pose==='sleep'?`<text class="rmz" x="47" y="18" style="font-size:9px">z</text><text class="rmz z2" x="52" y="10" style="font-size:11px">Z</text>`:'';
  return `<svg ${xmlns?'xmlns="http://www.w3.org/2000/svg" width="480" height="672" ':''}viewBox="0 0 60 84"><g${PZ.sit?' transform="translate(0 4)"':''}>${back}${body}${head}${front}${face}${acc}${hold}</g>${zz}</svg>`}
// 집사 동작: 팔 끝 위치(L·R), 표정, 앉기 등
const JS_POSE={stand:{},
  wave:{R:[47,39],wave:1,face:'happy'},cheer:{L:[12,38],R:[48,38],face:'happy',noHold:1},
  stretch:{L:[17,33],R:[43,33],face:'shut',noHold:1},dance:{L:[11,42],R:[47,61],face:'happy',noHold:1},
  read:{L:[25,57],R:[35,57],noHold:1},pet:{R:[51,66],face:'happy'},
  sit:{sit:1,L:[17,62],R:[43,62]},sleep:{sit:1,L:[19,63],R:[41,63],face:'shut',noHold:1},
  think:{R:[33,41],noHold:1},clap:{L:[28,52],R:[32,52],face:'happy',noHold:1}};
const JS_ACTS=[['wave','👋 인사','안녕~!'],['cheer','🙌 만세','오늘도 해냈다!'],['dance','💃 춤','♪ 신난다~'],['clap','👏 박수','짝짝짝!'],['read','📖 책 읽기','수학책 읽는 중…'],['think','🤔 생각','음… 답이 뭘까?'],['stretch','🙆 기지개','으쌰~ 개운하다'],['sit','🪑 앉기','잠깐 쉬어야지'],['sleep','😴 낮잠','쿨쿨…'],['spin','🌀 빙글','빙글빙글~'],['pet','🤲 쓰다듬기','착하다~ 💗']];
let JS_PREV='stand';
// 미니홈피 탭
function jsTabHTML(){const o=rmLook();const R=rmS();
  const sw=(k,arr)=>`<div class="jsrow"><b>${{skin:'피부',hc:'머리 색',tc:'옷 색',pc:'바지·신발'}[k]}</b><div class="jssw">${arr.map((c,n)=>`<button class="${o[k]===n?'on':''}" data-jsopt="${k}:${n}" style="background:${c}" aria-label="${n+1}"></button>`).join('')}</div></div>`;
  const ch=(k,lab)=>`<div class="jsrow"><b>${lab}</b><div class="camopts">${JS_OPT[k].map(([v,t])=>`<button class="${o[k]===v?'on':''}" data-jsopt="${k}:${v}">${t}</button>`).join('')}</div></div>`;
  return `<div class="jsbox"><div class="jsprev ${JS_PREV==='dance'?'jsdance':JS_PREV==='spin'?'jsspin':''}">${jsSvg(o,0,JS_PREV==='spin'?'stand':JS_PREV)}<span>${esc(R.name||'나')}</span></div><div class="jsbtns"><button class="rmbtn" data-jsrand>🎲 아무거나</button><button class="rmbtn" data-jsauto style="margin-top:8px">${R.jsAuto===false?'🧍 혼자 다니기 꺼짐':'🚶 혼자 다니기 켜짐'}</button></div></div>
   <div class="jsrow"><b>동작 보기</b><div class="camopts">${JS_ACTS.map(([k,t])=>`<button class="${JS_PREV===k?'on':''}" data-jsprev="${k}">${t}</button>`).join('')}</div></div>${ch('hair','머리 모양')}${sw('hc',JS_HC)}${sw('skin',JS_SKIN)}${ch('top','옷')}${sw('tc',JS_TC)}${sw('pc',JS_PC)}${ch('acc','꾸미기')}${ch('face','표정')}${ch('hold','손에 든 것')}
   <p class="rmhint" style="margin-top:12px">미니룸 바닥을 누르면 집사가 그리로 걸어가고, 가구를 누르면 앉거나 책을 읽어요. 혼자 다니기를 켜 두면 스스로 걷고, 춤추고, 책 읽고, 낮잠도 자며 친구들과 함께 지내요. 누르면 여러 가지로 반응하고, 친구랑 놀기와 셀카에도 나와요.</p>`}
function jsPose(el,pose,ms,say){const sv=el.querySelector('svg');if(sv)sv.outerHTML=jsSvg(rmLook(),0,pose==='spin'?'stand':pose);el.classList.remove('jsdance','jsspin','jscheer');void el.offsetWidth;
  if(pose==='dance')el.classList.add('jsdance');if(pose==='spin')el.classList.add('jsspin');if(pose==='cheer'||pose==='clap')el.classList.add('jscheer');el._pose=pose;
  if(say)jsSay(el,say);if(pose==='pet'){const h=document.createElement('i');h.className='jshrt';h.textContent='💗';el.appendChild(h);setTimeout(()=>h.remove(),1700)}
  clearTimeout(el._pt);if(ms)el._pt=setTimeout(()=>jsPose(el,'stand'),ms);el._busy=Date.now()+(ms||0)}
function jsSay(el,t){el.querySelectorAll('.jsbub').forEach(b=>b.remove());const h=document.createElement('i');h.className='jsbub';h.textContent=t;el.appendChild(h);setTimeout(()=>h.remove(),2200)}
function jsGo(el,x,y,then,keep){const x0=parseFloat(el.style.left);if(el._pose!=='stand')jsPose(el,'stand');el.classList.toggle('rmflip',x<x0);el.classList.add('rmwalk');el.style.left=x+'%';el.style.top=y+'%';el.style.zIndex=Math.round(y)+1;el._busy=Date.now()+2500;clearTimeout(el._t);el._t=setTimeout(()=>{el.classList.remove('rmwalk');if(keep){const R=rmS();R.jx=Math.round(x*10)/10;R.jy=Math.round(y*10)/10;save()}then&&then()},2400)}
function jsWalk(){const el=document.querySelector('#rmscene .rmjs');if(!el||RM_SEEK||RM_EDIT)return;if(Date.now()<(el._busy||0)||Date.now()<(el._manual||0))return;{const R=rmS();if(!R.jsTip){R.jsTip=1;save();toast('👆 바닥이나 가구를 누르면 집사가 그리로 가요')}if(R.jsAuto===false)return}if(el._pose&&el._pose!=='stand'&&Math.random()<.5)return;if(Math.random()<.3)return;
  const r=Math.random(),say=k=>Math.random()<.45?(JS_ACTS.find(a=>a[0]===k)||[])[2]:'';
  if(r<.4)return jsGo(el,10+Math.random()*80,78+Math.random()*18);
  if(r<.55){const cats=[...document.querySelectorAll('#rmscene .rmc')];if(cats.length){const c=cats[Math.floor(Math.random()*cats.length)];const cx=parseFloat(c.style.left),cy=parseFloat(c.style.top);if(cy>70){const side=cx>50?-7:7;return jsGo(el,Math.min(92,Math.max(8,cx+side)),Math.min(96,cy+1),()=>{el.classList.toggle('rmflip',side>0);jsPose(el,'pet',2600,say('pet'))})}}}
  const P=['wave','cheer','dance','clap','read','think','stretch','sit','sleep','spin'],W=[2,1,2,1,2,1,2,2,2,1];let t=Math.random()*W.reduce((a,b)=>a+b),k=0;while(t>W[k]){t-=W[k];k++}
  const p=P[k];jsPose(el,p,{read:6000,sit:5000,sleep:7000,spin:900,dance:3200}[p]||2600,say(p))}
const JS_SAY=['오늘도 3문제 풀었어!','다들 밥 먹었니? 🍡','공부 끝나면 놀아 줄게!','우리 애들 최고 💗','숨바꼭질 할 사람~?','간식 시간이다!','구구단 같이 외울 사람?','분수는 피자로 생각하면 쉬워!'];
document.addEventListener('click',e=>{const t=e.target.closest('[data-jsopt],[data-jsrand],[data-jsprev],[data-jsauto],#rmscene .rmjs');if(!t)return;e.preventDefault();e.stopPropagation();const o=rmLook();
  if(t.classList.contains('rmjs')){if(RM_EDIT||RM_SEEK)return;const r=Math.random();if(r<.4){jsPose(t,'stand');t.classList.remove('jsjump');void t.offsetWidth;t.classList.add('jsjump');jsSay(t,JS_SAY[Math.floor(Math.random()*JS_SAY.length)]);t._busy=Date.now()+2500;return}const a=JS_ACTS.filter(a=>!['sit','sleep','pet','read'].includes(a[0]))[Math.floor(Math.random()*7)];jsPose(t,a[0],a[0]==='spin'?900:2400,a[2]);return}
  if(t.dataset.jsauto!=null){const R=rmS();R.jsAuto=R.jsAuto===false;save();toast(R.jsAuto?'집사가 혼자서도 돌아다녀요':'이제 집사는 시킬 때만 움직여요');return rmRender()}
  if(t.dataset.jsprev){JS_PREV=JS_PREV===t.dataset.jsprev?'stand':t.dataset.jsprev;return rmRender()}
  if(t.dataset.jsrand!=null){const r=a=>Math.floor(Math.random()*a);Object.assign(o,{skin:r(JS_SKIN.length),hc:r(JS_HC.length),tc:r(JS_TC.length),pc:r(JS_PC.length)});['hair','top','acc','face','hold'].forEach(k=>o[k]=JS_OPT[k][r(JS_OPT[k].length)][0]);save();return rmRender()}
  const [k,v]=t.dataset.jsopt.split(':');o[k]=/^\d+$/.test(v)?+v:v;save();rmRender()},true);

// ===== 집사 직접 움직이기: 바닥을 누르면 그리로, 가구·친구를 누르면 그 옆으로 =====
const JS_AT={sofa:['sit','소파에 앉아야지'],cushion:['sit','폭신폭신~'],rug:['sit','여기 앉을래'],bed:['sleep','쿨쿨…'],desk:['read','공부 시작!'],shelf:['read','무슨 책 읽지?'],lamp:['read','불 켜고 책 읽기'],plant:['think','물 줄 때가 됐나?'],fish:['think','물고기 귀엽다~'],tower:['cheer','캣타워 멋지다!'],box:['think','상자 안에 누가 있나?'],window:['stretch','날씨 좋다~'],clock:['think','벌써 시간이…'],frame:['think','멋진 그림이야']};
function jsMark(sc,x,y){const m=document.createElement('i');m.className='jsmark';m.style.left=x+'%';m.style.top=y+'%';sc.appendChild(m);setTimeout(()=>m.remove(),900)}
document.addEventListener('click',e=>{if(typeof VIEW==='undefined'||VIEW!=='room'||RM_TAB!=='room'||RM_EDIT||RM_SEEK)return;const sc=e.target.closest('#rmscene');if(!sc)return;
  if(e.target.closest('.rmjs,button,a,input,.rmempty,[data-rmcam],[data-rmseek],[data-rmsnack],[data-rm]'))return;const el=sc.querySelector('.rmjs');if(!el)return;
  const sr=sc.getBoundingClientRect(),cl=(v,a,b)=>Math.max(a,Math.min(b,v));const pc=(cx,cy)=>[cl((cx-sr.left)/sr.width*100,6,94),cl((cy-sr.top)/sr.height*100,66,97)];
  el._manual=Date.now()+9000;clearTimeout(el._pt);
  const cat=e.target.closest('.rmc');
  if(cat){const r=cat.getBoundingClientRect();let [x,y]=pc(r.left+r.width/2,r.bottom);const side=x>50?-7:7;x=cl(x+side,6,94);jsGo(el,x,y,()=>{el.classList.toggle('rmflip',side>0);jsPose(el,'pet',2600,'착하다~ 💗')},1);return} // 친구 정보 창은 그대로 열려요
  const it=e.target.closest('.rmi');
  if(it){e.preventDefault();e.stopPropagation();const r=it.getBoundingClientRect();const R=rmS();const o=R.items.find(i=>String(i.id)===it.dataset.rmi);const act=JS_AT[o&&o.k]||['wave','여기 좋다!'];
    let [x,y]=pc(r.left+r.width/2,r.bottom+(act[0]==='sit'||act[0]==='sleep'?-r.height*.25:6));if(r.width/sr.width>.2&&act[0]!=='sit'&&act[0]!=='sleep')x=cl(x+(x>50?-12:12),6,94);
    jsGo(el,x,y,()=>{if(act[0]==='sit'||act[0]==='sleep')el.style.zIndex=(parseInt(getComputedStyle(it).zIndex)||Math.round(y))+2;jsPose(el,act[0],act[0]==='sleep'?6000:act[0]==='read'?5000:3200,act[1])},1);return}
  e.preventDefault();e.stopPropagation();const [x,y]=pc(e.clientX,e.clientY);jsMark(sc,x,y);jsGo(el,x,y,()=>{if(Math.random()<.35)jsPose(el,pick(['wave','stretch','clap']),2200,'')},1)},true);
