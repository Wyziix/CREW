/* ================= render ================= */
function render(){
  if(!S.onboarded){root.innerHTML=onboarding();bindOb();return}
  const body={discover,crews:crewsTab,hub,missions,profile}[S.tab]();
  root.innerHTML=`<div class="app">${body}</div>${nav()}${view?screen():''}${sheet?sheetHtml():''}`;
  bind();
}
function festPill(){return `<button class="pill" data-act="festpick">${esc(fest().name)} <span style="opacity:.7">▾</span></button>`}
function nav(){
  const b=(id,label,ico,dot)=>`<button class="${S.tab===id?'on':''}" data-tab="${id}">${dot?'<span class="dot"></span>':''}<span class="ic">${ico}</span>${label}</button>`;
  return `<nav class="nav"><div class="in">${b('discover','Discover',I.disc)}${b('crews','My Crews',I.crew,unread())}${b('hub','Hub',I.hub)}${b('missions','Missions',I.trophy)}${b('profile','Profile',I.user)}</div></nav>`;
}
