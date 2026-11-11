// 2026-11-12 大門、財位水族箱、專屬植栽與最佳植栽競賽
const Qg=new URLSearchParams(location.search);
const wait=f=>new Promise(r=>{const t=setInterval(()=>{if(f()){clearInterval(t);r()}},50)});
await wait(()=>window.__T);
const {THREE,S,C,R,O,DESKS,box,label}=window.__T;
const M=(c,ex={})=>new THREE.MeshStandardMaterial({color:c,roughness:.7,...ex});
const boxp=(w,h,d,c,x,y,z,p)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),typeof c==='object'?c:M(c));m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;p.add(m);return m};
const cyl=(rt,rb,h,c,x,y,z,p,seg=12)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(rt,rb,h,seg),typeof c==='object'?c:M(c));m.position.set(x,y,z);m.castShadow=true;p.add(m);return m};
const sph=(r,c,x,y,z,p,seg=12)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(r,seg,seg-2),typeof c==='object'?c:M(c));m.position.set(x,y,z);m.castShadow=true;p.add(m);return m};
const cone=(r,h,c,x,y,z,p)=>{const m=new THREE.Mesh(new THREE.ConeGeometry(r,h,10),typeof c==='object'?c:M(c));m.position.set(x,y,z);m.castShadow=true;p.add(m);return m};

const WEEK0=new Date('2026-11-02T00:00:00+08:00');
const WEEK=Qg.get('week')!=null?+Qg.get('week'):Math.max(0,Math.floor((Date.now()-WEEK0)/6048e5));
const STAGES=['發芽','新葉','開花','茂盛'];
const stageScale=[.58,.82,1,1.16];
const nc=u=>u+(u.includes('?')?'&':'?')+'t='+Date.now();
const ST=await fetch(nc('status.json')).then(r=>r.json()).catch(()=>({}));
const stageOf=n=>{
  const q=Qg.get('pstage');
  if(q&&STAGES.includes(q))return q;
  const s=(ST.plants&&ST.plants.stages&&ST.plants.stages[n])||(ST.plants&&ST.plants.defaultStage)||'發芽';
  return STAGES.includes(s)?s:'發芽';
};
const si=n=>Math.max(0,STAGES.indexOf(stageOf(n)));

const FISH_REC=[
  ['Grok CEO','金龍魚','統御與格局，適合作公司主魚、鎮宅招財','銀龍魚','事業與名聲，氣息較斂，補金龍的鋒芒'],
  ['Golden股票投資顧問','金魚','最經典的招財魚，金玉滿堂，對應盤面與現金流','紅白錦鯉','諧音「利」，紅盤、貴人與行情向上'],
  ['Inno科技創新','霓虹燈魚','身側一道燈線，像科技指示燈與創新亮點','孔雀魚','變化快、生命力強，像原型不斷迭代'],
  ['Europia台歐訊息','紅白金魚','紅白如波蘭國旗，也象徵台歐雙向橋樑','黑摩利','守關化煞，對應訊息守門、濾掉雜訊'],
  ['Wendy醫學院教授','燈科魚（日光燈魚）','體態安靜、成群卻不躁，像調息與療癒','清道夫','清理代謝、維持水質，呼應養生與清潔'],
  ['Artemis(Diana)狩獵與自然女神','鼠魚（花鼠）','貼底活動、對水質敏感，適合自然觀察者','彩虹魚','野外色澤分明，象徵生態多樣'],
  ['Johnny導遊','地圖魚','身有地圖紋，天生「帶路」','神仙魚','巡游姿態從容，像旅人慢慢看風景'],
  ['Athena智慧工藝女神','七彩神仙魚','顏色層次如色票與工藝釉彩','珍珠燈魚','細緻光點，像鑲嵌與手作細節'],
  ['Sandy外語老師','接吻魚','雙魚對吻，像語言必須雙向來回','白金獅子頭金魚','氣度從容、開卷有益，適合閱讀角']
];

