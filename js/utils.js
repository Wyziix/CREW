/* ================= utils ================= */
function toast(t){document.querySelectorAll('.toast').forEach(x=>x.remove());const d=document.createElement('div');d.className='toast';d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),2000)}
function scrollEnd(){const s=document.getElementById('scroll');if(s)s.scrollTop=s.scrollHeight}
const root=document.getElementById('root');
