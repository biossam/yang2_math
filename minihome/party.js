
// ===== PARTY: 친구랑 놀기 (QR 초대 · 실시간) =====
const PT_URL=(()=>{try{const o=localStorage.getItem('ptURL');if(o)return o}catch(e){}return /^(localhost|127\.)/.test(location.hostname)?'http://localhost:8790':'https://nyangmeong-party.onrender.com'})();
const PT_SAYS=['👋 안녕!','😻 귀여워!','🎾 같이 놀자!','🍡 간식 줄게!','🙏 고마워!','🤣 ㅋㅋㅋ','💗 최고야!','👋 또 놀자!'];
const PT_TOYS=['🪶','🔴','🫧','🐭','⚽','🦋'],PT_SNACKS=['🍡','🥫','🍗','🥛'];
let PT=null;
const PT_COL=['#FF7563','#5B8DEF','#1FA88A','#B36AE2','#F2A516','#E2568F','#3FA9D8','#8A6A4F'];
function ptDefNick(){const R=rmS();if(R.ptNick)return R.ptNick;if(R.name)return R.name.slice(0,8);const a=['치즈','까망','하양','삼색','고등어','노랑','줄무늬','솜뭉치'],b=['냥','멍','꾹꾹','댕댕'];return a[Math.floor(Math.random()*a.length)]+b[Math.floor(Math.random()*b.length)]+(10+Math.floor(Math.random()*90))}
function ptColor(pid){const i=(PT&&PT.people||[]).findIndex(p=>p.pid===pid);return PT_COL[(i<0?0:i)%PT_COL.length]}
function ptEl(){let el=document.getElementById('rmparty');if(!el){el=document.createElement('div');el.id='rmparty';document.body.appendChild(el)}el.className='rmcam on';return el}
function ptNick(){const R=rmS();return (PT&&PT.nick)||R.name||''}
async function ptApi(path,body){const r=await fetch(PT_URL+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});let j={};try{j=await r.json()}catch(e){}if(!r.ok)throw Object.assign(new Error(j.err||'net'),{code:j.err||'net'});return j}
let PT_BLOCK=0;
async function ptWake(){PT_BLOCK=0;const t0=Date.now();let first=true;while(Date.now()-t0<90000){try{const c=new AbortController();const tm=setTimeout(()=>c.abort(),first?4000:15000);const t1=Date.now();const r=await fetch(PT_URL+'/health',{signal:c.signal,cache:'no-store'});clearTimeout(tm);let j=null;try{j=await r.json()}catch(e){}if(r.ok&&j&&j.ok)return true;if(r.ok){PT_BLOCK=(PT_BLOCK||0)+3}}catch(e){if(Date.now()-t0<20000&&e.name!=='AbortError')PT_BLOCK=(PT_BLOCK||0)+1}if((PT_BLOCK||0)>=4){PT_BLOCK=0;return false}
    if(first){first=false;ptMsg('⏳ 놀이터 문을 여는 중이에요','처음 열 때는 30초~1분쯤 걸려요. 잠시만 기다려 주세요!')}if(!PT)return false;await new Promise(r=>setTimeout(r,2500))}return false}
function ptMsg(t,sub,btn){const el=ptEl();el.innerHTML=`<div class="camwrap"><div class="camtop"><b>👫 친구랑 놀기</b><button class="camx" data-pt="close">✕</button></div><div class="ptmsg"><div class="ptspin"></div><b>${t}</b><p>${sub||''}</p>${btn||''}</div></div>`}
function ptSrvBox(){return `<details class="ptsrv"><summary>선생님용 · 놀이터 서버 주소 바꾸기</summary><input data-ptsrvin value="${esc(PT_URL)}" inputmode="url" autocomplete="off"><button class="cambtn" data-ptsrvsave>저장하고 다시 열기</button><button class="cambtn" data-ptsrvreset>처음 주소로</button></details>`}
function ptErr(e){const m={gone:'그 코드의 방이 없어요. 코드를 다시 확인하거나, 친구에게 방을 다시 열어 달라고 해요.',many:'방이 꽉 찼어요 (최대 8명).',slow:'너무 빨리 눌렀어요. 잠시 뒤에 다시 해 봐요.',full:'놀이터가 붐벼요. 잠시 뒤에 다시 해 봐요.',origin:'이 주소에서는 놀이터를 쓸 수 없어요.'}[e.code]||'인터넷 연결을 확인하고 다시 해 봐요.';
  ptMsg('😿 들어갈 수 없어요',m,'<button class="cambig" data-pt="menu">처음으로</button>')}