const PLANT_DEF={
  '彭立勛（老闆）':{name:'小葉榕盆景',meaning:'層層樹冠與氣根，穩重如靠山，適合設計公司負責人。',build:banyan},
  'Grok CEO':{name:'巴西鐵樹',meaning:'單幹直挺如指揮旗桿，黃綠直紋清楚好認。',build:dracaena},
  'Golden股票投資顧問':{name:'金琥仙人球',meaning:'金黃圓球帶刺，像一顆金錠，呼應盤面與財氣。',build:barrel},
  'Inno科技創新':{name:'銀葉空氣鳳梨',meaning:'無土、銀白尖葉，坐在幾何水泥座上，未來感十足。',build:airplant},
  'Europia台歐訊息':{name:'彩虹椒草',meaning:'紅、白、綠葉配白瓷紅圈盆，呼應波蘭紅白與台歐橋樑。',build:peperomia},
  'Wendy醫學院教授':{name:'蘆薈',meaning:'厚實齒緣肉質葉，白陶藥罐形盆，對應醫藥與修復。',build:aloe},
  'Artemis(Diana)狩獵與自然女神':{name:'鹿角蕨',meaning:'分叉綠葉固定在原木切片上，野性而自然。',build:staghorn},
  'Johnny導遊':{name:'小型旅人蕉',meaning:'破扇狀大葉、沙米色高盆，天生就是旅行的樣子。',build:traveler},
  'Athena智慧工藝女神':{name:'彩葉草',meaning:'洋紅與檸綠斑葉，像活的色票，配釉彩不規則盆。',build:coleus},
  'Sandy外語老師':{name:'文竹',meaning:'細羽毛狀淺綠、青瓷小盆，書卷氣正好放閱讀角。',build:asparagus}
};

function bloom(p,stage,col,y,n=3){
  if(stage<2)return;
  for(let i=0;i<n;i++){
    const a=i*2.1;
    sph(.025+stage*.01,col,Math.cos(a)*.06,y,Math.sin(a)*.06,p);
  }
}

