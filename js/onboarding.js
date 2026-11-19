/* ---------- onboarding (3 short steps) ---------- */
function onboarding(){
  const st=`<div class="steps">${[0,1,2].map(i=>`<i class="${i<=obStep?'on':''}"></i>`).join('')}</div>`;
  if(obStep===0) return `<div class="ob app"><div class="logo">CREW</div><p class="muted" style="margin-top:6px">Find your people. Feel the music.</p>${st}
    <div class="label">Which festival are you going to?</div>
    ${FESTS.map(f=>`<button class="fest ${f.id===S.fest?'on':''}" data-obfest="${f.id}"><span class="fl" style="background:${grad(f)}">${f.short}</span><span><b>${f.name}</b><br><span class="muted small">${f.city} · ${f.dates}</span></span></button>`).join('')}
    <div style="flex:1"></div><button class="btn lime" style="margin-top:24px" data-ob="next">Next</button></div>`;
  if(obStep===1) return `<div class="ob app"><button class="back" data-ob="back">${I.back}</button>${st}<div class="h1" style="margin-top:8px">About you</div>
    <div class="label">First name</div><input class="field" id="name" value="${esc(S.name)}" placeholder="e.g. Gleb" autocomplete="given-name">
    <div class="label">Age</div><div class="chiprow">${['18-21','22-25','26-30','31+'].map(a=>`<button class="chip ${S.age===a?'on':''}" data-age="${a}">${a}</button>`).join('')}</div>
    <div class="card" style="margin-top:22px;padding:2px 16px"><div class="toggle"><span class="grow"><b>I'm going solo</b><div class="muted small">We match you with other solo people and open groups</div></span><button class="sw ${S.solo?'on':''}" data-sw="solo"></button></div></div>
    <div style="flex:1"></div><button class="btn lime" style="margin-top:24px" data-ob="next2" ${S.name.trim()?'':'disabled'}>Next</button></div>`;
  const f=fest(),A=artistsFor(f);
  return `<div class="ob app"><button class="back" data-ob="back">${I.back}</button>${st}<div class="h1" style="margin-top:8px">Your music</div>
    <p class="muted small" style="margin-top:6px">So we can match you with the right crew.</p>
    <div class="label">Genres</div><div class="chiprow">${GENRES.map(g=>`<button class="chip ${S.genres.includes(g)?'on':''}" data-genre="${g}">${g}</button>`).join('')}</div>
    <div class="label">${f.lineup.length?`Who are you going to see?`:'Artists you love'}</div><div class="chiprow">${A.map(a=>`<button class="chip ${S.artists.includes(a)?'on':''}" data-artist="${esc(a)}">${esc(a)}</button>`).join('')}</div>
    <div style="flex:1"></div><button class="btn lime" style="margin-top:24px" data-ob="done">Find my crew</button></div>`;
}
function toggleArr(arr,v){return arr.includes(v)?arr.filter(x=>x!==v):[...arr,v]}
function bindOb(){
  const on=(sel,fn)=>root.querySelectorAll(sel).forEach(b=>b.onclick=()=>fn(b));
  on('[data-obfest]',b=>{S.fest=b.dataset.obfest;save();render()});
  on('[data-age]',b=>{S.age=b.dataset.age;save();render()});
  on('[data-genre]',b=>{S.genres=toggleArr(S.genres,b.dataset.genre);save();b.classList.toggle('on')});
  on('[data-artist]',b=>{S.artists=toggleArr(S.artists,b.dataset.artist);save();b.classList.toggle('on')});
  on('[data-sw]',b=>{S[b.dataset.sw]=!S[b.dataset.sw];save();b.classList.toggle('on')});
  const n=root.querySelector('#name');if(n)n.oninput=()=>{S.name=n.value;save();root.querySelector('[data-ob="next2"]').disabled=!n.value.trim()};
  on('[data-ob]',b=>{const a=b.dataset.ob;
    if(a==='next'){obStep=1;render();setTimeout(()=>root.querySelector('#name')?.focus(),50)}
    if(a==='next2'&&S.name.trim()){S.name=S.name.trim();obStep=2;render()}
    if(a==='back'){obStep--;render()}
    if(a==='done'){S.onboarded=true;S.tab='discover';save();render()}});
}
