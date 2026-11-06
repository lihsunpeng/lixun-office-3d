// v10 升級模組：狀態、成果牆、走近互動、可點家具、白板、會議泡泡、對話紀錄、編輯模式、公開/內部、慶祝
const Q=new URLSearchParams(location.search);
const INTERNAL=Q.get('mode')==='internal'; // 注意：僅顯示切換，非真正權限保護
const wait=f=>new Promise(r=>{const t=setInterval(()=>{if(f()){clearInterval(t);r()}},100)});
await wait(()=>window.__T);
const {THREE,S,C,R,O,DESKS,box,label}=window.__T;
const nc=u=>u+(u.includes('?')?'&':'?')+'t='+Date.now();
const ST=await fetch(nc('status.json')).then(r=>r.json()).catch(()=>({agents:{},achievements:[],meeting:[]}));
const LOG=await fetch(nc('log.json')).then(r=>r.json()).catch(()=>({sessions:[]}));
const SCOL={'待命':'#9ca3af','研究':'#3b82f6','執行':'#16a34a','異常':'#dc2626'};
const stOf=n=>(ST.agents[n]||{status:'待命'}).status;
window.__typing=n=>stOf(n)==='執行'?1:0; // 只有「執行」才打字
const css=document.createElement('style');css.textContent=`
.up-btn{position:fixed;z-index:12;font:bold 14px sans-serif;padding:7px 10px;border-radius:9px;border:1px solid #889;background:#fff;cursor:pointer;box-shadow:0 2px 6px #0002}
.up-pan{position:fixed;z-index:20;left:50%;top:50%;transform:translate(-50%,-50%);width:min(520px,92vw);max-height:80vh;overflow:auto;background:#fffffff6;border-radius:14px;padding:16px;font:14px "Noto Sans CJK TC",sans-serif;box-shadow:0 6px 30px #0005;display:none}
.up-pan h3{margin:0 0 8px}.up-x{float:right;cursor:pointer;font-size:20px}
.chip{display:inline-block;color:#fff;border-radius:8px;padding:1px 7px;font-size:12px;margin-left:6px}
#bar2{position:fixed;right:10px;bottom:10px;z-index:12;display:flex;flex-wrap:wrap;gap:6px;justify-content:flex-end;max-width:60vw}
#bar2 button{font:bold 13px sans-serif;padding:6px 9px;border-radius:9px;border:1px solid #889;background:#fff;cursor:pointer}
#modeTag{position:fixed;right:10px;top:10px;z-index:12;background:${INTERNAL?'#7c3aed':'#0f766e'};color:#fff;padding:4px 10px;border-radius:8px;font:bold 13px sans-serif}
#joy{position:fixed;left:18px;bottom:90px;width:110px;height:110px;border-radius:50%;background:#0002;border:2px solid #fff8;z-index:12;touch-action:none}
#joy i{position:absolute;left:35px;top:35px;width:40px;height:40px;border-radius:50%;background:#fffc}
@media(max-width:900px){#bar2{max-width:62vw;bottom:auto;top:44px}#bar2 button{font-size:12px;padding:5px 7px}}`;document.head.appendChild(css);css.textContent+='#helpPan{top:auto;bottom:12px;left:12px;transform:none;width:min(360px,90vw)}@media(max-width:900px){#helpPan{bottom:auto;top:60px}}';
const tag=document.createElement('div');tag.id='modeTag';tag.textContent=INTERNAL?'內部檢視（?mode=internal）':'公開參觀模式';document.body.appendChild(tag);
// panel helper
function pan(title,html,id='upPan'){let p=document.getElementById(id);if(!p){p=document.createElement('div');p.id=id;p.className='up-pan';document.body.appendChild(p)}
 p.innerHTML=`<span class="up-x" onclick="this.parentNode.style.display='none'">✕</span><h3>${title}</h3>${html}`;p.style.display='block';return p}
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const lk=(u,t)=>u?`<a href="${u}" target="_blank" rel="noopener">${esc(t||u)}</a>`:esc(t);
// ---------- 1 狀態標籤 ----------
await wait(()=>window.__people&&window.__ready);
const people=window.__people;
function stSprite(n){const s=stOf(n);const t=INTERNAL&&ST.agents[n]?.task?`${s}・${ST.agents[n].task}`:s;
 const sp=label('● '+t,0,0,0,SCOL[s]+'ee',34);sp.scale.multiplyScalar(.35);return sp}
