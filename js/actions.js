/* ================= actions ================= */
function makeCrew(x){
  const f=fest(); if(S.crews.find(c=>c.id===x.id))return;
  const members=x.type==='group'?x.members:[x.name];
  S.crews.unshift({id:x.id,fest:f.id,name:x.name,members,ice:Math.floor(Math.random()*ICE.length),unread:true,playlist:[],
    meet:{opts:[SPOTS[f.id],'Main entrance'],votes:[x.type==='group'?2:0,x.type==='group'?1:0],mine:null},
    msgs:[{who:'sys',t:x.type==='group'?`You joined ${x.name}`:`You said hi to ${x.name}`},
      {who:members[0],t:x.type==='group'?`Welcome! We're voting on where to meet before ${f.name} 👇`:'Hey! Nice to find someone else going alone 🙌'}]});
  S.stats.join++;
}
function reply(c,t){
  const who=c.members[Math.floor(Math.random()*c.members.length)];
  setTimeout(()=>{c.msgs.push({who,t:t||REPLIES[Math.floor(Math.random()*REPLIES.length)]});if(!(view&&view.arg===c.id))c.unread=true;save();render();if(view&&view.arg===c.id)scrollEnd()},1100);
}
function swipe(dir){
  const q=queue(); if(!q.length)return; const x=q[0], el=document.getElementById('top');
  if(el){el.style.transform=`translateX(${dir*120}%) rotate(${dir*12}deg)`;el.style.opacity='0'}
  setTimeout(()=>{
    S.seen[x.id]=true;
    if(dir>0){
      if(x.approval){S.pending[x.id]=true;toast(`Request sent to ${x.name}`);
        setTimeout(()=>{S.pending[x.id]=false;makeCrew(x);save();render();toast(`${x.name} accepted you`)},3500)}
      else{makeCrew(x);toast(x.type==='group'?`Joined ${x.name}`:`Said hi to ${x.name}`)}
    }
    save();render();
  },220);
}
function sendToCrews(t,type){
  const cs=view&&view.name==='chat'?[S.crews.find(c=>c.id===view.arg)]:crewsHere();
  cs.forEach(c=>c.msgs.push({who:type||'sys',t}));return cs.length;
}
function answer(q){
  const f=fest(),l=q.toLowerCase(),cl=clashes(f);
  if(l.includes('toilet'))return 'Closest toilets are left of Stage 2 and by the main entrance. The ones by Stage 3 usually have shorter queues.';
  if(l.includes('clash'))return !f.lineup.length?'The lineup isn\'t out yet, so no clashes to check.':cl.length?cl.map(c=>`${c[0]} and ${c[1]} play at the same time.`).join(' ')+' Pick one, or split with your crew.':'No clashes in your plan.';
  if(l.includes('next')){const n=f.lineup.find(a=>S.plan[f.id+'|'+a[0]]);return n?`Next in your plan: ${n[0]} on ${{Thu:'Thursday',Fri:'Friday',Sat:'Saturday'}[n[1]]}.`:'Your plan is empty. Save some sets in Lineup & plan.'}
  if(l.includes('bag'))return 'Small bags and backpacks are fine. No glass, cans or big umbrellas. Check the official site for exact sizes.';
  if(l.includes('cash')||l.includes('pay'))return 'Yes, bars and food stalls take card and phone payments.';
  if(l.includes('water'))return 'Free water points are next to Stage 2 and in the middle of the site. Look for the blue dots on the map.';
  return 'Not sure about that one. The info desk by the main entrance can help.';
}

