
// ===== ROOM_PATCH: 미니홈피 · 고양이·강아지와 함께 사는 내 방 =====
const RM_OL='#4A3B34';
const RM_ITEMS={
 window:{n:'창문',c:0,p:'wall',w:22,s:`<rect x="6" y="6" width="48" height="44" rx="4" fill="#CFEFFF" stroke="${RM_OL}" stroke-width="2"/><circle cx="40" cy="18" r="5" fill="#FFD66B"/><path d="M12 38c6-6 12-6 18 0s12 6 18 0" stroke="#fff" stroke-width="3" fill="none"/><path d="M30 6v44M6 28h48" stroke="${RM_OL}" stroke-width="2"/><path d="M4 4c8 10 8 30 2 48M56 4c-8 10-8 30-2 48" fill="#FFB8C6" stroke="${RM_OL}" stroke-width="1.6"/>`},
 clock:{n:'벽시계',c:1,p:'wall',w:11,s:`<circle cx="30" cy="30" r="22" fill="#FFF6E6" stroke="${RM_OL}" stroke-width="2.4"/><path d="M30 30V16M30 30l9 6" stroke="${RM_OL}" stroke-width="2.6" stroke-linecap="round"/><circle cx="30" cy="30" r="2.5" fill="#FF7563"/><path d="M14 10l-5-5M46 10l5-5" stroke="${RM_OL}" stroke-width="2"/>`},
 frame:{n:'액자',c:1,p:'wall',w:13,s:`<rect x="8" y="8" width="44" height="40" rx="3" fill="#E8BE86" stroke="${RM_OL}" stroke-width="2"/><rect x="14" y="14" width="32" height="28" fill="#DDF5EF"/><path d="M30 37c-8-6-11-10-8-14 2-3 6-2 8 1 2-3 6-4 8-1 3 4 0 8-8 14z" fill="#FF7563" stroke="${RM_OL}" stroke-width="1.2"/>`},
 lights:{n:'꼬마전구',c:2,p:'wall',w:32,s:`<path d="M2 14c14 12 42 12 56 0" stroke="${RM_OL}" stroke-width="1.6" fill="none"/>${[8,18,30,42,52].map((x,i)=>`<circle cx="${x}" cy="${i==2?25:i%4?22:17}" r="4" fill="${['#FFC23D','#FF7563','#7CD7C2','#5B8DEF','#FFC23D'][i]}" stroke="${RM_OL}" stroke-width="1.2"/>`).join('')}`},
 wshelf:{n:'벽 선반',c:1,p:'wall',w:18,s:`<rect x="4" y="40" width="52" height="6" rx="2" fill="#D9A86A" stroke="${RM_OL}" stroke-width="1.8"/><rect x="10" y="22" width="7" height="18" fill="#5B8DEF" stroke="${RM_OL}" stroke-width="1.4"/><rect x="18" y="26" width="7" height="14" fill="#FFC23D" stroke="${RM_OL}" stroke-width="1.4"/><path d="M40 40c-4 0-5-3-5-6h12c0 3-1 6-5 6z" fill="#FF9F7A" stroke="${RM_OL}" stroke-width="1.4"/><path d="M41 34c-2-6-6-8-8-8 2 4 5 6 8 8zm0 0c1-7 5-10 8-10-1 5-4 8-8 10z" fill="#7CD7C2" stroke="${RM_OL}" stroke-width="1.2"/>`},
 rug:{n:'동그란 러그',c:1,p:'floor',w:34,z:-1,s:`<ellipse cx="30" cy="40" rx="28" ry="12" fill="#FFB8C6" stroke="${RM_OL}" stroke-width="2"/><ellipse cx="30" cy="40" rx="19" ry="7.5" fill="none" stroke="#fff" stroke-width="2.4" stroke-dasharray="4 3"/>`},
 cushion:{n:'방석',c:0,p:'floor',w:15,s:`<ellipse cx="30" cy="42" rx="22" ry="10" fill="#7CD7C2" stroke="${RM_OL}" stroke-width="2"/><ellipse cx="30" cy="39" rx="16" ry="6" fill="#B5EADD"/><circle cx="30" cy="39" r="1.8" fill="${RM_OL}"/>`},
 box:{n:'종이 상자',c:1,p:'floor',w:16,s:`<path d="M8 26h44v24H8z" fill="#D9A86A" stroke="${RM_OL}" stroke-width="2" stroke-linejoin="round"/><path d="M8 26l-4-8h20l4 8M52 26l4-8H36l-4 8" fill="#E8BE86" stroke="${RM_OL}" stroke-width="2" stroke-linejoin="round"/><path d="M24 36h12" stroke="${RM_OL}" stroke-width="1.6"/>`},
 plant:{n:'화분',c:1,p:'floor',w:12,s:`<path d="M20 40h20l-3 16H23z" fill="#FF9F7A" stroke="${RM_OL}" stroke-width="2" stroke-linejoin="round"/><path d="M30 40C30 26 20 20 12 18c2 10 10 16 18 22zm0 0c0-14 8-24 18-26-1 12-8 20-18 26zm0 0c0-12 0-20 0-30" fill="#7CD7C2" stroke="${RM_OL}" stroke-width="1.8"/>`},
 lamp:{n:'스탠드',c:2,p:'floor',w:12,s:`<path d="M18 22l6-16h12l6 16z" fill="#FFE08A" stroke="${RM_OL}" stroke-width="2" stroke-linejoin="round"/><path d="M30 22v30" stroke="${RM_OL}" stroke-width="2.4"/><ellipse cx="30" cy="54" rx="10" ry="3.5" fill="#E8BE86" stroke="${RM_OL}" stroke-width="2"/>`},
 shelf:{n:'책장',c:2,p:'floor',w:18,s:`<rect x="10" y="4" width="40" height="52" rx="2" fill="#D9A86A" stroke="${RM_OL}" stroke-width="2"/><path d="M10 22h40M10 40h40" stroke="${RM_OL}" stroke-width="2"/>${[[14,'#5B8DEF'],[20,'#FF7563'],[26,'#FFC23D'],[34,'#7CD7C2']].map(([x,c])=>`<rect x="${x}" y="9" width="5" height="13" fill="${c}" stroke="${RM_OL}" stroke-width="1"/>`).join('')}${[[16,'#FFC23D'],[22,'#7CD7C2'],[38,'#FF7563']].map(([x,c])=>`<rect x="${x}" y="27" width="5" height="13" fill="${c}" stroke="${RM_OL}" stroke-width="1"/>`).join('')}`},
 fish:{n:'어항',c:2,p:'floor',w:13,s:`<rect x="16" y="40" width="28" height="16" rx="2" fill="#E8BE86" stroke="${RM_OL}" stroke-width="2"/><circle cx="30" cy="26" r="15" fill="#CFEFFF" stroke="${RM_OL}" stroke-width="2"/><path d="M24 28c3-4 8-4 10 0-2 4-7 4-10 0zm10 0l5-3v6z" fill="#FF9F43" stroke="${RM_OL}" stroke-width="1.2"/>`},
 tower:{n:'캣타워',c:3,p:'floor',w:20,s:`<rect x="26" y="10" width="7" height="44" fill="#E8D5B5" stroke="${RM_OL}" stroke-width="1.8"/><rect x="8" y="8" width="26" height="7" rx="3" fill="#B39DDB" stroke="${RM_OL}" stroke-width="1.8"/><rect x="26" y="28" width="28" height="7" rx="3" fill="#B39DDB" stroke="${RM_OL}" stroke-width="1.8"/><rect x="8" y="52" width="46" height="6" rx="3" fill="#9575CD" stroke="${RM_OL}" stroke-width="1.8"/><path d="M12 15v8" stroke="${RM_OL}" stroke-width="1.4"/><circle cx="12" cy="25" r="2.6" fill="#FF7563" stroke="${RM_OL}" stroke-width="1"/>`},
 sofa:{n:'소파',c:3,p:'floor',w:30,s:`<rect x="10" y="18" width="40" height="18" rx="6" fill="#FF9F7A" stroke="${RM_OL}" stroke-width="2"/><rect x="6" y="32" width="48" height="16" rx="5" fill="#FFB89A" stroke="${RM_OL}" stroke-width="2"/><rect x="2" y="26" width="10" height="22" rx="5" fill="#FF9F7A" stroke="${RM_OL}" stroke-width="2"/><rect x="48" y="26" width="10" height="22" rx="5" fill="#FF9F7A" stroke="${RM_OL}" stroke-width="2"/><path d="M10 48v6M50 48v6" stroke="${RM_OL}" stroke-width="2.4"/>`},
 bed:{n:'폭신 침대',c:3,p:'floor',w:22,s:`<ellipse cx="30" cy="42" rx="26" ry="12" fill="#5B8DEF" stroke="${RM_OL}" stroke-width="2"/><ellipse cx="30" cy="40" rx="18" ry="7" fill="#E6EEFF"/><path d="M8 38c4-6 40-6 44 0" stroke="#fff" stroke-width="2" fill="none" stroke-dasharray="3 3"/>`},
 desk:{n:'책상',c:2,p:'floor',w:24,s:`<rect x="10" y="12" width="14" height="8" rx="1" fill="#5B8DEF" stroke="${RM_OL}" stroke-width="1.4"/><rect x="26" y="14" width="10" height="6" rx="1" fill="#FFC23D" stroke="${RM_OL}" stroke-width="1.4"/><rect x="4" y="20" width="52" height="6" rx="2" fill="#D9A86A" stroke="${RM_OL}" stroke-width="2"/><rect x="36" y="26" width="16" height="18" fill="#E8BE86" stroke="${RM_OL}" stroke-width="1.8"/><path d="M40 35h8" stroke="${RM_OL}" stroke-width="1.6"/><path d="M9 26v30M51 44v12" stroke="${RM_OL}" stroke-width="3" stroke-linecap="round"/>`},
 bathtub:{n:'욕조',c:2,p:'floor',w:30,s:`<path d="M50 26V14c0-5 7-5 7 0" stroke="${RM_OL}" stroke-width="2.4" fill="none"/>${[14,22,31,40].map((x,i)=>`<circle cx="${x}" cy="${24-i%2*3}" r="${4+i%2}" fill="#E6F4FF" stroke="#9CC9EA" stroke-width="1.2"/>`).join('')}<path d="M3 26h54v6c0 13-9 20-21 20H24C12 52 3 45 3 32z" fill="#fff" stroke="${RM_OL}" stroke-width="2"/><path d="M14 51l-3 6M46 51l3 6" stroke="${RM_OL}" stroke-width="2.6" stroke-linecap="round"/>`},
 bmat:{n:'욕실 매트',c:1,p:'floor',w:26,z:-1,s:`<rect x="4" y="38" width="52" height="16" rx="7" fill="#9AD9F0" stroke="${RM_OL}" stroke-width="2"/><path d="M14 42v8M22 42v8M30 42v8M38 42v8M46 42v8" stroke="#fff" stroke-width="2.4" stroke-linecap="round"/>`},
 washer:{n:'세탁기',c:2,p:'floor',w:18,s:`<rect x="8" y="6" width="44" height="50" rx="4" fill="#F4F6FA" stroke="${RM_OL}" stroke-width="2"/><path d="M8 16h44" stroke="${RM_OL}" stroke-width="1.8"/><circle cx="44" cy="11" r="2.2" fill="#FF7563"/><circle cx="16" cy="11" r="2" fill="#7CD7C2"/><circle cx="30" cy="36" r="13" fill="#CFEFFF" stroke="${RM_OL}" stroke-width="2"/><path d="M20 38c4-4 8 4 12 0s6-2 8 0" stroke="#5B8DEF" stroke-width="2" fill="none"/>`},
 basket:{n:'빨래 바구니',c:1,p:'floor',w:15,s:`<path d="M14 30c2-9 12-7 15-2 4-7 15-6 17 2" fill="#FFB8C6" stroke="${RM_OL}" stroke-width="1.6"/><path d="M8 30h44l-5 26H13z" fill="#E8BE86" stroke="${RM_OL}" stroke-width="2" stroke-linejoin="round"/><path d="M10 39h40M12 48h36" stroke="${RM_OL}" stroke-width="1.4"/>`},
 yarn:{n:'털실 공',c:1,p:'floor',w:8,s:`<circle cx="30" cy="40" r="14" fill="#FF7563" stroke="${RM_OL}" stroke-width="2"/><path d="M18 34c8 2 16 8 20 16M22 28c6 4 14 12 16 20M30 26c-2 8 0 18 8 26" stroke="#fff" stroke-width="1.4" fill="none"/><path d="M44 42c8 2 10 8 6 12" stroke="#FF7563" stroke-width="1.6" fill="none"/>`},
};
const RM_WALL={cream:{n:'크림',c:0,css:'#FFF6E6'},mint:{n:'민트 도트',c:1,css:'radial-gradient(circle,#B5EADD 2.4px,transparent 2.6px) 0 0/18px 18px,#E9FAF5'},sky:{n:'하늘 줄무늬',c:1,css:'repeating-linear-gradient(90deg,#E6EEFF 0 14px,#D3E1FF 14px 28px)'},pink:{n:'분홍 체크',c:2,css:'repeating-linear-gradient(0deg,rgba(255,184,198,.45) 0 10px,transparent 10px 20px),repeating-linear-gradient(90deg,rgba(255,184,198,.45) 0 10px,transparent 10px 20px),#FFF4F6'},btile:{n:'욕실 타일',c:1,css:'repeating-linear-gradient(0deg,#BFDDF0 0 1.5px,transparent 1.5px 18px),repeating-linear-gradient(90deg,#BFDDF0 0 1.5px,transparent 1.5px 18px),#F2FAFF'},wpanel:{n:'나무 벽',c:1,css:'repeating-linear-gradient(90deg,#D7B48C 0 24px,#C9A57C 24px 26px)'},night:{n:'밤하늘',c:3,css:'radial-gradient(circle,#FFE08A 1.4px,transparent 1.8px) 0 0/26px 22px,radial-gradient(circle,#fff 1px,transparent 1.4px) 12px 9px/30px 26px,#2E3A6B'}};
const RM_FLOOR={wood:{n:'나무 마루',c:0,css:'repeating-linear-gradient(90deg,#E8BE86 0 38px,#DDAE72 38px 40px),#E8BE86'},tile:{n:'체크 타일',c:1,css:'conic-gradient(#fff 25%,#E9E4DB 0 50%,#fff 0 75%,#E9E4DB 0) 0 0/32px 32px'},grass:{n:'잔디',c:2,css:'radial-gradient(circle at 30% 40%,#8FD694 2px,transparent 3px) 0 0/16px 14px,#A8E0A0'},stone:{n:'회색 타일',c:1,css:'conic-gradient(#E3E7EC 25%,#CDD3DB 0 50%,#E3E7EC 0 75%,#CDD3DB 0) 0 0/40px 40px'},carpet:{n:'보라 카펫',c:2,css:'radial-gradient(circle,#B39DDB 1.6px,transparent 2px) 0 0/14px 14px,#D8CCF0'}};
const RM_SNACK={
 churu:{n:'츄르',c:1,e:'🍡',love:1,g:'food'},can:{n:'참치 통조림',c:2,e:'🥫',love:2,g:'food'},chicken:{n:'닭가슴살',c:2,e:'🍗',love:2,g:'food'},
 milk:{n:'반려동물 우유',c:1,e:'🥛',love:1,g:'food'},cookie:{n:'캣닢 쿠키',c:3,e:'🍪',love:3,g:'food'},cake:{n:'생일 케이크',c:5,e:'🎂',love:5,g:'food'},
 wand:{n:'낚싯대 장난감',c:2,e:'🪶',love:2,g:'toy'},mouse:{n:'쥐돌이 인형',c:2,e:'🐭',love:2,g:'toy'},ball:{n:'방울 공',c:1,e:'⚽',love:1,g:'toy'},
 laser:{n:'레이저 포인터',c:3,e:'🔴',love:3,g:'toy'},butterfly:{n:'나비 장난감',c:3,e:'🦋',love:3,g:'toy'},bubble:{n:'비눗방울',c:2,e:'🫧',love:2,g:'toy'}};