function banyan(p,stage){
  boxp(.22,.08,.16,0x3a2416,0,.04,0,p);
  boxp(.20,.015,.14,0x2a1810,0,.085,0,p);
  cyl(.025,.04,.16,0x5a3a22,0,.16,0,p,8);
  cyl(.008,.01,.14,0x6b4a2b,.05,.14,.02,p,6);
  cyl(.006,.008,.12,0x6b4a2b,-.04,.15,-.02,p,6);
  const sc=stageScale[stage],gcol=0x1e5c2a;
  sph(.11*sc,gcol,.03,.28+.08*sc,0,p);
  sph(.09*sc,0x2e7d32,-.05,.26+.06*sc,.03,p);
  if(stage>=1)sph(.07*sc,0x245c28,.06,.34+.08*sc,-.04,p);
  if(stage>=2)sph(.06*sc,0x3d8b40,-.02,.38+.08*sc,.04,p);
  if(stage>=3){sph(.08*sc,gcol,.0,.42,.0,p);cyl(.006,.006,.1,0x6b4a2b,.07,.2,.03,p,6)}
  bloom(p,stage,0xc0392b,.40+.08*sc,stage>=3?5:3);
}
function dracaena(p,stage){
  cyl(.09,.11,.16,0x1a1a1a,0,.08,0,p,16);
  cyl(.018,.022,.22,0x6b5a3a,0,.26,0,p,8);
  const n=3+stage*2,h=.36+.06*stage;
  for(let i=0;i<n;i++){
    const a=i*1.05,leaf=boxp(.035,.02,.20,0x8faa2e,Math.cos(a)*.02,h-i*.015,Math.sin(a)*.02,p);
    leaf.rotation.set(.4,a,.2);
    const stripe=boxp(.01,.006,.16,0xe8d44d,Math.cos(a)*.02,h-i*.015+.01,Math.sin(a)*.02,p);
    stripe.rotation.copy(leaf.rotation);
  }
  bloom(p,stage,0xffee58,h+.06,2);
}
function barrel(p,stage){
  cyl(.09,.10,.07,0xb87333,0,.035,0,p,16);
  const r=.09+.03*stage;
  sph(r,0xe0b000,0,.07+r,0,p,16);
  const spk=8+stage*4;
  for(let i=0;i<spk;i++){
    const a=i*(Math.PI*2/spk),y=.07+r;
    boxp(.006,.006,.05,0xf5e6a8,Math.cos(a)*r*.85,y,Math.sin(a)*r*.85,p).lookAt(new THREE.Vector3(Math.cos(a),y,Math.sin(a)));
  }
  if(stage>=2)cyl(.02,.02,.04,0xff6b81,0,.07+r*2+.02,0,p,8);
}
function airplant(p,stage){
  boxp(.14,.05,.14,0x9aa0a6,0,.025,0,p);
  boxp(.10,.02,.10,0x7d848c,0,.055,0,p);
  const n=8+stage*3;
  for(let i=0;i<n;i++){
    const a=i*1.13,el=.25+ (i%3)*.15;
    const leaf=boxp(.018,.008,.12+.02*stage,0xcfd6dc,0,.12,0,p);
    leaf.rotation.set(el,a,0);
    leaf.position.set(Math.cos(a)*.02,.12+Math.cos(el)*.02,Math.sin(a)*.02);
  }
  bloom(p,stage,0xf4a261,.22,2);
}
function peperomia(p,stage){
  cyl(.08,.09,.10,0xf7f3ef,0,.05,0,p,16);
  cyl(.09,.09,.02,0xc0392b,0,.11,0,p,16);
  const cols=[0xc0392b,0xf5f5f5,0x3f8f4a,0xe74c3c,0x2ecc71];
  const n=6+stage*3;
  for(let i=0;i<n;i++){
    const a=i*1.2,r=.05+(i%3)*.025;
    const lf=cyl(.04,.04,.012,cols[i%cols.length],Math.cos(a)*r,.14+(i%4)*.03,Math.sin(a)*r,p,10);
    lf.rotation.set(.8,a,.2);
  }
  bloom(p,stage,0xffeaa7,.24,3);
}
function aloe(p,stage){
  cyl(.09,.07,.11,0xf4f1ea,0,.055,0,p,16);
  cyl(.07,.07,.015,0xe8e4da,0,.12,0,p,16);
  const n=5+stage*2;
  for(let i=0;i<n;i++){
    const a=i*(Math.PI*2/n)+.2;
    const leaf=boxp(.04,.012,.16+.03*stage,0x9ccc65,Math.cos(a)*.04,.18,Math.sin(a)*.04,p);
    leaf.rotation.set(1.0,a,0);
    // tooth edge hint
    boxp(.006,.006,.01,0xd5e8a8,Math.cos(a)*.09,.20,Math.sin(a)*.09,p);
  }
  bloom(p,stage,0xff8a80,.30,2);
}
function staghorn(p,stage){
  cyl(.13,.13,.03,0x8d6b4a,0,.02,0,p,20);
  cyl(.10,.10,.008,0x5d4037,0,.038,0,p,16);
  const forks=[[0,.2,0,0],[.12,.18,.04,.6],[-.12,.18,-.03,-.6],[.06,.22,-.08,.3]];
  const n=2+stage;
  for(let i=0;i<n&&i<forks.length;i++){
    const [x,y,z,ry]=forks[i];
    const fr=boxp(.05,.012,.16,0x4caf50,x*.7,y*.7,z,p);
    fr.rotation.set(.3,ry,.1);
    const a=boxp(.03,.01,.09,0x66bb6a,x*.7+Math.cos(ry)*.06,y*.7+.04,z,p);a.rotation.set(.1,ry+.7,0);
    const b=boxp(.03,.01,.09,0x2e7d32,x*.7-Math.cos(ry)*.06,y*.7+.03,z,p);b.rotation.set(.1,ry-.7,0);
  }
  bloom(p,stage,0xffcc80,.28,2);
}
function traveler(p,stage){
  cyl(.07,.09,.16,0xd9c7a3,0,.08,0,p,16);
  cyl(.015,.02,.10,0x6d5a3a,0,.21,0,p,8);
  const n=3+stage;
  for(let i=0;i<n;i++){
    const side=i%2?1:-1,y=.28+i*.05;
    const leaf=boxp(.22,.012,.08,0x7cb342,side*.10,y,0,p);
    leaf.rotation.set(0,0,side*.35);
    if(i%2===0){const split=boxp(.08,.008,.03,0x8bc34a,side*.18,y+.01,.02,p);split.rotation.set(0,0,side*.5)}
  }
  bloom(p,stage,0xffeb3b,.42,2);
}
function coleus(p,stage){
  boxp(.13,.07,.11,0x26a69a,0,.035,0,p);
  boxp(.02,.07,.02,0x00897b,.06,.035,.05,p);
  boxp(.02,.07,.02,0x00897b,-.06,.035,-.05,p);
  const cols=[0xd81b60,0xc6ff00,0xad1457,0xaeea00];
  const n=10+stage*6;
  for(let i=0;i<n;i++){
    const a=i*.7,r=.02+(i%5)*.02;
    sph(.035+(i%3)*.01,cols[i%cols.length],Math.cos(a)*r,.12+(i%5)*.025,Math.sin(a)*r,p,8);
  }
  bloom(p,stage,0xffd54f,.26,4);
}
function asparagus(p,stage){
  cyl(.07,.08,.09,0x7fa99b,0,.045,0,p,16);
  cyl(.075,.075,.012,0x5f8a7d,0,.095,0,p,16);
  const stems=3+stage;
  for(let i=0;i<stems;i++){
    const a=i*2.1,x=Math.cos(a)*.03,z=Math.sin(a)*.03;
    cyl(.005,.005,.16+.03*stage,0x5d8a5a,x,.18,z,p,6);
    for(let k=0;k<4+stage;k++){
      sph(.02+.005*stage,0xb7d7a8,x+Math.cos(k+a)*.04,.14+k*.04,z+Math.sin(k+a)*.04,p,8);
    }
  }
  bloom(p,stage,0xffffff,.30,2);
}

