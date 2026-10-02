let products = [
{id:1,name:"Premium Earbuds",category:"Electronics",icon:"🎧",desc:"Wireless audio essential",price:0,discountPrice:0,image:"",stock:100,featured:true},
{id:2,name:"Wireless Neckband",category:"Electronics",icon:"🎵",desc:"Everyday music & calls",price:0,discountPrice:0,image:"",stock:100,featured:true},
{id:3,name:"Fast Charger",category:"Electronics",icon:"🔌",desc:"Fast charging accessory",price:0,discountPrice:0,image:"",stock:100,featured:true},
{id:4,name:"Mobile Accessories",category:"Mobile & Accessories",icon:"📱",desc:"Cases, cables & accessories",price:0,discountPrice:0,image:"",stock:100,featured:false},
{id:5,name:"Baby Dress",category:"Baby & Kids",icon:"👶",desc:"Cute everyday baby wear",price:0,discountPrice:0,image:"",stock:100,featured:true},
{id:6,name:"Ladies Three-Piece",category:"Fashion",icon:"👗",desc:"Elegant everyday collection",price:0,discountPrice:0,image:"",stock:100,featured:true},
{id:7,name:"Premium T-Shirt",category:"Fashion",icon:"👕",desc:"Comfortable casual wear",price:0,discountPrice:0,image:"",stock:100,featured:false},
{id:8,name:"Shoes & Bags",category:"Shoes & Bags",icon:"👟",desc:"Everyday style essentials",price:0,discountPrice:0,image:"",stock:100,featured:false},
{id:9,name:"Beauty & Personal Care",category:"Beauty & Care",icon:"💄",desc:"Beauty and self-care picks",price:0,discountPrice:0,image:"",stock:100,featured:false},
{id:10,name:"Home & Kitchen Essentials",category:"Home & Living",icon:"🏠",desc:"Useful products for home",price:0,discountPrice:0,image:"",stock:100,featured:false},
{id:11,name:"Pure Ghee",category:"Grocery & Food",icon:"🧈",desc:"Natural food collection",price:0,discountPrice:0,image:"",stock:100,featured:true},
{id:12,name:"Natural Honey",category:"Grocery & Food",icon:"🍯",desc:"Pure honey collection",price:0,discountPrice:0,image:"",stock:100,featured:true},
{id:13,name:"Khejur Gur",category:"Grocery & Food",icon:"🌴",desc:"Seasonal date palm jaggery",price:0,discountPrice:0,image:"",stock:100,featured:true},
{id:14,name:"Haribhanga Mango",category:"Mango",icon:"🥭",desc:"Fresh seasonal mango",price:0,discountPrice:0,image:"",stock:100,featured:true},
{id:15,name:"Katimon Mango",category:"Mango",icon:"🥭",desc:"Fresh Katimon mango",price:0,discountPrice:0,image:"",stock:100,featured:true},
{id:16,name:"Mango Combo",category:"Mango",icon:"🥭",desc:"Seasonal mango combo",price:0,discountPrice:0,image:"",stock:100,featured:false},
{id:17,name:"Watches & Jewellery",category:"Watches & Jewellery",icon:"⌚",desc:"Style accessories",price:0,discountPrice:0,image:"",stock:100,featured:false},
{id:18,name:"Sports & Fitness",category:"Sports",icon:"⚽",desc:"Active lifestyle products",price:0,discountPrice:0,image:"",stock:100,featured:false},
{id:19,name:"Toys & Games",category:"Baby & Kids",icon:"🧸",desc:"Fun picks for kids",price:0,discountPrice:0,image:"",stock:100,featured:false},
{id:20,name:"Grocery & Daily Essentials",category:"Grocery & Food",icon:"🛒",desc:"Everyday shopping essentials",price:0,discountPrice:0,image:"",stock:100,featured:false}
];