const RM_RT={room:{n:'방',e:'🛏',d:'포근한 기본 방',wall:'cream',floor:'wood',it:[['window',28,34],['cushion',62,86]]},
 study:{n:'서재',e:'📚',d:'책장과 책상이 있는 조용한 방',wall:'wpanel',floor:'wood',it:[['shelf',18,80],['desk',62,84],['lamp',86,86]]},
 bath:{n:'욕실',e:'🛁',d:'욕조 안에 쏙 숨기 좋아요',wall:'btile',floor:'stone',it:[['bathtub',40,86],['bmat',75,94]]},
 utility:{n:'다용도실',e:'🧺',d:'세탁기 위는 따뜻해요',wall:'sky',floor:'stone',it:[['washer',24,82],['basket',58,90],['box',82,92]]},
 living:{n:'거실',e:'🛋',d:'다 같이 뒹구는 넓은 방',wall:'mint',floor:'wood',it:[['window',70,34],['sofa',36,84],['rug',62,96]]},
 balcony:{n:'베란다',e:'🌿',d:'햇볕 쬐며 낮잠 자는 곳',wall:'sky',floor:'grass',it:[['window',50,36],['plant',14,84],['plant',86,86],['cushion',50,92]]}};
const RM_MAXROOM=8;
function rmJ(w,a,b){const c=w.charCodeAt(w.length-1)-0xAC00;const bat=c>=0&&c<11172?c%28:0;if(a==='으로')return w+(bat&&bat!==8?'으로':'로');return w+(bat?a:b)}
function rmCur(R){return R.rooms.find(r=>r.id===R.cur)||R.rooms[0]}
function rmMig(R){if(!R.rooms){R.rooms=[{id:1,t:'room',name:'내 방',wall:R.wall||'cream',floor:R.floor||'wood',items:R.items||[]}];R.cur=1;R.rid=2;R.home=R.home||{};delete R.wall;delete R.floor;delete R.items}
  if(!R.home)R.home={};const d=Object.getOwnPropertyDescriptor(R,'items');if(!d||!d.get)['wall','floor','items'].forEach(k=>{delete R[k];Object.defineProperty(R,k,{get(){return rmCur(R)[k]},set(v){rmCur(R)[k]=v},enumerable:false,configurable:true})});return R}
