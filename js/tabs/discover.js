/* ---------- Discover ---------- */
function queue(){
  const F=S.filters;
  return pool(fest()).filter(x=>x.type===S.mode&&!S.seen[x.id]&&(!F.verified||x.verified)&&(!F.solo||x.type==='group'||x.solo)&&(!F.women||x.women||x.type==='person'))
    .sort((a,b)=>match(b).pct-match(a).pct);
}
function dcard(x,behind){
  const m=match(x);
  const likes=m.shared.length?`<div class="likes">You both like <b>${m.shared.map(esc).join(', ')}</b></div>`:'';
  const head=x.type==='group'
    ?`<div class="name">${esc(x.name)}</div><div class="sub">${esc(x.line)}</div><div class="faces">${x.faces.map(i=>`<span>${i}</span>`).join('')}</div>`
    :`<div class="name">${esc(x.name)}, ${x.age}</div><div class="sub">From ${esc(x.from)}</div>`;
  return `<div class="dcard ${behind?'behind':''}" ${behind?'':'id="top"'}>
    <div class="tp"><span class="badge">${x.type==='group'?'Group':'Person'}${x.verified?' · verified':''}</span><span class="match">${m.pct}% match</span></div>
    <div>${head}<div class="chips">${x.chips.map(c=>`<span>${esc(c)}</span>`).join('')}</div>
    <div class="sub" style="margin-top:10px;font-size:15px">${esc(x.bio)}</div>${likes}</div></div>`;
}
function discover(){
  const q=queue(), nf=Object.values(S.filters).filter(Boolean).length;
  const body=q.length
    ?`<div class="stack">${q[1]?dcard(q[1],true):''}${dcard(q[0])}</div>
      <div class="actions"><button class="btn ghost" data-act="skip">Skip</button>
      <button class="btn lime" data-act="join">${S.mode==='group'?(q[0].approval?'Ask to join':'Join crew'):'Say hi'}</button></div>`
    :`<div class="empty"><div class="h2">That's everyone for now</div><p class="muted">New ${S.mode==='group'?'groups':'people'} going to ${esc(fest().name)} show up here.</p>
      <button class="btn ghost" style="margin-top:20px" data-act="again">See them again</button></div>`;
  return `<div class="top"><div><div class="h1">Discover</div><div class="muted small" style="margin-top:4px">Going to the same festival · ranked by your music</div></div></div>
  <div class="pad" style="display:flex;gap:8px;align-items:center;margin:10px 0 12px">${festPill()}<div style="flex:1"></div>
    <button class="iconbtn" data-act="filters" aria-label="Filters">${I.filter}${nf?`<span class="n">${nf}</span>`:''}</button></div>
  <div class="seg" style="margin:0 20px 14px"><button class="${S.mode==='group'?'on':''}" data-mode="group">Groups</button><button class="${S.mode==='person'?'on':''}" data-mode="person">People</button></div>
  ${body}`;
}