for(const p of people){p.stl=stSprite(p.n)}
// ---------- 6 會議泡泡 ----------
let bub=null,bubKey='';
function inMeet(p){const x=p.g.position.x,z=p.g.position.z;return x>-3&&x<3&&z>-10.8&&z<-5}
function upBubble(){const listed=(ST.meeting||[]);const live=people.filter(inMeet).map(p=>p.n);const set=[...new Set([...listed,...live])];
 const sh=n=>n.split('（')[0];const standby=people.filter(p=>!set.includes(p.n)).length;
 const t=`💬 討論中：${set.map(sh).join('、')||'無'}｜待命 ${standby} 人`;if(t===bubKey)return;bubKey=t;bub&&S.remove(bub);bub=label(t,0,3.9,-7.9,'#fff7c2f0',36);bub.scale.multiplyScalar(.7)}
// ---------- 4 可點家具 ----------
const ach=ST.achievements||[];
const HOT=[];
function hot(name,x,y,z,w,h,d,fn,nl){const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),new THREE.MeshBasicMaterial({visible:false}));m.position.set(x,y,z);m.userData={name,fn};S.add(m);HOT.push(m);if(nl)return;const l=label('👆 '+name,x,y+h/2+.35,z,'#e0f2feee',26);l.scale.multiplyScalar(.6)}
const achHTML=()=>ach.map(a=>`<div style="padding:6px 0;border-bottom:1px solid #eee">${a.done?'✅':'⏳'} <b>${lk(a.link,a.title)}</b><br><small>${esc(a.date)}・${esc(a.who)}${a.link?'':'（檔案在 Grok Bot 電腦，非公開）'}</small></div>`).join('');
hot('資料櫃・成果',2.1,1,10.5,4.2,2,.8,()=>pan('📂 線上資料區・專案成果',achHTML()));
hot('會議螢幕・專案',0,1.6,-10.5,4.5,1.6,.3,()=>pan('🖥️ 會議室大螢幕',`<p>正在討論：兩專案 20 項升級</p>${lk('https://lihsunpeng.github.io/taipei-arch-island/','台北人文建築散步島')}<br>${lk('https://lihsunpeng.github.io/lixun-office-3d/','3D 辦公室公開版')}`));
hot('白板（可畫）',-2.9,1.5,-7.5,.3,1.1,2.1,()=>openWB());
for(const d of DESKS){const [x,z]=d.pos;hot('螢幕',x,1.15,z-.3,1.4,.5,.2,()=>window.showTasks&&window.showTasks(d.name),1)}
// ---------- 2 成果牆（3D 牆面 + 面板） ----------
{const c=document.createElement('canvas');c.width=1024;c.height=640;const g=c.getContext('2d');g.fillStyle='#fffaf0';g.fillRect(0,0,1024,640);g.fillStyle='#b45309';g.fillRect(0,0,1024,90);g.fillStyle='#fff';g.font='bold 54px sans-serif';g.fillText('🏅 近期成果牆',24,64);
 g.fillStyle='#222';g.font='bold 34px sans-serif';ach.slice(0,7).forEach((a,i)=>g.fillText((a.done?'✔ ':'… ')+a.title.slice(0,26),24,150+i*68));
 const tx=new THREE.CanvasTexture(c);tx.colorSpace=THREE.SRGBColorSpace;const m=new THREE.Mesh(new THREE.PlaneGeometry(4,2.5),new THREE.MeshBasicMaterial({map:tx}));m.position.set(-8,1.7,10.88);m.rotation.y=Math.PI;S.add(m);m.userData={name:'成果牆',fn:()=>pan('🏅 近期成果牆',achHTML())};HOT.push(m)}
// ---------- 5 白板 ----------
const WBK='lx_whiteboard_v1';let wbMesh=null;
function wbTex(){const src=localStorage.getItem(WBK);if(!src)return;const im=new Image();im.onload=()=>{const t=new THREE.Texture(im);t.needsUpdate=true;t.colorSpace=THREE.SRGBColorSpace;
 if(!wbMesh){wbMesh=new THREE.Mesh(new THREE.PlaneGeometry(1.95,.97),new THREE.MeshBasicMaterial({map:t}));wbMesh.position.set(-2.86,1.5,-7.5);wbMesh.rotation.y=Math.PI/2;S.add(wbMesh)}else wbMesh.material.map=t};im.src=src}
