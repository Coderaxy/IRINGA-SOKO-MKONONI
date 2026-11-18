const OWNER={tel:'255791808476',mpesa:'0791 808 476',jina:'RUNY OBEID MWANDEKO'};/* BADILISHA NAMBA NA JINA HAPA */
const PLANS=[{id:'w',n:'Siku 7',p:3000,d:'Bidhaa yako inaonekana juu ya orodha na ina alama ya Maalum.'},{id:'m',n:'Siku 30',p:10000,d:'Alama ya Maalum na nafasi ya juu kwa mwezi mzima.'},{id:'v',n:'Mthibitishwa (mwezi 1)',p:15000,d:'Alama ya Mthibitishwa baada ya kuthibitisha namba na biashara yako.'}];

const CC={Mazao:'#c68a12',Simu:'#5b3fb0',Electronics:'#2b5fb5',Nguo:'#b0437a',Viatu:'#8a5a2b',Samani:'#6b7a2f',Magari:'#3b4a54',Huduma:'#0e7c86'};
const CATS=[['Mazao','mazao.html'],['Simu','simu.html'],['Electronics','electronics.html'],['Nguo','nguo.html'],['Viatu','viatu.html'],['Samani','samani.html'],['Magari','magari.html'],['Huduma','huduma.html']];
let D=[
 {c:'Simu',i:'Samsung Galaxy A15 128GB',s:'Juma Kihwele',v:'Iringa Mjini',p:420000,k:'Mpya',t:'255700000001'},
 {c:'Simu',i:'iPhone 11 64GB',s:'Omary Lyimo',v:'Kihesa',p:750000,k:'Imetumika',t:'255700000010'},
 {c:'Electronics',i:'Laptop HP Core i5, 8GB RAM',s:'Asha Mwakyusa',v:'Gangilonga',p:950000,k:'Imetumika',t:'255700000002'},
 {c:'Electronics',i:'Spika ya Bluetooth JBL',s:'Fatuma Said',v:'Gangilonga',p:90000,k:'Mpya',t:'255700000012'},
 {c:'Nguo',i:'Kitenge yadi 6',s:'Neema Sanga',v:'Mlandege',p:35000,k:'Mpya',t:'255700000004'},
 {c:'Nguo',i:'Suti ya kiume size L',s:'Joseph Mkini',v:'Iringa Mjini',p:120000,k:'Imetumika',t:'255700000011'},
 {c:'Viatu',i:'Sneakers size 42',s:'Peter Ngowi',v:'Iringa Mjini',p:65000,k:'Mpya',t:'255700000005'},
 {c:'Samani',i:'Sofa seti ya viti 5',s:'Grace Kisanga',v:'Ipogoro',p:1200000,k:'Imetumika',t:'255700000006'},
 {c:'Mazao',i:'Mahindi gunia 100kg',s:'Hamisi Mtewele',v:'Ilula',p:85000,k:'',t:'255700000007'},
 {c:'Magari',i:'Gari aina ya sedan (mfano wa tangazo)',s:'Muuzaji wa mfano',v:'Mafinga',p:16700000,k:'Imetumika',t:'255700000008'},
 {c:'Huduma',i:'Ushonaji wa nguo za sherehe',s:'Zawadi Mbwilo',v:'Mlandege',p:25000,k:'',t:'255700000009'}];