// ----- 專屬桌上植栽 -----
const plantObjs=[];
const plantByName={};
function placePlant(owner,px,pz){
  const def=PLANT_DEF[owner];if(!def)return;
  const stage=si(owner);
  const g=new THREE.Group();g.position.set(px,0.75,pz);S.add(g);
  const body=new THREE.Group();g.add(body);body.scale.setScalar(1.45+stage*0.2);def.build(body,stage);
  const hit=new THREE.Mesh(new THREE.BoxGeometry(.55,.8,.55),new THREE.MeshBasicMaterial({visible:false}));
  hit.position.set(0,.32,0);g.add(hit);
  const tag=label(def.name,0,0,0,'#ecfdf3ee',30);tag.scale.multiplyScalar(.32);tag.position.set(0,.82,.0);g.add(tag);
  const rec={owner,def,g,hit,stage:stageOf(owner)};
  plantObjs.push(rec);plantByName[owner]=rec;hit.userData.garden={type:'plant',rec};
}
for(const d of DESKS){
  if(!PLANT_DEF[d.name])continue;
  const [x,z]=d.pos;
  placePlant(d.name,x+0.72,z+0.40);
}

// ----- 財位水族箱 (15.0, -7.2)，靠東牆略內移以免懸空 -----
const AQ={x:15.55,z:-7.2,l:2.2,d:0.7,base:0.55,tankH:0.90}; // l along Z (wall), d along X (inward)
const aq=new THREE.Group();aq.position.set(AQ.x,0,AQ.z);S.add(aq);
boxp(AQ.d+.06,AQ.base,AQ.l+.06,0x3b2a1c,0,AQ.base/2,0,aq);
boxp(AQ.d,0.04,AQ.l,0x2a1c12,0,AQ.base+0.02,0,aq);
// gold trim
const GOLD=M(0xffd24a,{metalness:.65,roughness:.28,emissive:0x8a5a00,emissiveIntensity:.4});
boxp(AQ.d+.08,0.03,AQ.l+.08,GOLD,0,AQ.base,0,aq);
boxp(AQ.d+.08,0.03,AQ.l+.08,GOLD,0,AQ.base+AQ.tankH,0,aq);
const glass=new THREE.MeshStandardMaterial({color:0x9fd8ef,transparent:true,opacity:.18,roughness:.05,metalness:.1,side:THREE.DoubleSide});
// five glass faces (open conceptually at top under trim)
boxp(AQ.d,.88,.02,glass,0,AQ.base+.47,-AQ.l/2,aq);
boxp(AQ.d,.88,.02,glass,0,AQ.base+.47,AQ.l/2,aq);
boxp(.02,.88,AQ.l,glass,-AQ.d/2,AQ.base+.47,0,aq);
boxp(.02,.88,AQ.l,glass,AQ.d/2,AQ.base+.47,0,aq);
const water=new THREE.Mesh(new THREE.BoxGeometry(AQ.d-.06,.72,AQ.l-.06),new THREE.MeshStandardMaterial({color:0x1a6a8a,transparent:true,opacity:.28,roughness:.1}));
water.position.set(0,AQ.base+.40,0);aq.add(water);
// sand + back rock + plants
boxp(AQ.d-.08,.06,AQ.l-.08,0xcbb47a,0,AQ.base+.07,0,aq);
boxp(.08,.28,AQ.l-.1,0x3e3a36,AQ.d/2-.08,AQ.base+.20,0,aq);
sph(.1,0x4a453f,-.7,AQ.base+.16,-.05,aq,8);
sph(.08,0x5a554e,.55,AQ.base+.14,.08,aq,8);
cyl(.02,.01,.16,0x2e7d32,-.4,AQ.base+.18,-.1,aq,6);
cyl(.015,.01,.12,0x43a047,.3,AQ.base+.16,.05,aq,6);
cyl(.018,.01,.14,0x1b5e20,.0,AQ.base+.18,.12,aq,6);
// sign
{const cv=document.createElement('canvas');cv.width=768;cv.height=160;const g=cv.getContext('2d');
 g.fillStyle='#1f2937';g.fillRect(0,0,768,160);g.fillStyle='#f5d76e';g.font='bold 44px "Noto Sans CJK TC",sans-serif';g.textAlign='center';g.textBaseline='middle';
 g.fillText('財位水族箱',384,50);g.font='bold 28px "Noto Sans CJK TC",sans-serif';g.fillStyle='#fff';g.fillText('由 Grok CEO 建置',384,112);
 const tx=new THREE.CanvasTexture(cv);tx.colorSpace=THREE.SRGBColorSpace;
 const pl=new THREE.Mesh(new THREE.PlaneGeometry(.9,.2),new THREE.MeshBasicMaterial({map:tx,side:THREE.DoubleSide}));
 pl.position.set(-AQ.d/2-.02,AQ.base+AQ.tankH+.10,0);pl.rotation.y=-Math.PI/2;aq.add(pl)}