function ptOpen(code){if(PT&&PT.es)return ptPlay();PT={scr:code?'join':'menu',code:code||'',nick:ptDefNick(),bring:[]};ptDraw()}
function ptClose(){if(PT&&PT.es&&PT.pid){ptApi('/api/act',{code:PT.code,pid:PT.pid,tok:PT.tok,t:'leave'}).catch(()=>{})}ptStop();PT=null;const el=document.getElementById('rmparty');if(el){el.className='rmcam';el.innerHTML=''}if(VIEW==='room')render()}
function ptStop(){if(!PT)return;if(PT.es){PT.es.close();PT.es=null}PT.polling=false;clearInterval(PT.loop);clearTimeout(PT.rt);clearTimeout(PT.ht)}
function ptCatPick(max){const all=rmAll();return `<div class="camcats">${all.map(i=>`<button class="camc ${PT.bring.includes(i)?'on':''}" data-ptbring="${i}"><svg viewBox="0 -2 40 36" width="34" height="30">${bFace(BREEDS[i])}</svg><span>${esc(BREEDS[i].n)}</span></button>`).join('')||'<p class="camhint" style="text-align:left">아직 모은 친구가 없어요. 그래도 놀러 갈 수 있어요!</p>'}</div>`}
function ptDraw(){const el=ptEl();const R=rmS();const cur=rmCur(R);
  const nickIn=`<div class="camrow"><b>내 별명</b><input class="ptnick" data-ptnick maxlength="8" value="${esc(PT.nick)}" placeholder="별명을 꼭 써 주세요 (8자까지)"></div><p class="camhint" style="text-align:left;margin-top:0">진짜 이름 대신 별명을 써도 좋아요. 친구들에게 이 별명이 보여요.</p>`;
  if(PT.scr==='join'){el.innerHTML=`<div class="camwrap"><div class="camtop"><b>👫 친구 방에 놀러 가기</b><button class="camx" data-pt="close">✕</button></div>
    <div class="ptcard"><div class="camrow"><b>방 코드</b><input class="ptcode" data-ptcode inputmode="numeric" maxlength="4" value="${esc(PT.code)}" placeholder="0000"></div>${nickIn}
    <div class="camrow"><b>데려갈 내 친구</b><small>(최대 3마리)</small></div>${ptCatPick(3)}</div>
    <div class="cambtns"><button class="cambig" data-pt="join">🏃 놀러 가기</button></div><p class="camhint">놀이터에서는 정해진 말과 이모지만 쓸 수 있어요. 방은 놀이가 끝나면 사라져요.</p></div>`;return}
  const gs=(R.guests||[]).slice(-6).reverse();
  el.innerHTML=`<div class="camwrap"><div class="camtop"><b>👫 친구랑 놀기</b><button class="camx" data-pt="close">✕</button></div>
    <div class="ptcard">${nickIn}</div>
    <button class="ptbig" data-pt="host"><span>🏠</span><b>내 방에 친구 초대하기</b><small>${RM_RT[cur.t].e} ${esc(rmJ(cur.name,'을','를'))} 열고 QR을 보여 줘요 · 이 방 친구 ${rmLive().length}마리가 함께 있어요</small></button>
    <button class="ptbig b2" data-pt="tojoin"><span>🔢</span><b>코드로 친구 방에 놀러 가기</b><small>친구의 QR을 카메라로 찍거나, 4자리 코드를 넣어요</small></button>
    ${gs.length?`<div class="camrow"><b>최근 놀러 온 친구</b></div><div class="ptguests">${gs.map(g=>`<span>🐾 ${esc(g.n)} <small>${g.d}</small></span>`).join('')}</div>`:''}
    <p class="camhint">놀이터에서는 정해진 말과 이모지만 쓸 수 있어요. 방 정보는 놀이 중에만 잠깐 서버에 있고, 놀이가 끝나면 지워져요.</p></div>`}
async function ptStart(kind){const R=rmS();PT.nick=(PT.nick||'').trim();if(!PT.nick){toast('친구들이 알아볼 수 있게 별명을 써 주세요');const n=document.querySelector('#rmparty [data-ptnick]');if(n)n.focus();return}R.ptNick=PT.nick;save();
  if(kind==='join'&&!/^\d{4}$/.test(PT.code)){toast('4자리 방 코드를 넣어 주세요');return}
  ptMsg('🚪 놀이터로 가는 중…','');if(!await ptWake()){if(PT)ptMsg('😿 놀이터에 연결할 수 없어요',`학교·기관 인터넷에서는 놀이터 서버(<b>${esc(PT_URL.replace(/^https?:\/\//,''))}</b>)가 막혀 있을 수 있어요. 휴대폰 데이터로 해 보거나, 선생님께 이 주소를 열어 달라고 부탁해요.`,`<button class="cambig" data-pt="menu">처음으로</button>${ptSrvBox()}`);return}
  try{let j;if(kind==='host'){const cur=rmCur(R);j=await ptApi('/api/create',{nick:PT.nick,look:rmLook(),cats:rmLive().slice(0,12).map(i=>({i})),snap:{name:cur.name,t:cur.t,wall:cur.wall,floor:cur.floor,items:cur.items.map(it=>({k:it.k,x:it.x,y:it.y,f:it.f}))}})}
    else j=await ptApi('/api/join',{code:PT.code,nick:PT.nick,look:rmLook(),cats:PT.bring.map(i=>({i}))});
    Object.assign(PT,{code:j.code,pid:j.pid,tok:j.tok,host:kind==='host',st:{},people:[],scr:'play',qr:kind==='host'});ptConnect()}catch(e){if(PT)ptErr(e)}}
