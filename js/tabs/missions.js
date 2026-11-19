/* ---------- Missions & Feed ---------- */
function missions(){
  const p=points(),lvl=Math.floor(p/250)+1,into=p%250;
  const seg=S.mtab||'missions';
  let body='';
  if(seg==='missions'){
    body=`<div class="card" style="padding:2px 16px">${MISSIONS.map(m=>{const v=Math.min(statOf(m.id),m.goal),done=v>=m.goal;
      return `<div class="mission ${done?'done':''}"><span class="chk">${done?I.check:''}</span><div class="grow"><b style="font-size:15px">${m.label}</b>
        ${done?'<div class="muted xs">Done</div>':`<div class="bar-track"><div class="bar-fill" style="width:${v/m.goal*100}%"></div></div><div class="muted xs" style="margin-top:4px">${v}/${m.goal}</div>`}</div>
        <span class="tag ${done?'lime':''}">+${m.pts}</span></div>`}).join('')}</div>
      <div class="card" style="margin-top:12px;display:flex;gap:12px;align-items:center"><div class="grow" style="flex:1"><b>Invite friends</b><div class="muted small">+200 pts when a friend joins with your code</div>
        <div class="tag dark" style="margin-top:8px;font-weight:700">CREW-${esc(S.name.toUpperCase()).slice(0,8)}</div></div>
        <button class="btn lime sm" style="width:auto;padding:0 18px" data-act="invite">${S.invited?'✓ Sent':'Share'}</button></div>`;
  }else{
    body=`<button class="btn dark" style="margin-bottom:12px" data-act="post">Share a moment</button>`+S.feed.map(x=>`<div class="post"><div class="img" style="background:${x.g}">${esc(x.crew)}</div>
      <div class="meta"><div class="avatar" style="width:32px;height:32px;font-size:12px">${initials(x.who)}</div><div class="grow small"><b>${esc(x.who)}</b> ${esc(x.cap)}</div>
      <button class="heart ${S.likes[x.id]?'on':''}" data-like="${x.id}">${I.heart}${x.likes+(S.likes[x.id]?1:0)}</button></div></div>`).join('');
  }
  return `<div class="top"><div class="h1">Missions</div></div>
  <div class="lvl"><div class="small" style="opacity:.75">Level ${lvl}</div><div class="pts">${p} pts</div>
    <div class="bar-track"><div class="bar-fill" style="width:${into/250*100}%"></div></div><div class="xs" style="opacity:.7;margin-top:6px">${250-into} pts to level ${lvl+1}</div></div>
  <div class="seg" style="margin:0 20px 14px"><button class="${seg==='missions'?'on':''}" data-mtab="missions">Missions</button><button class="${seg==='feed'?'on':''}" data-mtab="feed">Feed</button></div>
  <div class="pad">${body}</div>`;
}