function rmAll(){const ks=Object.keys(S.dex||{}).map(Number).filter(i=>BREEDS[i]);ks.sort((a,b)=>(S.dex[b]||0)-(S.dex[a]||0));return ks}
function rmHomeOf(i){const R=S.room;const h=R.home[i];return R.rooms.some(r=>r.id===h)?h:R.rooms[0].id}
function rmMkRoom(t){const R=rmS();const T=RM_RT[t];const same=R.rooms.filter(r=>r.t===t).length;const r={id:R.rid++,t,name:T.n+(same?' '+(same+1):''),wall:T.wall,floor:T.floor,items:[]};
  T.it.forEach(([k,x,y])=>{r.items.push({id:R.nid++,k,x,y,f:0});if(!R.own.includes(k))R.own.push(k)});[T.wall,T.floor].forEach(k=>{if(!R.own.includes(k))R.own.push(k)});R.rooms.push(r);R.cur=r.id;save();return r}
function rmS(){if(!S.room){S.room={name:'',msg:'',wall:'cream',floor:'wood',coins:3,own:['window','cushion','cream','wood'],items:[{id:1,k:'window',x:28,y:34,f:0},{id:2,k:'cushion',x:62,y:86,f:0}],nid:3};save()}return rmMig(S.room)}
// 별은 하루 최대 STAR_DAY개까지 모을 수 있어요 (모든 방법 합쳐서). 실제로 준 개수를 돌려줘요
function starToday(){const R=rmS(),t=today();if(!R.earn||R.earn.d!==t)R.earn={d:t,n:0};return R.earn}
function rmEarn(n){const R=rmS(),e=starToday();const g=Math.max(0,Math.min(n,STAR_DAY-e.n));if(g){R.coins=(R.coins||0)+g;e.n+=g}save();return g}
function rmLive(){const R=rmS();return rmAll().filter(i=>rmHomeOf(i)===R.cur).slice(0,16)}
function rmCat(b){return `<svg viewBox="-2 -2 44 54"><path d="M30 42c9 0 10-10 5-13" stroke="${RM_OL}" stroke-width="5.4" fill="none" stroke-linecap="round"/><path d="M30 42c9 0 10-10 5-13" stroke="${b.b}" stroke-width="3.4" fill="none" stroke-linecap="round"/><ellipse cx="20" cy="40" rx="12" ry="9" fill="${b.b}" stroke="${RM_OL}" stroke-width="1.6"/><path d="M13 48v-3M27 48v-3" stroke="${RM_OL}" stroke-width="2.6" stroke-linecap="round"/><g transform="translate(1,-1) scale(.95)">${bFace(b)}</g></svg>`}
let RM_NEW=false,RM_TAB='room',RM_EDIT=false,RM_SEL=null,RM_T=null;
function rmItemHTML(it){const I=RM_ITEMS[it.k];if(!I)return '';const sel=RM_EDIT&&RM_SEL===it.id;
  return `<div class="rmi ${RM_EDIT?'ed':''} ${sel?'sel':''}" data-rmi="${it.id}" style="left:${it.x}%;top:${it.y}%;width:${I.w}%;z-index:${I.z===-1?1:(I.p==='wall'?2:Math.round(it.y))};transform:translate(-50%,-100%) scaleX(${it.f?-1:1})"><svg viewBox="0 0 60 60" width="100%">${I.s}</svg></div>`}
function roomSceneHTML(){const R=rmS();const live=rmLive();
  const cats=live.map((i,n)=>{const x=10+((i*37+n*23)%80),y=70+((i*13+n*7)%24);return `<div class="rmc" data-rmc="${i}" style="left:${x}%;top:${y}%;z-index:${y+1}">${rmCat(BREEDS[i])}</div>`}).join('');
  return `<div class="rmscene" id="rmscene"><div class="rmwall" style="background:${RM_WALL[R.wall].css}"></div><div class="rmfloor" style="background:${RM_FLOOR[R.floor].css}"></div>${R.items.map(rmItemHTML).join('')}${cats}<div class="rmjs" style="left:${R.jx||50}%;top:${R.jy||90}%;z-index:${Math.round(R.jy||90)+1}">${jsSvg(rmLook())}</div>${!live.length?'<div class="rmempty">아직 함께 사는 친구가 없어요.<br>문제 세트를 풀고 숨은 친구를 찾아 보세요!</div>':''}</div>`}
