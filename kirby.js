// 2026-11-20 v44 風格：日系可愛 Q 版・星之卡比色票・圓角建築家具・Mark 座位・手機版面
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
const wait=f=>new Promise(r=>{const t=setInterval(()=>{if(f()){clearInterval(t);r()}},60)});
await wait(()=>window.__T&&window.__ready===true);
const {THREE,S,C,R,O,box,label,sun}=window.__T;
const PAL={pink:'#F894BB',rose:'#ED6578',red:'#EA3C3C',orange:'#F6925A',cream:'#FDFBF4',blush:'#FBC3D8',gold:'#F6C46E',sky:'#61CEE1',mint:'#73CF58'};

/* ---------- 樣式 ---------- */
const st=document.createElement('style');st.textContent=`
:root{--kp:#F894BB;--kr:#ED6578;--kd:#8a2f48;--kc:#FDFBF4;--kb:#FBC3D8;--sat:env(safe-area-inset-top,0px);--sab:env(safe-area-inset-bottom,0px);--sal:env(safe-area-inset-left,0px);--sar:env(safe-area-inset-right,0px)}
body{font-family:"Hiragino Maru Gothic ProN","Zen Maru Gothic","Noto Sans CJK TC","PingFang TC",sans-serif;background:#FBC3D8}
#ui,#panel,.up-pan,#gardenPan,#helpPan{background:rgba(255,248,251,.96)!important;border:3px solid var(--kp);border-radius:22px!important;box-shadow:0 6px 0 #ed657833,0 10px 28px #f894bb55!important;color:#5a2a3a}
#ui{top:calc(10px + var(--sat))!important;left:calc(10px + var(--sal))!important;max-height:calc(100dvh - 84px - var(--sat) - var(--sab));overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}
#ui h1{color:var(--kr);font-size:17px}
#ui button,#bar2 button,.up-btn,#panel button,#gardenPan button,.up-pan button,#eowbar select,#kHome,#kEow,#kbtn{font-family:inherit;border:2px solid var(--kp)!important;border-radius:999px!important;background:var(--kc)!important;color:var(--kd);font-weight:700;box-shadow:0 2px 0 #ed657855;cursor:pointer;touch-action:manipulation}
#ui button:hover,#bar2 button:hover,#kHome:hover{background:var(--kb)!important}
#ui button:active,#bar2 button:active,#kHome:active{transform:translateY(2px);box-shadow:none}
#panel{top:calc(12px + var(--sat))!important;right:calc(12px + var(--sar))!important;max-height:calc(100dvh - 24px - var(--sat) - var(--sab));overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;box-sizing:border-box}
.up-pan,#gardenPan,#helpPan{max-height:calc(100dvh - 40px - var(--sat) - var(--sab))!important;overflow-y:auto!important;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}
#eowbar{background:#FFF1F6!important;border:3px solid var(--kp)!important;border-radius:22px!important;color:var(--kd);font-size:15px!important;box-shadow:0 5px 0 #ed657833!important;top:calc(10px + var(--sat))!important;max-width:min(560px,calc(100vw - 280px));box-sizing:border-box}
#modeTag{background:var(--kr)!important;border-radius:999px!important;top:calc(10px + var(--sat))!important;right:calc(10px + var(--sar))!important}
#bar2{right:calc(10px + var(--sar))!important;bottom:calc(10px + var(--sab))!important}
#joy{left:calc(16px + var(--sal))!important;bottom:calc(16px + var(--sab))!important;background:#F894BB44!important;border-color:#fff!important}
#joy i{background:var(--kp)!important}
#kHome{position:fixed;z-index:13;left:calc(100px + var(--sal));bottom:calc(10px + var(--sab));padding:7px 14px;font-size:15px}
#kEow{position:fixed;z-index:13;display:none;left:calc(10px + var(--sal));bottom:calc(10px + var(--sab));padding:7px 12px;font-size:15px}
#kbtn{position:fixed;z-index:14;left:calc(10px + var(--sal));top:calc(10px + var(--sat));padding:7px 14px;font-size:15px}
@media(hover:hover) and (pointer:fine){#joy{display:none!important}}
@media(max-width:900px){
 #eowbar{z-index:15;display:none;top:auto!important;bottom:calc(64px + var(--sab))!important;left:50%;width:calc(100vw - 24px);max-width:none;font-size:14px!important;max-height:40dvh;overflow:auto}
 #eowbar.kopen{display:block}
 #kEow{display:block;left:auto;right:calc(10px + var(--sar));bottom:calc(10px + var(--sab))}
 #kHome{left:calc(104px + var(--sal));top:calc(10px + var(--sat));bottom:auto}
 #joy{width:96px;height:96px;bottom:calc(14px + var(--sab))!important}#joy i{left:28px;top:28px}
 #bar2{top:calc(52px + var(--sat))!important;bottom:auto!important;max-width:64vw}
 #panel{z-index:21;top:auto!important;right:auto!important;left:50%;transform:translateX(-50%);bottom:calc(10px + var(--sab));width:calc(100vw - 24px)!important;max-height:58dvh}
 .up-pan,#gardenPan,#helpPan{width:calc(100vw - 24px)!important}
 #ui{max-width:calc(100vw - 24px)!important;top:calc(158px + var(--sat))!important;max-height:calc(100dvh - 158px - 76px - var(--sat) - var(--sab))!important}
 #kbtn{display:block}
}`;
document.head.appendChild(st);
{const m=document.querySelector('meta[name=viewport]');if(m&&!/viewport-fit/.test(m.content))m.content+=',viewport-fit=cover'}
// 刪除過時說明文字
document.querySelectorAll('#ui div').forEach(d=>{if(/專員名單更新|所有 Agent 僅在立勛詢問時工作/.test(d.textContent)&&d.children.length===0)d.remove()});
// 原本的 ☰ 選單按鈕加上 id，位置固定且避開瀏海
document.querySelectorAll('body>button').forEach(b=>{if(/選單/.test(b.textContent)){b.id='kbtn';b.style.cssText='';const o=b.onclick;b.style.setProperty('position','fixed','important');b.classList.add('kmenu')}});
const kb=document.getElementById('kbtn');
if(kb){kb.setAttribute('style','');const mq=matchMedia('(max-width:900px)');
 const place=()=>{if(mq.matches){kb.style.cssText='top:calc(10px + env(safe-area-inset-top,0px));bottom:auto'}else{kb.style.cssText='top:auto;bottom:calc(10px + env(safe-area-inset-bottom,0px))'}};
 place();mq.addEventListener('change',place);
 const ui=document.getElementById('ui');const syncUi=()=>{ };kb.addEventListener('click',()=>{});
 // 原腳本會把 style.top/bottom 改回去，所以用 observer 把我們的定位壓回來
 new MutationObserver(()=>{const want=mq.matches?'calc(10px + env(safe-area-inset-top,0px))':'auto';if(kb.style.top!==want&&kb.style.top!=='')kb.style.top=want;const wb=mq.matches?'auto':'calc(10px + env(safe-area-inset-bottom,0px))';if(kb.style.bottom!==wb)kb.style.bottom=wb}).observe(kb,{attributes:true,attributeFilter:['style']});
}
// 🏠 回總覽（固定，不會被收掉）
{const h=document.createElement('button');h.id='kHome';h.textContent='🏠 總覽';h.onclick=()=>{document.querySelectorAll('#views button').forEach(b=>{if(b.textContent.trim()==='總覽')b.click()});const p=document.getElementById('panel');if(p)p.style.display='none';document.querySelectorAll('.up-pan,#gardenPan').forEach(x=>x.style.display='none')};document.body.appendChild(h)}
// 手機：本週最佳員工橫幅改成可收合
{const bar=document.getElementById('eowbar');if(bar){const b=document.createElement('button');b.id='kEow';b.textContent='🏆 本週';b.onclick=()=>{bar.classList.toggle('kopen');b.textContent=bar.classList.contains('kopen')?'✕ 收起':'🏆 本週'};document.body.appendChild(b)}}

