(()=>{'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const LS={g(k,d){try{const v=localStorage.getItem('aq:'+k);return v?JSON.parse(v):d}catch(e){return d}},s(k,v){try{localStorage.setItem('aq:'+k,JSON.stringify(v))}catch(e){}}};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Lucide icon paths
const P={headphones:'<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',
'book-open':'<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
layers:'<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
'calendar-check':'<path d="M8 2v4M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18m-11 5 2 2 4-4"/>',
pen:'<path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/>',
moon:'<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
bookmark:'<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>',share:'<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/>',
left:'<path d="m15 18-6-6 6-6"/>',right:'<path d="m9 18 6-6-6-6"/>',plus:'<path d="M5 12h14M12 5v14"/>',minus:'<path d="M5 12h14"/>',
trash:'<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
rotate:'<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',play:'<polygon points="6 3 20 12 6 21 6 3"/>',
info:'<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',check:'<path d="M20 6 9 17l-5-5"/>',x:'<path d="M18 6 6 18M6 6l12 12"/>',
mic:'<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/>',
arrow:'<path d="M5 12h14M12 5l7 7-7 7"/>',heart:'<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',grid:'<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',home:'<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',quote:'<path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/>',sliders:'<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>',monitor:'<rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8M12 17v4"/>',alert:'<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4M12 17h.01"/>'};
const ic=n=>`<svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;
window.ic=ic;
const dk=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const noon=(d=new Date())=>{const x=new Date(d);x.setHours(12,0,0,0);return x};
const sh=(t,s)=>`<div class="sh"><h2>${t}</h2><p>${s}</p></div>`;
const fmt=(d,o)=>d.toLocaleDateString('en',o);

// ───────── Special rule: Surah At-Tawbah (9) has no Bismillah ─────────
window.tawbahNote=()=>`<div class="tawbah-note">${ic('info')}<span>Surah At-Tawbah is the only surah that begins without Bismillah. It is not recited at the beginning of this Surah.</span></div>`;

// ───────── Navigation ─────────
const TABS=[['today','home','Home'],['read','book-open','Read'],['tilawat','headphones','Listen'],['para','layers','Paras'],['plan','calendar-check','Planner'],['journal','pen','Journal'],['taqwim','moon','Taqwim'],['tasbeeh','target','Tasbeeh'],['saved','bookmark','Saved']],SEC=['para','journal','taqwim','tasbeeh','saved'];
const R={};
const tabsEl=$('#tabs');
tabsEl.innerHTML='<div class="logo">'+ic('book-open')+'</div>'+TABS.map(([id,i,l])=>`<button class="tab${id==='today'?' on':''}" data-t="${id}">${ic(i)}<span>${l}</span></button>`).join('');
['saved','tasbeeh','taqwim','journal','plan','today'].forEach(id=>{const d=document.createElement('div');d.id='tab-'+id;d.style.display='none';$('#tab-para').after(d)});
window.switchTab=t=>{$$('.tab').forEach(b=>b.classList.toggle('on',b.dataset.t===t));$$('#bnav [data-t]').forEach(b=>b.classList.toggle('on',b.dataset.t===t));const mb=$('#bnav [data-act=more]');mb&&mb.classList.toggle('on',SEC.includes(t));TABS.forEach(([id])=>{$('#tab-'+id).style.display=id===t?'block':'none'});R[t]&&R[t]();window.scrollTo({top:0});window.rp&&rp()};
tabsEl.onclick=e=>{const b=e.target.closest('.tab');b&&switchTab(b.dataset.t)};
const ACT={};
document.addEventListener('click',e=>{const el=e.target.closest('[data-act]');if(el&&ACT[el.dataset.act])ACT[el.dataset.act](el,el.dataset)});

// ───────── Hijri helpers ─────────
const MN=['Muharram','Safar','Rabi al-Awwal','Rabi al-Thani','Jumada al-Awwal','Jumada al-Thani','Rajab','Shaban','Ramadan','Shawwal','Dhul Qadah','Dhul Hijjah'];
let HF;try{HF=new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn',{year:'numeric',month:'numeric',day:'numeric'})}catch(e){}
const hij=d=>{const p=HF.formatToParts(d),g=t=>+p.find(x=>x.type===t).value;return{y:g('year'),m:g('month'),d:g('day')}};
const hijTxt=d=>{try{const h=hij(d);return`${h.d} ${MN[h.m-1]} ${h.y} AH`}catch(e){return''}};

// ───────── Reader integration: bookmarks, progress, continue ─────────
const bms=()=>LS.g('bm',[]);
window.ayahTools=(s,a)=>`<button class="ibtn${bms().some(b=>b.s==s&&b.a==a)?' on':''}" data-bm="${s}:${a}" data-act="bm" data-s="${s}" data-a="${a}" title="Bookmark ayah" aria-label="Bookmark ayah">${ic('bookmark')}</button>`;
ACT.bm=(el,d)=>{let b=bms();const i=b.findIndex(x=>x.s==d.s&&x.a==d.a);i>-1?b.splice(i,1):b.unshift({s:+d.s,a:+d.a,t:Date.now()});LS.s('bm',b);$$(`[data-bm="${d.s}:${d.a}"]`).forEach(x=>x.classList.toggle('on',i<0));if($('#tab-saved').style.display!=='none')R.saved()};
let pend=null,tm=null;
const io='IntersectionObserver'in window?new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting&&$('#tab-read').contains(e.target)||e.isIntersecting&&$('#tab-para').contains(e.target)){pend={s:+e.target.dataset.s,a:+e.target.dataset.a};clearTimeout(tm);tm=setTimeout(()=>{LS.s('last',{...pend,t:Date.now()});const p=LS.g('prog',{});if((p[pend.s]||0)<pend.a)p[pend.s]=pend.a;LS.s('prog',p)},1500)}})},{threshold:.6}):null;
window.afterRender=c=>{const n=c._surahN;$$('.ayah-box[data-a]',c).forEach(b=>io&&io.observe(b));if(window._goto&&window._goto.s===n){const t=$(`.ayah-box[data-a="${window._goto.a}"]`,c);window._goto=null;if(t)setTimeout(()=>{t.scrollIntoView({behavior:'smooth',block:'center'});t.classList.add('flash');setTimeout(()=>t.classList.remove('flash'),2200)},120)}};
window.openAt=(s,a)=>{const S=SURAHS.find(x=>x.n==s);if(!S)return;switchTab('read');$('#rinp').value=S.en;window._goto={s:+s,a:+a};renderRead({s:S,corrected:null},S.en,$('#rarea'))};
ACT.open=(e,d)=>openAt(d.s,d.a);

// ───────── Daily Ayah / Hadith / Dua (all text fetched from sources — never generated) ─────────
const AYAHS=['2:255','13:28','94:6','2:152','65:3','39:53','29:69','3:139'];
const DUAS=['2:201','3:8','20:114','14:40','25:74','21:87','7:23','2:286'];
const HADITH=[1,13,10,6018,6116,6502,6407,6412,2989,5027];
const doy=Math.floor((Date.now()-new Date(new Date().getFullYear(),0,0))/864e5);
async function getAyah(ref){const k='c:'+ref,c=LS.g(k);if(c)return c;
 const d=await(await fetch(`https://api.alquran.cloud/v1/ayah/${ref}/editions/quran-uthmani,en.asad`)).json();const[a,e]=d.data;
 const o={ar:a.text,en:e.text,ref:`Surah ${a.surah.englishName} (${ref})`,note:'Arabic: Uthmani text · Translation: Muhammad Asad'};LS.s(k,o);return o}
async function getHadith(n){const k='h:'+n,c=LS.g(k);if(c)return c;
 const g=async ed=>{for(const u of[`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${ed}/${n}.json`,`https://raw.githubusercontent.com/fawazahmed0/hadith-api/1/editions/${ed}/${n}.json`]){try{const r=await fetch(u);if(!r.ok)continue;const d=await r.json();return d.hadiths?d.hadiths[0]:d}catch(e){}}return null};
 const[en,ar]=await Promise.all([g('eng-bukhari'),g('ara-bukhari')]);if(!en||!en.text)throw 0;
 const gr=(en.grades||[]).map(x=>x.grade).filter(Boolean).join(', ');
 const o={en:en.text.trim(),ar:ar&&ar.text?ar.text.trim():'',ref:`Sahih al-Bukhari, Hadith ${en.hadithnumber||n}`,note:(gr?'Grade: '+gr+' · ':'')+'Shown verbatim from the source edition — not generated or edited'};LS.s(k,o);return o}
const IT={},sv=()=>LS.g('sv',[]),isSv=id=>sv().some(x=>x.id===id);
const card=(id,label,o)=>{IT[id]={...o,label};const s=isSv(id);return`<div class="card"><div class="lab">${label}</div>${o.ar?`<div class="ar-t">${esc(o.ar)}</div>`:''}<p class="en-t">${esc(o.en)}</p><div class="ref">${esc(o.ref)}${o.note?`<span>${esc(o.note)}</span>`:''}</div><div class="acts"><button class="btn sm ghost${s?' on':''}" data-act="save" data-id="${esc(id)}">${ic('bookmark')}<b>${s?'Saved':'Save'}</b></button><button class="btn sm ghost" data-act="share" data-id="${esc(id)}">${ic('share')}Share</button></div></div>`};
ACT.save=(el,d)=>{let a=sv();const i=a.findIndex(x=>x.id===d.id);i>-1?a.splice(i,1):a.unshift({id:d.id,...IT[d.id]});LS.s('sv',a);el.classList.toggle('on',i<0);$('b',el).textContent=i<0?'Saved':'Save';if($('#tab-saved').style.display!=='none')R.saved()};
ACT.share=async(el,d)=>{const o=IT[d.id];const t=[o.ar,o.en,'— '+o.ref].filter(Boolean).join('\n\n');try{if(navigator.share)await navigator.share({text:t});else{await navigator.clipboard.writeText(t);const b=$('b',el)||el;const old=el.innerHTML;el.innerHTML=ic('check')+'Copied';setTimeout(()=>el.innerHTML=old,1400)}}catch(e){}};
const fail=(id,l)=>`<div class="card"><div class="lab">${l}</div><p class="muted">Could not load right now. Please check your connection.</p><div class="acts"><button class="btn sm ghost" data-act="retry">${ic('rotate')}Retry</button></div></div>`;
ACT.retry=()=>R.today();
const dark=(id,label,o)=>{IT[id]={...o,label};const sd=isSv(id),m=o.ref.match(/\((\d+):(\d+)\)/);return`<div class="card dk"><div class="q">${ic('quote')}</div><div class="lab">${label}</div><div class="ar-t">${esc(o.ar)}</div><p class="en-t">${esc(o.en)}</p><div class="ref">${esc(o.ref)}</div><div class="acts"><button class="sqb${sd?' on':''}" data-act="save" data-id="${esc(id)}" aria-label="Save">${ic('bookmark')}<b hidden>${sd?'Saved':'Save'}</b></button><button class="sqb" data-act="share" data-id="${esc(id)}" aria-label="Share">${ic('share')}</button></div>${m?`<button class="goto" data-act="open" data-s="${m[1]}" data-a="${m[2]}">Go to ayah ${ic('arrow')}</button>`:''}</div>`};
ACT.go=(e,d)=>switchTab(d.t);
R.today=()=>{const el=$('#tab-today'),l=LS.g('last'),now=new Date(),S=l&&SURAHS.find(x=>x.n==l.s);
 el.innerHTML=`<div class="greet"><h1>Assalamu alaikum</h1><p>${hijTxt(now)} · ${fmt(now,{weekday:'long',day:'numeric',month:'long'})}</p></div>
 <button class="lr" data-act="open" data-s="${l?l.s:1}" data-a="${l?l.a:1}"><div><small>${l?'Last read':'Start reading'}</small><b>${S?S.en:'Al-Fatiha'}</b><span>${l?'Ayah '+l.a:'Begin with the opening'}</span></div>${ic('arrow')}</button>
 <div class="tiles">${[['read','book-open','Qur’an','114 Surahs'],['tasbeeh','target','Tasbeeh','Count dhikr'],['plan','calendar-check','Planner','Ramadan & week'],['taqwim','moon','Taqwim','Hijri calendar']].map(([t,i,a,b],k)=>`<button class="tile${k===0?' g':''}" data-act="go" data-t="${t}">${ic(i)}<b>${a}</b><small>${b}</small></button>`).join('')}</div>
 <div class="muted" style="margin:.2rem 2px .6rem">Quran and Hadith text is fetched from verified sources — never AI-written</div><div id="d1"></div><div class="two"><div id="d2"></div><div id="d3"></div></div>`;
 const run=async(id,label,fn)=>{try{$(id).innerHTML=await fn()}catch(e){$(id).innerHTML=fail(id,label)}};
 run('#d1','Ayah of the day',async()=>{const r=AYAHS[doy%AYAHS.length];return dark('q:'+r,'Ayah of the day',await getAyah(r))});
 run('#d2','Hadith of the day',async()=>{const n=HADITH[doy%HADITH.length];return card('h:'+n,'Hadith of the day',await getHadith(n))});
 run('#d3','Dua from the Quran',async()=>{const r=DUAS[doy%DUAS.length];return card('q:'+r,'Dua from the Quran',await getAyah(r))})};

// ───────── Planner (Ramadan + Weekly) ─────────
let mode='ram',rd=null,wo=0,wd=null,wc='Quran';
R.plan=()=>{$('#tab-plan').innerHTML=`<div class="seg"><button class="${mode==='ram'?'on':''}" data-act="mode" data-m="ram">Ramadan</button><button class="${mode==='wk'?'on':''}" data-act="mode" data-m="wk">Weekly</button></div><div id="pbody"></div>`;mode==='ram'?ram():wk()};
ACT.mode=(e,d)=>{mode=d.m;R.plan()};
const RT=['Fasting','Fajr','Dhuhr','Asr','Maghrib','Isha','Taraweeh','Quran reading','Charity'];
const rS=()=>LS.g('ram',{goal:1,days:{}});
const rUp=f=>{const S=rS(),D=S.days[rd]||(S.days[rd]={c:[],pg:0,ch:''});f(S,D);LS.s('ram',S);ram()};
function ram(){const S=rS();if(rd===null){let h;try{h=hij(new Date())}catch(e){}rd=h&&h.m===9?Math.min(h.d,30):1}
 const D=S.days[rd]||{c:[],pg:0,ch:''},gp=Math.ceil(604*S.goal/30),kept=Object.values(S.days).filter(x=>x.c.includes(0)).length,pct=Math.round(D.c.length/RT.length*100);
 $('#pbody').innerHTML=sh('Ramadan Planner','Fasting, prayer, Quran, charity — one day at a time')+
 `<div class="chips" id="rch">${[...Array(30)].map((_,i)=>{const n=i+1,x=S.days[n];return`<button class="dchip${n===rd?' on':''}${x&&x.c.length===RT.length?' dn':''}" data-act="rday" data-n="${n}">${n}<small>Day</small></button>`}).join('')}</div>
 <div class="card"><div class="row" style="justify-content:space-between"><b>Day ${rd}</b><span class="muted">${D.c.length}/${RT.length} done</span></div><div class="bar"><i style="width:${pct}%"></i></div>
 ${RT.map((t,i)=>`<button class="chk${D.c.includes(i)?' on':''}" data-act="rtog" data-i="${i}"><span class="bx">${ic('check')}</span><span class="tx">${t}</span></button>`).join('')}</div>
 <div class="card"><div class="lab">Quran goal</div><div class="row wrap" style="justify-content:space-between"><span class="muted">Complete the Quran</span><div class="cnt" style="margin:0"><button class="ibtn" data-act="rgoal" data-v="-1">${ic('minus')}</button><b>${S.goal}×</b><button class="ibtn" data-act="rgoal" data-v="1">${ic('plus')}</button></div></div>
 <p class="muted" style="margin-top:6px">About ${gp} pages a day (604 pages in the Mushaf)</p>
 <div class="cnt"><button class="ibtn" data-act="rpg" data-v="-1">${ic('minus')}</button><b>${D.pg}</b><span class="muted">pages today</span><button class="ibtn" data-act="rpg" data-v="1">${ic('plus')}</button><button class="btn sm ghost" data-act="rpg" data-v="${gp}" style="margin-left:auto">+${gp}</button></div><div class="bar"><i style="width:${Math.min(100,D.pg/gp*100)}%"></i></div></div>
 <div class="card"><div class="lab">Charity</div><input class="fld" id="rch-in" placeholder="What did you give today? (optional note)" value="${esc(D.ch)}"/></div>
 <p class="muted" style="text-align:center">Fasts kept: ${kept} / 30</p>`;
 const c=$('#rch'),o=$('.dchip.on',c);if(o)c.scrollLeft=o.offsetLeft-c.clientWidth/2;
 $('#rch-in').onchange=e=>{const S=rS(),D=S.days[rd]||(S.days[rd]={c:[],pg:0,ch:''});D.ch=e.target.value;LS.s('ram',S)}}
ACT.rday=(e,d)=>{rd=+d.n;ram()};ACT.rtog=(e,d)=>rUp((S,D)=>{const i=+d.i,k=D.c.indexOf(i);k>-1?D.c.splice(k,1):D.c.push(i)});
ACT.rgoal=(e,d)=>rUp(S=>{S.goal=Math.max(1,Math.min(10,S.goal+ +d.v))});ACT.rpg=(e,d)=>rUp((S,D)=>{D.pg=Math.max(0,D.pg+ +d.v)});

const WC=['Quran','Worship','Studies','Good deeds'],wS=()=>LS.g('wk',{});
function wk(){const base=noon(),mon=new Date(base);mon.setDate(base.getDate()-((base.getDay()+6)%7)+wo*7);
 const days=[...Array(7)].map((_,i)=>{const d=new Date(mon);d.setDate(mon.getDate()+i);return d});
 if(wd===null||!days.some(d=>dk(d)===wd))wd=dk(wo===0?base:days[0]);
 const W=wS(),all=days.flatMap(d=>W[dk(d)]||[]),dn=all.filter(t=>t.d).length,L=W[wd]||[];
 $('#pbody').innerHTML=sh('Weekly Planner','Quran, worship, studies and good deeds')+
 `<div class="card"><div class="cal-h"><button class="ibtn" data-act="wnav" data-v="-1">${ic('left')}</button><div><h2 style="font-size:15px">${fmt(days[0],{month:'short',day:'numeric'})} – ${fmt(days[6],{month:'short',day:'numeric'})}</h2><p>${dn} of ${all.length} done</p></div><button class="ibtn" data-act="wnav" data-v="1">${ic('right')}</button></div><div class="bar"><i style="width:${all.length?dn/all.length*100:0}%"></i></div></div>
 <div class="chips">${days.map(d=>{const k=dk(d),t=W[k]||[],all=t.length&&t.every(x=>x.d);return`<button class="dchip${k===wd?' on':''}${all?' dn':''}${k===dk(base)?' td':''}" data-act="wday" data-k="${k}" style="flex:1">${fmt(d,{weekday:'short'})}<small>${d.getDate()}</small></button>`}).join('')}</div>
 <div class="card"><div class="lab">${fmt(new Date(wd+'T12:00'),{weekday:'long',day:'numeric',month:'long'})}</div>
 ${L.length?L.map(t=>`<div class="task"><button class="chk${t.d?' on':''}" data-act="wtog" data-id="${t.id}"><span class="bx">${ic('check')}</span><span class="tx">${esc(t.t)}</span><span class="tag ${t.c.split(' ')[0]}">${t.c}</span></button><button class="ibtn" data-act="wdel" data-id="${t.id}" aria-label="Delete">${ic('x')}</button></div>`).join(''):'<div class="empty">Nothing planned yet — add your first intention below.</div>'}</div>
 <div class="card"><div class="tsb-pills" style="margin-bottom:8px">${WC.map(c=>`<button class="pill${c===wc?' on':''}" data-act="wcat" data-c="${c}">${c}</button>`).join('')}</div><div class="row"><input class="fld" id="wk-in" placeholder="e.g. Read Surah Al-Kahf" maxlength="100"/><button class="btn" data-act="wadd">${ic('plus')}Add</button></div></div>`;
 $('#wk-in').onkeydown=e=>{if(e.key==='Enter')ACT.wadd()}}
const wUp=f=>{const W=wS();W[wd]=W[wd]||[];f(W[wd]);LS.s('wk',W);wk()};
ACT.wnav=(e,d)=>{wo+=+d.v;wd=null;wk()};ACT.wday=(e,d)=>{wd=d.k;wk()};ACT.wcat=(e,d)=>{wc=d.c;wk()};
ACT.wadd=()=>{const v=$('#wk-in').value.trim();if(v)wUp(a=>a.push({id:Date.now(),t:v,c:wc,d:false}))};
ACT.wtog=(e,d)=>wUp(a=>{const t=a.find(x=>x.id==d.id);t.d=!t.d});ACT.wdel=(e,d)=>wUp(a=>{a.splice(a.findIndex(x=>x.id==d.id),1)});

// ───────── Journal ─────────
let jt='Reflection',jf='All';const JT=['Reflection','Gratitude','Dua','Note'];
R.journal=()=>{const J=LS.g('jr',[]).filter(x=>jf==='All'||x.k===jf);
 $('#tab-journal').innerHTML=sh('Islamic Journal','A private space — saved only on this device')+
 `<div class="card"><div class="tsb-pills">${JT.map(t=>`<button class="pill${t===jt?' on':''}" data-act="jt" data-t="${t}">${t}</button>`).join('')}</div><textarea class="fld" id="j-in" placeholder="${{Reflection:'What is on your heart today?',Gratitude:'Alhamdulillah for…',Dua:'Write a dua you are carrying…',Note:'A note to remember…'}[jt]}"></textarea><div class="acts"><button class="btn" data-act="jsave">${ic('check')}Save entry</button></div></div>
 <div class="tsb-pills">${['All',...JT].map(t=>`<button class="pill${t===jf?' on':''}" data-act="jf" data-t="${t}">${t}</button>`).join('')}</div>
 ${J.length?J.map(x=>`<div class="card entry"><div class="meta"><span class="tag ${x.k}">${x.k}</span>${fmt(new Date(x.t),{day:'numeric',month:'short',year:'numeric'})} · ${hijTxt(new Date(x.t))}<button class="ibtn" data-act="jdel" data-id="${x.t}" aria-label="Delete entry">${ic('trash')}</button></div><p>${esc(x.v)}</p></div>`).join(''):'<div class="empty">No entries yet.</div>'}`};
ACT.jt=(e,d)=>{const v=$('#j-in').value;jt=d.t;R.journal();$('#j-in').value=v};ACT.jf=(e,d)=>{jf=d.t;R.journal()};
ACT.jsave=()=>{const v=$('#j-in').value.trim();if(!v)return;const J=LS.g('jr',[]);J.unshift({t:Date.now(),k:jt,v});LS.s('jr',J);R.journal()};
ACT.jdel=(e,d)=>{if(confirm('Delete this entry?')){LS.s('jr',LS.g('jr',[]).filter(x=>x.t!=d.id));R.journal()}};

// ───────── Taqwim (Hijri calendar, Umm al-Qura) ─────────
const EV=[[1,1,'Islamic New Year'],[1,10,'Day of Ashura'],[9,1,'First day of Ramadan'],[9,21,'Last ten nights — possible Laylat al-Qadr'],[9,23,'Last ten nights — possible Laylat al-Qadr'],[9,25,'Last ten nights — possible Laylat al-Qadr'],[9,27,'Last ten nights — possible Laylat al-Qadr'],[9,29,'Last ten nights — possible Laylat al-Qadr'],[10,1,'Eid al-Fitr'],[12,9,'Day of Arafah'],[12,10,'Eid al-Adha']];
const first=d=>{const x=noon(d);x.setDate(x.getDate()-(hij(x).d-1));return x};
let tq=null;
R.taqwim=()=>{const el=$('#tab-taqwim');if(!HF){el.innerHTML='<div class="empty">Your browser does not support the Hijri calendar.</div>';return}
 if(!tq)tq=first(new Date());const h=hij(tq),cells=[],today=dk(new Date());let x=new Date(tq),last;
 while(hij(x).m===h.m){cells.push([new Date(x),hij(x).d]);last=new Date(x);x.setDate(x.getDate()+1)}
 const evs=EV.filter(e=>e[0]===h.m);
 el.innerHTML=sh('Taqwim','Hijri calendar with important Islamic dates')+`<div class="card"><div class="cal-h"><button class="ibtn" data-act="tnav" data-v="-1">${ic('left')}</button><div><h2>${MN[h.m-1]} ${h.y} AH</h2><p>${fmt(tq,{day:'numeric',month:'short'})} – ${fmt(last,{day:'numeric',month:'short',year:'numeric'})}</p></div><button class="ibtn" data-act="tnav" data-v="1">${ic('right')}</button></div>
 <div class="cal">${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(w=>`<div class="w">${w}</div>`).join('')}${'<div></div>'.repeat(tq.getDay())}${cells.map(([d,n])=>`<div class="d${d.getDay()===5?' fr':''}${evs.some(e=>e[1]===n)?' ev':''}${dk(d)===today?' td':''}"><b>${n}</b><small>${d.getDate()}</small></div>`).join('')}</div>
 <div class="acts" style="justify-content:center"><button class="btn sm ghost" data-act="ttoday">Today</button></div></div>
 <div class="card"><div class="lab">This month</div>${evs.length?evs.map(e=>`<div class="ev-i"><div class="n">${e[1]}</div><span>${e[2]}</span></div>`).join(''):'<p class="muted">No major dates this month. Fridays are softly highlighted.</p>'}</div>
 <p class="muted" style="text-align:center">Umm al-Qura calendar. Actual dates depend on local moon sighting and may differ by a day.</p>`};
ACT.tnav=(e,d)=>{const x=new Date(tq);x.setDate(x.getDate()+(+d.v>0?30:-1));tq=first(x);R.taqwim()};ACT.ttoday=()=>{tq=null;R.taqwim()};

// ───────── Tasbeeh ─────────
const PRE=[['sub','SubhanAllah','سُبْحَانَ ٱللَّهِ',33],['ham','Alhamdulillah','ٱلْحَمْدُ لِلَّهِ',33],['akb','Allahu Akbar','ٱللَّهُ أَكْبَرُ',34],['tah','La ilaha illallah','لَا إِلَٰهَ إِلَّا ٱللَّهُ',100],['ist','Astaghfirullah','أَسْتَغْفِرُ ٱللَّهَ',100],['sal','Salawat','ٱللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ',100]];
const tS=()=>LS.g('tsb',{cur:'sub',n:{},custom:[]}),tAll=S=>[...PRE,...S.custom.map(c=>[c.id,c.name,c.ar,c.target])];
const CIRC=2*Math.PI*54,off=(n,t)=>CIRC*(1-(n>0&&n%t===0?1:(n%t)/t));
R.tasbeeh=()=>{const S=tS(),A=tAll(S),c=A.find(x=>x[0]===S.cur)||A[0],n=S.n[c[0]]||0;
 $('#tab-tasbeeh').innerHTML=sh('Tasbeeh','Tap to count — your progress is remembered')+`<div class="tsb-pills">${A.map(x=>`<button class="pill${x[0]===c[0]?' on':''}" data-act="tpick" data-id="${x[0]}">${esc(x[1])}</button>`).join('')}</div>
 <div class="card tsb"><div class="dh">${esc(c[2]||'')}</div><div class="muted">${esc(c[1])} · target ${c[3]}</div>
 <div class="ring"><svg viewBox="0 0 120 120"><circle class="bg" cx="60" cy="60" r="54"/><circle class="fg" id="t-fg" cx="60" cy="60" r="54" stroke-dasharray="${CIRC}" stroke-dashoffset="${off(n,c[3])}"/></svg><button class="tap" data-act="ttap" aria-label="Count"><b id="t-n">${n}</b><span id="t-r">${Math.floor(n/c[3])} round${Math.floor(n/c[3])===1?'':'s'}</span></button></div>
 <div class="acts"><button class="btn sm ghost" data-act="treset">${ic('rotate')}Reset</button>${S.custom.some(x=>x.id===c[0])?`<button class="btn sm ghost" data-act="tdel">${ic('trash')}Remove</button>`:''}</div></div>
 <div class="card"><div class="lab">Add your own dhikr</div><div class="row wrap"><input class="fld" id="t-name" placeholder="Name (e.g. Hasbunallah)" maxlength="40"/><input class="fld" id="t-ar" placeholder="Arabic (optional)" dir="rtl" maxlength="60"/><input class="fld" id="t-tg" type="number" min="1" max="10000" placeholder="Target" style="max-width:110px"/><button class="btn" data-act="tadd">${ic('plus')}Add</button></div></div>`};
ACT.tpick=(e,d)=>{const S=tS();S.cur=d.id;LS.s('tsb',S);R.tasbeeh()};
ACT.ttap=()=>{const S=tS(),c=tAll(S).find(x=>x[0]===S.cur),n=(S.n[S.cur]||0)+1;S.n[S.cur]=n;LS.s('tsb',S);$('#t-n').textContent=n;$('#t-fg').style.strokeDashoffset=off(n,c[3]);const r=Math.floor(n/c[3]);$('#t-r').textContent=r+' round'+(r===1?'':'s');if(navigator.vibrate)navigator.vibrate(n%c[3]===0?[30,40,30]:8)};
ACT.treset=()=>{const S=tS();S.n[S.cur]=0;LS.s('tsb',S);R.tasbeeh()};
ACT.tdel=()=>{const S=tS();S.custom=S.custom.filter(x=>x.id!==S.cur);S.cur='sub';LS.s('tsb',S);R.tasbeeh()};
ACT.tadd=()=>{const nm=$('#t-name').value.trim(),tg=Math.max(1,Math.min(10000,+$('#t-tg').value||33));if(!nm)return;const S=tS(),id='c'+Date.now();S.custom.push({id,name:nm,ar:$('#t-ar').value.trim(),target:tg});S.cur=id;LS.s('tsb',S);R.tasbeeh()};

// ───────── Saved: bookmarks, progress, saved Ayah/Hadith/Dua ─────────
R.saved=()=>{const B=bms(),p=LS.g('prog',{}),read=Object.values(p).reduce((a,b)=>a+b,0),l=LS.g('last'),S=sv();
 $('#tab-saved').innerHTML=sh('Saved','Bookmarks, reading progress and saved texts')+
 `<div class="card"><div class="lab">Reading progress</div><div class="row" style="justify-content:space-between"><b>${(read/6236*100).toFixed(1)}%</b><span class="muted">${read} of 6,236 ayahs reached</span></div><div class="bar"><i style="width:${Math.min(100,read/6236*100)}%"></i></div>${l?`<button class="btn" data-act="open" data-s="${l.s}" data-a="${l.a}" style="margin-top:8px">${ic('play')}Continue ${SURAHS.find(x=>x.n==l.s).en} · ${l.a}</button>`:'<p class="muted">Start reading and your place will appear here.</p>'}</div>
 <div class="card"><div class="lab">Ayah bookmarks</div>${B.length?B.map(b=>{const s=SURAHS.find(x=>x.n==b.s);return`<div class="row-item"><div class="snum">${s.n}</div><div><b>${s.en}</b><div class="muted">Ayah ${b.a}</div></div><button class="btn sm ghost" data-act="open" data-s="${b.s}" data-a="${b.a}">Open</button><button class="ibtn" data-act="bm" data-s="${b.s}" data-a="${b.a}" aria-label="Remove">${ic('x')}</button></div>`}).join(''):'<p class="muted">Tap the bookmark icon beside any ayah while reading.</p>'}</div>
 ${S.length?'<div class="sh"><h2 style="font-size:15px">Saved Ayah, Hadith &amp; Dua</h2></div>'+S.map(o=>card(o.id,o.label,o)).join(''):''}`};
window.addEventListener('beforeunload',()=>{if(pend){LS.s('last',{...pend,t:Date.now()})}});

// ───────── Surah browser (Read tab) ─────────
let so='n',fo=false;const favs=()=>LS.g('fav',[]),strip=x=>x.replace(/^(Al|An|At|As|Az|Ad|Ar|Ash)-/,'');
$('#rarea').before(Object.assign(document.createElement('div'),{id:'sortbar',className:'tsb-pills'}),Object.assign(document.createElement('div'),{id:'slist',className:'sgrid'}),Object.assign(document.createElement('button'),{id:'rback',className:'btn ghost sm',style:'display:none;margin-bottom:.7rem',innerHTML:ic('left')+'All surahs'}));
$('#rback').dataset.act='rback';
const rv=on=>{$('#slist').style.display=$('#sortbar').style.display=on?'none':'';$('#rback').style.display=on?'':'none'};
function slist(){const q=($('#rinp').value||'').toLowerCase().replace(/[^a-z0-9]/g,''),F=favs();
 let L=SURAHS.filter(x=>!q||String(x.n)===q||x.en.toLowerCase().replace(/[^a-z0-9]/g,'').includes(q)||Object.entries(ALIASES).some(([k,v])=>v===x.en&&k.replace(/\s/g,'').includes(q)));
 if(fo)L=L.filter(x=>F.includes(x.n));
 L=[...L].sort(so==='a'?(x,y)=>strip(x.en).localeCompare(strip(y.en)):so==='v'?(x,y)=>y.v-x.v:so==='p'?(x,y)=>x.p-y.p||x.n-y.n:(x,y)=>x.n-y.n);
 $('#sortbar').innerHTML=[['n','Serial'],['a','A–Z'],['v','Verses'],['p','Para']].map(([k,l])=>`<button class="pill${so===k?' on':''}" data-act="sort" data-k="${k}">${l}</button>`).join('')+`<button class="pill${fo?' on':''}" data-act="sfo">${ic('heart')} Favourites</button>`;
 $('#slist').innerHTML=L.length?L.map(x=>`<div class="sc" role="button" tabindex="0" data-act="sopen" data-n="${x.n}"><span class="star"><span>${x.n}</span></span><div class="si"><b>${x.en}</b><small>${x.t} · ${x.v} verses · Para ${x.p}</small></div><i class="ar">${x.ar}</i><button class="ibtn heart${F.includes(x.n)?' on':''}" data-act="sfav" data-n="${x.n}" aria-label="Favourite">${ic('heart')}</button></div>`).join(''):'<div class="empty">No surah found</div>'}
R.read=slist;
ACT.sort=(e,d)=>{so=d.k;slist()};ACT.sfo=()=>{fo=!fo;slist()};
ACT.sfav=(e,d)=>{let F=favs();const n=+d.n,i=F.indexOf(n);i>-1?F.splice(i,1):F.push(n);LS.s('fav',F);slist()};
ACT.sopen=(e,d)=>{const S=SURAHS.find(x=>x.n==d.n);$('#rinp').value=S.en;renderRead({s:S,corrected:null},S.en,$('#rarea'));window.scrollTo({top:0,behavior:'smooth'})};
ACT.rback=()=>{$('#rarea').innerHTML='';$('#rinp').value='';rv(false);slist()};
const oR=window.renderRead;window.renderRead=(r,i,a)=>{oR(r,i,a);if(r&&r.s)rv(true)};
$('#rinp').addEventListener('input',()=>{if($('#rback').style.display==='none')slist()});
$('#slist').addEventListener('keydown',e=>{if(e.key==='Enter'){const c=e.target.closest('.sc');c&&c.click()}});
const oT=window.renderTilawat;window.renderTilawat=(r,i,a)=>{oT(r,i,a);if(r&&r.s){LS.s('lastl',r.s.n);window.rp&&rp()}};
ACT.listen=(e,d)=>{const S=SURAHS.find(x=>x.n==d.n);switchTab('tilawat');$('#inp').value=S.en;go()};

// ───────── Mobile bottom navigation + More sheet ─────────
const BN=[['today','Home'],['read','Read'],['tilawat','Listen'],['plan','Planner']],icOf=t=>TABS.find(x=>x[0]===t)[1];
document.body.insertAdjacentHTML('beforeend',`<nav id="bnav">${BN.map(([t,l])=>`<button data-t="${t}">${ic(icOf(t))}<span>${l}</span></button>`).join('')}<button data-act="more">${ic('grid')}<span>More</span></button></nav>
<div id="more" data-act="closemore"><div class="sheet">${SEC.map(t=>`<button class="mi" data-act="mgo" data-t="${t}">${ic(icOf(t))}<span>${TABS.find(x=>x[0]===t)[2]}</span></button>`).join('')}</div></div>`);
$('#bnav').onclick=e=>{const b=e.target.closest('[data-t]');b&&switchTab(b.dataset.t)};
ACT.more=()=>$('#more').classList.add('open');ACT.closemore=(e)=>{if(e.id==='more')$('#more').classList.remove('open')};
ACT.mgo=(e,d)=>{$('#more').classList.remove('open');switchTab(d.t)};

// ───────── Options drawer: theme + last read / listened / ayah of the day ─────────
const mq=matchMedia('(prefers-color-scheme:dark)');
const theme=v=>{if(v)LS.s('theme',v);const t=LS.g('theme','auto'),d=t==='auto'?(mq.matches?'dark':'light'):t;document.documentElement.dataset.theme=d;const m=$('meta[name=theme-color]');m&&m.setAttribute('content',d==='dark'?'#0d1a15':'#1D9E75');$$('#thm button').forEach(x=>x.classList.toggle('on',x.dataset.v===t))};
document.body.insertAdjacentHTML('beforeend',`<button id="opt" data-act="opt" aria-label="Options">${ic('sliders')}</button><div id="rpb" data-act="optclose"></div>
<aside id="rp" aria-label="Options"><div class="rp-top"><b>Options</b><button class="ibtn" data-act="optclose" aria-label="Close">${ic('x')}</button></div>
<div><div class="lab">Appearance</div><div class="seg" id="thm">${[['light','sun','Day'],['dark','moon','Night'],['auto','monitor','Auto']].map(([v,i,l])=>`<button data-act="theme" data-v="${v}">${ic(i)} ${l}</button>`).join('')}</div></div><div id="rp-body"></div></aside>`);
ACT.theme=(e,d)=>theme(d.v);mq.addEventListener&&mq.addEventListener('change',()=>theme());
ACT.opt=()=>{document.body.classList.add('opt-open');rp()};ACT.optclose=()=>document.body.classList.remove('opt-open');
document.addEventListener('keydown',e=>{if(e.key==='Escape')ACT.optclose()});
['open','listen'].forEach(k=>{const o=ACT[k];ACT[k]=(e,d)=>{ACT.optclose();o(e,d)}});
window.rp=async()=>{if(!document.body.classList.contains('opt-open'))return;const l=LS.g('last'),ln=LS.g('lastl'),A=l&&SURAHS.find(x=>x.n==l.s),B=ln&&SURAHS.find(x=>x.n==ln);
 $('#rp-body').innerHTML=`<div class="rp-i"><div><small>LAST READ</small><b>${A?A.en:'Not started'}</b>${l?`<span>Ayah ${l.a}</span>`:''}</div><button class="ibtn" data-act="open" data-s="${l?l.s:1}" data-a="${l?l.a:1}" aria-label="Continue reading">${ic('book-open')}</button></div>
 <div class="rp-i"><div><small>LAST LISTENED</small><b>${B?B.en:'—'}</b></div><button class="ibtn" data-act="listen" data-n="${B?B.n:1}" aria-label="Listen">${ic('headphones')}</button></div>
 <div class="rp-g" id="rp-a"><small>AYAH OF THE DAY</small></div>`;
 try{const r=AYAHS[doy%AYAHS.length],o=await getAyah(r),m=r.split(':');$('#rp-a').innerHTML=`<small>AYAH OF THE DAY</small><p>${esc(o.en)}</p><span>${esc(o.ref)}</span><button class="rp-n" data-act="open" data-s="${m[0]}" data-a="${m[1]}">Go to ayah ${ic('arrow')}</button>`}catch(e){}};
theme();
switchTab('today');
})();