function roomHTML(){const R=rmS();const days=Object.keys(S.days||{}).filter(k=>S.days[k]&&(S.days[k].sess||S.days[k].solved||S.days[k].n)).length||Object.keys(S.days||{}).length;
  const td=(S.daily&&S.daily.log&&S.daily.log[dayStr(today())])||0;const live=rmLive();
  const nm=R.name||'나';
  let body='';
  const cur=rmCur(R);const all=rmAll();
  const roomsBar=`<div class="rmrooms">${R.rooms.map(r=>`<button class="rmroom ${r.id===R.cur&&!RM_NEW?'on':''}" data-rmroom="${r.id}">${RM_RT[r.t].e} ${esc(r.name)} <small>${all.filter(i=>rmHomeOf(i)===r.id).length}</small></button>`).join('')}${R.rooms.length<RM_MAXROOM?`<button class="rmroom add ${RM_NEW?'on':''}" data-rmnew>＋ 방 만들기</button>`:''}</div>`;
  const cost=R.rooms.length<2?0:3;
  if(RM_NEW&&RM_TAB!=='shop'){
    body=`${roomsBar}<div class="rmcoin">새 방 만들기 <b>${cost?'⭐ '+cost:'첫 방은 무료!'}</b><span>방 종류를 고르면 기본 가구가 함께 들어와요. 내 포인트 ⭐ ${R.coins||0}</span></div><div class="rmgrid rmtypes">${Object.entries(RM_RT).map(([k,T])=>`<button class="rmshop" data-rmmk="${k}"><i class="rmemo">${T.e}</i><span>${T.n}</span><em>${T.d}</em></button>`).join('')}</div>`;
  }else if(RM_TAB==='room'){
    const sel=RM_EDIT&&RM_SEL!=null?R.items.find(x=>x.id===RM_SEL):null;
    const inv=Object.keys(RM_ITEMS).filter(k=>R.own.includes(k));
    body=`${roomsBar}${roomSceneHTML()}
    <div class="rmbar">${RM_EDIT?`<button class="rmbtn on" data-rm="edit">✔ 다 꾸몄어요</button>${sel?`<button class="rmbtn" data-rm="flip">↔ 뒤집기</button><button class="rmbtn" data-rm="del">↩ 넣기</button>`:'<span class="rmhint">가구를 끌어서 옮기고, 눌러서 고르세요</span>'}<input class="rmrname" data-rmrname maxlength="10" value="${esc(cur.name)}" placeholder="방 이름">${R.rooms.length>1?'<button class="rmbtn" data-rmdelroom>🗑 이 방 없애기</button>':''}`:`<button class="rmbtn" data-rm="edit">🛠 방 꾸미기</button><button class="rmbtn" data-rmtab="cats">🐱 식구 고르기</button>${rmAll().length?'<button class="rmbtn cam" data-rmcam>📸 셀카</button>':''}<button class="rmbtn party" data-rmparty>👫 친구랑 놀기</button>${rmLive().length?'<button class="rmbtn seek" data-rmseek>🙈 숨바꼭질</button>':''}${Object.entries(RM_SNACK).filter(([k])=>(R.snack||{})[k]>0).map(([k,o])=>`<button class="rmbtn snack" data-rmsnack="${k}">${o.e} ${o.n} ${o.g==='toy'?'놀아 주기':'주기'} ×${R.snack[k]}</button>`).join('')||'<span class="rmhint">상점에서 간식과 놀잇감을 살 수 있어요</span>'}`}</div>
    ${RM_EDIT?`<div class="rminv"><b>가진 가구 놓기</b>${inv.map(k=>`<button class="rminvb" data-rmadd="${k}"><svg viewBox="0 0 60 60" width="34" height="34">${RM_ITEMS[k].s}</svg><span>${RM_ITEMS[k].n}</span></button>`).join('')}</div>`:''}`;
  }else if(RM_TAB==='shop'){
    const card=(kind,k,o)=>{const own=R.own.includes(k);const on=(kind==='wall'&&R.wall===k)||(kind==='floor'&&R.floor===k);
      const pv=kind==='item'?`<svg viewBox="0 0 60 60" width="46" height="46">${o.s}</svg>`:`<i class="rmsw" style="background:${o.css}"></i>`;
      return `<button class="rmshop ${own?'own':''} ${on?'on':''}" data-rmbuy="${kind}:${k}">${pv}<span>${o.n}</span><em>${on?'사용 중':own?(kind==='item'?'가짐 ✓':'바꾸기'):o.c?`⭐ ${o.c}`:'무료'}</em></button>`};
    body=`${roomsBar}<p class="rmhint" style="margin:0 0 6px">벽지·바닥·가구는 <b>${esc(cur.name)}</b>에 적용돼요</p><div class="rmcoin">내 포인트 <b>⭐ ${R.coins||0}</b><span>문제 세트 1개를 끝까지 풀면 ⭐1, 오늘의 15분을 끝내면 ⭐2, 7일 연속이면 ⭐5</span></div>
    ${[['food','🍽 간식'],['toy','🧶 놀잇감']].map(([g,gt])=>`<h4 class="rmh">${gt} <small>(1번 쓰면 없어져요)</small></h4><div class="rmgrid">${Object.entries(RM_SNACK).filter(([k,o])=>o.g===g).map(([k,o])=>`<button class="rmshop" data-rmbuy="snack:${k}"><i class="rmemo">${o.e}</i><span>${o.n}</span><em>⭐ ${o.c}</em>${(R.snack||{})[k]?`<small class="rmhave">${R.snack[k]}개 있음</small>`:''}</button>`).join('')}</div>`).join('')}
    <h4 class="rmh">가구</h4><div class="rmgrid">${Object.entries(RM_ITEMS).map(([k,o])=>card('item',k,o)).join('')}</div>
    <h4 class="rmh">벽지</h4><div class="rmgrid">${Object.entries(RM_WALL).map(([k,o])=>card('wall',k,o)).join('')}</div>
    <h4 class="rmh">바닥</h4><div class="rmgrid">${Object.entries(RM_FLOOR).map(([k,o])=>card('floor',k,o)).join('')}</div>`;
  }else if(RM_TAB==='me'){body=jsTabHTML()}else{
    const first=R.rooms[0].id;body=`${roomsBar}<p class="rmhint" style="margin:0 0 8px"><b>${RM_RT[cur.t].e} ${esc(cur.name)}</b>에서 살 친구를 눌러서 골라요. (한 방에 최대 16마리${R.cur===first?'':' · 다시 누르면 '+esc(rmJ(R.rooms[0].name,'으로'))+' 돌아가요'})</p><div class="rmgrid">${all.map(i=>{const b=BREEDS[i];const h=rmHomeOf(i);const here=h===R.cur;const hr=R.rooms.find(r=>r.id===h);return `<button class="rmshop ${here?'own on':''}" data-rmhome="${i}">${catImg(b)?`<img src="${catImg(b)}" alt="" class="rmph" onerror="this.remove()">`:`<svg viewBox="0 -2 40 36" width="46" height="42">${bFace(b)}</svg>`}<span>${esc(b.n)}</span><em>${here?'✓ 이 방':RM_RT[hr.t].e+' '+esc(hr.name)}</em></button>`}).join('')||'<p class="rmhint">아직 없어요. 문제 세트를 풀고 숨은 친구를 찾아 보세요!</p>'}</div><button class="rmbtn" style="margin-top:10px" data-act="dexopen2">📖 ${PETW()} 도감 보기</button>`;
  }
  return `<div class="mh"><div class="mhtop"><span>TODAY <b>${td}</b></span><span>TOTAL <b>${days}</b></span><span class="mhurl">yang2수학 미니홈피</span></div>
  <div class="mhbook"><aside class="mhside"><div class="mhava" data-rmtab="me" title="내 집사 꾸미기">${jsSvg(rmLook())}</div>
    <input class="mhname" data-rmname maxlength="12" value="${esc(R.name)}" placeholder="이름 쓰기">
    <textarea class="mhmsg" data-rmmsg maxlength="60" rows="3" placeholder="오늘의 한마디">${esc(R.msg)}</textarea>
    <div class="mhst"><span>🐱 ${all.length}마리</span><span>⭐ ${R.coins||0}</span></div></aside>
  <section class="mhmain"><h2 class="mhtitle">${esc(nm)}의 ${RM_NEW?'새 방':esc(cur.name)}</h2>
    <div class="mhtabs">${[['room','🏠 미니룸'],['me','🧑 내 집사'],['shop','🛍 상점'],['cats','🐱 식구들']].map(([k,t])=>`<button class="${RM_TAB===k?'on':''}" data-rmtab="${k}">${t}</button>`).join('')}</div>${body}</section></div></div>`}
function rmWander(){clearInterval(RM_T);RM_T=setInterval(()=>{if(VIEW!=='room'||RM_TAB!=='room'){clearInterval(RM_T);return}
  document.querySelectorAll('#rmscene .rmc').forEach(el=>{if(Math.random()<.45)return;const x0=parseFloat(el.style.left),x=6+Math.random()*86,y=64+Math.random()*31;
    el.classList.toggle('rmflip',x<x0);el.classList.add('rmwalk');el.style.left=x+'%';el.style.top=y+'%';el.style.zIndex=Math.round(y)+1;clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('rmwalk'),2400)})},3200)}
function rmRender(){if(VIEW!=='room')return;render()}
function rmDragInit(){const sc=document.getElementById('rmscene');if(!sc||!RM_EDIT)return;
  sc.querySelectorAll('.rmi').forEach(el=>{el.addEventListener('pointerdown',e=>{e.preventDefault();const R=rmS();const it=R.items.find(x=>x.id===+el.dataset.rmi);const I=RM_ITEMS[it.k];const r=sc.getBoundingClientRect();let moved=false;const sx=e.clientX,sy=e.clientY;el.setPointerCapture(e.pointerId);
    const mv=ev=>{if(Math.abs(ev.clientX-sx)+Math.abs(ev.clientY-sy)>4)moved=true;if(!moved)return;let x=(ev.clientX-r.left)/r.width*100,y=(ev.clientY-r.top)/r.height*100+6;
      x=Math.max(4,Math.min(96,x));y=I.p==='wall'?Math.max(18,Math.min(58,y)):Math.max(62,Math.min(99,y));it.x=+x.toFixed(1);it.y=+y.toFixed(1);el.style.left=it.x+'%';el.style.top=it.y+'%';if(I.p!=='wall'&&I.z!==-1)el.style.zIndex=Math.round(it.y)};
    const up=()=>{el.removeEventListener('pointermove',mv);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',up);if(!moved)RM_SEL=RM_SEL===it.id?null:it.id;save();rmRender()};
    el.addEventListener('pointermove',mv);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up)})})}