const KW={Mazao:'mahindi',Simu:'simu',Electronics:'electronics',Nguo:'nguo',Viatu:'viatu',Samani:'samani',Magari:'magari',Huduma:'huduma'};
// Picha halisi za mfano kutoka Unsplash (leseni ya Unsplash); tangazo halisi litumie picha aliyopakia muuzaji.
const PHOTO={
  Mazao:'https://images.unsplash.com/photo-1649251037566-6881b4956615?auto=format&fit=crop&w=1200&q=82',
  Magari:'https://images.unsplash.com/photo-1665708611404-c97e2477e5e4?auto=format&fit=crop&w=1200&q=82',
  Huduma:'https://images.unsplash.com/photo-1687422808289-e721259c9eb4?auto=format&fit=crop&w=1200&q=82',
  Simu:'https://images.unsplash.com/photo-1759215524630-a6572b3cfb86?auto=format&fit=crop&w=1200&q=82',
  Electronics:'https://images.unsplash.com/photo-1759215524630-a6572b3cfb86?auto=format&fit=crop&w=1200&q=82',
  Nguo:'https://images.unsplash.com/photo-1739169585918-84f6fba6c6f7?auto=format&fit=crop&w=1200&q=82',
  Viatu:'https://images.unsplash.com/photo-1676379760823-ebf91f45de0b?auto=format&fit=crop&w=1200&q=82',
  Samani:'https://images.unsplash.com/photo-1772143535046-99a2bb734a3d?auto=format&fit=crop&w=1200&q=82'
};
const pic=(x)=>x.img||PHOTO[x.c]||PHOTO.Electronics;
const Q={0:'samsung,smartphone',1:'iphone',2:'laptop',3:'bluetooth,speaker',4:'african,fabric',5:'suit,jacket',6:'sneakers',7:'sofa,couch',8:'maize,corn',9:'motorcycle',10:'tailor,sewing'};
const EX={0:{o:480000,ok:1,y:3,r:96,pm:1},1:{ok:1,y:2,r:90},2:{o:1100000,ok:1,y:4,r:98,pm:1},3:{o:110000,y:1,r:88},4:{o:45000,ok:1,y:2,r:92},6:{o:80000,y:1,r:85},9:{ok:1,y:5,r:94}};
D.forEach((x,i)=>Object.assign(x,EX[i]||{},{q:Q[i],l:i+1}));
try{D=JSON.parse(localStorage.getItem('ism_v3')||'[]').concat(D)}catch(e){}
const $=id=>document.getElementById(id),B=document.body,P=B.dataset.page,C=B.dataset.cat;
const fmt=n=>n.toLocaleString('en-US');
const esc=s=>String(s).replace(/[&<>"']/g,c=>'&#'+c.charCodeAt(0)+';');
function toast(m){const t=$('t');t.textContent=m;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),2800)}
const R=B.dataset.root||'',CATF=['mazao','simu','electronics','nguo','viatu','samani','magari','huduma'];
const U=f=>{const[n,h]=f.split('#'),b=n.replace('.html','');return R+(b==='index'?n:CATF.includes(b)?'pages/categories/'+n:'pages/'+n)+(h?'#'+h:'')};
const NAV=[['Nyumbani','index.html','home'],['Bidhaa','soko.html','all'],['Uza bidhaa','sell.html','sell'],['Naitaji','need.html','need'],['Usafirishaji','ufuatiliaji.html','tracking'],['Msaada','msaada.html','support'],['Tangaza bidhaa','promote.html','promote'],['Wasiliana','contact.html','contact'],['Jisajili','register.html','register']];
const LINK=(n,f,on)=>`<a href="${U(f)}" class="${on?'on':''}">${n}</a>`;
B.insertAdjacentHTML('afterbegin',`<header><div class="wrap top"><button class="menu" id="mb" aria-label="Fungua menyu" aria-expanded="false"><span></span><span></span><span></span></button><a class="brand" href="${U('index.html')}"><span class="logo"><i></i></span><span class="n">Iringa Soko Mkononi</span></a></div></header>
<div class="ov" id="ov"></div>
<aside class="drawer" id="dr" aria-hidden="true"><div class="dh"><b>Menyu</b><button id="dx" aria-label="Funga menyu">&times;</button></div>
<nav>${NAV.map(([n,f,k])=>LINK(n,f,k&&k===P)).join('')}
<h4>Makundi</h4>${[['Zote','soko.html'],...CATS].map(([n,f])=>LINK(n,f,n===C||(n==='Zote'&&P==='all'))).join('')}
<h4>Akaunti</h4>${LINK('Ingia','index.html',false)}${LINK('Uza bidhaa','sell.html',P==='sell')}${LINK('Fuatilia mzigo','ufuatiliaji.html',P==='tracking')}</nav></aside>`);
(function(){const d=$('dr'),o=$('ov'),b=$('mb');const t=x=>{d.classList.toggle('open',x);o.classList.toggle('open',x);d.setAttribute('aria-hidden',!x);b.setAttribute('aria-expanded',x);document.body.style.overflow=x?'hidden':''};
b.onclick=()=>t(!d.classList.contains('open'));$('dx').onclick=o.onclick=()=>t(false);document.addEventListener('keydown',e=>{if(e.key==='Escape')t(false)});d.addEventListener('click',e=>{if(e.target.closest('a'))t(false)})})();
B.insertAdjacentHTML('beforeend',`<footer><div class="wrap">© 2026 Iringa Soko Mkononi, Iringa, Tanzania. Haki zote zimehifadhiwa.</div></footer><div class="toast" id="t" role="status"></div>`);
const W=(()=>{try{return JSON.parse(localStorage.getItem('ism_w')||'[]')}catch(e){return[]}})();
const ph=n=>{n=String(n).replace(/\D/g,'');if(n[0]==='0')n='255'+n.slice(1);else if(n.length===9)n='255'+n;return n};
const key=x=>x.t+'|'+x.i,FBC=c=>'data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="400" height="300" fill="${(CC[c]||'#17402e')}"/><text x="50%" y="54%" fill="#fff" fill-opacity=".85" font-family="sans-serif" font-size="34" font-weight="700" text-anchor="middle">${c}</text></svg>`),FB='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect width=%22400%22 height=%22300%22 fill=%22%23e6ece3%22/%3E%3C/svg%3E';
const wa=x=>`https://wa.me/${x.t}?text=`+encodeURIComponent(`Habari ${x.s}, nimeona "${x.i}" kwenye Iringa Soko Mkononi. Bado ipo?`);
const price=x=>`TSh ${fmt(x.p)}${x.o?` <s>${fmt(x.o)}</s>`:''}`;
let cur=[];
if(P==='cat'||P==='all'){
 B.insertAdjacentHTML('beforeend','<dialog id="dD"></dialog>');
 const detail=x=>{$('dD').innerHTML=`<img src="${pic(x,800)}" alt="${esc(x.i)}" onerror="this.onerror=null;this.src='${FBC(x.c)}'" style="width:100%;border-radius:12px;aspect-ratio:4/3;object-fit:cover;background:#e6ece3">
  <h3 style="margin:14px 0 4px">${esc(x.i)}</h3><div class="pr">${price(x)}</div>
  <div class="dtl"><span>Kategoria: ${x.c}</span><span>Eneo: ${esc(x.v)}</span>${x.k?`<span>Hali: ${x.k}</span>`:''}<span>Muuzaji: ${esc(x.s)} ${x.ok?'<b class="vf">✔ Mthibitishwa</b>':''}</span>${x.y?`<span>Kwenye soko: miaka ${x.y}</span>`:''}${x.r?`<span>Hujibu ujumbe: ${x.r}%</span>`:''}</div>
  <div class="tip">Kagua bidhaa kabla ya kulipa, kutana mahali pa wazi, na usilipe kabla ya kuiona.</div>
  <div class="two"><button class="btn b3" onclick="dD.close()">Funga</button><a class="btn b2" target="_blank" rel="noopener" href="${wa(x)}">WhatsApp</a></div>`;$('dD').showModal()};
 function go(){
  const g=id=>$(id)?$(id).value.trim().toLowerCase():'';
  const q=g('q'),so=g('sort'),cc=C||($('cat')?$('cat').value:''),mn=+g('pmin')||0,mx=+g('pmax')||Infinity,cd=$('cond')?$('cond').value:'',sv=$('sv')&&$('sv').checked;
  let L=D.filter(x=>(!cc||x.c===cc)&&(!q||(x.i+' '+x.v+' '+x.s+' '+x.c).toLowerCase().includes(q))&&x.p>=mn&&x.p<=mx&&(!cd||x.k===cd)&&(!sv||W.includes(key(x))));
  if(so==='a')L=[...L].sort((a,b)=>a.p-b.p);if(so==='d')L=[...L].sort((a,b)=>b.p-a.p);
  if(so==='n')L=[...L.filter(x=>x.pm),...L.filter(x=>!x.pm)];
  cur=L;if($('cnt'))$('cnt').textContent=L.length+' bidhaa zimepatikana';
  $('grid').innerHTML=L.length?L.map((x,j)=>`<article class="card"><button class="hrt ${W.includes(key(x))?'on':''}" data-k="${esc(key(x))}" aria-label="Hifadhi">♥</button>${x.pm?'<span class="pmb">★ Maalum</span>':''}${x.o?`<span class="dis">-${Math.round(100-x.p*100/x.o)}%</span>`:''}
   <img loading="lazy" data-j="${j}" src="${pic(x)}" alt="${esc(x.i)}" onerror="this.onerror=null;this.src='${FBC(x.c)}'"><div class="cb"><div class="pr">${price(x)}</div><div class="nm">${esc(x.i)}</div>
   <div class="mt">${esc(x.v)}${x.k?' · '+x.k:''}</div><div class="mt">${esc(x.s)} ${x.ok?'<b class="vf">✔ Mthibitishwa</b>':''}${x.r?' · Hujibu '+x.r+'%':''}</div>
   <a class="btn b2" target="_blank" rel="noopener" href="${wa(x)}">WhatsApp</a></div></article>`).join('')
   :'<div class="empty">Hakuna bidhaa inayolingana. Jaribu kubadilisha vichujio.</div>'}
 $('grid').onclick=e=>{const h=e.target.closest('.hrt');
  if(h){const k=h.dataset.k,i=W.indexOf(k);i<0?W.push(k):W.splice(i,1);try{localStorage.setItem('ism_w',JSON.stringify(W))}catch(er){}h.classList.toggle('on');toast(i<0?'Imehifadhiwa':'Imeondolewa');return}
  const m=e.target.closest('img');if(m)detail(cur[+m.dataset.j])};
 ['q','sort','cat','pmin','pmax','cond','sv'].forEach(id=>$(id)&&$(id).addEventListener('input',go));go();
 if(P==='cat')$('f').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);
  const x={c:C,i:f.get('item'),s:f.get('name'),v:f.get('vil'),p:+f.get('price'),k:f.get('cond'),t:ph(f.get('tel'))};
  D.unshift(x);try{const a=JSON.parse(localStorage.getItem('ism_v3')||'[]');a.unshift(x);localStorage.setItem('ism_v3',JSON.stringify(a))}catch(er){}
  e.target.reset();sellD.close();go();toast('Bidhaa imewekwa!')}}