// 실시간 연결: 먼저 이벤트 스트림(SSE)을 쓰고, 6초 안에 첫 소식이 안 오면(학교 망 등) 1.2초마다 물어보기로 바꿔요
function ptConnect(){PT.since=0;PT.gotHello=false;let es;try{es=new EventSource(`${PT_URL}/api/events?code=${PT.code}&pid=${PT.pid}&tok=${encodeURIComponent(PT.tok)}`)}catch(e){return ptPollStart()}PT.es=es;
  PT.ht=setTimeout(()=>{if(PT&&!PT.gotHello)ptPollStart()},6000);
  es.onmessage=ev=>{if(!PT)return;let d;try{d=JSON.parse(ev.data)}catch(e){return}if(ev.lastEventId)PT.since=+ev.lastEventId;if(d.t==='hello')PT.gotHello=true;ptOn(d)};
  es.onerror=()=>{if(!PT)return;if(!PT.gotHello){return ptPollStart()}if(es.readyState===2){ptStop();ptMsg('👋 놀이가 끝났어요','방이 닫혔거나 연결이 끊겼어요.','<button class="cambig" data-pt="menu">처음으로</button>')}else{const b=document.getElementById('ptnet');if(b)b.style.display=''}};
  es.onopen=()=>{const b=document.getElementById('ptnet');if(b)b.style.display='none'}}
function ptPollStart(){if(!PT||PT.polling)return;clearTimeout(PT.ht);if(PT.es&&PT.es.close&&!PT.es.poll)PT.es.close();PT.polling=true;PT.es={poll:1,readyState:1,close(){if(PT)PT.polling=false}};PT.since=0;ptPollLoop()}
async function ptPollLoop(){let fails=0;while(PT&&PT.polling){try{const j=await ptApi('/api/poll',{code:PT.code,pid:PT.pid,tok:PT.tok,since:PT.since||0});if(!PT||!PT.polling)return;fails=0;const b=document.getElementById('ptnet');if(b)b.style.display='none';
    if(j.hello){PT.gotHello=true;ptOn(j.hello)}(j.evs||[]).forEach(d=>{if(PT)ptOn(d)});if(PT)PT.since=j.seq}
  catch(e){if(!PT||!PT.polling)return;if(e.code==='gone'||e.code==='auth'){ptStop();ptMsg('👋 놀이가 끝났어요','방이 닫혔거나 연결이 끊겼어요.','<button class="cambig" data-pt="menu">처음으로</button>');return}fails++;const b=document.getElementById('ptnet');if(b)b.style.display=''}
  await new Promise(r=>setTimeout(r,fails?2500:1200))}}
function ptKeys(){const o=[];if(!PT)return o;(PT.people||[]).forEach(p=>(p.cats||[]).forEach(c=>{if(BREEDS[c.i])o.push({k:p.pid+'-'+c.i,i:c.i,own:p.nick,pid:p.pid,host:p.host})}));return o}
function ptOn(d){if(d.t==='hello'){PT.snap=d.snap;PT.people=d.people;(d.pos||[]).forEach(p=>PT.st[p.k]=p);ptPlay();ptReward();if(d.seek)ptSeekStart(d.seek.hides,d.seek.found,null,true);return}
  if(d.t==='people'){const before=ptKeys().map(c=>c.k).join();PT.people=d.people;if(d.join){ptBubble(null,`🐾 ${esc(d.join)} 친구가 놀러 왔어요!`);if(PT.host){const R=rmS();R.guests=(R.guests||[]).concat({n:d.join,d:new Date().toLocaleDateString('ko-KR',{month:'numeric',day:'numeric'})}).slice(-30);save()}}
    if(d.left)ptBubble(null,`👋 ${esc(d.left)} 친구가 돌아갔어요`);const jb=[...document.querySelectorAll('#ptscene .ptjs')].map(x=>x.dataset.ptj).join();if(ptKeys().map(c=>c.k).join()!==before||jb!==(PT.people||[]).map(p=>p.pid).join())ptPlay();else{ptPeople();(PT.people||[]).forEach(p=>{const j=document.querySelector(`#ptscene [data-ptj="${p.pid}"]`);if(j)j.classList.toggle('off',!p.on)})}ptReward();return}
  if(d.t==='seek')return ptSeekStart(d.hides,{},d.by);
  if(d.t==='found')return ptFound(d);
  if(d.t==='seekend')return ptSeekEnd(d.score);
  if(d.t==='pos'){if(PT.seek)return;d.pos.forEach(p=>{const o=PT.st[p.k];PT.st[p.k]=p;const el=document.querySelector(`#ptscene [data-ptc="${p.k}"]`);if(el)ptApply(el,p,p.w&&o&&(o.x!==p.x||o.y!==p.y))});return}
  if(d.t==='toy')return ptToy(d.e,d.path,d.by);
  if(d.t==='snack')return ptSnack(d.e,d.x,d.y,d.by);
  if(d.t==='say')return ptBubble(d.by,PT_SAYS[d.m]);
  if(d.t==='pet'){const el=document.querySelector(`#ptscene [data-ptc="${d.k}"]`);const p=(PT.people||[]).find(x=>x.pid===d.by);if(el){const h=document.createElement('i');h.className='rmheart';h.textContent='💗';el.appendChild(h);setTimeout(()=>h.remove(),1600)}
    const [pid,i]=d.k.split('-');if(pid===PT.pid&&d.by!==PT.pid&&BREEDS[+i]){const R=rmS();R.love=R.love||{};R.love[+i]=(R.love[+i]||0)+1;save();ptBubble(null,`💗 ${esc(p?p.nick:'친구')}이(가) 내 ${esc(BREEDS[+i].n)}을(를) 쓰다듬었어요`)}return}
  if(d.t==='closed'){ptStop();ptMsg('👋 놀이가 끝났어요',d.why==='host'?'방 주인이 방을 닫았어요. 또 놀자!':'오래 쉬어서 방이 닫혔어요.','<button class="cambig" data-pt="menu">처음으로</button>')}}