document.addEventListener('click',e=>{if(RM_SEEK&&e.target.closest('#rmscene')){e.preventDefault();e.stopPropagation();const hit=[...document.querySelectorAll('#rmscene .rmc.rmhid')].find(c=>{const r=c.getBoundingClientRect();return e.clientX>=r.left-6&&e.clientX<=r.right+6&&e.clientY>=r.top-6&&e.clientY<=r.bottom+6});if(hit)rmFound(hit);return}
  const t=e.target.closest('[data-rmcam],[data-rmroom],[data-rmnew],[data-rmmk],[data-rmhome],[data-rmdelroom],[data-rmseek],[data-rmsnack],[data-rm],[data-rmtab],[data-rmadd],[data-rmbuy],[data-rmc],[data-act="room"],[data-act="dexopen2"]');if(!t)return;
  if(t.matches('[data-act="room"]')){e.preventDefault();e.stopPropagation();closeModal();RM_TAB='room';RM_EDIT=false;go('room');return}
  if(t.matches('[data-act="dexopen2"]')){e.preventDefault();e.stopPropagation();openDex();return}
  const R=rmS();e.preventDefault();e.stopPropagation();
  if(t.dataset.rmcam!=null){camOpen();return}
  if(t.dataset.rmseek!=null){rmSeek();return}
  if(t.dataset.rmroom){R.cur=+t.dataset.rmroom;RM_NEW=false;RM_EDIT=false;RM_SEL=null;RM_SEEK=null;if(RM_TAB==='shop')RM_TAB='room';save();return rmRender()}
  if(t.dataset.rmnew!=null){RM_NEW=!RM_NEW;RM_EDIT=false;if(RM_TAB==='shop')RM_TAB='room';return rmRender()}
  if(t.dataset.rmmk){const cost=R.rooms.length<2?0:3;if(R.rooms.length>=RM_MAXROOM)return;if((R.coins||0)<cost){toast(`포인트가 ${cost-(R.coins||0)} 더 필요해요 ⭐`);return}R.coins-=cost;const r=rmMkRoom(t.dataset.rmmk);RM_NEW=false;RM_TAB='cats';toast(`${RM_RT[r.t].e} ${rmJ(r.name,'을','를')} 만들었어요! 이 방에서 살 친구를 골라 주세요`);return rmRender()}
  if(t.dataset.rmhome){const i=+t.dataset.rmhome,first=R.rooms[0].id;const here=rmHomeOf(i)===R.cur;
    if(here){if(R.cur===first){toast(`다른 방을 골라서 데려가 보세요. 갈 곳 없는 친구는 ${R.rooms[0].name}에서 살아요`);return}delete R.home[i];toast(`${rmJ(BREEDS[i].n,'이','가')} ${rmJ(R.rooms[0].name,'으로')} 돌아갔어요`)}
    else{if(rmAll().filter(x=>rmHomeOf(x)===R.cur).length>=16){toast('이 방은 꽉 찼어요 (최대 16마리)');return}if(R.cur===first)delete R.home[i];else R.home[i]=R.cur;toast(`${rmJ(BREEDS[i].n,'이','가')} ${rmJ(rmCur(R).name,'으로')} 이사 왔어요 🐾`)}
    save();return rmRender()}
  if(t.dataset.rmdelroom!=null){if(R.rooms.length<2)return;const c=rmCur(R);ask('🗑',`${esc(rmJ(c.name,'을','를'))} 없앨까요?`,'이 방의 친구들은 첫 번째 방으로 돌아가요. 가구는 가진 가구에 남아 있어 다른 방에 놓을 수 있어요.',[{t:'없애기',cls:'go',fn:()=>{const R2=rmS();Object.keys(R2.home).forEach(k=>{if(R2.home[k]===c.id)delete R2.home[k]});R2.rooms=R2.rooms.filter(r=>r.id!==c.id);R2.cur=R2.rooms[0].id;RM_EDIT=false;RM_SEL=null;save();rmRender()}}]);return}
  if(t.dataset.rmtab){RM_TAB=t.dataset.rmtab;RM_NEW=false;RM_EDIT=false;RM_SEL=null;return rmRender()}
  if(t.dataset.rm==='edit'){RM_EDIT=!RM_EDIT;RM_SEL=null;return rmRender()}
  if(t.dataset.rm==='flip'){const it=R.items.find(x=>x.id===RM_SEL);if(it){it.f=it.f?0:1;save()}return rmRender()}
  if(t.dataset.rm==='del'){R.items=R.items.filter(x=>x.id!==RM_SEL);RM_SEL=null;save();return rmRender()}
  if(t.dataset.rmadd){const k=t.dataset.rmadd,I=RM_ITEMS[k];const id=R.nid++;R.items.push({id,k,x:50,y:I.p==='wall'?40:84,f:0});RM_SEL=id;save();toast(`${rmJ(I.n,"을","를")} 놓았어요. 끌어서 옮겨 보세요`);return rmRender()}
  if(t.dataset.rmbuy&&t.dataset.rmbuy.startsWith('snack:')){const k=t.dataset.rmbuy.slice(6),o=RM_SNACK[k];if((R.coins||0)<o.c){toast(`포인트가 ${o.c-(R.coins||0)} 더 필요해요 ⭐`);return}R.coins-=o.c;R.snack=R.snack||{};R.snack[k]=(R.snack[k]||0)+1;save();toast(`${o.e} ${o.n}을(를) 샀어요! 미니룸에서 ${o.g==='toy'?'놀아 주세요':'주세요'}`);return rmRender()}
  if(t.dataset.rmbuy){const [kind,k]=t.dataset.rmbuy.split(':');const o=kind==='item'?RM_ITEMS[k]:kind==='wall'?RM_WALL[k]:RM_FLOOR[k];
    if(!R.own.includes(k)){if((R.coins||0)<o.c){toast(`포인트가 ${o.c-(R.coins||0)} 더 필요해요 ⭐`);return}R.coins-=o.c;R.own.push(k);toast(`${o.n}을(를) 샀어요!`)}
    if(kind==='wall')R.wall=k;else if(kind==='floor')R.floor=k;else{RM_TAB='room';RM_EDIT=true;const id=R.nid++;R.items.push({id,k,x:50,y:o.p==='wall'?40:84,f:0});RM_SEL=id}
    save();return rmRender()}
  if(t.dataset.rmc!=null){if(RM_EDIT)return;if(RM_SEEK&&t.classList.contains('rmc')){rmFound(t);return}const b=BREEDS[+t.dataset.rmc];if(!b)return;const lv=(R.love&&R.love[b.i])||0;ask(catBig(b),esc(b.n),esc(b.t)+`<br><b>💗 친밀도 ${lv}</b>`+catCredit(b),[],'닫기');return}
  if(t.dataset.rmsnack){const k=t.dataset.rmsnack,o=RM_SNACK[k];R.snack=R.snack||{};if(!(R.snack[k]>0))return;R.snack[k]--;R.love=R.love||{};const live=rmLive();live.forEach(i=>R.love[i]=(R.love[i]||0)+o.love);save();(o.g==='toy'?rmPlay:rmFeed)(o.e);return}
},true);
document.addEventListener('input',e=>{const t=e.target;if(t.matches('[data-rmname]')){rmS().name=t.value.slice(0,12);save();const h=document.querySelector('.mhtitle');if(h)h.textContent=(t.value||'나')+'의 '+rmCur(rmS()).name}else if(t.matches('[data-rmrname]')){rmCur(rmS()).name=t.value.slice(0,10)||'방';save();const h=document.querySelector('.mhtitle');if(h)h.textContent=(rmS().name||'나')+'의 '+rmCur(rmS()).name}else if(t.matches('[data-rmmsg]')){rmS().msg=t.value.slice(0,60);save()}});

function rmFeed(em){const sc=document.getElementById('rmscene');if(!sc)return;const bowl=document.createElement('div');bowl.className='rmbowl';bowl.textContent=em;sc.appendChild(bowl);
  const cats=[...sc.querySelectorAll('.rmc')];cats.forEach((el,i)=>{const a=i/Math.max(1,cats.length)*Math.PI*2;const x=50+Math.cos(a)*(10+cats.length*.8),y=82+Math.sin(a)*7;el.classList.toggle('rmflip',x>50);el.classList.add('rmwalk');el.style.left=x+'%';el.style.top=y+'%';el.style.zIndex=Math.round(y)+1;
    setTimeout(()=>{el.classList.remove('rmwalk');const h=document.createElement('i');h.className='rmheart';h.textContent='💗';el.appendChild(h);setTimeout(()=>h.remove(),1600)},2300)});
  setTimeout(()=>bowl.remove(),4200);toast(cats.length?`냠냠! 친구들의 친밀도가 올랐어요 💗`:'아직 함께 사는 친구가 없어요')}

function rmPlay(em){const sc=document.getElementById('rmscene');if(!sc)return;const toy=document.createElement('div');toy.className='rmtoy';toy.textContent=em;sc.appendChild(toy);
  const cats=[...sc.querySelectorAll('.rmc')];let n=0;
  const hop=()=>{const x=10+Math.random()*80,y=66+Math.random()*28;toy.style.left=x+'%';toy.style.top=y+'%';
    cats.forEach((el,i)=>{const dx=(i%5-2)*5,dy=(Math.floor(i/5)-1)*4;const cx=Math.max(5,Math.min(95,x+dx)),cy=Math.max(64,Math.min(98,y+6+dy));el.classList.toggle('rmflip',cx<parseFloat(el.style.left));el.classList.add('rmwalk');el.style.transition='left 1.1s ease-out,top 1.1s ease-out';el.style.left=cx+'%';el.style.top=cy+'%';el.style.zIndex=Math.round(cy)+1});
    if(++n<5)setTimeout(hop,1300);else setTimeout(()=>{toy.remove();cats.forEach(el=>{el.classList.remove('rmwalk');el.style.transition='';const h=document.createElement('i');h.className='rmheart';h.textContent='💗';el.appendChild(h);setTimeout(()=>h.remove(),1600)})},1300)};
  hop();toast(cats.length?'신나게 놀았어요! 친구들의 친밀도가 올랐어요 💗':'아직 함께 사는 친구가 없어요')}

