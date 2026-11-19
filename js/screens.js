/* ---------- pushed screens ---------- */
function screen(){
  const {name,arg}=view, f=fest();
  let title='',sub='',body='',foot='';
  if(name==='chat'){
    const c=S.crews.find(x=>x.id===arg);
    title=esc(c.name); sub=`${c.members.length+1} members · ${c.playlist.length} song${c.playlist.length===1?'':'s'} in playlist`;
    const tot=c.meet.votes.reduce((a,b)=>a+b,0)||1;
    body=`<div class="meet"><div class="k">Meet-up · before the gates, 17:00</div><div style="font-weight:700;margin-top:6px">Where do we meet?</div>
      ${c.meet.opts.map((o,i)=>`<button class="opt ${c.meet.mine===i?'on':''}" data-meet="${i}"><span class="fill" style="width:${c.meet.votes[i]/tot*100}%"></span><span class="grow">${esc(o)}</span><span class="xs">${c.meet.votes[i]}</span></button>`).join('')}
      <div class="xs" style="opacity:.7;margin-top:10px">CREW Spots are public partner bars and cafés.</div></div>
      ${c.msgs.filter(m=>m.who==='me').length<1?`<button class="ice" data-ice="${c.ice}"><span style="font-size:18px">💬</span><span><b>Icebreaker</b><br>${esc(ICE[c.ice])}</span></button>`:''}
      ${c.msgs.map((m,mi)=>{
        if(m.type==='poll'){const t=m.votes.reduce((a,b)=>a+b,0)||1;return `<div class="pollmsg"><div class="muted xs">${esc(m.who==='me'?'You':m.who)} · poll</div><b>${esc(m.q)}</b>
          ${m.opts.map((o,i)=>`<button class="opt ${m.mine===i?'on':''}" data-pvote="${mi}|${i}"><span class="fill" style="width:${m.votes[i]/t*100}%"></span><span class="grow">${esc(o)}</span><span class="xs">${m.votes[i]}</span></button>`).join('')}</div>`}
        if(m.who==='sys')return `<div class="msg sys"><div class="b">${esc(m.t)}</div></div>`;
        if(m.who==='alert')return `<div class="msg sys alert"><div class="b">${esc(m.t)}</div></div>`;
        return `<div class="msg ${m.who==='me'?'me':''}">${m.who!=='me'?`<div class="who">${esc(m.who)}</div>`:''}<div class="b">${esc(m.t)}</div></div>`}).join('')}`;
    foot=`<form class="compose" id="compose"><button type="button" class="plus" data-act="chatplus" aria-label="More">${I.plus}</button><input id="msg" placeholder="Message" autocomplete="off"><button class="send" aria-label="Send">${I.send}</button></form>`;
  }
  if(name==='lineup'){
    title='Lineup & plan';
    if(!f.lineup.length) body=`<div class="empty"><div class="h2">Not out yet</div><p class="muted">${esc(f.name)} hasn't announced the lineup. You'll get a notification when it drops.</p></div>`;
    else{
      const cl=clashes(f);
      body=`<div class="seg" style="margin-bottom:6px"><button class="${(S.ltab||'all')==='all'?'on':''}" data-ltab="all">Full lineup</button><button class="${S.ltab==='mine'?'on':''}" data-ltab="mine">My plan (${planCount()})</button></div>
        ${cl.map(c=>`<div class="clash">⚠ <b>${esc(c[0])}</b> and <b>${esc(c[1])}</b> play at the same time</div>`).join('')}`;
      const byDay={};f.lineup.forEach(([a,d])=>{(byDay[d]=byDay[d]||[]).push(a)});
      body+=Object.entries(byDay).map(([d,arr])=>{const rows=arr.map((a,j)=>{const k=f.id+'|'+a;if(S.ltab==='mine'&&!S.plan[k])return '';const mine=S.artists.includes(a);
        return `<div class="set"><span class="time">${TIMES[j%4]}</span><span class="grow"><b>${esc(a)}</b><br><span class="muted small">${STAGES[j%4]}${mine?' · in your artists':''}</span></span>
        <button class="star ${S.plan[k]?'on':''}" data-star="${esc(k)}" aria-label="Save">${I.star}</button></div>`}).join('');
        return rows?`<div class="day">${{Thu:'Thursday',Fri:'Friday',Sat:'Saturday'}[d]}</div>${rows}`:''}).join('')||`<p class="muted" style="margin-top:20px">Nothing saved yet. Tap the star on a set to add it.</p>`;
      body+=`<p class="muted xs" style="margin-top:14px">Set times and stages are placeholders until the festival publishes them.</p>`;
    }
  }
  if(name==='map'){
    title='Map';
    const c=l=>!S.live?'#13111F':l==='hi'?'#E5484D':l==='mid'?'#F2A20C':'#22A55B';
    body=`<div class="map"><svg viewBox="0 0 340 300" width="100%" style="display:block">
      <rect width="340" height="300" fill="#E4F0D0"/><path d="M0 250 Q170 220 340 260 L340 300 L0 300Z" fill="#BFE0F2"/>
      <path d="M40 40 L300 40 L300 210 L40 210Z" fill="none" stroke="#B9C9A0" stroke-width="2" stroke-dasharray="6 6"/>
      <path d="M60 180 C120 120 200 140 280 70" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/>
      <g font-family="DM Sans, system-ui, sans-serif" font-size="11" font-weight="700" text-anchor="middle">
        <rect x="58" y="52" width="86" height="40" rx="10" fill="${c('hi')}"/><text x="101" y="76" fill="#fff">Main stage</text>
        <rect x="206" y="52" width="76" height="36" rx="10" fill="${c('mid')}"/><text x="244" y="74" fill="#fff">Stage 2</text>
        <rect x="200" y="150" width="76" height="36" rx="10" fill="${c('lo')}"/><text x="238" y="172" fill="#fff">Stage 3</text>
        <circle cx="150" cy="140" r="9" fill="#3B82F6"/><circle cx="270" cy="120" r="9" fill="#3B82F6"/>
        <circle cx="120" cy="190" r="10" fill="#E5484D"/><text x="120" y="194" fill="#fff" font-size="12">+</text>
        <circle cx="70" cy="140" r="9" fill="#9A7B4F"/>
        <path d="M95 130 l8 -14 h-16z" fill="#7B4DFF" transform="translate(0,0)"/><text x="95" y="112" fill="#7B4DFF">Meet</text>
        <circle cx="180" cy="110" r="8" fill="#7B4DFF" stroke="#fff" stroke-width="3"/><circle cx="168" cy="122" r="8" fill="#FF6A3D" stroke="#fff" stroke-width="3"/>
        <rect x="40" y="215" width="70" height="22" rx="11" fill="#fff"/><text x="75" y="230" fill="#13111F">Entrance</text>
      </g></svg></div>
      <div class="legend"><span><i style="background:#3B82F6"></i>Water</span><span><i style="background:#E5484D"></i>First aid</span><span><i style="background:#9A7B4F"></i>Toilets</span><span><i style="background:#7B4DFF"></i>Your crew</span></div>
      ${S.live?`<div class="card" style="margin-top:14px"><b>Crowd right now</b><div class="legend" style="margin-top:8px"><span><i style="background:#E5484D"></i>Main stage · packed</span><span><i style="background:#F2A20C"></i>Stage 2 · busy</span><span><i style="background:#22A55B"></i>Stage 3 · quiet</span></div></div>`:''}
      <button class="btn ${S.offline?'soft':'dark'}" style="margin-top:14px" data-act="offline">${S.offline?'✓ Saved for offline':'Save map for offline'}</button>
      <p class="muted small" style="margin-top:8px;text-align:center">Signal drops at festivals. A saved map still works.</p>`;
  }
  if(name==='food'){
    title='Food & drinks';
    const total=FOOD.flatMap(s=>s.items).reduce((a,[n,p])=>a+(S.cart[n]||0)*p,0)+(S.pickup==='spot'?3:0);
    const hasCrew=crewsHere().length>0;
    body=`<div class="seg"><button class="${S.pickup==='express'?'on':''}" data-pickup="express">Express pickup</button><button class="${S.pickup==='spot'?'on':''}" data-pickup="spot">To my spot +€3</button></div>
      <p class="muted small" style="margin-top:8px">${S.pickup==='express'?'No-queue counter by the main entrance.':'Brought to you in the crowd. Uses your live location.'}</p>
      <div class="card" style="margin-top:12px;padding:2px 16px"><div class="toggle"><span class="grow"><b>Group order with my crew</b><div class="muted small">${hasCrew?'Your crew can add items, one pickup':'Join a crew to order together'}</div></span><button class="sw ${S.groupOrder?'on':''}" data-sw="groupOrder" ${hasCrew?'':'disabled style="opacity:.4"'}></button></div></div>`+
      FOOD.map(s=>`<div class="day">${s.s}</div>`+s.items.map(([n,p])=>{const q=S.cart[n]||0;
      return `<div class="item"><span class="grow"><b>${n}</b><br><span class="muted small">€${String(p).replace('.',',')}</span></span>
      <span class="qty">${q?`<button data-qty="${n}|-1">−</button><b>${q}</b>`:''}<button data-qty="${n}|1">+</button></span></div>`}).join('')).join('');
    foot=total>(S.pickup==='spot'?3:0)?`<div class="footbar"><button class="btn lime" data-act="order">${S.groupOrder?'Send group order':'Order'} · €${total.toFixed(2)}</button></div>`:'';
  }
  if(name==='ask'){
    title='Ask CREW'; sub=`About ${f.name}`;
    const qs=['Where are the toilets?','Any clashes in my plan?','What\'s next for me?','Can I bring a bag?','Is it cashless?'];
    body=(S.ask.length?'':`<div class="msg"><div class="who">CREW</div><div class="b">Hi ${esc(S.name)}, ask me anything about ${esc(f.name)}.</div></div>`)+
      S.ask.map(m=>`<div class="msg ${m.me?'me':''}">${m.me?'':'<div class="who">CREW</div>'}<div class="b">${esc(m.t)}</div></div>`).join('');
    foot=`<div class="qchips">${qs.map(q=>`<button data-askq="${esc(q)}">${esc(q)}</button>`).join('')}</div>
      <form class="compose" id="askform"><input id="askin" placeholder="Ask about the festival…" autocomplete="off"><button class="send" aria-label="Send">${I.send}</button></form>`;
  }
  if(name==='safety'){
    title='Safety';
    const mins=S.safeAt?Math.round((Date.now()-S.safeAt)/60000):null;
    body=`<button class="sos" data-act="sos">SOS<small>Calls 112, alerts security and your crew</small></button>
      <div class="grid2" style="margin-top:12px">
        <button class="btn lime" style="height:62px" data-act="safe">I'm safe</button>
        <button class="btn dark" style="height:62px" data-act="lost">I'm lost</button></div>
      <p class="muted small" style="margin-top:8px;text-align:center">${mins!==null?`Last check-in ${mins<1?'just now':mins+' min ago'}`:'Both go straight to your crews'}</p>
      <div class="card" style="margin-top:14px;padding:2px 16px">
        <div class="toggle"><span class="grow"><b>Share live location</b><div class="muted small">Only my crews, only during the festival</div></span><button class="sw ${S.shareLoc?'on':''}" data-sw="shareLoc"></button></div>
        <div class="toggle"><span class="grow"><b>First aid</b><div class="muted small">Next to the main entrance, open all night</div></span></div>
        <div class="toggle"><span class="grow"><b>Festival security</b><div class="muted small">Any staff in a yellow vest, or the info desk</div></span></div>
        <button class="lrow" data-act="report"><span class="grow"><b>Report someone</b></span><span class="muted">›</span></button>
      </div>`;
  }
  if(name==='info'){
    title='Info';
    body=`<div class="card" style="padding:2px 16px">
      <div class="toggle"><span class="grow"><b>Getting there</b><div class="muted small">${f.id==='madcool'?'Metro L3 to Villaverde Alto, then shuttle':f.id==='sonar'?'By Night: metro L1/L8 to Europa | Fira':'Metro L4 to El Maresme | Fòrum, or tram T4'}</div></span></div>
      <div class="toggle"><span class="grow"><b>Payments</b><div class="muted small">Card or phone at bars and food stalls</div></span></div>
      <div class="toggle"><span class="grow"><b>Bags</b><div class="muted small">Small bags OK. No glass, no cans, no big umbrellas.</div></span></div>
      <div class="toggle"><span class="grow"><b>Lost property</b><div class="muted small">Info desk by the main entrance</div></span></div></div>
      <p class="muted xs" style="margin-top:12px">Check the official ${esc(f.name)} site for final rules.</p>`;
  }
  const a=animNext;animNext=false;
  return `<div class="screen${a?' anim':''}"><div class="wrap"><div class="bar"><button class="back" data-act="back">${I.back}</button>
    <div style="flex:1;min-width:0"><div class="h2" style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${title}</div>${sub?`<div class="muted xs">${esc(sub)}</div>`:''}</div></div>
    <div class="scroll" id="scroll">${body}</div>${foot}</div></div>`;
}