const districts = {
"ঢাকা":["ধামরাই","দোহার","কেরানীগঞ্জ","নবাবগঞ্জ","সাভার"],
"ফরিদপুর":["আলফাডাঙ্গা","ভাঙ্গা","বোয়ালমারী","চরভদ্রাসন","ফরিদপুর সদর","মধুখালী","নগরকান্দা","সদরপুর","সালথা"],
"গাজীপুর":["কালীগঞ্জ","কালিয়াকৈর","কাপাসিয়া","গাজীপুর সদর","শ্রীপুর"],
"গোপালগঞ্জ":["গোপালগঞ্জ সদর","কাশিয়ানী","কোটালীপাড়া","মুকসুদপুর","টুঙ্গিপাড়া"],
"কিশোরগঞ্জ":["অষ্টগ্রাম","বাজিতপুর","ভৈরব","হোসেনপুর","ইটনা","করিমগঞ্জ","কটিয়াদী","কিশোরগঞ্জ সদর","কুলিয়ারচর","মিঠামইন","নিকলী","পাকুন্দিয়া","তাড়াইল"],
"মাদারীপুর":["কালকিনি","মাদারীপুর সদর","রাজৈর","শিবচর"],
"মানিকগঞ্জ":["দৌলতপুর","ঘিওর","হরিরামপুর","মানিকগঞ্জ সদর","সাটুরিয়া","শিবালয়","সিংগাইর"],
"মুন্সিগঞ্জ":["গজারিয়া","লৌহজং","মুন্সিগঞ্জ সদর","সিরাজদিখান","শ্রীনগর","টঙ্গীবাড়ী"],
"নারায়ণগঞ্জ":["আড়াইহাজার","বন্দর","নারায়ণগঞ্জ সদর","রূপগঞ্জ","সোনারগাঁ"],
"নরসিংদী":["বেলাবো","মনোহরদী","নরসিংদী সদর","পলাশ","রায়পুরা","শিবপুর"],
"রাজবাড়ী":["বালিয়াকান্দি","কালুখালী","পাংশা","রাজবাড়ী সদর","গোয়ালন্দ"],
"শরীয়তপুর":["ভেদরগঞ্জ","ডামুড্যা","গোসাইরহাট","জাজিরা","নড়িয়া","শরীয়তপুর সদর"],
"টাঙ্গাইল":["বাসাইল","ভূঞাপুর","দেলদুয়ার","ধনবাড়ী","ঘাটাইল","গোপালপুর","কালিহাতী","মধুপুর","মির্জাপুর","নাগরপুর","সখীপুর","টাঙ্গাইল সদর"],
"বাগেরহাট":["চিতলমারী","ফকিরহাট","কচুয়া","মোল্লাহাট","মোংলা","মোড়েলগঞ্জ","রামপাল","বাগেরহাট সদর","শরণখোলা"],
"চুয়াডাঙ্গা":["আলমডাঙ্গা","চুয়াডাঙ্গা সদর","দামুড়হুদা","জীবননগর"],
"যশোর":["অভয়নগর","বাঘারপাড়া","চৌগাছা","ঝিকরগাছা","কেশবপুর","মণিরামপুর","শার্শা","যশোর সদর"],
"ঝিনাইদহ":["হরিণাকুণ্ডু","ঝিনাইদহ সদর","কালীগঞ্জ","কোটচাঁদপুর","মহেশপুর","শৈলকুপা"],
"খুলনা":["বটিয়াঘাটা","দাকোপ","দিঘলিয়া","ডুমুরিয়া","কয়রা","পাইকগাছা","ফুলতলা","রূপসা","তেরখাদা","খুলনা সদর"],
"কুষ্টিয়া":["ভেড়ামারা","দৌলতপুর","খোকসা","কুমারখালী","কুষ্টিয়া সদর","মিরপুর"],
"মাগুরা":["মাগুরা সদর","মহম্মদপুর","শালিখা","শ্রীপুর"],
"মেহেরপুর":["গাংনী","মেহেরপুর সদর","মুজিবনগর"],
"নড়াইল":["কালিয়া","লোহাগড়া","নড়াইল সদর"],
"সাতক্ষীরা":["আশাশুনি","কলারোয়া","কালীগঞ্জ","সাতক্ষীরা সদর","শ্যামনগর","তালা","দেবহাটা"],
"বান্দরবান":["আলীকদম","বান্দরবান সদর","লামা","নাইক্ষ্যংছড়ি","রুমা","রোয়াংছড়ি","থানচি"],
"ব্রাহ্মণবাড়িয়া":["আখাউড়া","আশুগঞ্জ","বাঞ্ছারামপুর","ব্রাহ্মণবাড়িয়া সদর","কসবা","নবীনগর","নাসিরনগর","সরাইল","বিজয়নগর"],
"চাঁদপুর":["চাঁদপুর সদর","ফরিদগঞ্জ","হাইমচর","হাজীগঞ্জ","কচুয়া","মতলব উত্তর","মতলব দক্ষিণ","শাহরাস্তি"],
"চট্টগ্রাম":["আনোয়ারা","বাঁশখালী","বন্দর","বোয়ালখালী","চন্দনাইশ","ফটিকছড়ি","হাটহাজারী","লোহাগাড়া","মীরসরাই","পটিয়া","রাঙ্গুনিয়া","রাউজান","সন্দ্বীপ","সাতকানিয়া","সীতাকুণ্ড"],
"কুমিল্লা":["বরুড়া","ব্রাহ্মণপাড়া","বুড়িচং","চান্দিনা","চৌদ্দগ্রাম","দাউদকান্দি","দেবিদ্বার","হোমনা","লাকসাম","লালমাই","মেঘনা","মনোহরগঞ্জ","মুরাদনগর","নাঙ্গলকোট","তিতাস","কুমিল্লা সদর দক্ষিণ","কুমিল্লা আদর্শ সদর"],
"কক্সবাজার":["চকরিয়া","কক্সবাজার সদর","কুতুবদিয়া","মহেশখালী","পেকুয়া","রামু","টেকনাফ","উখিয়া"],
"ফেনী":["ছাগলনাইয়া","দাগনভূঞা","ফেনী সদর","ফুলগাজী","পরশুরাম","সোনাগাজী"],
"খাগড়াছড়ি":["দীঘিনালা","খাগড়াছড়ি সদর","লক্ষ্মীছড়ি","মহালছড়ি","মানিকছড়ি","মাটিরাঙ্গা","পানছড়ি","রামগড়"],
"লক্ষ্মীপুর":["কমলনগর","লক্ষ্মীপুর সদর","রামগঞ্জ","রামগতি","রায়পুর"],
"নোয়াখালী":["বেগমগঞ্জ","চাটখিল","কোম্পানীগঞ্জ","হাতিয়া","কবিরহাট","সেনবাগ","সুবর্ণচর","নোয়াখালী সদর","সোনাইমুড়ী"],
"রাঙ্গামাটি":["বাঘাইছড়ি","বরকল","বেলাইছড়ি","জুরাছড়ি","কাপ্তাই","কাউখালী","লংগদু","নানিয়ারচর","রাজস্থলী","রাঙ্গামাটি সদর"],
"বগুড়া":["আদমদিঘী","বগুড়া সদর","ধুনট","দুপচাঁচিয়া","গাবতলী","কাহালু","শাজাহানপুর","শেরপুর","শিবগঞ্জ","সারিয়াকান্দি","সোনাতলা","নন্দীগ্রাম"],
"জয়পুরহাট":["আক্কেলপুর","জয়পুরহাট সদর","কালাই","ক্ষেতলাল","পাঁচবিবি"],
"নওগাঁ":["আত্রাই","বদলগাছী","ধামইরহাট","মান্দা","মহাদেবপুর","নওগাঁ সদর","নিয়ামতপুর","পত্নীতলা","পোরশা","রাণীনগর","সাপাহার"],
"নাটোর":["বাগাতিপাড়া","বড়াইগ্রাম","গুরুদাসপুর","লালপুর","নাটোর সদর","সিংড়া","নলডাঙ্গা"],
"চাঁপাইনবাবগঞ্জ":["ভোলাহাট","গোমস্তাপুর","নাচোল","চাঁপাইনবাবগঞ্জ সদর","শিবগঞ্জ"],
"পাবনা":["আটঘরিয়া","বেড়া","ভাঙ্গুড়া","চাটমোহর","ঈশ্বরদী","ফরিদপুর","পাবনা সদর","সাঁথিয়া","সুজানগর"],
"রাজশাহী":["বাঘা","বাগমারা","চারঘাট","দুর্গাপুর","গোদাগাড়ী","মোহনপুর","পবা","পুঠিয়া","তানোর"],
"সিরাজগঞ্জ":["বেলকুচি","চৌহালী","কামারখন্দ","কাজীপুর","রায়গঞ্জ","শাহজাদপুর","সিরাজগঞ্জ সদর","তাড়াশ","উল্লাপাড়া"],
"হবিগঞ্জ":["আজমিরীগঞ্জ","বাহুবল","বানিয়াচং","চুনারুঘাট","হবিগঞ্জ সদর","লাখাই","মাধবপুর","নবীগঞ্জ","শায়েস্তাগঞ্জ"],
"মৌলভীবাজার":["বড়লেখা","জুড়ী","কমলগঞ্জ","কুলাউড়া","মৌলভীবাজার সদর","রাজনগর","শ্রীমঙ্গল"],
"সুনামগঞ্জ":["বিশ্বম্ভরপুর","ছাতক","দিরাই","ধর্মপাশা","দোয়ারাবাজার","জগন্নাথপুর","জামালগঞ্জ","শাল্লা","সুনামগঞ্জ সদর","তাহিরপুর","শান্তিগঞ্জ","মধ্যনগর"],
"সিলেট":["বালাগঞ্জ","বিয়ানীবাজার","বিশ্বনাথ","বড়লেখা","কোম্পানীগঞ্জ","ফেঞ্চুগঞ্জ","গোলাপগঞ্জ","গোয়াইনঘাট","জৈন্তাপুর","কানাইঘাট","সিলেট সদর","জকিগঞ্জ","দক্ষিণ সুরমা","ওসমানীনগর"],
"দিনাজপুর":["বীরগঞ্জ","বিরামপুর","বিরল","বোচাগঞ্জ","চিরিরবন্দর","ফুলবাড়ী","ঘোড়াঘাট","হাকিমপুর","কাহারোল","খানসামা","নবাবগঞ্জ","পার্বতীপুর","দিনাজপুর সদর"],
"গাইবান্ধা":["ফুলছড়ি","গাইবান্ধা সদর","গোবিন্দগঞ্জ","পলাশবাড়ী","সাদুল্লাপুর","সাঘাটা","সুন্দরগঞ্জ"],
"কুড়িগ্রাম":["ভুরুঙ্গামারী","চর রাজিবপুর","চিলমারী","ফুলবাড়ী","কুড়িগ্রাম সদর","নাগেশ্বরী","রাজারহাট","রৌমারী","উলিপুর"],
"লালমনিরহাট":["আদিতমারী","হাতীবান্ধা","কালীগঞ্জ","লালমনিরহাট সদর","পাটগ্রাম"],
"নীলফামারী":["ডিমলা","ডোমার","জলঢাকা","কিশোরগঞ্জ","নীলফামারী সদর","সৈয়দপুর"],
"পঞ্চগড়":["আটোয়ারী","বোদা","দেবীগঞ্জ","পঞ্চগড় সদর","তেঁতুলিয়া"],
"রংপুর":["বদরগঞ্জ","গংগাচড়া","কাউনিয়া","মিঠাপুকুর","পীরগাছা","পীরগঞ্জ","রংপুর সদর","তারাগঞ্জ"],
"ঠাকুরগাঁও":["বালিয়াডাঙ্গী","হরিপুর","পীরগঞ্জ","রাণীশংকৈল","ঠাকুরগাঁও সদর"],
"জামালপুর":["বকশীগঞ্জ","দেওয়ানগঞ্জ","ইসলামপুর","জামালপুর সদর","মাদারগঞ্জ","মেলান্দহ","সরিষাবাড়ী"],
"ময়মনসিংহ":["ভালুকা","ধোবাউড়া","ফুলবাড়ীয়া","গফরগাঁও","গৌরীপুর","ঈশ্বরগঞ্জ","মুক্তাগাছা","ময়মনসিংহ সদর","নান্দাইল","ফুলপুর","ত্রিশাল","হালুয়াঘাট","তারাকান্দা"],
"নেত্রকোণা":["আটপাড়া","বারহাট্টা","দুর্গাপুর","খালিয়াজুড়ি","কলমাকান্দা","কেন্দুয়া","মদন","মোহনগঞ্জ","নেত্রকোণা সদর","পূর্বধলা"],
"শেরপুর":["ঝিনাইগাতী","নকলা","নালিতাবাড়ী","শেরপুর সদর","শ্রীবরদী"],
"বরগুনা":["আমতলী","বামনা","বরগুনা সদর","বেতাগী","পাথরঘাটা","তালতলী"],
"বরিশাল":["আগৈলঝাড়া","বাবুগঞ্জ","বাকেরগঞ্জ","বানারীপাড়া","গৌরনদী","হিজলা","বরিশাল সদর","মেহেন্দিগঞ্জ","মুলাদী","উজিরপুর"],
"ভোলা":["বোরহানউদ্দিন","চরফ্যাশন","দৌলতখান","লালমোহন","মনপুরা","তজুমদ্দিন","ভোলা সদর"],
"ঝালকাঠি":["কাঁঠালিয়া","ঝালকাঠি সদর","নলছিটি","রাজাপুর"],
"পটুয়াখালী":["বাউফল","দশমিনা","দুমকি","কলাপাড়া","মির্জাগঞ্জ","পটুয়াখালী সদর","রাঙ্গাবালী","গলাচিপা"],
"পিরোজপুর":["ভান্ডারিয়া","কাউখালী","মঠবাড়িয়া","নাজিরপুর","নেছারাবাদ","পিরোজপুর সদর","ইন্দুরকানী"]
};

