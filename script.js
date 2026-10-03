const DELIVERY_CHARGE = 110;
const CUSTOMER_CARE = "01750475598";
const GEO_URL = "https://iqbalhasandev.github.io/bangladesh-geo-json/bangladesh-geo.json";

let products = [];
let cart = [];
let activeFilter = "All";

const categoryMap = {
  "Electronics & Gadgets":["electronics","electronics & gadgets","gadget"],
  "Mobile & Accessories":["mobile","mobile & accessories","phone","smartphone"],
  "Fashion & Clothing":["fashion","fashion & clothing","men's fashion","women's fashion"],
  "Shoes & Bags":["shoes","shoes & bags","bag"],
  "Beauty & Personal Care":["beauty","beauty & care","beauty & personal care","personal care"],
  "Baby & Kids":["baby","baby & kids","kids"],
  "Home & Living":["home","home & living","kitchen & home"],
  "Grocery & Food":["grocery","grocery & food","food","ghee","honey","gur"],
  "Fresh Mango":["mango","fresh mango"],
  "Sports & Fitness":["sports","sports & fitness"],
  "Watches & Jewellery":["watches","watches & jewellery","jewellery","jewelry"]
};

const fallbackProducts = [
  {id:"demo-1",name:"Beauty Shopping এ নতুন product",category:"Beauty & Care",price:0,discountPrice:0,stock:0,image:""},
];

function money(n){return "৳ " + Number(n||0).toLocaleString("en-US");}

function productPrice(p){
  const d = Number(p.discountPrice||0);
  const x = Number(p.price||0);
  return d>0 ? d : x;
}

function matchesCategory(p, filter){
  if(filter==="All") return true;
  const pc = String(p.category||"").toLowerCase();
  const aliases = categoryMap[filter] || [filter.toLowerCase()];
  return aliases.some(x => pc.includes(x));
}

function getImage(p){
  if(!p.image) return "";
  if(/^https?:\/\//i.test(p.image)) return p.image;
  if(/^data:image\//i.test(p.image)) return p.image;
  return p.image.startsWith("/") ? p.image : "/" + p.image;
}

async function loadProducts(){
  const grid = document.getElementById("productsGrid");
  try{
    const res = await fetch("/api/products",{cache:"no-store"});
    if(!res.ok) throw new Error("products api failed");
    const data = await res.json();
    products = Array.isArray(data) ? data : (data.products || []);
  }catch(err){
    products = fallbackProducts;
  }
  renderProducts();
}

function renderProducts(){
  const grid = document.getElementById("productsGrid");
  const q = document.getElementById("searchInput").value.trim().toLowerCase();
  let list = products.filter(p=>{
    const text = `${p.name||""} ${p.category||""}`.toLowerCase();
    return matchesCategory(p,activeFilter) && (!q || text.includes(q));
  });

  const sort = document.getElementById("sortSelect").value;
  if(sort==="low") list.sort((a,b)=>productPrice(a)-productPrice(b));
  if(sort==="high") list.sort((a,b)=>productPrice(b)-productPrice(a));
  if(sort==="name") list.sort((a,b)=>String(a.name).localeCompare(String(b.name)));

  document.getElementById("sectionTitle").textContent =
    activeFilter==="All" ? "Featured Products" : activeFilter;

  if(!list.length){
    grid.innerHTML = `<div class="no-products">এই category-তে এখনো কোনো product নেই।<br><small>Admin Panel থেকে product add করুন।</small></div>`;
    return;
  }

  grid.innerHTML = list.map(p=>{
    const price = productPrice(p);
    const image = getImage(p);
    return `<article class="product-card">
      <div class="product-image">${image ? `<img src="${image}" alt="${escapeHtml(p.name||"Product")}" loading="lazy">` : `<span style="font-size:45px">🛍️</span>`}</div>
      <div class="product-name">${escapeHtml(p.name||"Unnamed Product")}</div>
      <div class="product-meta">${escapeHtml(p.desc||p.category||"")}</div>
      <div class="product-price">${money(price)}</div>
      <div class="product-controls">
        <div class="qty"><button onclick="changeCardQty('${p.id}',-1)">−</button><span id="qty-${p.id}">1</span><button onclick="changeCardQty('${p.id}',1)">+</button></div>
        <button class="add" onclick="addToCart('${p.id}')">Add to Cart</button>
      </div>
    </article>`;
  }).join("");
}

const cardQty = {};
function changeCardQty(id,delta){
  cardQty[id] = Math.max(1,(cardQty[id]||1)+delta);
  const el=document.getElementById(`qty-${id}`);
  if(el) el.textContent=cardQty[id];
}
function addToCart(id){
  const p = products.find(x=>String(x.id)===String(id));
  if(!p) return;
  const qty = cardQty[id] || 1;
  const found = cart.find(x=>String(x.id)===String(id));
  if(found) found.qty += qty;
  else cart.push({...p,qty});
  cardQty[id]=1;
  renderCart();
  document.getElementById("cartBtn").scrollIntoView({behavior:"smooth",block:"nearest"});
}
function removeCart(id){
  cart=cart.filter(x=>String(x.id)!==String(id));
  renderCart();
}
function cartQty(id,delta){
  const x=cart.find(p=>String(p.id)===String(id));
  if(!x)return;
  x.qty=Math.max(1,x.qty+delta);
  renderCart();
}
function renderCart(){
  const box=document.getElementById("cartItems");
  const count=cart.reduce((s,p)=>s+p.qty,0);
  document.getElementById("cartCount").textContent=count;
  if(!cart.length){
    box.innerHTML=`<div class="empty-cart">এখনো কোনো product যোগ করা হয়নি।</div>`;
  }else{
    box.innerHTML=cart.map(p=>{
      const image=getImage(p);
      return `<div class="cart-line">
        ${image?`<img src="${image}" alt="">`:`<div>🛍️</div>`}
        <div><strong>${escapeHtml(p.name)}</strong><small>× ${p.qty} &nbsp; ${money(productPrice(p)*p.qty)}</small>
          <div style="margin-top:3px"><button onclick="cartQty('${p.id}',-1)" style="border:1px solid #ddd;background:#fff">−</button>
          <button onclick="cartQty('${p.id}',1)" style="border:1px solid #ddd;background:#fff">+</button></div>
        </div>
        <button class="remove" onclick="removeCart('${p.id}')">🗑</button>
      </div>`;
    }).join("");
  }
  const subtotal=cart.reduce((s,p)=>s+productPrice(p)*p.qty,0);
  document.getElementById("subtotal").textContent=money(subtotal);
  document.getElementById("grandTotal").textContent=money(cart.length ? subtotal+DELIVERY_CHARGE : 0);
}

function escapeHtml(v){
  return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));
}

