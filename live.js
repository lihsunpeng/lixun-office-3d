// 2026-11-22 專員狀態牌、水族箱與植栽動畫、植栽成長競賽排行（v44 卡比風格）
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
const wait=f=>new Promise(r=>{const t=setInterval(()=>{if(f()){clearInterval(t);r()}},60)});
await wait(()=>window.__T&&window.__ready===true&&window.__garden&&window.__markSeat);
const {THREE,S,C,R,O,DESKS}=window.__T;const G=window.__garden;
const nc=u=>u+(u.includes('?')?'&':'?')+'t='+Date.now();
const ST=await fetch(nc('status.json')).then(r=>r.json()).catch(()=>({agents:{},plants:{}}));
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const COL={'工作中':'#3DA764','待命':'#F6925A','停工':'#EA3C3C'};
const ICON={'工作中':'💻','待命':'☕','停工':'⛔'};
const short=n=>String(n).replace(/（.*$/,'').replace(/(股票投資顧問|科技創新|台歐訊息|醫學院教授|\(Diana\)狩獵與自然女神|導遊|智慧工藝女神|外語老師)$/,'');
const info=n=>{const a=ST.agents?.[n]||{};let s=a.status||'待命';if(!COL[s])s=(s==='執行'||s==='研究')?'工作中':'待命';return{s,task:a.task||'',recent:a.recent||(a.task?[a.task]:[])}};
const upd=ST.updated?String(ST.updated).slice(0,10):'';

/* ---------- CSS ---------- */
const st=document.createElement('style');st.textContent=`
.lv-x{position:sticky;top:0;float:right;margin:-4px -4px 0 6px;z-index:2;width:34px;height:34px;border-radius:50%!important;border:2px solid #F894BB!important;background:#FDFBF4!important;color:#8a2f48;font:bold 18px sans-serif;cursor:pointer}
.lv-box{margin-top:10px;padding:10px 12px;border-radius:16px;background:#FFF1F6;border:2px dashed #F894BB}
.lv-box h4{margin:0 0 6px;color:#ED6578;font-size:15px}.lv-box ul{margin:0;padding-left:18px}.lv-box li{margin:3px 0}
.lv-chip{display:inline-block;color:#fff;border-radius:999px;padding:1px 10px;font-size:13px;font-weight:700}
.lv-sm{font-size:12px;color:#b86a82;margin-top:6px}
#rankPan{z-index:23!important}#rankPan ol,#rankPan ul{margin:6px 0 0;padding-left:22px}#rankPan li{margin:4px 0}
#rankPan .demo{display:inline-block;background:#F6925A;color:#fff;border-radius:999px;padding:0 8px;font-size:12px;margin-left:6px}
`;document.head.appendChild(st);

/* ---------- 1. 桌上狀態牌 ---------- */
function chipTex(name,s){const cv=document.createElement('canvas');cv.width=320;cv.height=120;const g=cv.getContext('2d');
 g.fillStyle='#FFF8FB';g.strokeStyle=COL[s]||'#F894BB';g.lineWidth=10;g.beginPath();g.roundRect(6,6,308,108,44);g.fill();g.stroke();
 g.fillStyle=COL[s]||'#F894BB';g.beginPath();g.arc(52,60,20,0,7);g.fill();
 g.fillStyle='#5a2a3a';g.font='bold 40px "Noto Sans CJK TC",sans-serif';g.textBaseline='middle';g.fillText(s,84,44);
 g.font='bold 26px "Noto Sans CJK TC",sans-serif';g.fillStyle='#8a2f48';g.fillText(name.slice(0,9),86,88);
 const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;return t}
const boards=[];
function addBoard(name,parent,x,z,s,label){const post=new THREE.Mesh(new RoundedBoxGeometry(.05,.26,.05,2,.02),new THREE.MeshStandardMaterial({color:0xED6578,roughness:.5}));post.position.set(x,.9,z);parent.add(post);
 const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:chipTex(label,s),depthTest:false,transparent:true}));sp.scale.set(.62,.23,1);sp.position.set(x,1.14,z);sp.renderOrder=11;parent.add(sp);sp.userData.lv=name;boards.push(sp);return sp}
