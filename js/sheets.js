/* ---------- sheets ---------- */
function sheetHtml(){
  let b='';
  const f=fest();
  if(sheet==='festpick') b=`<div class="h2" style="margin-bottom:6px">Your festival</div>`+FESTS.map(x=>`<button class="fest ${x.id===S.fest?'on':''}" data-fest="${x.id}">
      <span class="fl" style="background:${grad(x)}">${x.short}</span><span><b>${x.name}</b><br><span class="muted small">${x.city} · ${x.dates}</span></span></button>`).join('');
  if(sheet==='filters') b=`<div class="h2">Filters</div><div class="card" style="margin-top:14px;padding:2px 16px">
      <div class="toggle"><span class="grow"><b>Verified only</b></span><button class="sw ${S.filters.verified?'on':''}" data-filter="verified"></button></div>
      <div class="toggle"><span class="grow"><b>Solo goers</b><div class="muted small">People going alone, like you</div></span><button class="sw ${S.filters.solo?'on':''}" data-filter="solo"></button></div>
      <div class="toggle"><span class="grow"><b>Women-only crews</b></span><button class="sw ${S.filters.women?'on':''}" data-filter="women"></button></div></div>
      <button class="btn lime" style="margin-top:16px" data-act="close">Show results</button>`;
  if(sheet==='newcrew') b=`<div class="h2">Start a crew</div><p class="muted small" style="margin-top:4px">For ${esc(f.name)}. People in Discover can find it.</p>
      <input class="field" id="crewname" placeholder="Crew name, e.g. Sunset Squad" maxlength="28">
      <div class="card" style="margin-top:12px;padding:2px 16px">
        <div class="toggle"><span class="grow"><b>I approve who joins</b></span><button class="sw ${draft.approval!==false?'on':''}" data-draft="approval"></button></div>
        <div class="toggle"><span class="grow"><b>Women only</b></span><button class="sw ${draft.women?'on':''}" data-draft="women"></button></div>
        <div class="toggle"><span class="grow"><b>Verified only</b></span><button class="sw ${draft.verifiedOnly?'on':''}" data-draft="verifiedOnly"></button></div></div>
      <button class="btn lime" style="margin-top:16px" data-act="createcrew">Create crew</button>`;
  if(sheet==='chatplus'){const c=S.crews.find(x=>x.id===view.arg);
    b=`<div class="h2" style="margin-bottom:6px">Add to chat</div>
      <button class="actrow" data-act="mkpoll"><span class="ico">${I.poll}</span><span><b>Poll</b><div class="muted small">Let the crew vote</div></span></button>
      <button class="actrow" data-act="song"><span class="ico">${I.music}</span><span><b>Add a song to the playlist</b><div class="muted small">${c.playlist.length} so far</div></span></button>
      <button class="actrow" data-act="safe"><span class="ico" style="color:var(--green)">${I.check}</span><span><b>I'm here & safe</b><div class="muted small">Check in with your crew</div></span></button>
      <button class="actrow" data-act="lost"><span class="ico" style="color:var(--red)">${I.pin}</span><span><b>I'm lost</b><div class="muted small">Sends your location to the crew</div></span></button>`;}
  if(sheet==='mkpoll') b=`<div class="h2">New poll</div><input class="field" id="pq" placeholder="Question" value="Metro or walk from the meet-up?">
      <input class="field" id="po1" placeholder="Option 1" value="Metro"><input class="field" id="po2" placeholder="Option 2" value="Walk">
      <button class="btn lime" style="margin-top:16px" data-act="sendpoll">Send poll</button>`;
  if(sheet==='verify'){
    const steps=[['Selfie check','Match your face to your profile photo','Take a selfie'],['Your ID','Passport, ID card or driving licence','Add a photo of your ID']];
    b=vstep<2?`<div class="steps"><i class="on"></i><i class="${vstep>0?'on':''}"></i></div><div class="h2" style="margin-top:10px">${steps[vstep][0]}</div><p class="muted" style="margin-top:4px">${steps[vstep][1]}</p>
      <div style="height:150px;border-radius:22px;border:2px dashed #CFC7B6;display:grid;place-items:center;margin:16px 0" class="muted">${vstep?'🪪':'🤳'}</div>
      <button class="btn lime" data-act="vnext">${steps[vstep][2]}</button><p class="muted xs" style="text-align:center;margin-top:10px">Demo: uses a sample photo. Your ID is never shown to other people.</p>`
      :`<div class="empty"><div class="h2">Checking…</div><p class="muted">Usually takes under a minute</p></div>`;
  }
  if(sheet==='policy'){const o=[['everyone','Everyone at the festival'],['verified','Verified people only'],['crews','My crews only']];
    b=`<div class="h2">Who can message me</div><p class="muted small" style="margin-top:4px">Crew chats always work for members.</p>`+o.map(([k,l])=>`<button class="fest ${S.msgPolicy===k?'on':''}" data-policy="${k}"><span><b>${l}</b></span></button>`).join('');}
  if(sheet==='report') b=`<div class="h2">Report someone</div><p class="muted small" style="margin-top:4px">Our safety team reviews every report within 24h.</p>
      <div class="chiprow" style="margin-top:14px">${['Harassment','Inappropriate messages','Spam or scam','Feels unsafe'].map((r,i)=>`<button class="chip ${draft.reason===r?'on':''}" data-reason="${r}" style="background:var(--card)">${r}</button>`).join('')}</div>
      <button class="btn lime" style="margin-top:18px" data-act="sendreport" ${draft.reason?'':'disabled'}>Send report</button>`;
  if(sheet==='editmusic'){const A=[...new Set([...artistsFor(f),...FAVS])];
    b=`<div class="h2">Your music</div><div class="label">Genres</div><div class="chiprow">${GENRES.map(g=>`<button class="chip ${S.genres.includes(g)?'on':''}" style="background:${S.genres.includes(g)?'var(--lime)':'var(--card)'}" data-genre="${g}">${g}</button>`).join('')}</div>
      <div class="label">Artists</div><div class="chiprow">${A.map(a=>`<button class="chip ${S.artists.includes(a)?'on':''}" style="background:${S.artists.includes(a)?'var(--lime)':'var(--card)'}" data-artist="${esc(a)}">${esc(a)}</button>`).join('')}</div>
      <button class="btn lime" style="margin-top:18px" data-act="close">Done</button>`;}
  if(sheet==='post') b=`<div class="h2">Share a moment</div><p class="muted small" style="margin-top:4px">Shows in the feed for people going to ${esc(f.name)}.</p>
      <div style="height:140px;border-radius:22px;background:var(--grad);margin-top:14px;display:grid;place-items:center;color:#fff;font-weight:700">📷 Photo (demo)</div>
      <input class="field" id="cap" placeholder="Write a caption" maxlength="80"><button class="btn lime" style="margin-top:14px" data-act="sendpost">Post</button>`;
  if(sheet==='sos') b=`<div class="h2" style="margin-bottom:8px">Call for help?</div><p class="muted">We'll call 112, send your location to festival security and alert your crews.</p>
      <button class="sos" style="height:62px;font-size:20px;margin-top:18px" data-act="sosgo">Call 112</button><button class="btn ghost" style="margin-top:10px" data-act="close">Cancel</button>`;
  return `<div class="shade" data-act="shade"><div class="sheet"><div class="grab"></div>${b}</div></div>`;
}