function ptReward(){const on=(PT.people||[]).filter(p=>p.on).length;if(on<2)return;const R=rmS();const d=today();if(R.ptDay===d)return;R.ptDay=d;R.coins=(R.coins||0)+1;save();toast('👫 친구랑 놀기 보너스 ⭐1 (하루 한 번)')}
function ptApply(el,p,walk){const x0=parseFloat(el.style.left);if(Math.abs(p.x-x0)>.5)el.classList.toggle('rmflip',p.x<x0);if(walk){ptPose(el,'sit');el.classList.add('rmwalk')}
  el.style.left=p.x+'%';el.style.top=p.y+'%';el.style.zIndex=p.z;clearTimeout(el._t);el._t=setTimeout(()=>{el.classList.remove('rmwalk');ptPose(el,p.pose)},walk?2400:0)}
function ptPose(el,pose){if(el._pose===pose)return;el._pose=pose;const keep=[...el.querySelectorAll('.ptown,.rmheart')];el.innerHTML=rmPose(BREEDS[+el.dataset.i],pose);keep.forEach(k=>el.appendChild(k));el.classList.toggle('rmwide',pose==='sleep'||pose==='lie'||pose==='stretch')}
function ptPeople(){const b=document.getElementById('ptpeople');if(!b)return;b.innerHTML=(PT.people||[]).map(p=>`<span class="ptp ${p.on?'':'off'} ${p.pid===PT.pid?'me':''}" data-ptp="${p.pid}" style="--pc:${ptColor(p.pid)}">${p.host?'🏠':'🐾'} ${esc(p.nick)}${p.pid===PT.pid?' (나)':''}${p.on?'':' · 잠깐 나감'}</span>`).join('')}
function ptBubble(by,txt){const sc=document.getElementById('ptscene');if(!sc||!PT)return;const p=by&&(PT.people||[]).find(x=>x.pid===by);const b=document.createElement('div');b.className='ptbub';b.innerHTML=(p?`<b>${esc(p.nick)}</b> `:'')+txt;
  const box=document.getElementById('ptbubs');(box||sc).appendChild(b);setTimeout(()=>b.classList.add('out'),2600);setTimeout(()=>b.remove(),3200);
  if(p){const j=document.querySelector(`#ptscene [data-ptj="${by}"]`);if(j){j.classList.remove('jsjump');void j.offsetWidth;j.classList.add('jsjump');const h=document.createElement('i');h.className='jsbub';h.textContent=txt.replace(/<[^>]*>/g,'');j.appendChild(h);setTimeout(()=>h.remove(),2400)}const chip=document.querySelector(`#ptpeople [data-ptp="${by}"]`);if(chip){chip.classList.remove('talk');void chip.offsetWidth;chip.classList.add('talk')}}}