if(P==='need'){
 let R=[{i:'Laptop kwa mwanafunzi',b:600000,v:'Iringa Mjini',n:'Amina',t:'255700000021'},{i:'Mahindi gunia 20',b:1500000,v:'Mafinga',n:'Duka la Baraka',t:'255700000022'},{i:'Mshonaji wa sare za shule',b:300000,v:'Kihesa',n:'Shule ya Msingi',t:'255700000023'}];
 try{R=JSON.parse(localStorage.getItem('ism_need')||'[]').concat(R)}catch(e){}
 const show=()=>{$('nl').innerHTML=R.map(r=>`<article class="card pd"><div class="nm">${esc(r.i)}</div><div class="pr">Bajeti: TSh ${fmt(r.b)}</div><div class="mt">${esc(r.v)} · ${esc(r.n)}</div><a class="btn b2" target="_blank" rel="noopener" href="https://wa.me/${r.t}?text=${encodeURIComponent('Habari, nina '+r.i+' ninayoweza kukuuzia (Iringa Soko Mkononi).')}">Nina hii</a></article>`).join('')};
 show();$('nf').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);
  const r={i:f.get('item'),b:+f.get('budget'),v:f.get('vil'),n:f.get('name'),t:ph(f.get('tel'))};
  R.unshift(r);try{const a=JSON.parse(localStorage.getItem('ism_need')||'[]');a.unshift(r);localStorage.setItem('ism_need',JSON.stringify(a))}catch(er){}
  e.target.reset();show();toast('Ombi lako limewekwa. Wauzaji watakuandikia WhatsApp.')}}