const productGrid = document.getElementById("productGrid");
const cart = [];
let wishCount = 0;

function categoryLabel(category){
  if(category==="Mango") return "Fresh Food";
  if(category==="Grocery & Food") return "Grocery & Food";
  if(["Baby & Kids"].includes(category)) return "Baby & Kids";
  return category;
}
function money(v){ return v ? `৳${Number(v).toLocaleString('en-BD')}` : "মূল্য পরে যোগ হবে"; }
function productImage(p){ return p.image ? `<img src="${p.image}" alt="${escapeHtml(p.name)}" loading="lazy">` : `<span class="placeholder-emoji">${p.icon||'🛍️'}</span>`; }
function escapeHtml(v){ return String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c])); }

function renderProducts(filter="All", query="") {
  const q=query.trim().toLowerCase();
  const groups={
   const groups={
  "Electronics":["Electronics","Electronics & Gadgets"],
  "Fashion":["Fashion","Fashion & Clothing"],
  "Beauty":["Beauty & Personal Care"],
  "Shoes":["Shoes & Bags"],
  "Grocery":["Grocery & Food"],
  "Food":["Grocery & Food","Mango"],
  "Grocery & Food":["Grocery & Food"],
  "Baby & Kids":["Baby & Kids"],
  "Home":["Home & Living"],
  "Sports":["Sports"],
  "Toys":["Toys & Games"],
  "All":[...new Set(products.map(p=>p.category))]
};
  };
  const list=products.filter(p=>{
    const cat=filter==="All"||p.category===filter||(groups[filter]||[]).includes(p.category);
    return cat && (!q || String(p.name).toLowerCase().includes(q)||String(p.category).toLowerCase().includes(q));
  });
  productGrid.innerHTML=list.map((p,index)=>{
    const current=p.discountPrice||p.price||0;
    const hasDiscount=p.discountPrice>0 && p.price>p.discountPrice;
    return `<article class="product-card">
      <div class="product-image"><span class="product-badge">${p.featured||index<3?'FEATURED':'NEW'}</span>${productImage(p)}</div>
      <div class="product-body"><div class="product-meta"><small>${categoryLabel(p.category)}</small><small>♡ Save</small></div>
      <h3>${escapeHtml(p.name)}</h3><p>${escapeHtml(p.desc||'Beauty Shopping product')}</p>
      <div class="price-row"><span class="price">${money(current)}</span>${hasDiscount?`<del>৳${Number(p.price).toLocaleString('en-BD')}</del>`:''}</div>
      <div class="product-actions"><button class="mini-btn" onclick="toggleWish()">♡ Wishlist</button><button class="mini-btn add" onclick="addToCart(${p.id})">কার্টে যোগ +</button></div></div></article>`;
  }).join('') || `<div class="no-products"><strong>এই category-তে এখনো product যোগ করা হয়নি।</strong><span>Admin Panel থেকে product যোগ করলে এখানে automatically দেখা যাবে।</span></div>`;
}