function ptPlay(){if(!PT||!PT.snap)return;const el=ptEl();const s=PT.snap;const W=RM_WALL[s.wall]||RM_WALL.cream,F=RM_FLOOR[s.floor]||RM_FLOOR.wood;const host=(PT.people||[]).find(p=>p.host);
  const keys=ptKeys();const url=location.origin+location.pathname+'?party='+PT.code;
  const cats=keys.map((c,n)=>{const p=PT.st[c.k]||{x:10+((c.i*37+n*23)%80),y:70+((c.i*13+n*7)%24),pose:'sit'};p.z=p.z||Math.round(p.y)+1;PT.st[c.k]=Object.assign({k:c.k},p);return `<div class="rmc" data-ptc="${c.k}" data-i="${c.i}" style="left:${p.x}%;top:${p.y}%;z-index:${p.z}">${rmPose(BREEDS[c.i],'sit')}<span class="ptown" style="background:${ptColor(c.pid)}">${c.pid===PT.pid?'나':(c.host?'🏠':'')+esc(c.own)}</span></div>`}).join('');
  const keep=RM_EDIT;RM_EDIT=false;const items=(s.items||[]).filter(it=>RM_ITEMS[it.k]).map(rmItemHTML).join('');RM_EDIT=keep;
  el.innerHTML=`<div class="camwrap"><div class="camtop"><b>👫 ${esc(host?host.nick:'친구')}의 ${esc(s.name)}</b><button class="camx" data-pt="close">✕</button></div>
    <div class="ptcodebar"><span>방 코드 <b>${PT.code}</b></span><button class="cambtn" data-pt="qr">📱 초대 QR ${PT.qr?'접기':'보기'}</button></div>
    ${PT.qr?`<div class="ptqr"><div id="ptqrimg">QR 만드는 중…</div><p>친구가 카메라로 찍거나, yang2수학 → 미니홈피 → 👫 → <b>코드 ${PT.code}</b>${jfix(PT.code+'를').slice(String(PT.code).length)} 넣으면 들어와요</p></div>`:''}
    <div class="ptpeople" id="ptpeople"></div>
    <div class="rmscene ptscene" id="ptscene"><div class="rmwall" style="background:${W.css}"></div><div class="rmfloor" style="background:${F.css}"></div>${items}${cats}${(PT.people||[]).map((p,n,a)=>{const x=a.length<2?50:12+76*n/(a.length-1),y=91-(n%2)*5;return `<div class="rmjs ptjs ${p.on?'':'off'}" data-ptj="${p.pid}" style="left:${x}%;top:${y}%;z-index:${Math.round(y)+1}">${jsSvg(p.look||{})}<span class="ptown" style="background:${ptColor(p.pid)}">${p.pid===PT.pid?'나':esc(p.nick)}</span></div>`}).join('')}<div class="ptbubs" id="ptbubs"></div><div class="ptnet" id="ptnet" style="display:none">📶 다시 연결하는 중…</div></div>
    <div class="ptbar"><b>놀잇감</b>${PT_TOYS.map(e=>`<button data-pttoy="${e}">${e}</button>`).join('')}</div>
    <div class="ptbar"><b>놀이</b><button class="ptseekbtn" data-pt="seek">🙈 다 같이 숨바꼭질</button></div>
    <div class="ptbar"><b>간식</b>${PT_SNACKS.map(e=>`<button data-ptsnack="${e}">${e}</button>`).join('')}</div>
    <div class="ptsays">${PT_SAYS.map((t,n)=>`<button data-ptsay="${n}">${t}</button>`).join('')}</div>
    <p class="camhint">친구를 누르면 누구네 친구인지 보고 쓰다듬을 수 있어요</p>
    <div class="cambtns"><button class="cambtn" data-pt="close">${PT.host?'🚪 방 닫고 나가기':'🏠 집으로 돌아가기'}</button></div></div>`;
  document.querySelectorAll('#ptscene .rmc').forEach(c=>{const p=PT.st[c.dataset.ptc];if(p&&p.pose)ptPose(c,p.pose)});
  ptPeople();if(PT.qr)ptQR(url);if(PT.host){clearInterval(PT.loop);PT.loop=setInterval(ptHostTick,3000);ptHostTick(true)}}
function ptQR(url){const draw=()=>{const box=document.getElementById('ptqrimg');if(!box)return;try{box.innerHTML=qrSVG(url,180)}catch(e){box.textContent='QR을 만들 수 없어요. 코드를 알려 주세요.'}};
  draw()}
function ptHostTick(initial){if(!PT||!PT.host||!PT.snap)return;if(PT.busy>Date.now()||PT.seek)return;const keys=ptKeys();if(!keys.length)return;
  const spots=[];(PT.snap.items||[]).forEach(it=>{if(RM_ITEMS[it.k])(RM_SPOTS[it.k]||[]).forEach((sp,j)=>spots.push({key:it.id+':'+j,it,sp}))});
  const used={};keys.forEach(c=>{const s=PT.st[c.k];if(s&&s.spot)used[s.spot]=1});const out=[];
  keys.forEach(c=>{let s=PT.st[c.k]||{k:c.k,x:50,y:80,z:81,pose:'sit'};let w=0;
    if(!initial&&Math.random()>(s.pose==='sleep'?.2:.5)){if(s.spot){delete used[s.spot];s.spot=null}const r=Math.random();const free=spots.filter(q=>!used[q.key]);
      if(r<.4&&free.length){const q=free[Math.floor(Math.random()*free.length)];const p=rmSpotPos(q.it,q.sp);used[q.key]=1;s={k:c.k,x:p.x,y:p.y,z:p.z,pose:q.sp[2],spot:q.key};w=1}
      else if(r<.55)s=Object.assign({},s,{pose:'sleep'});else if(r<.65)s=Object.assign({},s,{pose:'stretch'});else if(r<.72)s=Object.assign({},s,{pose:'lie'});else if(r<.8)s=Object.assign({},s,{pose:'wave'});
      else{const y=64+Math.random()*31;s={k:c.k,x:6+Math.random()*86,y,z:Math.round(y)+1,pose:'sit'};w=1}}
    PT.st[c.k]=s;out.push({k:c.k,x:+s.x.toFixed(1),y:+s.y.toFixed(1),z:s.z,pose:s.pose,w})});
  ptApi('/api/act',{code:PT.code,pid:PT.pid,tok:PT.tok,t:'pos',pos:out}).catch(()=>{})}