/* ---------- 色票與燈光 ---------- */
{const cv=document.createElement('canvas');cv.width=2;cv.height=256;const g=cv.getContext('2d');const gr=g.createLinearGradient(0,0,0,256);gr.addColorStop(0,'#FBC3D8');gr.addColorStop(.55,'#FDEBF1');gr.addColorStop(1,'#FDFBF4');g.fillStyle=gr;g.fillRect(0,0,2,256);const t=new THREE.CanvasTexture(cv);t.colorSpace=THREE.SRGBColorSpace;S.background=t;S.fog=new THREE.Fog(0xfdebf1,55,140)}
S.traverse(o=>{if(o.isHemisphereLight){o.color.set('#FFF4F8');o.groundColor.set('#F6C46E');o.intensity=1.6}});
if(sun){sun.color.set('#FFF0DC');sun.intensity=1.7}
const people=window.__people||[];const pg=new Set();people.forEach(p=>{p.g&&pg.add(p.g)});
const inPeople=o=>{for(let q=o;q;q=q.parent)if(pg.has(q))return true;return false};
const EXACT={0xf3f1ec:'#FFF3F7',0xd8cbb5:'#FBE6D4',0xc9d4e3:'#DDF0F8',0xcfe5c8:'#DFF4D2',0xeadfca:'#FDF1CF',0xf1dcc8:'#FDDCE9',0x5a3a22:'#ED6578',0xd4b07a:'#F6C46E',0x9fd3ff:'#CDEFF8',0xbfe3ff:'#CDEFF8',0xe8e4f5:'#E7DDF7',0xf3e6cc:'#FDE9C2',0xdde3ea:'#E3EEF7',0xb7c4d6:'#C6D8F0',0x6b4f3a:'#F6925A'};
const seen=new Set();const hsl={};
function soften(mat){if(seen.has(mat))return;seen.add(mat);if(!mat.color||mat.isMeshBasicMaterial||mat.emissiveIntensity>0&&mat.emissive&&mat.emissive.getHex()!==0)return;
 const hex=mat.color.getHex();if(EXACT[hex]){mat.color.set(EXACT[hex])}else{mat.color.getHSL(hsl);let{h,s,l}=hsl;if(s<.12){h=.94;s=.28}s=Math.min(.7,s*.85);l=Math.min(.9,l*.62+.3);mat.color.setHSL(h,s,l)}
 mat.roughness=.55;mat.metalness=Math.min(mat.metalness||0,.1);mat.needsUpdate=true}