for(const d of DESKS){const i=info(d.name);addBoard(d.name,S,d.pos[0]-.66,d.pos[1]+.12,i.s,short(d.name)==='彭立勛'?'老闆':short(d.name))}
{const m=window.__markSeat;const sp=addBoard('Mark',m,-.66,.12,'待命','Mark');sp.material.map=(()=>{const cv=document.createElement('canvas');cv.width=320;cv.height=120;const g=cv.getContext('2d');g.fillStyle='#FFF8FB';g.strokeStyle='#bbb';g.lineWidth=10;g.beginPath();g.roundRect(6,6,308,108,44);g.fill();g.stroke();g.fillStyle='#5a2a3a';g.font='bold 34px "Noto Sans CJK TC",sans-serif';g.textBaseline='middle';g.fillText('Mark',30,42);g.font='bold 26px "Noto Sans CJK TC",sans-serif';g.fillStyle='#8a2f48';g.fillText('職務待立勛指定',30,88);const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;return t})()}

/* ---------- 面板：最近在做什麼 ---------- */
const panel=document.getElementById('panel');
function recentHTML(n){const i=info(n);return `<div class="lv-box"><h4>${ICON[i.s]} 最近在做什麼 <span class="lv-chip" style="background:${COL[i.s]}">${i.s}</span></h4><ul>${i.recent.map(x=>'<li>'+esc(x)+'</li>').join('')}</ul><div class="lv-sm">資料來源 status.json${upd?'・更新 '+upd:''}・由 Grok CEO 手動更新</div></div>`}
function addX(){if(panel.querySelector('.lv-x'))return;const b=document.createElement('button');b.className='lv-x';b.textContent='✕';b.setAttribute('aria-label','關閉');b.onclick=()=>{panel.style.display='none'};panel.prepend(b)}
const orig=window.showTasks;
window.showTasks=n=>{orig&&orig(n);if(panel.style.display==='none'&&!panel.innerHTML)return;
 if(n==='Mark'){return}
 [...panel.querySelectorAll('b')].forEach(b=>{if(b.textContent==='目前進行中'&&b.parentNode!==panel)b.parentNode.remove()});
 const btn=[...panel.querySelectorAll('button')].pop();const box=document.createElement('div');box.innerHTML=recentHTML(n);btn?panel.insertBefore(box.firstChild,btn):panel.appendChild(box.firstChild);addX();panel.scrollTop=0};
function showMark(){panel.innerHTML=`<div style="display:flex;gap:10px;align-items:center"><div style="width:64px;height:64px;border-radius:50%;background:#FBC3D8;display:flex;align-items:center;justify-content:center;font-size:28px">🪑</div><div><b style="font-size:16px">Mark</b><br>職務待立勛指定</div></div>${recentHTML('Mark')}<button onclick="this.parentNode.style.display='none'" style="margin-top:8px">關閉</button>`;panel.style.display='block';addX();panel.scrollTop=0}
window.__showMark=showMark;