if(P==='home'){
 $('lf').onsubmit=e=>{e.preventDefault();toast('Kuingia kutafanya kazi toleo lijalo (inahitaji database)')}}

if(P==='register'){$('rf').onsubmit=e=>{e.preventDefault();toast('Usajili utafanya kazi toleo lijalo (unahitaji database)')}}
if(P==='contact'){$('cf').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);
 const m=encodeURIComponent(`Habari, naitwa ${f.get('name')}. ${f.get('msg')}`);
 window.open('https://wa.me/'+OWNER.tel+'?text='+m,'_blank')}}

if(P==='promote'){
 $('plans').innerHTML=PLANS.map(p=>`<article class="card pd"><div class="nm">${p.n}</div><div class="pr">TSh ${fmt(p.p)}</div><div class="mt">${p.d}</div></article>`).join('');
 $('plan').innerHTML=PLANS.map(p=>`<option value="${p.id}">${p.n}: TSh ${fmt(p.p)}</option>`).join('');
 $('pay').innerHTML=`Lipa kwa simu (mobile money) kwenye namba <b>${OWNER.mpesa}</b> (jina: <b>${esc(OWNER.jina)}</b>)`;
 $('pf').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),p=PLANS.find(x=>x.id===f.get('plan'));
  const m=`Habari, nataka kutangaza: ${f.get('item')}. Mpango: ${p.n} (TSh ${fmt(p.p)}). Jina: ${f.get('name')}. Namba: ${f.get('tel')}. Nitatuma uthibitisho wa malipo.`;
  window.open('https://wa.me/'+OWNER.tel+'?text='+encodeURIComponent(m),'_blank')}}