function ptGather(x,y){const keys=ptKeys();return keys.map((c,i)=>{const dx=(i%5-2)*5,dy=(Math.floor(i/5)-1)*4;const cx=Math.max(5,Math.min(95,x+dx)),cy=Math.max(64,Math.min(98,y+6+dy));return [c.k,cx,cy]})}
function ptRun(list,dur){if(PT&&PT.seek)return;list.forEach(([k,cx,cy])=>{const el=document.querySelector(`#ptscene [data-ptc="${k}"]`);if(!el)return;el.classList.toggle('rmflip',cx<parseFloat(el.style.left));ptPose(el,'sit');el.classList.add('rmwalk');el.style.transition=`left ${dur}s ease-out,top ${dur}s ease-out`;el.style.left=cx+'%';el.style.top=cy+'%';el.style.zIndex=Math.round(cy)+1})}
function ptRest(list){if(!PT||PT.seek)return;list.forEach(([k,cx,cy])=>{const el=document.querySelector(`#ptscene [data-ptc="${k}"]`);if(el){el.classList.remove('rmwalk');el.style.transition='';const h=document.createElement('i');h.className='rmheart';h.textContent='💗';el.appendChild(h);setTimeout(()=>h.remove(),1600)}
  if(PT.st[k])PT.st[k]=Object.assign(PT.st[k],{x:cx,y:cy,z:Math.round(cy)+1,pose:'sit',spot:null})})}
function ptToy(e,path,by){const sc=document.getElementById('ptscene');if(!sc||!path.length)return;PT.busy=Date.now()+path.length*1300+1500;const p=(PT.people||[]).find(x=>x.pid===by);if(p)ptBubble(by,`${e} 놀잇감을 흔들어요!`);
  const toy=document.createElement('div');toy.className='rmtoy';toy.textContent=e;sc.appendChild(toy);let n=0,last=[];
  const hop=()=>{if(!PT)return;if(PT.seek){toy.remove();return}const [x,y]=path[n];toy.style.left=x+'%';toy.style.top=y+'%';last=ptGather(x,y);ptRun(last,1.1);if(++n<path.length)setTimeout(hop,1300);else setTimeout(()=>{toy.remove();ptRest(last)},1300)};hop()}
function ptSnack(e,x,y,by){const sc=document.getElementById('ptscene');if(!sc)return;PT.busy=Date.now()+5000;ptBubble(by,`${e} 간식을 줬어요!`);const bowl=document.createElement('div');bowl.className='rmbowl';bowl.textContent=e;bowl.style.left=x+'%';bowl.style.top=y+'%';sc.appendChild(bowl);
  const list=ptGather(x,y-4);ptRun(list,1.6);setTimeout(()=>ptRest(list),1900);setTimeout(()=>bowl.remove(),4200)}
function ptCatCard(k){const c=ptKeys().find(x=>x.k===k);if(!c)return;const b=BREEDS[c.i];ask(catBig(b),esc(b.n),`<b>${esc(c.own)}</b>의 ${spName(b)}예요<br><span class="small">${esc(b.t)}</span>`+catCredit(b),[{t:'💗 쓰다듬기',cls:'go',fn:()=>{if(PT)ptApi('/api/act',{code:PT.code,pid:PT.pid,tok:PT.tok,t:'pet',k}).catch(()=>{})}}],'닫기')}
document.addEventListener('click',e=>{const t=e.target.closest('#rmparty [data-pt],#rmparty [data-ptbring],#rmparty [data-pttoy],#rmparty [data-ptsnack],#rmparty [data-ptsay],#rmparty [data-ptc],[data-rmparty]');if(!t)return;e.preventDefault();e.stopPropagation();
  if(t.dataset.rmparty!=null)return ptOpen();
  if(PT&&PT.seek&&t.dataset.ptc)return;
  if(!PT)return;const a=t.dataset.pt;const act=(o)=>ptApi('/api/act',Object.assign({code:PT.code,pid:PT.pid,tok:PT.tok},o)).catch(err=>{if(err.code==='slow')toast('조금 천천히 눌러 주세요');else if(err.code==='seeking')toast('벌써 숨바꼭질 중이에요!')});
  if(a==='close')return ptClose();
  if(a==='menu'){ptStop();PT={scr:'menu',code:'',nick:PT.nick,bring:[]};return ptDraw()}
  if(a==='tojoin'){PT.scr='join';return ptDraw()}
  if(a==='host')return ptStart('host');
  if(a==='join')return ptStart('join');
  if(a==='seek'){if(PT.seek)return;const h=ptMakeHides();if(!h.length){toast('숨을 친구가 없어요');return}act({t:'seek',hides:h});return}
  if(a==='qr'){PT.qr=!PT.qr;return ptPlay()}
  if(t.dataset.ptbring){const i=+t.dataset.ptbring;const k=PT.bring.indexOf(i);if(k>=0)PT.bring.splice(k,1);else{if(PT.bring.length>=3){toast('최대 3마리까지 데려갈 수 있어요');return}PT.bring.push(i)}t.classList.toggle('on',PT.bring.includes(i));return}
  if(t.dataset.pttoy){const path=[];for(let n=0;n<5;n++)path.push([+(10+Math.random()*80).toFixed(1),+(66+Math.random()*28).toFixed(1)]);return act({t:'toy',e:t.dataset.pttoy,path})}
  if(t.dataset.ptsnack)return act({t:'snack',e:t.dataset.ptsnack,x:+(15+Math.random()*70).toFixed(1),y:+(80+Math.random()*14).toFixed(1)});
  if(t.dataset.ptsay)return act({t:'say',m:+t.dataset.ptsay});
  if(t.dataset.ptc)return ptCatCard(t.dataset.ptc);
},true);
document.addEventListener('input',e=>{if(!PT)return;const t=e.target;if(t.matches('#rmparty [data-ptnick]'))PT.nick=t.value.slice(0,8);else if(t.matches('#rmparty [data-ptcode]')){t.value=t.value.replace(/\D/g,'').slice(0,4);PT.code=t.value}});
(()=>{try{const q=new URLSearchParams(location.search);const c=(q.get('party')||'').replace(/\D/g,'').slice(0,4);if(!c)return;q.delete('party');history.replaceState(null,'',location.pathname+(q.toString()?'?'+q:'')+location.hash);
  setTimeout(()=>{try{closeModal()}catch(e){}ptOpen(c)},700)}catch(e){}})();