/* ---------- 3. 植栽成長競賽排行 ---------- */
const STAGES=['發芽','新葉','開花','茂盛'];
const stagesData=ST.plants?.stages||{};
const owners=G.plantObjs.map(p=>p.owner);
const hasReal=owners.some(o=>stagesData[o]&&stagesData[o]!=='發芽');
const bopKey=Object.keys(localStorage).find(k=>/^bop_/.test(k));const BOP=bopKey?localStorage.getItem(bopKey):null;
const rank=owners.map((o,i)=>({o,i,st:G.stageOf?G.stageOf(o):(stagesData[o]||'發芽')})).map(r=>({...r,k:Math.max(0,STAGES.indexOf(r.st))})).sort((a,b)=>b.k-a.k||a.i-b.i);
const nm=o=>short(o)==='彭立勛'?'老闆':short(o);
{const cv=document.createElement('canvas');cv.width=1024;cv.height=760;const g=cv.getContext('2d');
 g.fillStyle='#FFF8FB';g.beginPath();g.roundRect(0,0,1024,760,60);g.fill();g.lineWidth=16;g.strokeStyle='#F894BB';g.stroke();
 g.fillStyle='#ED6578';g.font='bold 58px "Noto Sans CJK TC",sans-serif';g.textAlign='center';g.fillText('🌱 植栽成長競賽排行',512,86);
 g.font='bold 32px "Noto Sans CJK TC",sans-serif';g.fillStyle=hasReal?'#3DA764':'#F6925A';g.fillText(hasReal?'依 status.json 成長階段':'示意（目前全員發芽、同分，尚無評分資料）',512,138);
 g.textAlign='left';rank.forEach((r,i)=>{const y=200+i*54;const col=i%2?'#FDEBF1':'#FFF8FB';g.fillStyle=col;g.fillRect(60,y-38,904,50);
  g.fillStyle='#8a2f48';g.font='bold 34px "Noto Sans CJK TC",sans-serif';g.fillText((hasReal?(i+1)+'.':'・')+' '+nm(r.o)+(BOP===r.o?'  🏆':''),80,y);
  g.textAlign='right';g.fillStyle='#3DA764';g.fillText(r.st+' '+['🌱','🌿','🌸','🌳'][r.k],940,y);g.textAlign='left'});
 const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;
 const m=new THREE.Mesh(new THREE.PlaneGeometry(2.4,1.78),new THREE.MeshBasicMaterial({map:t,transparent:true}));m.position.set(15.84,1.75,-3.6);m.rotation.y=-Math.PI/2;S.add(m);m.userData.lvRank=1;boards.push(m)}
const rp=document.createElement('div');rp.id='rankPan';rp.className='up-pan';document.body.appendChild(rp);
function showRank(){rp.innerHTML=`<button class="lv-x" onclick="this.parentNode.style.display='none'">✕</button><h3>🌱 植栽成長競賽排行${hasReal?'':'<span class="demo">示意</span>'}</h3>
<p>${hasReal?'依 status.json 的成長階段排序。':'目前 status.json 裡每位的植栽都是「發芽」，還沒有評分資料，所以下表只是示意、全員同分。'}</p>
<${hasReal?'ol':'ul'}>${rank.map(r=>`<li><b>${esc(nm(r.o))}</b>：${esc(r.st)}${BOP===r.o?'　🏆 本週最佳植栽':''}</li>`).join('')}</${hasReal?'ol':'ul'}>
<div class="lv-box"><h4>規則草案（11/12 方案）</h4><ul><li>每週六週報彙整後，由 Grok CEO 依當週表現推進一階：發芽 → 新葉 → 開花 → 茂盛。</li><li>未交週報或該週停工就停止成長；連續兩週不佳，葉色轉淡（可恢復）。</li><li>本週最佳植栽由老闆每週親選，與最佳員工可同一人也可分開。</li><li>Artemis 當綠植顧問，只提供照護建議，不打分。</li><li>水族箱不列入個人競賽。</li></ul></div><p class="lv-sm">更新 ${upd||'—'}</p>`;rp.style.display='block';rp.scrollTop=0}
window.__showRank=showRank;
{const vd=document.getElementById('views');if(vd){const b=document.createElement('button');b.textContent='植栽排行';b.onclick=()=>{if(innerWidth<900){const u=document.getElementById('ui');if(u&&u.style.display!=='none')document.getElementById('kbtn')?.click()}if(window.stopWalk)window.stopWalk();C.fov=45;C.updateProjectionMatrix();C.position.set(10.6,2.2,-3.6);O.target.set(15.8,1.6,-3.6);O.update();showRank()};vd.appendChild(b)}}

/* ---------- 點狀態牌／排行看板 ---------- */
const ray=new THREE.Raycaster(),mp=new THREE.Vector2();let down=null;
R.domElement.addEventListener('pointerdown',e=>{down=[e.clientX,e.clientY]});
R.domElement.addEventListener('pointerup',e=>{if(!down||Math.hypot(e.clientX-down[0],e.clientY-down[1])>8)return;
 mp.set(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1);ray.setFromCamera(mp,C);const h=ray.intersectObjects(boards,false)[0];if(!h)return;
 const o=h.object;if(o.userData.lvRank)return showRank();if(o.userData.lv==='Mark')return showMark();window.showTasks(o.userData.lv)});