const jobs=[];S.traverse(o=>{if(o.isMesh&&!inPeople(o))jobs.push(o)});
for(const o of jobs){soften(o.material);const g=o.geometry;
 if(g&&g.type==='BoxGeometry'){const {width:w,height:h,depth:d}=g.parameters;const mn=Math.min(w,h,d);const big=Math.max(w,h,d);
  if(mn>=.045&&big<40){const r=Math.min(.09,mn*.32);const ng=new RoundedBoxGeometry(w,h,d,3,r);g.dispose();o.geometry=ng}}}

/* ---------- 白雲 ---------- */
const cloudM=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.92});
const clouds=[];for(let i=0;i<9;i++){const g=new THREE.Group();const n=3+(i%3);for(let k=0;k<n;k++){const s=new THREE.Mesh(new THREE.SphereGeometry(1.1+Math.random()*.9,14,10),cloudM);s.position.set(k*1.5-n*.7,Math.random()*.5,Math.random()*.6);s.scale.y=.7;g.add(s)}
 const a=i/9*Math.PI*2;g.position.set(Math.cos(a)*34,7+Math.random()*4,Math.sin(a)*26);g.userData.sp=.25+Math.random()*.35;S.add(g);clouds.push(g)}

/* ---------- 卡比吉祥物（門口迎賓、會跳） ---------- */
const kirby=new THREE.Group();{const mk=c=>new THREE.MeshStandardMaterial({color:c,roughness:.5});
 const body=new THREE.Mesh(new THREE.SphereGeometry(.42,24,18),mk(PAL.pink));body.position.y=.5;body.castShadow=true;kirby.add(body);
 for(const x of[-1,1]){const foot=new THREE.Mesh(new THREE.SphereGeometry(.17,14,10),mk(PAL.rose));foot.scale.set(1.3,.7,1.2);foot.position.set(x*.25,.1,.12);foot.castShadow=true;kirby.add(foot);
  const arm=new THREE.Mesh(new THREE.SphereGeometry(.13,12,10),mk(PAL.pink));arm.position.set(x*.44,.52,.02);kirby.add(arm);
  const eye=new THREE.Mesh(new THREE.SphereGeometry(.07,12,10),mk(0x2a1a3a));eye.scale.set(.8,1.5,.5);eye.position.set(x*.13,.6,.38);eye.userData.eye=1;kirby.add(eye);
  const shine=new THREE.Mesh(new THREE.SphereGeometry(.025,8,6),new THREE.MeshBasicMaterial({color:0xffffff}));shine.position.set(x*.13,.65,.42);kirby.add(shine);
  const ch=new THREE.Mesh(new THREE.SphereGeometry(.07,10,8),mk(PAL.red));ch.scale.set(1.3,.7,.4);ch.position.set(x*.27,.48,.35);kirby.add(ch)}
 const mo=new THREE.Mesh(new THREE.SphereGeometry(.045,10,8),mk(PAL.red));mo.scale.set(1.3,.8,.4);mo.position.set(0,.46,.4);kirby.add(mo);
 kirby.position.set(2.9,0,9.4);kirby.rotation.y=-.35;S.add(kirby)}