// ----- 다 같이 숨바꼭질 -----
function ptMakeHides(){const sc=document.getElementById('ptscene');if(!sc||!PT||!PT.snap)return [];const ar=sc.clientWidth/sc.clientHeight||4/3;const spots=[];
  (PT.snap.items||[]).forEach(it=>{const I=RM_ITEMS[it.k];if(!I||I.p==='wall')return;if(['box','plant','sofa','shelf','lamp','tower','bed','fish','desk','bathtub','washer','basket','cushion'].includes(it.k)){
    const peekY=it.k==='box'||it.k==='basket'?it.y-I.w*ar*.18:it.y-I.w*ar*.12;spots.push({x:it.x,w:I.w,y:peekY,z:Math.round(it.y)-1})}});
  const edges=[{x:3,y:82,z:3},{x:97,y:90,z:3},{x:50,y:108,z:3},{x:3,y:99,z:3},{x:97,y:72,z:3},{x:25,y:108,z:3},{x:75,y:108,z:3}];
  const keys=ptKeys().map(c=>c.k).sort(()=>Math.random()-.5);const pool=spots.sort(()=>Math.random()-.5);
  return keys.map((k,i)=>{let h;if(i<pool.length){const q=pool[i];h={x:q.x+(Math.random()-.5)*q.w*.4,y:q.y,z:q.z}}else if(i-pool.length<edges.length)h=edges[i-pool.length];else{const q=pool.length?pool[i%pool.length]:edges[i%edges.length];h={x:q.x+(Math.random()-.5)*8,y:q.y,z:q.z}}
    return {k,x:+h.x.toFixed(1),y:+h.y.toFixed(1),z:h.z}})}
function ptSeekStart(hides,found,by,quiet){const sc=document.getElementById('ptscene');if(!sc)return;PT.seek={hides,found:Object.assign({},found||{}),score:{}};Object.values(PT.seek.found).forEach(q=>PT.seek.score[q]=(PT.seek.score[q]||0)+1);
  sc.classList.add('rmseeking');const place=()=>{Object.entries(hides).forEach(([k,h])=>{const el=sc.querySelector(`[data-ptc="${k}"]`);if(!el||PT.seek.found[k])return;clearTimeout(el._t);el.classList.remove('rmwalk');el.style.transition='none';ptPose(el,'sit');el.style.left=h.x+'%';el.style.top=h.y+'%';el.style.zIndex=h.z;el.classList.add('rmhid')});ptSeekBadge()};
  if(quiet)return place();const p=(PT.people||[]).find(x=>x.pid===by);
  const cover=document.createElement('div');cover.className='rmcover';cover.innerHTML=`<b>🙈 다 같이 눈 감아요!</b><span>${p?esc(p.nick)+' 친구가 숨바꼭질을 시작했어요 · ':''}하나, 둘, 셋…</span>`;sc.appendChild(cover);
  setTimeout(()=>{if(!PT||!PT.seek)return cover.remove();place();cover.innerHTML=`<b>🔍 친구 ${Object.keys(hides).length}마리를 먼저 찾아요!</b><span>먼저 누른 사람이 찾은 걸로 쳐요</span>`;setTimeout(()=>cover.classList.add('rmfade'),1600);setTimeout(()=>cover.remove(),2300)},1600)}
