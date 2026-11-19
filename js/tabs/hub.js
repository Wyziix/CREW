/* ---------- Hub ---------- */
function clashes(f){
  const saved=f.lineup.map((a,i)=>({a:a[0],d:a[1],t:TIMES[f.lineup.filter((b,j)=>j<i&&b[1]===a[1]).length%4]})).filter(s=>S.plan[f.id+'|'+s.a]);
  const out=[];saved.forEach((s,i)=>saved.slice(i+1).forEach(o=>{if(s.d===o.d&&s.t===o.t)out.push([s.a,o.a])}));return out;
}
function nowOn(f){if(!f.lineup.length)return null;const sat=f.lineup.filter(a=>a[1]==='Sat');return {now:sat[0][0],next:(sat.find(a=>S.plan[f.id+'|'+a[0]])||sat[1])[0]}}
function hub(){
  const f=fest(),d=daysTo(f),n=planCount(),cl=clashes(f).length,cart=Object.values(S.cart).reduce((a,b)=>a+b,0),no=nowOn(f);
  const live=S.live&&no?`<div class="live"><span class="pulse"></span><span><b>Now:</b> ${esc(no.now)} · Main stage<br><span style="opacity:.85">Next for you: ${esc(no.next)} at 20:30</span></span></div>`:'';
  return `<div class="top"><div class="h1">Festival Hub</div></div><div class="pad" style="margin:10px 0 0">${festPill()}</div>
  <div class="hero" style="background:${grad(f)}">
    <div class="small" style="opacity:.85">${esc(f.city)} · ${esc(f.venue)}</div>
    <div class="h1">${esc(f.name)}</div>
    <div class="small">${esc(f.dates)}${!S.live&&d>0?` · <b>${d} days to go</b>`:''}</div>
    ${live}
    <button class="tag" style="margin-top:12px;background:rgba(255,255,255,.22);color:#fff;font-weight:700" data-act="live">${S.live?'Back to countdown':'Preview festival day'}</button>
  </div>
  <div class="pad"><div class="grid2">
    <button class="tile ${cl?'warn':''}" data-push="lineup"><span class="ico">${I.music}</span><span><b>Lineup & plan</b><span class="xs">${!f.lineup.length?'Not announced yet':cl?`${cl} clash in your plan`:`${n} set${n===1?'':'s'} saved`}</span></span></button>
    <button class="tile" data-push="map"><span class="ico">${I.map}</span><span><b>Map</b><span class="xs">${S.live?'Live crowd levels':S.offline?'Saved offline':'Stages, water, your crew'}</span></span></button>
    <button class="tile" data-push="food"><span class="ico">${I.food}</span><span><b>Food & drinks</b><span class="xs">${cart?`${cart} in your order`:'Order ahead, skip queues'}</span></span></button>
    <button class="tile" data-push="ask"><span class="ico">${I.chat}</span><span><b>Ask CREW</b><span class="xs">Toilets, clashes, bags…</span></span></button>
    <button class="tile red" data-push="safety"><span class="ico">${I.shield}</span><span><b>Safety</b><span class="xs">SOS, check-in, location</span></span></button>
    <button class="tile" data-push="info"><span class="ico">${I.info}</span><span><b>Info</b><span class="xs">Getting there, rules</span></span></button>
  </div></div>`;
}