label('財位水族箱',AQ.x,AQ.base+AQ.tankH+.42,AQ.z,'#fff7ddee',32).scale.multiplyScalar(.55);
const aqL=new THREE.PointLight(0xb8f0ff,.9,5);aqL.position.set(0,AQ.base+.55,0);aq.add(aqL);
const aqHit=new THREE.Mesh(new THREE.BoxGeometry(AQ.d,1.5,AQ.l),new THREE.MeshBasicMaterial({visible:false}));
aqHit.position.set(AQ.x,0.75,AQ.z);S.add(aqHit);aqHit.userData.garden={type:'aq'};

// 8 條積木魚：1 金龍、6 血鸚鵡、1 黑摩利
const fishes=[];
function addFish(kind){
  const g=new THREE.Group();aq.add(g);
  if(kind==='arowana'){
    boxp(.11,.07,.48,GOLD,0,0,0,g);
    cone(.03,.1,GOLD,0,0,-.28,g).rotation.x=Math.PI/2;
    boxp(.22,.012,.08,0xffb300,0,.04,0,g);
    boxp(.012,.08,.1,0xffb300,0,-.02,.1,g);
    boxp(.05,.025,.04,0x3a2a00,0,.02,-.22,g);
    g.userData={kind,amp:.7,speed:.35,phase:0,y0:AQ.base+.58,z0:0,x0:0,size:.48};
  }else if(kind==='parrot'){
    sph(.055,0xe53935,0,0,0,g,10);
    sph(.03,0xff7043,.0,.01,-.05,g,8);
    boxp(.02,.04,.05,0xc62828,0,0,.07,g);
    boxp(.07,.008,.03,0xff8a80,0,.01,.01,g);
    g.userData={kind,amp:.35,speed:.55+Math.random()*.3,phase:Math.random()*6,y0:AQ.base+.35+Math.random()*.35,z0:(Math.random()-.5)*.6,x0:(Math.random()-.5)*.12,size:.12};
  }else{
    sph(.04,0x111111,0,0,0,g,10);
    boxp(.015,.035,.04,0x222,0,0,.055,g);
    boxp(.05,.006,.02,0x333,0,0,0,g);
    g.userData={kind,amp:.25,speed:.4,phase:2.2,y0:AQ.base+.28,z0:.15,x0:.05,size:.1};
  }
  fishes.push(g);return g;
}
addFish('arowana');
for(let i=0;i<6;i++)addFish('parrot');
addFish('molly');
// bubbles
const bubbles=[];
for(let i=0;i<12;i++){
  const b=sph(.012+Math.random()*.01,new THREE.MeshStandardMaterial({color:0xdeefff,transparent:true,opacity:.55}),(Math.random()-.5)*.3,AQ.base+.15+Math.random()*.4,(Math.random()-.5)*.15,aq,8);
  b.userData={y0:b.position.y,sp:.15+Math.random()*.2,x:b.position.x,z:b.position.z};
  bubbles.push(b);
}
let ft=0;
function tickGarden(dt){
  ft+=dt;
  for(const f of fishes){
    const u=f.userData;const t=ft*u.speed+u.phase;
    const z=u.z0+Math.sin(t)*u.amp;
    const x=u.x0+Math.cos(t*.7)* (u.kind==='arowana'?.12:.08);
    const y=u.y0+Math.sin(t*1.4)*.05;
    f.position.set(x,y,z);
    f.rotation.y=Math.atan2(Math.cos(t)*u.amp,1)* (u.kind==='arowana'?-1:-1) + (Math.cos(t)>0?0:Math.PI);
    // heading along path (tank length is Z)
    const dz=Math.cos(t)*u.amp, dx=-Math.sin(t*.7)*0.1;
    f.rotation.y=Math.atan2(dx,dz);
  }
  for(const b of bubbles){
    b.position.y+=b.userData.sp*dt;
    if(b.position.y>AQ.base+.88)b.position.y=AQ.base+.12;
    b.position.x=b.userData.x+Math.sin(ft*2+b.position.y)*0.02;
  }
}
(function loop(){requestAnimationFrame(loop);tickGarden(.016)})();