wbTex();
function openWB(){const p=pan('📝 會議室白板（存在這台裝置）',`<canvas id="wbc" width="800" height="400" style="width:100%;border:1px solid #999;border-radius:8px;touch-action:none;background:#fff"></canvas>
<div style="margin-top:6px">顏色 <input id="wbcol" type="color" value="#1d4ed8"> <input id="wbtxt" placeholder="輸入文字後點白板放置" style="width:45%"> <button id="wbclr">清除</button> <button id="wbsave">儲存</button></div>`);
 const cv=p.querySelector('#wbc'),g=cv.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,800,400);const src=localStorage.getItem(WBK);if(src){const im=new Image();im.onload=()=>g.drawImage(im,0,0);im.src=src}
 let dn=false;const pt=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*800/r.width,(e.clientY-r.top)*400/r.height]};
 cv.onpointerdown=e=>{const t=p.querySelector('#wbtxt').value;const [x,y]=pt(e);g.fillStyle=g.strokeStyle=p.querySelector('#wbcol').value;if(t){g.font='bold 32px sans-serif';g.fillText(t,x,y);p.querySelector('#wbtxt').value='';return}dn=true;g.lineWidth=4;g.lineCap='round';g.beginPath();g.moveTo(x,y)};
 cv.onpointermove=e=>{if(!dn)return;const [x,y]=pt(e);g.lineTo(x,y);g.stroke()};cv.onpointerup=cv.onpointerleave=()=>dn=false;
 p.querySelector('#wbclr').onclick=()=>{g.fillStyle='#fff';g.fillRect(0,0,800,400)};
 p.querySelector('#wbsave').onclick=()=>{localStorage.setItem(WBK,cv.toDataURL());wbTex();p.querySelector('#wbsave').textContent='已儲存 ✔'}}
// ---------- 7 對話紀錄 ----------
function openLog(){pan('🗂️ 專員討論紀錄',LOG.sessions.map(s=>`<div><b>${esc(s.date)}｜${esc(s.topic)}</b><br><small>成員：${s.members.map(esc).join('、')}</small>${
 INTERNAL?s.entries.map(e=>`<div style="margin:6px 0;padding:6px 8px;background:#f3f4f6;border-radius:8px"><b>${esc(e.who.split('（')[0])}</b>：${esc(e.text)}</div>`).join(''):'<p style="color:#666">（公開模式只顯示主題；完整紀錄請用 ?mode=internal）</p>'}</div>`).join('<hr>'))}
// ---------- 10 慶祝 ----------
function confetti(msg){const cv=document.createElement('canvas');cv.width=innerWidth;cv.height=innerHeight;cv.style.cssText='position:fixed;inset:0;z-index:30;pointer-events:none';document.body.appendChild(cv);const g=cv.getContext('2d');
 const P=Array.from({length:160},()=>({x:Math.random()*innerWidth,y:-20-Math.random()*innerHeight*.5,vx:(Math.random()-.5)*3,vy:2+Math.random()*3,c:`hsl(${Math.random()*360},90%,55%)`,r:Math.random()*6}));
 const m=document.createElement('div');m.textContent='🎉 '+msg;m.style.cssText='position:fixed;top:40%;left:50%;transform:translate(-50%,-50%);z-index:31;background:#fff;border:3px solid #f0b400;border-radius:14px;padding:12px 20px;font:bold 20px sans-serif';document.body.appendChild(m);
 let t=0;(function f(){g.clearRect(0,0,cv.width,cv.height);P.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.r+=.1;g.fillStyle=p.c;g.save();g.translate(p.x,p.y);g.rotate(p.r);g.fillRect(-4,-2,8,5);g.restore()});if(++t<200)requestAnimationFrame(f);else{cv.remove();m.remove()}})()}
window.__confetti=confetti;
{const seen=JSON.parse(localStorage.getItem('lx_seen_done')||'[]');const nw=ach.filter(a=>a.done&&!seen.includes(a.id));
 if(nw.length&&!Q.has('noconfetti')){setTimeout(()=>confetti('成果交付：'+nw[0].title),900);localStorage.setItem('lx_seen_done',JSON.stringify(ach.filter(a=>a.done).map(a=>a.id)))}}