// ----- 포즈 · 가구 위 자리 · 숨바꼭질 -----
let RM_SEEK=null;
function rmPose(b,pose){
  const tail=(d)=>`<path d="${d}" stroke="${RM_OL}" stroke-width="5.4" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${b.b}" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
  if(pose==='wave'){const c=rmCat(b);return c.replace('<svg viewBox="-2 -2 44 54">','<svg viewBox="-6 -2 48 54">').replace('</svg>',`<path d="M12 42C4 40 0 34 0 26" stroke="${RM_OL}" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M12 42C4 40 0 34 0 26" stroke="${b.b}" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="0" cy="23" r="4" fill="${b.b}" stroke="${RM_OL}" stroke-width="1.4"/><path d="M-1.4 21v1.8M1.4 21v1.8" stroke="${RM_OL}" stroke-width=".9"/><path d="M-6 16q-2 3 0 6M-3 13q-3 4 0 8" stroke="#FF9F7A" stroke-width="1.2" fill="none" stroke-linecap="round" class="camwv"/></svg>`)}
  if(pose==='sleep')return `<svg viewBox="-2 -2 44 54">${tail('M6 46c-6 2-8-4-2-6')}<ellipse cx="22" cy="44" rx="16" ry="7.5" fill="${b.b}" stroke="${RM_OL}" stroke-width="1.6"/><g transform="translate(5,15) scale(.72)">${bFace(b,true)}</g><text x="34" y="18" class="rmz">z</text><text x="38" y="11" class="rmz z2">z</text></svg>`;
  if(pose==='lie')return `<svg viewBox="-2 -2 44 54">${tail('M38 44c6 0 7-6 3-8')}<ellipse cx="24" cy="44" rx="15" ry="6.5" fill="${b.b}" stroke="${RM_OL}" stroke-width="1.6"/><path d="M6 49h8M12 49h8" stroke="${RM_OL}" stroke-width="2.6" stroke-linecap="round"/><g transform="translate(-3,13) scale(.78)">${bFace(b)}</g></svg>`;
  if(pose==='stretch')return `<svg viewBox="-2 -2 44 54">${tail('M34 30c6-6 8-12 4-16')}<path d="M6 44c4-6 22-14 30-12 3 1 2 6-1 8-6 3-20 6-29 6z" fill="${b.b}" stroke="${RM_OL}" stroke-width="1.6"/><path d="M4 48h9M30 46v4" stroke="${RM_OL}" stroke-width="2.6" stroke-linecap="round"/><g transform="translate(-6,20) scale(.68)">${bFace(b)}</g></svg>`;
  return rmCat(b)}
function rmSetPose(el,pose){if(el._pose===pose)return;el._pose=pose;const b=BREEDS[+el.dataset.rmc];if(!b)return;const h=el.querySelector('.rmheart');el.innerHTML=rmPose(b,pose);if(h)el.appendChild(h);el.classList.toggle('rmwide',pose==='sleep'||pose==='lie'||pose==='stretch')}
// 가구 위 앉을 자리: [svg x, svg y(바닥선), 포즈, 앞/뒤]
const RM_SPOTS={tower:[[18,8,'sleep',1],[42,28,'sit',1],[30,52,'sit',1]],sofa:[[24,34,'lie',1],[40,34,'sit',1]],bed:[[30,44,'sleep',1]],cushion:[[30,42,'sleep',1]],rug:[[22,42,'lie',1],[40,44,'sit',1]],
  box:[[30,46,'sit',-1]],plant:[[34,56,'sit',-1]],shelf:[[30,4,'sleep',1],[30,22,'sit',1]],window:[[30,52,'sit',1]],sofa2:[],fish:[[30,40,'sit',-1]],lamp:[[34,56,'sit',-1]],desk:[[46,20,'sleep',1],[20,56,'sit',1]],bathtub:[[24,32,'sit',-1],[40,32,'sit',-1]],bmat:[[30,48,'lie',1]],washer:[[30,6,'sleep',1]],basket:[[30,34,'sit',-1]],wshelf:[[46,40,'sit',1]]};
function rmSpotPos(it,sp){const I=RM_ITEMS[it.k];const sc=document.getElementById('rmscene');const ar=sc?sc.clientWidth/sc.clientHeight:4/3;const fx=it.f?(60-sp[0])/60:sp[0]/60;
  return {x:it.x+(fx-.5)*I.w,y:it.y-(1-sp[1]/60)*I.w*ar,z:(I.p==='wall'?2:Math.round(it.y))+sp[3]}}
function rmAllSpots(){const R=rmS();const o=[];R.items.forEach(it=>(RM_SPOTS[it.k]||[]).forEach((sp,j)=>o.push({key:it.id+':'+j,it,sp})));return o}
function rmMove(el,x,y,z,pose,walk=true){const x0=parseFloat(el.style.left);el.classList.toggle('rmflip',x<x0);if(walk){rmSetPose(el,'sit');el.classList.add('rmwalk')}
  el.style.left=x+'%';el.style.top=y+'%';el.style.zIndex=z;clearTimeout(el._t);el._t=setTimeout(()=>{el.classList.remove('rmwalk');rmSetPose(el,pose)},walk?2400:0)}
function rmWander(){clearInterval(RM_T);const used={};
  RM_T=setInterval(()=>{if(VIEW!=='room'||RM_TAB!=='room'){clearInterval(RM_T);return}if(RM_SEEK||RM_EDIT)return;try{jsWalk()}catch(e){}
    const spots=rmAllSpots();
    document.querySelectorAll('#rmscene .rmc').forEach(el=>{if(el.classList.contains('rmwalk'))return;if(Math.random()<(el._pose==='sleep'?.8:.5))return;
      if(el._spot){delete used[el._spot];el._spot=null}
      const r=Math.random();const free=spots.filter(s=>!used[s.key]);
      if(r<.4&&free.length){const s=free[Math.floor(Math.random()*free.length)];const p=rmSpotPos(s.it,s.sp);used[s.key]=1;el._spot=s.key;rmMove(el,p.x,p.y,p.z,s.sp[2])}
      else if(r<.55){rmSetPose(el,'sleep')}else if(r<.65){rmSetPose(el,'stretch');setTimeout(()=>rmSetPose(el,'sit'),1800)}else if(r<.72){rmSetPose(el,'lie')}
      else{const x=6+Math.random()*86,y=64+Math.random()*31;rmMove(el,x,y,Math.round(y)+1,'sit')}})},3000)}
function rmSeek(){const sc=document.getElementById('rmscene');if(!sc)return;const cats=[...sc.querySelectorAll('.rmc')];if(!cats.length)return;
  const R=rmS();const hides=[];R.items.forEach(it=>{const I=RM_ITEMS[it.k];if(I.p==='wall')return;
    if(['box','plant','sofa','shelf','lamp','tower','bed','fish','desk','bathtub','washer','basket'].includes(it.k)){const sc2=document.getElementById('rmscene');const ar=sc2.clientWidth/sc2.clientHeight;
      const peekY=it.k==='box'?it.y-I.w*ar*.18:it.k==='window'?it.y-I.w*ar*.02:it.y-I.w*ar*.12;hides.push({x:it.x+(Math.random()-.5)*I.w*.4,y:peekY,z:(I.p==='wall'?1:Math.round(it.y)-1),k:it.k})}});
  const edges=[{x:3,y:82,z:3},{x:97,y:90,z:3},{x:50,y:108,z:3},{x:3,y:99,z:3},{x:97,y:72,z:3}];
  RM_SEEK={n:cats.length,f:0};sc.classList.add('rmseeking');
  const cover=document.createElement('div');cover.className='rmcover';cover.innerHTML='<b>🙈 눈 감아요!</b><span>하나, 둘, 셋…</span>';sc.appendChild(cover);
  setTimeout(()=>{const pool=hides.sort(()=>Math.random()-.5);cats.forEach((el,i)=>{const h=pool[i]||edges[(i-pool.length)%edges.length];el.style.transition='none';rmSetPose(el,'sit');el.classList.remove('rmwalk');el.style.left=h.x+'%';el.style.top=h.y+'%';el.style.zIndex=h.z;el.classList.add('rmhid')});
    cover.innerHTML=`<b>🔍 숨은 친구 ${cats.length}마리를 찾아 보세요!</b><span>가구 뒤, 상자 안, 방 구석을 살펴봐요</span>`;rmSeekBadge();setTimeout(()=>cover.classList.add('rmfade'),1600);setTimeout(()=>cover.remove(),2300)},1500)}