function ptSeekBadge(){const sc=document.getElementById('ptscene');if(!sc||!PT||!PT.seek)return;let b=sc.querySelector('.rmsbadge');if(!b){b=document.createElement('div');b.className='rmsbadge ptsb';sc.appendChild(b)}
  const n=Object.keys(PT.seek.found).length,t=Object.keys(PT.seek.hides).length;const sc2=Object.entries(PT.seek.score).sort((a,b)=>b[1]-a[1]).map(([pid,v])=>{const p=(PT.people||[]).find(x=>x.pid===pid);return `<i style="background:${ptColor(pid)}">${esc(p?(pid===PT.pid?'나':p.nick):'?')} ${v}</i>`}).join('');
  b.innerHTML=`🔍 ${n} / ${t}${sc2?' '+sc2:''}`}
function ptFound(d){if(!PT||!PT.seek)return;PT.seek.found[d.k]=d.by;PT.seek.score[d.by]=(PT.seek.score[d.by]||0)+1;const el=document.querySelector(`#ptscene [data-ptc="${d.k}"]`);const p=(PT.people||[]).find(x=>x.pid===d.by);
  if(el){el.classList.remove('rmhid');el.style.transition='';const y=66+Math.random()*26,x=Math.max(8,Math.min(92,parseFloat(el.style.left)));el.style.left=x+'%';el.style.top=y+'%';el.style.zIndex=Math.round(y)+1;
    const h=document.createElement('i');h.className='rmheart ptfound';h.style.background=ptColor(d.by);h.textContent=(d.by===PT.pid?'내가':esc(p?p.nick:'친구'))+' 찾았다!';el.appendChild(h);setTimeout(()=>h.remove(),1800);
    if(PT.st[d.k])Object.assign(PT.st[d.k],{x,y,z:Math.round(y)+1,pose:'sit',spot:null})}
  ptSeekBadge()}
function ptSeekEnd(score){if(!PT)return;const sc=document.getElementById('ptscene');PT.seek=null;if(sc){sc.classList.remove('rmseeking');const b=sc.querySelector('.rmsbadge');if(b)b.remove()}
  const rank=Object.entries(score||{}).sort((a,b)=>b[1]-a[1]);const nm=pid=>{const p=(PT.people||[]).find(x=>x.pid===pid);return pid===PT.pid?'나':(p?p.nick:'친구')};
  const top=rank.length?rank[0][1]:0;const win=rank.filter(r=>r[1]===top).map(r=>nm(r[0]));const mine=(score||{})[PT.pid]||0;
  const R=rmS();let bonus='';if(R.ptSeekDay!==today()){R.ptSeekDay=today();R.coins=(R.coins||0)+1;save();bonus='<span>오늘의 숨바꼭질 보너스 ⭐1</span>'}
  if(sc){const cover=document.createElement('div');cover.className='rmcover ptend';cover.innerHTML=`<b>🎉 다 찾았어요!</b><span>🏆 ${win.map(esc).join(', ')} ${win.length>1?'공동 1등':'1등'} (${top}마리)</span><div class="ptrank">${rank.map(([pid,v])=>`<i style="background:${ptColor(pid)}">${esc(nm(pid))} ${v}마리</i>`).join('')}</div><span>나는 ${mine}마리 찾았어요</span>${bonus}`;sc.appendChild(cover);setTimeout(()=>cover.classList.add('rmfade'),3800);setTimeout(()=>cover.remove(),4500)}
  PT.busy=Date.now()+3000}
document.addEventListener('click',e=>{if(!PT||!PT.seek)return;const sc=e.target.closest('#ptscene');if(!sc)return;e.preventDefault();e.stopPropagation();
  let hit=null,best=1e9;sc.querySelectorAll('.rmc.rmhid:not(.ptpend)').forEach(c=>{const r=c.getBoundingClientRect();if(e.clientX>=r.left-6&&e.clientX<=r.right+6&&e.clientY>=r.top-6&&e.clientY<=r.bottom+6){const d=Math.hypot(e.clientX-(r.left+r.width/2),e.clientY-(r.top+r.height*.3));if(d<best){best=d;hit=c}}});
  if(hit){hit.classList.add('ptpend');ptApi('/api/act',{code:PT.code,pid:PT.pid,tok:PT.tok,t:'found',k:hit.dataset.ptc}).then(j=>{hit.classList.remove('ptpend');if(j&&j.late)toast('아깝다! 친구가 먼저 찾았어요')}).catch(()=>hit.classList.remove('ptpend'))}},true);

document.addEventListener('click',e=>{const t=e.target.closest('[data-ptsrvsave],[data-ptsrvreset]');if(!t)return;e.preventDefault();e.stopPropagation();
  try{if(t.dataset.ptsrvreset!=null){localStorage.removeItem('ptURL')}else{const v=(document.querySelector('[data-ptsrvin]')||{}).value||'';const u=v.trim().replace(/\/+$/,'');if(!/^https:\/\/[a-z0-9.-]+(:\d+)?$/i.test(u)){toast('https:// 로 시작하는 주소를 넣어 주세요');return}localStorage.setItem('ptURL',u)}}catch(err){}
  toast('주소를 바꿨어요. 다시 열어요');setTimeout(()=>location.reload(),600)},true);