const hello=label('歡迎光臨！',2.9,1.5,9.4,'#FBC3D8ee',30);hello.scale.multiplyScalar(.6);

/* ---------- Mark 的座位（待立勛指定職務） ---------- */
const MARK={x:11.6,z:3.2};
{const g=new THREE.Group();g.position.set(MARK.x,0,MARK.z);S.add(g);
 const m=(c)=>new THREE.MeshStandardMaterial({color:c,roughness:.55});
 const add=(w,h,d,c,x,y,z,r=.04)=>{const me=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,3,r),m(c));me.position.set(x,y,z);me.castShadow=me.receiveShadow=true;g.add(me);return me};
 add(1.8,.07,.9,'#FBC3D8',0,.75,0,.03);for(const[a,b]of[[-.8,-.38],[.8,-.38],[-.8,.38],[.8,.38]])add(.07,.75,.07,'#ED6578',a,.37,b,.03);
 add(.62,.4,.05,'#8a2f48',0,1.15,-.3,.03);const sc=add(.56,.34,.01,'#CDEFF8',0,1.15,-.27,.004);sc.material=new THREE.MeshStandardMaterial({color:0xcdeff8,emissive:0x61cee1,emissiveIntensity:.5});add(.06,.2,.06,'#ED6578',0,.88,-.3,.02);
 add(.5,.12,.5,'#F894BB',0,.42,.75,.05);add(.5,.5,.1,'#F894BB',0,.74,1,.05);add(.08,.4,.08,'#ED6578',0,.2,.75,.03);
 // 名牌座牌
 add(.5,.12,.04,'#FDFBF4',-.5,.83,.3,.02);
 const lb=label('Mark｜新座位',0,1.75,0.4,'#FBC3D8f2',28);lb.scale.multiplyScalar(.6);g.add(lb);lb.position.set(0,1.7,.3);
 const lb2=label('職務待立勛指定',0,1.4,0,'#FDFBF4ee',22);lb2.scale.multiplyScalar(.6);g.add(lb2);lb2.position.set(0,1.42,.3);
 // 小盆栽（A 款：圓葉）
 const pot=new THREE.Mesh(new THREE.CylinderGeometry(.09,.07,.12,14),m('#F6925A'));pot.position.set(.65,.85,.15);g.add(pot);
 const leaf=new THREE.Mesh(new THREE.SphereGeometry(.12,14,10),m('#73CF58'));leaf.position.set(.65,1,.15);leaf.scale.y=.8;g.add(leaf);
 window.__markSeat=g}
{const vd=document.getElementById('views');if(vd){const b=document.createElement('button');b.textContent='Mark 座位';b.onclick=()=>{if(window.stopWalk)window.stopWalk();C.fov=45;C.updateProjectionMatrix();C.position.set(MARK.x-1.2,3,MARK.z+5.4);O.target.set(MARK.x,.9,MARK.z);O.update()};vd.appendChild(b)}}

/* ---------- 人物更自然生動：走路輕彈、待機呼吸、卡比眨眼 ---------- */
const base=new Map();let t0=performance.now();
(function anim(){requestAnimationFrame(anim);const t=(performance.now()-t0)/1000;
 for(const p of people){if(!p.m)continue;if(!base.has(p))base.set(p,p.m.position.y);const b=base.get(p);
  if(p.state==='walk'){p.m.position.y=b+Math.abs(Math.sin(p.t*7))*.035;p.m.rotation.z=Math.sin(p.t*7)*.035}
  else{p.m.position.y=b;p.m.rotation.z=Math.sin(t*1.6+p.t*0)*.012;if(p.state==='sit'&&p.head)p.head.rotation.y=Math.sin(t*.6+(p.seg||0))*.08}}
 clouds.forEach(c=>{c.position.x+=c.userData.sp*.01;if(c.position.x>46)c.position.x=-46});
 kirby.position.y=Math.abs(Math.sin(t*2.2))*.18;kirby.rotation.y=-.35+Math.sin(t*.8)*.25;
 const bl=(t%4)<.15?.1:1;kirby.children.forEach(o=>{if(o.userData.eye)o.scale.y=1.5*bl})})();