// ---------- 3 訪客 + 走近 + 搖桿/點地 ----------
const me=new THREE.Group();{const b=new THREE.Mesh(new THREE.CapsuleGeometry(.22,.7,4,8),new THREE.MeshStandardMaterial({color:0xf97316}));b.position.y=.6;me.add(b);const l=label('你（訪客）',0,1.6,0,'#ffedd5ee',28);me.remove(l);S.remove(l);l.position.set(0,1.6,0);l.scale.multiplyScalar(.5);me.add(l)}
me.position.set(0,0,5);S.add(me);let tgt=null;const key={};addEventListener('keydown',e=>key[e.key.toLowerCase()]=1);addEventListener('keyup',e=>key[e.key.toLowerCase()]=0);
let jv=[0,0];{const j=document.createElement('div');j.id='joy';j.innerHTML='<i></i>';document.body.appendChild(j);const k=j.querySelector('i');let on=false;
 const mv=e=>{const r=j.getBoundingClientRect();let dx=e.clientX-r.left-55,dz=e.clientY-r.top-55;const d=Math.hypot(dx,dz);if(d>40){dx*=40/d;dz*=40/d}k.style.left=35+dx+'px';k.style.top=35+dz+'px';jv=[dx/40,dz/40]};
 j.onpointerdown=e=>{on=true;j.setPointerCapture(e.pointerId);mv(e)};j.onpointermove=e=>on&&mv(e);j.onpointerup=()=>{on=false;jv=[0,0];k.style.left=k.style.top='35px'}}
let near=null,nearShown=null;
function helpPop(p){const s=ST.agents[p.n]||{};const mine=ach.filter(a=>a.who===p.n);
 pan(`🙋 ${esc(p.n)}：我能幫你做什麼？`,`<p>狀態<span class="chip" style="background:${SCOL[stOf(p.n)]}">${stOf(p.n)}</span>${INTERNAL&&s.task?'　'+esc(s.task):''}</p>
 <button onclick="showTasks('${p.n}')">看我負責的項目</button> <button onclick="document.getElementById('b-ach').click()">看成果牆</button> <button onclick="document.getElementById('b-log').click()">看討論紀錄</button>
 ${mine.length?'<div style="margin-top:8px"><b>我的成果</b>'+mine.map(a=>'<div>• '+lk(a.link,a.title)+'</div>').join('')+'</div>':''}
 <p style="font-size:12px;color:#666">這裡只顯示資訊與連結，不會自動開始任何工作；要交辦請直接跟立勛的 Grok Bot 說。</p>`,'helpPan')}
// ---------- 8 編輯模式 ----------
const LK='lx_layout_v1';let edit=false,drag=null;const lay=JSON.parse(localStorage.getItem(LK)||'{}');
for(const d of DESKS){const v=lay[d.name];if(v&&d.g){d.g.position.x=v[0];d.g.position.z=v[1];d.g.rotation.y=v[2]}}
const saveLay=()=>{const o={};DESKS.forEach(d=>d.g&&(o[d.name]=[d.g.position.x,d.g.position.z,d.g.rotation.y]));localStorage.setItem(LK,JSON.stringify(o))};
const ray=new THREE.Raycaster(),mp=new THREE.Vector2(),floor=new THREE.Plane(new THREE.Vector3(0,1,0),0),hit=new THREE.Vector3();
const setMp=e=>{mp.set(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1);ray.setFromCamera(mp,C)};
const deskOf=o=>{while(o){const d=DESKS.find(d=>d.g===o);if(d)return d;o=o.parent}};
R.domElement.addEventListener('pointerdown',e=>{if(!edit)return;setMp(e);const h=ray.intersectObjects(DESKS.map(d=>d.g),true)[0];if(h){drag=deskOf(h.object);O.enabled=false}});
R.domElement.addEventListener('pointermove',e=>{if(!drag)return;setMp(e);ray.ray.intersectPlane(floor,hit);drag.g.position.x=Math.max(-15,Math.min(15,hit.x));drag.g.position.z=Math.max(-10,Math.min(10,hit.z))});
addEventListener('pointerup',()=>{if(drag){saveLay();drag=null;O.enabled=true}});
addEventListener('keydown',e=>{if(edit&&e.key.toLowerCase()==='r'&&lastSel){lastSel.g.rotation.y+=Math.PI/2;saveLay()}});
let lastSel=null;R.domElement.addEventListener('pointerdown',e=>{if(edit){setMp(e);const h=ray.intersectObjects(DESKS.map(d=>d.g),true)[0];lastSel=h?deskOf(h.object):lastSel}});
// click: hotspots or tap-to-move
let downAt=null;R.domElement.addEventListener('pointerdown',e=>downAt=[e.clientX,e.clientY]);
R.domElement.addEventListener('click',e=>{if(edit||!downAt||Math.hypot(e.clientX-downAt[0],e.clientY-downAt[1])>6)return;setMp(e);
 const h=ray.intersectObjects(HOT,false)[0];if(h){h.object.userData.fn();return}
 const ph=ray.intersectObjects(people.flatMap(p=>[p.face,p.tag]),false)[0];if(ph)return; // 人物點擊沿用原面板
 if(ray.ray.intersectPlane(floor,hit))tgt=[hit.x,hit.z]});