function setFilter(filter){
  activeFilter=filter;
  document.querySelectorAll(".cat").forEach(b=>b.classList.toggle("active",b.dataset.filter===filter));
  renderProducts();
  document.getElementById("productsSection").scrollIntoView({behavior:"smooth",block:"start"});
}

async function loadLocations(){
  const district=document.getElementById("district");
  try{
    const res=await fetch(GEO_URL,{cache:"force-cache"});
    if(!res.ok) throw new Error("location api failed");
    const tree=await res.json();
    window.bdLocationTree=tree;
    tree.forEach(div=>{
      (div.districts||[]).forEach(d=>{
        const o=document.createElement("option");
        o.value=d.name;
        o.textContent=`${d.bn_name} (${d.name})`;
        o.dataset.districtIndex=`${tree.indexOf(div)}:${div.districts.indexOf(d)}`;
        district.appendChild(o);
      });
    });
  }catch(e){
    const common=["ঢাকা","রংপুর","কুড়িগ্রাম","দিনাজপুর","গাইবান্ধা","লালমনিরহাট","নীলফামারী","পঞ্চগড়","ঠাকুরগাঁও","চট্টগ্রাম","সিলেট","রাজশাহী","খুলনা","বরিশাল","ময়মনসিংহ"];
    common.forEach(x=>{const o=document.createElement("option");o.value=x;o.textContent=x;district.appendChild(o);});
  }
}

document.getElementById("district").addEventListener("change",function(){
  const up=document.getElementById("upazila");
  up.innerHTML=`<option value="">উপজেলা নির্বাচন করুন</option>`;
  up.disabled=true;
  if(window.bdLocationTree){
    let found=null;
    for(const div of window.bdLocationTree){
      found=(div.districts||[]).find(d=>d.name===this.value);
      if(found) break;
    }
    if(found){
      (found.upazilas||[]).forEach(u=>{
        const o=document.createElement("option");
        o.value=u.name;
        o.textContent=`${u.bn_name} (${u.name})`;
        up.appendChild(o);
      });
      up.disabled=false;
    }
  }else{
    up.disabled=false;
    up.innerHTML=`<option value="">উপজেলা / থানা লিখুন</option>`;
  }
});

