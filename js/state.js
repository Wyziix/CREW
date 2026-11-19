/* ================= state ================= */
const KEY='crew-v3';
const fresh=()=>({onboarded:false,name:'',age:'18-21',city:'Barcelona',fest:'primavera',genres:[],artists:[],vibe:[],solo:true,
  verified:false,msgPolicy:'verified',shareLoc:false,offline:false,live:false,
  tab:'discover',mode:'group',filters:{verified:false,solo:false,women:false},seen:{},pending:{},crews:[],requests:[],
  plan:{},cart:{},pickup:'express',groupOrder:false,safeAt:0,stats:{join:0,msgs:0,polls:0,songs:0,safe:0},
  invited:false,feed:SEEDFEED,likes:{},ask:[]});
let S=fresh();
try{const v=JSON.parse(localStorage.getItem(KEY)||'null');if(v)S={...S,...v,stats:{...S.stats,...(v.stats||{})},filters:{...S.filters,...(v.filters||{})}}}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
let view=null, animNext=false, sheet=null, obStep=0, vstep=0, draft={};

const fest=()=>FESTS.find(f=>f.id===S.fest);
const initials=n=>(n||'?').trim().split(/\s+/).map(w=>w[0]).join('').slice(0,2).toUpperCase();
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const grad=f=>`linear-gradient(150deg,${f.colors[0]},${f.colors[1]})`;
const daysTo=f=>f.start?Math.ceil((new Date(f.start+'T12:00:00')-new Date())/864e5):null;
const planCount=()=>Object.keys(S.plan).filter(k=>S.plan[k]&&k.startsWith(S.fest+'|')).length;
const statOf=id=>id==='plan'?planCount():S.stats[id]||0;
const points=()=>120+MISSIONS.reduce((a,m)=>a+(statOf(m.id)>=m.goal?m.pts:0),0)+(S.invited?200:0);
const crewsHere=()=>S.crews.filter(c=>c.fest===S.fest);
const reqsHere=()=>S.requests.filter(r=>r.fest===S.fest);
const unread=()=>crewsHere().some(c=>c.unread)||reqsHere().length>0;

function match(x){
  const sa=x.artists.filter(a=>S.artists.includes(a));
  const sg=[...new Set(x.artists.map(a=>GENRE_OF[a]))].filter(g=>S.genres.includes(g));
  let m=58+sa.length*12+sg.length*6+(S.solo&&x.solo?4:0)+(x.verified?3:0);
  return {pct:Math.min(97,m),shared:sa};
}