/* ---------- 2. 水族箱與植栽動起來 ---------- */
const aq=G.aq;const base=.55;
const weedM=[0x3DA764,0x73CF58,0x2e9d5a].map(c=>new THREE.MeshStandardMaterial({color:c,roughness:.6}));
const weeds=[];
for(let i=0;i<7;i++){let parent=new THREE.Group();parent.position.set(.18-(i%2)*.1,base+.1,-.9+i*.3);aq.add(parent);const chain=[];
 for(let k=0;k<5;k++){const seg=new THREE.Group();const leaf=new THREE.Mesh(new THREE.CapsuleGeometry(.018,.07,3,6),weedM[(i+k)%3]);leaf.position.y=.05;seg.add(leaf);seg.position.y=k?0.1:0;parent.add(seg);chain.push(seg);parent=seg}
 weeds.push({chain,ph:i*.9})}
const bubM=new THREE.MeshStandardMaterial({color:0xffffff,transparent:true,opacity:.6,roughness:.1});
const bubs=[];for(let i=0;i<14;i++){const b=new THREE.Mesh(new THREE.SphereGeometry(.014+Math.random()*.012,8,6),bubM);const col=i%2;b.userData={x:col?-.12:.1,z:col?.75:-.55,sp:.18+Math.random()*.18,ph:Math.random()*6};b.position.set(b.userData.x,base+.12+Math.random()*.7,b.userData.z);aq.add(b);bubs.push(b)}
for(const z of[.75,-.55]){const stone=new THREE.Mesh(new THREE.SphereGeometry(.035,10,8),new THREE.MeshStandardMaterial({color:0xF894BB}));stone.position.set(z>0?-.12:.1,base+.11,z);aq.add(stone)}
const plantBase=new Map();
let t=0,last=performance.now();
(function loop(){requestAnimationFrame(loop);const now=performance.now();const dt=Math.min(.05,(now-last)/1000);last=now;t+=dt;
 for(const w of weeds)w.chain.forEach((s,k)=>{s.rotation.z=Math.sin(t*1.6+w.ph+k*.6)*.16;s.rotation.x=Math.cos(t*1.1+w.ph+k*.5)*.08});
 for(const b of bubs){const u=b.userData;b.position.y+=u.sp*dt;if(b.position.y>base+.86)b.position.y=base+.12;b.position.x=u.x+Math.sin(t*3+u.ph)*.015;const s=1+(b.position.y-base)*.6;b.scale.setScalar(s)}
 for(const f of G.fishes){f.rotation.z=Math.sin(t*9+(f.userData.phase||0))*.12}
 for(const p of G.plantObjs){const body=p.g.children[0];if(!body)continue;if(!plantBase.has(p))plantBase.set(p,body.scale.x);const b0=plantBase.get(p);const ph=p.owner.length;
  body.rotation.z=Math.sin(t*1.3+ph)*.05;body.rotation.x=Math.cos(t*1.0+ph)*.03;body.scale.setScalar(b0*(1+.025*Math.sin(t*.9+ph)))}
})();
window.__live={boards,showRank,showMark,weeds,bubs};
/* 手機：選單內任何按鈕按下後自動收起選單（後加的按鈕也適用） */
{const ui=document.getElementById('ui');const kb=document.getElementById('kbtn');
 if(ui&&kb)ui.addEventListener('click',e=>{if(innerWidth>=900||!e.target.closest('button'))return;setTimeout(()=>{if(ui.style.display!=='none')kb.click()},0)})}
/* 切換視角後把自動跳出的「我能幫你做什麼」小卡收起，避免蓋住水族箱或排行 */
{const vd=document.getElementById('views');if(vd)vd.addEventListener('click',e=>{if(!e.target.closest('button'))return;const hide=()=>{const h=document.getElementById('helpPan');if(h)h.style.display='none'};setTimeout(hide,600);setTimeout(hide,1500)})}