async function loadProducts(){
  try{ const r=await fetch('/api/products'); if(!r.ok) throw Error(); const data=await r.json(); if(Array.isArray(data)) products=data; }catch(e){}
  renderProducts();
}
window.addToCart=function(id){ const p=products.find(x=>x.id===id); if(!p)return; cart.push(p); updateCart(); showToast(`${p.name} কার্টে যোগ হয়েছে`); };
window.toggleWish=function(){ wishCount++; document.getElementById('wishCount').textContent=wishCount; showToast('Wishlist-এ যোগ হয়েছে'); };
function updateCart(){
  document.getElementById('cartCount').textContent=cart.length; document.getElementById('cartCountMini').textContent=cart.length;
  const preview=document.getElementById('cartPreview');
  preview.innerHTML=cart.length?cart.map((p,i)=>{const price=p.discountPrice||p.price||0;return `<div class="cart-line"><div>${p.image?`<img src="${p.image}" style="width:38px;height:38px;object-fit:cover;border-radius:8px">`:p.icon||'🛍️'} <b>${escapeHtml(p.name)}</b><small>Qty: 1 • ${price?money(price):'Price pending'}</small></div><button class="mini-btn" onclick="removeCart(${i})">×</button></div>`}).join(''):`<p class="empty">এখনো কোনো product যোগ করা হয়নি।</p>`;
  const subtotal=cart.reduce((sum,p)=>sum+(Number(p.discountPrice)||Number(p.price)||0),0);
  document.getElementById('cartTotal').textContent=subtotal?`৳${(subtotal+110).toLocaleString('en-BD')}`:'Product price + ৳110';
}
window.removeCart=function(i){cart.splice(i,1);updateCart();};
function setActiveFilter(filter){document.querySelectorAll('.pill').forEach(x=>x.classList.toggle('active',x.dataset.filter===filter));document.querySelectorAll('.home-cat-btn').forEach(x=>x.classList.toggle('active',x.dataset.filter===filter));}
function openCategory(filter){   setActiveFilter(filter);   renderProducts(filter,document.getElementById('searchInput').value);   document.getElementById('productGrid').scrollIntoView({behavior:'smooth',block:'start'}); }
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>openCategory(btn.dataset.filter)));
document.querySelectorAll('button[data-filter]').forEach(btn=>btn.addEventListener('click',()=>openCategory(btn.dataset.filter)));
document.getElementById('searchInput').addEventListener('input',e=>{setActiveFilter('All');renderProducts('All',e.target.value);});
document.getElementById('cartBtn').addEventListener('click',()=>document.getElementById('checkout').scrollIntoView({behavior:'smooth'}));
document.getElementById('wishlistBtn').addEventListener('click',()=>showToast(`Wishlist-এ ${wishCount}টি item আছে`));

