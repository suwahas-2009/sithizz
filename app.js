let accounts = JSON.parse(localStorage.getItem('sithizz_accs')) || [
  {title:"Level 73 - Full Collection Account", level:73, price:52000, img:"banner.jpg", desc:"52+ Elite Pass, Rare Bundles, Evo Guns Max", status:"Available", views:172},
  {title:"Level 68 - Evo Guns Account", level:68, price:35000, img:"banner.jpeg", desc:"Evo Guns Max, Rare Emotes, Full Dress Collection", status:"Available", views:98}
];
function save(){ localStorage.setItem('sithizz_accs', JSON.stringify(accounts)); }
function render(){
  let grid = document.getElementById('grid'); if(!grid) return;
  let q = (document.getElementById('searchInput').value||"").toLowerCase();
  let st = document.getElementById('statusFilter').value;
  let pf = document.getElementById('priceFilter').value;
  let lf = document.getElementById('levelFilter').value;
  let list = accounts.filter(a => (a.title.toLowerCase().includes(q) || String(a.level).includes(q)));
  if(st!=='all') list = list.filter(a=>a.status===st);
  if(lf==='50-60') list=list.filter(a=>a.level>=50&&a.level<60);
  if(lf==='60-70') list=list.filter(a=>a.level>=60&&a.level<70);
  if(lf==='70-80') list=list.filter(a=>a.level>=70&&a.level<80);
  if(lf==='80p') list=list.filter(a=>a.level>=80);
  if(pf==='low') list.sort((a,b)=>a.price-b.price);
  if(pf==='high') list.sort((a,b)=>b.price-a.price);
  if(pf==='u10') list=list.filter(a=>a.price<10000);
  if(pf==='10-30') list=list.filter(a=>a.price>=10000&&a.price<=30000);
  if(pf==='30-50') list=list.filter(a=>a.price>30000&&a.price<=50000);
  if(pf==='50p') list=list.filter(a=>a.price>50000);
  grid.innerHTML = list.map((a,i)=>`
    <div class="card">
      ${a.status==='Sold'?'<div style="background:#ff1744;text-align:center;padding:6px;font-weight:800">SOLD OUT</div>':''}
      <img src="${a.img}">
      <div class="card-body">
        <span class="badge ${a.status==='Available'?'avail':'sold'}">${a.status}</span>
        <h3 style="margin-top:8px">${a.title}</h3>
        <p style="color:#aaa;font-size:13px;margin-top:4px">Level ${a.level} • ${a.desc}</p>
        <div class="price">Rs. ${a.price.toLocaleString()}</div>
        <small style="color:#888">${a.views} Views</small>
        ${a.status==='Available'?`<a href="https://wa.me/94711850298?text=${encodeURIComponent('Hi SITHIZZ, I want to buy '+a.title+' - Rs. '+a.price)}" target="_blank">Buy Now - WhatsApp</a>`:`<a style="background:#555;color:#fff">Sold Out</a>`}
      </div>
    </div>`).join('') || '<p style="text-align:center;padding:20px">No Accounts Found</p>';
}
function addAccount(){
  let t=document.getElementById('aTitle').value, l=+document.getElementById('aLevel').value, p=+document.getElementById('aPrice').value, img=document.getElementById('aImg').value||'banner.jpg', d=document.getElementById('aDesc').value;
  if(!t||!l||!p) return alert('Title, Level, Price fill karanna');
  accounts.unshift({title:t, level:l, price:p, img:img, desc:d, status:"Available", views:0});
  save(); alert('Account Added!'); location.reload();
}
function renderAdmin(){
  let el=document.getElementById('adminList'); if(!el) return;
  el.innerHTML = accounts.map((a,i)=>`<div class="admin-card"><div><b>${a.title}</b><br>Rs. ${a.price} - ${a.status}</div><div><button onclick="toggleSold(${i})">${a.status==='Available'?'Mark as Sold':'Mark as Available'}</button> <button onclick="delAcc(${i})" style="background:#ff1744;color:#fff">Delete</button></div></div>`).join('');
}
function toggleSold(i){ accounts[i].status = accounts[i].status==='Available'?'Sold':'Available'; save(); renderAdmin(); }
function delAcc(i){ if(confirm('Delete karanna da?')){ accounts.splice(i,1); save(); renderAdmin(); } }
if(document.getElementById('grid')) render();