// buttons
const bar=document.createElement('div');bar.id='bar2';document.body.appendChild(bar);
const B=(id,t,f)=>{const b=document.createElement('button');b.id=id;b.textContent=t;b.onclick=f;bar.appendChild(b);return b};
B('b-ach','🏅 成果牆',()=>pan('🏅 近期成果牆',achHTML()));
B('b-st','📊 狀態',()=>pan('📊 專員狀態（status.json）',`<small>更新：${esc(ST.updated||'')}</small>`+people.map(p=>`<div style="padding:3px 0">${esc(p.n)}<span class="chip" style="background:${SCOL[stOf(p.n)]}">${stOf(p.n)}</span>${INTERNAL?' <small>'+esc(ST.agents[p.n]?.task||'')+'</small>':''}</div>`).join('')+(INTERNAL?'':'<p style="color:#666;font-size:12px">公開模式不顯示工作細節</p>')));
B('b-log','🗂️ 討論紀錄',openLog);B('b-wb','📝 白板',openWB);
const be=B('b-edit','✏️ 編輯家具',()=>{edit=!edit;be.textContent=edit?'✅ 完成編輯（拖曳桌子、R 旋轉）':'✏️ 編輯家具';if(edit)rotB.style.display='';else rotB.style.display='none'});
const rotB=B('b-rot','⟳ 旋轉選取',()=>{if(lastSel){lastSel.g.rotation.y+=Math.PI/2;saveLay()}});rotB.style.display='none';
B('b-reset','↺ 還原家具',()=>{localStorage.removeItem(LK);location.reload()});
if(INTERNAL)B('b-done','🎉 標記交付完成',()=>{const t=prompt('交付的成果名稱？');if(t)confetti('成果交付：'+t)});
B('b-mode',INTERNAL?'👁 切到公開':'🔒 內部檢視',()=>{const u=new URL(location);INTERNAL?u.searchParams.delete('mode'):u.searchParams.set('mode','internal');location=u});
// ---------- per-frame ----------
const clk=new THREE.Clock();let acc=0;
(function loop(){requestAnimationFrame(loop);const dt=Math.min(clk.getDelta(),.1);acc+=dt;
 let vx=jv[0]+(key.d||key.arrowright?1:0)-(key.a||key.arrowleft?1:0),vz=jv[1]+(key.s||key.arrowdown?1:0)-(key.w||key.arrowup?1:0);
 if(Math.abs(vx)+Math.abs(vz)>.05){tgt=null;const f=new THREE.Vector3();C.getWorldDirection(f);f.y=0;f.normalize();const r=new THREE.Vector3(-f.z,0,f.x);const mv=r.multiplyScalar(vx).add(f.multiplyScalar(-vz)).multiplyScalar(dt*3);me.position.add(mv)}
 else if(tgt){const dx=tgt[0]-me.position.x,dz=tgt[1]-me.position.z,d=Math.hypot(dx,dz);if(d<.1)tgt=null;else{const s=Math.min(d,dt*3);me.position.x+=dx/d*s;me.position.z+=dz/d*s;me.rotation.y=Math.atan2(dx,dz)}}
 me.position.x=Math.max(-15.5,Math.min(15.5,me.position.x));me.position.z=Math.max(-10.5,Math.min(10.5,me.position.z));
 for(const p of people){p.stl.position.copy(p.face.position);p.stl.position.y-=.42}
 if(acc>.5){acc=0;upBubble();let b=null,bd=1.6;for(const p of people){const d=Math.hypot(p.g.position.x-me.position.x,p.g.position.z-me.position.z);if(d<bd){bd=d;b=p}}
  if(b&&b!==nearShown){nearShown=b;helpPop(b)}if(!b)nearShown=null}})();
upBubble();window.__up10=true;
