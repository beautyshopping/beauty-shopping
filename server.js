const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const DATA = path.join(ROOT, 'data');
const PRODUCTS_FILE = path.join(DATA, 'products.json');
const ORDERS_FILE = path.join(DATA, 'orders.json');
const USERS_FILE = path.join(DATA, 'users.json');
const MESSAGES_FILE = path.join(DATA, 'messages.json');
const SETTINGS_FILE = path.join(DATA, 'settings.json');
const MERCHANTS_FILE = path.join(DATA, 'merchants.json');
const GOOGLE_SHEET_WEBHOOK_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL || '';
const UPLOADS = path.join(ROOT, 'uploads');
fs.mkdirSync(DATA, { recursive: true });
fs.mkdirSync(UPLOADS, { recursive: true });
if(!fs.existsSync(USERS_FILE)) writeJson(USERS_FILE, []);
if(!fs.existsSync(MESSAGES_FILE)) writeJson(MESSAGES_FILE, []);
if(!fs.existsSync(SETTINGS_FILE)) writeJson(SETTINGS_FILE, {customerCareNumber:'01750475598'});
if(!fs.existsSync(MERCHANTS_FILE)) writeJson(MERCHANTS_FILE, []);

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'change-me-123';
if (process.env.NODE_ENV === 'production' && ADMIN_PASSWORD === 'change-me-123') {
  throw new Error('Set ADMIN_PASSWORD before running Beauty Shopping in production.');
}
const sessions = new Set();
const customerSessions = new Map();
const merchantSessions = new Map();
const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOADS,
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`);
    }
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => cb(null, /^image\/(jpeg|png|webp|gif)$/i.test(file.mimetype))
});

app.use(express.json({limit:'1mb'}));
app.use(express.urlencoded({extended:true}));
app.use('/uploads', express.static(UPLOADS));
app.use(express.static(ROOT));

function readJson(file, fallback){ try { return JSON.parse(fs.readFileSync(file,'utf8')); } catch { return fallback; } }
function writeJson(file, data){ fs.writeFileSync(file, JSON.stringify(data,null,2)); }
function nextId(items){ return items.reduce((m,x)=>Math.max(m,Number(x.id)||0),0)+1; }
function hashPassword(password, salt=crypto.randomBytes(16).toString('hex')){
  const hash=crypto.scryptSync(String(password),salt,64).toString('hex');
  return `${salt}:${hash}`;
}
function verifyPassword(password, stored){
  const [salt,hash]=String(stored||'').split(':');
  if(!salt||!hash)return false;
  const check=crypto.scryptSync(String(password),salt,64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(check,'hex'),Buffer.from(hash,'hex'));
}
function customerAuth(req,res,next){
  const token=req.headers['x-customer-token'];
  const userId=token && customerSessions.get(token);
  if(!userId)return res.status(401).json({error:'Customer login required'});
  const user=readJson(USERS_FILE,[]).find(x=>x.id===userId);
  if(!user)return res.status(401).json({error:'Customer account not found'});
  req.customer=user; next();
}

function merchantAuth(req,res,next){
  const token=req.headers['x-merchant-token'];
  const merchantId=token && merchantSessions.get(token);
  if(!merchantId)return res.status(401).json({error:'Merchant login required'});
  const merchant=readJson(MERCHANTS_FILE,[]).find(x=>x.id===merchantId);
  if(!merchant)return res.status(401).json({error:'Merchant account not found'});
  req.merchant=merchant; next();
}

function auth(req,res,next){ const token = req.headers['x-admin-token'] || req.cookies?.admin_token; if(!token || !sessions.has(token)) return res.status(401).json({error:'Unauthorized'}); next(); }

app.get('/api/health',(req,res)=>res.json({ok:true,service:'Beauty Shopping'}));
app.get('/api/settings/public',(req,res)=>res.json({customerCareNumber:readJson(SETTINGS_FILE,{customerCareNumber:'01750475598'}).customerCareNumber||'01750475598'}));
app.post('/api/customer/register',(req,res)=>{
  const {name,phone,password}=req.body||{};
  if(!name||!phone||!password||String(password).length<6)return res.status(400).json({error:'নাম, মোবাইল নম্বর ও কমপক্ষে ৬ অক্ষরের password দিন'});
  const users=readJson(USERS_FILE,[]);
  if(users.some(u=>u.phone===String(phone).trim()))return res.status(409).json({error:'এই মোবাইল নম্বর দিয়ে account আগে থেকেই আছে'});
  const user={id:`CU-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,name:String(name).trim(),phone:String(phone).trim(),passwordHash:hashPassword(password),createdAt:new Date().toISOString()};
  users.unshift(user); writeJson(USERS_FILE,users);
  const token=crypto.randomBytes(32).toString('hex'); customerSessions.set(token,user.id);
  res.status(201).json({token,user:{id:user.id,name:user.name,phone:user.phone}});
});
app.post('/api/customer/login',(req,res)=>{
  const {phone,password}=req.body||{}; const user=readJson(USERS_FILE,[]).find(u=>u.phone===String(phone||'').trim());
  if(!user||!verifyPassword(password,user.passwordHash))return res.status(401).json({error:'মোবাইল নম্বর বা password ভুল'});
  const token=crypto.randomBytes(32).toString('hex'); customerSessions.set(token,user.id);
  res.json({token,user:{id:user.id,name:user.name,phone:user.phone}});
});
app.get('/api/customer/me',customerAuth,(req,res)=>res.json({user:{id:req.customer.id,name:req.customer.name,phone:req.customer.phone}}));
app.post('/api/customer/logout',customerAuth,(req,res)=>{customerSessions.delete(req.headers['x-customer-token']);res.json({ok:true})});
app.post('/api/customer/messages',customerAuth,(req,res)=>{
  const text=String(req.body.message||'').trim(); if(!text)return res.status(400).json({error:'Message লিখুন'});
  const messages=readJson(MESSAGES_FILE,[]); const message={id:`MSG-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,customerId:req.customer.id,customerName:req.customer.name,phone:req.customer.phone,message:text,from:'customer',createdAt:new Date().toISOString()};
  messages.push(message); writeJson(MESSAGES_FILE,messages); res.status(201).json(message);
});
app.get('/api/customer/messages',customerAuth,(req,res)=>res.json(readJson(MESSAGES_FILE,[]).filter(m=>m.customerId===req.customer.id)));

// Merchant/Seller login is intentionally separate from Customer login.
app.post('/api/merchant/login',(req,res)=>{
  const {phone,password}=req.body||{};
  const envPhone=String(process.env.MERCHANT_PHONE||'merchant').trim();
  const envPassword=String(process.env.MERCHANT_PASSWORD||'change-me-merchant');
  let merchant=readJson(MERCHANTS_FILE,[]).find(m=>m.phone===String(phone||'').trim());
  if(!merchant && String(phone||'').trim()===envPhone && String(password||'')===envPassword){
    merchant={id:'MERCHANT-OWNER',name:'Beauty Shopping Merchant',phone:envPhone,role:'merchant'};
  }
  if(!merchant || (merchant.passwordHash ? !verifyPassword(password,merchant.passwordHash) : String(password||'')!==envPassword)){
    return res.status(401).json({error:'Merchant ID/মোবাইল বা password ভুল'});
  }
  const token=crypto.randomBytes(32).toString('hex'); merchantSessions.set(token,merchant.id);
  res.json({token,user:{id:merchant.id,name:merchant.name,phone:merchant.phone,role:'merchant'}});
});
app.get('/api/merchant/me',merchantAuth,(req,res)=>res.json({user:{id:req.merchant.id,name:req.merchant.name,phone:req.merchant.phone,role:'merchant'}}));
app.post('/api/merchant/logout',merchantAuth,(req,res)=>{merchantSessions.delete(req.headers['x-merchant-token']);res.json({ok:true})});

// Smart product assistant: answers availability from the live product/stock data.
app.post('/api/chat',(req,res)=>{
  const q=String(req.body.message||'').trim().toLowerCase();
  if(!q) return res.status(400).json({error:'Message লিখুন'});
  const products=readJson(PRODUCTS_FILE,[]);
  const available=products.filter(p=>Number(p.stock)>0);
  const unavailable=products.filter(p=>Number(p.stock)<=0);
  const stop=['কি','কী','আছে','নেই','আমাদের','আপনাদের','পণ্য','product','products','দাও','দেখাও','কোন','কোনটা','কত','টা','গুলো','লিস্ট'];
  const tokens=q.replace(/[^a-z0-9\u0980-\u09ff ]/gi,' ').split(/\s+/).filter(Boolean).filter(x=>!stop.includes(x));
  const matches=products.filter(p=>{
    const hay=`${p.name} ${p.category} ${p.desc||''}`.toLowerCase();
    return tokens.some(t=>hay.includes(t));
  });
  let answer=''; let items=[];
  if(/কী কী|কি কি|কি আছে|কী আছে|সব পণ্য|products|product list|কি কি পণ্য/.test(q)){
    items=available.slice(0,12); answer=items.length?`এখন আমাদের কাছে ${items.length} ধরনের available product আছে। নিচে দেখাচ্ছি:`:'এই মুহূর্তে available product পাওয়া যাচ্ছে না।';
  } else if(/নেই|out of stock|stock নেই/.test(q)){
    items=unavailable; answer=items.length?`এই মুহূর্তে ${items.length}টি product out of stock:`:'এই মুহূর্তে কোনো product out of stock নেই।';
  } else if(matches.length){
    items=matches.slice(0,8); answer=`হ্যাঁ, এই matching productগুলো পেয়েছি:`;
  } else if(/mango|আম|হারিভাঙ্গা|হাড়িভাঙ্গা|কাটিমন|katimon/.test(q)){
    items=products.filter(p=>/mango|আম|হারিভাঙ্গা|হাড়িভাঙ্গা|কাটিমন|katimon/i.test(`${p.name} ${p.category} ${p.desc||''}`)).slice(0,8);
    answer=items.length?'Mango-related productগুলো এখন catalog-এ আছে:':'এই মুহূর্তে Mango product catalog-এ পাওয়া যাচ্ছে না।';
  } else {
    answer='আমি product availability দেখে বলতে পারি। যেমন “কি কি product আছে?”, “earbuds আছে?”, “কোন product stock-এ নেই?”—এভাবে জিজ্ঞেস করো।';
  }
  res.json({answer,items:items.map(p=>({id:p.id,name:p.name,category:p.category,stock:p.stock,price:p.discountPrice||p.price||0,image:p.image||'',icon:p.icon||'🛍️'}))});
});

app.get('/api/products',(req,res)=>res.json(readJson(PRODUCTS_FILE,[])));
app.post('/api/admin/login',(req,res)=>{
  const password = String(req.body.password || '');
  if(password !== ADMIN_PASSWORD) return res.status(401).json({error:'ভুল password'});
  const token = crypto.randomBytes(32).toString('hex'); sessions.add(token);
  res.json({token});
});
app.post('/api/admin/logout',auth,(req,res)=>{ sessions.delete(req.headers['x-admin-token']); res.json({ok:true}); });
app.get('/api/admin/orders',auth,(req,res)=>res.json(readJson(ORDERS_FILE,[])));

app.get('/api/admin/settings',auth,(req,res)=>res.json(readJson(SETTINGS_FILE,{customerCareNumber:'01750475598'})));
app.put('/api/admin/settings',auth,(req,res)=>{const old=readJson(SETTINGS_FILE,{customerCareNumber:'01750475598'}); const next={...old,customerCareNumber:String(req.body.customerCareNumber||old.customerCareNumber).trim()}; writeJson(SETTINGS_FILE,next); res.json(next);});
app.get('/api/admin/messages',auth,(req,res)=>res.json(readJson(MESSAGES_FILE,[]).slice().reverse()));
app.post('/api/admin/messages/reply',auth,(req,res)=>{
  const {customerId,message}=req.body||{}; if(!customerId||!String(message||'').trim())return res.status(400).json({error:'Customer ও message লাগবে'});
  const messages=readJson(MESSAGES_FILE,[]); const item={id:`MSG-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,customerId,message:String(message).trim(),from:'admin',createdAt:new Date().toISOString()}; messages.push(item); writeJson(MESSAGES_FILE,messages); res.status(201).json(item);
});