function bind(){
  const on=(sel,fn)=>root.querySelectorAll(sel).forEach(b=>b.onclick=e=>{e.stopPropagation();fn(b,e)});
  on('[data-tab]',b=>{S.tab=b.dataset.tab;view=null;sheet=null;save();render();window.scrollTo(0,0)});
  on('[data-mode]',b=>{S.mode=b.dataset.mode;save();render()});
  on('[data-mtab]',b=>{S.mtab=b.dataset.mtab;save();render()});
  on('[data-ltab]',b=>{S.ltab=b.dataset.ltab;save();render()});
  on('[data-open]',b=>{const c=S.crews.find(x=>x.id===b.dataset.open);c.unread=false;save();view={name:'chat',arg:c.id};animNext=true;render();scrollEnd()});
  on('[data-push]',b=>{view={name:b.dataset.push};animNext=true;render();if(b.dataset.push==='ask')scrollEnd()});
  on('[data-fest]',b=>{S.fest=b.dataset.fest;sheet=null;save();render()});
  on('[data-filter]',b=>{S.filters[b.dataset.filter]=!S.filters[b.dataset.filter];save();b.classList.toggle('on')});
  on('[data-draft]',b=>{const k=b.dataset.draft;draft[k]=k==='approval'?draft[k]===false:!draft[k];b.classList.toggle('on')});
  on('[data-star]',b=>{const k=b.dataset.star;S.plan[k]=!S.plan[k];save();const st=document.getElementById('scroll').scrollTop;render();document.getElementById('scroll').scrollTop=st});
  on('[data-qty]',b=>{const[n,d]=b.dataset.qty.split('|');S.cart[n]=Math.max(0,(S.cart[n]||0)+ +d);save();const st=document.getElementById('scroll').scrollTop;render();document.getElementById('scroll').scrollTop=st});
  on('[data-pickup]',b=>{S.pickup=b.dataset.pickup;save();render()});
  on('[data-sw]',b=>{if(b.disabled)return;S[b.dataset.sw]=!S[b.dataset.sw];save();b.classList.toggle('on')});
  on('[data-pvibe]',b=>{S.vibe=toggleArr(S.vibe,b.dataset.pvibe);save();b.classList.toggle('on')});
  on('[data-genre]',b=>{S.genres=toggleArr(S.genres,b.dataset.genre);save();render()});
  on('[data-artist]',b=>{S.artists=toggleArr(S.artists,b.dataset.artist);save();render()});
  on('[data-policy]',b=>{S.msgPolicy=b.dataset.policy;sheet=null;save();render()});
  on('[data-reason]',b=>{draft.reason=b.dataset.reason;render()});
  on('[data-like]',b=>{S.likes[b.dataset.like]=!S.likes[b.dataset.like];save();render()});
  on('[data-req]',b=>{const[id,v]=b.dataset.req.split('|');const r=S.requests.find(x=>x.id===id);S.requests=S.requests.filter(x=>x.id!==id);
    const c=S.crews.find(x=>x.id===r.crew);
    if(v==='ok'&&c){c.members.push(r.name);c.msgs.push({who:'sys',t:`${r.name} joined`});reply(c,`Hi! Thanks for letting me in 🙌`);toast(`${r.name} is in your crew`)}else toast('Request declined');save();render()});
  on('[data-meet]',b=>{const c=S.crews.find(x=>x.id===view.arg),i=+b.dataset.meet;if(c.meet.mine!==null)c.meet.votes[c.meet.mine]--;
    if(c.meet.mine===i)c.meet.mine=null;else{c.meet.mine=i;c.meet.votes[i]++}save();render()});
  on('[data-pvote]',b=>{const c=S.crews.find(x=>x.id===view.arg);const[mi,i]=b.dataset.pvote.split('|').map(Number);const m=c.msgs[mi];
    if(m.mine!==null&&m.mine!==undefined)m.votes[m.mine]--;m.mine=i;m.votes[i]++;save();render()});
  on('[data-ice]',b=>{const i=document.getElementById('msg');i.value=ICE[+b.dataset.ice];i.focus()});
  on('[data-askq]',b=>{askSend(b.dataset.askq)});
  on('[data-act]',(b,e)=>{
    const a=b.dataset.act, f=fest();
    if(a==='shade'){if(e.target===b){sheet=null;render()}return}
    if(a==='close'){sheet=null;render()}
    if(['festpick','filters','policy','editmusic','post','chatplus','mkpoll'].includes(a)){sheet=a;render()}
    if(a==='newcrew'){draft={};sheet='newcrew';render();setTimeout(()=>document.getElementById('crewname')?.focus(),60)}
    if(a==='report'){draft={};sheet='report';render()}
    if(a==='skip')swipe(-1);
    if(a==='join')swipe(1);
    if(a==='again'){pool(f).forEach(x=>{if(x.type===S.mode&&!S.crews.find(c=>c.id===x.id)&&!S.pending[x.id])delete S.seen[x.id]});save();render()}
    if(a==='back'){view=null;render()}
    if(a==='live'){S.live=!S.live;save();render()}
    if(a==='offline'){S.offline=!S.offline;save();render();if(S.offline)toast('Map saved. Works without signal.')}
    if(a==='verify'){vstep=0;sheet='verify';render()}
    if(a==='vnext'){vstep++;render();if(vstep===2)setTimeout(()=>{S.verified=true;sheet=null;save();render();toast('You\'re verified')},1500)}
    if(a==='spotify'){const add=artistsFor(f).filter(x=>!S.artists.includes(x)).slice(0,3);S.artists=[...S.artists,...add];
      add.forEach(x=>{const g=GENRE_OF[x];if(g&&!S.genres.includes(g))S.genres.push(g)});save();render();toast(add.length?`Imported ${add.length} artists from Spotify`:'Already up to date')}
    if(a==='invite'){if(!S.invited){S.invited=true;save();render();toast('A friend joined with your code · +200 pts')}}
    if(a==='sendpost'){const t=document.getElementById('cap').value.trim()||'Counting down 🎶';
      S.feed.unshift({id:'u'+Date.now(),crew:crewsHere()[0]?.name||f.name,who:S.name,cap:t,g:grad(f),likes:0});sheet=null;S.mtab='feed';save();render();toast('Posted')}
    if(a==='createcrew'){const nm=document.getElementById('crewname').value.trim();if(!nm){document.getElementById('crewname').focus();return}
      const id='mine-'+Date.now();
      S.crews.unshift({id,fest:f.id,name:nm,members:[],mine:true,ice:0,unread:false,playlist:[],meet:{opts:[SPOTS[f.id],'Main entrance'],votes:[0,0],mine:null},
        msgs:[{who:'sys',t:`You started ${nm}${draft.women?' · women only':''}${draft.approval!==false?' · you approve who joins':''}`}]});
      S.stats.join++;sheet=null;save();render();toast(`${nm} is live in Discover`);
      setTimeout(()=>{const nm2=draft.women?'Inês':'Lucía';if(draft.approval!==false){S.requests.push({id:'r'+Date.now(),fest:f.id,crew:id,crewName:nm,name:nm2,verified:true});save();render();toast(`${nm2} wants to join ${nm}`)}
        else{const c=S.crews.find(x=>x.id===id);c.members.push(nm2);c.msgs.push({who:'sys',t:`${nm2} joined`});c.unread=true;save();render()}},3000)}
    if(a==='sendpoll'){const q=document.getElementById('pq').value.trim(),o1=document.getElementById('po1').value.trim(),o2=document.getElementById('po2').value.trim();
      if(!q||!o1||!o2)return;const c=S.crews.find(x=>x.id===view.arg);c.msgs.push({type:'poll',who:'me',q,opts:[o1,o2],votes:[0,0],mine:null});
      S.stats.polls++;sheet=null;save();render();scrollEnd();
      setTimeout(()=>{const m=c.msgs[c.msgs.length-1];if(m.type==='poll'){m.votes[0]+=Math.min(2,c.members.length);save();render();scrollEnd()}},1500)}
    if(a==='song'){const c=S.crews.find(x=>x.id===view.arg);const pool2=[...S.artists,...artistsFor(f)].filter(x=>SONGS[x]&&!c.playlist.includes(x));
      const art=pool2[0];sheet=null;if(!art){toast('Playlist has all your songs');render();return}
      c.playlist.push(art);c.msgs.push({who:'sys',t:`You added "${SONGS[art]}" by ${art} to the playlist`});S.stats.songs++;save();render();scrollEnd()}
    if(a==='safe'){const n=sendToCrews(`${S.name} checked in: I'm here & safe`);S.safeAt=Date.now();S.stats.safe++;sheet=null;save();render();scrollEnd();toast(n?'Your crew knows you\'re safe':'Join a crew so someone gets this')}
    if(a==='lost'){const n=sendToCrews(`📍 ${S.name} is lost and shared their location. Meet at the CREW pin on the map.`,'alert');sheet=null;save();render();scrollEnd();toast(n?'Location sent to your crew':'Join a crew so someone gets this')}
    if(a==='sos'){sheet='sos';render()}
    if(a==='sosgo'){sheet=null;render();toast('Demo: this would call 112')}
    if(a==='sendreport'){sheet=null;render();toast('Report sent. We review it within 24h.')}
    if(a==='order'){const n=Object.values(S.cart).reduce((x,y)=>x+y,0);const g=S.groupOrder;S.cart={};save();view=null;render();
      toast(g?'Group order sent to your crew':`${n} item${n===1?'':'s'} ordered · ready in ~10 min`)}
    if(a==='reset'){S=fresh();obStep=0;sheet=null;view=null;save();render()}
  });
  const form=document.getElementById('compose');
  if(form)form.onsubmit=e=>{e.preventDefault();const i=document.getElementById('msg');const t=i.value.trim();if(!t)return;
    const c=S.crews.find(x=>x.id===view.arg);c.msgs.push({who:'me',t});S.stats.msgs++;save();render();scrollEnd();document.getElementById('msg').focus();if(c.members.length)reply(c)};
  const af=document.getElementById('askform');
  if(af)af.onsubmit=e=>{e.preventDefault();const t=document.getElementById('askin').value.trim();if(t)askSend(t)};
  const top=document.getElementById('top');
  if(top){let x0=null,dx=0;
    top.onpointerdown=e=>{x0=e.clientX;top.style.transition='none';top.setPointerCapture(e.pointerId)};
    top.onpointermove=e=>{if(x0===null)return;dx=e.clientX-x0;top.style.transform=`translateX(${dx}px) rotate(${dx/18}deg)`};
    top.onpointerup=()=>{top.style.transition='';if(Math.abs(dx)>90)swipe(dx>0?1:-1);else top.style.transform='';x0=null;dx=0};
  }
}
function askSend(q){S.ask.push({me:true,t:q});save();render();scrollEnd();setTimeout(()=>{S.ask.push({t:answer(q)});save();render();scrollEnd()},600)}