function rmFound(el){if(!el.classList.contains('rmhid'))return;el.classList.remove('rmhid');el.style.transition='';RM_SEEK.f++;
  const y=66+Math.random()*28,x=Math.max(8,Math.min(92,parseFloat(el.style.left)));el.style.left=x+'%';el.style.top=y+'%';el.style.zIndex=Math.round(y)+1;
  const h=document.createElement('i');h.className='rmheart';h.textContent='찾았다!';el.appendChild(h);setTimeout(()=>h.remove(),1600);
  if(RM_SEEK.f>=RM_SEEK.n){const R=rmS();const d=today();let msg=`다 찾았어요! 🎉`;if(R.seekDay!==d){R.seekDay=d;if(rmEarn(1))msg+=' 오늘의 숨바꼭질 보너스 ⭐1'}
    RM_SEEK=null;const sc3=document.getElementById('rmscene');sc3.classList.remove('rmseeking');const bd=sc3.querySelector('.rmsbadge');if(bd)bd.remove();toast(msg);setTimeout(()=>{if(VIEW==='room')render()},1800)}
  else rmSeekBadge()}
function rmSeekBadge(){const sc=document.getElementById('rmscene');if(!sc||!RM_SEEK)return;let b=sc.querySelector('.rmsbadge');if(!b){b=document.createElement('div');b.className='rmsbadge';sc.appendChild(b)}b.textContent=`🔍 ${RM_SEEK.f} / ${RM_SEEK.n}`}

// ----- 📸 친구랑 셀카 -----
const CAM_POSES=[['sit','앉기'],['wave','손 흔들기'],['lie','눕기'],['stretch','기지개'],['sleep','쿨쿨']];
const CAM_FRAMES=[['#FFFFFF','#4A3B33'],['#FFE3EA','#B0476A'],['#DDF5EF','#1F7A68'],['#E6EEFF','#3D5BA9'],['#2E3A6B','#FFE08A']];
let CAM=null;
function camSvg(b,pose,flip){let v=rmPose(b,pose).replace('<svg ',`<svg xmlns="http://www.w3.org/2000/svg" width="${pose==='wave'?480:440}" height="540" `);if(flip)v=v.replace(/(<svg[^>]*>)/,'$1<g transform="translate(40,0) scale(-1,1)">').replace(/<\/svg>$/,'</g></svg>');return v}
function camOpen(){const R=rmS();const pool=rmLive().length?rmLive():rmAll();
  CAM={cats:pool.slice(0,1).map((i,n)=>({i,x:72,y:96,s:34,pose:'wave',f:0})),sel:0,frame:0,facing:'user',stream:null,bg:null,shot:null};
  let el=document.getElementById('rmcam');if(!el){el=document.createElement('div');el.id='rmcam';document.body.appendChild(el)}
  el.className='rmcam on';camDraw();camStart()}
function camClose(){camStop();const el=document.getElementById('rmcam');if(el){el.className='rmcam';el.innerHTML=''}CAM=null}
function camStop(){if(CAM&&CAM.stream){CAM.stream.getTracks().forEach(t=>t.stop());CAM.stream=null}}
async function camStart(){camStop();const v=document.getElementById('camv');const msg=document.getElementById('cammsg');
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){if(msg)msg.innerHTML='이 화면에서는 카메라를 쓸 수 없어요.<br><b>📷 사진 고르기</b>로 찍어 둔 사진을 써 보세요.';return}
  try{const st=await navigator.mediaDevices.getUserMedia({video:{facingMode:CAM.facing,width:{ideal:1280},height:{ideal:960}},audio:false});if(!CAM){st.getTracks().forEach(t=>t.stop());return}
    CAM.stream=st;CAM.bg=null;const v2=document.getElementById('camv');if(v2){v2.srcObject=st;v2.play().catch(()=>{})}if(msg)msg.style.display='none';camDraw(true)}
  catch(e){if(msg){msg.style.display='';msg.innerHTML='카메라를 켤 수 없어요. (권한을 허락했는지 확인해 주세요)<br><b>📷 사진 고르기</b>나 <b>🎨 배경만</b>으로도 찍을 수 있어요.'}}}
function camCatHTML(c,n){return `<div class="camcat ${n===CAM.sel?'sel':''}" data-camcat="${n}" style="left:${c.x}%;top:${c.y}%;width:${c.s}%">${c.i<0?camJs(c.f):camSvg(BREEDS[c.i],c.pose,c.f)}</div>`}
function camJs(flip){let v=jsSvg(rmLook(),true);if(flip)v=v.replace(/(<svg[^>]*>)/,'$1<g transform="translate(60,0) scale(-1,1)">').replace(/<\/svg>$/,'</g></svg>');return v}
function camName(i){return i<0?'내 집사':BREEDS[i].n}
function camDraw(keepVideo){const el=document.getElementById('rmcam');if(!el||!CAM)return;const R=rmS();const all=rmAll();const live=rmLive();const fr=CAM_FRAMES[CAM.frame];
  const names=CAM.cats.filter(c=>c.i>=0).map(c=>BREEDS[c.i].n).join(', ');const sc=CAM.cats[CAM.sel];
  if(CAM.shot){el.innerHTML=`<div class="camwrap"><div class="camtop"><b>📸 찰칵!</b><button class="camx" data-cam="close">✕</button></div>
    <img class="camshot" src="${CAM.shot}" alt="친구랑 셀카"><p class="camhint">저장이 안 되면 사진을 길게 눌러 저장하세요</p>
    <div class="cambtns"><button class="cambig" data-cam="save">💾 저장하기</button>${navigator.canShare?'<button class="cambtn" data-cam="share">📤 보내기</button>':''}<button class="cambtn" data-cam="again">↩ 다시 찍기</button></div></div>`;return}
  const video=keepVideo&&document.getElementById('camv');
  el.innerHTML=`<div class="camwrap"><div class="camtop"><b>📸 친구랑 셀카</b><button class="camx" data-cam="close">✕</button></div>
    <div class="camstage" id="camstage" style="--fb:${fr[0]};--ft:${fr[1]}"><div class="camview">${CAM.bg?`<img class="cambg" src="${CAM.bg}" alt="">`:CAM.bgc?`<div class="cambg" style="background:${CAM.bgc}"></div>`:'<video id="camv" autoplay playsinline muted></video><div class="cammsg" id="cammsg">카메라를 켜는 중…</div>'}
      ${CAM.cats.map(camCatHTML).join('')}<i class="camcd" id="camcd"></i></div>
      <div class="camfoot"><span>🐾 ${esc(R.name||'나')} & ${esc(names||'친구')}</span><small>${new Date().toLocaleDateString('ko-KR')} · yang2수학 미니홈피</small></div></div>
    <div class="campanel">
      <div class="camrow"><b>함께 찍을 친구</b> <small>(최대 3마리 · 끌어서 옮기고, 눌러서 고르세요)</small></div>
      <div class="camcats"><button class="camc ${CAM.cats.some(c=>c.i<0)?'on':''}" data-campick="-1"><svg viewBox="8 6 44 44" width="34" height="30">${jsSvg(rmLook()).replace(/^<svg[^>]*>|<\/svg>$/g,'')}</svg><span>내 집사</span></button>${(live.length?live.concat(all.filter(i=>!live.includes(i))):all).map(i=>{const on=CAM.cats.findIndex(c=>c.i===i);return `<button class="camc ${on>=0?'on':''}" data-campick="${i}"><svg viewBox="0 -2 40 36" width="34" height="30">${bFace(BREEDS[i])}</svg><span>${esc(BREEDS[i].n)}</span></button>`}).join('')}</div>
      ${sc?`<div class="camrow"><b>${esc(camName(sc.i))}</b> ${sc.i<0?'':'포즈'}</div><div class="camopts">${sc.i<0?'':CAM_POSES.map(([k,t])=>`<button class="${sc.pose===k?'on':''}" data-campose="${k}">${t}</button>`).join('')}<button data-cam="flip">↔ 방향</button></div>
      <div class="camrow"><b>크기</b><input type="range" min="14" max="70" value="${sc.s}" data-camsize></div>`:''}
      <div class="camrow"><b>테두리</b>${CAM_FRAMES.map((f,n)=>`<button class="camfr ${CAM.frame===n?'on':''}" data-camfr="${n}" style="background:${f[0]};border-color:${f[1]}"></button>`).join('')}</div>
      <div class="cambtns"><button class="cambig" data-cam="shoot">📸 찰칵 (3초)</button>${CAM.bg||CAM.bgc?'<button class="cambtn" data-cam="camera">🎥 카메라로</button>':'<button class="cambtn" data-cam="switch">🔄 앞/뒤</button>'}<label class="cambtn">📷 사진 고르기<input type="file" accept="image/*" data-camfile hidden></label><button class="cambtn" data-cam="plain">🎨 배경만</button></div>
      <p class="camhint">사진은 이 기기에만 저장돼요. 다른 곳으로 보내지지 않아요.</p></div></div>`;
  if(video){const v=document.getElementById('camv');v.replaceWith(video);const m=document.getElementById('cammsg');if(m&&CAM.stream)m.style.display='none'}
  else if(CAM.stream&&document.getElementById('camv')){const v=document.getElementById('camv');v.srcObject=CAM.stream;v.play().catch(()=>{});const m=document.getElementById('cammsg');if(m)m.style.display='none'}
  camDragInit()}