app.post('/api/admin/products',auth,upload.single('image'),(req,res)=>{
  const products = readJson(PRODUCTS_FILE,[]);
  const body = req.body;
  const product = {
    id: nextId(products),
    name: String(body.name||'').trim(), category: String(body.category||'').trim(),
    icon: String(body.icon||'🛍️').trim() || '🛍️', desc: String(body.desc||'').trim(),
    price: Number(body.price)||0, discountPrice: Number(body.discountPrice)||0,
    stock: Number(body.stock)||0, featured: body.featured === 'true',
    image: req.file ? `/uploads/${req.file.filename}` : ''
  };
  if(!product.name || !product.category) return res.status(400).json({error:'Product name ও category লাগবে'});
  products.unshift(product); writeJson(PRODUCTS_FILE,products); res.status(201).json(product);
});

app.put('/api/admin/products/:id',auth,upload.single('image'),(req,res)=>{
  const products = readJson(PRODUCTS_FILE,[]); const id=Number(req.params.id); const i=products.findIndex(p=>p.id===id);
  if(i<0) return res.status(404).json({error:'Product পাওয়া যায়নি'});
  const old=products[i], b=req.body;
  products[i] = {...old,
    name: String(b.name??old.name).trim(), category:String(b.category??old.category).trim(),
    icon:String(b.icon??old.icon).trim()||'🛍️', desc:String(b.desc??old.desc).trim(),
    price:Number(b.price??old.price)||0, discountPrice:Number(b.discountPrice??old.discountPrice)||0,
    stock:Number(b.stock??old.stock)||0, featured:b.featured===undefined?old.featured:b.featured==='true'
  };
  if(req.file) products[i].image=`/uploads/${req.file.filename}`;
  writeJson(PRODUCTS_FILE,products); res.json(products[i]);
});

