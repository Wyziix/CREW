/* ---------- Profile ---------- */
function profile(){
  const pol={everyone:'Everyone at the festival',verified:'Verified people only',crews:'My crews only'};
  return `<div class="top"><div class="h1">Profile</div></div>
  <div class="prof"><div class="avatar">${initials(S.name)}</div><div class="h2" style="margin-top:10px">${esc(S.name)}</div>
    <div class="muted small">${esc(S.age)} · ${esc(S.city)}${S.solo?' · going solo':''}</div>
    ${S.verified?`<span class="vbadge">${I.check} Verified</span>`:''}</div>
  <div class="pad">
    ${S.verified?'':`<div class="card" style="margin-top:16px;display:flex;gap:12px;align-items:center"><div style="flex:1"><b>Get verified</b><div class="muted small">68% of students feel safer with verified profiles. Verified people get matched first.</div></div>
      <button class="btn lime sm" style="width:auto;padding:0 18px" data-act="verify">Verify</button></div>`}
    <div class="sect">Your music</div>
    <div class="card"><div class="chiprow">${S.genres.length?S.genres.map(g=>`<span class="chip on">${g}</span>`).join(''):'<span class="muted small">No genres yet</span>'}</div>
      <div class="muted small" style="margin:14px 0 8px">${S.artists.length} favourite artist${S.artists.length===1?'':'s'}</div>
      <div class="chiprow">${S.artists.slice(0,8).map(a=>`<span class="chip">${esc(a)}</span>`).join('')}</div>
      <div style="display:flex;gap:8px;margin-top:14px"><button class="btn soft sm" style="background:var(--bg)" data-act="editmusic">Edit</button><button class="btn sm" style="background:#1ED760;border-color:#1ED760" data-act="spotify">Import from Spotify</button></div></div>
    <div class="sect">Festival style</div>
    <div class="card"><div class="chiprow">${['Chill','Party','Front row','Camping'].map(v=>`<button class="chip ${S.vibe.includes(v)?'on':''}" data-pvibe="${v}">${v}</button>`).join('')}</div></div>
    <div class="sect">Privacy & safety</div>
    <div class="card" style="padding:2px 16px">
      <button class="lrow" data-act="policy"><span class="grow"><b>Who can message me</b><div class="muted small">${pol[S.msgPolicy]}</div></span><span class="muted">›</span></button>
      <div class="toggle"><span class="grow"><b>I'm going solo</b><div class="muted small">Shows you to other solo people first</div></span><button class="sw ${S.solo?'on':''}" data-sw="solo"></button></div>
      <div class="toggle"><span class="grow"><b>Live location</b><div class="muted small">Only my crews, only during the festival</div></span><button class="sw ${S.shareLoc?'on':''}" data-sw="shareLoc"></button></div>
      <button class="lrow" data-act="report"><span class="grow"><b>Report someone</b></span><span class="muted">›</span></button>
    </div>
    <button class="btn ghost sm" style="margin-top:20px;border-color:var(--line)" data-act="reset">Restart demo</button>
  </div>`;
}