// ----- 介紹卡 -----
const css=document.createElement('style');css.textContent=`
#gardenPan{position:fixed;z-index:22;left:50%;top:50%;transform:translate(-50%,-50%);width:min(540px,94vw);max-height:80vh;overflow:auto;background:#fffffff8;border-radius:14px;padding:16px;font:14px "Noto Sans CJK TC",sans-serif;box-shadow:0 6px 30px #0005;display:none}
#gardenPan h3{margin:0 20px 8px 0}#gardenPan .gx{position:absolute;right:12px;top:10px;cursor:pointer;font-size:22px;border:0;background:none}
#gardenPan table{border-collapse:collapse;width:100%;font-size:13px}#gardenPan td,#gardenPan th{border-bottom:1px solid #eee;padding:5px 6px;text-align:left;vertical-align:top}
@media(max-width:900px){#gardenPan{top:auto;bottom:12px;transform:translate(-50%,0);max-height:62vh}}`;
document.head.appendChild(css);
const gpan=document.createElement('div');gpan.id='gardenPan';document.body.appendChild(gpan);
function showPan(title,html){gpan.innerHTML=`<button class="gx" type="button">✕</button><h3>${title}</h3>${html}`;gpan.style.display='block';gpan.querySelector('.gx').onclick=()=>{gpan.style.display='none'};}
function aqCard(){
  const rows=FISH_REC.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}：${r[2]}</td><td>${r[3]}：${r[4]}</td></tr>`).join('');
  showPan('財位水族箱｜由 Grok CEO 建置',`
  <p style="margin:0 0 8px;color:#7c2d12;background:#fff7ed;padding:8px;border-radius:8px"><b>這是民俗說法，不是科學結論。</b>較常見的講法是明財位在大門進來的對角線深處。本缸放在南牆中央大門的東北斜對角附近、靠東實牆，略離開窗邊死角；不正對大門，也不在老闆／CEO 座位後方。另有一派認為財位不宜見動水（「見財化水」），此處採折衷擺放。</p>
  <p><b>主缸 8 條：</b>1 條金龍魚（主魚、較大金色）＋ 6 條血鸚鵡（紅）＋ 1 條黑摩利（黑）。羅漢魚宜單養，不在主缸。</p>
  <p style="margin-bottom:4px"><b>各專員推薦的兩種魚</b>（介紹建議，不是全部放進缸裡）：</p>
  <table><tr><th>專員</th><th>建議 A</th><th>建議 B</th></tr>${rows}</table>
  <p style="font-size:12px;color:#666;margin-top:8px">位置約 (15.0, -7.2)。由 Grok CEO 建置。</p>`);
}
function plantCard(rec){
  showPan(rec.def.name,`<p><b>主人：</b>${rec.owner}</p><p><b>寓意：</b>${rec.def.meaning}</p><p><b>成長階段：</b><span style="background:#dcfce7;padding:2px 8px;border-radius:8px">${rec.stage}</span>（發芽 → 新葉 → 開花 → 茂盛；可由 status.json 的 plants.stages 或網址 ?pstage= 調整）</p>`);
}

const ray=new THREE.Raycaster(),mp=new THREE.Vector2();
R.domElement.addEventListener('pointerdown',e=>{
  mp.set(e.clientX/innerWidth*2-1,-(e.clientY/innerHeight)*2+1);
  ray.setFromCamera(mp,C);
  const objs=[aqHit,...plantObjs.map(p=>p.hit)];
  const h=ray.intersectObjects(objs,false)[0];
  if(!h)return;
  const d=h.object.userData.garden;if(!d)return;
  const pan=document.getElementById('panel');if(pan)pan.style.display='none';
  if(d.type==='aq')aqCard();else if(d.type==='plant')plantCard(d.rec);
},{capture:true});

// ----- 本週最佳植栽橫幅第二行 -----
const STAFF=DESKS.map(d=>d.name).filter(n=>!String(n).startsWith('彭立勛'));
const bopKey='bop_'+WEEK;
let BOP=Qg.get('bop')?STAFF.find(n=>n.startsWith(Qg.get('bop'))):localStorage.getItem(bopKey);
let bopMark=[];
function placeBOP(){
  bopMark.forEach(o=>{o.parent&&o.parent.remove(o);S.remove(o)});bopMark=[];
  const rec=BOP&&plantByName[BOP];if(!rec)return;
  const wreath=new THREE.Mesh(new THREE.TorusGeometry(.16,.025,8,20),GOLD);
  wreath.rotation.x=Math.PI/2;wreath.position.set(0,.52,0);rec.g.add(wreath);bopMark.push(wreath);
  const lb=label('🌿 本週最佳植栽',rec.g.position.x,2.15,rec.g.position.z,'#bbf7d0f2',30);
  bopMark.push(lb);
}
function ensureBopRow(){
  const bar=document.getElementById('eowbar');if(!bar)return;
  let row=bar.querySelector('#boprow');
  if(!row){
    row=document.createElement('div');row.id='boprow';
    row.style.cssText='font:13px sans-serif;margin-top:4px;color:#166534;display:flex;gap:8px;align-items:center;justify-content:center;flex-wrap:wrap';
    bar.appendChild(row);
  }
  const who=BOP?`<b>${BOP}</b>（老闆彭立勛親選）`:`<b>待老闆選定</b>`;
  if(row.dataset.who===String(BOP)&&row.querySelector('select'))return;
  row.dataset.who=String(BOP);
  row.innerHTML=`🌿 本週最佳植栽：${who}`;
  const sel=document.createElement('select');sel.style.cssText='font-size:13px';
  sel.innerHTML='<option value="">老闆選擇…</option>'+STAFF.map(n=>`<option ${n===BOP?'selected':''}>${n}</option>`).join('');
  sel.onchange=()=>{BOP=sel.value||null;BOP?localStorage.setItem(bopKey,BOP):localStorage.removeItem(bopKey);placeBOP();row.dataset.who='';ensureBopRow()};
  row.appendChild(sel);
  placeBOP();
}
const bootBop=()=>{if(!document.getElementById('eowbar'))return false;ensureBopRow();new MutationObserver(ensureBopRow).observe(document.getElementById('eowbar'),{childList:true});return true};
if(!bootBop()){const t=setInterval(()=>{if(bootBop())clearInterval(t)},80)}

// 視角按鈕
await wait(()=>document.getElementById('views'));
{const vd=document.getElementById('views');
 const add=(name,pos,tgt)=>{const b=document.createElement('button');b.textContent=name;b.onclick=()=>{if(window.stopWalk)window.stopWalk();C.fov=45;C.updateProjectionMatrix();C.position.set(...pos);O.target.set(...tgt);O.update()};vd.appendChild(b)};
 add('大門',[0,3.2,16.5],[0,1.6,11]);
 add('水族箱',[10.2,2.1,-7.2],[15.0,1.0,-7.2]);
 add('植栽近看',[-4,2.6,4],[-2,1.1,0]);
}
window.__garden={plantObjs,fishes,aq,stageOf,tickGarden,aqCard,plantCard};