app.delete('/api/admin/products/:id',auth,(req,res)=>{
  const products=readJson(PRODUCTS_FILE,[]); const id=Number(req.params.id); const p=products.find(x=>x.id===id);
  if(!p) return res.status(404).json({error:'Product পাওয়া যায়নি'});
  writeJson(PRODUCTS_FILE,products.filter(x=>x.id!==id));
  res.json({ok:true});
});

app.post('/api/orders', async (req,res)=>{
  const {customerId=null,name,district,upazila,address,phone,items=[]}=req.body;

  if(!name||!district||!upazila||!address||!phone||!items.length){
    return res.status(400).json({error:'সব তথ্য দিন এবং অন্তত ১টি product দিন'});
  }

  const orders=readJson(ORDERS_FILE,[]);
  const order={
    customerId,
    id:`BS-${Date.now()}`,
    createdAt:new Date().toISOString(),
    name,
    district,
    upazila,
    address,
    phone,
    items,
    deliveryCharge:110,
    status:'New'
  };

  orders.unshift(order);
  writeJson(ORDERS_FILE,orders);

  if(GOOGLE_SHEET_WEBHOOK_URL){
    const subtotal=items.reduce((sum,item)=>sum + Number(item.price||0)*Number(item.qty||1),0);
    const quantity=items.reduce((sum,item)=>sum + Number(item.qty||1),0);
    const products=items.map(item=>`${item.name} x${item.qty||1}`).join(', ');

    try{
      await fetch(GOOGLE_SHEET_WEBHOOK_URL,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          orderId:order.id,
          customerName:name,
          mobile:phone,
          district,
          upazila,
          address,
          products,
          quantity,
          subtotal,
          deliveryCharge:110,
          total:subtotal+110,
          paymentMethod:'COD',
          status:'Pending'
        })
      });
    }catch(error){
      console.error('Google Sheet webhook failed:',error);
    }
  }

  res.status(201).json({ok:true,orderId:order.id});
});

app.get('/admin', (req,res)=>res.sendFile(path.join(ROOT,'admin.html')));
app.listen(PORT,()=>console.log(`Beauty Shopping running on port ${PORT}`));