const districtEl=document.getElementById('district'), upazilaEl=document.getElementById('upazila');
Object.keys(districts).sort((a,b)=>a.localeCompare(b,'bn')).forEach(d=>{const o=document.createElement('option');o.value=d;o.textContent=d;districtEl.appendChild(o);});
districtEl.addEventListener('change',()=>{const items=districts[districtEl.value]||[];upazilaEl.innerHTML=`<option value="">উপজেলা নির্বাচন করুন</option>`+items.map(x=>`<option>${x}</option>`).join('');upazilaEl.disabled=!items.length;});

document.getElementById('orderForm').addEventListener('submit',async e=>{
  e.preventDefault(); if(!cart.length){showToast('অর্ডার করার আগে Cart-এ product যোগ করুন');return;}
  const f=new FormData(e.target); const payload={customerId:customerUser?.id||null,name:f.get('name'),district:f.get('district'),upazila:f.get('upazila'),address:f.get('address'),phone:f.get('phone'),items:cart.map(p=>({id:p.id,name:p.name,price:p.discountPrice||p.price||0,qty:1}))};
  try{const r=await fetch('/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const d=await r.json();if(!r.ok)throw Error(d.error);showToast(`অর্ডার রিসিভ হয়েছে — ${d.orderId} • Delivery ৳110`);e.target.reset();upazilaEl.innerHTML='<option value="">আগে জেলা নির্বাচন করুন</option>';upazilaEl.disabled=true;cart.length=0;updateCart();}catch(err){showToast('অর্ডার পাঠাতে সমস্যা হয়েছে — server চালু আছে কি না দেখো');}
});
function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.__toast);window.__toast=setTimeout(()=>t.classList.remove('show'),2600);}
loadProducts();