function camDragInit(){const st=document.querySelector('#rmcam .camview');if(!st)return;
  st.querySelectorAll('.camcat').forEach(el=>el.addEventListener('pointerdown',e=>{e.preventDefault();const n=+el.dataset.camcat;const c=CAM.cats[n];const r=st.getBoundingClientRect();const x0=e.clientX,y0=e.clientY,cx=c.x,cy=c.y;let moved=false;
    const chg=CAM.sel!==n;if(chg){CAM.sel=n;st.querySelectorAll('.camcat').forEach(z=>z.classList.toggle('sel',+z.dataset.camcat===n))}
    try{el.setPointerCapture(e.pointerId)}catch(_){}
    const mv=ev=>{const dx=(ev.clientX-x0)/r.width*100,dy=(ev.clientY-y0)/r.height*100;if(Math.abs(dx)+Math.abs(dy)>1)moved=true;c.x=Math.max(0,Math.min(100,cx+dx));c.y=Math.max(15,Math.min(115,cy+dy));el.style.left=c.x+'%';el.style.top=c.y+'%'};
    const up=()=>{el.removeEventListener('pointermove',mv);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',up);if(chg)camPanel()};
    el.addEventListener('pointermove',mv);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up)}))}
function camPanel(){camDraw(true)}
function camLoadImg(src){return new Promise((ok,no)=>{const im=new Image();im.onload=()=>ok(im);im.onerror=no;im.src=src})}
async function camShoot(){const cd=document.getElementById('camcd');for(const n of [3,2,1]){if(!CAM)return;if(cd){cd.textContent=n;cd.className='camcd go'}await new Promise(r=>setTimeout(r,800));if(cd)cd.className='camcd'}
  if(!CAM)return;const W=900,H=1200,FT=150,P=36;const cv=document.createElement('canvas');cv.width=W+P*2;cv.height=H+P+FT;const x=cv.getContext('2d');const fr=CAM_FRAMES[CAM.frame];
  x.fillStyle=fr[0];x.fillRect(0,0,cv.width,cv.height);x.save();x.beginPath();x.roundRect?x.roundRect(P,P,W,H,28):x.rect(P,P,W,H);x.clip();
  const cover=(w,h)=>{const s=Math.max(W/w,H/h);return [P+(W-w*s)/2,P+(H-h*s)/2,w*s,h*s]};
  const v=document.getElementById('camv');
  if(CAM.bg){const im=await camLoadImg(CAM.bg);const [a,b,c,d]=cover(im.width,im.height);x.drawImage(im,a,b,c,d)}
  else if(CAM.bgc){x.fillStyle=CAM.bgc.match(/#[0-9A-Fa-f]{6}/)[0];x.fillRect(P,P,W,H)}
  else if(v&&v.videoWidth){const [a,b,c,d]=cover(v.videoWidth,v.videoHeight);if(CAM.facing==='user'){x.translate(2*P+W,0);x.scale(-1,1)}x.drawImage(v,a,b,c,d);x.setTransform(1,0,0,1,0,0)}
  else{x.fillStyle='#FFF6E6';x.fillRect(P,P,W,H)}
  for(const c of CAM.cats){const im=await camLoadImg('data:image/svg+xml;charset=utf-8,'+encodeURIComponent(c.i<0?camJs(c.f):camSvg(BREEDS[c.i],c.pose,c.f)));const w=W*c.s/100,h=w*(c.i<0?84/60:c.pose==='wave'?54/48:54/44);x.drawImage(im,P+W*c.x/100-w/2,P+H*c.y/100-h,w,h)}
  x.restore();x.fillStyle=fr[1];x.textBaseline='middle';x.font="44px Jua, 'IBM Plex Sans KR', sans-serif";const R=rmS();
  x.fillText('🐾 '+(R.name||'나')+' & '+(CAM.cats.filter(c=>c.i>=0).map(c=>BREEDS[c.i].n).join(', ')||'친구'),P+6,H+P+FT*.42,W-12);x.font="26px 'IBM Plex Sans KR', sans-serif";x.globalAlpha=.75;x.fillText(new Date().toLocaleDateString('ko-KR')+' · yang2수학 미니홈피',P+6,H+P+FT*.78);x.globalAlpha=1;
  CAM.shot=cv.toDataURL('image/png');camStop();R.love=R.love||{};CAM.cats.forEach(c=>{if(c.i>=0)R.love[c.i]=(R.love[c.i]||0)+1});save();camDraw()}
function camFileName(){const d=new Date();return `yang2셀카_${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}_${String(d.getHours()).padStart(2,'0')}${String(d.getMinutes()).padStart(2,'0')}.png`}
document.addEventListener('click',async e=>{const t=e.target.closest('#rmcam [data-cam],#rmcam [data-campick],#rmcam [data-campose],#rmcam [data-camfr]');if(!t||!CAM)return;e.preventDefault();e.stopPropagation();const a=t.dataset.cam;
  if(t.dataset.campick){const i=+t.dataset.campick;const k=CAM.cats.findIndex(c=>c.i===i);if(k>=0){CAM.cats.splice(k,1);CAM.sel=Math.max(0,Math.min(CAM.sel,CAM.cats.length-1))}else{if(CAM.cats.length>=(CAM.cats.some(c=>c.i<0)||i<0?4:3)){toast('친구는 최대 3마리까지 함께 찍을 수 있어요');return}if(i<0){CAM.cats.push({i:-1,x:30,y:100,s:40,pose:'sit',f:0});CAM.sel=CAM.cats.length-1;return camDraw(true)}const n=CAM.cats.filter(c=>c.i>=0).length;CAM.cats.push({i,x:[72,28,50][n],y:[96,96,70][n],s:n==2?26:32,pose:CAM_POSES[(n*2+1)%CAM_POSES.length][0],f:n==1?1:0});CAM.sel=CAM.cats.length-1}return camDraw(true)}
  if(t.dataset.campose){CAM.cats[CAM.sel].pose=t.dataset.campose;return camDraw(true)}
  if(t.dataset.camfr){CAM.frame=+t.dataset.camfr;return camDraw(true)}
  if(a==='close')return camClose();
  if(a==='flip'){const c=CAM.cats[CAM.sel];c.f=c.f?0:1;return camDraw(true)}
  if(a==='shoot'){if(!CAM.cats.length){toast('함께 찍을 친구를 골라 주세요');return}return camShoot()}
  if(a==='switch'){CAM.facing=CAM.facing==='user'?'environment':'user';const v=document.getElementById('camv');if(v)v.style.transform=CAM.facing==='user'?'':'none';return camStart()}
  if(a==='camera'){CAM.bg=null;CAM.bgc=null;camDraw();return camStart()}
  if(a==='plain'){camStop();CAM.bg=null;const cs=['#FFF6E6','#E9FAF5','#E6EEFF','#FFF4F6','#FFF0C9'];CAM.bgc=cs[(cs.indexOf(CAM.bgc)+1)%cs.length];return camDraw()}
  if(a==='again'){CAM.shot=null;if(CAM.bg||CAM.bgc)return camDraw();camDraw();return camStart()}
  if(a==='save'){const l=document.createElement('a');l.href=CAM.shot;l.download=camFileName();document.body.appendChild(l);l.click();l.remove();toast('사진을 저장했어요 📸');return}
  if(a==='share'){try{const bl=await (await fetch(CAM.shot)).blob();const f=new File([bl],camFileName(),{type:'image/png'});if(navigator.canShare({files:[f]}))await navigator.share({files:[f],title:'친구랑 셀카'});else toast('이 기기에서는 보내기를 쓸 수 없어요')}catch(err){}return}
},true);
document.addEventListener('input',e=>{if(!CAM)return;const t=e.target;if(t.matches('#rmcam [data-camsize]')){const c=CAM.cats[CAM.sel];if(!c)return;c.s=+t.value;const el=document.querySelector(`#rmcam .camcat[data-camcat="${CAM.sel}"]`);if(el)el.style.width=c.s+'%'}});
document.addEventListener('change',e=>{if(!CAM)return;const t=e.target;if(t.matches('#rmcam [data-camfile]')&&t.files&&t.files[0]){const rd=new FileReader();rd.onload=()=>{camStop();CAM.bgc=null;CAM.bg=rd.result;camDraw()};rd.readAsDataURL(t.files[0])}});
