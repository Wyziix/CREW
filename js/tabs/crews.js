/* ---------- Crews ---------- */
function crewsTab(){
  const list=crewsHere(), reqs=reqsHere(), pend=Object.keys(S.pending).filter(k=>k.startsWith(S.fest)&&S.pending[k]);
  let body='';
  if(reqs.length) body+=`<div class="sect">Join requests</div><div class="card">${reqs.map(r=>`<div class="req"><div class="avatar" style="background:var(--grad);color:#fff">${initials(r.name)}</div>
      <div class="grow"><b>${esc(r.name)}</b><div class="muted small">wants to join ${esc(r.crewName)}${r.verified?' · verified':''}</div></div>
      <button class="tag dark" style="padding:8px 12px" data-req="${r.id}|ok">Accept</button><button class="tag" style="padding:8px 12px" data-req="${r.id}|no">No</button></div>`).join('<div style="height:12px"></div>')}</div>`;
  if(pend.length) body+=`<div class="sect">Waiting for approval</div><div class="card">${pend.map(k=>{const x=pool(fest()).find(p=>p.id===k);return `<div class="req"><div class="cav" style="width:40px;height:40px;font-size:12px">${initials(x.name)}</div><div class="grow"><b>${esc(x.name)}</b><div class="muted small">Request sent</div></div></div>`}).join('')}</div>`;
  body+= list.length
    ?`<div class="sect">Chats</div><div class="card" style="padding:2px 16px">${list.map(c=>{const last=c.msgs[c.msgs.length-1];
      const lt=!last?'':last.type==='poll'?'📊 '+last.q:(last.who==='me'?'You: ':['sys','alert'].includes(last.who)?'':last.who+': ')+last.t;
      return `<button class="crew" data-open="${c.id}"><div class="cav">${initials(c.name)}</div><div class="grow"><b>${esc(c.name)}</b>
        <div class="last">${esc(lt)}</div></div>${c.unread?'<span class="udot"></span>':''}</button>`}).join('')}</div>`
    :(!reqs.length&&!pend.length?`<div class="empty"><div class="h2">No crews yet</div><p class="muted">Join a group in Discover, or start your own crew and let people find you.</p>
      <button class="btn lime" style="margin-top:20px" data-tab="discover">Find a crew</button></div>`:'');
  return `<div class="top"><div class="h1">My Crews</div><button class="iconbtn" data-act="newcrew" aria-label="New crew">${I.plus}</button></div>
  <div class="pad" style="margin:10px 0 0">${festPill()}</div><div class="pad">${body}</div>`;
}