// Customer account, profile, customer-care number and messaging
let customerToken = localStorage.getItem('bs_customer_token') || '';
let customerUser = null;
async function customerApi(url,opt={}){
  opt.headers={...(opt.headers||{}),...(customerToken?{'x-customer-token':customerToken}:{})};
  const r=await fetch(url,opt); const d=await r.json().catch(()=>({}));
  if(!r.ok) throw Error(d.error||'Request failed'); return d;
}
function openAuth(){document.getElementById('authModal').hidden=false;document.getElementById('authStatus').textContent='';}
function closeAuth(){document.getElementById('authModal').hidden=true;}
window.closeAuth=closeAuth; window.closeProfile=()=>document.getElementById('profileModal').hidden=true; window.closeMessage=()=>document.getElementById('messageModal').hidden=true;
function setCustomer(user,token){customerUser=user;customerToken=token||customerToken;if(customerToken)localStorage.setItem('bs_customer_token',customerToken);document.getElementById('accountLabel').textContent=user?user.name.split(' ')[0]:'Login';}
function fillCustomerFields(){if(!customerUser)return;const name=document.querySelector('#orderForm input[name="name"]');const phone=document.querySelector('#orderForm input[name="phone"]');if(name&&!name.value)name.value=customerUser.name;if(phone&&!phone.value)phone.value=customerUser.phone;}
async function restoreCustomer(){
  if(!customerToken)return;
  try{const d=await customerApi('/api/customer/me');setCustomer(d.user);fillCustomerFields();}catch(e){customerToken='';localStorage.removeItem('bs_customer_token');}
}
function showAuthStatus(msg){const el=document.getElementById('authStatus');el.textContent=msg;el.classList.add('show');}
document.getElementById('loginBtn').addEventListener('click',()=>customerUser?openProfile():openAuth());
document.getElementById('profileBtn').addEventListener('click',()=>customerUser?openProfile():openAuth());
document.getElementById('loginTab').addEventListener('click',()=>{document.getElementById('loginTab').classList.add('active');document.getElementById('registerTab').classList.remove('active');document.getElementById('loginFormCustomer').hidden=false;document.getElementById('registerFormCustomer').hidden=true;});
document.getElementById('registerTab').addEventListener('click',()=>{document.getElementById('registerTab').classList.add('active');document.getElementById('loginTab').classList.remove('active');document.getElementById('loginFormCustomer').hidden=true;document.getElementById('registerFormCustomer').hidden=false;});
document.getElementById('loginFormCustomer').addEventListener('submit',async e=>{e.preventDefault();const f=new FormData(e.target);try{const d=await customerApi('/api/customer/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({phone:f.get('phone'),password:f.get('password')})});setCustomer(d.user,d.token);fillCustomerFields();closeAuth();showToast(`স্বাগতম ${d.user.name}`);}catch(err){showAuthStatus(err.message);}});
document.getElementById('registerFormCustomer').addEventListener('submit',async e=>{e.preventDefault();const f=new FormData(e.target);try{const d=await customerApi('/api/customer/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:f.get('name'),phone:f.get('phone'),password:f.get('password')})});setCustomer(d.user,d.token);fillCustomerFields();closeAuth();showToast('Customer account তৈরি হয়েছে ✓');}catch(err){showAuthStatus(err.message);}});
function openProfile(){
  if(!customerUser){openAuth();return;}
  document.getElementById('profileName').textContent=customerUser.name;
  document.getElementById('profilePhone').textContent=`মোবাইল: ${customerUser.phone}`;
  document.getElementById('profileModal').hidden=false;
}
document.getElementById('logoutCustomerBtn').addEventListener('click',async()=>{try{await customerApi('/api/customer/logout',{method:'POST'});}catch(e){} customerToken='';customerUser=null;localStorage.removeItem('bs_customer_token');document.getElementById('accountLabel').textContent='Customer Login';document.getElementById('profileModal').hidden=true;showToast('Logout হয়েছে');});
function openWhatsApp(){window.open('https://wa.me/8801750475598?text=Assalamu%20Alaikum%2C%20Beauty%20Shopping%20er%20sathe%20kotha%20bolte%20chai.','_blank','noopener');}
document.getElementById('messageBtn').addEventListener('click',openWhatsApp);
document.getElementById('profileMessageBtn').addEventListener('click',()=>{document.getElementById('profileModal').hidden=true;openWhatsApp();});
async function loadCareNumber(){try{const d=await fetch('/api/settings/public').then(r=>r.json());document.getElementById('careNumber').textContent=d.customerCareNumber;document.getElementById('messageCareNumber').textContent=d.customerCareNumber;}catch(e){}}
async function openMessage(){if(!customerUser){openAuth();showToast('Message করতে আগে Login করুন');return;}document.getElementById('messageModal').hidden=false;await loadMessages();}
restoreCustomer();loadCareNumber();