document.querySelectorAll(".cat").forEach(b=>b.addEventListener("click",()=>setFilter(b.dataset.filter)));
document.querySelectorAll(".nav button").forEach(b=>b.addEventListener("click",()=>setFilter(b.dataset.filter)));
document.getElementById("sortSelect").addEventListener("change",renderProducts);
document.getElementById("searchBtn").addEventListener("click",renderProducts);
document.getElementById("searchInput").addEventListener("input",renderProducts);
document.getElementById("shopNow").addEventListener("click",()=>document.getElementById("productsSection").scrollIntoView({behavior:"smooth"}));
document.querySelectorAll("[data-scroll]").forEach(b=>b.addEventListener("click",()=>document.getElementById(b.dataset.scroll)?.scrollIntoView({behavior:"smooth"})));
document.getElementById("cartBtn").addEventListener("click",()=>document.querySelector(".right-panel").scrollIntoView({behavior:"smooth"}));
document.getElementById("wishlistBtn").addEventListener("click",()=>alert("Wishlist feature পরে চালু করা যাবে।"));
const moreBtn = document.getElementById("moreBtn");
const moreMenu = document.getElementById("moreMenu");
moreBtn.addEventListener("click",(e)=>{
  e.stopPropagation();
  moreMenu.classList.toggle("show");
});
document.addEventListener("click",()=>moreMenu.classList.remove("show"));
document.querySelectorAll("[data-more]").forEach(item=>{
  item.addEventListener("click",()=>{
    const action=item.dataset.more;
    moreMenu.classList.remove("show");
    if(action==="all"){setFilter("All");return;}
    if(action==="wishlist"){document.getElementById("wishlistBtn").click();return;}
    if(action==="contact"){
      document.getElementById("orderForm").scrollIntoView({behavior:"smooth"});
      document.getElementById("customerName").focus();
      return;
    }
    if(action==="delivery" || action==="payment"){
      alert(action==="delivery" ? "সারা বাংলাদেশে Delivery Charge: ৳110" : "Payment: Cash on Delivery (COD)");
      return;
    }
    if(action==="new" || action==="featured" || action==="deals"){
      document.getElementById("productsSection").scrollIntoView({behavior:"smooth"});
      document.getElementById("sectionTitle").textContent =
        action==="new" ? "New Arrivals" :
        action==="deals" ? "Hot Deals" : "Featured Products";
    }
  });
});

document.getElementById("orderForm").addEventListener("submit",async e=>{
  e.preventDefault();
  const msg=document.getElementById("orderMessage");
  if(!cart.length){msg.className="order-message err";msg.textContent="আগে অন্তত ১টি product Cart-এ যোগ করুন।";return;}
  const phone=document.getElementById("phone").value.trim().replace(/\s+/g,"");
  if(!/^(?:01|\+8801)[3-9]\d{8}$/.test(phone)){msg.className="order-message err";msg.textContent="সঠিক বাংলাদেশি মোবাইল নম্বর দিন।";return;}
  const subtotal=cart.reduce((s,p)=>s+productPrice(p)*p.qty,0);
  const order={
    name:document.getElementById("customerName").value.trim(),
    phone,
    district:document.getElementById("district").value,
    upazila:document.getElementById("upazila").value,
    address:document.getElementById("address").value.trim(),
    delivery:DELIVERY_CHARGE,
    total:subtotal+DELIVERY_CHARGE,
    items:cart.map(p=>({id:p.id,name:p.name,category:p.category,qty:p.qty,price:productPrice(p)})),
    source:"Beauty Shopping website"
  };
  const btn=e.submitter; btn.disabled=true; btn.textContent="⏳ Order পাঠানো হচ্ছে...";
  try{
    let sent=false;
    for(const endpoint of ["/api/orders","/api/order"]){
      try{
        const r=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(order)});
        if(r.ok){sent=true;break;}
      }catch(_){}
    }
    if(!sent) throw new Error("order api failed");
    msg.className="order-message ok";
    msg.textContent="✅ আপনার Order সফলভাবে গ্রহণ করা হয়েছে।";
    cart=[]; renderCart(); e.target.reset();
    document.getElementById("upazila").disabled=true;
  }catch(err){
    msg.className="order-message err";
    msg.textContent="Order পাঠাতে সমস্যা হয়েছে। Backend order route চালু আছে কিনা দেখুন।";
  }finally{
    btn.disabled=false;btn.textContent="🛒 অর্ডার কনফার্ম করুন";
  }
});

loadLocations();
loadProducts();
renderCart();
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const phone = prompt("আপনার মোবাইল নম্বর দিন:");

    if (!phone) return;

    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length < 10) {
      alert("সঠিক মোবাইল নম্বর দিন।");
      return;
    }

    localStorage.setItem("beautyShoppingUser", cleanPhone);

    alert("✅ Login সফল হয়েছে!\nমোবাইল: " + cleanPhone);

    loginBtn.querySelector("small").textContent = "My Account";
  });
}