/* ===== V6: local-first marketplace utilities ===== */
function saveLocal(key,value){
 try{localStorage.setItem(key,JSON.stringify(value));return true}
 catch(err){toast('Hifadhi imeshindikana. Nafasi ya browser inaweza kuwa imejaa.');return false}
}
function readLocal(key,fallback=[]){try{const v=JSON.parse(localStorage.getItem(key)||'null');return v??fallback}catch(err){return fallback}}
function busy(form,on,label='Inachakata...'){
 const btn=form&&form.querySelector('button[type="submit"],button:not([type])');
 if(!btn)return;
 if(on){btn.dataset.old=btn.textContent;btn.disabled=true;btn.innerHTML='<span class="spinner"></span> '+label}
 else{btn.disabled=false;btn.textContent=btn.dataset.old||'Tuma'}
}
function makeTracking(){
 const f=$('tf');if(!f)return;
 f.addEventListener('submit',e=>{e.preventDefault();busy(f,true,'Inahifadhi...');
  try{const d=new FormData(f), item={tracking:d.get('tracking').trim(),address:d.get('address').trim(),phone:d.get('phone').trim(),status:'Imepokelewa',updated:new Date().toLocaleString('sw-TZ')};
   const all=readLocal('ism_ship',[]);all.unshift(item);saveLocal('ism_ship',all);
   $('trackResult').innerHTML=`<article class="card pd"><b>Namba: ${esc(item.tracking)}</b><p>${esc(item.address)}</p><span class="status">${item.status}</span><small>Imehifadhiwa kwenye kifaa hiki · ${esc(item.updated)}</small></article>`;
   f.reset();toast('Taarifa za usafirishaji zimehifadhiwa kwenye kifaa hiki.');
  }catch(err){toast('Hitilafu imetokea. Jaribu tena.')}finally{busy(f,false)}
 });
 const all=readLocal('ism_ship',[]);if(all.length&&$('trackResult'))$('trackResult').innerHTML=all.map(x=>`<article class="card pd"><b>Namba: ${esc(x.tracking)}</b><p>${esc(x.address)}</p><span class="status">${esc(x.status)}</span><small>${esc(x.updated||'')}</small></article>`).join('');
}
if(P==='tracking')makeTracking();

if(P==='sell'){
 const f=$('sellForm'), file=$('productImage'), preview=$('imagePreview');
 if(file)file.addEventListener('change',()=>{
  const x=file.files&&file.files[0];if(!x)return;
  if(!x.type.startsWith('image/')){toast('Chagua faili la picha pekee.');file.value='';return}
  if(x.size>2*1024*1024){toast('Picha iwe chini ya 2MB.');file.value='';return}
  const r=new FileReader();r.onload=()=>{preview.src=r.result;preview.hidden=false};r.onerror=()=>toast('Picha haikuweza kusomwa.');r.readAsDataURL(x);
 });
 if(f)f.addEventListener('submit',e=>{
  e.preventDefault();busy(f,true,'Inaweka bidhaa...');
  try{const d=new FormData(f),x={c:d.get('category'),i:d.get('item').trim(),s:d.get('name').trim(),v:d.get('vil').trim(),p:Number(d.get('price')),k:d.get('cond'),t:ph(d.get('tel')),q:d.get('item'),img:preview&&preview.src.startsWith('data:')?preview.src:null,createdAt:Date.now()};
   if(!x.i||!x.p||x.p<1)throw new Error('Taarifa za bidhaa hazijakamilika');
   const all=readLocal('ism_v3',[]);all.unshift(x);
   if(!saveLocal('ism_v3',all))throw new Error('Hifadhi imeshindikana');
   f.reset();if(preview){preview.hidden=true;preview.removeAttribute('src')}
   toast('Bidhaa imeongezwa sokoni!');setTimeout(()=>location.href=R+'pages/soko.html',650);
  }catch(err){toast(err.message||'Hitilafu imetokea. Jaribu tena.')}finally{busy(f,false)}
 });
}

if(P==='support'){
 const form=$('chatForm'),log=$('chatLog'),input=$('chatMessage');
 const history=readLocal('ism_support',[]);
 const draw=()=>{if(log)log.innerHTML=history.map(m=>`<div class="chatline ${m.from==='Wewe'?'mine':''}"><b>${esc(m.from)}</b><p>${esc(m.text)}</p><small>${esc(m.time)}</small></div>`).join('')};
 const reply=q=>{q=q.toLowerCase();
  if(q.includes('uza')||q.includes('bidhaa'))return 'Bonyeza “Uza bidhaa”, chagua kundi, jaza jina, bei, eneo na WhatsApp. Unaweza pia kupakia picha.';
  if(q.includes('fuat')||q.includes('tracking')||q.includes('usafir'))return 'Fungua “Usafirishaji”, weka tracking number na delivery address. Kwa sasa taarifa huhifadhiwa kwenye browser hii tu; ufuatiliaji wa kampuni ya usafirishaji unahitaji kuunganishwa na API yao.';
  if(q.includes('picha'))return 'Kwenye ukurasa wa Uza bidhaa unaweza kuchagua picha ya bidhaa kutoka kwenye simu yako (hadi 2MB).';
  if(q.includes('akaunti')||q.includes('jisajili')||q.includes('ingia'))return 'Tumia ukurasa wa Jisajili. Kumbuka: toleo hili ni mfano wa frontend; uthibitishaji wa akaunti unahitaji backend.';
  if(q.includes('malipo')||q.includes('bei'))return 'Mnunuzi na muuzaji wanakubaliana malipo moja kwa moja. Mfumo huu hauunganishi payment gateway kwa sasa.';
  return 'Naweza kusaidia kuhusu kuweka bidhaa, picha, usafirishaji, tracking na akaunti. Andika swali lako kwa maneno mengine au wasiliana nasi kupitia ukurasa wa Wasiliana.';
 };
 draw();
 if(form)form.addEventListener('submit',e=>{e.preventDefault();const q=input.value.trim();if(!q)return;
  history.push({from:'Wewe',text:q,time:new Date().toLocaleTimeString('sw-TZ')},{from:'Msaidizi wa Soko',text:reply(q),time:new Date().toLocaleTimeString('sw-TZ')});
  saveLocal('ism_support',history);input.value='';draw();log.scrollTop=log.scrollHeight;
 });
}
